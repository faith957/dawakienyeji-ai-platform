import { Herb, BlogPost, TraditionalRemedy, KnowledgeBaseArticle } from '../types';

export const INITIAL_HERBS: Herb[] = [
  {
    id: '1',
    kikuyuName: 'MŨTHĨGA',
    commonName: 'Pepper Bark Tree',
    scientificName: 'Warburgia ugandensis',
    partUsed: 'Inner Bark, Leaves',
    description: 'A stately evergreen forest tree found throughout East African highlands. It is highly aromatic, characterized by a hot, pepper-like taste in all parts.',
    preparation: 'Boil dried bark pieces in water or milk for 30 minutes to make a strong peppery decoction. Alternatively, powder the dry bark and mix with warm water or honey.',
    medicinalUses: [
      'Relieves dry and chesty coughs',
      'Eases chest pain and respiratory congestion',
      'Acts as a traditional treatment for malaria and recurrent fevers',
      'Soothes persistent stomach aches and digestive disorders',
      'Possesses powerful antimicrobial, antifungal, and antibacterial properties'
    ],
    traditionalContext: 'One of the most sacred and respected medicinal trees in Gĩkũyũ and East African culture. Its fiery heat is believed to "burn away" respiratory impurities and parasites.',
    precautions: 'Extremely strong. Avoid taking on an empty stomach. Highly discouraged for pregnant women as it may stimulate uterine contractions. Keep doses limited to 1 cup twice daily.',
    category: 'Respiratory',
    imageColor: 'from-emerald-800 via-green-900 to-teal-950',
    imageUrl: 'https://i.postimg.cc/FzRGZDqb/Warburgia-ugandensis.webp',
    severityRating: 'Caution'
  },
  {
    id: '2',
    kikuyuName: 'MŨTONGU',
    commonName: 'Sodom Apple',
    scientificName: 'Solanum incanum',
    partUsed: 'Roots, Fruit Juice',
    description: 'A thorny, bitter shrub widespread in Kenya, easily recognized by its small yellow spherical fruits, light purple flowers, and fuzzy grey-green leaves.',
    preparation: 'Boil clean, chopped root pieces in water to treat internal stomach pain. For localized toothache, wash and chew on a small piece of fresh root tip directly on the painful tooth (spit out saliva, do not swallow). Apply juice of the ripe yellow fruit topically to clean skin infections.',
    medicinalUses: [
      'Alleviates severe toothaches and gum swelling',
      'Relieves intense abdominal pains and indigestion',
      'Clears fungal skin conditions like ringworm, warts, and scabies (juice applied topically)',
      'Acts as a traditional antidote for snakebites when roots are crushed and applied immediately'
    ],
    traditionalContext: 'Mũtongu is a core fixture in ancient Kikuyu veterinary and human first aid. The fruits are universally known for their bitter properties and are strictly decorative or topical, never edible.',
    precautions: 'The orange/yellow fruits are highly TOXIC if swallowed. Apply fruit sap topically with high caution—avoid contact with eyes and open wounds. Children should not handle the fruits.',
    category: 'Pain relief',
    imageColor: 'from-amber-600 via-yellow-700 to-stone-800',
    imageUrl: 'https://i.postimg.cc/LsgpyVdd/Solanum-incanum.webp',
    severityRating: 'Medicinal Only'
  },
  {
    id: '3',
    kikuyuName: 'MŨNDERENDU',
    commonName: 'Noble Teclea',
    scientificName: 'Teclea nobilis',
    partUsed: 'Leaves, Bark',
    description: 'A smooth-barked indigenous evergreen tree reaching up to 15 meters, commonly growing in the mist forests and highland undergrowth of Kenya.',
    preparation: 'Boil bark or fresh leaves in water for 40 minutes. The resulting pale-green tea is drunk warm. For external joint pain, prepare a concentrated hot leaf brew and add it to a warm hydrotherapy bath, or compress soaked cloths directly to inflamed areas.',
    medicinalUses: [
      'Relieves shooting joint pain, osteoarthritis, and rheumatism',
      'Soothes chronic backaches and physical fatigue',
      'Dispels high fevers and reduces malaria chill symptoms',
      'Relieves muscle tension and severe body stiffness'
    ],
    traditionalContext: 'Traditionally regarded as a muscle restorer. Gĩkũyũ warriors returning from long expeditions would soak in warm Mũnderendu baths to heal bruises and relieve physical exhaust.',
    precautions: 'Generally safe and non-toxic, but should only be consumed by adults. Limit use to one week consecutively.',
    category: 'Pain relief',
    imageColor: 'from-teal-700 via-green-800 to-emerald-950',
    imageUrl: 'https://i.postimg.cc/HnR0tHbj/Teclea-nobilis.jpg',
    severityRating: 'Safe'
  },
  {
    id: '4',
    kikuyuName: 'MŨCOROI',
    commonName: 'African Cherry',
    scientificName: 'Prunus africana',
    partUsed: 'Reddish-brown Bark',
    description: 'A handsome, tall canopy tree native to montane forests, with dark glossy leaves and red-brown rough bark that gives off a distinct bitter almond scent when cut.',
    preparation: 'Clean, dry and shave the bark. Boil a small handful of bark shavings in 1 liter of fresh water for 45 minutes until the tea turns deeply dark red. Drink 1 cup in the morning and 1 cup at night.',
    medicinalUses: [
      'Specifically relieves urinary symptoms of Benign Prostatic Hyperplasia (prostate enlargement)',
      'Eases difficulty in starting urination, frequent nighttime urination, and bladder inflammation',
      'Treats internal fevers, chest tightness, and chronic kidney fatigue'
    ],
    traditionalContext: 'Highly respected across mathematical and modern medicine. Historically used by elderly Kikuyu men to manage prostate ailments. Today, it is an internationally protected tree harvested globally for prostate medications.',
    precautions: 'Prostate symptoms can be indicators of serious diseases and need professional evaluation. Harvesting must only use sustainable vertical strips to avoid girdling (killing) the tree.',
    category: 'Prostate & Urinary',
    imageColor: 'from-amber-800 via-orange-950 to-stone-950',
    imageUrl: 'https://i.postimg.cc/LsxyGJPW/Prunus-africana.jpg',
    severityRating: 'Medicinal Only'
  },
  {
    id: '5',
    kikuyuName: 'MŨCATHA',
    commonName: 'Bitter Leaf Vernonia',
    scientificName: 'Vernonia lasiopus',
    partUsed: 'Leaves, Leaf Bud, Soft Stems',
    description: 'An aggressive, leafy bitter shrub common along forest margins, abandoned farmlands, and riversides in central Kenya.',
    preparation: 'Squeeze a fresh handful of leaves in cold water, filter out the debris, and drink the highly bitter green juice, or boil dried leaves to create a tea. Often sweetened with natural wild honey.',
    medicinalUses: [
      'Acts as a rapid remedy for malaria-induced headaches and joint aches',
      'Eliminates intestinal worms, roundworms, and threadworms',
      'Soothes indigestion, severe gas, bloating, and stomach cramps',
      'Stimulates appetite and acts as a moderate natural colon cleanser'
    ],
    traditionalContext: 'An essential "backyard pharmacy" plant. Its striking bitter taste earned it a legendary status for testing children\'s bravery. If a child suffered indigestion, a cup of Mũcatha was immediately brewed by grandmothers.',
    precautions: 'Extremely bitter, which might trigger temporary nausea in sensitive individuals. Safe for children over 5 years in diluted half-portions.',
    category: 'Digestive',
    imageColor: 'from-lime-800 via-green-800 to-emerald-900',
    imageUrl: 'https://i.postimg.cc/8kWNhGMG/Vernonia-lasiopus.jpg',
    severityRating: 'Safe'
  },
  {
    id: '6',
    kikuyuName: 'MŨRURŨACUA',
    commonName: 'Popcorn Senna',
    scientificName: 'Senna didymobotrya',
    partUsed: 'Leaves, Bright Yellow Flowers',
    description: 'A rounded shrub with distinctive erect golden-yellow flower clusters, and leaves that emit an unmistakable smell reminiscent of toasted peanut butter or popcorn when brushed.',
    preparation: 'To cure skin conditions, crush fresh leaves with a little water or castor oil to make a fine poultice. Apply onto eczema or ringworm patches for 25 minutes, then rinse. For laxative purposes, steep 2-3 dried leaves in hot water (drink very sparingly).',
    medicinalUses: [
      'Cures persistent ringworm, athlete\'s foot, and scabies topically',
      'Acts as a highly potent natural cleanser for chronic skin blemishes, acne, and dry eczema',
      'Prescribed in ancient times for intense constipation due to its strong laxative mechanisms'
    ],
    traditionalContext: 'Revered of its rapid anti-parasitic dermal capabilities. Widely utilized in pastoralist communities to cleanse milk storage gourds (giving them a pleasant smoked aroma).',
    precautions: 'Extremely strong laxative when ingested. Do NOT swallow any leaf teas without direct guidance from an elder practitioner, and limit ingestion to avoid strong stomach cramps.',
    category: 'Skin & Wounds',
    imageColor: 'from-yellow-500 via-teal-700 to-green-950',
    imageUrl: 'https://i.postimg.cc/QCj49ccF/Senna-didymobotrya.jpg',
    severityRating: 'Caution'
  },
  {
    id: '7',
    kikuyuName: 'MŨRŨRĨ',
    commonName: 'Cape Mahogany',
    scientificName: 'Trichilia emetica',
    partUsed: 'Bark, Seed Pods (Oil)',
    description: 'A beautiful evergreen shade tree found along riverbeds, growing glossy deep-green leaves, sweet-scented cream-white flowers, and oil-rich black-and-red seeds.',
    preparation: 'Infuse bark shavings in hot water to create a cleansing wash. For scalp health or wound healing, press oil from dry seeds and rub on skin.',
    medicinalUses: [
      'Induces vomiting to purge toxic materials or accidental poisoning',
      'Relieves chronic dry dermatitis, dry scalp, and dandruff when seed oil is massaged',
      'Provides relief for blood flukes (bilharzia) and bowel worms',
      'Speeds up the drying and healing of slow-closing flesh wounds'
    ],
    traditionalContext: 'Commonly known as the "Emetic Mahogany". The bark is carefully stripped without destroying the tree and saved in homes to administer to children who accidentally swallowed poisonous substances.',
    precautions: 'Strong emetic context—will cause vomiting if taken internally in high doses. Keep dosages under careful observation.',
    category: 'Digestive',
    imageColor: 'from-lime-900 via-emerald-800 to-zinc-950',
    imageUrl: 'https://i.postimg.cc/zvPCzhj6/Trichilia-emetica.jpg',
    severityRating: 'Caution'
  },
  {
    id: '8',
    kikuyuName: 'MŨGŨMO',
    commonName: 'Sacred Fig Tree',
    scientificName: 'Ficus thonningii',
    partUsed: 'Sticky Milky Latex, Inner Bark',
    description: 'A giant, sacred parasite fig tree starting as an epiphyte, with a massive trunk, sprawling crown, and extensive aerial breathing roots cascading downwards.',
    preparation: 'Collect the white milky latex directly from a stem slash and paste immediately onto cuts. Boil inner reddish bark or stem wood to create a sweet, soothing tea to soothe throats.',
    medicinalUses: [
      'Acts as a rapid blood coagulant for open cuts and wounds, stopping bleeding almost instantly',
      'Soothes swollen, acute sore throats, bronchial pharyngitis, and dry hacking colds',
      'Supports convalescing patients recovering from operations, severe illness, or physical exertion',
      'Stabilizes loose bowels and mild diarrhea'
    ],
    traditionalContext: 'The absolute pinnacle of sacredness in Gĩkũyũ spirituality. No Gĩkũyũ sub-clan was allowed to cut a Mũgũmo tree. It was the temple of the people. Its medicinal use is approached with deep reverence, prayer, and natural respect.',
    precautions: 'Harvesting must be done minimally, with clean tools. Do not strip bark in large volumes. Highly safe but spiritually protected.',
    category: 'General Vitality',
    imageColor: 'from-emerald-900 via-stone-800 to-slate-950',
    imageUrl: 'https://i.postimg.cc/Zqhr5489/Ficus-thonningii.jpg',
    severityRating: 'Safe'
  },
  {
    id: '9',
    kikuyuName: 'MŨREGA',
    commonName: 'Cape Myrtle / African Pepper',
    scientificName: 'Myrsine africana',
    partUsed: 'Dry Pinkish Berries, Stems',
    description: 'A small, highly branched shrub with beautiful, tiny, tough leaves and clusters of pinkish berries that look like small peppercorns.',
    preparation: 'Dry and grind the tiny berries into a powder. Mix 1 teaspoon of berry powder in hot porridge or warm water and swallow whole on an empty stomach.',
    medicinalUses: [
      'Known as the most effective traditional dewormer, targeting Tapeworms and hookworms',
      'Eases severe chest pains, asthma symptoms, and spasms',
      'Cleanses maternal breast-milk ducts of postpartum mothers'
    ],
    traditionalContext: 'The quintessential Gĩkũyũ deworming drug. In traditional circles, before livestock slaughter, the meat cutters would boil Mũrega berries as a protective tea against possible tapeworms in raw beef.',
    precautions: 'Berries have high anthelmintic potency. Avoid taking daily for more than 3 days. Can cause mild stomach rumbling as worms are expelled.',
    category: 'Digestive',
    imageColor: 'from-red-900 via-amber-800 to-stone-900',
    imageUrl: 'https://i.postimg.cc/528CGThd/Myrsine-africana.jpg',
    severityRating: 'Caution'
  },
  {
    id: '10',
    kikuyuName: 'MŨGUCŨ',
    commonName: 'Knobwood',
    scientificName: 'Zanthoxylum chalybeum',
    partUsed: 'Prickly Bark, Citrus Aromatic Seeds',
    description: 'A deciduous spiny tree with knobs on the trunk and twigs, and incredibly citrus-scented lemon-ginger fresh leaves and seeds.',
    preparation: 'Boil stem bark in water to handle fevers and body aches. Chew the dried seed capsules to freshen breath, soothe acute toothache, and clear chest pain.',
    medicinalUses: [
      'Alleviates chronic bronchial asthma, wheezing, and dry coughs',
      'Soothes persistent sickle-cell anemia pain crisis and severe joint aches',
      'Treats malaria-induced fevers, head throbbing, and severe chills',
      'Relieves acute tooth decay pain and calms inflamed throat tonsils'
    ],
    traditionalContext: 'Its seed pods have a delightful, spicy scent containing natural numbing agents. Kikuyu travelers chewed these refreshing seeds to stave off thirst, ward off illness, and sanitize water.',
    precautions: 'Highly aromatic; can cause temporary sweating and warmth (which is desired to break fevers). Avoid giving to infants or children under 3 years.',
    category: 'Respiratory',
    imageColor: 'from-lime-900 via-amber-700 to-emerald-950',
    imageUrl: 'https://i.postimg.cc/X7CGGt72/Zanthoxylum-chalybeum.jpg',
    severityRating: 'Caution'
  }
];

export const INITIAL_REMEDIES: TraditionalRemedy[] = [
  {
    id: 'r1',
    title: 'Warm Peppery Relief for Dry Coughs',
    category: 'Respiratory Systems',
    symptoms: ['Dry coughing', 'Chest congestion', 'Sore burning throat', 'Hacking cold'],
    recommendedHerbs: ['MŨTHĨGA', 'MŨGŨMO'],
    steps: [
      'Harvest sustainable dried bark shavings of MŨTHĨGA and boil in 2 cups of milk or water for 25 minutes.',
      'Allow the mixture to cool until comfortably warm. The decoction will smell strongly aromatic and spicy.',
      'Blend in one teaspoon of organic wild honey to calm the hot flavor.',
      'Sip slowly over 15 minutes to let the hot vapors loosen chest mucus.'
    ],
    dose: '1 cup, twice daily (morning and evening before sleep) for 3-5 days.'
  },
  {
    id: 'r2',
    title: 'Emergency Toothache Numbing Remedy',
    category: 'Oral Pain Care',
    symptoms: ['Severe stabbing toothache', 'Swollen red gums', 'Throbbing jaw discomfort'],
    recommendedHerbs: ['MŨTONGU', 'MŨGUCŨ'],
    steps: [
      'Locate a healthy MŨTONGU (Sodom Apple) shrub and carefully harvest a fine rootlet. Wash it thoroughly with clean water.',
      'Locally chew on the tip of the washed fresh root directly on the aching tooth area.',
      'Let the bitter numbing juices coat the tooth and gum line.',
      'IMPORTANT: Do NOT swallow the saliva. Spit out all saliva and plant residue constantly as it numbs the pain.'
    ],
    dose: 'Chew for 3-5 minutes, spit out. Repeat after 6 hours if throbbing resumes. See a dentist.'
  },
  {
    id: 'r3',
    title: 'High-Bitters Malaria & Digestive Cleanse',
    category: 'Stomach & Fever Cleansing',
    symptoms: ['High fevers', 'Loss of appetite', 'Intestinal worms', 'Head throbbing', 'Malaria chills'],
    recommendedHerbs: ['MŨCATHA', 'MŨREGA'],
    steps: [
      'Boil a small handful of MŨCATHA green leaves in 3 cups of water for 20 minutes.',
      'Strain the bright green broth into a glass. (The broth will taste remarkably bitter).',
      'For heavy parasite deworming, grind dry seeds of MŨREGA and swallow with simple warm water first.',
      'Drink the MŨCATHA tea in small sips. Honey can be added, but traditionalists believe the bitterness enhances parasite elimination.'
    ],
    dose: '1/2 glass for adults thrice daily on an empty stomach for 3 consecutive days.'
  },
  {
    id: 'r4',
    title: 'Prostate Urination Balance Brew',
    category: 'Men\'s Health & prostate',
    symptoms: ['Weak urinary flow in aging men', 'Frequent nighttime urination', 'Bladder tension'],
    recommendedHerbs: ['MŨCOROI'],
    steps: [
      'Obtain sustainably harvested reddish-brown bark shavings of MŨCOROI (Prunus africana).',
      'Boil 1 small handful of bark in 4 cups of pure water for 45 minutes.',
      'The water will turn to a beautiful dark mahogany red color.',
      'Strain the red tea and store in a clean thermos.'
    ],
    dose: '1 cup at sunrise, and 1 cup after sunset. Continue for 14-21 days for urinary flow restoration.'
  },
  {
    id: 'r5',
    title: 'Ringworm & Fungal Topical Cleansing Paste',
    category: 'Fungal Dermal Wounds',
    symptoms: ['Ringworm patches', 'Dry scaly eczema', 'Scabies itching', 'Mild boils'],
    recommendedHerbs: ['MŨRURŨACUA', 'MŨTONGU'],
    steps: [
      'Pluck fresh green leaves of MŨRURŨACUA (Popcorn Senna). Mash them in a clean pestle and mortar.',
      'Add 2 drops of castor oil or warm water to make a creamy, bright emerald herbal paste.',
      'Cleanse the infected skin patch gently with warm saline water and dry with clean cloth.',
      'Apply the green herbal paste directly onto the skin infection. Leave on for 20 minutes to absorb anti-fungal acids.',
      'Rinse with warm clean water. Alternatively, cut a ripe yellow fruit of MŨTONGU and rub its sap directly onto scabies.'
    ],
    dose: 'Apply paste once daily after bathing for 5 days consecutively until patches clear.'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Preserving Indigenous Ethnobotanical Wisdom in the Digital Age',
    category: 'Ethnobotany',
    excerpt: 'As elders pass on, an architectural treasure of medicinal plant knowledge faces extinction. How modern AI and digitalization can help preserve Kenyan traditional healing lore.',
    content: `Historically, the medical records of the Gĩkũyũ community were not stored in bound books, but within the sharp memories of elders (*Muthamaki wa Mithĩga* / medicine guardians) and handed down orally over woodfires. Each ridge had its specialists, often healers who worked with natural laws and local shrubs.

### The Threat of Knowledge Extinction
Today, rapid urbanization, changing lifestyles, and deforestation of montane forests like Aberdares and Mt. Kenya are threatening this invaluable knowledge. When a forest is cleared, a botanical library burns down. When an elder passes, a clinical textbook disappears forever.

### Enter DawaKienyeji: Connecting Wisdom to AI
To address this, the **DawaKienyeji** project serves as a digital bridge. By preserving accurate scientific and cultural records of indigenous Kenyan flora, we synthesize ancestral wisdom with modern convenience. 

Using technology like Retrieval-Augmented Generation (RAG) and conversational AI, we empower younger Kenyans to search for traditional Kikuyu names like **Mũthĩga**, query and verify botanical scientific names (e.g. *Warburgia ugandensis*), and learn about safe traditional preparation recipes. In doing so, we don't reject modern medical science; we honor the empirical, thousand-year laboratory of African grandmotherly remedies.`,
    author: 'Mwangi wa Kibera',
    date: 'May 28, 2026',
    readTime: '6 min read',
    imageColor: 'from-emerald-800 to-green-950'
  },
  {
    id: 'b2',
    title: 'The Sacred Fig Tree: Spirituality and Medicine Combined',
    category: 'Kikuyu Traditions',
    excerpt: 'Exploring the Strangler Fig (Ficus thonningii)—a tree so sacred in Kikuyu history that it served as an altar, a weather forecast station, and an emergency hospital.',
    content: `No discussion of Gĩkũyũ ethnobotany is complete without the majestic **Mũgũmo** (*Ficus thonningii* / Strangler Fig). This towering parasite fig, which wraps its roots around host trees until they dissolve, is more than just a biological marvel; it is the spiritual compass of Gĩkũyũ history.

### The Sacred Canopy
To the Gĩkũyũ, *Ngai* (the Creator) resided in high places like Mount Kenya (*Kĩrĩnyaga*), but communicated and received prayers under the shade of massive Mũgũmo trees. These trees functioned as tribal temples. Wars were averted, sacrifices offered, and rains prayed for beneath its massive canopies. It was strictly taboo to break even a small branch of a standing Mũgũmo tree.

### The Medicinal Canopy
Beyond its spiritual significance, the Mũgũmo is an outstanding herbal contributor of natural first aid:
- **Sticky Milky Latex**: Applied directly to cuts, this latex acts as a rapid natural coagulant to seal bleeding wounds and prevent infection.
- **Inner Red Bark Bioactives**: When boiled, strips of the inner bark provide a soothing, sweet extract. This syrup is used to treat severe, choking coughs and soothe heavy tonsillar inflammation.

### A Lesson in Conservation
Because of the absolute spiritual prohibition on cutting Mũgũmo trees, they became natural sanctuaries for forest preservation, retaining biodiversity patches in farmlands. In modern times, protecting the Mũgũmo represents protecting both our spiritual lineage and our natural climate defenses.`,
    author: 'Wanjĩra wa Gĩthũngũri',
    date: 'June 03, 2026',
    readTime: '5 min read',
    imageColor: 'from-green-900 to-emerald-950'
  },
  {
    id: 'b3',
    title: 'Responsible Harvesting: The Ethical Code of the Herbalist',
    category: 'Sustainable Harvesting',
    excerpt: 'True herbal medicine is not just about what you harvest, but how. Learn the ancient guidelines that protect trees from ring-bark death.',
    content: `A true traditional herbalist does not enter the forest with a ruthless machete. In ancient Kikuyu customs, harvesting medicine was accompanied by prayer, small offerings (such as pouring milk or oil at the root), and a strict set of ethical rules. No forest was entered purely out of greed.

### The Threat of Girdling (Ring-Barking)
When trees like **Mũcoroi** (*Prunus africana*) became commercially desired for global prostate medications, international collectors stripped whole bands of bark around the trunks. This process—known as girdling—cuts off the phloem channels carrying nutrition. Within seasons, the entire tree dies.

### The Traditional Code of Harvesting Bark
Ancestral Kikuyu medicinal harvesters followed a strict ethical manual:
1. **Never Encircle**: A vertical strip is gently pried from the East-facing and West-facing sides only. Never strip the entire diameter.
2. **First Strip Rule**: Strip from a mature tree only. If a tree has been stripped recently, move to another.
3. **Gratitude and Healing**: After cutting, traditional healers often rubbed clean damp forest soil onto the exposed slash. This acts as a plaster, sealing the vascular tissues and helping the tree grow new bark.
4. **Root Protection**: If harvesting roots (like **Mũtongu**), only cut 1 small secondary rootlet. Never disturb the primary taproot.

Sustainable harvesting is the only way we keep our pharmacies alive. DawaKienyeji advocates for vertical-strip harvesting and local replanting of vulnerable native trees to safeguard our biodiversity.`,
    author: 'Dr. Joseph Kireki',
    date: 'April 15, 2026',
    readTime: '7 min read',
    imageColor: 'from-amber-900 to-red-950'
  }
];

export const INITIAL_KNOWLEDGE_BASE: KnowledgeBaseArticle[] = [
  {
    id: 'k1',
    title: 'Introduction to Central Kenya Ethnobotany',
    excerpt: 'An academic and cultural primer explaining the ecosystems of central Kenya and why the region grew some of the most potent medicinal shrubs in Africa.',
    content: `Central Kenyan highlands around Mt. Kenya, Aberdare Ranges (Nyandarua), and the sacred groves are biological hotspots. The rich volcanic soil, cold altitudes, and seasonal rains force mountain plants to develop dense secondary metabolites as survival mechanisms.

These secondary metabolites—such as alkaloids, saponins, tannins, and terpenoids—are the active medicinal chemicals in traditional medicine. For instance, the Mũthĩga tree thrives in these high forest reserves, synthesizing powerful sesquiterpene dialdehydes which are heavily anti-fungal and bronchodilating. 

By understanding our regional geography and soils, we begin to comprehend why Gĩkũyũ medicine is uniquely suited for respiratory and viral treatments.`,
    category: 'Ethnobotany',
    author: 'Prof. J. N. Njoroge',
    lastUpdated: 'Jan 2026'
  },
  {
    id: 'k2',
    title: 'Safety, Toxicity, and Dosage Guidelines',
    excerpt: 'Herbs are natural but they are also chemicals. A definitive clinical safety guide for evaluating dosage, dangerous plants, and childhood exclusions.',
    content: `A common and modern misconception is that "because an herb is natural, it is 100% safe." Traditional healers knew this was false. Many plants, such as Mũtongu (Solanum incanum), are highly poison-active and must be used with precise pharmaceutical care.

Universal Safety Core Rules:
1. Never Ingest Topical Sap: Saps like that of Chrome-Apple (Mũtongu) contain toxic solasodine and solanine glycoalkaloids which destroy stomach lining and induce liver failure if ingested.
2. Child and Pregnancy Exclusions: High-activity oils or peppery decoctions like Mũthĩga must never be administered to infants, and are strictly contraindicated for pregnant women as they can induce miscarriage.
3. Interactions with Modern Meds: If taking high blood-pressure or anti-coagulant medications, herbs like Pygeum (Mũcoroi) may compound blood pressure drops. consult both a local practitioner and a cardiological specialist.
4. Clean Water Sourcing: Always boil your tea using pure, spring water. Contaminated farm runoff in streams can introduce pesticides into your brewed medicine.`,
    category: 'Dosage & Safety',
    author: 'Pharmacy Council of Kenya',
    lastUpdated: 'March 2026'
  }
];
