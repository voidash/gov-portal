export const LOCALES = ["en", "ne"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

const en = {
  brand: "Gov Portal",
  govStrip: {
    government: "नेपाल सरकार · Government of Nepal",
    tagline: "Public collaboration portal",
  },
  nav: {
    home: "Home",
    project: "Project",
    issues: "Issues",
    members: "Members",
    about: "About",
  },
  session: {
    signIn: "Sign in with GitHub",
    signOut: "Sign out",
  },
  home: {
    eyebrow: "Built in public",
    title: "Public technology, built in public.",
    lede: "One project, its open issues, and the people contributing to it. Work happens on GitHub; this portal keeps the public record.",
    browseIssues: "Browse open issues",
    viewProject: "View the project",
    stats: {
      openIssues: "Open issues",
      members: "Approved members",
      repo: "Repository",
      lastSync: "Last GitHub sync",
      never: "Not synced yet",
    },
    how: {
      title: "How it works",
      step1Title: "Pick an open issue",
      step1Body: "Issues are synced from the project's public GitHub repository.",
      step2Title: "Contribute on GitHub",
      step2Body: "Comment, fork, and open a pull request. Review stays in the repository.",
      step3Title: "Get recognised",
      step3Body: "Approved members appear in the public directory after admin review.",
    },
  },
  stats: {
    openIssues: "Open issues",
    members: "Approved members",
  },
  issues: {
    title: "Open issues",
    lede: "Every open issue synchronised from the project's public repository. Pick one and work in the repository.",
    searchPlaceholder: "Search issues",
    search: "Search",
    allLabels: "All labels",
    empty: "No open issues match.",
    openedBy: "opened by",
    updated: "updated",
    comments: "comments",
    readIssue: "Read issue",
    github: "Open on GitHub",
  },
  issue: {
    back: "Back to issues",
    openedBy: "opened by",
    updated: "Updated",
    github: "Open on GitHub",
  },
  project: {
    tabs: {
      overview: "Overview",
      issues: "Issues",
      contribute: "Contribute",
    },
    about: "About this project",
    noDescription: "No description yet.",
    sidebar: {
      repository: "Repository",
      license: "License",
      openIssues: "Open issues",
      members: "Approved members",
      lastSync: "Last GitHub sync",
      never: "Not synced yet",
    },
    contributeTitle: "How to contribute",
    contributeBody:
      "Work happens in the repository: pick an open issue, discuss it there, and open a pull request. This portal tracks open issues and the approved member directory; it does not host code or handle review.",
    visit: "Open on GitHub",
  },
  members: {
    title: "Member directory",
    lede: "People approved by the portal admin. Sign in with GitHub and complete your profile to be considered.",
    search: "Search members",
    skill: "Skill",
    allSkills: "All skills",
    empty: "No members match.",
  },
  member: {
    back: "Back to directory",
    about: "About",
    links: "Links",
    skills: "Skills",
    viewOnGithub: "View on GitHub",
    notFoundTitle: "Profile not available",
    notFoundBody:
      "This member either does not exist or has not been approved for the public directory.",
  },
  profile: {
    title: "Your profile",
    lede: "Your public profile and moderation status.",
    signInTitle: "Sign in to manage your profile",
    signInBody:
      "Use your GitHub account. New accounts start as pending until the admin approves them.",
    status: {
      pending: "Your profile is awaiting review. It is not visible in the public directory yet.",
      approved: "Your profile is approved and visible in the public directory.",
      rejected: "Your profile was not approved for the public directory.",
      hidden: "Your profile is currently hidden from the public directory.",
    },
    statusShort: {
      pending: "pending",
      approved: "approved",
      rejected: "rejected",
      hidden: "hidden",
    },
    fields: {
      displayName: "Display name",
      displayNameHelp: "Required, up to 80 characters, no URLs.",
      headline: "Headline",
      headlinePlaceholder: "e.g. Backend engineer",
      affiliation: "Affiliation",
      affiliationPlaceholder: "e.g. Tribhuvan University",
      location: "Location",
      locationPlaceholder: "e.g. Kathmandu",
      bio: "Bio",
      bioHelp: "Up to 400 characters of plain text.",
      links: "Links",
      linksHelp: "Up to 5 links, HTTPS only.",
      addLink: "Add link",
      remove: "Remove",
      skills: "Skills",
      skillsHelp: "Pick from the fixed taxonomy.",
    },
    save: "Save profile",
    saving: "Saving…",
    saved: "Profile saved.",
    saveError: "Could not save your profile.",
  },
  admin: {
    title: "Member moderation",
    lede: "Approve, reject, hide, or prioritize members in the public directory.",
    signInTitle: "Sign in to moderate members",
    signInBody: "Only GitHub accounts listed in ADMIN_GITHUB_IDS can use this page.",
    notAuthorizedTitle: "Not authorized",
    notAuthorizedBody:
      "This account is not an admin. Add the numeric GitHub ID to ADMIN_GITHUB_IDS to grant access.",
    tabs: {
      pending: "pending",
      approved: "approved",
      rejected: "rejected",
      hidden: "hidden",
    },
    approve: "Approve",
    reject: "Reject",
    hide: "Hide",
    priority: "Priority",
    setPriority: "Set",
    noMembers: "No members in this state.",
    actionError: "Action failed.",
  },
  about: {
    title: "How to contribute",
    lede: "A practical path from finding public-interest work to leaving a visible record of what changed.",
    sections: {
      findTitle: "1. Find open work",
      findBody:
        "Browse the project's open issues. Each one is a task maintained in the repository, with labels such as good first issue.",
      workTitle: "2. Work on GitHub",
      workBody:
        "Comment on the issue to signal intent, fork the repository, and open a pull request. Discussion and review stay in the repository.",
      recordTitle: "3. Leave a public record",
      recordBody:
        "Sign in with GitHub and keep your profile current. Approved members are listed in the public directory.",
      limitsTitle: "What this portal is — and is not",
      limitsBody:
        "This portal indexes open issues and approved members. It is not a code host, not an employment offer, and not a guarantee that a contribution will be merged.",
    },
  },
  footer: {
    note: "Gov Portal — an open register of public-interest technology work.",
    repository: "Source on GitHub",
    api: "REST API",
  },
  common: {
    loading: "Loading…",
    skipToContent: "Skip to content",
    backHome: "Back to home",
    notFoundTitle: "Page not found",
    notFoundBody: "That address does not exist on this portal.",
    errorTitle: "Something went wrong",
    issue: "issue",
    issues: "issues",
  },
};

export type Dictionary = typeof en;

const ne: Dictionary = {
  brand: "Gov Portal",
  govStrip: {
    government: "नेपाल सरकार · Government of Nepal",
    tagline: "सार्वजनिक सहयोग मञ्च",
  },
  nav: {
    home: "गृहपृष्ठ",
    project: "परियोजना",
    issues: "समस्याहरू",
    members: "सदस्यहरू",
    about: "परिचय",
  },
  session: {
    signIn: "GitHub बाट साइन इन",
    signOut: "साइन आउट",
  },
  home: {
    eyebrow: "खुलै रूपमा निर्मित",
    title: "सार्वजनिक प्रविधि, खुलै रूपमा निर्मित।",
    lede: "एक परियोजना, त्यसका खुला समस्याहरू, र योगदान गर्ने मानिसहरू। काम GitHub मा हुन्छ; यो पोर्टलले सार्वजनिक अभिलेख राख्छ।",
    browseIssues: "खुला समस्याहरू हेर्नुहोस्",
    viewProject: "परियोजना हेर्नुहोस्",
    stats: {
      openIssues: "खुला समस्या",
      members: "स्वीकृत सदस्य",
      repo: "रिपोजिटरी",
      lastSync: "अन्तिम GitHub सिंक",
      never: "अझै सिंक भएको छैन",
    },
    how: {
      title: "यो कसरी काम गर्छ",
      step1Title: "खुला समस्या छान्नुहोस्",
      step1Body: "समस्याहरू परियोजनाको सार्वजनिक GitHub रिपोजिटरीबाट सिंक गरिन्छ।",
      step2Title: "GitHub मा योगदान गर्नुहोस्",
      step2Body: "टिप्पणी गर्नुहोस्, फोर्क गर्नुहोस् र पुल रिक्वेस्ट खोल्नुहोस्। समीक्षा रिपोजिटरीमै हुन्छ।",
      step3Title: "मान्यता पाउनुहोस्",
      step3Body: "एड्मिन स्वीकृति पछि सदस्यहरू सार्वजनिक निर्देशिकामा देखिन्छन्।",
    },
  },
  stats: {
    openIssues: "खुला समस्या",
    members: "स्वीकृत सदस्य",
  },
  issues: {
    title: "खुला समस्याहरू",
    lede: "परियोजनाको सार्वजनिक रिपोजिटरीबाट सिंक गरिएका सबै खुला समस्याहरू। एउटा छान्नुहोस् र रिपोजिटरीमै काम गर्नुहोस्।",
    searchPlaceholder: "समस्या खोज्नुहोस्",
    search: "खोज्नुहोस्",
    allLabels: "सबै लेबल",
    empty: "मिल्ने खुला समस्या भेटिएन।",
    openedBy: "खोलेको",
    updated: "अद्यावधिक",
    comments: "टिप्पणी",
    readIssue: "विवरण हेर्नुहोस्",
    github: "GitHub मा खोल्नुहोस्",
  },
  issue: {
    back: "समस्याहरूमा फर्कनुहोस्",
    openedBy: "खोलेको",
    updated: "अद्यावधिक",
    github: "GitHub मा खोल्नुहोस्",
  },
  project: {
    tabs: {
      overview: "सिंहावलोकन",
      issues: "समस्याहरू",
      contribute: "योगदान",
    },
    about: "परियोजनाबारे",
    noDescription: "अझै विवरण छैन।",
    sidebar: {
      repository: "रिपोजिटरी",
      license: "इजाजतपत्र",
      openIssues: "खुला समस्या",
      members: "स्वीकृत सदस्य",
      lastSync: "अन्तिम GitHub सिंक",
      never: "अझै सिंक भएको छैन",
    },
    contributeTitle: "कसरी योगदान गर्ने",
    contributeBody:
      "काम रिपोजिटरीमा हुन्छ: खुला समस्या छान्नुहोस्, त्यहीँ छलफल गर्नुहोस्, र पुल रिक्वेस्ट खोल्नुहोस्। यो पोर्टलले खुला समस्या र स्वीकृत सदस्य निर्देशिका ट्र्याक गर्छ; यसले कोड होस्ट गर्दैन।",
    visit: "GitHub मा हेर्नुहोस्",
  },
  members: {
    title: "सदस्य निर्देशिका",
    lede: "एड्मिनद्वारा स्वीकृत व्यक्तिहरू। GitHub बाट साइन इन गरी प्रोफाइल पूरा गर्नुहोस्।",
    search: "सदस्य खोज्नुहोस्",
    skill: "सीप",
    allSkills: "सबै सीप",
    empty: "मिल्ने सदस्य भेटिएन।",
  },
  member: {
    back: "निर्देशिकामा फर्कनुहोस्",
    about: "परिचय",
    links: "लिंकहरू",
    skills: "सीपहरू",
    viewOnGithub: "GitHub मा हेर्नुहोस्",
    notFoundTitle: "प्रोफाइल उपलब्ध छैन",
    notFoundBody: "यो सदस्य हुँदैन वा सार्वजनिक निर्देशिकाका लागि स्वीकृत भएको छैन।",
  },
  profile: {
    title: "तपाईंको प्रोफाइल",
    lede: "तपाईंको सार्वजनिक प्रोफाइल र स्वीकृति स्थिति।",
    signInTitle: "प्रोफाइल व्यवस्थापन गर्न साइन इन गर्नुहोस्",
    signInBody: "GitHub खाता प्रयोग गर्नुहोस्। नयाँ खाता एड्मिन स्वीकृतिसम्म विचाराधीन रहन्छ।",
    status: {
      pending: "तपाईंको प्रोफाइल समीक्षामा छ। यो अझै सार्वजनिक निर्देशिकामा देखिँदैन।",
      approved: "तपाईंको प्रोफाइल स्वीकृत छ र सार्वजनिक निर्देशिकामा देखिन्छ।",
      rejected: "तपाईंको प्रोफाइल सार्वजनिक निर्देशिकाका लागि स्वीकृत भएन।",
      hidden: "तपाईंको प्रोफाइल अहिले सार्वजनिक निर्देशिकाबाट लुकाइएको छ।",
    },
    statusShort: {
      pending: "विचाराधीन",
      approved: "स्वीकृत",
      rejected: "अस्वीकृत",
      hidden: "लुकाइएको",
    },
    fields: {
      displayName: "प्रदर्शन नाम",
      displayNameHelp: "आवश्यक, बढीमा ८० अक्षर, URL नहुने।",
      headline: "शीर्षक",
      headlinePlaceholder: "जस्तै: ब्याकइन्ड इन्जिनियर",
      affiliation: "संस्था",
      affiliationPlaceholder: "जस्तै: त्रिभुवन विश्वविद्यालय",
      location: "स्थान",
      locationPlaceholder: "जस्तै: काठमाडौँ",
      bio: "परिचय",
      bioHelp: "बढीमा ४०० अक्षर सादा पाठ।",
      links: "लिंकहरू",
      linksHelp: "बढीमा ५ लिंक, HTTPS मात्र।",
      addLink: "लिंक थप्नुहोस्",
      remove: "हटाउनुहोस्",
      skills: "सीपहरू",
      skillsHelp: "निश्चित सूचीबाट छान्नुहोस्।",
    },
    save: "प्रोफाइल सुरक्षित गर्नुहोस्",
    saving: "सुरक्षित हुँदै…",
    saved: "प्रोफाइल सुरक्षित भयो।",
    saveError: "प्रोफाइल सुरक्षित गर्न सकिएन।",
  },
  admin: {
    title: "सदस्य व्यवस्थापन",
    lede: "सार्वजनिक निर्देशिकाका लागि सदस्य स्वीकृत, अस्वीकृत, लुकाउने वा प्राथमिकता मिलाउने।",
    signInTitle: "सदस्य व्यवस्थापन गर्न साइन इन गर्नुहोस्",
    signInBody: "ADMIN_GITHUB_IDS मा सूचीबद्ध GitHub खाताले मात्र यो पृष्ठ प्रयोग गर्न सक्छ।",
    notAuthorizedTitle: "अनुमति छैन",
    notAuthorizedBody:
      "यो खाता एड्मिन होइन। पहुँचका लागि ADMIN_GITHUB_IDS मा numeric GitHub ID थप्नुहोस्।",
    tabs: {
      pending: "विचाराधीन",
      approved: "स्वीकृत",
      rejected: "अस्वीकृत",
      hidden: "लुकाइएको",
    },
    approve: "स्वीकृत गर्नुहोस्",
    reject: "अस्वीकृत गर्नुहोस्",
    hide: "लुकाउनुहोस्",
    priority: "प्राथमिकता",
    setPriority: "सेट",
    noMembers: "यो स्थितिमा कुनै सदस्य छैन।",
    actionError: "कार्य असफल भयो।",
  },
  about: {
    title: "कसरी योगदान गर्ने",
    lede: "सार्वजनिक हितको काम भेट्नेदेखि गरेको कामको दृश्य अभिलेख छोड्नेसम्मको व्यावहारिक बाटो।",
    sections: {
      findTitle: "१. खुला काम भेट्नुहोस्",
      findBody:
        "परियोजनाका खुला समस्याहरू हेर्नुहोस्। हरेक समस्या रिपोजिटरीमा राखिएको काम हो, good first issue जस्ता लेबलसहित।",
      workTitle: "२. GitHub मा काम गर्नुहोस्",
      workBody:
        "समस्यामा टिप्पणी गरी इच्छा जनाउनुहोस्, रिपोजिटरी फोर्क गर्नुहोस्, र पुल रिक्वेस्ट खोल्नुहोस्। छलफल र समीक्षा रिपोजिटरीमै हुन्छ।",
      recordTitle: "३. सार्वजनिक अभिलेख राख्नुहोस्",
      recordBody:
        "GitHub बाट साइन इन गरी प्रोफाइल अद्यावधिक राख्नुहोस्। स्वीकृत सदस्यहरू सार्वजनिक निर्देशिकामा सूचीबद्ध हुन्छन्।",
      limitsTitle: "यो पोर्टल के हो — र के होइन",
      limitsBody:
        "यो पोर्टलले खुला समस्या र स्वीकृत सदस्यहरूको सूची राख्छ। यो कोड होस्ट होइन, रोजगारीको प्रस्ताव होइन, र योगदान स्वीकृत हुने ग्यारेन्टी पनि होइन।",
    },
  },
  footer: {
    note: "Gov Portal — सार्वजनिक हितको प्रविधि कामको खुला अभिलेख।",
    repository: "GitHub मा स्रोत",
    api: "REST API",
  },
  common: {
    loading: "लोड हुँदै…",
    skipToContent: "मुख्य सामग्रीमा जानुहोस्",
    backHome: "गृहपृष्ठमा फर्कनुहोस्",
    notFoundTitle: "पृष्ठ भेटिएन",
    notFoundBody: "यो ठेगाना यो पोर्टलमा छैन।",
    errorTitle: "केही त्रुटि भयो",
    issue: "समस्या",
    issues: "समस्या",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ne };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") || path === "" ? path : `/${path}`;
  return `/${locale}${normalized}`;
}
