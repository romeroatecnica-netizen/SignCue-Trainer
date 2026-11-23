import type {LangCode, SignCategory, SignSystem, TrainingMode} from '../types/sign';

export interface LanguageOption {
  code: LangCode;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {code: 'en', nativeName: 'English', dir: 'ltr'},
  {code: 'es', nativeName: 'Español', dir: 'ltr'},
  {code: 'fr', nativeName: 'Français', dir: 'ltr'},
  {code: 'de', nativeName: 'Deutsch', dir: 'ltr'},
  {code: 'pt', nativeName: 'Português', dir: 'ltr'},
  {code: 'ru', nativeName: 'Русский', dir: 'ltr'},
  {code: 'hi', nativeName: 'हिन्दी', dir: 'ltr'},
  {code: 'ar', nativeName: 'العربية', dir: 'rtl'},
  {code: 'zh', nativeName: '中文', dir: 'ltr'},
  {code: 'ja', nativeName: '日本語', dir: 'ltr'},
];

export interface TranslationPack {
  dir: 'ltr' | 'rtl';
  seo: {
    title: string;
    description: string;
    h1: string;
    subtitle: string;
  };
  nav: {
    practice: string;
    progress: string;
    guide: string;
    faq: string;
    languageLabel: string;
  };
  systems: {
    label: string;
    asl: string;
    lse: string;
    isl: string;
    notice: string;
  };
  modes: Record<TrainingMode, {title: string; short: string; desc: string}>;
  categories: Record<SignCategory, string>;
  ui: {
    fullView: string;
    handZoom: string;
    timedMode: string;
    untimedMode: string;
    filterAll: string;
    filterLetters: string;
    filterNumbers: string;
    promptIdentifySign: string;
    promptLookalike: string;
    promptBuilder: string;
    promptCues: string;
    promptReview: string;
    correctBadge: string;
    incorrectBadge: string;
    timeoutBadge: string;
    nextQuestion: string;
    skipQuestion: string;
    roundComplete: string;
    roundScore: string;
    startNewRound: string;
    whatToLookFor: string;
    differenceVsSimilar: string;
    mistakeToAvoid: string;
    systemNoteLabel: string;
    compareSideBySide: string;
    yourPick: string;
    correctSign: string;
    playSequence: string;
    pauseSequence: string;
    speedSlow: string;
    speedNormal: string;
    speedBrisk: string;
    stepLabel: string;
    clearWord: string;
    backspace: string;
    hintLetter: string;
    checkSpelling: string;
    shareLink: string;
    copiedLink: string;
    nonManualLabel: string;
    palmLabel: string;
    twoHandedLabel: string;
    oneHandedLabel: string;
  };
  nonManualNames: {
    neutral: string;
    'brow-raise': string;
    'brow-furrow': string;
    'head-nod': string;
    'head-shake': string;
    'warm-smile': string;
  };
  palmNames: {
    front: string;
    back: string;
    'side-in': string;
    'side-out': string;
    down: string;
    up: string;
  };
  stats: {
    heading: string;
    xp: string;
    streak: string;
    bestStreak: string;
    accuracy: string;
    avgSpeed: string;
    secondsUnit: string;
    categoryBreakdown: string;
    strengthsTitle: string;
    blindSpotsTitle: string;
    noDataYet: string;
    noBlindSpots: string;
    practiceBlindSpots: string;
    recentSessions: string;
    resetStats: string;
    confirmReset: string;
    cancelReset: string;
    missesLabel: string;
  };
  monetization: {
    adLabel: string;
    adPlaceholderNote: string;
    resourcesHeading: string;
    resourcesDisclosure: string;
    resources: Array<{
      title: string;
      category: string;
      summary: string;
      cta: string;
      href: string;
    }>;
  };
  editorial: {
    guideHeading: string;
    guideLead: string;
    sections: Array<{title: string; body: string; bullets: string[]}>;
    faqHeading: string;
    faqItems: Array<{question: string; answer: string}>;
  };
  footer: {
    disclaimer: string;
    localPrivacy: string;
  };
}

export const TRANSLATIONS: Record<LangCode, TranslationPack> = {
  en: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — Sign Language Alphabet & Everyday Cues Quiz',
      description:
        'Practice sign language fingerspelling A-Z, numbers 0-10, lookalike handshape lab, and everyday non-manual cues 100% locally in your browser.',
      h1: 'Sign Language Trainer & Fingerspelling Quiz',
      subtitle:
        'Interactive visual practice for fingerspelling, numbers, lookalike handshapes, and everyday communication cues — private and instant in your browser.',
    },
    nav: {
      practice: 'Practice',
      progress: 'Progress',
      guide: 'Study Guide',
      faq: 'FAQ',
      languageLabel: 'Interface language',
    },
    systems: {
      label: 'Sign Reference System',
      asl: 'ASL (American Sign Language)',
      lse: 'LSE (Spanish Sign Language)',
      isl: 'International / Handshape Drill',
      notice:
        'Each sign language is a distinct natural language with its own grammar, regional signs, and non-manual facial cues. Changing the interface language translates the app, not the sign system.',
    },
    modes: {
      spotter: {
        title: 'Fingerspelling & Numbers Spotter',
        short: 'Spotter A–Z & 0–10',
        desc: 'Identify single-hand letters and numbers at your own pace or under a 10-second drill timer.',
      },
      builder: {
        title: 'Word Spelling Builder',
        short: 'Word Builder',
        desc: 'Read chained fingerspelling sequences letter by letter and reconstruct the target word.',
      },
      lookalike: {
        title: 'Lookalike Handshape Lab',
        short: 'Lookalike Lab',
        desc: 'Sharpen visual precision on easily confused handshapes like M vs N, U vs V vs R, or F vs 9.',
      },
      cues: {
        title: 'Everyday Cues & Context',
        short: 'Everyday Cues',
        desc: 'Match real-life greetings, requests, and non-manual eyebrow/head markers to their sign.',
      },
      review: {
        title: 'Blind Spots Focus Drill',
        short: 'Blind Spots',
        desc: 'Targeted practice queue built strictly from the handshapes and cues you miss most often.',
      },
    },
    categories: {
      letters: 'Fingerspelling Letters',
      numbers: 'Numbers 0–10',
      lookalike: 'Lookalike Handshapes',
      cues: 'Everyday Cues & Context',
    },
    ui: {
      fullView: 'Full View',
      handZoom: 'Hand Zoom',
      timedMode: 'Timed (10s)',
      untimedMode: 'Untimed',
      filterAll: 'All',
      filterLetters: 'Letters A–Z',
      filterNumbers: 'Numbers 0–10',
      promptIdentifySign: 'Which letter or number does this handshape show?',
      promptLookalike: 'Look closely at thumb placement and finger curl. Which sign is this?',
      promptBuilder: 'Watch the fingerspelling sequence and build the word below:',
      promptCues: 'Choose the sign and non-manual cue that fits this situation:',
      promptReview: 'Blind Spot Review — identify this sign carefully:',
      correctBadge: 'Correct',
      incorrectBadge: 'Needs Review',
      timeoutBadge: 'Time Up',
      nextQuestion: 'Next Question',
      skipQuestion: 'Skip',
      roundComplete: 'Round Complete',
      roundScore: 'Session Accuracy',
      startNewRound: 'Start New Round',
      whatToLookFor: 'What to look for on the hand',
      differenceVsSimilar: 'How it differs from lookalikes',
      mistakeToAvoid: 'Common mistake to avoid',
      systemNoteLabel: 'System note (ASL vs LSE)',
      compareSideBySide: 'Visual Comparison',
      yourPick: 'Your pick',
      correctSign: 'Target sign',
      playSequence: 'Play Sequence',
      pauseSequence: 'Pause',
      speedSlow: 'Slow',
      speedNormal: 'Normal',
      speedBrisk: 'Brisk',
      stepLabel: 'Letter',
      clearWord: 'Clear',
      backspace: 'Delete',
      hintLetter: 'Reveal Next Letter',
      checkSpelling: 'Check Word',
      shareLink: 'Share Exercise Link',
      copiedLink: 'Link Copied',
      nonManualLabel: 'Non-manual cue',
      palmLabel: 'Palm',
      twoHandedLabel: 'Two-handed sign',
      oneHandedLabel: 'One-handed sign',
    },
    nonManualNames: {
      neutral: 'Neutral attentive face',
      'brow-raise': 'Raised eyebrows (Yes/No question or polite appeal)',
      'brow-furrow': 'Furrowed brows (Wh-question or apology)',
      'head-nod': 'Affirmative head nod',
      'head-shake': 'Negative head shake',
      'warm-smile': 'Open warm facial expression',
    },
    palmNames: {
      front: 'Facing forward',
      back: 'Back of hand forward',
      'side-in': 'Sideways inward',
      'side-out': 'Sideways outward',
      down: 'Facing downward',
      up: 'Facing upward',
    },
    stats: {
      heading: 'Strengths & Blind Spots',
      xp: 'Total XP',
      streak: 'Current Streak',
      bestStreak: 'Best Streak',
      accuracy: 'Overall Accuracy',
      avgSpeed: 'Avg. Response',
      secondsUnit: 's',
      categoryBreakdown: 'Accuracy by Category',
      strengthsTitle: 'Strongest Area',
      blindSpotsTitle: 'Items to Review',
      noDataYet: 'Complete a few questions to unlock your category profile.',
      noBlindSpots: 'No recurring blind spots recorded yet — keep practicing!',
      practiceBlindSpots: 'Practice Blind Spots',
      recentSessions: 'Recent Sessions',
      resetStats: 'Reset Progress',
      confirmReset: 'Confirm Reset',
      cancelReset: 'Cancel',
      missesLabel: 'misses',
    },
    monetization: {
      adLabel: 'Sponsored Placement',
      adPlaceholderNote: 'Responsive Media.net container — fixed minimum height prevents layout shift.',
      resourcesHeading: 'Recommended Visual Study Resources',
      resourcesDisclosure: 'Affiliate & Partner Links · Transparently labeled (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'Illustrated Sign Language Pocket Dictionary',
          category: 'Visual Reference',
          summary: 'Clear multi-angle handshape illustrations and everyday vocabulary grouped by communication theme.',
          cta: 'View Resource',
          href: 'https://example.com/sign-dictionary-guide?ref=signcue',
        },
        {
          title: 'Fingerspelling Fluency & Speed Workbook',
          category: 'Practice Drills',
          summary: 'Structured reading drills focused on recognizing whole word shapes rather than isolated letters.',
          cta: 'Explore Workbook',
          href: 'https://example.com/fingerspelling-workbook?ref=signcue',
        },
        {
          title: 'Deaf-Led Everyday Conversation Course',
          category: 'Guided Video',
          summary: 'Learn natural facial grammar, spatial pacing, and regional variation directly from certified Deaf instructors.',
          cta: 'See Curriculum',
          href: 'https://example.com/deaf-led-course?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: 'Beginner Guide to Visual Sign Recognition & Fingerspelling',
      guideLead:
        'Reading fingerspelled words and recognizing handshapes smoothly is a visual pattern skill. Here is how learners build speed and accuracy without memorizing isolated static drawings.',
      sections: [
        {
          title: '1. Why Sign Languages Are Not Universal',
          body: 'A common misconception is that one global sign language exists. In reality, American Sign Language (ASL), Lengua de Signos Española (LSE), British Sign Language (BSL), and dozens of national sign languages evolved independently within Deaf communities.',
          bullets: [
            'ASL and French Sign Language share historical roots and use a mostly one-handed manual alphabet, whereas BSL uses a two-handed alphabet.',
            'Even between ASL and LSE, letters such as F, G, K, Q, and T differ noticeably in finger hook and palm orientation.',
            'Always confirm which regional sign language your local community uses before practicing vocabulary.',
          ],
        },
        {
          title: '2. Handshapes, Palm Orientation & Non-Manual Grammar',
          body: 'In natural signed communication, handshape is only one parameter. Five core parameters work together simultaneously: handshape, location, movement, palm orientation, and non-manual markers (eyebrows, head tilt, mouth morphemes).',
          bullets: [
            'Palm orientation distinguishes pairs like G vs Q or 2 vs V.',
            'Raised eyebrows mark Yes/No questions, while furrowed brows typically accompany Wh- questions (Who, What, Where, Why).',
            'A head shake paired with the sign for Understand reverses the entire phrase into "I do not understand."',
          ],
        },
        {
          title: '3. Common Fingerspelling Mistakes to Avoid',
          body: 'Beginners often focus too heavily on individual letters and lose track of chained words. Training your eye on thumb position and overall contour dramatically improves reading comprehension.',
          bullets: [
            'Confusing fist-based letters (A, S, E, T, M, N): always scan where the thumb rests first.',
            'Reading fingerspelling like a slow slideshow: practice grouping 3–5 letter silhouettes in Word Spelling Builder.',
            'Overlooking movement paths: letters like J and Z require tracing a downward curve or zigzag in space.',
          ],
        },
      ],
      faqHeading: 'Frequently Asked Questions',
      faqItems: [
        {
          question: 'Does SignCue Trainer work completely offline in my browser?',
          answer:
            'Yes. Once loaded, all handshape SVG rendering, quiz logic, and progress analytics run 100% locally in your browser using localStorage, with no backend or paid AI API calls.',
        },
        {
          question: 'Why does the app separate Interface Language from Sign Reference System?',
          answer:
            'Your spoken or written UI language (such as English, Spanish, Arabic, or Japanese) is separate from the sign language you practice (such as ASL or LSE), because sign languages are independent natural languages rather than translations of spoken words.',
        },
        {
          question: 'How does the Blind Spots mode help me improve faster?',
          answer:
            'SignCue Trainer tracks which specific handshapes and categories cause the most misses and automatically builds a targeted review round so you spend time on high-impact distinctions like M vs N or 6 vs W.',
        },
        {
          question: 'Can this tool replace classes with Deaf instructors?',
          answer:
            'No. Visual drill apps are great for fingerspelling speed and handshape recognition, but full sign fluency requires interaction, cultural context, and non-manual grammar feedback from Deaf educators and certified courses.',
        },
        {
          question: 'Can I share a specific training mode or language via URL?',
          answer:
            'Yes. URL parameters such as ?mode=lookalike&lang=en&system=asl load the exact mode, language, and sign reference system directly.',
        },
      ],
    },
    footer: {
      disclaimer:
        'Educational visual practice tool for fingerspelling, numbers, and everyday sign concepts. Sign languages are complete natural languages with regional variations and non-manual grammar; always complement practice with deaf/sign language educators and certified courses.',
      localPrivacy: '100% local browser storage · No account required',
    },
  },

  es: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — Quiz de Dactilología y Lengua de Signos',
      description:
        'Practica el reconocimiento visual del alfabeto dactilológico A-Z, números 0-10, configuraciones similares y expresiones cotidianas 100 % en tu navegador.',
      h1: 'Entrenador Visual de Lengua de Signos y Dactilología',
      subtitle:
        'Práctica interactiva de letras dactilológicas, números, diferenciación de manos y gestos cotidianos con análisis local de puntos ciegos.',
    },
    nav: {
      practice: 'Practicar',
      progress: 'Progreso',
      guide: 'Guía de estudio',
      faq: 'Preguntas',
      languageLabel: 'Idioma de interfaz',
    },
    systems: {
      label: 'Sistema de referencia',
      asl: 'ASL (Lengua de Signos Americana)',
      lse: 'LSE (Lengua de Signos Española)',
      isl: 'Internacional / Práctica visual',
      notice:
        'Cada lengua de signos es una lengua natural propia con gramática, variantes regionales y expresión no manual. El idioma de la interfaz no sustituye a la lengua de signos elegida.',
    },
    modes: {
      spotter: {
        title: 'Lectura Rápida de Letras y Números',
        short: 'Lectura A–Z y 0–10',
        desc: 'Identifica configuraciones de letras y números a tu ritmo o con temporizador opcional de 10 s.',
      },
      builder: {
        title: 'Deletreo Express y Palabras',
        short: 'Deletreo Express',
        desc: 'Lee secuencias encadenadas de dactilología letra a letra y construye la palabra completa.',
      },
      lookalike: {
        title: 'Laboratorio de Manos Similares',
        short: 'Manos Similares',
        desc: 'Afina tu discriminación visual entre signos que se confunden como M vs N, U vs V vs R o F vs 9.',
      },
      cues: {
        title: 'Situaciones y Expresión No Manual',
        short: 'Uso Cotidiano',
        desc: 'Asocia saludos, peticiones y marcadores faciales (cejas y cabeza) con su contexto comunicativo.',
      },
      review: {
        title: 'Repaso de Puntos Ciegos',
        short: 'Puntos Ciegos',
        desc: 'Ronda enfocada exclusivamente en las letras, números y signos donde más has fallado.',
      },
    },
    categories: {
      letters: 'Letras / Dactilología',
      numbers: 'Números 0–10',
      lookalike: 'Configuraciones similares',
      cues: 'Expresión cotidiana y contexto',
    },
    ui: {
      fullView: 'Vista completa',
      handZoom: 'Zoom de mano',
      timedMode: 'Con tiempo (10s)',
      untimedMode: 'Sin prisas',
      filterAll: 'Todo',
      filterLetters: 'Letras A–Z',
      filterNumbers: 'Números 0–10',
      promptIdentifySign: '¿Qué letra o número representa esta configuración manual?',
      promptLookalike: 'Observa bien el pulgar y la flexión de dedos. ¿Cuál es el signo?',
      promptBuilder: 'Observa la secuencia dactilológica y forma la palabra:',
      promptCues: 'Elige el signo y la expresión no manual adecuada para esta escena:',
      promptReview: 'Repaso de puntos ciegos — identifica este signo con precisión:',
      correctBadge: 'Correcto',
      incorrectBadge: 'Para repasar',
      timeoutBadge: 'Tiempo agotado',
      nextQuestion: 'Siguiente',
      skipQuestion: 'Saltar',
      roundComplete: 'Ronda completada',
      roundScore: 'Precisión de la ronda',
      startNewRound: 'Nueva ronda',
      whatToLookFor: 'En qué fijarse en la mano',
      differenceVsSimilar: 'Diferencia frente a signos parecidos',
      mistakeToAvoid: 'Error común a evitar',
      systemNoteLabel: 'Nota de sistema (ASL vs LSE)',
      compareSideBySide: 'Comparación visual',
      yourPick: 'Tu elección',
      correctSign: 'Signo correcto',
      playSequence: 'Reproducir secuencia',
      pauseSequence: 'Pausar',
      speedSlow: 'Lento',
      speedNormal: 'Normal',
      speedBrisk: 'Ágil',
      stepLabel: 'Letra',
      clearWord: 'Limpiar',
      backspace: 'Borrar',
      hintLetter: 'Mostrar siguiente letra',
      checkSpelling: 'Comprobar palabra',
      shareLink: 'Compartir enlace',
      copiedLink: 'Enlace copiado',
      nonManualLabel: 'Componente no manual',
      palmLabel: 'Palma',
      twoHandedLabel: 'Signo bimanual',
      oneHandedLabel: 'Signo unimanual',
    },
    nonManualNames: {
      neutral: 'Rostro atento y neutro',
      'brow-raise': 'Cejas elevadas (pregunta sí/no o petición amable)',
      'brow-furrow': 'Cejas fruncidas (pregunta abierta o disculpa)',
      'head-nod': 'Asentimiento suave de cabeza',
      'head-shake': 'Negación lateral de cabeza',
      'warm-smile': 'Expresión facial cálida y abierta',
    },
    palmNames: {
      front: 'Hacia delante',
      back: 'Dorso hacia delante',
      'side-in': 'De lado hacia dentro',
      'side-out': 'De lado hacia fuera',
      down: 'Hacia abajo',
      up: 'Hacia arriba',
    },
    stats: {
      heading: 'Puntos Fuertes y Puntos Ciegos',
      xp: 'XP Total',
      streak: 'Racha actual',
      bestStreak: 'Mejor racha',
      accuracy: 'Precisión global',
      avgSpeed: 'Tiempo medio',
      secondsUnit: 's',
      categoryBreakdown: 'Precisión por categoría',
      strengthsTitle: 'Punto fuerte',
      blindSpotsTitle: 'Puntos ciegos detectados',
      noDataYet: 'Responde unas preguntas para ver tu perfil por categoría.',
      noBlindSpots: 'Aún no hay fallos repetidos registrados. ¡Buen ritmo!',
      practiceBlindSpots: 'Repasar mis fallos',
      recentSessions: 'Historial reciente',
      resetStats: 'Reiniciar progreso',
      confirmReset: 'Confirmar reinicio',
      cancelReset: 'Cancelar',
      missesLabel: 'fallos',
    },
    monetization: {
      adLabel: 'Espacio publicitario',
      adPlaceholderNote: 'Contenedor Media.net con altura mínima reservada para evitar saltos de diseño (CLS).',
      resourcesHeading: 'Diccionarios Visuales y Recursos Recomendados',
      resourcesDisclosure: 'Enlaces de afiliado y formación · Etiquetados con transparencia (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'Diccionario Visual de Lengua de Signos',
          category: 'Referencia visual',
          summary: 'Láminas claras con orientación de palma, puntos de contacto y vocabulario cotidiano ilustrado.',
          cta: 'Ver recurso',
          href: 'https://example.com/diccionario-signos?ref=signcue',
        },
        {
          title: 'Cuaderno de Fluidez en Dactilología',
          category: 'Ejercicios prácticos',
          summary: 'Entrenamiento progresivo para leer palabras encadenadas por contorno visual sin bloquearse.',
          cta: 'Ver cuaderno',
          href: 'https://example.com/cuaderno-dactilologia?ref=signcue',
        },
        {
          title: 'Curso Guiado por Docentes Sordos',
          category: 'Formación certificada',
          summary: 'Aprende gramática espacial, expresión facial y variación regional con profesorado especialista.',
          cta: 'Ver programa',
          href: 'https://example.com/curso-docentes-sordos?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: 'Guía de Inicio al Aprendizaje Visual de Lengua de Signos',
      guideLead:
        'Leer dactilología con fluidez y distinguir configuraciones manuales requiere entrenar la percepción de detalles clave como el pulgar, la palma y el rostro.',
      sections: [
        {
          title: '1. Por qué la lengua de signos no es universal',
          body: 'No existe una única lengua de signos mundial. La Lengua de Signos Española (LSE), la Lengua de Signos Americana (ASL), la Lengua de Signos Catalana (LSC) o la Británica (BSL) son lenguas naturales independientes con historia y gramática propias.',
          bullets: [
            'La ASL y la LSE usan alfabetos mayoritariamente unimanuales, mientras que la BSL utiliza ambas manos.',
            'Letras como F, G, K, Q o T cambian de forma visible entre ASL y LSE; por eso incluimos selector de sistema.',
            'Aprender el alfabeto dactilológico sirve para nombres propios o préstamos, no equivale a dominar toda la lengua.',
          ],
        },
        {
          title: '2. Configuraciones manuales y expresión no manual',
          body: 'Un signo no es solo la posición de los dedos. Combina cinco parámetros: configuración manual, orientación de la palma, ubicación espacial, movimiento y componente no manual (cejas, cabeza y gestualidad facial).',
          bullets: [
            'Elevar las cejas marca preguntas de sí/no; fruncirlas acompaña preguntas abiertas (qué, quién, dónde).',
            'Un movimiento negativo de cabeza transforma por completo "Entiendo" en "No entiendo".',
            'La orientación de la palma diferencia al instante pares cercanos como 2 frente a V o G frente a Q.',
          ],
        },
        {
          title: '3. Errores habituales al deletrear y cómo evitarlos',
          body: 'Al empezar, es frecuente confundir puños cerrados o leer letra por letra demasiado lento. Entrenar el reconocimiento por contraste visual acelera la lectura.',
          bullets: [
            'En los puños (A, S, E, T, M, N), busca primero dónde se apoya o cruza el pulgar.',
            'En letras dinámicas como J y Z, sigue la flecha de trayectoria en el espacio.',
            'Usa el modo Deletreo Express para entrenar la lectura encadenada de palabras reales.',
          ],
        },
      ],
      faqHeading: 'Preguntas Frecuentes',
      faqItems: [
        {
          question: '¿Funciona SignCue Trainer sin conexión ni servidor externo?',
          answer:
            'Sí. Todo el motor SVG de manos, los cuatro modos de entrenamiento y el seguimiento de puntos ciegos funcionan al 100 % en local dentro de tu navegador.',
        },
        {
          question: '¿Por qué hay un selector de idioma y otro de sistema de signos?',
          answer:
            'Porque el idioma en el que lees la web (español, inglés, árabe, etc.) es independiente de la lengua de signos que practicas (LSE, ASL o práctica visual).',
        },
        {
          question: '¿Cómo detecta la herramienta mis puntos ciegos?',
          answer:
            'Guarda en localStorage tus aciertos, fallos y tiempos medios por categoría y por signo, y genera una ronda de repaso centrada en tus errores.',
        },
        {
          question: '¿Sustituye esta práctica a un curso de lengua de signos?',
          answer:
            'No. Es un complemento visual para ganar soltura con el alfabeto, números y nociones cotidianas; debe acompañarse de formación con docentes sordos y cursos certificados.',
        },
        {
          question: '¿Puedo compartir un ejercicio concreto mediante URL?',
          answer:
            'Sí. Puedes usar parámetros como ?mode=lookalike&lang=es&system=lse para abrir directamente ese modo e idioma.',
        },
      ],
    },
    footer: {
      disclaimer:
        'Herramienta educativa de práctica visual para dactilología, números y nociones cotidianas de comunicación signada. Las lenguas de signos son lenguas naturales completas con variantes regionales y gramática no manual; complementa siempre tu práctica con docentes sordos/signantes y cursos certificados.',
      localPrivacy: 'Almacenamiento 100 % local en tu navegador · Sin registro',
    },
  },

  fr: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — Quiz d’Alphabet Dactylologique & Signes',
      description:
        'Exercez la reconnaissance visuelle de l’alphabet dactylologique A-Z, des chiffres 0-10 et des signes du quotidien 100 % en local dans votre navigateur.',
      h1: 'Entraîneur Visuel de Langue des Signes & Dactylologie',
      subtitle:
        'Pratique interactive des configurations manuelles, chiffres, signes proches et indices non manuels directement dans votre navigateur.',
    },
    nav: {
      practice: 'Pratiquer',
      progress: 'Progrès',
      guide: 'Guide d’étude',
      faq: 'FAQ',
      languageLabel: 'Langue de l’interface',
    },
    systems: {
      label: 'Système de référence',
      asl: 'ASL (Langue des signes américaine)',
      lse: 'LSE (Langue des signes espagnole)',
      isl: 'International / Exercice visuel',
      notice:
        'Chaque langue des signes est une langue naturelle à part entière avec sa propre grammaire et ses expressions faciales. La langue de l’interface ne remplace pas la langue des signes pratiquée.',
    },
    modes: {
      spotter: {
        title: 'Repérage Lettres & Chiffres',
        short: 'Lettres & Chiffres',
        desc: 'Identifiez les lettres et les chiffres à votre rythme ou avec un minuteur de 10 secondes.',
      },
      builder: {
        title: 'Constructeur d’Épellation',
        short: 'Épellation de mots',
        desc: 'Lisez une séquence de signes enchaînés lettre par lettre pour reconstituer le mot.',
      },
      lookalike: {
        title: 'Laboratoire des Signes Proches',
        short: 'Signes proches',
        desc: 'Distinguez les configurations souvent confondues comme M vs N, U vs V vs R ou F vs 9.',
      },
      cues: {
        title: 'Situations & Indices Non Manuels',
        short: 'Situations clés',
        desc: 'Reliez salutations, demandes et mimiques (sourcils, tête) au contexte quotidien.',
      },
      review: {
        title: 'Révision des Points Faibles',
        short: 'Points faibles',
        desc: 'Série ciblée construite à partir des signes sur lesquels vous faites le plus d’erreurs.',
      },
    },
    categories: {
      letters: 'Dactylologie (A–Z)',
      numbers: 'Chiffres 0–10',
      lookalike: 'Configurations proches',
      cues: 'Signes du quotidien',
    },
    ui: {
      fullView: 'Vue complète',
      handZoom: 'Zoom main',
      timedMode: 'Chrono (10s)',
      untimedMode: 'Sans chrono',
      filterAll: 'Tout',
      filterLetters: 'Lettres A–Z',
      filterNumbers: 'Chiffres 0–10',
      promptIdentifySign: 'Quelle lettre ou quel chiffre cette main représente-t-elle ?',
      promptLookalike: 'Observez la position du pouce et des doigts. Quel est ce signe ?',
      promptBuilder: 'Observez la séquence dactylo et composez le mot :',
      promptCues: 'Choisissez le signe et l’indice non manuel adaptés à cette situation :',
      promptReview: 'Révision ciblée — identifiez ce signe avec attention :',
      correctBadge: 'Correct',
      incorrectBadge: 'À revoir',
      timeoutBadge: 'Temps écoulé',
      nextQuestion: 'Suivant',
      skipQuestion: 'Passer',
      roundComplete: 'Série terminée',
      roundScore: 'Précision de la série',
      startNewRound: 'Nouvelle série',
      whatToLookFor: 'Ce qu’il faut observer sur la main',
      differenceVsSimilar: 'Différence avec les signes proches',
      mistakeToAvoid: 'Erreur fréquente à éviter',
      systemNoteLabel: 'Note système (ASL vs LSE)',
      compareSideBySide: 'Comparaison visuelle',
      yourPick: 'Votre choix',
      correctSign: 'Signe attendu',
      playSequence: 'Lire la séquence',
      pauseSequence: 'Pause',
      speedSlow: 'Lent',
      speedNormal: 'Normal',
      speedBrisk: 'Rapide',
      stepLabel: 'Lettre',
      clearWord: 'Effacer',
      backspace: 'Retour',
      hintLetter: 'Révéler une lettre',
      checkSpelling: 'Vérifier le mot',
      shareLink: 'Partager le lien',
      copiedLink: 'Lien copié',
      nonManualLabel: 'Indice non manuel',
      palmLabel: 'Paume',
      twoHandedLabel: 'Signe à deux mains',
      oneHandedLabel: 'Signe à une main',
    },
    nonManualNames: {
      neutral: 'Visage neutre et attentif',
      'brow-raise': 'Sourcils levés (question fermée ou demande polie)',
      'brow-furrow': 'Sourcils froncés (question ouverte ou excuse)',
      'head-nod': 'Hochement de tête affirmatif',
      'head-shake': 'Mouvement de tête négatif',
      'warm-smile': 'Expression chaleureuse et ouverte',
    },
    palmNames: {
      front: 'Paume vers l’avant',
      back: 'Dos de la main vers l’avant',
      'side-in': 'De profil vers l’intérieur',
      'side-out': 'De profil vers l’extérieur',
      down: 'Vers le bas',
      up: 'Vers le haut',
    },
    stats: {
      heading: 'Points Forts & Points Faibles',
      xp: 'XP Total',
      streak: 'Série en cours',
      bestStreak: 'Meilleure série',
      accuracy: 'Précision globale',
      avgSpeed: 'Temps moyen',
      secondsUnit: 's',
      categoryBreakdown: 'Précision par catégorie',
      strengthsTitle: 'Point fort',
      blindSpotsTitle: 'Éléments à revoir',
      noDataYet: 'Répondez à quelques questions pour afficher votre profil.',
      noBlindSpots: 'Aucun point faible récurrent détecté pour l’instant.',
      practiceBlindSpots: 'Travailler mes erreurs',
      recentSessions: 'Sessions récentes',
      resetStats: 'Réinitialiser',
      confirmReset: 'Confirmer',
      cancelReset: 'Annuler',
      missesLabel: 'erreurs',
    },
    monetization: {
      adLabel: 'Espace sponsorisé',
      adPlaceholderNote: 'Emplacement Media.net avec hauteur minimale réservée pour éviter tout décalage.',
      resourcesHeading: 'Ressources Visuelles Recommandées',
      resourcesDisclosure: 'Liens affiliés et partenaires · Mention transparente (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'Dictionnaire Visuel de Langue des Signes',
          category: 'Référence visuelle',
          summary: 'Planches claires illustrant les configurations manuelles, l’orientation et les mouvements.',
          cta: 'Voir la ressource',
          href: 'https://example.com/dictionnaire-lsf?ref=signcue',
        },
        {
          title: 'Cahier de Lecture Dactylologique',
          category: 'Entraînement',
          summary: 'Exercices progressifs pour lire des mots complets sans s’arrêter à chaque lettre.',
          cta: 'Découvrir',
          href: 'https://example.com/cahier-dactylo?ref=signcue',
        },
        {
          title: 'Cours Dirigé par des Enseignants Sourds',
          category: 'Formation certifiée',
          summary: 'Maîtrisez la grammaire spatiale et les marqueurs faciaux avec des formateurs certifiés.',
          cta: 'Voir le programme',
          href: 'https://example.com/cours-langue-signes?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: 'Guide Débutant pour Apprendre la Dactylologie & les Signes',
      guideLead:
        'Améliorer sa lecture des mains demande d’observer simultanément le pouce, l’orientation de la paume et les indices du visage.',
      sections: [
        {
          title: '1. Pourquoi les langues des signes ne sont pas universelles',
          body: 'Il n’existe pas de langue des signes unique. L’ASL, la LSF, la LSE ou la BSL sont des langues naturelles distinctes nées au sein de communautés sourdes différentes.',
          bullets: [
            'L’ASL et la LSE utilisent principalement une main pour épeler, tandis que la BSL utilise deux mains.',
            'Les lettres comme F, G, K ou T varient entre systèmes ; vérifiez toujours la langue des signes de votre région.',
          ],
        },
        {
          title: '2. Paramètres manuels et expression non manuelle',
          body: 'Un signe combine cinq paramètres : configuration de la main, orientation de la paume, emplacement, mouvement et expression non manuelle (sourcils, hochement de tête).',
          bullets: [
            'Les sourcils levés marquent une question fermée (oui/non) ; les sourcils froncés accompagnent une question ouverte.',
            'Un mouvement négatif de la tête inverse le sens de « Comprendre » vers « Je ne comprends pas ».',
          ],
        },
        {
          title: '3. Erreurs courantes en dactylologie',
          body: 'Beaucoup de débutants confondent les poings fermés ou lisent trop lentement.',
          bullets: [
            'Pour A, S, E, T, M et N, repérez d’abord la position exacte du pouce.',
            'Suivez les tracés dynamiques pour J et Z afin de ne pas les confondre avec I ou 1.',
          ],
        },
      ],
      faqHeading: 'Questions Fréquentes',
      faqItems: [
        {
          question: 'SignCue Trainer fonctionne-t-il 100 % dans le navigateur ?',
          answer: 'Oui. Le moteur SVG, les exercices et vos statistiques locales fonctionnent sans serveur ni API externe.',
        },
        {
          question: 'Pourquoi séparer la langue de l’interface et le système de signes ?',
          answer: 'La langue des menus est distincte de la langue des signes étudiée, car chaque langue des signes possède sa propre structure.',
        },
        {
          question: 'À quoi sert le mode Points Faibles ?',
          answer: 'Il rassemble les configurations que vous manquez le plus souvent pour accélérer leur mémorisation.',
        },
        {
          question: 'Cet outil remplace-t-il un cours avec un enseignant sourd ?',
          answer: 'Non. C’est un outil d’entraînement visuel complémentaire ; un apprentissage complet nécessite des échanges réels et des cours certifiés.',
        },
        {
          question: 'Puis-je partager un exercice par lien ?',
          answer: 'Oui, via les paramètres d’URL comme ?mode=lookalike&lang=fr.',
        },
      ],
    },
    footer: {
      disclaimer:
        'Outil éducatif d’entraînement visuel pour la dactylologie, les chiffres et les notions courantes. Les langues des signes sont des langues naturelles complètes dotées de variantes régionales et d’une grammaire non manuelle ; complétez toujours votre pratique avec des enseignants sourds/signants et des cours certifiés.',
      localPrivacy: 'Stockage 100 % local dans votre navigateur · Sans compte',
    },
  },

  de: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — Fingeralphabet & Gebärden-Quiz',
      description:
        'Üben Sie visuell das Fingeralphabet A-Z, Zahlen 0-10, verwechselbare Handformen und Alltagssignale 100 % lokal im Browser.',
      h1: 'Gebärdensprach-Trainer & Fingeralphabet-Quiz',
      subtitle:
        'Interaktives visuelles Training für Fingeralphabet, Zahlen, ähnliche Handformen und non-manuelle Signale direkt im Browser.',
    },
    nav: {
      practice: 'Üben',
      progress: 'Fortschritt',
      guide: 'Lernleitfaden',
      faq: 'FAQ',
      languageLabel: 'Oberflächensprache',
    },
    systems: {
      label: 'Gebärden-Referenzsystem',
      asl: 'ASL (American Sign Language)',
      lse: 'LSE (Spanische Gebärdensprache)',
      isl: 'International / Handform-Übung',
      notice:
        'Jede Gebärdensprache ist eine eigenständige natürliche Sprache mit eigener Grammatik und Mimik. Die Menüsprache ist nicht identisch mit dem gewählten Gebärdensystem.',
    },
    modes: {
      spotter: {
        title: 'Buchstaben- & Zahlen-Scanner',
        short: 'Scanner A–Z & 0–10',
        desc: 'Erkennen Sie Handformen für Buchstaben und Zahlen in Ruhe oder mit 10-Sekunden-Timer.',
      },
      builder: {
        title: 'Wort-Buchstabier-Trainer',
        short: 'Wort-Trainer',
        desc: 'Lesen Sie verkettete Fingeralphabet-Sequenzen Buchstabe für Buchstabe und setzen Sie das Wort zusammen.',
      },
      lookalike: {
        title: 'Labor für ähnliche Handformen',
        short: 'Ähnliche Formen',
        desc: 'Schärfen Sie Ihren Blick für verwechselbare Formen wie M vs. N, U vs. V vs. R oder F vs. 9.',
      },
      cues: {
        title: 'Alltagssituationen & Mimik',
        short: 'Alltagssignale',
        desc: 'Ordnen Sie Grüße, Bitten und non-manuelle Signale (Augenbrauen, Kopfnicken) der Situation zu.',
      },
      review: {
        title: 'Schwachstellen-Fokus',
        short: 'Schwachstellen',
        desc: 'Gezielte Wiederholungsrunde nur mit Ihren bisher am häufigsten verfehlten Zeichen.',
      },
    },
    categories: {
      letters: 'Fingeralphabet A–Z',
      numbers: 'Zahlen 0–10',
      lookalike: 'Ähnliche Handformen',
      cues: 'Alltagssignale & Kontext',
    },
    ui: {
      fullView: 'Gesamtansicht',
      handZoom: 'Hand-Zoom',
      timedMode: 'Timer (10s)',
      untimedMode: 'Ohne Zeitlimit',
      filterAll: 'Alle',
      filterLetters: 'Buchstaben A–Z',
      filterNumbers: 'Zahlen 0–10',
      promptIdentifySign: 'Welcher Buchstabe oder welche Zahl wird dargestellt?',
      promptLookalike: 'Achten Sie genau auf Daumenposition und Fingerkrümmung. Welches Zeichen ist das?',
      promptBuilder: 'Verfolgen Sie die Buchstabierfolge und bilden Sie das Wort:',
      promptCues: 'Wählen Sie das passende Zeichen samt non-manualer Mimik:',
      promptReview: 'Schwachstellen-Training — erkennen Sie dieses Zeichen:',
      correctBadge: 'Richtig',
      incorrectBadge: 'Wiederholen',
      timeoutBadge: 'Zeit abgelaufen',
      nextQuestion: 'Nächste Frage',
      skipQuestion: 'Überspringen',
      roundComplete: 'Runde abgeschlossen',
      roundScore: 'Trefferquote',
      startNewRound: 'Neue Runde starten',
      whatToLookFor: 'Worauf bei der Hand achten',
      differenceVsSimilar: 'Unterschied zu ähnlichen Zeichen',
      mistakeToAvoid: 'Häufiger Fehler',
      systemNoteLabel: 'Systemhinweis (ASL vs. LSE)',
      compareSideBySide: 'Direktvergleich',
      yourPick: 'Ihre Wahl',
      correctSign: 'Zielzeichen',
      playSequence: 'Sequenz abspielen',
      pauseSequence: 'Pause',
      speedSlow: 'Langsam',
      speedNormal: 'Normal',
      speedBrisk: 'Schnell',
      stepLabel: 'Buchstabe',
      clearWord: 'Leeren',
      backspace: 'Zurück',
      hintLetter: 'Nächsten Buchstaben zeigen',
      checkSpelling: 'Wort prüfen',
      shareLink: 'Übungslink teilen',
      copiedLink: 'Link kopiert',
      nonManualLabel: 'Non-manuales Signal',
      palmLabel: 'Handfläche',
      twoHandedLabel: 'Zweihändige Gebärde',
      oneHandedLabel: 'Einhändige Gebärde',
    },
    nonManualNames: {
      neutral: 'Neutraler, aufmerksamer Gesichtsausdruck',
      'brow-raise': 'Gehobene Augenbrauen (Ja/Nein-Frage oder Bitte)',
      'brow-furrow': 'Zusammengezogene Brauen (W-Frage oder Entschuldigung)',
      'head-nod': 'Bestätigendes Kopfnicken',
      'head-shake': 'Verneinendes Kopfschütteln',
      'warm-smile': 'Freundlicher, offener Ausdruck',
    },
    palmNames: {
      front: 'Nach vorn gerichtet',
      back: 'Handrücken nach vorn',
      'side-in': 'Seitlich nach innen',
      'side-out': 'Seitlich nach außen',
      down: 'Nach unten gerichtet',
      up: 'Nach oben gerichtet',
    },
    stats: {
      heading: 'Stärken & Schwachstellen',
      xp: 'Gesamt-XP',
      streak: 'Aktuelle Serie',
      bestStreak: 'Beste Serie',
      accuracy: 'Genauigkeit',
      avgSpeed: 'Ø Antwortzeit',
      secondsUnit: 's',
      categoryBreakdown: 'Genauigkeit nach Kategorie',
      strengthsTitle: 'Stärkster Bereich',
      blindSpotsTitle: 'Häufige Fehler',
      noDataYet: 'Beantworten Sie einige Fragen, um Ihr Lernprofil zu sehen.',
      noBlindSpots: 'Derzeit keine wiederkehrenden Fehler — weiter so!',
      practiceBlindSpots: 'Schwachstellen üben',
      recentSessions: 'Letzte Runden',
      resetStats: 'Zurücksetzen',
      confirmReset: 'Bestätigen',
      cancelReset: 'Abbrechen',
      missesLabel: 'Fehler',
    },
    monetization: {
      adLabel: 'Anzeige',
      adPlaceholderNote: 'Media.net-Container mit fester Mindesthöhe gegen Layout-Verschiebungen.',
      resourcesHeading: 'Empfohlene Lernmaterialien & Wörterbücher',
      resourcesDisclosure: 'Affiliate- & Partnerlinks · Transparent gekennzeichnet (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'Illustriertes Gebärden-Handbuch',
          category: 'Visuelle Referenz',
          summary: 'Klare Darstellungen von Handformen, Handflächenorientierung und Alltagsbegriffen.',
          cta: 'Ansehen',
          href: 'https://example.com/gebaerden-woerterbuch?ref=signcue',
        },
        {
          title: 'Trainingsheft für Fingeralphabet-Lesefluss',
          category: 'Übungsbuch',
          summary: 'Strukturierte Übungen zum schnellen Erkennen ganzer Wortkonturen.',
          cta: 'Entdecken',
          href: 'https://example.com/fingeralphabet-heft?ref=signcue',
        },
        {
          title: 'Zertifizierter Kurs mit tauben Dozierenden',
          category: 'Videokurs',
          summary: 'Lernen Sie räumliche Grammatik, Mimik und regionale Varianten aus erster Hand.',
          cta: 'Kurs ansehen',
          href: 'https://example.com/gebaerdenkurs?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: 'Einsteiger-Leitfaden für Gebärdenerkennung & Fingeralphabet',
      guideLead:
        'Flüssiges Lesen von Fingeralphabet beruht auf schnellem Mustererkennen von Daumenlage, Handfläche und begleitender Mimik.',
      sections: [
        {
          title: '1. Warum Gebärdensprachen nicht universell sind',
          body: 'ASL, DGS, LSE und BSL sind eigenständige natürliche Sprachen mit jeweils eigener Geschichte und Grammatik.',
          bullets: [
            'ASL und LSE nutzen vorwiegend einhändige Fingeralphabete, BSL dagegen ein zweihändiges.',
            'Selbst zwischen ASL und LSE unterscheiden sich Buchstaben wie F, G, K und T.',
          ],
        },
        {
          title: '2. Handform, Orientierung & non-manuelle Grammatik',
          body: 'Fünf Parameter wirken zusammen: Handform, Ausführungsort, Bewegung, Handflächenorientierung und Mimik.',
          bullets: [
            'Gehobene Brauen markieren Ja/Nein-Fragen; zusammengezogene Brauen W-Fragen.',
            'Kopfschütteln kehrt "Verstehen" sofort in "Ich verstehe nicht" um.',
          ],
        },
        {
          title: '3. Typische Fehler beim Buchstabieren vermeiden',
          body: 'Achten Sie bei geschlossenen Faustformen zuerst auf den Daumen.',
          bullets: [
            'A, S, E, T, M und N unterscheiden sich primär über die Daumenposition.',
            'Trainieren Sie dynamische Bahnen bei J und Z.',
          ],
        },
      ],
      faqHeading: 'Häufig gestellte Fragen',
      faqItems: [
        {
          question: 'Läuft SignCue Trainer komplett lokal im Browser?',
          answer: 'Ja. Alle SVG-Darstellungen, Quiz-Modi und Lernstatistiken laufen ohne Server direkt lokal.',
        },
        {
          question: 'Warum sind Menüsprache und Gebärdensystem getrennt?',
          answer: 'Weil Gebärdensprachen eigenständige Sprachen sind und keine 1:1-Übersetzung gesprochener Sprachen.',
        },
        {
          question: 'Wie hilft der Schwachstellen-Modus?',
          answer: 'Er sammelt Ihre Fehlversuche und erstellt automatisch eine gezielte Wiederholungsrunde.',
        },
        {
          question: 'Ersetzt die App einen Gebärdensprachkurs?',
          answer: 'Nein. Sie ergänzt den Unterricht optimal, ersetzt aber keine Praxis mit tauben Lehrkräften.',
        },
        {
          question: 'Kann ich bestimmte Modi per URL teilen?',
          answer: 'Ja, zum Beispiel über ?mode=lookalike&lang=de.',
        },
      ],
    },
    footer: {
      disclaimer:
        'Pädagogisches visuelles Übungstool für Fingeralphabet, Zahlen und alltägliche Gebärdenkonzepte. Gebärdensprachen sind vollwertige natürliche Sprachen mit regionalen Varianten und non-manualer Grammatik; ergänzen Sie das Üben stets durch taube/gebärdende Lehrkräfte und zertifizierte Kurse.',
      localPrivacy: '100 % lokale Speicherung im Browser · Keine Anmeldung',
    },
  },

  pt: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — Quiz de Datilologia e Língua de Sinais',
      description:
        'Pratique o reconhecimento visual do alfabeto manual A-Z, números 0-10, configurações parecidas e sinais cotidianos 100% no navegador.',
      h1: 'Treinador Visual de Língua de Sinais e Datilologia',
      subtitle:
        'Prática interativa de letras manuais, números, formas parecidas e expressões não manuais com diagnóstico local.',
    },
    nav: {
      practice: 'Praticar',
      progress: 'Progresso',
      guide: 'Guia de estudo',
      faq: 'FAQ',
      languageLabel: 'Idioma da interface',
    },
    systems: {
      label: 'Sistema de referência',
      asl: 'ASL (Língua de Sinais Americana)',
      lse: 'LSE (Língua de Sinais Espanhola)',
      isl: 'Internacional / Treino visual',
      notice:
        'Cada língua de sinais é uma língua natural distinta com gramática própria e expressão facial. O idioma do site não altera a natureza do sistema de sinais.',
    },
    modes: {
      spotter: {
        title: 'Leitura Rápida de Letras e Números',
        short: 'Leitura A–Z e 0–10',
        desc: 'Identifique configurações de letras e números no seu ritmo ou com cronômetro de 10 s.',
      },
      builder: {
        title: 'Construtor de Soletração',
        short: 'Soletrar Palavras',
        desc: 'Leia sequências encadeadas letra por letra e monte a palavra completa.',
      },
      lookalike: {
        title: 'Laboratório de Formas Parecidas',
        short: 'Formas Parecidas',
        desc: 'Diferencie sinais frequentemente confundidos como M vs N, U vs V vs R ou F vs 9.',
      },
      cues: {
        title: 'Situações Cotidianas e Expressão',
        short: 'Sinais do Dia a Dia',
        desc: 'Relacione cumprimentos, pedidos e marcadores não manuais ao contexto real.',
      },
      review: {
        title: 'Revisão de Pontos Cegos',
        short: 'Pontos Cegos',
        desc: 'Rodada focada apenas nos itens em que você teve mais erros.',
      },
    },
    categories: {
      letters: 'Letras / Datilologia',
      numbers: 'Números 0–10',
      lookalike: 'Configurações parecidas',
      cues: 'Expressão cotidiana',
    },
    ui: {
      fullView: 'Visão completa',
      handZoom: 'Zoom na mão',
      timedMode: 'Com tempo (10s)',
      untimedMode: 'Sem tempo',
      filterAll: 'Tudo',
      filterLetters: 'Letras A–Z',
      filterNumbers: 'Números 0–10',
      promptIdentifySign: 'Qual letra ou número esta configuração representa?',
      promptLookalike: 'Observe a posição do polegar e dos dedos. Qual é o sinal?',
      promptBuilder: 'Acompanhe a sequência e forme a palavra:',
      promptCues: 'Escolha o sinal e a expressão não manual ideal para a situação:',
      promptReview: 'Revisão de pontos cegos — identifique este sinal:',
      correctBadge: 'Correto',
      incorrectBadge: 'Para revisar',
      timeoutBadge: 'Tempo esgotado',
      nextQuestion: 'Próxima',
      skipQuestion: 'Pular',
      roundComplete: 'Rodada concluída',
      roundScore: 'Precisão da rodada',
      startNewRound: 'Nova rodada',
      whatToLookFor: 'O que observar na mão',
      differenceVsSimilar: 'Diferença para sinais parecidos',
      mistakeToAvoid: 'Erro comum a evitar',
      systemNoteLabel: 'Nota de sistema (ASL vs LSE)',
      compareSideBySide: 'Comparação visual',
      yourPick: 'Sua escolha',
      correctSign: 'Sinal correto',
      playSequence: 'Reproduzir sequência',
      pauseSequence: 'Pausar',
      speedSlow: 'Lento',
      speedNormal: 'Normal',
      speedBrisk: 'Rápido',
      stepLabel: 'Letra',
      clearWord: 'Limpar',
      backspace: 'Apagar',
      hintLetter: 'Mostrar próxima letra',
      checkSpelling: 'Verificar palavra',
      shareLink: 'Compartilhar link',
      copiedLink: 'Link copiado',
      nonManualLabel: 'Marcador não manual',
      palmLabel: 'Palma',
      twoHandedLabel: 'Sinal com duas mãos',
      oneHandedLabel: 'Sinal com uma mão',
    },
    nonManualNames: {
      neutral: 'Rosto neutro e atento',
      'brow-raise': 'Sobrancelhas erguidas (pergunta sim/não ou pedido)',
      'brow-furrow': 'Sobrancelhas franzidas (pergunta aberta ou desculpa)',
      'head-nod': 'Aceno afirmativo com a cabeça',
      'head-shake': 'Movimento negativo com a cabeça',
      'warm-smile': 'Expressão facial aberta e acolhedora',
    },
    palmNames: {
      front: 'Para a frente',
      back: 'Dorso para a frente',
      'side-in': 'De lado para dentro',
      'side-out': 'De lado para fora',
      down: 'Para baixo',
      up: 'Para cima',
    },
    stats: {
      heading: 'Pontos Fortes e Pontos Cegos',
      xp: 'XP Total',
      streak: 'Sequência atual',
      bestStreak: 'Melhor sequência',
      accuracy: 'Precisão geral',
      avgSpeed: 'Tempo médio',
      secondsUnit: 's',
      categoryBreakdown: 'Precisão por categoria',
      strengthsTitle: 'Ponto forte',
      blindSpotsTitle: 'Itens para revisar',
      noDataYet: 'Responda algumas questões para desbloquear seu perfil.',
      noBlindSpots: 'Nenhum erro recorrente registrado ainda!',
      practiceBlindSpots: 'Treinar pontos cegos',
      recentSessions: 'Sessões recentes',
      resetStats: 'Redefinir progresso',
      confirmReset: 'Confirmar',
      cancelReset: 'Cancelar',
      missesLabel: 'erros',
    },
    monetization: {
      adLabel: 'Publicidade',
      adPlaceholderNote: 'Espaço Media.net com altura mínima reservada para evitar saltos visuais.',
      resourcesHeading: 'Recursos Visuais Recomendados',
      resourcesDisclosure: 'Links de afiliados e parceiros · Identificação transparente (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'Dicionário Visual de Língua de Sinais',
          category: 'Referência visual',
          summary: 'Ilustrações detalhadas de configurações de mão, orientação e vocabulário diário.',
          cta: 'Ver recurso',
          href: 'https://example.com/dicionario-sinais?ref=signcue',
        },
        {
          title: 'Caderno de Fluência em Datilologia',
          category: 'Exercícios',
          summary: 'Drills para reconhecer palavras inteiras com rapidez visual.',
          cta: 'Explorar',
          href: 'https://example.com/caderno-datilologia?ref=signcue',
        },
        {
          title: 'Curso Conduzido por Professores Surdos',
          category: 'Curso certificado',
          summary: 'Aprenda gramática espacial, expressão facial e variações regionais na prática.',
          cta: 'Ver programa',
          href: 'https://example.com/curso-surdos?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: 'Guia Inicial para Reconhecimento Visual de Sinais',
      guideLead:
        'Ganhar fluidez na leitura de datilologia exige observar o polegar, a orientação da palma e os marcadores faciais juntos.',
      sections: [
        {
          title: '1. Por que as línguas de sinais não são universais',
          body: 'ASL, Libras, LSE e BSL são línguas naturais independentes com estruturas próprias.',
          bullets: [
            'ASL e LSE usam alfabetos majoritariamente de uma mão; a BSL usa duas mãos.',
            'Letras como F, G, K e T mudam entre sistemas regionais.',
          ],
        },
        {
          title: '2. Configurações manuais e gramática não manual',
          body: 'Expressões faciais e movimentos de cabeça fazem parte da gramática dos sinais.',
          bullets: [
            'Sobrancelhas erguidas indicam perguntas de sim/não; franzidas acompanham perguntas abertas.',
            'Balançar a cabeça negativamente transforma "Entendo" em "Não entendo".',
          ],
        },
        {
          title: '3. Erros comuns ao soletrar',
          body: 'Observe primeiro o polegar em letras de punho fechado (A, S, E, T, M, N).',
          bullets: [
            'Acompanhe as setas de movimento em letras dinâmicas como J e Z.',
            'Use o Construtor de Palavras para treinar leitura contínua.',
          ],
        },
      ],
      faqHeading: 'Perguntas Frequentes',
      faqItems: [
        {
          question: 'O SignCue Trainer funciona 100% no navegador?',
          answer: 'Sim. Tudo roda localmente sem servidor nem chamadas pagas.',
        },
        {
          question: 'Por que o idioma da página é separado do sistema de sinais?',
          answer: 'Porque línguas de sinais são idiomas independentes e não traduções literais.',
        },
        {
          question: 'Como funciona a revisão de pontos cegos?',
          answer: 'O painel identifica onde você mais erra e monta uma rodada focada nesses itens.',
        },
        {
          question: 'Este aplicativo substitui aulas com professores surdos?',
          answer: 'Não. Ele complementa os estudos, mas a fluência completa requer cursos certificados e prática real.',
        },
        {
          question: 'Posso compartilhar um modo pela URL?',
          answer: 'Sim, usando parâmetros como ?mode=lookalike&lang=pt.',
        },
      ],
    },
    footer: {
      disclaimer:
        'Ferramenta educativa de prática visual para datilologia, números e noções cotidianas de sinais. As línguas de sinais são línguas naturais completas com variações regionais e gramática não manual; complemente sempre a prática com educadores surdos/sinalizantes e cursos certificados.',
      localPrivacy: 'Armazenamento 100% local no navegador · Sem cadastro',
    },
  },

  ru: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — Тренажёр дактилологии и жестового языка',
      description:
        'Практикуйте визуальное распознавание дактильной азбуки A-Z, чисел 0-10, похожих конфигураций рук и повседневных жестов локально в браузере.',
      h1: 'Тренажёр дактилологии и визуальных жестов',
      subtitle:
        'Интерактивная практика конфигураций рук, чисел, похожих форм и немануальных сигналов прямо в браузере.',
    },
    nav: {
      practice: 'Тренировка',
      progress: 'Прогресс',
      guide: 'Справочник',
      faq: 'Вопросы',
      languageLabel: 'Язык интерфейса',
    },
    systems: {
      label: 'Система жестов',
      asl: 'ASL (Американский жестовый язык)',
      lse: 'LSE (Испанский жестовый язык)',
      isl: 'Международная / Визуальный тренинг',
      notice:
        'Каждый жестовый язык — это самостоятельный естественный язык со своей грамматикой и мимикой. Язык интерфейса не заменяет выбранную систему жестов.',
    },
    modes: {
      spotter: {
        title: 'Быстрое чтение букв и чисел',
        short: 'Буквы и числа',
        desc: 'Распознавайте конфигурации букв A–Z и чисел 0–10 в свободном темпе или с таймером 10 с.',
      },
      builder: {
        title: 'Конструктор дактильных слов',
        short: 'Сборка слов',
        desc: 'Считывайте последовательность дактильных знаков и собирайте слово целиком.',
      },
      lookalike: {
        title: 'Лаборатория похожих жестов',
        short: 'Похожие формы',
        desc: 'Тренируйте различение близких форм руки, таких как M и N, U, V и R или F и 9.',
      },
      cues: {
        title: 'Повседневные ситуации и мимика',
        short: 'Бытовые жесты',
        desc: 'Сопоставляйте приветствия, просьбы и движения бровей/головы с ситуацией общения.',
      },
      review: {
        title: 'Работа над слепыми зонами',
        short: 'Ошибки',
        desc: 'Прицельное повторение именно тех знаков, в которых вы ошибались чаще всего.',
      },
    },
    categories: {
      letters: 'Дактильные буквы',
      numbers: 'Числа 0–10',
      lookalike: 'Похожие конфигурации',
      cues: 'Повседневные жесты',
    },
    ui: {
      fullView: 'Полный вид',
      handZoom: 'Крупно кисть',
      timedMode: 'Таймер (10с)',
      untimedMode: 'Без таймера',
      filterAll: 'Все',
      filterLetters: 'Буквы A–Z',
      filterNumbers: 'Числа 0–10',
      promptIdentifySign: 'Какую букву или число показывает эта рука?',
      promptLookalike: 'Обратите внимание на большой палец и сгиб пальцев. Какой это знак?',
      promptBuilder: 'Следите за серией жестов и соберите слово:',
      promptCues: 'Выберите жест и мимический сигнал для этой ситуации:',
      promptReview: 'Повторение ошибок — определите знак:',
      correctBadge: 'Верно',
      incorrectBadge: 'Повторить',
      timeoutBadge: 'Время вышло',
      nextQuestion: 'Далее',
      skipQuestion: 'Пропустить',
      roundComplete: 'Раунд завершён',
      roundScore: 'Точность раунда',
      startNewRound: 'Новый раунд',
      whatToLookFor: 'На что смотреть на руке',
      differenceVsSimilar: 'Отличие от похожих знаков',
      mistakeToAvoid: 'Частая ошибка',
      systemNoteLabel: 'Отличие систем (ASL и LSE)',
      compareSideBySide: 'Визуальное сравнение',
      yourPick: 'Ваш выбор',
      correctSign: 'Правильный знак',
      playSequence: 'Воспроизвести',
      pauseSequence: 'Пауза',
      speedSlow: 'Медленно',
      speedNormal: 'Обычно',
      speedBrisk: 'Быстро',
      stepLabel: 'Буква',
      clearWord: 'Очистить',
      backspace: 'Удалить',
      hintLetter: 'Подсказать букву',
      checkSpelling: 'Проверить слово',
      shareLink: 'Поделиться ссылкой',
      copiedLink: 'Скопировано',
      nonManualLabel: 'Немануальный сигнал',
      palmLabel: 'Ладонь',
      twoHandedLabel: 'Двуручный жест',
      oneHandedLabel: 'Одноручный жест',
    },
    nonManualNames: {
      neutral: 'Спокойное внимательное лицо',
      'brow-raise': 'Поднятые брови (общий вопрос да/нет или просьба)',
      'brow-furrow': 'Сдвинутые брови (специальный вопрос или извинение)',
      'head-nod': 'Утвердительный кивок головой',
      'head-shake': 'Отрицательное покачивание головой',
      'warm-smile': 'Открытая доброжелательная мимика',
    },
    palmNames: {
      front: 'Ладонь вперёд',
      back: 'Тыльная сторона вперёд',
      'side-in': 'Ребром внутрь',
      'side-out': 'Ребром наружу',
      down: 'Ладонь вниз',
      up: 'Ладонь вверх',
    },
    stats: {
      heading: 'Сильные стороны и слепые зоны',
      xp: 'Всего XP',
      streak: 'Серия',
      bestStreak: 'Лучшая серия',
      accuracy: 'Точность',
      avgSpeed: 'Среднее время',
      secondsUnit: 'с',
      categoryBreakdown: 'Точность по категориям',
      strengthsTitle: 'Сильная сторона',
      blindSpotsTitle: 'Что повторить',
      noDataYet: 'Ответьте на несколько вопросов, чтобы увидеть статистику.',
      noBlindSpots: 'Повторяющихся ошибок пока нет!',
      practiceBlindSpots: 'Тренировать ошибки',
      recentSessions: 'Недавние сессии',
      resetStats: 'Сбросить прогресс',
      confirmReset: 'Подтвердить',
      cancelReset: 'Отмена',
      missesLabel: 'ошибок',
    },
    monetization: {
      adLabel: 'Рекламный блок',
      adPlaceholderNote: 'Контейнер Media.net с фиксированной минимальной высотой для защиты от смещения макета.',
      resourcesHeading: 'Рекомендуемые учебные пособия',
      resourcesDisclosure: 'Партнёрские ссылки · Прозрачная маркировка (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'Визуальный словарь жестовых языков',
          category: 'Справочник',
          summary: 'Чёткие иллюстрации конфигураций кисти, ориентации ладони и базовой лексики.',
          cta: 'Открыть',
          href: 'https://example.com/visual-dictionary-ru?ref=signcue',
        },
        {
          title: 'Тетрадь для беглого чтения дактиля',
          category: 'Практикум',
          summary: 'Упражнения на распознавание целых слов без пауз на каждой букве.',
          cta: 'Подробнее',
          href: 'https://example.com/fingerspelling-ru?ref=signcue',
        },
        {
          title: 'Курсы с глухими преподавателями',
          category: 'Видеокурс',
          summary: 'Изучайте пространственную грамматику и мимику у носителей языка.',
          cta: 'К программе',
          href: 'https://example.com/deaf-teachers-ru?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: 'Руководство по визуальному распознаванию жестов',
      guideLead:
        'Уверенное чтение дактильной речи строится на внимании к положению большого пальца, развороту ладони и мимике.',
      sections: [
        {
          title: '1. Почему жестовый язык не универсален',
          body: 'В мире существуют десятки самостоятельных жестовых языков: ASL, LSE, РЖЯ, BSL и другие.',
          bullets: [
            'ASL и LSE используют одноручную дактилологию, а BSL — двуручную.',
            'Даже между ASL и LSE заметно различаются знаки для F, G, K и T.',
          ],
        },
        {
          title: '2. Конфигурации и немануальная грамматика',
          body: 'Мимика и положение головы являются частью грамматики наравне с движением рук.',
          bullets: [
            'Поднятые брови обозначают общий вопрос, сдвинутые — вопрос с вопросительным словом.',
            'Покачивание головой меняет значение «Понимаю» на «Не понимаю».',
          ],
        },
        {
          title: '3. Частые ошибки при дактилировании',
          body: 'В закрытых формах кулака (A, S, E, T, M, N) в первую очередь ищите большой палец.',
          bullets: [
            'Буквы J и Z включают движение по дуге или зигзагу.',
            'Тренируйте чтение слов целиком в режиме сборки слов.',
          ],
        },
      ],
      faqHeading: 'Частые вопросы',
      faqItems: [
        {
          question: 'Работает ли приложение полностью в браузере?',
          answer: 'Да. Векторная графика SVG, тесты и аналитика работают локально без сервера.',
        },
        {
          question: 'Зачем разделены язык интерфейса и система жестов?',
          answer: 'Жестовые языки — это независимые языки, а не калька с устной речи.',
        },
        {
          question: 'Как помогает раздел «Слепые зоны»?',
          answer: 'Он отбирает знаки, где вы ошибаетесь чаще всего, для повторной практики.',
        },
        {
          question: 'Заменяет ли тренажёр занятия с преподавателем?',
          answer: 'Нет, он дополняет обучение и помогает быстрее считывать формы руки.',
        },
        {
          question: 'Можно ли делиться режимами по ссылке?',
          answer: 'Да, с помощью параметров URL, например ?mode=lookalike&lang=ru.',
        },
      ],
    },
    footer: {
      disclaimer:
        'Образовательный тренажёр визуального распознавания дактилологии, чисел и базовых жестов. Жестовые языки являются полноценными естественными языками с региональными различиями и немануальной грамматикой; всегда дополняйте практику занятиями с глухими/слабослышащими педагогами и сертифицированными курсами.',
      localPrivacy: '100 % локальное хранение в браузере · Без регистрации',
    },
  },

  hi: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — साइन लैंग्वेज और फिंगरस्पेलिंग क्विज़',
      description:
        'ब्राउज़र में 100% लोकल तरीके से साइन लैंग्वेज के अक्षर A-Z, संख्याएं 0-10, मिलते-जुलते हाथ के संकेत और दैनिक भाव अभ्यास करें।',
      h1: 'साइन लैंग्वेज ट्रेनर और फिंगरस्पेलिंग क्विज़',
      subtitle:
        'अक्षर, संख्याएं, एक जैसे दिखने वाले संकेत और चेहरे के भावों की पहचान का इंटरैक्टिव अभ्यास।',
    },
    nav: {
      practice: 'अभ्यास',
      progress: 'प्रगति',
      guide: 'अध्ययन गाइड',
      faq: 'सवाल-जवाब',
      languageLabel: 'इंटरफ़ेस भाषा',
    },
    systems: {
      label: 'साइन संदर्भ प्रणाली',
      asl: 'ASL (अमेरिकन साइन लैंग्वेज)',
      lse: 'LSE (स्पेनिश साइन लैंग्वेज)',
      isl: 'अंतरराष्ट्रीय / विज़ुअल अभ्यास',
      notice:
        'प्रत्येक साइन लैंग्वेज अपनी स्वतंत्र व्याकरण, क्षेत्रीय संकेतों और चेहरे के भावों वाली प्राकृतिक भाषा है। ऐप की भाषा बदलने से साइन प्रणाली नहीं बदलती।',
    },
    modes: {
      spotter: {
        title: 'अक्षर और संख्या पहचान',
        short: 'अक्षर A–Z व 0–10',
        desc: 'बिना समय सीमा या 10 सेकंड के टाइमर के साथ अक्षरों और संख्याओं को पहचानें।',
      },
      builder: {
        title: 'शब्द स्पेलिंग बिल्डर',
        short: 'शब्द निर्माण',
        desc: 'लगातार दिखाए गए संकेतों को पढ़कर पूरा शब्द बनाएं।',
      },
      lookalike: {
        title: 'मिलते-जुलते संकेत लैब',
        short: 'समान आकार लैब',
        desc: 'M बनाम N, U बनाम V बनाम R, या F बनाम 9 जैसे संकेतों का सूक्ष्म अंतर समझें।',
      },
      cues: {
        title: 'दैनिक संकेत और चेहरे के भाव',
        short: 'दैनिक संवाद',
        desc: 'अभिवादन, मदद और भौंहों/सिर के संकेतों को सही स्थिति से जोड़ें।',
      },
      review: {
        title: 'कमज़ोर बिंदु अभ्यास',
        short: 'दोहराव मोड',
        desc: 'केवल उन्हीं संकेतों का अभ्यास जिनमें आपसे सबसे ज़्यादा गलतियां हुई हैं।',
      },
    },
    categories: {
      letters: 'अक्षर (A–Z)',
      numbers: 'संख्याएं (0–10)',
      lookalike: 'समान हाथ के आकार',
      cues: 'दैनिक संकेत व भाव',
    },
    ui: {
      fullView: 'पूरा दृश्य',
      handZoom: 'हाथ ज़ूम',
      timedMode: 'टाइमर (10s)',
      untimedMode: 'बिना टाइमर',
      filterAll: 'सभी',
      filterLetters: 'अक्षर A–Z',
      filterNumbers: 'संख्याएं 0–10',
      promptIdentifySign: 'यह हाथ का संकेत किस अक्षर या संख्या को दर्शाता है?',
      promptLookalike: 'अंगूठे की स्थिति और उंगलियों के झुकाव को ध्यान से देखें:',
      promptBuilder: 'संकेतों के क्रम को देखें और शब्द बनाएं:',
      promptCues: 'इस स्थिति के लिए सही संकेत और चेहरे का भाव चुनें:',
      promptReview: 'कमज़ोर बिंदु समीक्षा — इस संकेत को पहचानें:',
      correctBadge: 'सही',
      incorrectBadge: 'दोहराएं',
      timeoutBadge: 'समय समाप्त',
      nextQuestion: 'अगला प्रश्न',
      skipQuestion: 'छोड़ें',
      roundComplete: 'राउंड पूरा हुआ',
      roundScore: 'सटीकता',
      startNewRound: 'नया राउंड शुरू करें',
      whatToLookFor: 'हाथ में क्या देखें',
      differenceVsSimilar: 'समान संकेतों से अंतर',
      mistakeToAvoid: 'बचने योग्य सामान्य गलती',
      systemNoteLabel: 'प्रणाली नोट (ASL बनाम LSE)',
      compareSideBySide: 'दृश्य तुलना',
      yourPick: 'आपका उत्तर',
      correctSign: 'सही संकेत',
      playSequence: 'क्रम चलाएं',
      pauseSequence: 'रोकें',
      speedSlow: 'धीमा',
      speedNormal: 'सामान्य',
      speedBrisk: 'तेज़',
      stepLabel: 'अक्षर',
      clearWord: 'साफ़ करें',
      backspace: 'हटाएं',
      hintLetter: 'अगला अक्षर दिखाएं',
      checkSpelling: 'शब्द जांचें',
      shareLink: 'लिंक साझा करें',
      copiedLink: 'लिंक कॉपी हुआ',
      nonManualLabel: 'चेहरे/सिर का भाव',
      palmLabel: 'हथेली',
      twoHandedLabel: 'दो हाथों का संकेत',
      oneHandedLabel: 'एक हाथ का संकेत',
    },
    nonManualNames: {
      neutral: 'सामान्य और सजग भाव',
      'brow-raise': 'उठी हुई भौंहें (हां/ना प्रश्न या अनुरोध)',
      'brow-furrow': 'सिकुड़ी भौंहें (प्रश्नात्मक या क्षमा भाव)',
      'head-nod': 'सकारात्मक सिर हिलाना',
      'head-shake': 'नकारात्मक सिर हिलाना',
      'warm-smile': 'मुस्कान और खुला भाव',
    },
    palmNames: {
      front: 'आगे की ओर',
      back: 'पीछे की ओर',
      'side-in': 'अंदर की ओर करवट',
      'side-out': 'बाहर की ओर करवट',
      down: 'नीचे की ओर',
      up: 'ऊपर की ओर',
    },
    stats: {
      heading: 'मज़बूत पक्ष और कमज़ोर बिंदु',
      xp: 'कुल XP',
      streak: 'वर्तमान स्ट्रीक',
      bestStreak: 'सर्वश्रेष्ठ स्ट्रीक',
      accuracy: 'कुल सटीकता',
      avgSpeed: 'औसत समय',
      secondsUnit: 'से',
      categoryBreakdown: 'श्रेणी के अनुसार सटीकता',
      strengthsTitle: 'सबसे मज़बूत क्षेत्र',
      blindSpotsTitle: 'सुधार के लिए संकेत',
      noDataYet: 'विश्लेषण देखने के लिए कुछ प्रश्नों के उत्तर दें।',
      noBlindSpots: 'अभी कोई लगातार गलती नहीं मिली है!',
      practiceBlindSpots: 'कमज़ोर संकेतों का अभ्यास करें',
      recentSessions: 'हालिया सत्र',
      resetStats: 'प्रगति रीसेट करें',
      confirmReset: 'पुष्टि करें',
      cancelReset: 'रद्द करें',
      missesLabel: 'गलतियां',
    },
    monetization: {
      adLabel: 'प्रायोजित स्थान',
      adPlaceholderNote: 'लेआउट बदलाव रोकने के लिए न्यूनतम ऊंचाई वाला Media.net कंटेनर।',
      resourcesHeading: 'अनुशंसित अध्ययन संसाधन',
      resourcesDisclosure: 'संबद्ध व साझेदार लिंक · पारदर्शी लेबल (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'सचित्र साइन लैंग्वेज शब्दकोश',
          category: 'विज़ुअल गाइड',
          summary: 'हाथ के आकार, हथेली की दिशा और दैनिक शब्दों का स्पष्ट चित्रण।',
          cta: 'देखें',
          href: 'https://example.com/sign-dictionary-hi?ref=signcue',
        },
        {
          title: 'फिंगरस्पेलिंग अभ्यास पुस्तिका',
          category: 'अभ्यास',
          summary: 'पूरे शब्दों को तेज़ी से पढ़ने की क्षमता बढ़ाने के लिए विशेष ड्रिल्स।',
          cta: 'जानें',
          href: 'https://example.com/workbook-hi?ref=signcue',
        },
        {
          title: 'बधिर शिक्षकों द्वारा संचालित कोर्स',
          category: 'प्रमाणित कोर्स',
          summary: 'प्रमाणित शिक्षकों से प्राकृतिक व्याकरण और चेहरे के भाव सीखें।',
          cta: 'कोर्स देखें',
          href: 'https://example.com/deaf-course-hi?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: 'साइन पहचान और फिंगरस्पेलिंग की शुरुआती गाइड',
      guideLead:
        'हाथों के संकेतों को तेज़ी से समझने के लिए अंगूठे की स्थिति, हथेली की दिशा और चेहरे के भावों को एक साथ देखना सीखें।',
      sections: [
        {
          title: '1. साइन लैंग्वेज सार्वभौमिक क्यों नहीं है',
          body: 'ASL, ISL (भारतीय), LSE और BSL अलग-अलग प्राकृतिक भाषाएं हैं।',
          bullets: [
            'ASL और LSE अधिकतर एक हाथ से वर्तनी दिखाती हैं, जबकि BSL और भारतीय साइन लैंग्वेज में दो हाथों का प्रयोग होता है।',
            'हमेशा अपने स्थानीय बधिर समुदाय की भाषा के अनुसार अभ्यास करें।',
          ],
        },
        {
          title: '2. हाथ के आकार और गैर-मौखिक व्याकरण',
          body: 'भौंहों और सिर की गति संकेत का पूरा अर्थ बदल सकती है।',
          bullets: [
            'उठी भौंहें हां/ना प्रश्न दर्शाती हैं।',
            'सिर हिलाकर न करने से "समझ गया" का अर्थ "नहीं समझा" बन जाता है।',
          ],
        },
        {
          title: '3. सामान्य गलतियां कैसे सुधारें',
          body: 'बंद मुट्ठी वाले अक्षरों (A, S, E, T, M, N) में सबसे पहले अंगूठे पर ध्यान दें।',
          bullets: [
            'J और Z में गति की दिशा महत्वपूर्ण होती है।',
            'लगातार शब्द पढ़ने के लिए वर्ड बिल्डर मोड का उपयोग करें।',
          ],
        },
      ],
      faqHeading: 'अक्सर पूछे जाने वाले प्रश्न',
      faqItems: [
        {
          question: 'क्या यह ऐप पूरी तरह ब्राउज़र में चलता है?',
          answer: 'हां, सभी SVG चित्र और अभ्यास डेटा पूरी तरह आपके ब्राउज़र में ही चलते हैं।',
        },
        {
          question: 'ऐप भाषा और साइन सिस्टम अलग क्यों हैं?',
          answer: 'क्योंकि प्रत्येक साइन लैंग्वेज एक स्वतंत्र भाषा है।',
        },
        {
          question: 'कमज़ोर बिंदु मोड कैसे काम करता है?',
          answer: 'यह आपकी गलतियों को ट्रैक करके विशेष अभ्यास राउंड तैयार करता है।',
        },
        {
          question: 'क्या यह किसी प्रमाणित कोर्स की जगह ले सकता है?',
          answer: 'नहीं, यह केवल एक सहायक विज़ुअल अभ्यास टूल है।',
        },
        {
          question: 'क्या मैं अभ्यास लिंक साझा कर सकता हूँ?',
          answer: 'हां, ?mode=lookalike&lang=hi जैसे URL पैरामीटर का उपयोग करें।',
        },
      ],
    },
    footer: {
      disclaimer:
        'फिंगरस्पेलिंग, संख्याओं और दैनिक साइन अवधारणाओं के लिए शैक्षिक दृश्य अभ्यास उपकरण। साइन लैंग्वेज क्षेत्रीय विविधताओं और गैर-मौखिक व्याकरण वाली पूर्ण प्राकृतिक भाषाएं हैं; अभ्यास को हमेशा बधिर/साइन भाषा शिक्षकों और प्रमाणित पाठ्यक्रमों के साथ पूरा करें।',
      localPrivacy: '100% लोकल ब्राउज़र स्टोरेज · बिना अकाउंट',
    },
  },

  ar: {
    dir: 'rtl',
    seo: {
      title: 'SignCue Trainer — اختبار أبجدية الإشارة والإشارات اليومية',
      description:
        'تدرّب بصرياً على تمييز حروف الهجاء الإصبعي A-Z والأرقام 0-10 والأشكال المتشابهة والإشارات اليومية محلياً 100% في متصفحك.',
      h1: 'مدرّب لغة الإشارة واختبار الهجاء الإصبعي',
      subtitle:
        'تطبيق بصري تفاعلي لممارسة أشكال اليد والأرقام والإشارات المتشابهة والتعبيرات غير اليدوية بخصوصية كاملة.',
    },
    nav: {
      practice: 'التدريب',
      progress: 'التقدّم',
      guide: 'دليل التعلم',
      faq: 'الأسئلة',
      languageLabel: 'لغة الواجهة',
    },
    systems: {
      label: 'نظام الإشارة المرجعي',
      asl: 'ASL (لغة الإشارة الأمريكية)',
      lse: 'LSE (لغة الإشارة الإسبانية)',
      isl: 'دولي / تدريب بصري لأشكال اليد',
      notice:
        'كل لغة إشارة هي لغة طبيعية مستقلة لها قواعدها وتنوعاتها الإقليمية وتعبيراتها الوجهية. تغيير لغة الواجهة يترجم التطبيق فقط ولا يغيّر لغة الإشارة.',
    },
    modes: {
      spotter: {
        title: 'قراءة الحروف والأرقام السريعة',
        short: 'الحروف والأرقام',
        desc: 'تعرّف على حروف الهجاء الإصبعي والأرقام بالسرعة التي تناسبك أو مع مؤقت 10 ثوانٍ.',
      },
      builder: {
        title: 'بناء الكلمات بالهجاء الإصبعي',
        short: 'تركيب الكلمات',
        desc: 'اقرأ سلسلة من الحروف الإشارية المتتالية وركّب الكلمة المستهدفة.',
      },
      lookalike: {
        title: 'مختبر الأشكال المتشابهة',
        short: 'الأشكال المتشابهة',
        desc: 'صقل الدقة البصرية بين الإشارات المتقاربة مثل M و N أو U و V و R أو F و 9.',
      },
      cues: {
        title: 'المواقف اليومية والتعبيرات الوجهية',
        short: 'إشارات يومية',
        desc: 'اربط التحايا والطلبات وحركات الحاجبين والرأس بالسياق التواصلي الصحيح.',
      },
      review: {
        title: 'مراجعة نقاط الضعف',
        short: 'نقاط الضعف',
        desc: 'جولة مركّزة تضم فقط الإشارات التي تكررت أخطاؤك فيها.',
      },
    },
    categories: {
      letters: 'الهجاء الإصبعي A–Z',
      numbers: 'الأرقام 0–10',
      lookalike: 'أشكال اليد المتشابهة',
      cues: 'الإشارات اليومية والسياق',
    },
    ui: {
      fullView: 'عرض كامل',
      handZoom: 'تكبير اليد',
      timedMode: 'مؤقت (10 ث)',
      untimedMode: 'بدون مؤقت',
      filterAll: 'الكل',
      filterLetters: 'الحروف A–Z',
      filterNumbers: 'الأرقام 0–10',
      promptIdentifySign: 'ما الحرف أو الرقم الذي يمثله شكل اليد هذا؟',
      promptLookalike: 'دقّق في موضع الإبهام وانحناء الأصابع. أي إشارة هذه؟',
      promptBuilder: 'تابع تسلسل الحروف الإشارية وركّب الكلمة:',
      promptCues: 'اختر الإشارة والتعبير غير اليدوي الأنسب لهذا الموقف:',
      promptReview: 'مراجعة نقاط الضعف — حدّد هذه الإشارة بدقة:',
      correctBadge: 'إجابة صحيحة',
      incorrectBadge: 'تحتاج مراجعة',
      timeoutBadge: 'انتهى الوقت',
      nextQuestion: 'السؤال التالي',
      skipQuestion: 'تخطي',
      roundComplete: 'اكتملت الجولة',
      roundScore: 'دقة الجولة',
      startNewRound: 'جولة جديدة',
      whatToLookFor: 'ما الذي يجب ملاحظته في اليد',
      differenceVsSimilar: 'الفرق عن الإشارات المشابهة',
      mistakeToAvoid: 'خطأ شائع يجب تجنبه',
      systemNoteLabel: 'ملاحظة النظام (ASL مقابل LSE)',
      compareSideBySide: 'مقارنة بصرية',
      yourPick: 'اختيارك',
      correctSign: 'الإشارة الصحيحة',
      playSequence: 'تشغيل التسلسل',
      pauseSequence: 'إيقاف مؤقت',
      speedSlow: 'بطيء',
      speedNormal: 'عادي',
      speedBrisk: 'سريع',
      stepLabel: 'حرف',
      clearWord: 'مسح',
      backspace: 'حذف',
      hintLetter: 'إظهار الحرف التالي',
      checkSpelling: 'تحقق من الكلمة',
      shareLink: 'مشاركة الرابط',
      copiedLink: 'تم النسخ',
      nonManualLabel: 'المؤشر غير اليدوي',
      palmLabel: 'راحة اليد',
      twoHandedLabel: 'إشارة بكلتا اليدين',
      oneHandedLabel: 'إشارة بيد واحدة',
    },
    nonManualNames: {
      neutral: 'تعبير وجه هادئ ومنتبه',
      'brow-raise': 'حاجبان مرفوعان (سؤال نعم/لا أو طلب مهذب)',
      'brow-furrow': 'حاجبان مقطبان (سؤال مفتوح أو اعتذار)',
      'head-nod': 'إيماءة رأس إيجابية',
      'head-shake': 'هزّ الرأس للنفي',
      'warm-smile': 'ابتسامة وتعبير ترحيبي دافئ',
    },
    palmNames: {
      front: 'مواجهة للأمام',
      back: 'ظهر اليد للأمام',
      'side-in': 'جانبية للداخل',
      'side-out': 'جانبية للخارج',
      down: 'للأسفل',
      up: 'للأعلى',
    },
    stats: {
      heading: 'نقاط القوة ونقاط الضعف',
      xp: 'مجموع النقاط XP',
      streak: 'السلسلة الحالية',
      bestStreak: 'أفضل سلسلة',
      accuracy: 'الدقة الإجمالية',
      avgSpeed: 'متوسط السرعة',
      secondsUnit: 'ث',
      categoryBreakdown: 'الدقة حسب الفئة',
      strengthsTitle: 'أقوى فئة',
      blindSpotsTitle: 'عناصر للمراجعة',
      noDataYet: 'أجب عن بضعة أسئلة لعرض ملفك التعليمي.',
      noBlindSpots: 'لا توجد أخطاء متكررة مسجلة بعد!',
      practiceBlindSpots: 'تدرّب على نقاط الضعف',
      recentSessions: 'الجلسات الأخيرة',
      resetStats: 'إعادة ضبط التقدم',
      confirmReset: 'تأكيد المسح',
      cancelReset: 'إلغاء',
      missesLabel: 'أخطاء',
    },
    monetization: {
      adLabel: 'مساحة إعلانية',
      adPlaceholderNote: 'حاوية Media.net بارتفاع أدنى محجوز لمنع قفزات التصميم.',
      resourcesHeading: 'موارد بصرية ومراجع موصى بها',
      resourcesDisclosure: 'روابط تابعة وشريكة · موسومة بشفافية (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'القاموس المصوّر للغة الإشارة',
          category: 'مرجع بصري',
          summary: 'رسوم واضحة لزوايا اليد واتجاه الراحة والمفردات اليومية الأساسية.',
          cta: 'عرض المرجع',
          href: 'https://example.com/sign-dictionary-ar?ref=signcue',
        },
        {
          title: 'كراس إتقان القراءة الإصبعية',
          category: 'تمارين عملية',
          summary: 'تدريبات متدرجة لقراءة الكلمات المتصلة دون التوقف عند كل حرف.',
          cta: 'استكشاف',
          href: 'https://example.com/fingerspelling-ar?ref=signcue',
        },
        {
          title: 'دورة تواصل بإشراف معلمين صم',
          category: 'دورة معتمدة',
          summary: 'تعلّم القواعد المكانية وتعبيرات الوجه واللهجات الإقليمية من خبراء.',
          cta: 'عرض المنهج',
          href: 'https://example.com/deaf-course-ar?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: 'دليل المبتدئين لتمييز الإشارات والهجاء الإصبعي',
      guideLead:
        'إتقان قراءة لغة الإشارة يعتمد على ملاحظة موضع الإبهام واتجاه راحة اليد وتعبيرات الوجه في آنٍ واحد.',
      sections: [
        {
          title: '1. لماذا ليست لغة الإشارة عالمية واحدة',
          body: 'تتعدد لغات الإشارة حول العالم مثل ASL وLSE ولغة الإشارة العربية الموحدة وBSL، ولكل منها بنيتها المستقلة.',
          bullets: [
            'تستخدم ASL وLSE يداً واحدة في الهجاء الإصبعي غالباً، بينما تستخدم BSL كلتا اليدين.',
            'تختلف بعض الحروف مثل F وG وK وT بين الأنظمة الإقليمية.',
          ],
        },
        {
          title: '2. أشكال اليد والقواعد غير اليدوية',
          body: 'حركة الحاجبين والرأس جزء أساسي من النحو وليست مجرد تزيين.',
          bullets: [
            'رفع الحاجبين يميّز أسئلة نعم/لا، وتقطيبهما يرافق الأسئلة المفتوحة.',
            'هز الرأس نفياً يحوّل إشارة "أفهم" إلى "لا أفهم".',
          ],
        },
        {
          title: '3. أخطاء شائعة عند التهجئة',
          body: 'في الحروف المغلقة مثل A وS وE وT وM وN، ابحث أولاً عن مكان الإبهام.',
          bullets: [
            'الحرفان J وZ يتطلبان تتبع مسار حركة في الهواء.',
            'استخدم وضع تركيب الكلمات لتدريب العين على قراءة المقاطع المتصلة.',
          ],
        },
      ],
      faqHeading: 'الأسئلة الشائعة',
      faqItems: [
        {
          question: 'هل يعمل التطبيق محلياً بالكامل داخل المتصفح؟',
          answer: 'نعم، جميع الرسوم المتجهة والتمارين والإحصاءات تعمل محلياً دون خادم.',
        },
        {
          question: 'لماذا يوجد اختيار منفصل للغة الواجهة ونظام الإشارة؟',
          answer: 'لأن لغات الإشارة لغات طبيعية مستقلة وليست ترجمة حرفية للغات المنطوقة.',
        },
        {
          question: 'كيف يعمل قسم نقاط الضعف؟',
          answer: 'يرصد الإشارات التي أخطأت فيها أكثر وينشئ جولة مراجعة مخصصة لها.',
        },
        {
          question: 'هل يغني التطبيق عن الدورات مع معلمين صم؟',
          answer: 'لا، إنه أداة تدريب بصري مساعدة ويجب استكمالها بدورات معتمدة وتفاعل حقيقي.',
        },
        {
          question: 'هل يمكن مشاركة تمرين عبر الرابط؟',
          answer: 'نعم، عبر معاملات الرابط مثل ?mode=lookalike&lang=ar.',
        },
      ],
    },
    footer: {
      disclaimer:
        'أداة تعليمية للتدريب البصري على الهجاء الإصبعي والأرقام والمفاهيم الإشارية اليومية. لغات الإشارة لغات طبيعية متكاملة ذات تنوعات إقليمية وقواعد غير يدوية؛ احرص دائماً على استكمال التدريب مع معلمي لغة الإشارة الصم وضمن دورات معتمدة.',
      localPrivacy: 'تخزين محلي 100% في المتصفح · دون حاجة لحساب',
    },
  },

  zh: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — 手语指拼字母与日常手势测验',
      description:
        '在浏览器中 100% 本地练习手语指拼字母 A-Z、数字 0-10、易混手形辨析及日常非手控表情线索。',
      h1: '手语指拼与日常手势视觉训练器',
      subtitle:
        '交互式练习指拼字母、数字、相似手形辨析与日常交际线索，数据完全保存在本地浏览器。',
    },
    nav: {
      practice: '练习',
      progress: '学习进度',
      guide: '学习指南',
      faq: '常见问题',
      languageLabel: '界面语言',
    },
    systems: {
      label: '手语参考体系',
      asl: 'ASL（美国手语）',
      lse: 'LSE（西班牙手语）',
      isl: '国际通用 / 手形视觉训练',
      notice:
        '每种手语都是独立的自然语言，拥有各自语法、地域变体与面部表情规则。切换界面语言仅翻译文字，不会改变手语体系本身。',
    },
    modes: {
      spotter: {
        title: '字母与数字快速识别',
        short: '字母与数字',
        desc: '自由节奏或开启 10 秒计时器，快速识别 A–Z 指拼字母与 0–10 数字。',
      },
      builder: {
        title: '单词连拼构建器',
        short: '连拼单词',
        desc: '观看连续指拼动画序列，逐字母识读并拼出完整单词。',
      },
      lookalike: {
        title: '易混手形实验室',
        short: '相似手形辨析',
        desc: '对比练习容易混淆的手形，例如 M 与 N、U/V/R 或 F 与 9。',
      },
      cues: {
        title: '日常情景与面部表情',
        short: '日常交际线索',
        desc: '结合问候、求助与眉眼头部非手控动作，选择最贴合场景的表达。',
      },
      review: {
        title: '薄弱项专项复习',
        short: '薄弱项复习',
        desc: '仅针对您最常出错的手形与情景生成强化练习。',
      },
    },
    categories: {
      letters: '指拼字母 A–Z',
      numbers: '数字 0–10',
      lookalike: '相似手形辨析',
      cues: '日常交际与情景',
    },
    ui: {
      fullView: '完整视图',
      handZoom: '手部放大',
      timedMode: '计时 (10秒)',
      untimedMode: '不计时',
      filterAll: '全部',
      filterLetters: '字母 A–Z',
      filterNumbers: '数字 0–10',
      promptIdentifySign: '这个手形代表哪个字母或数字？',
      promptLookalike: '仔细观察拇指位置和手指弯曲度，这是哪一个？',
      promptBuilder: '观看指拼序列并拼出对应的单词：',
      promptCues: '选择符合以下交际场景的手势与面部表情：',
      promptReview: '薄弱项复习 — 请仔细辨认该手势：',
      correctBadge: '正确',
      incorrectBadge: '需复习',
      timeoutBadge: '超时',
      nextQuestion: '下一题',
      skipQuestion: '跳过',
      roundComplete: '本轮完成',
      roundScore: '本轮准确率',
      startNewRound: '开始新一轮',
      whatToLookFor: '手部观察要点',
      differenceVsSimilar: '与相似手形的区别',
      mistakeToAvoid: '常见错误提示',
      systemNoteLabel: '体系差异说明 (ASL vs LSE)',
      compareSideBySide: '并排对比',
      yourPick: '你的选择',
      correctSign: '正确手势',
      playSequence: '播放序列',
      pauseSequence: '暂停',
      speedSlow: '慢速',
      speedNormal: '正常',
      speedBrisk: '快速',
      stepLabel: '字母',
      clearWord: '清空',
      backspace: '退格',
      hintLetter: '提示下一个字母',
      checkSpelling: '检查拼写',
      shareLink: '分享练习链接',
      copiedLink: '已复制链接',
      nonManualLabel: '非手控表情线索',
      palmLabel: '掌心朝向',
      twoHandedLabel: '双手手势',
      oneHandedLabel: '单手手势',
    },
    nonManualNames: {
      neutral: '自然专注的面部表情',
      'brow-raise': '扬眉（是非疑问句或礼貌请求）',
      'brow-furrow': '皱眉（特殊疑问句或致歉）',
      'head-nod': '点头肯定',
      'head-shake': '摇头否定',
      'warm-smile': '温和友好的微笑',
    },
    palmNames: {
      front: '掌心朝前',
      back: '手背朝前',
      'side-in': '侧向内侧',
      'side-out': '侧向外侧',
      down: '掌心朝下',
      up: '掌心朝上',
    },
    stats: {
      heading: '优势与薄弱项分析',
      xp: '累计 XP',
      streak: '当前连胜',
      bestStreak: '最高连胜',
      accuracy: '总准确率',
      avgSpeed: '平均用时',
      secondsUnit: '秒',
      categoryBreakdown: '分类准确率',
      strengthsTitle: '优势板块',
      blindSpotsTitle: '待加强项',
      noDataYet: '完成几道练习题后即可查看分析报告。',
      noBlindSpots: '暂无高频错题，继续保持！',
      practiceBlindSpots: '专项复习错题',
      recentSessions: '最近记录',
      resetStats: '重置进度',
      confirmReset: '确认重置',
      cancelReset: '取消',
      missesLabel: '次错误',
    },
    monetization: {
      adLabel: '推广位',
      adPlaceholderNote: 'Media.net 自适应广告容器 — 已预留最小高度以避免布局偏移。',
      resourcesHeading: '推荐视觉词典与学习资源',
      resourcesDisclosure: '合作与联盟推广链接 · 已透明标注 (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: '图解手语视觉词典',
          category: '视觉参考',
          summary: '清晰展示手形角度、掌心朝向与日常主题词汇。',
          cta: '查看资源',
          href: 'https://example.com/sign-dictionary-zh?ref=signcue',
        },
        {
          title: '指拼流畅度与速读练习册',
          category: '专项练习',
          summary: '帮助学习者从整体轮廓快速识别连贯拼写的词组。',
          cta: '了解详情',
          href: 'https://example.com/workbook-zh?ref=signcue',
        },
        {
          title: '聋人教师亲授日常会话课',
          category: '认证课程',
          summary: '系统学习空间语法、面部表情与地区手语差异。',
          cta: '查看课程',
          href: 'https://example.com/deaf-course-zh?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: '手语视觉识别与指拼入门指南',
      guideLead: '流畅读懂指拼与日常手势的关键，在于同时关注拇指位置、掌心朝向以及眉眼等非手控特征。',
      sections: [
        {
          title: '1. 为什么手语不是全球通用的',
          body: 'ASL、中国手语、LSE、BSL 等都是各自独立演化的自然语言。',
          bullets: [
            'ASL 和 LSE 多使用单手指拼，而 BSL 使用双手指拼字母。',
            '即使是 ASL 与 LSE，在 F、G、K、T 等字母上也有明显差异。',
          ],
        },
        {
          title: '2. 手形、掌向与非手控语法',
          body: '手势意义由手形、位置、动作、掌向和面部表情共同构成。',
          bullets: [
            '扬眉常用于是非问句，皱眉常用于特殊疑问句。',
            '摇头配合“理解”手势会直接反转为“我不理解”。',
          ],
        },
        {
          title: '3. 常见指拼易错点',
          body: '握拳类字母（A、S、E、T、M、N）请优先观察拇指位置。',
          bullets: [
            'J 和 Z 包含空间轨迹，不能只看静止手形。',
            '善用“连拼单词”模式培养整词阅读感。',
          ],
        },
      ],
      faqHeading: '常见问题解答',
      faqItems: [
        {
          question: 'SignCue Trainer 是否完全在本地运行？',
          answer: '是的，所有 SVG 手势渲染、题库和统计都保存在浏览器 localStorage 中。',
        },
        {
          question: '为什么要区分界面语言和手语参考体系？',
          answer: '因为手语并非口语文字的直译，不同国家的手语各自独立。',
        },
        {
          question: '薄弱项模式如何帮助提分？',
          answer: '它会记录您错得最多的字母和手势，并自动生成针对性复习轮次。',
        },
        {
          question: '这个工具能替代手语课程吗？',
          answer: '不能，它适合辅助练习视觉识别，完整掌握手语仍需与聋人教师及认证课程配合。',
        },
        {
          question: '可以通过 URL 分享特定模式吗？',
          answer: '可以，例如 ?mode=lookalike&lang=zh。',
        },
      ],
    },
    footer: {
      disclaimer:
        '用于指拼字母、数字与日常手势概念的教育性视觉练习工具。手语是具有地域差异和非手控语法的完整自然语言；请务必结合聋人/手语教师指导及认证课程进行学习。',
      localPrivacy: '100% 浏览器本地存储 · 无需注册',
    },
  },

  ja: {
    dir: 'ltr',
    seo: {
      title: 'SignCue Trainer — 指文字・手話ビジュアルクイズ',
      description:
        '指文字アルファベット A-Z、数字 0-10、似た手形の判別、日常の手話表現をブラウザ内で 100% ローカル練習。',
      h1: '指文字＆日常手話ビジュアルトレーナー',
      subtitle:
        '指文字・数字・似た手形の識別・非手指表現（表情）をブラウザだけで手軽に反復練習できます。',
    },
    nav: {
      practice: '練習する',
      progress: '学習記録',
      guide: '学習ガイド',
      faq: 'よくある質問',
      languageLabel: '表示言語',
    },
    systems: {
      label: '手話参照システム',
      asl: 'ASL（アメリカ手話）',
      lse: 'LSE（スペイン手話）',
      isl: '国際 / 手形ビジュアル練習',
      notice:
        '手話はそれぞれ独自の文法・地域差・表情文法を持つ独立した自然言語です。画面の表示言語と練習する手話体系は別個に選択できます。',
    },
    modes: {
      spotter: {
        title: '指文字・数字スポット練習',
        short: '文字・数字 A–Z',
        desc: '自分のペースまたは10秒タイマーで、A–Zの指文字と0–10の数字を素早く判別します。',
      },
      builder: {
        title: '単語スペル読み取り練習',
        short: '単語スペル',
        desc: '連続して表示される指文字の流れを読み取り、単語を組み立てます。',
      },
      lookalike: {
        title: '似た手形の見分けラボ',
        short: '似た手形ラボ',
        desc: 'MとN、U/V/R、Fと9など、見間違いやすい手形の細部を比較します。',
      },
      cues: {
        title: '日常シーンと非手指表現',
        short: '日常の表現',
        desc: '挨拶や依頼、眉や頭の動きを伴う場面に合う手話を判断します。',
      },
      review: {
        title: '苦手ポイント集中復習',
        short: '苦手復習',
        desc: '誤答の多い手形やカテゴリーだけを集めた復習ラウンドを開始します。',
      },
    },
    categories: {
      letters: '指文字 (A–Z)',
      numbers: '数字 (0–10)',
      lookalike: '似た手形の判別',
      cues: '日常表現と文脈',
    },
    ui: {
      fullView: '全体表示',
      handZoom: '手元ズーム',
      timedMode: 'タイマー (10秒)',
      untimedMode: '時間制限なし',
      filterAll: 'すべて',
      filterLetters: '文字 A–Z',
      filterNumbers: '数字 0–10',
      promptIdentifySign: 'この手形はどの文字または数字を表していますか？',
      promptLookalike: '親指の位置と指の曲げ方に注目してください。どれですか？',
      promptBuilder: '指文字の流れを見て、単語を完成させてください：',
      promptCues: 'この場面に合う手話と表情を選んでください：',
      promptReview: '苦手復習 — 正しい手話を選んでください：',
      correctBadge: '正解',
      incorrectBadge: '要復習',
      timeoutBadge: '時間切れ',
      nextQuestion: '次の問題',
      skipQuestion: 'スキップ',
      roundComplete: 'ラウンド完了',
      roundScore: '正答率',
      startNewRound: '新しいラウンド',
      whatToLookFor: '手元の注目ポイント',
      differenceVsSimilar: '似た手形との違い',
      mistakeToAvoid: 'よくある間違い',
      systemNoteLabel: 'システム補足 (ASL / LSE)',
      compareSideBySide: '並べて比較',
      yourPick: 'あなたの選択',
      correctSign: '正解の手形',
      playSequence: '連続再生',
      pauseSequence: '一時停止',
      speedSlow: 'ゆっくり',
      speedNormal: '標準',
      speedBrisk: '速め',
      stepLabel: '文字',
      clearWord: 'クリア',
      backspace: '1文字削除',
      hintLetter: '次の文字を表示',
      checkSpelling: '単語を確認',
      shareLink: '練習リンクを共有',
      copiedLink: 'コピーしました',
      nonManualLabel: '非手指表現（表情・頭）',
      palmLabel: '手のひら',
      twoHandedLabel: '両手の手話',
      oneHandedLabel: '片手の手話',
    },
    nonManualNames: {
      neutral: '落ち着いた自然な表情',
      'brow-raise': '眉を上げる（Yes/No疑問・丁寧な依頼）',
      'brow-furrow': '眉を寄せる（疑問詞質問・謝罪）',
      'head-nod': 'うなずき（肯定）',
      'head-shake': '首を横に振る（否定）',
      'warm-smile': '穏やかで親しみのある表情',
    },
    palmNames: {
      front: '正面向き',
      back: '手の甲が正面',
      'side-in': '横向き（内側）',
      'side-out': '横向き（外側）',
      down: '下向き',
      up: '上向き',
    },
    stats: {
      heading: '得意分野と苦手ポイント',
      xp: '合計 XP',
      streak: '連続正解',
      bestStreak: '最高記録',
      accuracy: '総合正答率',
      avgSpeed: '平均回答時間',
      secondsUnit: '秒',
      categoryBreakdown: 'カテゴリー別正答率',
      strengthsTitle: '得意な領域',
      blindSpotsTitle: '復習したい項目',
      noDataYet: '数問解くと学習プロフィールが表示されます。',
      noBlindSpots: '目立った苦手項目はまだありません！',
      practiceBlindSpots: '苦手項目を練習する',
      recentSessions: '最近の履歴',
      resetStats: '記録をリセット',
      confirmReset: 'リセット確定',
      cancelReset: 'キャンセル',
      missesLabel: '回ミス',
    },
    monetization: {
      adLabel: '広告枠',
      adPlaceholderNote: 'レイアウトずれ防止のため最小高さを確保した Media.net 広告枠です。',
      resourcesHeading: 'おすすめの視覚教材・手話辞典',
      resourcesDisclosure: 'アフィリエイト・提携リンク · 明示ラベル付き (rel="sponsored nofollow noopener")',
      resources: [
        {
          title: 'イラスト手話ビジュアル辞典',
          category: '視覚リファレンス',
          summary: '手形・手のひらの向き・基本語彙を分かりやすく図解した入門辞典。',
          cta: '教材を見る',
          href: 'https://example.com/sign-dictionary-ja?ref=signcue',
        },
        {
          title: '指文字リーディング集中ドリル',
          category: '実践ワークブック',
          summary: '一文字ずつ止めずに単語のまとまりで読み取る力を養います。',
          cta: '詳細を見る',
          href: 'https://example.com/workbook-ja?ref=signcue',
        },
        {
          title: 'ろう者講師による日常手話講座',
          category: '認定コース',
          summary: '空間文法や表情の使い分け、地域表現を体系的に学べます。',
          cta: 'カリキュラムを見る',
          href: 'https://example.com/deaf-course-ja?ref=signcue',
        },
      ],
    },
    editorial: {
      guideHeading: '指文字と手話の視覚認識・入門ガイド',
      guideLead:
        '指文字の読み取りと手形の区別を上達させるには、親指の位置・手のひらの向き・表情の3点を同時に捉えることが重要です。',
      sections: [
        {
          title: '1. 手話が世界共通ではない理由',
          body: 'ASL・日本手話（JSL）・LSE・BSLなどは、それぞれ異なる歴史と文法を持つ独立した自然言語です。',
          bullets: [
            'ASLやLSEは主に片手で指文字を表しますが、BSLは両手を使います。',
            'F・G・K・Tなどは手話体系によって手形が異なります。',
          ],
        },
        {
          title: '2. 手形と非手指表現（NMM）の役割',
          body: '手話では眉の動きや首の振りが文法的な意味を担います。',
          bullets: [
            '眉を上げるとYes/Noの質問、眉を寄せると疑問詞の質問になります。',
            '首を横に振ることで「わかる」が「わからない」へ反転します。',
          ],
        },
        {
          title: '3. よくある読み取りミスを防ぐコツ',
          body: '握りこぶし系の文字（A・S・E・T・M・N）は最初に親指の置き場所を見ます。',
          bullets: [
            'JやZのように空中で軌跡を描く文字は矢印の動きに注目します。',
            '単語スペル練習モードで連続した流れに目を慣らしましょう。',
          ],
        },
      ],
      faqHeading: 'よくある質問',
      faqItems: [
        {
          question: 'このアプリはブラウザだけで動作しますか？',
          answer: 'はい。SVG描画も学習データの保存も100%ブラウザ内で完結します。',
        },
        {
          question: 'UI言語と手話システムを分けているのはなぜですか？',
          answer: '手話は音声言語の逐語訳ではなく独立した言語であるためです。',
        },
        {
          question: '苦手復習モードの仕組みは？',
          answer: '間違えやすい手形を自動集計し、集中的に出題します。',
        },
        {
          question: '手話教室の代わりになりますか？',
          answer: 'いいえ。視覚練習の補助ツールとして活用し、実践的な会話はろう者講師や認定講座で学ぶことを推奨します。',
        },
        {
          question: 'URLで特定のモードを共有できますか？',
          answer: 'はい。?mode=lookalike&lang=ja のように指定できます。',
        },
      ],
    },
    footer: {
      disclaimer:
        '指文字・数字・日常的な手話表現の視覚認識を練習するための教育用ツールです。手話は地域差や非手指文法を備えた完全な自然言語であり、常にろう者・手話指導者および認定講座での学習と併用してください。',
      localPrivacy: 'ブラウザ内100%ローカル保存 · アカウント不要',
    },
  },
};
