export interface Herb {
  id: string;
  kikuyuName: string;
  commonName: string;
  scientificName: string;
  partUsed: string;
  description: string;
  preparation: string;
  medicinalUses: string[];
  traditionalContext: string;
  precautions: string;
  category: 'Respiratory' | 'Digestive' | 'Pain relief' | 'Skin & Wounds' | 'General Vitality' | 'Prostate & Urinary' | 'Fevers';
  imageColor: string; // Tailwind color combination for visual representation
  imageUrl?: string; // High-quality royalty-free botanical image/illustration or user upload
  severityRating?: 'Safe' | 'Caution' | 'Medicinal Only';
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageColor: string;
}

export interface TraditionalRemedy {
  id: string;
  title: string;
  category: string;
  symptoms: string[];
  recommendedHerbs: string[]; // List of Herb KikuyuNames
  steps: string[];
  dose: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Ethnobotany' | 'Dosage & Safety' | 'Sustainable Harvesting' | 'Kikuyu Traditions';
  author: string;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  suggestions?: string[];
  citations?: string[];
  source?: 'ai' | 'local';
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export interface ChatLog {
  id: string;
  query: string;
  timestamp: string;
  answeredByBot: boolean;
  satisfactionRating?: 'good' | 'bad';
}

export interface BlogComment {
  id: string;
  blogId: string;
  author: string;
  text: string;
  timestamp: string;
  approved: boolean;
  replyText?: string;
  replyTimestamp?: string;
}

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
  resolved?: boolean;
}
