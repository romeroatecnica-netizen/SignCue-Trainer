import type {LangCode, SignItem, SignSystem} from '../types/sign';
import {resolveVisualForSystem} from '../data/signBank';
import {TRANSLATIONS} from './translations';

interface CueContent {
  label: string;
  scenario: string;
}

const CUE_LOCALIZED: Record<LangCode, Record<string, CueContent>> = {
  en: {
    'cue-hello': {
      label: 'Hello / Greeting',
      scenario: 'You meet someone at a community center and want to open with a warm greeting from the forehead.',
    },
    'cue-thankyou': {
      label: 'Thank You',
      scenario: 'Someone holds the door for you. Which flat-hand cue moves forward from the chin with a warm smile?',
    },
    'cue-please': {
      label: 'Please',
      scenario: 'You make a polite request. Notice the open palm rubbing in a gentle circle over the chest.',
    },
    'cue-sorry': {
      label: 'Sorry',
      scenario: 'You accidentally bump someone and apologize using a closed fist circling on the chest with softened brows.',
    },
    'cue-yes': {
      label: 'Yes',
      scenario: 'Someone asks if you are ready to begin. Which nodding fist confirms affirmatively?',
    },
    'cue-no': {
      label: 'No',
      scenario: 'You want to decline politely. Notice the index and middle fingers snapping onto the thumb with a head shake.',
    },
    'cue-help': {
      label: 'Help',
      scenario: 'You offer assistance: one thumb-up fist rests on an open base palm and lifts upward together.',
    },
    'cue-question-yn': {
      label: 'Yes/No Question',
      scenario: 'You ask a closed question expecting Yes or No. Look for raised eyebrows paired with a hooked index cue.',
    },
    'cue-question-wh': {
      label: 'Wh- Question (Who / What / Where)',
      scenario: 'You ask an open information question. Look for furrowed brows with open palms shaking side-to-side.',
    },
    'cue-understand': {
      label: 'Understand',
      scenario: 'A concept clicks! Notice the index finger flicking upward near the temple accompanied by a head nod.',
    },
    'cue-dont-understand': {
      label: "Don't Understand",
      scenario: 'You missed part of the explanation. Notice the temple handshape paired with furrowed brows and a head shake.',
    },
    'cue-more': {
      label: 'More',
      scenario: 'You want to ask for additional time or another example using two flattened O-hands tapping together.',
    },
  },
  es: {
    'cue-hello': {
      label: 'Hola / Saludo',
      scenario: 'Te encuentras con alguien y quieres saludar con la mano abierta partiendo cerca de la frente.',
    },
    'cue-thankyou': {
      label: 'Gracias',
      scenario: 'Alguien te cede el paso. ¿Qué signo parte de la barbilla hacia delante con expresión amable?',
    },
    'cue-please': {
      label: 'Por favor',
      scenario: 'Haces una petición cortés: observa la palma plana dibujando un círculo suave sobre el pecho.',
    },
    'cue-sorry': {
      label: 'Lo siento / Perdón',
      scenario: 'Te disculpas tras un descuido usando un puño cerrado en círculo sobre el pecho y cejas suavizadas.',
    },
    'cue-yes': {
      label: 'Sí',
      scenario: 'Te preguntan si estás listo para empezar. ¿Qué puño asiente de arriba abajo para confirmar?',
    },
    'cue-no': {
      label: 'No',
      scenario: 'Quieres declinar con claridad: índice y corazón se juntan con el pulgar junto a una negación de cabeza.',
    },
    'cue-help': {
      label: 'Ayuda',
      scenario: 'Ofreces o pides apoyo: un puño con pulgar arriba se apoya sobre la palma base y sube.',
    },
    'cue-question-yn': {
      label: 'Pregunta (Sí / No)',
      scenario: 'Formulas una pregunta cerrada. Fíjate en las cejas elevadas acompañando al índice curvado.',
    },
    'cue-question-wh': {
      label: 'Pregunta abierta (Qué / Quién / Dónde)',
      scenario: 'Pides información concreta. Observa las cejas fruncidas y las palmas abiertas oscilando.',
    },
    'cue-understand': {
      label: 'Entiendo',
      scenario: 'Captas la idea: el índice se despliega junto a la sien acompañado de un asentimiento suave.',
    },
    'cue-dont-understand': {
      label: 'No entiendo',
      scenario: 'No has seguido la explicación: mismo gesto junto a la sien pero con negación clara de cabeza.',
    },
    'cue-more': {
      label: 'Más',
      scenario: 'Pides repetir o añadir un ejemplo juntando las puntas de ambas manos en O plana.',
    },
  },
  fr: {
    'cue-hello': {label: 'Bonjour / Salut', scenario: 'Vous saluez chaleureusement avec une main ouverte depuis le front.'},
    'cue-thankyou': {label: 'Merci', scenario: 'Une main plate part du menton vers l’avant avec un sourire ouvert.'},
    'cue-please': {label: 'S’il vous plaît', scenario: 'La paume ouverte décrit un cercle doux sur la poitrine pour une demande polie.'},
    'cue-sorry': {label: 'Pardon / Désolé', scenario: 'Un poing fermé tourne sur la poitrine avec une expression d’excuse.'},
    'cue-yes': {label: 'Oui', scenario: 'Le poing hoche de haut en bas pour confirmer avec un hochement de tête.'},
    'cue-no': {label: 'Non', scenario: 'L’index et le majeur se referment sur le pouce avec un mouvement de tête négatif.'},
    'cue-help': {label: 'Aide', scenario: 'Un poing pouce levé repose sur la paume de soutien et s’élève ensemble.'},
    'cue-question-yn': {label: 'Question (Oui/Non)', scenario: 'Sourcils levés avec l’index recourbé pour poser une question fermée.'},
    'cue-question-wh': {label: 'Question ouverte (Qui/Quoi/Où)', scenario: 'Sourcils froncés avec les deux paumes ouvertes dirigées vers le haut.'},
    'cue-understand': {label: 'Je comprends', scenario: 'L’index se déplie près de la tempe accompagné d’un hochement affirmatif.'},
    'cue-dont-understand': {label: 'Je ne comprends pas', scenario: 'Même zone près de la tempe mais inversé par un mouvement négatif de la tête.'},
    'cue-more': {label: 'Encore / Plus', scenario: 'Les bouts des doigts des deux mains en O aplati se touchent à répétition.'},
  },
  de: {
    'cue-hello': {label: 'Hallo / Gruß', scenario: 'Freundliche Begrüßung mit geöffneter Hand von der Stirn nach außen.'},
    'cue-thankyou': {label: 'Danke', scenario: 'Flache Hand bewegt sich vom Kinn nach vorn mit einem warmen Lächeln.'},
    'cue-please': {label: 'Bitte', scenario: 'Offene Handfläche kreist ruhig auf der Brust als höfliche Bitte.'},
    'cue-sorry': {label: 'Entschuldigung', scenario: 'Geschlossene Faust kreist auf der Brust mit bedauernder Mimik.'},
    'cue-yes': {label: 'Ja', scenario: 'Geschlossene Faust nickt abwärts-aufwärts passend zum Kopfnicken.'},
    'cue-no': {label: 'Nein', scenario: 'Zeige- und Mittelfinger tippen auf den Daumen bei gleichzeitigem Kopfschütteln.'},
    'cue-help': {label: 'Hilfe', scenario: 'Faust mit aufgestelltem Daumen auf der flachen Stützhand hebt sich nach oben.'},
    'cue-question-yn': {label: 'Ja/Nein-Frage', scenario: 'Gehobene Augenbrauen zusammen mit gekrümmtem Zeigefinger für eine Entscheidungsfrage.'},
    'cue-question-wh': {label: 'W-Frage (Wer/Was/Wo)', scenario: 'Zusammengezogene Brauen mit zwei nach oben geöffneten Handflächen.'},
    'cue-understand': {label: 'Verstehen', scenario: 'Zeigefinger schnellt an der Schläfe hoch, begleitet von einem Nicken.'},
    'cue-dont-understand': {label: 'Nicht verstehen', scenario: 'An der Schläfe ausgeführt, jedoch durch deutliches Kopfschütteln verneint.'},
    'cue-more': {label: 'Mehr / Noch', scenario: 'Beide abgeflachten O-Hände tippen mit den Fingerspitzen aneinander.'},
  },
  pt: {
    'cue-hello': {label: 'Olá / Cumprimento', scenario: 'Saudação calorosa com a mão aberta saindo da testa.'},
    'cue-thankyou': {label: 'Obrigado(a)', scenario: 'Mão aberta parte do queixo para a frente com sorriso acolhedor.'},
    'cue-please': {label: 'Por favor', scenario: 'Palma aberta faz um círculo suave no peito em sinal de pedido educado.'},
    'cue-sorry': {label: 'Desculpe', scenario: 'Punho fechado gira sobre o peito com sobrancelhas suavemente franzidas.'},
    'cue-yes': {label: 'Sim', scenario: 'Punho fechado acena para cima e para baixo confirmando com a cabeça.'},
    'cue-no': {label: 'Não', scenario: 'Indicador e médio fecham no polegar acompanhados de negação com a cabeça.'},
    'cue-help': {label: 'Ajuda', scenario: 'Punho com polegar para cima apoiado na palma base sobe em conjunto.'},
    'cue-question-yn': {label: 'Pergunta (Sim/Não)', scenario: 'Sobrancelhas erguidas com o dedo indicador em gancho.'},
    'cue-question-wh': {label: 'Pergunta aberta (O quê/Quem/Onde)', scenario: 'Sobrancelhas franzidas e duas palmas abertas voltadas para cima.'},
    'cue-understand': {label: 'Entendo', scenario: 'Indicador estende-se junto à têmpora com aceno afirmativo.'},
    'cue-dont-understand': {label: 'Não entendo', scenario: 'Sinal junto à têmpora invertido por movimento negativo da cabeça.'},
    'cue-more': {label: 'Mais', scenario: 'Pontas dos dedos das duas mãos em O achatado tocam-se no centro.'},
  },
  ru: {
    'cue-hello': {label: 'Привет / Здравствуйте', scenario: 'Тёплое приветствие открытой ладонью от уровня лба.'},
    'cue-thankyou': {label: 'Спасибо', scenario: 'Прямая ладонь плавно движется от подбородка вперёд с улыбкой.'},
    'cue-please': {label: 'Пожалуйста', scenario: 'Открытая ладонь совершает мягкое круговое движение на груди.'},
    'cue-sorry': {label: 'Извините', scenario: 'Сжатый кулак описывает круг на груди с извиняющейся мимикой.'},
    'cue-yes': {label: 'Да', scenario: 'Кулак кивает вверх-вниз в такт утвердительному кивку головы.'},
    'cue-no': {label: 'Нет', scenario: 'Указательный и средний пальцы смыкаются с большим при покачивании головы.'},
    'cue-help': {label: 'Помощь', scenario: 'Кулак с поднятым большим пальцем опирается на ладонь и поднимается вверх.'},
    'cue-question-yn': {label: 'Вопрос (Да/Нет)', scenario: 'Поднятые брови в сочетании с согнутым крючком указательным пальцем.'},
    'cue-question-wh': {label: 'Открытый вопрос (Кто/Что/Где)', scenario: 'Сдвинутые брови и две открытые ладони, обращённые вверх.'},
    'cue-understand': {label: 'Понимаю', scenario: 'Указательный палец раскрывается у виска с утвердительным кивком.'},
    'cue-dont-understand': {label: 'Не понимаю', scenario: 'Жест у виска, смысл которого меняется на противоположный из-за покачивания головы.'},
    'cue-more': {label: 'Ещё / Больше', scenario: 'Кончики пальцев обеих рук в форме плоской О касаются друг друга.'},
  },
  hi: {
    'cue-hello': {label: 'नमस्ते / अभिवादन', scenario: 'माथे के पास से खुली हथेली बाहर की ओर ले जाते हुए गर्मजोशी भरा अभिवादन।'},
    'cue-thankyou': {label: 'धन्यवाद', scenario: 'ठोड़ी से खुली हथेली मुस्कान के साथ आगे की ओर बढ़ती है।'},
    'cue-please': {label: 'कृपया', scenario: 'विनम्र अनुरोध के लिए खुली हथेली छाती पर गोल घूमती है।'},
    'cue-sorry': {label: 'माफ़ कीजिए', scenario: 'बंद मुट्ठी छाती पर घूमती है और चेहरे पर क्षमा का भाव होता है।'},
    'cue-yes': {label: 'हाँ', scenario: 'सहमति दिखाने के लिए मुट्ठी ऊपर-नीचे झुकती है।'},
    'cue-no': {label: 'नहीं', scenario: 'तर्जनी और मध्यमा उंगली अंगूठे से मिलती हैं और सिर न में हिलता है।'},
    'cue-help': {label: 'मदद', scenario: 'दूसरी खुली हथेली पर रखा अंगूठा-ऊपर मुट्ठी हाथ ऊपर उठता है।'},
    'cue-question-yn': {label: 'हाँ/ना प्रश्न', scenario: 'उठी हुई भौंहों के साथ मुड़ी हुई तर्जनी उंगली।'},
    'cue-question-wh': {label: 'विस्तृत प्रश्न (क्या/कौन/कहाँ)', scenario: 'सिकुड़ी भौंहों के साथ ऊपर खुली दोनों हथेलियाँ।'},
    'cue-understand': {label: 'समझ गया', scenario: 'कनपटी के पास तर्जनी ऊपर उठती है और सिर हाँ में झुकता है।'},
    'cue-dont-understand': {label: 'नहीं समझा', scenario: 'कनपटी के संकेत के साथ सिर न में हिलता है।'},
    'cue-more': {label: 'और / अधिक', scenario: 'दोनों चपटे O आकार के हाथों के सिरे आपस में मिलते हैं।'},
  },
  ar: {
    'cue-hello': {label: 'مرحباً / تحية', scenario: 'تحية دافئة بيد مفتوحة تنطلق من قرب الجبهة إلى الخارج.'},
    'cue-thankyou': {label: 'شكراً', scenario: 'كف مفرودة تتحرك من الذقن إلى الأمام مع ابتسامة لطيفة.'},
    'cue-please': {label: 'من فضلك', scenario: 'كف مفتوحة ترسم دائرة لطيفة على الصدر لطلب مهذب.'},
    'cue-sorry': {label: 'آسف / المعذرة', scenario: 'قبضة مغلقة تدور على الصدر مع تعبير اعتذار على الوجه.'},
    'cue-yes': {label: 'نعم', scenario: 'قبضة تتحرك للأعلى والأسفل مع إيماءة رأس مؤكدة.'},
    'cue-no': {label: 'لا', scenario: 'السبابة والوسطى تنطبقان على الإبهام مع هز الرأس للنفي.'},
    'cue-help': {label: 'مساعدة', scenario: 'قبضة بإبهام مرفوع تستند على الكف الأخرى وترتفعان معاً.'},
    'cue-question-yn': {label: 'سؤال (نعم/لا)', scenario: 'حاجبان مرفوعان مع انحناء السبابة على شكل خطاف.'},
    'cue-question-wh': {label: 'سؤال مفتوح (من/ماذا/أين)', scenario: 'حاجبان مقطبان مع كفين مفتوحتين للأعلى.'},
    'cue-understand': {label: 'أفهم', scenario: 'السبابة ترتفع قرب الصدغ مع إيماءة رأس إيجابية.'},
    'cue-dont-understand': {label: 'لا أفهم', scenario: 'نفس الإشارة قرب الصدغ ولكنها تنقلب للنفي بهز الرأس.'},
    'cue-more': {label: 'المزيد', scenario: 'أطراف أصابع اليدين بشكل O مسطح تتلامس في الوسط.'},
  },
  zh: {
    'cue-hello': {label: '你好 / 问候', scenario: '在额前张开手掌向外挥动，发出友好的问候。'},
    'cue-thankyou': {label: '谢谢', scenario: '平展手掌从下巴处微笑向前伸出表示感谢。'},
    'cue-please': {label: '请 / 拜托', scenario: '张开的掌心在胸前轻柔画圆，表示礼貌请求。'},
    'cue-sorry': {label: '对不起', scenario: '握拳在胸前画圆，同时配合略带歉意的眉毛神态。'},
    'cue-yes': {label: '是的', scenario: '握拳上下点头摆动，配合肯定点头动作。'},
    'cue-no': {label: '不是 / 不', scenario: '食指和中指快速合拢点向拇指，并配合摇头。'},
    'cue-help': {label: '帮助', scenario: '竖起拇指的拳头放在另一只平展掌心上共同向上托起。'},
    'cue-question-yn': {label: '是非问句', scenario: '扬起眉毛并配合弯曲成钩状的食指。'},
    'cue-question-wh': {label: '特殊疑问句（谁/什么/哪里）', scenario: '微皱眉头并配合双手掌心朝上摆动。'},
    'cue-understand': {label: '我明白', scenario: '在太阳穴旁食指向上弹起，并伴随点头确认。'},
    'cue-dont-understand': {label: '我不明白', scenario: '同样在太阳穴附近做出手势，但通过摇头将语义反转为否定。'},
    'cue-more': {label: '更多 / 再来一次', scenario: '双手捏成扁平 O 形，指尖在胸前轻点相碰。'},
  },
  ja: {
    'cue-hello': {label: 'こんにちは / 挨拶', scenario: '額のあたりから開いた手を外へ動かす親しみのある挨拶です。'},
    'cue-thankyou': {label: 'ありがとう', scenario: 'あごから平らな手を笑顔とともに前へ動かします。'},
    'cue-please': {label: 'お願いします', scenario: '開いた手のひらを胸の前で円を描くように動かします。'},
    'cue-sorry': {label: 'ごめんなさい', scenario: '握りこぶしを胸で回し、申し訳なさそうな表情を添えます。'},
    'cue-yes': {label: 'はい', scenario: 'こぶしを上下に振り、うなずきと合わせて肯定します。'},
    'cue-no': {label: 'いいえ', scenario: '人差し指と中指を親指に閉じ、首を横に振ります。'},
    'cue-help': {label: '助けて / 手伝い', scenario: '平らな掌の上に親指を立てたこぶしを乗せて一緒に上げます。'},
    'cue-question-yn': {label: 'Yes/No 疑問文', scenario: '眉を上げながら、かぎ形に曲げた人差し指で尋ねます。'},
    'cue-question-wh': {label: '疑問詞の質問（誰・何・どこ）', scenario: '眉を寄せ、両手のひらを上に向けて軽く振ります。'},
    'cue-understand': {label: 'わかります', scenario: 'こめかみ付近で人差し指をピンと立ててうなずきます。'},
    'cue-dont-understand': {label: 'わかりません', scenario: '同じこめかみの手話でも、首を横に振ることで否定に変わります。'},
    'cue-more': {label: 'もっと / もう一度', scenario: '平らなOの形にした両手の指先を胸の前で合わせます。'},
  },
};

const COMPARE_LABELS: Record<LangCode, {
  extended: string;
  closed: string;
  thumbOut: string;
  thumbAcross: string;
  thumbTucked: string;
  thumbTouch: string;
  thumbBetween: string;
  motionLine: string;
  mistakeThumb: string;
  mistakePalm: string;
  mistakeMotion: string;
  mistakeNonManual: string;
  aslVsLseNote: string;
}> = {
  en: {
    extended: 'Extended fingers',
    closed: 'Curled / closed fingers',
    thumbOut: 'Thumb extended outward beside the hand',
    thumbAcross: 'Thumb folded across the front of the fingers',
    thumbTucked: 'Thumb tucked inward beneath bent fingertips',
    thumbTouch: 'Thumbtip pinching directly against fingertip(s)',
    thumbBetween: 'Thumb peeking cleanly between curled fingers',
    motionLine: 'Dynamic spatial motion path shown by the indigo arrow',
    mistakeThumb: 'Mistaking thumb placement (side vs across vs tucked between fingers) is the #1 error.',
    mistakePalm: 'Keep track of palm orientation: rotating from front to back or sideways changes the sign.',
    mistakeMotion: 'Do not confuse static letters (like I or 1) with moving signs (like J or Z).',
    mistakeNonManual: 'Never ignore eyebrow or head cues — they reverse meaning or mark sentence type.',
    aslVsLseNote: 'Notice how ASL and LSE form this character differently in finger hook and palm orientation.',
  },
  es: {
    extended: 'Dedos extendidos',
    closed: 'Dedos flexionados / cerrados',
    thumbOut: 'Pulgar extendido hacia fuera al lateral',
    thumbAcross: 'Pulgar cruzado por delante de los dedos',
    thumbTucked: 'Pulgar recogido bajo las puntas flexionadas',
    thumbTouch: 'Yema del pulgar tocando directamente la punta de los dedos',
    thumbBetween: 'Pulgar asomando entre los dedos doblados',
    motionLine: 'Trayectoria espacial dinámica indicada por la flecha índigo',
    mistakeThumb: 'Confundir la posición del pulgar (lateral vs cruzado vs entre dedos) es el error más común.',
    mistakePalm: 'Fíjate en la orientación de la palma: girarla hacia el cuerpo o de lado cambia el signo.',
    mistakeMotion: 'No confundas configuraciones estáticas (como I o 1) con signos con trayectoria (J o Z).',
    mistakeNonManual: 'No ignores las cejas ni la cabeza: cambian el tipo de pregunta o niegan el verbo.',
    aslVsLseNote: 'Observa que ASL y LSE articulan esta letra de forma distinta en flexión y orientación.',
  },
  fr: {
    extended: 'Doigts tendus',
    closed: 'Doigts repliés / fermés',
    thumbOut: 'Pouce tendu sur le côté',
    thumbAcross: 'Pouce replié devant les doigts',
    thumbTucked: 'Pouce rentré sous les bouts des doigts',
    thumbTouch: 'Pulpe du pouce en contact avec les doigts',
    thumbBetween: 'Pouce glissé entre les doigts pliés',
    motionLine: 'Trajectoire dynamique indiquée par la flèche indigo',
    mistakeThumb: 'Confondre la position exacte du pouce est l’erreur la plus fréquente.',
    mistakePalm: 'Vérifiez l’orientation de la paume : de face, de profil ou vers le bas change le signe.',
    mistakeMotion: 'Distinguez bien les signes fixes (I, 1) des signes avec mouvement (J, Z).',
    mistakeNonManual: 'Ne négligez pas les sourcils et la tête : ils portent le sens grammatical.',
    aslVsLseNote: 'Notez la différence de forme entre l’ASL et la LSE pour ce caractère.',
  },
  de: {
    extended: 'Gestreckte Finger',
    closed: 'Gebeugte / geschlossene Finger',
    thumbOut: 'Daumen seitlich abgespreizt',
    thumbAcross: 'Daumen quer vor den Fingern',
    thumbTucked: 'Daumen unter den gebeugten Fingerspitzen',
    thumbTouch: 'Daumenspitze berührt gezielt die Fingerspitze(n)',
    thumbBetween: 'Daumen ragt zwischen den gebeugten Fingern hervor',
    motionLine: 'Bewegungsbahn durch den indigoblauen Pfeil angezeigt',
    mistakeThumb: 'Die Verwechslung der Daumenposition ist der häufigste Fehler bei Faustformen.',
    mistakePalm: 'Achten Sie auf die Handflächenrichtung (vorn, seitlich, unten).',
    mistakeMotion: 'Statische Formen (I, 1) nicht mit dynamischen Zeichen (J, Z) verwechseln.',
    mistakeNonManual: 'Augenbrauen und Kopfnicken/-schütteln gehören fest zur Bedeutung.',
    aslVsLseNote: 'Beachten Sie den Unterschied zwischen ASL und LSE bei diesem Buchstaben.',
  },
  pt: {
    extended: 'Dedos estendidos',
    closed: 'Dedos dobrados / fechados',
    thumbOut: 'Polegar estendido para fora na lateral',
    thumbAcross: 'Polegar cruzado à frente dos dedos',
    thumbTucked: 'Polegar recolhido sob as pontas dos dedos',
    thumbTouch: 'Ponta do polegar tocando diretamente os dedos',
    thumbBetween: 'Polegar aparecendo entre os dedos dobrados',
    motionLine: 'Trajetória espacial indicada pela seta índigo',
    mistakeThumb: 'Trocar a posição do polegar é o erro mais frequente em sinais de punho.',
    mistakePalm: 'Observe a orientação da palma: frente, lado ou para baixo muda o sinal.',
    mistakeMotion: 'Não confunda letras estáticas (I, 1) com letras em movimento (J, Z).',
    mistakeNonManual: 'Expressões de sobrancelha e cabeça mudam a frase ou negam o sentido.',
    aslVsLseNote: 'Repare na diferença de articulação entre ASL e LSE nesta letra.',
  },
  ru: {
    extended: 'Выпрямленные пальцы',
    closed: 'Согнутые / сжатые пальцы',
    thumbOut: 'Большой палец отведён в сторону',
    thumbAcross: 'Большой палец лежит поперёк пальцев',
    thumbTucked: 'Большой палец спрятан под согнутыми пальцами',
    thumbTouch: 'Кончик большого пальца касается кончиков пальцев',
    thumbBetween: 'Большой палец проглядывает между согнутыми пальцами',
    motionLine: 'Траектория движения показана стрелкой индиго',
    mistakeThumb: 'Ошибка в положении большого пальца — самая частая причина путаницы.',
    mistakePalm: 'Следите за разворотом ладони (вперёд, вбок или вниз).',
    mistakeMotion: 'Не путайте статичные формы (I, 1) с динамическими (J, Z).',
    mistakeNonManual: 'Брови и движения головы критически важны для смысла высказывания.',
    aslVsLseNote: 'Обратите внимание на различие этого знака в системах ASL и LSE.',
  },
  hi: {
    extended: 'सीधी उंगलियाँ',
    closed: 'मुड़ी / बंद उंगलियाँ',
    thumbOut: 'अंगूठा बाहर की ओर सीधा',
    thumbAcross: 'अंगूठा उंगलियों के सामने मुड़ा हुआ',
    thumbTucked: 'अंगूठा मुड़ी उंगलियों के नीचे छिपा हुआ',
    thumbTouch: 'अंगूठे की नोक उंगलियों को छूती हुई',
    thumbBetween: 'अंगूठा मुड़ी उंगलियों के बीच से झाँकता हुआ',
    motionLine: 'नीले तीर द्वारा दिखाई गई गति की दिशा',
    mistakeThumb: 'अंगूठे की स्थिति की पहचान न करना सबसे आम गलती है।',
    mistakePalm: 'हथेली की दिशा का ध्यान रखें — आगे, बगल या नीचे घूमने से संकेत बदलता है।',
    mistakeMotion: 'स्थिर अक्षरों (I, 1) को गति वाले संकेतों (J, Z) से न मिलाएँ।',
    mistakeNonManual: 'भौंहों और सिर के संकेतों को अनदेखा न करें — वे पूरा अर्थ बदल सकते हैं।',
    aslVsLseNote: 'ASL और LSE प्रणालियों में इस अक्षर की बनावट भिन्न होती है।',
  },
  ar: {
    extended: 'أصابع ممدودة',
    closed: 'أصابع مثنية أو مغلقة',
    thumbOut: 'الإبهام ممدود للخارج جانبياً',
    thumbAcross: 'الإبهام مطوي أمام الأصابع',
    thumbTucked: 'الإبهام مخبأ تحت أطراف الأصابع',
    thumbTouch: 'طرف الإبهام يلامس طرف الإصبع مباشرة',
    thumbBetween: 'الإبهام يظهر بوضوح بين الأصابع المثنية',
    motionLine: 'مسار الحركة الموضح بالسهم النيلي',
    mistakeThumb: 'الخلط في موضع الإبهام هو الخطأ الأكثر شيوعاً في الأشكال المغلقة.',
    mistakePalm: 'انتبه لاتجاه راحة اليد: للأمام أو جانباً أو للأسفل يغيّر الإشارة.',
    mistakeMotion: 'لا تخلط بين الأشكال الثابتة (مثل I و 1) والإشارات المتحركة (J و Z).',
    mistakeNonManual: 'لا تتجاهل حركات الحاجبين والرأس — فهي تغيّر نوع الجملة أو تنفيها.',
    aslVsLseNote: 'لاحظ الاختلاف بين ASL و LSE في طريقة تشكيل هذا الحرف.',
  },
  zh: {
    extended: '伸直的手指',
    closed: '弯曲或收拢的手指',
    thumbOut: '拇指朝外侧伸展',
    thumbAcross: '拇指横压在四指前方',
    thumbTucked: '拇指内收在弯曲指尖下方',
    thumbTouch: '拇指指尖直接捏合对应指尖',
    thumbBetween: '拇指卡在弯曲的手指缝隙之间',
    motionLine: '靛蓝箭头指示的空间运动轨迹',
    mistakeThumb: '混淆拇指位置（侧伸、横压或夹在指间）是最常见的错误。',
    mistakePalm: '注意掌心朝向：朝前、朝侧或朝下会变成完全不同的手势。',
    mistakeMotion: '区分静态手形（如 I 或 1）与带有轨迹的动态字母（如 J 或 Z）。',
    mistakeNonManual: '切勿忽略眉毛与头部动作——它们会改变句型或反转语义。',
    aslVsLseNote: '注意 ASL 与 LSE 在该字母上的指形及掌向差异。',
  },
  ja: {
    extended: '伸びた指',
    closed: '曲げた・閉じた指',
    thumbOut: '親指を外側へ伸ばした状態',
    thumbAcross: '親指を他の指の前に横向きに畳む',
    thumbTucked: '親指を曲げた指先の下にしまう',
    thumbTouch: '親指と指先が直接つまむように接触',
    thumbBetween: '曲げた指と指の間から親指がのぞく',
    motionLine: '藍色の矢印で示す空間上の動き',
    mistakeThumb: '親指の位置（横・前・指の間）を見落とすのが最も多いミスです。',
    mistakePalm: '手のひらの向き（正面・横・下）を確認しましょう。',
    mistakeMotion: '静止した形（Iや1）と軌跡のある文字（JやZ）を混同しないでください。',
    mistakeNonManual: '眉と頭の動きを見逃さないでください。疑問や否定を決定づけます。',
    aslVsLseNote: 'この文字は ASL と LSE で指の曲げ方や手の向きが異なります。',
  },
};

export function getSignDisplayLabel(item: SignItem, lang: LangCode): string {
  if (item.category === 'cues') {
    return CUE_LOCALIZED[lang][item.id]?.label ?? CUE_LOCALIZED.en[item.id]?.label ?? item.label;
  }
  return item.label;
}

export function getCueScenario(item: SignItem, lang: LangCode): string {
  return CUE_LOCALIZED[lang][item.id]?.scenario ?? CUE_LOCALIZED.en[item.id]?.scenario ?? '';
}

export function buildSignFeedback(
  item: SignItem,
  lang: LangCode,
  system: SignSystem,
): {
  keyFeature: string;
  differenceTip: string;
  mistakeTip: string;
  systemNote?: string;
} {
  const t = TRANSLATIONS[lang];
  const cmp = COMPARE_LABELS[lang];
  const vis = resolveVisualForSystem(item, system);

  const extendedCount = (['index', 'middle', 'ring', 'pinky'] as const).filter(
    (f) => vis.fingers[f] === 'extended' || vis.fingers[f] === 'spread',
  ).length;

  let thumbDesc = cmp.thumbAcross;
  if (vis.thumb === 'out' || vis.thumb === 'up') {
    thumbDesc = cmp.thumbOut;
  } else if (vis.thumb === 'tucked') {
    thumbDesc = cmp.thumbTucked;
  } else if (vis.thumb === 'touch-index' || vis.thumb === 'touch-all') {
    thumbDesc = cmp.thumbTouch;
  } else if (
    vis.thumb === 'between-1-2' ||
    vis.thumb === 'between-2-3' ||
    vis.thumb === 'under-3'
  ) {
    thumbDesc = cmp.thumbBetween;
  }

  const palmDesc = t.palmNames[vis.palm];
  const fingerSummary =
    extendedCount > 0
      ? `${cmp.extended}: ${extendedCount}/4`
      : `${cmp.closed}`;

  const motionSuffix =
    vis.motion && vis.motion !== 'none' ? ` · ${cmp.motionLine}` : '';

  const nonManualSuffix =
    vis.nonManual && vis.nonManual !== 'neutral'
      ? ` · ${t.nonManualNames[vis.nonManual]}`
      : '';

  const keyFeature = `${fingerSummary} · ${thumbDesc} · ${t.ui.palmLabel}: ${palmDesc}${motionSuffix}${nonManualSuffix}.`;

  const lookalikes = item.confusableWith
    .slice(0, 3)
    .map((id) => {
      if (id.startsWith('letter-')) return id.replace('letter-', '').toUpperCase();
      if (id.startsWith('num-')) return id.replace('num-', '');
      return CUE_LOCALIZED[lang][id]?.label ?? id;
    })
    .join(', ');

  const differenceTip = lookalikes
    ? `${lookalikes} → ${thumbDesc}; ${t.ui.palmLabel}: ${palmDesc}.`
    : `${t.ui.palmLabel}: ${palmDesc}.`;

  let mistakeTip = cmp.mistakeThumb;
  if (item.category === 'cues' && vis.nonManual && vis.nonManual !== 'neutral') {
    mistakeTip = cmp.mistakeNonManual;
  } else if (vis.motion && vis.motion !== 'none') {
    mistakeTip = cmp.mistakeMotion;
  } else if (vis.palm === 'back' || vis.palm === 'down' || vis.palm === 'side-in') {
    mistakeTip = cmp.mistakePalm;
  }

  const systemNote = item.systemVariants?.lse ? cmp.aslVsLseNote : undefined;

  return {
    keyFeature,
    differenceTip,
    mistakeTip,
    systemNote,
  };
}
