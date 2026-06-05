import React, { useState, useEffect } from "react";
import { Coffee, ShieldCheck, HeartPulse, RefreshCw, Layers, ListChecks, HelpCircle, Thermometer } from "lucide-react";
import { TraditionalRemedy, Herb } from "../types";
import { fetchRemedies, fetchPlants } from "../utils/api";
import { useLanguage } from "../utils/LanguageContext";

export default function TraditionalRemedies() {
  const { t, translateRemedy, translateHerb, language } = useLanguage();
  const [remedies, setRemedies] = useState<TraditionalRemedy[]>([]);
  const [plants, setPlants] = useState<Herb[]>([]);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const dbRem = await fetchRemedies();
        const dbPlan = await fetchPlants();
        setRemedies(dbRem);
        setPlants(dbPlan);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const categories = ["All", "Respiratory Systems", "Oral Pain Care", "Stomach & Fever Cleansing", "Men's Health & prostate", "Fungal Dermal Wounds"];

  const getCategoryLabel = (cat: string) => {
    const maps: Record<string, Record<string, string>> = {
      "All": { en: "🌱 All Recipes", sw: "🌱 Mapishi Yote", ki: "🌱 Mithemba yothe", fr: "🌱 Toutes les Recettes" },
      "Respiratory Systems": { en: "Respiratory Systems", sw: "Mfumo wa Kupumua", ki: "Kĩgũũto na rera", fr: "Système Respiratoire" },
      "Oral Pain Care": { en: "Oral Pain Care", sw: "Maumivu ya Kinywa", ki: "Pain ya kanũa", fr: "Maux de Bouche" },
      "Stomach & Fever Cleansing": { en: "Stomach & Fever Cleansing", sw: "Kusafisha Tumbo & Homa", ki: "Marũ monda na mĩrimũ ya thumu", fr: "Nettoyage Estomac & Fièvre" },
      "Men's Health & prostate": { en: "Men's Health & Prostate", sw: "Afya ya Wanaume & Tezi", ki: "Hinya wa arũme nda", fr: "Santé de l'homme & prostate" },
      "Fungal Dermal Wounds": { en: "Fungal Dermal Wounds", sw: "Vidonda vya Ngozi", ki: "Mĩrimũ ya ngo", fr: "Plaies Cutanées Fungal" }
    };
    return maps[cat]?.[language] || cat;
  };

  const filteredRemedies = remedies.filter((rem) => {
    const matchesCategory = selectedCategory === "All" || rem.category === selectedCategory;
    const query = filterKeyword.toLowerCase();
    const matchesKeyword = 
      rem.title.toLowerCase().includes(query) ||
      rem.symptoms.some((s) => s.toLowerCase().includes(query)) ||
      rem.recommendedHerbs.some((h) => h.toLowerCase().includes(query));
    return matchesCategory && matchesKeyword;
  });

  return (
    <div id="remedies-viewport" className="space-y-8 font-sans max-w-7xl mx-auto px-4">
      
      {/* Title Header Banner Deck */}
      <div className="bg-stone-100/50 p-6 md:p-8 rounded-3xl border border-stone-250 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2 py-1 rounded">{t("label.category")}</span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-sans">{t("nav.remedies")}</h1>
          <p className="text-sm text-stone-500 leading-relaxed font-normal">
            Traditional combinations of leaf juices, boiled bark decoctions, and fresh roots. Click tab filters below to browse remedies tailored and mapped to daily body ailments.
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <input
            type="text"
            placeholder={t("plants.searchPlaceholder")}
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            className="px-4 py-3 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white placeholder-stone-400 shadow-sm"
          />
        </div>
      </div>

      {/* Category filters list */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition duration-150 ${
              selectedCategory === cat
                ? "bg-emerald-950 text-white shadow-sm"
                : "bg-white text-stone-600 hover:text-emerald-950 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      {filteredRemedies.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto bg-white border border-stone-200 rounded-2xl p-6 text-stone-400">
          No remedies found matching your search. Try checking spelling or search simple terms like "cough" or "fever".
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredRemedies.map((rawRem) => {
            const rem = translateRemedy(rawRem);
            return (
              <div 
                key={rem.id} 
                id={`rem-card-${rem.id}`}
                className="bg-white border border-stone-250 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                
                <div className="space-y-4">
                  {/* Category Pill Tag Block */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {rem.category}
                    </span>
                    <span className="text-[10px] text-stone-400 font-bold font-mono">Dose: {rem.dose}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-stone-900 tracking-tight leading-snug">
                    {rem.title}
                  </h3>

                  {/* Target Symptoms Pill Pack */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {rem.symptoms.map((sym, idx) => (
                      <span key={idx} className="text-[10px] bg-red-50 text-red-800 font-bold px-2 py-0.5 rounded-md border border-red-100 flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-red-500" />
                        {sym}
                      </span>
                    ))}
                  </div>

                  {/* Interlinked Associated Herb Profiles from db */}
                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/50 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Recommended Indigenous Herbs:</span>
                    <div className="flex flex-wrap gap-2">
                      {rem.recommendedHerbs.map((rh, idx) => {
                        // find associated scientific plant profile
                        const associatedPlant = plants.find((p) => p.kikuyuName === rh);
                        return (
                          <div 
                            key={idx} 
                            className="bg-white px-3 py-1 rounded-full border border-stone-200 shadow-sm text-xs font-bold text-stone-800 flex items-center gap-1.5"
                          >
                            <HeartPulse className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{rh}</span>
                            {associatedPlant && (
                              <span className="italic text-[10px] text-stone-500 font-normal font-sans">({associatedPlant.scientificName})</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recipe Brewing steps list */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
                      <ListChecks className="w-4 h-4 text-emerald-700" />
                      Traditional Recipe & Brewing Steps:
                    </h4>
                    <div className="space-y-3 pl-1">
                      {rem.steps.map((st, sIdx) => (
                        <div key={sIdx} className="flex gap-3 leading-relaxed text-xs">
                          <span className="w-5 h-5 bg-stone-100 rounded-full text-emerald-900 border font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <p className="font-semibold text-stone-700">
                            {st}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Foot safety declaration */}
                <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-[10px] text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Never ingest raw toxic saps. Limit doses to 1 cup twice daily unless specified otherwise.</span>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
