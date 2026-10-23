import { Herb, BlogPost, TraditionalRemedy, KnowledgeBaseArticle } from '../types';

export const INITIAL_HERBS: Herb[] = [
  {
    id: '1',
    kikuyuName: 'MŨTHĨGA',
    commonName: 'Pepper Bark Tree',
    scientificName: 'Warburgia ugandensis',
    acceptedBotanicalName: 'Warburgia ugandensis Sprague subsp. ugandensis',
    botanicalFamily: 'Canellaceae',
    englishName: 'East African Greenheart / Pepper Bark Tree',
    swahiliName: 'Mkarambaki / Msanduku',
    luoName: 'Soko / Osoko',
    kambaName: 'Mũthĩka / Mũkatha',
    otherLocalNames: [
      { language: 'Maasai', name: 'Ol-sogonoi', locality: 'Narok & Kajiado highlands', documentedBy: 'Maasai Traditional Ethnobotanical Survey' },
      { language: 'Meru', name: 'Muthiga', locality: 'Mount Kenya Eastern slopes', documentedBy: 'Meru Elder Council' },
      { language: 'Samburu', name: 'Sokonoi', locality: 'Mathews Range & Leroghi Plateau', documentedBy: 'Samburu Pastoralist Flora Documentation' },
      { language: 'Kalenjin (Kipsigis)', name: 'Soget', locality: 'Mau Forest Complex', documentedBy: 'Kericho Ethnobotanical Archives' }
    ],
    partUsed: 'Inner Bark, Leaves',
    description: 'A stately evergreen forest tree found throughout East African highlands. It is highly aromatic, characterized by a hot, pepper-like taste in all parts.',
    distinguishingCharacteristics: 'Densely leafy evergreen canopy up to 25m tall; glossy dark-green leaves (elliptic to oblong) with an intense peppery-pungent, fiery aroma when crushed; smooth greyish bark on young branches turning blackish-brown and rough with rectangular fissures on mature trunks; small greenish-white flowers and purple-black spherical berries containing oily seeds.',
    habitat: 'Moist and dry Afromontane evergreen forests, riverine forests, and upland mist forest edges at altitudes of 1,000m to 2,200m.',
    geographicalDistribution: 'Central Kenya highlands (Aberdare Ranges, Mount Kenya foothills), Mau Forest Complex, Cherangani Hills, Rift Valley escarpments, and Kakamega forest borders.',
    preparation: 'Boil dried bark pieces in water or milk for 30 minutes to make a strong peppery decoction. Alternatively, powder the dry bark and mix with warm water or honey.',
    preparationMethods: [
      'Boil 15-20g of dried inner bark in 500ml water or whole milk for 25-30 minutes until peppery aromatic steam rises.',
      'Finely pulverize dry cured bark into a sifted powder; blend 1/2 teaspoon into warm water with a teaspoon of pure wild forest honey.',
      'Sip warm infusion slowly after meals to loosen respiratory mucus and coat bronchial tissues.'
    ],
    medicinalUses: [
      'Relieves dry and chesty coughs',
      'Eases chest pain and respiratory congestion',
      'Acts as a traditional treatment for malaria and recurrent fevers',
      'Soothes persistent stomach aches and digestive disorders',
      'Possesses powerful antimicrobial, antifungal, and antibacterial properties'
    ],
    documentedUses: [
      { use: 'Relief of chronic bronchial coughs, asthma spasms, and chest tightness', communityOrSource: 'Gĩkũyũ and Meru Highland Healers', verifiedStatus: 'documented' },
      { use: 'Decoctions for fever and malaria symptoms', communityOrSource: 'KEMRI Centre for Traditional Medicine Research', verifiedStatus: 'documented' },
      { use: 'Chewing raw bark shavings for breath freshness and oral microbial cleansing', communityOrSource: 'Maasai and Samburu Morans', verifiedStatus: 'oral_lore' },
      { use: 'Digestive colic and intestinal spasm relief', communityOrSource: 'Beentje - Kenya Trees, Shrubs and Lianas', verifiedStatus: 'documented' }
    ],
    traditionalContext: 'One of the most sacred and respected medicinal trees in Gĩkũyũ and East African culture. Its fiery heat is believed to "burn away" respiratory impurities and parasites.',
    culturalSignificance: 'Regarded as an elder diagnostic and curative pillar across Central and Rift Valley communities. Warriors carried dried bark chips on pastoral patrols as an energetic tonic and respiratory shield against highland chill.',
    oralHistory: 'Oral traditions recall that medicinal harvest was always preceded by a respectful greeting to the tree, acknowledging its curative spirit and offering thanks for forest vitality.',
    culturalRestrictions: 'Strict traditional harvesting ethics forbid ring-barking (debarking the entire circumference). Debarking must never exceed two opposite vertical strips to allow cambium regeneration.',
    consentStatus: 'public_domain',
    conservationStatus: 'Vulnerable',
    threats: [
      'Overharvesting and destructive full ring-barking for commercial urban herb markets',
      'Forest habitat fragmentation in montane highland zones',
      'Slow seedling regeneration in disturbed soils'
    ],
    conservationPractices: 'Strict promotion of vertical strip harvesting (opposite quadrants only, maximum 20% of bark surface); community nursery seed propagation in Murang\'a and Nyeri.',
    precautions: 'Extremely strong. Avoid taking on an empty stomach. Highly discouraged for pregnant women as it may stimulate uterine contractions. Keep doses limited to 1 cup twice daily.',
    contraindications: [
      'Pregnancy: May induce uterine muscle stimulation and spasms',
      'Peptic or gastric ulcers: High pungent resins and dialdehydes can irritate gastric lining',
      'Infants and children under 5 years old: Mucosal volatility is excessive'
    ],
    knownRisks: [
      'Can cause temporary gastrointestinal burning sensation if ingested without food or milk dilution',
      'Excessive doses may induce nausea or mild dizziness'
    ],
    safetyWarnings: 'Do not consume concentrated unboiled sap or raw bulk quantities. Always dilute with water, milk, or porridge. Consult healthcare professionals if symptoms persist beyond 5 days.',
    scientificReferences: [
      'Wube, A. A., et al. (2005). Drimane sesquiterpenes from Warburgia ugandensis and their antimycobacterial activity. Phytochemistry, 66(19), 2309-2315.',
      'Kioy, D., et al. (1990). Traditional antimalarial herbal medicine in Kenya. East African Medical Journal, 67(12), 856-860.',
      'Beentje, H. J. (1994). Kenya Trees, Shrubs and Lianas. National Museums of Kenya, Nairobi.'
    ],
    traditionalKnowledgeSources: [
      'Gĩkũyũ Council of Elders Ethnobotanical Custodians (Nyeri & Kirinyaga)',
      'National Museums of Kenya East African Herbarium (EA)',
      'KEMRI Traditional Medicine and Drug Development Programme'
    ],
    sourceUrls: [
      'https://www.worldagroforestry.org/treedb/AFTPDFS/Warburgia_ugandensis.PDF',
      'https://apiv3.iucnredlist.org'
    ],
    category: 'Respiratory',
    imageColor: 'from-emerald-800 via-green-900 to-teal-950',
    imageUrl: 'https://i.postimg.cc/FzRGZDqb/Warburgia-ugandensis.webp',
    photographs: [
      {
        url: 'https://i.postimg.cc/FzRGZDqb/Warburgia-ugandensis.webp',
        caption: 'Mature Warburgia ugandensis canopy and foliage showing deep glossy leaves and textured bark',
        provenance: 'East African Botanical Archive / DawaKienyeji Herbarium Index',
        photographer: 'East African Ethnobotany Collaborative',
        license: 'Educational & Cultural Heritage Documentation',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Caution'
  },
  {
    id: '2',
    kikuyuName: 'MŨTONGU',
    commonName: 'Sodom Apple',
    scientificName: 'Solanum incanum',
    acceptedBotanicalName: 'Solanum incanum L.',
    botanicalFamily: 'Solanaceae',
    englishName: 'Sodom Apple / Thorn Apple / Bitter Apple',
    swahiliName: 'Mtunguja / Mndulele',
    luoName: 'Ochok / Achok',
    kambaName: 'Mutongu',
    otherLocalNames: [
      { language: 'Maasai', name: 'Enkopikopiko / Enkokoitioi', locality: 'Kajiado & Narok rangelands', documentedBy: 'Loita Pastoralist Ethnobotany' },
      { language: 'Kalenjin', name: 'Cheptokwet', locality: 'Baringo & Elgeyo Marakwet', documentedBy: 'Rift Valley Ethnomedical Survey' },
      { language: 'Turkana', name: 'Etete', locality: 'Turkana plains', documentedBy: 'Turkana Indigenous Flora Records' },
      { language: 'Taita', name: 'Ndulele', locality: 'Taita Hills foothills', documentedBy: 'Coast Province Ethnobotany Archive' }
    ],
    partUsed: 'Roots, Fruit Juice',
    description: 'A thorny, bitter shrub widespread in Kenya, easily recognized by its small yellow spherical fruits, light purple flowers, and fuzzy grey-green leaves.',
    distinguishingCharacteristics: 'Stout, erect semi-woody shrub 1–2m tall; armed with sharp yellowish spines on stems, leaf stalks, and leaf midribs; velvety stellate hairs give foliage a pale greyish-green hue; flowers 5-lobed, pale purple to mauve with prominent yellow stamens; fruits smooth spherical berries 2.5–3.5cm wide turning bright lemon-yellow when ripe.',
    habitat: 'Degraded pastures, dry wooded bushlands, overgrazed grasslands, roadsides, and wasteland fringes from 0m to 2,500m elevation.',
    geographicalDistribution: 'Ubiquitous throughout Kenya: Central Highlands, Eastern semi-arid rangelands, Rift Valley floor, Western plains, and Coastal hinterland.',
    preparation: 'Boil clean, chopped root pieces in water to treat internal stomach pain. For localized toothache, wash and chew on a small piece of fresh root tip directly on the painful tooth (spit out saliva, do not swallow). Apply juice of the ripe yellow fruit topically to clean skin infections.',
    preparationMethods: [
      'For severe toothache: Wash and scrape 2cm of fresh root tip thoroughly in clean water; place tip onto the aching tooth cavity and bite down gently; continuously spit out all generated saliva for 3 minutes without swallowing.',
      'For dermal ringworm or warts: Puncture a ripe yellow berry and express 2-3 drops of cloudy sap directly onto the clean dry lesion; let dry for 20 minutes before gently washing off.'
    ],
    medicinalUses: [
      'Alleviates severe toothaches and gum swelling',
      'Relieves intense abdominal pains and indigestion',
      'Clears fungal skin conditions like ringworm, warts, and scabies (juice applied topically)',
      'Acts as a traditional antidote for snakebites when roots are crushed and applied immediately'
    ],
    documentedUses: [
      { use: 'Chewing fresh root tip for immediate temporary numbing of dental caries (saliva spit out strictly)', communityOrSource: 'Kikuyu and Kamba rural elders', verifiedStatus: 'documented' },
      { use: 'Topical application of fruit juice for ringworm (tinea capitis/corporis) and warts', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' },
      { use: 'Topical emergency poultice for snakebite punctures before medical transit', communityOrSource: 'Pastoralist first-aid oral accounts', verifiedStatus: 'oral_lore' }
    ],
    traditionalContext: 'Mũtongu is a core fixture in ancient Kikuyu veterinary and human first aid. The fruits are universally known for their bitter properties and are strictly decorative or topical, never edible.',
    culturalSignificance: 'Regarded as a resilient boundary plant. Yellow fruits were historically used in children\'s mock spear games and rural veterinary dipping, but elders strictly taught children from infancy never to consume the fruit.',
    oralHistory: 'Grandmothers often warned: "The fruit is yellow as gold, but bitter as poison." This mnemonic prevented accidental ingestion by young children across pastoral grazing fields.',
    culturalRestrictions: 'Strictly prohibited from ever being mixed into general food pots or shared cooking vessels.',
    consentStatus: 'public_domain',
    conservationStatus: 'Least Concern',
    threats: [
      'No conservation threat; thrives in disturbed environments as a pioneer colonizer.'
    ],
    conservationPractices: 'Sustainable collection requires harvesting only secondary rootlets while preserving the primary root system.',
    precautions: 'The orange/yellow fruits are highly TOXIC if swallowed. Apply fruit sap topically with high caution—avoid contact with eyes and open wounds. Children should not handle the fruits.',
    contraindications: [
      'Internal ingestion of ripe or raw fruits is strictly contraindicated under all circumstances',
      'Application near eyes, open mucus membranes, or deep bleeding wounds',
      'Usage by young children without strict adult supervision'
    ],
    knownRisks: [
      'High concentrations of toxic steroidal glycoalkaloids (solanine, solamargine, solasonine)',
      'Ingestion causes gastrointestinal necrosis, vomiting, bradycardia, dilation of pupils, and neurological toxicity'
    ],
    safetyWarnings: 'DANGEROUS IF SWALLOWED. Ripe yellow fruits are poisonous. Never swallow saliva when chewing root for toothache. Seek emergency medical care immediately if swallowed.',
    scientificReferences: [
      'Kokwaro, J. O. (2009). Medicinal Plants of East Africa (3rd ed.). University of Nairobi Press.',
      'Britto, A. J., & Gracelin, D. H. (2011). Phytochemical analysis of Solanum incanum L. International Journal of Pharmacy and Pharmaceutical Sciences, 3(4), 356-359.'
    ],
    traditionalKnowledgeSources: [
      'Ethnobotanical Surveys of Central and Eastern Kenya Rural Communities',
      'National Museums of Kenya Indigenous Knowledge Department'
    ],
    sourceUrls: [
      'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:819441-1'
    ],
    category: 'Pain relief',
    imageColor: 'from-amber-600 via-yellow-700 to-stone-800',
    imageUrl: 'https://i.postimg.cc/LsgpyVdd/Solanum-incanum.webp',
    photographs: [
      {
        url: 'https://i.postimg.cc/LsgpyVdd/Solanum-incanum.webp',
        caption: 'Solanum incanum showing characteristic yellow globose fruit, purple flowers and thorny spiny stems',
        provenance: 'Kenyan Rangeland Biodiversity Survey / DawaKienyeji Catalog',
        photographer: 'Field Flora Survey Group',
        license: 'Educational & Research Creative Commons',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Medicinal Only'
  },
  {
    id: '3',
    kikuyuName: 'MŨNDERENDU',
    commonName: 'Noble Teclea',
    scientificName: 'Teclea nobilis',
    acceptedBotanicalName: 'Vepris nobilis (Delile) Mziray',
    botanicalFamily: 'Rutaceae',
    englishName: 'Noble Teclea / Small-fruited Teclea',
    swahiliName: 'Munderendu / Mti-chuma',
    luoName: 'Kudu / Orombe',
    kambaName: 'Munderendu / Mukumuti',
    otherLocalNames: [
      { language: 'Meru', name: 'Muthiru', locality: 'Meru & Tharaka Nithi highlands', documentedBy: 'Mount Kenya Ethnobotany Project' },
      { language: 'Maasai', name: 'Ol-gelai', locality: 'Loita Hills & Narok mist forest', documentedBy: 'Maasai Traditional Council' },
      { language: 'Kipsigis', name: 'Kuriot', locality: 'Mau Forest Complex', documentedBy: 'South Rift Botanical Archive' }
    ],
    partUsed: 'Leaves, Bark',
    description: 'A smooth-barked indigenous evergreen tree reaching up to 15 meters, commonly growing in the mist forests and highland undergrowth of Kenya.',
    distinguishingCharacteristics: 'Evergreen tree or tall shrub (5–15m); smooth pale grey to mottled bark; leaves alternate and trifoliate (with 3 elliptic-lanceolate leaflets) marked with translucent glandular dots that release a fresh citrus-lemon scent when rubbed; small cream-yellow fragrant flowers in dense terminal panicles; small red ovoid fleshy berries.',
    habitat: 'Afromontane moist evergreen forests, highland forest margins, mist valleys, and riverine thickets between 1,300m and 2,600m altitude.',
    geographicalDistribution: 'Central Kenya highlands (Mount Kenya, Aberdares), Mau Forest Complex, Cherangani Hills, and Taita Hills.',
    preparation: 'Boil bark or fresh leaves in water for 40 minutes. The resulting pale-green tea is drunk warm. For external joint pain, prepare a concentrated hot leaf brew and add it to a warm hydrotherapy bath, or compress soaked cloths directly to inflamed areas.',
    preparationMethods: [
      'Hydrotherapy bath for muscle stiffness: Boil a large bundle (about 500g) of fresh leafy branchlets in 10 liters of water for 45 minutes; pour the fragrant citrus-steam broth into a hot soak bath.',
      'Oral decoction: Simmer 20g of bark or dry crushed leaves in 500ml water for 30 minutes; strain and drink 1/2 teacup warm twice daily for fevers and joint aches.'
    ],
    medicinalUses: [
      'Relieves shooting joint pain, osteoarthritis, and rheumatism',
      'Soothes chronic backaches and physical fatigue',
      'Dispels high fevers and reduces malaria chill symptoms',
      'Relieves muscle tension and severe body stiffness'
    ],
    documentedUses: [
      { use: 'Warm hydrotherapy baths and compresses for joint stiffness and post-battle physical fatigue', communityOrSource: 'Gĩkũyũ and Meru historical lore', verifiedStatus: 'documented' },
      { use: 'Decoction of leaves and bark for malaria chills and recurrent fevers', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' },
      { use: 'Bark chewed as an aromatic tooth cleaner and mouth freshener', communityOrSource: 'Kipsigis traditional elders', verifiedStatus: 'oral_lore' }
    ],
    traditionalContext: 'Traditionally regarded as a muscle restorer. Gĩkũyũ warriors returning from long expeditions would soak in warm Mũnderendu baths to heal bruises and relieve physical exhaust.',
    culturalSignificance: 'Wood is exceptionally dense, resilient, and elastic; revered for making traditional walking staves, bows, and spear handles, symbolizing unyielding fortitude.',
    oralHistory: 'Clan elders recount that wounded scouts were placed on mats beside simmering pots of Mũnderendu leaves so the medicinal steam could relax deep bodily fatigue.',
    culturalRestrictions: 'Harvesting is traditionally limited to pruning side branches and stripping modest vertical bark patches; cutting mature living trees for fuel is discouraged.',
    consentStatus: 'public_domain',
    conservationStatus: 'Least Concern',
    threats: [
      'Selective logging in indigenous mist forests for high-density tool handles',
      'Montane forest clearing for farm settlements'
    ],
    conservationPractices: 'Protected within national park and forest reserve boundaries; regeneration easily encouraged from seed.',
    precautions: 'Generally safe and non-toxic, but should only be consumed by adults. Limit use to one week consecutively.',
    contraindications: [
      'Pregnancy: Avoid concentrated internal decoctions without herbalist supervision',
      'Use for more than 7 consecutive days without rest intervals'
    ],
    knownRisks: [
      'High concentrations may cause mild transient stomach cramps if consumed excessively'
    ],
    safetyWarnings: 'External bath applications are exceptionally safe. Oral intake should remain within documented limits (1/2 cup twice daily).',
    scientificReferences: [
      'Mziray, W. (1992). The genus Vepris Comm. ex A. Juss. (Rutaceae). Symbolae Botanicae Upsalienses, 30(1), 1-85.',
      'Wanjohi, J. M., et al. (2005). Alkaloids and coumarins from Teclea nobilis. Biochemical Systematics and Ecology, 33(10), 1073-1076.'
    ],
    traditionalKnowledgeSources: [
      'Kikuyu Traditional Herbal Practitioners Association',
      'East African Herbarium Botanical Field Records'
    ],
    sourceUrls: [
      'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:969179-1'
    ],
    category: 'Pain relief',
    imageColor: 'from-teal-700 via-green-800 to-emerald-950',
    imageUrl: 'https://i.postimg.cc/HnR0tHbj/Teclea-nobilis.jpg',
    photographs: [
      {
        url: 'https://i.postimg.cc/HnR0tHbj/Teclea-nobilis.jpg',
        caption: 'Teclea nobilis foliage and branches showing characteristic trifoliate leaves and smooth grey bark',
        provenance: 'Aberdare Forest Reserve Specimen Collection',
        photographer: 'Mount Kenya Botanical Survey',
        license: 'Educational & Cultural Documentation',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Safe'
  },
  {
    id: '4',
    kikuyuName: 'MŨCOROI',
    commonName: 'African Cherry',
    scientificName: 'Prunus africana',
    acceptedBotanicalName: 'Prunus africana (Hook.f.) Kalkman',
    botanicalFamily: 'Rosaceae',
    englishName: 'African Cherry / Red Stinkwood / Pygeum',
    swahiliName: 'Mkonde-konde / Kiburabura',
    luoName: 'Twon-doko',
    kambaName: 'Mũwawa',
    otherLocalNames: [
      { language: 'Marakwet', name: 'Tendwet', locality: 'Cherangani Hills & Elgeyo Escarpment', documentedBy: 'Marakwet Ethnomedical Field Studies' },
      { language: 'Meru', name: 'Mwera', locality: 'Nyambene Hills & Mount Kenya East', documentedBy: 'Meru Forestry Elders' },
      { language: 'Kipsigis', name: 'Tenduet', locality: 'Mau Forest Complex', documentedBy: 'South Rift Conservation Archive' },
      { language: 'Kikuyu', name: 'Mũiri (Alternate name)', locality: 'Kiambu & Murang\'a ridge forests', documentedBy: 'Gĩkũyũ Botanical Lexicon' }
    ],
    partUsed: 'Reddish-brown Bark',
    description: 'A handsome, tall canopy tree native to montane forests, with dark glossy leaves and red-brown rough bark that gives off a distinct bitter almond scent when cut.',
    distinguishingCharacteristics: 'Magnificent canopy tree 10–35m tall; distinctive dark brown to reddish-black rough bark with deep longitudinal fissures and square scales; cut bark releases a faint hydrocyanic / bitter almond aroma; leaves alternate, glossy dark-green, elliptic with finely serrated margins and pinkish stalks; small white or cream flowers followed by bitter purple-black cherry fruits.',
    habitat: 'Undisturbed moist montane evergreen forests, mist belts, and canopy ridges between 1,500m and 2,800m altitude.',
    geographicalDistribution: 'Central Highlands (Aberdares, Mount Kenya), Mau Forest Complex, Cherangani Hills, Kakamega Forest, and Taita Hills cloud forests.',
    preparation: 'Clean, dry and shave the bark. Boil a small handful of bark shavings in 1 liter of fresh water for 45 minutes until the tea turns deeply dark red. Drink 1 cup in the morning and 1 cup at night.',
    preparationMethods: [
      'Gently clean dry bark shavings and crush lightly; boil 20-25g in 1 liter of pure water for 40-45 minutes until the decoction turns a deep ruby-red color.',
      'Allow decoction to cool; strain thoroughly through clean cloth and store in a clean thermos flask; consume 1 cup in the morning and 1 cup before evening rest for a 21-day course.'
    ],
    medicinalUses: [
      'Specifically relieves urinary symptoms of Benign Prostatic Hyperplasia (prostate enlargement)',
      'Eases difficulty in starting urination, frequent nighttime urination, and bladder inflammation',
      'Treats internal fevers, chest tightness, and chronic kidney fatigue'
    ],
    documentedUses: [
      { use: 'Relief of nocturnal pollakiuria (frequent night urination) and urinary hesitancy in aging men', communityOrSource: 'Gĩkũyũ and Kipsigis elder medicine men; validated by WHO Monograph', verifiedStatus: 'documented' },
      { use: 'Boiled bark tea for chest pains, malaria fevers, and kidney tonic', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' },
      { use: 'Powdered bark combined with honey for chronic respiratory ailments', communityOrSource: 'Meru indigenous health records', verifiedStatus: 'oral_lore' }
    ],
    traditionalContext: 'Highly respected across mathematical and modern medicine. Historically used by elderly Kikuyu men to manage prostate ailments. Today, it is an internationally protected tree harvested globally for prostate medications.',
    culturalSignificance: 'Regarded as an elder statesman tree. In traditional councils, mature men suffering from weakened urine stream were treated with reverence and prescribed Mũcoroi tea to restore bladder balance.',
    oralHistory: 'Because the cut bark bleeds red and smells of almond, ancient medicine men considered it a powerful restorative that renewed internal fluids and guarded vitality into old age.',
    culturalRestrictions: 'Strictly protected under CITES Appendix II. Girdling or felling the tree for bark is considered an ecological and spiritual crime. Commercial trade without certified permit is illegal under Kenyan law.',
    consentStatus: 'public_domain',
    conservationStatus: 'Vulnerable',
    threats: [
      'Destructive complete ring-barking (girdling) by illicit international commercial bark harvesters',
      'Montane forest clearing and timber exploitation',
      'Loss of primary seed-dispersing montane bird and primate populations'
    ],
    conservationPractices: 'CITES Appendix II regulation; strict enforcement of two-quadrant vertical strip debarking; active on-farm seedling agroforestry planting by KEFRI.',
    precautions: 'Prostate symptoms can be indicators of serious diseases and need professional evaluation. Harvesting must only use sustainable vertical strips to avoid girdling (killing) the tree.',
    contraindications: [
      'Acute complete urinary retention requiring immediate emergency clinical catheterization',
      'Prostatic adenocarcinoma (prostate cancer) — requires formal clinical diagnostic screening and PSA testing',
      'Known hypersensitivity to pygeum extract or rosaceous species'
    ],
    knownRisks: [
      'Mild gastrointestinal complaints (nausea, mild diarrhea, stomach rumbling) in rare sensitive individuals'
    ],
    safetyWarnings: 'Urinary blockage can cause acute kidney injury. Any patient experiencing sudden inability to urinate or blood in urine must visit an emergency hospital immediately.',
    scientificReferences: [
      'Wilt, T., et al. (2002). Pygeum africanum for benign prostatic hyperplasia. Cochrane Database of Systematic Reviews, (1), CD001044.',
      'Cunningham, A. B., & Mbenkum, F. T. (1993). Sustainability of harvesting Prunus africana bark in Cameroon. People and Plants Working Paper, 2.',
      'Bii, C. C., et al. (2010). The antifungal activity of Prunus africana. African Journal of Health Sciences, 17(1-2), 24-29.'
    ],
    traditionalKnowledgeSources: [
      'Kenya Forestry Research Institute (KEFRI) Agroforestry Monograph',
      'World Health Organization (WHO) Monographs on Selected Medicinal Plants (Vol. 2)',
      'Central Kenya Indigenous Healers Ethnobotanical Archive'
    ],
    sourceUrls: [
      'https://www.iucnredlist.org/species/33631/9799014',
      'https://cites.org/eng/prog/terrestrial_flora/prunus_africana'
    ],
    category: 'Prostate & Urinary',
    imageColor: 'from-amber-800 via-orange-950 to-stone-950',
    imageUrl: 'https://i.postimg.cc/LsxyGJPW/Prunus-africana.jpg',
    photographs: [
      {
        url: 'https://i.postimg.cc/LsxyGJPW/Prunus-africana.jpg',
        caption: 'Prunus africana mature trunk showing deep reddish-brown fissured bark and montane foliage',
        provenance: 'KEFRI Muguga Research Center Botanical Garden',
        photographer: 'Kenya Forest Service Documentation',
        license: 'Public Educational Access',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Medicinal Only'
  },
  {
    id: '5',
    kikuyuName: 'MŨCATHA',
    commonName: 'Bitter Leaf Vernonia',
    scientificName: 'Vernonia lasiopus',
    acceptedBotanicalName: 'Vernonia lasiopus O.Hoffm.',
    botanicalFamily: 'Asteraceae',
    englishName: 'Bitter Leaf Vernonia',
    swahiliName: 'Msubi / Mshubaka',
    luoName: 'Olusia / Akech',
    kambaName: 'Muthatha',
    otherLocalNames: [
      { language: 'Embu', name: 'Mucatha', locality: 'Embu & Mbeere foothills', documentedBy: 'Eastern Region Ethnobotany Index' },
      { language: 'Meru', name: 'Mucatha', locality: 'Meru County', documentedBy: 'Nyambene Flora Studies' },
      { language: 'Kalenjin (Nandi)', name: 'Tebengwet', locality: 'Nandi Hills', documentedBy: 'Western Highlands Medicinal Plants Survey' }
    ],
    partUsed: 'Leaves, Leaf Bud, Soft Stems',
    description: 'An aggressive, leafy bitter shrub common along forest margins, abandoned farmlands, and riversides in central Kenya.',
    distinguishingCharacteristics: 'Spreading multi-stemmed woody shrub 1.5–3m tall; leaves alternate, ovate to elliptic with coarsely toothed margins, upper surface dark green, lower surface densely covered with pale whitish-grey velvety hairs; intensely bitter taste noticeable in all green parts; flower heads clustered in terminal corymbs, white to pale mauve or lavender.',
    habitat: 'Secondary scrub, abandoned cultivation margins, riverbanks, forest edges, and disturbed hillsides between 1,000m and 2,400m altitude.',
    geographicalDistribution: 'Central Kenya, Eastern Kenya, Rift Valley highlands, and Lake Victoria basin.',
    preparation: 'Squeeze a fresh handful of leaves in cold water, filter out the debris, and drink the highly bitter green juice, or boil dried leaves to create a tea. Often sweetened with natural wild honey.',
    preparationMethods: [
      'Cold infusion: Macerate 5-6 fresh leaves in 300ml cold clean water, squeeze vigorously by hand until the water turns dark olive green; strain thoroughly; drink 1/2 cup on an empty stomach for worms or stomach colic.',
      'Warm decoction: Boil 10g dried leaves in 400ml water for 15 minutes; add 1 teaspoon pure honey to moderate bitterness.'
    ],
    medicinalUses: [
      'Acts as a rapid remedy for malaria-induced headaches and joint aches',
      'Eliminates intestinal worms, roundworms, and threadworms',
      'Soothes indigestion, severe gas, bloating, and stomach cramps',
      'Stimulates appetite and acts as a moderate natural colon cleanser'
    ],
    documentedUses: [
      { use: 'Fever abatement and headache relief associated with malaria infections', communityOrSource: 'KEMRI and University of Nairobi Ethnobotanical Records', verifiedStatus: 'documented' },
      { use: 'Anthelmintic purge for roundworms, pinworms, and gastrointestinal parasites', communityOrSource: 'Gĩkũyũ and Embu rural mothers', verifiedStatus: 'documented' },
      { use: 'Appetite stimulant and dyspepsia cure after chronic illnesses', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' }
    ],
    traditionalContext: 'An essential "backyard pharmacy" plant. Its striking bitter taste earned it a legendary status for testing children\'s bravery. If a child suffered indigestion, a cup of Mũcatha was immediately brewed by grandmothers.',
    culturalSignificance: 'Universally respected as the household guardian against childhood worms. The extreme bitterness was regarded as an empirical proof of medicinal vitality.',
    oralHistory: 'Kikuyu grandmothers would hold the cup and say: "The bitterness you taste now will sweeten your blood by nightfall."',
    culturalRestrictions: 'Free communal access; no spiritual restrictions on harvesting for domestic healing.',
    consentStatus: 'public_domain',
    conservationStatus: 'Least Concern',
    threats: [
      'Resilient pioneer shrub with no current conservation vulnerability.'
    ],
    conservationPractices: 'Grows readily from cuttings; recommended for living fences around homesteads.',
    precautions: 'Extremely bitter, which might trigger temporary nausea in sensitive individuals. Safe for children over 5 years in diluted half-portions.',
    contraindications: [
      'Early pregnancy: Excessive high-bitter tonics may stimulate reflex uterine cramping',
      'Severe gastroesophageal acid reflux (GERD) or bleeding stomach ulcers'
    ],
    knownRisks: [
      'Transient nausea or gag reflex if drunk too rapidly due to intense bitter sesquiterpene lactones'
    ],
    safetyWarnings: 'Dilute portions for children over 5 years old. Drink in small slow sips rather than gulping.',
    scientificReferences: [
      'Kareru, P. G., et al. (2008). Anthelmintic activity of Vernonia lasiopus against gastrointestinal nematodes. African Journal of Traditional, Complementary and Alternative Medicines, 5(1), 89-95.',
      'Muregi, F. W., et al. (2003). In vitro antiplasmodial activity of some Kenyan medicinal plant extracts. Journal of Ethnopharmacology, 84(2-3), 235-239.'
    ],
    traditionalKnowledgeSources: [
      'Community Pharmacopoeia of Central Kenya Rural Homesteads',
      'National Museums of Kenya Ethnobotany Herbarium'
    ],
    sourceUrls: [
      'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:262332-1'
    ],
    category: 'Digestive',
    imageColor: 'from-lime-800 via-green-800 to-emerald-900',
    imageUrl: 'https://i.postimg.cc/8kWNhGMG/Vernonia-lasiopus.jpg',
    photographs: [
      {
        url: 'https://i.postimg.cc/8kWNhGMG/Vernonia-lasiopus.jpg',
        caption: 'Vernonia lasiopus shrub showing velvety toothed leaves and terminal thistle-like flower clusters',
        provenance: 'Central Kenya Field Botanical Repository',
        photographer: 'Kenya Indigenous Herbal Network',
        license: 'Educational Creative Commons',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Safe'
  },
  {
    id: '6',
    kikuyuName: 'MŨRURŨACUA',
    commonName: 'Popcorn Senna',
    scientificName: 'Senna didymobotrya',
    acceptedBotanicalName: 'Senna didymobotrya (Fresen.) H.S.Irwin & Barneby',
    botanicalFamily: 'Fabaceae',
    englishName: 'Popcorn Senna / African Senna / Candelabra Bush',
    swahiliName: 'Mseneko / Mvuti',
    luoName: 'Owinu / Obeno',
    kambaName: 'Kiluma / Kitula',
    otherLocalNames: [
      { language: 'Maasai', name: 'Senetoi', locality: 'Narok & Kajiado seasonal streams', documentedBy: 'Maasai Rangeland Plants Register' },
      { language: 'Kipsigis', name: 'Senetwet', locality: 'Kericho & Bomet', documentedBy: 'South Rift Ethnobotanical Archive' },
      { language: 'Luhya (Bukusu)', name: 'Lisineno', locality: 'Bungoma & Kakamega', documentedBy: 'Western Kenya Cultural Survey' }
    ],
    partUsed: 'Leaves, Bright Yellow Flowers',
    description: 'A rounded shrub with distinctive erect golden-yellow flower clusters, and leaves that emit an unmistakable smell reminiscent of toasted peanut butter or popcorn when brushed.',
    distinguishingCharacteristics: 'Sprawling multi-stemmed evergreen shrub 2–4m tall; leaves pinnate with 8–18 pairs of oval leaflets; crushing leaves emits a strong peanut butter or freshly popped corn fragrance; flower racemes are erect spike-like clusters (up to 30cm) featuring striking dark brown to blackish buds opening into bright golden-yellow petals; flat brown papery pods.',
    habitat: 'Moist waste places, riverine alluvial thickets, degraded hillsides, road edges, and lakeshores between 900m and 2,400m altitude.',
    geographicalDistribution: 'Extensive throughout Kenya, particularly in the Central Highlands, Rift Valley, Western highlands, and Nairobi environs.',
    preparation: 'To cure skin conditions, crush fresh leaves with a little water or castor oil to make a fine poultice. Apply onto eczema or ringworm patches for 25 minutes, then rinse. For laxative purposes, steep 2-3 dried leaves in hot water (drink very sparingly).',
    preparationMethods: [
      'Topical antifungal paste: Pound 8-10 fresh leaves in a clean wooden mortar with 3 drops of pure castor oil or water until a smooth emerald paste forms; smooth directly over ringworm or fungal patches; leave on for 20-25 minutes before washing with lukewarm water.',
      'Gourd cleansing: Pastoralists smoke dried stems inside milk gourds to impart fragrance and microbial preservation.'
    ],
    medicinalUses: [
      'Cures persistent ringworm, athlete\'s foot, and scabies topically',
      'Acts as a highly potent natural cleanser for chronic skin blemishes, acne, and dry eczema',
      'Prescribed in ancient times for intense constipation due to its strong laxative mechanisms'
    ],
    documentedUses: [
      { use: 'Topical poultice for fungal ringworm (tinea capitis, tinea versicolor) and stubborn skin lesions', communityOrSource: 'Gĩkũyũ and Kamba traditional dermatological practices', verifiedStatus: 'documented' },
      { use: 'Antiseptic smoke and aroma for sanitizing traditional milk gourds (soet)', communityOrSource: 'Maasai and Kipsigis pastoralists', verifiedStatus: 'documented' },
      { use: 'Cautious strong purgative for chronic intestinal blockage', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' }
    ],
    traditionalContext: 'Revered of its rapid anti-parasitic dermal capabilities. Widely utilized in pastoralist communities to cleanse milk storage gourds (giving them a pleasant smoked aroma).',
    culturalSignificance: 'Regarded as a cleansing shield. Pastoralists burned dried stems inside milk calabashes, creating an aromatic anti-bacterial film that kept milk fresh during seasonal droughts.',
    oralHistory: 'Traditional pastoralist lore recounts that warriors returning from long trails cleansed their feet in Senna leaf washes to dispel jungle rot and foot fungus.',
    culturalRestrictions: 'Internal oral ingestion is strictly restricted by elders due to severe purgative action; unsupervised ingestion is taboo.',
    consentStatus: 'public_domain',
    conservationStatus: 'Least Concern',
    threats: [
      'Prolific, resilient shrub; no conservation vulnerability.'
    ],
    conservationPractices: 'Sustainable collection requires harvesting leaves and flowers without uprooting the shrub.',
    precautions: 'Extremely strong laxative when ingested. Do NOT swallow any leaf teas without direct guidance from an elder practitioner, and limit ingestion to avoid strong stomach cramps.',
    contraindications: [
      'Pregnancy and lactation: Anthraquinone glycosides stimulate vigorous bowel contractions and can induce miscarriage',
      'Children under 10 years old: High risk of severe dehydration and electrolyte depletion if swallowed',
      'Intestinal obstruction or inflammatory bowel disease'
    ],
    knownRisks: [
      'Potent anthraquinones (sennosides) cause violent purgative cramps, watery diarrhea, and dehydration if swallowed'
    ],
    safetyWarnings: 'PREFER TOPICAL USE ONLY. Avoid swallowing leaf preparations. Keep out of reach of young children. Rinse thoroughly after dermal application.',
    scientificReferences: [
      'Jeruto, P., et al. (2011). Phytochemical constituents of Senna didymobotrya Fresen. Irwin and Barneby in Kenya. Journal of Agricultural and Biological Science, 6(8), 53-58.',
      'Njoroge, G. N., & Bussmann, R. W. (2007). Ethnotherapeutic management of skin diseases among the Kikuyu of Central Kenya. Journal of Ethnopharmacology, 111(2), 303-307.'
    ],
    traditionalKnowledgeSources: [
      'Kikuyu Ethnobotanical Skin & Wound Compendium',
      'National Museums of Kenya Ethnopharmacology Unit'
    ],
    sourceUrls: [
      'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:520777-1'
    ],
    category: 'Skin & Wounds',
    imageColor: 'from-yellow-500 via-teal-700 to-green-950',
    imageUrl: 'https://i.postimg.cc/QCj49ccF/Senna-didymobotrya.jpg',
    photographs: [
      {
        url: 'https://i.postimg.cc/QCj49ccF/Senna-didymobotrya.jpg',
        caption: 'Senna didymobotrya in full bloom with black floral bracts, golden flowers and pinnate foliage',
        provenance: 'Rift Valley Flora Documentation',
        photographer: 'East African Floral Archive',
        license: 'Educational Heritage Access',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Caution'
  },
  {
    id: '7',
    kikuyuName: 'MŨRŨRĨ',
    commonName: 'Cape Mahogany',
    scientificName: 'Trichilia emetica',
    acceptedBotanicalName: 'Trichilia emetica Vahl subsp. emetica',
    botanicalFamily: 'Meliaceae',
    englishName: 'Cape Mahogany / Natal Mahogany',
    swahiliName: 'Mti-mafuta / Mnwamaji',
    luoName: 'Rayo / Osubo',
    kambaName: 'Musumbiti',
    otherLocalNames: [
      { language: 'Giriama', name: 'Mnyala', locality: 'Kilifi & Coastal river corridors', documentedBy: 'Mijikenda Cultural Heritage Trust' },
      { language: 'Pokomo', name: 'Mutole', locality: 'Tana River Basin', documentedBy: 'Tana River Indigenous Knowledge Register' },
      { language: 'Meru', name: 'Mururi', locality: 'Lower Meru & Tharaka rivers', documentedBy: 'Meru Ethnobotanical Survey' }
    ],
    partUsed: 'Bark, Seed Pods (Oil)',
    description: 'A beautiful evergreen shade tree found along riverbeds, growing glossy deep-green leaves, sweet-scented cream-white flowers, and oil-rich black-and-red seeds.',
    distinguishingCharacteristics: 'Stately evergreen shade tree 10–25m tall with a wide, spreading rounded crown; dark green pinnate leaves (4–5 pairs of oval leaflets plus a terminal one) with smooth upper surfaces and fuzzy velvet veins underneath; sweet-scented cream-green flowers; distinctive pear-shaped woody fruit capsules splitting into 3–4 valves to reveal glossy black seeds encased in bright scarlet arils.',
    habitat: 'Riverine forests, riverbanks, alluvial sandy plains, and coastal evergreen forests between 0m and 1,800m altitude.',
    geographicalDistribution: 'River basins of Central, Eastern and Coastal Kenya (Tana River, Athi River, Thika River valleys, and Tsavo riparian zones).',
    preparation: 'Infuse bark shavings in hot water to create a cleansing wash. For scalp health or wound healing, press oil from dry seeds and rub on skin.',
    preparationMethods: [
      'Topical seed butter/oil: Cold-press or boil dried crushed seed kernels to extract rich nourishing mafura butter; massage into dry skin, eczema, scalp dandruff, or slow-healing scars.',
      'Controlled bark wash: Steep 10g bark in 500ml hot water; use externally to cleanse weeping dermal sores or bilharzia abdominal discomfort.'
    ],
    medicinalUses: [
      'Induces vomiting to purge toxic materials or accidental poisoning',
      'Relieves chronic dry dermatitis, dry scalp, and dandruff when seed oil is massaged',
      'Provides relief for blood flukes (bilharzia) and bowel worms',
      'Speeds up the drying and healing of slow-closing flesh wounds'
    ],
    documentedUses: [
      { use: 'Traditional emergency emetic for purging ingested poisons and toxic foods', communityOrSource: 'Gĩkũyũ and Kamba traditional herbalists', verifiedStatus: 'documented' },
      { use: 'Seed oil (mafura butter) applied as a soothing topical emollient for eczema, dry scalp, and wound healing', communityOrSource: 'Coastal and riverine ethnobotanical records', verifiedStatus: 'documented' },
      { use: 'Bark infusions for gastrointestinal parasites and bilharzia symptoms', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' }
    ],
    traditionalContext: 'Commonly known as the "Emetic Mahogany". The bark is carefully stripped without destroying the tree and saved in homes to administer to children who accidentally swallowed poisonous substances.',
    culturalSignificance: 'Esteemed riverine guardian tree. Its massive shady canopy serves as communal meeting grounds and resting places along river crossings.',
    oralHistory: 'Village medicine men kept a dried pouch of Mũrũrĩ bark shavings at all times in the homestead as an emergency antidote when children ingested wild poisonous berries.',
    culturalRestrictions: 'Harvesting bark must never girdle the trunk; sacred reverence for riverbank trees protects them from being cut down.',
    consentStatus: 'public_domain',
    conservationStatus: 'Least Concern',
    threats: [
      'Riverbank erosion and sand-harvesting in river valleys',
      'Timber felling along unprotected river corridors'
    ],
    conservationPractices: 'Riparian buffer zone protection; promotion of seed harvesting for cosmetic and healing oils.',
    precautions: 'Strong emetic context—will cause vomiting if taken internally in high doses. Keep dosages under careful observation.',
    contraindications: [
      'Pregnancy and early lactation: Emetic contractions can trigger premature labor',
      'Dehydrated or exhausted individuals who cannot tolerate emesis',
      'Children under 5 years without senior practitioner supervision'
    ],
    knownRisks: [
      'Internal intake of concentrated bark infusions causes violent emesis (vomiting) and diaphoresis (sweating)'
    ],
    safetyWarnings: 'HIGH EMETIC POTENCY. Seed oil is safe and soothing for external use. Oral bark preparations must only be administered by trained traditional practitioners.',
    scientificReferences: [
      'Komane, B. M., et al. (2011). Trichilia emetica (Meliaceae) — a review of its ethnobotany and pharmacological value. South African Journal of Botany, 77(3), 604-612.',
      'Gundidza, M., et al. (1994). Antimicrobial activity of the essential oil from Trichilia emetica. Central African Journal of Medicine, 40(7), 183-186.'
    ],
    traditionalKnowledgeSources: [
      'National Museums of Kenya Coastal & Riverine Ethnobotanical Archive',
      'Gĩkũyũ Riverine Medicinal Flora Custodians'
    ],
    sourceUrls: [
      'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:579122-1'
    ],
    category: 'Digestive',
    imageColor: 'from-lime-900 via-emerald-800 to-zinc-950',
    imageUrl: 'https://i.postimg.cc/zvPCzhj6/Trichilia-emetica.jpg',
    photographs: [
      {
        url: 'https://i.postimg.cc/zvPCzhj6/Trichilia-emetica.jpg',
        caption: 'Trichilia emetica showing glossy leaves, split woody seed pods and bright scarlet seeds',
        provenance: 'East African Herbarium Riverine Field Survey',
        photographer: 'Kenya Indigenous Tree Inventory',
        license: 'Educational Heritage Access',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Caution'
  },
  {
    id: '8',
    kikuyuName: 'MŨGŨMO',
    commonName: 'Sacred Fig Tree',
    scientificName: 'Ficus thonningii',
    acceptedBotanicalName: 'Ficus thonningii Blume',
    botanicalFamily: 'Moraceae',
    englishName: 'Sacred Strangler Fig / Common Wild Fig',
    swahiliName: 'Mvumo / Mkuyu',
    luoName: 'Bongu / Ng\'owo',
    kambaName: 'Muumo',
    otherLocalNames: [
      { language: 'Meru', name: 'Mugumo', locality: 'Mount Kenya Eastern slopes', documentedBy: 'Meru Cultural Sacred Forest Register' },
      { language: 'Maasai', name: 'Oreteti', locality: 'Loita sacred groves & Kajiado', documentedBy: 'Maasai Cultural Guardians Council' },
      { language: 'Samburu', name: 'Reteti', locality: 'Samburu sacred sites', documentedBy: 'Samburu Cultural Heritage Group' },
      { language: 'Taita', name: 'Mvumu', locality: 'Taita sacred ridges', documentedBy: 'Taita Traditional Lore Register' }
    ],
    partUsed: 'Sticky Milky Latex, Inner Bark',
    description: 'A giant, sacred parasite fig tree starting as an epiphyte, with a massive trunk, sprawling crown, and extensive aerial breathing roots cascading downwards.',
    distinguishingCharacteristics: 'Monumental strangler fig tree up to 30m tall; starts as an epiphyte and produces descending aerial roots that fuse into a massive fluted pseudotrunk; dense dark green crown; entire plant exudes copious sticky white milky latex when cut or bruised; small round figs (8–12mm) borne in pairs in leaf axils, turning yellowish or purplish when ripe.',
    habitat: 'Sacred groves, rocky escarpments, montane mist forests, river valleys, and preserved highland farmland remnants from 1,000m to 2,500m elevation.',
    geographicalDistribution: 'Central Highlands (Murang\'a, Nyeri, Kiambu, Kirinyaga), Rift Valley ridges, Eastern slopes of Mount Kenya, and Western Kenya hills.',
    preparation: 'Collect the white milky latex directly from a stem slash and paste immediately onto cuts. Boil inner reddish bark or stem wood to create a sweet, soothing tea to soothe throats.',
    preparationMethods: [
      'Topical styptic wound seal: Make a small, gentle incision in the young stem bark; collect 2-3 drops of the viscous white latex on a clean leaf; dab immediately onto clean bleeding flesh cuts; forms an instant coagulant seal.',
      'Sore throat syrup: Boil 15g of shredded inner red bark in 400ml water for 30 minutes; strain through fine cotton cloth; sip warm with honey for inflamed pharyngitis.'
    ],
    medicinalUses: [
      'Acts as a rapid blood coagulant for open cuts and wounds, stopping bleeding almost instantly',
      'Soothes swollen, acute sore throats, bronchial pharyngitis, and dry hacking colds',
      'Supports convalescing patients recovering from operations, severe illness, or physical exertion',
      'Stabilizes loose bowels and mild diarrhea'
    ],
    documentedUses: [
      { use: 'Milky latex as an immediate topical blood coagulant and antiseptic wound sealer', communityOrSource: 'Gĩkũyũ and Maasai oral ethnobotanical reports', verifiedStatus: 'documented' },
      { use: 'Inner bark decoctions for acute sore throat, tonsillitis, and respiratory inflammation', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' },
      { use: 'Bark extract as an astringent tonic for mild diarrhea and convalescence', communityOrSource: 'National Museums of Kenya Ethnobotany Division', verifiedStatus: 'documented' }
    ],
    traditionalContext: 'The absolute pinnacle of sacredness in Gĩkũyũ spirituality. No Gĩkũyũ sub-clan was allowed to cut a Mũgũmo tree. It was the temple of the people. Its medicinal use is approached with deep reverence, prayer, and natural respect.',
    culturalSignificance: 'The living cathedral of the Gĩkũyũ nation. Communal prayers, rainmaking ceremonies, and age-grade sacrifices were conducted beneath its sacred canopy facing Mount Kenya (Kĩrĩnyaga). Felling a Mũgũmo was an ultimate ancestral taboo believed to invite communal disaster.',
    oralHistory: 'When an ancient Mũgũmo tree naturally collapsed of old age, Gĩkũyũ prophets regarded it as a seismic omen heralding historic political shifts, such as the fall of colonial rule in 1963.',
    culturalRestrictions: 'SACRED PROTECTION: Cutting living branches for timber, firewood, or charcoal is strictly forbidden by ancestral custom. Medicinal harvest is restricted to minute bark scrapings and sap drops taken with prayer.',
    consentStatus: 'public_domain',
    conservationStatus: 'Least Concern',
    threats: [
      'Agricultural land consolidation clearing historic grove pockets',
      'Loss of traditional sacred grove cultural taboos among younger urban generations'
    ],
    conservationPractices: 'National heritage monument gazetting; cultural conservation partnerships with elder councils; protection as ecological keystone fig trees for birds and primates.',
    precautions: 'Harvesting must be done minimally, with clean tools. Do not strip bark in large volumes. Highly safe but spiritually protected.',
    contraindications: [
      'Latex allergy: Individuals allergic to natural rubber latex should avoid skin contact with the milky sap'
    ],
    knownRisks: [
      'Rare mild contact dermatitis in individuals sensitive to Ficus sap'
    ],
    safetyWarnings: 'Exceptionally safe medicinal profile. Treat the living tree with sacred reverence. Do not harvest indiscriminately.',
    scientificReferences: [
      'Berg, C. C., & Corner, E. J. H. (2005). Moraceae (Ficus). Flora Malesiana, 17(2), 1-730.',
      'Cousins, S. R., & Witkowski, E. T. (2012). African ficus species: Sacred trees in a secular world. Journal of Ethnobiology and Ethnomedicine, 8(1), 1-14.',
      'Maundu, P., et al. (2001). Ethnobotany of the Kikuyu. National Museums of Kenya.'
    ],
    traditionalKnowledgeSources: [
      'Kiama Kĩa Ma (Gĩkũyũ Traditional Council of Elders)',
      'National Museums of Kenya Sacred Sites & Natural Groves Register'
    ],
    sourceUrls: [
      'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:856950-1'
    ],
    category: 'General Vitality',
    imageColor: 'from-emerald-900 via-stone-800 to-slate-950',
    imageUrl: 'https://i.postimg.cc/Zqhr5489/Ficus-thonningii.jpg',
    photographs: [
      {
        url: 'https://i.postimg.cc/Zqhr5489/Ficus-thonningii.jpg',
        caption: 'Sacred Ficus thonningii canopy showing descending aerial pillar roots and dense green foliage',
        provenance: 'Central Kenya Sacred Groves Archival Documentation',
        photographer: 'Heritage Grove Preservation Society',
        license: 'Cultural Heritage Access',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Safe'
  },
  {
    id: '9',
    kikuyuName: 'MŨREGA',
    commonName: 'Cape Myrtle / African Pepper',
    scientificName: 'Myrsine africana',
    acceptedBotanicalName: 'Myrsine africana L.',
    botanicalFamily: 'Primulaceae',
    englishName: 'Cape Myrtle / African Boxwood',
    swahiliName: 'Msekeseke',
    luoName: 'Rachier',
    kambaName: 'Mukambua',
    otherLocalNames: [
      { language: 'Maasai', name: 'Seketeti / Os-seketeti', locality: 'Rift Valley ridges & Ngong Hills', documentedBy: 'Maasai Pastoral Flora Register' },
      { language: 'Samburu', name: 'Seketet', locality: 'Mathews Range & Leroghi', documentedBy: 'Northern Kenya Ethnobotany Index' },
      { language: 'Kipsigis', name: 'Kipyet', locality: 'Mau Forest highland scrub', documentedBy: 'Rift Valley Medicinal Archives' }
    ],
    partUsed: 'Dry Pinkish Berries, Stems',
    description: 'A small, highly branched shrub with beautiful, tiny, tough leaves and clusters of pinkish berries that look like small peppercorns.',
    distinguishingCharacteristics: 'Densely branched erect evergreen shrub 1–3m tall; leaves small (1–2.5cm long), alternate, leathery, dark glossy green with sharply serrated margins; cut branchlets have reddish young bark; tiny cream-pink flowers clustered in leaf axils; fruits small globose berries (4–5mm) turning reddish-pink to dark purple when ripe, closely resembling peppercorns.',
    habitat: 'Dry montane evergreen forest margins, rocky highland scrub, open hillside bushlands, and moorland edges from 1,400m to 3,000m altitude.',
    geographicalDistribution: 'Central Highlands (Aberdare Ranges, Mount Kenya), Ngong Hills, Mau Escarpment, and Cherangani Hills.',
    preparation: 'Dry and grind the tiny berries into a powder. Mix 1 teaspoon of berry powder in hot porridge or warm water and swallow whole on an empty stomach.',
    preparationMethods: [
      'Deworming paste: Dry mature pink-purple berries thoroughly in shade; grind into a coarse powder; stir 1 rounded teaspoon (about 5g) into 1 cup of warm fermented millet porridge; consume early morning on a completely fasting stomach.',
      'Protective meat broth: Simmer a tablespoon of whole dry berries in bone broth for 20 minutes before community feasts to prevent meat-borne parasites.'
    ],
    medicinalUses: [
      'Known as the most effective traditional dewormer, targeting Tapeworms and hookworms',
      'Eases severe chest pains, asthma symptoms, and spasms',
      'Cleanses maternal breast-milk ducts of postpartum mothers'
    ],
    documentedUses: [
      { use: 'Highly potent traditional anthelmintic for expelling tapeworms (Taenia saginata) and roundworms', communityOrSource: 'Gĩkũyũ and Maasai traditional veterinary and human medicine', verifiedStatus: 'documented' },
      { use: 'Boiled berry infusion for bronchial spasms, chest tightness, and asthma', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' },
      { use: 'Postpartum uterine and lactation cleansing decoction', communityOrSource: 'Central Kenya traditional birth attendants', verifiedStatus: 'oral_lore' }
    ],
    traditionalContext: 'The quintessential Gĩkũyũ deworming drug. In traditional circles, before livestock slaughter, the meat cutters would boil Mũrega berries as a protective tea against possible tapeworms in raw beef.',
    culturalSignificance: 'Regarded as an essential household staple. No traditional meat feast or sacrificial banquet was undertaken without simmering Mũrega berries alongside the meat soup.',
    oralHistory: 'Elders recounted that livestock herders who frequently consumed rare roast meat never suffered from tapeworm cysts because of their seasonal Mũrega berry cleanses.',
    culturalRestrictions: 'Standard communal harvest; seeds should be harvested when fully ripe and pinkish to maximize anthelmintic potency.',
    consentStatus: 'public_domain',
    conservationStatus: 'Least Concern',
    threats: [
      'Highland bush burning and pasture clearing on rocky escarpments.'
    ],
    conservationPractices: 'Resilient resprouting shrub; easily propagated from collected seed.',
    precautions: 'Berries have high anthelmintic potency. Avoid taking daily for more than 3 days. Can cause mild stomach rumbling as worms are expelled.',
    contraindications: [
      'Pregnancy: High embelin content may have antifertility and mild abortifacient actions',
      'Severe inflammatory bowel disease or active colitis',
      'Children under 4 years old without pediatric herbalist supervision'
    ],
    knownRisks: [
      'Contains embelin (benzoquinone derivative); excessive overdose can cause transient abdominal cramping, purgation, or nausea'
    ],
    safetyWarnings: 'Do not exceed 3 consecutive days of treatment. Drink plenty of clean water during the deworming expulsion phase.',
    scientificReferences: [
      'Gathuma, J. M., et al. (2004). Efficacy of Myrsine africana, Albizia anthelmintica and Hilderbrantia sepalosa against Taenia saginata in cattle. Journal of Ethnopharmacology, 91(2-3), 245-248.',
      'Chhabra, S. C., et al. (1991). Plants used in traditional medicine in Eastern Tanzania: V. Angiosperms. Journal of Ethnopharmacology, 33(1-2), 143-157.'
    ],
    traditionalKnowledgeSources: [
      'East African Herbarium Ethnomedicine Records',
      'Kikuyu & Maasai Ethnoveterinary Practice Archive'
    ],
    sourceUrls: [
      'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:588494-1'
    ],
    category: 'Digestive',
    imageColor: 'from-red-900 via-amber-800 to-stone-900',
    imageUrl: 'https://i.postimg.cc/528CGThd/Myrsine-africana.jpg',
    photographs: [
      {
        url: 'https://i.postimg.cc/528CGThd/Myrsine-africana.jpg',
        caption: 'Myrsine africana shrub showing small glossy serrated leaves and clustered pink-purple berries',
        provenance: 'Aberdare Foothills Ethnobotanical Archive',
        photographer: 'Highland Flora Survey Group',
        license: 'Educational Heritage Access',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
    severityRating: 'Caution'
  },
  {
    id: '10',
    kikuyuName: 'MŨGUCŨ',
    commonName: 'Knobwood',
    scientificName: 'Zanthoxylum chalybeum',
    acceptedBotanicalName: 'Zanthoxylum chalybeum Engl.',
    botanicalFamily: 'Rutaceae',
    englishName: 'Knobwood',
    swahiliName: 'Mjafari',
    luoName: 'Roko',
    kambaName: 'Mukenea / Mukengeta',
    otherLocalNames: [
      { language: 'Maasai', name: 'Oloisuki', locality: 'Narok & Kajiado rangelands', documentedBy: 'Maasai Ethnobotanical Compendium' },
      { language: 'Samburu', name: 'Loisugi', locality: 'Samburu & Laikipia scrub', documentedBy: 'Northern Kenya Rangeland Survey' },
      { language: 'Pokot', name: 'Songowet', locality: 'Baringo & West Pokot', documentedBy: 'North Rift Traditional Medicine Register' }
    ],
    partUsed: 'Prickly Bark, Citrus Aromatic Seeds',
    description: 'A deciduous spiny tree with knobs on the trunk and twigs, and incredibly citrus-scented lemon-ginger fresh leaves and seeds.',
    distinguishingCharacteristics: 'Spiny deciduous shrub or small tree 3–10m tall; unmistakable trunk and older branches covered with large conical woody knobs (1–3cm wide) tipped with sharp prickles; leaves pinnate with 3–5 pairs of shiny leaflets with pellucid gland dots smelling strongly of lemon, ginger and citrus when crushed; flowers small, greenish-yellow; small reddish-black spherical seed capsules with a distinct tingly numbing taste.',
    habitat: 'Dry bushlands, semi-arid wooded grasslands, rocky hillsides, and coastal scrub from 0m to 1,600m altitude.',
    geographicalDistribution: 'Eastern Kenya (Machakos, Kitui, Makueni), Rift Valley floor, Coast hinterland, and Lake Victoria basin.',
    preparation: 'Boil stem bark in water to handle fevers and body aches. Chew the dried seed capsules to freshen breath, soothe acute toothache, and clear chest pain.',
    preparationMethods: [
      'Toothache and mouthwash: Chew 2 dried aromatic seed capsules slowly on the affected tooth; the natural alkylamides release a tingling and numbing sensation that relieves throbbing pain; spit out residue after 5 minutes.',
      'Fever and joint tea: Simmer 15g crushed knobbed bark in 500ml water for 30 minutes; drink 1/2 cup warm twice daily for malaria fevers and muscle soreness.'
    ],
    medicinalUses: [
      'Alleviates chronic bronchial asthma, wheezing, and dry coughs',
      'Soothes persistent sickle-cell anemia pain crisis and severe joint aches',
      'Treats malaria-induced fevers, head throbbing, and severe chills',
      'Relieves acute tooth decay pain and calms inflamed throat tonsils'
    ],
    documentedUses: [
      { use: 'Chewing seed capsules or bark for dental anesthesia and oral hygiene', communityOrSource: 'Kamba, Maasai, and Kikuyu traditional medicine', verifiedStatus: 'documented' },
      { use: 'Decoction of bark for malaria, fevers, and respiratory colds', communityOrSource: 'Kokwaro - Medicinal Plants of East Africa', verifiedStatus: 'documented' },
      { use: 'Management of sickle-cell anemia pain crisis (antisickling properties)', communityOrSource: 'KEMRI and University of Nairobi Pharmacognosy Studies', verifiedStatus: 'documented' }
    ],
    traditionalContext: 'Its seed pods have a delightful, spicy scent containing natural numbing agents. Kikuyu travelers chewed these refreshing seeds to stave off thirst, ward off illness, and sanitize water.',
    culturalSignificance: 'Regarded as an essential safari and journeying companion. Traditional travelers carried a small pouch of knobwood seeds around their neck to chew while walking across semi-arid plains.',
    oralHistory: 'Pastoral warriors chewed the spicy knobwood seeds to banish thirst during cattle herding across dry savannahs.',
    culturalRestrictions: 'Harvesting must preserve the tree trunk; peeling bark knobs without damaging cambium layer is encouraged.',
    consentStatus: 'public_domain',
    conservationStatus: 'Least Concern',
    threats: [
      'Charcoal burning in semi-arid rangelands',
      'Agricultural clearance of dry woodland'
    ],
    conservationPractices: 'Resilient coppicing species; protected in community conservancies.',
    precautions: 'Highly aromatic; can cause temporary sweating and warmth (which is desired to break fevers). Avoid giving to infants or children under 3 years.',
    contraindications: [
      'Infants and children under 3 years old due to potent pungent essential oils',
      'Pregnancy: High concentrations of volatile alkaloids should be avoided'
    ],
    knownRisks: [
      'Excessive ingestion may cause diaphoresis (sweating) or mild stomach warmth'
    ],
    safetyWarnings: 'Chewing seeds causes a harmless, temporary tingling numbing sensation on the tongue. Do not swallow whole sharp seeds in large quantities.',
    scientificReferences: [
      'Matu, E. N., & van Staden, J. (2003). Antibacterial and anti-inflammatory activities of some plants used for medicinal purposes in Kenya. Journal of Ethnopharmacology, 87(1), 35-41.',
      'Ouattara, B., et al. (2004). LC/MS/NMR analysis of isomeric divanilloylquinic acids from the roots of Fagara zanthoxyloides (Zanthoxylum chalybeum). Phytochemistry, 65(8), 1145-1151.',
      'Engeu, P. O., et al. (2008). Repeat-dose safety of Zanthoxylum chalybeum root bark. African Health Sciences, 8(2), 90-94.'
    ],
    traditionalKnowledgeSources: [
      'Kamba Traditional Ethnobotany Custodians',
      'Maasai Pastoral Flora Register',
      'National Museums of Kenya East African Herbarium'
    ],
    sourceUrls: [
      'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:775618-1'
    ],
    category: 'Respiratory',
    imageColor: 'from-lime-900 via-amber-700 to-emerald-950',
    imageUrl: 'https://i.postimg.cc/X7CGGt72/Zanthoxylum-chalybeum.jpg',
    photographs: [
      {
        url: 'https://i.postimg.cc/X7CGGt72/Zanthoxylum-chalybeum.jpg',
        caption: 'Zanthoxylum chalybeum showing characteristic woody prickly knobs on the trunk and glossy foliage',
        provenance: 'Eastern Kenya Semi-Arid Botanical Survey',
        photographer: 'East African Indigenous Flora Team',
        license: 'Educational Heritage Access',
        isPrimary: true
      }
    ],
    identificationStatus: 'expert_confirmed',
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
