import { MockTest } from '../types/ielts';

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'academic-mock-1',
    title: 'IELTS Academic Official Mock Exam 1',
    testType: 'academic',
    description: 'Full-length computer-delivered simulation featuring contemporary scientific, environmental, and academic research topics with complete answer keys and diagnostic commentary.',
    listening: [
      {
        id: 1,
        title: 'Section 1: Student Accommodation Inquiries',
        scenario: 'A university prospective postgraduate student (Clara Evans) calls St. Jude Campus Living Office to inquire about graduate shared housing options.',
        speaker: 'Housing Advisor & Clara Evans',
        transcript: `[Advisor]: Good morning, St. Jude Campus Living and Student Accommodation. How may I assist you today?
[Clara]: Good morning. My name is Clara Evans. I will be commencing my Master's in Environmental Sciences this September and wanted to register for graduate accommodation.
[Advisor]: Welcome to the university, Clara! Let me take down a few key details. Could I confirm your student identification number first?
[Clara]: Yes, it's EV-84920.
[Advisor]: Excellent. And which style of accommodation are you prioritizing? We offer single studio apartments, shared en-suite cluster flats, or catered collegiate halls.
[Clara]: I definitely prefer a shared en-suite flat. Having a private bathroom is essential for me, but I'd like to share a kitchen and lounge with three or four other postgraduates.
[Advisor]: Understood. Our Alderwood Graduate Quarter matches that perfectly. Each flat accommodates four residents. Now, regarding arrival, when are you planning to move in?
[Clara]: My orientation begins on September 22nd, so I would like to arrive on September 18th to settle in.
[Advisor]: Perfect. The weekly rent for Alderwood en-suite rooms is £185, which includes high-speed broadband and all utility bills, except laundry.
[Clara]: That sounds very reasonable. Is bicycle storage available on site?
[Advisor]: Yes, every block has a secured, covered bicycle shelter that requires your student smartcard for entry.
[Clara]: Wonderful! What deposit is required to confirm my reservation?
[Advisor]: We require an advance deposit of £300, payable online within seven days of receiving your conditional offer email.`,
        questions: [
          {
            id: 1,
            type: 'fill_blank',
            prompt: 'Candidate Student ID: EV-_____',
            correctAnswer: ['84920', '84920.'],
            explanation: 'Clara explicitly states: "Yes, it\'s EV-84920."',
          },
          {
            id: 2,
            type: 'fill_blank',
            prompt: 'Degree program: Master\'s in _____ Sciences',
            correctAnswer: ['Environmental', 'environmental'],
            explanation: 'Clara mentions commencing her "Master\'s in Environmental Sciences".',
          },
          {
            id: 3,
            type: 'fill_blank',
            prompt: 'Preferred accommodation style: shared _____ flat',
            correctAnswer: ['en-suite', 'ensuite', 'en suite'],
            explanation: 'She states: "I definitely prefer a shared en-suite flat. Having a private bathroom is essential."',
          },
          {
            id: 4,
            type: 'fill_blank',
            prompt: 'Name of the recommended complex: _____ Graduate Quarter',
            correctAnswer: ['Alderwood', 'alderwood'],
            explanation: 'The advisor notes: "Our Alderwood Graduate Quarter matches that perfectly."',
          },
          {
            id: 5,
            type: 'fill_blank',
            prompt: 'Number of residents sharing each flat: _____',
            correctAnswer: ['4', 'four'],
            explanation: 'The advisor confirms: "Each flat accommodates four residents."',
          },
          {
            id: 6,
            type: 'fill_blank',
            prompt: 'Requested move-in date: September _____',
            correctAnswer: ['18', '18th'],
            explanation: 'Clara states: "I would like to arrive on September 18th to settle in."',
          },
          {
            id: 7,
            type: 'fill_blank',
            prompt: 'Weekly rental fee: £_____ (including bills and broadband)',
            correctAnswer: ['185', '185.'],
            explanation: 'The advisor mentions: "The weekly rent for Alderwood en-suite rooms is £185."',
          },
          {
            id: 8,
            type: 'fill_blank',
            prompt: 'Utility NOT included in standard rent: _____ services',
            correctAnswer: ['laundry', 'Laundry'],
            explanation: 'Advisor states: "...includes high-speed broadband and all utility bills, except laundry."',
          },
          {
            id: 9,
            type: 'fill_blank',
            prompt: 'Bicycle shelter access method: student _____',
            correctAnswer: ['smartcard', 'smart card', 'smart-card'],
            explanation: 'Advisor notes the shelter "requires your student smartcard for entry."',
          },
          {
            id: 10,
            type: 'fill_blank',
            prompt: 'Required reservation deposit amount: £_____',
            correctAnswer: ['300', '300.'],
            explanation: 'Advisor states: "We require an advance deposit of £300."',
          },
        ],
      },
      {
        id: 2,
        title: 'Section 2: Greenhill Nature Sanctuary Visitors Guide',
        scenario: 'A sanctuary ranger introduces volunteers and visitors to new conservation trails, observation hides, and community wildlife initiatives.',
        speaker: 'Lead Ranger Marcus Wright',
        transcript: `[Marcus]: Good afternoon everyone, and welcome to the Greenhill Nature Sanctuary volunteer induction. Over the past three decades, this former industrial quarry has been regenerated into a thriving wetland habitat covering over 120 hectares. 
Today, we are opening our newly completed Kingfisher Boardwalk and Marshland Discovery Center. When you leave the visitor pavilion via the South Gate, the first path branching to your right takes you directly to the Heron Lagoon. This is our primary bird watching hide, equipped with high-powered spotting telescopes and wheelchair-accessible ramps.
Continuing eastward past the central reedbeds, you will cross the footbridge into the Dragonfly Meadows. This area is specifically managed to encourage native wildflower propagation and endangered pollinator species. We ask all visitors to strictly remain on the timber boardwalk to prevent soil compaction.
Lastly, if you head toward the northern perimeter fence, you will discover the Forest Canopy Tower. Rising twenty-four meters above the woodland canopy, it offers panoramic vistas across the entire coastal estuary. Please remember that entry to the canopy tower is restricted during high winds for visitor safety.`,
        questions: [
          {
            id: 11,
            type: 'multiple_choice',
            prompt: 'What was the original historical use of the Greenhill Sanctuary site?',
            options: ['A timber plantation', 'An industrial quarry', 'An agricultural dairy farm', 'A coastal shipping dock'],
            correctAnswer: 'An industrial quarry',
            explanation: 'The ranger explains that "this former industrial quarry has been regenerated into a thriving wetland habitat".',
          },
          {
            id: 12,
            type: 'multiple_choice',
            prompt: 'What special accessibility feature is installed at the Heron Lagoon hide?',
            options: ['Elevated glass lifts', 'Wheelchair-accessible ramps', 'Audio-described headsets for all trees', 'Underwater observation submarines'],
            correctAnswer: 'Wheelchair-accessible ramps',
            explanation: 'The speaker notes it is "equipped with high-powered spotting telescopes and wheelchair-accessible ramps".',
          },
          {
            id: 13,
            type: 'multiple_choice',
            prompt: 'Why are visitors required to remain on the timber boardwalk in Dragonfly Meadows?',
            options: ['To avoid disturbing nesting vipers', 'To prevent soil compaction', 'Because the bog waters are deep', 'To protect electrical monitoring cables'],
            correctAnswer: 'To prevent soil compaction',
            explanation: 'The ranger specifically asks visitors "to strictly remain on the timber boardwalk to prevent soil compaction".',
          },
          {
            id: 14,
            type: 'multiple_choice',
            prompt: 'How tall is the Forest Canopy Tower located in the northern perimeter?',
            options: ['12 meters', '18 meters', '24 meters', '30 meters'],
            correctAnswer: '24 meters',
            explanation: 'The speaker describes it as "Rising twenty-four meters above the woodland canopy".',
          },
          {
            id: 15,
            type: 'multiple_choice',
            prompt: 'Under what weather conditions is the canopy tower closed to the public?',
            options: ['Heavy rainfall', 'Dense morning fog', 'High winds', 'Freezing temperatures'],
            correctAnswer: 'High winds',
            explanation: 'The ranger remarks: "Please remember that entry to the canopy tower is restricted during high winds for visitor safety."',
          },
          {
            id: 16,
            type: 'fill_blank',
            prompt: 'Total area of the regenerated wetland sanctuary: over _____ hectares',
            correctAnswer: ['120', '120.'],
            explanation: 'Marcus notes: "...regenerated into a thriving wetland habitat covering over 120 hectares."',
          },
          {
            id: 17,
            type: 'fill_blank',
            prompt: 'The newly opened educational facility is named the _____ Discovery Center',
            correctAnswer: ['Marshland', 'marshland'],
            explanation: 'Mentioned as "Kingfisher Boardwalk and Marshland Discovery Center".',
          },
          {
            id: 18,
            type: 'fill_blank',
            prompt: 'The Heron Lagoon hide is reached by leaving through the _____ Gate',
            correctAnswer: ['South', 'south'],
            explanation: 'Ranger states: "When you leave the visitor pavilion via the South Gate..."',
          },
          {
            id: 19,
            type: 'fill_blank',
            prompt: 'Meadow area is managed to encourage native wildflowers and endangered _____',
            correctAnswer: ['pollinators', 'pollinator species'],
            explanation: 'He points out: "...encourage native wildflower propagation and endangered pollinator species."',
          },
          {
            id: 20,
            type: 'fill_blank',
            prompt: 'The canopy tower overlooks the surrounding coastal _____',
            correctAnswer: ['estuary', 'Estuary'],
            explanation: 'Ranger: "...panoramic vistas across the entire coastal estuary."',
          },
        ],
      },
      {
        id: 3,
        title: 'Section 3: Academic Tutorial - Marine Coral Resilience Project',
        scenario: 'Two university marine science undergraduates, Daniel and Meera, discuss their upcoming research dissertation on thermal resilience in staghorn corals with Professor Thorne.',
        speaker: 'Professor Thorne, Daniel & Meera',
        transcript: `[Prof. Thorne]: Come on in, Daniel, Meera. I've read through your preliminary literature review on coral bleaching mitigation. You've assembled an impressive bibliography, but I'd like to hear how you plan to narrow down your field sampling methodologies.
[Daniel]: Thank you, Professor Thorne. We initially contemplated collecting coral core samples from six different barrier reefs across the outer shelf. However, after reviewing transportation logistics and seawater temperature maintenance, we realized that four reef locations would yield much more rigorous data.
[Meera]: Exactly. And rather than examining mature coral colonies only, we intend to investigate juvenile staghorn micro-fragments. Research published by the Australian Institute of Marine Science suggests that juvenile specimens exhibit faster epigenetic adaptation to thermal anomalies.
[Prof. Thorne]: That is a sound pivot. What controls are you putting in place for the laboratory microcosm tanks?
[Daniel]: We will be maintaining two independent circulating tank systems. System A will operate at baseline seasonal ocean temperatures of 26 degrees Celsius, while System B will undergo an elevated thermal stress profile, ramping up by 0.5 degrees per week to 31 degrees Celsius.
[Meera]: To monitor photosynthetic efficiency, we'll employ Pulse-Amplitude-Modulated fluorometry every forty-eight hours. That provides non-invasive quantification of symbiotic zooxanthellae health without causing physical tissue damage.
[Prof. Thorne]: Splendid. Now, regarding statistical analysis: make sure you don't solely rely on one-way ANOVA. Because you are tracking longitudinal changes across repeated measurements over four weeks, repeated-measures mixed models will be imperative to prevent false positive inferences.
[Daniel]: Noted, Professor. We will configure R Studio scripts specifically for linear mixed-effects modeling.`,
        questions: [
          {
            id: 21,
            type: 'multiple_choice',
            prompt: 'Why did Daniel and Meera reduce their sampling sites from six to four locations?',
            options: ['Permit restrictions from the maritime agency', 'Logistical constraints in transporting specimens and maintaining water conditions', 'Budget reductions in university grant funding', 'Adverse weather forecasts in the outer barrier reef'],
            correctAnswer: 'Logistical constraints in transporting specimens and maintaining water conditions',
            explanation: 'Daniel states: "after reviewing transportation logistics and seawater temperature maintenance, we realized that four reef locations would yield much more rigorous data."',
          },
          {
            id: 22,
            type: 'multiple_choice',
            prompt: 'What led the students to focus on juvenile staghorn coral micro-fragments?',
            options: ['They are cheaper to purchase from local hatcheries', 'They show faster epigenetic adaptation to thermal anomalies', 'Mature colonies are strictly protected by law', 'Juvenile fragments do not host symbiotic algae'],
            correctAnswer: 'They show faster epigenetic adaptation to thermal anomalies',
            explanation: 'Meera states: "juvenile specimens exhibit faster epigenetic adaptation to thermal anomalies."',
          },
          {
            id: 23,
            type: 'multiple_choice',
            prompt: 'What is the baseline water temperature configured in System A tanks?',
            options: ['24 degrees Celsius', '26 degrees Celsius', '28 degrees Celsius', '30 degrees Celsius'],
            correctAnswer: '26 degrees Celsius',
            explanation: 'Daniel notes: "System A will operate at baseline seasonal ocean temperatures of 26 degrees Celsius".',
          },
          {
            id: 24,
            type: 'multiple_choice',
            prompt: 'How often will the students carry out fluorometry measurements on the specimens?',
            options: ['Every 12 hours', 'Every 24 hours', 'Every 48 hours', 'Once a week'],
            correctAnswer: 'Every 48 hours',
            explanation: 'Meera states: "we\'ll employ Pulse-Amplitude-Modulated fluorometry every forty-eight hours."',
          },
          {
            id: 25,
            type: 'multiple_choice',
            prompt: 'What statistical method does Professor Thorne recommend instead of standard one-way ANOVA?',
            options: ['Principal component analysis', 'Repeated-measures mixed-effects models', 'Simple linear regression', 'Chi-square distribution tests'],
            correctAnswer: 'Repeated-measures mixed-effects models',
            explanation: 'Professor Thorne warns that "repeated-measures mixed models will be imperative to prevent false positive inferences".',
          },
          {
            id: 26,
            type: 'fill_blank',
            prompt: 'Maximum stress temperature reached in System B tanks: _____ degrees Celsius',
            correctAnswer: ['31', '31.'],
            explanation: 'Daniel explains: "...ramping up by 0.5 degrees per week to 31 degrees Celsius."',
          },
          {
            id: 27,
            type: 'fill_blank',
            prompt: 'The fluorometry test measures the health of symbiotic _____ algae',
            correctAnswer: ['zooxanthellae', 'Zooxanthellae'],
            explanation: 'Meera mentions: "...non-invasive quantification of symbiotic zooxanthellae health".',
          },
          {
            id: 28,
            type: 'fill_blank',
            prompt: 'A key benefit of PAM fluorometry is that it avoids causing _____ damage',
            correctAnswer: ['tissue', 'physical tissue'],
            explanation: 'Meera specifies: "...without causing physical tissue damage."',
          },
          {
            id: 29,
            type: 'fill_blank',
            prompt: 'The experimental stress trial will track measurements over a total of _____ weeks',
            correctAnswer: ['4', 'four'],
            explanation: 'Professor Thorne mentions: "longitudinal changes across repeated measurements over four weeks".',
          },
          {
            id: 30,
            type: 'fill_blank',
            prompt: 'The software package the students will script statistical models in is _____',
            correctAnswer: ['R Studio', 'RStudio', 'R'],
            explanation: 'Daniel replies: "We will configure R Studio scripts specifically for linear mixed-effects modeling."',
          },
        ],
      },
      {
        id: 4,
        title: 'Section 4: Academic Lecture - Subterranean Architecture & Deep Urbanism',
        scenario: 'An architectural historian delivers a university lecture on the historical engineering and future sustainability of subterranean civil structures.',
        speaker: 'Dr. Alistair Finch',
        transcript: `[Dr. Finch]: Good morning, colleagues. Today we explore subterranean architecture, an engineering discipline once relegated to emergency shelters that is now emerging as a cornerstone of sustainable twenty-first-century urban density.
Civilizations have inhabited subterranean environments for millennia. Perhaps the most celebrated historical example is Derinkuyu in the Cappadocia region of modern Turkey. Carved out of soft volcanic tuff stone during the Byzantine era, this subterranean city reached an astonishing depth of eighty-five meters across eighteen distinct subterranean levels. It was capable of sheltering up to twenty thousand inhabitants, complete with livestock stables, olive oil presses, chapels, and subterranean schools.
Crucially, what allowed Derinkuyu to thrive was its sophisticated ventilation engineering. Over fifteen thousand vertical shafts drew fresh air from the surface, while deep subterranean aquifers provided reliable water supplies completely immune to surface siege contamination.
Furthermore, subterranean structures possess immense thermodynamic advantages. Beneath a depth of merely five meters, the earth acts as a massive thermal battery. Subterranean ambient temperatures remain virtually constant year-round, typically hovering around fourteen to sixteen degrees Celsius in temperate zones. This eliminates upwards of seventy percent of the energy normally consumed by HVAC heating and cooling systems in high-rise glass towers.
In modern metropolises such as Montreal and Helsinki, master planners are advancing 'Deep Urban Masterplans'. Helsinki, for instance, has excavated over nine million cubic meters of bedrock beneath its municipal boundaries, creating subterranean data centers cooled by Baltic seawater, subterranean swimming arenas, and emergency civil facilities. As climate change increases surface thermal extremes, deep urbanism represents a profound evolutionary shift from vertical ambition to subterranean resilience.`,
        questions: [
          {
            id: 31,
            type: 'fill_blank',
            prompt: 'Derinkuyu was carved into soft volcanic _____ stone.',
            correctAnswer: ['tuff', 'tuff stone'],
            explanation: 'The lecturer states it was "Carved out of soft volcanic tuff stone".',
          },
          {
            id: 32,
            type: 'fill_blank',
            prompt: 'Maximum depth reached by the Derinkuyu complex: _____ meters.',
            correctAnswer: ['85', 'eighty-five'],
            explanation: 'Finch points out: "...reached an astonishing depth of eighty-five meters".',
          },
          {
            id: 33,
            type: 'fill_blank',
            prompt: 'Derinkuyu was capable of sheltering up to _____ thousand people.',
            correctAnswer: ['20', 'twenty'],
            explanation: 'He states: "...capable of sheltering up to twenty thousand inhabitants".',
          },
          {
            id: 34,
            type: 'fill_blank',
            prompt: 'Fresh surface air was circulated via over _____ vertical shafts.',
            correctAnswer: ['15000', '15,000', 'fifteen thousand'],
            explanation: 'Finch explains: "Over fifteen thousand vertical shafts drew fresh air from the surface".',
          },
          {
            id: 35,
            type: 'fill_blank',
            prompt: 'Water was obtained from deep subterranean _____ protected from contamination.',
            correctAnswer: ['aquifers', 'aquifer'],
            explanation: 'He highlights: "...deep subterranean aquifers provided reliable water supplies".',
          },
          {
            id: 36,
            type: 'fill_blank',
            prompt: 'Stable subterranean temperatures occur beneath a depth of at least _____ meters.',
            correctAnswer: ['5', 'five'],
            explanation: 'Dr. Finch: "Beneath a depth of merely five meters, the earth acts as a massive thermal battery."',
          },
          {
            id: 37,
            type: 'fill_blank',
            prompt: 'Average ambient earth temperature in temperate subterranean zones: _____ to 16°C.',
            correctAnswer: ['14', 'fourteen'],
            explanation: 'He notes temperatures hover around "fourteen to sixteen degrees Celsius".',
          },
          {
            id: 38,
            type: 'fill_blank',
            prompt: 'Subterranean spaces can reduce heating and cooling energy usage by up to _____ percent.',
            correctAnswer: ['70', 'seventy'],
            explanation: 'Finch explains: "This eliminates upwards of seventy percent of the energy normally consumed".',
          },
          {
            id: 39,
            type: 'fill_blank',
            prompt: 'Subterranean data centers in Helsinki are cooled utilizing _____ seawater.',
            correctAnswer: ['Baltic', 'baltic'],
            explanation: 'Finch mentions: "...cooled by Baltic seawater".',
          },
          {
            id: 40,
            type: 'fill_blank',
            prompt: 'The overarching concept shifting from vertical growth is deep urban _____',
            correctAnswer: ['resilience', 'Resilience'],
            explanation: 'He concludes: "...deep urbanism represents a profound evolutionary shift from vertical ambition to subterranean resilience."',
          },
        ],
      },
    ],
    reading: [
      {
        id: 1,
        title: 'Passage 1: The Mangrove Forests: Coastal Guardians and Carbon Vaults',
        subtitle: 'Examining the physiological adaptations and global ecological significance of intertidal mangrove wetlands.',
        paragraphs: [
          {
            label: 'A',
            text: 'Mangroves are among the most remarkable arboreal ecosystems on the planet. Thriving at the boundary of land and sea along tropical and subtropical coastlines, these salt-tolerant halophytes inhabit an environment that would prove swiftly lethal to virtually all terrestrial tree species. Subjected to daily tidal inundation, extreme salinity fluctuations, and waterlogged soils virtually devoid of oxygen, mangroves have evolved an extraordinary suite of specialized physiological and morphological adaptations.',
          },
          {
            label: 'B',
            text: 'Chief among these morphological innovations are their specialized root architectures. Species such as the Red Mangrove (Rhizophora mangle) are instantly recognizable by their aerial stilt or prop roots, which loop outward from trunks and lower branches before anchoring deep into unstable sediment. Other taxa, including Black Mangroves (Avicennia germinans), deploy thousands of vertical pencil-like appendages called pneumatophores that protrude skyward through the mud. Fitted with microscopic hydrophobic breathing pores termed lenticels, these structures permit vital atmospheric oxygen to diffuse down into submerged subterranean roots during low tide cycles.',
          },
          {
            label: 'C',
            text: 'Salinity regulation poses an equally formidable physiological hurdle. Mangrove species tackle this dilemma through two divergent evolutionary paths: exclusion and excretion. True root excluders, such as Rhizophora, boast ultra-filtration membranes within their root suberin layers capable of filtering out upwards of ninety-five percent of dissolved salt ions at the water uptake interface. In contrast, secretor species permit saline uptake into their xylem sap but possess specialized salt glands located on the upper surfaces of their leaves, which actively pump sodium and chloride ions outward to precipitate as harmless crystallized crusts, easily washed away by tropical rainfall.',
          },
          {
            label: 'D',
            text: 'Beyond their botanical peculiarities, mangroves serve as indispensable biophysical barriers protecting human coastlines. Their dense lattice of interlocking prop roots dissipates incoming wave energy with exceptional efficiency. Empirical hydrodynamic studies demonstrate that a hundred-meter-wide belt of mature mangrove forest can attenuate storm surge and tsunami wave height by up to sixty-six percent. In doing so, these coastal buffers prevent shoreline erosion, safeguard critical coastal infrastructure, and mitigate loss of life during violent tropical cyclones.',
          },
          {
            label: 'E',
            text: 'In recent years, climate scientists have uncovered an even more consequential dimension of mangrove ecology: their role as blue carbon sinks. Although mangroves account for less than one percent of total global forest coverage, they sequester carbon at rates between three and five times higher per unit area than undisturbed terrestrial rainforests. Unlike terrestrial forest soils where leaf litter and fallen wood rapidly decompose in oxygen-rich soil, mangrove sediment is persistently waterlogged and anaerobic. This profound absence of oxygen halts microbial decomposition, allowing carbon-rich organic deposits to remain locked safely in subterranean sediment for millennia.',
          },
        ],
        questions: [
          {
            id: 1,
            type: 'true_false_not_given',
            prompt: 'Most terrestrial tree species can tolerate regular tidal inundation by salt water.',
            correctAnswer: 'False',
            explanation: 'Paragraph A states that mangroves inhabit an environment that "would prove swiftly lethal to virtually all terrestrial tree species". Therefore, the statement is False.',
          },
          {
            id: 2,
            type: 'true_false_not_given',
            prompt: 'Pneumatophores in Black Mangroves take in oxygen primarily during high tide.',
            correctAnswer: 'False',
            explanation: 'Paragraph B explicitly notes that lenticels permit atmospheric oxygen to diffuse down "during low tide cycles", not high tide.',
          },
          {
            id: 3,
            type: 'true_false_not_given',
            prompt: 'Secretor mangrove species eliminate excess salt through microscopic glands on their leaves.',
            correctAnswer: 'True',
            explanation: 'Paragraph C confirms secretor species "possess specialized salt glands located on the upper surfaces of their leaves, which actively pump sodium and chloride ions outward".',
          },
          {
            id: 4,
            type: 'true_false_not_given',
            prompt: 'Rhizophora mangroves absorb more than half of the salt present in ocean water.',
            correctAnswer: 'False',
            explanation: 'Paragraph C states they filter out "upwards of ninety-five percent of dissolved salt ions", meaning they absorb less than five percent.',
          },
          {
            id: 5,
            type: 'true_false_not_given',
            prompt: 'Mangroves cover a larger global surface area than tropical rainforests.',
            correctAnswer: 'False',
            explanation: 'Paragraph E states that mangroves "account for less than one percent of total global forest coverage", whereas rainforests are vastly larger.',
          },
          {
            id: 6,
            type: 'true_false_not_given',
            prompt: 'The high cost of artificial sea walls has prompted governments to replace them with mangroves.',
            correctAnswer: 'Not Given',
            explanation: 'While Paragraph D discusses mangroves acting as natural barriers, there is no mention of the relative economic cost of artificial sea walls or government replacement policies.',
          },
          {
            id: 7,
            type: 'true_false_not_given',
            prompt: 'Organic carbon stays trapped in mangrove soils because microbial breakdown is inhibited by a lack of oxygen.',
            correctAnswer: 'True',
            explanation: 'Paragraph E explains that "This profound absence of oxygen halts microbial decomposition, allowing carbon-rich organic deposits to remain locked safely... for millennia".',
          },
          {
            id: 8,
            type: 'fill_blank',
            prompt: 'Red Mangroves are anchored into unstable sediment by their _____ roots.',
            correctAnswer: ['stilt', 'prop', 'stilt or prop'],
            explanation: 'Paragraph B refers to "their aerial stilt or prop roots".',
          },
          {
            id: 9,
            type: 'fill_blank',
            prompt: 'Breathing pores that admit air into pneumatophores are known as _____',
            correctAnswer: ['lenticels', 'Lenticels'],
            explanation: 'Paragraph B specifies "microscopic hydrophobic breathing pores termed lenticels".',
          },
          {
            id: 10,
            type: 'fill_blank',
            prompt: 'In Rhizophora roots, salt filtration takes place within layers containing _____',
            correctAnswer: ['suberin', 'suberin layers'],
            explanation: 'Paragraph C states filtration occurs "within their root suberin layers".',
          },
          {
            id: 11,
            type: 'fill_blank',
            prompt: 'A mangrove belt measuring 100 meters across can reduce storm wave height by up to _____ percent.',
            correctAnswer: ['66', 'sixty-six'],
            explanation: 'Paragraph D notes wave height attenuation of "up to sixty-six percent".',
          },
          {
            id: 12,
            type: 'fill_blank',
            prompt: 'Carbon stored in coastal and marine habitats is referred to by scientists as _____ carbon.',
            correctAnswer: ['blue', 'blue carbon'],
            explanation: 'Paragraph E terms their role as "blue carbon sinks".',
          },
          {
            id: 13,
            type: 'fill_blank',
            prompt: 'Mangroves store carbon at rates 3 to 5 times greater than undisturbed _____ rainforests.',
            correctAnswer: ['terrestrial', 'terrestrial rainforests'],
            explanation: 'Paragraph E contrasts rates with "undisturbed terrestrial rainforests".',
          },
        ],
      },
      {
        id: 2,
        title: 'Passage 2: The Neuroscience of Bilingualism and Cognitive Flexibility',
        subtitle: 'How managing multiple linguistic codes reshapes neural networks and executive control across the lifespan.',
        paragraphs: [
          {
            label: 'A',
            text: 'For much of the twentieth century, conventional pedagogical dogma warned that exposing young children to two languages simultaneously risked causing cognitive confusion, speech delays, and developmental stagnation. Early educational psychologists posited that the human brain possessed a finite linguistic storage reservoir, suggesting that acquiring a second language would inevitably dilute a child\'s mastery of their native tongue. Modern neuroimaging and psycholinguistic inquiry have utterly dismantled this archaic deficit model, revealing instead that lifelong bilingualism confers profound structural and functional advantages.',
          },
          {
            label: 'B',
            text: 'The fundamental engine behind the bilingual advantage is a mental phenomenon known as non-selective lexical activation. When a bilingual individual reads, listens, or speaks in one language, both language systems remain active and competing simultaneously within the cerebral cortex. For instance, when a French-English bilingual hears the English word "desk", their brain automatically activates the French equivalent "bureau" alongside candidate phonemes. Consequently, the brain must continuously deploy cognitive inhibition to suppress the irrelevant language while retrieving target lexical items.',
          },
          {
            label: 'C',
            text: 'This perpetual linguistic juggling recruits the brain\'s executive control network, anchored primarily in the dorsolateral prefrontal cortex, the anterior cingulate cortex, and the basal ganglia. Executive control governs essential non-verbal cognitive functions: selective attention, working memory updating, task switching, and conflict resolution. Because bilingual individuals exercise these control circuits continuously during every conversational turn, their neural pathways become markedly more resilient and efficient compared to monolinguals.',
          },
          {
            label: 'D',
            text: 'Nowhere is this neural divergence more striking than in performance on standard inhibitory control paradigms, such as the famous Simon Task and the Stroop Test. In these experimental settings, participants must ignore conflicting sensory cues and respond solely to target criteria. Decades of meta-analytic studies demonstrate that bilingual participants across all age demographics consistently exhibit shorter reaction latencies and commit significantly fewer interference errors, underscoring superior inhibitory processing.',
          },
          {
            label: 'E',
            text: 'Intriguingly, the neuroprotective benefits of bilingualism become even more pronounced in the autumn of life. In landmark epidemiological investigations led by cognitive neuropsychologist Dr. Ellen Bialystok, researchers tracked hundreds of elderly patients diagnosed with neurodegenerative diseases, including Alzheimer\'s pathology. The clinical findings were striking: bilingual patients exhibited symptoms of clinical dementia between four and five years later than monolingual peers presenting identical levels of physical brain atrophy.',
          },
          {
            label: 'F',
            text: 'This discrepancy is explained by the construct of cognitive reserve. While bilingualism does not prevent physical neuropathology or tau protein accumulation from taking place, the intensified neural connectivity and alternative communicative pathways built over a lifetime of language switching allow the brain to effectively reroute cognitive tasks around compromised areas. The bilingual brain compensates for organic degradation by leveraging heightened executive control efficiency.',
          },
        ],
        questions: [
          {
            id: 14,
            type: 'matching_headings',
            prompt: 'Which paragraph outlines the historical misconceptions surrounding childhood bilingualism?',
            options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
            correctAnswer: 'Paragraph A',
            explanation: 'Paragraph A details twentieth-century pedagogical dogma claiming two languages caused cognitive confusion.',
          },
          {
            id: 15,
            type: 'matching_headings',
            prompt: 'Which paragraph describes the automatic simultaneous activation of both vocabularies?',
            options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
            correctAnswer: 'Paragraph B',
            explanation: 'Paragraph B explains non-selective lexical activation where both language systems remain active.',
          },
          {
            id: 16,
            type: 'matching_headings',
            prompt: 'Which paragraph specifies the brain regions responsible for executive control?',
            options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
            correctAnswer: 'Paragraph C',
            explanation: 'Paragraph C identifies the dorsolateral prefrontal cortex, anterior cingulate cortex, and basal ganglia.',
          },
          {
            id: 17,
            type: 'matching_headings',
            prompt: 'Which paragraph discusses laboratory test results demonstrating superior reaction times?',
            options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
            correctAnswer: 'Paragraph D',
            explanation: 'Paragraph D examines Simon Task and Stroop Test performance.',
          },
          {
            id: 18,
            type: 'matching_headings',
            prompt: 'Which paragraph discusses delayed onset of dementia symptoms in elderly patients?',
            options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
            correctAnswer: 'Paragraph E',
            explanation: 'Paragraph E discusses Dr. Ellen Bialystok\'s research on dementia onset delayed by 4-5 years.',
          },
          {
            id: 19,
            type: 'matching_headings',
            prompt: 'Which paragraph explains the mechanism of cognitive reserve rerouting neural signals?',
            options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
            correctAnswer: 'Paragraph F',
            explanation: 'Paragraph F explains how cognitive reserve allows alternative communicative pathways.',
          },
          {
            id: 20,
            type: 'multiple_choice',
            prompt: 'What was the assumption of early educational psychologists regarding language acquisition?',
            options: ['Children could acquire unlimited languages without effort', 'The human brain possessed a finite storage capacity for languages', 'Second language learning damaged physical hearing apparatus', 'Monolingual children had poorer reading comprehension'],
            correctAnswer: 'The human brain possessed a finite storage capacity for languages',
            explanation: 'Paragraph A states: "Early educational psychologists posited that the human brain possessed a finite linguistic storage reservoir".',
          },
          {
            id: 21,
            type: 'multiple_choice',
            prompt: 'In the brain, what must happen when a bilingual person attempts to produce a word in one language?',
            options: ['They must forget words in the other language permanently', 'They must deploy cognitive inhibition to suppress the irrelevant language', 'Both languages must be spoken simultaneously', 'The brain switches off the prefrontal cortex'],
            correctAnswer: 'They must deploy cognitive inhibition to suppress the irrelevant language',
            explanation: 'Paragraph B explains: "the brain must continuously deploy cognitive inhibition to suppress the irrelevant language".',
          },
          {
            id: 22,
            type: 'multiple_choice',
            prompt: 'According to research by Dr. Ellen Bialystok, bilingual individuals showed dementia symptoms:',
            options: ['At the exact same age as monolinguals', 'Two to three years earlier than monolinguals', 'Four to five years later than monolinguals', 'Only if they spoke three or more languages'],
            correctAnswer: 'Four to five years later than monolinguals',
            explanation: 'Paragraph E confirms bilingual patients exhibited symptoms "between four and five years later than monolingual peers".',
          },
          {
            id: 23,
            type: 'multiple_choice',
            prompt: 'What does cognitive reserve do when physical neuropathology is present?',
            options: ['It eliminates all amyloid plaques immediately', 'It repairs damaged cells back to infancy', 'It allows neural tasks to be rerouted around damaged areas', 'It prevents the individual from aging physically'],
            correctAnswer: 'It allows neural tasks to be rerouted around damaged areas',
            explanation: 'Paragraph F states: "...allow the brain to effectively reroute cognitive tasks around compromised areas."',
          },
          {
            id: 24,
            type: 'fill_blank',
            prompt: 'Simultaneous activation of multiple languages is known as non-selective _____ activation.',
            correctAnswer: ['lexical', 'Lexical'],
            explanation: 'Paragraph B: "known as non-selective lexical activation".',
          },
          {
            id: 25,
            type: 'fill_blank',
            prompt: 'One of the non-verbal mental capacities overseen by executive control is working _____',
            correctAnswer: ['memory', 'memory updating'],
            explanation: 'Paragraph C lists "working memory updating".',
          },
          {
            id: 26,
            type: 'fill_blank',
            prompt: 'The inhibitory control experiment named after J. Ridley Stroop is called the _____ Test.',
            correctAnswer: ['Stroop', 'stroop'],
            explanation: 'Paragraph D cites the Simon Task and the Stroop Test.',
          },
        ],
      },
      {
        id: 3,
        title: 'Passage 3: The Future of Deep-Sea Mineral Mining and Global Environmental Governance',
        subtitle: 'Scrutinizing the geopolitical scramble for seafloor polymetallic nodules and the delicate legal framework of the Clarion-Clipperton Zone.',
        paragraphs: [
          {
            label: 'A',
            text: 'Four thousand meters beneath the surface of the central Pacific Ocean lies the Clarion-Clipperton Zone (CCZ), an abyssal plain spanning over four point five million square kilometers. In this sunless, high-pressure expanse, the seafloor is blanketed with trillions of potato-sized black concretions known as polymetallic nodules. Rich in copper, cobalt, nickel, and manganese, these geological deposits represent higher concentrations of critical battery metals than all known terrestrial mineral deposits combined. Proponents argue that harvesting these seabed ores is non-negotiable if humanity is to manufacture the billions of electric vehicles, wind turbines, and grid-scale storage batteries mandated by global decarbonization treaties.',
          },
          {
            label: 'B',
            text: 'Mining advocates champion the seabed as an environmentally superior alternative to traditional terrestrial mining. Land-based extraction of nickel and cobalt in biodiverse regions, such as Indonesia and the Democratic Republic of Congo, is notorious for severe deforestation, toxic tailings dam collapses, sulfuric acid leaching, and human rights violations. By contrast, seafloor mining produces zero overburden waste rock and displaces no indigenous terrestrial communities. However, marine biologists and oceanographers vigorously contest this sanitized portrayal, warning that industrialized scraping of the abyssal plain could trigger irreversible ecological collapse across the planet\'s least understood biosphere.',
          },
          {
            label: 'C',
            text: 'The abyssal environment is characterized by extreme biological frailty. Far from being a barren aquatic desert, the Clarion-Clipperton Zone harbors an astonishing richness of benthic megafauna, including ghost octopuses, xenophyophores, and stalked glass sponges, over ninety percent of which are completely new to science and found nowhere else. Polymetallic nodules require millions of years to precipitate around microscopic fossil nuclei at a rate of merely a few millimeters per million years. Stripping them away destroys non-renewable habitat substrates permanently.',
          },
          {
            label: 'D',
            text: 'Beyond direct physical destruction on the seabed, ocean scientists are profoundly concerned by sediment plumes generated during mining operations. Heavy track-mounted collection crawlers pulverize the seabed, lofting dense clouds of fine sediment into the water column. Concurrently, surface extraction vessels discharge residual slurry back into mid-water layers after nodules have been filtered out. These suspended particulate clouds can travel hundreds of kilometers on abyssal currents, clogging the delicate filter-feeding mechanisms of zooplankton and deep-sea corals, while blocking bioluminescent communication critical for predator avoidance and mating rituals.',
          },
          {
            label: 'E',
            text: 'Under international law, the mineral resources of the international seabed are governed by the International Seabed Authority (ISA), a Kingston-based intergovernmental body established under the United Nations Convention on the Law of the Sea (UNCLOS). The convention legally declares the international seabed to be the "Common Heritage of Mankind", requiring that all economic benefits be equitably shared, while mandating that the ISA ensure effective protection of the marine environment from harmful effects. As mining consortia pressure the ISA to finalize an exploitation code, a growing coalition of over twenty-five sovereign states, leading automotive brands, and international scientific bodies have demanded an immediate precautionary moratorium.',
          },
        ],
        questions: [
          {
            id: 27,
            type: 'yes_no_not_given',
            prompt: 'The Clarion-Clipperton Zone contains more battery minerals than all discovered land-based reserves.',
            correctAnswer: 'Yes',
            explanation: 'Paragraph A confirms these deposits "represent higher concentrations of critical battery metals than all known terrestrial mineral deposits combined".',
          },
          {
            id: 28,
            type: 'yes_no_not_given',
            prompt: 'Terrestrial mining of cobalt in the Democratic Republic of Congo is free from environmental impacts.',
            correctAnswer: 'No',
            explanation: 'Paragraph B explicitly highlights that terrestrial extraction is "notorious for severe deforestation, toxic tailings dam collapses, sulfuric acid leaching, and human rights violations".',
          },
          {
            id: 29,
            type: 'yes_no_not_given',
            prompt: 'Most benthic species discovered in the Clarion-Clipperton Zone are already well-documented elsewhere.',
            correctAnswer: 'No',
            explanation: 'Paragraph C states that "over ninety percent of which are completely new to science and found nowhere else".',
          },
          {
            id: 30,
            type: 'yes_no_not_given',
            prompt: 'Polymetallic nodules take millions of years to form on the seabed floor.',
            correctAnswer: 'Yes',
            explanation: 'Paragraph C notes nodules require "millions of years to precipitate... at a rate of merely a few millimeters per million years".',
          },
          {
            id: 31,
            type: 'yes_no_not_given',
            prompt: 'The International Seabed Authority is headquartered in Geneva, Switzerland.',
            correctAnswer: 'No',
            explanation: 'Paragraph E states the ISA is a "Kingston-based intergovernmental body", which is Kingston, Jamaica, not Geneva.',
          },
          {
            id: 32,
            type: 'yes_no_not_given',
            prompt: 'Private mining companies have offered financial compensation to coastal fishermen.',
            correctAnswer: 'Not Given',
            explanation: 'There is no mention in the passage of private mining firms offering financial compensation to fishermen.',
          },
          {
            id: 33,
            type: 'yes_no_not_given',
            prompt: 'Some major automotive manufacturers support a temporary pause on deep-sea mineral extraction.',
            correctAnswer: 'Yes',
            explanation: 'Paragraph E confirms that "leading automotive brands, and international scientific bodies have demanded an immediate precautionary moratorium".',
          },
          {
            id: 34,
            type: 'multiple_choice',
            prompt: 'At what approximate depth does the Clarion-Clipperton Zone abyssal plain lie?',
            options: ['1,000 meters', '2,500 meters', '4,000 meters', '8,000 meters'],
            correctAnswer: '4,000 meters',
            explanation: 'Paragraph A begins: "Four thousand meters beneath the surface of the central Pacific Ocean".',
          },
          {
            id: 35,
            type: 'multiple_choice',
            prompt: 'What primary physical danger do sediment plumes pose to deep-sea fauna?',
            options: ['They drastically increase ocean temperatures', 'They dissolve sea shells with high acidity', 'They clog filter-feeding apparatus and impair bioluminescent communication', 'They attract invasive predatory sharks from the surface'],
            correctAnswer: 'They clog filter-feeding apparatus and impair bioluminescent communication',
            explanation: 'Paragraph D notes plumes clog "the delicate filter-feeding mechanisms of zooplankton... while blocking bioluminescent communication".',
          },
          {
            id: 36,
            type: 'multiple_choice',
            prompt: 'Under UNCLOS, the international seabed is designated as the:',
            options: ['Sovereign Property of Coastal Nations', 'Common Heritage of Mankind', 'Exclusive Economic Reserve', 'Global Corporate Commons'],
            correctAnswer: 'Common Heritage of Mankind',
            explanation: 'Paragraph E: "The convention legally declares the international seabed to be the \'Common Heritage of Mankind\'".',
          },
          {
            id: 37,
            type: 'fill_blank',
            prompt: 'The Clarion-Clipperton Zone covers an area exceeding _____ million square kilometers.',
            correctAnswer: ['4.5', 'four point five'],
            explanation: 'Paragraph A specifies "spanning over four point five million square kilometers".',
          },
          {
            id: 38,
            type: 'fill_blank',
            prompt: 'Seabed concretions rich in metals are termed polymetallic _____',
            correctAnswer: ['nodules', 'Nodules'],
            explanation: 'Paragraph A: "concretions known as polymetallic nodules".',
          },
          {
            id: 39,
            type: 'fill_blank',
            prompt: 'Glass sponges anchored to the deep sea floor are described as _____',
            correctAnswer: ['stalked', 'stalked glass sponges'],
            explanation: 'Paragraph C lists "stalked glass sponges".',
          },
          {
            id: 40,
            type: 'fill_blank',
            prompt: 'Critics and nations advocating a halt to mining are calling for a precautionary _____',
            correctAnswer: ['moratorium', 'Moratorium'],
            explanation: 'Paragraph E states they have demanded an "immediate precautionary moratorium".',
          },
        ],
      },
    ],
    writing: [
      {
        taskNumber: 1,
        title: 'Academic Writing Task 1: Renewable Energy Adoption Report',
        prompt: `The chart below illustrates the proportion of total energy generated from renewable energy sources across four global regions (Europe, North America, Asia-Pacific, and Latin America) between 2000 and 2025 (projected).

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
Write at least 150 words.`,
        minWords: 150,
        timeRecommendedMinutes: 20,
        imageUrl: '/src/assets/images/ielts_writing_chart_1793112952373.jpg',
        chartDescription: `The graph tracks renewable energy percentages from 2000 to 2025:
- Europe: rose steadily from 5% in 2000 to 10% in 2005, 13% in 2010, 37% in 2015, 40% in 2020, and reaching a projected 50% in 2025.
- North America: started at 5% in 2000, 9% in 2005, 10% in 2010, 15% in 2015, 20% in 2020, projected to finish at 36% in 2025.
- Asia-Pacific: began at 0% in 2000, 6% in 2005, 10% in 2010, climbed sharply to 20% in 2015, 35% in 2020, and projected to match Europe at 50% in 2025.
- Latin America: began at 0% in 2000, 8% in 2005, 13% in 2010, 16% in 2015, 17% in 2020, projected to reach 20% in 2025.`,
        modelAnswerSnippet: `The multi-tier bar and line graph illustrates the percentage share of total energy generated via renewable sources across four distinct world regions over a twenty-five-year timeframe spanning from 2000 to a projected figure in 2025.

Overall, it is immediately evident that all four regions demonstrated an upward trajectory over the period. However, Europe and Asia-Pacific witnessed the most dramatic acceleration, both projected to lead the transition at 50% by 2025, whereas Latin America recorded the most modest overall expansion.`,
      },
      {
        taskNumber: 2,
        title: 'Academic Writing Task 2: Higher Education Purpose Discursive Essay',
        prompt: `Some people argue that university education should focus purely on technical and vocational skills that prepare students directly for employment in the modern economy. Others believe that the fundamental purpose of higher education is to cultivate critical thinking, intellectual inquiry, and a broad understanding of the arts and humanities.

Discuss both views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.
Write at least 250 words.`,
        minWords: 250,
        timeRecommendedMinutes: 40,
        modelAnswerSnippet: `In the contemporary economic landscape, the intended objective of tertiary education remains a subject of vigorous debate. While proponents of vocational specialization contend that universities must equip graduates directly with industry-ready technical skills, others maintain that the overarching virtue of higher education lies in nurturing intellectual curiosity and analytical discernment. In this essay, I will scrutinize both perspectives before demonstrating why an integrated pedagogical paradigm is paramount.`,
      },
    ],
    speaking: [
      {
        partNumber: 1,
        title: 'Part 1: Introduction and Familiar Topics',
        instructions: 'The examiner will introduce themselves and ask you to confirm your identity. Then, you will answer general questions about yourself, your hometown, your studies/work, and everyday habits.',
        questions: [
          'Can you tell me your full name and where you currently live?',
          'Do you work or are you currently studying?',
          'What do you enjoy most about the place or neighborhood where you live?',
          'How do you typically like to spend your free time on weekends?',
          'Do you prefer reading physical books or reading articles on digital devices? Why?',
        ],
        sampleResponse: `I currently reside in Manchester, England, where I am pursuing postgraduate studies. What I appreciate most about my neighborhood is its walkability and the balance between vibrant independent bookshops and calm canal-side paths. On weekends, I try to disconnect from screens by hiking in the Peak District. While I consume fast daily news digitally, for serious academic reading I invariably prefer physical books, as the tactile experience assists my cognitive retention.`,
      },
      {
        partNumber: 2,
        title: 'Part 2: Long Turn (Cue Card)',
        instructions: 'You will have exactly 1 minute to read the cue card and prepare notes on the digital scratchpad. Then, speak for 1 to 2 minutes continuously without stopping.',
        questions: [],
        cueCard: {
          topic: 'Describe a challenging skill or subject you learned independently outside of school or formal classes.',
          bulletPoints: [
            'What the skill or subject was',
            'When and why you decided to learn it',
            'What tools, materials, or methods you used to teach yourself',
            'And explain why mastering this skill was particularly challenging for you.',
          ],
          prepTimeSeconds: 60,
          speakTimeSeconds: 120,
        },
        sampleResponse: `A skill that I taught myself completely independently was computer programming in Python, specifically focused on automated data visualization. I decided to tackle this two summers ago when I realized that manually manipulating statistical spreadsheets for university lab assignments was inefficient and prone to human error. To learn, I relied on open-source interactive documentation, video tutorials, and daily problem-solving on coding repositories. What made it exceptionally challenging was transitioning from memorizing syntax to developing algorithmic logic; debugging errors when code failed without obvious clues demanded immense resilience. However, once my scripts successfully compiled and generated real-time graphs, it gave me immense confidence in self-directed problem-solving.`,
      },
      {
        partNumber: 3,
        title: 'Part 3: Two-Way In-Depth Discussion',
        instructions: 'The examiner will ask you broader, abstract questions related to the theme of Part 2: education, technology, and self-directed lifelong learning.',
        questions: [
          'In your opinion, how has the internet transformed the way people acquire new knowledge compared to previous generations?',
          'Do you believe automated artificial intelligence tools could ever completely replace human teachers in classrooms?',
          'Why do some adults find it significantly harder to learn a complex new skill than young children do?',
          'What responsibility do employers bear in providing continuous skill training for their workforce as industries automate?',
        ],
        sampleResponse: `The internet has democratized knowledge acquisition to an unprecedented degree, shifting education from passive classroom absorption to active, on-demand exploration. However, while AI can offer bespoke explanations and instant feedback, it cannot replicate the empathetic mentorship, ethical guidance, and emotional accountability that human educators provide. Adults often struggle with new skills not because of neuroplasticity limits, but because of heightened fear of failure and rigid cognitive habits. Ultimately, employers have both a moral and economic duty to reskill workers, ensuring technological transitions do not leave workers obsolete.`,
      },
    ],
  },
];
