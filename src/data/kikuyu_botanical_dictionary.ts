export interface DictionaryEntry {
  kikuyuName: string;
  scientificName: string;
  family: string;
  commonName: string;
  description: string;
  uses: string[];
  safeCautions?: string;
  category: 'Ethnobotany' | 'Medicinal' | 'Edible' | 'Timber' | 'Poisonous' | 'Fiber' | 'General';
}

export const KIKUYU_DICTIONARY: DictionaryEntry[] = [
  {
    kikuyuName: "BANGI",
    scientificName: "Cannabis sativa",
    family: "Cannabaceae",
    commonName: "Indian hemp / Bhang",
    description: "An annual herb, illegally cultivated as a narcotic in Central Kenya highlands.",
    uses: ["Narcotic", "Traditional psychoactive ceremonies"],
    safeCautions: "Highly narcotic, regulated, illicit substance.",
    category: "Poisonous"
  },
  {
    kikuyuName: "BIRIBIRI",
    scientificName: "Capsicum annuum",
    family: "Solanaceae",
    commonName: "Chillies or Sweet Peppers",
    description: "Cultivated crop with deep red fruits hot to taste, used broad-spectrum as spice or crop defense.",
    uses: ["Digestive aid", "Spices", "Stimulant"],
    category: "Edible"
  },
  {
    kikuyuName: "GACUGUMA",
    scientificName: "Orobanche minor",
    family: "Orobanchaceae",
    commonName: "Broomrape",
    description: "A parasitic herb found growing on the roots of other dominant plants like Mũbangi.",
    uses: ["Agronomic indicator", "Soil vitality marker"],
    category: "Ethnobotany"
  },
  {
    kikuyuName: "GAKARAKU",
    scientificName: "Rubia cordifolia",
    family: "Rubiaceae",
    commonName: "Madder",
    description: "Its deep sprawling roots contain a rich red dye highly preferred for leather tanning and coloring traditional earrings.",
    uses: ["Traditional Dye", "Leather craftsmanship", "Coloring wood"],
    category: "Ethnobotany"
  },
  {
    kikuyuName: "GIKWA-KIA-NDURU",
    scientificName: "Gloriosa superba",
    family: "Liliaceae",
    commonName: "Flame Lily",
    description: "A poisonous plant with highly decorative flame-like yellow and red petals. Tuber contains strong chemicals.",
    uses: ["Antiseptic for open wounds (tuber juice only)"],
    safeCautions: "Tuber yields lethal colchicine compounds if ingested.",
    category: "Poisonous"
  },
  {
    kikuyuName: "GITHUNJU",
    scientificName: "Lagenaria abyssinica",
    family: "Cucurbitaceae",
    commonName: "Wild Climber Gourd",
    description: "A climbing forest plant with 5-lobed leaves and highly branched tendrils.",
    uses: ["Vine weaving", "Binding material"],
    category: "Ethnobotany"
  },
  {
    kikuyuName: "GITUNGURU",
    scientificName: "Allium ampeloprassum",
    family: "Alliaceae",
    commonName: "Leek or Scallion",
    description: "A cultivated wild-derived leek with long leaves and a robust pungent bulbous root.",
    uses: ["Flavoring", "Digestive health", "Colds remedy"],
    category: "Edible"
  },
  {
    kikuyuName: "HATHA",
    scientificName: "Urtica massaica",
    family: "Urticaceae",
    commonName: "Stinging Nettle",
    description: "Stout multi-stemmed mountain herb covered with painful stinging hairs commonly found along forest edges.",
    uses: ["Vegetable when cooked", "Rheumatism treatment", "Lowering blood pressure"],
    safeCautions: "Causes sharp localized skin inflammation if touched raw.",
    category: "Medicinal"
  },
  {
    kikuyuName: "ITHARE",
    scientificName: "Dracaena steudneri",
    family: "Draceneaceae",
    commonName: "Dragon Tree",
    description: "Palm-like tree reaching up to 12m tall, very common in swamps and wet soils.",
    uses: ["Timber", "Marking boundaries", "Fencing"],
    category: "Ethnobotany"
  },
  {
    kikuyuName: "KAHUA",
    scientificName: "Coffea arabica",
    commonName: "Coffee",
    family: "Rubiaceae",
    description: "An evergreen tree originally native to Ethiopia, widely cultivated across Central Kenya.",
    uses: ["Stimulant", "Energy drink"],
    category: "Edible"
  },
  {
    kikuyuName: "KIRUUMA",
    scientificName: "Aloe lateritia",
    family: "Liliaceae",
    commonName: "White-spotted Aloe",
    description: "Fleshy succulent herb with a rosette of white-spotted thick spiked leaves.",
    uses: ["Colds", "Malaria symptoms alleviation", "Wounds healing"],
    category: "Medicinal",
    safeCautions: "Sap is extremely bitter."
  },
  {
    kikuyuName: "MAGURUKIA",
    scientificName: "Datura stramonium",
    family: "Solanaceae",
    commonName: "Thorn Apple / Datura",
    description: "A stout bushy annual weed with white flowers and spiny capsule fruits containing black seeds.",
    uses: ["Sedative", "Asthma chest-smoking (highly risky)"],
    safeCautions: "Extremely toxic. Induces severe delirium, blindness, or death if ingested.",
    category: "Poisonous"
  },
  {
    kikuyuName: "MANAGU",
    scientificName: "Solanum nigrum",
    family: "Solanaceae",
    commonName: "Black Nightshade",
    description: "Smooth annual herb with small white flowers and edible black/orange berries. Leaves are a popular cooked vegetable.",
    uses: ["Vegetable", "Juice used as antiseptic for open wounds", "Digestive tonic"],
    category: "Edible"
  },
  {
    kikuyuName: "MATHARU",
    scientificName: "Brassica oleracea var. acephala",
    family: "Cruciferae",
    commonName: "Kale or Sukuma wiki",
    category: "Edible",
    description: "Kale or Sukuma wiki, key local green vegetable cooked as a staple side dish.",
    uses: ["Dietary fiber", "Vitamins supplement"]
  },
  {
    kikuyuName: "MŨGUMO",
    scientificName: "Ficus thonningii",
    family: "Moraceae",
    commonName: "Wild Fig Tree",
    description: "A colossal, revered canopy tree which can easily reach 15m. It represents highly sacred spiritual spots of the Agĩkũyũ.",
    uses: ["Sacred prayer assemblies / rain ceremonies", "Bark fiber", "Soil water retention"],
    safeCautions: "Strictly forbidden from being cut down as firewood due to sacred status.",
    category: "Ethnobotany"
  },
  {
    kikuyuName: "MŨHUKURA",
    scientificName: "Mondia whytei",
    family: "Asclepiadaceae",
    commonName: "Mondia Root / White's Ginger",
    description: "A vigorous forest climber with strongly aromatic roots that yield a vanilla-like scent.",
    uses: ["Treating stomach disorders in infants", "Appetite stimulant", "Aphrodisiac", "Spicing drinks"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨKINDŪ",
    scientificName: "Phoenix reclinata",
    family: "Palmae",
    commonName: "Wild Date Palm",
    description: "A native palm growing up to 6m tall with bright green, sharp spine-tipped pinnate leaves. Found near streams.",
    uses: ["Leaves are dried for weaving fine baskets and mats", "Roots yield a rich brown dye"],
    category: "Fiber"
  },
  {
    kikuyuName: "MŨKINDŪRĪ",
    scientificName: "Croton megalocarpus",
    family: "Euphorbiaceae",
    commonName: "Croton",
    description: "A massive flat-topped forest canopy tree rising to 40m. Rough grey bark and silvery leaf undersides.",
    uses: ["Bark decoction for treating severe colds and pneumonia", "Dense yellow wood is excellent for high-grade charcoal", "Attracts bees during flower bloom"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨKINYAI",
    scientificName: "Euclea divinorum",
    family: "Ebenaceae",
    commonName: "Magic Guarri",
    description: "Much branched shrub or tree up to 10m high. Yellow fragrant flowers and shiny leaves.",
    uses: ["Roots chewed directly to relieve toothaches", "Roots produce high-grade yellow dye for fabric"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨKOE",
    scientificName: "Syzygium guineense",
    family: "Myrtaceae",
    commonName: "Water Berry",
    description: "A tall tree up to 12m high with white fragrant flowers and clusters of edible black-purple berries.",
    uses: ["Bark juice yields a strong black dye", "Edible sweet fruits", "Nectar-rich flowers for beekeeping"],
    category: "Edible"
  },
  {
    kikuyuName: "MŨKOIGO",
    scientificName: "Bridelia micrantha",
    family: "Euphorbiaceae",
    commonName: "Yoruba Ebony",
    description: "A short tree with spiny branches and dense crown. Thrives well on forest margins near water.",
    uses: ["Extremely resistant to termite attacks (preferred for granary poles and tool handles)", "Making handles for axes and hoes"],
    category: "Timber"
  },
  {
    kikuyuName: "MŨKŪNYĪ",
    scientificName: "Cardiospermum halicacabum",
    family: "Sapindaceae",
    commonName: "Balloon Vine",
    description: "A climbing vine with inflated balloon-like fruits containing 3 seeds in 3 chambers.",
    uses: ["Chewing black seeds as an immediate antidote to arrow poison", "Leaves used to prepare a medicinal wash for sore eyes"],
    safeCautions: "Raw vine elements must not be eaten in large quantities.",
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨKŪRĪ",
    scientificName: "Ocimum kilimandscharicum",
    family: "Labiatae",
    commonName: "Camphor Basil",
    description: "A highly aromatic branched woody herb with white-pink flower spikes, thriving on shallow stream soils.",
    uses: ["Baiting new beehives to attract bees due to sweet camphor scent", "Leaves brewed for severe chest colds and congestion"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨKŪYŪ",
    scientificName: "Ficus sycomorus",
    family: "Moraceae",
    commonName: "Sycamore Fig Tree",
    description: "A giant spreading riverine tree with yellowish bark and milky sap. Deeply respected as a sacred tree.",
    uses: ["Milky sap applied locally to relieve toothache", "Bark decoction used for liver troubles and acute diarrhea", "For sacred assemblies"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨRATINA",
    scientificName: "Kigelia africana",
    family: "Bignoniaceae",
    commonName: "Sausage Tree",
    description: "A tree characterized by extremely large sausage-shaped fibrous grey-green hanging fruits.",
    uses: ["Washed, sun-dried fruits are used to initiate fermentation of traditional honey and cane beer", "Brewing tonic"],
    safeCautions: "Raw green fruit is toxic and purgative; must be thoroughly washed and roasted before beer use.",
    category: "Ethnobotany"
  },
  {
    kikuyuName: "MŨRICŪ",
    scientificName: "Acokanthera schimperi",
    family: "Apocynaceae",
    commonName: "Arrow Poison Tree",
    description: "An evergreen shrub or tree up to 10m high with highly distinct fragrant pinkish tubular flowers.",
    uses: ["Boiling wood chips to produce highly lethal arrow poison (Ouabain)", "Prized hard wood for spear shafts", "Fully ripe purple fruits are edible (sweet and safe)"],
    safeCautions: "Extremely toxic. The wood sap and seeds contain cardiac glycosides that can stop the human heart in minutes if injected or eaten.",
    category: "Poisonous"
  },
  {
    kikuyuName: "MŨRĪNGA",
    scientificName: "Cordia africana",
    family: "Boraginaceae",
    commonName: "Large-leaved Cordia",
    description: "A tree growing up to 10m with beautiful white decorative flower clusters and edible yellow fruits.",
    uses: ["Light durable wood preferred for carving traditional three-legged stools and beehives", "Roots used for chest pains and throat soreness", "Shade for coffee crops"],
    category: "Timber"
  },
  {
    kikuyuName: "MŨRŪRŪE",
    scientificName: "Toddalia asiatica",
    family: "Rutaceae",
    commonName: "Orange Climber / Wild Lemon",
    description: "A sprawling prickly scrambler with yellow gland-dotted leaves and unpleasantly scented flowers.",
    uses: ["Roots decoction for bronchial chest disorders, pneumonia, and severe fever", "Flexible thorny stems are stripped and bent to form strong walking sticks"],
    safeCautions: "Small hot-tasting orange fruits are intensely spicy and can irritate sensitive throat linings.",
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨRUYA",
    scientificName: "Piper capense",
    family: "Piperaceae",
    commonName: "Wild Pepper",
    description: "A soft aromatic forest understorey herb with jointed stems and white cylindrical flower spikes.",
    uses: ["Roots utilized to spice and flavor ritual mutton soups", "Stem brewed as hot tea for sore throats and swollen uvula", "Root tea administered to lactating mothers to stimulate milk production"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨTAMAIYŪ",
    scientificName: "Olea europaea var. africana",
    family: "Oleaceae",
    commonName: "Brown Olive / Wild Olive",
    description: "A majestic, slow-growing dark canopy tree with dense wood, rough bark, and small white flowers.",
    uses: ["Stems are boiled in bone soup to treat joint backaches and painful arthritis", "Aromatic hardwood burns slowly with high heat, preferred for smoking milk calabashes to sterilize and sweeten milk", "Excellent structural timber"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨTARAKWA",
    scientificName: "Juniperus procera",
    family: "Cupressaceae",
    commonName: "African Pencil Cedar",
    description: "A high-altitude evergreen conifer reaching up to 45m. It features peeling reddish fibrous bark.",
    uses: ["Prized termite-resistant fencing posts and house construction timber", "Bark decoction used as an effective remedy for diarrhea", "Crushed leaves brewed for stomach-aches"],
    category: "Timber"
  },
  {
    kikuyuName: "MŨTATHI",
    scientificName: "Clausena anisata",
    family: "Rutaceae",
    commonName: "Horsewood",
    description: "A highly aromatic shrub containing scattered translucent oil glands on all leaves.",
    uses: ["Roots boiled for severe head colds, migraines, and postpartum body aches", "Inhaling crushed leaves for immediate sinus relief"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨTETA",
    scientificName: "Strychnos henningsii",
    family: "Loganiaceae",
    commonName: "Red Bitterberry",
    description: "Much-branched forest dry tree with small red berries. The bark is exceptionally bitter.",
    uses: ["Stems are placed in boiling meat soup as a rejuvenating health tonic", "Bitter bark tea used for stomach complaints and joint strength", "Wood for heavy handles"],
    safeCautions: "Contains strychnine-like alkaloids; must be carefully dosed.",
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨTHĪGA",
    scientificName: "Warburgia ugandensis",
    family: "Canellaceae",
    commonName: "East African Greenheart",
    description: "Sparsely growing highland forest tree. All parts including bark and leaves are intensely hot and peppery to taste.",
    uses: ["Aromatic bark chewed or boiled for deep chest pains, severe dry pneumonia, and toothache", "Leaves brewed for general systemic fever and stomach parasite eradication"],
    safeCautions: "Intensely peppery; strictly contraindicated for pregnant women.",
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨTHIRĪTĪ",
    scientificName: "Lippia javanica",
    family: "Verbenaceae",
    commonName: "Fever Tea / Lemon Bush",
    description: "A multi-stemmed sand-papery shrub of disturbed soils, emitting a heavy clean lemon-mint scent when crushed.",
    uses: ["Leaves are strewn in granaries to act as effective insect and weevil repellants", "Stems and leaves brewed as fever control tea", "Granary walls reinforcement"],
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨTHĪTHĪKŪ",
    scientificName: "Hagenia abyssinica",
    family: "Rosaceae",
    commonName: "Hagenia / Kosso",
    description: "A gorgeous mountain tree with peeling bark and large drooping clusters of dark pink flowers.",
    uses: ["Powdered inflorescence (dry flowers) taken as a potent drench to purge tapeworms and intestinal roundworms", "Bark boiled for acute diarrhea"],
    safeCautions: "High doses can irritate the kidneys.",
    category: "Medicinal"
  },
  {
    kikuyuName: "MŨTONGU",
    scientificName: "Solanum incanum",
    family: "Solanaceae",
    commonName: "Sodom Apple",
    description: "A spiny shrub up to 1.8m tall with purple star flowers and bright yellow billiard-ball-like ripe fruits.",
    uses: ["Yellow fruits are sliced and rubbed on sheep nostrils to cure respiratory colds", "Roots boiled into a bitter decoction for severe colic stomach-ache", "Fabric treatment"],
    safeCautions: "The yellow fruits are highly toxic if ingested by humans (causes vomiting, bloody diarrhea, and liver failure). Only root/juice is carefully prepped.",
    category: "Poisonous"
  },
  {
    kikuyuName: "MWĪNŪ",
    scientificName: "Cassia didymobotrya",
    family: "Caesalpiniaceae",
    commonName: "Popcorn Senna / Candle Bush",
    description: "A large sprawling unpleasant-smelling shrub with bright yellow towering candle-like flower spikes.",
    uses: ["Leaves pounded and rubbed on skin to clear stubborn fungal diseases and ringworms", "Repels bees entirely from the vicinity"],
    category: "Medicinal"
  },
  {
    kikuyuName: "NJERI-WA-RŪRĪ",
    scientificName: "Ajuga remota",
    family: "Labiatae",
    commonName: "Ajuga / Mbagazi",
    description: "A small ground-hugging low rhizomatous herb with opposite fuzzy leaves and pale blue flowers.",
    uses: ["Brewing leaves decoction as the absolute primary treatment for malaria and severe systemic fevers", "Treating stomach-ache and liver complications"],
    category: "Medicinal",
    safeCautions: "Extremely bitter."
  }
];

export function findDictionaryMatches(query: string): DictionaryEntry[] {
  const norm = (str: string) => {
    return str.toLowerCase()
      .replace(/[ĩĩ]/g, 'i')
      .replace(/[ũũ]/g, 'u')
      .replace(/[^a-z0-9\s]/g, ' ');
  };

  const qLower = norm(query).trim();
  if (!qLower) return [];

  // Stopwords list
  const stopwords = new Set([
    "i", "have", "a", "the", "and", "of", "to", "for", "in", "is", "it", "on", "with", "at",
    "using", "how", "do", "you", "use", "what", "can", "treat", "cure", "remedy", "medicinal",
    "plant", "herb", "for", "about", "find", "search", "where", "my", "some", "any", "me", "give", "tell"
  ]);

  // Extract relevant keywords
  const keywords = qLower.split(/\s+/)
    .filter(word => word.length > 2 && !stopwords.has(word));

  // If no keywords left, use unique words from query
  const queryWords = keywords.length > 0 ? keywords : qLower.split(/\s+/).filter(w => w.length > 1);

  return KIKUYU_DICTIONARY.filter(entry => {
    const kName = norm(entry.kikuyuName);
    const cName = norm(entry.commonName || "");
    const sName = norm(entry.scientificName || "");
    const desc = norm(entry.description || "");
    const usesStr = norm((entry.uses || []).join(" "));
    const cautions = norm(entry.safeCautions || "");

    // 1. Check if complete Normalized query is present in any field OR any field is present in normalized query
    if (qLower.includes(kName) || kName.includes(qLower) ||
        (cName && (qLower.includes(cName) || cName.includes(qLower))) ||
        (sName && (qLower.includes(sName) || sName.includes(qLower))) ||
        (desc && desc.includes(qLower)) ||
        (usesStr && usesStr.includes(qLower)) ||
        (cautions && cautions.includes(qLower))) {
      return true;
    }

    // 2. Keyword-based matching
    if (queryWords.length > 0) {
      return queryWords.some(word => {
        return kName.includes(word) ||
               cName.includes(word) ||
               sName.includes(word) ||
               desc.includes(word) ||
               usesStr.includes(word) ||
               cautions.includes(word);
      });
    }

    return false;
  });
}
