import type {
  SignCategory,
  SignSystem,
  TrainingMode,
  UserProgress,
} from '../types/sign';

const STORAGE_KEY = 'signcue_trainer_progress_v1';
const PREFS_KEY = 'signcue_trainer_prefs_v1';

export function createInitialProgress(): UserProgress {
  return {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    totalResponseMs: 0,
    categories: {
      letters: {attempts: 0, correct: 0, totalMs: 0},
      numbers: {attempts: 0, correct: 0, totalMs: 0},
      lookalike: {attempts: 0, correct: 0, totalMs: 0},
      cues: {attempts: 0, correct: 0, totalMs: 0},
    },
    items: {},
    sessions: [],
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return createInitialProgress();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createInitialProgress();
    }
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    const base = createInitialProgress();
    return {
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
      bestStreak: typeof parsed.bestStreak === 'number' ? parsed.bestStreak : 0,
      totalAnswered: typeof parsed.totalAnswered === 'number' ? parsed.totalAnswered : 0,
      totalCorrect: typeof parsed.totalCorrect === 'number' ? parsed.totalCorrect : 0,
      totalResponseMs: typeof parsed.totalResponseMs === 'number' ? parsed.totalResponseMs : 0,
      categories: {
        letters: parsed.categories?.letters ?? base.categories.letters,
        numbers: parsed.categories?.numbers ?? base.categories.numbers,
        lookalike: parsed.categories?.lookalike ?? base.categories.lookalike,
        cues: parsed.categories?.cues ?? base.categories.cues,
      },
      items: parsed.items ?? {},
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions.slice(0, 12) : [],
    };
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors in restricted private browsing modes
  }
}

export function clearProgress(): UserProgress {
  const fresh = createInitialProgress();
  saveProgress(fresh);
  return fresh;
}

export function recordAnswerProgress(
  prev: UserProgress,
  itemId: string,
  category: SignCategory,
  isCorrect: boolean,
  responseMs: number,
  xpGain: number,
): UserProgress {
  const clampedMs = Math.max(250, Math.min(responseMs, 45000));
  const nextStreak = isCorrect ? prev.streak + 1 : 0;
  const nextBestStreak = Math.max(prev.bestStreak, nextStreak);
  const prevCat = prev.categories[category];
  const prevItem = prev.items[itemId] ?? {attempts: 0, misses: 0};

  const next: UserProgress = {
    ...prev,
    xp: prev.xp + (isCorrect ? xpGain : 2),
    streak: nextStreak,
    bestStreak: nextBestStreak,
    totalAnswered: prev.totalAnswered + 1,
    totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
    totalResponseMs: prev.totalResponseMs + clampedMs,
    categories: {
      ...prev.categories,
      [category]: {
        attempts: prevCat.attempts + 1,
        correct: prevCat.correct + (isCorrect ? 1 : 0),
        totalMs: prevCat.totalMs + clampedMs,
      },
    },
    items: {
      ...prev.items,
      [itemId]: {
        attempts: prevItem.attempts + 1,
        misses: prevItem.misses + (isCorrect ? 0 : 1),
        lastMissedAt: isCorrect ? prevItem.lastMissedAt : Date.now(),
      },
    },
  };

  saveProgress(next);
  return next;
}

export function recordCompletedSession(
  prev: UserProgress,
  mode: TrainingMode,
  system: SignSystem,
  total: number,
  correct: number,
  avgMs: number,
): UserProgress {
  const session = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    mode,
    system,
    total,
    correct,
    avgMs,
  };
  const next: UserProgress = {
    ...prev,
    sessions: [session, ...prev.sessions].slice(0, 10),
  };
  saveProgress(next);
  return next;
}

export function getBlindSpotItemIds(progress: UserProgress, limit = 8): string[] {
  const scored = Object.entries(progress.items)
    .filter(([, stats]) => stats.misses > 0)
    .map(([id, stats]) => {
      const errorRate = stats.misses / Math.max(1, stats.attempts);
      const recencyBoost = stats.lastMissedAt
        ? Math.max(0, 1 - (Date.now() - stats.lastMissedAt) / (1000 * 60 * 60 * 24 * 7))
        : 0;
      return {
        id,
        score: stats.misses * 2 + errorRate * 3 + recencyBoost,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.id);

  return scored;
}

export function loadSavedLang(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return window.localStorage.getItem(PREFS_KEY);
  } catch {
    return null;
  }
}

export function saveSavedLang(lang: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(PREFS_KEY, lang);
  } catch {
    // Ignore storage quota errors
  }
}
