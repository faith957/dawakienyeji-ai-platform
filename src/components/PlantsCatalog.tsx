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

  const getLabelText = (key: string) => {
    const dicts: Record<string, Record<string, string>> = {
      "showing": {
        en: "Showing",
        sw: "Inaonyesha",
        ki: "Iraonania",
        fr: "Affichage de"
      },
      "of": {
        en: "of",
        sw: "kati ya",
        ki: "gatagatĩ ka",
        fr: "sur"
      },
      "mapped": {
        en: "Traditional Species mapped in total",
        sw: "Spishi za Kiasili zilizoramiwa kwa jumla",
        ki: "Mũthemba wa mĩthĩga ĩrĩa yandĩkĩtwo yothe",
        fr: "Espèces Traditionnelles cartographiées au total"
      },
      "loading": {
        en: "Loading traditional herb indexes...",
        sw: "Inapakia faharisi ya mitishamba ya kiasili...",
        ki: "Iragondia mĩthemba ya mĩthĩga...",
        fr: "Chargement des index des plantes traditionnelles..."
      },
      "noResultsTitle": {
        en: "No exact matches found",
        sw: "Hakuna mechi halisi zilizopatikana",
        ki: "Gũtirĩ mĩthĩga mĩandĩke ĩgũanĩte",
        fr: "Aucune correspondance exacte trouvée"
      },
      "noResultsDesc": {
        en: "There are currently no plants matching this term under this tab. Check spelling, try Gĩkũyũ letters, or ask the AI Chatbot for options.",
        sw: "Hakuna mimea inayolingana na neno hili chini ya kichupo hiki. Angalia tahajia, jaribu herufi za Kikuyu, au uulize Chatbot ya AI.",
        ki: "Gũtirĩ mĩthĩga ĩhana ũguo thĩnĩ wa gĩcigo gĩkĩ. Cũthĩrĩria wandĩki, na ũũrie DawaBot igũrũ rĩa ũgũiki ũcio.",
        fr: "Il n'y a actuellement aucune plante correspondant à ce terme. Vérifiez l'orthographe ou demandez au Chatbot IA."
      },
      "botanicalOverview": {
        en: "Botanical Overview",
        sw: "Muhtasari wa Kibotania",
        ki: "Ũrĩa mũthĩga ũhanĩte",
        fr: "Aperçu Botanique"
      },
      "healingRemedies": {
        en: "Registered Healing Remedies",
        sw: "Tiba za Uponyaji Zilizosajiliwa",
        ki: "Mĩrimu ĩrĩa ĩhonagio nĩ mũthĩga",
        fr: "Remèdes de Guérison Répertoriés"
      },
      "partUsed": {
        en: "Part Utilized",
        sw: "Sehemu Inayotumika",
        ki: "Gĩcĩgo kĩrĩa kĩhũthagĩrũo",
        fr: "Partie Utilisée"
      },
      "commonTreats": {
        en: "Commonly treats:",
        sw: "Hutibu hasa:",
        ki: "Ũhonagia nĩ:",
        fr: "Soigne couramment :"
      },
      "explorePreparation": {
        en: "Explore Traditional Preparation",
        sw: "Chunguza Maandalizi ya Kiasili",
        ki: "Cũthĩrĩria ũrĩa ũrugagwo",
        fr: "Explorer la Préparation Traditionnelle"
      },
      "traditionalPrep": {
        en: "Traditional Preparation & Recipe Brew",
        sw: "Maandalizi ya Kiasili & Mapishi ya Dawa",
        ki: "Ũrĩa ũnyuagwo na ũrĩa ũrugagwo wega",
        fr: "Préparation Traditionnelle & Recette"
      },
      "culturalContext": {
        en: "Ethnobotanical Context & Customs",
        sw: "Muktadha wa Kiasili & Mila na Desturi",
        ki: "Ũũgĩ wa tene na mĩtugo ya mĩthĩga",
        fr: "Contexte Ethnobotanique & Coutumes"
      },
      "safetyWarningTitle": {
        en: "Critical Safety & Toxicity warning",
        sw: "Onyo Muhimu la Usalama & Sumu",
        ki: "Kũrũũithania igũrũ rĩa ũgĩtĩri na rũlũ",
        fr: "Avertissement de Sécurité & Toxicité Critique"
      },
      "specimenVerified": {
        en: "📷 Verified Specimen",
        sw: "📷 Spishi Iliyothibitishwa",
        ki: "📷 Mũthĩga mũtitũ",
        fr: "📷 Spécimen Vérifié"
      },
      "specimenApprox": {
        en: "🎨 Botanical Illustration",
        sw: "🎨 Mchoro wa Kibotania",
        ki: "🎨 Mbica ya kũerekeza",
        fr: "🎨 Illustration Botanique"
      },
      "footerSafety": {
        en: "All therapeutic parameters are catalogued from verified oral and literature reports. Always handle native plants ethically.",
        sw: "Vipimo vyote vya matibabu vimeorodheshwa kutoka kwa ripoti zilizothibitishwa. Daima shughulikia mimea asilia kwa maadili.",
        ki: "Ũũgĩ ũcio wothe wandĩkĩtwo nĩ makũgũanĩra na andũ a tene. Teithĩka na mĩthĩga na njĩra ya gĩtĩo.",
        fr: "Tous les paramètres thérapeutiques proviennent de rapports vérifiés. Manipulez toujours les plantes avec éthique."
      },
      "scientificName": {
        en: "Scientific Name",
        sw: "Jina la Kisayansi",
        ki: "Rĩĩtwa rĩa Sayansi",
        fr: "Nom Scientifique"
      },
      "commonEnglishName": {
        en: "Common English Name",
        sw: "Jina la Kawaida la Kiingereza",
        ki: "Rĩĩtwa rĩa Gĩthũngũ",
        fr: "Nom Anglais Courant"
      },
      "symptomTabCategory": {
        en: "Symptom Tab Category",
        sw: "Kitengo cha Kichupo",
        ki: "Mũthemba wa Mĩrimu",
        fr: "Catégorie de Symptôme"
      },
      "verifiedLive": {
        en: "Verified Live Specimen",
        sw: "Sampuli Hai Iliyothibitishwa",
        ki: "Kĩonereria mũgũgũ kĩrũmĩru",
        fr: "Spécimen Réel Vérifié"
      },
      "botanicalApprox": {
        en: "Botanical Illustration Approximation",
        sw: "Mchoro wa Makadirio wa Kibotania",
        ki: "Mbica ya kũerekeza mũgũgũ",
        fr: "Illustration Botanique Approximative"
      }
    };
    return dicts[key]?.[language] || dicts[key]?.['en'] || key;
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
      <div className="bg-gradient-to-br from-emerald-950 via-[#0B1E14] to-emerald-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-900/40">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-6">
          <Sprout className="w-96 h-96 animate-leaf-hover text-emerald-300" />
        </div>

        <div className="max-w-2xl space-y-5 relative z-10 text-left">
          <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-[#D4A017] px-3.5 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <Sprout className="w-3.5 h-3.5" />
            {t("label.category") || "Category"}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
            {t("nav.plants") || "Medicinal Plants"}
          </h1>
          <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-medium">
            {t("plants.title") || "Browse through authenticated, scientifically mapped profiles of traditional Kenyan forest herbs. Learn Kikuyu names, preparation brews, and safety profiles verified with empirical ethnobotany."}
          </p>
          
          {/* Main search input */}
          <div className="relative flex items-center pt-3">
            <Search className="absolute left-4 w-5 h-5 text-emerald-300 mr-2 z-10" />
            <input
              type="text"
              id="herb-search-inp"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("plants.searchPlaceholder") || "Search by name, remedy, or uses..."}
              className="w-full py-4 pl-12 pr-4 bg-white/5 hover:bg-white/10 focus:bg-white text-white focus:text-emerald-950 rounded-2xl border border-white/15 focus:border-white focus:outline-none transition-all placeholder-stone-400 text-xs md:text-sm shadow-inner font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Categories Horizontal Tabs bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
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

      {/* Grid count state */}
      <div className="text-[10px] font-mono font-black text-stone-400 uppercase tracking-widest text-left">
        {getLabelText("showing")} <span className="text-[#D4A017]">{filteredPlants.length}</span> {getLabelText("of")} {plants.length} {getLabelText("mapped")}
      </div>

      {/* Database Catalog grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-stone-400 font-bold">
          {getLabelText("loading")}
        </div>
      ) : filteredPlants.length === 0 ? (
        <div id="no-search-results" className="py-16 text-center max-w-md mx-auto bg-white border border-stone-200 rounded-3xl p-8 space-y-4 shadow-sm">
          <HelpCircle className="w-12 h-12 text-[#D4A017] mx-auto animate-bounce" />
          <h3 className="text-md font-extrabold text-emerald-950 uppercase">{getLabelText("noResultsTitle")}</h3>
          <p className="text-xs text-stone-500 leading-relaxed font-normal">
            {getLabelText("noResultsDesc")}
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
                className="bg-white border border-stone-200/95 hover:border-emerald-850/30 rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-350 flex flex-col justify-between group cursor-pointer relative"
              >
                {/* Botanical Image with Premium Blend Overlays */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={getPlantImage(rawPlant)}
                    alt={plant.kikuyuName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle rich gradient overlay mask to guarantee readability and high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-emerald-950/45 to-stone-900/10 z-1" />
                  
                  {/* Floating header badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    {/* Category Pill Tag */}
                    <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-emerald-950/90 text-emerald-100 border border-emerald-800/40 rounded-full shadow-sm">
                      {plant.category}
                    </span>

                    {/* Safety Indicator Badge */}
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

                  {/* Subtle label explaining verified vs approximation source */}
                  <div className="absolute top-12 left-4 z-10">
                    <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-sm text-stone-200 rounded border border-white/5">
                      {rawPlant.imageUrl ? getLabelText("specimenVerified") : getLabelText("specimenApprox")}
                    </span>
                  </div>

                  {/* Overlaid Title Copy */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                    <p className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-wider drop-shadow-sm">
                      {language === 'ki' ? (plant.commonName || 'Indigenous Flora') : `Kikuyu: ${plant.kikuyuName}`}
                    </p>
                    <h3 className="text-xl font-black tracking-tight font-sans text-white uppercase drop-shadow">
                      {language === 'ki' ? plant.kikuyuName : (plant.commonName || 'Indigenous Flora')}
                    </h3>
                  </div>
                </div>

                {/* Plant Meta Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                  
                  <div className="space-y-3">
                    <div className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50/50 border border-emerald-100/50 py-1.5 px-3 rounded-lg flex items-center gap-1.5 leading-none">
                      <HeartPulse className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Scientific: <strong className="italic">{plant.scientificName}</strong></span>
                    </div>

                    <p className="text-xs text-stone-500 leading-relaxed font-normal line-clamp-3">
                      {plant.description}
                    </p>

                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                        {getLabelText("commonTreats")}
                      </h4>
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
                    onClick={() => setSelectedPlant(rawPlant)}
                    className="w-full py-2 px-4 bg-stone-50 hover:bg-emerald-800 hover:text-white border border-stone-250 hover:border-emerald-800 text-emerald-950 rounded-xl font-bold text-xs transition duration-200 flex items-center justify-center gap-2"
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
              <div className="space-y-6 text-left">
                {/* Header Action tab bar */}
                <div className="flex items-center justify-between border-b border-stone-150 pb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold uppercase px-2 py-1 rounded">
                        {t("plants.detailsTitle") || "Traditional Mapped Profile"}
                      </span>
                      {language !== 'ki' && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200/50 font-extrabold uppercase px-2 py-1 rounded">
                          {p.kikuyuName}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-extrabold text-stone-900 mt-2 tracking-tight uppercase flex items-center gap-2">
                      {language === 'ki' ? p.kikuyuName : p.commonName}
                    </h2>
                    {language !== 'ki' && (
                      <p className="text-xs text-stone-500 font-semibold mt-1">
                        ({t("label.kikuyuLanguage") || "Kikuyu"}: {p.kikuyuName})
                      </p>
                    )}
                    {language === 'ki' && (
                      <p className="text-xs text-stone-500 font-semibold mt-1">
                        ({t("label.englishLanguage") || "English"}: {p.commonName})
                      </p>
                    )}
                  </div>
                  <button
                    id="close-drawer-btn"
                    onClick={() => setSelectedPlant(null)}
                    className="p-2 hover:bg-stone-50 bg-stone-100 rounded-full text-stone-500 hover:text-stone-800 border cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Specimen Image */}
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
                      {selectedPlant.imageUrl ? getLabelText("verifiedLive") : getLabelText("botanicalApprox")}
                    </span>
                  </div>
                </div>

                {/* Floating metadata tag info summary */}
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400">{getLabelText("scientificName")}</span>
                    <p className="font-mono text-emerald-850 italic font-bold">{p.scientificName}</p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400">{getLabelText("commonEnglishName")}</span>
                    <p className="text-stone-850 font-bold">{p.commonName || 'Indigenous Shrub'}</p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400">{getLabelText("partUsed")}</span>
                    <p className="text-stone-850 font-bold">{p.partUsed}</p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400">{getLabelText("symptomTabCategory")}</span>
                    <p className="text-stone-850 font-bold">{getCategoryLabel(p.category)}</p>
                  </div>
                </div>

                {/* Description block */}
                <div className="space-y-2">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-850">
                    {getLabelText("botanicalOverview")}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">{p.description}</p>
                </div>

                {/* Medicinal uses list */}
                <div className="space-y-2">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-850">
                    {getLabelText("healingRemedies")}
                  </h3>
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
                    {getLabelText("traditionalPrep")}
                  </h3>
                  <p className="text-xs text-stone-800 leading-relaxed font-semibold">
                    {p.preparation}
                  </p>
                </div>

                {/* Cultural Context */}
                {p.traditionalContext && (
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-850">
                      {getLabelText("culturalContext")}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal italic">
                      "{p.traditionalContext}"
                    </p>
                  </div>
                )}

                {/* Safety Precautions warnings block */}
                <div className="p-4 bg-red-50 border border-red-150 rounded-2xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-red-800 tracking-wide uppercase">
                      {getLabelText("safetyWarningTitle")}
                    </h4>
                    <p className="text-xs text-red-950 leading-relaxed font-semibold">
                      {p.precautions}
                    </p>
                  </div>
                </div>

              </div>

              <p className="text-[10px] text-center opacity-50 block pt-4">
                {getLabelText("footerSafety")}
              </p>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
