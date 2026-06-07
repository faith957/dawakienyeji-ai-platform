import React, { useState, useEffect } from "react";
import { 
  Leaf, Bot, BookOpen, MapPin, Phone, Mail, ArrowRight, ShieldCheck, 
  Sparkles, Menu, X, Landmark, Compass, BrainCircuit, Users, Database, Globe, TreePine,
  ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Youtube
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { INITIAL_HERBS, INITIAL_BLOGS } from "./data/herbalDatabase";
import { useLanguage } from "./utils/LanguageContext";
import { getPlantImage } from "./utils/herbImages";
import LanguageSelector from "./components/LanguageSelector";
import PlantsCatalog from "./components/PlantsCatalog";
import TraditionalRemedies from "./components/TraditionalRemedies";
import ResearchKnowledge from "./components/ResearchKnowledge";
import BlogFeed from "./components/BlogFeed";

import heroSlide1 from "./assets/images/hero_slide_1_1780659974970.png";
import heroSlide2 from "./assets/images/hero_slide_2_1780659992793.png";
import heroSlide3 from "./assets/images/hero_slide_3_1780660007523.png";
import heroSlide4 from "./assets/images/hero_slide_4_1780660023541.png";
import ContactPage from "./components/ContactPage";
import ChatbotPage from "./components/ChatbotPage";
import AdminDashboard from "./components/AdminDashboard";

type PageRoute = 'home' | 'about' | 'plants' | 'remedies' | 'knowledge' | 'blog' | 'contact' | 'admin' | 'chatbot';

export default function App() {
  const { t, translateHerb } = useLanguage();
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
      btn1Key: "slides.2.btn1",
      btn1Route: "knowledge" as PageRoute,
      btn2Key: "slides.2.btn2",
      btn2Route: "about" as PageRoute,
    },
    {
      id: 3,
      titleKey: "slides.3.title",
      subtitleKey: "slides.3.subtitle",
      bgImage: heroSlide3,
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
      btn1Key: "slides.4.btn1",
      btn1Route: "remedies" as PageRoute,
      btn2Key: "slides.4.btn2",
      btn2Route: "knowledge" as PageRoute,
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
    <div className="min-h-screen bg-stone-50/45 bg-grain text-emerald-950 flex flex-col font-sans">
      
      {/* Top Header Navigation Panel */}
      <header id="main-header" className="sticky top-0 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/55 z-40 transition duration-200">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 overflow-hidden rounded-full shadow bg-emerald-950 flex items-center justify-center p-0.5 border border-emerald-800/20 transform group-hover:scale-105 transition duration-300">
              <img 
                src="https://i.postimg.cc/VkwT0rck/Chat-GPT-Image-Jun-7-2026-09-17-26-PM.png" 
                alt="DawaKienyeji Logo" 
                className="w-full h-full object-cover rounded-full animate-pulse-slow"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight font-sans text-emerald-950 block">DawaKienyeji</span>
            </div>
          </div>

          {/* Desktop Nav menu */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-stone-600/90 tracking-wide uppercase">
            <button 
              id="nav-home" 
              onClick={() => navigateTo('home')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1 border-b-2 ${currentRoute === 'home' ? 'border-emerald-700 text-emerald-950' : 'border-transparent'}`}
            >
              {t("nav.home")}
            </button>
            <button 
              id="nav-about" 
              onClick={() => navigateTo('about')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1 border-b-2 ${currentRoute === 'about' ? 'border-emerald-700 text-emerald-950' : 'border-transparent'}`}
            >
              About
            </button>
            <button 
              id="nav-plants" 
              onClick={() => navigateTo('plants')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1 border-b-2 ${currentRoute === 'plants' ? 'border-emerald-700 text-emerald-950' : 'border-transparent'}`}
            >
              {t("nav.plants")}
            </button>
            <div className="relative group py-2">
              <button 
                id="nav-remedies" 
                onClick={() => navigateTo('remedies')}
                className={`hover:text-emerald-950 transition cursor-pointer py-1 border-b-2 flex items-center gap-1 ${
                  currentRoute === 'remedies' || currentRoute === 'knowledge' ? 'border-emerald-700 text-emerald-950' : 'border-transparent'
                }`}
              >
                <span>{t("nav.remedies")}</span>
                <span className="text-[9px] text-stone-400 font-sans">▼</span>
              </button>
              
              {/* Dropdown Menu on hover */}
              <div className="absolute top-full left-0 hidden group-hover:block pt-1.5 w-48 z-50 bg-white border border-stone-200/80 shadow-xl rounded-xl p-1.5 animate-fade-in">
                <button
                  onClick={() => navigateTo('remedies')}
                  className="w-full text-left px-3 py-2 text-[11px] hover:bg-stone-50 rounded-lg text-stone-700 transition font-bold"
                >
                  {t("nav.remedies")}
                </button>
                <button
                  id="nav-dropdown-knowledge"
                  onClick={() => navigateTo('knowledge')}
                  className="w-full text-left px-3 py-2 text-[11px] hover:bg-stone-50 rounded-lg text-stone-700 font-bold transition flex items-center justify-between border-t border-stone-100 pt-2 mt-1"
                >
                  <span>{t("nav.knowledge")}</span>
                  <span className="bg-emerald-50 text-emerald-800 text-[8px] font-extrabold px-1.5 py-0.2 rounded-full border border-emerald-105">RAG</span>
                </button>
              </div>
            </div>

            <button 
              id="nav-blog" 
              onClick={() => navigateTo('blog')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1 border-b-2 ${currentRoute === 'blog' ? 'border-emerald-700 text-emerald-950' : 'border-transparent'}`}
            >
              {t("nav.blog")}
            </button>
            <button 
              id="nav-contact" 
              onClick={() => navigateTo('contact')}
              className={`hover:text-emerald-950 transition cursor-pointer py-1 border-b-2 ${currentRoute === 'contact' ? 'border-emerald-700 text-emerald-950' : 'border-transparent'}`}
            >
              {t("nav.contact")}
            </button>
          </nav>

          {/* Top-right CTAs: LanguageSelector, Ask DawaBot & Sign Up */}
          <div className="flex items-center gap-2">
            {/* Elegant Global Multilingual Language Selector dropdown */}
            <LanguageSelector />

            <button
              id="ask-dawabot-btn-header"
              onClick={() => navigateTo('chatbot')}
              className="py-2 px-3.5 bg-emerald-950 hover:bg-emerald-800 active:bg-emerald-900 border border-emerald-900/40 text-emerald-100 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <Bot className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span className="hidden sm:inline">{t("nav.askBot")}</span>
              <span className="inline sm:hidden">Get Help</span>
            </button>

            <button
              id="signup-btn-header"
              onClick={() => navigateTo('admin')}
              className={`py-2 px-3.5 border text-xs font-bold rounded-full transition shadow-sm ${
                currentRoute === 'admin' 
                  ? 'bg-emerald-600 border-emerald-700 text-white shadow-inner' 
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {t("nav.signUp")}
            </button>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-emerald-950 hover:bg-stone-100 rounded-lg lg:hidden"
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
            <button onClick={() => navigateTo('about')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">About</button>
            <button onClick={() => navigateTo('plants')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.plants")}</button>
            <button onClick={() => navigateTo('remedies')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.remedies")}</button>
            <button onClick={() => navigateTo('knowledge')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.knowledge")}</button>
            <button onClick={() => navigateTo('blog')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.blog")}</button>
            <button onClick={() => navigateTo('contact')} className="py-2 text-left hover:text-emerald-700 border-b border-stone-200">{t("nav.contact")}</button>
            <button onClick={() => navigateTo('admin')} className="py-2 text-left hover:text-emerald-700">{t("nav.admin")}</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Routing Arena */}
      <main className="flex-grow py-8 md:py-12 max-w-7xl mx-auto w-full">
        
        {currentRoute === 'home' && (
          <div className="space-y-16">
            
            {/* HERO SLIDER SECTION */}
            <section id="hero-carousel" className="mx-4 relative overflow-hidden rounded-[36px] h-[520px] md:h-[580px] bg-stone-950 shadow-2xl flex items-center group">
              
              {/* Background Images with Zoom Parallax Effect and Dark Greens Overlays */}
              <div className="absolute inset-0 w-full h-full z-0 select-none">
                <AnimatePresence mode="wait">
                  {heroSlides.map((slide, idx) => idx === currentSlide && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Dark gradient mask */}
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-emerald-950/70 to-stone-950/45 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent z-10" />
                      
                      <motion.img
                        src={slide.bgImage}
                        alt="African traditional herbs"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover origin-center"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 7, ease: "linear" }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Floating Leaf Ambient Deco elements */}
              <div className="absolute right-10 bottom-10 opacity-10 pointer-events-none transform translate-x-10 scale-110 select-none z-10 animate-leaf-hover">
                <Leaf className="w-64 h-64 text-emerald-100" />
              </div>

              {/* Foreground slide text copy & container */}
              <div className="w-full max-w-3xl px-6 md:px-16 z-20 relative text-white">
                <AnimatePresence mode="wait">
                  {heroSlides.map((slide, idx) => idx === currentSlide && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      {/* Glassmorphism Category Header Tag */}
                      <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest uppercase font-extrabold text-emerald-300 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                        {t("nav.heroTitle")}
                      </span>

                      {/* Display Headings with deep bold typeface */}
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
                        {t(slide.titleKey)}
                      </h1>

                      {/* Descriptive supporting line */}
                      <p className="text-stone-200 text-xs md:text-base leading-relaxed font-normal max-w-2xl drop-shadow">
                        {t(slide.subtitleKey)}
                      </p>

                      {/* Styled Action CTA buttons */}
                      <div className="pt-4 flex flex-wrap gap-3.5">
                        <button
                          onClick={() => navigateTo(slide.btn1Route)}
                          className="py-3 px-6 md:py-3.5 md:px-8 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-2xl font-black text-xs md:text-sm shadow-lg hover:shadow-emerald-900/30 transition-all duration-150 hover:scale-[1.02] cursor-pointer"
                        >
                          {t(slide.btn1Key)}
                        </button>
                        <button
                          onClick={() => navigateTo(slide.btn2Route)}
                          className="py-3 px-6 md:py-3.5 md:px-8 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/15 hover:border-white rounded-2xl font-black text-xs md:text-sm backdrop-blur-sm transition-all duration-150 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {slide.btn2Route === "chatbot" && <Bot className="w-4 h-4 text-emerald-300" />}
                          {t(slide.btn2Key)}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Manual Arrow Nav buttons */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-emerald-950 border border-white/10 hover:border-emerald-500/30 text-white hover:text-emerald-300 transition-all z-30 opacity-0 group-hover:opacity-100 hover:scale-105 duration-300 cursor-pointer shadow"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-emerald-950 border border-white/10 hover:border-emerald-500/30 text-white hover:text-emerald-300 transition-all z-30 opacity-0 group-hover:opacity-100 hover:scale-105 duration-300 cursor-pointer shadow"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6" />
              </button>

              {/* Active Slide Bullet Pagination Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30 bg-black/35 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/5 select-none">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentSlide ? "w-6 bg-emerald-400" : "w-2 bg-stone-500/60 hover:bg-stone-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

            </section>

            {/* FEATURES SECTION Display cards */}
            <section id="features" className="mx-4 space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold uppercase px-2 py-1 rounded">Capabilities</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">Our Platform Core Pillars</h2>
                <p className="text-xs md:text-sm text-stone-500 font-normal">A modern library where thousand-year African healing remedies shake hands with dynamic vector databases.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-stone-200 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-800 inline-block">
                    <Database className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm">Medicinal Plants Database</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-normal">Meticulously mapped indigenous flora profile indexes with botanical names, Gĩkũyũ names, and harvesting periods.</p>
                </div>

                <div className="p-6 bg-white border border-stone-200 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-800 inline-block">
                    <BookOpen className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm">Traditional Remedies</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-normal">Symptom-driven preparation recipes detail how grandparent healers prepared bark, roots, and flowers.</p>
                </div>

                <div className="p-6 bg-white border border-stone-200 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-800 inline-block">
                    <BrainCircuit className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm">AI Herbal Assistant</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-normal">Talk with DawaBot, a strict RAG-powered chatbot with strict context constraints to avoid model hallucinations.</p>
                </div>

                <div className="p-6 bg-white border border-stone-200 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-800 inline-block">
                    <Landmark className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm">Ethnobotanical Knowledge</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-normal">Preserving maternal milk, sacred Mũgũmo altars, and deep central Kenya highland cultural customs.</p>
                </div>

                <div className="p-6 bg-white border border-stone-200 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-800 inline-block">
                    <Users className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm">Community Learning</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-normal">Active review columns and comments where readers can compare oral reports across mountain ridges.</p>
                </div>

                <div className="p-6 bg-white border border-stone-200 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-800 inline-block">
                    <Globe className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm">Research Archive</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-normal font-sans">Contains clinical reviews, sustainable forest vertical-stripping diagram guides, and safety tables.</p>
                </div>
              </div>
            </section>

            {/* POPULAR HERBS SECTION */}
            <section id="popular-herbs" className="mx-4 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] bg-amber-50 text-amber-800 font-extrabold uppercase px-2 py-1 rounded">Heritage Profiles</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mt-1 tracking-tight font-sans">Featured Medicinal Flora</h2>
                </div>
                <button
                  onClick={() => navigateTo('plants')}
                  className="py-2.5 px-4 rounded-xl border border-stone-350 hover:bg-stone-50 text-xs font-bold text-emerald-950 inline-flex items-center gap-1 shrink-0 bg-white"
                >
                  Browse Full Database
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_HERBS.slice(0, 3).map((herb) => {
                  const th = translateHerb(herb);
                  return (
                    <div 
                      key={th.id} 
                      className="bg-white border border-stone-200 hover:border-emerald-700/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-350 flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Botanical Image with Premium Blend Overlays */}
                      <div className="h-44 relative overflow-hidden">
                        <img 
                          src={getPlantImage(herb)}
                          alt={th.kikuyuName}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Subtle rich gradient overlay mask to guarantee readability and high contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-emerald-950/45 to-stone-900/10 z-1" />
                        
                        {/* Floating header badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                          {/* Category Pill Tag */}
                          <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-emerald-950/90 text-emerald-100 border border-emerald-800/40 rounded-full shadow-sm">
                            {th.category}
                          </span>

                          {/* Safety Indicator Badge */}
                          {th.severityRating && (
                            <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border shadow-sm ${
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
                        <div className="absolute top-11 left-3 z-10">
                          <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-sm text-stone-200 rounded border border-white/5">
                            {herb.imageUrl ? "📷 Verified Specimen" : "🎨 Botanical Illustration"}
                          </span>
                        </div>

                        {/* Overlaid Title Copy */}
                        <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                          <p className="text-[10px] font-mono text-emerald-250 font-bold uppercase tracking-wider drop-shadow-sm">{th.commonName || 'Indigenous Flora'}</p>
                          <h3 className="text-xl font-black tracking-tight font-sans text-white uppercase drop-shadow">{th.kikuyuName}</h3>
                        </div>
                      </div>

                      <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-normal">{th.description}</p>
                          <div className="text-[11px] font-semibold text-stone-700">
                            <strong>Common use:</strong> {th.medicinalUses && th.medicinalUses[0]}
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedPlantForModal(th)}
                          className="w-full py-2 bg-stone-50 text-emerald-950 font-bold border border-stone-200 rounded-xl text-xs hover:bg-stone-100/80 transition"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ABOUT SECTION SUMMARY */}
            <section id="about" className="mx-4 bg-stone-100 border border-stone-200 rounded-[36px] p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold uppercase px-2 py-1 rounded">Our Mission</span>
                  <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight leading-tight">Preserving African Herbal Knowledge</h2>
                  <p className="text-stone-700 text-xs md:text-sm leading-relaxed font-semibold">
                    The slopes of central Kenya grow a biological library of plants that traditional sages <span className="italic">Muthamaki wa Mithĩga</span> spent millenniums testing and classifying. But oral recipes pass away if not written down.
                  </p>
                  <p className="text-stone-600 text-xs leading-relaxed font-normal">
                    <span className="font-extrabold text-stone-850">DawaKienyeji</span> represents an educational initiative to catalog regional medicinal plants with their correct Kikuyu characters (Ũ, Ĩ), scientific botanical taxonomy, sustainable vertical cutting guidelines, and defensive parameters to ensure safety. We integrate conversational AI to foster modern digital preservation.
                  </p>
                  <button
                    onClick={() => navigateTo('about')}
                    className="py-2.5 px-5 bg-emerald-950 text-white hover:bg-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow"
                  >
                    Our Philosophy
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white/80 border border-amber-200/50 p-6 md:p-8 rounded-3xl space-y-4 relative overflow-hidden shadow-inner">
                  <span className="text-[10px] font-bold uppercase text-stone-400">Educational Statement</span>
                  <blockquote className="text-sm italic font-sans text-stone-800 leading-relaxed font-semibold">
                    "When a forest grove is burned down in the hills, a scientific library is lost forever. When grandparent healers pass without writing their recipes, a textbook dissolves. Conservation is first aid."
                  </blockquote>
                  <p className="text-[10px] text-stone-500 font-bold">— Traditional Elders Preservation Circle</p>
                </div>
              </div>
            </section>

            {/* BLOG PREVIEW SECTION */}
            <section id="blog-preview" className="mx-4 space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-stone-200">
                <h2 className="text-2xl font-extrabold tracking-tight">Recent Chronicles & Essays</h2>
                <button
                  onClick={() => navigateTo('blog')}
                  className="text-xs font-bold text-emerald-800 inline-flex items-center gap-0.5 hover:translate-x-1 duration-200 text-right shrink-0"
                >
                  Read All Essays
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
            <section id="homepage-newsletter" className="mx-4 bg-stone-100/60 border border-stone-250 p-6 md:p-10 rounded-[32px] font-sans flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 shadow-sm">
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
        )}

        {/* Tab 2: About full page content */}
        {currentRoute === 'about' && (
          <div 
            className="relative max-w-5xl mx-auto px-6 py-12 md:py-16 rounded-3xl overflow-hidden bg-cover bg-center shadow-lg font-sans border border-stone-200"
            style={{ backgroundImage: `url('https://i.postimg.cc/y8QrWf1v/Chat-GPT-Image-Jun-7-2026-08-35-28-PM.png')` }}
          >
            {/* Elegant overlay/vignette mask ensuring high contrast and modern feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-stone-950/70 z-0" />

            <div className="relative z-10 space-y-12 max-w-4xl mx-auto">
              
              <div className="space-y-4 text-center">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-100 bg-emerald-950/80 backdrop-blur-md border border-emerald-800/30 px-3 py-1.5 rounded-full shadow-sm inline-block">
                  Background History
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md uppercase">About DawaKienyeji</h1>
                <p className="text-stone-100 text-sm md:text-base max-w-xl mx-auto drop-shadow font-medium leading-relaxed">
                  Blending ancient Gĩkũyũ botanical medicine, indigenous highland preservation, and modern AI models.
                </p>
              </div>

              <div id="preserving-ethnobotanical-chronicles-card" className="bg-white border border-stone-250 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                <h2 className="text-xl font-extrabold text-emerald-950 tracking-tight leading-tight">Preserving Ethnobotanical Chronicles</h2>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-normal">
                  Kikuyu herbal medicine <span className="italic">Dawa za Kienyeji</span> has existed under forest canopies for centuries. In our hills, trees like the peppery <strong className="font-bold">Mũthĩga</strong> (<span className="italic">Warburgia ugandensis</span>) served as our emergency clinics for colds and fevers. Urination issues in older men were solved with tea brewed from the reddish bark of <strong className="font-bold">Mũcorai</strong> (<span className="italic">Prunus africana</span> / Pygeum). Toothaches were temporarily anesthetized with Sodom Apple (<strong className="font-bold">Mũtongu</strong>) roots. Saps from sacred Strangler Figs (<strong className="font-bold">Mũgũmo</strong>) served as instant surgical coagulants on cuts.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-stone-100 border border-stone-200 rounded-2xl">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-stone-900 text-xs flex items-center gap-1.5 uppercase">
                      <Landmark className="w-4 h-4 text-emerald-800" />
                      Our Integrity Philosophy
                    </h3>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-normal">We prioritize clinical safety and exact species mapping. Traditional heritage is respected inside our parameters to ensure children or pregnant mothers avoid toxic saps.</p>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-stone-900 text-xs flex items-center gap-1.5 uppercase">
                      <TreePine className="w-4 h-4 text-emerald-800" />
                      Ecology & Sustainability
                    </h3>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-normal">We mandate vertical Opposite Striping harvesting so that bark trees remain alive and forests continue to thrive. We are ecological preservationists first.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase text-emerald-850">The Role of RAG Technology</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-semibold">
                    With the passing of elder practitioners <span className="italic">Muthamaki wa Mithĩga</span>, oral records suffer memory erosion. This website serves as a clinical digital library. Our conversational AI companion—<strong className="font-bold">DawaBot</strong>—utilizes Retrieval-Augmented Generation (RAG) mapped directly containing verified Kikuyu botanical records to ensure exact scientific and traditional answers. In doing so, we don't duplicate books; we teach young Kenyans their botanical lineage.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Plants catalog (Main browsable cards) */}
        {currentRoute === 'plants' && <PlantsCatalog />}

        {/* Tab 4: Traditional Remedies listing */}
        {currentRoute === 'remedies' && <TraditionalRemedies />}

        {/* Tab 5: Research Knowledge Base articles */}
        {currentRoute === 'knowledge' && <ResearchKnowledge />}

        {/* Tab 6: Blog Feed list */}
        {currentRoute === 'blog' && <BlogFeed />}

        {/* Tab 7: Contact Page */}
        {currentRoute === 'contact' && <ContactPage />}

        {/* Tab 8: Security Admin dashboard */}
        {currentRoute === 'admin' && <AdminDashboard />}

      </main>

      <footer id="main-footer" className="bg-[#0a1e15] text-white border-t-2 border-[#D4A017]/30 mt-20 font-sans p-8 md:p-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-[#1a3a2a]">
          
          {/* Column 1: Website Branding & Philosophy. Occupies 3 grid cols on large screens. */}
          <div className="lg:col-span-3 space-y-5">
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

          {/* Column 2: Navigation Links (Home, About, Herbal Plants, Traditional Remedies) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold tracking-widest text-[#D4A017] uppercase border-b border-[#1a3a2a] pb-2 font-sans">Navigation</h4>
            <ul className="flex flex-col gap-3 text-xs md:text-sm font-semibold">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>About</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('plants')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>Herbal Plants</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('remedies')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>Traditional Remedies</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Knowledge & Research Links (Knowledge Base, Blog, Ask DawaBot, Contact) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold tracking-widest text-[#D4A017] uppercase border-b border-[#1a3a2a] pb-2 font-sans">Knowledge & Research</h4>
            <ul className="flex flex-col gap-3 text-xs md:text-sm font-semibold">
              <li>
                <button 
                  onClick={() => navigateTo('knowledge')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>Knowledge Base</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('blog')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>Blog</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('chatbot')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span className="font-bold text-[#D4A017] hover:underline hover:decoration-wavy">Get Help</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="group flex items-center gap-1.5 text-white hover:text-[#D4A017] transition-all duration-300 text-left cursor-pointer font-medium hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A017] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <span>Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information. Occupies 3 grid cols on large screens. */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold tracking-widest text-[#D4A017] uppercase border-b border-[#1a3a2a] pb-2 font-sans">Nursery & Highlands</h4>
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
                <span>info@dawakienyenji.com</span>
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
                  <span className="text-[9px] uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">{pm.category}</span>
                  <h3 className="text-xl font-extrabold text-stone-950 mt-1 uppercase leading-none">{pm.kikuyuName}</h3>
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
