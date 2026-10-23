import React, { useState } from "react";
import { 
  X, ShieldAlert, BookOpen, Coffee, Landmark, TreePine, 
  HeartPulse, MapPin, AlertTriangle, FileText, CheckCircle2, 
  ExternalLink, Layers, Sparkles, HelpCircle, Eye, Info
} from "lucide-react";
import { Herb } from "../types";
import { useLanguage } from "../utils/LanguageContext";
import { getPlantImage } from "../utils/herbImages";

interface PlantProfileModalProps {
  plant: Herb | null;
  onClose: () => void;
  onOpenIdentifier?: () => void;
}

export default function PlantProfileModal({ plant, onClose, onOpenIdentifier }: PlantProfileModalProps) {
  const { t, translateHerb, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'medicinal' | 'cultural' | 'conservation' | 'safety' | 'references'>('overview');

  if (!plant) return null;

  const p = translateHerb(plant);

  // Status badges configuration
  const getIdentificationBadge = () => {
    const status = plant.identificationStatus || (plant.imageUrl ? 'expert_confirmed' : 'unverified');
    if (status === 'expert_confirmed') {
      return {
        label: t("plant.statusExpert") || "Expert-Confirmed Specimen",
        color: "bg-emerald-900/90 text-emerald-100 border-emerald-700/60",
        icon: CheckCircle2
      };
    }
    if (status === 'community_verified') {
      return {
        label: t("plant.statusCommunity") || "Community Verified",
        color: "bg-teal-900/90 text-teal-100 border-teal-700/60",
        icon: CheckCircle2
      };
    }
    if (status === 'ai_suggested') {
      return {
        label: t("plant.statusAI") || "AI-Suggested Plausibility",
        color: "bg-amber-900/90 text-amber-100 border-amber-700/60",
        icon: Sparkles
      };
    }
    return {
      label: t("plant.statusUnverified") || "Unverified Specimen Record",
      color: "bg-stone-800 text-stone-200 border-stone-700",
      icon: HelpCircle
    };
  };

  const idBadge = getIdentificationBadge();
  const BadgeIcon = idBadge.icon;

  const getConservationColor = (status?: string) => {
    switch (status) {
      case 'Critically Endangered':
      case 'Endangered':
        return 'bg-red-100 text-red-900 border-red-300 font-black';
      case 'Vulnerable':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'Near Threatened':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300 font-bold';
      case 'Least Concern':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-300';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-stone-950/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto font-sans"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-4xl bg-[#FDFCF0] text-emerald-950 rounded-3xl shadow-2xl border border-stone-300/80 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Banner */}
        <div className="relative bg-stone-900 text-white shrink-0">
          <div className="h-44 sm:h-56 w-full relative overflow-hidden">
            <img 
              src={getPlantImage(plant)} 
              alt={p.kikuyuName} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F1A] via-stone-950/60 to-stone-950/20" />
            
            {/* Top Bar Floating Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border shadow-md backdrop-blur-sm ${idBadge.color}`}>
                  <BadgeIcon className="w-3.5 h-3.5" />
                  {idBadge.label}
                </span>

                {plant.severityRating && (
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border shadow-md ${
                    plant.severityRating === 'Safe' 
                      ? 'bg-emerald-950 text-emerald-200 border-emerald-600/50' 
                      : plant.severityRating === 'Caution' 
                        ? 'bg-amber-950 text-amber-200 border-amber-600/50' 
                        : 'bg-red-950 text-red-200 border-red-600/50'
                  }`}>
                    {plant.severityRating}
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                aria-label="Close plant profile"
                className="p-2 rounded-full bg-black/60 hover:bg-emerald-950 border border-white/20 text-stone-200 hover:text-white transition duration-150 cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Title in Banner */}
            <div className="absolute bottom-4 left-5 right-5 z-10 text-left">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase drop-shadow-md">
                  {p.kikuyuName}
                </h1>
                <span className="text-stone-300 text-sm sm:text-base font-semibold">
                  • {p.commonName || p.scientificName}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-amber-300 font-semibold italic mt-0.5">
                {plant.acceptedBotanicalName || plant.scientificName} {plant.botanicalFamily ? `(${plant.botanicalFamily})` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Strip */}
        <div className="bg-stone-100/90 border-b border-stone-250 px-4 flex items-center gap-1 overflow-x-auto shrink-0 py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'overview' 
                ? 'bg-[#1A2F1A] text-white shadow-sm' 
                : 'text-stone-600 hover:text-emerald-950 hover:bg-stone-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Overview & Names
          </button>

          <button
            onClick={() => setActiveTab('medicinal')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'medicinal' 
                ? 'bg-[#1A2F1A] text-white shadow-sm' 
                : 'text-stone-600 hover:text-emerald-950 hover:bg-stone-200/60'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            Traditional Medicine
          </button>

          <button
            onClick={() => setActiveTab('cultural')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cultural' 
                ? 'bg-[#1A2F1A] text-white shadow-sm' 
                : 'text-stone-600 hover:text-emerald-950 hover:bg-stone-200/60'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            Heritage & Lore
          </button>

          <button
            onClick={() => setActiveTab('conservation')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'conservation' 
                ? 'bg-[#1A2F1A] text-white shadow-sm' 
                : 'text-stone-600 hover:text-emerald-950 hover:bg-stone-200/60'
            }`}
          >
            <TreePine className="w-3.5 h-3.5" />
            Conservation
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'safety' 
                ? 'bg-amber-900 text-amber-50 shadow-sm' 
                : 'text-stone-600 hover:text-amber-900 hover:bg-stone-200/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            Safety & Warnings
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'references' 
                ? 'bg-[#1A2F1A] text-white shadow-sm' 
                : 'text-stone-600 hover:text-emerald-950 hover:bg-stone-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Citations & Photos
          </button>
        </div>

        {/* Tab Content Body Container */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-left">
          
          {/* TAB 1: OVERVIEW & MULTILINGUAL LOCAL NAMES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Multilingual Indigenous Names Card */}
              <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-150 pb-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-emerald-700" />
                    Indigenous & Regional Nomenclature
                  </h3>
                  <span className="text-[10px] text-stone-400 font-mono">Multilingual Index</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Scientific Binomial</span>
                    <p className="font-mono text-emerald-900 font-bold text-xs italic">{plant.scientificName}</p>
                    {plant.acceptedBotanicalName && plant.acceptedBotanicalName !== plant.scientificName && (
                      <span className="text-[9px] text-stone-400 block mt-0.5">Accepted: {plant.acceptedBotanicalName}</span>
                    )}
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">English Name</span>
                    <p className="text-stone-850 font-bold text-xs">{plant.englishName || plant.commonName || 'Undocumented'}</p>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Kiswahili</span>
                    <p className="text-stone-850 font-bold text-xs">{plant.swahiliName || 'Undocumented in current records'}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-200/70 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Gĩkũyũ (Kikuyu)</span>
                    <p className="text-emerald-950 font-black text-xs uppercase">{plant.kikuyuName}</p>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Dholuo (Luo)</span>
                    <p className="text-stone-850 font-bold text-xs">{plant.luoName || 'Undocumented in current records'}</p>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Kikamba (Kamba)</span>
                    <p className="text-stone-850 font-bold text-xs">{plant.kambaName || 'Undocumented in current records'}</p>
                  </div>
                </div>

                {/* Extensible Other Local Names (Maasai, Samburu, Meru, Kalenjin, etc.) */}
                {plant.otherLocalNames && plant.otherLocalNames.length > 0 && (
                  <div className="pt-2 border-t border-stone-150">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block mb-2">
                      Additional Local & Community Names:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {plant.otherLocalNames.map((rec, i) => (
                        <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-800 border border-stone-200 rounded-xl text-xs font-semibold">
                          <span className="text-[10px] font-extrabold text-emerald-850 uppercase">{rec.language}:</span>
                          <span className="font-bold">{rec.name}</span>
                          {rec.locality && (
                            <span className="text-[10px] text-stone-500 italic">({rec.locality})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Distinguishing Characteristics */}
              <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-700" />
                  Distinguishing Morphological Characteristics
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {plant.distinguishingCharacteristics || plant.description}
                </p>
              </div>

              {/* Habitat & Distribution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    Habitat & Elevation
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {plant.habitat || "Undocumented ecological elevation parameters."}
                  </p>
                </div>

                <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    Documented Distribution
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {plant.geographicalDistribution || "East African indigenous highlands."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRADITIONAL MEDICINE & PREPARATIONS */}
          {activeTab === 'medicinal' && (
            <div className="space-y-6">
              {/* Parts Traditionally Used */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">Parts Traditionally Utilized</span>
                  <p className="text-sm font-extrabold text-emerald-950 mt-0.5">{p.partUsed}</p>
                </div>
                <span className="text-xs font-bold bg-white text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm">
                  Category: {p.category}
                </span>
              </div>

              {/* Documented Medicinal Uses with Community Sources */}
              <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  Documented Medicinal Uses & Sources
                </h3>

                {plant.documentedUses && plant.documentedUses.length > 0 ? (
                  <div className="space-y-3">
                    {plant.documentedUses.map((docUse, idx) => (
                      <div key={idx} className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs sm:text-sm font-bold text-stone-900">{docUse.use}</p>
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            docUse.verifiedStatus === 'documented' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : docUse.verifiedStatus === 'oral_lore'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-stone-200 text-stone-700'
                          }`}>
                            {docUse.verifiedStatus === 'documented' ? 'Documented' : docUse.verifiedStatus === 'oral_lore' ? 'Oral Lore' : 'Unverified'}
                          </span>
                        </div>
                        {docUse.communityOrSource && (
                          <p className="text-[11px] text-stone-500 font-semibold italic">
                            Source / Community: {docUse.communityOrSource}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {p.medicinalUses.map((use, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-150">
                        <span className="w-5 h-5 bg-emerald-700 text-white rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Preparation Methods */}
              <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-emerald-700" />
                  Traditional Preparation Methods
                </h3>

                {plant.preparationMethods && plant.preparationMethods.length > 0 ? (
                  <ol className="space-y-2.5">
                    {plant.preparationMethods.map((step, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-stone-800 flex items-start gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                        <span className="font-mono text-xs font-black text-emerald-800 shrink-0 mt-0.5">
                          [{idx + 1}]
                        </span>
                        <span className="font-medium leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium bg-stone-50 p-4 rounded-xl border border-stone-200">
                    {p.preparation}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CULTURAL HERITAGE & ORAL LORE */}
          {activeTab === 'cultural' && (
            <div className="space-y-6">
              {/* Cultural Significance Card */}
              <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-700" />
                  Ethnobotanical History & Cultural Significance
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {plant.culturalSignificance || plant.traditionalContext || "Documented within ancestral African highland traditions."}
                </p>
              </div>

              {/* Oral History */}
              <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                  Recorded Oral Narratives
                </span>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed italic font-medium">
                  {plant.oralHistory ? `"${plant.oralHistory}"` : "Oral lore records currently pending contributor submission."}
                </p>
              </div>

              {/* Cultural Restrictions & Consent Status */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    Cultural Guidelines & Contributor Consent
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase bg-white text-stone-700 px-2.5 py-0.5 rounded border border-stone-300">
                    Consent: {plant.consentStatus || "public_domain"}
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {plant.culturalRestrictions || "Standard communal harvesting ethics apply. Always harvest with gratitude and minimum disruption to the parent organism."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: CONSERVATION STATUS & THREATS */}
          {activeTab === 'conservation' && (
            <div className="space-y-6">
              {/* Conservation Status Card */}
              <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-150 pb-3 flex-wrap gap-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-emerald-700" />
                    IUCN Conservation Assessment
                  </h3>
                  <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border shadow-sm ${getConservationColor(plant.conservationStatus)}`}>
                    Status: {plant.conservationStatus || 'Not Evaluated'}
                  </span>
                </div>

                {/* Threats List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block">
                    Documented Ecological Threats
                  </span>
                  {plant.threats && plant.threats.length > 0 ? (
                    <ul className="space-y-1.5">
                      {plant.threats.map((threat, idx) => (
                        <li key={idx} className="text-xs text-stone-800 flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0" />
                          <span>{threat}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 italic">No specific critical threats documented for this species.</p>
                  )}
                </div>

                {/* Conservation Practices */}
                <div className="pt-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">
                    Sustainable Harvesting & Conservation Practices
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                    {plant.conservationPractices || "Mandate vertical opposite-strip debarking so trees survive and wounds naturally heal. Avoid destructive clear-felling."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SAFETY, TOXICOLOGY & CONTRAINDICATIONS */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              {/* Primary Safety Warning Card */}
              <div className="p-5 bg-red-50 border-2 border-red-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-red-900">
                  <ShieldAlert className="w-5 h-5 text-red-700 shrink-0" />
                  <h3 className="text-xs font-black uppercase tracking-wider">
                    Critical Safety Assessment & Known Precautions
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-red-950 font-bold leading-relaxed">
                  {plant.safetyWarnings || p.precautions}
                </p>
              </div>

              {/* Contraindications */}
              <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Absolute & Relative Contraindications
                </h4>

                {plant.contraindications && plant.contraindications.length > 0 ? (
                  <ul className="space-y-2">
                    {plant.contraindications.map((ci, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-stone-800 flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-150">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                        <span className="font-medium">{ci}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-stone-500 italic">No formal clinical contraindications explicitly documented.</p>
                )}
              </div>

              {/* Known Risks */}
              {plant.knownRisks && plant.knownRisks.length > 0 && (
                <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-800">
                    Documented Toxicological Risks & Adverse Reactions
                  </h4>
                  <ul className="space-y-1.5">
                    {plant.knownRisks.map((risk, idx) => (
                      <li key={idx} className="text-xs text-stone-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-500 rounded-full mt-1.5 shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: CITATIONS, CITATIONS & PROVENANCE */}
          {activeTab === 'references' && (
            <div className="space-y-6">
              {/* Scientific Citations */}
              <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  Scientific & Pharmacological References
                </h3>

                {plant.scientificReferences && plant.scientificReferences.length > 0 ? (
                  <ul className="space-y-2 font-mono text-xs text-stone-700">
                    {plant.scientificReferences.map((ref, idx) => (
                      <li key={idx} className="bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed">
                        [{idx + 1}] {ref}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-stone-500 italic">No direct peer-reviewed journal citations indexed yet for this specimen.</p>
                )}
              </div>

              {/* Traditional Knowledge Sources */}
              {plant.traditionalKnowledgeSources && plant.traditionalKnowledgeSources.length > 0 && (
                <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                    Traditional Knowledge Repositories & Elders
                  </h4>
                  <ul className="space-y-1.5">
                    {plant.traditionalKnowledgeSources.map((tks, idx) => (
                      <li key={idx} className="text-xs text-stone-700 flex items-center gap-2 font-medium">
                        <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full shrink-0" />
                        <span>{tks}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* External Source URLs */}
              {plant.sourceUrls && plant.sourceUrls.length > 0 && (
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block">
                    Taxonomic Databases & Portals
                  </span>
                  <div className="space-y-1">
                    {plant.sourceUrls.map((url, idx) => (
                      <a 
                        key={idx} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-800 hover:text-emerald-950 font-mono flex items-center gap-1.5 hover:underline truncate"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span>{url}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Provenance & Licensing */}
              {plant.photographs && plant.photographs.length > 0 && (
                <div className="bg-white border border-stone-250 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-800">
                    Photograph Provenance & Licensing
                  </h4>
                  {plant.photographs.map((photo, idx) => (
                    <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                      <p className="font-bold text-stone-900">{photo.caption || "Botanical Specimen Image"}</p>
                      {photo.provenance && (
                        <p className="text-stone-600 text-[11px]">Provenance: <strong>{photo.provenance}</strong></p>
                      )}
                      {photo.photographer && (
                        <p className="text-stone-600 text-[11px]">Photographer / Survey: {photo.photographer}</p>
                      )}
                      {photo.license && (
                        <p className="text-stone-500 text-[10px] uppercase font-mono">License: {photo.license}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-stone-100 border-t border-stone-250 p-4 flex items-center justify-between flex-wrap gap-3 shrink-0">
          <p className="text-[11px] text-stone-500 font-medium">
            Cataloged under Dawakienyeji Heritage Database • Ethnobotanical Record #{plant.id}
          </p>

          <div className="flex items-center gap-2">
            {onOpenIdentifier && (
              <button
                onClick={() => {
                  onClose();
                  onOpenIdentifier();
                }}
                className="py-2 px-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Match from Photo
              </button>
            )}

            <button
              onClick={onClose}
              className="py-2 px-4 bg-white hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
