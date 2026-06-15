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
  Trash2
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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("bienvenida");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [kanjiSubTab, setKanjiSubTab] = useState<string>("origen");

  // Custom persistent videos state
  const [customVideos, setCustomVideos] = useState<{ id: string; title: string; description: string; url: string; type?: "youtube" | "vimeo" | "youtube_playlist" }[]>(() => {
    try {
      const saved = localStorage.getItem("rincon_zen_videos");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "7aOHe0qVIsM",
        type: "youtube",
        title: "Meditación Gassho y Sanación Consciente",
        description: "Alineación y sintonización de tus canales mediante los Gokai en posición contemplativa.",
        url: "https://www.youtube.com/watch?v=7aOHe0qVIsM"
      },
      {
        id: "qGv_7oM_4Z4",
        type: "youtube",
        title: "Recitación Diaria de los 5 Preceptos (Gokai)",
        description: "Acompaña a Marina en la entonación sagrada del Kotodama para armonizar tu día.",
        url: "https://www.youtube.com/watch?v=qGv_7oM_4Z4"
      },
      {
        id: "uKAtVbF7oM4",
        type: "youtube",
        title: "Práctica Byosen Reikan Ho para Sanación",
        description: "Demostración de sintonía e identificación de campos magnéticos y disturbios físicos.",
        url: "https://www.youtube.com/watch?v=uKAtVbF7oM4"
      },
      {
        id: "172033285",
        type: "vimeo",
        title: "Ambiente Natural y Conexión Reiki",
        description: "Música y video de relajación de la naturaleza para sintonizar en tus meditaciones diarias.",
        url: "https://vimeo.com/172033285"
      },
      {
        id: "PL3AFFF59EFFE30238",
        type: "youtube_playlist",
        title: "Música Tradicional Japonesa y Shakuhachi (Playlist)",
        description: "Colección curada de melodías tradicionales de flauta Shakuhachi japonesa para ambientar las sesiones de Reiki.",
        url: "https://www.youtube.com/playlist?list=PL3AFFF59EFFE30238"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("rincon_zen_videos", JSON.stringify(customVideos));
  }, [customVideos]);

  const [selectedVideoId, setSelectedVideoId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("rincon_zen_videos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          return parsed[0].id;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return "7aOHe0qVIsM";
  });

  // Video Form state
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoDesc, setNewVideoDesc] = useState("");
  const [videoError, setVideoError] = useState("");

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setVideoError("");

    if (!newVideoTitle.trim()) {
      setVideoError("Por favor ingresa un título.");
      return;
    }
    if (!newVideoUrl.trim()) {
      setVideoError("Por favor ingresa la URL de YouTube o Vimeo.");
      return;
    }

    // Check if YouTube Playlist URL parameter 'list' exists
    const listRegex = /[?&]list=([^#\&\?]+)/;
    const listMatch = newVideoUrl.match(listRegex);
    const playlistId = listMatch ? listMatch[1] : null;

    if (playlistId) {
      setCustomVideos(prev => [
        ...prev,
        {
          id: playlistId,
          type: "youtube_playlist",
          title: newVideoTitle,
          description: newVideoDesc || "Lista de reproducción de YouTube para sintonizar en tus meditaciones.",
          url: newVideoUrl
        }
      ]);

      setNewVideoTitle("");
      setNewVideoUrl("");
      setNewVideoDesc("");
      return;
    }

    // Check if Vimeo URL
    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/;
    const vimeoMatch = newVideoUrl.match(vimeoRegex);
    const vimeoId = vimeoMatch ? vimeoMatch[1] : null;

    if (vimeoId) {
      setCustomVideos(prev => [
        ...prev,
        {
          id: vimeoId,
          type: "vimeo",
          title: newVideoTitle,
          description: newVideoDesc || "Video de Vimeo subido para la maestría de Rincón Zen.",
          url: newVideoUrl
        }
      ]);

      setNewVideoTitle("");
      setNewVideoUrl("");
      setNewVideoDesc("");
      return;
    }

    // Check if YouTube URL
    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const ytMatch = newVideoUrl.match(ytRegExp);
    const ytId = (ytMatch && ytMatch[2].length === 11) ? ytMatch[2] : null;

    if (!ytId) {
      setVideoError("URL inválida. Copia un enlace de YouTube válido (video o playlist) o Vimeo (ej: vimeo.com/172033285).");
      return;
    }

    setCustomVideos(prev => [
      ...prev,
      {
        id: ytId,
        type: "youtube",
        title: newVideoTitle,
        description: newVideoDesc || "Video de YouTube subido para la maestría de Rincón Zen.",
        url: newVideoUrl
      }
    ]);

    setNewVideoTitle("");
    setNewVideoUrl("");
    setNewVideoDesc("");
  };

  const handleDeleteVideo = (idToDelete: string) => {
    setCustomVideos(prev => {
      const filtered = prev.filter(v => v.id !== idToDelete);
      if (selectedVideoId === idToDelete) {
        if (filtered.length > 0) {
          setSelectedVideoId(filtered[0].id);
        } else {
          setSelectedVideoId("");
        }
      }
      return filtered;
    });
  };

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

  const menuItems = [
    { id: "bienvenida", label: "Inicio", icon: Flower2 },
    { id: "kanji", label: "El Kanji Reiki", icon: Sparkles },
    { id: "principios", label: "El Gokai (Principios)", icon: Sun },
    { id: "aspectos", label: "La Maestría Interna", icon: Compass },
    { id: "sensibilidad", label: "Byosen y Hibiki", icon: Activity },
    { id: "videos", label: "Videos de Práctica", icon: Video },
    { id: "test", label: "Test Evaluativo", icon: Award },
    { id: "roadmap", label: "Progreso y Futuro", icon: BookOpen }
  ];

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

          {/* DESKTOP TABS BAR */}
          <nav className="hidden xl:flex space-x-1 bg-natural-dark/20 p-1 rounded-full border border-natural-bg/15">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isRead = readSections[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    markAsRead(item.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-all ${
                    activeTab === item.id
                      ? "bg-natural-secondary text-natural-bg shadow-md font-semibold"
                      : "text-natural-bg/80 hover:text-natural-bg hover:bg-natural-secondary/20"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-natural-bg" />
                  <span>{item.label}</span>
                  {isRead && item.id !== activeTab && (
                    <span className="w-1.5 h-1.5 rounded-full bg-natural-bg inline-block animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT UTILITY INFOBANNER */}
          <div className="hidden lg:flex items-center space-x-2 text-natural-bg text-xs">
            <span className="bg-natural-secondary px-4 py-2 rounded-full text-xs font-bold text-natural-bg flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Perfil del Maestro
            </span>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-natural-bg/10 hover:bg-natural-bg/25 text-natural-bg transition-colors"
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
            className="xl:hidden bg-natural-bg border-b border-natural-border z-20 absolute w-full left-0 shadow-lg px-4 py-4 print:hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isRead = readSections[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      markAsRead(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-lg text-left text-xs font-medium flex items-center space-x-2.5 transition-all ${
                      activeTab === item.id
                        ? "bg-natural-secondary text-natural-bg font-bold"
                        : "bg-white text-natural-dark hover:bg-natural-sand border border-natural-border"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-natural-primary shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {isRead && <span className="w-1.5 h-1.5 rounded-full bg-natural-primary block" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* CORE BRANDING HERO BANNER AT TOP OF ALL TABS */}
      <section className="bg-gradient-to-r from-natural-cream to-natural-sand py-8 px-4 sm:px-6 lg:px-8 border-b border-natural-border print:hidden animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs tracking-widest text-[#5ba27f] uppercase font-bold border border-natural-border shadow-xs mb-3">
            <span className="text-natural-primary">Nivel de Maestría ● Reiki Tradicional Japonés</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-natural-dark font-semibold">
            Gokuikaiden
          </h2>
          <p className="mt-2 text-natural-text-muted text-sm sm:text-base italic max-w-xl mx-auto leading-relaxed">
            &ldquo;La transmisión completa de los secretos esenciales. El camino para aprender, sanar y encender la chispa del Satori.&rdquo;
          </p>
 

        </div>
      </section>
 
      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8">
        
        {/* SIDE BAR NAVIGATION (only visible on large screens) */}
        <aside className="hidden lg:block w-64 shrink-0 print:hidden">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-natural-border shadow-xs">
              <h3 className="text-xs font-bold font-serif text-natural-primary tracking-wider mb-4 uppercase">
                Temas de Clase 1
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
                Lee detenidamente cada sección de las enseñanzas para habilitar la evaluación de Maestría final.
              </p>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-natural-text-muted/80 font-mono">
                  <span>Módulos vistos:</span>
                  <span>{Object.keys(readSections).length} de {menuItems.length}</span>
                </div>
                <div className="w-full bg-natural-border/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-natural-secondary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(Object.keys(readSections).length / menuItems.length) * 100}%` }}
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
                        Videos de Práctica - Rincón Zen
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 bg-natural-cream text-natural-primary rounded-md uppercase tracking-wider font-mono font-semibold">
                      Sintonía Audiovisual
                    </span>
                  </div>

                  <p className="text-natural-text-muted text-sm leading-relaxed">
                    Acompaña tu instrucción teórica con recursos audiovisuales. Visualiza meditaciones guiadas, demostraciones de posiciones o recitaciones de los Gokai. Puedes reproducir los videos integrados o agregar tus propios enlaces de <strong>YouTube (Videos o Listas/Playlists) y Vimeo</strong>.
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
                              <p className="text-xs text-natural-text-muted leading-relaxed">
                                {customVideos.find(v => v.id === selectedVideoId)?.description}
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

                    {/* Right Column: Video list & Add Video Form */}
                    <div className="space-y-6">
                      {/* Video List */}
                      <div className="bg-white p-5 rounded-3xl border border-natural-border shadow-3xs space-y-3">
                        <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-widest border-b pb-2 border-natural-border/60">
                          Lista de Reproducción ({customVideos.length})
                        </h4>
                        
                        <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
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
                                  className="flex items-center gap-2.5 text-xs text-left flex-1 min-w-0"
                                >
                                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-natural-primary text-white" : "bg-natural-sand text-natural-primary"}`}>
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="truncate pr-1 block font-medium">{video.title}</span>
                                    <span className="text-[9px] text-natural-text-muted/80 uppercase font-mono tracking-widest">
                                      {isVimeo ? "Vimeo" : isPlaylist ? "Playlist de YT" : "YouTube Video"}
                                    </span>
                                  </div>
                                </button>

                                {/* Delete Custom Video */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleDeleteVideo(video.id);
                                    if (selectedVideoId === video.id) {
                                      const remaining = customVideos.filter(v => v.id !== video.id);
                                      setSelectedVideoId(remaining[0]?.id || "");
                                    }
                                  }}
                                  className="text-natural-primary/60 hover:text-red-500 p-1 rounded-md transition-colors"
                                  title="Quitar video"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                          
                          {customVideos.length === 0 && (
                            <p className="text-center text-xs text-natural-text-muted py-8">No hay videos en la lista.</p>
                          )}
                        </div>
                      </div>

                      {/* Add Video Form */}
                      <div className="bg-gradient-to-b from-natural-cream to-natural-sand p-5 rounded-3xl border border-natural-border shadow-3xs">
                        <h4 className="font-serif text-xs font-bold text-natural-dark uppercase tracking-widest border-b pb-2 border-natural-border/60 mb-3">
                          Sube un nuevo Enlace
                        </h4>
                        
                        <form onSubmit={handleAddVideo} className="space-y-3">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-bold text-natural-primary mb-1">Título del Video o Playlist</label>
                            <input
                              type="text"
                              value={newVideoTitle}
                              onChange={(e) => setNewVideoTitle(e.target.value)}
                              placeholder="Ej: Playlist de Música Reiki o Meditación"
                              className="w-full text-xs p-2.5 rounded-xl border border-natural-border bg-white text-natural-dark font-sans placeholder-natural-text-muted bg-white focus:outline-none focus:ring-1 focus:ring-natural-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-bold text-natural-primary mb-1">Enlace de YouTube (Video o Playlist) o Vimeo</label>
                            <input
                              type="text"
                              value={newVideoUrl}
                              onChange={(e) => setNewVideoUrl(e.target.value)}
                              placeholder="https://youtube.com/playlist?list=... o vimeo.com/..."
                              className="w-full text-xs p-2.5 rounded-xl border border-natural-border bg-white text-natural-dark font-sans placeholder-natural-text-muted bg-white focus:outline-none focus:ring-1 focus:ring-natural-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-bold text-natural-primary mb-1">Breve Descripción (Opcional)</label>
                            <textarea
                              value={newVideoDesc}
                              onChange={(e) => setNewVideoDesc(e.target.value)}
                              placeholder="Instrucciones sobre cómo acompañar el video..."
                              rows={2}
                              className="w-full text-xs p-2.5 rounded-xl border border-natural-border bg-white text-natural-dark font-sans placeholder-natural-text-muted bg-white focus:outline-none focus:ring-1 focus:ring-natural-primary resize-none"
                            ></textarea>
                          </div>

                          {videoError && (
                            <p className="text-[11px] text-red-500 font-medium leading-normal bg-red-50 border border-red-100 p-2 rounded-xl">{videoError}</p>
                          )}

                          <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-natural-primary text-natural-bg rounded-xl text-xs font-semibold hover:bg-natural-primary/95 transition-all shadow-sm cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Agregar Video</span>
                          </button>
                        </form>
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
                      La Maestría en Reiki no es una meta que se obtiene de la noche a la mañana, sino un sendero sin fin. Esta aplicación interactiva cubre con devoción la <strong className="text-natural-dark">Clase I de Gokuikaiden</strong>, ofreciendo las bases tradicionales sólidas.
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

            </motion.div>
          </AnimatePresence>
        </section>

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

