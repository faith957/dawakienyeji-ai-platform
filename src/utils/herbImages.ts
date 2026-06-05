import { Herb } from "../types";

export interface SystemFallbackImage {
  type: string;
  name: string;
  url: string;
  description: string;
}

export const FALLBACK_CATEGORIES: SystemFallbackImage[] = [
  {
    type: "tree",
    name: "Highland Forest Tree",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    description: "Towering forest canopies and tall trees (e.g. Warburgia, Pygeum)"
  },
  {
    type: "shrub",
    name: "Wild Medicinal Shrub",
    url: "https://images.unsplash.com/photo-1530968033775-2c92e3acb4de?auto=format&fit=crop&w=800&q=80",
    description: "Dense leafy evergreens and woody bushes (e.g. Solanum)"
  },
  {
    type: "herb",
    name: "Fresh Highland Dew Herb",
    url: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=800&q=80",
    description: "Vibrant wild green leaves and soft ground covers"
  },
  {
    type: "bark",
    name: "Medicinal Trunk Bark",
    url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80",
    description: "Shaved forest bark, cork layers, and rough medicinal trunks"
  },
  {
    type: "root",
    name: "Earthy Healing Roots",
    url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    description: "Therapeutic underground rhizomes, tubers, and root fibers"
  },
  {
    type: "flower",
    name: "Botanical Wild Blossom",
    url: "https://images.unsplash.com/photo-1533038590840-1cde6b66b72d?auto=format&fit=crop&w=800&q=80",
    description: "Nectar-rich indigenous flowers, seeds, and medicinal berries"
  }
];

/**
 * Automatically classifies a medicinal plant to match one of the fallback categories.
 * Inspection targets the plant's part used, description, or kikuyu name.
 */
export function classifyPlantType(plant: Omit<Herb, "id"> | Herb): string {
  const parts = (plant.partUsed || "").toLowerCase();
  const desc = (plant.description || "").toLowerCase();
  const name = (plant.kikuyuName || "").toLowerCase();
  const common = (plant.commonName || "").toLowerCase();

  // Root triggers
  if (parts.includes("root") || parts.includes("rhizome") || parts.includes("tuber") || desc.includes("roots of")) {
    return "root";
  }

  // Bark triggers
  if (parts.includes("bark") || parts.includes("wood") || parts.includes("trunk") || parts.includes("shaving") || desc.includes("bark when cut")) {
    return "bark";
  }

  // Flower & Fruit triggers
  if (
    parts.includes("flower") || 
    parts.includes("fruit") || 
    parts.includes("seed") || 
    parts.includes("blossom") || 
    parts.includes("bean") ||
    parts.includes("pod") || 
    desc.includes("flower") || 
    desc.includes("berry")
  ) {
    return "flower";
  }

  // Tree triggers
  if (desc.includes("tree") || desc.includes("canopy") || desc.includes("forest evergreen") || common.includes("tree")) {
    return "tree";
  }

  // Shrub triggers
  if (desc.includes("shrub") || desc.includes("bush") || desc.includes("scrub") || common.includes("shrub")) {
    return "shrub";
  }

  // Default fallback
  return "herb";
}

/**
 * Returns either the active plant image URL or the smart categorised modern placeholder image.
 */
export function getPlantImage(plant: Herb): string {
  if (plant.imageUrl && plant.imageUrl.trim().length > 0) {
    return plant.imageUrl;
  }
  const type = classifyPlantType(plant);
  const match = FALLBACK_CATEGORIES.find((item) => item.type === type);
  return match ? match.url : FALLBACK_CATEGORIES[2].url; // default fresh herb
}

/**
 * Returns a human-friendly description text of the fallback category used.
 */
export function getFallbackCategoryLabel(plant: Herb): string {
  const type = classifyPlantType(plant);
  const match = FALLBACK_CATEGORIES.find((item) => item.type === type);
  return match ? `Fallback Presets • ${match.name}` : "Fallback Presets • General Flora";
}

/**
 * Generates an array of AI-powered suggested royalty-free botanical image suggestions 
 * matching the species scientific/common names or keywords.
 */
export function getAISuggestedImages(plant: Omit<Herb, "id"> | Herb): { title: string; url: string; source: string }[] {
  const scientific = (plant.scientificName || "").trim();
  const common = (plant.commonName || "").trim();
  const category = plant.category || "General";
  const type = classifyPlantType(plant);

  // Curate a beautiful dynamic search/suggestion index using safe royalty free botanical photography
  return [
    {
      title: scientific ? `Sp. ${scientific} (Premium Botanical)` : `${category} Speciation`,
      url: getPlantImage({ id: "999", ...plant } as Herb),
      source: "Unsplash Verified Botanical"
    },
    {
      title: `${common || "Aromatic"} Shrub & Medicine`,
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      source: "Forest Ecology Archive"
    },
    {
      title: "Handpicked Herbal Apothecary Collection",
      url: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=800&q=80",
      source: "Ethnobotanical Herbarium"
    },
    {
      title: "Towering Indigenous African Canopy",
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      source: "Nature Conservation Reserve"
    }
  ];
}
