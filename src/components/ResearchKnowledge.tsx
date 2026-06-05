import React, { useState, useEffect } from "react";
import { BookOpen, Table, ShieldCheck, TreePine, Download, Search, RefreshCw, Layers, CheckSquare, Microscope } from "lucide-react";
import { KnowledgeBaseArticle } from "../types";
import { fetchArticles } from "../utils/api";
import { useLanguage } from "../utils/LanguageContext";

export default function ResearchKnowledge() {
  const { t, translateArticle, language } = useLanguage();
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeBaseArticle | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchArticles();
        setArticles(data);
        if (data.length > 0) {
          setSelectedArticle(data[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div id="research-kb-viewport" className="space-y-8 font-sans max-w-7xl mx-auto px-4">
      
      {/* Title Header Banner Deck */}
      <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-250/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Preservation Library</span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-sans">{t("nav.knowledgeBase")}</h1>
          <p className="text-sm text-stone-500 leading-relaxed font-normal">
            A comprehensive, clinically reviewed repository of traditional Kikuyu ethnobotany, dosage toxicity evaluations, chemical secondary metabolites, and sustainable harvesting manuals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Academic Articles indices */}
        <div className="lg:col-span-8 bg-white border border-stone-250 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-800" />
            <h2 className="text-md font-bold text-stone-900 uppercase">Scientific Treatise Papers</h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-stone-400">Loading articles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Short listing left block */}
              <div className="md:col-span-4 space-y-2.5 border-r border-stone-100 pr-2">
                {articles.map((rawArt) => {
                  const art = translateArticle(rawArt);
                  const isCur = selectedArticle?.id === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArticle(rawArt)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold leading-normal transition-all flex flex-col gap-1 ${
                        isCur 
                          ? 'bg-emerald-950 text-white border-emerald-950 shadow' 
                          : 'bg-stone-50 border-stone-150 text-stone-800 hover:bg-stone-100/50 hover:text-emerald-950'
                      }`}
                    >
                      <span>{art.title}</span>
                      <span className={`text-[9px] uppercase font-bold tracking-wider ${isCur ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        {art.category}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected article full text right block */}
              <div className="md:col-span-8 space-y-4">
                {selectedArticle ? (() => {
                  const sa = translateArticle(selectedArticle);
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-50 pb-2">
                        <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                          Category: {sa.category}
                        </span>
                        <span className="text-[10px] text-stone-400 font-bold font-mono">Last updated: {sa.lastUpdated || "Jan 2026"}</span>
                      </div>

                      <h3 className="text-lg font-extrabold text-stone-950 leading-snug tracking-tight">
                        {sa.title}
                      </h3>

                      <p className="text-xs text-stone-400 font-bold leading-relaxed italic border-l-2 border-emerald-700 pl-3">
                        Abstract: "{sa.excerpt}"
                      </p>

                      <div className="text-stone-750 text-xs font-semibold leading-relaxed space-y-4 font-sans whitespace-pre-wrap">
                        {sa.content}
                      </div>

                      <div className="pt-4 border-t border-stone-100 text-[10px] text-stone-500 font-bold">
                        Verified Review Author: {sa.author}
                      </div>

                    </div>
                  );
                })() : (
                  <p className="text-center py-20 text-xs text-stone-400">Select an article from index to read details.</p>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Right column: Interactive Sustainable Harvesting & Safety tools */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Sustainable Harvesting infographics diagram */}
          <div className="bg-white border border-stone-250 p-6 rounded-2xl shadow-sm space-y-3.5">
            <h3 className="text-sm font-extrabold text-emerald-950 uppercase border-b border-stone-100 pb-2.5 flex items-center gap-1.5 font-sans">
              <TreePine className="w-5 h-5 text-emerald-700" />
              Ethics & Preservation Guideline
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed font-normal">
              To protect bark trees (like Pygeum/Mũcorai) from death via complete phloem ring destruction, harvesters must strictly follow the **Vertical Strip Striping Protocol**:
            </p>

            {/* Simulated ASCII/SVG vertical strip diagram */}
            <div className="p-4 bg-emerald-950 text-emerald-300 font-mono text-[10px] rounded-xl text-center space-y-1 select-none border border-emerald-900 shadow-inner">
              <div>           [ TREE TRUNK CANOPY ]           </div>
              <div>                  ||   ||                  </div>
              <div>                //||   ||\\\\               </div>
              <div>         ______|  ||   ||  |______         </div>
              <div>        /   _  |  ||   ||  |  _   \\        </div>
              <div>       |   [X] |  ||   ||  | [X]   |       </div>
              <div>       |  REMOVED |   ||   | |REMOVED  |       </div>
              <div>       |   STRIP  |  ||   ||  | STRIP   |       </div>
              <div>       |   (EAST) |  ||   ||  | (WEST)  |       </div>
              <div>       |   (Safe) |  ||   ||  | (Safe)  |       </div>
              <div>       |______|___|__||___||__|______|       </div>
              <div>                  ||   ||                  </div>
              <div>               [ ROOT CORE ]              </div>
            </div>

            <div className="space-y-2 text-[10px] leading-relaxed font-semibold text-stone-700 pt-1.5">
              <p className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full inline-block mt-1 shrink-0" />
                <span>Only peel opposite vertical bands (East and West sides). Never ring-girdle.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full inline-block mt-1 shrink-0" />
                <span>Post-cut plastering (rubbing wet damp soil over the cut bark patch) keeps pests and fungi away.</span>
              </p>
            </div>
          </div>

          {/* Active Metabolites panel */}
          <div className="bg-white border border-stone-250 p-6 rounded-2xl shadow-sm space-y-3.5">
            <h3 className="text-sm font-extrabold text-stone-900 uppercase border-b border-stone-100 pb-2.5 flex items-center gap-1.5">
              <Microscope className="w-5 h-5 text-emerald-800" />
              Active Secondary Bio-molecules
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed font-normal">Our laboratory categorizes Kikuyu traditional flora bioactive indices under these key therapeutic chemical metrics:</p>

            <div className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold font-mono">
                  <span className="text-emerald-900">Sesquiterpene Dialdehydes</span>
                  <span className="text-emerald-600">High (Mũthĩga)</span>
                </div>
                <p className="text-[10px] text-stone-400 font-normal leading-relaxed">Strong bronchodilating, antibacterial, antifungal effects which rapidly loose respiratory congestion and coughs.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold font-mono">
                  <span className="text-emerald-900">Alkaloids (Solasodine)</span>
                  <span className="text-amber-600">Warning (Mũtongu)</span>
                </div>
                <p className="text-[10px] text-stone-400 font-normal leading-relaxed">High toxic potential if swallowed. Solasodine provides local nerve-numbing parameters for teeth, but degrades stomach walls.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold font-mono">
                  <span className="text-emerald-900">Phytosterols & Tannins</span>
                  <span className="text-emerald-600 font-semibold">Healing (Mũcorai)</span>
                </div>
                <p className="text-[10px] text-stone-400 font-normal leading-relaxed">Anti-inflammatory compounds which bind specifically to hyperplastic prostate receptors, reducing nighttime urines.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
