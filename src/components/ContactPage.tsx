import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Bookmark, ShieldCheck, TreePine, AlertCircle } from "lucide-react";
import { postMessage } from "../utils/api";

export default function ContactPage() {
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

  return (
    <div id="contact-viewport" className="space-y-8 font-sans max-w-7xl mx-auto px-4">
      
      {/* Title Header Banner Deck */}
      <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-250/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Get In Touch</span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-sans">Contact our Ethnobotanical Guardians</h1>
          <p className="text-sm text-stone-500 leading-relaxed font-normal">
            Have questions about plant safety, sustainability regulations, or native seeds? Write or visit us at our highlands model gardens.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Contact Info card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-green-950 to-emerald-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-8">
          
          <div className="space-y-6">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 px-2.5 py-1 bg-emerald-900 rounded border border-emerald-800">Highland Station</span>
            <h2 className="text-xl font-extrabold tracking-tight">Main Model Nursery Gardens</h2>
            <p className="text-xs text-emerald-100 leading-relaxed font-semibold">
              Visit our traditional medicinal plant botanical sanctuary along the slopes of the Aberdares, where we propagate endangered trees like Prunus africana (*Mũcorai*).
            </p>

            <div className="space-y-4 pt-4 text-xs font-semibold">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Nyeri model Nursery Garden</p>
                  <p className="font-normal opacity-80">Kabiru-ini highland slope path, Nyeri County, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Advisory line</p>
                  <p className="font-normal opacity-80">+254 711 00DAWA (003292)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">General Email</p>
                  <p className="font-normal opacity-80">info@mojatu.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-900 border border-emerald-800 rounded-2xl flex items-start gap-3 text-xs leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <p className="font-semibold text-emerald-100">
              Approved by the traditional forestry conservation committee of central Kenya.
            </p>
          </div>

        </div>

        {/* Right column: Interactive message form */}
        <div className="lg:col-span-7 bg-white border border-stone-250 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-emerald-950 uppercase border-b border-stone-100 pb-3 flex items-center gap-1.5 font-sans">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            Send secure consultative Inquiry
          </h2>

          {submitted ? (
            <div className="py-12 text-center text-xs font-semibold text-emerald-800 space-y-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 animate-pulse">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div>
                <p className="text-sm font-bold">Inquiry Sent Successfully!</p>
                <p className="text-[10px] text-stone-500 mt-1">Our herbal preservationists will analyze and email you back soon.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-semibold text-stone-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-stone-900 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kiprop Waithera"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-stone-900 uppercase">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. user@domain.com"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-bold text-stone-900 uppercase">Subject Topic</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Sustainability report for Pygeum or DawaBot queries"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-stone-900 uppercase">Explain details of your concern *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the tree species, ailments or seed propagation queries you require..."
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900 font-normal leading-relaxed text-xs"
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
                className={`w-full py-3 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow transition ${
                  isSending ? 'bg-stone-400 cursor-not-allowed' : 'bg-emerald-950 hover:bg-emerald-800'
                }`}
              >
                <Send className="w-3.5 h-3.5 text-emerald-300" />
                {isSending ? "Index-transmitting..." : "Submit Advisory Form"}
              </button>
            </form>
          )}

          {/* Interactive newsletter block */}
          <div className="mt-8 pt-8 border-t border-stone-100 bg-stone-50 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs uppercase font-extrabold text-emerald-950 tracking-wider flex items-center gap-1.5 font-sans">
              <TreePine className="w-4 h-4 text-emerald-700" />
              Subscribe to regional safety and species digests
            </h3>
            <p className="text-[11px] text-stone-500 leading-relaxed font-normal">
              Enter your email address to receive bi-monthly reports regarding traditional plant conservation laws, replanting drives, and safe traditional preparations.
            </p>

            {newsletterSubscribed ? (
              <p className="text-xs font-bold text-green-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Signed up! Thank you for supporting Gĩkũyũ botanical preservation.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 p-2.5 border border-stone-300 rounded-lg text-xs bg-white text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <button
                  type="submit"
                  className="px-4 bg-emerald-950 text-white rounded-lg font-bold text-xs hover:bg-emerald-800"
                >
                  Join List
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
