import React, { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "../utils/LanguageContext";
import { LANGUAGES, Language } from "../utils/translations";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} id="language-switcher-container">
      <button
        type="button"
        id="language-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200/85 rounded-full shadow-sm hover:shadow-md transition active:scale-95 duration-150 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-800 animate-spin-slow" />
        <span className="mr-0.5">{activeLang.flag}</span>
        <span className="hidden sm:inline uppercase text-[10px] tracking-wider text-stone-600">{activeLang.code}</span>
        <span className="text-[8px] text-stone-400 font-sans transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          className="absolute right-0 mt-1.5 w-44 origin-top-right bg-white border border-stone-200/90 rounded-xl shadow-xl p-1.5 z-50 animate-fade-in focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider text-stone-400 select-none pb-2 border-b border-stone-100">
            Select Language
          </div>
          <div className="py-1 space-y-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  id={`lang-option-${lang.code}`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-[11px] rounded-lg transition duration-150 text-left ${
                    isSelected 
                      ? "bg-emerald-50 text-emerald-950 font-extrabold" 
                      : "text-stone-700 hover:bg-stone-50 active:bg-stone-100 cursor-pointer"
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-800" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
