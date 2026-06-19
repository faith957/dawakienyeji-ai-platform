import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Bot, CornerDownLeft, Volume2, Mic, MicOff, Sun, Moon, 
  Trash2, Copy, Check, ThumbsUp, ThumbsDown, ArrowLeft, Leaf, AlertCircle, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { ChatMessage, ChatSession } from "../types";
import { postChat, sendChatFeedback } from "../utils/api";
import { useLanguage } from "../utils/LanguageContext";

interface ChatbotPageProps {
  onBackToHome: () => void;
}

const VOICE_LANGUAGES = [
  { id: "en", code: "en-US", name: "English", flag: "🇬🇧", label: "English" },
  { id: "sw", code: "sw-KE", name: "Kiswahili", flag: "🇰🇪", label: "Kiswahili" },
  { id: "ki", code: "sw-KE", name: "Gĩkũyũ / Kikuyu", flag: "⛰️", label: "Gĩkũyũ" },
  { id: "fr", code: "fr-FR", name: "Français", flag: "🇫🇷", label: "Français" }
];

const getWelcomeText = (lang: string) => {
  switch (lang) {
    case "sw":
      return "Karibu kwenye msaada wa DawaBot. Uliza chochote kuhusu mazingira ya mimea ya tiba, tiba za asili, au maarifa ya mitishamba ya Gĩkũyũ. Unaweza kuuliza kuhusu mimea maalum kama vile MŨTHĨGA, MŨTONGU, au MŨCOROI, au kuulizia dalili mbalimbali kama maumivu ya tumbo au homa.";
    case "ki":
      return "Ũhoro mwega, ndari-inĩ ya NdawaBot. Ũria kĩndũ o gĩothe kĩĩgĩĩ mĩgũgũ ya tawa na kĩĩgĩĩ mĩthĩga ya tene na ũgĩ wa gĩkũyũ. Gĩmia wandĩke kĩĩgĩĩ mĩthĩga ta MŨTHĨGA, MŨTONGU, kana MŨCOROI, kana mĩrimu ya nda na homa.";
    case "fr":
      return "Bienvenue dans l'assistant DawaBot. Posez toutes vos questions sur les plantes médicinales, les remèdes traditionnels ou les connaissances botaniques de Gĩkũyũ. Interrogez notre base de données sur des plantes comme MŨTHĨGA, MŨTONGU ou MŨCOROI, ou posez des questions sur des maux comme les douleurs abdominales ou la fièvre.";
    default:
      return "Welcome to the DawaBot botanical assistant. Ask anything about medicinal plants, herbal remedies, traditional medicine, or Gĩkũyũ botanical knowledge. Query directly about specific plants like MŨTHĨGA, MŨTONGU, or MŨCOROI, or ask about ailments like stomach pain or fever.";
  }
};

export default function ChatbotPage({ onBackToHome }: ChatbotPageProps) {
  const { language, t } = useLanguage();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [msgId: string]: 'good' | 'bad' }>({});
  const [voiceLang, setVoiceLang] = useState(VOICE_LANGUAGES[0]);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Keep references updated for async speech callbacks to prevent closures tearing down
  const sessionsRef = useRef<ChatSession[]>([]);
  const currentSessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  useEffect(() => {
    currentSessionIdRef.current = currentSessionId;
  }, [currentSessionId]);

  // Synchronize Voice Language list with currently active website language context
  useEffect(() => {
    const matched = VOICE_LANGUAGES.find((lang) => lang.id === language);
    if (matched) {
      setVoiceLang(matched);
    }
  }, [language]);

  // Auto-translate welcome/intro messages in existing default or empty sessions when website language changes in realtime
  useEffect(() => {
    setSessions(prev => prev.map(s => {
      return {
        ...s,
        messages: s.messages.map(m => {
          if (m.id === 'welcome' || m.id === 'welcome-reset' || m.id.startsWith('welcome-s-')) {
            return {
              ...m,
              text: getWelcomeText(language)
            };
          }
          return m;
        })
      };
    }));
  }, [language]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = voiceLang.code;
      
      rec.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text && text.trim()) {
          setInputText(text);
          // Automatically trigger send message to DawaBot with transcribed text
          handleSendMessageWithRefs(text);
        }
        setIsListening(false);
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
        if (e.error === "not-allowed") {
          setVoiceError("Microphone access permission was denied. Please check your browser address bar permissions or iframe constraints.");
        } else if (e.error === "no-speech") {
          setVoiceError("No voice was detected. Please try speaking again closer to the mic.");
        } else {
          setVoiceError(`Voice session error: ${e.error || "failed to capture sound"}`);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    } else {
      console.warn("Web SpeechRecognition is not natively supported in this browser environment");
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, [voiceLang.code, language]);

  // Initialize state with default session on first mount or load from persistent storage
  useEffect(() => {
    const savedSessions = localStorage.getItem("dawa_chat_sessions");
    const savedActiveId = localStorage.getItem("dawa_current_session_id");
    
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          if (savedActiveId && parsed.some(s => s.id === savedActiveId)) {
            setCurrentSessionId(savedActiveId);
          } else {
            setCurrentSessionId(parsed[0].id);
          }
          return;
        }
      } catch (err) {
        console.error("Failed to parse saved chat sessions:", err);
      }
    }

    const defaultSessionId = 's-default';
    const initialSession: ChatSession = {
      id: defaultSessionId,
      title: "Botanical Wisdom Chat",
      messages: []
    };
    setSessions([initialSession]);
    setCurrentSessionId(defaultSessionId);
  }, []);

  // Persist sessions to localStorage database when updated
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("dawa_chat_sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  // Persist active session id
  useEffect(() => {
    if (currentSessionId) {
      localStorage.setItem("dawa_current_session_id", currentSessionId);
    }
  }, [currentSessionId]);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, isTyping]);

  const activeSession = sessions.find(s => s.id === currentSessionId);
  const activeMessages = activeSession ? activeSession.messages : [];

  const handleStartVoice = () => {
    if (!recognitionRef.current) {
      setVoiceError("Speech-to-text is not supported directly in this browser frame or sandbox. Please type your query.");
      return;
    }
    setVoiceError(null);
    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err: any) {
        console.error("Microphone trigger error:", err);
        setVoiceError("Could not access physical microphone. Verify device permissions.");
        setIsListening(false);
      }
    }
  };

  const handleSendMessageWithRefs = async (textToSend: string) => {
    const activeId = currentSessionIdRef.current;
    if (!textToSend.trim() || !activeId) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update active session with user message
    setSessions(prev => prev.map(s => {
      if (s.id === activeId) {
        return { ...s, messages: [...s.messages, userMsg] };
      }
      return s;
    }));

    setInputText("");
    setIsTyping(true);
    setVoiceError(null);

    try {
      const currentSessionSnapshot = sessionsRef.current.find(s => s.id === activeId);
      const historyMsg = currentSessionSnapshot ? currentSessionSnapshot.messages : [];

      const result = await postChat(historyMsg, textToSend, language);

      const botMsg: ChatMessage = {
        id: result.logId || `msg-bot-${Date.now()}`,
        role: 'model',
        text: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: result.citations
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeId) {
          const title = s.messages.length === 1 ? (textToSend.slice(0, 24) + "...") : s.title;
          return {
            ...s,
            title,
            messages: [...s.messages, botMsg]
          };
        }
        return s;
      }));

    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'model',
        text: "I encountered an error querying the database. Please verify your connection or refresh. (Make sure you configured standard GEMINI_API_KEY in the Secrets panel in AI Studio).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => {
        if (s.id === activeId) {
          return { ...s, messages: [...s.messages, errorMsg] };
        }
        return s;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    await handleSendMessageWithRefs(textToSend);
  };

  const handleCreateNewSession = () => {
    const newId = `s-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: "New Herb Inquiry",
      messages: []
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newId);
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to delete all current chat sessions?")) {
      const defaultSessionId = 's-default';
      const initialSession: ChatSession = {
        id: defaultSessionId,
        title: "Botanical Wisdom Chat",
        messages: []
      };
      setSessions([initialSession]);
      setCurrentSessionId(defaultSessionId);
      localStorage.removeItem("dawa_chat_sessions");
      localStorage.removeItem("dawa_current_session_id");
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRating = async (msgId: string, value: 'good' | 'bad') => {
    setRatings(prev => ({ ...prev, [msgId]: value }));
    try {
      await sendChatFeedback(msgId, value);
    } catch (e) {
      console.log("Feedback failed:", e);
    }
  };

  return (
    <div id="chatbot-root" className={`min-h-screen ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-stone-50 text-emerald-950'} bg-grain transition-colors duration-300 flex flex-col md:flex-row font-sans`}>
      
      {/* Session Navigation Bar / Sidebar */}
      <div id="side-pnl" className={`w-full md:w-80 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-stone-100 border-stone-200'} border-b md:border-b-0 md:border-r flex flex-col p-4 shrink-0`}>
        <div className="flex items-center justify-between mb-6">
          <button 
            id="back-home-btn"
            onClick={onBackToHome} 
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              isDark 
                ? 'border-zinc-800 text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 hover:text-white' 
                : 'border-stone-300 text-emerald-900 bg-white hover:bg-stone-200'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Home Website
          </button>

          <button
            id="theme-toggle-btn"
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg border transition-all ${
              isDark ? 'border-zinc-800 bg-zinc-800 text-yellow-400' : 'border-stone-300 bg-white text-emerald-900'
            }`}
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-emerald-950 flex items-center justify-center p-0.5 border border-amber-500/20 shrink-0">
            <img 
              src="https://i.postimg.cc/VkwT0rck/Chat-GPT-Image-Jun-7-2026-09-17-26-PM.png" 
              alt="DawaBot Logo" 
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">{t("chat.dawaBotAssistant") || "DawaBot Assistant"}</h1>
            <p className="text-[10px] opacity-70">{t("chat.ethnobotanyKB") || "Ethnobotany Knowledge Base"}</p>
          </div>
        </div>

        <button
          id="new-session-btn"
          onClick={handleCreateNewSession}
          className="w-full mb-4 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-lg font-semibold text-xs transition duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <Leaf className="w-3.5 h-3.5 animate-leaf-hover" />
          {t("chat.newHerbSession") || "New Herb Session"}
        </button>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-48 md:max-h-full">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/80 mb-2">{t("chat.historySessions") || "History Sessions"}</p>
          {sessions.map(s => {
            const isActive = s.id === currentSessionId;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSessionId(s.id)}
                className={`w-full text-left p-3 rounded-lg text-xs font-semibold truncate transition duration-150 ${
                  isActive 
                    ? 'bg-emerald-700 text-white shadow-sm' 
                    : isDark ? 'bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/80' : 'bg-white hover:bg-stone-200 text-emerald-950 border border-stone-200/50'
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-stone-300/40 md:border-t flex items-center justify-between">
          <p className="text-[10px] opacity-60">{t("chat.statusSecure") || "Status: Secure Sandbox"}</p>
          <button
            id="clear-hist-btn"
            onClick={handleClearHistory}
            className="text-[10px] text-red-600 hover:text-red-500 font-bold flex items-center gap-1 transition"
          >
            <Trash2 className="w-3 h-3" />
            {t("chat.clearSessions") || "Clear Sessions"}
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div id="chat-scroller" className="flex-1 flex flex-col min-h-0 relative">
        {/* Banner warning if offline mode fell back */}
        <div className={`p-2.5 text-center text-xs border-b ${
          isDark ? 'bg-zinc-900/80 border-amber-950 text-amber-500' : 'bg-amber-50/70 border-amber-100 text-amber-800'
        } flex items-center justify-center gap-2`}>
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{t("chat.poweredByRAG") || "Powered by RAG directly aligned to traditional Kikuyu Ethnobotany database."}</span>
        </div>

        {/* Conversation flow arena */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Dynamic Welcome Message Header (appears only once at top of feed) */}
            <div className={`p-6 rounded-3xl border text-left space-y-3 ${
              isDark 
                ? 'bg-zinc-900/40 border-zinc-850 text-zinc-100' 
                : 'bg-emerald-50/40 border-emerald-100/60 text-emerald-950'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-emerald-950 flex items-center justify-center p-0.5 border border-amber-500/20 shrink-0">
                  <img 
                    src="https://i.postimg.cc/VkwT0rck/Chat-GPT-Image-Jun-7-2026-09-17-26-PM.png" 
                    alt="DawaBot Logo" 
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h2 className="text-sm font-bold tracking-tight leading-none uppercase">
                  {language === 'sw' ? 'Karibu kwenye DawaBot' :
                   language === 'ki' ? 'Ũhoro mwega na kũgĩa thome wa DawaBot' :
                   language === 'fr' ? 'Bienvenue sur DawaBot' :
                   'Welcome to DawaBot'}
                </h2>
              </div>
              
              <p className="text-xs leading-relaxed font-semibold opacity-90">
                {language === 'sw' ? 
                 'Mimi ni msaidizi wako wa AI kwa ajili ya DawaKienyeji. Uliza maswali kuhusu mimea ya kitiba, tiba za asili, maarifa ya ethnobotaniki, mbinu za uhifadhi, na habari zilizopo kwenye hifadhi ya maarifa ya DawaKienyeji.' :
                 language === 'ki' ? 
                 'Nĩ niĩ mũteithia waku wa AI wa muthemba wa DawaKienyeji. Ũria kĩndũ kĩĩgĩĩ mĩthĩga ya tene, mĩrimu ya nda, ũrĩndĩri wa mĩgũmo, na ũgĩ wothe rũrĩ thĩnĩ wa DawaKienyeji.' :
                 language === 'fr' ? 
                 'Je suis votre assistant IA pour DawaKienyeji. Posez vos questions sur les plantes médicinales, les remèdes traditionnels, les connaissances ethnobotaniques, les pratiques de conservation et les informations disponibles dans la base de connaissances DawaKienyeji.' :
                 'I am your AI assistant for DawaKienyeji. Ask questions about medicinal plants, traditional remedies, ethnobotanical knowledge, conservation practices, and information available in the DawaKienyeji knowledge base.'}
              </p>
            </div>

            <AnimatePresence>
              {activeMessages.map((msg, i) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-3.5 ${isUser ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Character Avatar */}
                    <div className={`w-8 h-8 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold ${
                      isUser 
                        ? 'bg-emerald-600 text-white' 
                        : isDark ? 'bg-zinc-850 text-emerald-400 border border-zinc-700' : 'bg-emerald-950 text-emerald-800 p-0.5 border border-amber-500/20'
                    }`}>
                      {isUser ? "ME" : (
                        <img 
                          src="https://i.postimg.cc/VkwT0rck/Chat-GPT-Image-Jun-7-2026-09-17-26-PM.png" 
                          alt="DawaBot Logo" 
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>

                    {/* Chat Bubble card */}
                    <div className="max-w-[85%] md:max-w-[75%] space-y-2">
                      <div className={`p-4 rounded-2xl shadow-sm leading-relaxed text-sm ${
                        isUser 
                          ? 'bg-emerald-700 text-white rounded-tr-none' 
                          : isDark 
                            ? 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none' 
                            : 'bg-white border border-stone-200 text-emerald-950 rounded-tl-none'
                      }`}>
                        
                        {/* Markdown Renderer with container classes */}
                        <div className="prose prose-emerald max-w-none break-words text-inherit leading-relaxed space-y-2.5">
                          <Markdown>{msg.text}</Markdown>
                        </div>

                        {/* Plant citations returned by RAG node */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="mt-3.5 pt-2.5 border-t border-emerald-600/10 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] uppercase font-semibold letter-spacing-1.2 opacity-60">Database citations:</span>
                            {msg.citations.map((cite, cIdx) => (
                              <span 
                                key={cIdx} 
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isUser 
                                    ? 'bg-emerald-800 text-emerald-100' 
                                    : isDark ? 'bg-zinc-800 text-emerald-400' : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                                }`}
                              >
                                {cite}
                              </span>
                            ))}
                          </div>
                        )}
                        


                      </div>

                      {/* Bubble Actions bar */}
                      <div className={`flex items-center gap-3 text-[10px] opacity-60 px-1 ${isUser ? 'justify-end' : ''}`}>
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleCopyText(msg.text, msg.id)}
                              className="hover:text-emerald-500 p-0.5 rounded transition flex items-center gap-0.5"
                              title="Copy to clipboard"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-2.5 h-2.5 text-green-500" />
                                  <span className="text-green-500">{t("chat.copied") || "Copied"}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-2.5 h-2.5" />
                                  <span>{t("chat.copy") || "Copy"}</span>
                                </>
                              )}
                            </button>
                            
                            {/* Thumbs up / down feedback logs for admin metrics */}
                            <span className="opacity-40">|</span>
                            <button 
                              onClick={() => handleRating(msg.id, 'good')}
                              className={`p-0.5 rounded transition ${ratings[msg.id] === 'good' ? 'text-green-500' : 'hover:text-green-500'}`}
                              title="Helpful response"
                            >
                              <ThumbsUp className="w-2.5 h-2.5" />
                            </button>
                            <button 
                              onClick={() => handleRating(msg.id, 'bad')}
                              className={`p-0.5 rounded transition ${ratings[msg.id] === 'bad' ? 'text-red-500' : 'hover:text-red-500'}`}
                              title="Not helpful"
                            >
                              <ThumbsDown className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typist loading dots */}
            {isTyping && (
              <div className="flex items-start gap-3.5">
                <div className={`w-8 h-8 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold ${
                  isDark ? 'bg-zinc-850 text-emerald-400 border border-zinc-700' : 'bg-emerald-950 text-emerald-800 p-0.5 border border-amber-500/20'
                }`}>
                  <img 
                    src="https://i.postimg.cc/VkwT0rck/Chat-GPT-Image-Jun-7-2026-09-17-26-PM.png" 
                    alt="DawaBot Logo" 
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className={`p-4 rounded-2xl rounded-tl-none text-sm border ${
                  isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-stone-200 text-emerald-800'
                }`}>
                  <div className="flex items-center gap-1.5 py-1 px-1.5">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[10px] opacity-60">DawaBot is analyzing indigenous archives...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input panel deck */}
        <div className={`p-4 py-5 md:py-6 md:pb-8 border-t ${
          isDark ? 'bg-zinc-900 border-zinc-850' : 'bg-stone-50 border-stone-200'
        } sticky bottom-0 z-10 shadow-[0_-8px_32px_rgba(0,0,0,0.04)]`}>
          <div className="max-w-3xl mx-auto space-y-3">
            
            {/* Voice error alert */}
            {voiceError && (
              <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-red-800 flex items-center justify-between text-[11px] font-semibold animate-fade-in shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{voiceError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVoiceError(null);
                    handleStartVoice();
                  }}
                  className="px-2.5 py-1 text-red-700 bg-white hover:bg-neutral-55 active:bg-neutral-100 border border-red-200 rounded font-bold uppercase tracking-wider text-[9px] cursor-pointer"
                >
                  Retry Voice
                </button>
              </div>
            )}

            {/* Glowing active listening overlay / status wave */}
            <AnimatePresence>
              {isListening && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 border overflow-hidden ${
                    isDark ? 'bg-zinc-950/90 border-emerald-900/40 text-emerald-200' : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                  } shadow-md`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <span className="h-3 w-3 rounded-full bg-rose-600 block animate-ping absolute -top-0.5 -left-0.5"></span>
                      <span className="h-2 w-2 rounded-full bg-rose-600 block"></span>
                    </div>
                    <div className="space-y-0.5 text-left">
                      <p className="text-xs font-black uppercase tracking-wider animate-pulse text-rose-500">Listening...</p>
                      <p className="text-[10px] opacity-75">Speak details of standard herbs (e.g. Mũthĩga, Mũtongu, or remedies)</p>
                    </div>
                  </div>

                  {/* Simulated interactive Soundwave representation */}
                  <div className="flex items-center gap-0.5 h-6">
                    <motion.div animate={{ height: [4, 18, 4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1 bg-rose-500 rounded-full" />
                    <motion.div animate={{ height: [6, 22, 6] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-emerald-600 rounded-full" />
                    <motion.div animate={{ height: [4, 14, 4] }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.2 }} className="w-1 bg-yellow-500 rounded-full" />
                    <motion.div animate={{ height: [8, 24, 8] }} transition={{ repeat: Infinity, duration: 0.4, delay: 0.05 }} className="w-1 bg-rose-600 rounded-full" />
                    <motion.div animate={{ height: [5, 16, 5] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} className="w-1 bg-[#D4A017] rounded-full" />
                    <motion.div animate={{ height: [6, 20, 6] }} transition={{ repeat: Infinity, duration: 0.55, delay: 0.25 }} className="w-1 bg-emerald-600 rounded-full" />
                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.3 }} className="w-1 bg-red-500 rounded-full" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsListening(false);
                      recognitionRef.current?.stop();
                    }}
                    className="px-2.5 py-1 rounded bg-rose-600 text-white font-black text-[10px] uppercase hover:bg-rose-700 transition cursor-pointer"
                  >
                    Cancel speaking
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              id="chat-send-frm"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                autoFocus
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder=""
                className={`w-full py-4 pl-4 pr-24 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-700/60 transition-all text-xs md:text-sm shadow-inner ${
                  isDark 
                    ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500' 
                    : 'bg-white border-stone-300 text-emerald-950 placeholder-stone-500'
                }`}
              />

              <div className="absolute right-2 flex items-center gap-1.5">
                {/* Advanced dictation toggle button */}
                <button
                  type="button"
                  onClick={handleStartVoice}
                  className={`p-2 rounded-lg transition-all shadow-md transform active:scale-95 duration-200 relative flex items-center justify-center cursor-pointer ${
                    isListening 
                      ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/30' 
                      : isDark ? 'text-emerald-400 bg-zinc-800 hover:bg-zinc-700 hover:text-white' : 'text-emerald-950 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-950'
                  }`}
                  title={isListening ? "Stop listening and transcribe" : "Click to speak in real-time"}
                >
                  {isListening ? (
                    <Mic className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '3s' }} />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2 rounded-lg transition-all shadow-md cursor-pointer ${
                    inputText.trim()
                      ? 'bg-emerald-700 hover:bg-emerald-650 text-white active:scale-95 transform'
                      : isDark ? 'bg-zinc-800 text-zinc-650' : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            <p className="text-[10px] text-center opacity-50 mt-2">
              DawaBot shares authentic wisdom but does not replace clinical consultation. Always use precautions.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
