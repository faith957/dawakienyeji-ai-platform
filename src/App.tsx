import React, { useState, useEffect } from "react";
import { 
  Leaf, Bot, BookOpen, MapPin, Phone, Mail, ArrowRight, ShieldCheck, 
  Sparkles, Menu, X, Landmark, Compass, BrainCircuit, Users, Database, Globe, TreePine,
  ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Youtube, History
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { INITIAL_HERBS, INITIAL_BLOGS } from "./data/herbalDatabase";
import { useLanguage } from "./utils/LanguageContext";
import { getPlantImage } from "./utils/herbImages";
import LanguageSelector from "./components/LanguageSelector";
import PlantsCatalog from "./components/PlantsCatalog";
import TraditionalRemedies from "./components/TraditionalRemedies";
import BlogFeed from "./components/BlogFeed";

import heroSlide1 from "./assets/images/hero_slide_1_1780659974970.png";
import heroSlide2 from "./assets/images/hero_slide_2_1780659992793.png";
import heroSlide3 from "./assets/images/african_scientist_1781630372002.jpg";
import heroSlide4 from "./assets/images/hero_slide_4_1780660023541.png";
import ContactPage from "./components/ContactPage";
import ChatbotPage from "./components/ChatbotPage";
import AdminDashboard from "./components/AdminDashboard";

type PageRoute = 'home' | 'about' | 'plants' | 'remedies' | 'knowledge' | 'blog' | 'contact' | 'admin' | 'chatbot';

export default function App() {
  const { t, translateHerb, language } = useLanguage();
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlantForModal, setSelectedPlantForModal] = useState<any | null>(null);

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 7000); // Auto slide every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      id: 1,
      titleKey: "slides.1.title",
      subtitleKey: "slides.1.subtitle",
      bgImage: heroSlide1,
      fallbackImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80",
      btn1Key: "slides.1.btn1",
      btn1Route: "plants" as PageRoute,
      btn2Key: "slides.1.btn2",
      btn2Route: "chatbot" as PageRoute,
    },
    {
      id: 2,
      titleKey: "slides.2.title",
      subtitleKey: "slides.2.subtitle",
      bgImage: heroSlide2,
      fallbackImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80",
      btn1Key: "slides.2.btn1",
      btn1Route: "remedies" as PageRoute,
      btn2Key: "slides.2.btn2",
      btn2Route: "about" as PageRoute,
    },
    {
      id: 3,
      titleKey: "slides.3.title",
      subtitleKey: "slides.3.subtitle",
      bgImage: heroSlide3,
      fallbackImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2000&q=80",
      btn1Key: "slides.3.btn1",
      btn1Route: "chatbot" as PageRoute,
      btn2Key: "slides.3.btn2",
      btn2Route: "remedies" as PageRoute,
    },
    {
      id: 4,
      titleKey: "slides.4.title",
      subtitleKey: "slides.4.subtitle",
      bgImage: heroSlide4,
      fallbackImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=2000&q=80",
      btn1Key: "slides.4.btn1",
      btn1Route: "remedies" as PageRoute,
      btn2Key: "slides.4.btn2",
      btn2Route: "about" as PageRoute,
    }
  ];

  // Newsletter Email capture configurations
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus('error');
      setNewsletterMessage(t("newsletter.invalidEmail") || "Please provide a valid email address.");
      return;
    }
    setNewsletterStatus('loading');
    setNewsletterMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNewsletterStatus('success');
        setNewsletterEmail("");
        setNewsletterMessage(t("newsletter.success") || "Thank you! You have successfully subscribed to traditional herbal updates.");
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setNewsletterStatus('error');
      setNewsletterMessage("An error occurred. Please check your connection and try again.");
    }
  };

  // Auto scroll to top on nav changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [currentRoute]);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
  };

  // Render an immersive chatbot view with zero frame clutter
  if (currentRoute === 'chatbot') {
    return <ChatbotPage onBackToHome={() => navigateTo('home')} />;
  }

  return (
    <div className="min-h-screen bg-stone-50/45 bg-grain text-emerald-950 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-905">
      
      {/* Top Header Navigation Panel */}
      <header id="main-header" className="sticky top-0 bg-stone-50/85 backdrop-blur-md border-b border-stone-200/40 z-40 transition-all duration-300 shadow-sm shadow-stone-200/20">
        {/* Subtle decorative nature line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-800 via-[#D4A017]/80 to-emerald-900" />
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-800/15 rounded-full blur group-hover:scale-110 transition duration-300" />
              <div className="relative w-11 h-11 overflow-hidden rounded-full shadow-md bg-emerald-950 flex items-center justify-center p-0.5 border-2 border-amber-500/20 transform group-hover:rotate-[15deg] transition duration-500">
                <img 
                  src="https://i.postimg.cc/VkwT0rck/Chat-GPT-Image-Jun-7-2026-09-17-26-PM.png" 
                  alt="DawaKienyeji Logo" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight font-sans text-emerald-950 block transition group-hover:text-emerald-800">
                Dawa<span className="text-[#D4A017] font-semibold">Kienyeji</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-400 block -mt-1 font-mono font-bold">Heritage Preservation</span>
            </div>
          </div>

          {/* Desktop Nav menu */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-extrabold text-stone-600/85 tracking-widest uppercase">
            <button 
              id="nav-home" 
              onClick={() => navigateTo('home')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1.5 relative flex items-center gap-1.5 ${currentRoute === 'home' ? 'text-emerald-950 font-black' : 'text-stone-550'}`}
            >
              <span>{t("nav.home")}</span>
              {currentRoute === 'home' && (
                <motion.span layoutId="navDot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-800" />
              )}
            </button>
            <button 
              id="nav-about" 
              onClick={() => navigateTo('about')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1.5 relative flex items-center gap-1.5 ${currentRoute === 'about' ? 'text-emerald-950 font-black' : 'text-stone-550'}`}
            >
              <span>{t("nav.about") || "About"}</span>
              {currentRoute === 'about' && (
                <motion.span layoutId="navDot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-800" />
              )}
            </button>
            <button 
              id="nav-plants" 
              onClick={() => navigateTo('plants')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1.5 relative flex items-center gap-1.5 ${currentRoute === 'plants' ? 'text-emerald-950 font-black' : 'text-stone-550'}`}
            >
              <span>{t("nav.plants")}</span>
              {currentRoute === 'plants' && (
                <motion.span layoutId="navDot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-800" />
              )}
            </button>
            <button 
              id="nav-remedies" 
              onClick={() => navigateTo('remedies')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1.5 relative flex items-center gap-1.5 ${currentRoute === 'remedies' ? 'text-emerald-950 font-black' : 'text-stone-500'}`}
            >
              <span>{t("nav.remedies")}</span>
              {currentRoute === 'remedies' && (
                <motion.span layoutId="navDot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-800" />
              )}
            </button>

            <button 
              id="nav-blog" 
              onClick={() => navigateTo('blog')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1.5 relative flex items-center gap-1.5 ${currentRoute === 'blog' ? 'text-emerald-950 font-black' : 'text-stone-550'}`}
            >
              <span>{t("nav.blog")}</span>
              {currentRoute === 'blog' && (
                <motion.span layoutId="navDot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-800" />
              )}
            </button>
            <button 
              id="nav-contact" 
              onClick={() => navigateTo('contact')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1.5 relative flex items-center gap-1.5 ${currentRoute === 'contact' ? 'text-emerald-950 font-black' : 'text-stone-550'}`}
            >
              <span>{t("nav.contact")}</span>
              {currentRoute === 'contact' && (
                <motion.span layoutId="navDot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-800" />
              )}
            </button>
          </nav>

          {/* Top-right CTAs: LanguageSelector, Ask DawaBot & Sign Up */}
          <div className="flex items-center gap-2.5">
            {/* Elegant Global Multilingual Language Selector dropdown */}
            <LanguageSelector />

            <button
              id="ask-dawabot-btn-header"
              onClick={() => navigateTo('chatbot')}
              className="py-2 px-4 bg-emerald-950 hover:bg-emerald-900 active:bg-emerald-950 border border-emerald-900/50 text-emerald-100 rounded-full text-[11px] font-bold tracking-wider uppercase transition shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute animate-ping inline-flex h-1.5 w-1.5 rounded-full bg-amber-400 opacity-75" />
                <History className="w-4 h-4 text-emerald-300 relative" />
              </div>
              <span>{t("nav.askBot")}</span>
            </button>

            <button
              id="signup-btn-header"
              onClick={() => navigateTo('admin')}
              className={`py-2 px-4 transition border text-[11px] font-bold tracking-wider uppercase rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer ${
                currentRoute === 'admin' 
                  ? 'bg-[#D4A017] border-[#D4A017] text-emerald-950 font-black shadow-inner' 
                  : 'bg-white border-stone-250/90 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {t("nav.signUp")}
            </button>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-emerald-950 bg-stone-100/50 hover:bg-stone-100 border border-stone-200/40 rounded-full lg:hidden transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-100 border-b border-stone-200 text-emerald-950 flex flex-col p-4 space-y-3 font-semibold text-xs tracking-wider uppercase"
          >
            <button onClick={() => navigateTo('home')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.home")}</button>
            <button onClick={() => navigateTo('about')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.about") || "About"}</button>
            <button onClick={() => navigateTo('plants')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.plants")}</button>
            <button onClick={() => navigateTo('remedies')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.remedies")}</button>
            <button onClick={() => navigateTo('blog')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.blog")}</button>
            <button onClick={() => navigateTo('contact')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.contact")}</button>
            <button onClick={() => navigateTo('admin')} className="py-2 text-left hover:text-emerald-700">{t("nav.admin")}</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Routing Arena */}
      <main className="flex-grow w-full">
        
        {currentRoute === 'home' && (
          <div className="space-y-16 pb-16 md:pb-24">
            
            {/* HERO SLIDER SECTION */}
            <section id="hero-carousel" className="relative overflow-hidden h-[540px] md:h-[620px] lg:h-[680px] bg-stone-950 flex items-center group w-full">
              
              {/* Background Images with Zoom Parallax Effect and Dark Greens Overlays */}
              <div className="absolute inset-0 w-full h-full z-0 select-none">
                <AnimatePresence mode="wait">
                  {heroSlides.map((slide, idx) => idx === currentSlide && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Dual-layered professional ambient masks for perfect readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/75 to-transparent z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent z-10" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,47,26,0.15),transparent)] z-10" />
                      
                      <motion.img
                        src={slide.bgImage}
                        alt="African traditional herbs"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover origin-center filter brightness-[0.85] contrast-[1.05]"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== slide.fallbackImage) {
                            target.src = slide.fallbackImage;
                          }
                        }}
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 7, ease: "easeOut" }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Floating Leaf Ambient Deco elements in absolute coordinates */}
              <div className="absolute right-12 bottom-12 opacity-5 pointer-events-none transform translate-x-10 scale-110 select-none z-10 animate-leaf-hover">
                <Leaf className="w-72 h-72 text-emerald-100" />
              </div>

              {/* Foreground slide text copy & container */}
              <div className="max-w-7xl mx-auto w-full px-6 md:px-8 z-20 relative text-white">
                <div className="max-w-4xl">
                  <AnimatePresence mode="wait">
                  {heroSlides.map((slide, idx) => idx === currentSlide && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 md:space-y-8 text-left"
                    >


                      {/* Display Headings with deep bold typeface */}
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white drop-shadow-md">
                        {t(slide.titleKey)}
                      </h1>

                      {/* Descriptive supporting line */}
                      <p className="text-stone-300 text-xs md:text-base leading-relaxed font-medium max-w-2xl drop-shadow text-stone-200/90">
                        {t(slide.subtitleKey)}
                      </p>

                      {/* Styled Action CTA buttons */}
                      <div className="pt-4 flex flex-wrap gap-4">
                        <button
                          onClick={() => navigateTo(slide.btn1Route)}
                          className="py-3 px-7 md:py-3.5 md:px-9 bg-[#D4A017] hover:bg-[#c09115] active:bg-[#e0b020] text-emerald-950 rounded-2xl font-black text-xs md:text-sm shadow-lg hover:shadow-[#D4A017]/10 transition-all duration-200 hover:scale-[1.03] cursor-pointer"
                        >
                          {t(slide.btn1Key)}
                        </button>
                        <button
                          onClick={() => navigateTo(slide.btn2Route)}
                          className="py-3 px-7 md:py-3.5 md:px-9 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white border border-white/15 hover:border-white/30 rounded-2xl font-black text-xs md:text-sm backdrop-blur-md transition-all duration-200 hover:scale-[1.03] flex items-center justify-center gap-2.5 cursor-pointer"
                        >
                          {slide.btn2Route === "chatbot" && <Bot className="w-4 h-4 text-amber-305" />}
                          {t(slide.btn2Key)}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                </div>
              </div>

              {/* Manual Arrow Nav buttons */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1))}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/45 hover:bg-emerald-950 border border-white/10 hover:border-amber-400/30 text-white hover:text-amber-300 transition-all z-35 opacity-0 group-hover:opacity-100 hover:scale-110 duration-300 cursor-pointer shadow"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1))}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/45 hover:bg-emerald-950 border border-white/10 hover:border-amber-400/30 text-white hover:text-amber-300 transition-all z-35 opacity-0 group-hover:opacity-100 hover:scale-110 duration-300 cursor-pointer shadow"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6" />
              </button>

              {/* Active Slide Bullet Pagination Indicators */}
              <div className="absolute bottom-8 left-12 flex items-center gap-3 z-30 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5 select-none text-white">
                <span className="text-[10px] font-mono font-bold text-stone-400 mr-1">TABS</span>
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentSlide ? "w-7 bg-amber-400 shadow-sm" : "w-2 bg-stone-500/50 hover:bg-stone-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16 md:space-y-24">

              {/* FEATURES SECTION Display cards */}
              <section id="features" className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-3.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
                  <TreePine className="w-3.5 h-3.5" />
                  {t("home.capabilities") || "Capabilities"}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-none">
                  {t("home.pillarsTitle") || "Our Platform Core Pillars"}
                </h2>
                <div className="h-[2px] w-12 bg-[#D4A017] mx-auto mt-2" />
                <p className="text-xs md:text-sm text-stone-500 font-medium max-w-lg mx-auto leading-relaxed">
                  {t("home.pillarsSub") || "A modern library where thousand-year African healing remedies shake hands with dynamic vector databases."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Pillar 1 */}
                <div className="group p-8 bg-white border border-stone-200/80 rounded-[2rem] space-y-5 shadow-sm hover:shadow-md hover:border-emerald-700/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  {/* Themed background graphic decoration relating to Pillar 1 (Database & Leaf node grid) */}
                  <svg className="absolute -right-6 -bottom-6 w-48 h-48 text-stone-100/60 group-hover:text-emerald-800/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M 10,90 Q 50,55 90,10" />
                    <path d="M 30,70 Q 50,35 70,10" strokeDasharray="2 2" />
                    <path d="M 10,50 Q 50,15 90,10" strokeDasharray="3 3"/>
                    <circle cx="10" cy="90" r="3" fill="currentColor" />
                    <circle cx="50" cy="55" r="4.5" fill="currentColor" />
                    <circle cx="90" cy="10" r="3" fill="currentColor" />
                    <circle cx="30" cy="70" r="2.5" fill="currentColor" />
                    <circle cx="70" cy="10" r="2.5" fill="currentColor" />
                    <path d="M 50,55 C 30,35 20,45 10,90 C 40,80 30,70 50,55 Z" />
                    <path d="M 50,55 C 70,35 80,45 90,10 C 60,20 70,30 50,55 Z" />
                  </svg>

                  <div className="absolute right-6 top-6 font-mono text-2xl font-black text-stone-200/60 select-none pointer-events-none group-hover:text-[#D4A017] group-hover:scale-110 transition duration-300 z-10">01</div>
                  <div className="space-y-4 relative z-10">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl inline-block border border-emerald-100/50 group-hover:bg-emerald-950 group-hover:text-white transition duration-200">
                      <Database className="w-5 h-5 text-emerald-700 group-hover:text-amber-305" />
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-[15px] uppercase tracking-wide">
                      {t("home.pillarDb") || "Medicinal Plants Database"}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal">
                      {t("home.pillarDbText") || "Meticulously mapped indigenous flora profile indexes with botanical names, Gĩkũyũ names, and harvesting periods."}
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="group p-8 bg-white border border-stone-200/80 rounded-[2rem] space-y-5 shadow-sm hover:shadow-md hover:border-emerald-700/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  {/* Themed background graphic decoration relating to Pillar 2 (Traditional mortar & steam brewer) */}
                  <svg className="absolute -right-6 -bottom-6 w-48 h-48 text-stone-100/60 group-hover:text-amber-800/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M 25,60 C 25,85 75,85 75,60 C 75,55 70,50 65,50 L 35,50 C 30,50 25,55 25,60 Z" />
                    <path d="M 20,50 L 80,50" strokeWidth="2" />
                    <path d="M 35,40 Q 40,30 35,20" strokeDasharray="2 1.5" />
                    <path d="M 50,35 Q 55,25 50,15" strokeDasharray="2 1.5" />
                    <path d="M 65,40 Q 60,30 65,20" strokeDasharray="2 1.5" />
                    <path d="M 50,50 C 45,65 55,65 50,80" />
                    <path d="M 40,65 Q 48,60 48,55" />
                    <path d="M 60,65 Q 52,60 52,55" />
                  </svg>

                  <div className="absolute right-6 top-6 font-mono text-2xl font-black text-stone-200/60 select-none pointer-events-none group-hover:text-[#D4A017] group-hover:scale-110 transition duration-300 z-10">02</div>
                  <div className="space-y-4 relative z-10">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl inline-block border border-emerald-100/50 group-hover:bg-emerald-950 group-hover:text-white transition duration-200">
                      <BookOpen className="w-5 h-5 text-emerald-700 group-hover:text-amber-305" />
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-[15px] uppercase tracking-wide">
                      {t("home.pillarRem") || "Traditional Remedies"}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal">
                      {t("home.pillarRemText") || "Symptom-driven preparation recipes detail how grandparent healers prepared bark, roots, and flowers."}
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="group p-8 bg-white border border-stone-200/80 rounded-[2rem] space-y-5 shadow-sm hover:shadow-md hover:border-emerald-700/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  {/* Themed background graphic decoration relating to Pillar 3 (AI digital circuit connections & neural nodes) */}
                  <svg className="absolute -right-6 -bottom-6 w-48 h-48 text-stone-100/60 group-hover:text-teal-800/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="50" cy="50" r="20" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="6" />
                    <path d="M 50,30 L 50,10" />
                    <path d="M 50,70 L 50,90" />
                    <path d="M 30,50 L 10,50" />
                    <path d="M 70,50 L 90,50" />
                    <circle cx="50" cy="10" r="3.5" fill="currentColor" />
                    <circle cx="50" cy="90" r="3.5" fill="currentColor" />
                    <circle cx="10" cy="50" r="3.5" fill="currentColor" />
                    <circle cx="90" cy="50" r="3.5" fill="currentColor" />
                    <path d="M 35,35 Q 20,20 15,35" />
                    <path d="M 65,35 Q 80,20 85,35" />
                    <path d="M 35,65 Q 20,80 15,65" />
                    <path d="M 65,65 Q 80,80 85,65" />
                  </svg>

                  <div className="absolute right-6 top-6 font-mono text-2xl font-black text-stone-200/60 select-none pointer-events-none group-hover:text-[#D4A017] group-hover:scale-110 transition duration-300 z-10">03</div>
                  <div className="space-y-4 relative z-10">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl inline-block border border-emerald-100/50 group-hover:bg-emerald-950 group-hover:text-white transition duration-200">
                      <BrainCircuit className="w-5 h-5 text-emerald-700 group-hover:text-amber-305" />
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-[15px] uppercase tracking-wide">
                      {t("home.pillarBot") || "AI Herbal Assistant"}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal">
                      {t("home.pillarBotText") || "Talk with DawaBot, a strict RAG-powered chatbot with strict context constraints to avoid model hallucinations."}
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="group p-8 bg-white border border-stone-200/80 rounded-[2rem] space-y-5 shadow-sm hover:shadow-md hover:border-emerald-700/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  {/* Themed background graphic decoration relating to Pillar 4 (Ancestral Mũgũmo tree branching and ancient temple columns) */}
                  <svg className="absolute -right-6 -bottom-6 w-48 h-48 text-stone-100/60 group-hover:text-emerald-800/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M 50,90 L 50,55" strokeWidth="2.5" />
                    <path d="M 50,65 C 35,55 30,45 20,50" strokeWidth="1.8" />
                    <path d="M 50,60 C 65,50 70,40 80,45" strokeWidth="1.8" />
                    <circle cx="50" cy="35" r="18" strokeDasharray="3 2" />
                    <circle cx="30" cy="45" r="12" strokeDasharray="3 2" />
                    <circle cx="70" cy="40" r="14" strokeDasharray="3 2" />
                    <path d="M 30,90 L 70,90" strokeWidth="2" />
                    <path d="M 35,85 L 65,85" />
                  </svg>

                  <div className="absolute right-6 top-6 font-mono text-2xl font-black text-stone-200/60 select-none pointer-events-none group-hover:text-[#D4A017] group-hover:scale-110 transition duration-300 z-10">04</div>
                  <div className="space-y-4 relative z-10">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl inline-block border border-emerald-100/50 group-hover:bg-emerald-950 group-hover:text-white transition duration-200">
                      <Landmark className="w-5 h-5 text-emerald-700 group-hover:text-amber-305" />
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-[15px] uppercase tracking-wide">
                      {t("home.pillarEth") || "Ethnobotanical Knowledge"}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal">
                      {t("home.pillarEthText") || "Preserving maternal milk, sacred Mũgũmo altars, and deep central Kenya highland cultural customs."}
                    </p>
                  </div>
                </div>

                {/* Pillar 5 */}
                <div className="group p-8 bg-white border border-stone-200/80 rounded-[2rem] space-y-5 shadow-sm hover:shadow-md hover:border-emerald-700/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  {/* Themed background graphic decoration relating to Pillar 5 (Overlapping mount ridges with glowing collaborative signal waves) */}
                  <svg className="absolute -right-6 -bottom-6 w-48 h-48 text-stone-100/60 group-hover:text-amber-800/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M 10,90 L 40,40 L 55,60 L 75,30 L 95,90 Z" />
                    <path d="M 25,90 L 45,55 L 65,90" strokeDasharray="2 2" />
                    <circle cx="40" cy="40" r="6" strokeDasharray="1.5 1.5" />
                    <circle cx="75" cy="30" r="8" strokeDasharray="1.5 1.5" />
                    <path d="M 20,20 Q 50,10 80,20" strokeWidth="1" strokeDasharray="3 3" />
                    <path d="M 30,25 Q 50,18 70,25" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>

                  <div className="absolute right-6 top-6 font-mono text-2xl font-black text-stone-200/60 select-none pointer-events-none group-hover:text-[#D4A017] group-hover:scale-110 transition duration-300 z-10">05</div>
                  <div className="space-y-4 relative z-10">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl inline-block border border-emerald-100/50 group-hover:bg-emerald-950 group-hover:text-white transition duration-200">
                      <Users className="w-5 h-5 text-emerald-700 group-hover:text-amber-305" />
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-[15px] uppercase tracking-wide">
                      {t("home.pillarComm") || "Community Learning"}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal">
                      {t("home.pillarCommText") || "Active review columns and comments where readers can compare oral reports across mountain ridges."}
                    </p>
                  </div>
                </div>

                {/* Pillar 6 */}
                <div className="group p-8 bg-white border border-stone-200/80 rounded-[2rem] space-y-5 shadow-sm hover:shadow-md hover:border-emerald-700/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  {/* Themed background graphic decoration relating to Pillar 6 (Global meridian coordinates and magnifier research target) */}
                  <svg className="absolute -right-6 -bottom-6 w-48 h-48 text-stone-100/60 group-hover:text-emerald-800/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="50" cy="50" r="40" />
                    <path d="M 10,50 L 90,50" />
                    <path d="M 50,10 L 50,90" />
                    <path d="M 15,30 C 35,45 65,45 85,30" strokeDasharray="2 2" />
                    <path d="M 15,70 C 35,55 65,55 85,70" strokeDasharray="2 2" />
                    <circle cx="65" cy="65" r="12" strokeWidth="2" />
                    <path d="M 73.5,73.5 L 88,88" strokeWidth="3" />
                    <path d="M 65,45 L 65,35" />
                    <path d="M 35,65 L 25,65" />
                  </svg>

                  <div className="absolute right-6 top-6 font-mono text-2xl font-black text-stone-200/60 select-none pointer-events-none group-hover:text-[#D4A017] group-hover:scale-110 transition duration-300 z-10">06</div>
                  <div className="space-y-4 relative z-10">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl inline-block border border-emerald-100/50 group-hover:bg-emerald-950 group-hover:text-white transition duration-200">
                      <Globe className="w-5 h-5 text-emerald-700 group-hover:text-amber-303" />
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-[15px] uppercase tracking-wide">
                      {t("home.pillarArch") || "Research Archive"}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal font-sans">
                      {t("home.pillarArchText") || "Contains clinical reviews, sustainable forest vertical-stripping diagram guides, and safety tables."}
                    </p>
                  </div>
                </div>
              </div>
            </section>


            {/* POPULAR HERBS SECTION */}
            <section id="popular-herbs" className="space-y-8 text-left">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/50 pb-6">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-amber-100/60 text-amber-900 border border-amber-200 font-extrabold uppercase px-2.5 py-1.5 rounded tracking-wider">
                    {t("home.pillarEth") || "Heritage Profiles"}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight font-sans">
                    {t("home.featuredFlora") || "Featured Medicinal Flora"}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_HERBS.slice(0, 3).map((herb) => {
                  const th = translateHerb(herb);
                  return (
                    <div 
                      key={th.id} 
                      className="bg-white border border-stone-200/90 hover:border-[#D4A017]/30 rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-350 flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Botanical Image with Premium Blend Overlays */}
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={getPlantImage(herb)}
                          alt={th.kikuyuName}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Subtle rich gradient overlay mask to guarantee readability and high contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-emerald-950/30 to-stone-900/10 z-1" />
                        
                        {/* Floating header badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                          {/* Category Pill Tag */}
                          <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-emerald-950/90 text-emerald-100 border border-emerald-800/40 rounded-full shadow-sm">
                            {th.category}
                          </span>

                          {/* Safety Indicator Badge */}
                          {th.severityRating && (
                            <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border shadow-sm ${
                              th.severityRating === 'Safe' 
                                ? 'bg-emerald-900/90 text-emerald-100 border-emerald-700/50' 
                                : th.severityRating === 'Caution' 
                                  ? 'bg-amber-900/90 text-amber-100 border-amber-700/50' 
                                  : 'bg-red-900/90 text-red-100 border-red-700/50'
                            }`}>
                              {th.severityRating}
                            </span>
                          )}
                        </div>

                        {/* Subtle label explaining verified vs illustration placeholder source to user */}
                        <div className="absolute top-12 left-4 z-10">
                          <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-sm text-stone-200 rounded border border-white/5">
                            {herb.imageUrl ? t("label.verifiedSpecimen") : t("label.botanicalIllustration")}
                          </span>
                        </div>

                        {/* Overlaid Title Copy */}
                        <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                          <p className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-wider drop-shadow-sm">
                            {language === 'ki' ? (th.commonName || t("label.indigenousFlora")) : `${t("label.kikuyuLanguage")}: ${th.kikuyuName}`}
                          </p>
                          <h3 className="text-xl font-black tracking-tight font-sans text-white uppercase drop-shadow">
                            {language === 'ki' ? th.kikuyuName : (th.commonName || t("label.indigenousFlora"))}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-3.5 text-left">
                          <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-normal">{th.description}</p>
                          <div className="h-px bg-stone-150 w-full" />
                          <div className="text-[11px] font-semibold text-stone-700 flex items-center gap-1.5 leading-none bg-stone-50 p-2.5 rounded-lg border border-stone-200/20">
                            <span className="text-emerald-900 uppercase text-[9px] font-extrabold tracking-wider bg-emerald-100/75 px-1.5 py-0.5 rounded border border-emerald-200/50">
                              {t("home.commonUseLabel") || "Common use:"}
                            </span>
                            <span className="truncate max-w-[150px]">{th.medicinalUses && th.medicinalUses[0]}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedPlantForModal(herb)}
                          className="w-full mt-2 py-2.5 bg-stone-100 hover:bg-[#D4A017] hover:text-emerald-950 hover:border-[#D4A017] text-emerald-950 font-extrabold border border-stone-250/90 rounded-xl text-xs transition cursor-pointer"
                        >
                          {t("btn.learnMore") || "Learn More"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ABOUT SECTION SUMMARY */}
            <section id="about" className="bg-stone-100/95 border border-stone-200/80 rounded-[40px] p-8 md:p-14 text-left relative overflow-hidden shadow-sm">
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-1/4 translate-y-1/4 select-none">
                <Leaf className="w-96 h-96 text-emerald-900" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-50 text-emerald-850 border border-emerald-100/50 font-extrabold uppercase px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
                    {t("home.pillars") || "Our Mission"}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight leading-none">
                    {t("home.aboutSectionTitle") || "Preserving African Herbal Knowledge"}
                  </h2>
                  <div className="h-[2px] w-12 bg-[#D4A017]" />
                  
                  <p className="text-stone-700 text-xs md:text-sm leading-relaxed font-semibold">
                    {t("home.missionIntro") || "The slopes of central Kenya grow a biological library of plants that traditional sages Muthamaki wa Mithĩga spent millenniums testing and classifying. But oral recipes pass away if not written down."}
                  </p>
                  <p className="text-stone-600 text-xs leading-relaxed font-normal">
                    {t("home.mission") || "DawaKienyeji represents an educational initiative to catalog regional medicinal plants with their correct Kikuyu characters (Ũ, Ĩ), scientific botanical taxonomy, sustainable vertical cutting guidelines, and defensive parameters to ensure safety. We integrate conversational AI to foster modern digital preservation."}
                  </p>
                  <button
                    onClick={() => navigateTo('about')}
                    className="py-3 px-6 bg-emerald-950 hover:bg-emerald-900 text-white font-extrabold rounded-2xl text-xs inline-flex items-center justify-center gap-2 shadow-md transition duration-150 cursor-pointer"
                  >
                    {t("home.ourPhilosophy") || "Our Philosophy"}
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>

                <div className="bg-white border border-[#D4A017]/15 p-8 rounded-[2rem] space-y-4 relative overflow-hidden shadow-lg shadow-emerald-950/2 md:p-10">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-400 tracking-wider">Educational Statement</span>
                  <blockquote className="text-sm italic text-stone-800 leading-relaxed font-semibold relative">
                    <span className="absolute -top-3.5 -left-1 text-4xl text-[#D4A017]/20 select-none font-serif">“</span>
                    "When a forest grove is burned down in the hills, a scientific library is lost forever. When grandparent healers pass without writing their recipes, a textbook dissolves. Conservation is first aid."
                  </blockquote>
                  <div className="h-px bg-stone-150 w-full my-1" />
                  <p className="text-[10px] text-stone-500 font-bold tracking-wide">— Traditional Elders Preservation Circle</p>
                </div>
              </div>
            </section>

            {/* BLOG PREVIEW SECTION */}
            <section id="blog-preview" className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b pb-4 border-stone-200">
                <h2 className="text-2xl font-extrabold tracking-tight">{t("home.recentChronicles") || "Recent Chronicles & Essays"}</h2>
                <button
                  onClick={() => navigateTo('blog')}
                  className="text-xs font-bold text-emerald-800 inline-flex items-center gap-0.5 hover:translate-x-1 duration-200 text-right shrink-0 font-sans"
                >
                  {t("home.exploreBlogs") || "Explore Blogs"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INITIAL_BLOGS.slice(0, 2).map((blog) => (
                  <div 
                    key={blog.id} 
                    onClick={() => navigateTo('blog')}
                    className="p-6 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">{blog.category}</span>
                      <h3 className="text-lg font-bold text-stone-900 leading-snug">{blog.title}</h3>
                      <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-normal">{blog.excerpt}</p>
                    </div>

                    <span className="text-xs text-emerald-850 hover:text-emerald-700 font-extrabold inline-flex items-center gap-1 pt-4 border-t border-stone-50 mt-4 self-start">
                      Read Essay
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* NATURAL TONES NEWSLETTER SUBSCRIPTION FORM */}
            <section id="homepage-newsletter" className="bg-stone-100/60 border border-stone-250 p-6 md:p-10 rounded-[32px] font-sans flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 shadow-sm">
              <div className="max-w-xl space-y-2.5 text-left">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-extrabold tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <Mail className="w-3.5 h-3.5" />
                  {t("label.category") || "Category"}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight leading-none font-sans">
                  {t("newsletter.title") || "Subscribe to Botanical Bulletins"}
                </h2>
                <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-normal">
                  {t("newsletter.subtitle") || "Get sustainable harvesting guidelines, ethnobotanical reports, and safety-grounded remedy updates directly to your inbox."}
                </p>
              </div>

              <div className="w-full lg:max-w-md space-y-3 shrink-0">
                <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                  <div className="relative w-full">
                    <input
                      type="email"
                      required
                      placeholder={t("newsletter.placeholder") || "Enter your email address..."}
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      disabled={newsletterStatus === 'loading'}
                      className="w-full pl-4 pr-10 py-3 bg-white border border-stone-300 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 placeholder-stone-400 text-stone-900 transition shadow-sm disabled:opacity-60"
                    />
                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-stone-400 pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="w-full sm:w-auto py-3 px-6 bg-emerald-950 hover:bg-emerald-800 active:bg-emerald-900 text-emerald-100 rounded-2xl text-xs font-extrabold tracking-wider transition shadow-sm disabled:opacity-60 hover:shadow whitespace-nowrap cursor-pointer hover:scale-[1.01] active:scale-[0.99] duration-150"
                  >
                    {newsletterStatus === 'loading' ? t("btn.loading") || "Processing..." : t("newsletter.button") || "Subscribe"}
                  </button>
                </form>

                {newsletterMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-[11px] font-bold ${
                      newsletterStatus === 'success' ? "text-emerald-800 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl" : "text-amber-800 bg-amber-50 border border-amber-100 p-2.5 rounded-xl"
                    }`}
                  >
                    {newsletterMessage}
                  </motion.div>
                )}
              </div>
            </section>

            </div>
          </div>
        )}

        {/* Tab 2: About full page content */}
        {currentRoute === 'about' && (
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div 
              className="relative max-w-5xl mx-auto px-6 py-12 md:py-16 rounded-3xl overflow-hidden bg-cover bg-center shadow-lg font-sans border border-stone-200"
              style={{ backgroundImage: `url('https://i.postimg.cc/y8QrWf1v/Chat-GPT-Image-Jun-7-2026-08-35-28-PM.png')` }}
            >
            {/* Elegant overlay/vignette mask ensuring high contrast and modern feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-stone-950/70 z-0" />

            <div className="relative z-10 space-y-12 max-w-4xl mx-auto">
              
              <div className="space-y-4 text-center">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-100 bg-emerald-950/80 backdrop-blur-md border border-emerald-800/30 px-3 py-1.5 rounded-full shadow-sm inline-block">
                  {t("home.pillars") || "Background History"}
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md uppercase">
                  {t("nav.about") ? `${t("nav.about")} DawaKienyeji` : "About DawaKienyeji"}
                </h1>
                <p className="text-stone-100 text-sm md:text-base max-w-xl mx-auto drop-shadow font-medium leading-relaxed">
                  {t("home.aboutSub") || "Blending ancient Gĩkũyũ botanical medicine, indigenous highland preservation, and modern AI models."}
                </p>
              </div>

              <div id="preserving-ethnobotanical-chronicles-card" className="bg-white border border-stone-250 p-6 md:p-8 rounded-3xl shadow-sm space-y-6 text-left">
                <h2 className="text-xl font-extrabold text-emerald-950 tracking-tight leading-tight">
                  {t("home.aboutHeading") || "Preserving Ethnobotanical Chronicles"}
                </h2>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-normal">
                  {t("home.preservingText") || "Traditional herbal medicine has existed under forest canopies for centuries. In our hills, trees like the peppery Pepper Bark Tree (Kikuyu: Mũthĩga) served as our emergency clinics for colds and fevers. Urination issues in older men were solved with tea brewed from the reddish bark of African Cherry (Kikuyu: Mũcoroi). Toothaches were temporarily anesthetized with Sodom Apple (Kikuyu: Mũtongu) roots. Saps from sacred Sacred Fig Trees (Kikuyu: Mugumo) served as instant surgical coagulants on cuts."}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-stone-100 border border-stone-200 rounded-2xl">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-stone-900 text-xs flex items-center gap-1.5 uppercase">
                      <Landmark className="w-4 h-4 text-emerald-800" />
                      {t("home.integrityHeading") || "Our Integrity Philosophy"}
                    </h3>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                      {t("home.integrityText") || "We prioritize clinical safety and exact species mapping. Traditional heritage is respected inside our parameters to ensure child safety and avoid toxic saps."}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-stone-900 text-xs flex items-center gap-1.5 uppercase">
                      <TreePine className="w-4 h-4 text-emerald-800" />
                      {t("home.ecologyHeading") || "Ecology & Sustainability"}
                    </h3>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                      {t("home.ecologyText") || "We mandate vertical Opposite Striping harvesting so that bark trees remain alive and forests continue to thrive. We are ecological preservationists first."}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase text-emerald-850">
                    {t("home.ragHeading") || "The Role of RAG Technology"}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-semibold">
                    {t("home.ragText") || "Our conversational AI companion—DawaBot—utilizes Retrieval-Augmented Generation mapped directly containing verified Kikuyu botanical records... In doing so, we don't duplicate books; we teach young Kenyans their botanical lineage."}
                  </p>
                </div>
              </div>

            </div>
            </div>
          </div>
        )}


        {/* Tab 3: Plants catalog (Main browsable cards) */}
        {currentRoute === 'plants' && (
          <div className="py-8 md:py-12">
            <PlantsCatalog />
          </div>
        )}

        {/* Tab 4: Traditional Remedies listing */}
        {currentRoute === 'remedies' && (
          <div className="py-8 md:py-12">
            <TraditionalRemedies />
          </div>
        )}

        {/* Tab 6: Blog Feed list */}
        {currentRoute === 'blog' && (
          <div className="py-8 md:py-12">
            <BlogFeed />
          </div>
        )}

        {/* Tab 7: Contact Page */}
        {currentRoute === 'contact' && (
          <div className="py-8 md:py-12">
            <ContactPage />
          </div>
        )}

        {/* Tab 8: Security Admin dashboard */}
        {currentRoute === 'admin' && (
          <div className="py-8 md:py-12">
            <AdminDashboard />
          </div>
        )}

      </main>

      <footer id="main-footer" className="bg-[#0a1e15] text-white border-t-2 border-[#D4A017]/30 mt-20 font-sans p-8 md:p-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-[#1a3a2a]">
          
          {/* Column 1: Website Branding & Philosophy. Occupies 4 grid cols on large screens. */}
          <div className="lg:col-span-4 space-y-5">
            <div 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 overflow-hidden rounded-full shadow-md bg-[#D4A017] flex items-center justify-center p-0.5 border border-[#D4A017]/30 transform group-hover:scale-105 transition-all duration-300">
                <img 
                  src="https://i.postimg.cc/VkwT0rck/Chat-GPT-Image-Jun-7-2026-09-17-26-PM.png" 
                  alt="DawaKienyeji Logo" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block group-hover:text-[#D4A017] transition-colors duration-200">DawaKienyeji</span>
              </div>
            </div>
            <p className="text-sm text-white leading-relaxed font-light">
              A premium digital repository preserving thousand-year-old African botanical wisdom. Bridging traditional healing lineages, ecological conservation guidebooks, and safety-guided AI interfaces.
            </p>
            
            {/* Social Media Icons */}
            <div className="pt-3">
              <h5 className="text-xs uppercase font-extrabold tracking-widest text-[#D4A017] mb-3">Connect With Us</h5>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#122e20] hover:bg-[#D4A017] hover:text-[#0a1e15] transition-all duration-300 rounded-full border border-[#1a3a2a] group" aria-label="Facebook">
                  <Facebook className="w-4 h-4 text-white group-hover:text-[#0a1e15]" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#122e20] hover:bg-[#D4A017] hover:text-[#0a1e15] transition-all duration-300 rounded-full border border-[#1a3a2a] group" aria-label="Twitter">
                  <Twitter className="w-4 h-4 text-white group-hover:text-[#0a1e15]" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#122e20] hover:bg-[#D4A017] hover:text-[#0a1e15] transition-all duration-300 rounded-full border border-[#1a3a2a] group" aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-white group-hover:text-[#0a1e15]" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#122e20] hover:bg-[#D4A017] hover:text-[#0a1e15] transition-all duration-300 rounded-full border border-[#1a3a2a] group" aria-label="YouTube">
                  <Youtube className="w-4 h-4 text-white group-hover:text-[#0a1e15]" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (combines all navigation links precisely as requested) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-extrabold tracking-widest text-[#D4A017] uppercase border-b border-[#1a3a2a] pb-2 font-sans">{t("nav.quickLinks") || "Quick Links"}</h4>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm font-semibold">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>{t("nav.home") || "Home"}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>{t("nav.about") || "About"}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('plants')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>{t("nav.plants") || "Herbal Plants"}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('remedies')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>{t("nav.remedies") || "Traditional Remedies"}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('blog')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>{t("nav.blog") || "Blogs"}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('chatbot')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span className="font-bold text-[#D4A017] hover:underline hover:decoration-wavy">{t("nav.askBot") || "Get Help"}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>{t("nav.contact") || "Contact"}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us information. Occupies 4 grid cols. */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-extrabold tracking-widest text-[#D4A017] uppercase border-b border-[#1a3a2a] pb-2 font-sans">{t("nav.contactUs") || "Contact Us"}</h4>
            <div className="text-xs md:text-sm text-white space-y-3 font-normal">
              <p className="flex items-start gap-2 group text-white">
                <MapPin className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <span>Nyeri County slopes, Central Province, Kenya</span>
              </p>
              <p className="flex items-start gap-2 group text-white">
                <Phone className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <span>+254 141 063 174</span>
              </p>
              <p className="flex items-start gap-2 group text-white">
                <Mail className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <span>info@dawakienyeji.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Copyright and lower meta row */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white font-semibold tracking-wide">
          <p>© {new Date().getFullYear()} DawaKienyeji. Digitalized with support from Mojatu Foundation.</p>
          <div className="flex gap-4 items-center">
            <span className="text-white/80 uppercase font-medium">Educational Project only</span>
          </div>
        </div>
      </footer>

      {/* Shared Mini modal overlay to display plant details on featured home clicks */}
      {selectedPlantForModal && (() => {
        const pm = translateHerb(selectedPlantForModal);
        return (
          <div id="quick-plant-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full p-6 space-y-5 border text-stone-900 border-stone-200">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">{pm.category}</span>
                    {language !== 'ki' && (
                      <span className="text-[9px] uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">{pm.kikuyuName}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-stone-950 mt-1.5 uppercase leading-none">
                    {language === 'ki' ? pm.kikuyuName : pm.commonName}
                  </h3>
                  {language !== 'ki' && (
                    <p className="text-xs text-stone-500 font-semibold mt-1">
                      (Kikuyu: {pm.kikuyuName})
                    </p>
                  )}
                  {language === 'ki' && (
                    <p className="text-xs text-stone-500 font-semibold mt-1">
                      (English: {pm.commonName})
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => setSelectedPlantForModal(null)}
                  className="p-1.5 bg-stone-100 hover:bg-stone-200 border rounded-full text-stone-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-stone-600 font-semibold space-y-3">
                <p>Scientific taxonomy: <strong className="italic text-emerald-950">{pm.scientificName}</strong></p>
                <p className="font-normal">{pm.description}</p>
                
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-850 uppercase">Registered uses:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    {pm.medicinalUses.map((use: string, idx: number) => (
                      <li key={idx}>{use}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-emerald-50/60 border border-emerald-100/50 rounded-xl">
                  <strong className="text-[10px] uppercase block text-emerald-850 mb-1">Traditional Decoction:</strong>
                  <p className="leading-relaxed font-semibold text-stone-850">{pm.preparation}</p>
                </div>

                <div className="p-3.5 bg-red-50 border border-red-150 rounded-xl">
                  <strong className="text-[10px] uppercase block text-red-800 mb-1">Safety Warnings:</strong>
                  <p className="leading-relaxed font-semibold text-red-950">{pm.precautions}</p>
                </div>
              </div>

              <div className="pt-2 border-t text-right flex justify-between items-center">
                <p className="text-[8px] uppercase tracking-wider text-stone-400">CC CC BY licenced</p>
                <button 
                  onClick={() => {
                    setSelectedPlantForModal(null);
                    navigateTo('plants');
                  }}
                  className="py-1.5 px-4 bg-emerald-950 text-white rounded-lg text-xs font-bold hover:bg-emerald-800"
                >
                  Go to Catalog
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
