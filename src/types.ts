export interface LocalNameRecord {
  language: string;
  name: string;
  locality?: string;
  documentedBy?: string;
}

export interface DocumentedUseRecord {
  use: string;
  communityOrSource?: string;
  verifiedStatus?: 'documented' | 'oral_lore' | 'unverified';
}

export interface PlantPhotograph {
  url: string;
  caption?: string;
  provenance?: string;
  photographer?: string;
  license?: string;
  isPrimary?: boolean;
}

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
  category: string;
  imageColor: string; // Tailwind color combination for visual representation
  imageUrl?: string; // High-quality royalty-free botanical image/illustration or user upload
  severityRating?: 'Safe' | 'Caution' | 'Medicinal Only';

  // --- Extended Comprehensive Profile Fields (Phase 1) ---
  acceptedBotanicalName?: string; // Formally accepted botanical binomial
  botanicalFamily?: string; // Plant family (e.g., Canellaceae, Solanaceae, Rosaceae)
  englishName?: string; // English common name
  swahiliName?: string; // Kiswahili local name
  luoName?: string; // Dholuo local name
  kambaName?: string; // Kikamba local name
  otherLocalNames?: LocalNameRecord[]; // Extensible for Maa, Kalenjin, Luhya, Meru, Embu, etc. without schema changes

  distinguishingCharacteristics?: string; // Morphological identification features (leaves, bark, flowers, aroma)
  habitat?: string; // Ecological zone, altitude, habitat type
  geographicalDistribution?: string; // Documented geographic presence (e.g. Aberdares, Mt Kenya, Rift Valley, Western highlands)
  habitatDistribution?: string; // Combined habitat & distribution summary string

  documentedUses?: DocumentedUseRecord[]; // Structured list of uses with documenting communities or sources
  preparationMethods?: string[]; // Detailed stepwise traditional preparation methods
  
  culturalSignificance?: string; // Spiritual, customary, or sacred traditional context
  oralHistory?: string; // Recorded oral narratives passed down across generations
  culturalRestrictions?: string; // Taboos, sacred guidelines, contributor consent restrictions
  consentStatus?: 'consent_given' | 'public_domain' | 'restricted' | 'undocumented';

  conservationStatus?: 'Not Evaluated' | 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered' | 'Data Deficient';
  threats?: string[]; // e.g. Overharvesting for international trade, habitat destruction, deforestation
  conservationPractices?: string; // Sustainable harvesting practices (e.g. vertical striping, replanting)

  contraindications?: string[]; // Conditions where the herb must not be used (pregnancy, renal illness, children)
  knownRisks?: string[]; // Documented toxicities, adverse interactions with pharmaceuticals
  safetyWarnings?: string; // General safety statement and cautionary notes

  scientificReferences?: string[]; // Peer-reviewed pharmacological, chemical, or ethnobotanical studies
  traditionalKnowledgeSources?: string[]; // Documented elders, ethnobotanical surveys, cultural repositories
  traditionalReferences?: string; // Combined scientific & traditional references string
  sourceUrls?: string[]; // Reference web URLs

  photographs?: PlantPhotograph[]; // Multiple photographs with provenance, photographer, and licensing
  identificationStatus?: 'expert_confirmed' | 'community_verified' | 'community_reported' | 'ai_suggested' | 'pending_review' | 'unverified';
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
  imageUrl?: string;
  imageMimeType?: string;
  plantIdentification?: PlantIdentificationResponse;
  matchedHerbId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  pinned?: boolean;
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

export interface PossiblePlantMatch {
  scientificName: string;
  botanicalFamily?: string;
  commonEnglishName?: string;
  swahiliName?: string;
  kikuyuName?: string;
  luoName?: string;
  kambaName?: string;
  otherLocalNames?: string;
  distinguishingCharacteristics: string;
  confidenceLevel: 'High Plausibility' | 'Moderate Plausibility' | 'Tentative / Low Plausibility';
  matchingHerbId?: string; // If present in the local database
  matchingHerbSummary?: {
    id: string;
    commonName: string;
    kikuyuName: string;
    scientificName: string;
    acceptedBotanicalName?: string;
    botanicalFamily?: string;
    category: string;
    imageUrl?: string;
    severityRating?: string;
    swahiliName?: string;
    luoName?: string;
    kambaName?: string;
    otherLocalNames?: LocalNameRecord[];
  };
  inDirectory: boolean;
  cautionNotes: string;
}

export interface PlantIdentificationResponse {
  isInconclusive: boolean;
  inconclusiveReason?: string;
  plantCount?: 'single_plant' | 'multiple_plants' | 'insufficient_detail' | 'non_plant';
  plantCountExplanation?: string;
  possibleMatches: PossiblePlantMatch[];
  generalObservations: string;
  safetyNotice: string;
  disclaimer: string;
  modelUsed: string;
}


