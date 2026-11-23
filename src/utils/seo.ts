import type {LangCode, TrainingMode} from '../types/sign';
import {SUPPORTED_LANGUAGES} from '../i18n/translations';

interface SeoPayload {
  lang: LangCode;
  dir: 'ltr' | 'rtl';
  mode: TrainingMode;
  title: string;
  description: string;
  faqItems: Array<{question: string; answer: string}>;
}

function setMetaContent(selector: string, content: string): void {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

export function updateDocumentSeo(payload: SeoPayload): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = payload.lang;
  document.documentElement.dir = payload.dir;
  document.title = payload.title;

  setMetaContent('meta[name="description"]', payload.description);
  setMetaContent('meta[property="og:title"]', payload.title);
  setMetaContent('meta[property="og:description"]', payload.description);
  setMetaContent('meta[name="twitter:title"]', payload.title);
  setMetaContent('meta[name="twitter:description"]', payload.description);

  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const cleanBase = `${origin}${pathname}`;
  const currentUrl = `${cleanBase}?mode=${encodeURIComponent(payload.mode)}&lang=${encodeURIComponent(payload.lang)}`;

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', currentUrl);

  setMetaContent('meta[property="og:url"]', currentUrl);

  // Sync hreflang links for all 10 languages + x-default
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => {
    const code = node.getAttribute('hreflang');
    if (code === 'x-default') {
      node.setAttribute('href', `${cleanBase}?mode=${encodeURIComponent(payload.mode)}&lang=en`);
    } else if (code) {
      node.setAttribute('href', `${cleanBase}?mode=${encodeURIComponent(payload.mode)}&lang=${code}`);
    }
  });

  // Ensure all supported languages have an alternate link
  SUPPORTED_LANGUAGES.forEach(({code}) => {
    if (!document.querySelector(`link[rel="alternate"][hreflang="${code}"]`)) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', code);
      link.setAttribute('href', `${cleanBase}?mode=${encodeURIComponent(payload.mode)}&lang=${code}`);
      document.head.appendChild(link);
    }
  });

  // Inject dynamic multilingual JSON-LD (SoftwareApplication + FAQPage)
  const jsonLdScript = document.getElementById('signcue-jsonld');
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'SignCue Trainer',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        inLanguage: payload.lang,
        url: currentUrl,
        description: payload.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        inLanguage: payload.lang,
        mainEntity: payload.faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  if (jsonLdScript) {
    jsonLdScript.textContent = JSON.stringify(structuredData);
  }
}
