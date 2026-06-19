import { Herb, BlogPost, TraditionalRemedy, KnowledgeBaseArticle } from "../types";

export type Language = "en" | "sw" | "ki" | "fr";

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    sw: string;
    ki: string;
    fr: string;
  };
}

export const LANGUAGES = [
  { code: "en" as Language, name: "English", flag: "🇬🇧" },
  { code: "sw" as Language, name: "Kiswahili", flag: "🇰🇪" },
  { code: "ki" as Language, name: "Gĩkũyũ", flag: "🪵" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" }
];

export const UI_TRANSLATIONS: TranslationDictionary = {
  // Navigation Menus
  "nav.heroTitle": {
    en: "Ancestral Gĩkũyũ Botanical Registry",
    sw: "Sajili ya Mimea ya Asili ya Gĩkũyũ",
    ki: "Rĩgĩrĩrĩ rĩa Mĩthĩga ya Gĩkũyũ",
    fr: "Registre Botanique Ancestral Gĩkũyũ"
  },
  "nav.home": {
    en: "Home",
    sw: "Mwanzo",
    ki: "Mbere",
    fr: "Accueil"
  },
  "nav.about": {
    en: "About",
    sw: "Kuhusu Sisi",
    ki: "Kĩbũrĩ gitũ",
    fr: "À Propos"
  },
  "nav.plants": {
    en: "Herbal Plants",
    sw: "Mimea ya Dawa",
    ki: "Mĩthĩga mĩndũ",
    fr: "Plantes Médicinales"
  },
  "nav.remedies": {
    en: "Traditional Remedies",
    sw: "Tiba za Asili",
    ki: "Thaũ cia Kĩbũrĩ",
    fr: "Remèdes Traditionnels"
  },
  "nav.knowledge": {
    en: "Knowledge Base",
    sw: "Hifadhi ya Maarifa",
    ki: "Ũgĩ wa Matũũra",
    fr: "Base de Connaissances"
  },
  "nav.blog": {
    en: "Blogs",
    sw: "Mablogu",
    ki: "Blogs",
    fr: "Blogs"
  },
  "nav.contact": {
    en: "Contact",
    sw: "Mawasiliano",
    ki: "Caria andũ",
    fr: "Contact"
  },
  "nav.askBot": {
    en: "Dawabot",
    sw: "Dawabot",
    ki: "Dawabot",
    fr: "Dawabot"
  },
  "nav.signUp": {
    en: "Sign Up",
    sw: "Jisajili",
    ki: "Wandĩkithie",
    fr: "S'inscrire"
  },
  "nav.admin": {
    en: "Admin Panel",
    sw: "Dawati la Utawala",
    ki: "Gĩkundi kĩa Admin",
    fr: "Panneau Admin"
  },
  "nav.quickLinks": {
    en: "Quick Links",
    sw: "Viungo vya Haraka",
    ki: "Kariokoo",
    fr: "Liens Rapides"
  },
  "nav.contactUs": {
    en: "Contact Us",
    sw: "Wasiliana Nasi",
    ki: "Arĩria na ithuĩ",
    fr: "Contactez-nous"
  },

  // Buttons & Shared Labels
  "btn.search": {
    en: "Search",
    sw: "Tafuta",
    ki: "Gĩmia",
    fr: "Rechercher"
  },
  "btn.submit": {
    en: "Submit",
    sw: "Wasilisha",
    ki: "Rehe",
    fr: "Soumettre"
  },
  "btn.loading": {
    en: "Processing...",
    sw: "Inashughulikia...",
    ki: "Gũkinya...",
    fr: "Traitement..."
  },
  "btn.close": {
    en: "Close",
    sw: "Funga",
    ki: "Hinga",
    fr: "Fermer"
  },
  "btn.edit": {
    en: "Edit",
    sw: "Hariri",
    ki: "Garũra",
    fr: "Modifier"
  },
  "btn.delete": {
    en: "Delete",
    sw: "Futa",
    ki: "Te / Niina",
    fr: "Supprimer"
  },
  "btn.cancel": {
    en: "Cancel",
    sw: "Ghairi",
    ki: "Tiga",
    fr: "Annuler"
  },
  "btn.learnMore": {
    en: "Learn More",
    sw: "Jifunze Zaidi",
    ki: "Menya Maingi",
    fr: "En savoir plus"
  },
  "label.verifiedSpecimen": {
    en: "📷 Verified Specimen",
    sw: "📷 Sampuli Iliyothibitishwa",
    ki: "📷 Kĩonereria Kĩrũmĩru",
    fr: "📷 Spécimen Vérifié"
  },
  "label.botanicalIllustration": {
    en: "🎨 Botanical Illustration",
    sw: "🎨 Mchoro wa Kibotania",
    ki: "🎨 Mĩhianano ya mĩthĩga",
    fr: "🎨 Illustration Botanique"
  },
  "label.kikuyuLanguage": {
    en: "Kikuyu",
    sw: "Kikuyu",
    ki: "Gĩkũyũ",
    fr: "Kikuyu"
  },
  "label.englishLanguage": {
    en: "English",
    sw: "Kiingereza",
    ki: "Gĩthũngũ",
    fr: "Anglais"
  },
  "label.indigenousFlora": {
    en: "Indigenous Flora",
    sw: "Mimea ya Asili",
    ki: "M mĩthĩga ya Kĩbũrĩ",
    fr: "Flore Indigène"
  },
  "blog.discussions": {
    en: "Discussions",
    sw: "Mazungumzo",
    ki: "Kwarĩria",
    fr: "Discussions"
  },
  "blog.byAuthor": {
    en: "By: ",
    sw: "Na: ",
    ki: "Nĩ: ",
    fr: "Par : "
  },
  "blog.pendingApproval": {
    en: "Pending Approval",
    sw: "Inasubiri Kuidhinishwa",
    ki: "Iragondia kwarĩrio",
    fr: "En attente de validation"
  },
  "blog.noCommentsYet": {
    en: "No discussions yet. Ask a question or share your ancestral reflections!",
    sw: "Bado hakuna mazungumzo. Uliza swali au ushiriki tafakari zako za kiasili!",
    ki: "Gũtirĩ kĩongerero o gĩothe rĩu. Ũria kĩũria kana ũheane mĩtugo yaku!",
    fr: "Aucune discussion pour l'instant. Posez une question ou partagez vos réflexions ancestrales !"
  },
  "blog.commentNamePlaceholder": {
    en: "Your Name (e.g. Kiprop Waithera)",
    sw: "Jina Lako (mfano Kiprop Waithera)",
    ki: "Rĩĩtwa Rĩaku (ta Kiprop Waithera)",
    fr: "Votre Nom (ex. Kiprop Waithera)"
  },
  "blog.commentTextPlaceholder": {
    en: "Ask a question or add a recipe reflection...",
    sw: "Uliza swali au uongeze tafakari ya mapishi...",
    ki: "Ũria kĩũria kana ũheane ndũmĩrĩri njoru...",
    fr: "Posez une question ou ajoutez une réflexion sur la recette..."
  },
  "blog.postButton": {
    en: "Post",
    sw: "Chapisha",
    ki: "Rehe",
    fr: "Publier"
  },
  "blog.educationalRegistry": {
    en: "DawaKienyeji Educational Registry",
    sw: "Sajili ya Elimu ya DawaKienyeji",
    ki: "Kĩgĩna kĩa rĩandĩko rĩa DawaKienyeji",
    fr: "Registre Éducatif de DawaKienyeji"
  },
  "blog.licenseText": {
    en: "License: CC Creative Commons Attribution",
    sw: "Leseni: CC Creative Commons Attribution",
    ki: "Rũtha: CC Creative Commons Attribution",
    fr: "Licence : CC Creative Commons Attribution"
  },
  "blog.loadingComments": {
    en: "Loading comments...",
    sw: "Inapakia maoni...",
    ki: "Iragondia ndũmĩrĩri...",
    fr: "Chargement des commentaires..."
  },
  "blog.adminAdvice": {
    en: "Admin Advice",
    sw: "Ushauri wa Msimamizi",
    ki: "Ũtaaro wa Admin",
    fr: "Conseil de l'Admin"
  },
  "chat.dawaBotAssistant": {
    en: "DawaBot Assistant",
    sw: "Msaidizi wa DawaBot",
    ki: "Mũteithia wa DawaBot",
    fr: "Assistant DawaBot"
  },
  "chat.ethnobotanyKB": {
    en: "Ethnobotany Knowledge Base",
    sw: "Hifadhi ya Maarifa ya Etnobotaniki",
    ki: "Ũgĩ wa mĩthĩga ya kĩbũrĩ",
    fr: "Base de Connaissance Ethnobotanique"
  },
  "chat.newHerbSession": {
    en: "New Herb Session",
    sw: "Kipindi Kipya cha Mitishamba",
    ki: "Kĩgongona Kĩerũ kĩa Mĩthĩga",
    fr: "Nouvelle Session"
  },
  "chat.historySessions": {
    en: "History Sessions",
    sw: "Historia ya Vikindi",
    ki: "Kĩgũnyo kĩa thitakĩ",
    fr: "Historique"
  },
  "chat.poweredByRAG": {
    en: "Powered by RAG directly aligned to traditional Kikuyu Ethnobotany database.",
    sw: "Inaendeshwa na RAG iliyooanishwa moja kwa moja na hifadhi ya Kikuyu Etnobotaniki.",
    ki: "Iragondio nĩ RAG ĩcongetwo kĩa rĩandĩko rĩa mĩthĩga ya Gĩkũyũ.",
    fr: "Propulsé par RAG aligné directement avec la base de données ethnobotanique Kikuyu."
  },
  "chat.statusSecure": {
    en: "Status: Secure Sandbox",
    sw: "Hali: Sandbox Iliyo salama",
    ki: "Ũhoro: Gĩcigo kĩa mĩno",
    fr: "Statut : Bac à sable Sécurisé"
  },
  "chat.clearSessions": {
    en: "Clear Sessions",
    sw: "Futa Vikindi Zote",
    ki: "Niina Gĩgongona",
    fr: "Effacer les Sessions"
  },
  "chat.copy": {
    en: "Copy",
    sw: "Nakili",
    ki: "Kobia",
    fr: "Copier"
  },
  "chat.copied": {
    en: "Copied",
    sw: "Imenakiliwa",
    ki: "Kobitũ",
    fr: "Copié"
  },
  "label.category": {
    en: "Category",
    sw: "Kitengo",
    ki: "Mũthemba",
    fr: "Catégorie"
  },
  "label.partUsed": {
    en: "Part Used",
    sw: "Sehemu Inayotumika",
    ki: "Gĩcunjĩ kĩhũthagĩra",
    fr: "Partie Utilisée"
  },

  // Homepage Elements
  "home.heroTitle": {
    en: "Ancestral Medical Wisdom, Verified Safely",
    sw: "Hekima ya Tiba ya Wazee, Imethibitishwa Salama",
    ki: "Ũgĩ wa Tene wa Mĩthĩga, na Ũrindĩri",
    fr: "Sagesse Médicale Ancestrale, Vérifiée en Sécurité"
  },
  "home.heroText": {
    en: "Connecting Gĩkũyũ traditional herbal lore with modern conservation standards. Search indigenous flora, study centuries-old herbal remedies, and consult our safety-grounded AI knowledge master.",
    sw: "Inaunganisha ujuzi wa asili wa mitishamba wa Gĩkũyũ na viwango vya kisasa vya uhifadhi. Tafuta mimea ya asili, soma tiba za karne nyingi, na uwasiliane na mtaalamu wetu wa AI salama.",
    ki: "Gũcokanĩria Ũgĩ wa tene wa mĩthĩga ya Gĩkũyũ hamwe na njĩra njoru cia kũbũra matũũra. Gĩmia mĩthĩga ya kũũra, thoma thaũ cia andũ a igogo, na ũranĩrie na DawaBot nĩguo mamenye mĩhaka thome kĩ-ĩrĩrĩ.",
    fr: "Connecter le savoir des plantes Gĩkũyũ aux normes modernes de conservation. Recherchez la flore indigène, étudiez des remèdes centenaires et consultez notre IA sécurisée."
  },
  "home.capabilities": {
    en: "Capabilities",
    sw: "Uwezo",
    ki: "Hinya na Ũgĩ",
    fr: "Capacités"
  },
  "home.pillarsTitle": {
    en: "Our Platform Core Pillars",
    sw: "Nguzo Kuu za Jukwaa Letu",
    ki: "Mĩrũgĩ Mĩnene ya Jukwaa Ritũ",
    fr: "Piliers de notre Plateforme"
  },
  "home.pillarsSub": {
    en: "A modern library where thousand-year African healing remedies shake hands with dynamic vector databases.",
    sw: "Hifadhi ya kisasa ambapo tiba za Kiafrika za milenia zinakumbatiwa na hifadhi za data za kisasa.",
    ki: "Ũgĩ wa tene wa mĩthĩga gũthiurũra na kĩgĩna gĩa andũ a sayansi mĩrũgĩ ya kĩ-bũrĩ.",
    fr: "Une bibliothèque moderne où les remèdes africains millénaires rencontrent les bases de données vectorielles."
  },
  "home.pillarDb": {
    en: "Medicinal Plants Database",
    sw: "Hifadhi ya Mimea ya Dawa",
    ki: "Kĩgĩna kĩa Mĩthĩga",
    fr: "Base de Merveilles Médicinales"
  },
  "home.pillarDbText": {
    en: "Meticulously mapped indigenous flora profile indexes with botanical names, Gĩkũyũ names, and harvesting periods.",
    sw: "Faharasa ya mimea ya asili iliyosajiliwa kwa kina ikiwa na majina ya kisayansi, majina ya Gĩkũyũ, na misimu ya kuvuna.",
    ki: "Mũthĩga wothe nĩ mwandĩkithie wega na marĩĩtwa ma sayansi, marĩĩtwa ma Gĩkũyũ na mĩri ya tene.",
    fr: "Profils méticuleux des plantes indigènes avec noms botaniques, noms Gĩkũyũ et périodes de récolte."
  },
  "home.pillarRem": {
    en: "Traditional Remedies",
    sw: "Tiba za Kiasili",
    ki: "Thaũ cia Kĩbũrĩ",
    fr: "Remèdes Traditionnels"
  },
  "home.pillarRemText": {
    en: "Symptom-driven preparation recipes detail how grandparent healers prepared bark, roots, and flowers.",
    sw: "Mapishi yanayoongozwa na dalili yanayofafanua jinsi wazee walivyotayarisha maganda, mizizi, na maua.",
    ki: "Thaũ cia kũrũga mĩri, ruthumo na matũ ta mĩgandĩ nĩguo kũniina mĩrimũ.",
    fr: "Recettes traditionnelles basées sur les symptômes expliquant l'infusion d'écorces, de racines et de fleurs."
  },
  "home.pillarBot": {
    en: "AI Herbal Assistant",
    sw: "Msaidizi wa AI wa Mimea",
    ki: "Mũteithia wa Mĩthĩga AI",
    fr: "Assistant IA en Phytothérapie"
  },
  "home.pillarBotText": {
    en: "Talk with DawaBot, a strict RAG-powered chatbot with strict context constraints to avoid model hallucinations.",
    sw: "Zungumza na DawaBot, chatbot ya uaminifu inayotumia RAG ili kuzuia majibu yasiyo sahihi.",
    ki: "Ũranĩria na DawaBot, mũteithia mwaka mwĩgĩ wa RAG ũtahenagia andũ tũhũ.",
    fr: "Discutez avec DawaBot, une IA alimentée par RAG avec des règles strictes pour éviter les hallucinations."
  },
  "home.pillarEth": {
    en: "Ethnobotanical Knowledge",
    sw: "Maarifa ya Ethnobotaniki",
    ki: "Ũgĩ wa Tene wa Matũũra",
    fr: "Connaissances Ethnobotaniques"
  },
  "home.pillarEthText": {
    en: "Preserving maternal milk, sacred Sacred Fig Tree altars, and deep central Kenya highland cultural customs.",
    sw: "Kuhifadhi maziwa ya mama, madhabahu takatifu ya Mũgũmo, na mila za kitamaduni za nyanda za juu za Kenya.",
    ki: "Kũbũra tũmĩrĩri twa maziwa ma mwendwa, Mũgũmo ũrĩa mũtheru wega na kĩ-mũtũũro kĩa Gĩkũyũ.",
    fr: "Préserver l'allaitement maternel, les autels du Mũgũmo sacré et les coutumes des montagnes du Kenya."
  },
  "home.pillarComm": {
    en: "Community Learning",
    sw: "Mafunzo ya Jamii",
    ki: "Ũranĩria wa Kĩbũrĩ Jamii",
    fr: "Apprentissage Communautaire"
  },
  "home.pillarCommText": {
    en: "Active review columns and comments where readers can compare oral reports across mountain ridges.",
    sw: "Sehemu za ukaguzi na maoni ambapo wasomaji wanaweza kulinganisha ripoti kote milimani.",
    ki: "Ngo cia kũrũmĩria na macomentĩ harĩa kamo kũũranda mĩhaka thutha andũ kwarĩria.",
    fr: "Espaces d'avis et commentaires permettant de comparer les rapports oraux à travers les collines."
  },
  "home.pillarArch": {
    en: "Research Archive",
    sw: "Hifadhi ya Utafiti",
    ki: "Kĩgĩna gĩa Thuthuria",
    fr: "Archives de Recherche"
  },
  "home.pillarArchText": {
    en: "Contains clinical reviews, sustainable forest vertical-stripping diagram guides, and safety tables.",
    sw: "Inajumuisha ukaguzi wa kimatibabu, miongozo ya kubalisha maganda, na meza za usalama.",
    ki: "Irĩ na thuthuria ya sayansi, miongozo ya kũbũra mĩthĩga kũgongo gĩa mĩgandĩ na ũgĩtĩri.",
    fr: "Contient des analyses cliniques, des guides éthiques de récolte verticale et des tables de sécurité."
  },
  "home.recentChronicles": {
    en: "Recent Chronicles & Essays",
    sw: "Majarida na Insha za Hivi Karibuni",
    ki: "Mabuku na Makala ma Tene-Ino",
    fr: "Chroniques et Essais Récents"
  },
  "home.readAll": {
    en: "Read All Essays",
    sw: "Soma Insha Zote",
    ki: "Thoma makala mothe",
    fr: "Lire tous les Essais"
  },
  "home.exploreBlogs": {
    en: "Explore Blogs",
    sw: "Gundua Blogu",
    ki: "Thuthuria Mablogu",
    fr: "Explorer les Blogs"
  },
  "home.readEssay": {
    en: "Read Essay",
    sw: "Soma Zaidi",
    ki: "Thoma makiri",
    fr: "Lire l'Essai"
  },
  "home.heritage": {
    en: "Heritage Profiles",
    sw: "Maelezo ya Urithi",
    ki: "Matũũra ma mĩthĩga",
    fr: "Profils du Patrimoine"
  },
  "home.floraTitle": {
    en: "Featured Medicinal Flora",
    sw: "Mimea Teule ya Dawa ya Kiasili",
    ki: "Mĩthĩga ya Kĩ-Bũrĩĩno kĩa Thome",
    fr: "Flore Médicale en Vedette"
  },
  "home.browseFull": {
    en: "Browse Full Database",
    sw: "Angalia Mimea Yote",
    ki: "Thuthuria Mĩthĩga Yothe",
    fr: "Parcourir la Base Complète"
  },
  "home.commonUseLabel": {
    en: "Common use:",
    sw: "Matumizi ya kawaida:",
    ki: "Mũhũthĩrĩre wa kawaida:",
    fr: "Usage courant :"
  },
  "home.scientificTaxonomy": {
    en: "Scientific taxonomy:",
    sw: "Uainishaji wa kisayansi:",
    ki: "Uainishaji wa sayansi:",
    fr: "Taxonomie scientifique :"
  },
  "home.overview": {
    en: "Overview",
    sw: "Maelezo ya Jumla",
    ki: "Ũhoro ũrũmĩria",
    fr: "Aperçu de la Plante"
  },
  "home.preparation": {
    en: "Traditional Decoction:",
    sw: "Kutayarisha Dawa:",
    ki: "Kũrũga Mũthĩga:",
    fr: "Préparation Traditionnelle :"
  },
  "home.safety": {
    en: "Safety Warnings:",
    sw: "Tahadhari za Usalama:",
    ki: "Watho kũgĩtĩra Ũgĩ:",
    fr: "Avertissements de Sécurité :"
  },
  "home.goCatalog": {
    en: "Go to Catalog",
    sw: "Nenda kwenye Tovuti",
    ki: "Thiĩ Thuthurĩ-inĩ",
    fr: "Aller au Catalogue"
  },
  "home.aboutHeading": {
    en: "Preserving Ethnobotanical Chronicles",
    sw: "Kuhifadhi Taarifa za Ethnobotaniki",
    ki: "Kũbũra matũũra ma mĩthĩga",
    fr: "Préservation des Chroniques Ethnobotaniques"
  },
  "home.aboutSub": {
    en: "Blending ancient Gĩkũyũ botanical medicine, indigenous highland preservation, and modern AI models.",
    sw: "Kuchanganya tiba asili ya Gĩkũyũ, uhifadhi wa asili, na mifumo ya kisasa ya AI.",
    ki: "Mũcokanĩria Ũgĩ wa tene wa Gĩkũyũ hamwe na njĩra njoru cia kũbũra matũũra na AI.",
    fr: "Fusionner médecine Gĩkũyũ ancestrale, préservation des hauteurs et modèles d'IA modernes."
  },
  "home.preservingHeading": {
    en: "Preserving African Herbal Knowledge",
    sw: "Kuhifadhi Maarifa ya Dawa za Kiafrika",
    ki: "Kũbũra Ũgĩ wa mĩthĩga ya tene",
    fr: "Préserver le Savoir des Plantes d'Afrique"
  },
  "home.preservingText": {
    en: "Traditional herbal medicine has existed under forest canopies for centuries. In our hills, trees like the peppery Pepper Bark Tree (Kikuyu: Mũthĩga) served as our emergency clinics for colds and fevers. Urination issues in older men were solved with tea brewed from the reddish bark of African Cherry (Kikuyu: Mũcoroi). Toothaches were temporarily anesthetized with Sodom Apple (Kikuyu: Mũtongu) roots. Saps from sacred Sacred Fig Trees (Kikuyu: Mugumo) served as instant surgical coagulants on cuts.",
    sw: "Miteremko ya Kenya ya kati inakuza maktaba ya mimea ambayo wazazi wetu walijaribu na kuainisha kwa milenia... Mapishi ya mdomo yanapotea yasipoandikwa.",
    ki: "Andũ a gũkũra makĩgũa matũũra, ũgĩ wa mĩthĩga wetekaga wega tondũ rita rũ mĩthĩga ndĩmwandikiĩ.",
    fr: "Les pentes du Kenya central abritent une bibliothèque biologique de plantes que les sages traditionnels ont mis des millénaires à classifier... Les recettes s'éteignent sans écrits."
  },
  "home.featuredFlora": {
    en: "Featured Medicinal Flora",
    sw: "Mimea Teule ya Dawa ya Kiasili",
    ki: "Mĩthĩga ya Kĩ-Bũrĩĩno kĩa Thome",
    fr: "Flore Médicale en Vedette"
  },
  "home.aboutSectionTitle": {
    en: "Preserving African Herbal Knowledge",
    sw: "Kuhifadhi Maarifa ya Dawa za Kiafrika",
    ki: "Kũbũra Ũgĩ wa mĩthĩga ya tene",
    fr: "Préserver le Savoir des Plantes d'Afrique"
  },
  "home.missionIntro": {
    en: "The slopes of central Kenya grow a biological library of plants that traditional sages Muthamaki wa Mithĩga spent millenniums testing and classifying. But oral recipes pass away if not written down.",
    sw: "Miteremko ya Kenya ya kati inakuza maktaba ya mimea ambayo wazazi wetu walijaribu na kuainisha kwa milenia... Mapishi ya mdomo yanapotea yasipoandikwa.",
    ki: "Andũ a gũkũra makĩgũa matũũra, ũgĩ wa mĩthĩga wetekaga wega tondũ rita rũ mĩthĩga ndĩmwandikiĩ.",
    fr: "Les pentes du Kenya central abritent une bibliothèque biologique de plantes que les sages traditionnels ont mis des millénaires à classifier... Les recettes s'éteignent sans écrits."
  },
  "home.ourPhilosophy": {
    en: "Our Philosophy",
    sw: "Falsafa Yetu",
    ki: "Watho Witũ",
    fr: "Notre Philosophie"
  },
  "blog.editorialColumns": {
    en: "Editorial Columns",
    sw: "Majarida",
    ki: "Mabuku mĩromo",
    fr: "Colonnes Éditoriales"
  },
  "blog.chroniclesTitle": {
    en: "The DawaKienyeji Chronicles",
    sw: "Historia za DawaKienyeji",
    ki: "Maũhoro ma DawaKienyeji",
    fr: "Les Chroniques DawaKienyeji"
  },
  "blog.chroniclesDesc": {
    en: "Weekly research essays, indigenous botanical lore, and ecological forestry updates of central Kenya. Explore real stories behind ancestral wisdom.",
    sw: "Insha za hivi karibuni, maarifa ya asili ya mimea, na taarifa za ulinzi wa misitu ya Kenya ya kati.",
    ki: "Makala ma tene, ũgĩ wa kĩbũrĩ thome rera wega na kũbũra mĩthĩga thutha andũ kwarĩria.",
    fr: "Essais de recherche hebdomadaires, traditions botaniques indigènes et mises à jour écologiques."
  },
  "home.integrityHeading": {
    en: "Our Integrity Philosophy",
    sw: "Falsafa yetu ya Maadili",
    ki: "Watho gitũ na Ũrũgĩ",
    fr: "Notre Philosophie d'Intégrité"
  },
  "home.integrityText": {
    en: "We prioritize clinical safety and exact species mapping. Traditional heritage is respected inside our parameters to ensure child safety and avoid toxic saps.",
    sw: "Tunapa kipaumbele usalama wa kimatibabu na ramani halisi ya mimea ili kuepuka sumu na kuwalinda watoto.",
    ki: "Kũgĩtĩra mĩri na kũgitĩra wega andũ a thutha nĩguo ciana itige gũcheera na mĩthĩga ĩrĩ na sumu.",
    fr: "Priorité à la sécurité clinique et cartographie exacte. L'héritage traditionnel est respecté pour assurer la sécurité et éviter les sèves toxiques."
  },
  "home.ecologyHeading": {
    en: "Ecology & Sustainability",
    sw: "Ikolojia & Uendelevu",
    ki: "Ũrĩndĩri wa mĩgũmo na rũũĩ",
    fr: "Écologie & Durabilité"
  },
  "home.ecologyText": {
    en: "We mandate vertical Opposite Striping harvesting so that bark trees remain alive and forests continue to thrive. We are ecological preservationists first.",
    sw: "Tunalazimisha uvunaji wa upande kwa upande wa wima ili kuacha miti ikiwa hai na kulinda misitu.",
    ki: "Tĩnia ruthumo rũgongo rwa rũgendo mbera na thutha nĩgũo mũthĩga ndũgakorwo nĩgũkua.",
    fr: "Récolte verticale obligatoire ( Opposite Striping ) pour maintenir les arbres vivants et préserver la biodiversité."
  },
  "home.ragHeading": {
    en: "The Role of RAG Technology",
    sw: "Nafasi ya Teknolojia ya RAG",
    ki: "Wĩra wa RAG thome marĩĩtwa",
    fr: "Le Rôle de la Technologie RAG"
  },
  "home.ragText": {
    en: "Our conversational AI companion—DawaBot—utilizes Retrieval-Augmented Generation mapped directly containing verified Kikuyu botanical records... In doing so, we don't duplicate books; we teach young Kenyans their botanical lineage.",
    sw: "DawaBot msaidizi wa AI, anatumia RAG iliyounganishwa moja kwa moja na rekodi zilizothibitishwa... kwa kufanya hivi, tunafunza vijana urithi wao.",
    ki: "conversational AI companion—DawaBot—nũhũthagĩra RAG kũrĩa mĩri nĩguo tũkinye ta namba ya sayansi.",
    fr: "Notre compagnon conversationnel—DawaBot—utilise la génération augmentée par récupération cartographiée directement sur nos bases pour instruire la jeunesse."
  },
  "home.connectWithUs": {
    en: "Connect With Us",
    sw: "Wasiliana Nasi",
    ki: "Mwanya wa kũgĩa",
    fr: "Restez Connectés"
  },
  "home.educationalProject": {
    en: "Educational Project only",
    sw: "Mradi wa Kuelimisha Pekee",
    ki: "Ũritano tu",
    fr: "Projet Éducatif Uniquement"
  },

  "home.mission": {
    en: "The Mountain Code of Preservation",
    sw: "Sheria ya Milima ya Uhifadhi",
    ki: "Watho wa Kĩrĩnyaga wa Kũbũra",
    fr: "Code d'Honneur de la Préservation"
  },
  "home.ethicsText": {
    en: "Ethics mandate that we take slices exclusively from opposite vertical trunk stripes to keep core nutrient flows active. We strictly prohibit ring girdling.",
    sw: "Maadili yetu yanatuhitaji kuvuna vipande vidogo upande mmoja na upande wa pili kinyume ili kuzuia kufunga mtiririko wa virutubishi. Ni marufuku kukata gamba zima.",
    ki: "Watho wa rũũgĩ nĩ gũtinia ruthumo rwa mĩthĩga rũgongo rwa rũgendo (vertical) na kuumana handũ herĩ matiganĩte nĩguo mĩeri nĩĩgĩthe ndamere gũkua. Nĩ rwamete gũtinia mũthĩga gũthiũrũrũka moko mothe.",
    fr: "L'éthique exige de prélever des bandes d'écorce uniquement sur les côtés verticaux opposés pour maintenir les flux de nutriments actifs. Le cerclage complet est interdit."
  },
  "home.statPlants": {
    en: "Flora Species Registered",
    sw: "Mimea Iliyosajiliwa",
    ki: "Mthembo ya Mĩthĩga nĩ mwandĩke",
    fr: "Espèces de Flore Enregistrées"
  },
  "home.statRemedies": {
    en: "Recipes Indexed",
    sw: "Tiba Zilizothibitishwa",
    ki: "Thaũ nĩ iwandĩke",
    fr: "Recettes Répertoriées"
  },
  "home.statBot": {
    en: "Safety Inquiries Solved",
    sw: "Masuala ya Usalama Yaliyotatuliwa",
    ki: "Ũria thome nĩĩgĩtethio",
    fr: "Requêtes de Sécurité Résolues"
  },
  "newsletter.title": {
    en: "Subscribe to Botanical Bulletins",
    sw: "Jiunge na Vijarida vya Mimea",
    ki: "Andĩkithia tũmĩrĩri twa mĩthĩga",
    fr: "Abonnez-vous aux Bulletins Botaniques"
  },
  "newsletter.subtitle": {
    en: "Get sustainable harvesting guidelines, ethnobotanical reports, and safety-grounded remedy updates directly to your inbox.",
    sw: "Pata miongozo ya uvunaji endelevu, ripoti za ethnobotaniki, na taarifa za tiba salama moja kwa moja kwenye barua pepe yako.",
    ki: "Amũkĩra watho wa kũbũra mĩthĩga na matũũra, na mohoro ma andũ o rĩmwe thĩnĩ wa email yaku.",
    fr: "Recevez des directives de récolte durable, des rapports ethnobotaniques et des mises à jour de remèdes sécurisés directement dans votre boîte de réception."
  },
  "newsletter.placeholder": {
    en: "Enter your email address...",
    sw: "Andika barua pepe yako...",
    ki: "Andĩka email yaku...",
    fr: "Entrez votre adresse e-mail..."
  },
  "newsletter.button": {
    en: "Subscribe",
    sw: "Jiunge",
    ki: "Andĩkithia",
    fr: "S'abonner"
  },
  "newsletter.success": {
    en: "Thank you! You have successfully subscribed to DawaKienyeji updates.",
    sw: "Asante! Umefanikiwa kujiunga na taarifa za DawaKienyeji.",
    ki: "Ni wega mũno! Wandĩkithia tũmĩrĩri twa DawaKienyeji na ũkinyu.",
    fr: "Merci! Vous vous êtes abonné avec succès aux mises à jour de DawaKienyeji."
  },
  "newsletter.invalidEmail": {
    en: "Please provide a valid email address.",
    sw: "Tafadhali weka barua pepe sahihi.",
    ki: "Tafadhali andĩka email ĩrĩ njoru.",
    fr: "Veuillez fournir une adresse e-mail valide."
  },

  // Hero Carousel Slides
  "slides.1.title": {
    en: "Discover the Power of Traditional Herbal Medicine",
    sw: "Gundua Nguvu ya Tiba ya Mitishamba ya Kiasili",
    ki: "Gũkũrĩra hinya wa mĩthĩga ya tene",
    fr: "Découvrez le Pouvoir de la Médecine Traditionnelle"
  },
  "slides.1.subtitle": {
    en: "Explore authentic African medicinal plants, traditional remedies, and AI-powered herbal knowledge.",
    sw: "Gundua mimea halisi ya dawa ya Kiafrika, tiba za asili, na maarifa ya mitishamba yanayowezeshwa na AI.",
    ki: "Hũthĩra mĩthĩga ya tene ya gĩkũyũ, thaũ cia kĩbũrĩ, na mĩthĩga ya AI.",
    fr: "Explorez d'authentiques plantes médicinales africaines, des remèdes traditionnels et des connaissances propulsées par l'IA."
  },
  "slides.1.btn1": {
    en: "Explore Herbal Plants",
    sw: "Tafuta Mimea ya Dawa",
    ki: "Thuthuria Mĩthĩga",
    fr: "Explorer les Plantes"
  },
  "slides.1.btn2": {
    en: "Dawabot",
    sw: "Dawabot",
    ki: "Dawabot",
    fr: "Dawabot"
  },
  "slides.2.title": {
    en: "Preserving African Herbal Knowledge for Future Generations",
    sw: "Kuhifadhi Maarifa ya Mitishamba kwa Kizazi Kijacho",
    ki: "Kũbũra ũgĩ wa mĩthĩga kĩrĩ njiarwa cia tene",
    fr: "Préserver le Savoir des Plantes pour les Générations Futures"
  },
  "slides.2.subtitle": {
    en: "Access a rich digital archive of Kikuyu medicinal plants, healing traditions, and ethnobotanical research.",
    sw: "Pata hifadhi tajiri ya kidijitali ya mimea ya Kikuyu, mila za kuponya, na utafiti mbalimbali.",
    ki: "Ingĩra thĩnĩ wa kĩgĩna gĩa andũ a igogo kĩa mĩthĩga ya Gĩkũyũ.",
    fr: "Accédez à de riches archives de plantes Kikuyu, de traditions de guérison et de recherche ethnobotanique."
  },
  "slides.2.btn1": {
    en: "Explore Remedies",
    sw: "Vinjari Tiba asili",
    ki: "Caria thaũ",
    fr: "Explorer les Remèdes"
  },
  "slides.2.btn2": {
    en: "Learn More",
    sw: "Jifunze Zaidi",
    ki: "Menya Maingi",
    fr: "En savoir plus"
  },
  "slides.3.title": {
    en: "Your Intelligent Herbal Medicine Assistant",
    sw: "Msaidizi Wako Mwerevu wa Tiba ya Mitishamba",
    ki: "Mũteithia waku mwĩgĩ wa mĩthĩga",
    fr: "Votre Assistant Intelligent en Phytothérapie"
  },
  "slides.3.subtitle": {
    en: "Ask DawaBot anything about medicinal plants, herbal remedies, traditional healing, and African ethnobotany.",
    sw: "Uliza DawaBot chochote kuhusu mimea ya dawa, uponyaji wa kiasili, na etnobotaniki ya Kiafrika.",
    ki: "Ũria DawaBot kĩndũ o gĩothe kĩĩgĩĩ mĩthĩga ya tene na ũgĩ wa gĩkũyũ.",
    fr: "Demandez n'importe quoi à DawaBot sur les plantes médicinales, les remèdes, la guérison et l'ethnobotanique."
  },
  "slides.3.btn1": {
    en: "Start Chatting",
    sw: "Anza Kuzungumza",
    ki: "Ambĩrĩria kwarĩria",
    fr: "Commencer à Discuter"
  },
  "slides.3.btn2": {
    en: "View Remedies",
    sw: "Angalia Tiba",
    ki: "Rora Thaũ cia kĩbũrĩ",
    fr: "Voir les Remèdes"
  },
  "slides.4.title": {
    en: "Natural Healing Through Indigenous Wisdom",
    sw: "Uponyaji wa Kiasili Kupitia Hekima ya Kiasili",
    ki: "Kũhonoka thĩnĩ wa ũgĩ wa andũ",
    fr: "Guérison Naturelle par la Sagesse Autochtone"
  },
  "slides.4.subtitle": {
    en: "Discover the medicinal uses of herbs traditionally used across African communities.",
    sw: "Gundua matumizi ya matibabu ya mimea inayotumiwa kijadi katika jamii za Kiafrika.",
    ki: "Meta thome mĩhaka ya mĩthĩga ĩrĩa ĩhũthagĩra nĩ mĩthĩga.",
    fr: "Découvrez les usages médicinaux des herbes traditionnellement utilisées dans les communautés africaines."
  },
  "slides.4.btn1": {
    en: "Browse Remedies",
    sw: "Vinjari Tiba asili",
    ki: "Caria thaũ",
    fr: "Parcourir les Remèdes"
  },
  "slides.4.btn2": {
    en: "Explore Plants",
    sw: "Chunguza Mimea",
    ki: "Caria mĩthĩga",
    fr: "Explorer les Plantes"
  },

  // Plants Catalogue Page
  "plants.catalog": {
    en: "Highland Medical Florae",
    sw: "Mimea ya Matibabu ya Nyanda za Juu",
    ki: "Mĩthĩga ya Kũũra Nyandarũa",
    fr: "Flore Médicale des Hautes Terres"
  },
  "plants.searchPlaceholder": {
    en: "Search scientific names, Gĩkũyũ names, or specific uses...",
    sw: "Tafuta majina ya kisayansi, majina ya Gĩkũyũ, au matumizi...",
    ki: "Gĩmia marĩĩtwa ma sayansi, Gĩkũyũ, kana mĩhũthĩrĩre...",
    fr: "Rechercher par nom scientifique, nom Gĩkũyũ, usages..."
  },
  "plants.severity": {
    en: "Safety Severity Rating",
    sw: "Kiwango cha Usalama",
    ki: "Kĩgero kĩa Ũgĩtĩri",
    fr: "Évaluation de Sécurité"
  },
  "plants.caution": {
    en: "Caution REQUIRED",
    sw: "Tahadhari INAHITAJIKA",
    ki: "Menya mũhaka mũno",
    fr: "Attention REQUISE"
  },
  "plants.safe": {
    en: "Generally SAFE",
    sw: "Salama Kwa Jumla",
    ki: "Mũthĩga mũgi wa andũ",
    fr: "Généralement SÛR"
  },

  // Remedies Page
  "remedies.title": {
    en: "Verified Native Recipes & Preparation Logs",
    sw: "Tiba na Mwongozo wa Kutayarisha",
    ki: "Remebio cia Mĩthĩga na Njĩra cĩa kũrũga",
    fr: "Recettes Traditionnelles et Guides de Préparation"
  },
  "remedies.symptoms": {
    en: "Active Symptom Scope",
    sw: "Dalili Zinazolengwa",
    ki: "Ũra mĩrimu ĩragũmĩra",
    fr: "Symptômes Ciblés"
  },
  "remedies.herbs": {
    en: "Recommended Herbs",
    sw: "Mimea Inayopendekezwa",
    ki: "Mĩthĩga kũhũthagĩra",
    fr: "Plantes Recommandées"
  },
  "remedies.prepSteps": {
    en: "Step-by-Step Preparation Guide",
    sw: "Mwongozo wa Kutayarisha Hatua kwa Hatua",
    ki: "Ta rũgendo rwa kũrũga mĩthĩga",
    fr: "Guide de Préparation Étape par Étape"
  },
  "remedies.dosage": {
    en: "Traditional Advisory Dosage",
    sw: "Kiwango cha Ushauri cha Kipimo",
    ki: "Ũra gũkero andũ makĩnyua",
    fr: "Dosage Traditionnel Conseillé"
  },

  // Knowledge Base Page
  "kb.title": {
    en: "RAG Academic Treatises & Safety Guidelines",
    sw: "Maandiko ya RAG na Mwongozo wa Kiufundi wa Usalama",
    ki: "Mabuku ma RAG thome marĩĩtwa ma gũkĩmĩa",
    fr: "Traités Académiques RAG et Directives de Sécurité"
  },
  "kb.lastUpdated": {
    en: "Last updated",
    sw: "Ilisasishwa mwisho",
    ki: "Njoru ya kũrũmĩria mwisho",
    fr: "Dernière mise à jour"
  },

  // Blog Page
  "blog.title": {
    en: "Ethnobotanical Conservation Dispatch",
    sw: "Majarida ya uhifadhi wa Miti ya Dawa",
    ki: "Makala ma Nyandarũa na MĩgŨmo ya Gĩkũyũ",
    fr: "Actualités de Conservation Ethnobotanique"
  },

  // Contact / Message page
  "contact.title": {
    en: "Contact Us",
    sw: "Wasiliana Nasi",
    ki: "Kwarĩria Na Ithuĩ",
    fr: "Contactez-nous"
  },
  "contact.subtitle": {
    en: "Have questions about plant safety, sustainability regulations, or native seeds? Write or visit us at our highlands model gardens.",
    sw: "Una maswali kuhusu usalama vya mimea, kanuni za uendelevu, au mbegu za kienyeji? Tuandikie au ututembelee kwenye bustani zetu za mfano.",
    ki: "Mũri wa kĩ-ndari, mĩtĩ na mbeũ cia tene? Rehe mbarũthi haha kana ũũke tũceere kĩ-mũtũũro gĩa gĩcigo.",
    fr: "Vous avez des questions sur la sécurité des plantes, les réglementations de durabilité ou les semences indigènes ? Écrivez-nous ou visitez nos jardins de démonstration."
  },
  "contact.name": {
    en: "Full Name *",
    sw: "Jina Kamili *",
    ki: "Rĩĩtwa Rĩothe *",
    fr: "Nom Complet *"
  },
  "contact.email": {
    en: "Email *",
    sw: "Barua Pepe *",
    ki: "Mbarũthi *",
    fr: "Courriel *"
  },
  "contact.subject": {
    en: "Subject *",
    sw: "Mada *",
    ki: "Ũhoro *",
    fr: "Sujet *"
  },
  "contact.messageHint": {
    en: "Message *",
    sw: "Ujumbe *",
    ki: "Ũhoro *",
    fr: "Message *"
  },
  "contact.success": {
    en: "Your message has been sent successfully! We will reach out shortly.",
    sw: "Ujumbe wako umetumwa kwa ufanisi! Tutawasiliana nawe hivi karibuni.",
    ki: "Ũhoro waku nĩũtũmĩtwo na wega! Andũ a ndari nĩmagũkuonera riũ hĩndĩ thutha.",
    fr: "Votre message a été envoyé avec succès ! Nous vous recontacterons sous peu."
  },
  "contact.subject.general": {
    en: "General Inquiry",
    sw: "Maswali ya Jumla",
    ki: "Mũri wa Kwarĩria",
    fr: "Renseignement Général"
  },
  "contact.subject.plants": {
    en: "Medicinal Plants Information",
    sw: "Taarifa za Mimea ya Kitiba",
    ki: "Mĩthĩga ya kĩ-ndari",
    fr: "Information sur les Plantes Médicinales"
  },
  "contact.subject.remedies": {
    en: "Traditional Remedies",
    sw: "Tiba za Asili",
    ki: "Ndawa cia Kienyeji/Tene",
    fr: "Remèdes Traditionnels"
  },
  "contact.subject.research": {
    en: "Research & Collaboration",
    sw: "Utafiti na Usafiri",
    ki: "Ũthũthũria na Ũgwatanĩro",
    fr: "Recherche & Collaboration"
  },
  "contact.subject.conservation": {
    en: "Conservation & Sustainability",
    sw: "Uhifadhi na Uendelevu",
    ki: "Ũgitĩri wa mĩtĩ na Mbeũ",
    fr: "Conservation & Durabilité"
  },
  "contact.subject.outreach": {
    en: "Community Outreach",
    sw: "Ufikiaji wa Jamii",
    ki: "Kũrĩmĩra andũ a matũũra",
    fr: "Sensibilisation Communautaire"
  },
  "contact.subject.support": {
    en: "Technical Support",
    sw: "Msaada wa Kiufundi",
    ki: "Ũteithia wa fĩndũ",
    fr: "Support Technique"
  },
  "contact.subject.advisory": {
    en: "Advisory Request",
    sw: "Ombi la Ushauri",
    ki: "Adũĩsĩ rwa Ndari",
    fr: "Demande de Conseil"
  },
  "contact.subject.other": {
    en: "Other",
    sw: "Nyingine",
    ki: "Ingĩ",
    fr: "Autre"
  },

  // Chatbot Page
  "chat.intro": {
    en: "Welcome, seeker. I am DawaBot, an AI companion designed inside the sacred spaces of Mt. Kenya and Nyandarua forests.",
    sw: "Karibu, mtafutaji. Mimi ni DawaBot, msaidizi wako wa AI niliyeundwa ndani ya maeneo matakatifu ya Mlima Kenya na misitu ya Nyandarua.",
    ki: "Ũhoro mwega. Nie nĩĩ DawaBot, mwendĩ mũgĩta nyoorũ kũrĩa mĩgũmo na mĩrima ya Kĩrĩnyaga.",
    fr: "Bienvenue, chercheur. Je suis DawaBot, un compagnon IA conçu au cœur des forêts sacrées du Mont Kenya et de Nyandarua."
  },
  "chat.warning": {
    en: "EMERGENCY CLINICAL NOTICE: Ethnobotanical data is for ecological preservation and cultural indexing. Do not substitute certified medical diagnostics.",
    sw: "ILANI YA HARAKA: Takwimu hizi ni kwa ajili ya uhifadhi wa asili na kitamaduni. Usitumie badala ya uchunguzi wa kitaaluma wa matibabu.",
    ki: "MENYA MĨHAKA YOTE: Ũgĩ ũũ wa mĩthĩga ya tene nĩ kĩũra kũbũra tũgĩtĩri na maũndũ ma mĩtũũro. Ndũgatahũthĩre handũ ha thĩbĩtarĩ ya andũ arongũ.",
    fr: "AVIS D'URGENCE : Les fichiers d'éthnobotanique sont pour la préservation écologique. Ne remplacez pas les diagnostics médicaux certifiés."
  },
  "chat.placeholder": {
    en: "Ask DawaBot (e.g. How to boil dried bark of Mũthĩga safely?)...",
    sw: "Uliza DawaBot (Mfano: Jinsi ya kuchemsha maganda ya Mũthĩga kwa usalama?)...",
    ki: "Ũria DawaBot (ta: Mũthĩga ũrũgamagwo atĩa nĩgũo ũkene andũ?)...",
    fr: "Demander à DawaBot (ex: Comment faire bouillir l'écorce de Mũthĩga en sécurité?)..."
  },
  "chat.citation": {
    en: "Botanical Database Citations",
    sw: "Marejeleo ya Mimea ya Kialunji",
    ki: "Citations cia Mĩthĩga njorũ",
    fr: "Citations de notre Registre Botanique"
  },

  // Admin Dashboard Component
  "admin.lockTitle": {
    en: "Gardens Control Portal",
    sw: "Lango la Kudhibiti Bustani",
    ki: "Kĩhĩngo kĩa Kĩbũrĩ Admin",
    fr: "Portail de Contrôle des Jardins"
  },
  "admin.lockDesc": {
    en: "Sign in below to authenticate as a registered system ethnobotanist.",
    sw: "Ingia hapa chini ili kujitambulisha kama mwana-ethnobotanist aliyesajiliwa.",
    ki: "Ingĩra gũkũ thome nĩguo ũmenyeke atĩ nĩwe mũmũgĩ wa mĩthĩga nĩ mwandĩkithie.",
    fr: "Connectez-vous ci-dessous pour vous authentifier en tant qu'ethnobotaniste enregistré."
  },
  "admin.complianceTitle": {
    en: "Opposite Striping Standards",
    sw: "Viwango vya Kuvuna upande wa Pili",
    ki: "Watho kũtũgĩra kũgongo gĩa mĩthĩga",
    fr: "Normes Éthiques de Prélèvement Opposé"
  },
  "admin.complianceText": {
    en: "A critical law is never ring-barking a tree. Removing bark around the entire radius cuts off nutrient pipelines, killing the specimen. Ethics mandate taking slices only from opposite vertical sides.",
    sw: "Sheria muhimu ni kutokata gamba nzima la mzunguko. Kukata gamba zima kunazuia virutubishi na kuua mti. Maadili yanataka uvunaji wa upande kwa upande wa wima tu.",
    ki: "Watho nĩ gũtinia ruthumo herĩ matiganĩte kũgonda rũgendo. Ndũgataruthe mũthĩga gũthiũrũrũka moko mothe nĩgũo wa tei ndũgakorwo nĩgũkua. Tĩnia herĩ na rũgendo mbera na thutha.",
    fr: "Une règle critique est de ne jamais cercler un arbre. Retirer l'écorce sur tout le diamètre coupe les nutriments et tue le spécimen. L'éthique exige des incisions verticales."
  },
  "admin.totalChats": {
    en: "Bot Sessions",
    sw: "Vikao vya DawaBot",
    ki: "Mũceera wa DawaBot",
    fr: "Sessions DawaBot"
  },
  "admin.unreadMail": {
    en: "Unread Mail",
    sw: "Barua Pepe Hazijasomwa",
    ki: "Mbarũthi matathomwo",
    fr: "Courriels Non Lus"
  },
  "admin.remedies": {
    en: "Treatises Indexed",
    sw: "Maandiko Yaliyosasishwa",
    ki: "Mabuku nĩ mwandĩke wega",
    fr: "Traités Indexés"
  },
  "admin.floraSpecies": {
    en: "Flora Species",
    sw: "Aina ya Mimea",
    ki: "Mĩthemba ya Mĩthĩga",
    fr: "Espèces de Flore"
  }
};

// MULTILINGUAL DATABASE FOR DYNAMIC OBJECTS
const HERB_TRANSLATIONS: Record<string, Partial<Record<Language, Partial<Herb>>>> = {
  "1": {
    sw: {
      partUsed: "Gamba la Ndani, Majani",
      description: "Mti wa msitu wa kijani kibichi unaopatikana katika maeneo ya nyanda za juu za Afrika Mashariki. Una harufu nzuri sana na ladha ya pilipili.",
      preparation: "Chemsha vipande vilivyokaushwa vya gamba kwenye maji au maziwa kwa dakika 30 ili kupata mchanganyiko mzuri. Au, saga gamba kuwa unga na uchanganye na maji moto au asali.",
      medicinalUses: [
        "Inatuliza kikohozi kikavu na kile chenye kohozi",
        "Inapunguza maumivu ya kifua na mafua",
        "Inatumika kama matibabu ya asili ya malaria na homa",
        "Inatuliza maumivu ya tumbo na matatizo ya umeng'enyaji",
        "Ina uwezo mkubwa wa kupambana na bakteria na fangasi"
      ],
      traditionalContext: "Moja ya miti mitakatifu na inayoheshimika zaidi katika utamaduni wa Gĩkũyũ na Afrika Mashariki. Joto lake la pilipili linaaminika 'kuchoma kabisa' magonjwa ya kifua.",
      precautions: "Ina nguvu sana. Epuka kutumia ukiwa na njaa. Haipendekezwi kwa wanawake wajawazito. Kunywa kikombe 1 mara mbili kwa siku."
    },
    ki: {
      partUsed: "Gĩcunjĩ kĩa thĩnĩ kĩa mbaraka, matũ",
      description: "Mũtĩ mũnene wa mĩrima ya Kĩrĩnyaga na Nyandarũa. Witagwo tondũ nĩũrĩ na rũrĩrĩ rũkũrũ ta rwa ngano.",
      preparation: "Boili rũthumo rũũmũ rwa rũgendo thĩnĩ wa mĩeri kana iria gwa thigĩrĩ rĩa nusu thaa. Kinya unga na ũrehe na kĩasali kĩa rũũgĩ matũũra.",
      medicinalUses: [
        "Kũniina rũkora rũũmũ thĩnĩ kĩa nyondo",
        "Kũhoreria rũkoro na maũndũ ma rũhuugĩ kĩa nyindo",
        "Kũgitĩra andũ mĩrimu ya malaria thondu",
        "Kũniina mĩrimu ya thĩnĩ kĩa nda",
        "Ĩrĩ na hinya mũnene wa kũniina tũbakteria"
      ],
      traditionalContext: "Kĩmwe kĩrĩa kĩĩ kĩheo na gũtũgĩra mũno thĩnĩ thome matũũra ma mĩthĩga ya Gĩkũyũ. Hinya wa rũrĩrĩ rwa ngano nĩũrakorwo nĩkũniina rũhuhu na tũmbeũ tũũru.",
      precautions: "Ĩrĩ na hinya mũno. Ndũgathĩnyũkie nda tũhũ ũtarĩte kĩndũ. Mwĩrĩgĩrĩro nĩ rweheretio andũ-a-nja arĩ tondũ no ĩniine kahinda. Nyua gĩkombe kĩrĩ gĩa mũthenya."
    },
    fr: {
      partUsed: "Écorce Interne, Feuilles",
      description: "Un arbre forestier majestueux des hauts plateaux d'Afrique de l'Est. Très aromatique, caractérisé par un goût piquant de poivre.",
      preparation: "Faites bouillir l'écorce séchée dans de l'eau ou du lait pendant 30 minutes pour une décoction forte. Sinon, consommer sous forme de poudre avec du miel.",
      medicinalUses: [
        "Soulage les toux sèches et grasses",
        "Calme les douleurs thoraciques et la congestion respiratoire",
        "Traitement traditionnel du paludisme et fièvres récurrentes",
        "Calme les maux d'estomac et les troubles digestifs",
        "Possède de fortes propriétés antimicrobiennes et antibactériennes"
      ],
      traditionalContext: "L'un des arbres médicinaux les plus sacrés de la culture Gĩkũyũ. Sa chaleur poivrée est censée 'brûler' les impuretés respiratoires.",
      precautions: "Extrêmement fort. Éviter de prendre à jeun. Déconseillé aux femmes enceintes. Limiter à un verre deux fois par jour."
    }
  },
  "2": {
    sw: {
      partUsed: "Mizizi, Juisi ya Matunda",
      description: "Kichaka chenye miiba na machungu kinachoenea sana nchini Kenya, kinachotambulika kwa matunda madogo ya manjano na maua ya zambarau.",
      preparation: "Chemsha mizizi iliyokatwa kuponya maumivu ya tumbo. Kwa maumivu ya meno, osha na utafune mzizi asili (tembe mate, usimeze). Paka juisi ya matunda kwenye maambukizi ya ngozi.",
      medicinalUses: [
        "Inatuliza maumivu makali ya meno na uvimbe wa fizi",
        "Inatuliza maumivu makali ya tumbo na kiungulia",
        "Inasafisha fangasi za ngozi kama vile mapunye (juisi hupakwa ngozini)",
        "Inatumika kama dawa ya dharura ya sumu ya nyoka (mizizi iliyopondwa)"
      ],
      traditionalContext: "Mũtongu ni kiungo kikuu katika huduma ya kwanza ya binadamu na mifugo katika utamaduni wa Kikuyu. Matunda yake yana sumu kali na hayatakiwi kuliwa.",
      precautions: "Matunda ni SUMU kali mukimeza. Matumizi ya ngozi yafanyike kwa tahadhari isiyogusa macho au vidonda. Watoto wasichezee."
    },
    ki: {
      partUsed: "Mĩri, tũtunda tũmbuũ",
      description: "Kamũtĩ ka mĩĩwa andũ gothe Kenya kũgĩmĩka tondũ kũrĩ na tũtunda tũmbuũ tũtumbũri na thaa cĩa rangi mĩerĩ tũnyito.",
      preparation: "Boili mĩri ya kũhoreria maũndũ ma nda gĩkũo rĩera. Thome maũndũ ma igego, thamba na ũtanĩkie mĩri igegoĩno (Tema mathie, ndũgamilie thĩnĩ). Paka gĩko kĩa tũtunda igũrũ rĩa ngo.",
      medicinalUses: [
        "Kũniina maũndũ ma igego nĩ rwarwĩte",
        "Kũniina maũndũ ma nda mĩgũngo mĩnene",
        "Kũgĩtĩra ngo mĩrimu ya mthembĩ (fungal infections)",
        "Kũhũthagĩra ta dawa ya kũniina sumu ya nyoka hĩndĩĩno"
      ],
      traditionalContext: "Mũtongu nĩ kĩndũ kĩa kawaida mũno thome mbere ya mĩtũũro ya Gĩkũyũ. Tũtunda tũrĩ rũlũ mũno na ndwarũmĩrie ta kĩndũ kĩa kũrĩa.",
      precautions: "Tũtunda tũu tũrĩ na SUMU ndũgamilie hĩndĩĩno. Hũgatha gĩko kĩa tũtunda na andũ ameno matagũthĩkĩria rĩitho. Ciana itige gũcheera gũkũ."
    },
    fr: {
      partUsed: "Racines, Jus des Fruits",
      description: "Un arbuste épineux et très amer répandu au Kenya, reconnu à ses petits fruits sphériques jaunes et flowers violettes.",
      preparation: "Faites bouillir les racines pour les maux d'estomac. Pour les maux de dents, mâcher la racine sur l'endroit endolori (cracher, ne pas avaler).",
      medicinalUses: [
        "Soulage les rages de dents sévères et l'enflure des gencives",
        "Soulage les douleurs abdominales intenses et l'indigestion",
        "Élimine les infections de la peau comme la teigne ou la gale",
        "Antidote traditionnel pour les morsures de serpent (racines broyées)"
      ],
      traditionalContext: "Communément utilisé en soins d'urgence vétérinaires et humains. Les fruits jaunes sont connus pour leur amertume extrême et ne sont jamais consommés.",
      precautions: "Les fruits jaunes sont extrêmement TOXIQUES si avalés. Application cutanée externe uniquement—éviter tout contact oculaire."
    }
  },
  "3": {
    sw: {
      partUsed: "Majani, Gamba la Mti",
      description: "Mti wa kisasa wa kijani kibichi wenye shina laini unaopatikana katika misitu ya highland na nyanja za juu nchini Kenya.",
      preparation: "Chemsha majani mapya au gamba kwa dakika 40. Kunywa chai nyepesi ikiwa ya joto. Kwa maumivu ya viungo, loweka vitambaa katika chai moto na ukandamize sehemu inayouma.",
      medicinalUses: [
        "Inatuliza maumivu ya viungo, baridi yabisi na arthritis",
        "Inapunguza maumivu ya mgongo na uchovu wa mwili",
        "Inasaidia kuondoa homa kali na kutuliza malaria",
        "Inatibu kukaza kwa misuli ya mwili na magoti"
      ],
      traditionalContext: "Inajulikana kijadi kama mponyaji wa misuli. Wapiganaji wa Kikuyu waliokuwa wakirejea kutoka safari ndefu walisafisha miili yao na maji ya Mũnderendu.",
      precautions: "Ni salama lakini inashauriwa kwa watu wazima pekee. Tumia kwa wiki moja asilia."
    },
    ki: {
      partUsed: "Matũ, Ruthumo rwa mũtĩ",
      description: "Mũtĩ mwega wa mĩrĩma ũgĩmĩka tondũ kũrĩ na gĩcigo kĩa mĩeri mĩgandĩ Kenya.",
      preparation: "Boili ruthumo kana matũ rũgandĩ-inĩ gwa thigĩrĩ rĩa dakika 40 nĩguo tea ĩgĩthe wega. Nyua rĩrĩ rĩhiũ rĩcigo kĩa mwĩrĩ harware.",
      medicinalUses: [
        "Kũniina mĩrimu ya maũndũ ma rũhuu gĩa mĩgandĩ",
        "Kũhoreria andũ muthea na mathĩnyĩ ma gũkũra",
        "Kũgitĩra andũ mĩrimu ya malaria thondu",
        "Kũhoreria gĩko kĩa misuli na moko kwarwara"
      ],
      traditionalContext: " warriors arĩa maumaga wĩra-inĩ nĩmathambaga na mĩnderendu nĩguo maumĩrũo mĩrũgĩ na makoorũ.",
      precautions: "Mũthĩga mwega andũ mothe, no ũratũmĩrũo nĩ andũ agĩmũ tu. Tiga kũnyua thutha wa wiki ĩmwe."
    },
    fr: {
      partUsed: "Feuilles, Écorce",
      description: "Arbre indigène à écorce lisse des forêts d'altitude du Kenya, pouvant atteindre 15 mètres.",
      preparation: "Faire bouillir l'écorce ou les feuilles fraîches pendant 40 minutes. Boire le thé tiède. Appliquer des compresses chaudes sur les articulations.",
      medicinalUses: [
        "Soulage les douleurs articulaires, l'arthrose et les rhumatismes",
        "Calme le mal de dos chronique et la fatigue physique",
        "Réduit les fortes fièvres et atténue les frissons de malaria",
        "Détend les tensions musculaires et la raideur corporelle"
      ],
      traditionalContext: "Considéré traditionnellement comme un restaurateur musculaire. Les guerriers Gĩkũyũ prenaient des bains de Mũnderendu pour soigner leurs blessures.",
      precautions: "Généralement sûr, réservé aux adultes. Limiter l'utilisation à une semaine consécutive."
    }
  },
  "4": {
    sw: {
      partUsed: "Gamba lenye Rangi ya Kahawia-Nyekundu",
      description: "Mti mrefu na mzuri wa misitu ya milimani, wenye majani ya kijani kibichi na gamba linalotoa harufu ya kipekee ya lozi chungu unapokatwa.",
      preparation: "Saga na ukaushe gamba. Chemsha kiasi kidogo cha gamba katika lita 1 ya maji kwa dakika 45 hadi chai iwe nyekundu nzito. Kunywa kikombe 1 asubuhi na kikombe 1 usiku.",
      medicinalUses: [
        "Husaidia tezi dume, matatizo ya mkojo na kuzuia maumivu ya kibofu",
        "Hulainisha mkojo mgumu, na upunguzaji kibofu kilichovimba",
        "Inatibu homa za ndani, kubana kwa kifua na figo zilizochoka"
      ],
      traditionalContext: "Mti unaheshimiwa sana kimataifa na hutumika katika dawa za kisasa za tezi dume. Uhifadhi uwe wa kuratibiwa upande kwa upande tu.",
      precautions: "Dalili za tezi dume zinahitaji usajili wa daktari. Uvunaji lazima uwe wa mistari ya wima ili mti usikufe."
    },
    ki: {
      partUsed: "Gĩcunjĩ kĩa Rangi ya Gĩkaonũ kĩa Rũthumo",
      description: "Mũtĩ mũrahu mũgĩ wa matũũra mĩrima, matũ matune andũ wega na ruthumo rwa rangi ta kahawia rũrĩ na rũrĩrĩ rwa almond rwa machungu.",
      preparation: "Thamba na ũũmisie ruthumo rũu. Boili rũthumo rũthĩ thĩnĩ kĩa rĩta rĩa rũũgĩ gwa thigĩrĩ rĩa dakika mĩrongo ĩna na ĩtano nĩguo mĩeri njorũ ĩgĩkorwo nĩndune. Nyua kĩkombe kĩrogorĩrĩ rũũgĩ na kĩrogorĩrĩ hwaĩ-ĩnĩ.",
      medicinalUses: [
        "Kũgitĩra mĩrimu ya Prostate kũrĩ andũ a gũkũra kĩ-mũthenya",
        "Kũhoreria andũ arĩa mĩgĩ matagũkarũra mĩari wega",
        "Kũniina homa cia thĩnĩ na mĩrũgĩ ya thĩnĩ kĩa thigo"
      ],
      traditionalContext: "Mũtĩ ũratũgĩrũo thĩnĩ thome matũũra mothe nĩguo mĩeri mĩgi ĩgitĩrũo mthembĩ.",
      precautions: "Mĩrimũ ya Prostate nĩ nene na roratũmĩgĩra thĩbĩtarĩ. Tĩnia herĩ rũgendo mbera na thutha nĩguo kũgĩtĩra mũtĩ."
    },
    fr: {
      partUsed: "Écorce Brun-Rouge",
      description: "Un grand et bel arbre des forêts de montagne, avec une écorce rugueuse qui dégage une odeur caractéristique d'amande amère.",
      preparation: "Sécher et hacher l'écorce. Faire bouillir une poignée dans 1 litre d'eau pendant 45 minutes jusqu'à coloration rouge foncé. Boire 1 tasse matin et soir.",
      medicinalUses: [
        "Soulage les symptômes urinaires de l'hypertrophie bénigne de la prostate",
        "Améliore l'écoulement urinaire et réduit l'inflammation de la vessie",
        "Traite les fièvres internes et la fatigue rénale chronique"
      ],
      traditionalContext: "Très respecté tant en médecine traditionnelle que moderne. Historiquement utilisé par les anciens Kikuyu. Espèce aujourd'hui protégée.",
      precautions: "Les troubles prostatiques nécessitent un avis médical d'urgence. Récolte verticale stricte obligatoire pour éviter de faire mourir l'arbre."
    }
  },
  "5": {
    sw: {
      partUsed: "Majani, Chipukizi la Majani, Shina Laini",
      description: "Kichaka chenye majani mengi machungu kinachoenea kando ya misitu, mashamba yaliyotelekezwa na kando ya mito Kenya ya kati.",
      preparation: "Kamua majani mabichi kwenye maji baridi, chuja na unywe juisi hiyo chungu sana, au chemsha majani yaliyokaushwa kuandaa chai. Inaweza kuongezwa asali ya nyuki.",
      medicinalUses: [
        "Inatibu homa za malaria na maumivu makali ya kichwa",
        "Inafukuza na kuua minyoo yote ya tumbo",
        "Inatuliza tumbo kuvurugika, gesi, na kujaa kwa tumbo",
        "Inaleta hamu ya kula na kusafisha utumbo"
      ],
      traditionalContext: "Inajulikana kama 'kliniki ya nyuma ya nyumba'. Ladha yake kali imekuwa alama ya kujaribu ujasiri wa watoto wanapopewa dawa na bibi zao.",
      precautions: "Ni chungu sana, inaweza kuleta kichefuchefu kibaya kwa muda mfupi. Salama kwa watoto waliozidi miaka 5."
    },
    ki: {
      partUsed: "Matũ, tũtunda tũnyinyi",
      description: "Kamũtĩ ka matũ marũlũ kũgĩmĩka tondũ kũrĩ na rũrĩrĩ rũrũrũ mĩrima-inĩ ya Kenya.",
      preparation: "Thamba na ũgĩmĩke matũ macio thĩnĩ wa rũũgĩ kĩasari kĩa mĩyeri njorũ, thutha unywe gĩko kĩu kĩrũlũ.",
      medicinalUses: [
        "Kũniina mĩgũngo ya malaria na andũ muthea",
        "Kũniina njoka thĩnĩ kĩa nda wega o rĩmwe",
        "Kũhoreria nda kwarwara, mboro na mathĩnyĩ ma gas",
        "Kũrehe hamu ya kũrĩa na gũtherũkia nda"
      ],
      traditionalContext: "Kamũtĩ kĩa kũhonokia nda na andũ matũũra mamera. Ciana nĩ ciagĩte hinya wa rũrĩrĩ macio makora.",
      precautions: "Ĩrĩ rũlũ mũno, rĩrĩa kũnyua no ĩrehe gĩko kĩa gũtahia kahinda. Ciana cia miaka 5 na igũrũ no cinye nusu yake."
    },
    fr: {
      partUsed: "Feuilles, Bourgeons, Tiges Tendres",
      description: "Un arbuste feuillu très amer commun le long des lisières forestières et des cours d'eau du Kenya central.",
      preparation: "Presser des feuilles fraîches dans de l'eau froide, filtrer pour boire le jus amer, ou faire bouillir les feuilles. Sucrer avec du miel sauvage.",
      medicinalUses: [
        "Soulage rapidement les maux de tête et courbatures du paludisme",
        "Élimine les parasites intestinaux et vers ronds",
        "Calme les crampes d'estomac, ballonnements et gaz intestinaux",
        "Stimule l'appétit et agit comme dépuratif intestinal léger"
      ],
      traditionalContext: "Une pharmacie naturelle de jardin. Son amertume légendaire servait de test de courage pour les enfants lorsque les grands-mères leur administraient du Mũcatha.",
      precautions: "Extrêmement amer, peut provoquer des nausées passagères chez les personnes sensibles. Portion divisée par deux pour les plus de 5 ans."
    }
  },
  "6": {
    sw: {
      partUsed: "Majani, Maua ya Manjano ya Dhahabu",
      description: "Kichaka chenye maua ya manjano ya kuvutia na majani yanayotoa harufu ya siagi ya karanga au popcorn yakiguswa.",
      preparation: "Ponda majani mabichi pamoja na maji au mafuta ya mnyonyo kutengeneza marhamu. Paka kwenye maeneo ya ugonjwa wa ngozi kwa dakika 25 kisha unawe.",
      medicinalUses: [
        "Inaponya mapunye, wadudu wa miguuni (athlete's foot) na upele",
        "Inasafisha mabaka ya ngozi, chunusi na eczema kavu",
        "Kijadi ilitumiwa kama dawa ya dharura ya kufungua choo kikavu"
      ],
      traditionalContext: "Inaheshimiwa kwa uwezo wake wa haraka wa kuua vimelea vya ngozi. Pia hutumiwa na wafugaji kusafisha vibuyu vya maziwa.",
      precautions: "Ni dawa kali sana ya kuendesha ukinywa. USINYWE bila ushauri thabiti wa mtaalamu wa asili."
    },
    ki: {
      partUsed: "Matũ, thaa cia mĩeri",
      description: "Kamũtĩ ka thaa cia rangi mĩerĩ kũgĩmĩka harĩa kũrĩ na rũrĩrĩ rwa popcorn mũno.",
      preparation: "Munda matũ na ũpake igũrũ rĩa ngo harwaratũ mũthenya nyoorũ dakika 25, thutha ũthambe wega.",
      medicinalUses: [
        "Kũniina mĩrimu ya ngo kĩa fungal na scabies",
        "Kũrehe ũtheru wa ngo, acne na eczema njorũ",
        "Kũhũthagĩra kũhinga njoka kĩa hinya mũno mundũ matũ"
      ],
      traditionalContext: "Kamũtĩ ka kũgĩtĩra ngo mthembĩ yothe mĩrimũ. Jamii nĩihũthagĩra gũtherũkia andũ methĩĩ.",
      precautions: "Dawa ya hinya mũno ya kũhingũra njoka kũnyua. Ndũgamilie kũnyua tũhũ ũtarĩ watho wa andũ a tene."
    },
    fr: {
      partUsed: "Feuilles, Fleurs Jaunes",
      description: "Arbuste aux fleurs jaunes dorées et feuilles parfumées rappelant le pop-corn ou le beurre de cacahuète.",
      preparation: "Écraser les feuilles fraîches pour faire un cataplasme avec un peu d'huile de ricin. Appliquer sur la peau infectée pendant 25 minutes puis rincer.",
      medicinalUses: [
        "Traite la teigne, le pied d'athlète et la gale en application locale",
        "Nettoie l'acné, les imperfections cutanées et l'eczéma sec",
        "Prescrit historiquement pour traiter la constipation sévère (laxatif)"
      ],
      traditionalContext: "Vénéré pour sa rapidité d'action contre les maladies cutanées. Également utilisé pour assainir les calebasses de lait.",
      precautions: "Laxatif extrêmement puissant par ingestion. Éviter d'insérer du thé de feuilles sans encadrement."
    }
  },
  "7": {
    sw: {
      partUsed: "Gamba la mti, Mafuta ya Mbegu",
      description: "Mti mzuri sana wa kivuli kando ya mito, wenye majani ya kijani kibichi na mbegu zenye mafuta mengi mekundu na meusi.",
      preparation: "Loweka vipande vya gamba kwenye maji moto kutayarisha dawa ya kuosha vidonda. Kamua mafuta kutoka kwenye mbegu kavu na paka kwenye ngozi ya kichwa au vidonda.",
      medicinalUses: [
        "Inachochea kutapika ili kutoa sumu mwilini au kuzuia sumu ya dharura",
        "Inatuliza ngozi kavu inayowasha, mba na ukavu wa ngozi ya kichwa",
        "Inatibu magonjwa ya minyoo na flukes wa damu",
        "Inaharakisha uponyaji wa vidonda vilivyo wazi vinavyochelewa kukauka"
      ],
      traditionalContext: "Inajulikana kama 'Emetic Mahogany'. Gamba lake huvunwa kwa umakini mkubwa na kuhifadhiwa nyumbani kwa matibabu ya dharura ya watoto waliomeza sumu.",
      precautions: "Itasababisha kutapika haraka ikitumiwa kwa unywaji wa kiwango kikubwa. Fuatilia kwa makini."
    },
    ki: {
      partUsed: "Rũthumo, mbegu ya mĩgũmo",
      description: "Mũtĩ mwega wa gĩcigo kĩa rũũĩ, kũrĩ na matũ mĩerĩ wega na mbeũ mĩgũgũ.",
      preparation: "Boili ruthumo nĩguo ũthambe handũ hararwara. Karũra mbegu nĩguo ũpake ngoĩ-inĩ na mĩgŨmo kĩa igũrũ.",
      medicinalUses: [
        "Kũrehe gutahia nĩguo sumu yume thĩnĩ andũ kũmeza",
        "Kũniina mĩrimu ya gĩko kya muthea, dandruff na ngo kũmũra",
        "Kũgitĩra mĩrimu ya njoka cia thĩnĩ thome matũũra",
        "Kũhonokia ng’ondo na mbeũ ciothe kĩa ngo o rĩmwe"
      ],
      traditionalContext: "Mũtĩ wa kũruta sumu andũ nja andũ arĩa marũmĩrũo nĩ mbeũ njũru mĩtũũro-inĩ.",
      precautions: "Ĩrĩ na hinya wa kũrehe gutahia o rĩmwe kũnyua mthembĩ ndũgapororũo tũhũ."
    },
    fr: {
      partUsed: "Écorce, Huile des Graines",
      description: "Un bel arbre d'ombrage persistant poussant le long des lits de rivières, aux graines noires et rouges riches en huile.",
      preparation: "Infuser l'écorce dans l'eau chaude pour un lavage dépuratif. Extraire l'huile des graines sèches et masser sur la peau affectée.",
      medicinalUses: [
        "Induit le vomissement pour purger les substances toxiques avalées",
        "Soulage les dermatites, les démangeaisons du cuir chevelu et pellicules",
        "Traitement complémentaire pour la bilharziose et vers intestinaux",
        "Accélère significativement la cicatrisation des plaies ouvertes"
      ],
      traditionalContext: "Surnommé l'Acajou éméthique. L'écorce est prélevée prudemment et conservée pour secourir les enfants intoxiqués accidentellement.",
      precautions: "Puissant effet éméthique—provoquera des vomissements immédiats en cas d'ingestion. Surveiller les doses."
    }
  },
  "8": {
    sw: {
      partUsed: "Utomvu wa Maziwa Mweupe, Gamba la Ndani",
      description: "Mti mkubwa mtakatifu wenye mizizi ya asili inayoshuka chini, unaochukuliwa kama kichaka kitakatifu na hekalu asilia.",
      preparation: "Kusanya utomvu mweupe moja kwa moja na upake kwenye vidonda vilivyo wazi ili kuzuia damu. Chemsha gamba la ndani kupata chai tamu ya koo.",
      medicinalUses: [
        "Inazuia damu kutoka kwenye vidonda na majeraha karibu mara moja",
        "Inatuliza koo lenye maumivu makali, bronchitis na kikohozi cha baridi",
        "Inawaongezea nguvu wagonjwa wanaopata nafuu baada ya upasuaji au homa kali",
        "Inatuliza tumbo kuhara na kuvurugika kwa utumbo"
      ],
      traditionalContext: "Mti mkuu na mtakatifu zaidi katika jamii ya Gĩkũyũ. Ilikuwa tabu kukata au kuvunja hata jani la Mũgũmo. Matumizi yake yanaambatana na maombi ya asili.",
      precautions: "Uvunaji uwe mdogo sana na usafi wa kiwango cha juu. Mti huu unalindwa kiroho na kiutamaduni."
    },
    ki: {
      partUsed: "Gĩko kĩa iria, rũthumo kĩa thĩnĩ",
      description: "Mũtĩ mũnene wa thome ya Gĩkũyũ. Kĩĩgĩĩ kĩheo na andũ a Ndari.",
      preparation: "Thamba na ũtanĩkie gĩko kĩa iria handũ hararwara kĩgĩta damu kũũra. Boili rũthumo kĩa rũũgĩ kĩa nda kĩasali.",
      medicinalUses: [
        "Kũgĩta damu handũ hatiregwo o rĩmwe arĩa kũgunda",
        "Kũhoreria andũ arwaru rũkoro kĩa nda, bronchitis",
        "Kũrehe hinya kũrĩ andũ arwaru gukena na kũũra kĩ-mũthenya",
        "Kũrindĩria mĩgandĩ nja kũhingũra njoka"
      ],
      traditionalContext: "Mũtĩ mũtheru gwi kũgana kĩa andũ a Gĩkũyũ. Gũtĩ kĩsubi gĩa gũgocwo gũtinia mũgũmo tũhũ mthembĩ.",
      precautions: "Mũthĩga mũgi wa andũ no ũrangĩrago wega nĩguo kũrindĩria mĩeri matũũra cano."
    },
    fr: {
      partUsed: "Latex Blanc, Écorce Interne",
      description: "Un figuier étrangleur géant et sacré, vénéré dans les traditions avec de vastes racines aériennes retombant au sol.",
      preparation: "Recueillir le latex blanc fraîchement extrait de l'écorce et appliquer sur les coupures. Faire bouillir l'écorce interne pour un thé doux.",
      medicinalUses: [
        "Agit comme hémostatique rapide pour freiner le saignement des plaies",
        "Soulage les maux de gorge aigus, pharyngites et toux sèches",
        "Soutient la convalescence après une maladie sévère ou opération",
        "Stabilise le transit en cas de diarrhées légères"
      ],
      traditionalContext: "Le sommet de la spiritualité et du sacré dans la culture Kikuyu. Il était interdit de couper ou d'élaguer un Mũgũmo. Son usage médical se fait avec révérence.",
      precautions: "Prélèvement minimal avec outils hygiéniques exigé. Arbre protégé par les coutumes."
    }
  },
  "9": {
    sw: {
      partUsed: "Matunda Makavu ya Pinki, Shina",
      description: "Kichaka kidogo chenye matawi mengi, majani madogo magumu na matunda ya pinki yanayofanana na pilipili manga.",
      preparation: "Kausha na usage matunda madogo kuwa unga. Changanya kijiko kimoja cha unga kwenye uji mnyororo asubuhi kabla ya kula chochote.",
      medicinalUses: [
        "Kichocheo kikubwa na bora cha kuondoa minyoo ya tumbo (tapeworms/hookworms)",
        "Inatuliza maumivu ya kifua, pumu, na spasms za koo",
        "Inasafisha na kuboresha maziwa ya mama baada ya kuzaa"
      ],
      traditionalContext: "Dawa kuu na maarufu ya Kikuyu ya minyoo. Kijadi, hata kabla ya wanyama kuchinjwa, wakata nyama walikunywa chai ya matunda ya Mũrega kujikinga.",
      precautions: "Ina nguvu kubwa ya kuua minyoo. USITUMIE mfululizo kwa zaidi ya siku 3. Inaweza kuleta sauti tumboni minyoo inapotoka."
    },
    ki: {
      partUsed: "Matunda ma rangi ta pinki, mĩgũgũ",
      description: "Kamũtĩ ka matũ makonu mĩrĩma-inĩ karĩ na tũtunda ta andũ ngano.",
      preparation: "Thamba na ũgĩmĩke tũtunda tũu na ũkaranĩrie thĩnĩ kĩa ũcũrũ andũ kũnyua rũũgĩĩ-inĩ andũ a gũkũra.",
      medicinalUses: [
        "Dawa nene ya kũniina njoka thĩnĩ kĩa nda (Tapeworms na hookworms)",
        "Kũhoreria rũkoro rũũru, maũndũ ma pumu na spasms nda",
        "Kũrehe ũtheru andũ nja maziwa-inĩ thutha kũcĩarũo mthembĩ"
      ],
      traditionalContext: "Dawa nene ya Kikuyu ya kũniina njoka mĩtũũro-inĩ. warriors nĩihũthagĩra njorũ.",
      precautions: "Mbeũ njorũ cia hinya mũno, gũtĩ kũnyua makiri mĩthenya ĩtatũ, rũgendo njorũ."
    },
    fr: {
      partUsed: "Baies Séchées, Tiges",
      description: "Petit arbuste ramifié à petites feuilles coriaces et grappes de baies rose-rougeâtre ressemblant à des grains de poivre.",
      preparation: "Chauffer, sécher et réduire en poudre les baies. Mélanger 1 cuillère à café dans de la bouillie ou de l'eau tiède, à consommer à jeun.",
      medicinalUses: [
        "Le vermifuge traditionnel de référence contre les ténias et ankylostomes",
        "Atténue les maux de poitrine intenses, crises d'asthme et spasmes",
        "Purifie les conduits lactés des accouchées pour l'allaitement"
      ],
      traditionalContext: "Le vermifuge Kikuyu par excellence. Les bouchers faisaient bouillir les baies de Mũrega par prévention.",
      precautions: "Fortes propriétés vermifuges. Limiter l'utilisation à 3 jours de suite. Peut causer des gargouillis d'expulsion sains."
    }
  },
  "10": {
    sw: {
      partUsed: "Gamba lenye Miiba, Mbegu za Harufu ya Citrus",
      description: "Mti wa miiba unaopoteza majani wakati wa kiangazi, wenye magoti kwenye shina na mbegu zenye harufu ya limao na tangawizi yakipondwa.",
      preparation: "Chemsha gamba la shina kwenye maji kutibu homa na maumivu ya mwili. Tafuna mbegu kavu ili kusafisha pumzi, na koo linalowasha.",
      medicinalUses: [
        "Inatuliza pumu makali ya bronchial, mafua, na kikohozi kikavu",
        "Inapunguza insha zenye maumivu ya hemoglobin / sickle-cell anemia",
        "Inatibu homa za malaria, headache na baridi ya mwili",
        "Inatibu maumivu ya jino na vidonda vya koo"
      ],
      traditionalContext: "Mbegu zake zina mafuta asilia yenye kufanya nusu-anesthesia. Wasafiri walitafuna mbegu hizi ili kuondoa kiu.",
      precautions: "Ina harufu kali, inasababisha mwili kutoa jasho ili kuvunja homa. Haipendekezwi kwa watoto walio chini ya miaka 3."
    },
    ki: {
      partUsed: "Ruthumo rwa mĩĩwa, mbeũ njorũ",
      description: "Mũtĩ mũnene wa mĩĩwa na mbegu njorũ cĩa rũrĩrĩ rwa lemoni.",
      preparation: "Boili ruthumo rũu nĩguo ũniine thomu na mathĩnyĩ ma mwĩrĩ. Tanĩkia mbeũ handũ ha igego na kũniina rũhuungĩ.",
      medicinalUses: [
        "Kũniina mĩrimu ya pumu na rũhuungĩ nyinyi kĩa nyondo",
        "Kũhoreria mĩgũngo ya Sickle-cell anemia na maũndũ ma mĩthĩ",
        "Kũniina thomu ya malaria na mbeũ ciothe kĩa mwĩrĩ andũ kwarwara",
        "Kũhoreria igego rĩr warite na tonsils zilizovimba"
      ],
      traditionalContext: "Mbeũ ciake nĩicokanagĩrio nĩguo kũrehe ũtheru andũ mĩtũũro kĨrĨnya.",
      precautions: "Ĩrĩ na rũrĩrĩ rwa lemoni, ĩrĩa kũnyua no gũtũme mwĩrĩ ũrutwo rũera, ciana kũrĩ miaka 3 ndũgacinye."
    },
    fr: {
      partUsed: "Écorce Épineuse, Graines Aromatiques",
      description: "Arbre épineux à feuilles caduques avec des excroissances sur le tronc et graines dégageant un parfum de citron-gingembre.",
      preparation: "Faire bouillir l'écorce dans l'eau contre la fièvre. Mâcher les capsules de graines pour rafraîchir l'haleine ou calmer le mal de dents.",
      medicinalUses: [
        "Soulage l'asthme bronchique, le sifflement et la toux sèche",
        "Apaise les crises de drépanocytose et les graves maux d'articulations",
        "Traite les fièvres du paludisme, frissons et céphalées",
        "Atténue les douleurs de caries dentaires et l'inflammation des amygdales"
      ],
      traditionalContext: "Les graines contiennent des agents anesthésiques naturels. Les voyageurs les mâchaient pour résister à la soif et purifier l'eau.",
      precautions: "Très aromatique, provoque des sueurs pour casser la fièvre. Éviter d'administrer aux nourrissons de moins de 3 ans."
    }
  }
};

const REMEDY_TRANSLATIONS: Record<string, Partial<Record<Language, Partial<TraditionalRemedy>>>> = {
  "r1": {
    sw: {
      title: "Mchanganyiko wa Pilipili wa Kutuliza Kikohozi",
      category: "Mfumo wa Kupumua",
      symptoms: ["Kukohoa kukavu", "Kifua kubana", "Koo kuwasha na kuuma", "Kikohozi kikali cha homa"],
      steps: [
        "Chemsha vipande vilivyokaushwa vya gamba la MŨTHĨGA kwenye vikombe 2 vya maziwa au maji kwa dakika 25.",
        "Acha mchanganyiko upoe kidogo. Chai itakuwa na harufu nzuri na ladha ya viungo.",
        "Changanya kijiko kimoja cha asali ya nyuki ili kulainisha ladha kali.",
        "Kunywa polepole kwa dakika 15 ili kulegeza kohozi kifuani."
      ],
      dose: "Kikombe 1, mara mbili kwa siku (asubuhi na jioni kabla ya kulala) kwa siku 3-5."
    },
    ki: {
      title: "Ũhoreri wa Kũkoro rwa rũrĩrĩ rwa ngano",
      category: "Mũthemba wa Ngoro na rera",
      symptoms: ["Kũkoro rũũmũ", "Kũhinga rera", "Sore burning throat", "Hacking cold"],
      steps: [
        "Boili rũthumo rũũmũ rwa MŨTHĨGA gwa thigĩrĩ rĩa maziwa kana rũũgĩ gwa thigĩrĩ rĩa dakika 25.",
        "Tiga tea ĩhorere kahora nĩgũo ũgĩ ũmamenye.",
        "Kinya kĩasali kĩa rũũgĩ nĩguo rũrĩrĩ rũhorere wega.",
        "Nyua kahora kahora nĩgũo rũhuungĩ rũhorere wega nyorũ kĩa nyondo."
      ],
      dose: "Kĩkombe kĩmwe rũũgĩ na hwaĩ-ĩnĩ gwa mĩthenya ĩtatũ na ĩtano."
    },
    fr: {
      title: "Soulagement Poivré contre la Toux Sèche",
      category: "Système Respiratoire",
      symptoms: ["Toux sèche", "Congestion de la poitrine", "Sore burning throat", "Hacking cold"],
      steps: [
        "Faites bouillir l'écorce de MŨTHĨGA dans 2 tasses de lait ou d'eau pendant 25 minutes.",
        "Laissez refroidir le mélange. La décoction sera épicée et aromatique.",
        "Ajoutez une cuillère à café de miel bio pour adoucir le goût.",
        "Sip doucement pendant 15 minutes pour dégager les voies respiratoires."
      ],
      dose: "1 tasse, deux fois par jour (matin et soir avant de dormir) pendant 3-5 jours."
    }
  },
  "r2": {
    sw: {
      title: "Tiba ya Dharura ya Kunganisha Maumivu ya Meno",
      category: "Maumivu ya Kinywa",
      symptoms: ["Maumivu makali ya jino", "Fizi kuvimba na kuwa nyekundu", "Kusikia uchovu kwenye taya"],
      steps: [
        "Osha mzizi wa MŨTONGU (Sodom Apple) vizuri kwa maji safi.",
        "Tafuna mzizi huo moja kwa moja kwenye eneo la jino linalouma.",
        "Acha juisi chungu na ya kunganisha iingie kwenye jino na fizi.",
        "MUHIMU: Usimeze mate yako. Tembe mate mara kwa mara baada ya kupunguza maumivu."
      ],
      dose: "Tafuna kwa dakika 3-5 na utembe. Rudia baada ya saa 6 kama maumivu yakizidi."
    },
    ki: {
      title: "Dawa ya igego rwarwara",
      category: "Mũthemba wa Igego na kanua",
      symptoms: ["Severe stabbing toothache", "Swollen red gums", "Throbbing jaw discomfort"],
      steps: [
        "Osha mĩri wa MŨTONGU na rũũvĩ rũtheru wega.",
        "Tanĩkia mĩri gĩcigo kĩa igego harĩa harwarĩte.",
        "Tiga gĩko kĩa mĩri gĩkoonwo igego rĩu.",
        "MENYA: Muhoorere atĩrĩ ndũgamĩlie mathie thĩnĩ gwe."
      ],
      dose: "Tanĩkia ta dakika kĩrĩ ĩtatũ na ĩtano, thutha ũteme. Thutha rĩĩgĩ thaa 6 kũrĩ mĩgunda."
    },
    fr: {
      title: "Soulagement d'Urgence des Maux de Dents",
      category: "Soins Dentaires",
      symptoms: ["Mal de dents lancinant", "Gencives rouges enflées", "Inconfort de la mâchoire"],
      steps: [
        "Lavez soigneusement une racine de MŨTONGU à l'eau claire.",
        "Mâchez l'extrémité de la racine fraîche directement sur la zone douloureuse.",
        "Laissez les jus amers anesthésier la gencive et la dent.",
        "IMPORTANT : Ne pas avaler la salive. Crachez constamment."
      ],
      dose: "Mâcher pendant 3-5 minutes, crachez. Répétez après 6 heures si nécessaire."
    }
  },
  "r3": {
    sw: {
      title: "Mchanganyiko wa Mũcatha wa Kusafisha Tumbo na Malaria",
      category: "Kusafisha Tumbo & Homa",
      symptoms: ["Homa za ndani ya mwili", "Kukosa hamu ya kula", "Minyoo ya tumbo", "Maumivu ya viungo", "Baridi ya malaria"],
      steps: [
        "Chemsha majani mabichi ya MŨCATHA kwenye vikombe 3 vya maji kwa dakika 20.",
        "Chuja chai hiyo ya kijani kibichi (itakuwa na ladha chungu sana).",
        "Kwa wale wenye minyoo, saga mbegu kavu za MŨREGA na upige na maji ya moto asubuhi.",
        "Kunywa chai ya MŨCATHA polepole. Unaweza kuongeza asali lakini uchungu asilia ndio husaidia kuua vimelea mwilini."
      ],
      dose: "Nusu glasi kwa watu wazima mara tatu kwa siku kwenye tumbo wazi kwa siku 3 mfululizo."
    },
    ki: {
      title: "Ũhoreri kĩa mĩgũngo kĩa nda na thomu",
      category: "Marũ monda na mĩrimũ ya thumu",
      symptoms: ["High fevers", "Loss of appetite", "Intestinal worms", "Head throbbing", "Malaria chills"],
      steps: [
        "Boili matũ ma MŨCATHA thĩnĩ kĩa rĩta rĩa rũũgĩ gwa dakika 20.",
        "Chuja rũũgĩ rũu thĩnĩ wa gĩkombe (tea nĩĩgĩkorwo nĩmũlũ mũno).",
        "Ranĩria tũtunda tũmbuũ twa MŨREGA namba 9 nĩguo ũniine njoka wega.",
        "Nyua kahora kahora,asali no ĩranĩrũo no andũ a tene metĩgagia atĩ mĩrũlũ nĩĩuraga njoka."
      ],
      dose: "Nusu ya gĩkombe rũũgĩĩ-inĩ andũ a gũkũra gwa mĩthenya ĩtatũĩ-no."
    },
    fr: {
      title: "Décoction Amère contre le Paludisme et l'Indigestion",
      category: "Nettoyage Estomac & Fièvre",
      symptoms: ["Fortes fièvres", "Perte d'appétit", "Vers intestinaux", "Maux de tête", "Frissons du paludisme"],
      steps: [
        "Faites bouillir une poignée de feuilles de MŨCATHA dans 3 tasses d'eau pendant 20 minutes.",
        "Chuja (le thé sera extrêmement amer).",
        "Pour le parasitage, réduire en poudre les baies de MŨREGA et avaler d'abord.",
        "Boire l'infusion de MŨCATHA à petites gorgées."
      ],
      dose: "1/2 verre pour adultes trois fois par jour à jeun pendant 3 jours."
    }
  },
  "r4": {
    sw: {
      title: "Chai ya African Cherry (Mũcoroi) kwa Afya ya Tezi Dume",
      category: "Afya ya Wanaume & Tezi",
      symptoms: ["Kukojoa kwa shida kwa wazee", "Kukojoa mara kwa mara usiku", "Maumivu ya kibofu cha mkojo"],
      steps: [
        "Chukua gamba jekundu la MŨCOROI (Prunus Africana) lililovunwa kwa njia ya maadili.",
        "Chemsha mfuko mmoja mdogo wa gamba hilo kwenye vikombe 4 vya maji kwa dakika 45.",
        "Kioevu kitakuwa na rangi nyekundu nzuri kama mti wa mahogany.",
        "Chuja chai nyekundu na uihifadhi kwenye chupa safi."
      ],
      dose: "Kikombe 1 wakati wa jua kuchomoza, na kingine wakati jua likizama kwa siku 14 hadi 21."
    },
    ki: {
      title: "Chai ya Prostate kũrĩ andũ a gũkũra",
      category: "Hinya wa arũme nda",
      symptoms: ["Weak urinary flow in aging men", "Frequent nighttime urination", "Bladder tension"],
      steps: [
        "Rehe ruthumo rwa rangi ya kĩgĩtondu rwa MŨCOROI.",
        "Boili ruthumo kĩrĩ gĩa rũũgĩ gwa dakika mĩrongo ĩna na tano.",
        "Tea nĩĩkũrũgwo rangi ta kĩgĩtondu wega.",
        "Mĩeri nyoorũ nymĩ nyua rũũgĩ na hwaĩ-ĩnĩ kahora."
      ],
      dose: "Gĩkombe gĩmwe rũũgĩ thutha kũgĩa, na gĩkombe hwaĩ-ĩnĩ gwa mĩthenya 14 kana mĩrongo ĩrĩ na ũmwe."
    },
    fr: {
      title: "Décoction d'African Cherry (Mũcoroi) pour l'Équilibre de la Prostate",
      category: "Santé de l'homme & prostate",
      symptoms: ["Débit urinaire faible chez l'homme mûr", "Uriner fréquemment la nuit", "Tension vésicale"],
      steps: [
        "Obtenir des écorces de MŨCOROI (Pygeum) récoltées de manière durable.",
        "Faire bouillir une poignée dans 4 tasses d'eau pendant 45 minutes.",
        "L'eau prendra une magnifique couleur acajou.",
        "Filtrer et conserver au chaud."
      ],
      dose: "1 tasse au matin et 1 tasse au soir pendant 14 à 21 jours pour restaurer le débit."
    }
  },
  "r5": {
    sw: {
      title: "Dawa ya Kupaka ya Mũrurũacua dhidi ya Fangasi",
      category: "Vidonda vya Ngozi",
      symptoms: ["Madoadoa ya mapunye", "Eczema kavu inayowasha", "Upele wa ngozi", "Majipu madogo"],
      steps: [
        "Chuma majani ya kijani ya MŨRURŨACUA (Popcorn Senna). Yatwange vizuri kwenye kinu safi.",
        "Ongeza matone mawili ya mafuta ya mnyonyo kupata dawa laini ya kijani kibichi yakuvutia.",
        "Safisha ngozi iliyoathirika kwa maji ya uvuguvugu ya chumvi na ukaushe kwanza kwa kitambaa kisafi.",
        "Paka dawa hiyo ya kiasili moja kwa moja kwenye mapunye au ngozi kwa dakika 20.",
        "Nawa na maji ya kisafi. Au, kata tunda la MŨTONGU asilia ukajipake juisi yake kwenye upele."
      ],
      dose: "Paka mara moja kwa siku baada ya kuoga kwa siku 5 asilia hadi ngozi iwe safi."
    },
    ki: {
      title: "Dawa ya andũ a mĩrima mĩrwarera kĩa ngo",
      category: "Mĩrimũ ya ngo",
      symptoms: ["Ringworm patches", "Dry scaly eczema", "Scabies itching", "Mild boils"],
      steps: [
        "Munda matũ ma MŨRURŨACUA na renga wega.",
        "Ranĩria thĩnĩ gĩko kĩa castor oil nĩguo ũpate ũtheru wega.",
        "Thamba kĩonda kĩa ngo na rũũvĩ rĩa cĩũmbũ.",
        "Paka igũrũ harĩa hararwarire dakika mĩrongo ĩrĩ nĩguo ũkinyu wega."
      ],
      dose: "Paka igũrũ hĩndĩĩno ya andũ kũthamba gwa mĩthenya ĩtano wega."
    },
    fr: {
      title: "Cataplasme Antifongique pour L'eczéma et la Teigne",
      category: "Plaies Cutanées Fungal",
      symptoms: ["Plaques de teigne", "Eczéma sec squameux", "Démangeaisons de la gale", "Légers furoncles"],
      steps: [
        "Cueillir des feuilles vertes de MŨRURŨACUA. Les écraser dans un mortier.",
        "Ajouter 2 gouttes d'huile de ricin pour créer une pâte verte.",
        "Nettoyer la peau concernée avec de l'eau tiède salée et sécher.",
        "Appliquer directement la pâte sur l'infection. Laisser poser 20 minutes."
      ],
      dose: "Appliquer la pâte une fois par jour après le bain pendant 5 jours consécutifs."
    }
  }
};

const BLOG_TRANSLATIONS: Record<string, Partial<Record<Language, Partial<BlogPost>>>> = {
  "b1": {
    sw: {
      title: "Kuhifadhi Hekima ya Miti ya Dawa ya Gĩkũyũ katika Enzi ya Kidijitali",
      excerpt: "Wakati wazee wanapita, maarifa ya mimea yanapotea. Jinsi teknolojia ya sasa inavyoweza kusaidia kuhifadhi urithi wetu.",
      content: "Kihistoria, kumbukumbu za matibabu za Kikuyu hazikuhifadhiwa kwenye vitabu, bali ndani ya akili kali za wazee na kukabidhiwa kwa mdomo kando ya moto wa kuni. Leo, mabadiliko ya teknolojia ya kijamii yanatishia ujuzi wa dawa asilia. Programu yetu inakuja kama daraja la dijitali, ikisawazisha masomo yetu asilia na mazingira ya sasa."
    },
    ki: {
      title: "Kũgitĩra Ũgĩ wa Mĩthĩga ya Gĩkũyũ thĩnĩ wa Kompyuta",
      excerpt: "Andũ a gũkũra makĩgũa matũũra, ũgĩ wa mĩthĩga wetekaga. DawaKienyeji nũtethagia gũgitĩra.",
      content: "Ũgĩ wa mĩthĩga ya tene tũtiamwandĩkĩ wega thĩnĩ wa mabuku no mĩri nzorũ nĩratetũgĩra wega. Kompyuta na AI nĩitũtethagia gũrindĩria ĩgĩ njorũ nĩguo ciana ciako igatũgĩrũo wega mthembĩ."
    },
    fr: {
      title: "Préserver la Sagesse Ethnobotanique Gĩkũyũ à l'Ère Numérique",
      excerpt: "Comment la technologie moderne et l'IA peuvent aider à préserver le savoir traditionnel et l'ethnobotanique du Kenya.",
      content: "Historiquement, les fiches médicales de la communauté Gĩkũyũ n'étaient pas gardées dans des livres reliés, mais dans la mémoire vive des chefs guérisseurs et transmises de bouche à oreille au coin du feu. Le projet DawaKienyeji sert de passerelle technologique pour éviter que ce savoir ne s'éteigne."
    }
  },
  "b2": {
    sw: {
      title: "Mũgũmo Mtakatifu: Imani na Tiba Vikichanganyika",
      excerpt: "Kugundua mti mtakatifu wa Mũgũmo unaofanya kazi kama hekalu, kituo cha hali ya anga na hospitali ya dharura ya asili.",
      content: "Hakuna mjadala wa ethnobotaniki ya Kenya ya kati unaokamilika bila Mũgũmo mtakatifu. Kwa miongo mingi, mti huu mtakatifu ulionekana kama nyumba ya Ngai (Mungu) na uliabudiwa kwa unyenyekevu mkubwa. Utomvu wake mweupe asilia huzuia mivujo ya damu vidondani karibu mara moja, na kutoa mponyaji wa dharura wa asili koo likiuma."
    },
    ki: {
      title: "Mũgũmo wa Kĩbũrĩ: Watho na Mĩthĩga Thome",
      excerpt: "Marũ monda mĩramo ya Mũgũmo th thĩnĩ thome matũũra ma Gĩkũyũ gĩcigo th thĩbĩtarĩ.",
      content: "Mũgũmo nĩũtũgĩtwo mũno andũ matũũra mothe Kĩrĩnyaga. Gũtĩ mũndũ wandĩkaga tũtinia rutha rwa mũgũmo tondũ nĩ gĩcigo kĩa Ngai. Gĩko kĩa iria kĩhũthagĩra kũgĩtĩra kĩonda ta andũ a tene."
    },
    fr: {
      title: "Le Mũgũmo Sacré : Spiritualité et Médecine Entrelacés",
      excerpt: "Exploration du figuier étrangleur (Ficus thonningii)—un arbre si sacré qu'il servait d'autel spirituel et d'hôpital d'urgence.",
      content: "Aucune discussion sur l'ethnobotanique Gĩkũyũ n'est complète sans l'évocation du majestueux Mũgũmo. Pour les Kikuyu, le Créateur Ngai résidait sur les hauteurs mais écoutait les rituels à l'ombre de ce figuier géant, qui agissait ainsi comme un temple. Sur le plan médical, sa sève blanche coagule instantanément les plaies."
    }
  },
  "b3": {
    sw: {
      title: "Uvunaji wa Kisayansi: Kanuni Kuu ya Uhifadhi wa Miti",
      excerpt: "Dawa ya kweli sio tu kuhusu unachovuna, bali jinsi unavyovuna. Jifunze kanuni za wazee kulinda miti na uendelevu wa misitu yetu.",
      content: "Uvunaji wa kiadili wa matibabu ndio ulikuwa nguzo kuu ya upiganiaji misitu kule milimani. Kamwe huwezi kuzungusha kisu kukata gamba zima la mti tondũ hiyo inaondoa njia za virutubishi na kuua mti (girdling). Mistari miwili ya wima tu ndiyo inaruhusiwa kuvunwa asilia."
    },
    ki: {
      title: "Watho kũrindĩria mĩthĩga: Ta andũ aruti mĩthĩga",
      excerpt: "Ũgĩ wa mĩthĩga ti gũtinia wega tu, nĩ kũmanya njĩra cĩa kũgitĩra mĩeri mĩgandĩ nĩguo tũgitĩre kũgonda rũgendo.",
      content: "Rĩrĩa ũkũtinya ruthumo rwa mĩthĩga, nĩ watho gũtinia wega ta rũgendo mbera na thutha njoorũ,ndũgatutie mũthĩga gũthiũrũrũka moko mothe nĩgũo mũtĩ ndũgakue tondũ nĩũgitagĩra andũ."
    },
    fr: {
      title: "Récolte Responsable : Le Code Éthique de l'Herboriste",
      excerpt: "La phytothérapie traditionnelle ne dépend pas seulement de ce que vous récoltez, mais de la manière éthique dont vous le faites.",
      content: "Un herboriste traditionnel ne pénètre pas la forêt avec une machette destructive. Pour sauvegarder l'arbre Pygeum (Mũcoroi), l'extraction verticale par bandes opposées est prescrite (Opposite Striping), éliminant tout blocage nutritionnel susceptible de faire périr l'arbre."
    }
  }
};

const ARTICLE_TRANSLATIONS: Record<string, Partial<Record<Language, Partial<KnowledgeBaseArticle>>>> = {
  "k1": {
    sw: {
      title: "Utangulizi wa Ethnobotany ya Kenya ya Kati",
      excerpt: "Misingi ya kitaaluma na kitamaduni inayoelezea kwa nini eneo hili lina mimea yenye nguvu zaidi barani Afrika.",
      content: "Nyanda za juu za Kenya ya kati kando ya milima hutoa mazingira ya kipekee ya mchanga wa volkano. Mimea ya eneo hili ina kiasi kikubwa cha metabolites za upili zinazojulikana kwa nguvu ya juu ya matibabu."
    },
    ki: {
      title: "Mbere thutha thome Mĩthĩga ya Kĩrĩnyaga",
      excerpt: "Ũhoro ũkũonera ta mĩrũgĩ ya Kĩrĩnyaga andũ arehaga mĩthemba yothe njorũ.",
      content: "Mĩthĩga ya Kĩrĩnyaga ĩrĩ na hinya mũnene tondũ gĩcigo kĩu kĩĩ na rũtheerũ mwega rwa sayansi ya tene asilia."
    },
    fr: {
      title: "Introduction à l'Ethnobotanique du Kenya Central",
      excerpt: "Un aperçu académique et culturel décrivant pourquoi la région produit des plantes si puissantes dans ses forêts.",
      content: "Les flores d'altitude entourant le Mont Kenya et les collines de l'Aberdare constituent des hotspots biologiques exceptionnels. Le sol volcanique fertile stimule la synthèse de métabolites secondaires riches (alcaloïdes, tanins) indispensables."
    }
  },
  "k2": {
    sw: {
      title: "Miongozo ya Usalama, Sumu, na Vipimo",
      excerpt: "Mimea ya asili ni salama lakini pia ina kemikali. Mwongozo thabiti wa vipimo, mimea yenye sumu na matumizi kwa kundi maalum.",
      content: "Fikra ya sasa kuwa mimea asilia ni 100% salama bila madhara si kweli. Mimea mingi kama Sodom Apple (Mũtongu) ina sumu ya solanine yenye kuharibu ini na tumbo kama utameza matunda yake. Fuata vipimo vilivyosajiliwa kwanza."
    },
    ki: {
      title: "Watho ya Ũgĩtĩri na Dosage kĩa Mĩgandĩ",
      excerpt: "Mĩthĩga nĩ mĩega no ĩrĩ na andũ mĩrũgĩ cĩa sayansi. Rora ta andũ ciana canyaga.",
      content: "Mũtongu ũrĩ na sumu nene ndũgamilie hĩndĩĩno ya kũrĩa. Ciana na arĩmũ makorwo na ũgĩtĩri wega ta andũ a tene."
    },
    fr: {
      title: "Directives de Sécurité, Toxicité et Dosage",
      excerpt: "Un guide complet de sécurité clinique pour évaluer les dosages, les plantes toxiques et les contre-indications infantiles.",
      content: "Une idée fausse de l'époque moderne est de penser que naturel rime avec sécurité totale. Les fruits jaunes du Sodom Apple (Mũtongu) contiennent des alcaloïdes toxiques pouvant causer de graves indigestions. Respecter rigoureusement les contre-indications."
    }
  }
};


// 1. DYNAMIC DATASETS TRANSLATIONS
export function translateHerb(herb: Herb, lang: Language): Herb {
  if (lang === "en") return herb;
  const tr = HERB_TRANSLATIONS[herb.id]?.[lang];
  if (!tr) return herb;
  return { ...herb, ...tr };
}

export function translateRemedy(remedy: TraditionalRemedy, lang: Language): TraditionalRemedy {
  if (lang === "en") return remedy;
  const tr = REMEDY_TRANSLATIONS[remedy.id]?.[lang];
  if (!tr) return remedy;
  return { ...remedy, ...tr };
}

export function translateBlog(blog: BlogPost, lang: Language): BlogPost {
  if (lang === "en") return blog;
  const tr = BLOG_TRANSLATIONS[blog.id]?.[lang];
  if (!tr) return blog;
  return { ...blog, ...tr };
}

export function translateArticle(article: KnowledgeBaseArticle, lang: Language): KnowledgeBaseArticle {
  if (lang === "en") return article;
  const tr = ARTICLE_TRANSLATIONS[article.id]?.[lang];
  if (!tr) return article;
  return { ...article, ...tr };
}
