import React from "react";
import { Shield, Mail, Globe, ArrowLeft, Calendar, FileText } from "lucide-react";

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

export default function PrivacyPolicyPage({ onBackToHome }: PrivacyPolicyPageProps) {
  return (
    <div id="privacy-policy-viewport" className="space-y-8 font-sans max-w-4xl mx-auto px-4 py-8 text-stone-800">
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
          <Shield className="w-3.5 h-3.5 text-[#D4A017]" /> Security & Trust
        </span>
      </div>

      <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-10 text-left">
        {/* Document Title Header */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tight uppercase">
            Privacy Policy
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

        {/* 1. Introduction */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            1. Introduction
          </h2>
          <div className="text-sm text-stone-600 leading-relaxed space-y-3 font-normal">
            <p>
              Welcome to DawaKienyeji.com. We are committed to protecting your privacy and ensuring
              that your personal information is handled responsibly and securely.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, and protect information when you
              use our website, DawaBot AI Assistant, contact forms, blogs, and related services.
            </p>
            <p>
              By accessing or using DawaKienyeji.com, you agree to the practices described in this
              Privacy Policy.
            </p>
          </div>
        </section>

        {/* 2. Information We Collect */}
        <section className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            2. Information We Collect
          </h2>
          
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest text-emerald-850">
              Information You Provide
            </h3>
            <p className="text-sm text-stone-600">
              We may collect information that you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Contact Information</li>
              <li>Messages submitted through contact forms</li>
              <li>Blog comments and feedback</li>
              <li>Inquiries submitted to DawaBot</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest text-emerald-850">
              Automatically Collected Information
            </h3>
            <p className="text-sm text-stone-600">
              We may collect:
            </p>
            <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
              <li>Device information</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Language preferences</li>
              <li>Usage statistics</li>
              <li>Pages visited</li>
              <li>Session activity</li>
            </ul>
          </div>
        </section>

        {/* 3. How We Use Your Information */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            3. How We Use Your Information
          </h2>
          <p className="text-sm text-stone-600">
            We use information to:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Respond to inquiries</li>
            <li>Improve DawaBot responses</li>
            <li>Provide customer support</li>
            <li>Manage website functionality</li>
            <li>Improve platform performance</li>
            <li>Analyze usage trends</li>
            <li>Enhance user experience</li>
            <li>Prevent abuse and unauthorized access</li>
          </ul>
        </section>

        {/* 4. DawaBot and AI Services */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            4. DawaBot and AI Services
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            DawaBot uses artificial intelligence technologies to provide information about medicinal
            plants, traditional remedies, and ethnobotanical knowledge.
          </p>
          <p className="text-sm text-stone-600 font-semibold">
            While DawaBot is designed to provide accurate information from approved knowledge sources:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-650 space-y-1.5 font-medium">
            <li>Responses may not always be complete.</li>
            <li>Information should not replace professional medical advice.</li>
            <li>Users should consult qualified healthcare professionals for medical concerns.</li>
          </ul>
        </section>

        {/* 5. Cookies and Analytics */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            5. Cookies and Analytics
          </h2>
          <p className="text-sm text-stone-600">
            We may use cookies and similar technologies to:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Improve website performance</li>
            <li>Remember language preferences</li>
            <li>Analyze user behavior</li>
            <li>Enhance security</li>
          </ul>
          <p className="text-xs text-stone-500 italic pt-1 font-semibold">
            Users may disable cookies through their browser settings.
          </p>
        </section>

        {/* 6. Data Sharing */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            6. Data Sharing
          </h2>
          <p className="text-sm text-stone-600 font-bold">
            We do not sell personal information.
          </p>
          <p className="text-sm text-stone-600">
            We may share information only when:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Required by law</li>
            <li>Necessary to protect rights and security</li>
            <li>Working with trusted service providers who assist in operating the platform</li>
          </ul>
        </section>

        {/* 7. Data Security */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            7. Data Security
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            We implement reasonable security measures to protect information against:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium mb-2">
            <li>Unauthorized access</li>
            <li>Loss</li>
            <li>Misuse</li>
            <li>Alteration</li>
            <li>Disclosure</li>
          </ul>
          <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 p-3 rounded-xl font-semibold">
            However, no internet transmission or storage system can be guaranteed to be completely secure.
          </p>
        </section>

        {/* 8. Third-Party Services */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            8. Third-Party Services
          </h2>
          <p className="text-sm text-stone-600">
            The platform may use third-party services including:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>AI service providers</li>
            <li>Email delivery providers</li>
            <li>Analytics providers</li>
            <li>Hosting providers</li>
          </ul>
          <p className="text-xs text-stone-500 pt-1 font-semibold">
            These providers maintain their own privacy policies.
          </p>
        </section>

        {/* 9. Children's Privacy */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            9. Children's Privacy
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            DawaKienyeji.com is not intended for children under the age of 13 without parental or
            guardian supervision.
          </p>
          <p className="text-sm text-stone-600 font-semibold">
            We do not knowingly collect personal information from children.
          </p>
        </section>

        {/* 10. Your Rights */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            10. Your Rights
          </h2>
          <p className="text-sm text-stone-600">
            Depending on applicable laws, users may have the right to:
          </p>
          <ul className="list-disc pl-5 text-sm text-stone-600 space-y-1.5 font-medium">
            <li>Access their information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of information</li>
            <li>Withdraw consent where applicable</li>
          </ul>
          <p className="text-sm text-stone-600 leading-relaxed font-semibold">
            Requests may be submitted through the contact page.
          </p>
        </section>

        {/* 11. Changes to This Policy */}
        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-[#D4A017] pl-3 py-0.5 uppercase tracking-wide">
            11. Changes to This Policy
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            We may update this Privacy Policy from time to time.
          </p>
          <p className="text-sm text-stone-600 font-semibold">
            Updated versions will be posted on this page with a revised effective date.
          </p>
        </section>

        {/* 12. Contact Information */}
        <section className="space-y-4 bg-stone-50 border border-stone-200 rounded-2xl p-5 md:p-6">
          <h2 className="text-lg font-extrabold text-[#1A2F1A] border-l-4 border-emerald-800 pl-3 py-0.5 uppercase tracking-wide">
            12. Contact Information
          </h2>
          <p className="text-sm text-stone-600 font-medium">
            For privacy-related questions, please contact:
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
