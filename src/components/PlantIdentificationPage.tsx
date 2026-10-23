import React, { useState } from "react";
import { 
  Camera, Leaf, ShieldAlert, ArrowLeft, BookOpen, AlertTriangle, 
  Sparkles, Info, CheckCircle2, ChevronRight
} from "lucide-react";
import PlantIdentifier from "./PlantIdentifier";
import PlantProfileModal from "./PlantProfileModal";
import { Herb } from "../types";
import { useLanguage } from "../utils/LanguageContext";

interface PlantIdentificationPageProps {
  allPlants: Herb[];
  onNavigateTo: (route: string) => void;
}

export default function PlantIdentificationPage({ allPlants, onNavigateTo }: PlantIdentificationPageProps) {
  const { language } = useLanguage();
  const [selectedPlantForProfile, setSelectedPlantForProfile] = useState<Herb | null>(null);

  const handleOpenProfile = (herbId: string) => {
    const found = allPlants.find(p => p.id === herbId);
    if (found) {
      setSelectedPlantForProfile(found);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in font-sans">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500 flex-wrap">
        <button 
          onClick={() => onNavigateTo('home')}
          className="hover:text-emerald-800 transition cursor-pointer"
        >
          {language === 'sw' ? 'Nyumbani' : language === 'ki' ? 'Mũciĩ' : 'Home'}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button 
          onClick={() => onNavigateTo('plants')}
          className="hover:text-emerald-800 transition cursor-pointer"
        >
          {language === 'sw' ? 'Mimea ya Dawa' : language === 'ki' ? 'Mĩmera ya Dawa' : 'Herbal Plants'}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-emerald-950 font-bold">
          {language === 'sw' ? 'Utambuzi wa Picha' : language === 'ki' ? 'Kũmenya Mũmera' : 'Identify a Plant'}
        </span>
      </nav>

      {/* Dedicated Page Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 text-white p-6 sm:p-10 shadow-lg border border-emerald-850/40">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-[11px] font-black uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              {language === 'sw' ? 'Utambuzi wa Visual AI' : 'Botanical Vision Tool'}
            </span>
            <span className="text-stone-300 text-xs font-medium">
              Herbal Plants Submenu
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {language === 'sw' 
              ? 'Tambua Mmea kwa Picha' 
              : language === 'ki' 
                ? 'Kũmenya Mũmera na Mbica' 
                : 'Photo Plant Identification'}
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            {language === 'sw'
              ? 'Piga picha au pakia picha ya mmea wa kienyeji. Mfumo wetu wa akili bandia utachambua sifa zake za kibiolojia na kukuunganisha na rekodi za dawa na matumizi ya jadi zilizoidhinishwa.'
              : 'Capture or upload a plant photograph from your device. Our vision engine analyzes leaves, bark, flowers, and morphological traits to suggest probable species and connect them directly to documented East African ethnobotanical profiles.'}
          </p>

          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigateTo('plants')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 active:bg-white/15 text-stone-100 border border-white/20 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-300" />
              <span>{language === 'sw' ? 'Tazama Katalogi ya Mimea' : 'Browse Full Plant Directory'}</span>
            </button>
            <button
              onClick={() => onNavigateTo('chatbot')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>{language === 'sw' ? 'Uliza DawaBot' : 'Ask DawaBot AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Provisional Medical Warning Banner (Mandatory safety requirement) */}
      <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-2 text-left">
        <div className="flex items-center gap-2 text-amber-950 font-black text-xs sm:text-sm uppercase tracking-wide">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{language === 'sw' ? 'Tahadhari ya Usalama wa Matibabu (Muhimu)' : 'Important Safety & Medical Notice'}</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-normal">
          {language === 'sw'
            ? 'Utambuzi wa picha kwa kutumia AI ni wa makadirio tu na hauwezi kutegemewa peke yake kuamua kama mmea unafaa au ni salama kwa matumizi ya tiba. Spishi zinazofanana kwa macho zinaweza kuwa na sumu au athari hatari. Daima thibitisha na wataalamu wa mimea au wazee wa tiba asilia kabla ya kushughulikia au kutumia mmea wowote.'
            : 'AI identification from photographs is strictly provisional and must NOT be used alone to determine whether a plant is safe for medicinal use or human consumption. Visually similar plant species can have drastically different chemical compositions, contraindications, and lethal toxicities. Always verify identifications through trusted botanical literature, herbarium vouchers, and licensed healthcare or traditional practitioners.'}
        </p>
      </div>

      {/* Interactive Plant Identifier Component */}
      <div className="bg-white border border-stone-250 rounded-3xl p-4 sm:p-8 shadow-sm">
        <PlantIdentifier
          onOpenPlantProfile={handleOpenProfile}
          onClose={() => onNavigateTo('plants')}
        />
      </div>

      {/* Modal View for the Selected Herb Profile */}
      {selectedPlantForProfile && (
        <PlantProfileModal
          plant={selectedPlantForProfile}
          onClose={() => setSelectedPlantForProfile(null)}
          onOpenIdentifier={() => setSelectedPlantForProfile(null)}
        />
      )}

    </div>
  );
}
