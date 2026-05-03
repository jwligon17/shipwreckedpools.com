export type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

export type Service = {
  slug: string;
  name: string;
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
  icon: "weekly" | "biweekly" | "algae" | "acidWash" | "drainRefill" | "filter" | "pump" | "oneTime" | "sand";
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
  reviewCount: 35,
  displayReviewCount: "35+",
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
  "bi-weekly-services",
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
    description:
      "Professional pool cleaning and pool asset management for homeowners who want clear water and long-term protection of equipment and plaster.",
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
      titleLines: ["Professional Pool Care", "Built for Clear Water."],
      description:
        "From weekly maintenance to green-to-clean recovery and equipment support, Shipwrecked Pools helps Abilene homeowners protect their water, equipment, and weekends.",
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
    proof: {
      title: "The Proof is in the Pool",
      supportingLine:
        "See how professional pool care can turn cloudy, green, or neglected water back into something clear, clean, and ready to enjoy.",
    },
    reviews: {
      title: "Why Homeowners Trust Shipwrecked Pools",
      supportingLine: "Rated 5.0 on Google with 35+ reviews from local homeowners.",
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
        "Protect Your Pool System.",
        "Get Your Saturdays Back.",
        "Keep Water Crystal Clear.",
      ],
      description:
        "Weekly service, green-to-clean recovery, and filter care for Abilene homeowners who want clear water and protected equipment.",
      primaryCta: { label: "Get a Quote", href: "/contact" },
      secondaryCta: { label: "Text Us", href: "sms:+13256658877", external: true },
      tertiaryCta: { label: "Pay Now", href: "/pay-now" },
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
      supportingLine: "Rated 5.0 on Google with 35+ reviews from local homeowners.",
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
          title: "Bi-Weekly Services",
          summary:
            "A practical maintenance option for pools that need dependable care on a lighter recurring schedule.",
          href: "/services/bi-weekly-services",
          icon: "biweekly",
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
      summary:
        "Consistent recurring pool care designed to keep water clear and your system performing week after week.",
      supportingParagraph:
        "Weekly service helps homeowners stay ahead of chemistry drift, debris buildup, and avoidable equipment strain.",
      idealFor: "Homeowners who want dependable weekly maintenance and stable water quality.",
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
          question: "Who is weekly service best for?",
          answer:
            "Weekly service is usually the best fit for homeowners who want dependable hands-off care and consistent water quality through the season.",
        },
        {
          question: "Do you check chemistry every visit?",
          answer:
            "Yes. Chemistry is tested and adjusted each service visit as part of our recurring care process.",
        },
        {
          question: "Will you notify me if you spot equipment concerns?",
          answer:
            "Yes. We flag concerns early and communicate practical next steps before issues turn into bigger disruptions.",
        },
      ],
      relatedServices: ["bi-weekly-services", "filter-cleaning", "pump-repair-and-installation"],
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
      slug: "bi-weekly-services",
      name: "Bi-Weekly Services",
      summary:
        "A practical recurring service option for pools that can stay stable with professional care every other week.",
      supportingParagraph:
        "Bi-weekly service gives homeowners structured support on a lighter cadence while keeping water quality and system health in view.",
      idealFor: "Homeowners looking for scheduled maintenance on a lighter recurring cadence.",
      problemStatement:
        "Pools managed without a schedule can drift out of range, especially when maintenance happens reactively instead of by plan.",
      solutionStatement:
        "Bi-weekly service provides repeatable cleaning and balancing visits with clear recommendations to support stability between appointments.",
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
            "Bi-weekly follows the same professional approach but on an every-other-week schedule for pools that can hold stability on a lighter cadence.",
        },
        {
          question: "Can I switch to weekly later?",
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
      ctaTitle: "Need recurring care on a lighter schedule?",
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
      summary:
        "Structured remediation to recover unhealthy water and return your pool to stable, swimmable condition.",
      supportingParagraph:
        "When water turns cloudy or green, a clear process matters more than guesswork treatments.",
      idealFor: "Pools with visible algae growth, cloudy water, or failed sanitizer balance.",
      problemStatement:
        "Algae growth can overwhelm normal maintenance, reduce water clarity, and make the pool frustrating or unsafe to use.",
      solutionStatement:
        "We diagnose current conditions, run a staged cleanup process, and follow through with balancing steps to support ongoing stability.",
      bullets: [
        "Diagnosis of algae severity and circulation limits",
        "Targeted treatment and recovery sequencing",
        "Follow-up balancing and prevention roadmap",
      ],
      process: [
        "Assess condition and build treatment sequence",
        "Execute clearing stages with chemistry control",
        "Stabilize water and establish prevention plan",
        "Perform follow-up checks and adjustments as conditions improve",
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
            "Yes. Green-to-clean recovery is built for pools with heavy algae pressure and poor water clarity.",
        },
        {
          question: "Is algae cleanup a one-step treatment?",
          answer:
            "Usually no. Most recoveries require staged treatment, cleanup, and follow-up balancing to get stable results.",
        },
        {
          question: "What happens after water clears?",
          answer:
            "After visual recovery, we confirm chemistry stability and provide practical next steps to help prevent recurrence.",
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
      showBenefitsSection: false,
      summary:
        "Surface restoration service for stained plaster when a deep reset is necessary.",
      supportingParagraph:
        "When stains or buildup go beyond standard cleaning, acid wash can provide a controlled surface reset.",
      idealFor: "Plaster pools with stubborn staining that standard cleaning cannot resolve.",
      problemStatement:
        "Surface staining and buildup can remain even with regular brushing and chemistry corrections.",
      solutionStatement:
        "We use a controlled drain-and-treat process, then restart water balance so the pool can return to a manageable maintenance baseline.",
      bullets: [
        "Drain-and-prepare workflow",
        "Controlled surface treatment by condition",
        "Managed refill and chemistry restart",
      ],
      process: [
        "Evaluate finish condition and confirm acid wash is the right solution",
        "Perform controlled wash steps",
        "Refill, rebalance, and verify safe startup",
        "Provide post-service care guidance for ongoing maintenance",
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
            "Not always. It is typically recommended when surface staining is beyond what normal cleaning can reasonably correct.",
        },
        {
          question: "Do you rebalance the pool after refill?",
          answer:
            "Yes. Post-service startup includes balancing and verification steps after the refill process.",
        },
        {
          question: "Will acid wash replace regular maintenance?",
          answer:
            "No. Acid wash is a reset service, and recurring maintenance is still important for long-term water and surface care.",
        },
      ],
      relatedServices: ["drain-and-refill", "weekly-services", "filter-cleaning"],
      ctaTitle: "Is your pool finish ready for a reset?",
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "A controlled acid wash can restore appearance and set a stronger starting point for ongoing maintenance.",
        beforeImagePath: "/images/services/acid-wash-proof-before.png",
        afterImagePath: "/images/services/acid-wash-proof-after.png",
      },
    },
    {
      slug: "drain-and-refill",
      name: "Drain & Refill",
      showBenefitsSection: false,
      summary:
        "Managed water replacement to reset chemistry when total dissolved solids or imbalance call for a hard reset.",
      supportingParagraph:
        "When chemistry has drifted beyond practical correction, a managed drain and refill can restore control.",
      idealFor: "Pools with persistent chemistry drift that no longer responds to standard balancing.",
      problemStatement:
        "Some pools reach a point where routine adjustments no longer hold, and water quality remains difficult to stabilize.",
      solutionStatement:
        "We plan a safe drain-and-refill sequence and restart chemistry targets so homeowners have a cleaner baseline to maintain.",
      bullets: [
        "Site-safe draining and refill process",
        "Post-fill chemistry startup",
        "Equipment and circulation verification",
      ],
      process: [
        "Confirm reset need and prepare drainage plan",
        "Coordinate drain, refill, and restart sequence",
        "Dial in baseline chemistry targets",
        "Verify circulation and sanitizer performance after startup",
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
            "Drain and refill addresses water-reset conditions, but ongoing maintenance is still important for long-term performance.",
        },
      ],
      relatedServices: ["acid-wash", "weekly-services", "filter-cleaning"],
      ctaTitle: "Need a chemistry reset for your pool?",
    },
    {
      slug: "filter-cleaning",
      name: "Filter Cleaning",
      showBenefitsSection: false,
      summary:
        "Performance-focused filter maintenance that supports circulation, clarity, and equipment longevity.",
      supportingParagraph:
        "Filtration is one of the biggest drivers of water clarity, and neglected filters can drag down the entire system.",
      idealFor: "Pools with reduced flow, elevated pressure, or declining clarity.",
      problemStatement:
        "Restricted or dirty filters reduce circulation efficiency and can make clear water harder to maintain.",
      solutionStatement:
        "We service filter components, verify flow and pressure, and provide a clear cadence for future cleanings.",
      bullets: [
        "Filter breakdown and cleanout",
        "Flow and pressure review",
        "Recommended maintenance cadence",
      ],
      process: [
        "Shut down and open filter assembly",
        "Clean internal media/components",
        "Restart system and verify performance",
        "Record a clean pressure baseline for future maintenance checks",
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
          question: "Does filter cleaning help water clarity right away?",
          answer:
            "Clean filtration often improves circulation performance quickly, which supports better clarity.",
        },
        {
          question: "Will you recommend a maintenance cadence?",
          answer:
            "Yes. We provide practical guidance based on observed filter condition and pool demands.",
        },
      ],
      relatedServices: ["weekly-services", "bi-weekly-services", "pump-repair-and-installation"],
      ctaTitle: "Need your filtration performance back?",
    },
    {
      slug: "sand-replacement",
      name: "Sand Replacement",
      showBenefitsSection: false,
      showProofSection: false,
      summary:
        "Media replacement for sand filters to recover filtration efficiency and improve water quality.",
      supportingParagraph:
        "Aging filter media can limit filtration performance and make clarity harder to maintain.",
      idealFor: "Sand filter systems with aging media and recurring clarity issues.",
      problemStatement:
        "Old or compacted sand media can reduce filtration effectiveness and contribute to recurring water-quality frustration.",
      solutionStatement:
        "We replace worn media, restart the filter correctly, and confirm operation so homeowners can maintain cleaner water more consistently.",
      bullets: [
        "Old media removal",
        "Fresh media installation",
        "System restart and verification",
      ],
      process: [
        "Inspect filter condition and remove old media",
        "Install and level new sand media",
        "Run startup sequence and confirm clarity gains",
        "Set and document a clean baseline for future pressure comparisons",
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
            "Replacement is typically considered when filtration performance declines and clarity issues persist despite routine care.",
        },
        {
          question: "Does sand replacement include startup checks?",
          answer:
            "Yes. We restart and verify the system after media replacement.",
        },
        {
          question: "Will this replace ongoing maintenance?",
          answer:
            "No. Sand replacement improves filtration foundation, but recurring cleaning and balancing still matter.",
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
      summary:
        "Professional troubleshooting, repair, and replacement support for pool pumps and circulation performance.",
      supportingParagraph:
        "Your pump drives circulation, and when it underperforms, water quality and system reliability both suffer.",
      idealFor: "Pools with weak circulation, pump noise, prime loss, or aging pump equipment.",
      problemStatement:
        "Pump issues can reduce flow, affect sanitation support, and create repeated disruptions if left unresolved.",
      solutionStatement:
        "We diagnose pump behavior, recommend repair or replacement based on condition, and verify operation after service.",
      bullets: [
        "Pump performance diagnostics and issue identification",
        "Repair recommendations based on condition and reliability",
        "Replacement and installation support when needed",
      ],
      process: [
        "Inspect pump behavior, flow, and operating condition",
        "Complete repair or replacement path based on findings",
        "Restart, verify circulation, and confirm stable operation",
        "Review practical operating and maintenance next steps with the homeowner",
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
            "Yes. Pump diagnostics are part of this service to identify likely causes and practical next steps.",
        },
        {
          question: "Do you only install new pumps?",
          answer:
            "No. We evaluate whether repair or replacement is the better path based on condition and reliability.",
        },
        {
          question: "Will circulation be verified after service?",
          answer:
            "Yes. We confirm operation and flow performance after repair or installation work.",
        },
      ],
      relatedServices: ["filter-cleaning", "weekly-services", "bi-weekly-services"],
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
      slug: "one-time-cleans",
      name: "One Time Cleans",
      summary:
        "Targeted single-visit pool cleanup service for special events, seasonal resets, or catch-up needs.",
      supportingParagraph:
        "When your pool needs immediate attention, a one-time clean can reset conditions and clarify next steps.",
      idealFor: "Homeowners needing a one-off cleanup without starting recurring service immediately.",
      problemStatement:
        "Pools can fall behind after weather, travel, or heavy use, and catching up can feel overwhelming without a plan.",
      solutionStatement:
        "We complete a focused cleanup and balancing visit, then share practical recommendations for what to do next.",
      bullets: [
        "Debris removal and visible cleanup",
        "Water test with practical chemistry corrections",
        "Condition notes with recommended next steps",
      ],
      process: [
        "Assess current pool condition and immediate priorities",
        "Perform focused cleaning and water-balance corrections",
        "Share a practical follow-up plan for ongoing care",
        "Document whether recurring service would improve long-term stability",
      ],
      standards: [
        "Focused service built around current pool condition",
        "Clear communication on what was handled",
        "Actionable recommendations for next steps",
      ],
      outcomes: [
        "Cleaner pool condition in a single service visit",
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
          question: "Will I get recommendations after the visit?",
          answer:
            "Yes. We provide practical notes on current condition and next-step options.",
        },
        {
          question: "Can one-time service turn into recurring care later?",
          answer:
            "Yes. If ongoing support is needed, we can recommend an appropriate recurring service path.",
        },
      ],
      relatedServices: ["weekly-services", "bi-weekly-services", "algae-removal"],
      ctaTitle: "Need a one-time reset for your pool?",
      showBenefitsSection: false,
      showProofSection: false,
      proof: {
        heading: "The Proof is in the Pool",
        body:
          "A focused one-time clean can quickly improve current conditions and provide a clear plan for ongoing care.",
        beforeImagePath: "/images/proof-one-time-cleans-before.jpg",
        afterImagePath: "/images/proof-one-time-cleans-after.jpg",
      },
    },
  ] as Service[],
  locations: [
    {
      slug: "south-abilene",
      name: "South Abilene",
      summary: "Residential pool service coverage throughout South Abilene neighborhoods.",
      heroHeadline: "Pool Service for South Abilene Homeowners",
      introCopy:
        "Shipwrecked Pools supports South Abilene homeowners with dependable pool care built around communication, consistency, and long-term water quality.",
      localContext: "South Abilene routes prioritize consistent recurring visits and practical response planning.",
      routeNotes: "Best fit for homeowners who want dependable weekly or bi-weekly scheduling.",
      routeAvailabilityNote: "South Abilene route placement is based on current scheduling density and onboarding windows.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("South Abilene"),
      imagePath: "/images/locations/south-abilene.jpg",
      imageAlt: "Pool service area in South Abilene",
      nearbyLocationSlugs: ["north-abilene", "potosi", "buffalo-gap"],
      showLocationCtaBanner: false,
    },
    {
      slug: "north-abilene",
      name: "North Abilene",
      summary: "Consistent route coverage for North Abilene homeowners.",
      heroHeadline: "Pool Service for North Abilene Neighborhoods",
      introCopy:
        "North Abilene pool owners rely on Shipwrecked Pools for recurring maintenance that protects water clarity and equipment performance.",
      localContext: "North Abilene pools benefit from structured recurring care and proactive equipment checks.",
      routeNotes: "Route planning supports both recurring service and selected specialty work.",
      routeAvailabilityNote: "North Abilene route timing is confirmed by address and current technician load.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("North Abilene"),
      imagePath: "/images/locations/north-abilene.jpg",
      imageAlt: "Pool service area in North Abilene",
      nearbyLocationSlugs: ["south-abilene", "hamby", "hawley"],
      showLocationCtaBanner: false,
    },
    {
      slug: "abilene-wylie",
      name: "Abilene Wylie",
      summary: "Route-based pool service support for Abilene Wylie homeowners.",
      heroHeadline: "Pool Service for Abilene Wylie Homeowners",
      introCopy:
        "Shipwrecked Pools provides Abilene Wylie homeowners with practical, dependable pool care focused on clear water, communication, and long-term equipment protection.",
      localContext: "Abilene Wylie coverage is built around recurring route consistency and responsive support when pool conditions change.",
      routeNotes: "Best fit for homeowners who want structured recurring service and clear follow-up communication.",
      routeAvailabilityNote: "Abilene Wylie route availability is confirmed by address and current route capacity.",
      servicesOffered: defaultLocationServiceSlugs,
      faqs: buildLocationFaqs("Abilene Wylie"),
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
      slug: "how-to-clean-cartridge-filters",
      title: "How to Clean Cartridge Filters",
      publishedOn: "2025-11-26",
      excerpt:
        "A practical cleaning routine that helps maintain flow and filter performance.",
      summaryBody:
        "Cartridge filter performance depends on consistent intervals, proper rinsing technique, and replacing media before severe restriction impacts circulation.",
    },
    {
      slug: "low-calcium-pool-corrosion-risk",
      title: "Low Calcium: Pool Corrosion Risk",
      publishedOn: "2025-11-19",
      excerpt: "How calcium balance affects long-term equipment and surface health.",
      summaryBody:
        "Low calcium can make water aggressive, increasing wear risk on surfaces and components. LSI-balanced chemistry is the safer long-term target.",
    },
    {
      slug: "fiberglass-pool-maintenance-tips",
      title: "Fiberglass Pool Maintenance Tips",
      publishedOn: "2025-11-12",
      excerpt:
        "Key maintenance habits that keep fiberglass pools cleaner and easier to manage.",
      summaryBody:
        "Fiberglass pools still need disciplined chemistry and filtration routines. Consistency is what keeps maintenance easy over time.",
    },
    {
      slug: "which-pool-cleaner-is-right",
      title: "Which Pool Cleaner is Right?",
      publishedOn: "2025-11-05",
      excerpt:
        "A framework for choosing the cleaner type that fits your pool and routine.",
      summaryBody:
        "Cleaner selection should account for debris load, pool shape, and owner preferences. A practical match improves day-to-day maintenance outcomes.",
    },
    {
      slug: "black-algae-the-pool-owners-nightmare",
      title: "Black Algae: The Pool Owner’s Nightmare",
      publishedOn: "2025-10-29",
      excerpt:
        "Why black algae persists and what a professional remediation path looks like.",
      summaryBody:
        "Black algae can anchor deep in surface imperfections, requiring a staged corrective process rather than one-time shock treatment.",
    },
    {
      slug: "salt-pool-maintenance-checklist",
      title: "Salt Pool Maintenance Checklist",
      publishedOn: "2025-10-22",
      excerpt: "A seasonal checklist for keeping salt pools balanced and stable.",
      summaryBody:
        "Salt pools still depend on full chemistry management, filtration discipline, and periodic system checks to avoid gradual performance drift.",
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
