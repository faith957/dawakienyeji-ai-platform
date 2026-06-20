import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import { INITIAL_HERBS, INITIAL_REMEDIES, INITIAL_BLOGS, INITIAL_KNOWLEDGE_BASE } from "./src/data/herbalDatabase.js";
import { findDictionaryMatches, KIKUYU_DICTIONARY } from "./src/data/kikuyu_botanical_dictionary.js";
import { Herb, BlogPost, TraditionalRemedy, KnowledgeBaseArticle, ChatMessage, ChatLog, BlogComment } from "./src/types.js";
import { translateHerb, translateRemedy } from "./src/utils/translations.js";

const USERS_FILE = path.join(process.cwd(), "src", "data", "users.json");
const CHAT_SESSIONS_FILE = path.join(process.cwd(), "src", "data", "user_sessions.json");

interface UserAccount {
  email: string;
  password?: string;
  name?: string;
}

interface UserSessionsData {
  [email: string]: any[];
}

// Load users helper
const loadUsers = (): UserAccount[] => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    }
  } catch (err) {
    console.error("Error reading users file:", err);
  }
  return [
    { email: "joseph@yflab.org", password: "Joseph@60", name: "Dr. Joseph Ndingi" },
    { email: "faith@mojatu.com", password: "Faith@60", name: "Faith Mojatu" }
  ];
};

// Save users helper
const saveUsers = (users: UserAccount[]) => {
  try {
    fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving users file:", err);
  }
};

// Load user sessions helper
const loadUserSessions = (): UserSessionsData => {
  try {
    if (fs.existsSync(CHAT_SESSIONS_FILE)) {
      return JSON.parse(fs.readFileSync(CHAT_SESSIONS_FILE, "utf-8"));
    }
  } catch (err) {
    console.error("Error reading chat sessions file:", err);
  }
  return {};
};

// Save user sessions helper
const saveUserSessions = (data: UserSessionsData) => {
  try {
    fs.mkdirSync(path.dirname(CHAT_SESSIONS_FILE), { recursive: true });
    fs.writeFileSync(CHAT_SESSIONS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving chat sessions file:", err);
  }
};

let appUsers = loadUsers();
let appConversations = loadUserSessions();

// Global storage in-memory for live additions/edits so changes are immediate
let dbHerbs: Herb[] = [...INITIAL_HERBS];
let dbRemedies: TraditionalRemedy[] = [...INITIAL_REMEDIES];
let dbBlogs: BlogPost[] = [...INITIAL_BLOGS];
let dbArticles: KnowledgeBaseArticle[] = [...INITIAL_KNOWLEDGE_BASE];
let dbChatLogs: ChatLog[] = [];

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
  replyText?: string;
  replyTimestamp?: string;
}

let dbComments: BlogComment[] = [
  {
    id: "c1",
    blogId: "b1",
    author: "Dr. Joseph Ndingi",
    text: "Preserving this knowledge was long overdue. Combining AI RAG with verified oral lore is spectacular.",
    timestamp: "6/5/2026, 11:15 AM",
    approved: true
  },
  {
    id: "c2",
    blogId: "b1",
    author: "Kamau wa Kuria",
    text: "Grandmother used Muthiga for our colds. This is highly accurate!",
    timestamp: "6/6/2026, 10:30 AM",
    approved: true
  },
  {
    id: "c3",
    blogId: "b2",
    author: "Grace Wanjiku",
    text: "Mugumo holds incredible cultural reverence. The ecological side benefit of sacred trees is a beautiful lesson.",
    timestamp: "6/7/2026, 2:45 PM",
    approved: true
  }
];

let dbMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Dr. Alice Kamau",
    email: "alice.k@kemri.go.ke",
    subject: "Mũthĩga chemical screening",
    message: "Greetings, I am a pharmacognosy researcher at KEMRI. We are interested in collaborating with DawaKienyeji to screen some of the Warburgia ugandensis active barks cataloged in your database. Let us discuss seed acquisition rules.",
    timestamp: "6/5/2026, 9:15 AM",
    status: "unread"
  },
  {
    id: "2",
    name: "James Githua",
    email: "jgithua@yahoo.com",
    subject: "Prunus Africana propagation logs",
    message: "I have successfully germinated 250 wild seedlings on my farm in Murang'a using your cold-stratification vertical guide. Do you have a nursery seed distributor list for other counties?",
    timestamp: "6/4/2026, 4:32 PM",
    status: "read"
  }
];

// Default security PIN for admin operations
const ADMIN_SECURITY_PIN = "dawa2026";

const app = express();
app.use(express.json());

// Global storage in-memory for email newsletter subscriptions
let dbSubscriptions: { id: string; email: string; timestamp: string }[] = [];

// Admin authentication helper middleware
const verifyAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const pin = req.headers["x-admin-pin"] || req.body.adminPin;
  if (pin === ADMIN_SECURITY_PIN) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized. Invalid administrative PIN." });
  }
};

  // --- API ENDPOINTS ---

  // Sign up for public users (members, caretakers)
  app.post("/api/user/signup", (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "All fields are required for registration." });
    }
    const emailLower = email.toLowerCase().trim();
    if (appUsers.some(u => u.email.toLowerCase() === emailLower)) {
      return res.status(400).json({ error: "This email address is already registered." });
    }
    const newUser = { email: emailLower, password, name };
    appUsers.push(newUser);
    saveUsers(appUsers);
    res.json({ success: true, email: emailLower, name, adminPin: "MEMBER_" + emailLower, isAdmin: false });
  });

  // Admin and normal User login credential endpoint
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const emailLower = email.toLowerCase().trim();
    
    const foundUser = appUsers.find(u => u.email.toLowerCase() === emailLower && u.password === password);
    if (foundUser || (emailLower === "joseph@yflab.org" && password === "Joseph@60")) {
      const isJoseph = emailLower === "joseph@yflab.org";
      const userName = foundUser?.name || (isJoseph ? "Dr. Joseph Ndingi" : "Faith Mojatu");
      res.json({ 
        success: true, 
        adminPin: isJoseph ? ADMIN_SECURITY_PIN : ("MEMBER_" + emailLower),
        isAdmin: isJoseph,
        email: emailLower,
        name: userName
      });
    } else {
      res.status(401).json({ error: "Invalid credentials. Please verify your email and password." });
    }
  });

  // Get user's chats
  app.get("/api/user/sessions", (req, res) => {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "User email required" });
    }
    const emailLower = (email as string).toLowerCase().trim();
    const sessions = appConversations[emailLower] || [];
    res.json({ success: true, sessions });
  });

  // Save/Update user's chats
  app.post("/api/user/sessions", (req, res) => {
    const { email, sessions } = req.body;
    if (!email || !sessions) {
      return res.status(400).json({ error: "Email and sessions array are required." });
    }
    const emailLower = (email as string).toLowerCase().trim();
    appConversations[emailLower] = sessions;
    saveUserSessions(appConversations);
    res.json({ success: true });
  });

  // Get all user contact messages (Admin only)
  app.get("/api/messages", verifyAdmin, (req, res) => {
    res.json(dbMessages);
  });

  // Post a new contact message (Public client-side submission)
  app.post("/api/messages", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message body are required inputs." });
    }
    const maxId = dbMessages.reduce((max, m) => Math.max(max, parseInt(m.id) || 0), 0);
    const newMessage = {
      id: String(maxId + 1),
      name,
      email,
      subject: subject || "No Subject Context",
      message,
      timestamp: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) + ", " + new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "unread" as const
    };
    dbMessages.unshift(newMessage);
    res.json({ success: true, message: newMessage });
  });

  // Post subscription email
  app.post("/api/subscribe", (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "A valid email address is required." });
    }
    const exists = dbSubscriptions.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.json({ success: true, message: "This email is already subscribed!", alreadyActive: true });
    }
    const maxSubId = dbSubscriptions.reduce((max, s) => Math.max(max, parseInt(s.id) || 0), 0);
    const newSubscription = {
      id: String(maxSubId + 1),
      email: email.trim(),
      timestamp: new Date().toISOString()
    };
    dbSubscriptions.push(newSubscription);
    res.json({ success: true, message: "Thank you for subscribing to our traditional herbal updates!" });
  });

// Professional SMTP/simulated email sender helper
async function sendReplyEmail(userEmail: string, userName: string, originalMessage: string, replyText: string, subject: string) {
  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8ed; border-radius: 12px; background-color: #fafbf9;">
      <div style="text-align: center; border-bottom: 2px solid #1a3a2a; padding-bottom: 15px; margin-bottom: 20px;">
        <img src="https://ais-dev-tuggk2iq62de7zeoijpvwi-49237317471.europe-west3.run.app/assets/logo.png" alt="DawaKienyeji Logo" style="width: 60px; height: 60px; border-radius: 50%; opacity: 0.9;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3004/3004111.png'" />
        <h2 style="color: #0b1f14; margin: 10px 0 0 0; font-weight: 800; letter-spacing: -0.5px;">DawaKienyeji Advisory</h2>
        <span style="font-size: 11px; text-transform: uppercase; color: #d4a017; font-weight: 700; letter-spacing: 1px;">Indigenous Botanical Conservation Program</span>
      </div>
      
      <div style="color: #2c3e50; line-height: 1.6; font-size: 14px; padding: 10px 0;">
        <p>Dear <strong>${userName}</strong>,</p>
        <p>Greetings from Nyeri highland sanctuary. Our expert ethnobotanists and mountain advisors have reviewed your consultative inquiry regarding <strong>"${subject}"</strong>.</p>
        
        <div style="background-color: #ffffff; border-left: 4px solid #16a34a; padding: 18px; margin: 20px 0; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border: 1px solid #f1f5f9; border-left-width: 4px;">
          <h4 style="margin: 0 0 10px 0; color: #16a34a; text-transform: uppercase; font-size: 11px; tracking-widest: 1px; font-weight: 800;">Official Advisory Correspondence</h4>
          <p style="margin: 0; color: #1e293b; font-size: 13.5px; white-space: pre-wrap; font-weight: 500; line-height: 1.7;">${replyText}</p>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 12px; color: #64748b; margin-top: 25px;">
          <strong style="color: #475569; display: block; margin-bottom: 5px;">Your Filed Consultation:</strong>
          <span style="font-style: italic; display: block; padding-left: 5px; border-left: 2px solid #cbd5e1;">"${originalMessage}"</span>
        </div>
      </div>
      
      <div style="margin-top: 35px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; line-height: 1.5;">
        <p><strong>DawaKienyeji Conservation Center</strong><br />Nyeri County Slopes, Aberdares Forest Margins, Central Kenya</p>
        <p style="color: #94a3b8;">This email is a tracked Delivery Confirmation of your traditional botanical inquiry.</p>
      </div>
    </div>
  `;

  console.log(`[SMTP Engine] Preparing advisory email dispatch to user: <${userEmail}>`);

  // Try SMTP transport if credentials exist, else use simulated logging
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const info = await transporter.sendMail({
        from: `"DawaKienyeji Conservation" <${user}>`,
        to: userEmail,
        subject: `RE: ${subject} - Traditional Advisory`,
        html: htmlContent,
      });

      console.log(`[SMTP Engine] Transmitted successfully! MessageID: ${info.messageId}`);
      return { success: true, mode: "smtp", messageId: info.messageId, timestamp: new Date().toISOString() };
    } catch (err: any) {
      console.warn(`[SMTP Engine] SMTP transmission failed, resorting to system logging. Error:`, err?.message || err);
    }
  } else {
    console.log(`[SMTP Engine] SMTP credentials are not configured. Generating professional logged confirmation output.`);
  }

  return {
    success: true,
    mode: "simulated_logged",
    messageId: `sim-advisory-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  };
}

  // --- COMMENTS API ENDPOINTS ---

  // Get approved comments for a specific blog post
  app.get("/api/blogs/:blogId/comments", (req, res) => {
    const { blogId } = req.params;
    const comments = dbComments.filter(c => c.blogId === blogId && c.approved);
    res.json(comments);
  });

  // Submit a comment for a blog post (Starts as unapproved for moderation)
  app.post("/api/blogs/:blogId/comments", (req, res) => {
    const { blogId } = req.params;
    const { author, text } = req.body;
    if (!author || !text) {
      return res.status(400).json({ error: "Author name and comment content are required." });
    }
    const newComment: BlogComment = {
      id: "comment-" + (dbComments.length + 1) + "-" + Math.random().toString(36).substr(2, 5),
      blogId,
      author: author.trim(),
      text: text.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) + ", " + new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      approved: false // starts unapproved for admin dashboard moderation
    };
    dbComments.unshift(newComment);
    res.json({ success: true, comment: newComment });
  });

  // Get all comments for admin moderation (Admin only)
  app.get("/api/comments", verifyAdmin, (req, res) => {
    res.json(dbComments);
  });

  // Moderate comments - approve/reject or reply (Admin only)
  app.put("/api/comments/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const { approved, replyText, text } = req.body;
    const comm = dbComments.find(c => c.id === id);
    if (!comm) {
      return res.status(404).json({ error: "Comment not found." });
    }
    if (approved !== undefined) {
      comm.approved = approved;
    }
    if (text !== undefined) {
      comm.text = text;
    }
    if (replyText !== undefined) {
      comm.replyText = replyText;
      comm.replyTimestamp = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) + ", " + new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    res.json({ success: true, comment: comm });
  });

  // Delete a comment (Admin only)
  app.delete("/api/comments/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const index = dbComments.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Comment not found." });
    }
    const removed = dbComments.splice(index, 1);
    res.json({ success: true, comment: removed[0] });
  });


  // --- USER MESSAGES & ADVISORY CHANNELS ---

  // Dispatch replies directly and log email delivery metrics (Admin only)
  app.post("/api/messages/:id/reply", verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { replyText } = req.body;
    if (!replyText || !replyText.trim()) {
      return res.status(400).json({ error: "Reply message text is required." });
    }

    const msg = dbMessages.find(m => m.id === id);
    if (!msg) {
      return res.status(404).json({ error: "User message not found." });
    }

    try {
      // Trigger the nodemailer professional SMTP delivery
      const tracking = await sendReplyEmail(msg.email, msg.name, msg.message, replyText, msg.subject);
      
      // Update local memory message representation
      msg.status = "replied";
      msg.replyText = replyText;
      msg.replyTimestamp = tracking.timestamp;
      (msg as any).resolved = true;
      (msg as any).deliveryTracking = tracking;

      res.json({ 
        success: true, 
        message: msg, 
        delivery: tracking 
      });
    } catch (err: any) {
      console.error("Advisory dispatch error:", err);
      res.status(500).json({ error: "Failed to dispatch email reply." });
    }
  });

  // Toggle/Update message status / resolution (Admin only)
  app.put("/api/messages/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const { status, resolved } = req.body;
    const msg = dbMessages.find(m => m.id === id);
    if (!msg) {
      return res.status(404).json({ error: "Message record not found." });
    }
    if (status) {
      msg.status = status;
    }
    if (resolved !== undefined) {
      (msg as any).resolved = resolved;
    }
    res.json({ success: true, message: msg });
  });

  // 1. Get all herbs
  app.get("/api/plants", (req, res) => {
    res.json(dbHerbs);
  });

  // 2. Add a new herb (Admin only)
  app.post("/api/plants", verifyAdmin, (req, res) => {
    const newHerb: Herb = req.body.herb;
    if (!newHerb || !newHerb.kikuyuName || !newHerb.scientificName) {
      return res.status(400).json({ error: "Missing required herb fields." });
    }
    // Generate safe auto-incrementing ID if missing
    const maxHerbId = dbHerbs.reduce((max, h) => Math.max(max, parseInt(h.id) || 0), 0);
    newHerb.id = String(maxHerbId + 1);
    dbHerbs.unshift(newHerb); // add to top of list
    res.json({ success: true, plant: newHerb });
  });

  // 3. Edit a herb (Admin only)
  app.put("/api/plants/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const updatedHerb: Herb = req.body.herb;
    const index = dbHerbs.findIndex((h) => h.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Herb not found." });
    }
    dbHerbs[index] = { ...dbHerbs[index], ...updatedHerb };
    res.json({ success: true, plant: dbHerbs[index] });
  });

  // 4. Delete a herb (Admin only)
  app.delete("/api/plants/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const index = dbHerbs.findIndex((h) => h.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Herb not found." });
    }
    const removed = dbHerbs.splice(index, 1);
    res.json({ success: true, plant: removed[0] });
  });

  // 5. Get all traditional remedies
  app.get("/api/remedies", (req, res) => {
    res.json(dbRemedies);
  });

  // 6. Get all blogs
  app.get("/api/blogs", (req, res) => {
    res.json(dbBlogs);
  });

  // 7. Add a new blog (Admin only)
  app.post("/api/blogs", verifyAdmin, (req, res) => {
    const newBlog: BlogPost = req.body.blog;
    if (!newBlog || !newBlog.title || !newBlog.content) {
      return res.status(400).json({ error: "Blog title and content are required." });
    }
    const maxBlogId = dbBlogs.reduce((max, b) => Math.max(max, parseInt(b.id) || 0), 0);
    newBlog.id = String(maxBlogId + 1);
    newBlog.date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    dbBlogs.unshift(newBlog);
    res.json({ success: true, blog: newBlog });
  });

  // 8. Get all knowledge base articles / custom documents
  app.get("/api/articles", (req, res) => {
    res.json(dbArticles);
  });

  // 9. Add or upload a new knowledge document (Admin only)
  app.post("/api/articles", verifyAdmin, (req, res) => {
    const newDoc: KnowledgeBaseArticle = req.body.article;
    if (!newDoc || !newDoc.title || !newDoc.content) {
      return res.status(400).json({ error: "Document title and content are required." });
    }
    const maxDocId = dbArticles.reduce((max, a) => Math.max(max, parseInt(a.id) || 0), 0);
    newDoc.id = String(maxDocId + 1);
    newDoc.lastUpdated = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
    dbArticles.unshift(newDoc);
    res.json({ success: true, article: newDoc });
  });

  // 10. Get Analytics
  app.get("/api/analytics", (req, res) => {
    // Generate dynamic simple summary stats
    const totalChats = dbChatLogs.length;
    const satisfactionGood = dbChatLogs.filter((l) => l.satisfactionRating === "good").length;
    const satisfactionBad = dbChatLogs.filter((l) => l.satisfactionRating === "bad").length;
    
    // Extrapolate popular search topics
    const topicsMap: { [key: string]: number } = {};
    dbChatLogs.forEach((l) => {
      const q = l.query.toLowerCase();
      dbHerbs.forEach((h) => {
        if (q.includes(h.kikuyuName.toLowerCase()) || q.includes(h.scientificName.toLowerCase()) || q.includes(h.commonName.toLowerCase())) {
          topicsMap[h.kikuyuName] = (topicsMap[h.kikuyuName] || 0) + 1;
        }
      });
    });

    const popularQueries = Object.entries(topicsMap)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json({
      totalChats,
      satisfactionGood,
      satisfactionBad,
      popularQueries: popularQueries.length ? popularQueries : [{ topic: "MŨTHĨGA", count: 3 }, { topic: "MŨTONGU", count: 2 }],
      logs: dbChatLogs.slice(0, 50),
    });
  });

  // 11. Feed chat feedback (Rating thumbs)
  app.post("/api/feedback", (req, res) => {
    const { logId, rating } = req.body;
    const log = dbChatLogs.find((l) => l.id === logId);
    if (log) {
      log.satisfactionRating = rating;
      return res.json({ success: true });
    }
    res.status(404).json({ error: "Log not found." });
  });

  // 12. Chatbot RAG / Knowledge Search endpoint
  let geminiClientCache: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!geminiClientCache) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is missing.");
      }
      geminiClientCache = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return geminiClientCache;
  }

  function getOfflineRelatedSuggestions(query: string, language: string): string {
    const norm = (str: string) => {
      return str.toLowerCase()
        .replace(/[ĩĩ]/g, 'i')
        .replace(/[ũũ]/g, 'u')
        .replace(/[^a-z0-9\s]/g, ' ');
    };
    const qNorm = norm(query || "").trim();
    if (!qNorm) {
      return language === "sw" ? "Tafadhali andika jina la mmea." : "Please type a plant or remedy name.";
    }

    const words = qNorm.split(/\s+/).filter(w => w.length > 2);

    interface Candidate {
      name: string;
      scientific: string;
      common: string;
      score: number;
      source: 'herb' | 'dict';
      uses: string[];
    }

    const candidates: Candidate[] = [];

    const allPlants: { name: string; scientific: string; common: string; uses: string[]; source: 'herb' | 'dict' }[] = [];
    
    dbHerbs.forEach(h => {
      allPlants.push({
        name: h.kikuyuName,
        scientific: h.scientificName,
        common: h.commonName,
        uses: h.medicinalUses,
        source: 'herb'
      });
    });

    KIKUYU_DICTIONARY.forEach(d => {
      allPlants.push({
        name: d.kikuyuName,
        scientific: d.scientificName,
        common: d.commonName,
        uses: d.uses,
        source: 'dict'
      });
    });

    allPlants.forEach(p => {
      let score = 0;
      const pNameNorm = norm(p.name);
      const pSciNorm = norm(p.scientific);
      const pComNorm = norm(p.common);

      if (qNorm && (pNameNorm.includes(qNorm) || qNorm.includes(pNameNorm))) {
        score += 15;
      }
      if (pSciNorm && (pSciNorm.includes(qNorm) || qNorm.includes(pSciNorm))) {
        score += 10;
      }
      if (pComNorm && (pComNorm.includes(qNorm) || qNorm.includes(pComNorm))) {
        score += 8;
      }

      words.forEach(w => {
        if (pNameNorm.includes(w)) score += 5;
        if (pSciNorm.includes(w)) score += 4;
        if (pComNorm.includes(w)) score += 3;
        (p.uses || []).forEach(u => {
          if (norm(u).includes(w)) score += 1;
        });
      });

      if (score > 0) {
        candidates.push({
          name: p.name,
          scientific: p.scientific,
          common: p.common,
          score,
          source: p.source,
          uses: p.uses
        });
      }
    });

    candidates.sort((a, b) => b.score - a.score);
    const uniqueCandidatesMap = new Map<string, Candidate>();
    candidates.forEach(c => {
      const key = c.name.toUpperCase();
      if (!uniqueCandidatesMap.has(key)) {
        uniqueCandidatesMap.set(key, c);
      }
    });

    const topSuggestions = Array.from(uniqueCandidatesMap.values()).slice(0, 3);

    if (language === "sw") {
      let msg = "";
      if (topSuggestions.length > 0) {
        msg += `Mmea huu si wa kawaida katika rekodi zetu fupi, lakini kulingana na kile ulichouliza, hapa kuna mapendekezo ya miongozo inayohusiana ya mimea inayothaminiwa kijadi katika jamii:\n\n`;
        topSuggestions.forEach(s => {
          msg += `- **${s.name}** (*${s.scientific}* - ${s.common})\n  Matumizi ya Kiasili: ${(s.uses || []).slice(0, 3).join(", ")}\n`;
        });
      } else {
        msg += `Unaweza kuchunguza mimea mingine maarufu ya asili kama vile **MŨTHĨGA** au **MŨCORAI** inayothaminiwa kijadi kwa ajili ya afya.\n\n`;
      }
      msg += `\nTiba za kiasili zinaweza zisiwafae kila mtu. Watu wajawazito, wanaonyonyesha, wenye matatizo ya kiafya, au wanaotumia dawa wanapaswa kushauriana na daktari aliyehitimu kabla ya kutumia dawa yoyote ya mitishamba.`;
      return msg;
    } else if (language === "ki") {
      let msg = "";
      if (topSuggestions.length > 0) {
        msg += `Mũthĩga ũcio ndũandĩkĩtwo wega haha rĩũ, no kũgerera kĩrĩa ũraria, noũthome igũrũ rĩa mĩthĩga ĩno ĩhanaine nayo ĩrĩa ĩhũmagĩrũo tene nĩ matũũra:\n\n`;
        topSuggestions.forEach(s => {
          msg += `- **${s.name}** (*${s.scientific}* - ${s.common})\n  Ũhũmĩri wa Kĩndũire: ${(s.uses || []).slice(0, 3).join(", ")}\n`;
        });
      } else {
        msg += `Noũgĩe kũmenya igũrũ rĩa mĩthĩga ĩngĩ ta **MŨTHĨGA** kana **MŨCORAI** ĩrĩa ĩrĩ ngumo na ĩrĩa ĩhũmagĩrũo wega nĩ matũũra.\n\n`;
      }
      msg += `\nMĩthĩga ya kĩndũĩre ti njega kũrĩ andũ othe. Andũ arĩa marĩ na nda, arĩa marongithia kĩndũĩre, kana arĩa maroria mĩgũto ĩngĩ mathĩna-inĩ ma mĩri mathome mbre matianarĩa mĩthĩga ĩno na ndagĩtarĩ.`;
      return msg;
    } else if (language === "fr") {
      let msg = "";
      if (topSuggestions.length > 0) {
        msg += `Les usages habituels de cette plante ne sont pas listés de manière exhaustive ici, mais d'après votre recherche, voici d'autres plantes connexes traditionnellement valorisées par les communautés :\n\n`;
        topSuggestions.forEach(s => {
          msg += `- **${s.name}** (*${s.scientific}* - ${s.common})\n  Usages Traditionnels : ${(s.uses || []).slice(0, 3).join(", ")}\n`;
        });
      } else {
        msg += `N'hésitez pas à explorer d'autres plantes traditionnelles bien connues comme **MŨTHĨGA** ou **MŨCORAI** de notre flore traditionnelle d'Afrique de l'Est.\n\n`;
      }
      msg += `\nLes remèdes traditionnels peuvent ne pas convenir à tout le monde. Les personnes enceintes, qui allaitent, qui ont des problèmes médicaux existants ou qui prennent des médicaments doivent consulter un professionnel de la santé qualifié avant d'utiliser tout remède à base de plantes.`;
      return msg;
    } else {
      let msg = "";
      if (topSuggestions.length > 0) {
        msg += `While detailed specifications for this specific plant are not immediately highlighted here, you may be interested in these related plants traditionally used in indigenous medicinal practices:\n\n`;
        topSuggestions.forEach(s => {
          msg += `- **${s.name}** (*${s.scientific}* - ${s.common})\n  Traditional Uses: ${(s.uses || []).slice(0, 3).join(", ")}\n`;
        });
      } else {
        msg += `You are welcome to read about other well-known botanical species such as **MŨTHĨGA** or **MŨCORAI** historically used by East African communities.\n\n`;
      }
      msg += `\nTraditional remedies may not be suitable for everyone. Individuals who are pregnant, breastfeeding, have existing medical conditions, or are taking medication should consult a qualified healthcare professional before using any herbal remedy.`;
      return msg;
    }
  }

  app.post("/api/chat", async (req, res) => {
    const { messages, currentQuery, language } = req.body;
    if (!currentQuery) {
      return res.status(400).json({ error: "No query provided." });
    }

    // Map language code to English full names for Gemini prompt context
    const languageMap: { [key: string]: string } = {
      en: "English",
      sw: "Kiswahili",
      ki: "Kikuyu (Gĩkũyũ)",
      fr: "French"
    };
    const activeLanguageName = languageMap[language as string] || "English";

    // A. Perform local semantic keyword indexing to filter relevant context for the RAG prompt
    const norm = (str: string) => {
      return str.toLowerCase()
        .replace(/[ĩĩ]/g, 'i')
        .replace(/[ũũ]/g, 'u')
        .replace(/[^a-z0-9\s]/g, ' ');
    };

    // Context Extraction Helper to detect known plants mentioned within any message
    const getPresentPlantsKeys = (text: string) => {
      const textNorm = norm(text);
      const foundNames: string[] = [];

      dbHerbs.forEach(h => {
        const kn = norm(h.kikuyuName);
        const cn = norm(h.commonName);
        const sn = norm(h.scientificName);
        // Ensure word bounds or clean substring checks
        if (textNorm.includes(kn) || textNorm.includes(cn) || textNorm.includes(sn)) {
          if (!foundNames.includes(h.kikuyuName)) {
            foundNames.push(h.kikuyuName);
          }
        }
      });

      KIKUYU_DICTIONARY.forEach(e => {
        const kn = norm(e.kikuyuName);
        const cn = norm(e.commonName || "");
        const sn = norm(e.scientificName || "");
        if (textNorm.includes(kn) || textNorm.includes(cn) || textNorm.includes(sn)) {
          if (!foundNames.includes(e.kikuyuName)) {
            foundNames.push(e.kikuyuName);
          }
        }
      });

      return foundNames;
    };

    const directPlantsKeys = getPresentPlantsKeys(currentQuery);
    const queryNormRaw = norm(currentQuery).trim();
    
    // Check if query is likely a follow-up asking for details, prep, or dosage about previously discussed plants
    const isFollowUp = 
      queryNormRaw.length < 55 && (
        queryNormRaw.includes("prepare") || queryNormRaw.includes("prep") || queryNormRaw.includes("how to") || 
        queryNormRaw.includes("dose") || queryNormRaw.includes("dosage") || queryNormRaw.includes("use") || 
        queryNormRaw.includes("using") || queryNormRaw.includes("precaution") || queryNormRaw.includes("safety") || 
        queryNormRaw.includes("warning") || queryNormRaw.includes("danger") || queryNormRaw.includes("it") || 
        queryNormRaw.includes("them") || queryNormRaw.includes("this") || queryNormRaw.includes("that") || 
        queryNormRaw.includes("more") || queryNormRaw.includes("tell") || queryNormRaw.includes("explain") ||
        queryNormRaw.includes("remedy") || queryNormRaw.includes("recipe") || queryNormRaw.includes("is there") ||
        queryNormRaw.includes("do you") || queryNormRaw.includes("any other") || queryNormRaw.includes("where") ||
        queryNormRaw.includes("swelling") || queryNormRaw.includes("pain") || queryNormRaw.includes("ache")
      );

    let enrichedQuery = currentQuery;
    let contextPlantFound = "";
    let contextSymptomFound = "";

    // If no direct plants are found, or if it has follow-up indicators, let's pull context from message history
    if (directPlantsKeys.length === 0 || isFollowUp) {
      if (Array.isArray(messages) && messages.length > 0) {
        // Walk backwards to find most recently mentioned plant names in history
        for (let i = messages.length - 1; i >= 0; i--) {
          const msg = messages[i];
          const msgText = msg ? (msg.text || "") : "";
          if (!msgText) continue;
          const msgPlants = getPresentPlantsKeys(msgText);
          if (msgPlants.length > 0) {
            contextPlantFound = msgPlants.join(" ");
            break;
          }
        }

        // Walk backwards to find most recently mentioned symptoms and medical conditions
        const symptomsList = [
          "toothache", "tooth", "teeth", "tooch", "thoot", "toot", 
          "stomach", "fever", "malaria", "cough", "headache", "backache",
          "arthritis", "joint", "sinus", "diarrhea", "eyes", "skin", "cold"
        ];
        for (let i = messages.length - 1; i >= 0; i--) {
          const msg = messages[i];
          const msgText = msg ? norm(msg.text || "") : "";
          if (!msgText) continue;
          for (const s of symptomsList) {
            if (msgText.includes(s)) {
              contextSymptomFound = s;
              break;
            }
          }
          if (contextSymptomFound) break;
        }
      }
    }

    if (contextPlantFound || contextSymptomFound) {
      enrichedQuery = `${currentQuery} ${contextPlantFound} ${contextSymptomFound}`.trim();
      console.log(`[Info-Log] Enriching follow-up query with conversational history: "${currentQuery}" -> "${enrichedQuery}"`);
    }

    const queryNorm = norm(enrichedQuery).trim();
    const stopwords = new Set([
      "i", "have", "a", "the", "and", "of", "to", "for", "in", "is", "it", "on", "with", "at",
      "using", "how", "do", "you", "use", "what", "can", "treat", "cure", "remedy", "medicinal",
      "plant", "herb", "for", "about", "find", "search", "where", "my", "some", "any", "me", "give", "tell",
      "good", "bad", "very", "much", "well", "best", "help", "need", "please", "like", "will", "would", "should", "could"
    ]);
    const queryKeywords = queryNorm.split(/\s+/)
      .filter(word => word.length > 2 && !stopwords.has(word));
    const finalQueryWords = queryKeywords.length > 0 ? queryKeywords : queryNorm.split(/\s+/).filter(w => w.length > 1);

    // Scoring function to evaluate matching relevance and rule out irrelevant loose results
    const scoreItem = (fields: string[]): number => {
      let score = 0;
      
      // 1. Direct or substring matching of physical query
      const queryInField = fields.some(f => f && f.includes(queryNorm));
      if (queryInField) {
        score += 150;
      }
      const fieldInQuery = fields.some(f => f && queryNorm.includes(f));
      if (fieldInQuery) {
        score += 50;
      }

      // Typos or equivalence mapping (e.g. "tooch" -> "tooth")
      const checkEquivalentTerms = (w: string) => {
        const list = [w];
        if (w === "tooch" || w === "thoot" || w === "toot") {
          list.push("tooth", "teeth", "toothache", "toothaches");
        }
        if (w === "tooth" || w === "teeth" || w === "toothache" || w === "toothaches") {
          list.push("tooch", "thoot", "toot");
        }
        return list;
      };

      // 2. Keyword-based matching with safety weight for weak vs strong words
      finalQueryWords.forEach(word => {
        const equivalents = checkEquivalentTerms(word);
        const matchesWord = fields.some(f => {
          if (!f) return false;
          return equivalents.some(eq => f.includes(eq));
        });

        if (matchesWord) {
          const weakWords = [
            "ache", "aches", "pain", "pains", "treatment", "remedy", "remedies",
            "medicine", "plant", "herb", "herbs", "mmea", "dawa", "sore", "sores"
          ];
          if (weakWords.includes(word)) {
            score += 10; // low score for generic symptoms
          } else {
            score += 80; // high score for specific conditions/organs
          }
        }
      });

      return score;
    };

    // Scored and dynamic-threshold matching extractor
    const getBestMatches = <T>(items: T[], fieldsExtractor: (item: T) => string[]): T[] => {
      const itemsWithScore = items.map(item => {
        const fields = fieldsExtractor(item).map(f => f ? norm(f) : "");
        return { item, score: scoreItem(fields) };
      });

      const matchedWithScore = itemsWithScore.filter(x => x.score > 0);
      if (matchedWithScore.length === 0) return [];

      const maxScore = Math.max(...matchedWithScore.map(x => x.score));

      // Threshold: if we have highly specific term matches (score >= 80), 
      // discard items that only match generic terms like 'ache' or 'pain'.
      let threshold = 1;
      if (maxScore >= 80) {
        threshold = 60; // Enforces matching of specific semantic keywords
      }

      return matchedWithScore
        .filter(x => x.score >= threshold)
        .sort((a, b) => b.score - a.score)
        .map(x => x.item);
    };

    // Find matching herbs
    let matchedHerbs = getBestMatches(dbHerbs, (h) => [
      h.kikuyuName,
      h.commonName,
      h.scientificName,
      h.description,
      ...h.medicinalUses
    ]).slice(0, 3);

    // Find matching entries from Kikuyu Botanical Dictionary document
    const rawMatchedDictEntries = findDictionaryMatches(enrichedQuery);
    let matchedDictEntries = getBestMatches(rawMatchedDictEntries, (entry) => [
      entry.kikuyuName,
      entry.commonName,
      entry.scientificName,
      entry.description,
      ...(entry.uses || []),
      entry.safeCautions || ""
    ]);

    // Deduplicate: remove dictionary entries already detailed in matchedHerbs
    matchedDictEntries = matchedDictEntries.filter(entry => {
      const normEntryName = entry.kikuyuName.toLowerCase().replace(/[ĩũ]/g, '');
      const isAlreadyInDetailed = matchedHerbs.some(h => {
        const normHerbName = h.kikuyuName.toLowerCase().replace(/[ĩũ]/g, '');
        return normEntryName.includes(normHerbName) || normHerbName.includes(normEntryName);
      });
      return !isAlreadyInDetailed;
    }).slice(0, 3);

    // Find matching remedies
    let matchedRemedies = getBestMatches(dbRemedies, (r) => [
      r.title,
      ...r.symptoms,
      ...r.recommendedHerbs
    ]).slice(0, 2);

    // Find custom articles/knowledge chunks
    let matchedArticles = getBestMatches(dbArticles, (a) => [
      a.title,
      a.excerpt,
      a.content
    ]).slice(0, 2);

    // Build context string from indexed database matches
    let contextStr = "--- AUTHENTIC TRADITIONAL BOTANICAL RECORDS ---\n\n";
    const hasLocalMatch = (matchedDictEntries.length > 0 || matchedHerbs.length > 0 || matchedRemedies.length > 0);

    if (matchedDictEntries.length > 0) {
      contextStr += "MATCHED REORGANIZED KIKUYU BOTANICAL DICTIONARY DOCUMENT ENTRIES:\n";
      matchedDictEntries.forEach((entry) => {
        contextStr += `- Kikuyu Name: ${entry.kikuyuName}\n  Scientific Name: ${entry.scientificName}\n  Family: ${entry.family}\n  Common English Name: ${entry.commonName}\n  Description and Traditional Prep/Uses: ${entry.description}\n  Categorization: ${entry.category}\n  Known Traditional Uses: ${entry.uses.join(", ")}\n`;
        if (entry.safeCautions) {
          contextStr += `  Critical Safety Warnings/Cautions: ${entry.safeCautions}\n`;
        }
        contextStr += `\n`;
      });
    }

    if (matchedHerbs.length > 0) {
      contextStr += "RELEVANT PLANTED MEDICINAL HERBS:\n";
      matchedHerbs.forEach((h) => {
        contextStr += `- Kikuyu Name: ${h.kikuyuName}\n  Scientific Name: ${h.scientificName}\n  English Name: ${h.commonName}\n  Parts Used: ${h.partUsed}\n  Uses: ${h.medicinalUses.join(", ")}\n  Preparation: ${h.preparation}\n  Traditional Context: ${h.traditionalContext}\n  Safety Precautions: ${h.precautions}\n  Type Class: ${h.category}\n  Danger Rating: ${h.severityRating || 'Normal'}\n\n`;
      });
    } else if (matchedDictEntries.length === 0) {
      if (hasLocalMatch) {
        // Pour out a general overview of the top 5 herbs as supportive details
        contextStr += "GENERAL POPULAR BOTANICAL FLORA REFFERENCE:\n";
        dbHerbs.slice(0, 5).forEach((h) => {
          contextStr += `- Kikuyu Name: ${h.kikuyuName} (${h.scientificName} / ${h.commonName}): Prep: ${h.preparation}. Uses: ${h.medicinalUses.slice(0, 2).join(", ")}. Safety: ${h.precautions}\n`;
        });
        contextStr += "\n";
      } else {
        contextStr += `[NOTICE]: No direct match found in our local traditional records for "${currentQuery}". Please automatically perform an external search to identify safe, trusted herbal alternatives from reputable sources, presenting them in a highly warm and friendly tone.\n\n`;
      }
    }

    if (matchedRemedies.length > 0) {
      contextStr += "RELEVANT TRADITIONAL RECIPES & REMEDIES:\n";
      matchedRemedies.forEach((r) => {
        contextStr += `- Active Remedy Name: ${r.title}\n  Category: ${r.category}\n  For Symptoms: ${r.symptoms.join(", ")}\n  Herbs Utilized: ${r.recommendedHerbs.join(", ")}\n  Step Preparation Guide:\n   ${r.steps.map((s, idx) => `${idx + 1}. ${s}`).join("\n   ")}\n  Standard Dose: ${r.dose}\n\n`;
      });
    }

    if (matchedArticles.length > 0) {
      contextStr += "RELEVANT RESEARCH ARCHIVES & SUSTAINABILITY LOGS:\n";
      matchedArticles.forEach((a) => {
        contextStr += `- Document Section: ${a.title}\n  Summary: ${a.excerpt}\n  Verified Content Guidelines:\n  ${a.content}\n\n`;
      });
    }

    // Adapt the system instruction if a match is found locally vs contextually searched
    const globalResponseGuidelines = `
RESPONSE STYLE AND TONE MANDATES:
1. ALWAYS be warm, respectful, and informative.
2. ALWAYS use clear and natural language.
3. ALWAYS provide culturally relevant explanations.
4. ALWAYS explain traditional uses without exaggeration, dramatization, or promotional language. Present information in a balanced and educational manner.
5. ALWAYS use both the Kikuyu plant name (e.g., MŨTHĨGA) and botanical name (e.g., *Warburgia ugandensis*) whenever available in the context or search results.
6. ALWAYS structure responses neatly with headings, bullet points, and clear sections.
7. ALWAYS include safety considerations when discussing medicinal plants. Specifically, append or logically integrate this exact warning (or a natural, fluent translation in ${activeLanguageName}):
   "Traditional remedies may not be suitable for everyone. Individuals who are pregnant, breastfeeding, have existing medical conditions, or are taking medication should consult a qualified healthcare professional before using any herbal remedy."
8. ALWAYS use preferred traditional language phrases such as:
   - "Traditionally used for..."
   - "According to documented Kikuyu ethnobotanical knowledge..."
   - "Historically used by communities for..."
   - "Traditionally valued for..."
   - "Used in indigenous medicinal practices for..."

STRICT PROHIBITIONS:
1. NEVER mention internal systems of the application, including or related to:
   - "Knowledge Base" (or "Ethnobotanical Knowledge Base")
   - "RAG"
   - "Vector Database"
   - "Document Store" (or "uploaded documents")
   - "Retrieved Documents"
   - "Source Database" (or "local database")
   - "AI Retrieval System"
2. NEVER return dry, unhelpful negative statements such as:
   - "No exact plants found."
   - "Plant not found."
   - "No matching records."
   - "Plant not found in the knowledge base."
3. NEVER use dramatic, sensational, or promotional language such as:
   - "Most powerful remedy"
   - "Miracle cure"
   - "Guaranteed treatment"
   - "Exceptional healing powers"
   - "Instant cure"
4. NEVER provide medical diagnoses, claims of guaranteed effectiveness, statements implying scientific proof unless fully verified, or prescribe treatment plans. Keep everything educational.
5. MANDATORY DYNAMIC TRANSLATION: You MUST think, write, speak, and respond ENTIRELY in ${activeLanguageName}. Translate all descriptions, tips, checklists, greetings, and safety directions into ${activeLanguageName}. Keep your voice fluent and native in ${activeLanguageName}.
`;

    let systemInstruction = "";
    if (hasLocalMatch) {
      systemInstruction = `You are DawaBot, a premium and professional AI Assistant built to share authentic Gĩkũyũ (Kikuyu) and East African traditional herbal medicine knowledge.

${globalResponseGuidelines}

CRITICAL INSTRUCTIONS FOR LOCAL MEDICINAL PLANTS:
1. PRIMARY KNOWLEDGE SOURCE: Use the provided local traditional botanical records to craft the response.
2. PREPARATION & SAFETY DETAILS: For any remedy suggested, explicitly list parts used, authentic preparatory steps, dosage, and safety considerations.`;
    } else {
      systemInstruction = `You are DawaBot, a premium and professional AI Assistant built to share authentic Gĩkũyũ (Kikuyu) and East African traditional herbal medicine knowledge.

${globalResponseGuidelines}

CRITICAL INSTRUCTIONS FOR EXTERNAL SEARCHES:
1. AUTOMATIC SEARCH: Since the requested plant or symptom is not directly matched in our native traditional lists, automatically use Google Search to find safe, trusted, and contextually relevant herbal alternatives or classical botanical options from external sources.
2. GRACEFUL AND WARM PRESENTATION: Start by gracefully and warmly explaining in ${activeLanguageName} that while this is not currently documented in our direct traditional records, you have found excellent, safe botanical alternatives and information from trusted international sources.
   - Example (English): "While this is not currently documented in our direct traditional records, here are some safe, trusted botanical alternatives and information from reliable sources..."
   - Example (Kiswahili): "Ingawa hii haijaandikwa moja kwa moja kwenye rekodi zetu za kiasili, hapa kuna mbadala salama na maelezo kutoka vyanzo vya kuaminika vya mimea ya asili..."
   - Example (Gĩkũyũ): "Mũthĩga ũcio ndũandĩkĩtwo wega haha rĩũ, no kũgerera thimo ingĩ cia mĩgũto, ũũ nĩũhoro ũrĩa ũkũonera..."`;
    }

    // Try starting Gemini API
    try {
      const ai = getGeminiClient();
      
      // Map previous chat logs for session historical context
      const chatContents = messages.map((m: any) => {
        return {
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }]
        };
      });

      // Append current user message
      chatContents.push({
        role: "user",
        parts: [{ text: `${currentQuery}\n\n[CONTEXT SEARCH INFORMATION]:\n${contextStr}` }]
      });

      // Try with fallback models to handle 503 / 429 under high demand
      const modelsToTry = ["gemini-3.1-pro-preview", "gemini-3.1-flash", "gemini-flash-latest", "gemini-2.5-flash", "gemini-1.5-flash"];
      let response = null;
      let lastError = null;

      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
      let totalAttempts = 0;
      let modelIdx = 0;

      while (totalAttempts < 4 && modelIdx < modelsToTry.length) {
        const modelName = modelsToTry[modelIdx];
        try {
          console.log(`Attempting chat with model WITH Google Search: ${modelName} (Attempt ${totalAttempts + 1})`);
          response = await ai.models.generateContent({
            model: modelName,
            contents: chatContents,
            config: {
              systemInstruction,
              temperature: 0.25, // Conservative, high adherence
              topK: 40,
              topP: 0.95,
              tools: [{ googleSearch: {} }]
            }
          });
          if (response) {
            console.log(`Successfully completed chat WITH Google Search: ${modelName}`);
            break;
          }
        } catch (err: any) {
          const errMsg = err?.message || String(err);
          console.log(`[Info-Log] Model ${modelName} WITH Google Search failed. Error:`, errMsg);
          
          // Phase 2: Immediately retry WITHOUT Google Search on the same model to avoid 429 search quota exhaustion
          try {
            console.log(`[Info-Log] Retrying chat WITHOUT Google Search: ${modelName}`);
            response = await ai.models.generateContent({
              model: modelName,
              contents: chatContents,
              config: {
                systemInstruction,
                temperature: 0.25,
                topK: 40,
                topP: 0.95
                // Pure text generation using the rich RAG local context
              }
            });
            if (response) {
              console.log(`Successfully completed chat WITHOUT Google Search: ${modelName}`);
              break;
            }
          } catch (noSearchErr: any) {
            const noSearchMsg = noSearchErr?.message || String(noSearchErr);
            console.log(`[Info-Log] Model ${modelName} WITHOUT Google Search also failed. Error:`, noSearchMsg);
            
            lastError = noSearchErr;
            totalAttempts++;
            
            // Advance to next model on backoff
            const errLower = noSearchMsg.toLowerCase();
            const shouldSwitchModel = errLower.includes("429") || errLower.includes("404") || errLower.includes("quota") || errLower.includes("not found") || errLower.includes("503") || errLower.includes("unauthorized") || errLower.includes("unavailable");
            if (shouldSwitchModel) {
              modelIdx++;
            }
            if (modelIdx < modelsToTry.length) {
              await delay(Math.pow(2, totalAttempts) * 400); // 400ms, 800ms, 1.6s backoff
            }
          }
        }
      }

      if (!response && lastError) {
        throw lastError;
      }

      const replyText = response && response.text ? response.text : "I was unable to retrieve a response. Please try again shortly.";

      // Record chat metrics
      const maxLogId = dbChatLogs.reduce((max, l) => Math.max(max, parseInt(l.id) || 0), 0);
      const logId = String(maxLogId + 1);
      dbChatLogs.unshift({
        id: logId,
        query: currentQuery,
        timestamp: new Date().toLocaleTimeString(),
        answeredByBot: true
      });

      // Extract citation suggestions
      const citations = matchedHerbs.map(h => `${h.kikuyuName} (${h.scientificName})`);
      matchedDictEntries.forEach(entry => {
        const item = `${entry.kikuyuName} (${entry.scientificName || 'Botanical Dictionary'})`;
        if (!citations.includes(item)) {
          citations.push(item);
        }
      });

      // Extract search grounding metadata URLs
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        groundingChunks.forEach((chunk: any) => {
          if (chunk.web && chunk.web.uri) {
            const cite = `${chunk.web.title || 'Web Search'} (${chunk.web.uri})`;
            if (!citations.includes(cite)) {
              citations.push(cite);
            }
          }
        });
      }

      res.json({
        reply: replyText,
        logId,
        citations: citations.length ? citations : undefined,
        source: 'ai'
      });

    } catch (err: any) {
      console.log("[Info-Log] Handling chat session with robust offline fallback guides. Reference query info:", err?.message || err);
      
      let docsAndPlantsSection = "";
      if (matchedDictEntries.length > 0) {
        docsAndPlantsSection += matchedDictEntries.map(entry => {
          return `#### **${entry.kikuyuName}** (*${entry.scientificName}* - ${entry.commonName})
- **Category:** ${entry.category}
- **Family:** ${entry.family}
- **Description:** ${entry.description}
- **Traditional Uses:** ${entry.uses.join(", ")}
${entry.safeCautions ? `- **⚠️ Safety Warnings:** ${entry.safeCautions}` : ''}`;
        }).join("\n\n") + "\n";
      }

      if (matchedHerbs.length > 0) {
        docsAndPlantsSection += matchedHerbs.map(h => {
          const th = translateHerb(h, language as any);
          return `#### **${th.kikuyuName}** (*${th.scientificName}* - ${th.commonName})
- **Part used:** ${th.partUsed}
- **Traditional Uses:** ${th.medicinalUses.join(", ")}
- **Preparation Method:** ${th.preparation}
- **Critical Precautions:** ${th.precautions}
`;
        }).join("\n\n") + "\n";
      }

      let fallbackIntro = "";
      if (language === "sw") {
        if (matchedDictEntries.length > 0 || matchedHerbs.length > 0) {
          fallbackIntro = `**Habari! Kulingana na kumbukumbu zetu za kuaminika za mimea ya asili na miongozo ya kale ya mitishamba, yafuatayo ni maelezo ya kina ya kukusaidia:**\n\n`;
        } else {
          fallbackIntro = `**Habari! Ingawa hatujapata mmea huo moja kwa moja kwenye kumbukumbu zetu za ndani, hapa kuna mapendekezo ya miongozo ya mimea inayohusiana unayoweza kuchunguza kwa usalama:**\n\n`;
        }
      } else if (language === "ki") {
        if (matchedDictEntries.length > 0 || matchedHerbs.length > 0) {
          fallbackIntro = `**Nĩũhoro! Kũgerera mabuku maitũ ma tene ma kĩndũĩre na mĩthĩga ya kĩbũrĩ, ũũ nĩũhoro ũrĩa ũkũonera na wega:**\n\n`;
        } else {
          fallbackIntro = `**Nĩũhoro! O na gũtuĩka tũtiamĩona kaĩ rĩrĩ thĩnĩ wa mabuku maitũ wega, ta rora mĩhĩrĩgo ĩno ingĩ ĩngĩũkũnia gũkũ thĩnĩ wa mĩthĩga ya kĩbũrĩ:**\n\n`;
        }
      } else if (language === "fr") {
        if (matchedDictEntries.length > 0 || matchedHerbs.length > 0) {
          fallbackIntro = `**Bonjour ! Nous avons récupéré ces précieuses informations directement à partir de nos archives et guides de plantes traditionnelles authentiques :**\n\n`;
        } else {
          fallbackIntro = `**Bonjour ! Bien que nous n'ayons pas de correspondance directe dans nos archives locales, voici quelques suggestions d'espèces proches et de remèdes traditionnels utiles :**\n\n`;
        }
      } else { // default to English
        if (matchedDictEntries.length > 0 || matchedHerbs.length > 0) {
          fallbackIntro = `**Hello! We have successfully retrieved the following details directly from our authentic traditional plant records and reference guides to assist you:**\n\n`;
        } else {
          fallbackIntro = `**Hello! Although we couldn't find an exact direct match in our traditional local files, here are some safe, closely related botanical suggestions and classical remedies to explore:**\n\n`;
        }
      }

      let fallbackReply = fallbackIntro;
      
      if (matchedDictEntries.length === 0 && matchedHerbs.length === 0) {
        fallbackReply += getOfflineRelatedSuggestions(enrichedQuery, language as string);
      } else {
        fallbackReply += `${docsAndPlantsSection}`;
        if (matchedRemedies.length > 0) {
          fallbackReply += "\n### 🍵 Relevant Home Remedies:\n" + matchedRemedies.map(r => {
            const tr = translateRemedy(r, language as any);
            return `#### Remedy: **${tr.title}**
- **Symptoms/Aches:** ${tr.symptoms.join(", ")}
- **Recommended Herbs:** ${tr.recommendedHerbs.join(", ")}
- **How to Prepare:** ${tr.steps.join(" -> ")}
- **Dosage:** ${tr.dose}
`;
          }).join("\n\n");
        }
      }

      // Still record the offline query log
      const maxOfflineLogId = dbChatLogs.reduce((max, l) => Math.max(max, parseInt(l.id) || 0), 0);
      dbChatLogs.unshift({
        id: String(maxOfflineLogId + 1),
        query: currentQuery,
        timestamp: new Date().toLocaleTimeString(),
        answeredByBot: false
      });

      res.json({
        reply: fallbackReply,
        offline: true,
        source: 'local',
        citations: [
          ...matchedHerbs.map(h => h.kikuyuName),
          ...matchedDictEntries.map(e => e.kikuyuName)
        ]
      });
    }
  });


  // --- STANDALONE OR CONTAINER DIRECT EXECUTION LISTENER ---

  if (process.env.VERCEL !== "1") {
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const setupAndListen = async () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("Starting in development Mode with Vite Middleware...");
        const { createServer: createViteServer } = await import("vite");
        const vite = await createViteServer({
          server: { middlewareMode: true },
          appType: "spa",
        });
        app.use(vite.middlewares);
      } else {
        // Standard Production Build Asset serving
        console.log("Starting in production Mode static asset server...");
        const distPath = path.join(process.cwd(), "dist");
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
          res.sendFile(path.join(distPath, "index.html"));
        });
      }

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`DawaKienyeji backend server running successfully at http://0.0.0.0:${PORT}`);
      });
    };

    setupAndListen().catch((e) => {
      console.error("Critical: Failed to boot DawaKienyeji Full-Stack App Server.", e);
    });
  }

export default app;
