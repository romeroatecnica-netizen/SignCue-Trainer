import React from 'react';
import {BookOpen, ExternalLink} from 'lucide-react';
import {TRANSLATIONS} from '../i18n/translations';
import type {LangCode} from '../types/sign';

interface RecommendedResourcesProps {
  lang: LangCode;
}

export const RecommendedResources: React.FC<RecommendedResourcesProps> = ({lang}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section
      aria-labelledby="resources-heading"
      className="rounded-xl border border-slate-200 bg-white p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          <h2 id="resources-heading" className="text-lg font-bold text-slate-900">
            {t.monetization.resourcesHeading}
          </h2>
        </div>
        <p className="text-xs text-slate-500">{t.monetization.resourcesDisclosure}</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.monetization.resources.map((item) => (
          <article
            key={item.title}
            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50/70 p-4"
          >
            <div>
              <p className="text-xs font-medium text-indigo-700">{item.category}</p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
            </div>
            <div className="mt-4 pt-2">
              <a
                href={item.href}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                <span>{item.cta}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
