import React, { useState, useEffect } from "react";
import { Search, Sprout, ShieldAlert, BookOpen, Coffee, FileSpreadsheet, X, HelpCircle, HeartPulse } from "lucide-react";
import { Herb } from "../types";
import { fetchPlants } from "../utils/api";
import { useLanguage } from "../utils/LanguageContext";
import { getPlantImage } from "../utils/herbImages";

export default function PlantsCatalog() {
  const { t, translateHerb, language } = useLanguage();
  const [plants, setPlants] = useState<Herb[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPlant, setSelectedPlant] = useState<Herb | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPlants();
        setPlants(data);
      } catch (e) {
        console.error(e);
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

  const filteredPlants = plants.filter((h) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      h.kikuyuName.toLowerCase().includes(query) ||
      h.commonName.toLowerCase().includes(query) ||
      h.scientificName.toLowerCase().includes(query) ||
      h.medicinalUses.some(use => use.toLowerCase().includes(query)) ||
      h.description.toLowerCase().includes(query) ||
      h.preparation.toLowerCase().includes(query);

    const matchesCategory = selectedCategory === "All" || h.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div id="plants-catalog-grid" className="space-y-8 font-sans max-w-7xl mx-auto px-4">
      
      {/* Search Header Banner Deck */}
      <div className="bg-gradient-to-br from-emerald-950 via-green-950 to-emerald-900 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-6">
          <Sprout className="w-96 h-96 animate-leaf-hover" />
        </div>

        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-300 px-3 py-1 bg-emerald-900/60 rounded-full border border-emerald-800">
            {t("label.category")}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t("plants.catalog")}</h1>
          <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed font-normal">
            Browse through authenticated, scientifically mapped profiles of traditional Kenyan forest herbs. Learn Kikuyu names, preparation brews, and safety profiles verified with empirical ethnobotany.
          </p>
          
          {/* Main search input */}
          <div className="relative flex items-center pt-2">
            <Search className="absolute left-4 w-5 h-5 text-emerald-300/80" />
            <input
              type="text"
              id="herb-search-inp"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("plants.searchPlaceholder")}
              className="w-full py-4.5 pl-12 pr-4 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-emerald-950 rounded-2xl border border-white/20 focus:border-white focus:outline-none transition-all placeholder-emerald-250 text-xs md:text-sm shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Categories Horizontal Tabs bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
              selectedCategory === cat
                ? "bg-emerald-950 text-white shadow-md border-emerald-950 scale-102"
                : "bg-white text-stone-600 hover:text-emerald-950 hover:bg-stone-50 border-stone-200"
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Grid count state */}
      <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
        Showing {filteredPlants.length} of {plants.length} Traditional Species mapped
      </div>

      {/* Database Catalog grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-stone-400">Loading traditional herb indexes...</div>
      ) : filteredPlants.length === 0 ? (
        <div id="no-search-results" className="py-16 text-center max-w-md mx-auto bg-white border border-stone-200 rounded-3xl p-8 space-y-4 shadow-sm">
          <HelpCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
          <h3 className="text-md font-bold text-emerald-950">No exact matches found</h3>
          <p className="text-xs text-stone-500 leading-relaxed font-normal">
            There are currently no plants matching "{searchTerm}" under this tab. Check spelling, try Gĩkũyũ letters, or click the <strong>Ask DawaBot</strong> panel for real-time generative library searches!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((rawPlant) => {
            const plant = translateHerb(rawPlant);
            return (
              <div 
                key={plant.id}
                id={`plant-card-${plant.id}`}
                className="bg-white border border-stone-250 hover:border-emerald-700/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-350 flex flex-col justify-between group cursor-pointer relative"
              >
                {/* Botanical Image with Premium Blend Overlays */}
                <div className="h-44 relative overflow-hidden">
                  <img 
                    src={getPlantImage(rawPlant)}
                    alt={plant.kikuyuName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle rich gradient overlay mask to guarantee readability and high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-emerald-950/45 to-stone-900/10 z-1" />
                  
                  {/* Floating header badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    {/* Category Pill Tag */}
                    <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-emerald-950/90 text-emerald-100 border border-emerald-800/40 rounded-full shadow-sm">
                      {plant.category}
                    </span>

                    {/* Safety Indicator Badge */}
                    {plant.severityRating && (
                      <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border shadow-sm ${
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

                  {/* Subtle label explaining verified vs illustration placeholder source to user */}
                  <div className="absolute top-11 left-3 z-10">
                    <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-sm text-stone-200 rounded border border-white/5">
                      {rawPlant.imageUrl ? "📷 Verified Specimen" : "🎨 Botanical Illustration"}
                    </span>
                  </div>

                  {/* Overlaid Title Copy */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <p className="text-[10px] font-mono text-emerald-250 font-bold uppercase tracking-wider drop-shadow-sm">{plant.commonName || 'Indigenous Flora'}</p>
                    <h3 className="text-xl font-black tracking-tight font-sans text-white uppercase drop-shadow">{plant.kikuyuName}</h3>
                  </div>
                </div>

              {/* Plant Meta Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  <div className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50/50 border border-emerald-100/50 py-1.5 px-3 rounded-lg flex items-center gap-1.5 leading-none">
                    <HeartPulse className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Scientific: <strong className="italic">{plant.scientificName}</strong></span>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed font-normal line-clamp-3">
                    {plant.description}
                  </p>

                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Commonly treats:</h4>
                    <ul className="space-y-1 pl-1">
                      {plant.medicinalUses.slice(0, 3).map((use, i) => (
                        <li key={i} className="text-stone-800 text-xs font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full inline-block shrink-0" />
                          <span className="truncate">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  id={`learn-more-${plant.id}`}
                  onClick={() => setSelectedPlant(plant)}
                  className="w-full py-2 px-4 bg-stone-50 hover:bg-emerald-750 hover:text-white border border-stone-250 text-emerald-950 rounded-xl font-bold text-xs transition duration-200 flex items-center justify-center gap-2 group-hover:border-emerald-750"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Explore Traditional Preparation
                </button>

              </div>

            </div>
          );
          })}
        </div>
      )}

      {/* Side drawer to display botanical preparation and cultural details */}
      {selectedPlant && (() => {
        const p = translateHerb(selectedPlant);
        return (
          <div id="plant-details-drawer" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end transition-opacity font-sans">
            <div 
              className="w-full max-w-xl h-full bg-white text-stone-900 overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between"
              role="dialog"
              aria-modal="true"
            >
              <div className="space-y-6">
                {/* Header Action tab bar */}
                <div className="flex items-center justify-between border-b border-stone-150 pb-4">
                  <div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold uppercase px-2 py-1 rounded">Traditional Mapped Profile</span>
                    <h2 className="text-2xl font-extrabold text-stone-900 mt-2 tracking-tight uppercase flex items-center gap-2">
                      {p.kikuyuName}
                    </h2>
                  </div>
                  <button
                    id="close-drawer-btn"
                    onClick={() => setSelectedPlant(null)}
                    className="p-2 hover:bg-stone-50 bg-stone-100 rounded-full text-stone-500 hover:text-stone-800 border"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Immensive Specimen Image/Illustration Banner */}
                <div id="drawer-specimen-banner" className="relative h-48 w-full rounded-2xl overflow-hidden border border-stone-200/50 shadow-inner">
                  <img 
                    src={getPlantImage(selectedPlant)} 
                    alt={p.kikuyuName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 shadow flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-extrabold text-stone-100 uppercase tracking-wider">
                      {selectedPlant.imageUrl ? "Verified Live Specimen" : "Botanical Illustration Approximation"}
                    </span>
                  </div>
                </div>

                {/* Floating metadata tag info summary */}
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400">Scientific Name</span>
                    <p className="font-mono text-emerald-850 italic font-bold">{p.scientificName}</p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400">Common English Name</span>
                    <p className="text-stone-850 font-bold">{p.commonName || 'Indigenous Shrub'}</p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400">Part Utilized</span>
                    <p className="text-stone-850 font-bold">{p.partUsed}</p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400">Symptom Tab Category</span>
                    <p className="text-stone-850 font-bold">{p.category}</p>
                  </div>
                </div>

                {/* Description block */}
                <div className="space-y-2">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-850">Botanical Overview</h3>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">{p.description}</p>
                </div>

                {/* Medicinal uses list */}
                <div className="space-y-2">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-850">Registered Healing Remedies</h3>
                  <div className="space-y-2">
                    {p.medicinalUses.map((use, index) => (
                      <div key={index} className="flex items-start gap-3 bg-stone-100/50 p-3 rounded-xl border border-stone-200/40 text-xs">
                        <span className="w-5 h-5 bg-emerald-600 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{index+1}</span>
                        <p className="font-semibold text-stone-800">{use}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preparation instructions */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-100/70 rounded-2xl space-y-2.5">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-850 flex items-center gap-1.5">
                    <Coffee className="w-4 h-4 text-emerald-700" />
                    Traditional Preparation & Recipe Brew
                  </h3>
                  <p className="text-xs text-stone-800 leading-relaxed font-semibold">
                    {p.preparation}
                  </p>
                </div>

                {/* Cultural Context */}
                {p.traditionalContext && (
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-850">Ethnobotanical Context & Customs</h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal italic">
                      "{p.traditionalContext}"
                    </p>
                  </div>
                )}

                {/* Safety Precautions warnings block */}
                <div className="p-4 bg-red-50 border border-red-150 rounded-2xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-red-800 tracking-wide uppercase">Critical Safety & Toxicity warning</h4>
                    <p className="text-xs text-red-950 leading-relaxed font-semibold">
                      {p.precautions}
                    </p>
                  </div>
                </div>

              </div>

              <p className="text-[10px] text-center opacity-50 block pt-4">
                All therapeutic parameters are catalogued from verified Kikuyu oral and literature reports. Always handle native plants ethically.
              </p>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
