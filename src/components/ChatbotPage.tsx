import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Bot, CornerDownLeft, Volume2, Mic, MicOff, Sun, Moon, 
  Trash2, Copy, Check, ThumbsUp, ThumbsDown, ArrowLeft, Leaf, AlertCircle, HelpCircle, X,
  MoreVertical, Pin, LogOut, Lock, Eye, EyeOff, Plus, Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { ChatMessage, ChatSession } from "../types";
import { postChat, sendChatFeedback, signupUser, loginAdmin } from "../utils/api";
import { useLanguage } from "../utils/LanguageContext";
import { INITIAL_HERBS } from "../data/herbalDatabase";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

interface ChatbotPageProps {
  onBackToHome: () => void;
  onNavigateTo?: (route: any) => void;
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

function detectMentionedHerbs(msgText: string, userQueryText?: string, citations?: string[]): typeof INITIAL_HERBS {
  if (citations !== undefined) {
    if (citations.length === 0) return [];
    return INITIAL_HERBS.filter(herb => 
      citations.some(c => c.toLowerCase().includes(herb.kikuyuName.toLowerCase()))
    );
  }

  if (!msgText) return [];
  const lowerMsg = msgText.toLowerCase();
  const lowerQuery = userQueryText ? userQueryText.toLowerCase() : "";

  // Helper to check with clear word boundaries so we don't match substrings incorrectly
  const hasWord = (text: string, term: string) => {
    if (!text || !term) return false;
    const cleanTerm = term.trim().toLowerCase();
    if (!cleanTerm) return false;
    
    // Look for exact term within text
    const idx = text.indexOf(cleanTerm);
    if (idx === -1) return false;

    // Direct check of characters surrounding the match to verify word boundary
    const charBefore = idx > 0 ? text[idx - 1] : " ";
    const charAfter = idx + cleanTerm.length < text.length ? text[idx + cleanTerm.length] : " ";

    // Define characters that do NOT form boundaries (letters, numbers, valid Gĩkũyũ letters/vowels with tildes, etc.)
    const isWordChar = (char: string) => {
      return /[a-zA-Z0-9\u0168\u0169\u0128\u0129\u0169\u0168]/i.test(char);
    };

    return !isWordChar(charBefore) && !isWordChar(charAfter);
  };

  return INITIAL_HERBS.filter(herb => {
    const kName = herb.kikuyuName.toLowerCase();
    const cName = herb.commonName.toLowerCase();
    const sName = herb.scientificName.toLowerCase();

    const matchedInMsg = hasWord(lowerMsg, kName) || hasWord(lowerMsg, cName) || hasWord(lowerMsg, sName);
    const matchedInQuery = lowerQuery ? (hasWord(lowerQuery, kName) || hasWord(lowerQuery, cName) || hasWord(lowerQuery, sName)) : false;

    return matchedInMsg || matchedInQuery;
  });
}

function isBotanicalQuery(userQueryText?: string): boolean {
  const combined = (userQueryText || "").toLowerCase();
  const BOTANICAL_KEYWORDS = [
    "plant", "tree", "herb", "shrub", "flora", "leaf", "leaves", "root", "roots", 
    "bark", "stem", "seed", "seeds", "extract", "remedy", "traditional medicine", 
    "decoction", "infusion", "poultice", "botany", "ethnobotany", "mũgũgũ", "mĩthĩga",
    "dawa", "kienyeji", "mitishamba", "asthma", "cough", "malaria", "indigestion", "pharyngitis"
  ];
  return BOTANICAL_KEYWORDS.some(keyword => combined.includes(keyword));
}

export default function ChatbotPage({ onBackToHome, onNavigateTo }: ChatbotPageProps) {
  const { language, t } = useLanguage();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deletingSessionId, setDeletingSessionId] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3000);
  };
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [msgId: string]: 'good' | 'bad' }>({});
  const [voiceLang, setVoiceLang] = useState(VOICE_LANGUAGES[0]);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingMessageText, setEditingMessageText] = useState("");
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(() => {
    try {
      const saved = localStorage.getItem("dawa_logged_in_user");
      return saved ? JSON.parse(saved) : null;
    } catch (_) {
      return null;
    }
  });

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRepeatPassword, setSignupRepeatPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccessMsg, setLoginSuccessMsg] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeMenuSessionId, setActiveMenuSessionId] = useState<string | null>(null);

  const handleModalSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    setIsSigningUp(true);

    try {
      if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim() || !signupRepeatPassword.trim()) {
        throw new Error("All fields are required. Please fill in Name, Email, Password, and Repeat Password.");
      }

      // Email format verification
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupEmail.trim())) {
        throw new Error("Please enter a valid email address.");
      }

      // Password matching verification
      if (signupPassword !== signupRepeatPassword) {
        throw new Error("Password and Repeat Password must match.");
      }
      
      const data = await signupUser(signupEmail, signupPassword, signupName);
      
      // Hide signup modal and clear fields
      setShowSignupModal(false);
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupRepeatPassword("");
      
      // Automatically transition to the Login Modal
      setLoginEmail(data.email);
      setLoginSuccessMsg("Vault registration successful! Please enter your password to log in and synchronize your chat sessions.");
      setLoginError("");
      setShowLoginModal(true);
      
    } catch (err: any) {
      setSignupError(err.message || "Sign up failed. Please check your details or try a different email.");
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleModalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccessMsg("");
    setIsLoggingIn(true);

    try {
      if (!loginEmail.trim() || !loginPassword.trim()) {
        throw new Error("Please fill in both Email and Password.");
      }

      const emailLower = loginEmail.toLowerCase().trim();
      const data = await loginAdmin(emailLower, loginPassword);
      
      const loggedUser = { 
        email: data.email || emailLower, 
        name: data.name || "DawaKienyeji Member" 
      };
      
      setCurrentUser(loggedUser);

      // Save user to localStorage
      localStorage.setItem("dawa_logged_in_user", JSON.stringify({
        email: loggedUser.email,
        name: loggedUser.name,
        isAdmin: data.isAdmin || false
      }));

      // Persist credentials
      localStorage.setItem("dawa_isAuthenticated", "true");
      localStorage.setItem("dawa_admin_pin", data.adminPin || "");
      localStorage.setItem("dawa_isAdmin", String(data.isAdmin || false));

      // Sync active local guest sessions to cloud
      if (sessions.length > 0) {
        await fetch("/api/user/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: loggedUser.email, sessions }),
        }).catch(e => console.error("Cloud sessions sync error after modal login:", e));
      }

      // Try fetching existing cloud sessions
      const res = await fetch(`/api/user/sessions?email=${encodeURIComponent(loggedUser.email)}`);
      if (res.ok) {
        const sessData = await res.json();
        if (sessData.success && Array.isArray(sessData.sessions) && sessData.sessions.length > 0) {
          setSessions(sessData.sessions);
          const savedActiveId = localStorage.getItem("dawa_current_session_id");
          if (savedActiveId && sessData.sessions.some((s: any) => s.id === savedActiveId)) {
            setCurrentSessionId(savedActiveId);
          } else {
            setCurrentSessionId(sessData.sessions[0].id);
          }
        }
      }

      // Hide login modal and clear password
      setShowLoginModal(false);
      setLoginPassword("");
      setLoginEmail("");
    } catch (err: any) {
      setLoginError(err.message || "Login failed. Please verify your credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const emailLower = (user.email || "").toLowerCase().trim();
      const isAdmin = emailLower === "faith@mojatu.com";
      
      const loggedUser = { 
        email: emailLower, 
        name: user.displayName || "DawaKienyeji Member" 
      };
      
      setCurrentUser(loggedUser);

      // Save user to localStorage
      localStorage.setItem("dawa_logged_in_user", JSON.stringify({
        email: loggedUser.email,
        name: loggedUser.name,
        isAdmin: isAdmin
      }));

      // Persist credentials
      localStorage.setItem("dawa_isAuthenticated", "true");
      if (isAdmin) {
        localStorage.setItem("dawa_admin_pin", "MEMBER_" + emailLower);
        localStorage.setItem("dawa_isAdmin", "true");
      }

      // Sync active local guest sessions to cloud
      if (sessions.length > 0) {
        await fetch("/api/user/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: loggedUser.email, sessions }),
        }).catch(e => console.error("Cloud sessions sync error after Google login:", e));
      }

      // Try fetching existing cloud sessions
      const res = await fetch(`/api/user/sessions?email=${encodeURIComponent(loggedUser.email)}`);
      if (res.ok) {
        const sessData = await res.json();
        if (sessData.success && Array.isArray(sessData.sessions) && sessData.sessions.length > 0) {
          setSessions(sessData.sessions);
          const savedActiveId = localStorage.getItem("dawa_current_session_id");
          if (savedActiveId && sessData.sessions.some((s: any) => s.id === savedActiveId)) {
            setCurrentSessionId(savedActiveId);
          } else {
            setCurrentSessionId(sessData.sessions[0].id);
          }
        }
      }

      setShowLoginModal(false);
    } catch (err: any) {
      if (err?.code === 'auth/unauthorized-domain' || (err?.message && err.message.includes('unauthorized-domain'))) {
        setLoginError(`Domain Unauthorized. Please add "${window.location.hostname}" to Firebase Console -> Authentication -> Settings -> Authorized Domains.`);
      } else {
        setLoginError(err.message || "Google sign in failed.");
      }
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to sign out and clear your active session keys?")) {
      setCurrentUser(null);
      localStorage.removeItem("dawa_logged_in_user");
      localStorage.removeItem("dawa_isAuthenticated");
      localStorage.removeItem("dawa_admin_pin");
      localStorage.removeItem("dawa_isAdmin");
      localStorage.removeItem("dawa_chat_sessions");
      localStorage.removeItem("dawa_current_session_id");

      // Reset sessions to default
      const defaultSessionId = 's-default';
      setSessions([{
        id: defaultSessionId,
        title: "DawaBot",
        messages: []
      }]);
      setCurrentSessionId(defaultSessionId);

      if (onBackToHome) {
        onBackToHome();
      }
    }
  };
  
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
    const checkAndSync = async () => {
      const savedUserStr = localStorage.getItem("dawa_logged_in_user");
      if (savedUserStr) {
        try {
          const user = JSON.parse(savedUserStr);
          if (user && user.email) {
            const res = await fetch(`/api/user/sessions?email=${encodeURIComponent(user.email)}`);
            if (res.ok) {
              const data = await res.json();
              if (data.success && Array.isArray(data.sessions) && data.sessions.length > 0) {
                setSessions(data.sessions);
                const savedActiveId = localStorage.getItem("dawa_current_session_id");
                if (savedActiveId && data.sessions.some((s: any) => s.id === savedActiveId)) {
                  setCurrentSessionId(savedActiveId);
                } else {
                  setCurrentSessionId(data.sessions[0].id);
                }
                return;
              }
            }
          }
        } catch (e) {
          console.error("Failed to load user cloud sessions:", e);
        }
      }

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
        title: "DawaBot",
        messages: []
      };
      setSessions([initialSession]);
      setCurrentSessionId(defaultSessionId);
    };

    checkAndSync();
  }, []);

  // Persist sessions to localStorage and Cloud database when updated
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("dawa_chat_sessions", JSON.stringify(sessions));
      
      const savedUserStr = localStorage.getItem("dawa_logged_in_user");
      if (savedUserStr) {
        try {
          const user = JSON.parse(savedUserStr);
          if (user && user.email) {
            fetch("/api/user/sessions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: user.email, sessions }),
            }).catch(e => console.error("Cloud vault save failure:", e));
          }
        } catch (_) {}
      }
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
        id: result.logId ? `msg-bot-${result.logId}-${Date.now()}` : `msg-bot-${Date.now()}`,
        role: 'model',
        text: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: result.citations,
        source: result.source
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
        title: "DawaBot",
        messages: []
      };
      setSessions([initialSession]);
      setCurrentSessionId(defaultSessionId);
      localStorage.removeItem("dawa_chat_sessions");
      localStorage.removeItem("dawa_current_session_id");
    }
  };

  const handleEditMessage = async (msgId: string, newText: string) => {
    const activeId = currentSessionIdRef.current;
    if (!newText.trim() || !activeId) return;

    const currentSessionSnapshot = sessionsRef.current.find(s => s.id === activeId);
    if (!currentSessionSnapshot) return;

    const msgIdx = currentSessionSnapshot.messages.findIndex(m => m.id === msgId);
    if (msgIdx === -1) return;

    // Slice prefix history
    const baseHistory = currentSessionSnapshot.messages.slice(0, msgIdx);
    
    const updatedUserMsg: ChatMessage = {
      ...currentSessionSnapshot.messages[msgIdx],
      text: newText
    };

    const historyWithEdit = [...baseHistory, updatedUserMsg];

    setEditingMessageId(null);
    setEditingMessageText("");
    setIsTyping(true);

    // Save history with the edit
    setSessions(prev => prev.map(s => {
      if (s.id === activeId) {
        return {
          ...s,
          messages: historyWithEdit
        };
      }
      return s;
    }));

    try {
      const result = await postChat(historyWithEdit, newText, language);

      const botMsg: ChatMessage = {
        id: result.logId ? `msg-bot-${result.logId}-${Date.now()}` : `msg-bot-${Date.now()}`,
        role: 'model',
        text: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: result.citations,
        source: result.source
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeId) {
          return {
            ...s,
            messages: [...historyWithEdit, botMsg]
          };
        }
        return s;
      }));

    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'model',
        text: "I encountered an error querying the database for your updated query. Please verify your connection or refresh.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => {
        if (s.id === activeId) {
          return { ...s, messages: [...historyWithEdit, errorMsg] };
        }
        return s;
      }));
    } finally {
      setIsTyping(false);
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
            <p className="text-[10px] opacity-70">{t("chat.ethnobotanyKB") || "Traditional Botanical Guide"}</p>
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
          {(() => {
            const sortedSessions = [...sessions].sort((a, b) => {
              const aPinned = !!a.pinned;
              const bPinned = !!b.pinned;
              if (aPinned && !bPinned) return -1;
              if (!aPinned && bPinned) return 1;
              return 0; // maintain default chron order
            });

            return sortedSessions.map(s => {
              const isActive = s.id === currentSessionId;
              const isMenuOpen = activeMenuSessionId === s.id;
              
              const handleShareSession = (e: React.MouseEvent) => {
                e.stopPropagation();
                setActiveMenuSessionId(null);
                try {
                  const shareUrl = `${window.location.origin}/?route=chatbot&session=${s.id}`;
                  
                  // Textarea fallback copy - 100% reliable inside frame sandboxes
                  const textArea = document.createElement("textarea");
                  textArea.value = shareUrl;
                  textArea.style.position = "fixed";
                  document.body.appendChild(textArea);
                  textArea.focus();
                  textArea.select();
                  const successful = document.execCommand('copy');
                  document.body.removeChild(textArea);
                  
                  if (successful) {
                    triggerToast(`Link for "${s.title}" copied to clipboard!`);
                  } else {
                    triggerToast("Failed to copy link. Please copy browser URL.");
                  }
                } catch (err) {
                  triggerToast(`Share code: ${s.id}`);
                }
              };

              const handlePinSession = (e: React.MouseEvent) => {
                e.stopPropagation();
                setActiveMenuSessionId(null);
                const willPin = !s.pinned;
                setSessions(prev => prev.map(item => {
                  if (item.id === s.id) {
                    return { ...item, pinned: willPin };
                  }
                  return item;
                }));
                triggerToast(willPin ? "Chat pinned to top!" : "Chat unpinned!");
              };

              const handleDeleteSession = (e: React.MouseEvent) => {
                e.stopPropagation();
                setActiveMenuSessionId(null);
                setDeletingSessionId(s.id);
              };

              return (
                <div 
                  key={s.id} 
                  className="relative group flex items-center justify-between w-full"
                >
                  <button
                    onClick={() => setCurrentSessionId(s.id)}
                    className={`w-full text-left pl-3 pr-8 py-3 rounded-lg text-xs font-semibold truncate transition duration-150 flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-emerald-700 text-white shadow-sm' 
                        : isDark ? 'bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/80' : 'bg-white hover:bg-stone-200 text-emerald-950 border border-stone-200/50'
                    }`}
                  >
                    <span className="truncate flex items-center gap-1.5 w-full">
                      {s.pinned && <Pin className="w-3 h-3 text-amber-500 shrink-0 transform -rotate-45 fill-amber-500" />}
                      <span className="truncate">{s.title}</span>
                    </span>
                  </button>

                  {/* Three Dots Button */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuSessionId(isMenuOpen ? null : s.id);
                      }}
                      className={`p-1 rounded hover:bg-stone-500/10 transition cursor-pointer ${
                        isActive ? 'text-white/80 hover:text-white' : 'text-stone-500 hover:text-emerald-950'
                      }`}
                      title="Manage session"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                      <>
                        {/* Invisible Fullscreen backdrop overlay to capture clicking outside */}
                        <div 
                          className="fixed inset-0 z-20 cursor-default" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuSessionId(null);
                          }} 
                        />
                        <div 
                          className={`absolute right-0 top-6 mt-1 w-36 rounded-xl shadow-xl border z-30 py-1.5 font-sans ${
                            isDark ? 'bg-zinc-900 border-zinc-700 text-white shadow-black/50' : 'bg-white border-stone-200 text-stone-900 font-normal'
                          }`}
                        >
                          <button
                            onClick={handlePinSession}
                            className="w-full text-left px-3 py-1.5 text-[11px] font-bold hover:bg-stone-500/10 flex items-center gap-2 transition cursor-pointer text-stone-800 dark:text-zinc-200"
                          >
                            <Pin className="w-3.5 h-3.5 opacity-75 text-emerald-700" />
                            <span>{s.pinned ? "Unpin Chat" : "Pin Chat"}</span>
                          </button>
                          <button
                            onClick={handleShareSession}
                            className="w-full text-left px-3 py-1.5 text-[11px] font-bold hover:bg-stone-500/10 flex items-center gap-2 transition cursor-pointer text-stone-800 dark:text-zinc-200"
                          >
                            <Share2 className="w-3.5 h-3.5 opacity-75 text-[#D4A017]" />
                            <span>Share Chat</span>
                          </button>
                          <button
                            onClick={handleDeleteSession}
                            className="w-full text-left px-3 py-1.5 text-[11px] font-extrabold text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 opacity-75 text-red-500" />
                            <span>Delete Chat</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            });
          })()}
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
        {/* Top Header Bar */}
        <div className={`px-4 py-3.5 border-b flex items-center justify-between z-10 shrink-0 select-none ${
          isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-stone-200 text-emerald-950'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-950 flex items-center justify-center p-0.5 border border-amber-500/20 shrink-0">
              <img 
                src="https://i.postimg.cc/VkwT0rck/Chat-GPT-Image-Jun-7-2026-09-17-26-PM.png" 
                alt="DawaBot Logo" 
                className="w-full h-full object-cover rounded"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xs tracking-tight md:text-sm">
                Dawa<span className="text-[#D4A017]">Bot</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[10px] font-extrabold px-2 py-1 bg-emerald-100 text-emerald-950 rounded-lg dark:bg-zinc-850 dark:text-zinc-300">
                  {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="py-1.5 px-3 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-750 dark:text-red-400 dark:hover:text-white rounded-lg text-xs font-black transition flex items-center gap-1 cursor-pointer"
                  title="Sign Out as traditional vault member"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setLoginSuccessMsg("");
                    setLoginError("");
                    setShowLoginModal(true);
                  }}
                  className={`py-1.5 px-3 rounded-lg text-xs font-extrabold transition cursor-pointer border ${
                    isDark 
                      ? 'bg-zinc-800 hover:bg-zinc-750 text-stone-200 border-zinc-700' 
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setSignupError("");
                    setShowSignupModal(true);
                  }}
                  className="py-1.5 px-3.5 bg-[#D4A017] hover:bg-[#c09115] text-emerald-950 rounded-lg font-black text-xs transition shadow-sm flex items-center gap-1 hover:scale-[1.03] cursor-pointer"
                  style={{ backgroundColor: "#D4A017" }}
                >
                  <Lock className="w-3 h-3 text-emerald-950 shrink-0" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
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
                 'Mimi ni msaidizi wako wa AI kwa ajili ya DawaKienyeji. Uliza maswali kuhusu mimea ya kitiba, tiba za asili, maarifa ya ethnobotaniki, mbinu za uhifadhi, na habari zilizopo kwenye rekodi za kiasili za DawaKienyeji.' :
                 language === 'ki' ? 
                 'Nĩ niĩ mũteithia waku wa AI wa muthemba wa DawaKienyeji. Ũria kĩndũ kĩĩgĩĩ mĩthĩga ya tene, mĩrimu ya nda, ũrĩndĩri wa mĩgũmo, na ũgĩ wothe rũrĩ thĩnĩ wa DawaKienyeji.' :
                 language === 'fr' ? 
                 'Je suis votre assistant IA pour DawaKienyeji. Posez vos questions sur les plantes médicinales, les remèdes traditionnels, les connaissances ethnobotaniques, les pratiques de conservation et les informations disponibles dans les archives traditionnelles de DawaKienyeji.' :
                 'I am your AI assistant for DawaKienyeji. Ask questions about medicinal plants, traditional remedies, ethnobotanical knowledge, conservation practices, and information on our authentic traditional plant records.'}
              </p>
            </div>

            <AnimatePresence>
              {activeMessages.map((msg, i) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id ? `msg-${msg.id}-${i}` : `msg-index-${i}`}
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
                        
                        {isUser && editingMessageId === msg.id ? (
                          <div className="space-y-3 font-sans w-full min-w-[240px] md:min-w-[320px]">
                            <textarea
                              value={editingMessageText}
                              onChange={(e) => setEditingMessageText(e.target.value)}
                              rows={3}
                              className="w-full p-2.5 text-xs text-stone-900 bg-white border border-emerald-900/20 rounded-xl focus:ring-1 focus:ring-emerald-500 font-medium"
                            />
                            <div className="flex items-center gap-1.5 justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingMessageId(null);
                                  setEditingMessageText("");
                                }}
                                className="px-2.5 py-1 bg-emerald-800/80 hover:bg-emerald-900 text-white font-extrabold text-[10px] rounded-lg transition cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleEditMessage(msg.id, editingMessageText)}
                                className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-[10px] rounded-lg transition flex items-center gap-1 cursor-pointer"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Markdown Renderer with container classes */}
                            <div className="prose prose-emerald max-w-none break-words text-inherit leading-relaxed space-y-2.5">
                              <Markdown>{msg.text}</Markdown>
                            </div>
                            
                            {/* Verified Plant Specimen Images sourced dynamically from Database */}
                            {!isUser && (
                              (() => {
                                // Find user query immediately preceding this bot response
                                const prevUserMsg = i > 0 ? activeMessages.slice(0, i).reverse().find(m => m.role === 'user') : null;
                                const userQueryText = prevUserMsg ? prevUserMsg.text : "";
                                
                                const matched = detectMentionedHerbs(msg.text, userQueryText, msg.citations);
                                const isBotanic = isBotanicalQuery(userQueryText);
                                
                                if (matched.length === 0) {
                                  return null;
                                }
                                
                                const matchedWithImages = matched.filter(herb => herb.imageUrl && herb.imageUrl.trim().length > 0);
                                if (matchedWithImages.length === 0) {
                                  return null;
                                }
                                
                                return (
                                  <div className="mt-3.5 pt-3 border-t border-emerald-600/10 space-y-2.5">
                                    <span className="text-[9px] uppercase font-extrabold tracking-wider opacity-60 block">Verified Specimen Library Reference:</span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                      {matchedWithImages.map((herb, herbIdx) => {
                                        return (
                                          <div 
                                            key={`${msg.id || 'msg'}-herb-${herb.id}-${herbIdx}`} 
                                            className={`flex flex-col gap-2 p-2.5 rounded-xl transition ${
                                              isDark ? 'bg-zinc-800 border border-zinc-700' : 'bg-stone-50 border border-stone-200/75'
                                            }`}
                                          >
                                            <div className="flex items-center gap-3">
                                              <img 
                                                src={herb.imageUrl} 
                                                alt={herb.kikuyuName} 
                                                className="w-12 h-12 object-cover rounded-lg shrink-0 border border-stone-200/20"
                                                referrerPolicy="no-referrer"
                                              />
                                              <div className="min-w-0 flex-1">
                                                <h4 className="text-[11px] font-bold uppercase truncate text-emerald-800">{herb.kikuyuName}</h4>
                                                <p className="text-[10px] text-stone-500 font-medium truncate italic">{herb.scientificName}</p>
                                                <p className="text-[9px] text-[#D4A017] font-bold truncate">{herb.commonName}</p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })()
                            )}
                          </>
                        )}

                      </div>

                      {/* Bubble Actions bar */}
                      <div className={`flex items-center gap-3 text-[10px] opacity-60 px-1 ${isUser ? 'justify-end' : ''}`}>
                        <span>{msg.timestamp}</span>
                        {isUser && (
                          <div className="flex items-center gap-2">
                            <span className="opacity-40">|</span>
                            {/* Copy button */}
                            <button 
                              onClick={() => handleCopyText(msg.text, msg.id)}
                              className="hover:text-emerald-900 hover:bg-emerald-100/50 p-1 px-2 rounded-lg transition flex items-center gap-1 cursor-pointer text-emerald-800 font-extrabold border border-emerald-600/20 bg-emerald-50/50"
                              title="Copy your message"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-2.5 h-2.5 text-green-700" />
                                  <span className="text-green-850 font-black">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-2.5 h-2.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            {/* Edit button */}
                            <span className="opacity-40">|</span>
                            <button 
                              onClick={() => {
                                setEditingMessageId(msg.id);
                                setEditingMessageText(msg.text);
                              }}
                              className="hover:text-amber-900 hover:bg-amber-100/50 p-1 px-2 rounded-lg transition flex items-center gap-1 cursor-pointer text-amber-800 font-extrabold border border-amber-600/20 bg-amber-50/50"
                              title="Edit query and reprocess"
                            >
                              <span>Edit</span>
                            </button>
                          </div>
                        )}
                        {!isUser && (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleCopyText(msg.text, msg.id)}
                              className="hover:text-emerald-900 hover:bg-emerald-100/50 p-1 px-2 rounded-lg transition flex items-center gap-1 cursor-pointer text-emerald-800 font-extrabold border border-emerald-600/20 bg-emerald-50/50"
                              title="Copy to clipboard"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-2.5 h-2.5 text-green-700" />
                                  <span className="text-green-850 font-black">{t("chat.copied") || "Copied"}</span>
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

      {/* Botanical Vault Registration Popup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignupModal(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className={`relative w-full max-w-sm p-6 rounded-2xl shadow-2xl border font-sans select-none overflow-hidden ${
                isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => setShowSignupModal(false)}
                  className="p-1.5 rounded-full transition hover:bg-stone-500/10 cursor-pointer"
                >
                  <X className="w-5 h-5 opacity-60" />
                </button>
              </div>

              {/* Header Title */}
              <div className="flex items-center gap-2.5 mb-5 mt-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 border border-emerald-200/50">
                  <Leaf className="w-5 h-5 animate-pulse text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-800">DawaBot Sign Up</h3>
                  <p className="text-[10px] text-stone-400 font-medium">Create a personal member vault to preserve your chats</p>
                </div>
              </div>

              {signupError && (
                <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-[11px] font-semibold flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{signupError}</span>
                </div>
              )}

              <form onSubmit={handleModalSignup} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Wanjiku Kamau"
                    className={`w-full p-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-emerald-700/60 focus:outline-none transition-all ${
                      isDark ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="wanjiku@domain.ke"
                    className={`w-full p-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-emerald-700/60 focus:outline-none transition-all ${
                      isDark ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full p-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-emerald-700/60 focus:outline-none transition-all ${
                      isDark ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Repeat Password</label>
                  <input
                    type="password"
                    required
                    value={signupRepeatPassword}
                    onChange={(e) => setSignupRepeatPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full p-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-emerald-700/60 focus:outline-none transition-all ${
                      isDark ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                    }`}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow transition active:scale-95 duration-150 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSigningUp ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Registering...</span>
                      </>
                    ) : (
                      <span>Sign Up</span>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-zinc-800 flex flex-col gap-2 items-center justify-center text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowSignupModal(false);
                    setLoginSuccessMsg("");
                    setLoginError("");
                    setShowLoginModal(true);
                  }}
                  className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-850 transition cursor-pointer"
                >
                  Already have a member vault? Log In
                </button>
                <p className="text-[9px] text-stone-400 font-medium">Your connection is fully secure. 256-bit encryption active.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Botanical Vault Login Popup Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className={`relative w-full max-w-sm p-6 rounded-2xl shadow-2xl border font-sans select-none overflow-hidden ${
                isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="p-1.5 rounded-full transition hover:bg-stone-500/10 cursor-pointer"
                >
                  <X className="w-5 h-5 opacity-60" />
                </button>
              </div>

              {/* Header Title */}
              <div className="flex items-center gap-2.5 mb-5 mt-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 border border-emerald-200/50">
                  <Leaf className="w-5 h-5 animate-pulse text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-700">DawaBot Log In</h3>
                  <p className="text-[10px] text-stone-400 font-medium">Enter your member vault credentials to synchronize chats</p>
                </div>
              </div>

              {loginSuccessMsg && (
                <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-[10px] font-bold">
                  <span>{loginSuccessMsg}</span>
                </div>
              )}

              {loginError && (
                <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[11px] font-semibold flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleModalLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="wanjiku@domain.ke"
                    className={`w-full p-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-emerald-700/60 focus:outline-none transition-all ${
                      isDark ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                    }`}
                  />
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full p-2.5 pr-10 rounded-lg border text-xs focus:ring-2 focus:ring-emerald-700/60 focus:outline-none transition-all ${
                        isDark ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition cursor-pointer"
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoggingIn || !loginEmail.trim() || !loginPassword.trim()}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow transition active:scale-95 duration-150 cursor-pointer flex items-center justify-center gap-2 disabled:bg-stone-300 disabled:dark:bg-zinc-800 disabled:text-stone-400 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isLoggingIn ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Log In</span>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-3 relative">
                <div className="absolute inset-0 flex items-center">
                  <span className={`w-full border-t ${isDark ? 'border-zinc-800' : 'border-stone-200'}`}></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className={`${isDark ? 'bg-zinc-900 text-stone-500' : 'bg-white text-stone-500'} px-2 font-extrabold`}>Or</span>
                </div>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className={`w-full py-2.5 flex items-center justify-center gap-2 border rounded-xl font-bold text-xs transition duration-150 cursor-pointer ${
                    isDark ? 'border-zinc-700 hover:bg-zinc-800 text-stone-200' : 'border-stone-300 hover:bg-stone-50 text-stone-700 hover:border-emerald-600'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Login with Google
                </button>
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-zinc-800 flex flex-col gap-2 items-center justify-center text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setSignupError("");
                    setShowSignupModal(true);
                  }}
                  className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-850 transition cursor-pointer"
                >
                  Need to back up your chat sessions? Sign Up
                </button>
                <p className="text-[9px] text-stone-400 font-medium">Your connection is fully secure. 256-bit encryption active.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Chat Confirmation Modal */}
      <AnimatePresence>
        {deletingSessionId && (() => {
          const sToDel = sessions.find(s => s.id === deletingSessionId);
          if (!sToDel) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDeletingSessionId(null)}
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
              />
              
              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className={`relative w-full max-w-sm p-6 rounded-2xl shadow-2xl border font-sans select-none overflow-hidden ${
                  isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-stone-200 text-stone-900'
                }`}
              >
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    onClick={() => setDeletingSessionId(null)}
                    className="p-1.5 rounded-full transition hover:bg-stone-500/10 cursor-pointer text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-5 h-5 opacity-60" />
                  </button>
                </div>

                <div className="flex items-center gap-2.5 mb-4 mt-2">
                  <div className="p-2 rounded-lg bg-red-100 text-red-800 shrink-0 border border-red-200/50">
                    <Trash2 className="w-5 h-5 text-red-650" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-red-650">Delete Conversation?</h3>
                    <p className="text-[10px] text-stone-400 font-medium font-semibold">This action is permanent</p>
                  </div>
                </div>

                <p className="text-xs text-stone-500 dark:text-zinc-300 font-medium mb-6 leading-relaxed">
                  Are you sure you want to permanently delete <span className="font-bold text-stone-800 dark:text-white">"{sToDel.title}"</span>? All messages in this session will be lost.
                </p>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setDeletingSessionId(null)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg border transition cursor-pointer ${
                      isDark ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const remaining = sessions.filter(item => item.id !== deletingSessionId);
                      if (remaining.length === 0) {
                        const defaultSessionId = 's-default';
                        setSessions([{
                          id: defaultSessionId,
                          title: "DawaBot",
                          messages: []
                        }]);
                        setCurrentSessionId(defaultSessionId);
                      } else {
                        setSessions(remaining);
                        if (currentSessionId === deletingSessionId) {
                          setCurrentSessionId(remaining[0].id);
                        }
                      }
                      setDeletingSessionId(null);
                      triggerToast("Conversation deleted successfully");
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-lg shadow transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Floating Auto-dismiss Notification Toast Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-emerald-950 text-white border border-emerald-800 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
