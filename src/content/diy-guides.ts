export type DiyGuideLink = {
  href: string;
  label: string;
};

export type DiyGuideSection = {
  heading: string;
  intro: string;
  ordered?: boolean;
  points: {
    title: string;
    body: string;
  }[];
};

export type DiyGuide = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  publishedOn: string;
  primaryTopic: string;
  sections: DiyGuideSection[];
  safetyTitle: string;
  safetyBody: string;
  safetyPoints: string[];
  serviceLinks: DiyGuideLink[];
  relatedGuideLinks: DiyGuideLink[];
  cta: {
    title: string;
    body: string;
    href: string;
    label: string;
  };
};

export const diyGuides: DiyGuide[] = [
  {
    slug: "weekly-pool-care-guide",
    title: "Weekly Pool Care & Maintenance Guide",
    description:
      "A practical weekly pool-care guide covering cleaning, circulation observations, water testing, weather, service frequency, and signs routine maintenance is not enough.",
    summary:
      "Routine pool care is a repeatable observation-and-maintenance process, not one universal checklist for every backyard. Use this guide to organize cleaning, water testing, circulation awareness, and condition-based escalation without treating weekly attention as a guarantee that every pool will stay stable.",
    publishedOn: "2026-10-15",
    primaryTopic: "Routine residential pool care and maintenance decisions",
    sections: [
      {
        heading: "Build a routine around the pool you actually have",
        intro:
          "A useful pool maintenance checklist starts with current conditions. Pool size, surface, equipment, surrounding trees, wind exposure, weather, and swimmer use can change what needs attention and how quickly debris or chemistry can drift.",
        points: [
          {
            title: "Start with a visual check",
            body: "Look at water color and clarity, the visible debris load, the water level, and whether circulation appears normal before beginning routine cleaning. A new symptom is a reason to slow down and understand the condition rather than blindly repeating last week's work.",
          },
          {
            title: "Use weekly as a planning rhythm, not a universal rule",
            body: "Many residential pools benefit from a weekly maintenance rhythm, but heavy use, high winds, dust, rain, unusual heat, or a developing water problem can require more-frequent observation or separate corrective work. A lightly used covered pool and an exposed high-use pool should not be assumed to need identical care.",
          },
          {
            title: "Keep simple records",
            body: "Record the date, visible condition, test results, work completed, chemical additions, and anything unusual. Consistent notes make trends easier to recognize and create a better starting point if professional service becomes necessary.",
          },
        ],
      },
      {
        heading: "Routine cleaning checkpoints",
        intro:
          "Cleaning is easier to manage when debris is removed before it breaks down or moves deeper into the circulation system. Work only from safe, accessible areas and follow the instructions for the tools and equipment you use.",
        points: [
          {
            title: "Skim and remove visible debris",
            body: "Remove leaves, insects, and floating material before it becomes waterlogged or reaches baskets and filters. After wind or a storm, the debris load may be far greater than a normal maintenance visit can reasonably address.",
          },
          {
            title: "Brush condition-appropriate surfaces",
            body: "Brushing can disrupt early buildup on walls, steps, and other reachable surfaces. Choose tools and technique that are appropriate for the pool surface; aggressive or unsuitable tools can damage finishes.",
          },
          {
            title: "Vacuum when the condition and equipment support it",
            body: "Vacuuming can remove settled dirt and debris, but a heavy load, very poor visibility, or weak circulation may call for a different cleanup plan. Do not proceed when you cannot safely see the pool or when equipment appears damaged or unsafe.",
          },
          {
            title: "Check accessible baskets and debris points",
            body: "Accessible skimmer and pump baskets can collect material that restricts flow. Shut equipment down and follow manufacturer directions before opening any component; do not enter or disassemble equipment you are not trained to service.",
          },
        ],
      },
      {
        heading: "Circulation and filter-condition awareness",
        intro:
          "Routine care includes noticing how the system behaves. Observation can identify a need for further assessment, but it is not a substitute for electrical, mechanical, or pressure-system diagnosis.",
        points: [
          {
            title: "Observe returns and surface movement",
            body: "Compare visible water movement with the pool's normal behavior. Weak return flow, poor skimming action, unusual air, prime loss, leaks, or a pump running without expected water movement can point to a circulation or equipment concern.",
          },
          {
            title: "Watch for changes in filter behavior",
            body: "A dirty or overloaded filter can contribute to weak flow and persistent clarity problems. Use the equipment manufacturer's instructions and the system's own established clean baseline rather than relying on a universal pressure threshold or replacement interval.",
          },
          {
            title: "Stop at the safe observation boundary",
            body: "Do not open energized equipment, defeat safety controls, or attempt electrical repair. Visible damage, unusual noise, overheating, repeated loss of circulation, or unsafe access is a reason to stop and request qualified help.",
          },
        ],
      },
      {
        heading: "Water testing and adjustment as a process",
        intro:
          "Water testing is most useful when readings are treated as related information rather than isolated numbers. Actual chemical additions depend on pool volume, current readings, product concentration, pool surface and equipment, and label directions.",
        points: [
          {
            title: "Test before making a change",
            body: "Guessing from appearance alone can send water farther out of balance. Use a suitable test method, record the results, and consider whether recent rain, heavy use, debris, chemical additions, or circulation changes may be affecting the reading.",
          },
          {
            title: "Make controlled adjustments",
            body: "Identify the purpose of the exact product, follow its label, and make one controlled change at a time. Never mix pool chemicals together or add chlorine and acid together. Allow circulation and retest according to product directions before making another major adjustment.",
          },
          {
            title: "Look for repeated drift",
            body: "A reading that repeatedly moves out of range may reflect more than a missed dose. Water balance relationships, heavy organic load, sunlight, stabilizer, filter condition, or circulation performance may need to be reviewed together.",
          },
        ],
      },
      {
        heading: "When routine maintenance is no longer enough",
        intro:
          "A weekly cleaning checklist is not a recovery plan or equipment diagnosis. Recognizing that boundary early can prevent repeated chemical guessing and avoidable strain on the system.",
        points: [
          {
            title: "Choose one-time cleanup for a manageable catch-up need",
            body: "A pool that is behind after travel, heavy use, or moderate debris may fit a condition-based one-time cleaning. The starting condition still determines whether one visit is enough.",
          },
          {
            title: "Treat green or persistently cloudy water as corrective work",
            body: "Visible algae, poor visibility, strong chlorine demand, or recurring cloudiness can require staged recovery, filtration support, and follow-up testing rather than ordinary weekly maintenance.",
          },
          {
            title: "Separate equipment concerns from cleaning",
            body: "A failed pump, serious leak, damaged filter, or other circulation problem cannot be solved by adding more chemicals. When performance is abnormal, an equipment assessment may be the appropriate next step.",
          },
          {
            title: "Compare DIY care with professional recurring service",
            body: "DIY care means owning the testing, cleaning, product decisions, recordkeeping, and escalation process. Professional weekly service can combine routine cleaning, water care, visual observations, and service reporting, while corrective work and repairs remain separately assessed.",
          },
        ],
      },
    ],
    safetyTitle: "Routine-care limits",
    safetyBody:
      "This guide is general education, not a universal service schedule, equipment-repair manual, or individualized treatment plan.",
    safetyPoints: [
      "Do not use a universal chemical dose; current readings, pool volume, and product concentration matter.",
      "Do not open energized equipment or perform unsafe pressure, electrical, or mechanical work.",
      "Increase observation after heavy use or severe weather, but do not assume every pool needs the same frequency.",
      "Escalate green water, poor visibility, failed circulation, visible damage, or persistent chemistry problems.",
    ],
    serviceLinks: [
      { href: "/services/weekly-services", label: "Weekly Pool Service" },
      { href: "/pool-service-reports", label: "Pool Service Reports" },
      { href: "/services/one-time-cleans", label: "One-Time Pool Cleaning" },
      { href: "/services/algae-removal", label: "Green-to-Clean Service" },
      { href: "/services/pool-equipment-repair", label: "Pool Equipment Repair" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-chemistry-troubleshooting", label: "Pool Chemistry Troubleshooting" },
      { href: "/diy-pool-care/west-texas-storm-pool-care", label: "West Texas Storm Pool Care" },
      { href: "/diy-pool-care/pool-equipment-troubleshooting", label: "Pool Equipment Troubleshooting" },
      { href: "/blog/pool-care-after-parties-vacations-heavy-use", label: "Pool Care After Parties, Vacations & Heavy Use" },
    ],
    cta: {
      title: "Want the routine handled and documented?",
      body: "Request weekly pool service and share the service address, current condition, pool details, and any recurring concerns. Route availability and the appropriate starting scope are confirmed before service begins.",
      href: "/services/weekly-services",
      label: "Explore Weekly Pool Service",
    },
  },
  {
    slug: "pool-chemistry-troubleshooting",
    title: "Pool Chemistry Troubleshooting Guide",
    description:
      "Understand common chlorine, pH, alkalinity, calcium, stabilizer, salt, scale, and water-balance relationships before making pool-chemistry changes.",
    summary:
      "Pool chemistry troubleshooting works best when symptoms, recent events, circulation, and multiple test results are considered together. This guide explains common relationships and a controlled decision process without prescribing an individualized dose or promising that one chemical change will solve the condition.",
    publishedOn: "2026-10-15",
    primaryTopic: "Symptom-led pool chemistry relationships and troubleshooting",
    sections: [
      {
        heading: "Start with context before interpreting a reading",
        intro:
          "A single number rarely explains the entire pool. Pool volume, product concentration, surface and equipment type, current readings, recent additions, weather, use, debris, and circulation can all influence the next decision.",
        points: [
          {
            title: "Confirm the test and recent history",
            body: "Retest questionable results with a suitable method and note recent rain, refill water, heavy swimmer use, debris, chemical additions, or circulation interruption. Testing before changing the water reduces the risk of treating a bad assumption.",
          },
          {
            title: "Read related values together",
            body: "Chlorine, pH, alkalinity, calcium hardness, stabilizer, salt, temperature, and other factors influence overall water behavior. The saturation-index or LSI concept is useful because it considers several readings together when evaluating scale-forming or aggressive-water tendencies.",
          },
          {
            title: "Change one variable deliberately",
            body: "Use the exact product label, account for concentration and pool volume, circulate as directed, and retest before another major adjustment. Multiple simultaneous changes make results harder to interpret and can be unsafe.",
          },
        ],
      },
      {
        heading: "Chlorine that is low, high, or not holding",
        intro:
          "Chlorine behavior is affected by more than the most recent addition. Sunlight, stabilizer, algae, debris, heavy use, water balance, circulation, and the concentration of the product all matter.",
        points: [
          {
            title: "Low chlorine or rapid overnight loss",
            body: "Chlorine that disappears quickly can reflect strong chlorine demand from algae, organic debris, contamination, or another unresolved water condition. Confirm the reading and investigate the load on the water instead of repeatedly adding product without a plan.",
          },
          {
            title: "Chlorine not holding in sunlight",
            body: "Sun exposure and stabilizer are connected to chlorine persistence. Too little stabilizer can leave chlorine vulnerable to sunlight, while too much can complicate effective sanitation. Treat the stabilizer-and-chlorine relationship as part of the full water picture.",
          },
          {
            title: "Combined chlorine and heavy demand",
            body: "A difference between free and total chlorine can indicate combined chlorine, but the result must be interpreted with test quality and pool conditions in mind. Persistent odor, irritation concerns, or unusual demand warrants careful reassessment rather than a guaranteed one-step correction.",
          },
          {
            title: "High chlorine",
            body: "Do not add more sanitizer based only on appearance. Confirm the reading, stop unnecessary additions, follow product and test guidance, and obtain professional help when the level, cause, or safe next step is unclear. Clear water is not proof that water is safe.",
          },
        ],
      },
      {
        heading: "pH and alkalinity move together",
        intro:
          "pH describes an aspect of current water condition, while total alkalinity influences how resistant pH is to change. Treating either reading without considering the other can lead to repeated drift.",
        points: [
          {
            title: "pH keeps rising",
            body: "Repeated pH rise may be influenced by aeration, water features, source water, recent treatment, or alkalinity. Confirm the trend over more than one reliable test before assuming a single cause or equipment fault.",
          },
          {
            title: "pH keeps dropping",
            body: "Falling pH can be connected to low buffering capacity, acidic additions, source water, or other chemistry conditions. Review the addition history and alkalinity relationship rather than repeatedly correcting only the pH reading.",
          },
          {
            title: "High or low alkalinity",
            body: "Alkalinity adjustments can affect pH behavior, and the appropriate product and amount depend on current readings, pool volume, and product concentration. Sodium bicarbonate and soda ash are not interchangeable merely because both can affect water balance.",
          },
        ],
      },
      {
        heading: "Calcium, scale, and corrosion risk",
        intro:
          "Calcium hardness is part of the broader balance picture. Surface type, pH, alkalinity, temperature, and dissolved material affect whether water trends toward scale formation or aggressive behavior.",
        points: [
          {
            title: "High calcium and visible scale",
            body: "High calcium combined with other balance conditions can contribute to scale on surfaces and equipment. Waterline buildup may need professional tile cleaning, while widespread finish staining or deterioration requires a different assessment.",
          },
          {
            title: "Low calcium and aggressive-water concerns",
            body: "Low calcium can contribute to aggressive water in relevant pool systems, but calcium should not be adjusted in isolation. Review the full balance relationship and the requirements of the pool surface and equipment.",
          },
          {
            title: "Distinguish cleaning from finish work",
            body: "Tile cleaning addresses suitable mineral buildup on waterline tile. An acid wash is a condition-based treatment for an appropriate pool finish, and resurfacing replaces an interior finish. None should be assumed from a chemistry reading alone.",
          },
        ],
      },
      {
        heading: "Stabilizer, salt, and chlorine production",
        intro:
          "Stabilizer and salt-system readings should be interpreted with the sanitizer result, equipment behavior, and manufacturer guidance rather than treated as standalone diagnoses.",
        points: [
          {
            title: "Cyanuric acid or CYA",
            body: "Stabilizer helps protect chlorine from sunlight, but high or low CYA can change how chlorine behaves and how the water should be managed. Confirm the test before planning a correction, especially when dilution or water replacement might be considered.",
          },
          {
            title: "Salt low or high",
            body: "The correct salt range depends on the specific system. Use the equipment manufacturer's guidance, verify the reading, and account for recent water addition or loss before adding salt or considering water replacement.",
          },
          {
            title: "Salt pool producing insufficient chlorine",
            body: "A low chlorine result in a salt pool does not prove that the generating equipment has failed. Water temperature, run time, settings, salt, stabilizer, demand, circulation, and visible equipment condition may all be relevant; electrical or internal equipment diagnosis belongs with qualified service.",
          },
        ],
      },
      {
        heading: "A controlled troubleshooting sequence",
        intro:
          "Use a repeatable sequence so each decision is supported by an observation rather than a guess.",
        ordered: true,
        points: [
          { title: "Test", body: "Confirm current readings with a suitable test method before adding product." },
          { title: "Contextualize", body: "Review pool volume, recent weather and use, circulation, debris, prior additions, surface, equipment, and product concentration." },
          { title: "Prioritize", body: "Identify the most important condition and whether it can be addressed safely without first correcting circulation, debris, or another underlying issue." },
          { title: "Follow the exact label", body: "Use only the selected product's directions and manufacturer-specified protective equipment. Never mix chemicals together or combine chlorine and acid." },
          { title: "Circulate and retest", body: "Allow the water to circulate according to product directions, then retest before making another major change." },
          { title: "Escalate persistent problems", body: "Professional assessment is appropriate when readings remain severe or unstable, water is green or persistently cloudy, circulation is poor, or the correct next step is unclear." },
        ],
      },
    ],
    safetyTitle: "Chemistry guidance, not an individualized treatment",
    safetyBody:
      "This guide explains relationships and decision-making. It does not prescribe a dose, replace a product label, diagnose equipment from chemistry alone, or guarantee a water-quality or health outcome.",
    safetyPoints: [
      "Pool volume, current readings, product concentration, surface, and equipment can change the appropriate action.",
      "Never mix pool chemicals together and never combine chlorine and acid.",
      "Use protective equipment and storage practices specified by each product's manufacturer.",
      "Request professional help for severe, persistent, conflicting, or unclear conditions.",
    ],
    serviceLinks: [
      { href: "/services/weekly-services", label: "Weekly Pool Service" },
      { href: "/services/free-pool-chemical-delivery", label: "Pool Chemical Delivery" },
      { href: "/services/algae-removal", label: "Green-to-Clean Service" },
      { href: "/services/acid-wash", label: "Pool Acid Wash" },
      { href: "/services/pool-tile-cleaning", label: "Pool Tile Cleaning" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-chemical-dosing-safety", label: "Pool Chemical Dosing & Safety" },
      { href: "/diy-pool-care/green-cloudy-pool-recovery", label: "Green & Cloudy Pool Recovery" },
    ],
    cta: {
      title: "Chemistry keeps drifting after careful testing?",
      body: "Weekly service or condition-based corrective work may be more appropriate when water remains unstable, green, or persistently cloudy. Share current readings, recent treatment, pool details, and circulation concerns when requesting help.",
      href: "/services/weekly-services",
      label: "Explore Weekly Pool Service",
    },
  },
  {
    slug: "pool-chemical-dosing-safety",
    title: "Pool Chemical Dosing & Safety Guide",
    description:
      "A conservative pool-chemical decision process covering testing, pool volume, product concentration, label directions, safe addition, circulation, retesting, and storage.",
    summary:
      "Safe pool chemical dosing starts with information, not a calculator. Confirm the pool, the current reading, the purpose and concentration of the exact product, and its label directions before deciding whether to add anything. This guide explains the process without publishing individualized doses or universal wait times.",
    publishedOn: "2026-10-15",
    primaryTopic: "Conservative pool chemical dosing decisions and handling boundaries",
    sections: [
      {
        heading: "The information required before any dose",
        intro:
          "A dosage printed for a different pool or a different product can be wrong for the situation in front of you. Gather the inputs that determine the decision before opening a container.",
        points: [
          {
            title: "Confirm pool volume",
            body: "Chemical amounts depend on water volume. Use reliable pool dimensions and account for shape and average depth rather than guessing from surface appearance. When volume is uncertain, avoid pretending that a calculated result is precise.",
          },
          {
            title: "Confirm the current reading",
            body: "Test before adding product and repeat a surprising result with an appropriate method. The difference between the current condition and the intended change is essential to any label-based calculation.",
          },
          {
            title: "Identify the exact purpose",
            body: "Decide whether the goal concerns sanitizer, pH, alkalinity, stabilizer, calcium, salt, or another condition. Similar-looking products may serve different purposes, and one symptom can have more than one contributing cause.",
          },
          {
            title: "Read concentration and label directions",
            body: "Products within the same category can have different active ingredients, strengths, application methods, restrictions, and protective-equipment requirements. The exact product label—not a generic online table—governs actual use.",
          },
        ],
      },
      {
        heading: "A cautious dosing sequence",
        intro:
          "The safest useful sequence is deliberate, documented, and reversible where possible. It avoids stacking uncertain changes on top of one another.",
        ordered: true,
        points: [
          { title: "Test first", body: "Record current readings and note recent additions, rainfall, refill water, debris, swimmer load, and circulation status." },
          { title: "Verify volume and product", body: "Confirm the pool volume, exact chemical name, purpose, concentration, expiration or condition where relevant, and label instructions." },
          { title: "Calculate from the label", body: "Use only the manufacturer's directions for the actual product and measured condition. Avoid false precision when volume or testing is uncertain." },
          { title: "Prepare the area", body: "Keep children and animals away, use manufacturer-specified protective equipment, and make sure storage containers and application tools are suitable and clearly identified." },
          { title: "Add one chemical at a time", body: "Never mix pool chemicals together, never combine chlorine and acid, and do not add multiple products simultaneously. Follow the label's application method exactly." },
          { title: "Circulate as directed", body: "Operate the pool only when the equipment is safe and follow product directions for circulation and access. There is no universal wait time that applies to every product and condition." },
          { title: "Retest and record", body: "Retest according to the product directions before making another major adjustment. Record what was added, when, why, and what the follow-up test showed." },
        ],
      },
      {
        heading: "How common product families differ",
        intro:
          "Product categories are not interchangeable. The comparison below explains purpose and decision context, not a recommendation to add any product.",
        points: [
          {
            title: "Liquid chlorine, tabs, and shock",
            body: "Liquid chlorine provides sanitizer without behaving exactly like stabilized tabs. Tabs dissolve over time and can add stabilizer depending on the product. “Shock” describes a treatment purpose or marketed product family, not a substitute for testing or an automatic answer to cloudy water.",
          },
          {
            title: "Muriatic acid and pH adjustment",
            body: "Acid can lower pH and affect alkalinity, but the correct decision depends on both readings and the full water-balance picture. Do not combine acid with chlorine, do not mix it with another pool chemical, and follow the exact handling and application instructions on the container.",
          },
          {
            title: "Sodium bicarbonate and soda ash",
            body: "Sodium bicarbonate is commonly associated with alkalinity adjustment, while soda ash has a different effect on pH and alkalinity. They should not be treated as interchangeable names for the same correction.",
          },
          {
            title: "Pool salt",
            body: "Salt supports a compatible salt-chlorine system; it is not sanitizer by itself. Confirm the equipment manufacturer's guidance and the current salt reading before adding product, because excess salt may require water replacement rather than another chemical correction.",
          },
          {
            title: "Stabilizer and chlorine",
            body: "Stabilizer can protect chlorine from sunlight, but its level affects chlorine management. Confirm CYA and the broader water condition before adding a stabilizer-containing product or treating rapid chlorine loss as a simple dosing problem.",
          },
        ],
      },
      {
        heading: "Free chlorine, total chlorine, and treatment decisions",
        intro:
          "Sanitizer readings are related but not identical, and the difference between them can provide context about combined chlorine. The appropriate response still depends on reliable testing and the pool's full condition.",
        points: [
          {
            title: "Do not dose from one number in isolation",
            body: "Review free chlorine, total chlorine, pH, stabilizer, visible water condition, recent use, and circulation together. A low sanitizer reading with green water is a different problem from a single low reading in otherwise stable water.",
          },
          {
            title: "Do not confuse clarity with safety",
            body: "Clear water can still have an unsuitable sanitizer or balance condition. Conversely, cloudiness can come from algae, filtration, debris, or chemistry. Appearance is an observation, not a complete safety determination.",
          },
          {
            title: "Stop when the evidence conflicts",
            body: "If repeat tests disagree, the required product is unclear, water is severely out of condition, or circulation is not working, stop adding chemicals and request professional assessment.",
          },
        ],
      },
      {
        heading: "Storage and handling boundaries",
        intro:
          "Safe storage is part of chemical care. Heat, moisture, contamination, damaged containers, and incompatible products can create serious risk.",
        points: [
          {
            title: "Keep products in original labeled containers",
            body: "Do not transfer pool chemicals into food, drink, or unmarked containers. Keep labels readable and lids secured as directed so the product can be identified and handled correctly.",
          },
          {
            title: "Store separately as directed",
            body: "Follow each manufacturer's storage requirements and separation instructions. Keep chemicals away from children and animals, and do not place incompatible products together merely for convenience.",
          },
          {
            title: "Do not improvise with spills or damaged containers",
            body: "Follow the product label and manufacturer guidance. If a container is leaking, contaminated, swollen, wet, or otherwise unsafe, isolate the area without handling it unnecessarily and seek appropriate professional guidance.",
          },
        ],
      },
      {
        heading: "When to stop and request help",
        intro:
          "A conservative process includes a clear stop point. More product is not a responsible answer when the pool or instructions are not understood.",
        points: [
          {
            title: "The calculation inputs are uncertain",
            body: "Ask for help when pool volume, the current reading, the exact product, concentration, or label direction cannot be confirmed. An automatic calculator cannot resolve missing or unreliable inputs.",
          },
          {
            title: "The water remains green, cloudy, or unstable",
            body: "Persistent problems may require debris removal, filtration work, staged recovery, water replacement, or equipment assessment. Chemical additions alone do not repair failed circulation or damaged equipment.",
          },
          {
            title: "The equipment or area appears unsafe",
            body: "Do not handle damaged energized equipment, enter unsafe spaces, or attempt electrical repair. Stop circulation-related work when visible damage, overheating, unusual noise, or unsafe access is present.",
          },
        ],
      },
    ],
    safetyTitle: "Non-negotiable chemical boundaries",
    safetyBody:
      "Product labels and manufacturer directions govern actual dosing, application, protective equipment, circulation, storage, and re-entry. This guide is not a calculator, dosage table, medical resource, or replacement for those directions.",
    safetyPoints: [
      "Never mix pool chemicals together and never combine chlorine and acid.",
      "Add only one chemical at a time and do not assume products are compatible.",
      "Use the protective equipment and storage practices specified by the manufacturer.",
      "Keep products away from children and animals and in their original labeled containers.",
      "Do not rely on clear appearance as proof that water is safe.",
    ],
    serviceLinks: [
      { href: "/services/free-pool-chemical-delivery", label: "Pool Chemical Delivery" },
      { href: "/services/weekly-services", label: "Weekly Pool Service" },
      { href: "/pool-service-reports", label: "Pool Service Reports" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-chemistry-troubleshooting", label: "Pool Chemistry Troubleshooting" },
    ],
    cta: {
      title: "Need common pool chemicals delivered?",
      body: "Submit a product and quantity request for confirmed availability, pricing, and delivery timing. The request is not a cart or checkout; Shipwrecked invoices separately after confirming the details, and free refers only to delivery within the normal service area.",
      href: "/services/free-pool-chemical-delivery",
      label: "Request Pool Chemical Delivery",
    },
  },
  {
    slug: "green-cloudy-pool-recovery",
    title: "Green & Cloudy Pool Recovery Guide",
    description:
      "A decision framework for green or cloudy pool water, algae concerns, debris, chlorine demand, circulation, filter load, weather effects, and staged recovery.",
    summary:
      "Green and cloudy water describe symptoms, not one guaranteed diagnosis. Recovery depends on visibility, debris, algae, chemistry, circulation, filtration, recent weather, and equipment condition. Use this framework to organize observations and recognize when routine cleaning is no longer enough.",
    publishedOn: "2026-10-15",
    primaryTopic: "Condition-based green and cloudy pool recovery decisions",
    sections: [
      {
        heading: "What the water is telling you",
        intro:
          "Color and clarity help describe the starting condition, but they do not identify every cause. Begin with what can be observed safely and avoid assuming that one chemical product will solve the pool.",
        points: [
          {
            title: "Green water",
            body: "Green water commonly raises an algae concern, especially with low sanitizer, heavy debris, warm conditions, or interrupted circulation. The shade of green alone does not establish severity, treatment amount, or whether equipment performance is contributing.",
          },
          {
            title: "Cloudy water",
            body: "Cloudiness can involve early algae, suspended debris, filtration limits, chemistry imbalance, heavy swimmer use, recent treatment, or more than one condition at once. A pool that stays cloudy after shocking needs reassessment rather than repeated blind dosing.",
          },
          {
            title: "Yellow material or dark spots",
            body: "Yellow or mustard-colored growth may behave differently from ordinary debris, but observation alone is not always conclusive. Dark spots are not automatically black algae; staining, surface condition, debris, and other growth can look similar and may require professional identification.",
          },
          {
            title: "Visibility is a safety boundary",
            body: "Do not enter a pool when the bottom and hazards cannot be seen clearly. Poor visibility also makes vacuuming, debris removal, and surface assessment harder, so severe conditions may need professional cleanup.",
          },
        ],
      },
      {
        heading: "Common contributing conditions",
        intro:
          "Recovery is more reliable when the water problem and the conditions supporting it are addressed together.",
        points: [
          {
            title: "Chlorine demand and organic load",
            body: "Algae, leaves, dirt, swimmer waste, and other organic material can consume sanitizer. Strong demand can make chlorine appear to disappear quickly or fail to hold, but the correct response depends on testing, pool volume, stabilizer, product concentration, and the remaining debris load.",
          },
          {
            title: "Poor circulation",
            body: "Weak flow, loss of prime, a stopped pump, closed or malfunctioning valves, or another equipment interruption can keep treated water from moving through the pool and filter. Chemical treatment does not repair failed equipment.",
          },
          {
            title: "Dirty or overloaded filtration",
            body: "A filter carrying a heavy debris or algae load may struggle to clear suspended material. Cleaning needs depend on the cartridge, DE, or sand system and its observed behavior; use manufacturer guidance and avoid invented pressure thresholds.",
          },
          {
            title: "Chemistry imbalance",
            body: "Sanitizer effectiveness and water behavior are influenced by pH, stabilizer, alkalinity, calcium, temperature, and other conditions. Test related readings before making adjustments and avoid changing several variables at once.",
          },
          {
            title: "Weather and equipment interruption",
            body: "Heavy rain, wind, dust, runoff, heat, power loss, or a circulation interruption can add debris, dilute or shift chemistry, and create recovery conditions quickly. The post-weather starting point may be very different from the last routine visit.",
          },
        ],
      },
      {
        heading: "A staged recovery decision framework",
        intro:
          "Recovery is a monitored sequence. The pool may need repeated observation, cleaning, circulation, filtration, testing, and condition-based treatment rather than a one-visit correction.",
        ordered: true,
        points: [
          { title: "Observe color, clarity, and debris", body: "Describe what is visible, whether the bottom can be seen, how much debris is present, and whether growth appears widespread or localized." },
          { title: "Confirm safe circulation", body: "Observe whether the pump is moving water normally and whether visible equipment appears intact. Do not open energized equipment or continue when damage or unsafe conditions are present." },
          { title: "Test the water", body: "Confirm current readings before treatment and consider stabilizer, pH, sanitizer, recent additions, weather, and source water together." },
          { title: "Identify likely contributors", body: "Review algae or organic load, debris, circulation, filter condition, chemistry, weather, use, and equipment interruption rather than selecting a cause from color alone." },
          { title: "Remove debris where safe", body: "Skim and remove accessible material so treatment and filtration are not working against avoidable organic load. Heavy or hidden debris may require professional cleanup." },
          { title: "Restore and maintain appropriate circulation", body: "Use the equipment only when it is operating safely and follow manufacturer guidance. Equipment repair or filter service may need to occur before water treatment can work effectively." },
          { title: "Use condition-based treatment", body: "Follow exact product labels and account for current readings, pool volume, product concentration, and the recovery plan. Never mix chemicals together or combine chlorine and acid." },
          { title: "Monitor and escalate", body: "Track clarity, sanitizer behavior, debris, flow, and filter load. Escalate severe, persistent, unsafe, or worsening conditions instead of promising a fixed completion time." },
        ],
      },
      {
        heading: "Why a pool can stay cloudy after shocking",
        intro:
          "A shock treatment does not automatically remove dead material, restore circulation, clean an overloaded filter, or correct every balance problem.",
        points: [
          {
            title: "The source load remains",
            body: "Leaves, dirt, algae, or other organic material may continue consuming sanitizer. Physical debris removal and brushing or vacuuming, when safe and appropriate, can be as important as the treatment decision.",
          },
          {
            title: "The filter needs attention",
            body: "Suspended material must be captured or removed. If flow has weakened or the filter is overloaded, filter cleaning or another equipment service may be needed before clarity improves.",
          },
          {
            title: "The chemistry decision was incomplete",
            body: "An incorrect pool volume, unreliable test, stabilizer condition, pH relationship, or different product concentration can change the result. Retest and reassess rather than automatically repeating the same addition.",
          },
          {
            title: "The system is not circulating normally",
            body: "A pump or plumbing concern can limit treatment distribution and filtration. More chemical cannot substitute for reliable water movement through a functioning system.",
          },
        ],
      },
      {
        heading: "Choose the right level of help",
        intro:
          "Match the service path to the starting condition instead of forcing every pool into a standard cleaning visit.",
        points: [
          {
            title: "One-time pool cleaning",
            body: "A manageable debris or catch-up condition without severe algae or equipment failure may fit a one-time cleaning assessment. One visit is not guaranteed to correct every water condition.",
          },
          {
            title: "Green-to-Clean recovery",
            body: "Green, algae-affected, or severely cloudy water may require staged corrective work, follow-up, filtration support, and condition-based timing before routine care is appropriate.",
          },
          {
            title: "Filter or equipment service",
            body: "Weak circulation, repeated prime loss, visible leaks, abnormal noise, or an overloaded or damaged filter can require separate assessment. Water treatment and mechanical repair are different scopes.",
          },
          {
            title: "Recurring weekly service after stabilization",
            body: "Once the pool is ready for routine care, weekly cleaning, testing, observation, and reporting can help reduce avoidable drift. Route availability and starting condition are confirmed separately.",
          },
        ],
      },
    ],
    safetyTitle: "Recovery expectations and limits",
    safetyBody:
      "This guide does not diagnose every discoloration, prescribe a universal dose, promise complete algae or stain removal, or guarantee a recovery timeline.",
    safetyPoints: [
      "Do not enter water when visibility is inadequate or the condition appears unsafe.",
      "Do not mix pool chemicals or combine chlorine and acid.",
      "Do not open energized equipment or attempt unsafe electrical or pressure-system work.",
      "Dark spots are not automatically black algae, and chemical treatment does not repair failed equipment.",
      "Severe or persistent conditions may require staged professional recovery.",
    ],
    serviceLinks: [
      { href: "/services/algae-removal", label: "Algae Removal & Green-to-Clean" },
      { href: "/services/one-time-cleans", label: "One-Time Pool Cleaning" },
      { href: "/services/filter-cleaning", label: "Pool Filter Cleaning" },
      { href: "/services/pool-equipment-repair", label: "Pool Equipment Repair" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-chemistry-troubleshooting", label: "Pool Chemistry Troubleshooting" },
      { href: "/diy-pool-care/west-texas-storm-pool-care", label: "West Texas Storm Pool Care" },
    ],
    cta: {
      title: "Routine cleaning is not enough for the current condition?",
      body: "Request a Green-to-Clean assessment and share the service address, water color and visibility, how long the condition has been present, recent treatment, circulation concerns, and current photos.",
      href: "/services/algae-removal",
      label: "Explore Green-to-Clean Service",
    },
  },
  {
    slug: "west-texas-storm-pool-care",
    title: "Pool Care After West Texas Storms & Heavy Rain",
    description:
      "A West Texas storm-pool-care guide covering debris, dust, heavy rain, water testing, filter load, circulation, power interruptions, and professional cleanup decisions.",
    summary:
      "West Texas wind, dust, heavy rain, and severe storms can change a pool's debris load, water level, chemistry, filtration demand, and equipment condition in a short period. Start with safety and visible conditions, then work through debris, circulation, testing, and escalation without assuming every storm needs the same treatment.",
    publishedOn: "2026-10-15",
    primaryTopic: "Pool care after West Texas storms, dust, and heavy rain",
    sections: [
      {
        heading: "Immediate visual check after the weather passes",
        intro:
          "Do not begin cleanup while severe weather is active or when the equipment area may be unsafe. Once conditions allow a safe inspection, document what changed before operating or opening anything.",
        points: [
          {
            title: "Debris and visibility",
            body: "Look for dirt, leaves, branches, roofing material, glass, metal, or other storm debris. Note whether the bottom can be seen and whether large material may be hiding below the surface before using cleaning equipment.",
          },
          {
            title: "Water level and runoff",
            body: "Heavy rain can raise the water level, while wind and drainage can introduce soil or runoff. Avoid assuming that dilution alone explains the chemistry, and do not overstate what routine pool care can determine about flood or runoff contamination.",
          },
          {
            title: "Circulation status",
            body: "Observe whether power is available, the pump starts normally, water movement appears typical, and visible plumbing is intact. A power outage or equipment interruption may mean the pool has gone without normal circulation for an unknown period.",
          },
          {
            title: "Equipment-area condition",
            body: "Look from a safe distance for standing water, damaged covers, displaced components, leaks, unusual noise, heat, or exposed wiring. Do not touch or operate damaged energized equipment; stop and obtain qualified help.",
          },
        ],
      },
      {
        heading: "Remove debris without creating another problem",
        intro:
          "Physical cleanup reduces the organic and filtration load, but the approach should match debris size, visibility, surface, and equipment condition.",
        points: [
          {
            title: "Skim floating material first",
            body: "Remove leaves and floating debris before it becomes saturated or moves into baskets. Work from a stable, safe position and keep sharp, heavy, or unknown objects out of ordinary pool-cleaning tools.",
          },
          {
            title: "Clear accessible baskets carefully",
            body: "Storm debris can fill skimmer and pump baskets quickly and restrict flow. Shut equipment down and follow manufacturer directions before opening accessible components; do not bypass pressure or electrical safety steps.",
          },
          {
            title: "Brush or vacuum only when appropriate",
            body: "Dust and fine dirt may settle across surfaces, but poor visibility, large debris, damaged equipment, or extremely heavy material can make ordinary vacuuming inappropriate. Use surface-compatible tools and stop if circulation weakens or the equipment behaves abnormally.",
          },
          {
            title: "Recognize a professional cleanup load",
            body: "Large branches, extensive dirt, sharp debris, very poor visibility, or a pool filled by runoff can exceed routine maintenance. A condition-based cleanup assessment is safer than promising that a normal visit will handle it.",
          },
        ],
      },
      {
        heading: "Test the water before adjusting it",
        intro:
          "Rainfall, dust, debris, refill water, and interrupted circulation can change more than one reading. Test first and avoid guessing chemical additions from appearance alone.",
        points: [
          {
            title: "Expect relationships, not one rain rule",
            body: "Heavy rain may dilute some readings, debris can increase chlorine demand, and dust or source water can affect pH, alkalinity, calcium, or other conditions. The direction and size of change depend on the actual pool and storm.",
          },
          {
            title: "Review sanitizer demand",
            body: "Leaves, soil, and organic material can consume chlorine. Confirm current readings, stabilizer context, water condition, and remaining debris before selecting a product or amount.",
          },
          {
            title: "Make one controlled change",
            body: "Follow the exact product label, account for pool volume and concentration, add only one chemical at a time, circulate as directed, and retest before another major adjustment. Never mix chemicals or combine chlorine and acid.",
          },
          {
            title: "Do not treat clear appearance as a safety result",
            body: "Water can look clear while chemistry is unsuitable, and cloudy water can involve filtration, debris, chemistry, or algae. Testing and condition assessment are necessary after significant weather.",
          },
        ],
      },
      {
        heading: "Filter and circulation checks after a storm",
        intro:
          "Storm debris and suspended dust can increase the work placed on the circulation and filtration system. Observe changes without relying on a universal pressure threshold.",
        points: [
          {
            title: "Compare flow with normal operation",
            body: "Look for weaker returns, reduced surface movement, air, prime loss, visible leaks, or a pump running without expected water movement. These symptoms can require equipment assessment rather than additional chemical treatment.",
          },
          {
            title: "Watch the filter load",
            body: "A cartridge, DE, or sand filter may collect storm material quickly. Use manufacturer instructions and the system's established clean baseline to decide whether cleaning is appropriate; do not use an invented pressure number or universal interval.",
          },
          {
            title: "Treat power interruption as part of the history",
            body: "After an outage, confirm that equipment is visibly safe before operation and note how long circulation may have been interrupted. Do not reset breakers repeatedly, open electrical equipment, or handle components exposed to water.",
          },
          {
            title: "Stop when equipment appears damaged",
            body: "Visible damage, standing water around electrical equipment, exposed wiring, unusual heat, burning odor, or abnormal sound requires qualified help. Shipwrecked does not provide emergency electrical instructions through this guide.",
          },
        ],
      },
      {
        heading: "When storm cleanup becomes corrective service",
        intro:
          "Some pools return to routine care after debris removal, testing, and filter attention. Others need a separately assessed cleanup, algae recovery, or equipment path.",
        points: [
          {
            title: "One-time cleaning",
            body: "Moderate storm debris, dust, and a manageable catch-up condition may fit a one-time cleaning assessment. The starting condition determines the scope, and one-visit correction is not guaranteed.",
          },
          {
            title: "Green or cloudy water recovery",
            body: "Persistent green water, algae, poor visibility, or strong chlorine demand may require staged Green-to-Clean work rather than ordinary storm cleanup.",
          },
          {
            title: "Filter cleaning or equipment assessment",
            body: "A heavily loaded filter may need condition-based cleaning. Failed circulation, visible leaks, prime loss, or suspected equipment damage belongs on a separate equipment-service path.",
          },
          {
            title: "Professional help for runoff or uncertain hazards",
            body: "Extensive runoff, flooding, unknown material, sharp debris, unsafe access, or potential electrical damage is beyond ordinary maintenance guidance. Seek appropriate professional help without assuming a standard pool service can certify contamination or safety.",
          },
        ],
      },
      {
        heading: "Prepare for the next weather event",
        intro:
          "Good preparation reduces guesswork without promising that storm effects can be prevented entirely.",
        points: [
          {
            title: "Keep a normal-condition record",
            body: "Know the pool's typical water level, visible flow, clean-filter baseline, recent test history, and equipment appearance. That reference makes post-storm changes easier to recognize.",
          },
          {
            title: "Keep safe cleaning tools accessible",
            body: "Maintain suitable skimming and debris-removal tools and know the manufacturer-approved shutdown steps for accessible baskets. Do not improvise electrical protection or equipment repair.",
          },
          {
            title: "Plan the escalation path",
            body: "Know when you would request one-time cleaning, algae recovery, filter cleaning, or equipment assessment. Availability is confirmed by address and schedule; this guide does not promise emergency or same-day response.",
          },
        ],
      },
    ],
    safetyTitle: "Storm cleanup limits",
    safetyBody:
      "This guide is general post-weather education. It does not provide emergency response, electrical repair, contamination certification, universal chemical dosing, or guaranteed storm recovery.",
    safetyPoints: [
      "Wait until weather and access conditions are safe before inspecting or cleaning the pool.",
      "Do not touch or operate visibly damaged or water-exposed energized equipment.",
      "Do not mix chemicals, guess doses, or assume every storm changes water in the same way.",
      "Escalate heavy debris, poor visibility, persistent green or cloudy water, failed circulation, runoff, flooding, or suspected damage.",
      "Service timing and route availability must be confirmed; no emergency or same-day response is promised.",
    ],
    serviceLinks: [
      { href: "/services/one-time-cleans", label: "One-Time Pool Cleaning" },
      { href: "/services/algae-removal", label: "Algae Removal & Green-to-Clean" },
      { href: "/services/filter-cleaning", label: "Pool Filter Cleaning" },
      { href: "/services/pool-equipment-repair", label: "Pool Equipment Repair" },
      { href: "/services/weekly-services", label: "Weekly Pool Service" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-chemistry-troubleshooting", label: "Pool Chemistry Troubleshooting" },
      { href: "/diy-pool-care/green-cloudy-pool-recovery", label: "Green & Cloudy Pool Recovery" },
      { href: "/diy-pool-care/pool-equipment-troubleshooting", label: "Pool Equipment Troubleshooting" },
      { href: "/blog/pool-care-after-freeze-power-outage", label: "Pool Care After a Freeze or Power Outage" },
      { href: "/blog/west-texas-heat-dust-pollen-pool-care", label: "Pool Care During West Texas Heat, Dust & Pollen" },
    ],
    cta: {
      title: "Need help after West Texas weather?",
      body: "Request a condition-based quote and share the service address, water visibility, debris load, circulation status, visible equipment concerns, and current photos. The appropriate service and availability are confirmed after review.",
      href: "/services/one-time-cleans",
      label: "Explore One-Time Pool Cleaning",
    },
  },
  {
    slug: "pool-equipment-troubleshooting",
    title: "Pool Equipment Troubleshooting Guide",
    description:
      "A homeowner-safe pool equipment troubleshooting guide for pump, filter, plumbing, valve, flow, leak, noise, and circulation symptoms before requesting service.",
    summary:
      "Pool equipment troubleshooting begins with safe observation, not disassembly. Use this guide to document pump, filter, plumbing, valve, and circulation symptoms, recognize the appropriate service category, and know when to stop. It does not replace electrical or mechanical diagnosis by a qualified professional.",
    publishedOn: "2026-10-16",
    primaryTopic: "Safe observation and service-path decisions for pool equipment symptoms",
    sections: [
      {
        heading: "Start with safe observation",
        intro:
          "Before touching a basket, lid, valve, or control, observe the system from a safe location. The goal is to describe what changed and whether circulation is occurring, not to prove a cause.",
        points: [
          {
            title: "Confirm visible circulation",
            body: "Look for expected surface movement and return flow without reaching into the water or equipment. Note weak returns, bubbles, poor skimming action, or a pump that sounds active without normal water movement.",
          },
          {
            title: "Record sound, leakage, and display conditions",
            body: "Listen for a new grinding, rattling, surging, or unusually loud sound. From a safe distance, photograph visible leaks and record exact error or display text rather than clearing it before the service provider can review it.",
          },
          {
            title: "Compare filter behavior with its own baseline",
            body: "A meaningful pressure change is relative to that system's established clean and normal condition. There is no universal pressure threshold that diagnoses every filter, gauge, plumbing layout, or flow problem.",
          },
          {
            title: "Capture accessible equipment details",
            body: "Photograph the equipment pad, the affected component, and a visible manufacturer or model label when it can be reached without opening a panel or moving unsafe equipment. A short video can document intermittent noise or changing flow.",
          },
        ],
      },
      {
        heading: "Pump concerns and circulation symptoms",
        intro:
          "Pump symptoms can overlap with water level, debris restriction, air entry, valve position, plumbing, filter condition, or an internal equipment problem. Safe observations help narrow the service path without turning the homeowner into the repair technician.",
        points: [
          {
            title: "Pump will not prime or loses prime",
            body: "Note the pool water level, whether accessible baskets are visibly loaded, whether the clear lid area appears to fill normally, and whether air or bubbles appear at the pump or returns. A visible lid seal concern, accessible valve position, or above-ground plumbing drip can be documented without dismantling the system.",
          },
          {
            title: "Pump runs with weak or no normal flow",
            body: "A running sound does not prove adequate circulation. Record weak suction, weak returns, bubbles, basket behavior, and the filter gauge condition. Stop the system through its normal control if the pump appears to be running dry, and do not repeatedly restart it to test the symptom.",
          },
          {
            title: "Pump makes noise, leaks, or cycles",
            body: "A new noise, visible pump leak, repeated starting and stopping, or unexpected shutdown belongs in the service description. These symptoms can have more than one cause and should not be used as instructions to open the motor or electrical compartment.",
          },
          {
            title: "Pump does not start",
            body: "Document the control or display condition and whether other pool equipment appears affected. Do not open electrical panels, test energized conductors, replace capacitors, alter wiring, reset a repeatedly tripping breaker, or bypass a safety device.",
          },
        ],
      },
      {
        heading: "Filter concerns: cleaning, repair, or replacement",
        intro:
          "Filter pressure, return flow, leakage, and material returning to the pool should be considered together. The right next step depends on the filter type, its normal baseline, service history, visible condition, and the rest of the circulation system.",
        points: [
          {
            title: "Pressure is higher or lower than normal",
            body: "Record the gauge reading only if it can be viewed safely and compare it with the equipment's known clean baseline. A change can reflect filter loading, restricted flow, a gauge issue, valve position, air entry, or another circulation condition; one fixed PSI rule does not fit every system.",
          },
          {
            title: "Flow is weak or debris returns to the pool",
            body: "Note whether the symptom began after cleaning, maintenance, a storm, or a heavy debris event. Returning debris may warrant inspection of filter components or configuration, while weak flow can involve the pump, baskets, valves, plumbing, or filter.",
          },
          {
            title: "Cartridge, DE, and sand-filter context",
            body: "Identify the filter type and share the last known cleaning or media-service history. Cartridge condition, DE-system concerns, and sand-filter performance require type-appropriate assessment; this guide does not prescribe media quantities, replacement rules, or opening a pressurized tank.",
          },
          {
            title: "Visible leakage or damaged components",
            body: "Photograph drips, spray, cracks, clamp concerns, or water collecting around the filter from a safe distance. Shut the system down through its normal control when continued operation appears unsafe, and do not loosen clamps or fittings while equipment is running or pressurized.",
          },
        ],
      },
      {
        heading: "Plumbing, valves, suction, and return flow",
        intro:
          "Homeowner observation should remain at the visible equipment pad and accessible controls. It cannot establish the condition of concealed piping or certify why a line has lost flow.",
        points: [
          {
            title: "Visible pad plumbing and valve position",
            body: "Look for an obvious drip, spray, cracked fitting, or valve that is visibly out of its normal position. Compare against a photo or known normal setup when available; do not force a stuck valve or alter an unfamiliar configuration to chase more flow.",
          },
          {
            title: "Weak suction or poor skimmer pull",
            body: "Check the water level and visible, safely accessible debris points. Record whether one skimmer behaves differently from another and whether the symptom changes with normal system operation, but do not use suction testing methods that could create an entrapment hazard.",
          },
          {
            title: "Bubbles or weak returns",
            body: "Bubbles can accompany air entering the circulation path, low water, prime loss, or other flow conditions. Note where and when they appear and whether the pump basket looks unusually aerated without attempting concealed-line diagnosis.",
          },
          {
            title: "What this observation cannot establish",
            body: "Visible symptoms do not confirm the condition of buried lines, structural piping, or inaccessible components. A pool-service assessment also should not be represented as electrical diagnosis or as certification by another licensed trade.",
          },
        ],
      },
      {
        heading: "Prepare a useful equipment inspection request",
        intro:
          "Clear information helps distinguish a pump, filter, plumbing, cleaning, or broader equipment request before a visit is scheduled.",
        points: [
          {
            title: "Identify the equipment",
            body: "Share the equipment type, manufacturer and model where visible, approximate age if known, and wide and close photos. Do not remove a cover or reach behind energized equipment to find a label.",
          },
          {
            title: "Describe the symptom and timing",
            body: "Explain what the equipment is doing, when it began, whether it is constant or intermittent, and whether circulation currently works. Include visible leakage, exact display text, and safe photos or video.",
          },
          {
            title: "List recent changes",
            body: "Mention recent filter cleaning, basket service, valve changes, weather, loss of power, equipment replacement, or other maintenance. Sequence is more useful than guessing which part failed.",
          },
          {
            title: "State the current operating condition",
            body: "Tell the service provider whether the system is off, running normally, running with reduced flow, or unable to maintain circulation. Availability, diagnosis, parts compatibility, and repair scope are confirmed after review.",
          },
        ],
      },
      {
        heading: "When to stop and request service",
        intro:
          "Stop the observation process when access or continued operation is unsafe. The safest next step may be leaving the equipment off through its normal control and arranging qualified assessment.",
        points: [
          {
            title: "Electrical or heat warning signs",
            body: "Exposed or damaged electrical components, smoke, a burning smell, overheating, or repeated breaker trips require immediate distance from the equipment. Do not touch wet electrical equipment or repeatedly reset a breaker.",
          },
          {
            title: "Severe water loss or equipment damage",
            body: "Severe leakage, cracked equipment, forceful spray, or a component that appears unstable is beyond routine homeowner observation. Shut down only through a familiar normal control when it is safe to do so.",
          },
          {
            title: "Dry running or failed circulation",
            body: "Do not allow a pump to continue running without expected water movement. A system that cannot prime or maintain circulation needs assessment before repeated operation causes more damage.",
          },
          {
            title: "Unfamiliar access or disassembly",
            body: "Stop before opening panels, motors, pressurized vessels, or unfamiliar equipment. If safe access, shutdown, or component condition is uncertain, leave the area undisturbed and request service.",
          },
        ],
      },
    ],
    safetyTitle: "Equipment troubleshooting boundaries",
    safetyBody:
      "This guide supports symptom documentation and service-path decisions. It does not provide electrical testing, motor repair, wiring, capacitor work, pressurized disassembly, concealed-line diagnosis, or a guaranteed diagnosis from visible symptoms.",
    safetyPoints: [
      "Never open energized equipment, electrical panels, motors, or controls.",
      "Never loosen a filter clamp, lid, valve, or fitting while the system is running or pressurized.",
      "Do not bypass safety devices, force unfamiliar valves, or repeatedly operate a pump without normal water movement.",
      "Use the system's familiar normal control only when shutdown can be performed safely.",
      "Smoke, burning odor, exposed electrical damage, severe leakage, or unsafe access requires immediate professional escalation.",
    ],
    serviceLinks: [
      { href: "/services/pool-equipment-repair", label: "Pool Equipment Repair" },
      { href: "/services/pump-repair-and-installation", label: "Pump Repair & Installation" },
      { href: "/services/filter-repair-replacement", label: "Filter Repair & Replacement" },
      { href: "/services/filter-cleaning", label: "Filter Cleaning" },
      { href: "/services/pool-plumbing-repair", label: "Pool Plumbing & Valve Repair" },
      { href: "/services/weekly-services", label: "Weekly Pool Service" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-cleaner-robot-troubleshooting", label: "Pool Cleaner & Robot Troubleshooting" },
      { href: "/diy-pool-care/weekly-pool-care-guide", label: "Weekly Pool Care & Maintenance" },
      { href: "/diy-pool-care/west-texas-storm-pool-care", label: "West Texas Storm Pool Care" },
    ],
    cta: {
      title: "Need a professional equipment assessment?",
      body: "Share the equipment type, visible model information, symptom timing, circulation status, exact display text, leakage, and safe photos or video. Shipwrecked Pools will review the request and confirm the appropriate service path and availability.",
      href: "/services/pool-equipment-repair",
      label: "Explore Equipment Repair",
    },
  },
  {
    slug: "pool-cleaner-robot-troubleshooting",
    title: "Pool Cleaner & Robot Troubleshooting Guide",
    description:
      "Troubleshoot robotic, suction-side, and pressure-side pool cleaner symptoms with safe observations for movement, pickup, climbing, cables, hoses, and flow.",
    summary:
      "A pool cleaner can stop, miss debris, tangle, or lose climbing performance for very different reasons depending on whether it is robotic, suction-side, or pressure-side. Identify the cleaner type first, use only external and manufacturer-approved observations, and connect persistent cleaner trouble with the pool's broader circulation condition.",
    publishedOn: "2026-10-16",
    primaryTopic: "Safe symptom-led troubleshooting for robotic, suction-side, and pressure-side pool cleaners",
    sections: [
      {
        heading: "Identify the cleaner type first",
        intro:
          "The energy source determines the troubleshooting path. A check that makes sense for one cleaner type may be irrelevant or unsafe for another.",
        points: [
          {
            title: "Robotic cleaner",
            body: "A robotic cleaner normally uses an external low-voltage power supply and an attached cable rather than the pool's suction or return plumbing for movement. Start with the model instructions, visible power indication, cable, filter basket, tracks, wheels, and brushes.",
          },
          {
            title: "Suction-side cleaner",
            body: "A suction-side cleaner depends on flow drawn through a skimmer or dedicated suction connection. Cleaner movement may change with water level, baskets, filter loading, hose condition, valve configuration, and overall pump circulation.",
          },
          {
            title: "Pressure-side cleaner",
            body: "A pressure-side cleaner uses return-side water pressure and may use a dedicated booster setup. Hose condition, debris bag, wheels, drive behavior, and backup-valve operation can all affect performance.",
          },
          {
            title: "Document the exact model",
            body: "Photograph the cleaner, label, power supply or connection, and hose or cable layout. Model-specific instructions and compatible parts matter more than assumptions based only on appearance.",
          },
        ],
      },
      {
        heading: "Cleaner will not move",
        intro:
          "Separate a cleaner-only symptom from a broader circulation or power symptom before assuming an internal failure.",
        points: [
          {
            title: "Check visible connection and indication",
            body: "With hands dry and from a safe location, observe whether the manufacturer-approved connection is secure and whether an external power supply or control shows a normal indication. Do not open the supply, cable end, motor, or any electrical housing.",
          },
          {
            title: "Look for an external obstruction",
            body: "After following the manufacturer's removal and shutdown instructions, inspect accessible wheels, tracks, brushes, intake areas, baskets, or bags for visible debris. Do not force a jammed drive component or disassemble internal parts.",
          },
          {
            title: "Consider circulation dependency",
            body: "For suction-side and pressure-side cleaners, note whether pool returns, skimmers, and pump flow also seem weak. A cleaner that stopped when overall circulation changed may need equipment assessment rather than cleaner-only parts.",
          },
        ],
      },
      {
        heading: "Cleaner starts and stops",
        intro:
          "Intermittent operation is easier to describe when the owner records when the cycle stops and what else changes at the same time.",
        points: [
          {
            title: "Empty the approved debris container",
            body: "An overloaded basket, bag, or filter can reduce pickup and movement. Remove, empty, and rinse it only as the cleaner manufacturer directs, then reinstall it fully before the next normal cycle.",
          },
          {
            title: "Observe cable, hose, and moving parts",
            body: "Look for a visible kink, connection issue, hose restriction, tangled cable, or debris around an accessible wheel or track. Repeated stopping after these external checks warrants model-specific assessment.",
          },
          {
            title: "Record system-level changes",
            body: "For circulation-dependent cleaners, note pump schedule, flow changes, filter condition, and whether other equipment starts or stops simultaneously. For robots, record visible power-supply indications without attempting internal testing.",
          },
        ],
      },
      {
        heading: "Cleaner will not climb walls or steps",
        intro:
          "Climbing depends on cleaner design, pool geometry, surface condition, traction, cleanliness, and available suction or pressure. Not every cleaner is designed to climb every wall, step, bench, or waterline.",
        points: [
          {
            title: "Confirm the design expectation",
            body: "Review the model's manufacturer instructions to confirm whether wall, step, or waterline cleaning is an intended capability. A floor-focused cleaner is not defective simply because it does not climb.",
          },
          {
            title: "Inspect traction and cleanliness",
            body: "Visible wear on tracks, wheels, or brushes and an overloaded filter or bag can change climbing behavior. Slick buildup, algae residue, or a particular finish may also affect traction without proving a cleaner fault.",
          },
          {
            title: "Consider flow and pool geometry",
            body: "Suction or pressure that differs from normal can affect circulation-driven cleaners. Tight transitions, ledges, step shapes, drains, and wall angles can create repeatable limitations even when the cleaner otherwise operates.",
          },
        ],
      },
      {
        heading: "Cleaner moves but does not pick up debris",
        intro:
          "Movement and cleaning performance are separate. Describe the debris type and where it remains before changing settings or replacing parts.",
        points: [
          {
            title: "Match the observation to the debris",
            body: "Leaves, fine dust, and algae residue place different demands on a cleaner. Record whether material is missed entirely, lifted and released, or collected only in certain parts of the pool.",
          },
          {
            title: "Check accessible baskets, bags, and filters",
            body: "A full or poorly seated debris container can reduce pickup. Clean it according to the model instructions and inspect for visible damage without substituting an incompatible screen, bag, or filter.",
          },
          {
            title: "Observe speed and contact",
            body: "A circulation-driven cleaner moving unusually fast or slowly may not maintain effective contact. Worn brushes or visible intake obstruction can also reduce pickup, while a debris load beyond the cleaner's design may require manual or professional cleaning.",
          },
        ],
      },
      {
        heading: "Cord, cable, and hose problems",
        intro:
          "Tangling often reflects layout, storage, excess deployed length, hose condition, or a recurring pool obstacle. Correct only what the manufacturer treats as normal user maintenance.",
        points: [
          {
            title: "Use only the needed layout",
            body: "Deploy cable or hose according to the model instructions and avoid unnecessary excess in the water. Keep the power supply or connection in its specified location and never shorten, splice, or modify a cable or hose as a workaround.",
          },
          {
            title: "Inspect sections and connections",
            body: "Look for visible twisting, collapse, damaged swivels, loose hose sections, cuts, or connection wear after safely removing the cleaner. Model compatibility must be confirmed before replacing a section or fitting.",
          },
          {
            title: "Map recurring stuck locations",
            body: "Note whether the cleaner catches at steps, drains, ladders, corners, or a specific transition. Photos or short video help distinguish a layout limitation from wheel, track, hose, cable, suction, or pressure concerns.",
          },
          {
            title: "Store as directed",
            body: "Allow cable or hose to relax and store it according to manufacturer directions, away from avoidable heat or sharp bends. Do not hang, coil, or weight components in a way the manufacturer warns against.",
          },
        ],
      },
      {
        heading: "Pressure-side and Polaris-type concerns",
        intro:
          "Polaris-type is used here only to describe a familiar pressure-side cleaner layout, not a manufacturer relationship. Exact configuration and parts vary by model.",
        points: [
          {
            title: "Low movement or wheel rotation",
            body: "Note whether pool circulation appears normal, whether a dedicated booster setup operates as expected, and whether the cleaner bag or visible intake is loaded. Do not make unverified pressure changes or alter internal jets.",
          },
          {
            title: "Backup valve behavior",
            body: "Record whether the backup valve never appears to activate or sprays continuously rather than cycling normally. Share video and the exact cleaner model so a professional can evaluate model-specific valve or flow concerns.",
          },
          {
            title: "Tail, hose, and stuck-location symptoms",
            body: "A tail that does not move, hose tangling, one wheel not turning, or repeated sticking should be documented together. Visible wear or obstruction may be relevant, but replacement parts should not be assumed compatible across models.",
          },
        ],
      },
      {
        heading: "Suction-side cleaner concerns",
        intro:
          "Suction-side performance is tied closely to the pool's water level and circulation path, so a cleaner symptom can be an early sign of a broader flow change.",
        points: [
          {
            title: "Weak suction or no movement",
            body: "Observe pool water level, accessible baskets, filter condition, hose connection, and whether the skimmer pulls normally. Do not reach into an active suction fitting or use an unsafe method to measure suction.",
          },
          {
            title: "Hose collapse or air symptoms",
            body: "A collapsing hose, bubbles at returns, or an unusually aerated pump basket can accompany flow restriction or air entry. Document the timing and visible hose condition without claiming a concealed plumbing cause.",
          },
          {
            title: "Sticking or poor coverage",
            body: "Note recurring stuck areas, hose length and section condition, wall-climbing behavior, and accessible valve positions relative to the known normal setup. Avoid forcing valves or creating excessive suction in pursuit of more movement.",
          },
        ],
      },
      {
        heading: "Robotic cleaner concerns",
        intro:
          "Robotic cleaners combine an external power supply with internal drive and filtration components. Homeowner checks should remain external and model-directed.",
        points: [
          {
            title: "Power indication without internal testing",
            body: "Record whether the supply shows power, an error, or no indication and whether the cable connection appears visibly damaged. Keep hands and connections dry as instructed, and never open the supply or test internal electrical components.",
          },
          {
            title: "Tracks, wheels, brushes, and basket",
            body: "After safe removal and shutdown, inspect for accessible debris, obvious wear, a full filter basket, or a displaced external component. Do not force the drive system or open a sealed motor area.",
          },
          {
            title: "Missed areas and waterline behavior",
            body: "Map missed areas, cycle behavior, cable layout, wall climbing, and whether the robot reaches the waterline when designed to do so. Pool geometry and surface conditions can influence coverage.",
          },
          {
            title: "Preserve error details",
            body: "Photograph or transcribe the exact error code and consult the model instructions. Clearing a recurring error without documenting it can remove useful context for professional assessment.",
          },
        ],
      },
      {
        heading: "Cleaner maintenance checklist",
        intro:
          "Routine external care can preserve performance and make changes easier to spot, but the manufacturer's model-specific instructions control.",
        ordered: true,
        points: [
          {
            title: "Remove the cleaner safely",
            body: "Follow the manufacturer's shutdown and lifting method. Do not pull a robotic unit from the water by its floating cable or handle a powered connection with wet hands.",
          },
          {
            title: "Empty and rinse approved debris containers",
            body: "Clean baskets, bags, and filters at the intervals and with the methods specified for the model. Reinstall them fully before normal operation.",
          },
          {
            title: "Inspect external wear points",
            body: "Look over brushes, tracks, wheels, hoses, cable, swivels, connections, and visible intake areas for debris or wear. Record the model before ordering any replacement component.",
          },
          {
            title: "Straighten and store correctly",
            body: "Lay out or store the cable and hose as directed to reduce persistent twist and sharp bends. Keep supplies and cleaner components in their manufacturer-approved storage conditions.",
          },
          {
            title: "Record performance changes",
            body: "Note cycle duration, missed areas, climbing, pickup, noise, interruptions, and circulation changes. A simple record helps separate gradual wear from a sudden system problem.",
          },
        ],
      },
      {
        heading: "When to request help",
        intro:
          "Professional assessment is appropriate when safe external maintenance is complete and the cleaner still fails, or when the symptom points to pool equipment rather than the cleaner alone.",
        points: [
          {
            title: "Visible power or cable damage",
            body: "Stop using a cleaner with a damaged supply, plug, connection, or cable. Keep it disconnected according to manufacturer directions and do not tape, splice, open, or internally repair electrical components.",
          },
          {
            title: "Repeated stops or internal damage",
            body: "A unit that repeatedly stops, shows recurring errors, makes a new internal noise, or has visibly damaged internal parts needs model-specific evaluation rather than repeated cycling.",
          },
          {
            title: "Compatibility is uncertain",
            body: "Confirm the complete model and part reference before replacing wheels, tracks, bags, hoses, valves, cables, or other components. Similar appearance does not guarantee fit or safe operation.",
          },
          {
            title: "Cleaner and equipment symptoms overlap",
            body: "Persistent suction or pressure problems, weak returns, prime loss, filter concerns, or broader circulation changes should be routed to pool equipment assessment even when the cleaner first revealed the issue.",
          },
        ],
      },
    ],
    safetyTitle: "Cleaner troubleshooting boundaries",
    safetyBody:
      "This guide covers external observation and normal user maintenance only. It does not provide internal electrical or motor repair, cable modification, unsafe suction or pressure changes, or a guarantee that every cleaner can cover every pool feature.",
    safetyPoints: [
      "Follow the exact model instructions for shutdown, removal, cleaning, and storage.",
      "Do not open a power supply, motor, sealed housing, or energized component.",
      "Do not splice cables or hoses, force drive parts, or improvise incompatible replacement components.",
      "Do not increase suction or pressure beyond verified model and system directions.",
      "Stop using equipment with visible electrical damage or repeated unexplained interruptions.",
    ],
    serviceLinks: [
      { href: "/services/pool-equipment-repair", label: "Pool Equipment Repair" },
      { href: "/services/pump-repair-and-installation", label: "Pump Repair & Installation" },
      { href: "/services/filter-cleaning", label: "Filter Cleaning" },
      { href: "/services/pool-plumbing-repair", label: "Pool Plumbing & Valve Repair" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-equipment-troubleshooting", label: "Pool Equipment Troubleshooting" },
      { href: "/blog/which-pool-cleaner-is-right", label: "Which Pool Cleaner Is Right?" },
      { href: "/diy-pool-care/weekly-pool-care-guide", label: "Weekly Pool Care & Maintenance" },
    ],
    cta: {
      title: "Is the cleaner symptom connected to pool equipment?",
      body: "Share the cleaner type and model, the symptom, visible errors or damage, circulation behavior, maintenance already completed, and safe photos or video. Shipwrecked Pools can review whether the next step fits an equipment-service request.",
      href: "/services/pool-equipment-repair",
      label: "Explore Equipment Repair",
    },
  },
  {
    slug: "pool-surface-remodeling-guide",
    title: "Pool Surface & Remodeling Problem Guide",
    description:
      "Compare visible pool finish, tile, coping, scale, liner, and deck concerns to cleaning, repair, resurfacing, replastering, or remodeling project categories.",
    summary:
      "Visible wear does not always point to the same project. This guide separates interior finish, tile and coping, scale, liner, deck-surface, and coordinated remodeling concerns so pool owners can prepare a useful quote request without treating photographs as structural diagnosis.",
    publishedOn: "2026-10-16",
    primaryTopic: "Visible pool surface conditions and the professional project categories they may fit",
    sections: [
      {
        heading: "Interior pool finish: cleaning, treatment, or renewal",
        intro:
          "Roughness, staining, discoloration, worn plaster, and exposed finish can look related while calling for different professional assessments. Begin with location, extent, texture, progression, and known finish history.",
        points: [
          {
            title: "Rough or worn interior surface",
            body: "Document whether roughness is isolated or widespread, whether material appears loose, and whether swimmers encounter sharp areas. A worn or deteriorated finish may support a resurfacing or replastering conversation, but photographs alone cannot establish the complete condition.",
          },
          {
            title: "Staining and discoloration",
            body: "Note color, location, pattern, and whether the appearance changed after chemistry, weather, metal exposure, or prior treatment. Similar-looking stains can have different causes, so no cleaning method or outcome should be promised before assessment.",
          },
          {
            title: "Exposed aggregate or finish concerns",
            body: "Share close and wide photos that show both texture and scale. Natural finish variation, wear, chemical effects, and deterioration can be difficult to distinguish remotely, especially when the existing surface type is uncertain.",
          },
          {
            title: "Resurfacing and replastering versus acid washing",
            body: "Pool resurfacing or replastering replaces or renews the interior finish. An acid wash is a condition-based treatment or cleaning process for certain suitable plaster conditions; it does not install a new finish and cannot be assumed to correct deterioration.",
          },
        ],
      },
      {
        heading: "Tile and coping: repair, replacement, or remodel scope",
        intro:
          "Tile and coping form distinct parts of the pool edge. Their condition may support a focused repair or become one part of a coordinated renovation.",
        points: [
          {
            title: "Loose, missing, or cracked tile",
            body: "Photograph the affected tile and the surrounding run. Note whether pieces are loose, missing, sharp, or continuing to separate; avoid using the area when loose material creates a cut or trip hazard.",
          },
          {
            title: "Deteriorated or cracked coping",
            body: "Show the top, pool-facing edge, joints, and nearby deck in wide and close photos. Coping repair scope depends on material, extent, attachment, adjoining surfaces, and whether matching replacement material is available.",
          },
          {
            title: "Standalone work versus coordinated remodeling",
            body: "A limited tile or coping condition may fit a focused quote. Widespread tile loss, coping deterioration, finish wear, and deck work may be better reviewed together so transitions and project sequence can be considered.",
          },
          {
            title: "Tile repair is different from tile cleaning",
            body: "Repair or replacement addresses damaged, missing, or loose material. Professional tile cleaning targets deposits on otherwise serviceable surfaces; cleaning cannot reattach tile or restore failed material.",
          },
        ],
      },
      {
        heading: "Tile scale and calcium buildup",
        intro:
          "White scale at the waterline may be a deposit concern, but surface material, deposit severity, chemistry history, and underlying tile condition affect the available cleaning approach.",
        points: [
          {
            title: "Document the deposit pattern",
            body: "Provide close photos of the white or crusted buildup and wide photos showing how far it extends. Note whether it is concentrated at the waterline, on spillways, or across multiple materials.",
          },
          {
            title: "Professional cleaning methods vary",
            body: "Professional tile cleaning, including bead blasting as one possible method, requires surface-appropriate assessment. No method is suitable for every tile, finish, grout, or deposit, and complete removal cannot be guaranteed.",
          },
          {
            title: "Cleaning cannot correct damaged tile",
            body: "Cracked, loose, missing, or deteriorated tile belongs on a repair path even when deposits are also present. A quote may need to separate cleaning from material replacement.",
          },
        ],
      },
      {
        heading: "Pool liner concerns",
        intro:
          "Visible tears, wrinkles, displacement, fading, and deterioration help frame a liner request, but repairability depends on location, material condition, extent, and the pool's specific construction.",
        points: [
          {
            title: "Tears and visible damage",
            body: "Photograph the damage with a wider view for location and a close view for scale. Include approximate dimensions without pulling, stretching, or enlarging the affected area.",
          },
          {
            title: "Wrinkles or displacement",
            body: "Show where the liner has shifted, wrinkled, or pulled away and when the change appeared. Avoid draining or attempting to reposition the liner without a condition-specific professional plan.",
          },
          {
            title: "Deterioration and repair-versus-replacement decisions",
            body: "Fading, brittleness, multiple damaged areas, seam concerns, and prior repairs may affect whether a limited repair is practical. This guide does not guarantee that a visible liner concern can be patched or that replacement is required.",
          },
        ],
      },
      {
        heading: "Pool deck surface concerns",
        intro:
          "Pool deck resurfacing concerns the surrounding walking surface. Pool resurfacing concerns the interior pool finish. Keeping those scopes distinct makes quote requests clearer.",
        points: [
          {
            title: "Worn or cosmetically deteriorated deck surface",
            body: "Document peeling, fading, worn texture, isolated surface damage, and the overall deck area. A professional can review whether the visible condition fits surface preparation, repair, resurfacing, or a broader project.",
          },
          {
            title: "Standalone deck project",
            body: "When the pool interior, tile, and coping remain outside the requested scope, state that the goal is focused deck-surface work. Include approximate dimensions, access, furniture or enclosure constraints, and desired appearance.",
          },
          {
            title: "Coordinated renovation",
            body: "Deck work may be planned with coping, tile, or interior finish renewal when several visible conditions overlap. Coordination can clarify transitions and sequencing without assuming every category must be included.",
          },
          {
            title: "Assessment limits",
            body: "Surface review is not engineering, foundation evaluation, or structural concrete certification. A coating or resurfacing discussion also does not establish a slip-resistance guarantee, warranty, or correction of underlying movement.",
          },
        ],
      },
      {
        heading: "When several issues belong in one remodel",
        intro:
          "A coordinated pool remodeling or renovation request can be more useful when visible conditions cross several project categories or when the owner wants a planned visual update.",
        points: [
          {
            title: "Multiple adjoining surfaces",
            body: "Interior finish renewal, tile and coping work, and deck-surface work affect adjoining transitions. Share the complete desired scope so the project can be reviewed as a sequence rather than as unrelated spot repairs.",
          },
          {
            title: "Liner work within a broader goal",
            body: "For a liner pool, document the liner condition separately from deck or coping goals. Construction type and actual condition determine whether categories can or should be coordinated.",
          },
          {
            title: "Relevant equipment improvements",
            body: "If visible equipment concerns are part of the project goal, list them separately with model information and symptoms. Equipment assessment remains distinct from diagnosing surface wear or structural movement.",
          },
          {
            title: "Define the desired outcome",
            body: "Explain whether the priority is correcting damaged material, renewing appearance, coordinating several surfaces, or understanding viable options. A clear goal supports a more useful professional conversation without preselecting an unsuitable method.",
          },
        ],
      },
      {
        heading: "Photos and quote preparation",
        intro:
          "A complete visual set and concise history help determine which service page and assessment path fit the request.",
        ordered: true,
        points: [
          {
            title: "Take wide context photos",
            body: "Photograph the whole pool and the complete deck or affected side so the condition's location and extent are understandable.",
          },
          {
            title: "Add close condition photos",
            body: "Include sharp close views of roughness, stains, cracks, deposits, loose tile, liner damage, worn deck coating, or other visible concerns. Use an ordinary reference for scale when safe.",
          },
          {
            title: "Provide dimensions and material context",
            body: "Share approximate pool or affected-area dimensions and the known finish, tile, coping, liner, or deck material when available. State when the material type is unknown rather than guessing.",
          },
          {
            title: "Summarize history and goals",
            body: "Include when the issue was noticed, whether it is changing, prior repairs or remodeling if known, the desired outcome, and access considerations. Mention sharp or loose areas that affect safe inspection.",
          },
        ],
      },
      {
        heading: "When professional assessment is important",
        intro:
          "Some visible conditions require on-site review or referral beyond ordinary cosmetic project planning. Avoid assigning a structural cause from photographs or surface appearance alone.",
        points: [
          {
            title: "Worsening cracks or suspected movement",
            body: "Document the location and progression without labeling the cause. Suspected movement or a condition outside surface-service scope may require evaluation by an appropriately qualified professional.",
          },
          {
            title: "Loose, sharp, or unsafe material",
            body: "Restrict access around loose coping, broken tile, sharp interior areas, unstable material, or deteriorated walking surfaces until the hazard and appropriate next step can be assessed.",
          },
          {
            title: "Widespread deterioration or uncertain materials",
            body: "Broad wear, multiple surface types, unknown prior coatings, or uncertain pool construction make remote method selection unreliable. An assessment can separate cleaning, limited repair, replacement, or coordinated renovation categories.",
          },
          {
            title: "Several project categories overlap",
            body: "When finish, tile, coping, liner, deck, and equipment concerns appear together, submit a complete photo set and goals. The provider can identify which categories fit its scope and what additional evaluation may be needed.",
          },
        ],
      },
    ],
    safetyTitle: "Surface and remodeling assessment limits",
    safetyBody:
      "This guide organizes visible conditions and project categories. It does not diagnose structural failure, certify concrete or foundations, guarantee stain removal or liner repairability, select a universally suitable treatment, or promise a project outcome from photographs.",
    safetyPoints: [
      "Keep swimmers and foot traffic away from sharp, loose, unstable, or visibly unsafe material.",
      "Do not drain a pool, reposition a liner, remove coping, or disturb finish material without a condition-specific professional plan.",
      "Cleaning, repair, resurfacing, replastering, and replacement are distinct scopes that require surface-appropriate assessment.",
      "Photographs support quote preparation but cannot establish hidden conditions or structural causes.",
      "Project scope, materials, availability, and any applicable written terms are confirmed only after professional review.",
    ],
    serviceLinks: [
      { href: "/services/pool-remodeling", label: "Pool Remodeling & Renovation" },
      { href: "/services/pool-resurfacing-replastering", label: "Pool Resurfacing & Replastering" },
      { href: "/services/pool-tile-coping-repair", label: "Pool Tile & Coping Repair" },
      { href: "/services/pool-tile-cleaning", label: "Pool Tile Cleaning & Bead Blasting" },
      { href: "/services/pool-liner-repair", label: "Pool Liner Repair" },
      { href: "/services/pool-deck-resurfacing-repair", label: "Pool Deck Resurfacing & Repair" },
      { href: "/services/acid-wash", label: "Pool Acid Wash" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-chemistry-troubleshooting", label: "Pool Chemistry Troubleshooting" },
      { href: "/diy-pool-care/pool-equipment-troubleshooting", label: "Pool Equipment Troubleshooting" },
    ],
    cta: {
      title: "Need help matching the condition to a project?",
      body: "Send wide and close photos, approximate dimensions, known materials, issue history, desired outcome, and access notes. Shipwrecked Pools can review the visible condition and confirm which available service category is appropriate for a quote.",
      href: "/services/pool-remodeling",
      label: "Explore Pool Remodeling",
    },
  },
  {
    slug: "hot-tub-spa-water-care",
    title: "Hot Tub & Spa Water Care Guide",
    description:
      "A practical hot tub and spa water-care guide covering routine cleaning, testing, sanitizer systems, filter care, heavy use, water symptoms, and service records.",
    summary:
      "Hot tub water can change quickly because a compact volume is exposed to heat, aeration, frequent contact, and concentrated product additions. This guide organizes routine observation, cleaning, testing, filter care, and escalation without acting as an individualized treatment plan or sanitation guarantee.",
    publishedOn: "2026-10-16",
    primaryTopic: "Condition-based hot tub and spa water care, documentation, and escalation",
    sections: [
      {
        heading: "Why hot tub water changes quickly",
        intro:
          "A hot tub is not simply a smaller swimming pool. Its lower water volume means use, debris, body oils, heat, aeration, and chemical additions can have a proportionally larger effect.",
        points: [
          {
            title: "Smaller volume responds faster",
            body: "A modest change in use or product addition can influence a spa more noticeably than a much larger pool. Test before adjusting, use the actual water volume and product directions, and avoid assuming a pool routine transfers directly to a hot tub.",
          },
          {
            title: "Heat and aeration affect demand",
            body: "Warm, actively aerated water can change sanitizer demand and water behavior. Note temperature, use, aeration, clarity, odor, and recent additions as context rather than treating one reading in isolation.",
          },
          {
            title: "Frequent use adds contaminants",
            body: "Each use can introduce body oils, cosmetics, debris, and other material that increases cleaning and sanitizer demand. High-use tubs may need observation more often than lightly used tubs, but no fixed calendar prevents every condition.",
          },
          {
            title: "Trends are more useful than guesses",
            body: "Record readings, clarity, odor, foam, filter condition, use level, and products added. A simple history makes recurring demand or circulation changes easier to recognize.",
          },
        ],
      },
      {
        heading: "Routine hot tub and spa cleaning",
        intro:
          "Routine cleaning removes visible material and gives the owner an opportunity to notice changes before they become persistent. Follow the spa and accessory manufacturers' directions for safe access and suitable cleaning methods.",
        points: [
          {
            title: "Remove debris and clean reachable surfaces",
            body: "Skim or remove visible debris, brush suitable reachable surfaces, and vacuum settled material with spa-appropriate tools. Avoid aggressive tools or products that could damage the shell, finish, fittings, or waterline.",
          },
          {
            title: "Clean the waterline carefully",
            body: "Body oils and residue often collect near the waterline. Use only a method approved for the spa surface and keep unapproved household cleaners out of the water-care system.",
          },
          {
            title: "Observe the cover area",
            body: "Look for debris, standing water, visible deterioration, or unsafe handling conditions around the accessible cover area. This guide does not assume that every service includes cover cleaning or cover repair.",
          },
          {
            title: "Watch circulation during normal operation",
            body: "Note whether expected water movement is present, whether an accessible intake or filter area is visibly loaded, and whether the system shows an error. Stop before unfamiliar disassembly or access to energized components.",
          },
        ],
      },
      {
        heading: "Water testing and controlled adjustment",
        intro:
          "Testing frequency depends on actual use, water condition, system design, product directions, and recent changes. A high-use spa may need closer observation than a lightly used one.",
        ordered: true,
        points: [
          {
            title: "Observe before testing",
            body: "Record clarity, odor, foam, visible residue, recent use, water additions, and circulation behavior. Appearance alone cannot establish sanitizer condition or water balance.",
          },
          {
            title: "Test the relevant water conditions",
            body: "Use a suitable test method for the sanitizer system and observe sanitizer, pH, alkalinity, and other manufacturer-directed conditions. Record the result instead of relying on memory.",
          },
          {
            title: "Make one controlled change",
            body: "Confirm the actual product, concentration, spa volume, current reading, and label directions. Add only as directed, maintain appropriate circulation, and avoid stacking several unverified changes together.",
          },
          {
            title: "Retest and document",
            body: "Follow the product and equipment instructions for circulation and retesting. Record what was added and whether clarity, odor, foam, or readings changed; this guide does not supply a universal dose or target table.",
          },
        ],
      },
      {
        heading: "Bromine and chlorine are different sanitizer approaches",
        intro:
          "Both bromine- and chlorine-based systems can be used for spa sanitation, but their products, testing, maintenance, and operating instructions are not interchangeable.",
        points: [
          {
            title: "Follow the chosen system deliberately",
            body: "Know which sanitizer approach the spa currently uses and follow its equipment and product instructions. Do not choose products only by package appearance or assume one approach is universally superior.",
          },
          {
            title: "Do not change systems accidentally",
            body: "A change in sanitizer approach should be planned with accurate product identification and system-specific guidance. Adding a different product without understanding compatibility can create unsafe handling and unstable water care.",
          },
          {
            title: "Never mix products together",
            body: "Keep products in their original labeled containers and use separate clean tools as directed. Never mix pool or spa chemicals together, and never combine chlorine and acid.",
          },
        ],
      },
      {
        heading: "Bromine floaters and dispensers",
        intro:
          "A floating or in-line dispenser controls product exposure only when it is loaded, adjusted, and used according to the exact dispenser and sanitizer directions.",
        points: [
          {
            title: "Use the correct approved product",
            body: "Confirm the dispenser and sanitizer product are intended to work together. Do not combine different products in one feeder or place unidentified material into a dispenser.",
          },
          {
            title: "Avoid overfilling",
            body: "Load only as the directions allow and close the device correctly. More product is not automatically safer or more stable, especially in a small water volume.",
          },
          {
            title: "Observe output through testing",
            body: "Use water readings and actual use conditions to understand output rather than assuming one opening or setting works for every spa. Remove or adjust a device only according to its instructions.",
          },
          {
            title: "Keep movement unobstructed where applicable",
            body: "A floating device should move as intended and should not be wedged against a surface or placed where the directions prohibit. Inspect it for visible damage before normal use.",
          },
        ],
      },
      {
        heading: "Care after heavy or frequent use",
        intro:
          "Busy weekends, repeated guest use, or a high household use pattern can increase debris, oils, filter load, sanitizer demand, cloudiness, and foam.",
        points: [
          {
            title: "Test based on the event, not only the calendar",
            body: "Check water after unusually heavy use as directed for the sanitizer system. A fixed service interval cannot account for every change in occupancy, use, weather, or water condition.",
          },
          {
            title: "Remove visible debris and residue",
            body: "Address leaves, dirt, waterline residue, and accessible debris before they continue loading the filter. Note unusual contamination rather than assuming routine cleaning is sufficient.",
          },
          {
            title: "Check clarity, foam, odor, and filters",
            body: "Cloudiness, persistent foam, unusual odor, or a visibly loaded filter after use is a reason to test and reassess the full care process. Do not mask a persistent condition by repeatedly adding unverified products.",
          },
          {
            title: "Escalate recurring demand",
            body: "If readings repeatedly drift, clarity does not recover through normal approved care, or circulation changes, document the pattern and request professional assessment.",
          },
        ],
      },
      {
        heading: "Accessible spa filter care",
        intro:
          "A loaded or damaged filter can contribute to weak circulation and poor water clarity. Filter design and access vary, so the spa manufacturer's procedure controls.",
        points: [
          {
            title: "Remove only through the approved procedure",
            body: "Shut the system down as directed before accessing a user-serviceable filter. Do not reach into moving equipment or open an unfamiliar housing.",
          },
          {
            title: "Inspect and rinse as directed",
            body: "Look for visible debris, damage, collapsed material, or residue and use the approved rinsing or cleaning method. There is no universal cleaning or replacement interval for every filter and use pattern.",
          },
          {
            title: "Separate cleaning from equipment failure",
            body: "A dirty accessible filter may fit routine care. Cracked housings, persistent low flow, leakage, repeated errors, or damaged internal components require professional review rather than more aggressive cleaning.",
          },
        ],
      },
      {
        heading: "Cloudy, foamy, or odorous water",
        intro:
          "These symptoms can reflect recent use, product buildup, sanitizer demand, filtration, circulation, contamination, or several conditions at once. They do not prove one cause.",
        points: [
          {
            title: "Start with testing and recent history",
            body: "Record recent use, product additions, water additions, cleaning products, clarity, odor, foam, and test results. Avoid diagnosing water quality by smell or appearance alone.",
          },
          {
            title: "Check filter and circulation context",
            body: "Observe whether normal flow is present and whether the accessible filter is loaded or damaged. Water treatment cannot correct failed circulation or damaged equipment.",
          },
          {
            title: "Consider visible contamination",
            body: "Foreign material, unknown spills, bodily-fluid concerns, or other suspected contamination exceeds an ordinary cosmetic cleanup decision. Restrict use and seek appropriate professional guidance.",
          },
          {
            title: "Escalate persistent symptoms",
            body: "If cloudiness, foam, odor, unstable readings, or high sanitizer demand persists after normal approved care, stop guessing at additions and request assessment. This guide does not certify sanitation or health safety.",
          },
        ],
      },
      {
        heading: "Service reports and chemical logs",
        intro:
          "Consistent records help owners and service providers see patterns that a single visit or isolated test cannot show.",
        points: [
          {
            title: "Record readings and adjustments",
            body: "Note the date, test results, exact products and amounts added under label directions, water additions, and any unusual use. The log should describe what happened without claiming that documentation guarantees water quality.",
          },
          {
            title: "Track water and filter condition",
            body: "Record clarity, foam, odor, debris, waterline residue, accessible filter condition, and visible circulation. Photos can help show change over time where reporting supports them.",
          },
          {
            title: "Document visible equipment concerns",
            body: "Include leakage, error messages, abnormal noise, weak flow, or damaged accessible components. Keep repair diagnosis separate from routine cleaning documentation.",
          },
          {
            title: "Use patterns to decide the next step",
            body: "Repeated demand, recurring cloudiness, access problems, or worsening equipment symptoms can support a service-plan or assessment conversation based on actual conditions.",
          },
        ],
      },
      {
        heading: "When to request professional help",
        intro:
          "Stop routine care when the condition persists, product handling is uncertain, circulation fails, or equipment access is unsafe.",
        points: [
          {
            title: "Persistent water symptoms",
            body: "Recurring cloudy or foamy water, unusual odor, unstable readings, or sanitizer demand that does not respond to normal approved care warrants review before continued use.",
          },
          {
            title: "Circulation or leakage concerns",
            body: "Failed circulation, repeated errors, visible leakage, or a damaged filter housing is beyond routine brushing and water adjustment. Document the condition without opening internal equipment.",
          },
          {
            title: "Electrical or heat warning signs",
            body: "Damaged electrical components, smoke, burning odor, or overheating require immediate distance and qualified help. Do not touch wet electrical equipment or attempt internal repair.",
          },
          {
            title: "Contamination or handling uncertainty",
            body: "Restrict use when contamination is suspected or when products cannot be identified or handled confidently. Do not mix products or improvise a treatment sequence.",
          },
        ],
      },
    ],
    safetyTitle: "Hot tub water-care limits",
    safetyBody:
      "This guide provides general care and documentation concepts. It is not an individualized dosing plan, equipment repair manual, regulatory assessment, contamination protocol, or sanitation and health guarantee.",
    safetyPoints: [
      "Never mix pool or spa chemicals together or combine chlorine and acid.",
      "Follow the exact spa, sanitizer, dispenser, filter, and product instructions.",
      "Do not use the spa when visibility, contamination, circulation, or equipment safety is uncertain.",
      "Do not open energized components or unfamiliar equipment housings.",
      "Persistent water symptoms or unsafe equipment conditions require professional escalation.",
    ],
    serviceLinks: [
      { href: "/services/hot-tub-cleaning", label: "Hot Tub & Spa Cleaning" },
      { href: "/pool-service-reports", label: "Pool Service Reports" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/short-term-rental-pool-hot-tub-care", label: "Short-Term Rental Pool & Hot Tub Care" },
      { href: "/diy-pool-care/pool-chemistry-troubleshooting", label: "Pool Chemistry Troubleshooting" },
      { href: "/diy-pool-care/pool-chemical-dosing-safety", label: "Pool Chemical Dosing & Safety" },
      { href: "/blog/pool-care-after-parties-vacations-heavy-use", label: "Pool Care After Parties, Vacations & Heavy Use" },
    ],
    cta: {
      title: "Need professional hot tub or spa cleaning?",
      body: "Share the service address, spa type, current clarity and symptoms, recent use, accessible filter condition, circulation status, and safe photos. Shipwrecked Pools will confirm scope and availability after review.",
      href: "/services/hot-tub-cleaning",
      label: "Explore Hot Tub & Spa Cleaning",
    },
  },
  {
    slug: "short-term-rental-pool-hot-tub-care",
    title: "Short-Term Rental Pool & Hot Tub Care Checklist",
    description:
      "A pool and hot tub care checklist for short-term rental hosts, remote owners, and property managers covering service planning, guest-use conditions, reporting, weather, and escalation.",
    summary:
      "Vacation-rental water care requires a property-specific plan, clear access and escalation contacts, condition-based observation, and useful reporting. This checklist helps hosts, remote owners, and property managers coordinate pool and spa care without promising housekeeping, full property turnover, or guaranteed guest readiness.",
    publishedOn: "2026-10-16",
    primaryTopic: "Pool and hot tub care planning for short-term rental properties and remote owners",
    sections: [
      {
        heading: "Define the property-specific service plan",
        intro:
          "Begin with the actual property, amenities, access, occupancy pattern, and communication needs. No single service frequency fits every short-term rental.",
        points: [
          {
            title: "Identify the water-care scope",
            body: "State whether the property has a pool, a hot tub, or both, and describe the current condition. Separate routine cleaning from repairs, one-time recovery, and other property tasks.",
          },
          {
            title: "Document access",
            body: "Provide approved service-day access instructions, gates, amenity locations, parking constraints, and any time restrictions. Keep credentials and access updates with the authorized contact rather than relying on guests.",
          },
          {
            title: "Name primary and backup contacts",
            body: "Identify who can answer condition, access, quote, and escalation questions when the owner is remote. State communication preferences and who can approve work outside routine scope.",
          },
          {
            title: "Describe use patterns",
            body: "Share normal occupancy, high-use periods, event patterns, seasonal changes, and expected gaps between stays. Actual use and water condition should inform planning rather than a fixed calendar alone.",
          },
        ],
      },
      {
        heading: "Routine pool-care observations",
        intro:
          "A repeatable pool visit should combine cleaning, water testing, circulation observation, and documentation within the agreed service scope.",
        points: [
          {
            title: "Cleaning and accessible debris points",
            body: "Observe and address surface debris, reachable walls and steps, settled material, and accessible baskets as appropriate to the service. A heavy debris or recovery condition may require separate scope.",
          },
          {
            title: "Water testing and controlled adjustment",
            body: "Record readings, identify the exact products used, and make condition-based adjustments according to product directions. Do not assume routine service can guarantee water condition between unknown guest-use events.",
          },
          {
            title: "Circulation and visible equipment",
            body: "Note normal flow, weak returns, air, leakage, errors, abnormal noise, or other visible changes. Routine observation is not a comprehensive mechanical inspection.",
          },
          {
            title: "Document the completed visit",
            body: "Record work performed, readings, adjustments, visible condition, concerns, and action items. Photos can give a remote owner useful context where the reporting process supports them.",
          },
        ],
      },
      {
        heading: "Routine hot tub and spa care",
        intro:
          "Smaller water volume and frequent guest use can make spa conditions change quickly. Use the dedicated hot tub water-care guide for deeper sanitizer, filter, and symptom context.",
        points: [
          {
            title: "Clean and observe accessible areas",
            body: "Remove debris, brush or vacuum suitable surfaces, clean the waterline as directed, observe the accessible filter area, and note cover-area condition without assuming unrelated cover work is included.",
          },
          {
            title: "Test and document water condition",
            body: "Record sanitizer-system readings, pH, alkalinity, clarity, odor, foam, recent use, and controlled adjustments. Product directions and actual conditions govern; universal doses do not.",
          },
          {
            title: "Watch high-use demand",
            body: "Cloudiness, persistent foam, unusual odor, rapid reading changes, and filter loading after frequent use are reasons to reassess rather than repeat unverified additions.",
          },
        ],
      },
      {
        heading: "Plan for frequent guest use",
        intro:
          "Guest turnover can change debris, contaminants, chemistry, filter load, and communication needs even when the calendar looks consistent.",
        points: [
          {
            title: "Use patterns affect water care",
            body: "Occupancy, duration, amenity use, cosmetics, weather, and debris can change demand from one stay to the next. Historical patterns are useful, but they do not guarantee the next condition.",
          },
          {
            title: "Abnormal conditions need a communication path",
            body: "Define who receives reports of poor visibility, persistent foam, unusual odor, failed circulation, damage, contamination concerns, or access problems and who can approve the next step.",
          },
          {
            title: "Frequency remains condition-dependent",
            body: "A planned cadence should account for use and risk, but a fixed schedule alone cannot guarantee readiness or prevent every problem between visits.",
          },
        ],
      },
      {
        heading: "Between-stay and turnover observations",
        intro:
          "This educational checklist helps an authorized property contact observe the water amenities between stays. It is not a promise that pool service includes housekeeping or full property turnover.",
        points: [
          {
            title: "Check visible water condition",
            body: "Observe debris, clarity, water level, foam, unusual odor, and obvious contamination. Restrict use and escalate when visibility or condition is uncertain.",
          },
          {
            title: "Confirm obvious circulation",
            body: "Look for expected water movement and note weak flow, air, leakage, unusual noise, or error messages. Do not open electrical or mechanical equipment.",
          },
          {
            title: "Observe accessible debris and filter areas",
            body: "Note loaded baskets, spa filters, bags, or obvious restrictions that are intended for normal user observation. Follow equipment instructions before any approved access.",
          },
          {
            title: "Record property and weather effects",
            body: "Document visible damage, cover-area condition, wind or storm debris, landscaping material, construction dust, or a recent power interruption that may change the service need.",
          },
        ],
      },
      {
        heading: "Service reports for remote owners",
        intro:
          "A consistent report gives hosts, owners, and property managers a shared record without requiring them to be present for every service visit.",
        points: [
          {
            title: "Record readings and work performed",
            body: "Include the service date, relevant water readings, cleaning completed, products or adjustments, and water condition. Documentation describes the visit; it does not guarantee conditions after later use.",
          },
          {
            title: "Use photos where supported",
            body: "Photos can document water appearance, completed work, accessible filter condition, visible equipment concerns, or access problems. They should not be treated as a full mechanical or safety inspection.",
          },
          {
            title: "Separate action items from routine notes",
            body: "Clearly identify issues that need owner review, separate quote approval, access correction, or another qualified provider. Include the escalation contact and time-sensitive context without promising emergency response.",
          },
          {
            title: "Review patterns over time",
            body: "Recurring chemistry demand, debris, access issues, equipment symptoms, or high-use conditions can help refine a property-specific plan.",
          },
        ],
      },
      {
        heading: "Weather, storms, and property conditions",
        intro:
          "West Texas wind, dust, heavy rain, heat, and power interruptions can create work beyond a normal visit, especially around high-use weekends.",
        points: [
          {
            title: "Document storm and debris load",
            body: "Share wide photos of dirt, leaves, branches, runoff, water-level changes, or poor visibility. A major cleanup or recovery condition may need separate assessment.",
          },
          {
            title: "Note equipment interruption",
            body: "Report loss of power, failed circulation, errors, leakage, or equipment damage. Do not touch damaged or water-exposed electrical components.",
          },
          {
            title: "Include landscaping and construction context",
            body: "Fresh landscaping, mowing, nearby construction, or exterior work can add debris or dust that changes cleaning and filter load. Communicate planned work when possible.",
          },
          {
            title: "Use the storm-care decision path",
            body: "The West Texas storm guide provides a deeper sequence for safe inspection, debris removal, testing, filter observation, and deciding when ordinary care is not enough.",
          },
        ],
      },
      {
        heading: "Issue escalation boundaries",
        intro:
          "Define the point where routine service pauses and the authorized property contact must decide on assessment, recovery, repair, or restricted use.",
        points: [
          {
            title: "Water or contamination concerns",
            body: "Poor visibility, persistent chemistry instability, unusual odor or foam, foreign material, or suspected contamination should be reported and evaluated before continued use.",
          },
          {
            title: "Circulation and equipment concerns",
            body: "Failed circulation, severe leakage, damaged equipment, repeated errors, burning odor, or unsafe access is beyond routine cleaning. Keep internal repair separate from the service visit.",
          },
          {
            title: "Work outside agreed scope",
            body: "One-time recovery, equipment repair, major storm cleanup, and other corrective work should be quoted or approved separately when not included in the service plan.",
          },
          {
            title: "Response expectations",
            body: "Contacts and escalation steps should be clear, but the guide does not promise around-the-clock coverage, emergency response, same-day arrival, or completion between every stay.",
          },
        ],
      },
      {
        heading: "Prepare a useful rental-property quote request",
        intro:
          "Complete property details help determine whether recurring pool care, hot tub cleaning, combined service, or corrective work fits the request.",
        ordered: true,
        points: [
          {
            title: "Identify the property and amenities",
            body: "Provide the service address, property type, pool and hot tub configuration, approximate dimensions if known, and safe current photos.",
          },
          {
            title: "Explain access and occupancy",
            body: "Share approved access instructions, service-day restrictions, normal occupancy, high-use periods, and known gaps between stays.",
          },
          {
            title: "Describe current condition and equipment",
            body: "Summarize clarity, debris, chemistry or circulation concerns, known equipment, recent weather, and any existing service history.",
          },
          {
            title: "Define reporting and approval contacts",
            body: "State desired reporting, primary and backup contacts, escalation preferences, billing contact, and who can approve separate work.",
          },
          {
            title: "Describe the desired cadence without assuming it",
            body: "Share the requested frequency and the property conditions behind it. Final scope, cadence, route availability, and pricing are confirmed in the actual quote or agreement.",
          },
        ],
      },
    ],
    safetyTitle: "Short-term rental care limits",
    safetyBody:
      "This guide supports amenity-care planning and remote-owner communication. It does not provide property management, housekeeping, guest communication, full turnover service, platform authorization, or a guarantee that amenities will be ready after unknown use or events.",
    safetyPoints: [
      "Restrict use when water visibility, contamination, circulation, or equipment safety is uncertain.",
      "Do not mix chemicals or ask untrained guests or staff to improvise product additions.",
      "Keep repair, recovery, and major cleanup work separate from routine scope unless explicitly included.",
      "Service reports document observed conditions and work; they do not guarantee later guest behavior or water condition.",
      "Scope, cadence, access, response expectations, and pricing belong in the actual quote or service agreement.",
    ],
    serviceLinks: [
      { href: "/services/short-term-rental-pool-hot-tub-cleaning", label: "Short-Term Rental Pool & Hot Tub Cleaning" },
      { href: "/services/hot-tub-cleaning", label: "Hot Tub & Spa Cleaning" },
      { href: "/services/weekly-services", label: "Weekly Pool Service" },
      { href: "/pool-service-reports", label: "Pool Service Reports" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/hot-tub-spa-water-care", label: "Hot Tub & Spa Water Care" },
      { href: "/diy-pool-care/west-texas-storm-pool-care", label: "West Texas Storm Pool Care" },
      { href: "/diy-pool-care/pool-equipment-troubleshooting", label: "Pool Equipment Troubleshooting" },
      { href: "/blog/pool-care-after-parties-vacations-heavy-use", label: "Pool Care After Parties, Vacations & Heavy Use" },
    ],
    cta: {
      title: "Need a care plan for a short-term rental?",
      body: "Share the property address, amenities, access, occupancy pattern, current condition, reporting needs, contacts, requested cadence, and safe photos. Shipwrecked Pools will confirm available scope and route fit.",
      href: "/services/short-term-rental-pool-hot-tub-cleaning",
      label: "Explore Rental Pool & Hot Tub Service",
    },
  },
  {
    slug: "commercial-pool-service-checklist",
    title: "Commercial Pool Service Checklist for Property Managers",
    description:
      "A commercial pool-service planning checklist for hotel, apartment, multifamily, facilities, and property-management teams covering scope, access, reporting, equipment, and escalation.",
    summary:
      "Commercial pool care depends on clearly assigned responsibilities, property and equipment information, an agreed service scope, useful reporting, and a defined escalation path. This planning guide does not transfer an owner's or operator's legal duties to a pool-service provider or replace direction from the appropriate authority.",
    publishedOn: "2026-10-16",
    primaryTopic: "Commercial pool-service planning, reporting, and responsibility boundaries",
    sections: [
      {
        heading: "Define operational responsibilities",
        intro:
          "Before comparing service tasks, identify who owns each decision. A service provider can perform an agreed scope, but the property remains responsible for its operator, access, legal, and facility obligations.",
        points: [
          {
            title: "Property owner or operator",
            body: "Identify the party responsible for the facility, operating decisions, required records, closures, notices, and obligations that apply to the property.",
          },
          {
            title: "Property-management and facilities contacts",
            body: "Name the people responsible for access, day-to-day coordination, work approval, purchasing, billing, and communicating conditions to ownership or on-site teams.",
          },
          {
            title: "Pool-service provider and repair vendors",
            body: "Define recurring water-care and cleaning tasks separately from filter service, equipment assessment, corrective recovery, and repairs. A routine visit is not an unlimited mechanical inspection.",
          },
          {
            title: "Appropriate authorities",
            body: "Code, inspection, operating, and compliance questions belong with the authority or qualified professional responsible for those questions. Shipwrecked Pools service documentation is not an official inspection.",
          },
        ],
      },
      {
        heading: "Create a property and pool information record",
        intro:
          "A reliable property record reduces access failures, unclear approvals, and repeated fact-finding when conditions change.",
        points: [
          {
            title: "Property and amenity profile",
            body: "Record the address, property type, number of pools or spas, approximate dimensions if known, normal hours, seasonal use, and typical occupancy or event patterns.",
          },
          {
            title: "Access and storage constraints",
            body: "Document approved entry points, keys or credential procedures, equipment rooms, chemical-storage access, delivery restrictions, parking, and service-hour limitations without exposing credentials in public notes.",
          },
          {
            title: "Known equipment",
            body: "Maintain accessible manufacturer and model information, approximate age if known, filter type, normal operating observations, and prior major service history.",
          },
          {
            title: "Contacts and escalation path",
            body: "List primary and backup operations contacts, repair approval, billing or quote contact, and who can make a closure or restricted-use decision when an abnormal condition is reported.",
          },
        ],
      },
      {
        heading: "Define the recurring service scope",
        intro:
          "Commercial service should be described in the actual proposal or agreement instead of assumed from a generic checklist.",
        points: [
          {
            title: "Cleaning tasks",
            body: "Clarify debris removal, brushing, vacuuming, accessible baskets, waterline attention, and other agreed routine work. Heavy debris, recovery conditions, or work outside safe access may need separate scope.",
          },
          {
            title: "Water testing and adjustment",
            body: "Define testing, condition-based chemical adjustment, documentation, and the process for unusual demand. No generic guide can establish a universal chemical package or promise ongoing compliance.",
          },
          {
            title: "Visible equipment observations",
            body: "Clarify normal observation of flow, leakage, errors, noise, damage, and accessible filter conditions. Detailed diagnosis, disassembly, and repair remain separate services.",
          },
          {
            title: "Reporting and access coordination",
            body: "State what each report includes, who receives it, how access failures are handled, and which issues require authorization or another provider.",
          },
        ],
      },
      {
        heading: "Plan service frequency around actual conditions",
        intro:
          "Property type alone does not determine the correct cadence. The plan should consider use, season, environment, equipment, water condition, and contracted scope.",
        points: [
          {
            title: "Use and property type",
            body: "A hotel, apartment community, or other shared amenity may experience different daily and seasonal use. Occupancy, events, hours, and spa use can change the observation and service need.",
          },
          {
            title: "Weather and debris",
            body: "Wind, dust, storms, heat, landscaping, nearby construction, and tree debris can increase cleaning, filter, and water-care demand beyond an ordinary pattern.",
          },
          {
            title: "Equipment and water condition",
            body: "Weak circulation, filter loading, recurring chemistry demand, or a corrective condition may require separate assessment rather than simply adding routine visits.",
          },
          {
            title: "Agreement controls",
            body: "Requested frequency, staffing expectations, seasonal changes, and response terms must be evaluated and defined in the quote or agreement. This checklist promises no universal cadence.",
          },
        ],
      },
      {
        heading: "Coordinate water care and chemicals",
        intro:
          "Commercial water care needs consistent testing, controlled adjustments, documentation, access, purchasing expectations, and clear escalation when conditions depart from normal.",
        points: [
          {
            title: "Testing and adjustment records",
            body: "Record readings, products and adjustments, water condition, unusual demand, and relevant circulation observations. Documentation supports decisions but is not an official inspection or compliance guarantee.",
          },
          {
            title: "Chemical purchasing and invoicing",
            body: "Clarify whether products are property-supplied, requested through delivery, included under a written scope, or invoiced separately. Never assume fixed chemical inclusion from a general service description.",
          },
          {
            title: "Storage and access",
            body: "Define secure, dry, ventilated, manufacturer-appropriate storage and who controls access. Keep products labeled and separated, and do not mix pool chemicals together.",
          },
          {
            title: "Unusual demand or unstable readings",
            body: "Recurring demand, poor clarity, unexpected reading changes, or repeated additions should trigger a broader chemistry, use, filter, and circulation review rather than automatic extra dosing.",
          },
        ],
      },
      {
        heading: "Filter and equipment observations",
        intro:
          "Routine service can document visible changes and route concerns, but it does not replace condition-specific mechanical assessment.",
        points: [
          {
            title: "Flow and pump symptoms",
            body: "Record weak returns, poor skimming, air, prime loss, unusual noise, starting or stopping, and whether circulation is currently working. Do not open energized equipment or repeatedly run a pump without normal water movement.",
          },
          {
            title: "Filter condition",
            body: "Compare visible pressure and flow behavior with the system's established baseline, note accessible filter condition and service history, and avoid universal thresholds or fixed cleaning intervals.",
          },
          {
            title: "Leakage, errors, and damage",
            body: "Photograph visible leakage, display text, damaged components, or unsafe conditions from a safe location. Severe leakage, smoke, burning odor, exposed electrical damage, or cracked equipment requires immediate escalation.",
          },
          {
            title: "Route the next step",
            body: "A loaded filter may fit filter cleaning; a damaged filter, pump, valve, or other component may need a separate equipment quote. Routine service reporting does not guarantee a complete defect inventory.",
          },
        ],
      },
      {
        heading: "Reporting and communication standards",
        intro:
          "A useful commercial report should show what occurred, what was observed, and what needs action without blurring routine service and official facility oversight.",
        points: [
          {
            title: "Service date and work performed",
            body: "Record the visit date, agreed cleaning tasks, testing, products or adjustments, and accessible filter or equipment observations.",
          },
          {
            title: "Photos and visible concerns",
            body: "Use photos where supported to document water appearance, completed work, access conditions, leaks, errors, damage, or debris. Photos are not engineering or official inspection evidence.",
          },
          {
            title: "Action items and escalation",
            body: "Separate information-only notes from issues requiring access correction, property action, quote approval, repair evaluation, restricted use, or contact with the appropriate authority.",
          },
          {
            title: "Patterns over time",
            body: "Review recurring demand, debris, filter loading, equipment symptoms, access failures, and weather effects so the property can discuss scope changes based on evidence.",
          },
        ],
      },
      {
        heading: "Plan for weather and high-use conditions",
        intro:
          "Shared-use properties need an agreed process for conditions that can exceed normal recurring scope.",
        points: [
          {
            title: "Storms, rain, wind, and dust",
            body: "Document debris, runoff, water-level changes, poor visibility, filter load, and circulation interruptions after weather events. Major cleanup or recovery may require separate review.",
          },
          {
            title: "Heat and high occupancy",
            body: "High use and sustained hot weather can change debris, sanitizer demand, evaporation, and observation needs. Plans should respond to actual conditions rather than promise that one cadence fits every period.",
          },
          {
            title: "Events and unusual activity",
            body: "Communicate scheduled events, unusually high occupancy, nearby work, or amenity changes that could affect water, debris, access, or service timing.",
          },
          {
            title: "Power or equipment interruption",
            body: "Report loss of circulation, outages, error messages, or equipment damage promptly through the property escalation path. Do not operate visibly unsafe equipment.",
          },
        ],
      },
      {
        heading: "Prepare a commercial service proposal request",
        intro:
          "A complete request allows the provider to evaluate route fit, scope, reporting, access, and separately quoted needs.",
        ordered: true,
        points: [
          {
            title: "Describe the property",
            body: "Provide property type, address, pool and spa count, approximate dimensions, normal hours, expected use, current condition, and safe photos.",
          },
          {
            title: "Describe access and contacts",
            body: "Share service access, storage constraints, site restrictions, operations contacts, backup contacts, billing contact, and repair-approval process.",
          },
          {
            title: "State requested scope and cadence",
            body: "List desired cleaning, testing, chemical, reporting, filter, and observation needs along with the requested frequency. Final scope and cadence require review.",
          },
          {
            title: "List equipment and current concerns",
            body: "Include known equipment, filter type, recent service, chemistry demand, flow or leakage symptoms, damage, errors, and existing corrective conditions.",
          },
          {
            title: "Clarify purchasing and reporting expectations",
            body: "Explain chemical purchasing or invoicing expectations, desired report recipients, photo needs, action-item format, and escalation requirements.",
          },
        ],
      },
      {
        heading: "Professional and regulatory boundaries",
        intro:
          "The written quote or agreement defines Shipwrecked Pools' actual service scope. Property operators retain responsibilities that cannot be transferred by a general educational checklist.",
        points: [
          {
            title: "Documentation is not an official inspection",
            body: "Service reports describe observed conditions and agreed work. They do not replace inspections, required operator records, or determinations by the appropriate authority.",
          },
          {
            title: "The property retains legal obligations",
            body: "Owners and operators remain responsible for applicable rules, facility operation, access, closures, notices, staffing, and obtaining advice from the proper authority or qualified professional.",
          },
          {
            title: "Visible observation is not engineering assessment",
            body: "Routine service cannot certify structural, electrical, mechanical, or concealed conditions. Repairs and specialist evaluations are separately scoped.",
          },
          {
            title: "No generic compliance or response promise",
            body: "This guide does not promise compliance, official approval, fixed staffing, fixed pricing, fixed chemical inclusion, emergency coverage, or a particular response time.",
          },
        ],
      },
    ],
    safetyTitle: "Commercial service responsibility boundaries",
    safetyBody:
      "This checklist is educational planning material. It does not make Shipwrecked Pools the property operator, regulatory authority, facility manager, engineering provider, or guarantor of compliance, staffing, chemical inclusion, response time, or operating condition.",
    safetyPoints: [
      "The property owner or operator remains responsible for applicable legal and facility obligations.",
      "Service documentation is not an official inspection, operating approval, or compliance certification.",
      "Routine visible observation is not a comprehensive mechanical, electrical, or structural assessment.",
      "Repair, recovery, filter work, and conditions outside recurring scope are evaluated separately.",
      "The actual quote or agreement controls scope, cadence, access, reporting, purchasing, pricing, and response terms.",
    ],
    serviceLinks: [
      { href: "/services/hotel-apartment-pool-cleaning", label: "Hotel & Apartment Pool Cleaning" },
      { href: "/pool-service-reports", label: "Pool Service Reports" },
      { href: "/services/pool-equipment-repair", label: "Pool Equipment Repair" },
      { href: "/services/filter-cleaning", label: "Pool Filter Cleaning" },
      { href: "/services/free-pool-chemical-delivery", label: "Pool Chemical Delivery" },
    ],
    relatedGuideLinks: [
      { href: "/diy-pool-care/pool-equipment-troubleshooting", label: "Pool Equipment Troubleshooting" },
      { href: "/diy-pool-care/pool-chemistry-troubleshooting", label: "Pool Chemistry Troubleshooting" },
      { href: "/diy-pool-care/pool-chemical-dosing-safety", label: "Pool Chemical Dosing & Safety" },
      { href: "/diy-pool-care/west-texas-storm-pool-care", label: "West Texas Storm Pool Care" },
    ],
    cta: {
      title: "Need a commercial pool-service proposal?",
      body: "Share the property type, address, pool and spa details, use patterns, access, known equipment, current condition, requested cadence, reporting needs, contacts, and safe photos. Shipwrecked Pools will review available scope and route fit.",
      href: "/services/hotel-apartment-pool-cleaning",
      label: "Explore Commercial Pool Service",
    },
  },
];

export const diyGuideGroups = [
  {
    title: "Routine Care",
    description: "Build a repeatable cleaning, observation, testing, and escalation rhythm.",
    slugs: ["weekly-pool-care-guide"],
  },
  {
    title: "Water & Chemistry",
    description: "Understand chemistry relationships and make safer product decisions.",
    slugs: ["pool-chemistry-troubleshooting", "pool-chemical-dosing-safety"],
  },
  {
    title: "Recovery & Weather",
    description: "Respond to green water, cloudiness, storms, debris, and circulation interruptions.",
    slugs: ["green-cloudy-pool-recovery", "west-texas-storm-pool-care"],
  },
  {
    title: "Equipment & Surfaces",
    description: "Match equipment, cleaner, finish, tile, liner, and deck symptoms to safer next steps.",
    slugs: [
      "pool-equipment-troubleshooting",
      "pool-cleaner-robot-troubleshooting",
      "pool-surface-remodeling-guide",
    ],
  },
  {
    title: "Property & Spa Care",
    description: "Plan hot tub care, rental-property coordination, and commercial pool-service responsibilities.",
    slugs: [
      "hot-tub-spa-water-care",
      "short-term-rental-pool-hot-tub-care",
      "commercial-pool-service-checklist",
    ],
  },
] as const;

export function getDiyGuideBySlug(slug: string) {
  return diyGuides.find((guide) => guide.slug === slug);
}
