/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KanjiElement {
  part: string;
  kanji: string;
  meaning: string;
  description: string;
}

export interface Principle {
  japanese: string;
  romaji: string;
  spanish: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RoadmapStep {
  title: string;
  classNumber: number;
  classNumberRoman?: string;
  unlocked: boolean;
  summary: string;
  topics: string[];
}

export const GREETING_TEXT = {
  title: "¡Bienvenidos/as a la Maestría de Reiki!",
  author: "Marina",
  school: "Rincón Zen",
  intro: `Hoy comienza un capítulo trascendental en su camino como reikistas. Al embarcarse en este nivel de maestría, no solo asumieron un nuevo compromiso con ustedes mismos, sino también con todos los demás y de todos los reinos. Este es un paso que no se mide en títulos ni en símbolos, sino en profundidad, consciencia y apertura del corazón.`,
  paragraphs: [
    "Llegar a este punto significa que recorrieron un sendero lleno de aprendizajes, desafíos y revelaciones. Cada sesión o práctica que dieron, cada conexión que hicieron con Reiki y cada momento de introspección los trajo hasta acá. Ahora, como iniciados en la maestría, los invitamos a ver este camino no como una cima, sino como el comienzo de una expansión infinita.",
    "Ser maestros no es imponer, sino inspirar. No es controlar, sino fluir. Aprenderán a transmitir el conocimiento con humildad, sabiendo que cada persona tiene su propio ritmo y propósito. La maestría no está en enseñar a los demás, sino en aprender continuamente desde la conexión con lo que es.",
    "Recuerden que el símbolo más poderoso que llevarán de ahora en adelante no es uno que puedan dibujar, sino la intención pura de su corazón. Cada paso que den con amor y respeto hacia ustedes mismos y hacia los demás será un acto de Reiki en acción.",
    "Bienvenidos y bienvenidas a esta etapa donde la luz que reciben se multiplica al compartirla. Que cada enseñanza que brinden y cada práctica que realicen estén siempre impregnadas de compasión, gratitud y autenticidad.",
    "¡Que la energía los guíe siempre con amor y sabiduría! ✨"
  ],
  quote: "Cuando no hay nubes en el cielo del corazón, las palabras surgen como joyas, irradiando su luz.",
  quoteAuthor: "atribuida al Emperador Meiji"
};

export const KANJI_DECOMPOSITION: KanjiElement[] = [
  {
    part: "REI (靈)",
    kanji: "靈",
    meaning: "Lo sagrado, lo espiritual, lo invisible",
    description: "Representa el aspecto celestial, misterioso y divino del universo. Simboliza la lluvia purificadora del cielo que cae sobre la tierra, trayendo vida, y los canales que reciben esa bendición con un corazón puro."
  },
  {
    part: "KI (氣)",
    kanji: "氣",
    meaning: "Energía vital, aliento, fuerza cósmica",
    description: "Es el vapor que se eleva del arroz cocinándose, sugiriendo movimiento activo, energía invisible y sustento de vida. Representa la fuerza vital esencial que pulsa en el interior de cada ser vivo, de las plantas, animales y todo el cosmos."
  },
  {
    part: "REIKI (靈氣)",
    kanji: "靈氣",
    meaning: "Energía Vital Universal Guiada Espiritualmente",
    description: "Cuando se unen, REI y KI representan la armonía perfecta entre la sabiduría espiritual superior y la fuerza vital que anima la materia. Es la manifestación de la luz universal sanando y purificando en todos los niveles: físico, mental y espiritual."
  }
];

export const REIKI_PRINCIPLES: Principle[] = [
  {
    japanese: "怒るな",
    romaji: "Kyo dake wa: Ikaru na",
    spanish: "Solo por hoy: No te enojes",
    description: "El enojo es una emoción que surge del deseo de control y del ego. Al liberarlo, encontramos paz interior y restauramos la armonía en nuestras relaciones."
  },
  {
    japanese: "心配すな",
    romaji: "Kyo dake wa: Shinpai suna",
    spanish: "Solo por hoy: No te preocupes",
    description: "La preocupación anticipa el dolor del futuro. Al abandonarla, confiamos en el ritmo perfecto del universo y vivimos plenamente arraigados en el presente."
  },
  {
    japanese: "感謝して",
    romaji: "Kyo dake wa: Kansha shite",
    spanish: "Solo por hoy: Sé agradecido",
    description: "La gratitud abre las puertas de la abundancia del corazón. Reconocer y apreciar las sintonizaciones y enseñanzas cotidianas es la base del bienestar espiritual."
  },
  {
    japanese: "業を励め",
    romaji: "Kyo dake wa: Gyo o hakame",
    spanish: "Solo por hoy: Trabaja honestamente",
    description: "Refiere a la honestidad en tus acciones y pensamientos, pero por sobre todo, a tu práctica espiritual constante y la dedicación sincera en tu autosanación diaria."
  },
  {
    japanese: "人に親切に",
    romaji: "Kyo dake wa: Hito ni shinsetsu ni",
    spanish: "Solo por hoy: Sé amable con los demás",
    description: "Todos somos uno en este tejido divino. Ser amables con el entorno, los animales, las plantas y nuestros hermanos sella nuestra energía en frecuencia de pura compasión."
  }
];

export const WHAT_IS_GOKUIKAIDEN = {
  title: "¿Qué es Gokuikaiden?",
  subtitle: "La Culminación y el Nuevo Amanecer en el Camino Recibido",
  definition: "Gokuikaiden no es solo una palabra, es un viaje, un símbolo de la culminación en el camino del Reiki. En sus raíces japonesas, esta palabra encierra un significado profundo: 'la transmisión completa de los secretos esenciales'. Es la llave que abre las puertas a una comprensión más elevada, un recordatorio de que siempre hay algo más por descubrir, algo más por integrar en nuestro ser.",
  concepts: [
    {
      title: "Un Estado del Ser",
      text: "La verdadera maestría de Gokuikaiden está en lo cotidiano: en la manera en que respirás, en cómo mirás el mundo, en la luz que irradiás incluso en silencio. No se mide en diplomas, sino en la profundidad de tu conexión diaria."
    },
    {
      title: "Iniciación Integrada",
      text: "En este nivel no se agregan más símbolos externos como colección. Se abre un espacio para que todos los símbolos anteriores encuentren su perfecto equilibrio y resonancia en tus centros energéticos, similar a un músico afinando su instrumento."
    },
    {
      title: "Responsabilidad y Humildad",
      text: "Ser maestro es comprender que cuanto más aprendemos, más comprometidos estamos a compartir esa sabiduría con respeto absoluto. No somos superiores, sino guías humildes que también continúan transitando el sendero."
    }
  ]
};

export const WHAT_IS_ATTUNEMENT = {
  title: "¿Qué es una Sintonización?",
  subtitle: "Reiju: El Despertar del Canal Sagrado",
  text: "La transmisión de energía en Reiki se realiza a través de las iniciaciones o sintonizaciones (Reiju). Es un proceso sagrado y significativo que conecta conscientemente al practicante con la fuente cósmica original.",
  keyPoints: [
    {
      title: "No otorga un poder nuevo",
      text: "Las sintonizaciones no te dan algo que no tenías; simplemente limpian las distorsiones de tus conductos energéticos y reactivan un canal innato que yacía dormido en vos. Es como abrir la ventana de una habitación cerrada para dejar entrar el aire fresco que ya estaba afuera."
    },
    {
      title: "Un Renacimiento Energético",
      text: "Actúa como un catalizador evolutivo. No solo incrementa tu sensibilidad en las manos sutilmente, sino que te sitúa en una vibración de conciencia capaz de resonar con mayor pureza con la Energía Universal."
    },
    {
      title: "Resonar con la Intención",
      text: "La eficacia del Reiju no reside únicamente en la coreografía mecánica dada por los pasos tradicionales, sino en la vibración de amor incondicional, honestidad espiritual y conexión sincera manifestada por el Maestro."
    }
  ],
  stepsIntro: "Pasos fundamentales en la ceremonia física del Reiju (Nivel I de muestra):",
  steps: [
    "Solicitar a los alumnos sentarse en Gassho con ojos cerrados.",
    "El Maestro se conecta con la energía de la más alta vibración, emitiendo una afirmación pura.",
    "Abrir el aura desde la corona hasta la cadera juntando los dedos índices.",
    "Colocar manos sobre la coronilla manteniendo por unos 20 segundos para permitir el ingreso de la energía.",
    "Colocar una mano en la frente y otra en el occipital.",
    "Posicionar los pulgares sobre la séptima vértebra.",
    "Pasar al frente del alumno y tocar suavemente sus rodillas.",
    "Abrir las manos del alumno para transmitir energía directa allí.",
    "Juntar las manos del alumno en gassho soplándolo o proyectando energía hacia la frente, el corazón y el hara.",
    "Girar en sentido horario hacia la espalda del alumno y trazar la columna sin tocar (con dedos meñiques), elevando de tierra a cielo.",
    "Repetir todo el proceso 3 veces en total (3 vueltas completas) para asentar la energía.",
    "Sellar la iniciación con una frase poderosa (ej. 'Sello esta sintonización, eres poderoso y triunfador') colocando las manos del alumno en su pecho.",
    "Agradecer de frente en Gassho aportando un baño seco de purificación final."
  ]
};

export const IMPORTANT_ASPECTS = {
  title: "Aspectos Fundamentales para los Maestros",
  subtitle: "Valores Esenciales en la Enseñanza de Reiki Tradicional Japonés",
  intro: "La sanación en Reiki es mucho más que un acto técnico; es una manifestación de la energía universal trabajando en perfecta armonía con la naturaleza inherente de cada ser vivo.",
  items: [
    {
      title: "La Capacidad Nata de Sanar",
      text: "Saber sanar no es un 'don comercial exclusivo'. Está latente en toda la naturaleza. Un felino lame sus heridas y un simio abraza a su cría con desvelo para calmarla. Todos poseemos de fábrica ese interruptor de sanación corporal, aunque a veces esté adormecido.",
      icon: "Heart"
    },
    {
      title: "Derrotar la Fuerza Mental e Imposición",
      text: "En Reiki no forzamos la sanación con nuestra mente; la sanación verdadera florece cuando soltamos el deseo egoico de controlar el resultado. El sanador eficiente se funde con el receptor en un despertar espiritual amoroso y compartido.",
      icon: "Shuffle"
    },
    {
      title: "Una Comprensión Sana del Karma",
      text: "El karma no es un castigo medieval. Son simplemente distorsiones vibratorias temporales en nuestro tejido que piden ser purificadas. No hace falta obsesionarse analizando cada vida pasada; lo crucial es el sincero proceso presente de purificación personal.",
      icon: "Sun"
    },
    {
      title: "Predicar con el Ejemplo Sincero",
      text: "No podemos inculcar calma interior en otros si transcurrimos el día inmersos en el caos y el rencor personal. La relación que estableces con tus discípulos es un vínculo sagrado; guíalos a partir de tu compromiso y práctica diaria consecuente.",
      icon: "ShieldAlert"
    }
  ]
};

export const BYOSEN_HIBIKI = {
  title: "Byosen Reikan Ho y Hibiki",
  subtitle: "El Sentir Verdadero de la Energía",
  intro: "Destacadas como las técnicas originales de Reiki Ryoho, nos enseñan a forjar una sensibilidad extraordinaria en las palmas de nuestras manos.",
  sections: [
    {
      concept: "Byosen (La Señal)",
      definition: "Byosen se refiere a la emanación térmica o sutil que brota de la zona desequilibrada, enferma o afectada del paciente. No se rige por un dogma rígido: suele percibirse de diversas formas, como calor ardiente, frío gélido, vibración hormigueante o pulsaciones.",
      illustration: "Incluso si el desequilibrio reside en un órgano profundo, la señal puede aflorar en un sector inesperado (ej. disfunción bucal reflejada inicialmente en la planta de los pies)."
    },
    {
      concept: "Hibiki (La Respuesta)",
      definition: "Hibiki es el conjunto de sensaciones que el reikista entrenado recoge activamente en sus manos al posarse sobre el Byosen. Capturar el Hibiki con maestría te permite operar de manera sumamente eficaz y preventiva, disolviendo desarmonías antes de que cristalicen en el cuerpo físico de las personas.",
      illustration: "La sensibilidad no florece mágicamente: se desenvuelve gradualmente mediante paciencia, constancia de práctica en seres queridos, animales, plantas, y un estado de mente limpia."
    }
  ]
};

export const FUTURE_ROADMAP: RoadmapStep[] = [
  {
    classNumber: 2,
    classNumberRoman: "II",
    title: "Clase 2: El Despertar del Sello y el Linaje",
    unlocked: false,
    summary: "En la próxima lección profundizaremos en el trazado consciente de los tres símbolos de Reiki y sus kotodamas individuales para la sanación emocional y a distancia.",
    topics: [
      "Trazado de Símbolos y Kotodamas del CKR, SHK y HSZSN",
      "El Puente del Tiempo: Sanación en el Pasado y Futuro",
      "Prácticas de Sanación a Distancia Avanzada",
      "Uso de la Caja de Reiki Tradicional (occidental)"
    ]
  }
];

export const RET_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Qué significa literalmente la palabra 'Gokuikaiden' en la tradición japonesa?",
    options: [
      "El primer peldaño de la sanación de dolencias físicas.",
      "La meditación contemplativa del Emperador Meiji.",
      "La transmisión completa de los secretos esenciales.",
      "La canalización del primer símbolo de alivio emocional."
    ],
    correctIndex: 2,
    explanation: "Gokuikaiden encierra el hermoso significado de 'la transmisión completa de los secretos esenciales'. Representa el espacio infinito de expansión en Reiki Maestría."
  },
  {
    id: 2,
    question: "¿Cuál es el orden y contenido ideal de los 5 principios de Reiki (Gokai)?",
    options: [
      "Sólo por hoy: No te enojes, No te preocupes, Sé agradecido, Trabaja honestamente, Sé amable con los demás.",
      "Sólo hoy: Come sano, Duerme bien, Practica yoga, Visita templos, Medita en silencio.",
      "Siempre: Evita el dolor, Busca el placer, Elude el karma, Memoriza símbolos, Da ofrendas.",
      "Toda la vida: Sé impecable, No supongas, No te tomes nada personal, Haz lo máximo, Busca el satori."
    ],
    correctIndex: 0,
    explanation: "El Gokai establecido por Usui Sensei es: No te enojes, No te preocupes, Sé agradecido, Trabaja honestamente y Sé amable con los demás."
  },
  {
    id: 3,
    question: "En la composición visual del Kanji Reiki, ¿qué evoca el vocablo superior 'REI'?",
    options: [
      "La fuerza terrenal del fuego que consume las toxinas corporales.",
      "El aspecto celestial, espiritual, sagrado e invisible de la existencia.",
      "El contorno físico del Monte Kurama al amanecer.",
      "El movimiento rápido de las manos en una sesión."
    ],
    correctIndex: 1,
    explanation: "REI representa el plano de lo sagrado, lo espiritual e invisible, como la lluvia benéfica celestial que purifica la materia."
  },
  {
    id: 4,
    question: "¿Qué nos enseña la sintonización o 'Reiju' sobre nuestro propio poder curativo?",
    options: [
      "Que el maestro es el único dueño y generador de la luz universal.",
      "Que no otorga un poder nuevo, sino que reactiva y despeja un canal de autosanación que ya habita en nosotros.",
      "Que depende de memorizar pasos estrictamente académicos para ser eficaces.",
      "Que debilita al reikista para que dependa de rituales externos."
    ],
    correctIndex: 1,
    explanation: "La sintonización actúa retirando las interferencias. Es como abrir una ventana para dejar pasar el aire que ya estaba presente en nuestro entorno."
  },
  {
    id: 5,
    question: "¿Cómo concibe el nivel Gokuikaiden el concepto de Karma?",
    options: [
      "Como un castigo implacable de vidas pasadas que exige ser descifrada cada mancha individual para sanar.",
      "Como distorsiones energéticas susceptibles de ser purificadas mediante elecciones presentes conscientes y receptividad.",
      "Como un mito inexistente que debe ser ignorado por completo.",
      "Un contrato monetario que se compensa mediante sintonizaciones especiales."
    ],
    correctIndex: 1,
    explanation: "El manual aclara que el karma son distorsiones energéticas que deben purificarse en el presente, sin la obligación de desgastarse buscando los orígenes exactos del pasado."
  },
  {
    id: 6,
    question: "¿En qué reside la fuerza vital que se transmite durante el de por sí simple proceso de Reiju?",
    options: [
      "En usar ropa sumamente costosa durante la ceremonia.",
      "En realizar sintonizaciones únicamente con música estridente.",
      "En la pureza, vibración elevada de conciencia y conexión espiritual sincera del Maestro.",
      "En repetir las palabras con rapidez para que no se escape la energía."
    ],
    correctIndex: 2,
    explanation: "Aunque los pasos ceremoniales son importantes, la verdadera pureza radica en la alta vibración de la conciencia del maestro que canaliza con humildad."
  },
  {
    id: 7,
    question: "¿Cuál es la recomendación ergonómica y postural clave para los destinatarios del Reiju?",
    options: [
      "Permanecer acostados de lado sobre mantas de lana.",
      "Sentarse en una silla simple, sin respaldo ni apoyabrazos, garantizando la columna erguida y las manos en Gassho.",
      "Estar de pie con los ojos abiertos mirando al sol.",
      "Flotar boca arriba en una tina de agua tibia purificada."
    ],
    correctIndex: 1,
    explanation: "Mantener la espalda erguida en una silla simple sin respaldo simboliza la honestidad, respeto y la libre circulación del flujo ascendente y descendente de luz."
  },
  {
    id: 8,
    question: "¿Qué es la técnica del 'Byosen Reikan Ho'?",
    options: [
      "Un método de acupuntura mental para personas nerviosas.",
      "La técnica para capturar y descifrar las emanaciones o estancamientos energéticos del receptor mediante la sensibilidad de las manos.",
      "Un tipo de respiración rápida que se realiza antes de comer.",
      "El saludo formal que se brinda al inicio de cada clase de maestría."
    ],
    correctIndex: 1,
    explanation: "Byosen Reikan Ho es la técnica tradicional para detectar bloqueos o desarreglos sintiendo las emanaciones energéticas que despide un receptor."
  },
  {
    id: 9,
    question: "¿Qué define verdaderamente al concepto de 'Hibiki'?",
    options: [
      "La vibración rápida de la voz cuando cantamos mantras sagrados.",
      "Las palpables sensaciones de calor, frío, hormigueo o pulsación que percibimos en nuestras manos sobre un Byosen activo.",
      "El nombre exacto de la primera alumna de Mikao Usui.",
      "La purificación de la sangre de forma remota sin intenciones."
    ],
    correctIndex: 1,
    explanation: "Hibiki es el reflejo palpable de la señal energética que el Byosen emite y que el sanador capta mediante sensaciones térmicas o vibratorias."
  },
  {
    id: 10,
    question: "¿Cuál es el núcleo ético y de conducta primordial en la Maestría de Reiki Tradicional Japonés?",
    options: [
      "Convertir las enseñanzas en procesos sumamente comerciales y complejos.",
      "Creernos seres inalcanzables o iluminados por encima de los iniciados.",
      "Practicar con honestidad diaria, asumiendo la vida como un constante aprendizaje mutuo basado en la humildad y el amor.",
      "Enseñar técnicas alternativas mágicas que prometan poder absoluto e inmediato."
    ],
    correctIndex: 2,
    explanation: "Un verdadero Maestro no enseña desde una jerarquía ilusoria. Practica con amor, asiste con sencillez y reconoce que maestro y alumno 'aprenden juntos y crecen juntos'."
  }
];
