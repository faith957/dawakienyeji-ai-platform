import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Bot, CornerDownLeft, Volume2, Mic, MicOff, Sun, Moon, 
  Trash2, Copy, Check, ThumbsUp, ThumbsDown, ArrowLeft, Leaf, AlertCircle, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { ChatMessage, ChatSession } from "../types";
import { postChat, sendChatFeedback } from "../utils/api";

const SUGGESTED_QUESTIONS = [
  "What is MŨTHĨGA used for?",
  "Which herbs treat stomach ache?",
  "What is the scientific name of MŨTONGU?",
  "Which plants are used for fever?",
  "Explain traditional uses of Warburgia ugandensis."
];

interface ChatbotPageProps {
  onBackToHome: () => void;
}

const VOICE_LANGUAGES = [
  { id: "en", code: "en-US", name: "English", flag: "🇬🇧", label: "English" },
  { id: "sw", code: "sw-KE", name: "Kiswahili", flag: "🇰🇪", label: "Kiswahili" },
  { id: "ki", code: "sw-KE", name: "Gĩkũyũ / Kikuyu", flag: "⛰️", label: "Gĩkũyũ" },
  { id: "fr", code: "fr-FR", name: "Français", flag: "🇫🇷", label: "Français" }
];

export default function ChatbotPage({ onBackToHome }: ChatbotPageProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [msgId: string]: 'good' | 'bad' }>({});
  const [voiceLang, setVoiceLang] = useState(VOICE_LANGUAGES[0]);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = voiceLang.code;
      
      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text && text.trim()) {
          setInputText(text);
          // Automatically trigger send message to DawaBot with transcribed text
          handleSendMessage(text);
        }
        setIsListening(false);
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [voiceLang, sessions, currentSessionId]);

  // Initialize state with default session
  useEffect(() => {
    const defaultSessionId = 's-default';
    const initialSession: ChatSession = {
      id: defaultSessionId,
      title: "Botanical Wisdom Chat",
      messages: [
        {
          id: 'welcome',
          role: 'model',
          text: "Hello! I am DawaBot. Ask me anything about medicinal plants, herbal remedies, traditional medicine, or Gĩkũyũ botanical knowledge.\n\nYou can query about specific plants like MŨTHĨGA, MŨTONGU, or MŨCORAI, or ask about ailments like stomach pain or fever.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: SUGGESTED_QUESTIONS
        }
      ]
    };
    setSessions([initialSession]);
    setCurrentSessionId(defaultSessionId);
  }, []);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, isTyping]);

  const activeSession = sessions.find(s => s.id === currentSessionId);
  const activeMessages = activeSession ? activeSession.messages : [];

  const handleStartVoice = () => {
    if (!recognitionRef.current) {
      alert("Speech-to-text is not supported directly in this browser or environment frame. Please type your query.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || !currentSessionId) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update active session with user message
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return { ...s, messages: [...s.messages, userMsg] };
      }
      return s;
    }));

    setInputText("");
    setIsTyping(true);

    try {
      // Collect current session history
      const currentSessionSnapshot = sessions.find(s => s.id === currentSessionId);
      const historyMsg = currentSessionSnapshot ? currentSessionSnapshot.messages : [];

      const result = await postChat(historyMsg, textToSend);

      const botMsg: ChatMessage = {
        id: result.logId || `msg-bot-${Date.now()}`,
        role: 'model',
        text: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: result.citations
      };

      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          // If the default session only had welcome message, let's rename the tab to the query
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
        if (s.id === currentSessionId) {
          return { ...s, messages: [...s.messages, errorMsg] };
        }
        return s;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleCreateNewSession = () => {
    const newId = `s-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: "New Herb Inquiry",
      messages: [
        {
          id: `welcome-${newId}`,
          role: 'model',
          text: "Welcome to a fresh botanical session. Ask DawaBot about Kikuyu traditional remedies or sustainable harvesting.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: SUGGESTED_QUESTIONS.slice(0, 3)
        }
      ]
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
        messages: [
          {
            id: 'welcome-reset',
            role: 'model',
            text: "Hello! History cleared. I am ready to assist you again with traditional botanical knowledge.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: SUGGESTED_QUESTIONS
          }
        ]
      };
      setSessions([initialSession]);
      setCurrentSessionId(defaultSessionId);
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
          <div className="p-2 bg-emerald-600 rounded-lg text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">DawaBot Assistant</h1>
            <p className="text-[10px] opacity-70">Ethnobotany Knowledge Base</p>
          </div>
        </div>

        <button
          id="new-session-btn"
          onClick={handleCreateNewSession}
          className="w-full mb-4 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-lg font-semibold text-xs transition duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <Leaf className="w-3.5 h-3.5 animate-leaf-hover" />
          New Herb Session
        </button>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-48 md:max-h-full">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/80 mb-2">History Sessions</p>
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
          <p className="text-[10px] opacity-60">Status: Secure Sandbox</p>
          <button
            id="clear-hist-btn"
            onClick={handleClearHistory}
            className="text-[10px] text-red-600 hover:text-red-500 font-bold flex items-center gap-1 transition"
          >
            <Trash2 className="w-3 h-3" />
            Clear Sessions
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
          <span>Powered by RAG directly aligned to traditional <span className="font-bold">Kikuyu Ethnobotany</span> database.</span>
        </div>

        {/* Conversation flow arena */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            
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
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                      isUser 
                        ? 'bg-emerald-600 text-white' 
                        : isDark ? 'bg-zinc-800 text-emerald-400' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {isUser ? "ME" : <Bot className="w-4 h-4" />}
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
                        
                        {/* Suggestion pills specifically inside bot greetings */}
                        {msg.suggestions && msg.suggestions.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-emerald-600/10 space-y-2">
                            <p className="text-[11px] font-bold opacity-75 flex items-center gap-1">
                              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                              Select a sample question to query immediately:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.suggestions.map((suggestion, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleSendMessage(suggestion)}
                                  className={`text-[11px] font-medium text-left px-3 py-1.5 rounded-lg border transition duration-150 ${
                                    isDark 
                                      ? 'border-zinc-800 hover:border-emerald-600 bg-zinc-800/40 text-emerald-400 hover:text-white' 
                                      : 'border-stone-200 hover:border-emerald-600 bg-stone-50 hover:bg-emerald-50 text-emerald-900 transition'
                                  }`}
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
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
                                  <span className="text-green-500">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-2.5 h-2.5" />
                                  <span>Copy</span>
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-zinc-800 text-emerald-400' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  <Bot className="w-4 h-4" />
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
        <div className={`p-4 border-t ${
          isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-stone-100/70 border-stone-200'
        } backdrop-blur-md sticky bottom-0 z-10`}>
          <div className="max-w-3xl mx-auto space-y-3">
            
            {/* Real-time Voice Controller Dashboard */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-1.5 border-b border-dashed border-emerald-950/10">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-zinc-400' : 'text-emerald-900'}`}>
                  Speech Language:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {VOICE_LANGUAGES.map((lang) => {
                    const isSel = voiceLang.id === lang.id;
                    return (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => {
                          setVoiceLang(lang);
                          if (isListening) {
                            recognitionRef.current?.stop();
                            setIsListening(false);
                            setTimeout(() => {
                              setIsListening(true);
                              recognitionRef.current?.start();
                            }, 300);
                          }
                        }}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 transition-all duration-250 ${
                          isSel 
                            ? 'bg-emerald-700 text-white shadow-sm scale-105' 
                            : isDark ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-white hover:bg-stone-200 text-emerald-900 border border-stone-200'
                        }`}
                        title={`Speak in ${lang.name}`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="text-[10px] opacity-70 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Language: <strong className="font-extrabold text-[#D4A017]">{voiceLang.name}</strong></span>
              </div>
            </div>

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
                    className="px-2.5 py-1 rounded bg-rose-600 text-white font-black text-[10px] uppercase hover:bg-rose-700 transition"
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
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? "Listening silently... speak now" : "Ask about MŨTHĨGA, what cures stomach ache, sustainable harvesting..."}
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
                  className={`p-2 rounded-lg transition-all shadow-md transform active:scale-95 duration-200 relative flex items-center justify-center ${
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
                  className={`p-2 rounded-lg transition-all shadow-md ${
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
