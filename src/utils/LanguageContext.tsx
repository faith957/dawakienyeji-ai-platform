import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Language, 
  UI_TRANSLATIONS, 
  translateHerb as rawTranslateHerb, 
  translateRemedy as rawTranslateRemedy,
  translateBlog as rawTranslateBlog,
  translateArticle as rawTranslateArticle
} from "./translations";
import { Herb, BlogPost, TraditionalRemedy, KnowledgeBaseArticle } from "../types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateHerb: (herb: Herb) => Herb;
  translateRemedy: (remedy: TraditionalRemedy) => TraditionalRemedy;
  translateBlog: (blog: BlogPost) => BlogPost;
  translateArticle: (article: KnowledgeBaseArticle) => KnowledgeBaseArticle;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("dawa_selected_language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("dawa_selected_language", lang);
    
    // Dispatch custom event to notify other modules if necessary (e.g. vanilla JS listeners or standalone panels)
    window.dispatchEvent(new CustomEvent("dawa_language_changed", { detail: lang }));
  };

  // Helper translation function
  const t = (key: string): string => {
    const translation = UI_TRANSLATIONS[key];
    if (!translation) {
      // In case key doesn't exist, return it or attempt to format beautifully
      return key.split(".").pop() || key;
    }
    return translation[language] || translation["en"];
  };

  // Curried specialized database transformers
  const translateHerb = (herb: Herb) => rawTranslateHerb(herb, language);
  const translateRemedy = (remedy: TraditionalRemedy) => rawTranslateRemedy(remedy, language);
  const translateBlog = (blog: BlogPost) => rawTranslateBlog(blog, language);
  const translateArticle = (article: KnowledgeBaseArticle) => rawTranslateArticle(article, language);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      translateHerb, 
      translateRemedy, 
      translateBlog, 
      translateArticle 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
