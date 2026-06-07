import React, { useState, useEffect } from "react";
import { 
  Lock, Key, Shield, LayoutDashboard, PlusCircle, FileText, BarChart3, 
  Trash2, Edit, Save, Plus, X, UploadCloud, CheckCircle, Flame, User, Mail,
  Clock, AlertTriangle, Inbox, Settings, LogOut, Sliders, RefreshCw, HelpCircle,
  BookOpen, Compass, Search, ToggleLeft, ToggleRight, MessageSquare, Send
} from "lucide-react";
import { Herb, BlogPost, KnowledgeBaseArticle, ChatLog, ContactMessage } from "../types";
import { 
  fetchPlants, addPlant, editPlant, deletePlant, 
  fetchArticles, addArticle, fetchBlogs, addBlog, fetchAnalytics,
  loginAdmin, fetchMessages, updateMessageStatus
} from "../utils/api";
import { getPlantImage, classifyPlantType, FALLBACK_CATEGORIES, getAISuggestedImages } from "../utils/herbImages";

type SidebarTab = 'dashboard' | 'upload_docs' | 'plants' | 'knowledge' | 'blogs' | 'chatbot_training' | 'ai_analytics' | 'messages' | 'settings';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [adminPin, setAdminPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Navigation
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  
  // Data States
  const [plants, setPlants] = useState<Herb[]>([]);
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
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
    }
  }, [isAuthenticated, adminPin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const pin = await loginAdmin(emailInput, passwordInput);
      setAdminPin(pin);
      setIsAuthenticated(true);
      setEmailInput("");
      setPasswordInput("");
    } catch (err: any) {
      setLoginError("Invalid admin credentials");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setAdminPin("");
    setIsAuthenticated(false);
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
    if (confirm(`Are you absolutely sure you want to remove ${name} from the database? This affects chatbot knowledge base.`)) {
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

  // Dispatch advisory Simulated response back to user
  const handleSendAdvisorySim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisoryReplyText.trim()) return;
    setSendingReplySim(true);
    setTimeout(async () => {
      try {
        if (selectedMsgForReply) {
          await updateMessageStatus(selectedMsgForReply.id, 'replied', adminPin);
        }
        showStatus(`Advisory reply successfully dispatched via email to ${selectedMsgForReply?.email}!`);
        setSelectedMsgForReply(null);
        setAdvisoryReplyText("");
        loadAdminData();
      } catch (err) {
        showErr("Action finished but failed to log replied state.");
      } finally {
        setSendingReplySim(false);
      }
    }, 2000);
  };

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    if (messageFilter === 'all') return true;
    return msg.status === messageFilter;
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
          <h2 className="text-xl font-extrabold font-sans text-stone-900 tracking-tight">Gardens Control Portal</h2>
          <p className="text-xs text-stone-500 mt-1">
            Sign in below to authenticate as a registered system ethnobotanist.
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
            <label className="block text-stone-900 uppercase tracking-wide text-[10px] mb-2 font-extrabold">Registered Email</label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4.5 h-4.5 text-stone-400" />
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
            <label className="block text-stone-900 uppercase tracking-wide text-[10px] mb-2 font-extrabold">Gardens Key Password</label>
            <div className="relative flex items-center">
              <Key className="absolute left-3.5 w-4.5 h-4.5 text-stone-400" />
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full py-2.5 pl-11 pr-4 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 placeholder-stone-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 bg-emerald-950 text-white rounded-xl font-bold hover:bg-emerald-800 hover:scale-[1.01] active:translate-y-0.5 transition duration-150 flex items-center justify-center gap-2 shadow mt-6 disabled:bg-stone-300 disabled:cursor-not-allowed"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-300" />
            {isLoggingIn ? "Validating Credentials..." : "Unlock Dashboard"}
          </button>
        </form>
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
              <span className="font-extrabold text-sm text-stone-900 block leading-tight">Admin Console</span>
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
                <span>Dashboard</span>
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
                <span>Upload Documents</span>
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
                <span>Herbal Plants</span>
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
                <span>Knowledge Base</span>
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
                <span>Blog Posts</span>
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'blogs' ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-250 text-stone-600'
              }`}>{blogs.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('chatbot_training')}
              className={`w-full py-2.5 px-3.5 rounded-xl transition flex items-center justify-between ${
                activeTab === 'chatbot_training' ? 'bg-emerald-950 text-white shadow-md' : 'hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 shrink-0" />
                <span>Chatbot Training</span>
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
                <span>AI Analytics</span>
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
                <span>User Messages</span>
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
                <span>Settings</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-2 relative overflow-hidden">
                <span className="p-2.5 bg-emerald-50/70 border border-emerald-100/50 text-emerald-800 rounded-xl inline-block absolute right-4 top-4">
                  <Compass className="w-5 h-5 text-emerald-700" />
                </span>
                <p className="text-[10px] text-stone-400 font-extrabold uppercase tracking-wider">Flora Species</p>
                <div className="text-3xl font-extrabold text-stone-900 font-mono">{plants.length}</div>
                <p className="text-[10px] text-stone-500">Opposite stripes registered</p>
              </div>

              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-2 relative overflow-hidden">
                <span className="p-2.5 bg-amber-50/70 border border-amber-100/50 text-amber-800 rounded-xl inline-block absolute right-4 top-4">
                  <BookOpen className="w-5 h-5 text-amber-700" />
                </span>
                <p className="text-[10px] text-stone-400 font-extrabold uppercase tracking-wider">Treatises Indexed</p>
                <div className="text-3xl font-extrabold text-stone-900 font-mono">{articles.length}</div>
                <p className="text-[10px] text-stone-500">RAG chatbot contextual base</p>
              </div>

              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-2 relative overflow-hidden">
                <span className="p-2.5 bg-sky-50/70 border border-sky-100/50 text-sky-850 rounded-xl inline-block absolute right-4 top-4">
                  <MessageSquare className="w-5 h-5 text-sky-700" />
                </span>
                <p className="text-[10px] text-stone-400 font-extrabold uppercase tracking-wider">Bot Sessions</p>
                <div className="text-3xl font-extrabold text-stone-900 font-mono">{analytics?.totalChats || 0}</div>
                <p className="text-[10px] text-stone-500">Conversational queries logged</p>
              </div>

              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-2 relative overflow-hidden">
                <span className="p-2.5 bg-red-50/70 border border-red-100/50 text-red-800 rounded-xl inline-block absolute right-4 top-4 animate-pulse">
                  <Inbox className="w-5 h-5 text-red-700" />
                </span>
                <p className="text-[10px] text-stone-400 font-extrabold uppercase tracking-wider">Unread Mail</p>
                <div className="text-3xl font-extrabold text-stone-900 font-mono text-red-650">{unreadCount}</div>
                <p className="text-[10px] text-stone-500">Pending advisor reviews</p>
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
                  <div>
                    <label className="block mb-1.5 uppercase font-bold text-stone-900">Treatise Document Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Clinical assessment on Warburgia ugandensis root bark safety profiles"
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
                        placeholder="e.g. MŨCORAI"
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

                        <div className="shrink-0 flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleMessageStatus(msg)}
                            className={`px-2 py-0.5 border text-[9px] font-bold rounded-full ${
                              msg.status === 'unread' 
                                ? 'bg-red-50 text-red-800 border-red-200' 
                                : 'bg-stone-100 text-stone-605'
                            }`}
                          >
                            {msg.status === 'unread' ? "Unread" : "Mark Unread"}
                          </button>
                          {msg.status === 'replied' && (
                            <span className="bg-green-50 text-green-800 border border-green-150 rounded-full px-2 py-0.5 text-[9px] font-bold">Replied</span>
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
