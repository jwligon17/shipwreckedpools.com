export type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

export type Service = {
  slug: string;
  name: string;
  seoTitle?: string;
  seoH1?: string;
  seoDescription?: string;
  summary: string;
  supportingParagraph: string;
  idealFor: string;
  problemStatement: string;
  solutionStatement: string;
  bullets: string[];
  process: string[];
  standards: string[];
  outcomes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: string[];
  resourceLinks?: {
    href: string;
    label: string;
  }[];
  ctaTitle: string;
  showBenefitsSection?: boolean;
  showProofSection?: boolean;
  proof?: {
    heading: string;
    body: string;
    singleImagePath?: string;
    beforeImagePath?: string;
    afterImagePath?: string;
  };
};

export type Location = {
  slug: string;
  name: string;
  seoTitle?: string;
  summary: string;
  heroHeadline: string;
  introCopy: string;
  localContext: string;
  routeNotes: string;
  routeAvailabilityNote: string;
  servicesOffered: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  imagePath?: string;
  imageAlt?: string;
  nearbyLocationSlugs: string[];
  showLocationCtaBanner?: boolean;
};

export type BlogSummary = {
  slug: string;
  title: string;
  publishedOn: string;
  excerpt: string;
  summaryBody: string;
  bodySections: string[];
  contextualLinks: {
    before: string;
    href: string;
    label: string;
    after: string;
  }[];
  relatedServiceSlugs: string[];
};

export type ResourcePreview = {
  title: string;
  summary: string;
  href: string;
  ctaLabel: string;
};

export type HomePoolCareService = {
  title: string;
  summary: string;
  href: string;
  icon: "weekly" | "algae" | "acidWash" | "drainRefill" | "filter" | "pump" | "oneTime" | "sand";
};

export type HomePoolAreaHighlight = {
  title: string;
  imagePath: string;
  imageAlt: string;
  href?: string;
  ariaLabel: string;
  placeholderLabel?: string;
};

export type SocialLink = {
  id: "google" | "facebook" | "tiktok" | "instagram";
  label: string;
  ariaLabel: string;
  href: string;
  enabled: boolean;
};

export type GoogleReviews = {
  url: string;
  label: string;
  rating: number | null;
  reviewCount: number | null;
};

export type CuratedReview = {
  quote: string;
  reviewerName?: string;
  reviewDate?: string;
  rating?: number;
  source?: "Google";
  readOnGoogleUrl?: string;
};

export type ReviewsData = {
  rating: number;
  reviewCount: number;
  displayReviewCount: string;
  googleReviewsUrl: string;
  reviews: CuratedReview[];
};

const reviewsData: ReviewsData = {
  rating: 5.0,
  reviewCount: 85,
  displayReviewCount: "85+",
  googleReviewsUrl:
    "https://www.google.com/search?q=shipwrecked+pools&oq=shipwrecked+pools&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyCAgCEEUYJxg7MgYIAxBFGDwyBggEEEUYPTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYQdIBCDM1ODhqMGo0qAIBsAIB8QW_u7c0Ik4Grw&sourceid=chrome&ie=UTF-8#lrd=0x6535013210ab0793:0xb436b7ca7f578316,1,,,,",
  reviews: [
    {
      reviewerName: "Barbara Bifulco",
      rating: 5,
      source: "Google",
      reviewDate: "a month ago",
      quote:
        "Jason with Shipwrecked pools is hands down the best pool maintenance professional I’ve ever worked with. He does an excellent job keeping my pool clean and running perfectly, and his attention to detail really shows. What I appreciate most is his communication — he’s always responsive, reliable, and keeps me informed. If you’re looking for someone who truly cares about doing a great job, Jason is the one to call. I highly recommend!",
      readOnGoogleUrl:
        "https://www.google.com/search?q=shipwrecked+pools&oq=shipwrecked+pools&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyCAgCEEUYJxg7MgYIAxBFGDwyBggEEEUYPTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYQdIBCDM1ODhqMGo0qAIBsAIB8QW_u7c0Ik4Grw&sourceid=chrome&ie=UTF-8#lrd=0x6535013210ab0793:0xb436b7ca7f578316,1,,,,",
    },
    {
      reviewerName: "Justin Bradshaw",
      rating: 5,
      source: "Google",
      reviewDate: "3 months ago",
      quote:
        "Shipwrecked Pools is hands down the best pool cleaning company in Abilene. They showed up exactly when they said they would, did a fantastic job, and delivered everything they promised—no surprises. The pricing was fair and transparent, and the quality of work really stood out. It’s refreshing to work with a company that’s reliable, professional, and takes pride in their work. Highly recommend Shipwrecked Pools to anyone looking for dependable pool service!",
      readOnGoogleUrl:
        "https://www.google.com/search?q=shipwrecked+pools&oq=shipwrecked+pools&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyCAgCEEUYJxg7MgYIAxBFGDwyBggEEEUYPTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYQdIBCDM1ODhqMGo0qAIBsAIB8QW_u7c0Ik4Grw&sourceid=chrome&ie=UTF-8#lrd=0x6535013210ab0793:0xb436b7ca7f578316,1,,,,",
    },
    {
      reviewerName: "Daniel Counts",
      rating: 5,
      source: "Google",
      reviewDate: "7 months ago",
      quote:
        "Jason is amazing! I moved to abilene with my family about 3 months ago and our pool was swamp green. Im not kidding when I say it was disgusting. Jason came and turned it back into a crystal clear pool. Not only is his service top notch, but he's genuinely a good person. These guys go above and beyond to help out! Never switching companies!",
      readOnGoogleUrl:
        "https://www.google.com/search?q=shipwrecked+pools&oq=shipwrecked+pools&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyCAgCEEUYJxg7MgYIAxBFGDwyBggEEEUYPTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYQdIBCDM1ODhqMGo0qAIBsAIB8QW_u7c0Ik4Grw&sourceid=chrome&ie=UTF-8#lrd=0x6535013210ab0793:0xb436b7ca7f578316,1,,,,",
    },
    {
      reviewerName: "Jenna Henderson",
      rating: 5,
      source: "Google",
      reviewDate: "Edited 20 hours ago",
      quote:
        "Not to throw shade, but our pool guy is way better than yours!!! 😎😎 Jason does amazing work! He went above and beyond to make sure our pool was summer-ready. He even stopped by multiple times to check on everything and make sure it was running perfectly. It’s clear he takes pride in his work and truly cares about his customers. If you’re looking for someone reliable and thorough to take care of your pool, I highly recommend Jason!",
      readOnGoogleUrl:
        "https://www.google.com/search?q=shipwrecked+pools&oq=shipwrecked+pools&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyCAgCEEUYJxg7MgYIAxBFGDwyBggEEEUYPTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYQdIBCDM1ODhqMGo0qAIBsAIB8QW_u7c0Ik4Grw&sourceid=chrome&ie=UTF-8#lrd=0x6535013210ab0793:0xb436b7ca7f578316,1,,,,",
    },
    {
      reviewerName: "Lee Rood",
      rating: 5,
      source: "Google",
      reviewDate: "Edited a day ago",
      quote:
        "Jason has been the best to work with and our pool looks awesome! He is a rockstar and had it cleaned quickly and without a headache for us! He also has been willing to work with our safety system due to small children and an autistic son who loves water. I highly recommend Shipwrecked Pools for all you pool cleaning needs!",
      readOnGoogleUrl:
        "https://www.google.com/search?q=shipwrecked+pools&oq=shipwrecked+pools&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyCAgCEEUYJxg7MgYIAxBFGDwyBggEEEUYPTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYQdIBCDM1ODhqMGo0qAIBsAIB8QW_u7c0Ik4Grw&sourceid=chrome&ie=UTF-8#lrd=0x6535013210ab0793:0xb436b7ca7f578316,1,,,,",
    },
  ],
};

const googleReviews: GoogleReviews = {
  url: reviewsData.googleReviewsUrl,
  label: "Google Reviews",
  rating: reviewsData.rating,
  reviewCount: reviewsData.reviewCount,
};

const differenceGoogleRating = reviewsData.rating.toFixed(1);
const differenceReviewCount = reviewsData.displayReviewCount;
const defaultLocationServiceSlugs = [
  "weekly-services",
  "algae-removal",
  "acid-wash",
  "drain-and-refill",
  "filter-cleaning",
  "pump-repair-and-installation",
  "one-time-cleans",
  "sand-replacement",
];

function buildLocationFaqs(locationName: string) {
  return [
    {
      question: `Do you service pools in ${locationName}?`,
      answer:
        "We serve approved areas across Abilene and nearby communities. Route availability can vary, so text us your address or request a quote to confirm current availability.",
    },
    {
      question: `Do you offer weekly pool service in ${locationName}?`,
      answer:
        "Weekly service may be available depending on current route capacity. We can confirm options after checking your address and pool needs.",
    },
    {
      question: `Can you help with green pool recovery in ${locationName}?`,
      answer:
        "Yes, we offer green-to-clean and algae recovery services when the pool condition and route availability allow. We focus on diagnosis, cleanup, treatment, and follow-up recommendations.",
    },
    {
      question: `Do you offer one-time pool cleans in ${locationName}?`,
      answer:
        "One-time cleans may be available for seasonal resets, move-ins, special events, or neglected pools. Contact us with pool details so we can recommend the right next step.",
    },
  ];
}

export const site = {
  brand: {
    name: "Shipwrecked Pools",
    market: "Abilene, Texas and surrounding towns",
    phone: "325-665-8877",
    phoneHref: "tel:+13256658877",
    textHref: "sms:+13256658877",
    description: "Clear water. Protected gear. Weekends back.",
    owner: "Jason Ligon",
  },
  ctas: {
    primary: { label: "Get a Quote", href: "/contact" },
    textUs: { label: "Text Us", href: "sms:+13256658877", external: true },
    callUs: { label: "Call Us", href: "tel:+13256658877", external: true },
    payNow: {
      label: "Pay Now",
      href: "https://shipwreckedpools.mypoolportal.com",
      external: true,
    },
  },
  socialLinks: [
    {
      id: "google",
      label: "Google Reviews",
      ariaLabel: "Read Shipwrecked Pools Google reviews",
      href: reviewsData.googleReviewsUrl,
      enabled: true,
    },
    {
      id: "facebook",
      label: "Facebook",
      ariaLabel: "Visit Shipwrecked Pools on Facebook",
      href: "https://www.facebook.com/shipwreckedpools/",
      enabled: true,
    },
    {
      id: "tiktok",
      label: "TikTok",
      ariaLabel: "Visit Shipwrecked Pools on TikTok",
      href: "https://www.tiktok.com/@shipwreckedpools",
      enabled: true,
    },
    {
      id: "instagram",
      label: "Instagram",
      ariaLabel: "Visit Shipwrecked Pools on Instagram",
      href: "https://www.instagram.com/shipwrecked.pools/",
      enabled: true,
    },
  ] as SocialLink[],
  googleReviews,
  reviewsData,
  navigation: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Locations", href: "/locations" },
    { label: "DIY Pool Care", href: "/diy-pool-care" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  about: {
    aboutUs: {
      heading: "About Us",
      paragraphs: [
        "Shipwrecked Pools is a pool care company built for Abilene homeowners who want more than quick splash-and-dash service. We focus on dependable routes, clear communication, and professional pool care that protects your water, equipment, and long-term investment.",
        "Every pool is treated like a major home system. That means consistent service, proactive attention to problems before they become expensive, and a local standard of care that homeowners can trust week after week.",
      ],
      supportingLine: "Local service. Professional standards. Clear communication.",
      imagePath: "/images/about-shipwrecked-pools-collage-v3.png",
      imageAlt: "Shipwrecked Pools family and local life collage",
    },
    mission: {
      heading: "Our Commitment",
      statement:
        "We are committed to making pool care feel simple, dependable, and professional. That means responsive customer service, clear communication, and consistently clean pools you can feel good about. Our goal is to make it easier for homeowners to trust the process, stay informed, and enjoy a pool that looks cared for week after week.",
      supportingLine: "",
    },
    coreValues: {
      heading: "Core Values",
      values: [
        {
          title: "Clear Communication",
          description: "We keep homeowners informed so there is less guessing and fewer surprises.",
        },
        {
          title: "Dependable Service",
          description: "We build route standards around consistency, reliability, and long-term care.",
        },
        {
          title: "Professional Standards",
          description: "We treat pool care like asset management, not a quick stop on a route.",
        },
        {
          title: "Proactive Protection",
          description:
            "We look for small issues early to help protect equipment, plaster, and water quality.",
        },
        {
          title: "Local Accountability",
          description:
            "We serve Abilene and surrounding areas with practical communication and dependable service.",
        },
        {
          title: "Trust Over Shortcuts",
          description:
            "We focus on doing the right thing for the pool, the homeowner, and the long-term result.",
        },
      ],
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "Pool Services",
      titleLines: ["Pool Cleaning, Repair & Remodeling in Abilene, TX", ""],
      description:
        "Weekly pool care, cleaning, equipment repair, and renovation services for Abilene pool owners.",
      primaryCta: { label: "Get a Quote", href: "/contact" },
      secondaryCta: { label: "Text Us", href: "sms:+13256658877", external: true },
    },
    intro: {
      heading: "Pool service made simple, consistent, and professional.",
      paragraphOne:
        "Clear water should not require chasing down your pool company. Our service model is built around route consistency, direct communication, and practical next steps that keep your pool easier to manage.",
      paragraphTwo:
        "Whether you need recurring care, algae recovery, filter cleaning, or equipment help, we focus on the same standard every time: protect the pool, communicate clearly, and avoid unnecessary surprises.",
      imagePath: "/images/services-intro-pool-care.jpg",
      imageAlt: "Shipwrecked Pools technician maintaining a residential pool",
    },
    servicesGrid: {
      title: "Our Pool Care Services",
      supportingLine:
        "Professional cleaning, recovery, repair, and maintenance services for Abilene homeowners.",
    },
    expansionGroups: [
      {
        title: "Recurring Pool & Spa Care",
        description:
          "Ongoing care for residential pools, hot tubs, and spas with service scope matched to the property.",
        serviceSlugs: ["weekly-services", "hot-tub-cleaning"],
      },
      {
        title: "Specialty Property & Commercial Service",
        description:
          "Property-specific cleaning and communication for short-term rentals, hotels, and apartment communities.",
        serviceSlugs: [
          "short-term-rental-pool-hot-tub-cleaning",
          "hotel-apartment-pool-cleaning",
        ],
      },
      {
        title: "Equipment & Repairs",
        description:
          "Assessment-led help for pool equipment, filter, pump, and accessible plumbing concerns.",
        serviceSlugs: [
          "pool-equipment-repair",
          "pump-repair-and-installation",
          "filter-repair-replacement",
          "pool-plumbing-repair",
        ],
      },
      {
        title: "Remodeling & Surface Work",
        description:
          "Individually scoped renovation, liner, deck, finish, tile, coping, and professional tile-cleaning services.",
        serviceSlugs: [
          "pool-remodeling",
          "pool-liner-repair",
          "pool-deck-resurfacing-repair",
          "pool-resurfacing-replastering",
          "pool-tile-coping-repair",
          "pool-tile-cleaning",
        ],
      },
    ],
    proof: {
      title: "The Proof is in the Pool",
      supportingLine:
        "See how professional pool care can turn cloudy, green, or neglected water back into something clear, clean, and ready to enjoy.",
    },
    reviews: {
      title: "Why Homeowners Trust Shipwrecked Pools",
      supportingLine: "Rated 5.0 on Google with 85+ reviews from local homeowners.",
    },
    finalCta: {
      title: "Need help choosing the right pool service?",
      summary: "Tell us what your pool is doing now and we can recommend a practical next step.",
      primaryCta: { label: "Get a Quote", href: "/contact" },
      secondaryCta: { label: "Text Us", href: "sms:+13256658877", external: true },
    },
  },
  home: {
    utilityMessage: "Serving Abilene homeowners with professional pool care.",
    proofRibbonItems: [
      "Owner-led by Jason Ligon",
      "Professional pool asset management",
      "LSI-balanced chemistry targets",
      "Abilene + surrounding towns",
      "100% money-back guarantee",
    ],
    hero: {
      eyebrow: "Abilene Pool Service",
      titleLines: [
        "Pool Cleaning & Weekly Pool Service",
        "in Abilene, TX",
      ],
      description:
        "Protect Your Pool System. Get Your Saturdays Back. Keep Water Crystal Clear. Weekly service, green-to-clean recovery, and filter care for Abilene homeowners who want clear water and protected equipment.",
      primaryCta: { label: "Get a Quote", href: "/contact" },
      secondaryCta: { label: "Text Us", href: "sms:+13256658877", external: true },
      tertiaryCta: { label: "Pay Now", href: "https://shipwreckedpools.mypoolportal.com/auth/sign-in" },
      microProofs: [
        "100% Money-Back Guarantee",
        "Abilene + Surrounding Towns",
        "Weekly Service / Green-to-Clean / Filter Care",
      ],
      valueCards: [
        {
          title: "Systematic Weekly Care",
          summary: "Recurring pool service focused on stable water and long-term equipment protection.",
        },
        {
          title: "Data-Driven Chemistry",
          summary: "LSI-balanced targets and proactive checks to reduce avoidable plaster and equipment wear.",
        },
        {
          title: "No Splash-and-Dash Routes",
          summary: "Owner-led standards with dependable routes and clear communication.",
        },
      ],
      serviceChips: [
        "South Abilene",
        "North Abilene",
        "Buffalo Gap",
        "Clyde",
        "Tuscola",
      ],
      mediaPlaceholderTitle: "Photography Placeholder",
      mediaPlaceholderSummary:
        "Feature pool, equipment, and route photos here once brand photography is finalized.",
      guaranteeBadge: "100% Money-Back Guarantee",
    },
    trustPoints: [
      "You should not spend Saturdays maintaining your pool.",
      "Clear water and long-term asset protection are both priorities.",
      "A systematic process, not splash-and-dash service.",
      "100% money-back guarantee.",
    ],
    difference: {
      eyebrow: "Pool care built around service, communication, and trust.",
      title: "The Shipwrecked Difference",
      ctas: {
        primary: { label: "Areas of Service", href: "/locations" },
        secondary: { label: "Contact Us", href: "/contact" },
      },
      cards: [
        {
          title: "Customer Service That Feels Local",
          imagePath: "/images/difference-customer-service.jpg",
          imageAlt: "Shipwrecked Pools customer service",
          summary:
            "You should not have to chase down your pool company. Shipwrecked Pools is built to be responsive, professional, and easy to work with from the first quote to ongoing service.",
        },
        {
          title: "Great Communication, No Guesswork",
          imagePath: "/images/difference-communication.jpg",
          imageAlt: "Shipwrecked Pools service communication",
          summary:
            "From scheduling to service updates, we keep you in the loop so you know what was handled, what we noticed, and what may need attention before small issues become expensive surprises.",
        },
        {
          title: "Trusted by Your Neighbors",
          imagePath: "/images/difference-trusted-neighbors.jpg",
          imageAlt: "Shipwrecked Pools trusted by Abilene neighbors",
          summary:
            `With a ${differenceGoogleRating} Google rating and ${differenceReviewCount} Google Reviews, Shipwrecked Pools is trusted by local homeowners who want dependable care, clear water, and a company they can confidently recommend.`,
        },
      ],
    },
    poolAreaHighlights: {
      title: "Your Pool is our Pool",
      supportingLine:
        "Proudly serving Abilene neighborhoods and nearby communities with pool care that feels personal, local, and dependable.",
      trailingText: "and surrounding areas",
      cards: [
        {
          title: "South Abilene",
          imagePath: "/images/areas-south-abilene.png",
          imageAlt: "Pool service area in South Abilene",
          href: "/locations/south-abilene",
          ariaLabel: "View pool service in South Abilene",
        },
        {
          title: "North Abilene",
          imagePath: "/images/areas-north-abilene.png",
          imageAlt: "Pool service area near North Abilene",
          href: "/locations/north-abilene",
          ariaLabel: "View pool service in North Abilene",
        },
        {
          title: "Clyde",
          imagePath: "/images/areas-clyde.png",
          imageAlt: "Pool service area in Clyde",
          href: "/locations/clyde",
          ariaLabel: "View pool service in Clyde",
        },
        {
          title: "Tuscola",
          imagePath: "/images/areas-tuscola.png",
          imageAlt: "Pool service area in Tuscola",
          href: "/locations/tuscola",
          ariaLabel: "View pool service in Tuscola",
        },
        {
          title: "Merkel",
          imagePath: "/images/areas-merkel.png",
          imageAlt: "Pool service area in Merkel",
          href: "/locations/merkel",
          ariaLabel: "View pool service in Merkel",
        },
        {
          title: "Abilene Wylie",
          imagePath: "/images/areas-abilene-wylie.png",
          imageAlt: "Pool service area near Abilene Wylie",
          href: "/locations/abilene-wylie",
          ariaLabel: "View pool service near Abilene Wylie",
        },
      ] as HomePoolAreaHighlight[],
    },
    reviewsSection: {
      title: "Why Homeowners Trust Shipwrecked Pools",
      supportingLine: "Rated 5.0 on Google with 85+ reviews from local homeowners.",
    },
    poolCareServices: {
      title: "Our Pool Care Services",
      supportingLine:
        "Professional pool cleaning, recovery, repair, and maintenance services for Abilene homeowners.",
      cards: [
        {
          title: "Weekly Services",
          summary:
            "Consistent recurring care to keep your water clear, balanced, and ready to enjoy week after week.",
          href: "/services/weekly-services",
          icon: "weekly",
        },
        {
          title: "Algae Removal",
          summary:
            "Green-to-clean recovery for pools that need focused attention, cleanup, and chemistry correction.",
          href: "/services/algae-removal",
          icon: "algae",
        },
        {
          title: "Acid Wash",
          summary:
            "A deeper surface-cleaning service for pools that need stain, buildup, or discoloration attention.",
          href: "/services/acid-wash",
          icon: "acidWash",
        },
        {
          title: "Drain and Refill",
          summary:
            "Controlled draining and refilling support when your pool needs a fresh start or water reset.",
          href: "/services/drain-and-refill",
          icon: "drainRefill",
        },
        {
          title: "Filter Cleaning",
          summary:
            "Filter maintenance that helps improve circulation, water clarity, and overall system performance.",
          href: "/services/filter-cleaning",
          icon: "filter",
        },
        {
          title: "Pump Repair and Installation",
          summary:
            "Help with pool pump issues, replacements, and installation so your system can move water properly.",
          href: "/services/pump-repair-and-installation",
          icon: "pump",
        },
        {
          title: "One Time Cleans",
          summary:
            "A one-time cleanup for special situations, seasonal needs, parties, storms, or getting a pool back on track.",
          href: "/services/one-time-cleans",
          icon: "oneTime",
        },
        {
          title: "Sand Replacement",
          summary:
            "Replacement of old filter sand to help restore filtration performance and support cleaner water.",
          href: "/services/sand-replacement",
          icon: "sand",
        },
      ] as HomePoolCareService[],
    },
    coverage: {
      eyebrow: "Service Coverage",
      title: "Serving Abilene homeowners and surrounding towns.",
      chips: [
        "South Abilene",
        "North Abilene",
        "Baird",
        "Buffalo Gap",
        "Clyde",
        "Hamby",
        "Hawley",
        "Merkel",
        "Potosi",
        "Tuscola",
        "Tye",
      ],
    },
    preServicesCta: {
      title: "Need recurring pool care that protects your weekends and your equipment?",
      summary: "Start with a quick quote or text us directly to confirm route availability in your area.",
      primaryCta: { label: "Get a Quote", href: "/contact" },
      secondaryCta: { label: "Text Us", href: "sms:+13256658877", external: true },
    },
    featuredServices: {
      eyebrow: "Featured Services",
      title: "Services built for clear water, protected equipment, and fewer surprises.",
      description:
        "Explore three high-priority services that anchor our homeowner maintenance strategy in Abilene and surrounding towns.",
      modules: [
        {
          slug: "weekly-services",
          label: "Foundational Service",
          mediaPlaceholderTitle: "Weekly Route Care Placeholder",
          mediaPlaceholderSummary:
            "Use local route, pool-surface, and equipment-pad photography here once the brand shoot is complete.",
          comparison: {
            withTitle: "With proactive Shipwrecked care",
            withPoints: [
              "Consistent cleaning and balancing on a dependable schedule",
              "LSI-balanced chemistry targets that support long-term pool-system health",
              "Early communication when conditions or equipment need attention",
            ],
            withoutTitle: "Without proactive attention",
            withoutPoints: [
              "Chemistry can drift between irregular check-ins",
              "Debris and sanitation issues can build up over time",
              "Equipment concerns are often noticed later in the cycle",
            ],
          },
        },
        {
          slug: "algae-removal",
          label: "Corrective Reset Service",
          mediaPlaceholderTitle: "Green-to-Clean Placeholder",
          mediaPlaceholderSummary:
            "Use staged treatment and recovery imagery to show the structured remediation process.",
          comparison: {
            withTitle: "With proactive Shipwrecked care",
            withPoints: [
              "A structured recovery plan based on pool condition and circulation limits",
              "Targeted chemistry control through each clearing stage",
              "A prevention-focused balancing roadmap after stabilization",
            ],
            withoutTitle: "Without proactive attention",
            withoutPoints: [
              "Algae pressure and cloudy water can persist longer",
              "Recovery can feel trial-and-error without a staged process",
              "Follow-up balancing is easier to miss after visual improvement",
            ],
          },
        },
        {
          slug: "filter-cleaning",
          label: "Performance Service",
          mediaPlaceholderTitle: "Filter Cleaning Placeholder",
          mediaPlaceholderSummary:
            "Use component and cleanout visuals to communicate circulation-focused maintenance.",
          comparison: {
            withTitle: "With proactive Shipwrecked care",
            withPoints: [
              "Filter maintenance that supports stronger circulation performance",
              "Pressure and flow checks to confirm post-service operation",
              "A clearer maintenance cadence for long-term reliability",
            ],
            withoutTitle: "Without proactive attention",
            withoutPoints: [
              "Restricted flow can reduce clarity support between visits",
              "Elevated pressure can put additional stress on the system",
              "Performance declines may be noticed only after water quality drops",
            ],
          },
        },
      ],
      secondaryTitle: "Additional specialty services",
      secondaryDescription:
        "When your pool needs a reset beyond recurring care, these services round out our support.",
    },
    whyUsTitle: "Why homeowners choose Shipwrecked Pools",
    whyUsPoints: [
      "Professional pool asset management mindset from day one",
      "LSI-balanced chemistry and proactive equipment audits",
      "Local owner-led standards with dependable route consistency",
    ],
    servicePreviewIntro:
      "From recurring cleanings to specialty resets, each service is designed for long-term reliability and practical homeownership support.",
    ownerStory: {
      title: "Owner-led by Jason Ligon",
      summary:
        "Jason brings a business-management and entrepreneurship background to pool care, treating each pool as a major home system that deserves proactive, professional oversight.",
      points: [
        "Family-oriented and local to Abilene",
        "Focus on long-term equipment and plaster health",
        "Structured service with measurable chemistry targets",
      ],
    },
    commitment: {
      eyebrow: "Our Commitment",
      title: "Your pool is a major home asset. It deserves systematic, professional care.",
      paragraphs: [
        "Shipwrecked Pools is built on Jason Ligon’s owner-led standard: treat pool care as long-term asset management, not a quick visual cleanup.",
        "From recurring maintenance to corrective resets, we focus on clear communication, dependable process, and proactive decisions that protect equipment and plaster over time.",
      ],
      primaryCta: { label: "Get a Quote", href: "/contact" },
      secondaryCta: { label: "Learn About Jason", href: "/about" },
      mediaPlaceholderTitle: "Owner Story Visual Placeholder",
      mediaPlaceholderSummary:
        "Replace with owner/team route photography and equipment-pad visuals to reinforce the asset-management story.",
      highlights: [
        "Business-management mindset applied to pool operations",
        "Data-driven care with LSI-balanced chemistry targets",
        "Family-oriented local ownership in Abilene",
      ],
    },
    guaranteeSection: {
      eyebrow: "Guarantee & Standards",
      title: "Professional accountability backed by a clear guarantee.",
      description:
        "Our service model is designed for homeowners who want consistency, proactive communication, and long-term protection for expensive pool systems.",
      guaranteeBadge: "100% Money-Back Guarantee",
      detail:
        "If service quality falls short, we address it directly and make it right under our guarantee-first standard.",
    },
    locationsIntro:
      "Active service routes across Abilene and nearby towns keep scheduling predictable and support practical response windows.",
    resourcesIntro:
      "Practical resources for homeowners, plus clear paths to professional support when needed.",
    resourcesSection: {
      eyebrow: "Homeowner Resources",
      title: "DIY confidence, practical education, and local career opportunities.",
      description:
        "Use these resources to stay informed between visits, explore pool-care education, or join our team.",
    },
    finalCta: {
      eyebrow: "Ready to Get Started?",
      title: "Take the next step with Shipwrecked Pools today.",
      summary:
        "Choose the action that fits your situation: request service, text us directly, or handle billing securely.",
    },
  },
  resources: [
    {
      title: "DIY Pool Care",
      summary:
        "Get the free pool care cheat sheet and stay confident between professional visits.",
      href: "/diy-pool-care",
      ctaLabel: "Explore DIY",
    },
    {
      title: "Pool Care Blog",
      summary:
        "Read maintenance-focused guidance covering chemistry, filtration, algae, and seasonal care.",
      href: "/blog",
      ctaLabel: "View Articles",
    },
    {
      title: "Join Our Team",
      summary:
        "Learn about career opportunities, benefits, and what we look for in new team members.",
      href: "/careers",
      ctaLabel: "View Careers",
    },
  ] as ResourcePreview[],
  services: [
    {
      slug: "weekly-services",
      name: "Weekly Services",
      seoTitle: "Weekly Pool Service in Abilene, TX | Shipwrecked Pools",
      seoH1: "Weekly Pool Service in Abilene, TX",
      seoDescription:
        "Recurring weekly pool service in Abilene with cleaning, chemistry checks, debris removal, and equipment watchfulness from Shipwrecked Pools.",
      summary:
        "Consistent recurring pool care designed to keep water clear and your system performing week after week.",
      supportingParagraph:
        "Weekly residential pool cleaning and maintenance helps homeowners stay ahead of chemistry drift, debris buildup, circulation concerns, and avoidable equipment strain. Weekly is the standard recurring cadence; heavier use, weather, or the pool's starting condition may call for separately discussed corrective work or a different short-term service plan.",
      idealFor: "Homeowners who want dependable professional pool cleaning, ongoing water testing and chemical adjustment, and clear service communication.",
      problemStatement:
        "Without a consistent route rhythm, small water and equipment issues can stack up and turn into larger, more expensive pool problems.",
      solutionStatement:
        "Our weekly plan keeps cleaning, testing, balancing, and visual system checks on a repeatable cadence so water stays easier to manage.",
      bullets: [
        "Routine cleaning, skimming, and debris removal",
        "LSI-balanced chemistry testing and dosing",
        "Proactive visual checks for equipment concerns",
      ],
      process: [
        "Inspect water condition and circulation performance",
        "Complete skimming, brushing, and debris removal tasks",
        "Test and adjust chemistry targets based on current readings",
        "Log findings and flag any emerging equipment issues",
      ],
      standards: [
        "Clearer water through consistent weekly attention",
        "Protected equipment through proactive checks",
        "Fewer avoidable surprises from early communication",
      ],
      outcomes: [
        "Cleaner water with less week-to-week drift",
        "Better long-term equipment reliability",
        "Fewer surprise maintenance disruptions",
      ],
      faqs: [
        {
          question: "What is included in weekly pool service?",
          answer:
            "The current weekly-service scope includes skimming, brushing, debris removal, water testing and chemical adjustment, visual circulation and equipment checks, and an After Service Pool Report. Routine chemicals are billed separately for new weekly-service customers, and filter cleaning, repairs, initial cleanup, and other non-routine work are quoted separately.",
        },
        {
          question: "How often should a pool be professionally cleaned?",
          answer:
            "Shipwrecked's recurring residential service follows a weekly cadence because regular cleaning, water testing, and circulation observation help limit week-to-week drift. The appropriate plan still depends on the pool's use, weather exposure, condition, and current service needs.",
        },
        {
          question: "When might more frequent attention be appropriate?",
          answer:
            "Heavy use, severe weather, unusual debris, algae, changing water condition, or an equipment interruption can create needs beyond a routine weekly visit. We assess the condition and discuss supported corrective work or follow-up rather than promising automatic twice-weekly availability.",
        },
        {
          question: "How is weekly service different from one-time cleaning?",
          answer:
            "Weekly service is an ongoing maintenance relationship for routine cleaning, water care, observation, and reporting. A one-time clean addresses an agreed catch-up need, while a green or algae-affected pool may require a separately quoted Green-to-Clean recovery before routine care is appropriate.",
        },
        {
          question: "Are corrective repairs included in weekly service?",
          answer:
            "No. We report visible equipment concerns and explain practical next steps, but equipment repairs, filter cleaning, initial cleanup, and other non-routine or corrective work are separately approved and quoted.",
        },
        {
          question: "What happens when I start or switch to weekly pool service?",
          answer:
            "We visit your pool on site and confirm technician availability before setting your first service date. If initial cleanup is needed, it is charged as a one-time or green-to-clean service. For new weekly-service customers, routine chemicals are billed separately. After each visit, you receive an After Service Pool Report through Skimmer.",
        },
      ],
      relatedServices: ["filter-cleaning", "pump-repair-and-installation", "one-time-cleans", "algae-removal"],
      ctaTitle: "Ready to hand off weekly pool care?",
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "Consistent weekly care helps pools stay clear, stable, and easier to manage over time.",
        beforeImagePath: "/images/proof-weekly-services-before.jpg",
        afterImagePath: "/images/proof-weekly-services-after.jpg",
      },
    },
    {
      slug: "hot-tub-cleaning",
      name: "Hot Tub & Spa Cleaning",
      seoTitle: "Hot Tub & Spa Cleaning in Abilene, TX | Shipwrecked Pools",
      seoH1: "Hot Tub & Spa Cleaning in Abilene, TX",
      seoDescription:
        "Residential hot tub and spa cleaning in Abilene with debris removal, surface cleaning, water testing, balancing, and visible equipment observations.",
      summary:
        "Recurring or one-time residential hot tub and spa cleaning with water care matched to the condition we find.",
      supportingParagraph:
        "Service can include debris removal, brushing or vacuuming accessible surfaces, accessible filter cleaning, water testing, chemical adjustment, circulation observation, and a visual look at accessible equipment. The appropriate scope, reporting needs, and recurring schedule are confirmed after we understand the spa, its use, and its current condition.",
      idealFor:
        "Homeowners who want professional hot tub cleaning, spa cleaning, or recurring spa maintenance in Abilene.",
      problemStatement:
        "A hot tub can collect debris and develop water-balance or circulation concerns quickly, while its smaller water volume makes guesswork especially unhelpful.",
      solutionStatement:
        "We assess the current condition, clean the accessible surfaces and waterline, test and adjust the water, observe circulation and visible equipment, and explain any separately quoted corrective work that may be appropriate.",
      bullets: [
        "Debris removal, brushing, vacuuming, and accessible filter cleaning as agreed",
        "Water testing, balancing, and chemical adjustment",
        "Circulation observations, visible equipment notes, and service communication",
      ],
      process: [
        "Share the service address, spa details, current water condition, and photos when available",
        "Confirm whether one-time care or a recurring service relationship fits the request",
        "Complete the agreed cleaning, water-care, and visible-condition observations",
        "Communicate what was handled and any additional quoted service the condition may require",
      ],
      standards: [
        "A service scope based on the spa's current condition",
        "Clear communication about observed water or equipment concerns",
        "No assumed repair work or unapproved corrective service",
      ],
      outcomes: [
        "A cleaner hot tub or spa with professionally tested water",
        "A practical recurring-care option when ongoing service is a fit",
        "Clear next steps when the condition calls for additional quoted work",
      ],
      faqs: [
        {
          question: "Do you offer both hot tub cleaning and spa cleaning?",
          answer:
            "Yes. We use both terms for professional care of a residential hot tub or spa. The agreed scope depends on the vessel, water condition, access, and service needs.",
        },
        {
          question: "Can hot tub or spa cleaning be recurring?",
          answer:
            "Recurring care may be available after we review the property, current condition, requested scope, and route fit. We agree on the service schedule rather than assuming one interval fits every spa.",
        },
        {
          question: "Is equipment repair included?",
          answer:
            "No. We can note visible equipment or circulation concerns, but jet, heater, electrical, plumbing, and other repair work are not included in this cleaning service.",
        },
        {
          question: "Could the water need additional corrective service?",
          answer:
            "Yes. Some conditions may call for water replacement or other corrective work. If so, we explain the concern and quote any supported additional service separately before proceeding.",
        },
        {
          question: "What should I send with a hot tub or spa cleaning quote request?",
          answer:
            "Send the service address, whether you want one-time or recurring care, the approximate spa size, current water condition, access details, known concerns, and recent photos when available.",
        },
      ],
      relatedServices: ["short-term-rental-pool-hot-tub-cleaning"],
      ctaTitle: "Request a hot tub or spa cleaning quote",
      showProofSection: false,
    },
    {
      slug: "short-term-rental-pool-hot-tub-cleaning",
      name: "Short-Term Rental Pool & Hot Tub Cleaning",
      seoTitle: "Airbnb & Short-Term Rental Pool and Hot Tub Cleaning in Abilene, TX",
      seoH1: "Pool & Hot Tub Cleaning for Airbnb and Short-Term Rentals",
      seoDescription:
        "Pool and hot tub cleaning for Airbnb and short-term rental properties in Abilene, with agreed scheduling, water care, service documentation, and owner communication.",
      summary:
        "Property-specific pool and hot tub care for short-term-rental owners, remote hosts, and property managers.",
      supportingParagraph:
        "We work with short-term-rental owners, Airbnb hosts, remote owners, and property managers. We agree on service frequency and scope based on the property, water features, access, expected use, and communication needs. Service may cover a pool, a hot tub, or both, with documentation and escalation practices defined for the account.",
      idealFor:
        "Short-term-rental owners, Airbnb hosts, remote owners, and property managers who need an agreed pool or hot tub service plan.",
      problemStatement:
        "A vacation-rental pool or spa can see changing use, weather, debris, and water conditions while the owner or manager is away from the property.",
      solutionStatement:
        "We build a recurring cleaning and water-care scope for the property, document applicable service details, communicate with the designated contact, and escalate visible water or equipment concerns for a decision.",
      bullets: [
        "Recurring pool cleaning, hot tub cleaning, or both",
        "Water testing, balancing, debris removal, and surface cleaning",
        "Agreed documentation and communication with the owner or manager",
      ],
      process: [
        "Review the property, water features, access plan, expected use, and designated contact",
        "Agree on service scope, frequency, documentation, and issue-escalation expectations",
        "Perform scheduled cleaning, water care, and visible equipment observations",
        "Send applicable service details and flag issues that need owner or manager direction",
      ],
      standards: [
        "A property-specific schedule instead of a one-size-fits-all promise",
        "Clear communication with the designated owner or manager contact",
        "Separate approval and quoting for supported corrective or repair work",
      ],
      outcomes: [
        "More consistent professional oversight of rental-property water care",
        "Better visibility for owners and managers who may be off site",
        "A clear escalation path when changing conditions or visible issues are found",
      ],
      faqs: [
        {
          question: "Is Shipwrecked Pools affiliated with Airbnb or VRBO?",
          answer:
            "No. Airbnb and VRBO are referenced only to describe the type of short-term-rental property being serviced. Shipwrecked Pools is not affiliated with or endorsed by either platform.",
        },
        {
          question: "Do you provide property management or guest services?",
          answer:
            "No. We provide the agreed pool and hot tub cleaning and water-care scope. Reservations, guest communication, turnovers, and general property management remain with the owner or manager.",
        },
        {
          question: "Will the pool or hot tub always be guest-ready?",
          answer:
            "No service can guarantee readiness regardless of weather, guest use, contamination, equipment failure, or other events. We perform the agreed service, document applicable observations, and communicate issues that need attention.",
        },
        {
          question: "How often do you service a short-term rental?",
          answer:
            "Frequency and scope are agreed for the individual property based on its pool or spa, use pattern, access, condition, and service requirements. We do not apply a fixed schedule to every rental.",
        },
        {
          question: "What should I send with a short-term-rental service quote request?",
          answer:
            "Send the Abilene-area service address, details about each pool or hot tub, current condition, access plan, preferred schedule, designated contact, reporting needs, known issues, and recent photos when available.",
        },
      ],
      relatedServices: [
        "hot-tub-cleaning",
        "weekly-services",
        "pool-equipment-repair",
      ],
      resourceLinks: [
        { href: "/pool-service-reports", label: "How Pool Service Reports Work" },
      ],
      ctaTitle: "Request a short-term-rental pool or hot tub service quote",
      showProofSection: false,
    },
    {
      slug: "hotel-apartment-pool-cleaning",
      name: "Hotel & Apartment Pool Cleaning",
      seoTitle: "Hotel & Apartment Pool Cleaning in Abilene, TX | Shipwrecked Pools",
      seoH1: "Hotel & Apartment Pool Cleaning in Abilene, TX",
      seoDescription:
        "Recurring commercial pool cleaning for hotels, apartment communities, and multifamily properties in Abilene, with reporting and manager communication.",
      summary:
        "Recurring commercial pool cleaning for hotels, apartment communities, and multifamily properties in Abilene.",
      supportingParagraph:
        "We work with hotel operators, apartment managers, property managers, ownership groups, and facilities or maintenance contacts. Each property receives a custom scope and quote based on its pool, access, operating needs, agreed frequency, communication contacts, and documentation requirements. The owner or operator retains regulatory, inspection, staffing, and facility-management responsibilities.",
      idealFor:
        "Hotel operators, apartment managers, property managers, ownership groups, and facilities or maintenance contacts.",
      problemStatement:
        "Commercial and multifamily pools need consistent water care, cleaning, access coordination, and useful communication across multiple responsible contacts.",
      solutionStatement:
        "We define a recurring commercial pool-cleaning plan, perform the agreed cleaning and water-care tasks, observe accessible equipment conditions, document applicable service details, and escalate concerns to the designated contact.",
      bullets: [
        "Recurring debris removal, brushing, cleaning, and water adjustment",
        "Visible equipment observations and issue escalation",
        "Access coordination, documentation, and manager communication",
      ],
      process: [
        "Review the property, pool condition, access requirements, contacts, and requested service scope",
        "Agree on service frequency, chemical-service coordination, documentation, and escalation practices",
        "Perform scheduled commercial pool cleaning, water testing, adjustment, and visible observations",
        "Communicate applicable service details and separately quote supported follow-up work",
      ],
      standards: [
        "A custom scope and quote based on the property and service requirements",
        "Clear coordination with the property's designated contacts",
        "Documented observations without assuming the operator's regulatory responsibilities",
      ],
      outcomes: [
        "Consistent professional cleaning and water-care support",
        "Useful visibility for property and facilities teams",
        "A defined path for reviewing water or equipment concerns",
      ],
      faqs: [
        {
          question: "What types of commercial properties do you serve?",
          answer:
            "This service is intended for hotels, apartment communities, and multifamily properties in the Abilene service area. Property fit and route availability are confirmed before service begins.",
        },
        {
          question: "How is commercial pool service scheduled?",
          answer:
            "Service frequency is agreed after we review the property, pool, access, operating needs, and requested scope. We do not publish a fixed staffing frequency or one schedule for every property.",
        },
        {
          question: "Do you handle health-department inspections or guarantee compliance?",
          answer:
            "No. Shipwrecked does not assume the owner's or operator's responsibility for health-department inspections, code compliance, required staffing, recordkeeping, or facility management, and does not guarantee regulatory compliance.",
        },
        {
          question: "Are chemicals and repair work included?",
          answer:
            "Chemical-service coordination and any supported repair work are defined for the individual account. No fixed chemical inclusion or repair scope is assumed; additional work is separately approved and quoted when appropriate.",
        },
        {
          question: "What should I send with a hotel or apartment pool-cleaning quote request?",
          answer:
            "Send the property address, property type, pool details, current condition, requested frequency, access requirements, designated contacts, documentation needs, known concerns, and current photos when available.",
        },
      ],
      relatedServices: [
        "pool-equipment-repair",
        "filter-cleaning",
        "free-pool-chemical-delivery",
      ],
      resourceLinks: [
        { href: "/pool-service-reports", label: "Pool Service Reporting & Picture Proof" },
      ],
      ctaTitle: "Request a hotel or apartment pool-cleaning quote",
      showProofSection: false,
    },
    {
      slug: "bi-weekly-services",
      name: "Bi-Weekly Services",
      seoTitle: "Bi-Weekly Pool Service in Abilene, TX | Shipwrecked Pools",
      seoH1: "Bi-Weekly Pool Service in Abilene, TX",
      seoDescription:
        "Bi-weekly pool service information for existing Abilene customers. New recurring customers enroll weekly; existing agreements are unchanged.",
      summary:
        "New recurring pool-service customers are enrolled on a weekly schedule. Existing customer agreements are unchanged.",
      supportingParagraph:
        "This page provides service information for customers with existing bi-weekly agreements.",
      idealFor: "Customers with existing bi-weekly service agreements.",
      problemStatement:
        "Pools managed without a schedule can drift out of range, especially when maintenance happens reactively instead of by plan.",
      solutionStatement:
        "For customers with existing agreements, bi-weekly service provides repeatable cleaning and balancing visits with clear recommendations to support stability between appointments.",
      bullets: [
        "Scheduled cleaning and debris removal every other week",
        "Chemistry testing and adjustment during each visit",
        "Service notes with practical recommendations between visits",
      ],
      process: [
        "Evaluate current water condition and circulation performance",
        "Complete cleaning and balancing tasks for the service interval",
        "Flag any conditions that may require more frequent service support",
        "Provide follow-up guidance to support stability between visits",
      ],
      standards: [
        "A practical recurring plan instead of guesswork",
        "Clear communication on what to watch between visits",
        "Consistent professional oversight for long-term pool health",
      ],
      outcomes: [
        "Improved consistency compared with unstructured maintenance",
        "Clearer understanding of pool condition between visits",
        "A practical path to recurring professional pool support",
      ],
      faqs: [
        {
          question: "How is bi-weekly different from weekly service?",
          answer:
            "Existing bi-weekly agreements follow an every-other-week schedule. New recurring pool-service customers are enrolled on a weekly schedule. Existing customer agreements are unchanged.",
        },
        {
          question: "Can an existing bi-weekly customer switch to weekly service?",
          answer:
            "Yes. If pool conditions or usage change, recurring plans can be adjusted to a more frequent schedule.",
        },
        {
          question: "Do you still check chemistry on bi-weekly visits?",
          answer:
            "Yes. Chemistry is tested and adjusted during each service visit.",
        },
      ],
      relatedServices: ["weekly-services", "filter-cleaning", "one-time-cleans"],
      ctaTitle: "Starting recurring pool service? Explore weekly care.",
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "A structured bi-weekly plan helps homeowners stay ahead of preventable water and maintenance issues.",
        beforeImagePath: "/images/proof-bi-weekly-services-before.jpg",
        afterImagePath: "/images/proof-bi-weekly-services-after.jpg",
      },
    },
    {
      slug: "algae-removal",
      name: "Algae Removal",
      seoTitle: "Green-to-Clean Pool Cleanup in Abilene, TX | Shipwrecked Pools",
      seoH1: "Green-to-Clean Pool Cleanup in Abilene, TX",
      seoDescription:
        "Turn a green pool clear again with professional algae cleanup and chemistry correction in Abilene from Shipwrecked Pools.",
      summary:
        "Corrective Green-to-Clean service for algae-affected pools that need more than routine weekly maintenance.",
      supportingParagraph:
        "Recovery is handled as separate corrective work before routine weekly care when the pool's current condition requires it. Green or cloudy water can follow weather, heavy debris, chemistry drift, or an equipment interruption; the treatment sequence and follow-up depend on what we find in the water and circulation system.",
      idealFor: "Pools with visible algae growth, cloudy water, or failed sanitizer balance.",
      problemStatement:
        "Visible algae and green or severely cloudy water can overwhelm normal maintenance. The starting condition, chemistry, debris load, and circulation all affect the recovery path.",
      solutionStatement:
        "We assess the pool's current condition and circulation, plan the needed cleanup and treatment stages, and make follow-up chemistry adjustments as the water responds.",
      bullets: [
        "Diagnosis of algae severity and circulation limits",
        "Targeted treatment and recovery sequencing",
        "Follow-up balancing and prevention roadmap",
      ],
      process: [
        "Assess water clarity, visible algae, debris, chemistry, and circulation",
        "Set a cleanup and treatment sequence based on the pool's starting condition",
        "Brush, clean, treat, and support filtration through the recovery stages",
        "Recheck progress, adjust as needed, and explain the next maintenance step",
      ],
      standards: [
        "Process-driven cleanup instead of one-step guessing",
        "Clear communication through each recovery stage",
        "Follow-up guidance to reduce recurring bloom risk",
      ],
      outcomes: [
        "Faster recovery to healthy water",
        "Reduced recurrence through corrective balancing",
        "Clear next steps for ongoing stability",
      ],
      faqs: [
        {
          question: "Can you help if my pool is fully green?",
          answer:
            "Yes. Green-to-Clean service is intended for algae-affected pools with poor water clarity. We first assess the current condition because the work and follow-up can vary from pool to pool.",
        },
        {
          question: "Is algae cleanup a one-step treatment?",
          answer:
            "Not necessarily. Recovery may require staged treatment, cleaning, filtration support, and follow-up balancing. We do not promise that every algae condition will clear in one visit or within a fixed timeframe.",
        },
        {
          question: "Can weekly pool service take over after recovery?",
          answer:
            "When the pool is ready for routine care and the route is available, weekly pool service can help maintain cleaning and chemistry after the separately quoted corrective work is complete.",
        },
        {
          question: "What should I send with a Green-to-Clean quote request?",
          answer:
            "Share the service address, current water color and visibility, how long the condition has been present, any recent treatment, and any known circulation or equipment concerns. Current photos are also helpful when available.",
        },
      ],
      relatedServices: ["one-time-cleans", "filter-cleaning", "weekly-services"],
      ctaTitle: "Need a green-to-clean recovery plan?",
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "Structured algae recovery can take water from neglected and cloudy to clear and manageable with the right follow-up.",
        beforeImagePath: "/images/proof-algae-removal-before.jpg",
        afterImagePath: "/images/proof-algae-removal-after.jpg",
      },
    },
    {
      slug: "acid-wash",
      name: "Acid Wash",
      seoTitle: "Pool Acid Wash in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Acid Wash in Abilene, TX",
      seoDescription:
        "Acid-wash assessment and service for stubborn plaster staining, scale, or discoloration in Abilene.",
      showBenefitsSection: false,
      summary:
        "Condition-based acid-wash service for plaster staining, scale, or discoloration that standard cleaning may not correct.",
      supportingParagraph:
        "An acid wash is considered only after reviewing the pool finish and current condition. It is not resurfacing or structural, crack, or leak repair, and it does not guarantee that every stain will be removed.",
      idealFor: "Plaster pools with stubborn staining that standard cleaning cannot resolve.",
      problemStatement:
        "Staining, scale, and discoloration can remain on a plaster finish after normal cleaning, but not every appearance issue is suitable for acid washing.",
      solutionStatement:
        "We assess suitability, plan the drain-and-treat sequence, perform the agreed acid-wash service, and complete the refill and chemistry startup steps.",
      bullets: [
        "Drain-and-prepare workflow",
        "Controlled surface treatment by condition",
        "Managed refill and chemistry restart",
      ],
      process: [
        "Review the plaster finish, staining or buildup, and overall condition for suitability",
        "Plan the drain, treatment, refill, and restart sequence",
        "Perform the agreed acid-wash steps based on the observed condition",
        "Refill, restart chemistry, and explain ongoing care recommendations",
      ],
      standards: [
        "Condition-based treatment planning",
        "Careful restart and chemistry stabilization",
        "Clear communication on post-service care",
      ],
      outcomes: [
        "Cleaner visual finish",
        "A reset foundation for regular maintenance",
        "Improved owner confidence in pool condition",
      ],
      faqs: [
        {
          question: "Is acid wash for every stained pool?",
          answer:
            "No. Suitability depends on the pool finish and its current condition. Acid washing is not resurfacing or structural, crack, or leak repair, and it does not guarantee removal of every stain.",
        },
        {
          question: "Do you rebalance the pool after refill?",
          answer:
            "Yes. Post-service startup includes balancing and verification steps after the refill process.",
        },
        {
          question: "What should I send with an acid-wash quote request?",
          answer:
            "Share the service address, the pool finish if known, where the staining or discoloration appears, any prior cleaning or treatment, and current photos when available.",
        },
        {
          question: "Will acid wash replace regular maintenance?",
          answer:
            "No. Acid washing is separate corrective work. After the refill and chemistry startup, ongoing pool care is still important for maintaining the resulting condition.",
        },
      ],
      relatedServices: [
        "drain-and-refill",
        "pool-resurfacing-replastering",
        "pool-tile-cleaning",
        "weekly-services",
      ],
      ctaTitle: "Is your pool finish ready for a reset?",
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "When the finish and condition are suitable, an acid wash may improve appearance and provide a cleaner starting point for ongoing maintenance. Results depend on the surface and staining present.",
        beforeImagePath: "/images/services/acid-wash-proof-before.png",
        afterImagePath: "/images/services/acid-wash-proof-after.png",
      },
    },
    {
      slug: "drain-and-refill",
      name: "Drain & Refill",
      seoTitle: "Pool Drain & Refill in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Drain & Refill in Abilene, TX",
      seoDescription:
        "Reset difficult water chemistry with a managed drain and refill service for Abilene pools.",
      showBenefitsSection: false,
      summary:
        "Managed water replacement for persistent chemistry conditions, including total dissolved solids or imbalance that standard adjustments are not correcting.",
      supportingParagraph:
        "We review the current water and pool condition before recommending a drain and refill. This service replaces water and restarts chemistry; it does not repair leaks, liners, structural problems, or pool surfaces.",
      idealFor: "Pools with persistent chemistry drift that no longer responds to standard balancing.",
      problemStatement:
        "Some water conditions remain difficult to manage despite standard balancing, but draining and refilling is not the right answer to every chemistry or pool problem.",
      solutionStatement:
        "We assess whether water replacement fits the observed condition, coordinate the drain and refill sequence, and complete the supported chemistry and circulation startup checks.",
      bullets: [
        "Site-safe draining and refill process",
        "Post-fill chemistry startup",
        "Equipment and circulation verification",
      ],
      process: [
        "Review the reported water problem, current chemistry condition, and pool setup",
        "Confirm whether drain and refill is an appropriate water-reset service",
        "Coordinate the agreed draining, refilling, and chemistry startup sequence",
        "Check circulation after startup and explain the next maintenance step",
      ],
      standards: [
        "Reset planning based on current pool condition",
        "Controlled startup after refill",
        "Practical communication on next maintenance steps",
      ],
      outcomes: [
        "A cleaner chemistry baseline",
        "Improved control over sanitizer and pH",
        "Stronger foundation for recurring care",
      ],
      faqs: [
        {
          question: "When is drain and refill usually recommended?",
          answer:
            "It is typically considered when water chemistry remains unstable despite standard balancing efforts.",
        },
        {
          question: "Do you handle chemistry startup after refill?",
          answer:
            "Yes. We include startup balancing and system checks to establish a practical maintenance baseline.",
        },
        {
          question: "Will this fix every pool issue by itself?",
          answer:
            "No. Drain and refill addresses an appropriate water-reset condition; it is not leak, liner, structural, or resurfacing work and is not a universal fix for every chemistry problem.",
        },
        {
          question: "What should I send with a drain-and-refill quote request?",
          answer:
            "Share the service address, the water or chemistry concern, how long it has been present, any recent treatments or test information, and current pool and equipment photos when available.",
        },
      ],
      relatedServices: ["acid-wash", "weekly-services", "filter-cleaning"],
      ctaTitle: "Need a chemistry reset for your pool?",
    },
    {
      slug: "filter-cleaning",
      name: "Filter Cleaning",
      seoTitle: "Pool Filter Cleaning in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Filter Cleaning in Abilene, TX",
      seoDescription:
        "Improve circulation and water clarity with professional cartridge, DE, or sand-filter cleaning in Abilene.",
      showBenefitsSection: false,
      summary:
        "Professional cleaning for cartridge, DE, and sand pool filters to support circulation and water clarity.",
      supportingParagraph:
        "A dirty or restricted filter can reduce water movement and make clarity harder to maintain. Cleaning is based on the filter type and observed condition; damaged or worn equipment may need separate repair or replacement work.",
      idealFor: "Pools with reduced flow, elevated pressure, or declining clarity.",
      problemStatement:
        "Debris and buildup can restrict filtration, reduce circulation performance, and make routine pool care less effective.",
      solutionStatement:
        "We identify the filter type, clean the appropriate media or internal components, inspect the condition we can observe, and check operation after restart.",
      bullets: [
        "Filter breakdown and cleanout",
        "Flow and pressure review",
        "Recommended maintenance cadence",
      ],
      process: [
        "Confirm whether the pool uses a cartridge, DE, or sand filter and review its current condition",
        "Shut down the system and access the filter according to its type",
        "Clean the appropriate media or internal components and note visible wear or damage",
        "Restart the system, check circulation and pressure, and communicate any separate equipment concern",
      ],
      standards: [
        "Better circulation support through clean filtration",
        "Lower avoidable stress on pump equipment",
        "Clear maintenance guidance for ongoing reliability",
      ],
      outcomes: [
        "Better circulation efficiency",
        "Cleaner water support between visits",
        "Lower stress on pump and system components",
      ],
      faqs: [
        {
          question: "How do I know if my filter needs cleaning?",
          answer:
            "Common signs include weaker circulation, higher pressure readings, and declining water clarity.",
        },
        {
          question: "Which filter types does Shipwrecked clean?",
          answer:
            "We clean cartridge, DE, and sand pool filters. The service steps depend on the filter type and its condition.",
        },
        {
          question: "Will cleaning fix every filter or circulation problem?",
          answer:
            "No. Cleaning addresses dirt and restriction, but it cannot correct every damaged, worn, or malfunctioning filter or equipment issue. We communicate visible condition concerns and practical next steps.",
        },
        {
          question: "What should I send with a filter-cleaning quote request?",
          answer:
            "Share the service address, filter type if known, any change in flow, clarity, or pressure, and when it was last cleaned if you know. Photos of the filter label and equipment area can also help.",
        },
      ],
      relatedServices: [
        "filter-repair-replacement",
        "pool-equipment-repair",
        "weekly-services",
      ],
      ctaTitle: "Need your filtration performance back?",
    },
    {
      slug: "sand-replacement",
      name: "Sand Replacement",
      seoTitle: "Pool Filter Sand Replacement in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Filter Sand Replacement in Abilene, TX",
      seoDescription:
        "Professional sand-filter media replacement and system restart service in Abilene from Shipwrecked Pools.",
      showBenefitsSection: false,
      showProofSection: false,
      summary:
        "Sand-filter media replacement when the filter condition indicates that cleaning alone may not be the appropriate next step.",
      supportingParagraph:
        "A sand filter can lose effectiveness as its media and internal condition change, but not every clarity or circulation issue requires sand replacement. Filter cleaning or another equipment service may be more appropriate after inspection.",
      idealFor: "Sand filter systems with aging media and recurring clarity issues.",
      problemStatement:
        "Aging or compacted sand media may contribute to declining filtration, while similar symptoms can also come from a dirty filter or another equipment concern.",
      solutionStatement:
        "We inspect the sand filter, confirm that media replacement is the agreed path, replace the filter media, and check system operation after restart.",
      bullets: [
        "Old media removal",
        "Fresh media installation",
        "System restart and verification",
      ],
      process: [
        "Inspect the sand filter and review the reported filtration symptoms",
        "Confirm whether media replacement, filter cleaning, or separate equipment service is appropriate",
        "Remove the old media and install replacement filter media",
        "Restart the system, check operation, and communicate any separate concern",
      ],
      standards: [
        "Improved filtration foundation with fresh media",
        "Cleaner circulation support for ongoing care",
        "Clear restart and follow-up recommendations",
      ],
      outcomes: [
        "Improved filtration performance",
        "More consistent clarity control",
        "A stronger base for routine maintenance",
      ],
      faqs: [
        {
          question: "When should sand media be replaced?",
          answer:
            "Replacement may be considered when filtration performance has declined and inspection supports a media issue. There is no universal interval that applies to every sand filter.",
        },
        {
          question: "Does sand replacement include startup checks?",
          answer:
            "Yes. We restart and verify the system after media replacement.",
        },
        {
          question: "Does every filtration problem need sand replacement?",
          answer:
            "No. Some conditions may call for filter cleaning or another equipment service instead. We review the filter and symptoms before recommending the next step.",
        },
        {
          question: "What should I send with a sand-replacement quote request?",
          answer:
            "Share the service address, filter make or model if known, the filtration or clarity symptoms, recent filter service history if available, and photos of the filter label and equipment area.",
        },
        {
          question: "Will this replace ongoing maintenance?",
          answer:
            "No. Sand replacement addresses filter media when appropriate, while filter care, circulation, cleaning, and water balancing still matter afterward.",
        },
      ],
      relatedServices: ["filter-cleaning", "weekly-services", "pump-repair-and-installation"],
      ctaTitle: "Need to refresh your sand filter media?",
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "Replacing aging media helps restore filtration performance and supports cleaner water between regular visits.",
        beforeImagePath: "/images/proof-sand-replacement-before.jpg",
        afterImagePath: "/images/proof-sand-replacement-after.jpg",
      },
    },
    {
      slug: "pump-repair-and-installation",
      name: "Pump Repair and Installation",
      seoTitle: "Pool Pump Repair & Installation in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Pump Repair & Installation in Abilene, TX",
      seoDescription:
        "Get professional pool pump troubleshooting, replacement, and installation help in Abilene to restore flow and circulation.",
      summary:
        "Pool pump assessment, repair, and replacement or installation support based on the equipment and its condition.",
      supportingParagraph:
        "Reliable pump operation keeps water moving through the filtration system for routine pool care. We assess concerns such as a pump that will not prime or loses prime, low or weak flow, loud operation, visible pump leaks, or a pump that runs without moving water. The appropriate repair or replacement path depends on the actual equipment, symptoms, and condition found during assessment.",
      idealFor: "Pools with weak circulation, pump noise, prime loss, or aging pump equipment.",
      problemStatement:
        "Weak circulation, unusual pump noise, loss of prime, or aging equipment can interrupt filtration and make water care harder to manage.",
      solutionStatement:
        "We assess pump behavior, flow, and visible equipment condition, then explain whether the supported repair path or replacement and installation is the practical next step.",
      bullets: [
        "Pump performance diagnostics and issue identification",
        "Repair recommendations based on condition and reliability",
        "Replacement and installation support when needed",
      ],
      process: [
        "Review the reported symptoms and inspect pump behavior, flow, and visible condition",
        "Explain the findings and recommend repair or replacement based on the actual equipment",
        "Complete the agreed supported repair or pump installation work",
        "Restart the system, check circulation, and review any remaining or separate concern",
      ],
      standards: [
        "Diagnosis-first approach before major decisions",
        "Reliable circulation as the service priority",
        "Clear communication on repair vs. replacement path",
      ],
      outcomes: [
        "More dependable water movement and circulation",
        "Reduced interruption from pump-related issues",
        "Clear guidance on maintenance and next service intervals",
      ],
      faqs: [
        {
          question: "Can you help troubleshoot noisy or weak pumps?",
          answer:
            "Yes. We assess reported noise, weak circulation, loss of prime, and general pump operation to identify practical next steps. A recommendation depends on what the equipment assessment shows.",
        },
        {
          question: "Do you only install new pumps?",
          answer:
            "No. We evaluate repair and replacement or installation options based on the pump, its condition, and the supported work needed. Assessment does not guarantee that every pump can or should be repaired.",
        },
        {
          question: "What happens after pump service?",
          answer:
            "After the agreed work, we restart the system and check pump operation and circulation. If we observe a separate filter or equipment concern, we explain it rather than treating it as part of the pump work automatically.",
        },
        {
          question: "What should I send with a pump-service quote request?",
          answer:
            "Share the service address, the pump symptoms and when they started, whether the pump runs at all, and any known make or model information. Photos of the pump label and equipment area are helpful when available.",
        },
      ],
      relatedServices: [
        "pool-equipment-repair",
        "pool-plumbing-repair",
        "filter-cleaning",
        "weekly-services",
      ],
      showBenefitsSection: false,
      ctaTitle: "Need help with pump performance issues?",
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "Restoring reliable pump performance supports stronger circulation, clearer water, and fewer recurring disruptions.",
        singleImagePath: "/images/services/pump-proof-photo.png",
      },
    },
    {
      slug: "pool-equipment-repair",
      name: "Pool Equipment Repair & Replacement",
      seoTitle: "Pool Equipment Repair & Replacement in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Equipment Repair & Replacement in Abilene, TX",
      seoDescription:
        "Pool equipment assessment, repair, and replacement support in Abilene for circulation, filtration, and performance concerns.",
      summary:
        "Assessment-led help for pool equipment that is not operating correctly or may need repair or replacement.",
      supportingParagraph:
        "We review accessible equipment condition and system-performance concerns, then recommend a repair or replacement path based on what the equipment and requested scope require.",
      idealFor:
        "Homeowners seeing circulation, filtration, or other pool-equipment performance concerns.",
      problemStatement:
        "A pool-system problem can involve more than one component, and symptoms alone do not establish whether a repair or replacement is appropriate.",
      solutionStatement:
        "We assess the accessible equipment and reported symptoms, identify the supported next step, and prepare a quote around the actual equipment and agreed scope.",
      bullets: [
        "Accessible equipment condition and performance assessment",
        "Repair-versus-replacement recommendation based on observed condition",
        "Pump, filter, and equipment-pad plumbing paths when specialized service is needed",
      ],
      process: [
        "Review the reported symptoms, equipment details, and available photos",
        "Assess accessible equipment condition and system performance",
        "Explain the supported repair, replacement, or specialist-service path",
        "Quote the agreed equipment scope before work moves forward",
      ],
      standards: [
        "Diagnosis before a repair-or-replacement recommendation",
        "Scope matched to the equipment and observed condition",
        "Clear separation between included work and separate service needs",
      ],
      outcomes: [
        "A clearer understanding of the equipment concern",
        "A practical repair or replacement recommendation",
        "An individual quote based on the supported scope",
      ],
      faqs: [
        {
          question: "What pool equipment can you assess?",
          answer:
            "We can assess accessible pool-equipment concerns involving circulation, filtration, pumps, filters, valves, fittings, and equipment-pad plumbing. The supported service path depends on what the assessment shows.",
        },
        {
          question: "How do you decide between repair and replacement?",
          answer:
            "The recommendation depends on the equipment, its condition, the observed problem, and the work that can be supported. An assessment does not assume that every component can or should be repaired.",
        },
        {
          question: "Is this the same as routine filter cleaning?",
          answer:
            "No. Filter Cleaning is maintenance for an otherwise serviceable filter. Damaged, worn, leaking, or failed filter equipment is assessed through Filter Repair & Replacement.",
        },
        {
          question: "What should I send with an equipment-service quote request?",
          answer:
            "Share the service address, the symptoms and when they started, any recent equipment work, and the make or model if known. Photos of labels, the equipment pad, and the affected component are helpful when available.",
        },
      ],
      relatedServices: [
        "pump-repair-and-installation",
        "filter-repair-replacement",
        "pool-plumbing-repair",
        "filter-cleaning",
        "weekly-services",
      ],
      ctaTitle: "Need a clear next step for a pool-equipment problem?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "filter-repair-replacement",
      name: "Pool Filter Repair & Replacement",
      seoTitle: "Pool Filter Repair & Replacement in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Filter Repair & Replacement in Abilene, TX",
      seoDescription:
        "Pool filter repair and replacement assessment in Abilene for damaged, worn, leaking, or failed filter equipment.",
      summary:
        "Condition-based assessment for filter equipment that may require repair or replacement rather than routine cleaning.",
      supportingParagraph:
        "We distinguish maintenance needs from damaged, worn, leaking, failed, or otherwise unsuitable filter equipment. Reported high- or low-pressure behavior is reviewed in context because pressure symptoms do not by themselves establish whether a cartridge, DE, or sand filter needs cleaning, repair, or replacement.",
      idealFor:
        "Cartridge, DE, or sand filter systems with a condition or mechanical concern beyond routine cleaning.",
      problemStatement:
        "Cleaning can restore maintenance-related performance, but it does not correct every damaged, worn, leaking, or failed filter component.",
      solutionStatement:
        "We assess the filter and reported symptoms, determine whether cleaning, repair, or replacement is the appropriate path, and quote the agreed scope individually.",
      bullets: [
        "Assessment of accessible filter condition and reported symptoms",
        "Clear distinction between cleaning, repair, and replacement needs",
        "Condition-based recommendation for cartridge, DE, or sand systems",
      ],
      process: [
        "Review the filter type, symptoms, service history, and available photos",
        "Assess accessible filter equipment and system behavior",
        "Explain whether cleaning, repair, or replacement is supported",
        "Provide a quote for the agreed filter-equipment scope",
      ],
      standards: [
        "Maintenance and mechanical concerns evaluated separately",
        "No automatic replacement recommendation",
        "Scope based on observed equipment condition",
      ],
      outcomes: [
        "A clear filter-service recommendation",
        "Defined repair or replacement scope when needed",
        "A quote based on the actual filter and condition",
      ],
      faqs: [
        {
          question: "How is filter repair different from filter cleaning?",
          answer:
            "Filter Cleaning removes accumulated material as routine or condition-based maintenance. Filter Repair & Replacement addresses damaged, worn, leaking, failed, or unsuitable equipment after assessment.",
        },
        {
          question: "Do you work with cartridge, DE, and sand filters?",
          answer:
            "Those are the filter types currently supported for assessment. The recommended work still depends on the specific equipment and its condition.",
        },
        {
          question: "Will every filter problem require replacement?",
          answer:
            "No. The assessment may point to cleaning, a supported repair, replacement, or a separate system concern. We recommend the path that fits the observed condition.",
        },
        {
          question: "What should I send with a filter repair quote request?",
          answer:
            "Share the service address, filter type and model if known, the symptoms you are seeing, recent service history, and photos of the label, filter, and surrounding equipment.",
        },
      ],
      relatedServices: ["filter-cleaning", "pool-equipment-repair", "weekly-services"],
      ctaTitle: "Does your pool filter need more than cleaning?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "pool-plumbing-repair",
      name: "Pool Plumbing & Valve Repair",
      seoTitle: "Pool Plumbing & Valve Repair in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Plumbing & Valve Repair in Abilene, TX",
      seoDescription:
        "Assessment and repair support for visible, accessible pool plumbing, fittings, valves, and equipment-pad connections in Abilene.",
      summary:
        "Condition-based service for visible, accessible pool-system plumbing, fittings, valves, and equipment-pad connections.",
      supportingParagraph:
        "We assess accessible pool-equipment plumbing concerns, including visible valve, fitting, connection, flow, or suction issues, and define what can be repaired or coordinated. The final scope depends on the location, condition, and work required.",
      idealFor:
        "Homeowners with a visible or accessible valve, fitting, connection, or equipment-pad plumbing concern.",
      problemStatement:
        "Worn valves, fittings, or accessible connections can affect operation, but the source and supported repair scope must be confirmed before work begins.",
      solutionStatement:
        "We review the visible concern, assess accessible pool-system plumbing, and provide an individual quote for supported repair or coordinated next steps.",
      bullets: [
        "Visible valve and fitting assessment",
        "Accessible equipment-pad plumbing review",
        "Repair or coordination scope based on actual condition",
      ],
      process: [
        "Review the location, symptoms, and photos of the visible concern",
        "Assess accessible valves, fittings, and equipment-pad connections",
        "Define the supported repair or coordination path",
        "Quote the agreed scope based on condition",
      ],
      standards: [
        "Conservative assessment of visible, accessible components",
        "Clear limits around the supported work",
        "Condition-based scope before repair begins",
      ],
      outcomes: [
        "A clearer understanding of the accessible plumbing concern",
        "A defined repair or coordination path",
        "A custom quote tied to the observed scope",
      ],
      faqs: [
        {
          question: "What pool plumbing concerns can you assess?",
          answer:
            "We assess visible and accessible pool-system valves, fittings, connections, and equipment-pad plumbing. The location and condition determine what work can be supported.",
        },
        {
          question: "Does every valve or fitting concern have the same repair scope?",
          answer:
            "No. Access, component condition, and the surrounding equipment setup can change the recommended work, so the scope is confirmed after assessment.",
        },
        {
          question: "What happens if the request extends beyond the accessible equipment area?",
          answer:
            "We explain what the initial assessment supports and, when appropriate, coordinate the next step instead of representing broader work as part of the visible repair scope. This service does not promise to locate hidden underground leaks or reconstruct buried lines, and it does not include electrical work, structural repair, or plumbing outside the supported pool-equipment scope.",
        },
        {
          question: "What should I send with a pool-plumbing quote request?",
          answer:
            "Share the service address, where the concern is visible, what you have observed, when it started, and photos or a short video of the affected valve, fitting, or equipment area.",
        },
      ],
      relatedServices: ["pool-equipment-repair", "pump-repair-and-installation"],
      ctaTitle: "Have a visible pool valve or plumbing concern?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "pool-liner-repair",
      name: "Pool Liner Repair",
      seoTitle: "Pool Liner Repair in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Liner Repair in Abilene, TX",
      seoDescription:
        "Pool liner condition assessment in Abilene for visible damage, deterioration, displacement, and repair-or-replacement concerns.",
      summary:
        "Condition-based assessment for a damaged, deteriorated, displaced, or otherwise problematic pool liner.",
      supportingParagraph:
        "We review the visible liner condition and project details, then determine whether a supported repair, replacement path, or specialty coordination is appropriate. A liner concern can have more than one cause, and professional leak detection is not included.",
      idealFor:
        "Pool owners with visible liner damage, deterioration, displacement, or a reported concern that needs a repair-versus-replacement assessment.",
      problemStatement:
        "Visible liner damage or movement does not by itself establish the cause, repairability, or whether replacement will be required.",
      solutionStatement:
        "We assess the visible liner condition, review available dimensions and photos, and prepare an individual quote for the supported repair, replacement path, or coordinated specialty work.",
      bullets: [
        "Visible liner condition and deterioration assessment",
        "Repair-versus-replacement path based on the observed condition",
        "Individual quote or specialty-work coordination when appropriate",
      ],
      process: [
        "Review the reported concern, pool details, dimensions when known, and current photos",
        "Assess visible liner damage, deterioration, displacement, and surrounding condition",
        "Explain the supported repair, replacement, or specialty-coordination path",
        "Quote the agreed project scope individually",
      ],
      standards: [
        "Condition review before recommending repair or replacement",
        "Recommendations limited to visible condition and the supported scope",
        "Clear scope when specialty trade work must be coordinated",
      ],
      outcomes: [
        "A clearer understanding of the visible liner concern",
        "A condition-based repair or replacement path",
        "An individual quote tied to the supported scope",
      ],
      faqs: [
        {
          question: "Can every damaged pool liner be repaired?",
          answer:
            "No. Whether a repair is appropriate depends on the visible condition, extent and location of the concern, fit, and overall project requirements. Some conditions may point to replacement or specialty work instead.",
        },
        {
          question: "Does pool liner repair include leak detection?",
          answer:
            "No. We can review visible liner concerns and the information you provide, but this service does not include professional leak detection or a promise to diagnose the source of water loss.",
        },
        {
          question: "How do you decide between liner repair and replacement?",
          answer:
            "The recommendation depends on the liner's visible condition, the affected area, pool details, and the work that can be supported. The path is not assumed before assessment.",
        },
        {
          question: "What should I send with a pool liner quote request?",
          answer:
            "Share the service address, what you have observed, when it started, pool dimensions when known, and wide-angle and close-up photos of the liner and affected areas.",
        },
      ],
      relatedServices: ["pool-remodeling"],
      ctaTitle: "Need a condition-based assessment for a pool liner concern?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "pool-remodeling",
      name: "Pool Remodeling & Renovation",
      seoTitle: "Pool Remodeling & Renovation in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Remodeling & Renovation in Abilene, TX",
      seoDescription:
        "Plan an existing-pool remodel in Abilene with individually scoped resurfacing, tile, coping, and relevant equipment improvements.",
      summary:
        "A coordinated starting point for materially improving or renovating an existing pool.",
      supportingParagraph:
        "We evaluate the pool, desired improvements, and related conditions, then manage the customer-facing quote and project process for the approved specialty scope.",
      idealFor:
        "Homeowners considering finish renewal, tile or coping work, or relevant equipment improvements as part of an existing-pool renovation.",
      problemStatement:
        "A pool renovation can involve several connected decisions, and the right scope depends on existing condition and the homeowner's project goals.",
      solutionStatement:
        "We organize the assessment and customer-facing process, define the appropriate specialty work, and prepare an individual project quote.",
      bullets: [
        "Existing-pool condition and project-goal review",
        "Resurfacing, tile, coping, and relevant equipment scope coordination",
        "Individual quote and customer-facing project management",
      ],
      process: [
        "Discuss the pool condition, priorities, and requested improvements",
        "Review the existing pool and identify the relevant specialty scopes",
        "Coordinate the proposed renovation plan and individual quote",
        "Manage communication for the agreed customer-facing project process",
      ],
      standards: [
        "Project scope based on the existing pool and requested work",
        "Specialty services defined instead of bundled vaguely",
        "Clear customer-facing communication through the quote process",
      ],
      outcomes: [
        "A renovation plan tied to the pool's condition",
        "Clearly defined specialty-service scopes",
        "One customer-facing path for the agreed project",
      ],
      faqs: [
        {
          question: "What can be included in a pool remodeling project?",
          answer:
            "Current approved project categories include resurfacing or replastering, tile and coping work, and relevant pool-equipment improvements when appropriate. The final combination depends on the pool and requested work.",
        },
        {
          question: "Can I request only one specialty service?",
          answer:
            "Yes. Resurfacing and tile or coping work can be evaluated as focused projects when a broader renovation is not needed.",
        },
        {
          question: "How is the project scope determined?",
          answer:
            "We evaluate the existing pool condition and your goals, then define and quote the appropriate work individually. Scope is not assumed before that review.",
        },
        {
          question: "What should I send with a pool-remodeling quote request?",
          answer:
            "Share the service address, what you want to change, known condition concerns, and current wide-angle and close-up photos of the pool, finish, tile, coping, and relevant equipment.",
        },
      ],
      relatedServices: [
        "pool-resurfacing-replastering",
        "pool-tile-coping-repair",
        "pool-liner-repair",
        "pool-deck-resurfacing-repair",
        "pool-tile-cleaning",
      ],
      ctaTitle: "Ready to discuss an existing-pool renovation?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "pool-resurfacing-replastering",
      name: "Pool Resurfacing & Replastering",
      seoTitle: "Pool Resurfacing & Replastering in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Resurfacing & Replastering in Abilene, TX",
      seoDescription:
        "Pool resurfacing and replastering assessment in Abilene for homeowners considering an existing finish renewal.",
      summary:
        "Condition-based assessment and project coordination for renewing an existing pool finish.",
      supportingParagraph:
        "Resurfacing or replastering renews a worn, rough, or deteriorated interior pool finish. It is different from pool deck resurfacing, which addresses the surrounding walking surface, and from an acid wash, which is a surface treatment and cleaning service rather than finish replacement.",
      idealFor:
        "Homeowners evaluating finish renewal as a standalone project or part of a larger pool renovation.",
      problemStatement:
        "Surface appearance alone does not establish whether cleaning, treatment, or finish renewal is the appropriate next step.",
      solutionStatement:
        "We evaluate the pool condition and desired scope, distinguish finish work from surface cleaning, and quote the supported resurfacing or replastering project individually.",
      bullets: [
        "Existing finish and overall pool-condition assessment",
        "Clear distinction between surface treatment and finish renewal",
        "Individual resurfacing or replastering project quote",
      ],
      process: [
        "Review the finish concerns, project goals, and current photos",
        "Evaluate the pool condition and whether finish renewal fits the request",
        "Define related tile, coping, or renovation considerations when relevant",
        "Prepare an individual quote for the agreed finish-renewal scope",
      ],
      standards: [
        "Condition review before recommending finish renewal",
        "Clear separation from cleaning and treatment services",
        "Project scope defined around the existing pool",
      ],
      outcomes: [
        "A clear finish-renewal recommendation",
        "A defined resurfacing or replastering scope",
        "Practical next steps for post-project pool care",
      ],
      faqs: [
        {
          question: "How is resurfacing different from an acid wash?",
          answer:
            "Resurfacing or replastering renews the pool finish. An acid wash is a condition-based surface treatment and cleaning service; it does not replace the finish.",
        },
        {
          question: "Can resurfacing be part of a larger remodel?",
          answer:
            "Yes. Finish renewal can be evaluated with tile and coping work as part of a coordinated existing-pool renovation, or it can be scoped on its own.",
        },
        {
          question: "How is the final finish scope chosen?",
          answer:
            "The recommendation depends on the current pool condition and the desired project scope. Those details are reviewed before an individual quote is prepared.",
        },
        {
          question: "What should I send with a resurfacing quote request?",
          answer:
            "Share the service address, the finish concerns and project goals, and current wide-angle and close-up photos of the pool surface, waterline, steps, and any areas of concern.",
        },
      ],
      relatedServices: [
        "pool-remodeling",
        "pool-tile-coping-repair",
        "pool-deck-resurfacing-repair",
        "acid-wash",
        "weekly-services",
      ],
      ctaTitle: "Considering a new finish for your existing pool?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "pool-deck-resurfacing-repair",
      name: "Pool Deck Resurfacing & Repair",
      seoTitle: "Pool Deck Resurfacing & Repair in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Deck Resurfacing & Repair in Abilene, TX",
      seoDescription:
        "Pool deck resurfacing and repair assessment in Abilene for worn or deteriorated walking surfaces surrounding an existing pool.",
      summary:
        "Condition-based assessment for resurfacing or repairing the walking surface surrounding an existing pool.",
      supportingParagraph:
        "Pool deck resurfacing addresses the surrounding walking surface outside the pool, not the interior pool finish. We assess the existing deck condition and quote a standalone project or coordinated renovation scope individually.",
      idealFor:
        "Pool owners evaluating worn or deteriorated deck surfaces as a focused project or part of a larger pool-area renovation.",
      problemStatement:
        "Pool deck wear and deterioration vary by area and condition, so the supported repair or resurfacing scope must be assessed before work is proposed.",
      solutionStatement:
        "We review the existing deck surface and project goals, define a condition-based repair or resurfacing scope, and coordinate appropriate specialty trade work when required.",
      bullets: [
        "Existing pool-deck surface condition assessment",
        "Standalone repair or resurfacing and broader renovation paths",
        "Individual quote with specialty-trade coordination when appropriate",
      ],
      process: [
        "Review the deck concerns, affected areas, project goals, and current photos",
        "Assess the visible condition of the walking surface surrounding the pool",
        "Define the supported repair, resurfacing, or coordinated renovation scope",
        "Prepare an individual quote for the agreed project",
      ],
      standards: [
        "Condition-led scope focused on the visible deck surface",
        "Material choices and performance expectations confirmed only for the supported scope",
        "Clear separation between the pool deck and the interior pool finish",
      ],
      outcomes: [
        "A clearer pool-deck repair or resurfacing path",
        "A defined standalone or renovation-project scope",
        "An individual quote based on the existing surface condition",
      ],
      faqs: [
        {
          question: "Is pool deck resurfacing the same as pool resurfacing?",
          answer:
            "No. Pool deck resurfacing concerns the walking surface surrounding the pool. Pool Resurfacing & Replastering concerns the interior pool finish.",
        },
        {
          question: "Can pool deck work be part of a larger renovation?",
          answer:
            "Yes. Deck repair or resurfacing can be evaluated as a standalone project or coordinated with related pool remodeling, interior finish, tile, or coping work when appropriate.",
        },
        {
          question: "Do you use a specific pool deck coating or material system?",
          answer:
            "The supported scope depends on the existing surface, condition, project goals, and appropriate specialty work. We do not assume a particular coating or material system before assessment.",
        },
        {
          question: "What should I send with a pool deck quote request?",
          answer:
            "Share the service address, the affected areas and project goals, and wide-angle and close-up photos showing the deck surface, pool edge, and nearby tile or coping where relevant.",
        },
      ],
      relatedServices: [
        "pool-remodeling",
        "pool-resurfacing-replastering",
        "pool-tile-coping-repair",
      ],
      ctaTitle: "Considering repair or resurfacing for your pool deck?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "pool-tile-coping-repair",
      name: "Pool Tile & Coping Repair & Replacement",
      seoTitle: "Pool Tile & Coping Repair in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Tile & Coping Repair in Abilene, TX",
      seoDescription:
        "Pool tile and coping repair or replacement assessment in Abilene for damaged, deteriorated, or outdated materials.",
      summary:
        "Assessment and project coordination for damaged, deteriorated, or outdated pool tile and coping.",
      supportingParagraph:
        "We evaluate loose, missing, or damaged tile and cracked or deteriorated coping to determine whether repair or replacement fits the observed condition and project goals, then quote the work as a standalone scope or part of a larger pool renovation.",
      idealFor:
        "Homeowners with visible tile or coping deterioration, damage, or an update planned for an existing pool.",
      problemStatement:
        "Tile and coping concerns vary in extent, so visible condition and project goals must be reviewed before choosing repair or replacement.",
      solutionStatement:
        "We assess the affected areas, define a repair or replacement path, coordinate related renovation considerations, and prepare an individual quote.",
      bullets: [
        "Visible tile and coping condition assessment",
        "Repair-versus-replacement scope based on condition and goals",
        "Standalone or coordinated renovation project path",
      ],
      process: [
        "Review the affected areas, goals, and current photos",
        "Assess visible tile and coping condition",
        "Define repair, replacement, or related renovation considerations",
        "Quote the agreed project scope individually",
      ],
      standards: [
        "Condition-led repair or replacement recommendation",
        "Clear separation from tile cleaning",
        "Scope coordinated with finish work only when relevant",
      ],
      outcomes: [
        "A defined tile and coping service path",
        "Clear standalone or renovation-project scope",
        "An individual quote based on the observed work",
      ],
      faqs: [
        {
          question: "How do you decide between tile or coping repair and replacement?",
          answer:
            "The recommendation depends on the visible condition, extent of the affected area, surrounding materials, and project goals. We review those factors before defining the scope.",
        },
        {
          question: "Can tile and coping work be part of a pool remodel?",
          answer:
            "Yes. It can be coordinated with resurfacing or replastering when those scopes belong in the same renovation, or quoted as a standalone project.",
        },
        {
          question: "Is tile repair the same as tile cleaning?",
          answer:
            "No. Pool Tile Cleaning addresses mineral scale and buildup on suitable tile. Damaged or deteriorated tile may require repair or replacement instead.",
        },
        {
          question: "What should I send with a tile and coping quote request?",
          answer:
            "Share the service address, what you have noticed, the desired project outcome, and wide-angle and close-up photos of the affected tile, coping, and surrounding pool area.",
        },
      ],
      relatedServices: [
        "pool-remodeling",
        "pool-resurfacing-replastering",
        "pool-tile-cleaning",
      ],
      ctaTitle: "Need an assessment for pool tile or coping work?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "pool-tile-cleaning",
      name: "Pool Tile Cleaning & Bead Blasting",
      seoTitle: "Pool Tile Cleaning & Bead Blasting in Abilene, TX | Shipwrecked Pools",
      seoH1: "Pool Tile Cleaning & Bead Blasting in Abilene, TX",
      seoDescription:
        "Professional pool tile cleaning and bead-blasting assessment in Abilene for calcium, mineral scale, and waterline buildup.",
      summary:
        "Professional tile-cleaning assessment for calcium, mineral scale, and buildup along the pool waterline.",
      supportingParagraph:
        "Bead blasting is one professional cleaning method, but the appropriate approach depends on tile and surface condition. Suitability is evaluated before a cleaning scope is recommended.",
      idealFor:
        "Homeowners with mineral scale or buildup on pool tile that may be suitable for professional cleaning.",
      problemStatement:
        "Waterline buildup can be difficult to remove, and not every tile or surrounding surface is suitable for the same cleaning method.",
      solutionStatement:
        "We evaluate the tile, buildup, and surface suitability, recommend the appropriate cleaning method, and quote the supported scope individually.",
      bullets: [
        "Tile, buildup, and surface-suitability assessment",
        "Bead blasting considered as one professional cleaning method",
        "Clear distinction between cleaning and damaged-tile repair",
      ],
      process: [
        "Review the buildup, tile condition, and current photos",
        "Evaluate surface suitability and affected areas",
        "Recommend the appropriate supported cleaning method",
        "Quote the agreed tile-cleaning scope individually",
      ],
      standards: [
        "Suitability review before selecting a method",
        "Conservative expectations based on tile and buildup condition",
        "Repair concerns separated from cleaning work",
      ],
      outcomes: [
        "A tile-cleaning recommendation based on surface condition",
        "A defined professional cleaning scope",
        "Clear next steps when damaged tile needs separate work",
      ],
      faqs: [
        {
          question: "What is bead blasting for pool tile?",
          answer:
            "Bead blasting is one professional method used to clean suitable pool tile with mineral scale or buildup. The tile and surrounding surface must be evaluated before that method is selected.",
        },
        {
          question: "Can every pool tile surface be cleaned the same way?",
          answer:
            "No. The appropriate method depends on the tile, surface condition, buildup, and affected area. We assess suitability before recommending the work.",
        },
        {
          question: "How is tile cleaning different from an acid wash or resurfacing?",
          answer:
            "Tile cleaning focuses on suitable waterline tile. An acid wash is a condition-based treatment for a pool finish, while resurfacing or replastering renews the finish itself.",
        },
        {
          question: "What if the tile is damaged rather than dirty?",
          answer:
            "Damaged or deteriorated tile may need a separate repair or replacement assessment instead of, or before, cleaning.",
        },
        {
          question: "What should I send with a tile-cleaning quote request?",
          answer:
            "Share the service address, what the buildup looks like, how much of the waterline is affected, and clear wide-angle and close-up photos of the tile and surrounding surface.",
        },
      ],
      relatedServices: ["pool-tile-coping-repair", "acid-wash", "weekly-services"],
      ctaTitle: "Want a professional assessment for waterline tile buildup?",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "one-time-cleans",
      name: "One Time Cleans",
      seoTitle: "One-Time Pool Cleaning in Abilene, TX | Shipwrecked Pools",
      seoH1: "One-Time Pool Cleaning in Abilene, TX",
      seoDescription:
        "Need a catch-up visit after weather, travel, or a party? Get one-time pool cleaning and balancing in Abilene.",
      summary:
        "Standalone pool-cleaning help for catch-up needs without requiring immediate enrollment in weekly service.",
      supportingParagraph:
        "A one-time clean focuses on agreed debris removal, visible cleaning, water testing, and practical chemistry corrections after situations such as travel, heavy use, storm debris, or preparation for an event or sale. A green or heavily algae-affected pool may need separate Green-to-Clean recovery instead.",
      idealFor: "Homeowners needing a one-off cleanup without starting recurring service immediately.",
      problemStatement:
        "Pools can fall behind after weather, travel, or heavy use, but the current water, algae, debris, and equipment condition determine whether a standard one-time clean is suitable.",
      solutionStatement:
        "We assess the starting condition, complete the agreed one-time cleaning and balancing work, and explain whether recovery, equipment service, or ongoing weekly care is a better next step.",
      bullets: [
        "Debris removal and visible cleanup",
        "Water test with practical chemistry corrections",
        "Condition notes with recommended next steps",
      ],
      process: [
        "Review the current water, algae, debris, and equipment condition",
        "Confirm whether a one-time clean or a different corrective service fits the request",
        "Perform the agreed visible cleaning, debris removal, water testing, and practical corrections",
        "Explain remaining concerns and options for recovery, equipment help, or weekly service",
      ],
      standards: [
        "Focused service built around current pool condition",
        "Clear communication on what was handled",
        "Actionable recommendations for next steps",
      ],
      outcomes: [
        "Focused cleaning based on the agreed one-time service scope",
        "A clearer picture of current water and equipment status",
        "Actionable next steps based on observed pool needs",
      ],
      faqs: [
        {
          question: "Can I book a one-time clean without recurring service?",
          answer:
            "Yes. One-time cleans are designed for homeowners who need targeted support without immediate recurring enrollment.",
        },
        {
          question: "What does a one-time clean cover?",
          answer:
            "The existing service scope includes agreed debris removal and visible cleaning, water testing with practical chemistry corrections, and condition notes with recommended next steps.",
        },
        {
          question: "When might I need a different service?",
          answer:
            "A green or significantly algae-affected pool may require staged Green-to-Clean recovery rather than a standard one-time clean. Filter, pump, or other equipment concerns may also require separate service.",
        },
        {
          question: "Can one-time service turn into recurring care later?",
          answer:
            "Yes. Customers who want ongoing cleaning and chemistry care can request Weekly Pool Service after the one-time work, subject to pool condition and route availability.",
        },
        {
          question: "What should I send with a one-time-clean quote request?",
          answer:
            "Share the service address, current water clarity and color, visible debris or algae, the help you want, and current pool and equipment photos when available.",
        },
      ],
      relatedServices: ["weekly-services", "algae-removal"],
      ctaTitle: "Need a one-time reset for your pool?",
      showBenefitsSection: false,
      showProofSection: false,
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "A focused one-time clean addresses the agreed cleaning scope and provides practical next steps based on the condition observed.",
        beforeImagePath: "/images/proof-one-time-cleans-before.jpg",
        afterImagePath: "/images/proof-one-time-cleans-after.jpg",
      },
    },
    {
      slug: "ship-shape-pool-review",
      name: "Ship-Shape Pool Review",
      seoTitle: "Free Ship-Shape Pool Review in Abilene, TX | Shipwrecked Pools",
      seoH1: "Free Ship-Shape Pool Review in Abilene, TX",
      seoDescription:
        "Schedule a free, one-time Ship-Shape Pool Review in Abilene for an onsite pool, water, and visible equipment check with a clear summary.",
      summary:
        "A free, one-time onsite review of your pool, water, and visible equipment condition, followed by a clear customer summary.",
      supportingParagraph:
        "The Ship-Shape Pool Review helps homeowners understand what looks good, what deserves attention, and what can wait without requiring a recurring-service commitment.",
      idealFor: "Homeowners who want a professional second opinion on their pool's visible condition.",
      problemStatement:
        "Changes in water, circulation, filtration, or equipment can be difficult to interpret without an experienced set of eyes onsite.",
      solutionStatement:
        "We review the pool, water, and visible equipment condition, then provide an overall result, item-by-item observations, and prioritized watch items.",
      bullets: [
        "Water chemistry and condition observations",
        "Circulation, filtration, and visible equipment review",
        "Clear summary with prioritized observations",
      ],
      process: [
        "Schedule the free one-time review for an address in our service area",
        "Meet the technician onsite for a walkthrough if you would like to be present",
        "Review the pool, water, circulation, filtration, and visible equipment condition",
        "Receive an overall result, item-by-item findings, and prioritized watch items",
      ],
      standards: [
        "Useful observations explained in homeowner-friendly language",
        "Clear limits between a visible review and specialized diagnostics",
        "Optional next steps based on what the review finds",
      ],
      outcomes: [
        "A clearer understanding of the pool's visible condition",
        "Prioritized concerns and watch items",
        "Practical next steps without a recurring-service requirement",
      ],
      faqs: [
        {
          question: "Is the Ship-Shape Pool Review really free?",
          answer:
            "Yes. It is completely free and available one time per homeowner and property within the Shipwrecked Pools service area.",
        },
        {
          question: "Do I need to be a Shipwrecked Pools customer?",
          answer:
            "No. The review is available to homeowners in our service area whether or not they currently use Shipwrecked Pools or plan to start recurring service.",
        },
        {
          question: "Do I need to be home?",
          answer:
            "No. You may meet the technician onsite for a walkthrough if you want to, but being home is not required as long as pool access is arranged.",
        },
        {
          question: "How long does the review take?",
          answer:
            "Timing varies with the pool and visible equipment setup. We can discuss scheduling details when we confirm the review and property access.",
        },
        {
          question: "Will you inspect my pool equipment?",
          answer:
            "We review the visible condition of the equipment pad and accessible plumbing, including obvious wear, deterioration, or leaks. We do not disassemble equipment or perform electrical diagnosis, pressure testing, or destructive testing.",
        },
        {
          question: "Does this include leak detection?",
          answer:
            "No. We may note an obvious visible leak, but the review does not include professional leak detection or a guaranteed diagnosis of hidden problems.",
        },
        {
          question: "What happens after the review?",
          answer:
            "You receive a customer summary with an overall Ship-Shape result, item-by-item observations, and prioritized recommendations or watch items. Any weekly service or repair follow-up is optional and only suggested when appropriate.",
        },
        {
          question: "What areas do you serve?",
          answer:
            "The review is available within Shipwrecked Pools' service area across Abilene and supported nearby communities. Submit your address so we can confirm current service-area eligibility.",
        },
      ],
      relatedServices: ["weekly-services", "filter-cleaning", "pump-repair-and-installation"],
      ctaTitle: "Schedule My Free Ship-Shape Pool Review",
      showBenefitsSection: false,
      showProofSection: false,
    },
    {
      slug: "free-pool-chemical-delivery",
      name: "Free Pool Chemical Delivery",
      seoTitle: "Free Pool Chemical Delivery in Abilene, TX | Shipwrecked Pools",
      seoH1: "Free Pool Chemical Delivery in Abilene, TX",
      seoDescription:
        "Get pool chlorine, tabs, shock, acid, bicarb, and salt delivered in the Abilene area. You pay for the chemicals; Shipwrecked Pools delivers them free.",
      summary:
        "Request pool chemicals for one-time or repeat delivery in the Shipwrecked Pools service area with no delivery fee.",
      supportingParagraph:
        "Choose the products, sizes, and quantities you need. We confirm availability, pricing, and expected delivery timing before fulfillment.",
      idealFor: "Pool owners who need common pool chemicals delivered without an ecommerce checkout.",
      problemStatement:
        "Finding the right package sizes and transporting pool chemicals can add another errand to routine pool care.",
      solutionStatement:
        "Submit a structured request, receive confirmed pricing and timing, get invoiced separately, and have the products delivered free.",
      bullets: [
        "Six common pool-chemical options in confirmed package sizes",
        "One request can include multiple products and quantities",
        "No delivery fee within the normal service area",
      ],
      process: [
        "Tell us what chemicals, sizes, and quantities you need",
        "We confirm product availability, price, and expected delivery timing",
        "We invoice you separately",
        "We deliver the confirmed products to the requested location",
      ],
      standards: [
        "Pricing and availability confirmed before fulfillment",
        "Clear delivery timing without a same-day guarantee",
        "Private access and placement notes included with the request",
      ],
      outcomes: [
        "A simple request flow without cart or checkout complexity",
        "Clear confirmation before payment",
        "Free delivery of purchased chemicals",
      ],
      faqs: [
        {
          question: "Is the chemical delivery really free?",
          answer: "Yes. You pay for the chemicals, but the delivery fee is $0 within Shipwrecked Pools' normal service area.",
        },
        {
          question: "Do I have to be a Shipwrecked Pools customer?",
          answer: "No. Chemical delivery is available to anyone within our normal service area, whether or not they use our pool-service plans.",
        },
        {
          question: "What chemicals do you deliver?",
          answer: "You may request chlorine tabs, pool shock, liquid chlorine, muriatic acid, sodium bicarbonate, and pool salt in the package sizes listed on this page.",
        },
        {
          question: "How quickly can you deliver?",
          answer: "Same-day or next-day delivery is available in many cases, subject to product availability and route scheduling. We confirm expected timing before fulfillment.",
        },
        {
          question: "Do I pay online?",
          answer: "After we confirm availability and price, we invoice you separately. The request form itself is not a checkout and does not collect payment.",
        },
        {
          question: "Can you leave the chemicals if I'm not home?",
          answer: "You can provide placement and access instructions in the private request form. We will confirm the delivery details before fulfillment.",
        },
        {
          question: "What areas do you deliver to?",
          answer: "Free delivery is available throughout Shipwrecked Pools' normal service area in Abilene and supported nearby communities. Submit your address so we can confirm current route availability.",
        },
        {
          question: "Can you tell me which chemical my pool needs?",
          answer: "Choosing a treatment requires enough information about the water and pool condition. Contact us for professional guidance, or schedule a free Ship-Shape Pool Review when an onsite look would be more appropriate.",
        },
      ],
      relatedServices: ["ship-shape-pool-review", "weekly-services"],
      ctaTitle: "Request free delivery of your pool chemicals",
      showBenefitsSection: false,
      showProofSection: false,
    },
  ] as Service[],
  locations: [
    {
      slug: "south-abilene",
      name: "South Abilene",
      seoTitle: "Pool Cleaning & Pool Service in South Abilene, TX | Shipwrecked Pools",
      summary: "Recurring pool care for South Abilene homeowners who want consistent water clarity and less pool stress.",
      heroHeadline: "Pool Service for South Abilene Homeowners",
      introCopy:
        "South Abilene homeowners often choose Shipwrecked Pools for dependable recurring care that keeps pool chemistry stable through long heat stretches and heavy seasonal use.",
      localContext: "South Abilene service is structured around recurring route consistency, with practical follow-up when conditions shift.",
      routeNotes: "Strong fit for homeowners prioritizing weekly service with proactive communication.",
      routeAvailabilityNote: "South Abilene availability is confirmed by address and current recurring-route openings.",
      servicesOffered: [
        "weekly-services",
        "filter-cleaning",
        "algae-removal",
        "drain-and-refill",
        "acid-wash",
        "pump-repair-and-installation",
        "one-time-cleans",
        "sand-replacement",
      ],
      faqs: [
        {
          question: "Do you offer weekly pool service in South Abilene?",
          answer:
            "New recurring pool-service customers are enrolled on a weekly schedule. Existing customer agreements are unchanged. We confirm weekly availability after checking your address and pool details.",
        },
        {
          question: "What services are most common in South Abilene?",
          answer:
            "Recurring maintenance, filter care, and occasional algae recovery are common requests. We recommend the right path based on current pool condition.",
        },
        {
          question: "How quickly can service start in South Abilene?",
          answer:
            "Start timing depends on route density and season. Texting your address is the fastest way to confirm current onboarding windows.",
        },
      ],
      imagePath: "/images/locations/south-abilene.jpg",
      imageAlt: "Pool service area in South Abilene",
      nearbyLocationSlugs: ["north-abilene", "potosi", "buffalo-gap"],
      showLocationCtaBanner: false,
    },
    {
      slug: "north-abilene",
      name: "North Abilene",
      seoTitle: "Pool Cleaning & Pool Service in North Abilene, TX | Shipwrecked Pools",
      summary: "Route-based pool cleaning support for North Abilene homeowners who want dependable upkeep and clear communication.",
      heroHeadline: "Pool Service for North Abilene Neighborhoods",
      introCopy:
        "North Abilene homeowners work with Shipwrecked Pools for practical recurring service that keeps water manageable and helps catch equipment issues early.",
      localContext: "North Abilene service blends recurring maintenance with equipment-focused support when circulation concerns appear.",
      routeNotes: "Good fit for homeowners who want recurring care plus clearer maintenance planning.",
      routeAvailabilityNote: "North Abilene scheduling is confirmed after a quick address check against active route timing.",
      servicesOffered: [
        "weekly-services",
        "filter-cleaning",
        "pump-repair-and-installation",
        "algae-removal",
        "drain-and-refill",
        "acid-wash",
        "one-time-cleans",
        "sand-replacement",
      ],
      faqs: [
        {
          question: "Can you help with circulation and equipment issues in North Abilene?",
          answer:
            "Yes. Filter cleaning, pump diagnostics, and related maintenance support are available alongside recurring service routes.",
        },
        {
          question: "Is recurring pool service available in North Abilene?",
          answer:
            "New recurring pool-service customers are enrolled on a weekly schedule. Existing customer agreements are unchanged. Weekly availability depends on route load and your pool’s service needs.",
        },
        {
          question: "How do I confirm North Abilene availability?",
          answer:
            "Send your address and pool details by text or quote form, and we will confirm current route openings.",
        },
      ],
      imagePath: "/images/locations/north-abilene.jpg",
      imageAlt: "Pool service area in North Abilene",
      nearbyLocationSlugs: ["south-abilene", "hamby", "hawley"],
      showLocationCtaBanner: false,
    },
    {
      slug: "abilene-wylie",
      name: "Abilene Wylie",
      seoTitle: "Pool Cleaning & Pool Service in Abilene Wylie, TX | Shipwrecked Pools",
      summary: "Dependable pool service for Abilene Wylie homeowners needing recurring care and practical cleanup support.",
      heroHeadline: "Pool Service for Abilene Wylie Homeowners",
      introCopy:
        "Abilene Wylie homeowners rely on Shipwrecked Pools for recurring service plus one-time resets when weather, travel, or algae issues knock pools out of balance.",
      localContext: "Abilene Wylie routes prioritize consistent maintenance cadence with practical corrective options when needed.",
      routeNotes: "Best fit for homeowners balancing recurring upkeep with occasional cleanup or recovery needs.",
      routeAvailabilityNote: "Abilene Wylie openings are confirmed by address and current route alignment for that service window.",
      servicesOffered: [
        "weekly-services",
        "one-time-cleans",
        "algae-removal",
        "filter-cleaning",
        "drain-and-refill",
        "acid-wash",
        "pump-repair-and-installation",
        "sand-replacement",
      ],
      faqs: [
        {
          question: "Do you offer one-time pool cleans in Abilene Wylie?",
          answer:
            "Yes, one-time cleans are available for catch-up support, seasonal resets, and pre-event preparation when scheduling allows.",
        },
        {
          question: "Can Abilene Wylie service include algae recovery?",
          answer:
            "Yes. Green-to-clean and algae-removal support can be scheduled based on condition and route availability.",
        },
        {
          question: "What is the fastest way to request service in Abilene Wylie?",
          answer:
            "Texting your address and pool condition details is the quickest way to confirm route options and next steps.",
        },
      ],
      imagePath: "/images/areas-abilene-wylie.png",
      imageAlt: "Pool service area in Abilene Wylie",
      nearbyLocationSlugs: ["south-abilene", "north-abilene", "potosi"],
      showLocationCtaBanner: false,
    },
    {
      slug: "baird",
      name: "Baird",
      summary: "Local route support for Baird and nearby neighborhoods.",
      heroHeadline: "Professional Pool Care in Baird",
      introCopy:
        "Baird homeowners can get route-based service from Shipwrecked Pools with a practical focus on chemistry control and dependable visits.",
      localContext: "Baird service emphasizes clear scheduling windows and long-term water stability.",
      routeNotes: "Availability depends on current route density and seasonal demand.",
      routeAvailabilityNote: "Baird availability is confirmed after reviewing current route capacity for your area.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Baird"),
      imagePath: "/images/areas-baird.png",
      imageAlt: "Pool service area in Baird",
      nearbyLocationSlugs: ["clyde", "merkel", "north-abilene"],
    },
    {
      slug: "buffalo-gap",
      name: "Buffalo Gap",
      summary: "Professional pool care in Buffalo Gap.",
      heroHeadline: "Pool Service Routes in Buffalo Gap",
      introCopy:
        "Shipwrecked Pools provides Buffalo Gap homeowners with local route coverage focused on proactive maintenance and responsive communication.",
      localContext: "Buffalo Gap homeowners can access both recurring maintenance and corrective services.",
      routeNotes: "Texting your address is the fastest way to confirm route timing.",
      routeAvailabilityNote: "Buffalo Gap route confirmation is based on your address and current weekly route flow.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Buffalo Gap"),
      imagePath: "/images/areas-buffalogap.png",
      imageAlt: "Pool service area in Buffalo Gap",
      nearbyLocationSlugs: ["south-abilene", "potosi", "tuscola"],
    },
    {
      slug: "clyde",
      name: "Clyde",
      summary: "Reliable recurring maintenance in Clyde.",
      heroHeadline: "Clyde Pool Service with Dependable Route Coverage",
      introCopy:
        "Clyde homeowners can work with Shipwrecked Pools for recurring pool maintenance that stays focused on consistency and long-term protection.",
      localContext: "Clyde route planning is built around dependable cadence and chemistry consistency.",
      routeNotes: "Specialty service timing may vary by route load.",
      routeAvailabilityNote: "Clyde onboarding windows depend on current route planning and confirmed service needs.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Clyde"),
      imagePath: "/images/locations/clyde.jpg",
      imageAlt: "Pool service area in Clyde",
      nearbyLocationSlugs: ["baird", "merkel", "north-abilene"],
    },
    {
      slug: "hamby",
      name: "Hamby",
      summary: "Scheduled service options for Hamby pool owners.",
      heroHeadline: "Pool Care for Hamby Homeowners",
      introCopy:
        "Shipwrecked Pools supports Hamby with route-based maintenance plans that keep pool systems stable and easier to manage.",
      localContext: "Hamby coverage focuses on practical maintenance plans and proactive care.",
      routeNotes: "Coverage checks are handled quickly by text.",
      routeAvailabilityNote: "Hamby route openings are confirmed after a quick address check by text.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Hamby"),
      imagePath: "/images/locations/hamby.jpg",
      imageAlt: "Pool service area in Hamby",
      nearbyLocationSlugs: ["north-abilene", "hawley", "tye"],
    },
    {
      slug: "hawley",
      name: "Hawley",
      summary: "Pool cleaning and asset management in Hawley.",
      heroHeadline: "Hawley Pool Service from a Local Abilene Team",
      introCopy:
        "Hawley homeowners can access structured pool care through Shipwrecked Pools with clear communication and route-based service planning.",
      localContext: "Hawley homeowners can choose recurring service or targeted corrective work.",
      routeNotes: "Route availability is confirmed case-by-case.",
      routeAvailabilityNote: "Hawley coverage is confirmed individually based on current route spacing.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Hawley"),
      imagePath: "/images/areas-hawley.png",
      imageAlt: "Pool service area in Hawley",
      nearbyLocationSlugs: ["hamby", "north-abilene", "tye"],
    },
    {
      slug: "merkel",
      name: "Merkel",
      summary: "Routine and specialty service availability in Merkel.",
      heroHeadline: "Pool Maintenance and Cleanup Support in Merkel",
      introCopy:
        "Merkel pool owners can partner with Shipwrecked Pools for recurring service and corrective pool care through established local routes.",
      localContext: "Merkel routes are designed for clear communication and consistent standards.",
      routeNotes: "Recurring plans are prioritized for long-term pool stability.",
      routeAvailabilityNote: "Merkel route placement is prioritized for recurring plans and verified by current capacity.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Merkel"),
      imagePath: "/images/locations/merkel.jpg",
      imageAlt: "Pool service area in Merkel",
      nearbyLocationSlugs: ["clyde", "baird", "tye"],
    },
    {
      slug: "potosi",
      name: "Potosi",
      summary: "Potosi coverage for dependable pool maintenance.",
      heroHeadline: "Dependable Pool Service for Potosi Homes",
      introCopy:
        "Potosi homeowners can use Shipwrecked Pools for professional route-based pool care focused on chemistry control and equipment protection.",
      localContext: "Potosi pools are serviced with a data-driven chemistry and equipment-first approach.",
      routeNotes: "Texting pool details helps speed initial recommendations.",
      routeAvailabilityNote: "Potosi route timing is confirmed after reviewing your property location and service goals.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Potosi"),
      imagePath: "/images/areas-potosi.png",
      imageAlt: "Pool service area in Potosi",
      nearbyLocationSlugs: ["south-abilene", "buffalo-gap", "tuscola"],
    },
    {
      slug: "tuscola",
      name: "Tuscola",
      summary: "Recurring service and cleanup support in Tuscola.",
      heroHeadline: "Tuscola Pool Care with Structured Local Routes",
      introCopy:
        "Shipwrecked Pools helps Tuscola homeowners maintain cleaner, more stable pools through recurring plans and corrective service options.",
      localContext: "Tuscola homeowners can access recurring plans plus green-to-clean and reset services.",
      routeNotes: "Route scheduling is confirmed before onboarding.",
      routeAvailabilityNote: "Tuscola scheduling is finalized during onboarding after confirming route availability.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Tuscola"),
      imagePath: "/images/locations/tuscola.jpg",
      imageAlt: "Pool service area in Tuscola",
      nearbyLocationSlugs: ["buffalo-gap", "potosi", "south-abilene"],
    },
    {
      slug: "tye",
      name: "Tye",
      summary: "Homeowner pool service support in Tye.",
      heroHeadline: "Route-Based Pool Service in Tye",
      introCopy:
        "Tye homeowners can work with Shipwrecked Pools for practical recurring service and clear communication about pool condition and next steps.",
      localContext: "Tye service emphasizes reliable maintenance rhythm and long-term system protection.",
      routeNotes: "Contact us for current route openings and timing.",
      routeAvailabilityNote: "Tye availability is confirmed by address and current route openings.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Tye"),
      imagePath: "/images/areas-tye.png",
      imageAlt: "Pool service area in Tye",
      nearbyLocationSlugs: ["merkel", "hamby", "north-abilene"],
    },
  ] as Location[],
  diy: {
    title: "DIY Pool Care",
    summary:
      "Get our free cheat sheet and keep your pool in a healthier range between professional visits.",
    cta: { label: "Get the Free Cheat Sheet", href: "/contact" },
    points: [
      "Simple weekly checks to catch problems earlier",
      "Chemistry guardrails that improve consistency",
      "Clear signals for when to bring in professional help",
    ],
  },
  blogSummaries: [
    {
      slug: "pool-care-after-freeze-power-outage",
      title: "Pool Care After a Freeze or Power Outage",
      publishedOn: "2026-10-16",
      excerpt:
        "Safe pool and equipment observations after freezing weather, interrupted circulation, or a power outage in West Texas.",
      summaryBody:
        "After a freeze or power outage, the first decision is whether the equipment area appears safe—not how quickly the system can be restarted. Visible damage, leakage, ice, electrical concerns, interrupted circulation, debris, and changing water condition should be documented before normal operation resumes.",
      bodySections: [
        "Safety first: keep people away from visibly damaged equipment. Do not touch damaged electrical components, repeatedly reset a tripping breaker, energize equipment that is frozen, cracked, leaking, or otherwise unsafe, or disassemble a pressurized or unfamiliar component. Suspected electrical or equipment damage requires qualified help.",
        "After freezing weather: from a safe location, look for visible cracks, displaced fittings, leaks, equipment-pad water, ice around accessible components, unusual pump or filter appearance, water-level changes, and debris. A lack of visible damage does not prove that concealed components are safe or unaffected.",
        "After a power outage: record the approximate interruption duration when known and observe debris, clarity, water level, display messages, schedules, and whether equipment appears safe before normal operation resumes. Interrupted circulation can allow debris and water conditions to change even when the pool looked stable beforehand.",
        "Water and chemistry after interruption: test before adding products. Weather, debris, use, temperature, and lost circulation may all influence demand, so avoid guessed additions. Make one controlled, label-directed adjustment at a time, circulate only when the equipment is safe, and retest according to the product and equipment directions.",
        "Filter and circulation observations: compare visible return flow, skimming, bubbles, prime behavior, and filter pressure with the system's own normal baseline. There is no universal pressure threshold. Heavy debris may support filter cleaning, while weak flow, leakage, prime loss, or equipment damage may need a separate assessment.",
        "Professional help is appropriate for visible cracks, severe leakage, repeated breaker trips, burning odor, smoke, failed circulation, frozen or damaged equipment, unfamiliar restart conditions, persistent green or cloudy water, suspected plumbing or equipment damage, or any uncertainty about safe operation.",
      ],
      contextualLinks: [
        {
          before: "Use the homeowner-safe ",
          href: "/diy-pool-care/pool-equipment-troubleshooting",
          label: "Pool Equipment Troubleshooting Guide",
          after: " to document pump, filter, valve, flow, and leakage symptoms without opening equipment.",
        },
        {
          before: "For water decisions after an interruption, review ",
          href: "/diy-pool-care/pool-chemistry-troubleshooting",
          label: "Pool Chemistry Troubleshooting",
          after: " and the separate Pool Chemical Dosing & Safety guide before making controlled adjustments.",
        },
        {
          before: "If weather also brought debris or poor water conditions, compare the ",
          href: "/diy-pool-care/west-texas-storm-pool-care",
          label: "West Texas Storm Pool Care Guide",
          after: " and the Green & Cloudy Pool Recovery Guide to choose the appropriate next step.",
        },
        {
          before: "Visible equipment damage or failed circulation can be submitted through ",
          href: "/services/pool-equipment-repair",
          label: "Pool Equipment Repair",
          after: "; scope, parts, safe restart, and availability require condition-specific review.",
        },
      ],
      relatedServiceSlugs: [
        "pool-equipment-repair",
        "pump-repair-and-installation",
        "pool-plumbing-repair",
        "one-time-cleans",
        "weekly-services",
      ],
    },
    {
      slug: "west-texas-heat-dust-pollen-pool-care",
      title: "Pool Care During West Texas Heat, Dust & Pollen",
      publishedOn: "2026-10-16",
      excerpt:
        "A seasonal pool-care framework for West Texas heat, evaporation, windblown dust, pollen, yard work, filter load, and changing water demand.",
      summaryBody:
        "West Texas heat, wind, dust, and pollen can increase water loss, debris, filter load, use, and chemistry demand without the dramatic signs of a storm. A practical seasonal routine follows actual conditions instead of assuming one fixed calendar works throughout the year.",
      bodySections: [
        "West Texas heat: warmer water, evaporation, and increased swimming can change water level, sanitizer demand, and filtration load. Observe the water level, clarity, use, and circulation, and test more closely during demanding conditions without relying on unsupported evaporation rates or universal chemical targets.",
        "Dust and wind: airborne dirt can form a surface film, settle on steps and floors, load skimmers and baskets, and reach the filter. Skim, brush, vacuum, and inspect accessible debris points as conditions require; a major wind event or repeated heavy dust may support a one-time cleanup rather than ordinary maintenance alone.",
        "Pollen and organic debris: visible pollen can collect at the surface and waterline, load skimmers and filters, and affect clarity. Record recurring seasonal patterns and check whether circulation remains normal before assuming every clarity change is equipment failure.",
        "Mowing, landscaping, and nearby work: grass clippings, leaves, soil, mulch, construction dust, roof debris, and tree trimming can create a concentrated cleanup need. When possible, coordinate pool observation and cleaning around nearby work; pool service does not include unrelated landscaping or construction cleanup.",
        "Water testing and controlled adjustment: test before changing chemistry, consider debris and actual use, follow the exact product label, and record recurring demand. Automatic or guessed additions can hide the pattern without addressing filter loading, circulation, or the source of contamination.",
        "Filter and circulation: compare baskets, visible flow, bubbles, and filter pressure with the system's normal condition. A loaded filter may need cleaning, while leakage, damaged components, prime loss, or persistent weak circulation can justify equipment assessment.",
        "A practical seasonal observation includes water level, surface debris, baskets, visible circulation, filter condition, clarity, testing, brushing or vacuuming needs, equipment symptoms, and service records. Conditions—not a universal schedule—determine when attention should increase.",
        "Request professional service when heavy debris keeps returning, cloudy or green water persists, filter load exceeds routine care, circulation weakens, high-use conditions repeatedly destabilize water, or cleanup after weather or yard work becomes difficult to manage safely.",
      ],
      contextualLinks: [
        {
          before: "Build the core observation rhythm with the ",
          href: "/diy-pool-care/weekly-pool-care-guide",
          label: "Weekly Pool Care & Maintenance Guide",
          after: ", then increase attention when heat, dust, use, and debris require it.",
        },
        {
          before: "For a defined storm or heavy-rain event, use the separate ",
          href: "/diy-pool-care/west-texas-storm-pool-care",
          label: "West Texas Storm Pool Care Guide",
          after: " rather than treating gradual seasonal load as storm recovery.",
        },
        {
          before: "Persistent flow or filter symptoms can be organized with the ",
          href: "/diy-pool-care/pool-equipment-troubleshooting",
          label: "Pool Equipment Troubleshooting Guide",
          after: " before requesting professional assessment.",
        },
        {
          before: "For recurring route-based cleaning, testing, and condition reporting, explore ",
          href: "/services/weekly-services",
          label: "Weekly Pool Service",
          after: "; heavier catch-up conditions may fit a separate one-time cleaning review.",
        },
      ],
      relatedServiceSlugs: ["weekly-services", "one-time-cleans", "filter-cleaning"],
    },
    {
      slug: "pool-care-after-parties-vacations-heavy-use",
      title: "Pool Care After Parties, Vacations & Heavy Use",
      publishedOn: "2026-10-16",
      excerpt:
        "Pool and spa care before and after parties, vacations, guest stays, high occupancy, and other periods that change debris, chemistry, and filter demand.",
      summaryBody:
        "Parties, guest stays, heavy use, and long absences can change debris, water level, chemistry demand, clarity, filter loading, and equipment observations. The right response depends on whether the pool is preparing for use, recovering afterward, or being checked after time without direct owner observation.",
      bodySections: [
        "Before a party or high-use period: observe clarity, debris, water level, circulation, accessible baskets, recent test results, known equipment concerns, and service timing. Address known problems early, but do not treat a checklist or scheduled visit as a guarantee of event readiness.",
        "After heavy use: look for debris, sunscreen or body-oil residue, clarity changes, loaded baskets or filters, and increased chemistry demand. Clean suitable surfaces, test before adjusting, make controlled label-directed changes, and record patterns that repeat after similar events.",
        "After a vacation or long absence: begin with water level, debris, visible circulation, display messages, clarity, testing, visible leakage, and storm or weather effects. Confirm whether service occurred while the owner was away and whether the current condition fits routine care, one-time cleanup, recovery, or equipment assessment.",
        "Renters, guests, and changing occupancy: unpredictable use can increase debris and contaminant load. Property-specific service frequency, clear contacts, useful reporting, and escalation for abnormal conditions are more reliable than assuming every stay creates the same need; this is not property-management or housekeeping guidance.",
        "Hot tub or spa heavy use: compact water volume can show sanitizer demand, cloudiness, foam, and filter loading quickly. Increase observation when use is high, record water and filter conditions, and use the dedicated spa guide instead of duplicating or guessing at chemistry instructions.",
        "Filter and circulation observations: note accessible baskets, filter condition, visible flow, bubbles, weak circulation, leakage, unusual noise, or errors. Heavy debris may need cleaning; failed circulation or damaged equipment belongs on a separate assessment path.",
        "Routine care is not enough when green or cloudy water persists, circulation fails, debris is severe, equipment is visibly damaged, chemistry repeatedly destabilizes, the pool has been neglected, storm conditions overlap, or product handling is uncertain.",
        "Plan the service path by condition: recurring Weekly Pool Service supports an ongoing rhythm; One-Time Pool Cleaning addresses suitable catch-up conditions; Algae Removal handles evaluated recovery; rental and spa services address those specific settings; equipment concerns require separate review.",
      ],
      contextualLinks: [
        {
          before: "Use the ",
          href: "/diy-pool-care/weekly-pool-care-guide",
          label: "Weekly Pool Care & Maintenance Guide",
          after: " to organize routine observations before and after a change in use.",
        },
        {
          before: "For spa-specific high-use behavior, see the ",
          href: "/diy-pool-care/hot-tub-spa-water-care",
          label: "Hot Tub & Spa Water Care Guide",
          after: "; rental operators can also use the Short-Term Rental Pool & Hot Tub Care Checklist.",
        },
        {
          before: "Persistent green or cloudy water should follow the ",
          href: "/diy-pool-care/green-cloudy-pool-recovery",
          label: "Green & Cloudy Pool Recovery Guide",
          after: " rather than repeated unverified chemical additions.",
        },
        {
          before: "When the need is an appropriate catch-up cleaning rather than recurring service, request a review through ",
          href: "/services/one-time-cleans",
          label: "One-Time Pool Cleaning",
          after: "; starting condition determines final scope.",
        },
      ],
      relatedServiceSlugs: [
        "weekly-services",
        "one-time-cleans",
        "algae-removal",
        "short-term-rental-pool-hot-tub-cleaning",
        "hot-tub-cleaning",
        "pool-equipment-repair",
      ],
    },
    {
      slug: "how-to-clean-cartridge-filters",
      title: "How to Clean Cartridge Filters",
      publishedOn: "2025-11-26",
      excerpt:
        "A practical cleaning routine that helps maintain flow and filter performance.",
      summaryBody:
        "Cartridge filter performance depends on consistent intervals, proper rinsing technique, and replacing media before severe restriction impacts circulation.",
      bodySections: [
        "Start by shutting off the system, relieving pressure, and removing the cartridge according to manufacturer guidance. A controlled process protects both the filter housing and the media.",
        "Rinse each pleat top-to-bottom with steady pressure and inspect for tears, flattening, or heavy scale. If the cartridge is physically damaged or badly compacted, replacement is usually a better long-term choice than repeated deep cleaning.",
        "After reassembly, check startup pressure and record the clean baseline. That number helps you spot when filtration performance is sliding and when professional service should step in.",
      ],
      contextualLinks: [
        {
          before: "If pressure, flow, leakage, or returning debris suggests more than routine cartridge cleaning, use the ",
          href: "/diy-pool-care/pool-equipment-troubleshooting",
          label: "Pool Equipment Troubleshooting Guide",
          after: " to document the symptom before choosing cleaning, repair, or replacement.",
        },
        {
          before: "If you would rather have the condition assessed and the filter handled professionally, Shipwrecked offers ",
          href: "/services/filter-cleaning",
          label: "pool filter cleaning for cartridge, DE, and sand filters",
          after: "; this cartridge procedure does not apply to every filter type.",
        },
      ],
      relatedServiceSlugs: ["filter-cleaning", "weekly-services"],
    },
    {
      slug: "low-calcium-pool-corrosion-risk",
      title: "Low Calcium: Pool Corrosion Risk",
      publishedOn: "2025-11-19",
      excerpt: "How calcium balance affects long-term equipment and surface health.",
      summaryBody:
        "Low calcium can make water aggressive, increasing wear risk on surfaces and components. LSI-balanced chemistry is the safer long-term target.",
      bodySections: [
        "Calcium hardness is one part of overall water balance, but it has outsized impact on plaster and equipment longevity. When water is too aggressive, it can pull minerals from surfaces over time.",
        "The practical goal is balanced chemistry, not chasing one isolated number. Pair calcium readings with pH, alkalinity, and temperature context so adjustments move the water toward a stable LSI range.",
        "If readings drift repeatedly, recurring professional checks can prevent corrective swings and help protect finishes, heaters, and circulation components.",
      ],
      contextualLinks: [
        {
          before: "Review calcium together with pH, alkalinity, temperature, and the wider ",
          href: "/diy-pool-care/pool-chemistry-troubleshooting",
          label: "Pool Chemistry Troubleshooting Guide",
          after: " rather than correcting one reading in isolation.",
        },
        {
          before: "For homeowners who want ongoing testing and practical chemistry adjustments, ",
          href: "/services/weekly-services",
          label: "Weekly Pool Service",
          after: " provides a recurring maintenance path without guaranteeing prevention of every corrosion issue.",
        },
      ],
      relatedServiceSlugs: ["weekly-services", "drain-and-refill"],
    },
    {
      slug: "fiberglass-pool-maintenance-tips",
      title: "Fiberglass Pool Maintenance Tips",
      publishedOn: "2025-11-12",
      excerpt:
        "Key maintenance habits that keep fiberglass pools cleaner and easier to manage.",
      summaryBody:
        "Fiberglass pools still need disciplined chemistry and filtration routines. Consistency is what keeps maintenance easy over time.",
      bodySections: [
        "Fiberglass pools can be more forgiving on brushing than rougher finishes, but chemistry discipline still drives long-term clarity and comfort. Skipping tests often leads to avoidable drift.",
        "Keep circulation and filtration on a predictable cadence, especially during heavy-use periods. Clean filters and stable sanitizer levels do more for clarity than occasional one-off corrections.",
        "A recurring plan with periodic equipment checks helps fiberglass pools stay low-stress while reducing the likelihood of expensive catch-up work.",
      ],
      contextualLinks: [
        {
          before: "The ",
          href: "/diy-pool-care/weekly-pool-care-guide",
          label: "Weekly Pool Care & Maintenance Guide",
          after: " provides a broader homeowner routine for cleaning, testing, circulation observations, and escalation.",
        },
        {
          before: "If you prefer professional help with applicable routine cleaning, chemistry care, and equipment observations, explore ",
          href: "/services/weekly-services",
          label: "Weekly Pool Service",
          after: ".",
        },
      ],
      relatedServiceSlugs: ["weekly-services", "filter-cleaning"],
    },
    {
      slug: "which-pool-cleaner-is-right",
      title: "Which Pool Cleaner is Right?",
      publishedOn: "2025-11-05",
      excerpt:
        "A framework for choosing the cleaner type that fits your pool and routine.",
      summaryBody:
        "Cleaner selection should account for debris load, pool shape, and owner preferences. A practical match improves day-to-day maintenance outcomes.",
      bodySections: [
        "Start with debris type and volume. Leaves, fine dust, and heavier organic load can demand different cleaner behavior and filtration support.",
        "Pool shape, obstacles, and owner routine matter just as much as cleaner specs. The best fit is the one you can run consistently without adding maintenance friction.",
        "If cleaner performance remains uneven after setup changes, system-level checks on flow, filter condition, and overall service cadence are usually the next practical step.",
      ],
      contextualLinks: [
        {
          before: "If an existing cleaner stops, tangles, misses debris, or changes climbing behavior, use the ",
          href: "/diy-pool-care/pool-cleaner-robot-troubleshooting",
          label: "Pool Cleaner & Robot Troubleshooting Guide",
          after: " for robotic, suction-side, and pressure-side observations.",
        },
        {
          before: "Cleaner performance that changes with weak flow or filter symptoms may belong on the broader ",
          href: "/diy-pool-care/pool-equipment-troubleshooting",
          label: "Pool Equipment Troubleshooting Guide",
          after: ".",
        },
        {
          before: "Choosing a cleaner means owning and managing equipment; homeowners who would rather outsource ongoing cleaning and water care can consider ",
          href: "/services/weekly-services",
          label: "professional weekly pool maintenance",
          after: ".",
        },
      ],
      relatedServiceSlugs: ["filter-cleaning", "pump-repair-and-installation"],
    },
    {
      slug: "black-algae-the-pool-owners-nightmare",
      title: "Black Algae: The Pool Owner’s Nightmare",
      publishedOn: "2025-10-29",
      excerpt:
        "Why black algae persists and what a professional remediation path looks like.",
      summaryBody:
        "Black algae can anchor deep in surface imperfections, requiring a staged corrective process rather than one-time shock treatment.",
      bodySections: [
        "Black algae is persistent because it can anchor below the visible surface layer. A one-step shock approach often misses the deeper hold points, but not every dark pool spot is black algae and the condition should be assessed before choosing a treatment path.",
        "Professional recovery generally combines targeted brushing, chemistry control, and follow-up checks to confirm progress between treatment stages.",
        "Once water stabilizes, recurring maintenance and filtration discipline are critical to reducing the chance of fast recurrence.",
      ],
      contextualLinks: [
        {
          before: "Use the ",
          href: "/diy-pool-care/green-cloudy-pool-recovery",
          label: "Green & Cloudy Pool Recovery Guide",
          after: " to compare algae concerns, clarity, circulation, filter load, and staged recovery decisions.",
        },
        {
          before: "For an active or severe algae condition, start with Shipwrecked's separate ",
          href: "/services/algae-removal",
          label: "corrective Green-to-Clean pool recovery service",
          after: ", which is evaluated and handled apart from routine maintenance.",
        },
        {
          before: "After corrective work is complete and the water has stabilized, ",
          href: "/services/weekly-services",
          label: "Weekly Pool Service",
          after: " can support ongoing cleaning, chemistry care, and equipment observations.",
        },
      ],
      relatedServiceSlugs: ["algae-removal", "weekly-services"],
    },
    {
      slug: "salt-pool-maintenance-checklist",
      title: "Salt Pool Maintenance Checklist",
      publishedOn: "2025-10-22",
      excerpt: "A seasonal checklist for keeping salt pools balanced and stable.",
      summaryBody:
        "Salt pools still depend on full chemistry management, filtration discipline, and periodic system checks to avoid gradual performance drift.",
      bodySections: [
        "Salt systems still require full water management, including pH, alkalinity, stabilizer, and calcium oversight. Chlorine generation does not replace routine testing.",
        "Inspect cell condition, clean filters on schedule, and verify circulation performance before peak season demand builds up.",
        "When seasonal drift or repeated balancing issues show up, a structured service cadence can restore consistency and protect equipment life.",
      ],
      contextualLinks: [
        {
          before: "For relationships among chlorine production, pH, alkalinity, calcium, and stabilizer, review ",
          href: "/diy-pool-care/pool-chemistry-troubleshooting",
          label: "Pool Chemistry Troubleshooting",
          after: ".",
        },
        {
          before: "Before adding any product, follow the controlled process in the ",
          href: "/diy-pool-care/pool-chemical-dosing-safety",
          label: "Pool Chemical Dosing & Safety Guide",
          after: ".",
        },
        {
          before: "Salt pools are not maintenance-free; homeowners who prefer ongoing professional cleaning, testing, and practical chemistry adjustments can explore ",
          href: "/services/weekly-services",
          label: "Weekly Pool Service",
          after: ".",
        },
      ],
      relatedServiceSlugs: ["weekly-services", "filter-cleaning"],
    },
  ] as BlogSummary[],
  careers: {
    title: "Join the Shipwrecked Pools Team",
    summary:
      "We are hiring dependable team members who want training, growth, and a supportive culture.",
    requirements: ["Own truck required"],
    benefits: [
      "Competitive hourly rate with bonus opportunities",
      "Training and professional development",
      "Equipment provided",
      "Gym membership or shoe allowance",
      "Supportive culture",
    ],
  },
  guarantees: ["100% money-back guarantee"],
};
