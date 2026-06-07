import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { INITIAL_HERBS, INITIAL_REMEDIES, INITIAL_BLOGS, INITIAL_KNOWLEDGE_BASE } from "./src/data/herbalDatabase.js";
import { Herb, BlogPost, TraditionalRemedy, KnowledgeBaseArticle, ChatMessage, ChatLog } from "./src/types.js";
import { translateHerb, translateRemedy } from "./src/utils/translations.js";

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
}

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

  // Admin login credential endpoint
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "joseph@yflab.org" && password === "Joseph@60") {
      res.json({ success: true, adminPin: ADMIN_SECURITY_PIN });
    } else {
      res.status(401).json({ error: "Invalid admin credentials" });
    }
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
    const newMessage = {
      id: String(dbMessages.length + 1),
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
    const newSubscription = {
      id: String(dbSubscriptions.length + 1),
      email: email.trim(),
      timestamp: new Date().toISOString()
    };
    dbSubscriptions.push(newSubscription);
    res.json({ success: true, message: "Thank you for subscribing to our traditional herbal updates!" });
  });

  // Toggle/Update message status (Admin only)
  app.put("/api/messages/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const msg = dbMessages.find(m => m.id === id);
    if (!msg) {
      return res.status(404).json({ error: "Message record not found." });
    }
    if (status) {
      msg.status = status;
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
    // Generate simple ID if missing
    newHerb.id = String(dbHerbs.length + 1);
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
    newBlog.id = String(dbBlogs.length + 1);
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
    newDoc.id = String(dbArticles.length + 1);
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
    const qLower = currentQuery.toLowerCase();
    
    // Find matching herbs
    const matchedHerbs = dbHerbs.filter(
      (h) =>
        qLower.includes(h.kikuyuName.toLowerCase()) ||
        qLower.includes(h.commonName.toLowerCase()) ||
        qLower.includes(h.scientificName.toLowerCase()) ||
        h.medicinalUses.some((use) => qLower.includes(use.toLowerCase())) ||
        h.description.toLowerCase().includes(qLower)
    );

    // Find matching remedies
    const matchedRemedies = dbRemedies.filter(
      (r) =>
        qLower.includes(r.title.toLowerCase()) ||
        r.symptoms.some((sym) => qLower.includes(sym.toLowerCase())) ||
        r.recommendedHerbs.some((rh) => qLower.includes(rh.toLowerCase()))
    );

    // Find custom articles/knowledge chunks
    const matchedArticles = dbArticles.filter(
      (a) =>
        qLower.includes(a.title.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(qLower) ||
        a.content.toLowerCase().includes(qLower)
    );

    // Build context string from indexed database matches
    let contextStr = "--- DAWA KIENYEJI BOTANICAL DATABASE KNOWLEDGE BASE ---\n\n";
    
    if (matchedHerbs.length > 0) {
      contextStr += "RELEVANT PLANTED MEDICINAL HERBS:\n";
      matchedHerbs.forEach((h) => {
        contextStr += `- Kikuyu Name: ${h.kikuyuName}\n  Scientific Name: ${h.scientificName}\n  English Name: ${h.commonName}\n  Parts Used: ${h.partUsed}\n  Uses: ${h.medicinalUses.join(", ")}\n  Preparation: ${h.preparation}\n  Traditional Context: ${h.traditionalContext}\n  Safety Precautions: ${h.precautions}\n  Type Class: ${h.category}\n  Danger Rating: ${h.severityRating || 'Normal'}\n\n`;
      });
    } else {
      // Pour out a general overview of the top 5 herbs as defensive context fallback
      contextStr += "GENERAL POPULAR BOTANICAL FLORA FALLBACK:\n";
      dbHerbs.slice(0, 5).forEach((h) => {
        contextStr += `- Kikuyu Name: ${h.kikuyuName} (${h.scientificName} / ${h.commonName}): Prep: ${h.preparation}. Uses: ${h.medicinalUses.slice(0, 2).join(", ")}. Safety: ${h.precautions}\n`;
      });
      contextStr += "\n";
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

    // Build the system instructions forcing strict grounding
    const systemInstruction = `You are DawaBot, a premium and professional AI Assistant built to share authentic Gĩkũyũ (Kikuyu) and East African traditional herbal medicine knowledge. Your responses must be warm, educational, African-inspired, highly intelligent, and trustworthy.

CRITICAL INSTRUCTIONS:
1. STRICT GROUNDING: You must respond directly using the verified botanical database provided in your context.
2. DO NOT HALLUCINATE: If a plant or remedy is not mentioned in your context and you do NOT know it with absolute factual correctness from Gĩkũyũ/Kenyan ethnobotany, clearly and humbly state so.
3. USE STANDARD NAMES: Always cite plant names using their Gĩkũyũ uppercase name (e.g., MŨTHĨGA), their common English name, and their botanical scientific name in italics.
4. DETAIL PREPARATION AND SAFETY: For any remedy suggested, explicitly list the parts used, authentic preparatory steps, dosage, and critical SAFETY PRECAUTIONS (e.g. state cautions regarding pregnancy, toxic saps of Sodom Apple fruit, or strong liver reactions).
5. RESPOND IN ELEGANT MARKDOWN: Use headings, bullets, bold text, and numbered lists to structure your explanations neatly. Keep paragraphs welcoming.
6. MANDATORY DYNAMIC TRANSLATION: You MUST think, write, speak, and respond ENTIRELY in ${activeLanguageName}. Translate all descriptions, tips, checklists, greetings, and safety directions into ${activeLanguageName}. Keep uppercase Kikuyu names (e.g., MŨTHĨGA) as they are, but translate everything else around them to ${activeLanguageName} perfectly and elegantly. Do not break this role.`;

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

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction,
          temperature: 0.25, // Conservative, high adherence
          topK: 40,
          topP: 0.95
        }
      });

      const replyText = response.text || "I was unable to retrieve a response. Please try again shortly.";

      // Record chat metrics
      const logId = String(dbChatLogs.length + 1);
      dbChatLogs.unshift({
        id: logId,
        query: currentQuery,
        timestamp: new Date().toLocaleTimeString(),
        answeredByBot: true
      });

      // Extract citation suggestions
      const citations = matchedHerbs.map(h => `${h.kikuyuName} (${h.scientificName})`);

      res.json({
        reply: replyText,
        logId,
        citations: citations.length ? citations : undefined
      });

    } catch (err: any) {
      console.error("Gemini chatbot error:", err);
      
      // Multi-lingual offline messages
      let offlineTitle = "DawaBot Knowledge Base Check (Local Index Search)";
      let offlineSetupHint = "To activate DawaBot's advanced generative interactions, please configure your `GEMINI_API_KEY` in the Secrets panel in the AI Studio UI.";
      let offlineResultsTitle = "However, my offline RAG system has retrieved the following authentic Kikuyu botanical records for you:";
      let offlineNotFound = "No exact plants found in the offline search. Try typing **MŨTHĨGA**, **MŨTONGU**, or **MŨCORAI**.";
      
      if (language === "sw") {
        offlineTitle = "Utafutaji wa Uhifadhi wa DawaBot (Kwenye Kifaa Chako)";
        offlineSetupHint = "Ili uweze kutumia uwezo mkubwa wa AI wa DawaBot, tafadhali kamilisha kuweka siri ya `GEMINI_API_KEY` yako kwenye jopo la siri la AI Studio.";
        offlineResultsTitle = "Hata hivyo, mfumo wetu wa RAG umefanikiwa kukutafutia kumbukumbu hizi za mimea ya asili ya Gĩkũyũ:";
        offlineNotFound = "Hakuna mimea inayolingana na utafutaji wako kwa sasa. Jaribu kuandika **MŨTHĨGA**, **MŨTONGU**, au **MŨCORAI**.";
      } else if (language === "ki") {
        offlineTitle = "Ũgĩmia wa Ndari ya DawaBot thĩnĩ wa Kompyuta";
        offlineSetupHint = "Ngetha ũhũthĩre hinya wothe wa AI thĩnĩ wa DawaBot, wandĩke siri ya `GEMINI_API_KEY` thĩnĩ wa jopo rĩa siri rĩa AI Studio.";
        offlineResultsTitle = "O na kũrĩ ũguo, thome wa offline RAG nĩũgũgĩmĩire mĩthĩga ĩno njorũ ya Gĩkũyũ:";
        offlineNotFound = "Gũtirĩ mĩthĩga nĩgũoneka wega. Gĩmia wandĩke **MŨTHĨGA**, **MŨTONGU**, kana **MŨCORAI**.";
      } else if (language === "fr") {
        offlineTitle = "Recherche Locale de la Base de Données DawaBot";
        offlineSetupHint = "Pour activer les interactions génératives avancées de DawaBot, veuillez configurer votre clé `GEMINI_API_KEY` dans le panneau Secrets de l'interface AI Studio.";
        offlineResultsTitle = "Cependant, notre système de recherche RAG a extrait les fiches botaniques Kikuyu authentiques suivantes :";
        offlineNotFound = "Aucune plante correspondante trouvée. Essayez de taper **MŨTHĨGA**, **MŨTONGU** ou **MŨCORAI**.";
      }

      const fallbackReply = `🌿 **${offlineTitle}**:

${offlineSetupHint}

${offlineResultsTitle}

${matchedHerbs.map(h => {
  // Let us translate the herb fields directly for offline users as well
  const th = translateHerb(h, language as any);
  return `### 🍃 **${th.kikuyuName}** (*${th.scientificName}* - ${th.commonName})
- **Part used:** ${th.partUsed}
- **Traditional Uses:** ${th.medicinalUses.join(", ")}
- **Preparation Method:** ${th.preparation}
- **Critical Precautions:** ${th.precautions}
`;
}).join("\n") || `*${offlineNotFound}*`}

${matchedRemedies.map(r => {
  const tr = translateRemedy(r, language as any);
  return `### 🍵 Remedy: **${tr.title}**
- **Symptoms:** ${tr.symptoms.join(", ")}
- **Herbs:** ${tr.recommendedHerbs.join(", ")}
- **Guide:** ${tr.steps.join(" -> ")}
- **Dosage:** ${tr.dose}
`;
}).join("\n")}
`;

      // Still record the offline query log
      dbChatLogs.unshift({
        id: String(dbChatLogs.length + 1),
        query: currentQuery,
        timestamp: new Date().toLocaleTimeString(),
        answeredByBot: false
      });

      res.json({
        reply: fallbackReply,
        offline: true,
        citations: matchedHerbs.map(h => h.kikuyuName)
      });
    }
  });


  // --- STANDALONE OR CONTAINER DIRECT EXECUTION LISTENER ---

  if (process.env.VERCEL !== "1") {
    const PORT = 3000;
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
