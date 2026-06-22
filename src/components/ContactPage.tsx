import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ShieldCheck, TreePine, AlertCircle } from "lucide-react";
import { postMessage } from "../utils/api";
import { useLanguage } from "../utils/LanguageContext";

const SUBJECT_OPTIONS = [
  { value: "General Inquiry", labelKey: "contact.subject.general" },
  { value: "Medicinal Plants Information", labelKey: "contact.subject.plants" },
  { value: "Traditional Remedies", labelKey: "contact.subject.remedies" },
  { value: "Research & Collaboration", labelKey: "contact.subject.research" },
  { value: "Conservation & Sustainability", labelKey: "contact.subject.conservation" },
  { value: "Community Outreach", labelKey: "contact.subject.outreach" },
  { value: "Technical Support", labelKey: "contact.subject.support" },
  { value: "Advisory Request", labelKey: "contact.subject.advisory" },
  { value: "Other", labelKey: "contact.subject.other" }
];

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitError("");
    try {
      // Save directly to the backend database which automatically handles Web3Forms dispatch securely in the background!
      await postMessage({
        name,
        email,
        subject: subject || "Advisory Inquiry",
        message
      });

      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterSubscribed(false);
    }, 3500);
  };

  const contactTextMap: Record<string, Record<string, string>> = {
    channels: {
      en: "Direct Advisory Channels",
      sw: "Vituo vya Ushauri vya Moja kwa Moja",
      ki: "Njĩra cia Kwarĩria o Rĩmwe",
      fr: "Canaux d'Information Directs"
    },
    channelsDesc: {
      en: "Reach out directly for clinical inquiries, seed propagation consults, and safety compliance reports.",
      sw: "Wasiliana nasi moja kwa moja kwa maswali ya matibabu, ushauri wa mbegu, na ripoti za usalama.",
      ki: "Mwanya wa kwarĩria nĩguo tũcũranĩrie mĩhaka thũthũria ya mĩthĩga na rũrĩrĩ.",
      fr: "Contactez-nous directement pour les études cliniques, la propagation de semences et la sécurité."
    },
    hotline: {
      en: "Telephone Hotline",
      sw: "Nambari ya Simu",
      ki: "Namba ya Simu",
      fr: "Ligne Téléphonique"
    },
    correspondence: {
      en: "Correspondence Email",
      sw: "Barua Pepe ya Mawasiliano",
      ki: "Mbarũthi ya Gũcokanĩria",
      fr: "Courriel Électronique"
    },
    successDesc: {
      en: "Our herbal preservationists will analyze and email you back soon.",
      sw: "Wataalamu wetu wa mitishamba watachambua na kukujibu hivi karibuni kupitia barua pepe.",
      ki: "Andũ a rũũgĩ rwa mĩthĩga nĩmagũkũonera riũ thĩnĩ wa barua pepe yaku.",
      fr: "Nos spécialistes analyseront votre demande et vous répondront très bientôt."
    },
    sendInquiry: {
      en: "Get In Touch",
      sw: "Wasiliana Nasi",
      ki: "Kwarĩria Na Ithuĩ",
      fr: "Contactez-nous"
    },
    placeholderName: {
      en: "e.g. Jane Doe",
      sw: "Mfano: Jane Doe",
      ki: "ta: Jane Doe",
      fr: "ex. Jane Doe"
    },
    placeholderEmail: {
      en: "e.g. user@domain.com",
      sw: "Mfano: user@domain.com",
      ki: "ta: user@domain.com",
      fr: "ex. mickael@domain.com"
    },
    placeholderMessage: {
      en: "Write your message here...",
      sw: "Andika ujumbe wako hapa...",
      ki: "Andĩka ũhoro waku haha...",
      fr: "Écrivez votre message ici..."
    },
    selectSubjectOption: {
      en: "Select a subject...",
      sw: "Chagua mada...",
      ki: "Thuura ũhoro...",
      fr: "Sélectionnez un sujet..."
    }
  };

  const getL = (key: string) => {
    const matchedLang = language || "en";
    return contactTextMap[key]?.[matchedLang as string] || contactTextMap[key]?.['en'] || key;
  };

  return (
    <div id="contact-viewport" className="space-y-8 font-sans max-w-7xl mx-auto px-4">
      
      {/* Title Header Banner Deck */}
      <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-250/80 flex flex-col items-center justify-center text-center gap-4">
        <div className="max-w-2xl space-y-3 flex flex-col items-center text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            {t("nav.contact")}
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-sans text-center">
            {t("contact.title") || "Contact Us"}
          </h1>
          <p className="text-sm text-stone-500 leading-relaxed font-normal text-center">
            {t("contact.subtitle") || "Have questions about plant safety, sustainability regulations, or native seeds? Write or visit us at our highlands model gardens."}
          </p>
        </div>
      </div>

      {/* 2 Centered Contact Channels row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        
        {/* Hotline Card */}
        <div className="bg-gradient-to-br from-emerald-950 to-green-950 text-white p-6 rounded-3xl shadow-md border border-emerald-800/40 flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-emerald-900/40 rounded-full border border-emerald-800">
            <Phone className="w-5 h-5 text-[#D4A017] animate-pulse" />
          </div>
          <div className="space-y-1">
            <p className="font-extrabold text-stone-300 uppercase text-[9px] tracking-widest">
              {getL("hotline")}
            </p>
            <p className="font-black text-white text-sm md:text-base tracking-wide">+254 141 063 174</p>
          </div>
        </div>

        {/* Correspondence Card */}
        <div className="bg-gradient-to-br from-emerald-950 to-green-950 text-white p-6 rounded-3xl shadow-md border border-emerald-800/40 flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-emerald-900/40 rounded-full border border-emerald-800">
            <Mail className="w-5 h-5 text-[#D4A017]" />
          </div>
          <div className="space-y-1">
            <p className="font-extrabold text-stone-300 uppercase text-[9px] tracking-widest">
              {getL("correspondence")}
            </p>
            <p className="font-black text-white text-sm md:text-base tracking-wide">info@dawakienyeji.com</p>
          </div>
        </div>

      </div>

      {/* Centralized Interactive Message form */}
      <div className="max-w-3xl mx-auto w-full bg-white border border-stone-250 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-emerald-950 uppercase border-b border-stone-100 pb-3 flex items-center justify-center gap-1.5 font-sans text-center">
          <MessageSquare className="w-5 h-5 text-emerald-700" />
          {getL("sendInquiry")}
        </h2>

          {submitted ? (
            <div className="py-12 text-center text-xs font-semibold text-emerald-800 space-y-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div>
                <p className="text-sm font-bold">{t("contact.success") || "Inquiry Sent Successfully!"}</p>
                <p className="text-[10px] text-stone-500 mt-1">
                  {getL("successDesc")}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-semibold text-stone-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-bold text-stone-900 uppercase text-left">
                    {t("contact.name") || "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={getL("placeholderName")}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700/60"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 font-bold text-stone-900 uppercase text-left">
                    {t("contact.email") || "Email *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={getL("placeholderEmail")}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700/60"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-bold text-stone-900 uppercase text-left">
                  {t("contact.subject") || "Subject *"}
                </label>
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700/60"
                >
                  <option value="" disabled className="text-stone-400">
                    {getL("selectSubjectOption")}
                  </option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(opt.labelKey) || opt.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1.5 font-bold text-stone-900 uppercase text-left">
                  {t("contact.messageHint") || "Message *"}
                </label>
                <textarea
                  required
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={getL("placeholderMessage")}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900 font-medium leading-relaxed text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700/60"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-3 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow transition cursor-pointer ${
                  isSending ? 'bg-stone-400 cursor-not-allowed' : 'bg-emerald-950 hover:bg-emerald-800'
                }`}
              >
                <Send className="w-3.5 h-3.5 text-emerald-300" />
                {isSending ? t("btn.loading") : t("btn.submit")}
              </button>
            </form>
          )}

          {/* Interactive newsletter block */}
          <div className="mt-8 pt-8 border-t border-stone-100 bg-stone-50 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs uppercase font-extrabold text-emerald-950 tracking-wider flex items-center gap-1.5 font-sans">
              <TreePine className="w-4 h-4 text-emerald-700" />
              {t("newsletter.title") || "Subscribe to bulletins"}
            </h3>
            <p className="text-[11px] text-stone-505 leading-relaxed font-normal">
              {t("newsletter.subtitle") || "Get sustainable harvesting updates."}
            </p>

            {newsletterSubscribed ? (
              <p className="text-xs font-bold text-green-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {t("newsletter.success") || "Subscribed successfully!"}
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t("newsletter.placeholder") || "Enter your email address..."}
                  className="flex-1 p-2.5 border border-stone-300 rounded-lg text-xs bg-white text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <button
                  type="submit"
                  className="px-4 bg-emerald-950 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 cursor-pointer"
                >
                  {t("newsletter.button") || "Join List"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    );
  }
