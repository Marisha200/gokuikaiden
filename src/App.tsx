/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Heart,
  Compass,
  BookOpen,
  Award,
  Flame,
  ShieldAlert,
  Sun,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  XCircle,
  RotateCw,
  Info,
  Flower2,
  Fingerprint,
  Activity,
  Menu,
  X,
  MapPin,
  Calendar,
  Lock,
  Download,
  Award as DiplomaIcon,
  Video,
  Youtube,
  Play,
  Plus,
  Trash2,
  FileText,
  Music,
  Waves,
  ClipboardList,
  Home,
  Network,
  Send,
  Users,
  Grid,
  GraduationCap
} from "lucide-react";

import {
  GREETING_TEXT,
  KANJI_DECOMPOSITION,
  REIKI_PRINCIPLES,
  WHAT_IS_GOKUIKAIDEN,
  WHAT_IS_ATTUNEMENT,
  IMPORTANT_ASPECTS,
  BYOSEN_HIBIKI,
  FUTURE_ROADMAP,
  RET_QUIZ_QUESTIONS
} from "./data/manualContent";

import {
  CLASS2_INTRO,
  CLASS2_TREASURES,
  CLASS2_DANTIENS,
  CLASS2_MICRO_ORBIT,
  CLASS2_JUNG_SYMBOLISM,
  CLASS2_TRILOGY_MAPPING,
  CLASS2_TRIVIA_QUESTIONS
} from "./data/class2Content";

import choKuReiImg from "./assets/images/CKR.png";
import seiHeKiImg from "./assets/images/SHK.png";
import honShaZeShoNenImg from "./assets/images/HSZSN.png";
import toriiGateImg from "./assets/images/torii_gate.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("landing_bienvenida");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [kanjiSubTab, setKanjiSubTab] = useState<string>("origen");

  // Videos oficiales estables cargados directamente en el código para los alumnos de Rincón Zen
  const [customVideos] = useState<{ id: string; title: string; description: string; url: string; type?: "youtube" | "vimeo" | "youtube_playlist" }[]>(() => {
    return [
      {
        id: "PL0g9expKbVYIsIq5LNskW-C44imC4sdvS",
        type: "youtube_playlist",
        title: "La verdadera historia de Reiki",
        description: "Serie de videos (playlist) sobre los orígenes, verdad histórica y linaje directo de Mikao Usui.",
        url: "https://www.youtube.com/watch?v=8F1tIfEnh-8&list=PL0g9expKbVYIsIq5LNskW-C44imC4sdvS&index=1"
      },
      {
        id: "96606036",
        type: "vimeo",
        title: "Byosen con Frank Arjava Petter",
        description: "No te olvides de hacer click en CC para verlo en español.",
        url: "https://vimeo.com/96606036"
      }
    ];
  });

  // =========================================================================
  // DOCUMENTOS Y MANUALES PDF DESCARGABLES (DESDE GOOGLE DRIVE)
  // Reemplaza los enlaces de "url" con tus URLs reales de Google Drive.
  // Cualquier alumno podrá hacer clic en "Descargar" y obtener el documento.
  // =========================================================================
  const [downloadableDocs] = useState<{ id: string; title: string; description: string; url: string }[]>(() => {
    return [
      {
        id: "influencias-en-reiki",
        title: "Influencias en Reiki",
        description: "Material de estudio sobre las influencias en Reiki Tradicional Japonés.",
        url: "https://drive.google.com/file/d/1ofv5hI9S7fvRXsya0yDgF3k_UgF51fQd/view?usp=sharing"
      }
      // =========================================================================
      // ¡APRENDE A AGREGAR MÁS DOCUMENTOS DE GOOGLE DRIVE AQUÍ! ✨
      // =========================================================================
      // En React/TypeScript, cada documento nuevo debe escribirse entre llaves { ... }
      // y estar separado del documento anterior por una COMA ( , ).
      //
      // Para ACTIVAR el documento que ocultamos abajo, solo quita el "/*" de arriba y el "*/" del final.
      //
      // Para AGREGAR un nuevo documento:
      // Copia el formato de abajo, pon una coma después del de arriba, y reemplaza los textos y la URL de Google Drive.
      // (Asegúrate de que en Google Drive el documento esté compartido como "Cualquier persona con el enlace puede ver").
      /*
      ,
      {
        id: "simbolos-sagrados-maestria",
        title: "Símbolos y Kotodamas de Cuarto Nivel",
        description: "Trazado formal, significado trascendental, activación y meditación activa de sintonías.",
        url: "https://drive.google.com/file/d/1_REEMPLAZAR_CON_OTRO_ID_DE_DRIVE_SI_QUISIERAS/view?usp=sharing"
      }
      */
    ];
  });

  const [selectedVideoId, setSelectedVideoId] = useState<string>("PL0g9expKbVYIsIq5LNskW-C44imC4sdvS");

  // Videos oficiales para la Clase II
  const [customVideos2] = useState<{ id: string; title: string; description: string; url: string; type?: "youtube" | "vimeo" | "youtube_playlist" }[]>(() => {
    return [
      {
        id: "PLzBwNj_gSsync8ZABWy4JR-wRIbMem7uq",
        type: "youtube_playlist",
        title: "Introducción al Tao",
        description: "Lista de reproducción de Introducción al Tao para complementar las bases filosóficas y espirituales del Nivel II.",
        url: "https://www.youtube.com/watch?v=ao-drCtJUeo&list=PLzBwNj_gSsync8ZABWy4JR-wRIbMem7uq"
      },
      {
        id: "XMf3bciOKn4",
        type: "youtube",
        title: "Órbita Microcósmica",
        description: "Práctica y meditación guiada de la circulación de energía en la Órbita Microcósmica.",
        url: "https://www.youtube.com/watch?v=XMf3bciOKn4"
      }
    ];
  });

  // Documentos y Manuales PDF para la Clase II
  const [downloadableDocs2] = useState<{ id: string; title: string; description: string; url: string }[]>(() => {
    return [];
  });

  const [selectedVideoId2, setSelectedVideoId2] = useState<string>("PLzBwNj_gSsync8ZABWy4JR-wRIbMem7uq");

  // Class Selection States
  const [selectedClass, setSelectedClass] = useState<number>(0);

  // Web Audio Meditation States (Class 3)
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [selectedFrequency, setSelectedFrequency] = useState<number>(432);
  const [soundVolume, setSoundVolume] = useState<number>(0.3);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const oscillatorRef = React.useRef<OscillatorNode | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);

  // Reiju Attunement Checklist States (Class 4)
  const [reijuSteps, setReijuSteps] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  // Crystal Mandala Distance Healing States (Class 6)
  const [placedCrystals, setPlacedCrystals] = useState<Record<string, string>>({
    center: "Cuarzo Hialino",
    north: "Amatista",
    south: "Cuarzo Rosa",
    east: "Selenita",
    west: "Fluorita",
    northeast: "Turmalina Negra",
    northwest: "Citrino",
    southeast: "Ágata",
    southwest: "Jaspe Rojo"
  });
  const [mandalaActive, setMandalaActive] = useState<boolean>(false);
  const [mandalaIntent, setMandalaIntent] = useState<string>("");

  // Shihan Graduation States (Class 7)
  const [c7DiplomaName, setC7DiplomaName] = useState<string>("");
  const [c7ViewingDiploma, setC7ViewingDiploma] = useState<boolean>(false);

  // Class 2 Quiz States
  const [c2QuizAnswers, setC2QuizAnswers] = useState<Record<number, number>>({});
  const [c2AnswersSubmitted, setC2AnswersSubmitted] = useState<boolean>(false);
  const [c2ShowResults, setC2ShowResults] = useState<boolean>(false);
  const [c2DiplomaName, setC2DiplomaName] = useState<string>("");
  const [c2ViewingDiploma, setC2ViewingDiploma] = useState<boolean>(false);

  // Class 2 Interactive Matching Game States
  const [matchingChecked, setMatchingChecked] = useState<boolean>(false);
  const [matchingScore, setMatchingScore] = useState<number>(0);
  const [selectedDeityGuess, setSelectedDeityGuess] = useState<Record<string, string>>({
    "cho-ku-rei": "",
    "sei-he-ki": "",
    "hon-sha-ze-sho-nen": ""
  });
  const [selectedPlaneGuess, setSelectedPlaneGuess] = useState<Record<string, string>>({
    "cho-ku-rei": "",
    "sei-he-ki": "",
    "hon-sha-ze-sho-nen": ""
  });
  const [selectedArchetypeGuess, setSelectedArchetypeGuess] = useState<Record<string, string>>({
    "cho-ku-rei": "",
    "sei-he-ki": "",
    "hon-sha-ze-sho-nen": ""
  });

  // Diagnostic Simulator State
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Quiz States
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [answersSubmitted, setAnswersSubmitted] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [diplomaName, setDiplomaName] = useState<string>("");
  const [viewingDiploma, setViewingDiploma] = useState<boolean>(false);

  // Reading progress state
  const [readSections, setReadSections] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem("reiki_read_progress");
      return stored ? JSON.parse(stored) : { bienvenida: true };
    } catch {
      return { bienvenida: true };
    }
  });

  useEffect(() => {
    localStorage.setItem("reiki_read_progress", JSON.stringify(readSections));
  }, [readSections]);

  const markAsRead = (tab: string) => {
    setReadSections((prev) => ({ ...prev, [tab]: true }));
  };

  const startMeditationSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {}
      }
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(selectedFrequency, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(soundVolume, ctx.currentTime + 1.5);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      
      oscillatorRef.current = osc;
      gainNodeRef.current = gainNode;
      setIsPlayingSound(true);
    } catch (err) {
      console.error("Audio Context failed", err);
    }
  };

  const stopMeditationSound = () => {
    if (oscillatorRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      if (gainNodeRef.current) {
        try {
          gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
          gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);
        } catch {}
        setTimeout(() => {
          try {
            if (oscillatorRef.current) {
              oscillatorRef.current.stop();
              oscillatorRef.current.disconnect();
              oscillatorRef.current = null;
            }
            setIsPlayingSound(false);
          } catch {}
        }, 1000);
      } else {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {}
        oscillatorRef.current = null;
        setIsPlayingSound(false);
      }
    }
  };

  useEffect(() => {
    if (oscillatorRef.current && audioCtxRef.current) {
      try {
        oscillatorRef.current.frequency.setValueAtTime(selectedFrequency, audioCtxRef.current.currentTime);
      } catch {}
    }
  }, [selectedFrequency]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.setValueAtTime(soundVolume, audioCtxRef.current.currentTime);
      } catch {}
    }
  }, [soundVolume]);

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {}
      }
    };
  }, [activeTab]);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (answersSubmitted) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    RET_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const isQuizComplete = () => {
    return RET_QUIZ_QUESTIONS.every((q) => quizAnswers[q.id] !== undefined);
  };

  const handleSubmitQuiz = () => {
    if (!isQuizComplete()) return;
    setAnswersSubmitted(true);
    setShowResults(true);
    markAsRead("test");
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setAnswersSubmitted(false);
    setShowResults(false);
    setViewingDiploma(false);
  };

  const handleDownloadDiploma = () => {
    window.print();
  };

  const menuItems1 = [
    { id: "bienvenida", label: "Inicio", icon: Flower2 },
    { id: "kanji", label: "El Kanji Reiki", icon: Sparkles },
    { id: "principios", label: "El Gokai (Principios)", icon: Sun },
    { id: "aspectos", label: "La Maestría Interna", icon: Compass },
    { id: "sensibilidad", label: "Byosen y Hibiki", icon: Activity },
    { id: "videos", label: "Videos de Práctica", icon: Video },
    { id: "test", label: "Test Evaluativo", icon: Award },
    { id: "roadmap", label: "Progreso y Futuro", icon: BookOpen }
  ];

  const menuItems2 = [
    { id: "c2_bienvenida", label: "Inicio", icon: Flower2 },
    { id: "c2_tesoros", label: "Los 3 Tesoros", icon: Sparkles },
    { id: "c2_dantien", label: "Dantien y Órbita", icon: Compass },
    { id: "c2_simbolos", label: "Símbolos y Kurama", icon: Flame },
    { id: "c2_jung", label: "Mirada de Jung", icon: ShieldAlert },
    { id: "c2_videos", label: "Videos y Material", icon: Video },
    { id: "c2_juegos", label: "Juegos Evaluativos", icon: Award }
  ];

  const menuItems3 = [
    { id: "c3_bienvenida", label: "Inicio", icon: Flower2 },
    { id: "c3_kotodamas", label: "Los Kotodamas", icon: Music },
    { id: "c3_vibracion", label: "Vibración Sagrada", icon: Sparkles },
    { id: "c3_meditacion", label: "Baño de Sonido", icon: Waves }
  ];

  const menuItems4 = [
    { id: "c4_bienvenida", label: "Inicio", icon: Flower2 },
    { id: "c4_reiju", label: "Significado Reiju", icon: Heart },
    { id: "c4_protocolo", label: "Ceremonia Reiju", icon: ClipboardList },
    { id: "c4_espacio", label: "Espacio Sagrado", icon: Home }
  ];

  const menuItems5 = [
    { id: "c5_bienvenida", label: "Inicio", icon: Flower2 },
    { id: "c5_linaje", label: "Linaje Reiki", icon: Network },
    { id: "c5_gakkai", label: "Usui Ryoho Gakkai", icon: BookOpen },
    { id: "c5_historia", label: "Verdad Histórica", icon: BookOpen }
  ];

  const menuItems6 = [
    { id: "c6_bienvenida", label: "Inicio", icon: Flower2 },
    { id: "c6_enkaku", label: "Técnicas Distancia", icon: Send },
    { id: "c6_ancestros", label: "Línea Ancestral", icon: Users },
    { id: "c6_mandalas", label: "Rejilla de Cristales", icon: Grid }
  ];

  const menuItems7 = [
    { id: "c7_bienvenida", label: "Inicio", icon: Flower2 },
    { id: "c7_shihan", label: "El Rol del Shihan", icon: Award },
    { id: "c7_ensenar", label: "Pedagogía Reiki", icon: GraduationCap },
    { id: "c7_graduacion", label: "Grado de Maestro", icon: Award }
  ];

  const getMenuItems = () => {
    switch (selectedClass) {
      case 1: return menuItems1;
      case 2: return menuItems2;
      case 3: return menuItems3;
      case 4: return menuItems4;
      case 5: return menuItems5;
      case 6: return menuItems6;
      case 7: return menuItems7;
      default: return [];
    }
  };

  const menuItems = getMenuItems();

  const changeClass = (classNum: number) => {
    setSelectedClass(classNum);
    if (classNum === 0) {
      setActiveTab("landing_bienvenida");
    } else if (classNum === 1) {
      setActiveTab("bienvenida");
      markAsRead("bienvenida");
    } else if (classNum === 2) {
      setActiveTab("c2_bienvenida");
      markAsRead("c2_bienvenida");
    } else if (classNum === 3) {
      setActiveTab("c3_bienvenida");
      markAsRead("c3_bienvenida");
    } else if (classNum === 4) {
      setActiveTab("c4_bienvenida");
      markAsRead("c4_bienvenida");
    } else if (classNum === 5) {
      setActiveTab("c5_bienvenida");
      markAsRead("c5_bienvenida");
    } else if (classNum === 6) {
      setActiveTab("c6_bienvenida");
      markAsRead("c6_bienvenida");
    } else if (classNum === 7) {
      setActiveTab("c7_bienvenida");
      markAsRead("c7_bienvenida");
    }
  };

  // Diagnosis simulator details
  const regions = [
    {
      id: "cabeza",
      name: "Sienes y Cabeza",
      byosen: "Pinchazos leves o cosquilleo agudo.",
      hibiki: "Hormigueo molesto en las puntas de tus dedos.",
      analysis: "Señala fatiga mental, sobrepensamiento o desarmonía relacionada con el principio fundamental No Te Preocupes (Shinpai Suna).",
      action: "Canalizar energía de forma calmante cubriendo sienes y coronilla, respirando suavemente y enviando luz de color índigo."
    },
    {
      id: "corazon",
      name: "Centro del Pecho (Corazón)",
      byosen: "Calor denso o palpitación intensa.",
      hibiki: "Pulsación rítmica acelerada debajo de tu palma.",
      analysis: "Señala desbordamiento emocional, tristeza latente o fatiga en sus relaciones afectivas.",
      action: "Colocar manos con extrema liviandad (sin presionar) permitiendo que fluya Reiki incondicional para reconfortar el satori emocional."
    },
    {
      id: "higado",
      name: "Hígado (Abdomen Derecho)",
      byosen: "Calor ardiente u ola pesada de calor.",
      hibiki: "Sensación de ardor u hormigueo caliente.",
      analysis: "Señala resentimiento acumulado o frustración. Ligado con la alteración del principio No Te Enojes (Ikaru Na).",
      action: "Sostener la posición varios minutos, visualizando cómo la energía calma, refresca y aporta tolerancia profunda."
    },
    {
      id: "tanden",
      name: "Tánden (Tres dedos bajo el ombligo)",
      byosen: "Frío sutil o vacío total de energía.",
      hibiki: "Pérdida progresiva de temperatura en tus manos.",
      analysis: "Indica desintoxicación urgente requerida, debilidad física, o falta de conexión de enraizamiento a la tierra.",
      action: "Aplicar la técnica tradicional Tanden Chiryo Ho: una mano en la frente, otra en el Tánden emitiendo mentalmente el Nentatsu: 'Que las toxinas bajen para su eliminación'."
    },
    {
      id: "pies",
      name: "Fascias y Planta de los Pies",
      byosen: "Reflejo vibracional indirecto.",
      hibiki: "Ligero cosquilleo frío u ondas magnéticas.",
      analysis: "Señala que el cuerpo está redistribuyendo la energía para corregir desequilibrios internos (como Byosen en la mandíbula o riñones).",
      action: "Enraizar al receptor de manera profunda, canalizando luz dorada ascendente desde la raíz hasta el cuello."
    }
  ];

  const totalScore = calculateScore();
  const hasPassed = totalScore >= 8;

  return (
    <div className="min-h-screen bg-natural-bg text-natural-dark font-sans selection:bg-natural-secondary/25 selection:text-natural-primary print:bg-white print:text-black">
      {/* BACKGROUND GRAPHIC HALO EFFECT */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-natural-cream to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-natural-secondary/15 rounded-full filter blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-natural-sand/20 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="sticky top-0 bg-natural-primary text-natural-bg z-30 transition-all shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-natural-bg flex items-center justify-center">
              <span className="font-cinzel text-lg font-bold text-natural-primary">靈</span>
            </div>
            <div>
              <h1 className="text-sm font-serif tracking-wider font-bold text-natural-bg">
                GOKUIKAIDEN: MAESTRÍA DE REIKI
              </h1>
              <p className="text-[10px] text-natural-bg/75 font-sans">
                Rincón Zen
              </p>
            </div>
          </div>

          {/* DESKTOP TABS BAR FOR CLASSES */}
          <nav className="hidden md:flex space-x-1 bg-natural-dark/20 p-1 rounded-full border border-natural-bg/15 overflow-x-auto max-w-[65%] scrollbar-none">
            <button
              onClick={() => changeClass(0)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                selectedClass === 0
                  ? "bg-natural-bg text-natural-primary shadow-xs"
                  : "text-natural-bg/80 hover:text-natural-bg hover:bg-natural-secondary/20"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>
            {[
              { id: 1, label: "Clase I" },
              { id: 2, label: "Clase II" },
              { id: 3, label: "Clase III" },
              { id: 4, label: "Clase IV" },
              { id: 5, label: "Clase V" },
              { id: 6, label: "Clase VI" },
              { id: 7, label: "Clase VII" }
            ].map((clase) => {
              const isLocked = clase.id >= 3;
              const isActive = selectedClass === clase.id;

              if (isLocked) {
                return (
                  <div
                    key={clase.id}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 transition-all shrink-0 text-natural-bg/40 cursor-not-allowed select-none"
                    title="Clase por definir"
                  >
                    <Lock className="w-3 h-3 opacity-60" />
                    <span>{clase.label}</span>
                  </div>
                );
              }

              return (
                <button
                  key={clase.id}
                  onClick={() => changeClass(clase.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                    isActive
                      ? "bg-natural-bg text-natural-primary shadow-xs"
                      : "text-natural-bg/80 hover:text-natural-bg hover:bg-natural-secondary/20"
                  }`}
                >
                  <span>{clase.label}</span>
                </button>
              );
            })}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-natural-bg/10 hover:bg-natural-bg/25 text-natural-bg transition-colors"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-natural-bg border-b border-natural-border z-25 absolute w-full left-0 shadow-lg px-4 py-4 print:hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  changeClass(0);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-lg text-left text-xs font-semibold flex items-center space-x-2.5 transition-all border ${
                  selectedClass === 0
                    ? "bg-natural-primary text-white border-natural-primary shadow-xs"
                    : "bg-white text-natural-dark border-natural-border hover:bg-natural-sand"
                }`}
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>Inicio / Bienvenida</span>
              </button>
              {[
                { id: 1, label: "Clase I" },
                { id: 2, label: "Clase II" },
                { id: 3, label: "Clase III" },
                { id: 4, label: "Clase IV" },
                { id: 5, label: "Clase V" },
                { id: 6, label: "Clase VI" },
                { id: 7, label: "Clase VII" }
              ].map((clase) => {
                const isLocked = clase.id >= 3;
                const isActive = selectedClass === clase.id;

                if (isLocked) {
                  return (
                    <div
                      key={clase.id}
                      className="p-3 rounded-lg text-left text-xs font-semibold flex items-center space-x-2.5 transition-all border bg-gray-50/50 text-gray-400 border-gray-200 cursor-not-allowed select-none"
                    >
                      <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{clase.label}</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={clase.id}
                    onClick={() => {
                      changeClass(clase.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-lg text-left text-xs font-semibold flex items-center space-x-2.5 transition-all border ${
                      isActive
                        ? "bg-natural-primary text-white border-natural-primary shadow-xs"
                        : "bg-white text-natural-dark border-natural-border hover:bg-natural-sand"
                    }`}
                  >
                    <span>{clase.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE BRANDING HERO BANNER AT TOP OF ALL TABS */}
      {selectedClass > 0 && (
        <section className="bg-gradient-to-r from-natural-cream to-natural-sand py-8 px-4 sm:px-6 lg:px-8 border-b border-natural-border print:hidden animate-fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs tracking-widest text-[#5ba27f] uppercase font-bold border border-natural-border shadow-xs mb-3">
              <span className="text-natural-primary">Nivel de Maestría ● Reiki Tradicional Japonés</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-natural-dark font-semibold">
              {selectedClass === 1 && "Clase I: Gokuikaiden (El Grado de Maestría)"}
              {selectedClass === 2 && "Clase II: El Camino Interior (Okuden Profundo)"}
              {selectedClass === 3 && "Clase III: Los Kotodamas Sagrados (Vibración)"}
              {selectedClass === 4 && "Clase IV: Técnicas de Reiju (Iniciación)"}
              {selectedClass === 5 && "Clase V: Linaje e Historia Tradicional"}
              {selectedClass === 6 && "Clase VI: Sanación Distante y Ancestral"}
              {selectedClass === 7 && "Clase VII: El Grado del Shihan (Maestro)"}
            </h2>
            <p className="mt-2 text-natural-text-muted text-sm sm:text-base italic max-w-xl mx-auto leading-relaxed">
              {selectedClass === 1 && "“La transmisión completa de los secretos esenciales. El camino para aprender, sanar y encender la chispa del Satori.”"}
              {selectedClass === 2 && "“La integración del Taoísmo, Budismo, Shintō y Reiki Tradicional. La espiritualidad profunda como camino de transformación del ser.”"}
              {selectedClass === 3 && "“El poder de la voz sagrada y la resonancia acústica del alma. El canto que sintoniza cada célula con el Cosmos.”"}
              {selectedClass === 4 && "“La ceremonia sagrada de la purificación continua y la transmisión sutil directa de Shihan a estudiante.”"}
              {selectedClass === 5 && "“La verdad histórica documentada, los presidentes de la Gakkai original y la cadena dorada de nuestro linaje.”"}
              {selectedClass === 6 && "“La sanación cuántica generacional de los ancestros y la activación continua de la Rejilla de Cristales sagrada.”"}
              {selectedClass === 7 && "“El compromiso último con la pureza, la compasión, la ética de la enseñanza y el diploma oficial de graduación.”"}
            </p>
          </div>
        </section>
      )}

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {selectedClass === 0 ? (
          /* PORTAL LANDING PAGE */
          <div className="space-y-12 animate-fade-in">
            {/* Welcome banner */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-natural-border shadow-3xs flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="inline-block px-3 py-1 bg-natural-cream rounded-full text-xs font-bold tracking-widest text-natural-primary uppercase border border-natural-border/60">
                  Rincón Zen ● Curso Oficial de Maestría
                </div>
                <h2 className="text-2xl sm:text-3.5xl font-serif text-natural-dark font-semibold leading-tight">
                  Bienvenidos/as al Sendero de Gokuikaiden
                </h2>
                <div className="space-y-3.5 text-xs sm:text-sm text-natural-text-muted leading-relaxed">
                  <p>
                    Este material fue creado para acompañarte a lo largo de las 7 clases que integran este recorrido, combinando teoría, práctica, reflexión y experiencia personal.
                  </p>
                  <p>
                    Acá vas a encontrar contenidos fundamentales, símbolos, meditaciones, prácticas guiadas, sintonizaciones y recursos interactivos pensados para profundizar tu comprensión de Reiki y fortalecer tu camino como practicante y futuro/a maestro/a.
                  </p>
                  <p>
                    La propuesta no es solo incorporar información, sino aprender a transmitir Reiki con claridad, respeto y presencia, honrando sus raíces tradicionales y desarrollando una práctica consciente, simple y profunda.
                  </p>
                  <p>
                    Bienvenido/a a esta etapa de integración, estudio y transformación.
                  </p>
                  <div className="flex justify-end pt-1">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-natural-primary/10 border border-natural-primary/25 rounded-full text-xs sm:text-sm font-serif font-bold text-natural-primary tracking-wide shadow-3xs hover:bg-natural-primary/15 transition-all">
                      Marina 🌸
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-natural-sand/30 border border-natural-border/70 rounded-2xl text-xs text-natural-text-muted italic leading-relaxed flex items-center">
                    <div>&ldquo;Sintonizar el canal energético es un acto de amor y respeto hacia ti mismo y hacia el linaje de Mikao Usui.&rdquo;</div>
                  </div>
                  <div className="p-4 bg-[#f8faf8] border border-natural-primary/20 rounded-2xl text-xs text-natural-text-muted italic leading-relaxed flex flex-col justify-between">
                    <div>
                      &ldquo;Si las puertas de la percepción se limpiaran, todo aparecería ante el ser tal como es: infinito.&rdquo;
                    </div>
                    <span className="text-[10px] text-natural-primary font-semibold text-right mt-1.5">— William Blake</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-80 shrink-0 rounded-2xl overflow-hidden border border-natural-border/80 shadow-xs">
                <img 
                  src={toriiGateImg} 
                  alt="Torii Gate Rincón Zen" 
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-natural-sand/50 p-3 text-center border-t border-natural-border/60 text-[10px] font-mono tracking-wider text-natural-dark">
                  ⛩️ Torii en el Monte Kurama
                </div>
              </div>
            </div>

            {/* Curriculum grid */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-serif text-natural-dark font-bold">Plan de Estudio de la Maestría (7 Clases)</h3>
                <p className="text-xs text-natural-text-muted mt-1">Selecciona la clase que deseas estudiar y practicar hoy:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <button 
                  onClick={() => changeClass(1)}
                  className="text-left bg-white p-6 rounded-3xl border border-natural-border hover:border-natural-primary/50 hover:shadow-2xs transition-all duration-300 group flex flex-col justify-between h-64 cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-2xl bg-natural-sand text-natural-primary group-hover:bg-natural-primary group-hover:text-white transition-all">
                        <Flower2 className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 bg-[#eef6f0] text-[#3e7256] rounded-full">
                        Disponible
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-natural-dark group-hover:text-natural-primary transition-colors">
                      Clase I: Gokuikaiden
                    </h4>
                    <p className="text-xs text-natural-text-muted mt-2 leading-relaxed line-clamp-3">
                      Explora las uniones de la transmisión, el kanji Reiki descifrado, los gokais originales de Mikao Usui, Byosen y Hibiki, y el Test Evaluativo de Maestría.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-natural-primary pt-4 mt-auto border-t border-natural-border/40 w-full">
                    <span>Ingresar a Clase I</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Card 2 */}
                <button 
                  onClick={() => changeClass(2)}
                  className="text-left bg-white p-6 rounded-3xl border border-natural-border hover:border-natural-primary/50 hover:shadow-2xs transition-all duration-300 group flex flex-col justify-between h-64 cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-2xl bg-natural-sand text-natural-primary group-hover:bg-natural-primary group-hover:text-white transition-all">
                        <Compass className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 bg-[#eef6f0] text-[#3e7256] rounded-full">
                        Disponible
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-natural-dark group-hover:text-natural-primary transition-colors">
                      Clase II: Camino Interior
                    </h4>
                    <p className="text-xs text-natural-text-muted mt-2 leading-relaxed line-clamp-3">
                      Inicia la alquimia de los Tres Tesoros (San Bao), los Tres Dantians, la órbita microcósmica, el trazado de símbolos, la psicología de Carl Jung y el juego evaluativo.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-natural-primary pt-4 mt-auto border-t border-natural-border/40 w-full">
                    <span>Ingresar a Clase II</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Card 3 (Locked) */}
                <div 
                  className="bg-[#faf9fa]/80 p-6 rounded-3xl border border-dashed border-gray-200 text-gray-500 flex flex-col justify-between h-auto min-h-[19.5rem] shadow-3xs relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-400">
                        <Music className="w-5 h-5 animate-pulse" />
                      </div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Bloqueado
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-gray-400">
                      Clase III
                    </h4>
                    <div className="mt-3 p-4 bg-white border border-gray-150 rounded-2xl text-xs sm:text-sm lg:text-[15px] italic text-natural-dark font-medium leading-relaxed font-sans shadow-3xs relative select-text cursor-text">
                      &ldquo;Si me nombras, me niegas. Al darme un nombre, una etiqueta, niegas las otras posibilidades que podría ser.&rdquo;
                      <div className="text-right text-[11px] font-bold text-natural-primary mt-2">— Søren Kierkegaard</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 pt-3 mt-auto border-t border-gray-100/60 w-full">
                    <span>Módulo por definir</span>
                  </div>
                </div>

                {/* Card 4 (Locked) */}
                <div 
                  className="bg-[#faf9fa]/80 p-6 rounded-3xl border border-dashed border-gray-200 text-gray-500 flex flex-col justify-between h-auto min-h-[19.5rem] shadow-3xs relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-400">
                        <ClipboardList className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Bloqueado
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-gray-400">
                      Clase IV
                    </h4>
                    <div className="mt-3 p-4 bg-white border border-gray-150 rounded-2xl text-xs sm:text-sm lg:text-[15px] italic text-natural-dark font-medium leading-relaxed font-sans shadow-3xs relative select-text cursor-text">
                      &ldquo;Existir es cambiar, cambiar es madurar, madurar es crearse sin cesar.&rdquo;
                      <div className="text-right text-[11px] font-bold text-natural-primary mt-2">— Henri Bergson</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 pt-3 mt-auto border-t border-gray-100/60 w-full">
                    <span>Módulo por definir</span>
                  </div>
                </div>

                {/* Card 5 (Locked) */}
                <div 
                  className="bg-[#faf9fa]/80 p-6 rounded-3xl border border-dashed border-gray-200 text-gray-500 flex flex-col justify-between h-auto min-h-[19.5rem] shadow-3xs relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-400">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Bloqueado
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-gray-400">
                      Clase V
                    </h4>
                    <div className="mt-3 p-4 bg-white border border-gray-150 rounded-2xl text-xs sm:text-sm lg:text-[15px] italic text-natural-dark font-medium leading-relaxed font-sans shadow-3xs relative select-text cursor-text">
                      &ldquo;Un libro debe ser el hacha que rompa el mar helado dentro de nosotros.&rdquo;
                      <div className="text-right text-[11px] font-bold text-natural-primary mt-2">— Franz Kafka</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 pt-3 mt-auto border-t border-gray-100/60 w-full">
                    <span>Módulo por definir</span>
                  </div>
                </div>

                {/* Card 6 (Locked) */}
                <div 
                  className="bg-[#faf9fa]/80 p-6 rounded-3xl border border-dashed border-gray-200 text-gray-500 flex flex-col justify-between h-auto min-h-[19.5rem] shadow-3xs relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-400">
                        <Grid className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Bloqueado
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-gray-400">
                      Clase VI
                    </h4>
                    <div className="mt-3 p-4 bg-white border border-gray-150 rounded-2xl text-xs sm:text-sm lg:text-[15px] italic text-natural-dark font-medium leading-relaxed font-sans shadow-3xs relative select-text cursor-text">
                      &ldquo;Tenés poder sobre tu mente, no sobre los acontecimientos externos.&rdquo;
                      <div className="text-right text-[11px] font-bold text-natural-primary mt-2">— Marco Aurelio, Meditaciones</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 pt-3 mt-auto border-t border-gray-100/60 w-full">
                    <span>Módulo por definir</span>
                  </div>
                </div>

                {/* Card 7 (Locked) */}
                <div 
                  className="bg-[#faf9fa]/80 p-6 rounded-3xl border border-dashed border-gray-200 text-gray-500 flex flex-col justify-between h-auto min-h-[19.5rem] shadow-3xs relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-400">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Bloqueado
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-gray-400">
                      Clase VII
                    </h4>
                    <div className="mt-3 p-4 bg-white border border-gray-150 rounded-2xl text-xs sm:text-sm lg:text-[15px] italic text-natural-dark font-medium leading-relaxed font-sans shadow-3xs relative select-text cursor-text">
                      &ldquo;Hay que tener todavía caos dentro de sí para poder dar a luz una estrella danzante.&rdquo;
                      <div className="text-right text-[11px] font-bold text-natural-primary mt-2">— Friedrich Nietzsche</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 pt-3 mt-auto border-t border-gray-100/60 w-full">
                    <span>Módulo por definir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STANDARD COURSE TWO-COLUMN LAYOUT */
          <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDE BAR NAVIGATION (only visible on large screens) */}
            <aside className="hidden lg:block w-64 shrink-0 print:hidden">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-natural-border shadow-xs">
                  <h3 className="text-xs font-bold font-serif text-natural-primary tracking-wider mb-4 uppercase">
                    {selectedClass === 1 && "Temas de Clase I"}
                    {selectedClass === 2 && "Temas de Clase II"}
                    {selectedClass === 3 && "Temas de Clase III"}
                    {selectedClass === 4 && "Temas de Clase IV"}
                    {selectedClass === 5 && "Temas de Clase V"}
                    {selectedClass === 6 && "Temas de Clase VI"}
                    {selectedClass === 7 && "Temas de Clase VII"}
                  </h3>

              <div className="space-y-1.5">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isRead = readSections[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        markAsRead(item.id);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all group ${
                        activeTab === item.id
                          ? "bg-natural-secondary/15 text-natural-primary border-l-4 border-natural-primary font-semibold"
                          : "text-natural-dark/90 hover:text-natural-primary hover:bg-natural-eggshell border-l-4 border-transparent"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <Icon className="w-4 h-4 text-natural-primary shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {isRead ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-natural-primary" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-natural-border/85" />
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 text-natural-text-muted/60 group-hover:translate-x-0.5 transition-transform ${activeTab === item.id ? "rotate-90" : ""}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CLASS COMPASS PROGRESS CARD */}
            <div className="bg-gradient-to-br from-natural-eggshell to-natural-cream p-5 rounded-2xl border border-natural-border text-natural-dark">
              <div className="flex items-center space-x-2 text-natural-primary mb-2">
                <Compass className="w-4 h-4 animate-spin-slow" />
                <span className="font-serif text-xs font-bold tracking-widest uppercase">Tu Progreso</span>
              </div>
              <p className="text-natural-text-muted text-[11px] leading-relaxed mb-3">
                {selectedClass === 1 
                  ? "Lee detenidamente cada sección de las enseñanzas para habilitar la evaluación de Maestría final."
                  : "Explora los Tres Tesoros, los Dantians y la simbología para jugar el Test Evaluativo de Clase II."}
              </p>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-natural-text-muted/80 font-mono">
                  <span>Módulos vistos:</span>
                  <span>{menuItems.filter(item => readSections[item.id]).length} de {menuItems.length}</span>
                </div>
                <div className="w-full bg-natural-border/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-natural-secondary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(menuItems.filter(item => readSections[item.id]).length / menuItems.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* CREATED BY CITATION */}
            <div className="text-center py-2">
              <p className="text-[11px] font-mono text-natural-text-muted/65 tracking-wide">
                Rincón Zen © 2026
              </p>
              <p className="text-[10px] text-natural-text-muted/50">
                Gokuikaiden Tradicional Japonés
              </p>
            </div>
          </div>
        </aside>

        {/* INTERACTIVE CONTENT ZONE */}
        <section className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-natural-border shadow-sm min-h-[500px]"
            >
              
              {/* === TABS 1: BIENVENIDA === */}
              {activeTab === "bienvenida" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Flower2 className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        {GREETING_TEXT.title}
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Capítulo Inicial
                    </span>
                  </div>

                  <div className="bg-[#f5f2e9] p-6 rounded-3xl border border-[#e8e4d8] shadow-sm relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-natural-primary pointer-events-none">
                      <Flower2 className="w-24 h-24 stroke-1 opacity-10" />
                    </div>
                    <p className="text-natural-dark font-serif italic text-sm sm:text-base leading-relaxed relative z-10">
                      &ldquo;{GREETING_TEXT.intro}&rdquo;
                    </p>
                    <div className="mt-3 flex items-center justify-end text-right">
                      <span className="text-xs font-mono text-natural-primary font-semibold">- {GREETING_TEXT.author}, {GREETING_TEXT.school}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-natural-text-muted text-sm leading-relaxed">
                    <p>{GREETING_TEXT.paragraphs[0]}</p>
                    <p>{GREETING_TEXT.paragraphs[1]}</p>
                    
                    {/* Linaje Usui Box */}
                    <div className="my-8 border border-natural-border rounded-3xl p-6 md:p-8 bg-natural-eggshell/70 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-natural-sand/20 rounded-full blur-3xl -z-10" />
                      <h4 className="text-xs tracking-wider uppercase font-serif text-natural-primary font-bold mb-4 flex items-center gap-2 border-b border-natural-border/60 pb-2">
                        <Compass className="w-4 h-4 text-natural-secondary" /> LINAJE DE MAESTRÍA TRADICIONAL JAPONÉS
                      </h4>
                      <p className="text-xs mb-8 text-natural-text-muted leading-relaxed max-w-2xl">
                        El linaje de Reiki es la cadena verificable de maestros que han transmitido las enseñanzas de Reiki desde su creador original, Mikao Usui, hasta la actualidad. Nuestra escuela Rincón Zen enseña Reiki Tradicional Japonés, preservando con la mayor fidelidad las metodologías originales:
                      </p>
                      
                      {/* Interactive block representing vertical lineage chart based on image */}
                      <div className="relative pl-6 md:pl-10 space-y-4">
                        {/* Vertical line connector */}
                        <div className="absolute left-[1.95rem] md:left-[2.15rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-natural-primary/50 to-natural-secondary/50" />
                        
                        {[
                          { name: "Mikao Usui", role: "Fundador original del Sistema Reiki" },
                          { name: "Kanichi Taketomi", role: "3er Presidente de la Usui Reiki Ryoho Gakkai" },
                          { name: "Kimiko Koyama", role: "6ta Presidenta de la Usui Reiki Ryoho Gakkai" },
                          { name: "Hiroshi Doi", role: "Fundador de Gendai Reiki Ho y miembro de la Gakkai" },
                          { name: "Patricia Germino / Alvaro Wurth", role: "Maestros Transmisores de Linaje Tradicional" },
                          { name: "Daniel Apelhan / Claudia Petrone", role: "Maestros formadores de Marina" },
                          { name: "Marina Rabino", role: "Tu Transmisora de Linaje Directo y Tradicional" },
                          { name: "Vos", role: "Maestro/a Gokuikaiden en formación y siguiente eslabón del linaje" }
                        ].map((master, mIdx) => (
                          <div key={mIdx} className="relative flex items-center group">
                            {/* Bullet circle index over line */}
                            <div className="absolute -left-[2.15rem] md:-left-[2.35rem] w-8 h-8 rounded-full bg-white border-2 border-natural-primary flex items-center justify-center font-mono text-[10px] text-natural-primary font-bold shadow-2xs group-hover:scale-110 transition-transform duration-200 z-10">
                              {mIdx + 1}
                            </div>
                            
                            {/* Card Content */}
                            <div className={`ml-4 md:ml-6 p-4 rounded-2xl border w-full max-w-lg transition-all duration-200 z-0 ${
                              mIdx === 7
                                ? "bg-natural-sand border-natural-primary shadow-xs hover:border-natural-secondary font-medium"
                                : mIdx === 6
                                ? "bg-natural-cream/60 border-natural-secondary/30 shadow-3xs hover:border-natural-secondary/50"
                                : "bg-white border-natural-border shadow-3xs hover:border-natural-primary/50"
                            }`}>
                              <h5 className={`font-serif text-xs md:text-sm font-bold ${mIdx >= 6 ? "text-natural-primary font-bold" : "text-natural-dark"}`}>
                                {master.name}
                              </h5>
                              <p className="text-[10px] text-natural-text-muted mt-0.5 font-sans">
                                {master.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p>{GREETING_TEXT.paragraphs[2]}</p>
                    <p>{GREETING_TEXT.paragraphs[3]}</p>
                  </div>

                  {/* Elegant quote card */}
                  <div className="p-6 border-l-4 border-natural-primary bg-natural-sand/40 rounded-r-2xl italic my-4 text-xs tracking-wide text-natural-dark leading-relaxed font-serif">
                    &ldquo;{GREETING_TEXT.quote}&rdquo;
                    <span className="block mt-1 text-[10px] font-mono uppercase tracking-wider text-natural-primary font-bold not-italic">
                      - {GREETING_TEXT.quoteAuthor}
                    </span>
                  </div>

                  <p className="text-natural-dark font-medium text-xs text-center border-t border-natural-border pt-4 flex justify-center items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-natural-secondary" />
                    Completa esta lectura. Haz clic en el siguiente botón para continuar al asombroso Kanji de Reiki.
                  </p>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        setActiveTab("kanji");
                        markAsRead("kanji");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-natural-bg rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Estudiar el Kanji Reiki</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS 2: EL KANJI REIKI === */}
              {activeTab === "kanji" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-natural-primary animate-pulse" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        Estudio Detallado del Kanji Reiki
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Manual Oficial Rincón Zen
                    </span>
                  </div>

                  <p className="text-natural-text-muted text-sm leading-relaxed">
                    Mucho más que una simple convención lingüística japonesa, el nombre <strong className="text-natural-dark">“Reiki Ho”</strong> en sí mismo simboliza de forma sagrada el flujo unificado entre lo cósmico y lo corporal. Explora el desglose paso a paso de su composición tradicional según nuestro manual:
                  </p>

                  {/* Horizontal sub-tabs for Kanji breakdown */}
                  <div className="flex flex-wrap gap-1.5 border-b border-natural-border/60 pb-1">
                    {[
                      { id: "origen", label: "1. Origen del Kanji" },
                      { id: "rei", label: "2. REI (靈) - El Alma" },
                      { id: "ki", label: "3. KI (氣) - La Energía" },
                      { id: "historia", label: "4. Terminología e Historia" }
                    ].map((sTab) => (
                      <button
                        key={sTab.id}
                        onClick={() => setKanjiSubTab(sTab.id)}
                        className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all ${
                          kanjiSubTab === sTab.id
                            ? "bg-natural-sand text-natural-primary border-t-2 border-natural-primary shadow-3xs"
                            : "text-natural-text-muted hover:text-natural-dark hover:bg-natural-eggshell"
                        }`}
                      >
                        {sTab.label}
                      </button>
                    ))}
                  </div>

                  {/* Sub-tab: ORIGEN */}
                  {kanjiSubTab === "origen" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 p-5 bg-white rounded-3xl border border-natural-border shadow-3xs animate-fade-in">
                      <div className="md:col-span-1 bg-gradient-to-b from-natural-cream to-natural-sand p-6 rounded-2xl border border-natural-border flex flex-col justify-center items-center text-center relative overflow-hidden">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-natural-text-muted/60 absolute top-3 left-3">Escritura Sagrada</span>
                        <div className="text-8xl font-serif text-natural-dark tracking-normal select-none animate-float filter drop-shadow-sm font-cinzel my-4">
                          靈氣
                        </div>
                        <span className="text-xs font-mono tracking-widest text-natural-primary uppercase font-bold">R-E-I - K-I</span>
                      </div>
                      
                      <div className="md:col-span-2 space-y-4 text-xs md:text-sm text-natural-text-muted leading-relaxed flex flex-col justify-center">
                        <h4 className="font-serif text-base text-natural-dark font-bold">¿Cómo surgen estos signos de escritura?</h4>
                        <p>
                          El término japonés Reiki consta de dos <em>kanji</em> (signos de escritura china). Estos signos de escritura fueron introducidos desde China a través de Corea hasta Japón.
                        </p>
                        <p>
                          En el <strong>ideario sintoísta</strong>, se relaciona a las <strong>aves — mensajes de los dioses —</strong> con los kanji. Se cuenta que las aves dejaron sus huellas impresas en la arena de la playa y los hombres copiaron estas huellas de pisadas consideradas como las noticias de los dioses.
                        </p>
                        <p>
                          Los kanji pueden representar en japonés o bien un objeto o bien una idea, un concepto o un sonido. En Reiki unimos lo espiritual (Rei) con lo vital (Ki).
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab: REI */}
                  {kanjiSubTab === "rei" && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-4 bg-natural-cream/60 border border-natural-border rounded-2xl">
                        <h4 className="font-serif text-sm font-bold text-natural-primary flex items-center gap-2">
                          <span className="text-2xl font-cinzel">靈</span> El Primer Kanji: REI (Alma, lo sagrado, lo celestial)
                        </h4>
                        <p className="text-xs text-natural-text-muted mt-1 leading-relaxed">
                          La primera letra del término se divide y subdivide en tres partes tradicionales muy sutiles que juntas representan el puente que conecta el cielo con el alma humana:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Part 1: Ame */}
                        <div className="bg-white p-5 rounded-2xl border border-natural-border shadow-3xs flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 bg-natural-sand rounded-xl flex items-center justify-center font-serif text-xl font-bold text-natural-primary border border-natural-border/70 mb-3 select-none">
                              雨
                            </div>
                            <h5 className="font-serif text-xs font-bold text-natural-dark tracking-wide uppercase">1. Ame - Lluvia</h5>
                            <p className="text-[11px] text-natural-text-muted mt-2 leading-relaxed">
                              Japón es un país volcánico. Las cenizas volcánicas, unidas a la lluvia, producen suelos fértiles. Por consiguiente, la lluvia representa la <strong>fertilidad</strong> y también simboliza la bendición del cosmos, que cae sobre la tierra. En el sintoísmo, la religión ancestral del Japón, a la lluvia se la relaciona directamente con varios dioses.
                            </p>
                          </div>
                        </div>

                        {/* Part 2: Utsuwa */}
                        <div className="bg-white p-5 rounded-2xl border border-natural-border shadow-3xs flex flex-col justify-between">
                          <div>
                            <div className="flex gap-2 mb-3 select-none">
                              <div className="w-8 h-8 rounded-lg bg-natural-sand flex items-center justify-center font-serif text-sm font-bold text-natural-primary border border-natural-border/75 shadow-3xs">
                                口
                              </div>
                              <div className="w-8 h-8 rounded-lg bg-natural-sand flex items-center justify-center font-serif text-sm font-bold text-natural-primary border border-natural-border/75 shadow-3xs">
                                口
                              </div>
                              <div className="w-8 h-8 rounded-lg bg-natural-sand flex items-center justify-center font-serif text-sm font-bold text-natural-primary border border-natural-border/75 shadow-3xs">
                                口
                              </div>
                            </div>
                            <h5 className="font-serif text-xs font-bold text-natural-dark tracking-wide uppercase">2. Utsuwa - Recipientes</h5>
                            <p className="text-[11px] text-natural-text-muted mt-2 leading-relaxed">
                              Significa <strong>recipiente</strong>, o referido al cuerpo humano, el recipiente para albergar el alma. Al plasmar un concepto tan complejo, las letras se simplificaron a tres casillas. Estas tres casillas encierran un doble sentido espiritual sagrado: una casilla es para la <strong>boca</strong>, la segunda es para la <strong>conversación</strong> y la tercera es para la <strong>oración</strong>.
                            </p>
                          </div>
                        </div>

                        {/* Part 3: Miko */}
                        <div className="bg-white p-5 rounded-2xl border border-natural-border shadow-3xs flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 bg-natural-sand rounded-xl flex items-center justify-center font-serif text-xl font-bold text-natural-primary border border-natural-border/70 mb-3 select-none">
                              巫
                            </div>
                            <h5 className="font-serif text-xs font-bold text-natural-dark tracking-wide uppercase">3. Miko - Chamán / Médium</h5>
                            <p className="text-[11px] text-natural-text-muted mt-2 leading-relaxed">
                              Significa el medio femenino, hechicera o chamán. Una <em>miko</em> entiende los sonidos de los dioses, convirtiéndose en una <strong>mediadora pura entre los dioses y la humanidad</strong>. Nuestro manual de Rincón Zen destaca que todos los practicantes de Reiki deben actuar como una miko: confiar en el cielo y dejándose guiar por los dioses. En el Kanji, este signo aparece de forma simplificada.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-natural-sand/30 p-4 rounded-xl border border-natural-border/60 text-xs text-natural-dark text-center font-medium font-serif italic">
                        &ldquo;En resumen, el carácter completo REI se traduce de manera trascendental como ALMA (en japonés, mashi).&rdquo;
                      </div>
                    </div>
                  )}

                  {/* Sub-tab: KI */}
                  {kanjiSubTab === "ki" && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-4 bg-natural-cream/60 border border-natural-border rounded-2xl">
                        <h4 className="font-serif text-sm font-bold text-natural-primary flex items-center gap-2">
                          <span className="text-2xl font-cinzel">氣</span> El Segundo Kanji: KI (Fuerza, Vitalidad, Aliento de vida)
                        </h4>
                        <p className="text-xs text-natural-text-muted mt-1 leading-relaxed">
                          El signo del Ki representa la fuerza viva que pulsa en el interior de cada ser viviente y en todo el universo. Se divide en dos componentes:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Component 1: Kigamae / Yuge */}
                        <div className="bg-white p-5 rounded-2xl border border-natural-border shadow-3xs">
                          <div className="w-10 h-10 bg-natural-sand rounded-xl flex items-center justify-center font-serif text-xl font-bold text-natural-primary border border-natural-border/70 mb-3 select-none">
                            气
                          </div>
                          <h5 className="font-serif text-xs font-bold text-natural-dark tracking-wide uppercase">1. Kigamae o Yuge - Vapor / Éter</h5>
                          <p className="text-[11px] text-natural-text-muted mt-2 leading-relaxed">
                            Significa <strong>vapor o éter</strong>. El éter no es vacío inerte, sino que se considera universalmente como el <strong>vehículo directo para lo espiritual</strong> y el canal de conducción de la energía sutil invisible hacia el plano material.
                          </p>
                        </div>

                        {/* Component 2: Kome */}
                        <div className="bg-white p-5 rounded-2xl border border-natural-border shadow-3xs">
                          <div className="w-10 h-10 bg-natural-sand rounded-xl flex items-center justify-center font-serif text-xl font-bold text-natural-primary border border-natural-border/70 mb-3 select-none">
                            米
                          </div>
                          <h5 className="font-serif text-xs font-bold text-natural-dark tracking-wide uppercase">2. Kome - Arroz</h5>
                          <p className="text-[11px] text-natural-text-muted mt-2 leading-relaxed">
                            El arroz es el alimento principal en el sur de Asia y es sinónimo de <strong>vida y sustento</strong>. El signo se interpreta de varias formas lingüísticas hermosas: representa el arroz hirviendo y su vapor ascendente, reproduce una espiga dorada cargada de granos, o hace referencia al número <strong>88</strong>, que son los días místicos que necesita la semilla de arroz desde que se siembra hasta que está lista para tu mesa.
                          </p>
                        </div>
                      </div>

                      <div className="bg-natural-sand/30 p-4 rounded-xl border border-natural-border/60 text-xs text-natural-dark text-center font-medium font-serif italic">
                        &ldquo;Por consiguiente, el Kanji KI unifica el vapor etéreo con el sustento terrenal, y se traduce como la ENERGÍA vital.&rdquo;
                      </div>
                    </div>
                  )}

                  {/* Sub-tab: HISTORIA */}
                  {kanjiSubTab === "historia" && (
                    <div className="bg-white p-5 rounded-3xl border border-natural-border shadow-3xs space-y-4 animate-fade-in text-xs md:text-sm text-natural-text-muted leading-relaxed">
                      <h4 className="font-serif text-base text-natural-dark font-bold">Clarificación Terminológica e Histórica</h4>
                      <p>
                        En tiempos de nuestro fundador, <strong>Usui Sensei</strong>, el término completo <strong>Reiki</strong> significaba explícitamente <strong>&ldquo;energía espiritual&rdquo;</strong>.
                      </p>
                      <p>
                        Sin embargo, en el idioma japonés, esta palabra posee contextos alternativos donde también podría denotar atmósfera ordinaria, estado de ánimo de una habitación, energía oculta, o incluso una vibración espectral o de fantasmas.
                      </p>
                      <p className="border-l-4 border-natural-secondary pl-3 italic bg-natural-eggshell py-2 rounded-r-lg">
                        &ldquo;Para evitar esta confusión involuntaria en la traducción, en Japón el término oficial referencial sobre nuestro método en ocasiones se prefiere escribir romanizado/occidentalizado o bien mediante el silabario <em>katakana</em>.&rdquo;
                      </p>
                      <p>
                        Al estudiar estas raíces, comprendes profundamente como Maestro que tú no provees energía personal mental finita para curar, sino que actúas igual que un canal receptor y refinado (Miko) que decodifica y distribuye la energía cósmica original (Rei) para nutrir la vibración individual cotidiana (Ki).
                      </p>
                    </div>
                  )}

                  {/* Back and Next navigation links */}
                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("bienvenida");
                        markAsRead("bienvenida");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("principios");
                        markAsRead("principios");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-natural-bg rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Los 5 Principios (Gokai)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS 3: EL GOKAI === */}
              {activeTab === "principios" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Sun className="w-6 h-6 text-natural-secondary animate-spin-slow animate-pulse" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        Los 5 Principios: Gokai
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      La Filosofía del Vivir
                    </span>
                  </div>

                  <div className="text-natural-text-muted text-sm leading-relaxed">
                    <p>
                      Usui Sensei catalogó el <strong className="text-natural-primary font-bold">Gokai</strong> como la auténtica medicina espiritual y el remedio de todas las enfermedades mentales y físicas. No son dogmas lejanos para estudiar; son decretos sencillos del corazón para susurrar en silencio al despertarse y antes de dormir.
                    </p>
                  </div>

                  {/* Japanese lettering top graphic quote */}
                  <div className="bg-natural-sand/75 border border-natural-border rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 py-4 px-6 animate-fade-in">
                    <div className="text-natural-primary font-serif text-xs tracking-wider uppercase font-bold text-center md:text-left shrink-0">
                      Mantra Inicial Gokai:
                    </div>
                    <div className="text-sm bg-white border border-natural-border py-2 px-4 rounded-xl font-mono text-center md:text-left w-full text-natural-dark font-semibold">
                      &ldquo;Kyo dake wa...&rdquo; <span className="text-natural-text-muted font-sans text-xs">(Solo por hoy...)</span>
                    </div>
                  </div>

                  {/* Detailed interactive listing of 5 principles with layout animations */}
                  <div className="space-y-3.5">
                    {REIKI_PRINCIPLES.map((principle, idx) => {
                      return (
                        <div
                          key={idx}
                          className="bg-white border border-natural-border hover:border-natural-secondary rounded-2xl p-5 transition-all shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-natural-sand border border-natural-border flex items-center justify-center text-natural-primary text-xs font-mono font-bold">
                                0{idx + 1}
                              </div>
                              <h4 className="font-serif text-sm sm:text-base font-bold text-natural-dark">
                                {principle.spanish}
                              </h4>
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className="text-[11px] font-mono text-natural-primary px-2 py-0.5 bg-natural-eggshell border border-natural-border rounded-md tracking-wider font-semibold">
                                {principle.romaji}
                              </span>
                              <span className="text-xs text-natural-text-muted font-serif font-semibold select-none">
                                {principle.japanese}
                              </span>
                            </div>
                          </div>

                          <p className="mt-2.5 text-xs text-natural-text-muted leading-relaxed border-l-2 border-natural-secondary/60 pl-3">
                            {principle.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Insight block */}
                  <div className="p-5 bg-[#f5f2e9] border border-[#e8e4d8] rounded-2xl text-xs sm:text-sm text-natural-dark leading-relaxed">
                    <strong className="block text-natural-primary font-serif mb-1 text-sm font-bold">
                      El Lazo Ético de los Principios como Maestros:
                    </strong>
                    Un Maestro de Reiki no transmite paz gritando directrices complejas. La sintonización pura surge en un canal honesto que ha pacificado de verdad su enojo (Ikaruna) y su preocupación desmedida (Shinpai). Vive de acuerdo con estos cinco pilares para ser un faro genuino en un entorno convulso.
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("kanji");
                        markAsRead("kanji");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("aspectos");
                        markAsRead("aspectos");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-natural-bg rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Aspectos de un Maestro</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS 5: ASPECTOS FUNDAMENTALES === */}
              {activeTab === "aspectos" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Compass className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        {IMPORTANT_ASPECTS.title}
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      La Responsabilidad
                    </span>
                  </div>

                  <p className="text-natural-text-muted text-sm leading-relaxed">
                    {IMPORTANT_ASPECTS.intro} Ser maestro no es solo enseñar técnicas; es amar y practicar Reiki con autenticidad, y ser un canal para que otros encuentren su propio despertar.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
                    {IMPORTANT_ASPECTS.items.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-white border border-natural-border hover:border-natural-secondary p-5 rounded-2xl shadow-sm transition-all relative overflow-hidden"
                        >
                          <div className="flex items-center space-x-3 mb-2.5">
                            <div className="w-8 h-8 rounded-full bg-natural-sand flex items-center justify-center text-natural-primary border border-natural-border/60">
                              {index === 0 && <Heart className="w-4 h-4" />}
                              {index === 1 && <RotateCw className="w-4 h-4" />}
                              {index === 2 && <Sun className="w-4 h-4" />}
                              {index === 3 && <ShieldAlert className="w-4 h-4" />}
                            </div>
                            <h4 className="font-serif text-natural-dark font-bold text-xs sm:text-sm">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-natural-text-muted text-xs leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Spiritual insight quotes */}
                  <div className="p-5 rounded-2xl bg-natural-sand/55 border border-natural-border font-serif text-xs text-natural-dark leading-relaxed uppercase flex flex-col md:flex-row gap-4 items-center">
                    <div className="text-natural-primary font-bold tracking-widest shrink-0 text-xs">
                      LEMA SUPREMO:
                    </div>
                    <div className="normal-case leading-relaxed font-sans text-natural-text-muted">
                      &ldquo;La mente intuitiva es un regalo sagrado, y la mente racional es un fiel sirviente.&rdquo; 
                      <span className="block italic text-[10px] text-natural-text-muted/70 normal-case mt-0.5">- Albert Einstein, citado en manual</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("principios");
                        markAsRead("principios");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("sensibilidad");
                        markAsRead("sensibilidad");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-natural-bg rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Estudiar Byosen y Hibiki</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS 6: SENSIBILIDAD Y BYOSEN === */}
              {activeTab === "sensibilidad" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Activity className="w-6 h-6 text-natural-primary animate-pulse" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        {BYOSEN_HIBIKI.title}
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Sensibilidad Táctil
                    </span>
                  </div>

                  <p className="text-natural-text-muted text-sm leading-relaxed">
                    {BYOSEN_HIBIKI.intro} A través del método de <strong className="text-natural-dark">Byosen Reikan Ho</strong>, aprendemos a reconocer zonas de congestión o estancamiento de energía vital en el cuerpo antes de que se presenten como dolores materiales duraderos.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                    {BYOSEN_HIBIKI.sections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-5 rounded-2xl border border-natural-border shadow-sm"
                      >
                        <h4 className="font-serif font-bold text-natural-primary text-sm mb-2 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-natural-secondary block" />
                          {sec.concept}
                        </h4>
                        <p className="text-xs text-natural-text-muted leading-relaxed mb-3">
                          {sec.definition}
                        </p>
                        <div className="bg-natural-eggshell p-3 rounded-xl border border-natural-border text-[11px] text-natural-text-muted leading-relaxed">
                          <strong>Ejemplo tradicional:</strong> {sec.illustration}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* === HIGHLY INTERACTIVE DIAGNOSTIC SIMULATOR === */}
                  <div className="bg-gradient-to-br from-natural-cream to-natural-sand border border-natural-border rounded-3xl p-6 my-6 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 text-natural-primary pointer-events-none select-none">
                      <Fingerprint className="w-48 h-48 opacity-10" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Fingerprint className="w-5 h-5 text-natural-primary animate-pulse" />
                        <h4 className="font-serif text-xs font-bold tracking-widest uppercase text-natural-dark">
                          Simulador de Sensibilidad de Manos
                        </h4>
                      </div>
                      <p className="text-xs text-natural-text-muted leading-relaxed mb-5">
                        Como futuro Maestro de Gokuikaiden, entrena tu sentido del <strong>Byosen</strong> y el <strong>Hibiki</strong>. Haz clic en una región de la silueta para simular lo que sentirías en tus palmas al actuar como canal de energía:
                      </p>

                      <div className="flex flex-col lg:flex-row gap-6 items-center">
                        
                        {/* Interactive map areas */}
                        <div className="w-full sm:w-80 bg-white/80 p-4 rounded-2xl border border-natural-border flex flex-col gap-2 shrink-0">
                          <span className="text-[10px] font-mono tracking-wider uppercase text-natural-text-muted/60 text-center mb-1 block">Zonas Corporales del Receptor</span>
                          {regions.map((region) => (
                            <button
                              key={region.id}
                              onClick={() => setSelectedRegion(region.id)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                                selectedRegion === region.id
                                  ? "bg-natural-primary text-natural-bg shadow-md font-bold"
                                  : "bg-white hover:bg-natural-sand text-natural-dark border border-natural-border"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Activity className={`w-3.5 h-3.5 ${selectedRegion === region.id ? "text-natural-bg" : "text-natural-secondary"}`} />
                                <span>{region.name}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                            </button>
                          ))}
                        </div>

                        {/* Interactive results screen */}
                        <div className="flex-1 bg-white p-5 rounded-2xl border border-natural-border min-h-[220px] flex flex-col justify-between w-full shadow-sm">
                          {selectedRegion ? (
                            (() => {
                              const reg = regions.find((r) => r.id === selectedRegion)!;
                              return (
                                <div className="space-y-3 animate-fade-in text-xs leading-relaxed">
                                  <div className="flex items-center justify-between border-b border-natural-border pb-2">
                                    <span className="font-serif font-bold text-natural-dark text-sm">
                                      {reg.name}
                                    </span>
                                    <span className="text-[10px] font-mono uppercase bg-natural-cream text-natural-primary border border-natural-border px-2 py-0.5 rounded-md font-bold">
                                      BYOSEN DETECTADO
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3.5">
                                    <div className="bg-natural-eggshell p-2.5 rounded-lg border border-natural-border">
                                      <span className="font-mono text-[9px] text-natural-primary uppercase font-bold block">Señal Térmica (Byosen)</span>
                                      <span className="text-natural-dark font-medium font-serif leading-tight">{reg.byosen}</span>
                                    </div>
                                    <div className="bg-natural-eggshell p-2.5 rounded-lg border border-natural-border">
                                      <span className="font-mono text-[9px] text-natural-primary uppercase font-bold block">Sensación en tus Manos (Hibiki)</span>
                                      <span className="text-natural-dark font-medium font-serif leading-tight">{reg.hibiki}</span>
                                    </div>
                                  </div>

                                  <div className="pt-1">
                                    <span className="font-serif font-bold text-natural-primary block text-[11px] uppercase tracking-wider">Interpretación Tradicional:</span>
                                    <p className="text-natural-text-muted text-[11px] mt-0.5">{reg.analysis}</p>
                                  </div>

                                  <div className="pt-2 border-t border-natural-border border-dashed">
                                    <span className="font-bold text-natural-primary flex items-center gap-1 text-[11px]">
                                      <Sparkles className="w-3.5 h-3.5 text-natural-secondary animate-pulse" /> ACCIÓN Y TRATAMIENTO DEL MAESTRO:
                                    </span>
                                    <p className="text-natural-text-muted italic text-[11px] leading-relaxed mt-0.5">{reg.action}</p>
                                  </div>
                                </div>
                              );
                            })()
                          ) : (
                            <div className="flex flex-col items-center justify-center my-auto text-center space-y-3.5 py-6">
                              <Fingerprint className="w-12 h-12 text-natural-border animate-pulse" />
                              <div>
                                <p className="text-natural-dark font-semibold text-xs">Posa mentalmente tus manos sobre el receptor</p>
                                <p className="text-[10px] text-natural-text-muted mt-0.5">Elige una zona en el menú lateral de la izquierda para comenzar la palpación sutil.</p>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>

                  <p className="text-natural-text-muted text-xs italic text-center">
                    &ldquo;La sensibilidad para sentir el Byosen no es un acto mágico instantáneo, sino una práctica amorosa diaria.&rdquo;
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("aspectos");
                        markAsRead("aspectos");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("test");
                        markAsRead("test");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-natural-bg rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Realizar el Test Evaluativo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS 7: TEST DE EVALUACIÓN === */}
              {activeTab === "test" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-natural-primary animate-bounce" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        Test de Maestría: Clase I
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      10 Preguntas
                    </span>
                  </div>

                  {!showResults ? (
                    <div>
                      <div className="bg-natural-sand/55 p-4 rounded-xl border border-natural-border text-natural-text-muted text-xs leading-relaxed mb-6">
                        <strong className="text-natural-dark block mb-1">Indicaciones:</strong>
                        Este cuestionario de opción múltiple valida de forma sincera todo lo aprendido en la <strong className="text-natural-dark">Clase 1 del Manual de Gokuikaiden</strong>. Se requiere un mínimo de <strong className="text-natural-dark">8 respuestas correctas (80%)</strong> para habilitar y emitir tu Certificado de Participación Honorífico de Clase 1.
                      </div>

                      <div className="space-y-6">
                        {RET_QUIZ_QUESTIONS.map((question, qIdx) => (
                          <div
                            key={question.id}
                            className="p-5 rounded-2xl border border-natural-border bg-white hover:border-natural-secondary transition-colors"
                          >
                            <span className="text-[10px] font-mono uppercase text-natural-primary font-bold tracking-wider block mb-1.5">
                              Pregunta {qIdx + 1} de 10
                            </span>
                            <h4 className="font-serif text-natural-dark text-xs sm:text-sm font-bold mb-3">
                              {question.question}
                            </h4>

                            <div className="grid grid-cols-1 gap-2.5">
                              {question.options.map((option, sizeIdx) => {
                                const isSelected = quizAnswers[question.id] === sizeIdx;
                                return (
                                  <button
                                    key={sizeIdx}
                                    onClick={() => handleSelectOption(question.id, sizeIdx)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                                      isSelected
                                        ? "bg-natural-cream text-natural-primary font-semibold border-2 border-natural-primary"
                                        : "bg-white hover:bg-natural-sand border border-natural-border text-natural-text-muted"
                                    }`}
                                  >
                                    <span>{option}</span>
                                    {isSelected && (
                                      <CheckCircle2 className="w-4 h-4 text-natural-primary shrink-0 ml-2 animate-scale-in" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Submit block */}
                      <div className="mt-8 pt-4 border-t border-natural-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-xs text-natural-text-muted">
                          {isQuizComplete() ? (
                            <span className="text-natural-primary font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-natural-primary" /> Has respondido todas las preguntas. ¡Estás listo para calificar!
                            </span>
                          ) : (
                            <span>
                              Has respondido {Object.keys(quizAnswers).length} de 10 preguntas.
                            </span>
                          )}
                        </div>

                        <button
                          onClick={handleSubmitQuiz}
                          disabled={!isQuizComplete()}
                          className={`px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-2xs ${
                            isQuizComplete()
                              ? "bg-natural-primary hover:bg-natural-primary/95 text-natural-bg cursor-pointer"
                              : "bg-natural-sand text-natural-text-muted/50 border border-natural-border/30 cursor-not-allowed"
                          }`}
                        >
                          Calificar Test Evaluativo
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* QUIZ SUBMITTED RESULTS SECTION */
                    <div className="space-y-6">
                      
                      <div className="bg-natural-eggshell border border-natural-border rounded-3xl p-6 text-center space-y-3 max-w-xl mx-auto shadow-sm">
                        <div className="w-16 h-16 rounded-full bg-natural-cream border border-natural-border flex items-center justify-center mx-auto text-natural-primary">
                          <DiplomaIcon className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-serif text-natural-dark font-bold">
                          Resultados del Test de Maestría
                        </h4>
                        <div className="text-3xl font-serif font-black text-natural-primary tracking-wide">
                          {totalScore} / 10
                        </div>
                        <p className="text-xs text-natural-text-muted max-w-sm mx-auto leading-relaxed">
                          {hasPassed
                            ? "¡Felicidades! Has culminado con profundo éxito la validación teórica de la Clase I de Reiki Gokuikaiden."
                            : "No has alcanzado la nota mínima requerida (8 de 10). Te aconsejamos volver a repasar los textos y reintentar con paciencia natural."}
                        </p>

                        {!hasPassed && (
                          <button
                            onClick={handleResetQuiz}
                            className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary hover:bg-natural-primary/95 text-natural-bg rounded-xl text-xs font-semibold transition shadow-sm"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Reintentar Test</span>
                          </button>
                        )}
                      </div>

                      {/* GORGEOUS CUSTOM DIPLOMA GENERATOR FLOW (IF PASSED) */}
                      {hasPassed && (
                        <div className="border-2 border-dashed border-natural-secondary rounded-3xl p-6 bg-natural-sand/20 max-w-xl mx-auto text-center space-y-4">
                          <h4 className="font-serif text-sm font-bold tracking-wider text-natural-primary uppercase">
                            ¡Certificado de Clase I Habilitado!
                          </h4>
                          <p className="text-xs text-natural-text-muted leading-relaxed">
                            Por favor escribe tu nombre tal cual como deseas que figure en tu diploma honorífico de Rincón Zen para guardarlo o imprimirlo:
                          </p>

                          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input
                              type="text"
                              value={diplomaName}
                              onChange={(e) => setDiplomaName(e.target.value)}
                              placeholder="Tu Nombre y Apellido completo..."
                              className="bg-white border border-natural-border text-xs px-3 py-2.5 rounded-xl flex-1 focus:ring-1 focus:ring-natural-secondary font-medium text-natural-dark"
                            />
                            <button
                              onClick={() => {
                                if (!diplomaName.trim()) return;
                                setViewingDiploma(true);
                              }}
                              className="bg-natural-primary hover:bg-natural-primary/95 text-natural-bg text-xs px-5 py-2.5 rounded-xl font-bold tracking-normal transition-colors shrink-0 disabled:opacity-50 shadow-sm"
                              disabled={!diplomaName.trim()}
                            >
                              Generar Diploma
                            </button>
                          </div>
                        </div>
                      )}

                      {/* DIPLOMA PREVIEW IF GENERATED AND ACTIVE */}
                      {hasPassed && viewingDiploma && (
                        <div className="bg-white border-8 border-double border-natural-primary/85 p-8 rounded-3xl max-w-2xl mx-auto text-center space-y-6 my-8 shadow-md relative overflow-hidden print:shadow-none print:border-natural-primary">
                          {/* Circle Halo Background Stamp */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-natural-sand pointer-events-none select-none opacity-30 z-0">
                            <Flower2 className="w-96 h-96" />
                          </div>

                          <div className="relative z-10 space-y-5">
                            <div className="font-serif text-xs font-bold tracking-widest text-[#544837] uppercase">
                              Diploma de Participación
                            </div>

                            <div className="text-natural-secondary select-none text-2xl font-serif">● ✦ ●</div>

                            <p className="text-xs text-[#6B5A42] font-sans tracking-wide italic leading-relaxed">
                              Por cuanto ha aprobado de manera sobresaliente el módulo de principios, kanji y Byosen Reikan Ho correspondientes a la
                            </p>

                            <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold italic tracking-tight">
                              Clase I de la Maestría de Reiki Tradicional Japonés
                            </h3>

                            <span className="text-[10px] font-mono tracking-wider text-natural-primary uppercase bg-natural-cream border border-natural-border px-3 py-1 rounded inline-block font-bold">
                              Nivel Gokuikaiden
                            </span>

                            <p className="text-xs text-natural-text-muted italic mt-1">Otorgado con amor, luz y sabiduría a:</p>

                            <div className="text-2xl sm:text-3xl font-serif font-bold text-natural-dark border-b-2 border-natural-border/60 max-w-lg mx-auto pb-2 capitalize">
                              {diplomaName || "Futuro Maestro"}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 text-[10px] font-mono text-[#8C7A6B]">
                              <div className="text-left pl-4">
                                <span className="block border-t pt-1 border-stone-200 text-stone-500">Aval Académico:</span>
                                Rincón Zen - Marina
                              </div>
                              <div className="text-right pr-4">
                                <span className="block border-t pt-1 border-stone-200 text-stone-500">Fecha de Validación:</span>
                                {new Date().toLocaleDateString("es-ES")}
                              </div>
                            </div>

                            <div className="pt-2">
                              <p className="text-[10px] italic text-[#8C7A6B] max-w-sm mx-auto font-serif leading-relaxed">
                                &ldquo;La energía del universo no tiene límites, pero solo podemos recibir aquello para lo que estamos preparados.&rdquo; - Mikao Usui
                              </p>
                            </div>

                            <div className="pt-3 print:hidden">
                              <button
                                onClick={handleDownloadDiploma}
                                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-natural-primary hover:bg-natural-primary/95 text-natural-bg rounded-xl text-xs font-bold tracking-wider uppercase transition-colors shadow-sm"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Imprimir o Guardar PDF</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Detailed Question Review so they learn from mistakes */}
                      <div className="mt-8 border-t border-natural-border pt-6 space-y-4">
                        <h4 className="font-serif font-bold text-natural-dark text-sm flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-natural-primary" /> REVISIÓN DE RESPUESTAS (CLASE I):
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {RET_QUIZ_QUESTIONS.map((q, idx) => {
                            const selectedOption = quizAnswers[q.id];
                            const isCorrect = selectedOption === q.correctIndex;
                            return (
                              <div
                                key={q.id}
                                className={`p-4 rounded-xl border text-xs leading-relaxed flex flex-col justify-between ${
                                  isCorrect ? "bg-emerald-50/40 border-emerald-250" : "bg-red-50/45 border-red-200"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between font-bold mb-1.5">
                                    <span className="text-natural-dark font-sans">Pregunta {idx + 1}</span>
                                    <span className="flex items-center gap-0.5">
                                      {isCorrect ? (
                                        <span className="text-emerald-800 flex items-center gap-1 font-sans">
                                          <CheckCircle2 className="w-3.5 h-3.5" /> Correcta
                                        </span>
                                      ) : (
                                        <span className="text-red-800 flex items-center gap-1 font-sans">
                                          <XCircle className="w-3.5 h-3.5" /> Incorrecta
                                        </span>
                                      )}
                                    </span>
                                  </div>

                                  <p className="text-[#3D301E] font-medium mb-2">{q.question}</p>
                                  <div className="text-[11px] text-natural-text-muted bg-white/70 p-2 rounded border border-natural-border">
                                    <span className="font-serif font-bold block text-[10px] uppercase tracking-wider text-natural-primary">Explicación teórica:</span>
                                    {q.explanation}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("sensibilidad");
                        markAsRead("sensibilidad");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("videos");
                        markAsRead("videos");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-natural-bg rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Videos de Práctica</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS 7: VIDEOS DE PRÁCTICA === */}
              {activeTab === "videos" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Video className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        Videos y Material en PDF 
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Sintonía Audiovisual
                    </span>
                  </div>

                  <p className="text-natural-text-muted text-sm leading-relaxed">
                    Acompañá tu instrucción teórica con recursos audiovisuales. Visualizá las listas de reproducción recomendadas y videos demostrativos seleccionados para tu formación de Gokuikaiden.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left/Middle Column: Player & Active Video info */}
                    <div className="lg:col-span-2 space-y-4">
                      {selectedVideoId ? (
                        <div className="bg-white p-4 rounded-3xl border border-natural-border shadow-3xs overflow-hidden">
                          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-natural-border bg-black">
                            {customVideos.find(v => v.id === selectedVideoId)?.type === "vimeo" ? (
                              <iframe
                                className="w-full h-full"
                                src={`https://player.vimeo.com/video/${selectedVideoId}`}
                                title="Reproductor de Rincón Zen (Vimeo)"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : customVideos.find(v => v.id === selectedVideoId)?.type === "youtube_playlist" ? (
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/videoseries?list=${selectedVideoId}`}
                                title="Reproductor de Rincón Zen (Playlist de YouTube)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedVideoId}`}
                                title="Reproductor de Rincón Zen (YouTube)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            )}
                          </div>
                          
                          {/* Selected Video Details */}
                          {customVideos.find(v => v.id === selectedVideoId) && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-serif text-base text-natural-dark font-bold">
                                  {customVideos.find(v => v.id === selectedVideoId)?.title}
                                </span>
                                <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                                  customVideos.find(v => v.id === selectedVideoId)?.type === "vimeo"
                                    ? "bg-blue-100 text-blue-700"
                                    : customVideos.find(v => v.id === selectedVideoId)?.type === "youtube_playlist"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-red-100 text-red-700"
                                }`}>
                                  {customVideos.find(v => v.id === selectedVideoId)?.type === "vimeo" 
                                    ? "Vimeo" 
                                    : customVideos.find(v => v.id === selectedVideoId)?.type === "youtube_playlist"
                                    ? "Playlist de YouTube"
                                    : "YouTube Video"}
                                </span>
                              </div>
                              <p className="text-xs text-natural-text-muted leading-relaxed whitespace-pre-line">
                                {customVideos.find(v => v.id === selectedVideoId)?.description}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-natural-sand/30 border border-dashed border-natural-border p-12 text-center rounded-3xl">
                          <Video className="w-12 h-12 text-natural-primary/40 mx-auto mb-3" />
                          <p className="text-sm text-natural-text-muted">Selecciona un video de la lista para comenzar la de reproducción.</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Video list (No Add Form for students) */}
                    <div className="space-y-6">
                      {/* Video List */}
                      <div className="bg-white p-5 rounded-3xl border border-natural-border shadow-3xs space-y-3">
                        <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-widest border-b pb-2 border-natural-border/60">
                          Videos de la Maestría ({customVideos.length})
                        </h4>
                        
                        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                          {customVideos.map((video) => {
                            const isSelected = selectedVideoId === video.id;
                            const isVimeo = video.type === "vimeo";
                            const isPlaylist = video.type === "youtube_playlist";
                            return (
                              <div
                                key={video.id}
                                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                                  isSelected
                                    ? "bg-natural-cream text-natural-primary border-natural-primary shadow-3xs font-medium"
                                    : "bg-natural-eggshell hover:bg-natural-sand/30 border-natural-border/70 text-natural-dark"
                                }`}
                              >
                                <button
                                  onClick={() => setSelectedVideoId(video.id)}
                                  className="flex items-center gap-2.5 text-xs text-left w-full min-w-0"
                                >
                                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-natural-primary text-white" : "bg-natural-sand text-natural-primary"}`}>
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="truncate pr-1 block font-semibold">{video.title}</span>
                                    <span className="text-[9px] text-natural-text-muted/80 uppercase font-mono tracking-widest">
                                      {isVimeo ? "Vimeo" : isPlaylist ? "Playlist de YT" : "YouTube Video"}
                                    </span>
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                          
                          {customVideos.length === 0 && (
                            <p className="text-center text-xs text-natural-text-muted py-8">No hay videos en la lista.</p>
                          )}
                        </div>
                      </div>

                      {/* Documentos de Lectura & Manuales PDF (Descargas desde Google Drive) */}
                      <div className="bg-gradient-to-b from-natural-cream/80 to-natural-sand/50 p-5 rounded-3xl border border-natural-border shadow-3xs space-y-3">
                        <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-widest border-b pb-2 border-natural-border/60 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-natural-primary" />
                          Manuales en PDF ({downloadableDocs.length})
                        </h4>
                        
                        <p className="text-[11px] text-natural-text-muted leading-relaxed">
                          Puedes hacer clic para descargar o abrir el material de estudio directo desde Google Drive:
                        </p>

                        <div className="space-y-3 pt-1">
                          {downloadableDocs.map((doc) => (
                            <div 
                              key={doc.id}
                              className="bg-white p-3 rounded-2xl border border-natural-border/60 hover:border-natural-primary/55 transition-all shadow-3xs group flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[11px] font-bold text-natural-dark block group-hover:text-natural-primary transition-colors leading-normal">
                                  {doc.title}
                                </span>
                                <p className="text-[10px] text-natural-text-muted/90 mt-1 leading-normal">
                                  {doc.description}
                                </p>
                              </div>
                              
                              <div className="mt-3 flex justify-end">
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-natural-sand hover:bg-natural-primary/10 rounded-lg text-[10px] uppercase tracking-wider font-bold text-natural-primary transition-colors focus:outline-none border border-natural-border/40 hover:border-natural-primary/30"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Descargar Manual</span>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notas del Blog */}
                      <div className="bg-gradient-to-b from-natural-cream/80 to-natural-sand/50 p-5 rounded-3xl border border-natural-border shadow-3xs space-y-3">
                        <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-widest border-b pb-2 border-natural-border/60 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-natural-primary" />
                          Notas del Blog
                        </h4>
                        
                        <p className="text-[11px] text-natural-text-muted leading-relaxed">
                          Artículos recomendados de Rincón Zen para ampliar tu comprensión y profundizar en temas esenciales:
                        </p>

                        <div className="space-y-3 pt-1">
                          <div className="bg-white p-3 rounded-2xl border border-natural-border/60 hover:border-natural-primary/55 transition-all shadow-3xs group flex flex-col justify-between">
                            <div>
                              <span className="text-[11px] font-bold text-[#3D301E] block group-hover:text-natural-primary transition-colors leading-normal">
                                ¿Qué es un Egregor? La energía invisible que también nos habita
                              </span>
                              <p className="text-[10px] text-natural-text-muted/90 mt-1 leading-normal">
                                Descubrí cómo los pensamientos y emociones colectivas crean corrientes energéticas y cómo influyen en nuestra vibración cotidiana.
                              </p>
                            </div>
                            
                            <div className="mt-3 flex justify-end">
                              <a
                                href="https://www.rinconzen.com.ar/post/qu%C3%A9-es-un-egregor-la-energ%C3%ADa-invisible-que-tambi%C3%A9n-nos-habita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-natural-sand hover:bg-natural-primary/10 rounded-lg text-[10px] uppercase tracking-wider font-bold text-natural-primary transition-colors focus:outline-none border border-natural-border/40 hover:border-natural-primary/30"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Leer Artículo</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("sensibilidad");
                        markAsRead("sensibilidad");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("test");
                        markAsRead("test");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-natural-bg rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Comenzar Validación</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS 8: ROADMAP FUTURE GROWTH === */}
              {activeTab === "roadmap" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        El Sendero Gokuikaiden de Rincón Zen
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Crecimiento Espiritual
                    </span>
                  </div>

                  <div className="text-natural-text-muted text-sm leading-relaxed space-y-3">
                    <p>
                      La Maestría en Reiki no es una meta que se obtiene de la noche a la mañana, sino un sendero sin fin. Esta aplicación interactiva cubre la <strong className="text-natural-dark">Clase I de Gokuikaiden</strong>, ofreciendo las bases tradicionales sólidas.
                    </p>
                    <p>
                      A continuación, descubre la hoja de ruta y planificación didáctica del manual para que puedas vislumbrar cómo crecerá tu canal energético en las clases venideras de Reiki Tradicional Japonés de nuestra escuela:
                    </p>
                  </div>

                  {/* Roadmap step representation */}
                  <div className="space-y-6 my-6 relative pl-4 md:pl-8 border-l border-natural-border">
                    {FUTURE_ROADMAP.map((step, idx) => (
                      <div key={idx} className="relative space-y-2">
                        {/* Circle bullet index */}
                        <div className={`absolute -left-12 top-0.5 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-colors ${
                          step.unlocked
                            ? "bg-natural-cream text-natural-primary border-natural-border/80 shadow-2xs"
                            : "bg-white text-natural-text-muted/60 border-natural-border"
                        }`}>
                          {step.classNumber}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-serif text-sm sm:text-base font-bold text-natural-dark flex items-center gap-1.5">
                            {step.title}
                            {!step.unlocked && <Lock className="w-3.5 h-3.5 text-natural-text-muted/50 shrink-0" />}
                          </h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                            step.unlocked
                              ? "bg-natural-cream text-natural-primary border border-natural-border/75"
                              : "bg-natural-eggshell text-natural-text-muted/50 border border-natural-border/40"
                          }`}>
                            {step.unlocked ? "Clase Activa" : "Próximamente"}
                          </span>
                        </div>

                        <p className="text-xs text-natural-text-muted leading-relaxed">
                          {step.summary}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {step.topics.map((top, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-sans bg-natural-sand/35 border border-natural-border/40 px-2.5 py-1 rounded-lg text-natural-text-muted"
                            >
                              ✦ {top}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-start items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("test");
                        markAsRead("test");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS CLASE II: BIENVENIDA === */}
              {activeTab === "c2_bienvenida" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Flower2 className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        {CLASS2_INTRO.title}
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Camino Interior
                    </span>
                  </div>

                  <div className="bg-[#f5f2e9] p-6 rounded-3xl border border-[#e8e4d8] shadow-sm relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-natural-primary pointer-events-none">
                      <Flower2 className="w-24 h-24 stroke-1 opacity-10" />
                    </div>
                    <p className="text-natural-dark font-serif italic text-sm sm:text-base leading-relaxed relative z-10">
                      &ldquo;{CLASS2_INTRO.intro}&rdquo;
                    </p>
                    <div className="mt-3 text-right">
                      <span className="text-xs font-mono text-natural-primary font-semibold">
                        {CLASS2_INTRO.concept}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-serif text-base font-bold text-natural-dark">
                      Los Puentes de las Grandes Tradiciones de Oriente:
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {CLASS2_INTRO.bridges.map((bridge, idx) => (
                        <div key={idx} className="p-5 rounded-2xl border border-natural-border hover:border-natural-primary/45 transition-all bg-natural-eggshell/40 shadow-3xs flex flex-col justify-between">
                          <span className="text-xs font-serif text-natural-primary uppercase tracking-widest font-bold">
                            {bridge.tradition}
                          </span>
                          <p className="text-xs text-natural-text-muted mt-2">
                            Apunta hacia: <strong className="text-natural-dark">{bridge.path}</strong>
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 border border-natural-border bg-natural-cream/30 rounded-2xl text-xs text-natural-text-muted leading-relaxed">
                      <p className="font-semibold text-natural-primary mb-2">✦ La Integración en Reiki:</p>
                      <p>
                        Mikao Usui estudió profundamente estas corrientes filosóficas. Reiki no nació en el vacío, sino en un Japón impregnado de la devoción del Shintō, la alquimia corporal y meditación del Taoísmo, y el vacío compasivo del Budismo Zen. Al comprender estas raíces, la práctica de Reiki trasciende el simple tratamiento de imposición de manos y se convierte en un mapa sagrado de despertar personal.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("c2_tesoros");
                        markAsRead("c2_tesoros");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Los 3 Tesoros</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS CLASE II: LOS 3 TESOROS === */}
              {activeTab === "c2_tesoros" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        Los Tres Tesoros del Taoísmo (San Bao)
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Alquimia Interna
                    </span>
                  </div>

                  <p className="text-xs text-natural-text-muted leading-relaxed">
                    El Taoísmo considera que el ser humano posee tres grandes tesoros o manifestaciones de la energía. No son tres fuerzas independientes, sino tres niveles vibratorios de la misma corriente vital que nos conecta con el Cosmos:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CLASS2_TREASURES.map((treasure, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white p-5 rounded-2xl border border-natural-border hover:border-natural-primary/50 transition-all shadow-3xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-2xl font-bold font-serif text-natural-primary">{treasure.kanji}</span>
                            <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 bg-natural-cream text-natural-primary rounded">{treasure.name}</span>
                          </div>
                          <h4 className="text-sm font-serif font-bold text-natural-dark">{treasure.romaji}</h4>
                          <p className="text-[11px] text-natural-primary/80 italic mt-0.5">{treasure.translation}</p>
                          <p className="text-xs text-natural-text-muted mt-3 leading-relaxed">{treasure.description}</p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-natural-border/60">
                          <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-natural-dark/70 mb-1.5">Correspondencias:</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {treasure.associations.map((assoc, aIdx) => (
                              <span key={aIdx} className="text-[9px] font-mono bg-natural-eggshell border border-natural-border px-1.5 py-0.5 rounded text-natural-text-muted">
                                {assoc}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] text-natural-text-muted">
                            <strong className="text-natural-dark font-serif">Arquetipo:</strong> {treasure.archetype}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 border border-natural-border bg-gradient-to-br from-natural-cream/40 to-natural-sand/35 rounded-2xl text-xs text-natural-text-muted leading-relaxed space-y-2">
                    <p className="font-semibold text-natural-primary">✦ La Alquimia de la Práctica:</p>
                    <p>
                      En el autotratamiento o sintonización de Reiki, nutrimos el <strong className="text-natural-dark">Jing</strong> mediante el descanso y la conexión con la Tierra, dinamizamos nuestro <strong className="text-natural-dark">Qi</strong> guiando el aliento consciente (respiración Tanden), y despertamos el <strong className="text-natural-dark">Shen</strong> reposando en la meditación silenciosa (Gassho).
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("c2_bienvenida");
                        markAsRead("c2_bienvenida");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("c2_dantien");
                        markAsRead("c2_dantien");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Dantians y Órbita</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS CLASE II: DANTIENS Y ORBITA === */}
              {activeTab === "c2_dantien" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Compass className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        Los Tres Dantians y la Órbita Microcósmica
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Fisiología Energética
                    </span>
                  </div>

                  <p className="text-xs text-natural-text-muted leading-relaxed">
                    Dantian significa literalmente <strong className="text-natural-dark">&ldquo;Campo del Elixir&rdquo;</strong>. Son tres grandes centros energéticos de transformación alquímica situados a lo largo de nuestro eje central corporal:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CLASS2_DANTIENS.map((dantian, idx) => (
                      <div key={idx} className="p-5 rounded-2xl border border-natural-border bg-white shadow-3xs hover:border-natural-primary/50 transition-all flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-natural-dark flex items-center gap-1.5 border-b pb-2 border-natural-border/60">
                            <span className="w-2 h-2 rounded-full bg-natural-primary" />
                            {dantian.name}
                          </h4>
                          <p className="text-[10px] text-natural-primary font-mono mt-1.5">📍 {dantian.location}</p>
                          <p className="text-xs text-natural-text-muted mt-3 leading-relaxed">{dantian.description}</p>
                        </div>
                        <div className="mt-5 pt-3 border-t border-natural-border/60">
                          <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-natural-dark/70 mb-1">Cualidades:</p>
                          <ul className="text-xs text-natural-text-muted space-y-1 pl-3 list-disc">
                            {dantian.represents.map((rep, rIdx) => (
                              <li key={rIdx}>{rep}</li>
                            ))}
                          </ul>
                          <p className="text-[11px] text-natural-primary font-serif italic mt-3">
                            <strong>Rol:</strong> {dantian.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Microcosmic Orbit Section */}
                  <div className="p-6 border border-natural-border rounded-2xl bg-gradient-to-br from-natural-eggshell to-natural-cream/50 space-y-4">
                    <h4 className="font-serif text-sm font-bold text-natural-primary">
                      {CLASS2_MICRO_ORBIT.title}
                    </h4>
                    <p className="text-xs text-natural-text-muted leading-relaxed">
                      {CLASS2_MICRO_ORBIT.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {CLASS2_MICRO_ORBIT.meridians.map((meridian, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-natural-border">
                          <span className="text-xs font-mono font-bold text-natural-primary uppercase tracking-widest">{meridian.name}</span>
                          <p className="text-xs text-natural-text-muted mt-1 leading-relaxed">{meridian.description}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-natural-text-muted italic border-t pt-3 border-natural-border/50">
                      <strong>💡 Práctica recomendada:</strong> Visualiza la luz circulando por el canal posterior (Du Mai) al inhalar, y descendiendo por el canal anterior (Ren Mai) al exhalar. Esta es la base de la respiración purificadora de Reiki tradicional.
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("c2_tesoros");
                        markAsRead("c2_tesoros");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("c2_simbolos");
                        markAsRead("c2_simbolos");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Símbolos y Kurama</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS CLASE II: SIMBOLOS Y DEIDADES === */}
              {activeTab === "c2_simbolos" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Flame className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        Los Símbolos de Reiki y la Tríada del Monte Kurama
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Simbología Cósmica
                    </span>
                  </div>

                  <p className="text-xs text-natural-text-muted leading-relaxed">
                    Los símbolos de Reiki no son dibujos vacíos, son portales arquetípicos de conciencia. Cada uno vibra en correspondencia directa con las tres divinidades que conforman el <strong className="text-natural-dark">Sonten</strong> (la Suprema Conciencia del Universo) venerada en el Monte Kurama, donde Mikao Usui alcanzó el Satori:
                  </p>

                  {/* Symbol Cards */}
                  <div className="space-y-8">
                    {[
                      {
                        id: "cho-ku-rei",
                        name: "Cho Ku Rei",
                        japanese: "超空靈",
                        romaji: "Símbolo del Poder y Manifestación",
                        translation: "Llamar a la energía aquí y ahora",
                        history: "Es el primer símbolo que se enseña tradicionalmente. Representa la materialización de la fuerza espiritual en la realidad terrenal.",
                        symbolism: "Simbología de descenso cósmico, un conector vertical entre el Cielo (espíritu) y la Tierra (materia) que culmina en un hélice espiral de enraizamiento.",
                        deity: "Goho Mao Son",
                        deityOrigin: "Fuerza / Voluntad",
                        deityRole: "Fuerza de voluntad cósmica, poder protector, acción y transformación material.",
                        plane: "Tierra",
                        archetype: "El Guerrero Luminoso / El Constructor",
                        imageSrc: choKuReiImg,
                        color: "border-[#D4AF37]/30 bg-[#FFFDF5]"
                      },
                      {
                        id: "sei-he-ki",
                        name: "Sei He Ki",
                        japanese: "聖平己",
                        romaji: "Símbolo de la Armonía Mental-Emocional",
                        translation: "La unificación de la mente y las emociones",
                        history: "Utilizado para sanar adicciones, fobias, desarreglos emocionales y reconciliar opuestos en el plano inconsciente.",
                        symbolism: "Integración equilibrada del cerebro izquierdo (trazado lineal) y derecho (trazado ondulado). Armonía perfecta.",
                        deity: "Senju Kannon",
                        deityOrigin: "Compasión / Amor",
                        deityRole: "Compasión infinita, amor incondicional, curación psicológica y contención sutil.",
                        plane: "Luna",
                        archetype: "La Madre Universal / La Compasión",
                        imageSrc: seiHeKiImg,
                        color: "border-[#D4AF37]/30 bg-[#FFFDF5]"
                      },
                      {
                        id: "hon-sha-ze-sho-nen",
                        name: "Hon Sha Ze Shō Nen",
                        japanese: "本者是正念",
                        romaji: "Símbolo de Conexión sin Distancia",
                        translation: "La naturaleza original es el pensamiento recto",
                        history: "Símbolo para tratamientos remotos o a través del tiempo. Nos enseña que el espacio y el tiempo son ilusiones de la conciencia.",
                        symbolism: "Una intrincada caligrafía kanji tradicional que representa la alineación de la columna de chakras y la conexión trascendental con el sol de la conciencia.",
                        deity: "Bishamonten",
                        deityOrigin: "Sabiduría / Luz",
                        deityRole: "Sabiduría divina, responsabilidad espiritual, rectitud mental y abundancia luminosa.",
                        plane: "Sol",
                        archetype: "El Guardián / El Rey Justo",
                        imageSrc: honShaZeShoNenImg,
                        color: "border-[#D4AF37]/30 bg-[#FFFDF5]"
                      }
                    ].map((symbol, idx) => (
                      <div 
                        key={idx} 
                        className={`p-6 rounded-3xl border ${symbol.color} flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow duration-300 relative overflow-hidden bg-white`}
                      >
                        {/* Image Column */}
                        <div className="w-full md:w-48 h-48 shrink-0 rounded-2xl overflow-hidden border border-natural-border shadow-2xs relative">
                          <img 
                            src={symbol.imageSrc} 
                            alt={symbol.name} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 text-white rounded font-mono text-[9px]">
                            {symbol.plane}
                          </div>
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-2 border-natural-border/60">
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-serif font-bold text-natural-dark">{symbol.name}</h4>
                              <span className="text-sm font-bold font-serif text-natural-primary">({symbol.japanese})</span>
                            </div>
                            <span className="text-[10px] font-mono uppercase bg-natural-cream text-natural-primary px-2 py-0.5 rounded font-bold">
                              Arquetipo: {symbol.archetype}
                            </span>
                          </div>

                          <p className="text-xs text-natural-primary font-semibold font-serif">{symbol.romaji} — &ldquo;{symbol.translation}&rdquo;</p>
                          <p className="text-xs text-natural-text-muted leading-relaxed">{symbol.history}</p>
                          <p className="text-xs text-natural-text-muted leading-relaxed"><strong className="text-natural-dark">Simbolismo Profundo:</strong> {symbol.symbolism}</p>

                          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-natural-eggshell/50 border border-natural-border/60">
                              <span className="text-[9px] font-mono uppercase tracking-wider text-natural-primary font-bold block">Resonancia en Kurama:</span>
                              <span className="text-xs font-serif font-bold text-natural-dark block mt-0.5">{symbol.deity}</span>
                              <span className="text-[10px] text-natural-text-muted">{symbol.deityOrigin} (Sonten)</span>
                            </div>
                            <div className="p-3 rounded-xl bg-natural-eggshell/50 border border-natural-border/60">
                              <span className="text-[9px] font-mono uppercase tracking-wider text-natural-primary font-bold block">Acción Divina:</span>
                              <span className="text-xs text-natural-text-muted leading-tight block mt-1">{symbol.deityRole}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Comparison Matrix Table */}
                  <div className="bg-white border border-natural-border rounded-2xl overflow-hidden shadow-3xs">
                    <div className="p-4 bg-natural-cream/40 border-b border-natural-border">
                      <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-wider">Tabla de Síntesis del Camino Interior</h4>
                      <p className="text-[10px] text-natural-text-muted/80 leading-normal">Una lectura contemporánea integradora de las correspondencias tradicionales.</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-natural-eggshell border-b border-natural-border font-mono text-[10px] text-natural-text-muted uppercase">
                            <th className="p-3">Tradición Taoísta</th>
                            <th className="p-3">Resonancia en Kurama</th>
                            <th className="p-3">Símbolo de Reiki</th>
                            <th className="p-3">Plano Celestial</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-natural-border/60">
                          {CLASS2_TRILOGY_MAPPING.map((row, idx) => (
                            <tr key={idx} className="hover:bg-natural-cream/10 transition-colors">
                              <td className="p-3 font-medium text-natural-dark">{row.taoism}</td>
                              <td className="p-3 font-serif font-semibold text-natural-primary">{row.kurama}</td>
                              <td className="p-3 font-serif font-bold text-natural-dark">{row.reiki}</td>
                              <td className="p-3 font-mono text-[11px] text-natural-text-muted">{row.plane}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("c2_dantien");
                        markAsRead("c2_dantien");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("c2_jung");
                        markAsRead("c2_jung");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>La Mirada de Jung</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS CLASE II: LA MIRADA DE JUNG === */}
              {activeTab === "c2_jung" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        {CLASS2_JUNG_SYMBOLISM.title}
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Simbología y Psicología
                    </span>
                  </div>

                  <p className="text-xs text-natural-primary font-serif font-semibold italic">
                    {CLASS2_JUNG_SYMBOLISM.subtitle}
                  </p>

                  <div className="space-y-4 text-xs text-natural-text-muted leading-relaxed">
                    {CLASS2_JUNG_SYMBOLISM.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Elegant Quote */}
                  <div className="bg-natural-eggshell border-l-4 border-natural-primary p-6 rounded-r-2xl italic my-6 shadow-3xs relative overflow-hidden">
                    <div className="absolute right-4 bottom-2 text-natural-primary/5 select-none font-serif text-7xl font-bold">
                      &ldquo;
                    </div>
                    <p className="text-natural-dark font-serif text-sm leading-relaxed relative z-10">
                      &ldquo;{CLASS2_JUNG_SYMBOLISM.quote}&rdquo;
                    </p>
                    <p className="text-[10px] font-mono text-natural-primary font-bold text-right mt-2 uppercase tracking-wider">
                      - {CLASS2_JUNG_SYMBOLISM.author}
                    </p>
                  </div>

                  <div className="p-5 border border-natural-border bg-gradient-to-br from-natural-cream/30 to-natural-sand/30 rounded-2xl text-xs text-natural-text-muted leading-relaxed">
                    <p className="font-semibold text-natural-primary mb-1">✦ Símbolos como Herramientas Auto-Reguladoras:</p>
                    <p>
                      En lugar de concebir los símbolos de Reiki como sortilegios supersticiosos o dibujos estáticos, la psicología arquetípica nos invita a considerarlos como herramientas auto-reguladoras de la energía psíquica. Al trazar un Cho Ku Rei, encauzamos conscientemente la voluntad de arraigarnos. Al trazar Sei He Ki, sintonizamos con la compasión materna de nuestra propia mente inconsciente, reconciliando tensiones y dolores antiguos.
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("c2_simbolos");
                        markAsRead("c2_simbolos");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("c2_videos");
                        markAsRead("c2_videos");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Videos y Material</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS CLASE II: VIDEOS Y DOCUMENTOS === */}
              {activeTab === "c2_videos" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b pb-4 border-natural-border">
                    <div className="flex items-center gap-3">
                      <Video className="w-6 h-6 text-natural-primary" />
                      <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                        Videos y Material en PDF (Clase II)
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Sintonía Audiovisual II
                    </span>
                  </div>

                  <p className="text-natural-text-muted text-sm leading-relaxed">
                    Acompaña tu instrucción teórica con recursos audiovisuales oficiales de la maestría para el Nivel II. Visualiza las listas de reproducción recomendadas y videos demostrativos seleccionados para tu formación de Okuden.
                  </p>

                  <div className="bg-natural-sand/40 border border-natural-border/70 rounded-2xl p-4 flex items-start gap-3 shadow-3xs">
                    <Info className="w-5 h-5 text-natural-primary shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-natural-text-muted font-medium leading-relaxed">
                      Todo conocimiento necesita su tiempo para revelarse. Por eso, algunos contenidos de esta clase se habilitarán de manera progresiva, acompañando el ritmo natural de la Maestría.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left/Middle Column: Player & Active Video info */}
                    <div className="lg:col-span-2 space-y-4">
                      {selectedVideoId2 ? (
                        <div className="bg-white p-4 rounded-3xl border border-natural-border shadow-3xs overflow-hidden">
                          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-natural-border bg-black">
                            {customVideos2.find(v => v.id === selectedVideoId2)?.type === "vimeo" ? (
                              <iframe
                                className="w-full h-full"
                                src={`https://player.vimeo.com/video/${selectedVideoId2}`}
                                title="Reproductor de Rincón Zen (Vimeo)"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : customVideos2.find(v => v.id === selectedVideoId2)?.type === "youtube_playlist" ? (
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/videoseries?list=${selectedVideoId2}`}
                                title="Reproductor de Rincón Zen (Playlist de YouTube)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedVideoId2}`}
                                title="Reproductor de Rincón Zen (YouTube)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            )}
                          </div>
                          
                          {/* Selected Video Details */}
                          {customVideos2.find(v => v.id === selectedVideoId2) && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-serif text-base text-natural-dark font-bold">
                                  {customVideos2.find(v => v.id === selectedVideoId2)?.title}
                                </span>
                                <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                                  customVideos2.find(v => v.id === selectedVideoId2)?.type === "vimeo"
                                    ? "bg-blue-100 text-blue-700"
                                    : customVideos2.find(v => v.id === selectedVideoId2)?.type === "youtube_playlist"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-red-100 text-red-700"
                                }`}>
                                  {customVideos2.find(v => v.id === selectedVideoId2)?.type === "vimeo" 
                                    ? "Vimeo" 
                                    : customVideos2.find(v => v.id === selectedVideoId2)?.type === "youtube_playlist"
                                    ? "Playlist de YouTube"
                                    : "YouTube Video"}
                                </span>
                              </div>
                              <p className="text-xs text-natural-text-muted leading-relaxed whitespace-pre-line">
                                {customVideos2.find(v => v.id === selectedVideoId2)?.description}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-natural-sand/30 border border-dashed border-natural-border p-12 text-center rounded-3xl">
                          <Video className="w-12 h-12 text-natural-primary/40 mx-auto mb-3" />
                          <p className="text-sm text-natural-text-muted">Selecciona un video de la lista para comenzar la reproducción.</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Video list */}
                    <div className="space-y-6">
                      {/* Video List */}
                      <div className="bg-white p-5 rounded-3xl border border-natural-border shadow-3xs space-y-3">
                        <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-widest border-b pb-2 border-natural-border/60">
                          Videos de la Maestría ({customVideos2.length})
                        </h4>
                        
                        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                          {customVideos2.map((video) => {
                            const isSelected = selectedVideoId2 === video.id;
                            const isVimeo = video.type === "vimeo";
                            const isPlaylist = video.type === "youtube_playlist";
                            return (
                              <div
                                key={video.id}
                                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                                  isSelected
                                    ? "bg-natural-cream text-natural-primary border-natural-primary shadow-3xs font-medium"
                                    : "bg-natural-eggshell hover:bg-natural-sand/30 border-natural-border/70 text-natural-dark"
                                }`}
                              >
                                <button
                                  onClick={() => setSelectedVideoId2(video.id)}
                                  className="flex items-center gap-2.5 text-xs text-left w-full min-w-0"
                                >
                                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-natural-primary text-white" : "bg-natural-sand text-natural-primary"}`}>
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="truncate pr-1 block font-semibold">{video.title}</span>
                                    <span className="text-[9px] text-natural-text-muted/80 uppercase font-mono tracking-widest">
                                      {isVimeo ? "Vimeo" : isPlaylist ? "Playlist de YT" : "YouTube Video"}
                                    </span>
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                          
                          {customVideos2.length === 0 && (
                            <p className="text-center text-xs text-natural-text-muted py-8">No hay videos en la lista.</p>
                          )}
                        </div>
                      </div>

                      {/* Documentos de Lectura & Manuales PDF */}
                      <div className="bg-gradient-to-b from-natural-cream/80 to-natural-sand/50 p-5 rounded-3xl border border-natural-border shadow-3xs space-y-3">
                        <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-widest border-b pb-2 border-natural-border/60 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-natural-primary" />
                          Manuales en PDF ({downloadableDocs2.length})
                        </h4>
                        
                        {downloadableDocs2.length > 0 ? (
                          <>
                            <p className="text-[11px] text-natural-text-muted leading-relaxed">
                              Puedes hacer clic para descargar o abrir el material de estudio directo desde Google Drive:
                            </p>
 
                            <div className="space-y-3 pt-1">
                              {downloadableDocs2.map((doc) => (
                                <div 
                                  key={doc.id}
                                  className="bg-white p-3 rounded-2xl border border-natural-border/60 hover:border-natural-primary/55 transition-all shadow-3xs group flex flex-col justify-between"
                                >
                                  <div>
                                    <span className="text-[11px] font-bold text-[#3D301E] block group-hover:text-natural-primary transition-colors leading-normal">
                                      {doc.title}
                                    </span>
                                    <p className="text-[10px] text-natural-text-muted/90 mt-1 leading-normal">
                                      {doc.description}
                                    </p>
                                  </div>
                                  
                                  <div className="mt-3 flex justify-end">
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-natural-sand hover:bg-natural-primary/10 rounded-lg text-[10px] uppercase tracking-wider font-bold text-natural-primary transition-colors focus:outline-none border border-natural-border/40 hover:border-natural-primary/30"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      <span>Descargar Manual</span>
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="bg-white p-4 rounded-2xl border border-dashed border-natural-border/60 text-center space-y-1">
                            <p className="text-[11px] text-natural-text-muted/90 italic leading-relaxed">
                              El nuevo material de estudio oficial se encuentra en proceso de edición y se habilitará en este espacio próximamente.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Notas del Blog */}
                      <div className="bg-gradient-to-b from-natural-cream/80 to-natural-sand/50 p-5 rounded-3xl border border-natural-border shadow-3xs space-y-3">
                        <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-widest border-b pb-2 border-natural-border/60 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-natural-primary" />
                          Notas del Blog
                        </h4>
                        
                        <p className="text-[11px] text-natural-text-muted leading-relaxed">
                          Artículos recomendados de Rincón Zen para ampliar tu comprensión y profundizar en temas esenciales:
                        </p>

                        <div className="space-y-3 pt-1">
                          <div className="bg-white p-3 rounded-2xl border border-natural-border/60 hover:border-natural-primary/55 transition-all shadow-3xs group flex flex-col justify-between">
                            <div>
                              <span className="text-[11px] font-bold text-[#3D301E] block group-hover:text-natural-primary transition-colors leading-normal">
                                ¿Qué es un Egregor? La energía invisible que también nos habita
                              </span>
                              <p className="text-[10px] text-natural-text-muted/90 mt-1 leading-normal">
                                Descubrí cómo los pensamientos y emociones colectivas crean corrientes energéticas y cómo influyen en nuestra vibración cotidiana.
                              </p>
                            </div>
                            
                            <div className="mt-3 flex justify-end">
                              <a
                                href="https://www.rinconzen.com.ar/post/qu%C3%A9-es-un-egregor-la-energ%C3%ADa-invisible-que-tambi%C3%A9n-nos-habita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-natural-sand hover:bg-natural-primary/10 rounded-lg text-[10px] uppercase tracking-wider font-bold text-natural-primary transition-colors focus:outline-none border border-natural-border/40 hover:border-natural-primary/30"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Leer Artículo</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                    <button
                      onClick={() => {
                        setActiveTab("c2_jung");
                        markAsRead("c2_jung");
                      }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("c2_juegos");
                        markAsRead("c2_juegos");
                      }}
                      className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                    >
                      <span>Juegos Evaluativos</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* === TABS CLASE II: JUEGOS Y TRIVIA === */}
              {activeTab === "c2_juegos" && (
                <div className="space-y-6 animate-fade-in print:p-0">
                  {c2ViewingDiploma ? (
                    /* DIPLOMA ZONE */
                    <div className="bg-[#FAF8F5] border-8 border-double border-[#C29B38] p-8 md:p-16 rounded-3xl text-center shadow-lg relative max-w-2xl mx-auto my-4 animate-fade-in print:border-8 print:shadow-none print:my-0">
                      <div className="absolute inset-4 border border-[#C29B38]/30 pointer-events-none" />
                      
                      <div className="absolute top-6 left-6 right-6 flex justify-between text-xs font-mono text-[#C29B38]/70 print:hidden">
                        <span>MAESTRÍA REIKI TRADICIONAL JAPONÉS</span>
                        <span>CLASE II</span>
                      </div>

                      <div className="space-y-6 relative z-10">
                        <Flower2 className="w-14 h-14 text-[#C29B38] mx-auto opacity-80" />
                        
                        <div className="space-y-2">
                          <span className="font-serif text-[11px] tracking-widest text-[#C29B38] font-bold block uppercase">Diploma de Honor</span>
                          <h2 className="text-3xl md:text-4xl font-serif text-natural-dark font-bold italic tracking-tight">
                            Camino del Satori
                          </h2>
                        </div>

                        <p className="font-serif text-xs italic text-natural-text-muted leading-relaxed max-w-md mx-auto">
                          Se certifica con profundo honor, alegría y gratitud sintonizada que:
                        </p>

                        <p className="text-2xl sm:text-3xl font-serif text-natural-dark font-extrabold border-b border-[#C29B38]/30 pb-2 inline-block px-8">
                          {c2DiplomaName || "Estudiante de Rincón Zen"}
                        </p>

                        <p className="text-xs text-natural-text-muted leading-relaxed max-w-md mx-auto">
                          Ha completado exitosamente y con distinción las dinámicas de aprendizaje e integración de la <strong className="text-natural-dark">Clase II: El Mapa del Camino Interior</strong>. Demostrando pleno entendimiento de la circulación de los Tres Tesoros, los Tres Dantians, y la relación arquetípica de los Símbolos sagrados de Reiki con el Sonten y la psicología arquetípica.
                        </p>

                        <div className="pt-8 grid grid-cols-2 gap-8 border-t border-[#C29B38]/20 max-w-sm mx-auto">
                          <div className="text-center space-y-1">
                            <span className="text-[10px] font-mono text-natural-text-muted/65 uppercase tracking-wider block">Maestra Transmisora</span>
                            <span className="text-xs font-serif font-bold text-natural-dark block">Marina</span>
                            <span className="text-[9px] text-[#5ba27f] font-bold block">Rincón Zen</span>
                          </div>
                          <div className="text-center space-y-1">
                            <span className="text-[10px] font-mono text-natural-text-muted/65 uppercase tracking-wider block">Fecha de Sintonía</span>
                            <span className="text-xs font-serif font-bold text-natural-dark block">Julio, 2026</span>
                            <span className="text-[9px] text-[#5ba27f] font-bold block">Conexión Universal</span>
                          </div>
                        </div>

                        {/* Print/Back Buttons */}
                        <div className="pt-6 flex flex-col sm:flex-row justify-center gap-3 print:hidden">
                          <button
                            onClick={() => window.print()}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-natural-primary text-white hover:bg-natural-primary/95 font-semibold text-xs rounded-xl shadow transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Imprimir Diploma</span>
                          </button>
                          <button
                            onClick={() => {
                              setC2ViewingDiploma(false);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-natural-cream text-natural-dark hover:bg-natural-sand font-semibold text-xs rounded-xl transition shadow-2xs"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Volver a los Juegos</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* NORMAL GAMES ZONE */
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b pb-4 border-natural-border print:hidden">
                        <div className="flex items-center gap-3">
                          <Award className="w-6 h-6 text-natural-primary" />
                          <h3 className="text-xl sm:text-2xl font-serif text-natural-dark font-bold">
                            Taller de Integración y Juegos de Clase II
                          </h3>
                        </div>
                        <span className="text-[10px] px-2.5 py-0.5 bg-[#5ba27f]/10 text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                          Validación Lúdica
                        </span>
                      </div>

                      <p className="text-xs text-natural-text-muted leading-relaxed print:hidden">
                        La mejor forma de fijar la sabiduría profunda de Oriente no es mediante la repetición rígida, sino a través del juego reflexivo. Te invitamos a jugar el <strong>Desafío de Correspondencias de Símbolos</strong> y luego el <strong>Test Evaluativo de Trivia</strong> para reclamar tu diploma de Clase II.
                      </p>

                      {/* Matching Game Card */}
                      <div className="bg-gradient-to-br from-natural-eggshell to-natural-cream/50 p-6 rounded-3xl border border-natural-border shadow-3xs space-y-6">
                        <div className="border-b pb-3 border-natural-border/70 flex justify-between items-center">
                          <h4 className="font-serif text-sm font-bold text-natural-primary flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-natural-secondary" />
                            Juego 1: Desafío de Correspondencia de Símbolos
                          </h4>
                          {matchingChecked && (
                            <span className="text-xs font-mono font-bold bg-white text-natural-primary px-3 py-1 rounded-full border border-natural-primary/30">
                              Resultado: {matchingScore} / 9 aciertos
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-natural-text-muted leading-relaxed">
                          Asocia cada símbolo de Reiki con su <strong>Deidad de Kurama</strong>, su <strong>Plano Celestial (Tierra / Luna / Sol)</strong> y su <strong>Arquetipo Universal</strong> según el texto estudiado:
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                          {[
                            { id: "cho-ku-rei", name: "Cho Ku Rei (超空靈)", correctDeity: "Goho Mao Son", correctPlane: "Tierra", correctArchetype: "El Guerrero Luminoso", color: "border-amber-300 bg-amber-50/20" },
                            { id: "sei-he-ki", name: "Sei He Ki (聖平己)", correctDeity: "Senju Kannon", correctPlane: "Luna", correctArchetype: "La Madre Universal", color: "border-teal-300 bg-teal-50/20" },
                            { id: "hon-sha-ze-sho-nen", name: "Hon Sha Ze Shō Nen (本者是正念)", correctDeity: "Bishamonten", correctPlane: "Sol", correctArchetype: "El Guardián", color: "border-red-300 bg-red-50/20" }
                          ].map((sym) => {
                            const dValue = selectedDeityGuess[sym.id] || "";
                            const pValue = selectedPlaneGuess[sym.id] || "";
                            const aValue = selectedArchetypeGuess[sym.id] || "";

                            const dCorrect = dValue === sym.correctDeity;
                            const pCorrect = pValue === sym.correctPlane;
                            const aCorrect = aValue === sym.correctArchetype;

                            return (
                              <div key={sym.id} className={`p-4 rounded-2xl border bg-white ${sym.color} space-y-4 shadow-3xs`}>
                                <h5 className="font-serif text-xs font-bold text-natural-dark border-b pb-2">{sym.name}</h5>
                                
                                {/* Deity Select */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-natural-text-muted uppercase tracking-wider block">Deidad Asociada:</label>
                                  <div className="relative">
                                    <select
                                      disabled={matchingChecked}
                                      value={dValue}
                                      onChange={(e) => setSelectedDeityGuess(prev => ({ ...prev, [sym.id]: e.target.value }))}
                                      className={`w-full text-xs p-2 rounded-xl bg-natural-bg border text-natural-dark focus:outline-none focus:border-natural-primary/50 ${
                                        matchingChecked ? (dCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50") : "border-natural-border"
                                      }`}
                                    >
                                      <option value="">-- Elegir Deidad --</option>
                                      <option value="Goho Mao Son">Goho Mao Son (Voluntad/Fuerza)</option>
                                      <option value="Senju Kannon">Senju Kannon (Compasión/Amor)</option>
                                      <option value="Bishamonten">Bishamonten (Sabiduría/Orden)</option>
                                    </select>
                                    {matchingChecked && (
                                      <span className="absolute right-2 top-2">{dCorrect ? "✅" : "❌"}</span>
                                    )}
                                  </div>
                                </div>

                                {/* Plane Select */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-natural-text-muted uppercase tracking-wider block">Plano Celeste:</label>
                                  <div className="relative">
                                    <select
                                      disabled={matchingChecked}
                                      value={pValue}
                                      onChange={(e) => setSelectedPlaneGuess(prev => ({ ...prev, [sym.id]: e.target.value }))}
                                      className={`w-full text-xs p-2 rounded-xl bg-natural-bg border text-natural-dark focus:outline-none focus:border-natural-primary/50 ${
                                        matchingChecked ? (pCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50") : "border-natural-border"
                                      }`}
                                    >
                                      <option value="">-- Elegir Plano --</option>
                                      <option value="Tierra">Tierra / Acción (Jing)</option>
                                      <option value="Luna">Luna / Emoción (Qi)</option>
                                      <option value="Sol">Sol / Conciencia (Shen)</option>
                                    </select>
                                    {matchingChecked && (
                                      <span className="absolute right-2 top-2">{pCorrect ? "✅" : "❌"}</span>
                                    )}
                                  </div>
                                </div>

                                {/* Archetype Select */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-natural-text-muted uppercase tracking-wider block">Arquetipo Universal:</label>
                                  <div className="relative">
                                    <select
                                      disabled={matchingChecked}
                                      value={aValue}
                                      onChange={(e) => setSelectedArchetypeGuess(prev => ({ ...prev, [sym.id]: e.target.value }))}
                                      className={`w-full text-xs p-2 rounded-xl bg-natural-bg border text-natural-dark focus:outline-none focus:border-natural-primary/50 ${
                                        matchingChecked ? (aCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50") : "border-natural-border"
                                      }`}
                                    >
                                      <option value="">-- Elegir Arquetipo --</option>
                                      <option value="El Guerrero Luminoso">El Guerrero Luminoso</option>
                                      <option value="La Madre Universal">La Madre Universal</option>
                                      <option value="El Guardián">El Guardián / Rey Justo</option>
                                    </select>
                                    {matchingChecked && (
                                      <span className="absolute right-2 top-2">{aCorrect ? "✅" : "❌"}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Matching Controls */}
                        <div className="flex justify-end gap-3 border-t border-natural-border/60 pt-4">
                          {matchingChecked ? (
                            <button
                              onClick={() => {
                                setSelectedDeityGuess({ "cho-ku-rei": "", "sei-he-ki": "", "hon-sha-ze-sho-nen": "" });
                                setSelectedPlaneGuess({ "cho-ku-rei": "", "sei-he-ki": "", "hon-sha-ze-sho-nen": "" });
                                setSelectedArchetypeGuess({ "cho-ku-rei": "", "sei-he-ki": "", "hon-sha-ze-sho-nen": "" });
                                setMatchingChecked(false);
                                setMatchingScore(0);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                              <span>Reintentar Desafío</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                let score = 0;
                                if (selectedDeityGuess["cho-ku-rei"] === "Goho Mao Son") score++;
                                if (selectedPlaneGuess["cho-ku-rei"] === "Tierra") score++;
                                if (selectedArchetypeGuess["cho-ku-rei"] === "El Guerrero Luminoso") score++;
                                
                                if (selectedDeityGuess["sei-he-ki"] === "Senju Kannon") score++;
                                if (selectedPlaneGuess["sei-he-ki"] === "Luna") score++;
                                if (selectedArchetypeGuess["sei-he-ki"] === "La Madre Universal") score++;
                                
                                if (selectedDeityGuess["hon-sha-ze-sho-nen"] === "Bishamonten") score++;
                                if (selectedPlaneGuess["hon-sha-ze-sho-nen"] === "Sol") score++;
                                if (selectedArchetypeGuess["hon-sha-ze-sho-nen"] === "El Guardián") score++;
                                
                                setMatchingScore(score);
                                setMatchingChecked(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm"
                            >
                              <span>Validar Emparejamientos</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Trivia Game Card */}
                      <div className="bg-white p-6 rounded-3xl border border-natural-border shadow-3xs space-y-6">
                        <div className="border-b pb-3 border-natural-border/70">
                          <h4 className="font-serif text-sm font-bold text-natural-dark flex items-center gap-2">
                            <Award className="w-4 h-4 text-natural-primary" />
                            Juego 2: Test Evaluativo del Camino Interior (Clase II)
                          </h4>
                        </div>

                        {c2ShowResults ? (
                          /* TRIVIA RESULTS */
                          <div className="space-y-6 animate-fade-in">
                            {(() => {
                              let score = 0;
                              CLASS2_TRIVIA_QUESTIONS.forEach((q) => {
                                if (c2QuizAnswers[q.id] === q.correctIndex) score++;
                              });
                              const passed = score >= 4;

                              return (
                                <div className="space-y-6">
                                  <div className="p-6 rounded-3xl border text-center space-y-3 bg-natural-eggshell/60 border-natural-border">
                                    <p className="text-xs uppercase tracking-widest font-mono font-bold text-natural-primary">TU RESULTADO DE TRIVIA</p>
                                    <div className="text-4xl font-serif font-extrabold text-natural-dark">
                                      {score} de 5 correctas
                                    </div>
                                    <p className="text-xs text-natural-text-muted leading-relaxed max-w-md mx-auto">
                                      {passed 
                                        ? "¡Excelente nivel de maestría e integración del Camino Interior! Has asimilado las uniones de las tradiciones de Oriente."
                                        : "Has respondido bien algunas preguntas, pero para sintonizar el diploma necesitas al menos 4 respuestas correctas (80%). Relee el material y vuelve a intentar."}
                                    </p>
                                  </div>

                                  {/* Questions details */}
                                  <div className="space-y-4">
                                    {CLASS2_TRIVIA_QUESTIONS.map((q) => {
                                      const ansIdx = c2QuizAnswers[q.id];
                                      const isCorrect = ansIdx === q.correctIndex;
                                      return (
                                        <div key={q.id} className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${isCorrect ? "bg-green-50/40 border-green-200" : "bg-red-50/40 border-red-200"}`}>
                                          <div className="flex items-start gap-2">
                                            <span className="text-base">{isCorrect ? "✅" : "❌"}</span>
                                            <div>
                                              <p className="font-bold text-natural-dark">{q.question}</p>
                                              <p className="text-natural-text-muted mt-1">Tu respuesta: <strong className="text-natural-dark">{q.options[ansIdx] || "Ninguna"}</strong></p>
                                              {!isCorrect && (
                                                <p className="text-natural-text-muted">Respuesta correcta: <strong className="text-green-700">{q.options[q.correctIndex]}</strong></p>
                                              )}
                                              <p className="text-[11px] text-natural-primary italic mt-2">💡 Explicación: {q.explanation}</p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Diploma input if passed */}
                                  {passed && (
                                    <div className="bg-gradient-to-br from-natural-cream/70 to-natural-sand/50 p-6 rounded-3xl border border-natural-border text-center space-y-4">
                                      <DiplomaIcon className="w-10 h-10 text-natural-primary mx-auto animate-bounce" />
                                      <h5 className="font-serif text-sm font-bold text-natural-dark">¡Felicidades! Habilitaste tu Diploma de Clase II</h5>
                                      <p className="text-xs text-natural-text-muted max-w-md mx-auto">
                                        Escribe tu nombre completo para emitir e imprimir tu Diploma Honorífico de sintonía en el Camino Interior de Reiki:
                                      </p>
                                      
                                      <div className="max-w-xs mx-auto flex gap-2">
                                        <input
                                          type="text"
                                          placeholder="Tu Nombre Completo"
                                          value={c2DiplomaName}
                                          onChange={(e) => setC2DiplomaName(e.target.value)}
                                          className="flex-1 p-2.5 rounded-xl border border-natural-border text-xs bg-white text-natural-dark focus:outline-none focus:border-natural-primary"
                                        />
                                        <button
                                          onClick={() => {
                                            setC2ViewingDiploma(true);
                                          }}
                                          className="px-4 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-bold hover:bg-natural-primary/95 transition-colors"
                                        >
                                          Ver Diploma
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Trivia Controls */}
                                  <div className="flex justify-start border-t border-natural-border/60 pt-4">
                                    <button
                                      onClick={() => {
                                        setC2QuizAnswers({});
                                        setC2AnswersSubmitted(false);
                                        setC2ShowResults(false);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                                    >
                                      <RotateCw className="w-3.5 h-3.5" />
                                      <span>Volver a Intentar Trivia</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          /* TRIVIA QUESTIONS IN PROGRESS */
                          <div className="space-y-6">
                            <p className="text-xs text-natural-text-muted leading-relaxed">
                              Responde las siguientes 5 preguntas de selección múltiple sobre la alquimia interna y simbología de Clase II:
                            </p>

                            <div className="space-y-6">
                              {CLASS2_TRIVIA_QUESTIONS.map((q, qIdx) => (
                                <div key={q.id} className="space-y-2.5">
                                  <div className="flex items-start gap-2">
                                    <span className="w-5 h-5 rounded-full bg-natural-cream text-natural-primary text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                                      {qIdx + 1}
                                    </span>
                                    <h5 className="text-xs font-bold text-natural-dark leading-snug">{q.question}</h5>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                                    {q.options.map((option, oIdx) => {
                                      const isSelected = c2QuizAnswers[q.id] === oIdx;
                                      return (
                                        <button
                                          key={oIdx}
                                          onClick={() => {
                                            setC2QuizAnswers(prev => ({ ...prev, [q.id]: oIdx }));
                                          }}
                                          className={`w-full text-left p-3 rounded-xl border text-xs leading-normal transition-all ${
                                            isSelected
                                              ? "bg-natural-secondary/15 text-natural-primary border-natural-primary font-medium"
                                              : "bg-natural-bg/50 border-natural-border hover:bg-natural-cream hover:border-natural-primary/30 text-natural-dark/90"
                                          }`}
                                        >
                                          {option}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Submit Trivia Container */}
                            <div className="flex justify-end border-t border-natural-border/60 pt-4">
                              <button
                                disabled={CLASS2_TRIVIA_QUESTIONS.some((q) => c2QuizAnswers[q.id] === undefined)}
                                onClick={() => {
                                  setC2AnswersSubmitted(true);
                                  setC2ShowResults(true);
                                }}
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-natural-primary text-white rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <span>Enviar Respuestas de Trivia</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-start items-center pt-4 border-t border-natural-border">
                        <button
                          onClick={() => {
                            setActiveTab("c2_videos");
                            markAsRead("c2_videos");
                          }}
                          className="inline-flex items-center space-x-1 px-4 py-2 bg-natural-cream hover:bg-natural-sand rounded-xl text-xs font-semibold text-natural-dark transition shadow-2xs"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Volver</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </section>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-natural-dark text-natural-sand/70 py-12 px-4 sm:px-6 lg:px-8 border-t border-natural-primary/30 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1">
            <h4 className="font-serif text-sm bold tracking-widest text-natural-cream font-bold">
              RINCÓN ZEN: GOKUIKAIDEN
            </h4>
            <p className="text-xs text-natural-sand/60">
              Formación Maestría en Reiki Tradicional Japonés
            </p>
          </div>

          <div className="text-center md:text-right text-xs text-natural-sand/40">
            <p className="font-mono">Derechos Reservados © Rincón Zen - Marina, año 2026</p>
            <p className="mt-1">Sitio Web Oficial: <a href="https://www.rinconzen.com.ar" target="_blank" rel="noreferrer" className="text-natural-secondary hover:underline font-semibold">www.rinconzen.com.ar</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

