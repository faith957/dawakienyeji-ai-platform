import React, { useState, useRef, useCallback } from "react";
import { 
  Camera, Upload, Image as ImageIcon, Sparkles, AlertTriangle, 
  CheckCircle2, RefreshCw, X, ShieldAlert, ArrowRight, BookOpen, 
  HelpCircle, Eye, Info, Layers, Check, ExternalLink, Leaf
} from "lucide-react";
import { PlantIdentificationResponse, PossiblePlantMatch, Herb } from "../types";
import { identifyPlant } from "../utils/api";
import { useLanguage } from "../utils/LanguageContext";

interface PlantIdentifierProps {
  onOpenPlantProfile: (herbId: string) => void;
  onClose?: () => void;
}

export default function PlantIdentifier({ onOpenPlantProfile, onClose }: PlantIdentifierProps) {
  const { t, language } = useLanguage();

  // State management
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>("image/jpeg");
  const [imageFileName, setImageFileName] = useState<string>("");
  const [imageSizeKb, setImageSizeKb] = useState<number>(0);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>("Ready for image");
  const [result, setResult] = useState<PlantIdentificationResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // File input refs for desktop upload vs mobile direct camera
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Helper to validate and process file
  const processFile = useCallback((file: File) => {
    setErrorMessage(null);
    setResult(null);

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMessage("Unsupported file format. Please upload a standard photograph in JPG, PNG, or WebP format.");
      return;
    }

    // 10 MB maximum limit
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMessage("The selected file is larger than 10MB. Please select a smaller photo or compress it before uploading.");
      return;
    }

    setImageFileName(file.name);
    setImageSizeKb(Math.round(file.size / 1024));
    setSelectedMimeType(file.type || "image/jpeg");

    // Downscale client-side if image is larger than 2000px on either side to optimize upload speed and fidelity
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const maxDim = 1920;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedDataUrl = canvas.toDataURL(file.type || "image/jpeg", 0.88);
            setSelectedImage(optimizedDataUrl);
            return;
          }
        }
        setSelectedImage(rawDataUrl);
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => {
      setErrorMessage("Could not read the selected image file. Please try another file.");
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Perform Identification
  const handleIdentify = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setErrorMessage(null);
    setResult(null);

    setAnalysisStep("Extracting botanical morphological features (leaves, bark, venation)...");

    // Dynamic feedback messages for user experience
    const timer1 = setTimeout(() => {
      setAnalysisStep("Matching against East African indigenous flora and botanical archives...");
    }, 1500);

    const timer2 = setTimeout(() => {
      setAnalysisStep("Cross-referencing safety profiles and cataloged specimens...");
    }, 3200);

    try {
      const response = await identifyPlant(selectedImage, selectedMimeType);
      clearTimeout(timer1);
      clearTimeout(timer2);
      setResult(response);
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setErrorMessage(err.message || "Identification service encountered an error. Please try again.");
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep("Ready");
    }
  };

  // Reset/Clear
  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setErrorMessage(null);
    setImageFileName("");
    setImageSizeKb(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-left">
      
      {/* Title & Introductory Card */}
      <div className="bg-white border border-stone-250 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-800 via-amber-500 to-emerald-900" />
        
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200/80 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Botanical Vision Assistant • Phase 1
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
              Photo-Based Plant Identification
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Capture or upload a photograph of an East African tree, shrub, or wild plant. Our multimodal vision assistant examines morphological characteristics (leaf shape, venation, flowers, bark) to propose candidate botanical matches, cross-referenced with Dawakienyeji's indigenous directory.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition cursor-pointer"
              aria-label="Close plant identification tool"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Mandatory Safety Notice Banner */}
        <div className="mt-5 p-4 bg-amber-50/80 border border-amber-200/90 rounded-2xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase text-amber-900 tracking-wider">
              Crucial Safety & Identification Advisory
            </h3>
            <p className="text-[11.5px] text-amber-950 leading-relaxed font-medium">
              Automated computer vision is a preliminary educational aid, not a certified taxonomic or clinical determination. <strong>Never ingest, prepare, or medicinally handle any wild plant based solely on a photograph.</strong> Visually similar species can have radically different toxicity, allergens, or medicinal properties.
            </p>
          </div>
        </div>
      </div>

      {/* Main Upload / Capture & Preview Interface */}
      <div className="bg-white border border-stone-250 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        
        {/* Hidden native file inputs */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/png,image/webp,image/jpg" 
          className="hidden" 
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              processFile(e.target.files[0]);
            }
          }}
        />
        <input 
          ref={cameraInputRef}
          type="file" 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              processFile(e.target.files[0]);
            }
          }}
        />

        {/* State A: No image selected yet */}
        {!selectedImage && (
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-200 flex flex-col items-center justify-center gap-4 ${
              isDragOver 
                ? 'border-emerald-700 bg-emerald-50/60 scale-[1.01]' 
                : 'border-stone-300 bg-stone-50/50 hover:bg-stone-50 hover:border-emerald-600/50'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100/80 text-emerald-800 flex items-center justify-center shadow-inner">
              <Camera className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <h3 className="text-base font-extrabold text-stone-900">
                Take a photograph or select an existing image
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Drag and drop your file here, or choose an option below. For best accuracy, capture clear leaves, flowers, fruit, or bark in daylight.
              </p>
            </div>

            {/* Action buttons: Mobile Camera vs File Browser */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="py-3 px-5 bg-emerald-850 hover:bg-emerald-950 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02]"
              >
                <Camera className="w-4 h-4 text-amber-300" />
                Take Photo with Camera
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <Upload className="w-4 h-4 text-emerald-800" />
                Browse Photo Library
              </button>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-stone-400 font-mono pt-3 border-t border-stone-200/60 w-full max-w-sm justify-center">
              <span>JPG, PNG, WebP</span>
              <span>•</span>
              <span>Max 10 MB</span>
              <span>•</span>
              <span>Processed In-Memory</span>
            </div>
          </div>
        )}

        {/* State B: Image selected & previewed */}
        {selectedImage && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Image Preview Box */}
              <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-950 max-h-[380px] flex items-center justify-center">
                <img 
                  src={selectedImage} 
                  alt="Captured plant specimen" 
                  className="w-full h-full object-contain max-h-[360px]"
                />

                {/* Overlaid status badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-mono font-bold text-white border border-white/10 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Preview ({imageSizeKb} KB)</span>
                </div>
              </div>

              {/* Action Controls & Diagnostic Checklist */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-850">
                    Specimen Ready for Analysis
                  </span>
                  <h3 className="text-lg font-black text-stone-900 truncate">
                    {imageFileName || "Selected Plant Photograph"}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Check that the photograph clearly depicts key botanical diagnostic features before submitting. If the image is blurry, shadowed, or cropped, you can retake or replace it now.
                  </p>
                </div>

                {/* Diagnostic Quality Checklist */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2 text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">
                    Diagnostic Quality Checklist:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                    <span className="flex items-center gap-1.5">🌿 Leaf shape & margins visible</span>
                    <span className="flex items-center gap-1.5">🔍 Sharp focus in daylight</span>
                    <span className="flex items-center gap-1.5">🌸 Flowers/fruit visible (if present)</span>
                    <span className="flex items-center gap-1.5">🌳 Bark/stem pattern included</span>
                  </div>
                </div>

                {/* Action Buttons: Submit / Replace / Retake */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    disabled={isAnalyzing}
                    onClick={handleIdentify}
                    className="py-3 px-6 bg-emerald-850 hover:bg-emerald-950 active:bg-emerald-900 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Analyzing Specimen...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Submit for Botanical Identification</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isAnalyzing}
                    onClick={() => cameraInputRef.current?.click()}
                    className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Camera className="w-4 h-4 text-stone-600" />
                    <span>Retake</span>
                  </button>

                  <button
                    type="button"
                    disabled={isAnalyzing}
                    onClick={() => fileInputRef.current?.click()}
                    className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4 text-stone-600" />
                    <span>Replace Image</span>
                  </button>

                  <button
                    type="button"
                    disabled={isAnalyzing}
                    onClick={handleReset}
                    className="py-3 px-4 text-stone-500 hover:text-red-700 rounded-2xl text-xs font-semibold transition cursor-pointer"
                  >
                    Clear
                  </button>
                </div>

                {/* Active Analysis Progress Banner */}
                {isAnalyzing && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-pulse">
                    <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
                      <span>{analysisStep}</span>
                    </div>
                    <div className="w-full bg-emerald-200/60 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-700 h-1.5 rounded-full w-2/3 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Feedback Display */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-left">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold uppercase text-red-900">
                Identification Error
              </h4>
              <p className="text-xs text-red-800 font-medium leading-relaxed">
                {errorMessage}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleIdentify}
                  className="text-[11px] font-bold text-white bg-emerald-800 hover:bg-emerald-900 px-3 py-1 rounded-lg transition cursor-pointer"
                >
                  Retry Analysis
                </button>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-[11px] font-bold text-red-900 underline cursor-pointer"
                >
                  Dismiss message
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <p className="text-[10px] text-stone-400 font-medium text-center pt-2">
          🔒 Privacy Notice: Uploaded photographs are processed transiently in server memory for taxonomic identification. They are not permanently stored, shared with third parties, or published.
        </p>
      </div>

      {/* RESULTS DISPLAY SECTION */}
      {result && (
        <div className="space-y-6">
          
          {/* Case A: INCONCLUSIVE RESULT */}
          {result.isInconclusive ? (
            <div className="bg-white border-2 border-amber-300 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl shrink-0">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-full inline-block">
                    Inconclusive Specimen Evidence
                  </span>
                  <h3 className="text-xl font-black text-stone-900">
                    Sufficient Botanical Details Could Not Be Determined
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {result.inconclusiveReason || "The provided image does not exhibit adequate diagnostic botanical organs (such as leaf arrangement, margin serration, venation, floral structure, or bark) to reliably distinguish candidate species."}
                  </p>
                </div>
              </div>

              {/* Taxonomic Observations */}
              {result.generalObservations && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">
                    Taxonomic Observations:
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    {result.generalObservations}
                  </p>
                </div>
              )}

              {/* Tips for Taking Better Botanical Photos */}
              <div className="p-5 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl space-y-3">
                <h4 className="text-xs font-black uppercase text-emerald-900 tracking-wider flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  Tips for Better Botanical Identification
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0" />
                    <span><strong>Full Leaf Cluster:</strong> Show both the upper and lower leaf surfaces.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0" />
                    <span><strong>Branch Attachment:</strong> Capture how leaves attach to the stem (alternate, opposite).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0" />
                    <span><strong>Flowers & Fruit:</strong> If flowering or fruiting, include a close-up photo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0" />
                    <span><strong>Natural Light:</strong> Avoid strong shadows or blurry digital zoom.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex justify-start">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="py-2.5 px-5 bg-emerald-850 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Camera className="w-4 h-4 text-amber-300" />
                  Take Another Photo
                </button>
              </div>
            </div>
          ) : (
            /* Case B: PLAUSIBLE MATCHES FOUND */
            <div className="space-y-6">
              
              {/* Header Summary Card */}
              <div className="bg-white border border-stone-250 p-6 rounded-3xl shadow-sm space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-150 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-full inline-block">
                      {result.possibleMatches.length} Candidate Species Proposed
                    </span>
                    <h3 className="text-xl font-black text-emerald-950 mt-1">
                      Possible Botanical Matches
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold">
                    Engine: {result.modelUsed}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {result.generalObservations}
                </p>

                <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-950 font-medium flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{result.safetyNotice}</span>
                </div>
              </div>

              {/* Individual Match Cards */}
              <div className="space-y-5">
                {result.possibleMatches.map((match: PossiblePlantMatch, idx: number) => {
                  const isCataloged = match.inDirectory && match.matchingHerbId;
                  return (
                    <div 
                      key={idx}
                      className={`bg-white border rounded-3xl p-6 sm:p-7 shadow-sm transition-all duration-200 space-y-5 relative overflow-hidden ${
                        isCataloged 
                          ? 'border-emerald-700/50 hover:border-emerald-800 hover:shadow-md' 
                          : 'border-stone-250'
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-black px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg">
                            Candidate #{idx + 1}
                          </span>

                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                            match.confidenceLevel === 'High Plausibility'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : match.confidenceLevel === 'Moderate Plausibility'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-stone-100 text-stone-700 border-stone-300'
                          }`}>
                            {match.confidenceLevel}
                          </span>

                          {isCataloged ? (
                            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-emerald-900 text-emerald-100 rounded-full shadow-sm flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-amber-300" />
                              Cataloged in Dawakienyeji
                            </span>
                          ) : (
                            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-stone-100 text-stone-600 rounded-full border border-stone-250">
                              Not in Local Directory
                            </span>
                          )}
                        </div>

                        {match.botanicalFamily && (
                          <span className="text-[11px] font-mono font-bold text-stone-500">
                            Family: {match.botanicalFamily}
                          </span>
                        )}
                      </div>

                      {/* Species Scientific & Local Names */}
                      <div className="space-y-1">
                        <h4 className="text-xl sm:text-2xl font-black text-stone-900">
                          <span className="italic">{match.scientificName}</span>
                          {match.commonEnglishName && (
                            <span className="text-base sm:text-lg font-bold text-stone-600 not-italic ml-2">
                              ({match.commonEnglishName})
                            </span>
                          )}
                        </h4>

                        {/* Local Names Row */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                          {match.kikuyuName && (
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg font-bold">
                              Kikuyu: <strong className="uppercase">{match.kikuyuName}</strong>
                            </span>
                          )}
                          {match.swahiliName && (
                            <span className="px-2.5 py-1 bg-stone-100 text-stone-800 border border-stone-200 rounded-lg font-medium">
                              Swahili: <strong>{match.swahiliName}</strong>
                            </span>
                          )}
                          {match.luoName && (
                            <span className="px-2.5 py-1 bg-stone-100 text-stone-800 border border-stone-200 rounded-lg font-medium">
                              Luo: <strong>{match.luoName}</strong>
                            </span>
                          )}
                          {match.kambaName && (
                            <span className="px-2.5 py-1 bg-stone-100 text-stone-800 border border-stone-200 rounded-lg font-medium">
                              Kamba: <strong>{match.kambaName}</strong>
                            </span>
                          )}
                          {match.otherLocalNames && (
                            <span className="px-2.5 py-1 bg-stone-100 text-stone-700 border border-stone-200 rounded-lg font-medium">
                              Other: {match.otherLocalNames}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Distinguishing Characteristics */}
                      <div className="space-y-1.5 text-xs">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 block">
                          Distinguishing Characteristics
                        </span>
                        <p className="text-stone-700 leading-relaxed font-normal bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                          {match.distinguishingCharacteristics}
                        </p>
                      </div>

                      {/* Caution & Lookalike Notes */}
                      {match.cautionNotes && (
                        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-0.5">
                          <span className="text-[10px] font-black uppercase text-amber-900 block">
                            Botanical Caution & Toxicology Notice:
                          </span>
                          <p className="text-amber-950 font-medium leading-relaxed">
                            {match.cautionNotes}
                          </p>
                        </div>
                      )}

                      {/* Directory Profile Connection / No-Fabrication Notice */}
                      <div className="pt-2 border-t border-stone-150 flex items-center justify-between flex-wrap gap-3">
                        {isCataloged ? (
                          <div className="flex items-center justify-between w-full flex-wrap gap-2">
                            <div className="text-xs text-emerald-950 font-medium">
                              ✓ Verified species documented in Dawakienyeji with authentic traditional uses & preparation records.
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (match.matchingHerbId) {
                                  onOpenPlantProfile(match.matchingHerbId);
                                }
                              }}
                              className="py-2.5 px-5 bg-emerald-850 hover:bg-emerald-950 active:bg-emerald-900 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                              <span>Open Documented Profile</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl w-full text-xs text-stone-600 flex items-start gap-2.5">
                            <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                            <div>
                              <strong>Not Yet Cataloged in Directory:</strong> This plant species is not currently represented in Dawakienyeji's verified local records. To preserve botanical integrity, we do not fabricate medicinal claims or preparations for uncataloged species.
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Disclaimer Footer */}
              <div className="p-4 bg-stone-100 border border-stone-250 rounded-2xl text-[11px] text-stone-600 leading-relaxed font-medium">
                <strong>Disclaimer:</strong> {result.disclaimer}
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
