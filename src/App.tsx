import React, {useCallback, useEffect, useState} from 'react';
import {Globe, Hand} from 'lucide-react';
import {AdSlot} from './components/AdSlot';
import {EditorialSeoSection} from './components/EditorialSeoSection';
import {ProgressPanel} from './components/ProgressPanel';
import {RecommendedResources} from './components/RecommendedResources';
import {TrainingArena} from './components/TrainingArena';
import {SUPPORTED_LANGUAGES, TRANSLATIONS} from './i18n/translations';
import type {LangCode, SignCategory, SignSystem, TrainingMode, UserProgress} from './types/sign';
import {updateDocumentSeo} from './utils/seo';
import {
  clearProgress,
  getBlindSpotItemIds,
  loadProgress,
  loadSavedLang,
  recordAnswerProgress,
  recordCompletedSession,
  saveSavedLang,
} from './utils/storage';

const VALID_LANGS = new Set<LangCode>(SUPPORTED_LANGUAGES.map((l) => l.code));
const VALID_MODES = new Set<TrainingMode>(['spotter', 'builder', 'lookalike', 'cues', 'review']);
const VALID_SYSTEMS = new Set<SignSystem>(['asl', 'lse', 'isl']);

function resolveInitialLang(): LangCode {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang')?.toLowerCase() as LangCode | undefined;
  if (urlLang && VALID_LANGS.has(urlLang)) {
    return urlLang;
  }
  const saved = loadSavedLang() as LangCode | null;
  if (saved && VALID_LANGS.has(saved)) {
    return saved;
  }
  const navLang = window.navigator.language?.slice(0, 2).toLowerCase() as LangCode | undefined;
  if (navLang && VALID_LANGS.has(navLang)) {
    return navLang;
  }
  return 'en';
}

function resolveInitialMode(): TrainingMode {
  if (typeof window === 'undefined') return 'spotter';
  const params = new URLSearchParams(window.location.search);
  const urlMode = params.get('mode')?.toLowerCase() as TrainingMode | undefined;
  if (urlMode && VALID_MODES.has(urlMode)) {
    return urlMode;
  }
  return 'spotter';
}

function resolveInitialSystem(): SignSystem {
  if (typeof window === 'undefined') return 'asl';
  const params = new URLSearchParams(window.location.search);
  const urlSys = params.get('system')?.toLowerCase() as SignSystem | undefined;
  if (urlSys && VALID_SYSTEMS.has(urlSys)) {
    return urlSys;
  }
  return 'asl';
}

export default function App() {
  const [lang, setLang] = useState<LangCode>(resolveInitialLang);
  const [mode, setMode] = useState<TrainingMode>(resolveInitialMode);
  const [system, setSystem] = useState<SignSystem>(resolveInitialSystem);
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [linkCopied, setLinkCopied] = useState(false);

  const t = TRANSLATIONS[lang];
  const blindSpotIds = getBlindSpotItemIds(progress, 8);

  // Sync URL query params and dynamic technical SEO tags
  useEffect(() => {
    saveSavedLang(lang);

    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);
    url.searchParams.set('lang', lang);
    url.searchParams.set('system', system);
    window.history.replaceState({}, '', url.toString());

    const modeTitle =
      mode === 'spotter'
        ? t.seo.title
        : `${t.modes[mode].title} — SignCue Trainer`;

    updateDocumentSeo({
      lang,
      dir: t.dir,
      mode,
      title: modeTitle,
      description: t.seo.description,
      faqItems: t.editorial.faqItems,
    });
  }, [lang, mode, system, t]);

  const handleRecordAnswer = useCallback(
    (
      itemId: string,
      category: SignCategory,
      isCorrect: boolean,
      responseMs: number,
      xpGain: number,
    ) => {
      setProgress((prev) =>
        recordAnswerProgress(prev, itemId, category, isCorrect, responseMs, xpGain),
      );
    },
    [],
  );

  const handleCompleteSession = useCallback(
    (
      sessionMode: TrainingMode,
      sessionSystem: SignSystem,
      total: number,
      correct: number,
      avgMs: number,
    ) => {
      setProgress((prev) =>
        recordCompletedSession(prev, sessionMode, sessionSystem, total, correct, avgMs),
      );
    },
    [],
  );

  const handleResetProgress = useCallback(() => {
    setProgress(clearProgress());
  }, []);

  const handleLaunchBlindSpotDrill = useCallback(() => {
    setMode('review');
    document.getElementById('practice')?.scrollIntoView({behavior: 'smooth'});
  }, []);

  const handleShareLink = useCallback(() => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${mode}&lang=${lang}&system=${system}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setLinkCopied(true);
        window.setTimeout(() => setLinkCopied(false), 2200);
      }).catch(() => {});
    }
  }, [mode, lang, system]);

  const primaryModes: TrainingMode[] = ['spotter', 'builder', 'lookalike', 'cues'];

  return (
    <div dir={t.dir} className="min-h-screen bg-slate-50 text-slate-900">
      {/* 3-Zone Top Bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#practice"
            className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            <Hand className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <span>SignCue Trainer</span>
          </a>

          {/* Zone 2: Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
          >
            <a
              href="#practice"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline"
            >
              {t.nav.practice}
            </a>
            <a
              href="#progress"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline"
            >
              {t.nav.progress}
            </a>
            <a
              href="#guide"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline"
            >
              {t.nav.guide}
            </a>
            <a
              href="#faq"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline"
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* Zone 3: Language Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <Globe className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <label htmlFor="ui-lang-select" className="sr-only">
              {t.nav.languageLabel}
            </label>
            <select
              id="ui-lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value as LangCode)}
              aria-label={t.nav.languageLabel}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        {/* Hero Headline & Sign System Selector */}
        <section id="practice" className="space-y-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-2">
              <h1 className="text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {t.seo.h1}
              </h1>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {t.seo.subtitle}
              </p>
            </div>

            {/* Clean inline metrics summary (zero pills) */}
            <div className="flex items-center gap-3 text-xs font-medium text-slate-600 shrink-0">
              <span>
                {t.stats.xp}:{' '}
                <strong className="font-bold text-slate-900 tabular-nums">{progress.xp}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {t.stats.streak}:{' '}
                <strong className="font-bold text-emerald-700 tabular-nums">
                  {progress.streak}
                </strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {t.stats.accuracy}:{' '}
                <strong className="font-bold text-indigo-700 tabular-nums">
                  {progress.totalAnswered > 0
                    ? `${Math.round((progress.totalCorrect / progress.totalAnswered) * 100)}%`
                    : '—'}
                </strong>
              </span>
            </div>
          </div>

          {/* Sign Language System Selector (distinct from UI language) */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">{t.systems.label}:</span>
                <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                  {(
                    [
                      {id: 'asl', label: t.systems.asl},
                      {id: 'lse', label: t.systems.lse},
                      {id: 'isl', label: t.systems.isl},
                    ] as const
                  ).map((sys) => (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => setSystem(sys.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                        system === sys.id
                          ? 'bg-white text-indigo-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {sys.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="max-w-xl text-xs leading-relaxed text-slate-500">
                {t.systems.notice}
              </p>
            </div>
          </div>

          {/* 4-Mode + Blind Spots Segmented Tabs */}
          <div
            role="tablist"
            aria-label="Training modes"
            className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5"
          >
            {primaryModes.map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex flex-col items-start rounded-xl border p-3.5 text-start transition-colors ${
                    active
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <span className="text-xs font-bold whitespace-nowrap">{t.modes[m].short}</span>
                  <span
                    className={`mt-1 line-clamp-2 text-[11px] leading-snug ${
                      active ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    {t.modes[m].desc}
                  </span>
                </button>
              );
            })}

            <button
              role="tab"
              aria-selected={mode === 'review'}
              type="button"
              onClick={() => setMode('review')}
              className={`col-span-2 flex flex-col items-start rounded-xl border p-3.5 text-start transition-colors sm:col-span-4 lg:col-span-1 ${
                mode === 'review'
                  ? 'border-amber-600 bg-amber-600 text-white'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-amber-400'
              }`}
            >
              <span className="text-xs font-bold whitespace-nowrap">
                {t.modes.review.short} ({blindSpotIds.length})
              </span>
              <span
                className={`mt-1 line-clamp-2 text-[11px] leading-snug ${
                  mode === 'review' ? 'text-amber-50' : 'text-slate-500'
                }`}
              >
                {t.modes.review.desc}
              </span>
            </button>
          </div>

          {/* Core Interactive Training Stage */}
          <TrainingArena
            lang={lang}
            system={system}
            mode={mode}
            blindSpotIds={blindSpotIds}
            onRecordAnswer={handleRecordAnswer}
            onCompleteSession={handleCompleteSession}
            onShareLink={handleShareLink}
            linkCopied={linkCopied}
          />
        </section>

        {/* Progress & Blind Spots Dashboard */}
        <ProgressPanel
          lang={lang}
          progress={progress}
          onLaunchBlindSpotDrill={handleLaunchBlindSpotDrill}
          onResetProgress={handleResetProgress}
        />

        {/* Media.net Ad Placement 1 (Between Training Tool and Editorial SEO) */}
        <AdSlot
          slotId="medianet-mid-leaderboard"
          size="728x90"
          label={t.monetization.adLabel}
          note={t.monetization.adPlaceholderNote}
        />

        {/* Contextual Affiliate Study Resources */}
        <RecommendedResources lang={lang} />

        {/* Rich Multilingual SEO Guide & Collapsible FAQ */}
        <EditorialSeoSection lang={lang} />

        {/* Media.net Ad Placement 2 (Bottom of Page) */}
        <AdSlot
          slotId="medianet-bottom-leaderboard"
          size="728x90"
          label={t.monetization.adLabel}
          note={t.monetization.adPlaceholderNote}
        />
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl space-y-3 px-4 sm:px-6">
          <p className="text-sm leading-relaxed text-slate-700">{t.footer.disclaimer}</p>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>SignCue Trainer</span>
            <span>{t.footer.localPrivacy}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
