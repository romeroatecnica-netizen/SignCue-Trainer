import React, {useState} from 'react';
import {AlertTriangle, Award, Flame, RotateCcw, Target, Timer, TrendingUp} from 'lucide-react';
import {getSignById} from '../data/signBank';
import {getSignDisplayLabel} from '../i18n/cueNotes';
import {TRANSLATIONS} from '../i18n/translations';
import type {LangCode, SignCategory, UserProgress} from '../types/sign';
import {getBlindSpotItemIds} from '../utils/storage';

interface ProgressPanelProps {
  lang: LangCode;
  progress: UserProgress;
  onLaunchBlindSpotDrill: () => void;
  onResetProgress: () => void;
}

const CATEGORIES: SignCategory[] = ['letters', 'numbers', 'lookalike', 'cues'];

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  lang,
  progress,
  onLaunchBlindSpotDrill,
  onResetProgress,
}) => {
  const t = TRANSLATIONS[lang];
  const [confirmingReset, setConfirmingReset] = useState(false);

  const accuracyPct =
    progress.totalAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
      : 0;

  const avgSec =
    progress.totalAnswered > 0
      ? (progress.totalResponseMs / progress.totalAnswered / 1000).toFixed(1)
      : '0.0';

  const blindSpotIds = getBlindSpotItemIds(progress, 6);

  const rankedCategories = CATEGORIES.map((cat) => {
    const stat = progress.categories[cat];
    const acc = stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : null;
    return {cat, attempts: stat.attempts, acc};
  });

  const strongest = rankedCategories
    .filter((c) => c.attempts >= 2 && c.acc !== null)
    .sort((a, b) => (b.acc ?? 0) - (a.acc ?? 0))[0];

  return (
    <section
      id="progress"
      aria-labelledby="progress-heading"
      className="rounded-xl border border-slate-200 bg-white p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          <h2 id="progress-heading" className="text-xl font-bold text-slate-900">
            {t.stats.heading}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-rose-300 hover:text-rose-700 whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t.stats.resetStats}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmingReset(false);
                }}
                className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 whitespace-nowrap"
              >
                {t.stats.confirmReset}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 whitespace-nowrap"
              >
                {t.stats.cancelReset}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 5 KPI Summary Strip */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Award className="h-3.5 w-3.5 text-indigo-600" />
            <span>{t.stats.xp}</span>
          </div>
          <p className="mt-1 text-xl font-bold text-slate-900 tabular-nums">{progress.xp}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Flame className="h-3.5 w-3.5 text-amber-600" />
            <span>{t.stats.streak}</span>
          </div>
          <p className="mt-1 text-xl font-bold text-slate-900 tabular-nums">{progress.streak}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Flame className="h-3.5 w-3.5 text-slate-500" />
            <span>{t.stats.bestStreak}</span>
          </div>
          <p className="mt-1 text-xl font-bold text-slate-900 tabular-nums">{progress.bestStreak}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Target className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t.stats.accuracy}</span>
          </div>
          <p className="mt-1 text-xl font-bold text-slate-900 tabular-nums">{accuracyPct}%</p>
        </div>
        <div className="col-span-2 rounded-lg border border-slate-200 bg-slate-50 p-3.5 sm:col-span-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Timer className="h-3.5 w-3.5 text-indigo-600" />
            <span>{t.stats.avgSpeed}</span>
          </div>
          <p className="mt-1 text-xl font-bold text-slate-900 tabular-nums">
            {avgSec}
            {t.stats.secondsUnit}
          </p>
        </div>
      </div>

      {/* Category Accuracy & Blind Spots Split */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-7">
          <h3 className="text-sm font-semibold text-slate-900">{t.stats.categoryBreakdown}</h3>
          <div className="space-y-3">
            {rankedCategories.map(({cat, attempts, acc}) => (
              <div key={cat} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{t.categories[cat]}</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {acc !== null ? `${acc}% (${attempts})` : '—'}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full transition-all duration-200 ${
                      acc === null
                        ? 'bg-slate-200'
                        : acc >= 80
                          ? 'bg-emerald-600'
                          : acc >= 55
                            ? 'bg-indigo-600'
                            : 'bg-amber-600'
                    }`}
                    style={{width: `${acc ?? 0}%`}}
                  />
                </div>
              </div>
            ))}
          </div>

          {strongest ? (
            <p className="pt-1 text-xs text-slate-600">
              <strong className="font-semibold text-emerald-700">{t.stats.strengthsTitle}:</strong>{' '}
              {t.categories[strongest.cat]} ({strongest.acc}%)
            </p>
          ) : (
            <p className="pt-1 text-xs text-slate-500">{t.stats.noDataYet}</p>
          )}
        </div>

        {/* Blind Spots Focus Box */}
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-span-5">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-slate-900">{t.stats.blindSpotsTitle}</h3>
            </div>
            {blindSpotIds.length === 0 ? (
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {t.stats.noBlindSpots}
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {blindSpotIds.map((id) => {
                  const sign = getSignById(id);
                  const stat = progress.items[id];
                  if (!sign || !stat) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                    >
                      <span className="truncate font-semibold text-slate-900">
                        {getSignDisplayLabel(sign, lang)}
                      </span>
                      <span className="shrink-0 font-medium text-amber-700 tabular-nums">
                        {stat.misses} {t.stats.missesLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onLaunchBlindSpotDrill}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700"
          >
            <Target className="h-4 w-4" />
            {t.stats.practiceBlindSpots}
          </button>
        </div>
      </div>

      {/* Recent Sessions */}
      {progress.sessions.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-4">
          <h3 className="text-xs font-semibold text-slate-700">{t.stats.recentSessions}</h3>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {progress.sessions.slice(0, 5).map((s) => {
              const pct = Math.round((s.correct / Math.max(1, s.total)) * 100);
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
                >
                  <span className="font-medium text-slate-900">{t.modes[s.mode].short}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-indigo-700 tabular-nums">{pct}%</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums text-slate-500">
                    {(s.avgMs / 1000).toFixed(1)}
                    {t.stats.secondsUnit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
