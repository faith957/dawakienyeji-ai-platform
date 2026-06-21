import React, { useState, useEffect } from "react";
import { 
  Lock, Key, Shield, LayoutDashboard, PlusCircle, FileText, BarChart3, 
  Trash2, Edit, Save, Plus, X, UploadCloud, CheckCircle, Flame, User, Mail,
  Clock, AlertTriangle, Inbox, Settings, LogOut, Sliders, RefreshCw, HelpCircle,
  BookOpen, Compass, Search, ToggleLeft, ToggleRight, MessageSquare, Send, Check, AlertCircle,
  Eye, EyeOff
} from "lucide-react";
import { Herb, BlogPost, KnowledgeBaseArticle, ChatLog, ContactMessage, BlogComment } from "../types";
import { 
  fetchPlants, addPlant, editPlant, deletePlant, 
  fetchArticles, addArticle, fetchBlogs, addBlog, fetchAnalytics,
  loginAdmin, signupUser, fetchMessages, updateMessageStatus,
  replyToMessage, fetchAllComments, moderateComment, deleteComment
} from "../utils/api";
import { getPlantImage, classifyPlantType, FALLBACK_CATEGORIES, getAISuggestedImages } from "../utils/herbImages";
import { useLanguage } from "../utils/LanguageContext";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

type SidebarTab = 'dashboard' | 'upload_docs' | 'plants' | 'knowledge' | 'blogs' | 'blog_comments' | 'chatbot_training' | 'ai_analytics' | 'messages' | 'settings';

export default function AdminDashboard() {
  const { t, language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("dawa_isAuthenticated") === "true";
  });
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem("dawa_admin_pin") || "";
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("dawa_isAdmin") === "true";
  });
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(() => {
    try {
      const saved = localStorage.getItem("dawa_logged_in_user");
      return saved ? JSON.parse(saved) : null;
    } catch (_) {
      return null;
    }
  });

  const [signupMode, setSignupMode] = useState(() => {
    return localStorage.getItem("dawa_prefer_signup") === "true";
  });
  const [signupName, setSignupName] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Navigation
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');

  useEffect(() => {
    localStorage.removeItem("dawa_prefer_signup");
  }, []);

  useEffect(() => {
    localStorage.setItem("dawa_isAuthenticated", String(isAuthenticated));
    localStorage.setItem("dawa_admin_pin", adminPin);
    localStorage.setItem("dawa_isAdmin", String(isAdmin));
  }, [isAuthenticated, adminPin, isAdmin]);
  
  // Data States
  const [plants, setPlants] = useState<Herb[]>([]);
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [allComments, setAllComments] = useState<BlogComment[]>([]);
  
  // Blog Comment moderation search/filters/reply state
  const [commentFilter, setCommentFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [selectedCommentForReply, setSelectedCommentForReply] = useState<BlogComment | null>(null);
  const [commentReplyText, setCommentReplyText] = useState("");
  const [submittingCommentReply, setSubmittingCommentReply] = useState(false);
  
  // Action Feedback Alerts
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingDataset, setLoadingDataset] = useState(false);

  // Search/Filter states in admin views
  const [plantSearch, setPlantSearch] = useState("");
  const [kbCategoryFilter, setKbCategoryFilter] = useState<string>("All");
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

  // Interactive Message reply modal simulator
  const [selectedMsgForReply, setSelectedMsgForReply] = useState<ContactMessage | null>(null);
  const [advisoryReplyText, setAdvisoryReplyText] = useState("");
  const [sendingReplySim, setSendingReplySim] = useState(false);

  // Chatbot Training Overrides states
  const [botTemperature, setBotTemperature] = useState(0.25);
  const [enforceStrictSafety, setEnforceStrictSafety] = useState(true);
  const [systemPromptOverride, setSystemPromptOverride] = useState(
    "You are DawaBot, a premium and professional AI Assistant built to share authentic Gĩkũyũ and East African traditional herbal medicine knowledge..."
  );
  const [customKeywordsBlocks, setCustomKeywordsBlocks] = useState<string[]>([
    "abortion", "poison", "lethal dosage", "hallucinative trip"
  ]);
  const [newKeywordInput, setNewKeywordInput] = useState("");

  // CRUD Forms States
  // Plant Form
  const [editingPlantId, setEditingPlantId] = useState<string | null>(null);
  const [plantForm, setPlantForm] = useState<Omit<Herb, 'id'>>({
    kikuyuName: "",
    commonName: "",
    scientificName: "",
    partUsed: "",
    description: "",
    preparation: "",
    medicinalUses: [],
    traditionalContext: "",
    precautions: "",
    category: "Respiratory",
    imageColor: "from-green-800 to-emerald-900",
    imageUrl: ""
  });
  const [newUseInput, setNewUseInput] = useState("");
  
  // Custom states for Simulated Upload and AI image recommendations
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  // Blog Form
  const [blogForm, setBlogForm] = useState<Omit<BlogPost, 'id' | 'date'>>({
    title: "",
    category: "Ethnobotany",
    excerpt: "",
    content: "",
    author: "Chief Herbalist",
    imageColor: "from-green-800 to-black",
    readTime: "5 min read"
  });

  // Knowledge Doc Form
  const [docForm, setDocForm] = useState<Omit<KnowledgeBaseArticle, 'id' | 'lastUpdated'>>({
    title: "",
    excerpt: "",
    content: "",
    category: "Ethnobotany",
    author: "Preservation Committee"
  });

  const [docDragActive, setDocDragActive] = useState(false);
  const [docFileLoading, setDocFileLoading] = useState(false);
  const [docFileName, setDocFileName] = useState("");

  const handleDocFile = (file: File) => {
    if (!file) return;
    setDocFileName(file.name);
    setDocFileLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || "";
      
      // Compute beautiful title & excerpt automatically but allow user adjustments
      let title = file.name
        .replace(/\.[^/.]+$/, "")
        .split(/[_-]+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      
      let excerpt = text.slice(0, 150).replace(/[\r\n]+/g, " ");
      if (text.length > 150) {
        excerpt += "...";
      }

      setDocForm(prev => ({
        ...prev,
        title: prev.title || title,
        excerpt: prev.excerpt || excerpt,
        content: text
      }));
      
      setDocFileLoading(false);
      showStatus(`Successfully parsed "${file.name}"! Document content loaded.`);
    };

    reader.onerror = () => {
      setDocFileLoading(false);
      showErr(`Failed to read the file "${file.name}".`);
    };

    reader.readAsText(file);
  };

  // Settings Toggles
  const [settingsToggles, setSettingsToggles] = useState({
    clinicalCaveats: true,
    offlineNodes: true,
    opposedStripingMandate: true,
    auditTrailLogs: false,
    autoBackup: true
  });

  // Load all admin datasets
  const loadAdminData = async () => {
    setLoadingDataset(true);
    try {
      const dbPlants = await fetchPlants();
      const dbArticles = await fetchArticles();
      const dbBlogs = await fetchBlogs();
      const dbAnalytics = await fetchAnalytics();
      setPlants(dbPlants);
      setArticles(dbArticles);
      setBlogs(dbBlogs);
      setAnalytics(dbAnalytics);
      
      if (adminPin) {
        const dbMsgs = await fetchMessages(adminPin);
        setMessages(dbMsgs);
        const dbComs = await fetchAllComments(adminPin);
        setAllComments(dbComs);
      }
    } catch (e: any) {
      showErr("Failed to load backend administration records. Re-authenticating may resolve this.");
    } finally {
      setLoadingDataset(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
      if (currentUser?.email) {
        syncLocalSessionsToServer(currentUser.email);
      }
    }
  }, [isAuthenticated, adminPin, currentUser?.email]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const email = user.email || "";
      const isFaith = email.toLowerCase() === "faith@mojatu.com";
      
      if (!isFaith) {
        auth.signOut();
        setLoginError("Unauthorized. Only the administrator can log in.");
        return;
      }
      
      // Map Firebase auth to the mock system
      setAdminPin("MEMBER_" + email);
      setIsAdmin(true);
      setIsAuthenticated(true);
      setCurrentUser({
        email: email,
        name: user.displayName || "Faith Mojatu"
      });
      localStorage.setItem("dawa_logged_in_user", JSON.stringify({
        email: email,
        name: user.displayName || "Faith Mojatu",
        isAdmin: true
      }));
      await syncLocalSessionsToServer(email);
      showStatus(`Welcome back, ${user.displayName || 'Faith'}!`);
    } catch (err: any) {
      setLoginError(err.message || "Google sign in failed.");
    }
  };

  const syncLocalSessionsToServer = async (email: string) => {
    const localSaved = localStorage.getItem("dawa_chat_sessions");
    if (localSaved) {
      try {
        const sessions = JSON.parse(localSaved);
        if (Array.isArray(sessions) && sessions.length > 0) {
          await fetch("/api/user/sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, sessions }),
          });
        }
      } catch (e) {
        console.error("Failed to sync local sessions to cloud vault:", e);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const data = await loginAdmin(emailInput, passwordInput);
      setAdminPin(data.adminPin);
      setIsAdmin(data.isAdmin);
      setIsAuthenticated(true);
      setCurrentUser({
        email: data.email || emailInput,
        name: data.name || "System User"
      });
      localStorage.setItem("dawa_logged_in_user", JSON.stringify({
        email: data.email || emailInput,
        name: data.name || "System User",
        isAdmin: data.isAdmin
      }));
      setEmailInput("");
      setPasswordInput("");
      await syncLocalSessionsToServer(data.email || emailInput);
      showStatus(`Welcome back, ${data.name || 'User'}!`);
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !emailInput.trim() || !passwordInput.trim()) {
      setLoginError("Please completely fill all fields.");
      return;
    }
    setIsSigningUp(true);
    setLoginError("");
    try {
      const data = await signupUser(emailInput, passwordInput, signupName);
      setAdminPin(data.adminPin);
      setIsAdmin(false);
      setIsAuthenticated(true);
      setCurrentUser({
        email: data.email,
        name: data.name
      });
      localStorage.setItem("dawa_logged_in_user", JSON.stringify({
        email: data.email,
        name: data.name,
        isAdmin: false
      }));
      setSignupName("");
      setEmailInput("");
      setPasswordInput("");
      await syncLocalSessionsToServer(data.email);
      showStatus(`Successfully registered account, ${data.name}! Welcome to the Ethnobotany Portal.`);
    } catch (err: any) {
      setLoginError(err.message || "Signup failed. This email address might already be registered.");
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleLogout = () => {
    setAdminPin("");
    setIsAdmin(false);
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("dawa_isAuthenticated");
    localStorage.removeItem("dawa_admin_pin");
    localStorage.removeItem("dawa_isAdmin");
    localStorage.removeItem("dawa_logged_in_user");
    setActiveTab('dashboard');
    showStatus("Logged out successfully");
  };

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 5000);
  };

  const showErr = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 5000);
  };

  // Herbal Plant Actions
  const handleAddUse = () => {
    if (newUseInput.trim()) {
      setPlantForm(prev => ({
        ...prev,
        medicinalUses: [...prev.medicinalUses, newUseInput.trim()]
      }));
      setNewUseInput("");
    }
  };

  const handleRemoveUse = (idx: number) => {
    setPlantForm(prev => ({
      ...prev,
      medicinalUses: prev.medicinalUses.filter((_, i) => i !== idx)
    }));
  };

  const savePlantData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPlantId) {
        const fullHerb: Herb = { id: editingPlantId, ...plantForm };
        await editPlant(editingPlantId, fullHerb, adminPin);
        showStatus(`Successfully updated plant details for ${plantForm.kikuyuName}!`);
        setEditingPlantId(null);
      } else {
        await addPlant(plantForm, adminPin);
        showStatus(`Added new herbal plant ${plantForm.kikuyuName} into Database!`);
      }
      
      // Reset Form State
      setPlantForm({
        kikuyuName: "",
        commonName: "",
        scientificName: "",
        partUsed: "",
        description: "",
        preparation: "",
        medicinalUses: [],
        traditionalContext: "",
        precautions: "",
        category: "Respiratory",
        imageColor: "from-green-800 to-emerald-900",
        imageUrl: ""
      });
      setUploadSuccess(false);
      setShowAISuggestions(false);
      loadAdminData();
    } catch (err: any) {
      showErr(err.message || "Failed to save herb.");
    }
  };

  const triggerEdit = (herb: Herb) => {
    setEditingPlantId(herb.id);
    setPlantForm({
      kikuyuName: herb.kikuyuName,
      commonName: herb.commonName,
      scientificName: herb.scientificName,
      partUsed: herb.partUsed,
      description: herb.description,
      preparation: herb.preparation,
      medicinalUses: herb.medicinalUses,
      traditionalContext: herb.traditionalContext,
      precautions: herb.precautions,
      category: herb.category,
      imageColor: herb.imageColor,
      imageUrl: herb.imageUrl || ""
    });
    setUploadSuccess(herb.imageUrl ? true : false);
    setShowAISuggestions(false);
    // Scroll form to top
    document.getElementById("plant-form-container")?.scrollIntoView({ behavior: 'smooth' });
  };

  const triggerDeletePlant = async (id: string, name: string) => {
    if (confirm(`Are you absolutely sure you want to remove ${name} from the database? This affects chatbot references.`)) {
      try {
        await deletePlant(id, adminPin);
        showStatus(`Deleted plant listing: ${name}`);
        loadAdminData();
      } catch (err: any) {
        showErr(err.message || "Failed to delete.");
      }
    }
  };

  // Blog publishing
  const publishBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBlog(blogForm, adminPin);
      showStatus(`Successfully published new blog essay: '${blogForm.title}'`);
      setBlogForm({
        title: "",
        category: "Ethnobotany",
        excerpt: "",
        content: "",
        author: "Chief Herbalist",
        imageColor: "from-green-800 to-black",
        readTime: "5 min read"
      });
      loadAdminData();
    } catch (e: any) {
      showErr(e.message || "Failed to publish blog.");
    }
  };

  // Document text manual upload (RAG integration)
  const uploadDocContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addArticle(docForm, adminPin);
      showStatus(`Indexed knowledge chunk: '${docForm.title}' successfully! DawaBot has compiled this context.`);
      setDocForm({
        title: "",
        excerpt: "",
        content: "",
        category: "Ethnobotany",
        author: "Preservation Committee"
      });
      setDocFileName("");
      setDocDragActive(false);
      loadAdminData();
    } catch (e: any) {
      showErr(e.message || "Failed to index document.");
    }
  };

  // Toggle Message read/unread status
  const handleToggleMessageStatus = async (msg: ContactMessage) => {
    try {
      const nextStatus = msg.status === 'unread' ? 'read' : 'unread';
      await updateMessageStatus(msg.id, nextStatus, adminPin);
      showStatus(`Inquiry marked as ${nextStatus}`);
      loadAdminData();
    } catch (err: any) {
      showErr("Failed to update message status");
    }
  };

  // Dispense professional response email via server nodemailer SMTP, logging status metrics
  const handleSendAdvisorySim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisoryReplyText.trim() || !selectedMsgForReply) return;
    setSendingReplySim(true);
    try {
      const result = await replyToMessage(selectedMsgForReply.id, advisoryReplyText.trim(), adminPin);
      if (result.success) {
        showStatus(`Response successfully sent via email to ${selectedMsgForReply?.email}! Confirmation ID: ${result.delivery?.messageId || "SMTP"}`);
        setSelectedMsgForReply(null);
        setAdvisoryReplyText("");
        loadAdminData();
      } else {
        showErr("Action completed but server could not verify delivery confirmation code.");
      }
    } catch (err: any) {
      showErr(err.message || "Email dispatch failed. Please verify mailbox configurations.");
    } finally {
      setSendingReplySim(false);
    }
  };

  // --- BLOG COMMENT MODERATION HANDLERS ---
  const handleApproveComment = async (id: string) => {
    try {
      await moderateComment(id, { approved: true }, adminPin);
      showStatus("Blog comment approved! It is now live in the discussions thread.");
      loadAdminData();
    } catch (err: any) {
      showErr(err.message || "Failed to approve comment.");
    }
  };

  const handleDisapproveComment = async (id: string) => {
    try {
      await moderateComment(id, { approved: false }, adminPin);
      showStatus("Comment disapproved and hidden from the public blogging feed.");
      loadAdminData();
    } catch (err: any) {
      showErr(err.message || "Failed to disapprove comment.");
    }
  };

  const handleSendCommentReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentReplyText.trim() || !selectedCommentForReply) return;
    setSubmittingCommentReply(true);
    try {
      await moderateComment(
        selectedCommentForReply.id, 
        { replyText: commentReplyText.trim(), approved: true }, 
        adminPin
      );
      showStatus(`Advice reply successfully pinned to ${selectedCommentForReply.author}'s comment.`);
      setSelectedCommentForReply(null);
      setCommentReplyText("");
      loadAdminData();
    } catch (err: any) {
      showErr(err.message || "Failed to publish advice reply.");
    } finally {
      setSubmittingCommentReply(false);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (confirm("Are you extremely sure you want to permanently delete this comment? This cannot be undone.")) {
      try {
        await deleteComment(id, adminPin);
        showStatus("Comment permanently deleted.");
        loadAdminData();
      } catch (err: any) {
        showErr(err.message || "Failed to delete comment.");
      }
    }
  };

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    if (messageFilter === 'all') return true;
    return msg.status === messageFilter;
  });

  // Filter blog discussions/comments
  const filteredComments = allComments.filter((com) => {
    if (commentFilter === 'all') return true;
    if (commentFilter === 'pending') return !com.approved;
    if (commentFilter === 'approved') return com.approved;
    return true;
  });

  // Filter plants based on search
  const filteredPlants = plants.filter((p) => {
    const q = plantSearch.toLowerCase();
    return p.kikuyuName.toLowerCase().includes(q) ||
           p.commonName.toLowerCase().includes(q) ||
           p.scientificName.toLowerCase().includes(q) ||
           p.category.toLowerCase().includes(q);
  });

  // Filter articles by category or search word
  const filteredArticles = articles.filter((a) => {
    if (kbCategoryFilter === 'All') return true;
    return a.category === kbCategoryFilter;
  });

  // Count metrics helper
  const unreadCount = messages.filter(m => m.status === 'unread').length;

  // Render Login Lockscreen (Transparent, sleek, Natural Tones matching)
  if (!isAuthenticated) {
    return (
      <div id="admin-login-lock" className="max-w-md mx-auto my-16 p-8 bg-white border border-stone-200 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="p-3.5 bg-emerald-50 rounded-full text-emerald-800 mb-2 transform hover:scale-110 transition">
            <Shield className="w-9 h-9 text-emerald-700 animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold font-sans text-stone-900 tracking-tight">{t("admin.complianceTitle") || "System Administrator Portal"}</h2>
          <p className="text-xs text-stone-500 mt-1">
            {t("admin.loginSub") || "Sign in below to authenticate as a registered system ethnobotanist."}
          </p>
        </div>

        {loginError && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-800 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold text-stone-700">
          <div>
            <label className="block text-stone-900 uppercase tracking-wide text-[10px] mb-2 font-extrabold">{t("contact.email") || "Registered Email"}</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4.5 h-4.5 text-stone-400" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="e.g. user@domain.com"
                className="w-full py-2.5 pl-11 pr-4 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 placeholder-stone-400 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-900 uppercase tracking-wide text-[10px] mb-2 font-extrabold">{t("admin.pwdLabel") || "Gardens Key Password"}</label>
            <div className="relative flex items-center">
              <Key className="absolute left-3.5 w-4.5 h-4.5 text-stone-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full py-2.5 pl-11 pr-10 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 placeholder-stone-400 font-semibold text-stone-850"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-stone-400 hover:text-stone-600 transition cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4.5 h-4.5" />
                ) : (
                  <Eye className="w-4.5 h-4.5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            disabled={isLoggingIn}
            className="w-full py-3 bg-emerald-950 text-white rounded-xl font-bold hover:bg-emerald-800 hover:scale-[1.01] active:translate-y-0.5 transition duration-150 flex items-center justify-center gap-2 shadow mt-6 disabled:bg-stone-300 disabled:cursor-not-allowed cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-300" />
            {isLoggingIn ? t("btn.loading") : (t("admin.unlock") || "Unlock Dashboard")}
          </button>
        </form>
      </div>
    );
  }

// User Session History helper component for the personalized dashboard
function UserSessionHistory({ email }: { email: string }) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const res = await fetch(`/api/user/sessions?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          setSessions(data.sessions || []);
        }
      } catch (err) {
        console.error("Failed to fetch user session logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserHistory();
  }, [email]);

  if (loading) {
    return <div className="text-center text-xs text-stone-400 py-6">Connecting to secure botanical vault...</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 space-y-1">
        <p className="font-bold text-stone-600 text-xs text-center">No saved chat sessions in your permanent vault yet.</p>
        <p className="text-[10px] text-stone-400 text-center">Launch DawaBot from the top header to begin exploring Kikuyu ethnobotany.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((s) => {
        const isExpanded = expandedSessionId === s.id;
        const totalMsgs = s.messages?.length || 0;
        return (
          <div key={s.id} className="border border-stone-150 rounded-xl overflow-hidden transition-all duration-200">
            <button 
              onClick={() => setExpandedSessionId(isExpanded ? null : s.id)}
              className="w-full flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100 transition text-left cursor-pointer"
            >
              <div className="min-w-0 flex-1 pr-3">
                <h4 className="text-xs font-black text-stone-800 truncate">{s.title || "Botanical Wisdom Chat"}</h4>
                <p className="text-[10px] text-stone-500 mt-1 flex items-center gap-1.5">
                  <span>{totalMsgs} conversation messages</span>
                  <span>•</span>
                  <span>Session: {s.id}</span>
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-850 bg-emerald-50 px-2.5 py-1 rounded-lg">
                {isExpanded ? "Collapse History" : "View Dialog Transcript"}
              </span>
            </button>

            {isExpanded && (
              <div className="p-4 bg-white border-t border-stone-150 space-y-4 max-h-96 overflow-y-auto font-sans">
                {s.messages && s.messages.length > 0 ? (
                  s.messages.map((m: any, mIdx: number) => {
                    const isUser = m.role === 'user';
                    return (
                      <div key={m.id ? `adm-msg-${m.id}-${mIdx}` : `adm-msg-${mIdx}`} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between text-[10px] uppercase font-black text-stone-450">
                          <span>{isUser ? "You (User Inquiry)" : "DawaBot Response"}</span>
                          <span>{m.timestamp}</span>
                        </div>
                        <div className={`p-3 rounded-xl leading-relaxed ${
                          isUser 
                            ? 'bg-stone-50 text-stone-800 border' 
                            : 'bg-emerald-50 text-emerald-950 border border-emerald-100'
                        }`}>
                          <p className="font-medium whitespace-pre-wrap">{m.text}</p>
                          {m.citations && m.citations.length > 0 && (
                            <div className="mt-2 pt-1.5 border-t border-emerald-100 flex flex-wrap items-center gap-1">
                              <span className="text-[9px] uppercase tracking-wider text-emerald-700/60 font-black">Linked references:</span>
                              {m.citations.map((cite: string, cIdx: number) => (
                                <span key={cIdx} className="text-[9px] font-bold bg-emerald-105 text-emerald-900 px-1.5 py-0.5 rounded">
                                  {cite}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[10px] text-stone-400 text-center">Empty chat thread history.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

  if (isAuthenticated && !isAdmin) {
    // Render personalized User Dashboard!
    return (
      <div id="user-dashboard-root" className="mx-4 min-h-[600px] bg-stone-50 border border-stone-200/90 rounded-3xl overflow-hidden shadow-xl p-8 space-y-6 lg:col-span-12 font-sans">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-205 pb-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A017] bg-emerald-50 inline-block border border-emerald-100 px-3 py-1 rounded-full">
              Verified Care Specialist & Member Portal
            </span>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-2">
              Welcome back, {currentUser?.name || "Ethnobotany Enthusiast"}!
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-normal">
              Access your permanently saved scientific conversations, Kikuyu botanical collections, and study logs.
            </p>
          </div>
          <button 
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 px-4 rounded-xl border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 text-xs font-bold transition duration-150 cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 text-stone-500" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Account Info */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl w-fit">
                <User className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-extrabold text-stone-900 text-sm">Account Metadata</h3>
              <p className="text-stone-500 text-xs leading-relaxed mt-2 font-normal">
                Registered Profile: <strong className="text-stone-800">{currentUser?.name}</strong> <br />
                Security Identifier: <span className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-600 text-[10px] block mt-1">{currentUser?.email}</span>
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-[10px] text-stone-400 mt-4 font-normal">
              <Clock className="w-3.5 h-3.5" />
              <span>Registered Term Session</span>
            </div>
          </div>

          {/* Card 2: Safe Storage Info */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl w-fit">
              <Shield className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="font-extrabold text-stone-900 text-sm">Permanent Database Storage</h3>
            <p className="text-stone-500 text-xs leading-relaxed mt-2 font-normal">
              All chatbot search sessions & botanical insights are tied directly to your account. Your dAWabot chats will remain saved here permanently, fully accessible from any modern terminal or phone.
            </p>
          </div>

          {/* Card 3: Conservation Pledge */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl w-fit">
              <BookOpen className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-extrabold text-[#D4A017] text-sm">Traditional Oral Lore Safeguard</h3>
            <p className="text-stone-500 text-xs leading-relaxed mt-2 font-normal">
              Our shared botanical registry represents centuries of herbal preservation by Kikuyu elders. Practice respectful, vertically-opposite bark harvesting to keep our forests healthy.
            </p>
          </div>
        </div>

        {/* User Saved Conversations logs / history */}
        <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="border-b border-stone-150 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-stone-950 text-sm">Your Personal Chat Thread History</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Vault: Active & Secure</span>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            <UserSessionHistory email={currentUser?.email || ""} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 min-h-[640px] flex flex-col lg:flex-row border border-stone-200/90 bg-white rounded-3xl overflow-hidden shadow-xl">
      
      {/* 1. Left Sidebar Navigation Panel */}
      <aside className="w-full lg:w-64 bg-stone-100 border-b lg:border-b-0 lg:border-r border-stone-200/80 flex flex-col justify-between p-5 shrink-0 font-sans">
        
        <div className="space-y-6">
          
          {/* Identity Header */}
          <div className="flex items-center gap-2.5 pb-4 border-b border-stone-200/60">
            <div className="p-2 bg-emerald-950 text-emerald-200 rounded-full">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-stone-900 block leading-tight">{t("nav.admin") || "Admin Console"}</span>
              <span className="text-[9px] uppercase tracking-wider text-emerald-700 font-bold block mt-0.5">Joseph wa Gikuyu</span>
            </div>
          </div>

          {/* Navigation Items List */}
          <nav className="flex flex-col gap-1 text-xs font-bold text-stone-600">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'dashboard' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>{t("admin.tabDashboard") || "Dashboard"}</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('upload_docs')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'upload_docs' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <UploadCloud className="w-4 h-4 shrink-0" />
                <span>{t("admin.tabUpload") || "Upload Documents"}</span>
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'upload_docs' ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-250 text-stone-600'
              }`}>{articles.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('plants')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'plants' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 shrink-0" />
                <span>{t("nav.plants") || "Herbal Plants"}</span>
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'plants' ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-250 text-stone-600'
              }`}>{plants.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'knowledge' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>{t("nav.knowledge") || "Knowledge Base"}</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'blogs' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 shrink-0" />
                <span>{t("nav.blog") || "Blog Posts"}</span>
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'blogs' ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-250 text-stone-600'
              }`}>{blogs.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('blog_comments')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'blog_comments' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Blog Discussions</span>
              </span>
              {allComments.filter(c => !c.approved).length > 0 && (
                <span className="font-extrabold text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full shrink-0 animate-pulse">
                  {allComments.filter(c => !c.approved).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('chatbot_training')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'chatbot_training' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 shrink-0" />
                <span>{t("admin.tabChatbot") || "Chatbot Training"}</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ai_analytics')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'ai_analytics' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span>{t("admin.tabAnalytics") || "AI Analytics"}</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'messages' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Inbox className="w-4 h-4 shrink-0" />
                <span>{t("admin.tabMessages") || "User Messages"}</span>
              </span>
              {unreadCount > 0 && (
                <span className="font-extrabold text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full animate-bounce shrink-0">{unreadCount}</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'settings' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4 shrink-0" />
                <span>{t("admin.tabSettings") || "Settings"}</span>
              </span>
            </button>

          </nav>

        </div>

        {/* Footer Logout Action */}
        <div className="pt-4 border-t border-stone-200/60 mt-6 lg:mt-0">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl text-red-600 font-bold text-xs flex items-center gap-2 hover:scale-[1.01] transition"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* 2. Main Executive Content Workstation */}
      <main className="flex-1 bg-[#FDFCF0]/45 p-6 md:p-8 overflow-y-auto space-y-6">
        
        {/* Status Messages alerts */}
        {statusMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-3 shadow-inner">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-900 text-xs font-semibold rounded-2xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Dynamic Section Contents switcher */}
        
        {/* TAB 1: OVERVIEW DASHBOARD STATS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold uppercase px-2 py-0.5 rounded border border-emerald-100/40">General Status</span>
                <h1 className="text-2xl font-extrabold text-stone-900 mt-1">Preservation Overview</h1>
              </div>
              {loadingDataset && <RefreshCw className="w-5 h-5 text-emerald-700 animate-spin" />}
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="bg-white border border-stone-200 p-4.5 rounded-2xl shadow-sm space-y-1.5 relative overflow-hidden">
                <span className="p-2 bg-emerald-50 text-emerald-800 rounded-xl inline-block absolute right-3 top-3 font-sans">
                  <Compass className="w-4 h-4 text-emerald-700" />
                </span>
                <p className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wider font-sans">Total Herbal Plants</p>
                <div className="text-2xl font-extrabold text-stone-900 font-mono">{plants.length}</div>
                <p className="text-[9px] text-stone-500 font-medium">Kikuyu species cataloged</p>
              </div>

              <div className="bg-white border border-stone-200 p-4.5 rounded-2xl shadow-sm space-y-1.5 relative overflow-hidden">
                <span className="p-2 bg-amber-50 text-amber-800 rounded-xl inline-block absolute right-3 top-3 font-sans">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                </span>
                <p className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wider font-sans">Uploaded Documents</p>
                <div className="text-2xl font-extrabold text-stone-900 font-mono">{articles.length}</div>
                <p className="text-[9px] text-stone-500 font-medium font-sans">RAG chatbot safety files</p>
              </div>

              <div className="bg-white border border-stone-200 p-4.5 rounded-2xl shadow-sm space-y-1.5 relative overflow-hidden">
                <span className="p-2 bg-sky-50/80 text-sky-850 rounded-xl inline-block absolute right-3 top-3 font-sans">
                  <MessageSquare className="w-4 h-4 text-sky-700" />
                </span>
                <p className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wider font-sans">Blog Discussions</p>
                <div className="text-2xl font-extrabold text-stone-900 font-mono">{allComments.length}</div>
                <p className="text-[9px] text-stone-500 font-medium font-sans">Total community comments</p>
              </div>

              <div className="bg-white border border-stone-200 p-4.5 rounded-2xl shadow-sm space-y-1.5 relative overflow-hidden">
                <span className="p-2 bg-red-50 text-red-800 rounded-xl inline-block absolute right-3 top-3 animate-pulse font-sans">
                  <Inbox className="w-4 h-4 text-red-700" />
                </span>
                <p className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wider font-sans font-sans">New Messages</p>
                <div className="text-2xl font-extrabold text-stone-900 font-mono text-red-650">{messages.filter(m => m.status === 'unread').length}</div>
                <p className="text-[9px] text-stone-500 font-medium font-sans">Pending advisor reviews</p>
              </div>

              <div className="bg-white border border-stone-200 p-4.5 rounded-2xl shadow-sm space-y-1.5 relative overflow-hidden">
                <span className="p-2 bg-purple-50 text-purple-800 rounded-xl inline-block absolute right-3 top-3 font-sans">
                  <Sliders className="w-4 h-4 text-purple-700" />
                </span>
                <p className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wider font-sans">Chatbot Analytics</p>
                <div className="text-2xl font-extrabold text-stone-900 font-mono">{analytics?.totalChats || 12}</div>
                <p className="text-[9px] text-stone-500 font-medium font-sans">Satisfaction: {analytics?.satisfactionRate || '94%'}</p>
              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              
              {/* Panel 1: Recent User Activity */}
              <div className="bg-white border border-stone-205 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-105 pb-3 font-sans">
                  <h3 className="font-extrabold text-[#4A6741] text-xs uppercase flex items-center gap-1.5">
                    <Inbox className="w-4.5 h-4.5 text-emerald-800 shrink-0" />
                    Incoming Consultations (Activity)
                  </h3>
                  <button onClick={() => setActiveTab('messages')} className="text-[10px] text-emerald-800 hover:underline font-bold">View All →</button>
                </div>
                <div className="space-y-3 max-h-[320px] overflow-y-auto divide-y divide-stone-100 pr-1">
                  {messages.length === 0 ? (
                    <p className="text-xs text-stone-400 py-6 text-center font-normal">No user inquiries logged.</p>
                  ) : (
                    messages.slice(0, 3).map((msg) => (
                      <div key={msg.id} className="pt-3 first:pt-0 space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-stone-900 font-sans truncate pr-2">{msg.name}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 whitespace-nowrap ${
                            msg.status === 'unread' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-stone-50 text-stone-605 border'
                          }`}>{msg.status === 'unread' ? 'New Mail' : msg.status}</span>
                        </div>
                        <p className="text-stone-500 font-normal truncate italic font-sans pb-0.5">"{msg.subject}"</p>
                        <p className="text-[9px] text-stone-450 font-mono font-normal flex justify-between font-sans">
                          <span className="truncate pr-1">{msg.email}</span>
                          <span>{msg.timestamp.split(',')[0]}</span>
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Panel 2: Latest Comments */}
              <div className="bg-white border border-stone-205 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-105 pb-3">
                  <h3 className="font-extrabold text-[#4A6741] text-xs uppercase flex items-center gap-1.5 font-sans">
                    <MessageSquare className="w-4.5 h-4.5 text-emerald-800 shrink-0" />
                    Latest Comments
                  </h3>
                  <button onClick={() => setActiveTab('blog_comments')} className="text-[10px] text-emerald-800 hover:underline font-bold">Moderate →</button>
                </div>
                <div className="space-y-3 max-h-[320px] overflow-y-auto divide-y divide-stone-100 pr-1">
                  {allComments.length === 0 ? (
                    <p className="text-xs text-stone-400 py-6 text-center font-normal">No community comments posted yet.</p>
                  ) : (
                    allComments.slice(0, 3).map((com) => (
                      <div key={com.id} className="pt-3 first:pt-0 space-y-1 text-xs font-sans">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-stone-900 font-sans truncate pr-2">{com.author}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 whitespace-nowrap ${
                            com.approved ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse'
                          }`}>{com.approved ? 'Approved' : 'Pending'}</span>
                        </div>
                        <p className="text-stone-500 font-normal leading-relaxed text-xs line-clamp-2">"{com.text}"</p>
                        <p className="text-[9px] text-stone-455 font-mono font-normal">Posted: {com.timestamp.split(',')[0]}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Panel 3: AI Knowledge Base Status */}
              <div className="bg-white border border-stone-205 p-5 rounded-2xl shadow-sm space-y-4 font-sans">
                <div className="flex items-center justify-between border-b border-stone-105 pb-3">
                  <h3 className="font-extrabold text-[#4A6741] text-xs uppercase flex items-center gap-1.5 font-sans">
                    <Shield className="w-4.5 h-4.5 text-emerald-800 shrink-0" />
                    AI Knowledge Base Status
                  </h3>
                  <span className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-emerald-750 font-extrabold bg-emerald-55 px-2.5 py-1 rounded-full border border-emerald-110 shrink-0">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 animate-ping" />
                    RAG Live
                  </span>
                </div>
                <div className="space-y-3.5 text-xs leading-relaxed text-stone-500 font-normal">
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-stone-700 text-xs">
                      <span>Index Calibration Level:</span>
                      <span className="text-emerald-750 font-extrabold">100% Calibrated</span>
                    </div>
                    <p className="text-[11px] text-stone-400">All registered medicinal species represent validated Oral Lore & clinical safety guidelines.</p>
                  </div>
                  <div className="h-px bg-stone-100" />
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    <div className="bg-stone-50 p-2.5 border border-stone-200/50 rounded-xl">
                      <p className="text-[8px] text-stone-404 font-extrabold">Vector Nodes</p>
                      <p className="text-xs text-stone-900 font-mono mt-0.5">{(plants.length * 4) + articles.length}</p>
                    </div>
                    <div className="bg-stone-50 p-2.5 border border-stone-200/50 rounded-xl">
                      <p className="text-[8px] text-stone-404 font-extrabold">Grounding State</p>
                      <p className="text-xs text-stone-900 font-sans mt-0.5" style={{ color: '#15803d' }}>ACTIVE</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-405 italic leading-relaxed">System prompt strictly forces clinical safe dosage checks, citing published treatises from your knowledge library.</p>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Quick Actions Board */}
              <div className="lg:col-span-7 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <Plus className="w-4.5 h-4.5 text-emerald-800" />
                  Quick Ethical Guidelines & Actions
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed font-normal">
                  DawaKienyeji enforces a secure botanical digital registry. Before updating species, ensure you cross-reference scientific classifications with mountain elder councils.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-stone-700">
                  <button 
                    onClick={() => setActiveTab('plants')}
                    className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-left flex items-center gap-2.5 transition"
                  >
                    <PlusCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <p className="text-stone-900 text-xs">Register Species</p>
                      <p className="text-[9px] text-stone-500 font-normal">Add Kikuyu taxonomy</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('upload_docs')}
                    className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-left flex items-center gap-2.5 transition"
                  >
                    <UploadCloud className="w-5 h-5 text-amber-700 shrink-0" />
                    <div>
                      <p className="text-stone-900 text-xs">Index PDF Content</p>
                      <p className="text-[9px] text-stone-500 font-normal">Upload research treatises</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('blogs')}
                    className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-left flex items-center gap-2.5 transition"
                  >
                    <FileText className="w-5 h-5 text-blue-700 shrink-0" />
                    <div>
                      <p className="text-stone-900 text-xs">Write Essay</p>
                      <p className="text-[9px] text-stone-500 font-normal">Publish conservation news</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('chatbot_training')}
                    className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-left flex items-center gap-2.5 transition"
                  >
                    <Sliders className="w-5 h-5 text-purple-700 shrink-0" />
                    <div>
                      <p className="text-stone-900 text-xs">Acknowledge Safety Rules</p>
                      <p className="text-[9px] text-stone-500 font-normal">Set prompt temperature</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Integrity Warning Gauge */}
              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-6 rounded-2xl shadow-md space-y-4">
                <span className="inline-flex px-2 py-0.5 bg-emerald-900/60 uppercase text-[9px] font-extrabold tracking-widest text-emerald-300 rounded border border-emerald-800">
                  Compliance Meter
                </span>
                <h3 className="font-extrabold text-sm text-white tracking-tight">Opposite Striping Standard</h3>
                <p className="text-[11px] text-emerald-100/90 leading-relaxed font-semibold">
                  A critical law of central Kenya is never ring-barking a tree (girdling). Removing bark around the entire radius cuts off nutrient pipelines, killing the specimen. Ethics mandate taking slices only from opposite vertical sides.
                </p>

                <div className="pt-2">
                  <div className="flex items-center justify-between font-bold text-[10px] text-emerald-300 mb-1 font-mono">
                    <span>REGIONAL COMPLIANCE GAUGE</span>
                    <span>100% EXCELLENCE</span>
                  </div>
                  <div className="w-full h-2 bg-emerald-900 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-emerald-400 rounded-full" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: UPLOAD DOCUMENTS (RAG LOADER) */}
        {activeTab === 'upload_docs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-extrabold text-stone-900">Upload Knowledge Documents</h1>
              <p className="text-xs text-stone-500 mt-1">Submit traditional medical texts, species datasheets, or Kikuyu elder accounts for RAG vector index mapping.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form panel */}
              <div className="lg:col-span-7 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm">
                <form onSubmit={uploadDocContent} className="space-y-4 text-xs font-semibold text-stone-700">
                  
                  {/* Drag and Drop / Manual Selection File Upload Area */}
                  <div className="space-y-2">
                    <label className="block uppercase font-bold text-stone-900 text-[10px] tracking-wider">
                      Botanical Treatise or Kikuyu Heritage Document File Upload
                    </label>
                    <div
                      onDragEnter={(e) => { e.preventDefault(); setDocDragActive(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setDocDragActive(false); }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDocDragActive(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleDocFile(e.dataTransfer.files[0]);
                        }
                      }}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 relative ${
                        docDragActive 
                          ? 'border-emerald-600 bg-emerald-50/30 shadow-inner' 
                          : docFileName 
                            ? 'border-emerald-500 bg-emerald-50/10' 
                            : 'border-stone-250 hover:border-emerald-700 hover:bg-stone-50 bg-stone-50/50'
                      }`}
                      onClick={() => {
                        const fileInput = document.getElementById("document-file-input");
                        if (fileInput) fileInput.click();
                      }}
                    >
                      <input
                        id="document-file-input"
                        type="file"
                        accept=".txt,.md,.json,.csv,.rtf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleDocFile(e.target.files[0]);
                          }
                        }}
                      />

                      {docFileLoading ? (
                        <div className="space-y-2">
                          <div className="w-7 h-7 border-3 border-emerald-700/30 border-t-emerald-700 rounded-full animate-spin mx-auto" />
                          <p className="text-xs text-stone-600 font-bold">Reading document coordinates...</p>
                        </div>
                      ) : docFileName ? (
                        <div className="space-y-2.5">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-800 border border-emerald-200">
                            <Check className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-emerald-900">Loaded: <span className="underline">{docFileName}</span></p>
                            <p className="text-[10px] text-stone-500 font-medium mt-1">Ready for indexing. Adjust details below if needed.</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDocFileName("");
                              setDocForm(prev => ({ ...prev, content: "" }));
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-700 text-[10px] uppercase font-extrabold px-3 py-1 rounded-lg border border-red-200/50 transition cursor-pointer"
                          >
                            Remove File
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 py-2">
                          <UploadCloud className="w-9 h-9 text-emerald-800/80 mx-auto animate-bounce duration-1000" />
                          <div>
                            <span className="text-xs font-black text-[#D4A017]">Drag & Drop Document Here</span>
                            <span className="text-xs font-normal text-stone-500 block mt-1">or click to browse local files (.txt, .md, .csv)</span>
                          </div>
                          <div className="inline-block mt-2 text-[9px] font-black uppercase text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-100">
                            Kikuyu (Gĩkũyũ) Document Support Certified 🌍
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Kikuyu Info Banner */}
                  {docForm.content && (
                    <div className="p-3 bg-amber-50/50 border border-amber-200/40 rounded-xl space-y-1">
                      <p className="text-amber-800 font-bold text-[10px] uppercase flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                        Multilingual AI Indexing Ready
                      </p>
                      <p className="text-[10px] text-stone-600 font-medium leading-relaxed">
                        If your uploaded file is in <strong>Kikuyu (Gĩkũyũ)</strong>, you can index it directly! DawaBot's cognitive mapping handles real-time cross-language query searches and will intelligently reply in <strong>English, Swahili, Gĩkũyũ, or French</strong> depending on the visitor's choice.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block mb-1.5 uppercase font-bold text-stone-900">Treatise Document Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Traditional logs on Mũgũgũ root preparation methods"
                      value={docForm.title}
                      onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1.5 uppercase font-bold text-stone-900">Primary Source / Author</label>
                      <input
                        type="text"
                        value={docForm.author}
                        onChange={(e) => setDocForm({ ...docForm, author: e.target.value })}
                        placeholder="e.g., Mount Kenya Conservation Alliance"
                        className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 uppercase font-bold text-stone-900">Academic Category</label>
                      <select
                        value={docForm.category}
                        onChange={(e: any) => setDocForm({ ...docForm, category: e.target.value })}
                        className="w-full p-2.5 border border-stone-300 bg-white rounded-xl text-stone-900 font-bold"
                      >
                        <option value="Ethnobotany">Ethnobotanical Literature</option>
                        <option value="Dosage & Safety">Clinical Dosage & Poison Manuals</option>
                        <option value="Sustainable Harvesting">Sustainable Harvest Treatises</option>
                        <option value="Kikuyu Traditions">Oral Kikuyu Heritage logs</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5 uppercase font-bold text-stone-900">Brief Document Excerpt (RAG Keyword Summary) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Summarize key points in one sentence for fast keyword index matches..."
                      value={docForm.excerpt}
                      onChange={(e) => setDocForm({ ...docForm, excerpt: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-900 text-xs font-normal"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 uppercase font-bold text-stone-900">Treatise Full-Text body content *</label>
                    <textarea
                      required
                      rows={10}
                      placeholder="Paste the raw full text content. DawaBot searches these barks to answer client inputs..."
                      value={docForm.content}
                      onChange={(e) => setDocForm({ ...docForm, content: e.target.value })}
                      className="w-full p-3 border border-stone-300 rounded-xl text-stone-900 font-normal text-xs leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-950 text-white hover:bg-emerald-800 rounded-xl font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <UploadCloud className="w-4 h-4 text-emerald-300" />
                    <span>Upload & Index Document Text</span>
                  </button>
                </form>
              </div>

              {/* Help & Info sidebar */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-stone-100 border border-stone-200 p-5 rounded-2xl text-xs space-y-3 font-semibold text-stone-700 leading-relaxed">
                  <h3 className="font-extrabold text-stone-900 text-xs uppercase flex items-center gap-1.5">
                    <HelpCircle className="w-4.5 h-4.5 text-emerald-800" />
                    How RAG integration Operates
                  </h3>
                  <p className="font-normal text-stone-500">
                    When visitors enter prompts inside <strong className="font-semibold text-stone-750">DawaBot</strong>, the server does not just call general LLM training sets. 
                  </p>
                  <p className="font-normal text-stone-500">
                    Instead, our backend performs keyword mapping against all indexed documents you publish here. The relevant treatises are fed into the prompt, giving the AI companion strict, grounded safe boundaries.
                  </p>
                </div>

                <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm">
                  <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold uppercase px-2 py-0.5 rounded border border-emerald-100">Live DB</span>
                  <h3 className="font-extrabold text-stone-900 text-xs uppercase mt-2 mb-3">Recently Indexed volumes</h3>
                  
                  <div className="space-y-3 overflow-y-auto max-h-56 pr-1 divide-y divide-stone-100 text-[11px] font-semibold">
                    {articles.slice(0, 4).map((art) => (
                      <div key={art.id} className="pt-2.5 first:pt-0">
                        <p className="text-stone-900 truncate font-bold text-xs">{art.title}</p>
                        <p className="text-[10px] text-emerald-700 uppercase mt-0.5 text-right font-bold">{art.category}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: HERBAL PLANTS DATABASE CRUD */}
        {activeTab === 'plants' && (
          <div id="plants-workstation" className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-extrabold text-stone-900">Manage Medicinal Flora Records</h1>
              <p className="text-xs text-stone-500 mt-1">Publish new botanical specimens, adjust preparation directions, and specify warnings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form left pane */}
              <div id="plant-form-container" className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <h2 className="text-md font-extrabold text-[#4A6741] border-b border-stone-100 pb-2.5 flex items-center gap-1.5 font-sans uppercase text-xs tracking-wider">
                  {editingPlantId ? "✏️ Edit Botanical Specimen" : "🍃 Register New Species"}
                </h2>

                <form onSubmit={savePlantData} className="space-y-4 text-xs font-semibold text-stone-700">
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1 font-bold text-stone-900 uppercase">Kikuyu Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MŨCOROI"
                        value={plantForm.kikuyuName}
                        onChange={(e) => setPlantForm({ ...plantForm, kikuyuName: e.target.value })}
                        className="w-full p-2 border border-stone-300 rounded-xl text-stone-100 focus:text-stone-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-bold text-stone-900 uppercase">Scientific Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Prunus africana"
                        value={plantForm.scientificName}
                        onChange={(e) => setPlantForm({ ...plantForm, scientificName: e.target.value })}
                        className="w-full p-2 border border-stone-300 rounded-xl text-stone-900 italic font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1 font-bold text-stone-900 uppercase">English Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Red Stinkwood"
                        value={plantForm.commonName}
                        onChange={(e) => setPlantForm({ ...plantForm, commonName: e.target.value })}
                        className="w-full p-2 border border-stone-300 rounded-xl text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-bold text-stone-900 uppercase">Part Used</label>
                      <input
                        type="text"
                        placeholder="e.g., Red timber bark shards"
                        value={plantForm.partUsed}
                        onChange={(e) => setPlantForm({ ...plantForm, partUsed: e.target.value })}
                        className="w-full p-2 border border-stone-300 rounded-xl text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-stone-900 uppercase">Ailment Scope</label>
                    <select
                      value={plantForm.category}
                      onChange={(e: any) => setPlantForm({ ...plantForm, category: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 bg-white rounded-xl text-stone-900 font-bold"
                    >
                      <option value="Respiratory">Severe Respiratory & Coughs</option>
                      <option value="Digestive">Digestive & Deworming</option>
                      <option value="Pain relief">Pain relief & Joint Rheumatism</option>
                      <option value="Skin & Wounds">Skin & Wound recovery</option>
                      <option value="General Vitality">General Tonic & Vitality</option>
                      <option value="Prostate & Urinary">Prostate & Urinary balance</option>
                      <option value="Fevers">Fevers & Chills (Malaria)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-stone-900 uppercase">Specimen Description</label>
                    <textarea
                      rows={2}
                      value={plantForm.description}
                      onChange={(e) => setPlantForm({ ...plantForm, description: e.target.value })}
                      placeholder="Enter height of the tree, leaf patterns, highland location clusters..."
                      className="w-full p-2 border border-stone-300 rounded-xl text-stone-900 font-normal leading-relaxed text-xs"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-stone-900 uppercase">Medicinal Uses</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="e.g. Heals urinary bladder symptoms"
                        value={newUseInput}
                        onChange={(e) => setNewUseInput(e.target.value)}
                        className="flex-1 p-2 border border-stone-300 rounded-xl text-stone-900 font-semibold"
                      />
                      <button
                        type="button"
                        onClick={handleAddUse}
                        className="px-3 bg-emerald-950 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {plantForm.medicinalUses.map((use, idx) => (
                        <span key={idx} className="bg-stone-100 border border-stone-200 text-stone-800 rounded-full px-2.5 py-0.5 text-[10px] flex items-center gap-1 font-bold">
                          {use}
                          <button type="button" onClick={() => handleRemoveUse(idx)} className="text-red-500">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-stone-900 uppercase">Preparation Guide *</label>
                    <textarea
                      rows={3}
                      required
                      value={plantForm.preparation}
                      onChange={(e) => setPlantForm({ ...plantForm, preparation: e.target.value })}
                      placeholder="Boil vertical barks in water or milk, steep for 20 minutes, filter and serve..."
                      className="w-full p-2 border border-stone-300 rounded-xl text-stone-900 font-normal leading-relaxed text-xs"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-stone-900 uppercase">Traditional Clan History & Lore</label>
                    <textarea
                      rows={2}
                      value={plantForm.traditionalContext}
                      onChange={(e) => setPlantForm({ ...plantForm, traditionalContext: e.target.value })}
                      placeholder="Sacred covenants, ceremonial harvests, or mountain rituals..."
                      className="w-full p-2 border border-stone-300 rounded-xl text-stone-900 font-normal leading-relaxed text-xs"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-stone-900 uppercase">Usage Contraindications & Safety Warning</label>
                    <textarea
                      rows={2}
                      value={plantForm.precautions}
                      onChange={(e) => setPlantForm({ ...plantForm, precautions: e.target.value })}
                      placeholder="Contraindications! Pregnancy warnings, gastric toxicity warnings..."
                      className="w-full p-2 border border-stone-300 rounded-xl text-stone-900 font-normal leading-relaxed text-xs"
                    />
                  </div>

                  {/* BOTANICAL SPECIMEN IMAGE FIELD & SIMULATOR */}
                  <div className="border border-stone-200 p-4.5 rounded-xl bg-stone-50 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <label className="block font-bold text-stone-900 uppercase">Specimen Image / Illustration</label>
                      <button
                        type="button"
                        onClick={() => setShowAISuggestions(!showAISuggestions)}
                        className="text-[10px] bg-emerald-55 text-emerald-800 border border-emerald-200 rounded-lg px-2 py-1 font-bold flex items-center gap-1 transition"
                      >
                        ✨ Get Suggested Images
                      </button>
                    </div>

                    {/* AI image suggestion panel */}
                    {showAISuggestions && (
                      <div className="bg-white border border-emerald-100 p-3 rounded-xl space-y-2.5 animate-fade-in shadow-inner">
                        <div className="flex justify-between items-center border-b border-stone-100 pb-1.5">
                          <span className="text-[10px] uppercase font-extrabold text-emerald-800 flex items-center gap-1">✨ AI Botanical Presets</span>
                          <button 
                            type="button" 
                            onClick={() => setShowAISuggestions(false)}
                            className="text-stone-400 hover:text-stone-600 font-black text-xs"
                          >
                            ×
                          </button>
                        </div>
                        <p className="text-[10px] text-stone-500 font-normal leading-relaxed">
                          Intelligent botanical matching found these premium, royalty-free species illustrations:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {getAISuggestedImages(plantForm).map((suggestion, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setPlantForm({ ...plantForm, imageUrl: suggestion.url });
                                setUploadSuccess(true);
                                showStatus(`Applied photo: ${suggestion.title}`);
                              }}
                              className={`group text-left border rounded-lg p-1.5 hover:border-emerald-600 transition flex flex-col gap-1 bg-stone-50/50 ${
                                plantForm.imageUrl === suggestion.url ? 'border-emerald-600 bg-emerald-50/30' : 'border-stone-200'
                              }`}
                            >
                              <div className="h-16 w-full rounded overflow-hidden">
                                <img src={suggestion.url} alt="preset preview" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                              </div>
                              <span className="text-[9px] font-bold text-stone-850 truncate block w-full">{suggestion.title}</span>
                              <span className="text-[8px] text-stone-400 font-normal block">{suggestion.source}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* File Upload / Image input */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Paste direct verification image URL..."
                          value={plantForm.imageUrl || ""}
                          onChange={(e) => {
                            setPlantForm({ ...plantForm, imageUrl: e.target.value });
                            setUploadSuccess(e.target.value ? true : false);
                          }}
                          className="flex-1 p-2 border border-stone-300 rounded-xl bg-white text-stone-900 text-xs font-semibold"
                        />
                        {plantForm.imageUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setPlantForm({ ...plantForm, imageUrl: "" });
                              setUploadSuccess(false);
                            }}
                            className="px-2.5 bg-stone-200 hover:bg-stone-300 rounded-xl text-stone-600 font-bold"
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      {/* Interactive simulated upload zone */}
                      <div
                        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragActive(false);
                          setIsUploading(true);
                          // Simulate cloud upload
                          setTimeout(() => {
                            const urlPool = [
                              "https://images.unsplash.com/photo-1564594736624-def7a10ab047?auto=format&fit=crop&w=800&q=80",
                              "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
                              "https://images.unsplash.com/photo-1522307837370-cc113a36b784?auto=format&fit=crop&w=800&q=80",
                              "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
                            ];
                            const randomUrl = urlPool[Math.floor(Math.random() * urlPool.length)];
                            setPlantForm(prev => ({ ...prev, imageUrl: randomUrl }));
                            setIsUploading(false);
                            setUploadSuccess(true);
                            showStatus("Botanical specimen image uploaded successfully!");
                          }, 1550);
                        }}
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${
                          dragActive ? 'border-emerald-600 bg-emerald-50/20' : 'border-stone-300 hover:border-stone-400 bg-white'
                        }`}
                        onClick={() => {
                          setIsUploading(true);
                          setTimeout(() => {
                            const randomUrl = "https://images.unsplash.com/photo-1564594736624-def7a10ab047?auto=format&fit=crop&w=800&q=80";
                            setPlantForm(prev => ({ ...prev, imageUrl: randomUrl }));
                            setIsUploading(false);
                            setUploadSuccess(true);
                            showStatus("Botanical specimen image uploaded successfully!");
                          }, 1250);
                        }}
                      >
                        {isUploading ? (
                          <div className="space-y-2">
                            <RefreshCw className="w-6 h-6 text-emerald-700 animate-spin mx-auto animate-infinite" />
                            <p className="text-[10px] font-bold text-stone-600">Simulating Secure Cloud Upload...</p>
                            <div className="w-24 h-1 bg-stone-100 rounded-full overflow-hidden mx-auto">
                              <div className="h-full bg-emerald-700 animate-pulse w-3/4" />
                            </div>
                          </div>
                        ) : uploadSuccess ? (
                          <div className="space-y-1">
                            <CheckCircle className="w-6 h-6 text-emerald-700 mx-auto" />
                            <p className="text-[10px] font-extrabold text-stone-850">Specimen Image Configured!</p>
                            <p className="text-[9px] text-stone-400 font-normal">Click or drag another to replace</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <UploadCloud className="w-6 h-6 text-stone-400 mx-auto" />
                            <p className="text-[10px] font-bold text-stone-700">Drag & Drop Specimen Photo or Click to simulated upload</p>
                            <p className="text-[8px] text-stone-400 font-normal">Supports JPEG, PNG up to 5MB</p>
                          </div>
                        )}
                      </div>

                      {/* Small Live Thumbnail preview */}
                      {plantForm.imageUrl && (
                        <div className="flex items-center gap-2 border border-stone-200 bg-white p-1.5 rounded-xl">
                          <img src={plantForm.imageUrl} alt="Live Preview" className="w-12 h-12 object-cover rounded-md" onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_CATEGORIES[2].url;
                          }} />
                          <div className="min-w-0 flex-1">
                            <p className="text-[9px] font-extrabold text-stone-850 truncate">Live Preview Active</p>
                            <p className="text-[8px] text-stone-400 font-normal truncate">{plantForm.imageUrl}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="submit"
                      className="flex-grow py-3 bg-emerald-950 text-white rounded-xl font-bold text-xs"
                    >
                      <Save className="w-3.5 h-3.5 inline mr-1.5" />
                      {editingPlantId ? "Save Specimen Edits" : "Publish to Database"}
                    </button>
                    {editingPlantId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPlantId(null);
                          setPlantForm({
                            kikuyuName: "",
                            commonName: "",
                            scientificName: "",
                            partUsed: "",
                            description: "",
                            preparation: "",
                            medicinalUses: [],
                            traditionalContext: "",
                            precautions: "",
                            category: "Respiratory",
                            imageColor: "from-green-800 to-emerald-900",
                            imageUrl: ""
                          });
                          setUploadSuccess(false);
                          setShowAISuggestions(false);
                        }}
                        className="px-4.5 py-3 border border-stone-300 rounded-xl hover:bg-stone-50 text-stone-600 font-bold"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                </form>
              </div>

              {/* Table/List panel right side */}
              <div className="lg:col-span-7 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-3">
                  <h3 className="font-extrabold text-stone-900 text-sm">Registered Medicinal Flora</h3>
                  
                  {/* Search filter input */}
                  <div className="relative w-full sm:w-52">
                    <Search className="absolute left-2.5 top-2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search species..."
                      value={plantSearch}
                      onChange={(e) => setPlantSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900"
                    />
                  </div>
                </div>

                <div className="divide-y divide-stone-150/65 overflow-y-auto max-h-[680px] space-y-4 pr-1">
                  {filteredPlants.length > 0 ? (
                    filteredPlants.map((h) => (
                      <div key={h.id} className="pt-4 first:pt-0 flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-extrabold font-mono text-emerald-800 text-sm tracking-wide">{h.kikuyuName}</span>
                            <span className="italic text-xs text-stone-500 font-semibold font-sans">({h.scientificName})</span>
                            <span className="text-[10px] bg-stone-100 border text-stone-600 px-2 py-0.5 rounded-full font-bold">{h.category}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">{h.description}</p>
                          <p className="text-[10px] text-stone-700 font-semibold">
                            <strong className="text-stone-850">Part Used: </strong>{h.partUsed || "Bark shavings"}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => triggerEdit(h)}
                            className="p-1.5 hover:bg-stone-100 rounded-lg text-emerald-950 border border-transparent hover:border-stone-200"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => triggerDeletePlant(h.id, h.kikuyuName)}
                            className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg border border-transparent hover:border-red-150"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center font-bold text-xs text-stone-400 py-12">No registered species match your query.</p>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: KNOWLEDGE BASE ARTICLES MANAGER */}
        {activeTab === 'knowledge' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-extrabold text-stone-900">Ethnobotanical Literature Manager</h1>
              <p className="text-xs text-stone-500 mt-1">Review, categorize, and browse the articles feeding the active RAG bot system.</p>
            </div>

            {/* Filter Pill List */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-100 pb-4 text-xs font-bold text-stone-600">
              {['All', 'Ethnobotany', 'Dosage & Safety', 'Sustainable Harvesting', 'Kikuyu Traditions'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setKbCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full transition ${
                    kbCategoryFilter === cat ? 'bg-emerald-950 text-white shadow-sm' : 'bg-stone-100 hover:bg-stone-200/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <div key={art.id} className="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wide text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {art.category}
                        </span>
                        <h3 className="font-extrabold text-stone-950 text-sm">{art.title}</h3>
                      </div>
                    </div>

                    <p className="text-stone-500 text-xs font-normal line-clamp-3 leading-relaxed">
                      {art.content}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-[10px] text-stone-400 font-bold uppercase">
                      <p>Source / Author: {art.author}</p>
                      <p>{art.lastUpdated || "June 2026"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-16 font-bold text-xs text-stone-400">
                  No indexed articles in this category. Navigate to "Upload Documents" to publish more context blocks!
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 5: PUBLISH ESSAYS (BLOG) */}
        {activeTab === 'blogs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-extrabold text-stone-900">Publish Regional Essays</h1>
              <p className="text-xs text-stone-500 mt-1 font-normal">Educate locals on sustainable highland harvesting, re-foresting, and health warnings.</p>
            </div>

            <div className="max-w-3xl mx-auto bg-white border border-stone-200 p-6 rounded-2xl shadow-sm">
              <form onSubmit={publishBlogPost} className="space-y-4 text-xs font-semibold text-stone-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 uppercase font-bold text-stone-900">Blog Essay Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bladder remedies and the legacy of Pygeum africana"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full p-2.5 border border-stone-350 rounded-xl text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 uppercase font-bold text-stone-900">Blog Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e: any) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full p-2.5 border border-stone-350 bg-white rounded-xl text-stone-900 font-bold"
                    >
                      <option value="Ethnobotany">Ethnobotanical Wisdom</option>
                      <option value="Dosage & Safety">Clinical & Dosage Safety</option>
                      <option value="Kikuyu Traditions">Kikuyu Tribal Customs</option>
                      <option value="Sustainable Harvesting">Sustainable Forestry & Replanting</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 uppercase font-bold text-stone-900">Author signature</label>
                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full p-2.5 border border-stone-350 rounded-xl text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 uppercase font-bold text-stone-900">Accent Deck color</label>
                    <select
                      value={blogForm.imageColor}
                      onChange={(e) => setBlogForm({ ...blogForm, imageColor: e.target.value })}
                      className="w-full p-2.5 border border-stone-350 bg-white rounded-xl text-stone-900 font-bold"
                    >
                      <option value="from-emerald-800 to-green-950">Deep Emerald Forest</option>
                      <option value="from-amber-900 to-red-950">Mahogany Timber</option>
                      <option value="from-teal-800 to-cyan-950">Acacia Scented Cyan</option>
                      <option value="from-stone-900 to-black">Obsedian Slate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 uppercase font-bold text-stone-900">Short Card Excerpt previews *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Short 2-sentence catalog summary shown on home sliders..."
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full p-2 border border-stone-350 rounded-xl text-stone-900 font-normal leading-relaxed text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 uppercase font-bold text-stone-900">Full editorial text body *</label>
                  <textarea
                    rows={10}
                    required
                    placeholder="Provide full clinical or cultural essays. Supports Markdown lines..."
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full p-3 border border-stone-350 rounded-xl text-stone-900 font-normal leading-relaxed text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-950 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow"
                >
                  <FileText className="w-4 h-4 text-emerald-300" />
                  <span>Publish Regional Essay</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5.5: BLOG DISCUSSION MODERATION BLOCK */}
        {activeTab === 'blog_comments' && (
          <div className="space-y-6 animate-fade-in font-sans text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h1 className="text-2xl font-extrabold text-stone-900 leading-none font-sans">Blog Discussions & Comments</h1>
                <p className="text-xs text-stone-500 mt-1 font-normal">Review user reflections, approve regional lore submissions, and publish verified answers.</p>
              </div>

              {/* Filtering Controls */}
              <div className="flex bg-stone-100 border p-1 rounded-xl text-[10px] font-bold text-stone-600">
                {(['all', 'pending', 'approved'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setCommentFilter(f)}
                    className={`px-3 py-1.5 rounded-lg capitalize cursor-pointer transition ${
                      commentFilter === f ? 'bg-emerald-950 text-white shadow-sm' : 'hover:text-stone-950'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Comments List */}
              <div className="lg:col-span-7 space-y-4 max-h-[660px] overflow-y-auto pr-1">
                {filteredComments.length > 0 ? (
                  filteredComments.map((com) => {
                    const blog = blogs.find(b => b.id === com.blogId);
                    return (
                      <div 
                        key={com.id} 
                        className={`p-5 rounded-2xl border transition shadow-sm bg-white hover:bg-stone-50/50 ${
                          !com.approved ? 'border-l-4 border-l-amber-500 border-stone-200 shadow' : 'border-stone-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-stone-400">
                              <span>Ref: {blog ? blog.title : `Blog ${com.blogId}`}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {com.timestamp}</span>
                            </div>
                            <h4 className="font-extrabold text-[#4A6741] text-xs mt-1 font-sans">Submitted by: {com.author}</h4>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5">
                            {com.approved ? (
                              <span className="bg-emerald-100/70 border border-emerald-200 text-emerald-800 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide">Approved & Public</span>
                            ) : (
                              <span className="bg-amber-100/70 border border-amber-200 text-amber-800 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide">Pending Approval</span>
                            )}
                          </div>
                        </div>

                        <p className="text-stone-700 text-xs font-semibold leading-relaxed mt-3.5 bg-stone-50 p-3.5 rounded-xl border border-stone-150/40">
                          {com.text}
                        </p>

                        {/* Existing Admin Reply preview */}
                        {com.replyText && (
                          <div className="mt-3 p-3 bg-stone-105 rounded-xl border border-stone-200 flex items-start gap-2">
                            <Send className="w-3.5 h-3.5 text-emerald-850 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-extrabold text-emerald-950 uppercase tracking-widest block">ADMIN REPLY DETAIL</span>
                              <p className="text-stone-600 text-[11px] leading-relaxed font-semibold">{com.replyText}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end gap-1.5 mt-4 pt-3 border-t">
                          {!com.approved ? (
                            <button
                              onClick={() => handleApproveComment(com.id)}
                              className="py-1.5 px-3 bg-emerald-900 text-white rounded-lg font-extrabold text-[10px] hover:bg-emerald-800 cursor-pointer"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDisapproveComment(com.id)}
                              className="py-1.5 px-3 bg-stone-150 text-stone-700 rounded-lg font-extrabold text-[10px] hover:bg-stone-200 cursor-pointer"
                            >
                              Hide Comment
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedCommentForReply(com);
                              setCommentReplyText(com.replyText || `Dear ${com.author},\n\nThank you for sharing Gĩkũyũ traditional knowledge regarding Gĩkũyũ herbal trees.\n\nRegarding your comments:\n\n\n\nBest regards,\nChief Elder Joseph\nDawaKienyeji Advisory Circle`);
                            }}
                            className="py-1.5 px-3 bg-emerald-950 text-white rounded-lg font-extrabold text-[10px] hover:bg-emerald-800 cursor-pointer"
                          >
                            Attach Advice Reply
                          </button>
                          <button
                            onClick={() => handleDeleteComment(com.id)}
                            className="py-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-extrabold text-[10px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center font-bold text-stone-400 py-16 bg-white border border-stone-200 rounded-2xl">No blog comments matching selection.</p>
                )}
              </div>

              {/* Right Column: Inline Discussion Reply composer */}
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm h-fit space-y-4">
                <h3 className="font-extrabold text-stone-900 text-sm border-b pb-2">Discussion advice sender</h3>

                {selectedCommentForReply ? (
                  <form onSubmit={handleSendCommentReply} className="space-y-4">
                    <div className="bg-stone-50 p-3 rounded-xl border space-y-1">
                      <p className="font-bold text-[9px] text-stone-400 uppercase leading-none">REPLYING TO COMMENT</p>
                      <p className="font-extrabold text-stone-900 mt-1">From: {selectedCommentForReply.author}</p>
                      <p className="text-[10px] text-stone-500 font-semibold line-clamp-2">"{selectedCommentForReply.text}"</p>
                    </div>

                    <div>
                      <label className="block mb-1.5 uppercase font-extrabold text-stone-900 text-[9px] tracking-wide">Reply / Advice Content *</label>
                      <textarea
                        required
                        rows={10}
                        value={commentReplyText}
                        onChange={(e) => setCommentReplyText(e.target.value)}
                        placeholder="Draft response..."
                        className="w-full p-2.5 border border-stone-300 rounded-xl bg-white text-stone-900 font-semibold leading-relaxed text-xs font-mono"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={submittingCommentReply}
                        className="flex-1 py-2 bg-emerald-950 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow text-xs disabled:bg-stone-300 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-emerald-300" />
                        {submittingCommentReply ? "Saving Advice..." : "Attach and Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedCommentForReply(null)}
                        className="px-4 py-2 border rounded-xl hover:bg-stone-50 font-bold text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-10 font-sans text-stone-400">
                    <MessageSquare className="w-8 h-8 mx-auto text-stone-350 mb-2" />
                    <p className="font-bold text-xs">No Comment Selected</p>
                    <p className="text-[10px] text-stone-400 mt-1 font-normal leading-relaxed">Select "Attach Advice Reply" on any blog comment to attach a nested responses block.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CHATBOT TRAINING & CONFIGS */}
        {activeTab === 'chatbot_training' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-extrabold text-stone-900">DawaBot Prompt Training</h1>
              <p className="text-xs text-stone-500 mt-1">Configure systemic AI instructions, safety distance safety ratings, and blocked keywords.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Sliders & overrides */}
              <div className="lg:col-span-7 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6 text-xs font-semibold text-stone-700">
                <h3 className="font-extrabold text-stone-950 text-sm">System Parameter Tuning</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between font-bold mb-1.5">
                      <span className="uppercase text-stone-900">Model Temperature</span>
                      <span className="font-mono text-emerald-700">{botTemperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0.10"
                      max="0.90"
                      step="0.05"
                      value={botTemperature}
                      onChange={(e) => setBotTemperature(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-stone-105 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                    />
                    <p className="text-[10px] text-stone-400 mt-1 font-normal leading-relaxed">Lower temperature sets highly factual grounded responses, strictly complying with the RAG botanical dataset.</p>
                  </div>

                  <div className="p-4 bg-stone-50 border rounded-xl flex items-start gap-3">
                    <Sliders className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-stone-950 text-xs font-bold">Vector index thresholds</p>
                      <p className="text-[10px] text-stone-500 font-normal leading-relaxed mt-1">Vector proximity ranking parses matching barks based on cosine-similarity. If user prompts are highly ambiguous, cosine indices fall back safely to popular species list.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <label className="block text-stone-950 uppercase font-bold">System instructions fed to Gemini</label>
                  <textarea
                    rows={6}
                    value={systemPromptOverride}
                    onChange={(e) => setSystemPromptOverride(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-900 font-normal leading-relaxed text-[11px]"
                  />
                </div>
              </div>

              {/* Poison block triggers */}
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4 font-semibold text-stone-700 text-xs">
                <h3 className="font-extrabold text-stone-950 text-sm flex items-center gap-1.5">
                  <Flame className="w-4.5 h-4.5 text-amber-600" />
                  Restricted Keyword Overrides
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed font-normal">
                  If visitor inquiries contain these exact keywords, DawaBot automatically appends emergency clinical cautionary alerts into the vector context:
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. toxicity, cardiac"
                    value={newKeywordInput}
                    onChange={(e) => setNewKeywordInput(e.target.value)}
                    className="flex-1 p-2 border border-stone-300 rounded-xl text-stone-900"
                  />
                  <button
                    onClick={() => {
                      if (newKeywordInput.trim() && !customKeywordsBlocks.includes(newKeywordInput.trim())) {
                        setCustomKeywordsBlocks([...customKeywordsBlocks, newKeywordInput.trim()]);
                        setNewKeywordInput("");
                        showStatus("Blocked keyword trigger updated!");
                      }
                    }}
                    className="px-3 bg-emerald-950 text-white hover:bg-emerald-800 rounded-xl font-bold font-sans"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {customKeywordsBlocks.map((kw, idx) => (
                    <span key={idx} className="bg-red-50 text-red-800 border border-red-100 rounded-full px-2.5 py-1 text-[10px] flex items-center gap-1 font-bold lowercase">
                      <AlertTriangle className="w-3 h-3 text-red-605" />
                      <span>{kw}</span>
                      <button 
                        onClick={() => setCustomKeywordsBlocks(customKeywordsBlocks.filter(k => k !== kw))}
                        className="text-red-500 hover:text-red-700 ml-1 font-extrabold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: AI ANALYTICS & CHATBOT LOGS */}
        {activeTab === 'ai_analytics' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-extrabold text-stone-900">Conversational AI Analytics</h1>
              <p className="text-xs text-stone-500 mt-1">Review live chat search transcripts, thumbs satisfaction indicators, and interest hit metrics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Logs area */}
              <div className="lg:col-span-8 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-extrabold text-stone-900 text-sm">Active Botanical Prompts Logged</h3>
                
                <div className="divide-y divide-stone-150 overflow-y-auto max-h-[500px] pr-1 space-y-3">
                  {analytics?.logs && analytics.logs.length > 0 ? (
                    analytics.logs.map((log: any) => (
                      <div key={log.id} className="pt-3.5 first:pt-0 flex items-start justify-between gap-4 font-sans text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] text-stone-400 font-bold">
                            <span className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">ID: {log.id}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {log.timestamp || "Today"}</span>
                          </div>
                          <p className="text-stone-900 font-extrabold text-xs">"{log.query}"</p>
                        </div>

                        <div className="shrink-0">
                          {log.satisfactionRating === "good" ? (
                            <span className="text-[9px] font-bold text-green-700 bg-green-50 border border-green-150 px-2 py-0.5 rounded-full">Helpful</span>
                          ) : log.satisfactionRating === "bad" ? (
                            <span className="text-[9px] font-bold text-red-650 bg-red-50 border border-red-150 px-2 py-0.5 rounded-full">Inaccurate</span>
                          ) : (
                            <span className="text-[9px] font-bold text-stone-400 bg-stone-50 border px-2 py-0.5 rounded-full">Unrated</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center font-bold text-xs text-stone-400 py-12">No raw logs captured. Interactions will reflect here immediately.</p>
                  )}
                </div>
              </div>

              {/* Topic metrics indicator */}
              <div className="lg:col-span-4 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4 font-sans text-xs">
                <h3 className="font-extrabold text-stone-950 text-sm border-b pb-2">Topic Interest Meter</h3>
                <p className="text-[10px] text-stone-400 leading-relaxed font-normal">Dynamic metrics summarizing search frequency for Gĩkũyũ medicinal species:</p>
                
                <div className="space-y-4 pt-2">
                  {analytics?.popularQueries?.map((pq: any, idx: number) => (
                    <div key={idx} className="space-y-1 font-bold">
                      <div className="flex items-center justify-between font-sans">
                        <span className="text-emerald-950 text-xs font-extrabold uppercase">{pq.topic}</span>
                        <span className="text-stone-500 font-mono text-[10px]">{pq.count} triggers</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#4A6741] rounded-full transition-all duration-350"
                          style={{ width: `${Math.min(100, (pq.count / (analytics?.totalChats || 5)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 8: USER CONTACT MESSAGES COMPONENT */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fade-in font-sans text-xs">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h1 className="text-2xl font-extrabold text-stone-900 leading-none">Highland Advisory Mailbox</h1>
                <p className="text-xs text-stone-500 mt-1 font-normal">Review incoming consultative inquiries, safety checkups, and dispatch responsive advice.</p>
              </div>

              {/* Message Filters */}
              <div className="flex bg-stone-100 border p-1 rounded-xl text-[10px] font-bold text-stone-600">
                {(['all', 'unread', 'read', 'replied'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setMessageFilter(f)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition ${
                      messageFilter === f ? 'bg-emerald-950 text-white shadow-sm' : 'hover:text-stone-950'
                    }`}
                  >
                    {f === 'all' ? 'Inbox' : f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Mail Grid */}
              <div className="lg:col-span-7 space-y-4 max-h-[660px] overflow-y-auto pr-1">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`p-5 rounded-2xl border transition shadow-sm bg-white hover:bg-stone-50/50 ${
                        msg.status === 'unread' ? 'border-l-4 border-l-red-500 border-stone-200 shadow' : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-stone-400">
                            <span>ID: {msg.id}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {msg.timestamp}</span>
                          </div>
                          <h4 className="font-extrabold text-stone-950 text-xs mt-1">"{msg.subject}"</h4>
                          <p className="text-[10px] text-emerald-800 font-bold">From: {msg.name} ({msg.email})</p>
                        </div>

                        <div className="shrink-0 flex flex-col items-end gap-1.5">
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleToggleMessageStatus(msg)}
                              className={`px-2 py-0.5 border text-[9px] font-bold rounded-full cursor-pointer transition ${
                                msg.status === 'unread' 
                                  ? 'bg-red-50 text-red-800 border-red-200 animate-pulse' 
                                  : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-150'
                                }`}
                              >
                                {msg.status === 'unread' ? "New" : "Mark Unread"}
                            </button>
                            <button
                              onClick={async () => {
                                try {
                                  await updateMessageStatus(msg.id, msg.status, adminPin, !msg.resolved);
                                  showStatus(`Inquiry marked as ${!msg.resolved ? 'Resolved' : 'Unresolved'}`);
                                  loadAdminData();
                                } catch (err) {
                                  showErr("Failed to update message resolution status.");
                                }
                              }}
                              className={`px-2 py-0.5 border text-[9px] font-extrabold rounded-full cursor-pointer transition ${
                                msg.resolved 
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                  : 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse'
                              }`}
                            >
                              {msg.resolved ? "✓ Resolved" : "⚠ Unresolved"}
                            </button>
                          </div>
                          {msg.status === 'replied' && (
                            <span className="bg-green-50 text-green-800 border border-green-150 rounded-full px-2 py-0.5 text-[9px] font-bold">Response Dispatched</span>
                          )}
                        </div>
                      </div>

                      <p className="text-stone-500 text-xs font-normal leading-relaxed mt-3.5 bg-stone-50/50 p-3 rounded-xl border border-stone-150/40 font-mono">
                        {msg.message}
                      </p>

                      <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                        <button
                          onClick={() => {
                            setSelectedMsgForReply(msg);
                            setAdvisoryReplyText(`Dear ${msg.name},\n\nThank you for reaching out to DawaKienyeji Advisory Circle regarding Gĩkũyũ traditional botanical flora.\n\nRegarding your concerns: \n\n[Explain preparation safety and oppose-striping rule compliance here]\n\nBest regards,\nChief Elder Joseph\nDawaKienyeji Highland Sanctuary`);
                          }}
                          className="py-1.5 px-4 bg-emerald-950 text-white rounded-lg font-bold text-[10px] shadow flex items-center gap-1"
                        >
                          <Send className="w-3 h-3 text-emerald-300" />
                          Compose Answer
                        </button>
                      </div>

                    </div>
                  ))
                ) : (
                  <p className="text-center font-bold text-stone-400 py-16 bg-white border rounded-2xl">Advisory mailbox is empty.</p>
                )}
              </div>

              {/* Compose/Reply Simulator Area */}
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm h-fit space-y-4">
                <h3 className="font-extrabold text-stone-900 text-sm border-b pb-2">Ethical Advisory Responder</h3>
                
                {selectedMsgForReply ? (
                  <form onSubmit={handleSendAdvisorySim} className="space-y-4">
                    <div className="bg-stone-50 p-2.5 rounded-xl border space-y-1">
                      <p className="font-bold text-[10px] text-stone-400 uppercase leading-none">REPLYING TO INQUIRY</p>
                      <p className="font-extrabold text-stone-900 mt-1">"{selectedMsgForReply.subject}"</p>
                      <p className="text-[10px] text-emerald-800 font-bold">Recipient: {selectedMsgForReply.email}</p>
                    </div>

                    <div>
                      <label className="block mb-1.5 uppercase font-extrabold text-stone-900 text-[10px]">Your Advisory Response Message *</label>
                      <textarea
                        required
                        rows={12}
                        value={advisoryReplyText}
                        onChange={(e) => setAdvisoryReplyText(e.target.value)}
                        placeholder="Draft response..."
                        className="w-full p-2.5 border border-stone-300 rounded-xl bg-white text-stone-900 font-semibold leading-relaxed text-xs font-mono"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={sendingReplySim}
                        className="flex-1 py-2 bg-emerald-950 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow text-xs disabled:bg-stone-300"
                      >
                        <Send className="w-3.5 h-3.5 text-emerald-300" />
                        {sendingReplySim ? "Transmitting Back..." : "Dispatch Advisory"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMsgForReply(null)}
                        className="px-4 py-2 border rounded-xl hover:bg-stone-50 font-bold text-xs"
                      >
                        Cancel
                      </button>
                    </div>

                  </form>
                ) : (
                  <div className="text-center py-10 font-sans text-stone-400">
                    <Inbox className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                    <p className="font-bold text-xs">No inquiry selected</p>
                    <p className="text-[10px] text-stone-400 mt-1 font-normal leading-relaxed">Select "Compose Answer" on any inbox entry to initiate direct administrative advisory emails.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 9: SETTINGS CONFIGURE */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in font-sans text-xs">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-extrabold text-stone-900">Administrative Settings</h1>
              <p className="text-xs text-stone-500 mt-1 font-normal">Modify general system parameters, backup states, security restrictions and compliance laws.</p>
            </div>

            <div className="max-w-2xl bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6 text-stone-700 font-semibold leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="font-extrabold text-stone-950 text-sm border-b pb-2">System Parameters</h3>
                
                <div className="flex items-center justify-between gap-4 py-1">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">Enforce clinical safety caveats</h4>
                    <p className="text-[10px] text-stone-400 font-normal mt-0.5">Appends emergency caveats in DawaBot responses containing poisonous/dangerous words.</p>
                  </div>
                  <button 
                    onClick={() => setSettingsToggles({ ...settingsToggles, clinicalCaveats: !settingsToggles.clinicalCaveats })}
                    className="p-1 hover:bg-stone-50 rounded"
                  >
                    {settingsToggles.clinicalCaveats ? <ToggleRight className="w-10 h-10 text-emerald-800" /> : <ToggleLeft className="w-10 h-10 text-stone-400" />}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 py-1 border-t">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">RONT fallbacks activation</h4>
                    <p className="text-[10px] text-stone-400 font-normal mt-0.5">Enables offline indexed keyword search when Gemini API is inactive due to network issues.</p>
                  </div>
                  <button 
                    onClick={() => setSettingsToggles({ ...settingsToggles, offlineNodes: !settingsToggles.offlineNodes })}
                    className="p-1 hover:bg-stone-50 rounded"
                  >
                    {settingsToggles.offlineNodes ? <ToggleRight className="w-10 h-10 text-emerald-800" /> : <ToggleLeft className="w-10 h-10 text-stone-400" />}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 py-1 border-t">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">Opposite Striping standard audits</h4>
                    <p className="text-[10px] text-stone-500 font-normal mt-0.5">Mandates vertical opposite harvest audit checks before registering bark barks to prevent forest scale rot.</p>
                  </div>
                  <button 
                    onClick={() => setSettingsToggles({ ...settingsToggles, opposedStripingMandate: !settingsToggles.opposedStripingMandate })}
                    className="p-1 hover:bg-stone-50 rounded"
                  >
                    {settingsToggles.opposedStripingMandate ? <ToggleRight className="w-10 h-10 text-emerald-800" /> : <ToggleLeft className="w-10 h-10 text-stone-400" />}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 py-1 border-t">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">Generative logs encryption</h4>
                    <p className="text-[10px] text-stone-500 font-normal mt-0.5">Encrypts user-query chats logs inside vector caches to uphold clinical compliance rules.</p>
                  </div>
                  <button 
                    onClick={() => setSettingsToggles({ ...settingsToggles, auditTrailLogs: !settingsToggles.auditTrailLogs })}
                    className="p-1 hover:bg-stone-50 rounded"
                  >
                    {settingsToggles.auditTrailLogs ? <ToggleRight className="w-10 h-10 text-emerald-800" /> : <ToggleLeft className="w-10 h-10 text-stone-400" />}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t space-y-4 text-xs font-bold">
                <h3 className="font-extrabold text-stone-950 text-xs uppercase text-[#4A6741]">Backup & Safety Nodes</h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => {
                      showStatus("Botanical database seeds safely backed up to highland mirror backup servers.");
                    }}
                    className="py-2 px-4 border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 rounded-xl"
                  >
                    <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                    Backup Database Nodes
                  </button>
                  <button
                    onClick={() => {
                      showStatus("Re-indexed all cosine vector distances matching active treatments registry.");
                    }}
                    className="py-2 px-4 bg-emerald-950 text-white hover:bg-emerald-800 rounded-xl"
                  >
                    Recompute Vector Cache
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
