import React, {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {TRANSLATIONS} from '../i18n/translations';
import type {LangCode} from '../types/sign';

interface EditorialSeoSectionProps {
  lang: LangCode;
}

export const EditorialSeoSection: React.FC<EditorialSeoSectionProps> = ({lang}) => {
  const t = TRANSLATIONS[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-8">
      {/* Study Guide Editorial Article */}
      <article
        id="guide"
        aria-labelledby="guide-heading"
        className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <header className="max-w-3xl border-b border-slate-200 pb-5">
          <h2 id="guide-heading" className="text-2xl font-bold tracking-tight text-slate-900">
            {t.editorial.guideHeading}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            {t.editorial.guideLead}
          </p>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.editorial.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">{section.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{section.body}</p>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>

      {/* Interactive Collapsible FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          {t.editorial.faqHeading}
        </h2>

        <div className="mt-5 divide-y divide-slate-200 border-t border-slate-200">
          {t.editorial.faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={item.question} className="py-4">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-start text-base font-semibold text-slate-900 hover:text-indigo-700"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
