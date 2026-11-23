import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  Share2,
  SkipForward,
  ZoomIn,
} from 'lucide-react';
import {
  SIGN_BANK,
  WORD_CHALLENGES,
  getLetterSign,
  getSignById,
  resolveVisualForSystem,
} from '../data/signBank';
import {buildSignFeedback, getCueScenario, getSignDisplayLabel} from '../i18n/cueNotes';
import {TRANSLATIONS} from '../i18n/translations';
import type {
  LangCode,
  SignCategory,
  SignItem,
  SignSystem,
  TrainingMode,
  WordChallenge,
} from '../types/sign';
import {SignHandStage, SignHandThumb} from './SignHandStage';

interface TrainingArenaProps {
  lang: LangCode;
  system: SignSystem;
  mode: TrainingMode;
  blindSpotIds: string[];
  onRecordAnswer: (
    itemId: string,
    category: SignCategory,
    isCorrect: boolean,
    responseMs: number,
    xpGain: number,
  ) => void;
  onCompleteSession: (
    mode: TrainingMode,
    system: SignSystem,
    total: number,
    correct: number,
    avgMs: number,
  ) => void;
  onShareLink: () => void;
  linkCopied: boolean;
}

interface QuizQuestion {
  target: SignItem;
  options: SignItem[];
  category: SignCategory;
}

const ROUND_SIZE = 8;

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildOptionsForTarget(target: SignItem, pool: SignItem[]): SignItem[] {
  const distractors: SignItem[] = [];
  for (const confId of target.confusableWith) {
    const found = getSignById(confId);
    if (found && found.id !== target.id && !distractors.some((d) => d.id === found.id)) {
      distractors.push(found);
    }
    if (distractors.length >= 3) break;
  }

  if (distractors.length < 3) {
    const fallbackPool = shuffleArray(pool.filter((item) => item.id !== target.id));
    for (const candidate of fallbackPool) {
      if (!distractors.some((d) => d.id === candidate.id)) {
        distractors.push(candidate);
      }
      if (distractors.length >= 3) break;
    }
  }

  return shuffleArray([target, ...distractors.slice(0, 3)]);
}

function generateQuizRound(
  mode: TrainingMode,
  spotterFilter: 'all' | 'letters' | 'numbers',
  blindSpotIds: string[],
): QuizQuestion[] {
  let pool: SignItem[] = [];
  let effectiveCategory: SignCategory = 'letters';

  if (mode === 'spotter') {
    if (spotterFilter === 'letters') {
      pool = SIGN_BANK.filter((s) => s.category === 'letters');
      effectiveCategory = 'letters';
    } else if (spotterFilter === 'numbers') {
      pool = SIGN_BANK.filter((s) => s.category === 'numbers');
      effectiveCategory = 'numbers';
    } else {
      pool = SIGN_BANK.filter((s) => s.category === 'letters' || s.category === 'numbers');
    }
  } else if (mode === 'lookalike') {
    pool = SIGN_BANK.filter((s) => s.isLookalikePriority);
    effectiveCategory = 'lookalike';
  } else if (mode === 'cues') {
    pool = SIGN_BANK.filter((s) => s.category === 'cues');
    effectiveCategory = 'cues';
  } else if (mode === 'review') {
    const weakItems = blindSpotIds
      .map((id) => getSignById(id))
      .filter((item): item is SignItem => Boolean(item));
    pool = weakItems.length >= 4 ? weakItems : SIGN_BANK.filter((s) => s.isLookalikePriority);
  }

  const chosen = shuffleArray(pool).slice(0, Math.min(ROUND_SIZE, pool.length));
  return chosen.map((target) => {
    const optionPool =
      mode === 'review'
        ? SIGN_BANK.filter((s) => s.category === target.category)
        : pool;
    const category: SignCategory =
      mode === 'lookalike'
        ? 'lookalike'
        : target.category === 'numbers'
          ? 'numbers'
          : target.category === 'cues'
            ? 'cues'
            : effectiveCategory;

    return {
      target,
      options: buildOptionsForTarget(target, optionPool),
      category,
    };
  });
}

function buildLetterTileBank(word: string): string[] {
  const unique = Array.from(new Set(word.toUpperCase().split('')));
  const extraPool = ['A', 'E', 'I', 'O', 'M', 'N', 'S', 'T', 'L', 'R', 'K', 'F', 'U', 'V', 'H', 'D'];
  for (const ch of shuffleArray(extraPool)) {
    if (!unique.includes(ch)) {
      unique.push(ch);
    }
    if (unique.length >= 12) break;
  }
  return shuffleArray(unique);
}

export const TrainingArena: React.FC<TrainingArenaProps> = ({
  lang,
  system,
  mode,
  blindSpotIds,
  onRecordAnswer,
  onCompleteSession,
  onShareLink,
  linkCopied,
}) => {
  const t = TRANSLATIONS[lang];
  const [viewMode, setViewMode] = useState<'full' | 'zoom'>('full');
  const [spotterFilter, setSpotterFilter] = useState<'all' | 'letters' | 'numbers'>('all');
  const [timedMode, setTimedMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  // Quiz state (Spotter / Lookalike / Cues / Review)
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    generateQuizRound(mode, 'all', blindSpotIds),
  );
  const [qIndex, setQIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [roundResponseTimes, setRoundResponseTimes] = useState<number[]>([]);
  const [roundFinished, setRoundFinished] = useState(false);

  // Word Spelling Builder state
  const [builderPool, setBuilderPool] = useState<WordChallenge[]>(() => shuffleArray(WORD_CHALLENGES));
  const [builderIdx, setBuilderIdx] = useState(0);
  const [letterStep, setLetterStep] = useState(0);
  const [isPlayingSeq, setIsPlayingSeq] = useState(true);
  const [seqSpeedMs, setSeqSpeedMs] = useState<number>(1350);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [builderStatus, setBuilderStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [builderHintsUsed, setBuilderHintsUsed] = useState(0);

  const questionStartRef = useRef<number>(Date.now());

  const startFreshRound = useCallback(
    (nextMode = mode, nextFilter = spotterFilter) => {
      if (nextMode === 'builder') {
        const ordered =
          system === 'lse'
            ? [
                ...WORD_CHALLENGES.filter((w) => w.preferredSystem === 'lse'),
                ...shuffleArray(WORD_CHALLENGES.filter((w) => w.preferredSystem !== 'lse')),
              ]
            : shuffleArray(WORD_CHALLENGES);
        setBuilderPool(ordered);
        setBuilderIdx(0);
        setLetterStep(0);
        setTypedLetters([]);
        setBuilderStatus('idle');
        setBuilderHintsUsed(0);
        setIsPlayingSeq(true);
        questionStartRef.current = Date.now();
        return;
      }

      setQuestions(generateQuizRound(nextMode, nextFilter, blindSpotIds));
      setQIndex(0);
      setSelectedId(null);
      setTimedOut(false);
      setTimeLeft(10);
      setRoundCorrect(0);
      setRoundResponseTimes([]);
      setRoundFinished(false);
      questionStartRef.current = Date.now();
    },
    [mode, spotterFilter, blindSpotIds, system],
  );

  // Reset round when mode, system, or spotter filter changes
  useEffect(() => {
    startFreshRound(mode, spotterFilter);
  }, [mode, spotterFilter, system]); // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown timer for Spotter timed mode
  useEffect(() => {
    if (mode !== 'spotter' || !timedMode || selectedId !== null || timedOut || roundFinished) {
      return;
    }
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setTimedOut(true);
          const currentQ = questions[qIndex];
          if (currentQ) {
            onRecordAnswer(currentQ.target.id, currentQ.category, false, 10000, 0);
            setRoundResponseTimes((times) => [...times, 10000]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [mode, timedMode, selectedId, timedOut, roundFinished, questions, qIndex, onRecordAnswer]);

  // Word Builder auto-play sequence timer
  const activeChallenge = builderPool[builderIdx % builderPool.length] ?? WORD_CHALLENGES[0];
  const activeWord = activeChallenge.word;
  const builderTiles = useMemo(() => buildLetterTileBank(activeWord), [activeWord]);

  useEffect(() => {
    if (mode !== 'builder' || !isPlayingSeq || builderStatus !== 'idle') {
      return;
    }
    const interval = window.setInterval(() => {
      setLetterStep((prev) => (prev + 1) % activeWord.length);
    }, seqSpeedMs);
    return () => window.clearInterval(interval);
  }, [mode, isPlayingSeq, seqSpeedMs, activeWord, builderStatus]);

  const currentQuestion = questions[qIndex];
  const isAnswered = selectedId !== null || timedOut;
  const isCorrect = selectedId !== null && currentQuestion && selectedId === currentQuestion.target.id;

  const handleSelectOption = useCallback(
    (option: SignItem) => {
      if (isAnswered || !currentQuestion) return;
      const elapsed = Date.now() - questionStartRef.current;
      const correct = option.id === currentQuestion.target.id;
      setSelectedId(option.id);
      if (correct) {
        setRoundCorrect((c) => c + 1);
      }
      setRoundResponseTimes((times) => [...times, elapsed]);
      const xp = mode === 'lookalike' ? 18 : mode === 'cues' ? 15 : 12;
      onRecordAnswer(currentQuestion.target.id, currentQuestion.category, correct, elapsed, xp);
    },
    [isAnswered, currentQuestion, mode, onRecordAnswer],
  );

  const handleNextQuestion = useCallback(() => {
    if (qIndex + 1 >= questions.length) {
      const avgMs =
        roundResponseTimes.length > 0
          ? Math.round(roundResponseTimes.reduce((a, b) => a + b, 0) / roundResponseTimes.length)
          : 0;
      onCompleteSession(mode, system, questions.length, roundCorrect, avgMs);
      setRoundFinished(true);
      return;
    }
    setQIndex((idx) => idx + 1);
    setSelectedId(null);
    setTimedOut(false);
    setTimeLeft(10);
    questionStartRef.current = Date.now();
  }, [qIndex, questions.length, roundResponseTimes, onCompleteSession, mode, system, roundCorrect]);

  // Builder Handlers
  const handleBuilderPickTile = useCallback(
    (letter: string) => {
      if (builderStatus !== 'idle') return;
      setTypedLetters((prev) => {
        if (prev.length >= activeWord.length) return prev;
        return [...prev, letter];
      });
    },
    [builderStatus, activeWord.length],
  );

  const handleBuilderCheck = useCallback(() => {
    if (typedLetters.length !== activeWord.length || builderStatus !== 'idle') return;
    const elapsed = Date.now() - questionStartRef.current;
    const attempt = typedLetters.join('');
    const correct = attempt === activeWord;
    setBuilderStatus(correct ? 'correct' : 'wrong');
    setIsPlayingSeq(false);

    // Record per-letter feedback on the first mismatched letter or first letter of the word
    const mismatchIdx = activeWord.split('').findIndex((ch, idx) => typedLetters[idx] !== ch);
    const trackedLetter = getLetterSign(
      mismatchIdx >= 0 ? activeWord[mismatchIdx] : activeWord[0],
    );
    if (trackedLetter) {
      onRecordAnswer(
        trackedLetter.id,
        'letters',
        correct,
        elapsed,
        Math.max(8, 22 - builderHintsUsed * 4),
      );
    }
  }, [typedLetters, activeWord, builderStatus, onRecordAnswer, builderHintsUsed]);

  const handleBuilderNextWord = useCallback(() => {
    setBuilderIdx((i) => (i + 1) % builderPool.length);
    setLetterStep(0);
    setTypedLetters([]);
    setBuilderStatus('idle');
    setBuilderHintsUsed(0);
    setIsPlayingSeq(true);
    questionStartRef.current = Date.now();
  }, [builderPool.length]);

  const handleBuilderHint = useCallback(() => {
    if (builderStatus !== 'idle') return;
    const nextIdx = typedLetters.length;
    if (nextIdx >= activeWord.length) return;
    setTypedLetters((prev) => [...prev, activeWord[nextIdx]]);
    setLetterStep(nextIdx);
    setBuilderHintsUsed((h) => h + 1);
  }, [builderStatus, typedLetters.length, activeWord]);

  // Physical keyboard support for builder & quiz options 1-4
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (mode === 'builder') {
        if (e.key === 'Backspace') {
          setTypedLetters((prev) => prev.slice(0, -1));
        } else if (e.key === 'Enter') {
          if (builderStatus !== 'idle') {
            handleBuilderNextWord();
          } else if (typedLetters.length === activeWord.length) {
            handleBuilderCheck();
          }
        } else if (/^[a-zA-Z]$/.test(e.key) && builderStatus === 'idle') {
          handleBuilderPickTile(e.key.toUpperCase());
        }
        return;
      }

      if (!roundFinished && currentQuestion) {
        const num = Number(e.key);
        if (num >= 1 && num <= 4 && !isAnswered) {
          const opt = currentQuestion.options[num - 1];
          if (opt) handleSelectOption(opt);
        } else if (e.key === 'Enter' && isAnswered) {
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    mode,
    builderStatus,
    typedLetters.length,
    activeWord.length,
    handleBuilderCheck,
    handleBuilderNextWord,
    handleBuilderPickTile,
    roundFinished,
    currentQuestion,
    isAnswered,
    handleSelectOption,
    handleNextQuestion,
  ]);

  // ========================
  // RENDER: WORD BUILDER MODE
  // ========================
  if (mode === 'builder') {
    const currentLetterChar = activeWord[letterStep] ?? activeWord[0];
    const currentLetterSign = getLetterSign(currentLetterChar) ?? SIGN_BANK[0];
    const currentVisual = resolveVisualForSystem(currentLetterSign, system);
    const feedback = buildSignFeedback(currentLetterSign, lang, system);

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Left/Top Stage (7 cols) */}
        <div className="space-y-3 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode('full')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  viewMode === 'full'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                {t.ui.fullView}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('zoom')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  viewMode === 'zoom'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ZoomIn className="h-3.5 w-3.5" />
                {t.ui.handZoom}
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setIsPlayingSeq((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm whitespace-nowrap hover:bg-indigo-50"
              >
                {isPlayingSeq ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isPlayingSeq ? t.ui.pauseSequence : t.ui.playSequence}
              </button>
              {[
                {label: t.ui.speedSlow, ms: 1900},
                {label: t.ui.speedNormal, ms: 1350},
                {label: t.ui.speedBrisk, ms: 850},
              ].map((spd) => (
                <button
                  key={spd.ms}
                  type="button"
                  onClick={() => setSeqSpeedMs(spd.ms)}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    seqSpeedMs === spd.ms
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {spd.label}
                </button>
              ))}
            </div>
          </div>

          <SignHandStage
            visual={currentVisual}
            viewMode={viewMode}
            palmLabel={`${t.ui.palmLabel}: ${t.palmNames[currentVisual.palm]}`}
            handCountLabel={`${t.ui.stepLabel} ${letterStep + 1} / ${activeWord.length}`}
          />

          {/* Sequence stepper buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              {activeWord.split('').map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsPlayingSeq(false);
                    setLetterStep(idx);
                  }}
                  className={`h-9 min-w-[38px] rounded-lg px-2.5 text-xs font-semibold tabular-nums transition-colors ${
                    letterStep === idx
                      ? 'bg-indigo-600 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300'
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onShareLink}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 whitespace-nowrap"
            >
              <Share2 className="h-3.5 w-3.5" />
              {linkCopied ? t.ui.copiedLink : t.ui.shareLink}
            </button>
          </div>
        </div>

        {/* Right/Bottom Control Deck (5 cols) */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 lg:col-span-5">
          <div>
            <p className="text-xs font-medium text-slate-500">
              {t.modes.builder.title} · <span className="tabular-nums">{activeWord.length}</span>
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">{t.ui.promptBuilder}</h2>
          </div>

          {/* Target word letter slots */}
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
            {activeWord.split('').map((targetChar, idx) => {
              const userChar = typedLetters[idx] ?? '';
              const slotRight = builderStatus !== 'idle' && userChar === targetChar;
              const slotWrong = builderStatus === 'wrong' && userChar !== targetChar;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setIsPlayingSeq(false);
                    setLetterStep(idx);
                  }}
                  className={`flex h-12 w-11 cursor-pointer items-center justify-center rounded-lg border-2 text-lg font-bold tabular-nums transition-colors ${
                    slotRight
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : slotWrong
                        ? 'border-rose-400 bg-rose-50 text-rose-800'
                        : letterStep === idx
                          ? 'border-indigo-600 bg-white text-slate-900'
                          : 'border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  {userChar || '·'}
                </div>
              );
            })}
          </div>

          {/* Clickable tile bank */}
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
            {builderTiles.map((ch) => (
              <button
                key={ch}
                type="button"
                disabled={builderStatus !== 'idle' || typedLetters.length >= activeWord.length}
                onClick={() => handleBuilderPickTile(ch)}
                className="min-h-[44px] rounded-lg border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 transition-colors hover:border-indigo-400 hover:bg-indigo-50 disabled:opacity-45"
              >
                {ch}
              </button>
            ))}
          </div>

          {/* Action row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              disabled={builderStatus !== 'idle' || typedLetters.length === 0}
              onClick={() => setTypedLetters((p) => p.slice(0, -1))}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 whitespace-nowrap"
            >
              {t.ui.backspace}
            </button>
            <button
              type="button"
              disabled={builderStatus !== 'idle' || typedLetters.length === 0}
              onClick={() => setTypedLetters([])}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 whitespace-nowrap"
            >
              {t.ui.clearWord}
            </button>
            <button
              type="button"
              disabled={builderStatus !== 'idle' || typedLetters.length >= activeWord.length}
              onClick={handleBuilderHint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800 hover:bg-amber-100 disabled:opacity-40 whitespace-nowrap"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {t.ui.hintLetter}
            </button>
            {builderStatus === 'idle' && (
              <button
                type="button"
                disabled={typedLetters.length !== activeWord.length}
                onClick={handleBuilderCheck}
                className="ms-auto rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-40 whitespace-nowrap"
              >
                {t.ui.checkSpelling}
              </button>
            )}
          </div>

          {/* Builder Feedback */}
          {builderStatus !== 'idle' && (
            <div
              className={`space-y-3 rounded-xl border p-4 ${
                builderStatus === 'correct'
                  ? 'border-emerald-200 bg-emerald-50/70'
                  : 'border-rose-200 bg-rose-50/70'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {builderStatus === 'correct' ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-rose-600" />
                  )}
                  <span className="text-sm font-bold text-slate-900">
                    {builderStatus === 'correct' ? t.ui.correctBadge : t.ui.incorrectBadge}:{' '}
                    <span className="tracking-wider">{activeWord}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleBuilderNextWord}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 whitespace-nowrap"
                >
                  {t.ui.nextQuestion}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs leading-relaxed text-slate-700">
                <strong className="font-semibold text-slate-900">
                  {currentLetterChar} — {t.ui.whatToLookFor}:
                </strong>{' '}
                {feedback.keyFeature}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ========================
  // RENDER: ROUND COMPLETE SUMMARY
  // ========================
  if (roundFinished) {
    const accuracy = Math.round((roundCorrect / Math.max(1, questions.length)) * 100);
    const avgSec =
      roundResponseTimes.length > 0
        ? (
            roundResponseTimes.reduce((a, b) => a + b, 0) /
            roundResponseTimes.length /
            1000
          ).toFixed(1)
        : '0.0';

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <div className="mx-auto max-w-md space-y-5">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h2 className="text-2xl font-bold text-slate-900">{t.ui.roundComplete}</h2>
          <div className="grid grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-xs text-slate-500">{t.ui.roundScore}</p>
              <p className="mt-1 text-xl font-bold text-slate-900 tabular-nums">{accuracy}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{t.ui.correctBadge}</p>
              <p className="mt-1 text-xl font-bold text-emerald-700 tabular-nums">
                {roundCorrect}/{questions.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{t.stats.avgSpeed}</p>
              <p className="mt-1 text-xl font-bold text-slate-900 tabular-nums">
                {avgSec}
                {t.stats.secondsUnit}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => startFreshRound(mode, spotterFilter)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <RotateCcw className="h-4 w-4" />
            {t.ui.startNewRound}
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  // ========================
  // RENDER: QUIZ MODES (SPOTTER / LOOKALIKE / CUES / REVIEW)
  // ========================
  const target = currentQuestion.target;
  const targetVisual = resolveVisualForSystem(target, system);
  const feedback = buildSignFeedback(target, lang, system);
  const selectedItem = selectedId ? getSignById(selectedId) : undefined;

  const promptText =
    mode === 'lookalike'
      ? t.ui.promptLookalike
      : mode === 'cues'
        ? t.ui.promptCues
        : mode === 'review'
          ? t.ui.promptReview
          : t.ui.promptIdentifySign;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
      {/* Left/Top Stage (7 cols) */}
      <div className="space-y-3 lg:col-span-7">
        {/* Stage Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setViewMode('full')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                viewMode === 'full'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              {t.ui.fullView}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('zoom')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                viewMode === 'zoom'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ZoomIn className="h-3.5 w-3.5" />
              {t.ui.handZoom}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {mode === 'spotter' && (
              <>
                <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                  {(
                    [
                      {id: 'all', label: t.ui.filterAll},
                      {id: 'letters', label: t.ui.filterLetters},
                      {id: 'numbers', label: t.ui.filterNumbers},
                    ] as const
                  ).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSpotterFilter(f.id)}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                        spotterFilter === f.id
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setTimedMode((prev) => !prev);
                    setTimeLeft(10);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    timedMode
                      ? 'border-amber-300 bg-amber-50 text-amber-800'
                      : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {timedMode ? `${t.ui.timedMode} · ${timeLeft}s` : t.ui.untimedMode}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onShareLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-700 whitespace-nowrap"
            >
              <Share2 className="h-3.5 w-3.5" />
              {linkCopied ? t.ui.copiedLink : t.ui.shareLink}
            </button>
          </div>
        </div>

        <SignHandStage
          visual={targetVisual}
          viewMode={viewMode}
          palmLabel={`${t.ui.palmLabel}: ${t.palmNames[targetVisual.palm]}`}
          handCountLabel={
            targetVisual.twoHanded ? t.ui.twoHandedLabel : t.ui.oneHandedLabel
          }
          nonManualLabel={
            targetVisual.nonManual && targetVisual.nonManual !== 'neutral'
              ? `${t.ui.nonManualLabel}: ${t.nonManualNames[targetVisual.nonManual]}`
              : undefined
          }
        />
      </div>

      {/* Right/Bottom Control & Answer Deck (5 cols) */}
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 lg:col-span-5">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-700">
            {t.modes[mode].title}
          </span>
          <span className="font-semibold tabular-nums text-slate-700">
            {qIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress hairline */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-indigo-600 transition-all duration-200"
            style={{width: `${((qIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`}}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold leading-snug text-slate-900">{promptText}</h2>
          {target.category === 'cues' && (
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
              {getCueScenario(target, lang)}
            </p>
          )}
        </div>

        {/* 4 Answer Options */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {currentQuestion.options.map((opt, idx) => {
            const label = getSignDisplayLabel(opt, lang);
            const isThisSelected = selectedId === opt.id;
            const isThisTarget = opt.id === target.id;

            let btnStyle =
              'border-slate-200 bg-white text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50';
            if (isAnswered) {
              if (isThisTarget) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900';
              } else if (isThisSelected && !isThisTarget) {
                btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
              } else {
                btnStyle = 'border-slate-200 bg-slate-50 text-slate-400';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`flex min-h-[48px] items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-start text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${btnStyle}`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-current/20 text-xs tabular-nums opacity-75">
                    {idx + 1}
                  </span>
                  <span>{label}</span>
                </span>
                {isAnswered && isThisTarget && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                )}
                {isAnswered && isThisSelected && !isThisTarget && (
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                )}
              </button>
            );
          })}
        </div>

        {!isAnswered && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              <SkipForward className="h-3.5 w-3.5" />
              {t.ui.skipQuestion}
            </button>
          </div>
        )}

        {/* Immediate Educational Feedback */}
        {isAnswered && (
          <div
            className={`space-y-3 rounded-xl border p-4 ${
              isCorrect
                ? 'border-emerald-200 bg-emerald-50/70'
                : 'border-amber-200 bg-amber-50/70'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-700" />
                )}
                <span className="text-sm font-bold text-slate-900">
                  {isCorrect
                    ? t.ui.correctBadge
                    : timedOut
                      ? t.ui.timeoutBadge
                      : t.ui.incorrectBadge}
                  {' · '}
                  {getSignDisplayLabel(target, lang)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 whitespace-nowrap"
              >
                {t.ui.nextQuestion}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-slate-700">
              <p>
                <strong className="font-semibold text-slate-900">{t.ui.whatToLookFor}:</strong>{' '}
                {feedback.keyFeature}
              </p>
              <p>
                <strong className="font-semibold text-slate-900">
                  {t.ui.differenceVsSimilar}:
                </strong>{' '}
                {feedback.differenceTip}
              </p>
              <p>
                <strong className="font-semibold text-slate-900">{t.ui.mistakeToAvoid}:</strong>{' '}
                {feedback.mistakeTip}
              </p>
              {feedback.systemNote && (
                <p className="rounded-md border border-indigo-200 bg-indigo-50/80 px-2.5 py-1.5 text-indigo-900">
                  <strong className="font-semibold">{t.ui.systemNoteLabel}:</strong>{' '}
                  {feedback.systemNote}
                </p>
              )}
            </div>

            {/* Side-by-side comparison when wrong in Lookalike / Spotter / Review */}
            {!isCorrect && selectedItem && selectedItem.id !== target.id && (
              <div className="pt-2">
                <p className="mb-2 text-xs font-semibold text-slate-700">
                  {t.ui.compareSideBySide}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <SignHandThumb
                    visual={resolveVisualForSystem(selectedItem, system)}
                    label={`${t.ui.yourPick}: ${getSignDisplayLabel(selectedItem, lang)}`}
                  />
                  <SignHandThumb
                    visual={targetVisual}
                    label={`${t.ui.correctSign}: ${getSignDisplayLabel(target, lang)}`}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
