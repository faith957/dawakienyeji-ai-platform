import { GoogleGenAI, Type } from "@google/genai";
import { Herb, PlantIdentificationResponse, PossiblePlantMatch } from "../types.js";

// Cached GoogleGenAI client singleton
let geminiClientCache: GoogleGenAI | null = null;
export function getGeminiVisionClient(): GoogleGenAI {
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

export interface ImageAnalysisInput {
  imageBase64: string;
  mimeType?: string;
  userQuery?: string;
}

export interface SanitizedImage {
  cleanBase64: string;
  effectiveMime: string;
  approxBytes: number;
}

export function sanitizeAndValidateImage(imageBase64: string, mimeType?: string): SanitizedImage {
  if (!imageBase64 || typeof imageBase64 !== "string") {
    throw new Error("No image data provided. Please submit a valid plant photograph.");
  }

  let cleanBase64 = imageBase64;
  let effectiveMime = mimeType || "image/jpeg";

  if (imageBase64.includes(";base64,")) {
    const parts = imageBase64.split(";base64,");
    const match = parts[0].match(/data:(image\/[a-zA-Z0-9+.-]+)/);
    if (match) {
      effectiveMime = match[1];
    }
    cleanBase64 = parts[1];
  }

  const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedMimes.includes(effectiveMime.toLowerCase())) {
    throw new Error("Unsupported image format. Please submit a JPG, PNG, or WebP photograph.");
  }

  const approxBytes = Math.round((cleanBase64.length * 3) / 4);
  if (approxBytes > 10 * 1024 * 1024) {
    throw new Error("Image file exceeds the 10MB limit. Please provide a smaller photograph.");
  }

  return { cleanBase64, effectiveMime, approxBytes };
}

// Normalization helper for accurate string matching
export const normalizeTaxonName = (str?: string): string => {
  return (str || "")
    .toLowerCase()
    .replace(/[ĩĩ]/g, "i")
    .replace(/[ũũ]/g, "u")
    .replace(/[^a-z0-9]/g, "");
};

/**
 * Cross-references vision candidates with the Dawakienyeji directory (dbHerbs).
 * Strictly requires verified name match—NEVER fabricates or forces matches.
 */
export function enrichCandidatesWithDirectory(
  candidates: PossiblePlantMatch[], 
  dbHerbs: Herb[]
): PossiblePlantMatch[] {
  return (candidates || []).map((candidate) => {
    const mSciNorm = normalizeTaxonName(candidate.scientificName);
    const mKikNorm = normalizeTaxonName(candidate.kikuyuName);
    const mComNorm = normalizeTaxonName(candidate.commonEnglishName);
    const mSwaNorm = normalizeTaxonName(candidate.swahiliName);
    const mLuoNorm = normalizeTaxonName(candidate.luoName);
    const mKamNorm = normalizeTaxonName(candidate.kambaName);

    // Find verified record in dbHerbs
    const matchedHerb = dbHerbs.find((herb) => {
      const hSciNorm = normalizeTaxonName(herb.scientificName);
      const hAcceptedNorm = normalizeTaxonName(herb.acceptedBotanicalName);
      const hKikNorm = normalizeTaxonName(herb.kikuyuName);
      const hComNorm = normalizeTaxonName(herb.commonName);
      const hEngNorm = normalizeTaxonName(herb.englishName);
      const hSwaNorm = normalizeTaxonName(herb.swahiliName);
      const hLuoNorm = normalizeTaxonName(herb.luoName);
      const hKamNorm = normalizeTaxonName(herb.kambaName);

      // Match on accepted scientific / botanical binomial (high fidelity)
      if (mSciNorm && mSciNorm.length >= 6) {
        if (hSciNorm && (hSciNorm === mSciNorm || hSciNorm.includes(mSciNorm) || mSciNorm.includes(hSciNorm))) {
          return true;
        }
        if (hAcceptedNorm && (hAcceptedNorm === mSciNorm || hAcceptedNorm.includes(mSciNorm) || mSciNorm.includes(hAcceptedNorm))) {
          return true;
        }
      }

      // Match on verified local names if length is significant
      if (mKikNorm && mKikNorm.length >= 4 && (hKikNorm === mKikNorm || hKikNorm.includes(mKikNorm) || mKikNorm.includes(hKikNorm))) {
        return true;
      }
      if (mComNorm && mComNorm.length >= 5 && (hComNorm === mComNorm || hEngNorm === mComNorm)) {
        return true;
      }
      if (mSwaNorm && mSwaNorm.length >= 4 && (hSwaNorm === mSwaNorm || hSwaNorm.includes(mSwaNorm) || mSwaNorm.includes(hSwaNorm))) {
        return true;
      }
      if (mLuoNorm && mLuoNorm.length >= 4 && (hLuoNorm === mLuoNorm || hLuoNorm.includes(mLuoNorm) || mLuoNorm.includes(hLuoNorm))) {
        return true;
      }
      if (mKamNorm && mKamNorm.length >= 4 && (hKamNorm === mKamNorm || hKamNorm.includes(mKamNorm) || mKamNorm.includes(hKamNorm))) {
        return true;
      }

      // Check other local names array if present
      if (Array.isArray(herb.otherLocalNames) && herb.otherLocalNames.length > 0) {
        const matchesOther = herb.otherLocalNames.some((ol) => {
          const olNorm = normalizeTaxonName(ol.name);
          return (
            olNorm.length >= 4 &&
            (olNorm === mKikNorm || olNorm === mSwaNorm || olNorm === mLuoNorm || olNorm === mKamNorm || olNorm === mComNorm)
          );
        });
        if (matchesOther) return true;
      }

      return false;
    });

    if (matchedHerb) {
      return {
        ...candidate,
        inDirectory: true,
        matchingHerbId: matchedHerb.id,
        matchingHerbSummary: {
          id: matchedHerb.id,
          commonName: matchedHerb.commonName,
          kikuyuName: matchedHerb.kikuyuName,
          scientificName: matchedHerb.scientificName,
          acceptedBotanicalName: matchedHerb.acceptedBotanicalName,
          botanicalFamily: matchedHerb.botanicalFamily,
          category: matchedHerb.category,
          imageUrl: matchedHerb.imageUrl,
          severityRating: matchedHerb.severityRating,
          swahiliName: matchedHerb.swahiliName,
          luoName: matchedHerb.luoName,
          kambaName: matchedHerb.kambaName,
          otherLocalNames: matchedHerb.otherLocalNames || [],
        },
      };
    }

    return {
      ...candidate,
      inDirectory: false,
      matchingHerbId: undefined,
      matchingHerbSummary: undefined,
    };
  });
}

/**
 * Analyzes an uploaded plant photograph using the vision-capable Gemini model.
 * Strict rules:
 * 1. Checks plant count: 'single_plant', 'multiple_plants', 'insufficient_detail', 'non_plant'.
 * 2. If multiple plants are depicted, explicitly states this and requests a single-specimen photo.
 * 3. Never forces or fabricates East African medicinal matches (e.g. MŨTHĨGA) for unrelated flora or failed analyses.
 */
export async function analyzePlantImage(
  input: ImageAnalysisInput,
  dbHerbs: Herb[]
): Promise<PlantIdentificationResponse> {
  const { cleanBase64, effectiveMime, approxBytes } = sanitizeAndValidateImage(input.imageBase64, input.mimeType);

  console.log(`[Diagnostic Vision] Initiating vision analysis: size=${approxBytes} bytes, mime=${effectiveMime}, hasUserQuery=${!!input.userQuery}`);

  const ai = getGeminiVisionClient();

  const promptText = `
You are an expert East African and global botanical taxonomist specializing in plant morphology, field botany, and ethnobotany.
Carefully examine this photograph.

CRITICAL PROTOCOLS:
1. ASSESS SPECIMEN COMPOSITION (plantCount):
   - "single_plant": The photo clearly isolates or focuses on a single plant specimen (its leaves, stem, bark, flowers, or fruit).
   - "multiple_plants": The photo shows a garden bed, cluster, or landscape containing multiple distinct plant or flower species (e.g., mixed flowerbed with tulips, crocuses, daffodils, grape hyacinths, weeds, shrubs).
   - "insufficient_detail": The specimen is too distant, blurred, dark, cropped, or ambiguous to observe diagnostic botanical structures.
   - "non_plant": The photo does not depict botanical specimens.

2. MULTIPLE PLANTS & INSUFFICIENT DETAIL PROTOCOL:
   - IF "multiple_plants":
     * Set "isInconclusive": true.
     * In "plantCountExplanation", describe all distinct plants/flowers visible in the scene (e.g. "The image depicts a garden flowerbed containing several different flowering plants, including tulips, crocuses, and daffodils").
     * In "inconclusiveReason", state clearly: "This photograph contains multiple different plant species. For reliable botanical identification and safety advice, please take and upload a close-up photograph of the specific individual plant you wish to identify, clearly showing its leaf arrangement, stem, or flowers."
     * In "possibleMatches", you may list the visible flower/plant types if clear, but do NOT select or guess an East African medicinal herb (never force Mũthĩga/Warburgia ugandensis or any unrepresented herb).
   - IF "insufficient_detail" OR "non_plant":
     * Set "isInconclusive": true.
     * Describe what diagnostic organs are needed (leaf venation, leaf margins, stem nodes, flowers, or bark).
     * Do NOT invent candidate matches.

3. SINGLE SPECIMEN BOTANICAL DIAGNOSIS:
   - IF "single_plant":
     * Describe observable diagnostic traits in "generalObservations": phyllotaxy (alternate, opposite, whorled), leaf margins (serrate, entire, lobed), venation, hairs/pubescence, stems, flowers (petals, symmetry), and fruits.
     * Propose 1 to 4 plausible candidate species strictly supported by visual evidence.
     * For exotic or ornamental flowers (e.g., Tulipa, Crocus, Narcissus, Allium), identify them accurately as their true botanical taxa.
     * For East African indigenous plants, provide accepted botanical binomial, family, common English name, and documented local names (Swahili, Kikuyu/Gĩkũyũ, Luo, Kamba) if known. If undocumented, leave empty string.
     * Assign realistic confidence level: "High Plausibility", "Moderate Plausibility", or "Tentative / Low Plausibility". Never claim 100% certainty.

4. SAFETY & TOXICOLOGY MANDATES:
   - Emphasize that photograph-based identification is strictly provisional.
   - Never recommend ingesting, tasting, or medicinally applying an unconfirmed wild plant.
   - Highlight known toxicity or irritant sap where applicable.
`;

  const imagePart = {
    inlineData: {
      mimeType: effectiveMime,
      data: cleanBase64,
    },
  };

  const textPart = {
    text: promptText,
  };

  const visionSchema = {
    type: Type.OBJECT,
    properties: {
      plantCount: {
        type: Type.STRING,
        description: "Must be: 'single_plant', 'multiple_plants', 'insufficient_detail', or 'non_plant'",
      },
      plantCountExplanation: {
        type: Type.STRING,
        description: "Explanation of specimen count and composition.",
      },
      isInconclusive: {
        type: Type.BOOLEAN,
        description: "True if image cannot be reliably identified as a single plant species.",
      },
      inconclusiveReason: {
        type: Type.STRING,
        description: "Explanation if inconclusive, or instructions on uploading a single-specimen photo.",
      },
      generalObservations: {
        type: Type.STRING,
        description: "Detailed taxonomic visual description of what is actually visible in the photo.",
      },
      possibleMatches: {
        type: Type.ARRAY,
        description: "0 to 4 plausible candidate species supported strictly by visual traits.",
        items: {
          type: Type.OBJECT,
          properties: {
            scientificName: { type: Type.STRING, description: "Accepted botanical binomial" },
            botanicalFamily: { type: Type.STRING, description: "Botanical family name" },
            commonEnglishName: { type: Type.STRING, description: "Common English name" },
            swahiliName: { type: Type.STRING, description: "Swahili name if documented" },
            kikuyuName: { type: Type.STRING, description: "Kikuyu / Gĩkũyũ name if documented" },
            luoName: { type: Type.STRING, description: "Luo name if documented" },
            kambaName: { type: Type.STRING, description: "Kamba name if documented" },
            otherLocalNames: { type: Type.STRING, description: "Other local names with language" },
            distinguishingCharacteristics: { type: Type.STRING, description: "Diagnostic morphological traits observed" },
            confidenceLevel: {
              type: Type.STRING,
              description: "Must be: 'High Plausibility', 'Moderate Plausibility', or 'Tentative / Low Plausibility'",
            },
            cautionNotes: { type: Type.STRING, description: "Toxicity warnings or look-alikes" },
          },
          required: ["scientificName", "confidenceLevel", "distinguishingCharacteristics", "cautionNotes"],
        },
      },
      safetyNotice: {
        type: Type.STRING,
        description: "Mandatory caution warning regarding photo identification and wild plant safety.",
      },
    },
    required: ["plantCount", "plantCountExplanation", "isInconclusive", "possibleMatches", "generalObservations", "safetyNotice"],
  };

  // Modern Gemini models per skill guidelines
  const candidateVisionModels = [
    "gemini-2.5-flash",
    "gemini-3.8-flash",
    "gemini-2.5-pro",
  ];

  let rawJson = "";
  let successfulModel = "";
  let lastVisionError: any = null;

  for (const modelName of candidateVisionModels) {
    try {
      console.log(`[Diagnostic Vision] Calling model ${modelName} with multimodal image part (${approxBytes} bytes)...`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: { parts: [imagePart, textPart] },
        config: {
          responseMimeType: "application/json",
          responseSchema: visionSchema,
          temperature: 0.2, // Low temperature for factual botanical precision
        },
      });

      if (response && response.text) {
        rawJson = response.text;
        successfulModel = modelName;
        console.log(`[Diagnostic Vision] Model ${modelName} responded successfully.`);
        break;
      }
    } catch (modelErr: any) {
      console.warn(`[Diagnostic Vision] Model ${modelName} failed:`, modelErr?.message || modelErr);
      lastVisionError = modelErr;
      await new Promise(r => setTimeout(r, 800));
    }
  }

  let parsedData: any = null;

  if (rawJson) {
    try {
      let cleanJson = rawJson.trim();
      if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/```$/, "").trim();
      } else if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.replace(/^```\s*/, "").replace(/```$/, "").trim();
      }
      parsedData = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error("[Diagnostic Vision] JSON parse failure:", parseErr, rawJson);
    }
  }

  // Handle case where vision model call completely failed or returned invalid JSON
  if (!parsedData) {
    console.error("[Diagnostic Vision] All vision models failed or returned non-JSON.", lastVisionError);
    return {
      plantCount: "insufficient_detail",
      plantCountExplanation: "The vision service was momentarily unable to process this image format or detail.",
      isInconclusive: true,
      inconclusiveReason: "Visual botanical analysis was inconclusive. Please ensure the photograph is clear, well-lit, and in JPG/PNG format, then try again.",
      possibleMatches: [],
      generalObservations: "Botanical image received, but automated visual extraction could not complete.",
      safetyNotice: "Automated identification is strictly provisional. Never ingest, apply, or prepare wild plants without verified clinical and taxonomic confirmation.",
      disclaimer: "Provisional educational analysis only. Consult a trained botanist or healthcare practitioner.",
      modelUsed: "none",
    };
  }

  // Enforce multiple-plants constraint:
  // If the model detected multiple plants, ensure isInconclusive is true and inconclusiveReason explains to provide a single specimen
  const isMultiple = parsedData.plantCount === "multiple_plants";
  if (isMultiple) {
    parsedData.isInconclusive = true;
    if (!parsedData.inconclusiveReason || !parsedData.inconclusiveReason.includes("multiple")) {
      parsedData.inconclusiveReason = "This photograph contains multiple different plant species in the same frame. For reliable identification and safety guidance, please upload a close-up photograph of the specific individual plant you wish to identify.";
    }
  }

  // Cross-reference any proposed candidate matches with dbHerbs
  const rawMatches: PossiblePlantMatch[] = Array.isArray(parsedData.possibleMatches)
    ? parsedData.possibleMatches.map((m: any) => ({
        scientificName: m.scientificName || "Unknown Taxon",
        botanicalFamily: m.botanicalFamily || "",
        commonEnglishName: m.commonEnglishName || "",
        swahiliName: m.swahiliName || "",
        kikuyuName: m.kikuyuName || "",
        luoName: m.luoName || "",
        kambaName: m.kambaName || "",
        otherLocalNames: m.otherLocalNames || "",
        distinguishingCharacteristics: m.distinguishingCharacteristics || "",
        confidenceLevel: m.confidenceLevel || "Tentative / Low Plausibility",
        cautionNotes: m.cautionNotes || "Verify physical specimen with a botanist.",
        inDirectory: false,
      }))
    : [];

  const enrichedMatches = enrichCandidatesWithDirectory(rawMatches, dbHerbs);

  console.log(`[Diagnostic Vision Result] plantCount=${parsedData.plantCount}, isInconclusive=${parsedData.isInconclusive}, candidatesCount=${enrichedMatches.length}, matchesInDirectory=${enrichedMatches.filter(m => m.inDirectory).length}`);

  return {
    plantCount: (parsedData.plantCount as any) || (isMultiple ? "multiple_plants" : "single_plant"),
    plantCountExplanation: parsedData.plantCountExplanation || "",
    isInconclusive: !!parsedData.isInconclusive,
    inconclusiveReason: parsedData.inconclusiveReason || "",
    possibleMatches: enrichedMatches,
    generalObservations: parsedData.generalObservations || "Botanical visual observation completed.",
    safetyNotice: parsedData.safetyNotice || "Automated photographic identification is educational and provisional. Never consume or medicinally prepare wild flora based solely on an image match.",
    disclaimer: "This preliminary identification is generated by AI vision analysis for educational and cultural reference only. It is not an expert-confirmed botanical diagnosis.",
    modelUsed: successfulModel || "gemini-2.5-flash",
  };
}
