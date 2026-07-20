// Tipe data untuk konten terpusat halaman beranda (home) — id & en.
// Bentuk objek SAMA di kedua bahasa agar `Dict["home"]` konsisten.

export type HomeContent = {
  hero: {
    titleLines: string[];
    titleAccent: string;
    slides: {
      id: number;
      src: string;
      video: string;
      title: string;
      subtitle: string;
    }[];
    logoAlt: string;
    logoSubtitle: string;
    scrollDown: string;
  };
  jeda: {
    eyebrow: string;
    quote: string;
    quoteMeaning: string;
    attribution: string;
  };
  budaya: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pasalPrefix: string;
    pasalTotal: string;
    nextPasal: string;
    learnMore: string;
    closingQuote: string;
    closingAttribution: string;
    rules: {
      id: string;
      title: string;
      badge: string;
      desc: string;
      image: string;
    }[];
  };
  funfact: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    tabs: {
      id: string;
      name: string;
      icon: string;
    }[];
    tabData: {
      [tab: string]: {
        ctaText: string;
        items: {
          tag: string;
          image: string;
          title: string;
          subtitle: string;
          descTitle: string;
          descPoints: string[];
        }[];
      };
    };
    culturalQuote: string;
    insightTitle: string;
    insightDesc: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    fitBoundsLabel: string;
    closeLabel: string;
    toggleHideLabel: string;
    toggleShowLabel: string;
    ctaText: string;
    locations: {
      id: string;
      region: string;
      title: string;
      subtitle: string;
      description: string;
      image: string;
      longitude: number;
      latitude: number;
      stats: {
        label: string;
        value: string;
      }[];
    }[];
  };
  destinasi: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    tabs: {
      id: string;
      name: string;
      icon: string;
    }[];
    data: {
      [tab: string]: {
        items: {
          name: string;
          location: string;
          rating: number;
          reviews: string;
          desc: string;
          tags: string[];
          image: string;
        }[];
      };
    };
    ctaText: string;
  };
  contact: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    intro: string;
    slides: {
      image: string;
      alt: string;
      title: string;
      desc: string;
      tag: string;
    }[];
    dotLabel: string;
    thanksTitle: string;
    thanksDesc: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitText: string;
  };
};
