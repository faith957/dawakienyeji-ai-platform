import React from "react";
import { Scale, Mail, Globe, ArrowLeft, Calendar, FileText } from "lucide-react";

interface TermsOfUsePageProps {
  onBackToHome: () => void;
}

export default function TermsOfUsePage({ onBackToHome }: TermsOfUsePageProps) {
  return (
    <div id="terms-of-use-viewport" className="space-y-8 font-sans max-w-4xl mx-auto px-4 py-8 text-stone-800">
      {/* Dynamic Header Path Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-widest hover:text-emerald-700 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-[11px] font-extrabold uppercase text-stone-400 tracking-wider flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-[#D4A017]" /> Legal Agreement
        </span>
      </div>

      <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-10 text-left">
        {/* Document Title Header */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tight uppercase">
            Terms of Use
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-400">
            <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
              DawaKienyeji.com
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Last Updated: 22/06/2026
            </span>
          </div>
        </div>

        {/* 1. Acceptance of Terms */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            1. Acceptance of Terms
          </h2>
          <div className="text-sm text-stone-600 leading-relaxed space-y-3 font-normal">
            <p>
              By accessing or using DawaKienyeji.com, you agree to comply with and be bound by these
              Terms of Use.
            </p>
            <p className="font-semibold text-stone-700">
              If you do not agree with these terms, please do not use the website.
            </p>
          </div>
        </section>

        {/* 2. Purpose of the Platform */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            2. Purpose of the Platform
          </h2>
          <p className="text-sm text-stone-600">
            DawaKienyeji.com is an educational and informational platform dedicated to:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Traditional medicinal plant knowledge</li>
            <li>Ethnobotanical research</li>
            <li>Indigenous knowledge preservation</li>
            <li>Traditional remedies documentation</li>
            <li>Conservation and sustainability education</li>
          </ul>
          <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 p-3 rounded-xl font-bold mt-2">
            The platform is not intended to provide professional medical diagnosis or treatment.
          </p>
        </section>

        {/* 3. Medical Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            3. Medical Disclaimer
          </h2>
          <p className="text-sm text-stone-600">
            Information provided through:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>DawaBot</li>
            <li>Medicinal plant records</li>
            <li>Traditional remedies</li>
            <li>Articles</li>
            <li>Blogs</li>
            <li>Research archives</li>
          </ul>
          <p className="text-sm text-stone-600 font-bold">
            is for educational and informational purposes only.
          </p>
          <p className="text-sm text-stone-600">
            The information does not constitute:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Medical advice</li>
            <li>Medical diagnosis</li>
            <li>Medical treatment</li>
            <li>Professional healthcare services</li>
          </ul>
          <p className="text-sm text-stone-700 font-extrabold pt-2">
            Always consult qualified healthcare professionals before using any medicinal preparation or
            treatment.
          </p>
        </section>

        {/* 4. User Responsibilities */}
        <section className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            4. User Responsibilities
          </h2>
          
          <div className="space-y-2">
            <p className="text-sm text-stone-600 font-bold">Users agree to:</p>
            <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
              <li>Use the platform lawfully</li>
              <li>Provide accurate information when submitting forms</li>
              <li>Respect intellectual property rights</li>
              <li>Avoid misuse of the platform</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-sm text-stone-600 font-bold">Users shall not:</p>
            <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
              <li>Upload harmful content</li>
              <li>Attempt unauthorized access</li>
              <li>Disrupt website operations</li>
              <li>Distribute malware</li>
              <li>Use the platform for illegal activities</li>
            </ul>
          </div>
        </section>

        {/* 5. DawaBot Usage */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            5. DawaBot Usage
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            DawaBot is an AI-powered assistant that retrieves and summarizes information from
            approved knowledge sources.
          </p>
          <p className="text-sm text-stone-650 font-bold">
            Users acknowledge that:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>AI responses may occasionally contain inaccuracies.</li>
            <li>Responses should be independently evaluated.</li>
            <li>DawaBot should not be relied upon for emergency medical decisions.</li>
          </ul>
        </section>

        {/* 6. Emergency Situations */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            6. Emergency Situations
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-semibold">
            DawaKienyeji.com and DawaBot are not emergency services.
          </p>
          <p className="text-sm text-stone-600">
            If you are experiencing:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Severe illness</li>
            <li>Difficulty breathing</li>
            <li>Severe bleeding</li>
            <li>Poisoning</li>
            <li>Chest pain</li>
            <li>Loss of consciousness</li>
          </ul>
          <p className="text-sm text-stone-700 font-extrabold pt-2">
            Seek immediate medical assistance from qualified healthcare providers or emergency
            services.
          </p>
        </section>

        {/* 7. Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            7. Intellectual Property
          </h2>
          <p className="text-sm text-stone-600">
            All content on DawaKienyeji.com, including:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Text</li>
            <li>Graphics</li>
            <li>Logos</li>
            <li>Databases</li>
            <li>Research materials</li>
            <li>Software components</li>
          </ul>
          <p className="text-sm text-stone-600 leading-relaxed font-bold pt-1">
            is protected by applicable intellectual property laws.
          </p>
          <p className="text-sm text-stone-600">
            Unauthorized reproduction or distribution is prohibited without permission.
          </p>
        </section>

        {/* 8. User Contributions */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            8. User Contributions
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            Users who submit comments, feedback, suggestions, or content grant DawaKienyeji.com
            the right to use, display, and manage such content for platform purposes.
          </p>
          <p className="text-sm text-stone-600 font-semibold">
            The platform reserves the right to remove inappropriate content.
          </p>
        </section>

        {/* 9. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            9. Limitation of Liability
          </h2>
          <p className="text-sm text-stone-600 font-semibold">
            DawaKienyeji.com shall not be liable for:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Direct damages</li>
            <li>Indirect damages</li>
            <li>Loss of data</li>
            <li>Loss of profits</li>
            <li>Health outcomes resulting from use of information provided on the platform</li>
          </ul>
          <p className="text-sm text-stone-700 font-extrabold pt-2">
            Use of the platform is at the user's own risk.
          </p>
        </section>

        {/* 10. Availability of Services */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            10. Availability of Services
          </h2>
          <p className="text-sm text-stone-600">
            We may:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Modify features</li>
            <li>Suspend services</li>
            <li>Update content</li>
            <li>Perform maintenance</li>
          </ul>
          <p className="text-sm text-stone-600 font-semibold pt-1">
            without prior notice.
          </p>
        </section>

        {/* 11. External Links */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            11. External Links
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            The platform may contain links to third-party websites.
          </p>
          <p className="text-sm text-stone-600 font-semibold">
            We are not responsible for the content, policies, or practices of external websites.
          </p>
        </section>

        {/* 12. Changes to Terms */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            12. Changes to Terms
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            We reserve the right to modify these Terms of Use at any time.
          </p>
          <p className="text-sm text-stone-600 font-semibold">
            Updated versions will be posted on the website.
          </p>
          <p className="text-xs text-stone-500 italic font-semibold">
            Continued use of the platform constitutes acceptance of revised terms.
          </p>
        </section>

        {/* 13. Governing Law */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            13. Governing Law
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-medium">
            These Terms of Use shall be governed by and interpreted in accordance with the applicable
            laws of the jurisdiction in which DawaKienyeji.com operates.
          </p>
        </section>

        {/* 14. Contact Information */}
        <section className="space-y-4 bg-stone-50 border border-stone-200 rounded-2xl p-5 md:p-6">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-emerald-800 pl-3 py-0.5 uppercase tracking-wide">
            14. Contact Information
          </h2>
          <p className="text-sm text-stone-600 font-medium">
            For questions regarding these Terms of Use, please contact:
          </p>
          <div className="space-y-2.5 text-sm text-stone-700 font-semibold">
            <p className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-800" />
              <span>DawaKienyeji.com</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-800" />
              <a href="mailto:info@dawakienyeji.com" className="hover:underline text-emerald-950">info@dawakienyeji.com</a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-800 text-xs font-black">🌐</span>
              <a href="https://dawakienyeji.com" target="_blank" rel="noreferrer" className="hover:underline text-emerald-950">https://dawakienyeji.com</a>
            </p>
          </div>
        </section>
      </div>

      {/* Footer Back Button action block */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2.5 px-6 py-3 bg-emerald-950 hover:bg-emerald-900 text-white font-extrabold rounded-2xl text-xs tracking-widest uppercase transition-all hover:scale-[1.01] active:scale-[0.99] duration-150 shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
}
