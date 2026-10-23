import React, { useState, useEffect } from "react";
import { 
  Search, Sprout, ShieldAlert, BookOpen, Coffee, FileSpreadsheet, 
  X, HelpCircle, HeartPulse, Camera, Sparkles, ArrowRight, Layers, Eye, AlertCircle
} from "lucide-react";
import { Herb } from "../types";
import { fetchPlants } from "../utils/api";
import { useLanguage } from "../utils/LanguageContext";
import { getPlantImage } from "../utils/herbImages";
import PlantProfileModal from "./PlantProfileModal";
import PlantIdentifier from "./PlantIdentifier";

interface PlantsCatalogProps {
  initialMode?: 'catalog' | 'identify';
  onIdentifyComplete?: (herbId: string) => void;
}

export default function PlantsCatalog({ initialMode = 'catalog' }: PlantsCatalogProps) {
  const { t, translateHerb, language } = useLanguage();
  const [plants, setPlants] = useState<Herb[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPlant, setSelectedPlant] = useState<Herb | null>(null);
  const [loading, setLoading] = useState(true);
  
  // View mode: catalog vs photo identification
  const [activeView, setActiveView] = useState<'catalog' | 'identify'>(initialMode);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPlants();
        setPlants(data);
      } catch (e) {
        console.error("Failed to load plants catalog:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ["All", "Respiratory", "Digestive", "Pain relief", "Skin & Wounds", "Prostate & Urinary", "General Vitality"];

  const getCategoryLabel = (cat: string) => {
    const maps: Record<string, Record<string, string>> = {
      "All": { en: "🌱 All Registered Species", sw: "🌱 Spishi Zote Zilizosajiliwa", ki: "🌱 Mĩthemba ya kũũra yothe", fr: "🌱 Toutes les Espèces" },
      "Respiratory": { en: "Respiratory", sw: "Pumzi/Kifua", ki: "Ngoro na rera", fr: "Voies Respiratoires" },
      "Digestive": { en: "Digestive", sw: "Mtumbo/Maji", ki: "Nda na mĩrũgĩ", fr: "Système Digestif" },
      "Pain relief": { en: "Pain Relief", sw: "Maumivu", ki: "Kũhoreria maũndũ", fr: "Soulagement Douleur" },
      "Skin & Wounds": { en: "Skin & Wounds", sw: "Ngozi na Vidonda", ki: "Ngo na mĩrimu", fr: "Peau & Blessures" },
      "Prostate & Urinary": { en: "Prostate & Urinary", sw: "Tezi Dume na Kukojoa", ki: "Prostate na urinary", fr: "Prostate & Urinaire" },
      "General Vitality": { en: "General Vitality", sw: "Nguvu ya Mwili", ki: "Hinya wa mwĩrĩ", fr: "Vitalité Générale" }
    };
    return maps[cat]?.[language] || cat;
  };

  const getLabelText = (key: string) => {
    const dicts: Record<string, Record<string, string>> = {
      "showing": { en: "Showing", sw: "Inaonyesha", ki: "Iraonania", fr: "Affichage de" },
      "of": { en: "of", sw: "kati ya", ki: "gatagatĩ ka", fr: "sur" },
      "mapped": { en: "Traditional Species mapped in total", sw: "Spishi za Kiasili zilizoramiwa kwa jumla", ki: "Mũthemba wa mĩthĩga ĩrĩa yandĩkĩtwo yothe", fr: "Espèces Traditionnelles cartographiées au total" },
      "loading": { en: "Loading traditional herb indexes...", sw: "Inapakia faharisi ya mitishamba ya kiasili...", ki: "Iragondia mĩthemba ya mĩthĩga...", fr: "Chargement des index des plantes traditionnelles..." },
      "noResultsTitle": { en: "No exact matches found", sw: "Hakuna mechi halisi zilizopatikana", ki: "Gũtirĩ mĩthĩga mĩandĩke ĩgũanĩte", fr: "Aucune correspondance exacte trouvée" },
      "noResultsDesc": { en: "There are currently no plants matching this term under this tab. Check spelling, try regional or botanical names, or use the Photo Identifier tool.", sw: "Hakuna mimea inayolingana na neno hili. Angalia tahajia au tumia kitambulisho cha picha.", ki: "Gũtirĩ mĩthĩga ĩhana ũguo thĩnĩ wa gĩcigo gĩkĩ.", fr: "Aucune plante correspondant à ce terme." },
      "commonTreats": { en: "Commonly treats:", sw: "Hutibu hasa:", ki: "Ũhonagia nĩ:", fr: "Soigne couramment :" },
      "explorePreparation": { en: "View Comprehensive Profile", sw: "Tazama Wasifu Kamili", ki: "Cũthĩrĩria Wega", fr: "Voir Profil Détaillé" },
      "specimenVerified": { en: "📷 Verified Specimen", sw: "📷 Spishi Iliyothibitishwa", ki: "📷 Mũthĩga mũtitũ", fr: "📷 Spécimen Vérifié" },
      "specimenApprox": { en: "🎨 Botanical Illustration", sw: "🎨 Mchoro wa Kibotania", ki: "🎨 Mbica ya kũerekeza", fr: "🎨 Illustration Botanique" }
    };
    return dicts[key]?.[language] || dicts[key]?.['en'] || key;
  };

  // Diacritic and whitespace normalizer for Kikuyu, Swahili, Maa, Luo, Kamba, English & Latin names
  const normalizeSearchText = (str: string): string => {
    if (!str) return "";
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // strip combining accents (e.g. acute, circumflex, tilde)
      .replace(/[ĩĨ]/g, "i")
      .replace(/[ũŨ]/g, "u")
      .replace(/[ẽẼ]/g, "e")
      .replace(/[õÕ]/g, "o")
      .replace(/['’`\-–—_.,;:()]/g, "") // ignore punctuation and hyphens (e.g., 'ol-sogonoi' matches 'olsogonoi')
      .replace(/\s+/g, " ")
      .trim();
  };

  interface MatchDetail {
    field: string;
    matchedValue: string;
  }

  interface SearchResultItem {
    plant: Herb;
    reasons: MatchDetail[];
  }

  // Enhanced search across scientific, accepted botanical, English, Kiswahili, Kikuyu, Luo, Kamba,
  // Maasai, Samburu, Meru, Kalenjin, and all other documented local names, traits, habitats, and uses
  const searchResults: SearchResultItem[] = plants.reduce<SearchResultItem[]>((acc, h) => {
    const rawQuery = searchTerm.trim();
    const query = normalizeSearchText(rawQuery);

    const matchesCategory = selectedCategory === "All" || h.category === selectedCategory;
    if (!matchesCategory) return acc;

    if (!query) {
      acc.push({ plant: h, reasons: [] });
      return acc;
    }

    const reasons: MatchDetail[] = [];

    // 1. Kikuyu name (with and without diacritics: e.g. MŨTHĨGA / Muthiga)
    if (normalizeSearchText(h.kikuyuName).includes(query)) {
      reasons.push({ field: "Gĩkũyũ", matchedValue: h.kikuyuName });
    }

    // 2. Scientific name & Accepted botanical name
    if (normalizeSearchText(h.scientificName).includes(query)) {
      reasons.push({ field: "Scientific", matchedValue: h.scientificName });
    }
    if (h.acceptedBotanicalName && normalizeSearchText(h.acceptedBotanicalName).includes(query) && h.acceptedBotanicalName !== h.scientificName) {
      reasons.push({ field: "Accepted Botanical", matchedValue: h.acceptedBotanicalName });
    }

    // 3. Common English name
    if (h.commonName && normalizeSearchText(h.commonName).includes(query)) {
      reasons.push({ field: "Common/English", matchedValue: h.commonName });
    }
    if (h.englishName && normalizeSearchText(h.englishName).includes(query) && h.englishName !== h.commonName) {
      reasons.push({ field: "English", matchedValue: h.englishName });
    }

    // 4. Kiswahili name
    if (h.swahiliName && normalizeSearchText(h.swahiliName).includes(query)) {
      reasons.push({ field: "Kiswahili", matchedValue: h.swahiliName });
    }

    // 5. Luo name (Dholuo)
    if (h.luoName && normalizeSearchText(h.luoName).includes(query)) {
      reasons.push({ field: "Dholuo (Luo)", matchedValue: h.luoName });
    }

    // 6. Kamba name (Kikamba)
    if (h.kambaName && normalizeSearchText(h.kambaName).includes(query)) {
      reasons.push({ field: "Kikamba (Kamba)", matchedValue: h.kambaName });
    }

    // 7. Extensible Other Local Names (Maasai, Samburu, Meru, Kalenjin, Taita, Turkana, etc.)
    if (h.otherLocalNames && Array.isArray(h.otherLocalNames)) {
      for (const rec of h.otherLocalNames) {
        if (
          normalizeSearchText(rec.name).includes(query) ||
          normalizeSearchText(rec.language).includes(query) ||
          (rec.locality && normalizeSearchText(rec.locality).includes(query))
        ) {
          reasons.push({
            field: rec.language,
            matchedValue: `${rec.name}${rec.locality ? ` (${rec.locality})` : ""}`
          });
        }
      }
    }

    // 8. Distinguishing characteristics & morphological field traits
    if (h.distinguishingCharacteristics && normalizeSearchText(h.distinguishingCharacteristics).includes(query)) {
      reasons.push({ field: "Diagnostic Trait", matchedValue: "Distinguishing characteristics" });
    }

    // 9. Habitat & Geographical distribution
    if (h.habitat && normalizeSearchText(h.habitat).includes(query)) {
      reasons.push({ field: "Habitat", matchedValue: h.habitat });
    }
    if (h.habitatDistribution && normalizeSearchText(h.habitatDistribution).includes(query)) {
      reasons.push({ field: "Distribution", matchedValue: h.habitatDistribution });
    }

    // 10. Documented traditional medicinal uses & symptoms
    const matchedUses = h.medicinalUses.filter(u => normalizeSearchText(u).includes(query));
    if (matchedUses.length > 0) {
      reasons.push({ field: "Documented Use", matchedValue: matchedUses.join(", ") });
    }

    // 11. General botanical description & preparations
    if (reasons.length === 0) {
      if (normalizeSearchText(h.description).includes(query)) {
        reasons.push({ field: "Description", matchedValue: "Specimen description" });
      } else if (normalizeSearchText(h.preparation).includes(query)) {
        reasons.push({ field: "Preparation", matchedValue: "Preparation guidelines" });
      }
    }

    if (reasons.length > 0) {
      acc.push({ plant: h, reasons });
    }

    return acc;
  }, []);

  const filteredPlants = searchResults.map(r => r.plant);

  const handleOpenFromIdentifier = (herbId: string) => {
    const found = plants.find(p => p.id === herbId);
    if (found) {
      setSelectedPlant(found);
    }
  };

  return (
    <div id="plants-catalog-grid" className="space-y-8 font-sans max-w-7xl mx-auto px-4">
      
      {/* Top Mode Switcher Bar */}
      <div className="bg-white border border-stone-250 p-2 rounded-2xl shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setActiveView('catalog')}
            className={`py-2 px-4 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeView === 'catalog' 
                ? 'bg-emerald-950 text-white shadow-sm' 
                : 'text-stone-600 hover:text-emerald-950'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Botanical Directory ({plants.length})</span>
          </button>

          <button
            onClick={() => setActiveView('identify')}
            className={`py-2 px-4 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeView === 'identify' 
                ? 'bg-emerald-950 text-amber-300 shadow-sm font-black' 
                : 'text-stone-600 hover:text-emerald-950'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            <span>Photo Identification</span>
            <span className="text-[9px] bg-amber-400/20 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded uppercase font-mono">
              AI Vision
            </span>
          </button>
        </div>

        <div className="text-xs text-stone-500 font-semibold px-2">
          {activeView === 'catalog' ? (
            <span>Showing verified indigenous flora of East Africa</span>
          ) : (
            <span>Capture or upload a plant photo for instant analysis</span>
          )}
        </div>
      </div>

      {/* VIEW 1: PHOTO IDENTIFIER MODE */}
      {activeView === 'identify' && (
        <PlantIdentifier 
          onOpenPlantProfile={handleOpenFromIdentifier}
          onClose={() => setActiveView('catalog')}
        />
      )}

      {/* VIEW 2: BOTANICAL CATALOG DIRECTORY MODE */}
      {activeView === 'catalog' && (
        <div className="space-y-8">
          
          {/* Search Header Banner Deck */}
          <div className="bg-gradient-to-br from-emerald-950 via-[#0B1E14] to-emerald-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-900/40">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-6">
              <Sprout className="w-96 h-96 animate-leaf-hover text-emerald-300" />
            </div>

            <div className="max-w-3xl space-y-5 relative z-10 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-[#D4A017] px-3.5 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                  <Sprout className="w-3.5 h-3.5" />
                  {t("label.category") || "Botanical Directory"}
                </span>

                <button
                  onClick={() => setActiveView('identify')}
                  className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-amber-200 px-3.5 py-1.5 bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 rounded-full transition cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  Have a plant photo? Identify here
                </button>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
                {t("nav.plants") || "Medicinal Plant Profiles"}
              </h1>

              <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-medium">
                {t("plants.title") || "Browse through authenticated, scientifically mapped profiles of traditional Kenyan forest herbs. Learn Kikuyu names, preparation brews, and safety profiles verified with empirical ethnobotany."}
              </p>
              
              {/* Main search input */}
              <div className="relative flex items-center pt-2">
                <Search className="absolute left-4 w-5 h-5 text-emerald-300 mr-2 z-10" />
                <input
                  type="text"
                  id="herb-search-inp"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by scientific name, Kikuyu, Swahili, Luo, Kamba, ailment, or habitat..."
                  className="w-full py-4 pl-12 pr-4 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-emerald-950 rounded-2xl border border-white/20 focus:border-white focus:outline-none transition-all placeholder-stone-300 text-xs md:text-sm shadow-inner font-semibold"
                />
              </div>

              {searchTerm && (
                <div className="flex items-center justify-between text-xs text-stone-300 pt-1">
                  <span>Found {filteredPlants.length} species matching "{searchTerm}"</span>
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="underline text-amber-300 hover:text-white cursor-pointer"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Photo ID Promotion Ribbon */}
          <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-emerald-50 border border-emerald-200/80 p-4 sm:p-5 rounded-2xl shadow-sm flex items-center justify-between flex-wrap gap-4 text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
                <Camera className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-emerald-950">
                  Uncertain about a wild specimen in your garden or field?
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-600 font-medium">
                  Use our photo identification tool to compare visual leaf traits against verified East African records.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveView('identify')}
              className="py-2.5 px-5 bg-emerald-950 hover:bg-emerald-850 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Launch Photo Identifier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Categories Horizontal Tabs bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-950 text-amber-300 shadow-md border-emerald-950 scale-102 font-black"
                    : "bg-white text-stone-600 hover:text-emerald-950 hover:bg-stone-50 border-stone-250/90"
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Ambiguity notice banner when search query matches multiple species */}
          {searchTerm.trim().length > 0 && searchResults.length > 1 && (
            <div className="p-4 sm:p-5 bg-amber-50/90 border border-amber-300 rounded-2xl shadow-xs flex items-start gap-3.5 text-left">
              <div className="p-2 bg-amber-200 text-amber-950 rounded-xl shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-black uppercase text-amber-950 tracking-wider">
                  Multiple Species Match "{searchTerm}" ({searchResults.length} Species Documented)
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  In East African ethnobotany, vernacular names, traditional symptoms, or morphological features often correspond to multiple distinct botanical species across different communities. Rather than assuming a single match, all {searchResults.length} candidate species are displayed below with their specific documented language, community locality, and botanical classification to prevent unsafe misapplication.
                </p>
              </div>
            </div>
          )}

          {/* Database Catalog grid */}
          {loading ? (
            <div className="py-20 text-center text-sm text-stone-400 font-bold">
              {getLabelText("loading")}
            </div>
          ) : searchResults.length === 0 ? (
            <div id="no-search-results" className="py-12 px-6 max-w-xl mx-auto bg-white border border-stone-200 rounded-3xl p-8 space-y-4 shadow-sm text-left">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl shrink-0">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-emerald-950 uppercase">
                    No Documented Species Found for "{searchTerm}"
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    No plant record in our verified botanical directory matched this term. To protect biological and cultural safety, we do not fabricate or guess medicinal records for unverified names.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider block">
                  Search Tips & Verified Local Names:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-stone-600 leading-relaxed">
                  <li>Try typing without special diacritics (e.g. type <strong>Muthiga</strong>, <strong>Mucoroi</strong>, or <strong>Kiriri</strong>).</li>
                  <li>Search in regional languages: <strong>Kikuyu, Kiswahili, Dholuo, Kikamba, Maasai, Samburu, Meru, Kalenjin</strong>.</li>
                  <li>Search by botanical genus or species: e.g. <em>Warburgia</em>, <em>Prunus</em>, <em>Carissa</em>, <em>Aloe</em>.</li>
                  <li>Search by documented symptom or condition: e.g. <em>cough</em>, <em>chest</em>, <em>fever</em>, <em>joint pain</em>, <em>stomach</em>.</li>
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Clear Search Filter
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('identify')}
                  className="py-2.5 px-5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Camera className="w-4 h-4 text-amber-300" />
                  Try Photo Identification
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(({ plant: rawPlant, reasons }) => {
                const plant = translateHerb(rawPlant);
                return (
                  <div 
                    key={plant.id}
                    id={`plant-card-${plant.id}`}
                    onClick={() => setSelectedPlant(rawPlant)}
                    className="bg-white border border-stone-200/95 hover:border-emerald-850/40 rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
                  >
                    {/* Botanical Image with Overlays */}
                    <div className="h-52 relative overflow-hidden">
                      <img 
                        src={getPlantImage(rawPlant)}
                        alt={plant.kikuyuName}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Gradient Mask */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-emerald-950/35 to-transparent z-1" />

                      {/* Header floating tags */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 gap-2">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-emerald-950/90 text-emerald-100 border border-emerald-800/40 rounded-full shadow-sm">
                          {plant.category}
                        </span>

                        {plant.severityRating && (
                          <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border shadow-sm ${
                            plant.severityRating === 'Safe'
                              ? 'bg-emerald-900/90 text-emerald-100 border-emerald-700/50'
                              : plant.severityRating === 'Caution'
                                ? 'bg-amber-900/90 text-amber-100 border-amber-700/50'
                                : 'bg-red-900/90 text-red-100 border-red-700/50'
                          }`}>
                            {plant.severityRating}
                          </span>
                        )}
                      </div>

                      {/* Identification / Specimen verification badge */}
                      <div className="absolute top-12 left-4 z-10">
                        <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/65 backdrop-blur-sm text-stone-200 rounded border border-white/10">
                          {rawPlant.imageUrl ? getLabelText("specimenVerified") : getLabelText("specimenApprox")}
                        </span>
                      </div>

                      {/* Conservation badge if available */}
                      {rawPlant.conservationStatus && rawPlant.conservationStatus !== 'Not Evaluated' && (
                        <div className="absolute top-12 right-4 z-10">
                          <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm ${
                            rawPlant.conservationStatus === 'Vulnerable' 
                              ? 'bg-amber-950/90 text-amber-200 border border-amber-600/50' 
                              : 'bg-black/65 text-emerald-200 border border-white/10'
                          }`}>
                            IUCN: {rawPlant.conservationStatus}
                          </span>
                        </div>
                      )}

                      {/* Overlaid Title Copy */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                        <p className="text-[10px] font-mono text-amber-300 font-extrabold uppercase tracking-wider drop-shadow-sm">
                          Kikuyu: {plant.kikuyuName}
                        </p>
                        <h3 className="text-xl font-black tracking-tight font-sans text-white uppercase drop-shadow leading-tight">
                          {plant.commonName || plant.kikuyuName}
                        </h3>
                      </div>
                    </div>

                    {/* Plant Meta Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                      
                      <div className="space-y-3">
                        <div className="text-[11px] font-mono text-emerald-900 font-bold bg-emerald-50/70 border border-emerald-100/70 py-1.5 px-3 rounded-lg flex items-center justify-between leading-none">
                          <span className="italic truncate">{plant.scientificName}</span>
                          {rawPlant.botanicalFamily && (
                            <span className="text-[9px] uppercase font-mono text-stone-500 font-bold shrink-0 ml-1">
                              {rawPlant.botanicalFamily}
                            </span>
                          )}
                        </div>

                        {/* Search Match Reason Indicator */}
                        {searchTerm.trim().length > 0 && reasons.length > 0 && (
                          <div className="p-2 bg-amber-50 border border-amber-200/90 rounded-xl text-[10px] space-y-1">
                            <span className="font-extrabold uppercase text-amber-900 block tracking-wider">
                              Why this plant matched:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {reasons.slice(0, 3).map((r, ri) => (
                                <span key={ri} className="bg-white px-2 py-0.5 rounded border border-amber-300 text-stone-800 font-medium">
                                  <strong>{r.field}:</strong> {r.matchedValue}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Multilingual names pill row */}
                        {(rawPlant.swahiliName || rawPlant.luoName || rawPlant.kambaName || (rawPlant.otherLocalNames && rawPlant.otherLocalNames.length > 0)) && (
                          <div className="flex flex-wrap gap-1 text-[10px] text-stone-600 font-medium">
                            {rawPlant.swahiliName && (
                              <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200 truncate">
                                Swahili: {rawPlant.swahiliName}
                              </span>
                            )}
                            {rawPlant.luoName && (
                              <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200 truncate">
                                Luo: {rawPlant.luoName}
                              </span>
                            )}
                            {rawPlant.kambaName && (
                              <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200 truncate">
                                Kamba: {rawPlant.kambaName}
                              </span>
                            )}
                            {rawPlant.otherLocalNames?.slice(0, 2).map((rec, oi) => (
                              <span key={oi} className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200 truncate">
                                {rec.language}: {rec.name}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-stone-600 leading-relaxed font-normal line-clamp-3">
                          {plant.description}
                        </p>

                        <div className="space-y-1">
                          <h4 className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                            {getLabelText("commonTreats")}
                          </h4>
                          <ul className="space-y-1 pl-1">
                            {plant.medicinalUses.slice(0, 3).map((use, i) => (
                              <li key={i} className="text-stone-800 text-xs font-semibold flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full inline-block shrink-0" />
                                <span className="truncate">{use}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        type="button"
                        id={`learn-more-${plant.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlant(rawPlant);
                        }}
                        className="w-full py-2.5 px-4 bg-stone-50 hover:bg-emerald-850 hover:text-white border border-stone-250 hover:border-emerald-850 text-emerald-950 rounded-xl font-bold text-xs transition duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        {getLabelText("explorePreparation")}
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Comprehensive Plant Profile Detail Modal */}
      {selectedPlant && (
        <PlantProfileModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onOpenIdentifier={() => setActiveView('identify')}
        />
      )}

    </div>
  );
}
