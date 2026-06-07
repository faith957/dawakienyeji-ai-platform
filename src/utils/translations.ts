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
    ki: "Contact",
    fr: "Contact"
  },
  "nav.askBot": {
    en: "Get Help",
    sw: "Pata Msaada",
    ki: "Teithio",
    fr: "Obtenir de l'aide"
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
    en: "Get Help",
    sw: "Pata Msaada",
    ki: "Teithio",
    fr: "Obtenir de l'aide"
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
    en: "Knowledge Base",
    sw: "Hifadhi ya Maarifa",
    ki: "Ũgĩ wa Matũũra",
    fr: "Base de Connaissances"
  },
  "slides.2.btn2": {
    en: "Learn More",
    sw: "Jifunze Zaidi",
    ki: "Soma makiri",
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
    en: "Explore Research",
    sw: "Miongozo ya Utafiti",
    ki: "Gĩmia Ũgĩ mĩrũgĩ",
    fr: "Explorer les Recherches"
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
    sw: "Tadhari INAHITAJIKA",
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
    sw: "Tiba na Mwongozo wa Kutayarisha Malazi",
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
    en: "Sovereign Botanical Consultation Inquiry",
    sw: "Fomu ya Ushauri Unaosimamiwa wa Mimea",
    ki: "Gũceeria hamwe na andũ a Ndari",
    fr: "Demande de Consultation Botanique Souveraine"
  },
  "contact.subtitle": {
    en: "Any critical botanical seeds, sustainable farming queries, or conservation audits can be submitted directly back to the Mount Kenya database registrars below.",
    sw: "Mbegu zozote muhimu za mimea, maswali ya kilimo endelevu, au ukaguzi wa uhifadhi zinaweza kuwasilishwa moja kwa moja kwa wasajili hapa chini.",
    ki: "Mbeũ ciothe cia mĩthĩga ya rũũgĩ, andũ arĩmi mĩthĩga matũũra, na mĩhĩnda nĩmũrehe rũgongo fomuĩno kũrĩa kamo andũ a Ndari Nyandarũa.",
    fr: "Toutes les semences, demandes d'agriculture durable ou audits de conservation peuvent être soumis directement aux registraires ci-dessous."
  },
  "contact.name": {
    en: "Your Professional / Tribal Name *",
    sw: "Jina Lako la Kitaaluma au Asili *",
    ki: "Rĩĩtwa rĩaku rĩa Kaborĩ / Wĩra *",
    fr: "Votre Nom / Appellation Professionnelle *"
  },
  "contact.email": {
    en: "Your Active Correspondence Email *",
    sw: "Barua Pepe yako inayofanya kazi *",
    ki: "Mbarũthi yaku kũramatwo *",
    fr: "Votre Courriel Correspondant *"
  },
  "contact.subject": {
    en: "Subject Context / Inquiry Purpose",
    sw: "Mada au Lengo la Swali",
    ki: "Ũhoro ũkũrehe / Mwanya",
    fr: "Sujet / Motif de l'Enquête"
  },
  "contact.messageHint": {
    en: "Write detailed messages. For screening projects or seeds, dictate specific vertical coordinates or county coordinates...",
    sw: "Andika ujumbe kwa kina. Kwa maswali ya mbegu au tafiti, taja maeneo maalum...",
    ki: "Andĩka ũhoro wothe wega. Atĩrĩ kũria andũ a wĩmbore kana mbeũ handũ...",
    fr: "Écrivez un message détaillé. Pour des projets de criblage ou de semences, spécifiez..."
  },
  "contact.success": {
    en: "Traditional consultation dispatched! DawaKienyeji Mount Kenya Registrars will reach out shortly.",
    sw: "Swali lako limetumwa kwa ufanisi! Wasajili wetu wa Mlima Kenya watawasiliana nawe hivi karibuni.",
    ki: "Ũhoro nĩũtũmĩtwo na rũũrĩ! Gĩcigo kĩa andũ a Ndari Kĩrĩnyaga nĩmagũkuonera riũ hĩndĩ...",
    fr: "Consultation traditionnelle envoyée ! Les registraires du Mont Kenya vous répondront sous peu."
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


// 1. DYNAMIC DATOSETS TRANSLATIONS
// We dynamically translate herbs records when selected language is changed to keep databases translated! This is a massive high-fidelity feature.
export function translateHerb(herb: Herb, lang: Language): Herb {
  if (lang === "en") return herb;

  // Let's translate initial datasets 1-10
  if (herb.id === "1") { // Mũthĩga
    return {
      ...herb,
      partUsed: lang === "sw" ? "Gamba la Ndani, Majani" : lang === "ki" ? "Gĩcunjĩ kĩa thĩnĩ kĩa mbaraka, matũ" : "Écorce Interne, Feuilles",
      description: lang === "sw" 
        ? "Mti wa msitu wa kijani kibichi unaopatikana katika maeneo ya nyanda za juu za Afrika Mashariki. Una harufu nzuri sana na ladha ya pilipili."
        : lang === "ki" 
        ? "Mũtĩ mũnene wa mĩrima ya Kĩrĩnyaga na Nyandarũa. Witagwo tondũ nĩũrĩ na rũrĩrĩ rũkũrũ ta rwa ngano."
        : "Un arbre forestier majestueux des hauts plateaux. Très aromatique, caractérisé par un goût piquant de poivre.",
      preparation: lang === "sw"
        ? "Chemsha vipande vilivyokaushwa vya gamba kwenye maji au maziwa kwa dakika 30 ili kupata mchanganyiko mzuri. Au, saga gamba kuwa unga na uchanganye na maji moto au asali."
        : lang === "ki"
        ? "Boili rũthumo rũũmũ rwa rũgendo thĩnĩ wa mĩeri kana iria gwa thigĩrĩ rĩa nusu thaa. Kinya unga na ũrehe na kĩasali kĩa rũũgĩ matũũra."
        : "Faites bouillir l'écorce séchée dans de l'eau ou du lait pendant 30 minutes. Alternativement, consommez sous forme de poudre avec de l'eau tiède.",
      medicinalUses: lang === "sw" ? [
        "Inatuliza kikohozi kikavu na kile chenye kohozi",
        "Inapunguza maumivu ya kifua na mafua",
        "Inatumika kama matibabu ya asili ya malaria na homa",
        "Inatuliza maumivu ya tumbo na matatizo ya umeng'enyaji",
        "Ina uwezo mkubwa wa kupambana na bakteria na fangasi"
      ] : lang === "ki" ? [
        "Kũniina rũkora rũũmũ thĩnĩ kĩa nyondo",
        "Kũhoreria rũkoro na maũndũ ma rũhuugĩ kĩa nyindo",
        "Kũgitĩra andũ mĩrimu ya malaria thondu",
        "Kũniina mĩrimu ya thĩnĩ kĩa nda",
        "Ĩrĩ na hinya mũnene wa kũniina tũbakteria"
      ] : [
        "Soulage les toux sèches et grasses",
        "Calme les douleurs thoraciques et congestion respiratoire",
        "Traitement traditionnel du paludisme et fièvres récurrentes",
        "Calme les maux d'estomac et troubles digestifs",
        "Possède de fortes propriétés antimicrobiennes et antibactériennes"
      ],
      traditionalContext: lang === "sw"
        ? "Moja ya miti mitakatifu na inayoheshimika zaidi katika utamaduni wa Gĩkũyũ na Afrika Mashariki. Joto lake la pilipili linaaminika 'kuchoma kabisa' magonjwa ya kifua."
        : lang === "ki"
        ? "Kĩmwe kĩrĩa kĩĩ kĩheo na gũtũgĩra mũno thĩnĩ thome matũũra ma mĩthĩga ya Gĩkũyũ. Hinya wa rũrĩrĩ rwa ngano nĩũrakorwo nĩkũniina rũhuhu na tũmbeũ tũũru."
        : "L'un des arbres médicinaux les plus sacrés de la culture Gĩkũyũ. Sa chaleur poivrée est censée 'brûler' les impuretés respiratoires.",
      precautions: lang === "sw"
        ? "Ina nguvu sana. Epuka kutumia ukiwa na njaa. Haipendekezwi kwa wanawake wajawazito. Kunywa kikombe 1 mara mbili kwa siku."
        : lang === "ki"
        ? "Ĩrĩ na hinya mũno. Ndũgathĩnyũkie nda tũhũ ũtarĩte kĩndũ. Mwĩrĩgĩrĩro nĩ rweheretio andũ-a-nja arĩ tondũ no ĩniine kahinda. Nyua gĩkombe kĩrĩ gĩa mũthenya."
        : "Extrêmement fort. Éviter de prendre à jeun. Déconseillé aux femmes enceintes. Limiter à une tasse deux fois par jour."
    };
  }

  if (herb.id === "2") { // Mũtongu
    return {
      ...herb,
      partUsed: lang === "sw" ? "Mizizi, Juisi ya Matunda" : lang === "ki" ? "Mĩri, tũtunda tũmbuũ" : "Racines, Jus des Fruits",
      description: lang === "sw"
        ? "Kichaka chenye miiba na machungu kinachoenea sana nchini Kenya, kinachotambulika kwa matunda madogo ya manjano na maua ya zambarau."
        : lang === "ki"
        ? "Kamũtĩ ka mĩĩwa andũ gothe Kenya kũgĩmĩka tondũ kũrĩ na tũtunda tũmbuũ tũtumbũri na thaa cĩa rangi mĩerĩ tũnyito."
        : "Un arbuste épineux et très amer répandu au Kenya, reconnu à ses petits fruits sphériques jaunes et flowers violettes.",
      preparation: lang === "sw"
        ? "Chemsha mizizi iliyokatwa kuponya maumivu ya tumbo. Kwa maumivu ya meno, osha na utafune mzizi asili (tembe mate, usimeze). Paka juisi ya matunda kwenye maambukizi ya ngozi."
        : lang === "ki"
        ? "Boili mĩri ya kũhoreria maũndũ ma nda gĩkũo rĩera. Thome maũndũ ma igego, thamba na ũtanĩkie mĩri igegoĩno (Tema mathie, ndũgamilie thĩnĩ). Paka gĩko kĩa tũtunda igũrũ rĩa ngo."
        : "Faites bouillir les racines hachées pour les maux d'estomac. Pour les rages de dents, mâchez la racine sur la dent (crachez la salive).",
      medicinalUses: lang === "sw" ? [
        "Inatuliza maumivu makali ya meno na uvimbe wa fizi",
        "Inatuliza maumivu makali ya tumbo na kiungulia",
        "Inasafisha fangasi za ngozi kama vile mapunye (juisi hupakwa ngozini)",
        "Inatumika kama dawa ya dharura ya sumu ya nyoka (mizizi iliyopondwa)"
      ] : lang === "ki" ? [
        "Kũniina maũndũ ma igego nĩ rwarwĩte",
        "Kũniina maũndũ ma nda mĩgũngo mĩnene",
        "Kũgĩtĩra ngo mĩrimu ya mthembĩ (fungal infections)",
        "Kũhũthagĩra ta dawa ya kũniina sumu ya nyoka hĩndĩĩno"
      ] : [
        "Allevie les graves rages de dents et l'enflure des gencives",
        "Soulage les douleurs abdominales intenses et l'indigestion",
        "Élimine les infections fongiques de la peau comme la teigne",
        "Antidote traditionnel pour les morsures de serpent (racines broyées)"
      ],
      precautions: lang === "sw"
        ? "Matunda ni SUMU kali mukimeza. Matumizi ya ngozi yafanyike kwa tahadhari isiyogusa macho au vidonda. Watoto wasichezee."
        : lang === "ki"
        ? "Tũtunda tũu tũrĩ na SUMU ndũgamilie hĩndĩĩno. Hũgatha gĩko kĩa tũtunda na andũ ameno matagũthĩkĩria rĩitho. Ciana itige gũcheera gũkũ."
        : "Les fruits jaunes sont très TOXIQUES si avalés. Application cutanée seulement—éviter le contact avec les yeux."
    };
  }

  if (herb.id === "4") { // Mũcorai
    return {
      ...herb,
      partUsed: lang === "sw" ? "Gamba lenye Rangi ya Kahawia-Nyekundu" : lang === "ki" ? "Gĩcunjĩ kĩa Rangi ya Gĩkaonũ kĩa Rũthumo" : "Écorce Brun-Rouge",
      description: lang === "sw"
        ? "Mti mrefu na mzuri wa misitu ya milimani, wenye majani ya kijani kibichi na gamba linalotoa harufu ya kipekee ya lozi chungu unapokatwa."
        : lang === "ki"
        ? "Mũtĩ mũrahu mũgĩ wa matũũra mĩrima, matũ matune andũ wega na ruthumo rwa rangi ta kahawia rũrĩ na rũrĩrĩ rwa almond rwa machungu."
        : "Un grand et bel arbre des forêts de montagne, avec une écorce rugueuse qui dégage une odeur caractéristique d'amande amère.",
      preparation: lang === "sw"
        ? "Saga na ukaushe gamba. Chemsha kiasi kidogo cha gamba katika lita 1 ya maji kwa dakika 45 hadi chai iwe nyekundu nzito. Kunywa kikombe 1 asubuhi na kikombe 1 usiku."
        : lang === "ki"
        ? "Thamba na ũũmisie ruthumo rũu. Boili rũthumo rũthĩ thĩnĩ kĩa rĩta rĩa rũũgĩ gwa thigĩrĩ rĩa dakika mĩrongo ĩna na ĩtano nĩguo mĩeri njorũ ĩgĩkorwo nĩndune. Nyua kĩkombe kĩrogorĩrĩ rũũgĩ na kĩrogorĩrĩ hwaĩ-ĩnĩ."
        : "Faites bouillir une poignée d'écorce dans 1 litre d'eau pendant 45 minutes jusqu'à ce que le thé devienne rouge foncé. Boire 1 tasse matin et soir.",
      medicinalUses: lang === "sw" ? [
        "Husaidia tezi dume, matatizo ya mkojo na kuzuia maumivu ya kibofu",
        "Hulainisha mkojo mgumu, na upunguzaji kibofu kilichovimba",
        "Inatibu homa za ndani, kubana kwa kifua na figo zilizochoka"
      ] : lang === "ki" ? [
        "Kũgitĩra mĩrimu ya Prostate kũrĩ andũ a gũkũra kĩ-mũthenya",
        "Kũhoreria andũ arĩa mĩgĩ matagũkarũra mĩari wega",
        "Kũniina homa cia thĩnĩ na mĩrũgĩ ya thĩnĩ kĩa thigo"
      ] : [
        "Soulage les symptômes urinaires de l'hypertrophie bénigne de la prostate",
        "Améliore l'écoulement urinaire et réduit l'inflammation",
        "Traite les fièvres internes et la fatigue rénale chronique"
      ]
    };
  }

  // Fallback default language returned as is
  return herb;
}

export function translateRemedy(remedy: TraditionalRemedy, lang: Language): TraditionalRemedy {
  if (lang === "en") return remedy;

  if (remedy.id === "r1") { // Dry cough
    return {
      ...remedy,
      title: lang === "sw" ? "Mchanganyiko wa Pilipili wa Kutuliza Kikohozi" : lang === "ki" ? "Ũhoreri wa Kũkoro rwa rũrĩrĩ rwa ngano" : "Soulagement Poivré contre la Toux Sèche",
      category: lang === "sw" ? "Mfumo wa Kupumua" : lang === "ki" ? "Mũthemba wa Ngoro na rera" : "Système Respiratoire",
      steps: lang === "sw" ? [
        "Chemsha vipande vilivyokaushwa vya gamba la MŨTHĨGA kwenye vikombe 2 vya maziwa au maji kwa dakika 25.",
        "Acha mchanganyiko upoe kidogo. Chai itakuwa na harufu nzuri na ladha ya viungo.",
        "Changanya kijiko kimoja cha asali ya nyuki ili kulainisha ladha kali.",
        "Kunywa polepole kwa dakika 15 ili kulegeza kohozi kifuani."
      ] : lang === "ki" ? [
        "Boili rũthumo rũũmũ rwa MŨTHĨGA gwa thigĩrĩ rĩa maziwa kana rũũgĩ gwa thigĩrĩ rĩa dakika 25.",
        "Tiga tea ĩhorere kahora nĩgũo ũgĩ ũmamenye.",
        "Kinya kĩasali kĩa rũũgĩ nĩguo rũrĩrĩ rũhorere wega.",
        "Nyua kahora kahora nĩgũo rũhuungĩ rũhorere wega nyorũ kĩa nyondo."
      ] : [
        "Faites bouillir l'écorce de MŨTHĨGA dans 2 tasses de lait ou d'eau pendant 25 minutes.",
        "Laissez refroidir le mélange. La décoction sera épicée et aromatique.",
        "Ajoutez une cuillère à café de miel bio pour adoucir le goût.",
        "Sip doucement pendant 15 minutes pour dégager les voies respiratoires."
      ],
      dose: lang === "sw" ? "Kikombe 1, mara mbili kwa siku (asubuhi na jioni kabla ya kulala) kwa siku 3-5." : lang === "ki" ? "Kĩkombe kĩmwe rũũgĩ na hwaĩ-ĩnĩ gwa mĩthenya ĩtatũ na ĩtano." : "1 tasse, deux fois par jour (matin et soir avant de dormir) pendant 3-5 jours."
    };
  }

  if (remedy.id === "r2") { // Toothache
    return {
      ...remedy,
      title: lang === "sw" ? "Tiba ya Dharura ya Kunganisha Maumivu ya Meno" : lang === "ki" ? "Dawa ya igego rwarwara" : "Soulagement d'Urgence des Maux de Dents",
      category: lang === "sw" ? "Maumivu ya Kinywa" : lang === "ki" ? "Mũthemba wa Igego na kanua" : "Soins Dentaires",
      steps: lang === "sw" ? [
        "Osha mzizi wa MŨTONGU (Sodom Apple) vizuri kwa maji safi.",
        "Tafuna mzizi huo moja kwa moja kwenye eneo la jino linalouma.",
        "Acha juisi chungu na ya kunganisha iingie kwenye jino na fizi.",
        "MUHIMU: Usimeze mate yako. Tembe mate mara kwa mara baada ya kupunguza maumivu."
      ] : lang === "ki" ? [
        "Osha mĩri wa MŨTONGU na rũũvĩ rũtheru wega.",
        "Tanĩkia mĩri gĩcigo kĩa igego harĩa harwarĩte.",
        "Tiga gĩko kĩa mĩri gĩkoonwo igego rĩu.",
        "MENYA: Muhoorere atĩrĩ ndũgamĩlie mathie thĩnĩ gwe."
      ] : [
        "Lavez soigneusement une racine de MŨTONGU à l'eau claire.",
        "Mâchez l'extrémité de la racine fraîche directement sur la zone douloureuse.",
        "Laissez les jus amers anesthésier la gencive et la dent.",
        "IMPORTANT : Ne pas avaler la salive. Crachez constamment."
      ],
      dose: lang === "sw" ? "Tafuna kwa dakika 3-5 na utembe. Rudia baada ya saa 6 kama maumivu yakizidi." : lang === "ki" ? "Tanĩkia ta dakika kĩrĩ ĩtatũ na ĩtano, thutha ũteme. Thutha rĩĩgĩ thaa 6 kũrĩ mĩgunda." : "Mâchez pendant 3-5 minutes, crachez. Répétez après 6 heures si nécessaire."
    };
  }

  return remedy;
}

export function translateBlog(blog: BlogPost, lang: Language): BlogPost {
  if (lang === "en") return blog;

  if (blog.id === "b1") {
    return {
      ...blog,
      title: lang === "sw" ? "Kuhifadhi Hekima ya Miti ya Dawa ya Gĩkũyũ katika Enzi ya Kidijitali" : lang === "ki" ? "Kũgitĩra Ũgĩ wa Mĩthĩga ya Gĩkũyũ thĩnĩ wa Kompyuta" : "Préserver la Sagesse Ethnobotanique Gĩkũyũ à l'Ère Numérique",
      excerpt: lang === "sw" ? "Wakati wazee wanapita, maarifa ya mimea yanapotea. Jinsi teknolojia ya sasa inavyoweza kusaidia." : lang === "ki" ? "Andũ a gũkũra makĩgũa matũũra, ũgĩ wa mĩthĩga wetekaga. DawaKienyeji nũtethagia gũgitĩra." : "Comment la technologie moderne et l'IA peuvent aider à préserver le savoir traditionnel kenyan.",
      author: lang === "sw" ? "Mwangi wa Kibera" : lang === "ki" ? "Mwangi wa Kibera" : "Mwangi wa Kibera"
    };
  }

  return blog;
}

export function translateArticle(article: KnowledgeBaseArticle, lang: Language): KnowledgeBaseArticle {
  if (lang === "en") return article;

  if (article.id === "k1") {
    return {
      ...article,
      title: lang === "sw" ? "Utangulizi wa Ethnobotany ya Kenya ya Kati" : lang === "ki" ? "Mbere thutha thome Mĩthĩga ya Kĩrĩnyaga" : "Introduction à l'Ethnobotanique du Kenya Central",
      excerpt: lang === "sw" ? "Misingi ya kitaaluma na kitamaduni inayoelezea kwa nini eneo hili lina mimea yenye nguvu zaidi barani Afrika." : lang === "ki" ? "Ũhoro ũkũonera ta mĩrũgĩ ya Kĩrĩnyaga andũ arehaga mĩthemba yothe njorũ." : "Un aperçu académique et culturel décrivant pourquoi la région produit des plantes si puissantes."
    };
  }

  return article;
}
