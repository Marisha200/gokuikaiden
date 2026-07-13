/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Treasure {
  name: string;
  kanji: string;
  romaji: string;
  translation: string;
  description: string;
  associations: string[];
  archetype: string;
}

export interface Dantian {
  name: string;
  location: string;
  represents: string[];
  description: string;
  role: string;
}

export interface SymbolDetail {
  id: string;
  name: string;
  japanese: string;
  romaji: string;
  translation: string;
  history: string;
  symbolism: string;
  deity: string;
  deityOrigin: string;
  deityRole: string;
  plane: string;
  archetype: string;
  visualConcept: string;
  imageSrc: string;
}

export const CLASS2_INTRO = {
  title: "Clase II: El Mapa del Camino Interior",
  subtitle: "La Integración del Taoísmo, Budismo, Shintō y Reiki Tradicional Japonés",
  intro: "Todas las grandes tradiciones de Oriente comparten una misma idea: el objetivo no es incorporar conocimientos externos, sino transformarse uno mismo.",
  concept: "La práctica espiritual no busca agregar algo que falta; busca revelar aquello que siempre estuvo presente en tu interior.",
  bridges: [
    { tradition: "El Taoísmo", path: "Volver al Tao (armonía con el fluir natural)" },
    { tradition: "El Budismo", path: "El Despertar (claridad de la mente y compasión)" },
    { tradition: "El Zen", path: "Ver la propia naturaleza esencial" },
    { tradition: "El Reiki", path: "Anshin Ritsumei (la Gran Paz Interior en el presente)" }
  ]
};

export const CLASS2_TREASURES: Treasure[] = [
  {
    name: "Jing (Esencia)",
    kanji: "精",
    romaji: "Esencia Vital",
    translation: "La materia primordial y herencia física",
    description: "Representa el cuerpo físico, la vitalidad innata, la herencia genética y la capacidad de regenerar y perpetuar la vida. Es el aspecto más denso y material de nuestra existencia, la base sobre la cual se asienta la salud física.",
    associations: ["Riñones", "Fuerza sexual", "Constitución genética", "Elemento Tierra"],
    archetype: "La raíz. El potencial latente concentrado en una semilla."
  },
  {
    name: "Qi (Energía)",
    kanji: "氣",
    romaji: "Aliento de Vida",
    translation: "La energía vital en constante movimiento",
    description: "Es el motor invisible de la vida, el aliento que dinamiza todo proceso biológico y emocional. No es un fluido físico ni electricidad simple; es la expresión activa del movimiento cósmico en el ser humano.",
    associations: ["Respiración sutil", "Circulación sanguínea", "Fluctuaciones emocionales", "Cambio constante"],
    archetype: "El río. El fluir dinámico donde nada permanece inmóvil."
  },
  {
    name: "Shen (Espíritu)",
    kanji: "神",
    romaji: "Conciencia Superior",
    translation: "La mente profunda y claridad lumínica",
    description: "Representa la conciencia despierta, el espíritu, la intuición y la capacidad de compresión trascendental. No debe confundirse con la actividad mental discursiva o el pensamiento lógico; es presencia pura y silenciosa.",
    associations: ["Corazón", "Claridad mental", "Intuición profunda", "Sabiduría espiritual"],
    archetype: "El cielo despejado. La quietud detrás de las nubes."
  }
];

export const CLASS2_DANTIENS: Dantian[] = [
  {
    name: "Dantian Inferior (Hara / Tánden)",
    location: "Unos centímetros debajo del ombligo, en el centro de la pelvis",
    represents: ["Estabilidad profunda", "Enraizamiento", "Fuerza de voluntad", "Respiración primordial"],
    description: "Es el verdadero centro de gravedad de la anatomía humana y energética. En las artes marciales japonesas y en el Reiki (Tanden), representa el pozo sagrado desde donde surge la presencia firme y la fuerza tranquila del practicante.",
    role: "Sustenta la energía vital (Jing) y nos conecta con la Tierra."
  },
  {
    name: "Dantian Medio (Centro del Pecho)",
    location: "En el centro del esternón, a la altura del corazón",
    represents: ["Compasión incondicional", "Armonía emocional", "Amor", "Sensibilidad humana"],
    description: "Actúa como el gran puente alquímico entre el reino denso de la materia (Tierra) y el reino sutil de la conciencia (Cielo). Es el espacio donde el Qi emocional se purifica y se convierte en amor universal.",
    role: "Armoniza los sentimientos y abre el canal de servicio sanador."
  },
  {
    name: "Dantian Superior (Centro de la Cabeza)",
    location: "En el entrecejo y centro del cerebro (glándula pineal)",
    represents: ["Intuición clara", "Visión holística", "Conexión cósmica", "Sabiduría suprema"],
    description: "No representa el pensamiento racional y analítico del cerebro izquierdo. Por el contrario, es el espacio de percepción pura que nos permite comprender y ver la realidad tal como es, sin las limitaciones de los prejuicios intelectuales.",
    role: "Refleja el Shen espiritual puro y nos sintoniza con el Cosmos."
  }
];

export const CLASS2_MICRO_ORBIT = {
  title: "La Órbita Microcósmica",
  description: "Uno de los ejercicios más sagrados de la alquimia taoísta interna (Neidan) y de la circulación de energía en la preparación de Reiki.",
  meridians: [
    { name: "Du Mai (Canal Gobernador)", description: "Nace en el hara, desciende y sube recorriendo toda la columna vertebral por la espalda, cruzando la cabeza y terminando en el paladar superior." },
    { name: "Ren Mai (Canal de la Concepción)", description: "Nace en el paladar inferior, desciende por la línea media frontal del cuerpo, pasando por el corazón y el plexo solar, retornando al hara." }
  ],
  purpose: "La circulación continua por estos dos meridianos representa la sintonía perfecta entre el Cielo (espíritu) y la Tierra (materia). No busca acumular un poder ficticio, sino eliminar obstrucciones físicas y mentales para restaurar el equilibrio innato del ser vivo."
};

export const CLASS2_JUNG_SYMBOLISM = {
  title: "El Símbolo como Lenguaje del Inconsciente",
  subtitle: "La Mirada del Psicólogo Suizo Carl Gustav Jung",
  paragraphs: [
    "Desde la perspectiva profunda de Carl Gustav Jung, un símbolo auténtico no es una simple señal convencional ni un dibujo con un significado cerrado o 'mágico'. El símbolo es una manifestación viva que emerge del Inconsciente Colectivo: actúa como un puente integrador entre la mente consciente y las dimensiones más misteriosas y profundas de la psique que no pueden ser descritas formalmente con palabras.",
    "Bajo esta mirada, los símbolos de Reiki (Cho Ku Rei, Sei He Ki, Hon Sha Ze Shō Nen) pueden entenderse como arquetipos vivos. No son los que 'causan' o fabrican el cambio de forma externa; más bien, actúan como llaves resonantes o plantillas organizadoras que configuran la experiencia energética interior del reikista.",
    "Al meditar y trazar cada símbolo, el practicante activa una actitud interior correspondiente, despertando estados de conciencia dormidos. Por lo tanto, el verdadero valor del símbolo reside en su capacidad de conectar la conciencia ordinaria con el potencial latente de sanación y auto-descubrimiento que siempre ha estado en nosotros."
  ],
  quote: "El símbolo no oculta ni revela; es la formulación más perfecta posible de una realidad que aún no podemos conceptualizar completamente.",
  author: "Carl Gustav Jung"
};

export const CLASS2_TRILOGY_MAPPING = [
  { taoism: "Jing (Esencia)", kurama: "Goho Mao Son (Fuerza)", reiki: "Cho Ku Rei", plane: "Tierra / Acción", color: "text-[#C29B38] bg-yellow-50/50" },
  { taoism: "Qi (Energía)", kurama: "Senju Kannon (Compasión)", reiki: "Sei He Ki", plane: "Luna / Emoción", color: "text-[#5B9DA2] bg-teal-50/50" },
  { taoism: "Shen (Espíritu)", kurama: "Bishamonten (Sabiduría)", reiki: "Hon Sha Ze Shō Nen", plane: "Sol / Conciencia", color: "text-[#C2735B] bg-red-50/50" }
];

export const CLASS2_TRIVIA_QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál es el propósito central de la práctica espiritual según el taoísmo, budismo, shintō y reiki?",
    options: [
      "Acumular el mayor conocimiento intelectual posible sobre textos sagrados.",
      "No agregar nada que falte, sino transformarse y revelar aquello que siempre estuvo presente.",
      "Aprender trucos mentales para convencer a otros sobre nuestras habilidades.",
      "Separar estrictamente el cuerpo físico del alma espiritual."
    ],
    correctIndex: 1,
    explanation: "Todas las tradiciones de Oriente concuerdan en que el sendero espiritual busca descorrer los velos del ego para revelar la naturaleza esencial (Anshin Ritsumei / Satori) que ya habita en el ser."
  },
  {
    id: 2,
    question: "¿Cómo se relacionan dinámicamente los Tres Tesoros (Jing, Qi, Shen) en el ciclo vital?",
    options: [
      "Son energías rivales que compiten por dominar el cuerpo físico.",
      "Jing alimenta el Qi, Qi nutre el Shen, y Shen ilumina la esencia material Jing.",
      "Funcionan por separado: la mente nunca interactúa con la respiración ni el cuerpo.",
      "Solo el Shen es valioso; el Jing y la materia son considerados impurezas a desechar."
    ],
    correctIndex: 1,
    explanation: "Los Tres Tesoros representan un ciclo alquímico continuo: lo físico (Jing) sostiene la vitalidad (Qi), que nutre la conciencia (Shen), la cual a su vez gobierna e ilumina la materia física."
  },
  {
    id: 3,
    question: "¿Qué representa el Dantian Inferior (Hara o Tánden) en el Reiki Tradicional Japonés?",
    options: [
      "El centro principal del pensamiento analítico e intelectual.",
      "Un órgano físico cerca del estómago que procesa los alimentos.",
      "El pozo sagrado de enraizamiento, estabilidad, fuerza física y respiración desde donde surge la presencia del practicante.",
      "El punto exclusivo para canalizar energía a la distancia."
    ],
    correctIndex: 2,
    explanation: "El Dantian inferior o Hara es el centro vital de estabilidad y enraizamiento terrestre, vital para sostener la presencia y la energía equilibrada en el Reiki."
  },
  {
    id: 4,
    question: "¿Qué deidad budista se asocia simbólicamente con el Sei He Ki en Kurama?",
    options: [
      "Goho Mao Son, el guerrero destructor del mal.",
      "Bishamonten, el rey guardián de la sabiduría celestial.",
      "Senju Kannon, la Bodhisattva de los mil brazos y compasión infinita.",
      "Amaterasu, la diosa Shintō del Sol radiante."
    ],
    correctIndex: 2,
    explanation: "Sei He Ki, enfocado en sanación mental-emocional, se asocia simbólicamente con la infinita compasión de Senju Kannon (Kannon de los Mil Brazos)."
  },
  {
    id: 5,
    question: "Según Carl Gustav Jung, ¿cuál es el verdadero papel de un símbolo en nuestra mente profunda?",
    options: [
      "Un gráfico decorativo vacío que sirve para identificar logotipos comerciales.",
      "Un puente vivo que emerge del inconsciente para integrar nuestra parte consciente con realidades que no podemos expresar plenamente en palabras.",
      "Una fórmula mágica fija que produce milagros físicos sin requerir nuestra participación consciente.",
      "Un código secreto que solo los maestros de alto rango pueden memorizar."
    ],
    correctIndex: 1,
    explanation: "Jung demostró que los símbolos actúan como arquetipos vivos que ordenan nuestro campo inconsciente, abriendo puertas a estados superiores de integración y auto-descubrimiento."
  }
];
