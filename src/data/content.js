// Central content + imagery for the BOEA site.
// Local assets live in /public/assets.

export const HERO_SLIDES = [
  {
    id: 'edo-south',
    region: 'Edo South',
    eyebrow: 'WELCOME TO THE',
    title: ' BEST OF EDO AWARD',
    subtitle:
      'Honoring the heritage of the Great Benin Kingdom through modern achievement.',
    image: '/assets/coral_beads.jpeg',
    accent: '#E05A47'
  },
  {
    id: 'legacy',
    region: 'The Legacy',
    eyebrow: 'WELCOME TO THE',
    title: ' BEST OF EDO AWARD',
    subtitle: 'Celebrating Excellence',
    image: '/assets/boea_red_carpet_backdrop.jpeg',
    accent: '#C9A227'
  },
  {
    id: 'edo-north',
    region: 'Edo North',
    eyebrow: 'WELCOME TO THE',
    title: ' BEST OF EDO AWARD',
    subtitle: 'The granite majesty of Ososo Hills and the resilient spirit of the Afemai.',
    image: '/assets/ososo_hills.png',
    accent: '#C9A227'
  },
  {
    id: 'edo-central',
    region: 'Edo Central',
    eyebrow: 'WELCOME TO THE',
    title: ' BEST OF EDO AWARD',
    subtitle: 'The textiles, folklore and intellect of Esanland, honored on the world stage.',
    image: '/assets/esan_culture.png',
    accent: '#9B2D3D'
  }
];

export const NEWS_ITEMS = [
  {
    type: 'featured',
    tag: 'Event',
    date: 'March 12, 2024',
    title: 'The 2024 Gala Night: A Date with Destiny in Benin City',
    excerpt:
      'Join us for an evening of unparalleled elegance as we unveil the winners of this year’s most anticipated categories...',
    image: '/assets/boea_6th_edition_poster.jpeg'
  },
  {
    tag: 'Unveiling',
    title: 'Designing the New ‘Great Benin’ Award Trophy',
    kind: 'Press Release',
    image: '/assets/coral_beads.jpeg'
  },
  {
    tag: 'Highlight',
    title: 'Meet the 2024 Nominees in Innovation',
    kind: 'Nomination Series',
    image: '/assets/esan_culture.png'
  },
  {
    tag: 'Guidelines',
    title: 'How to Write a Compelling Nomination',
    kind: 'Tutorial',
    image: '/assets/ososo_hills.png'
  }
];

export const CATEGORIES = [
  {
    icon: 'temple_buddhist',
    tag: 'Heritage',
    title: 'Cultural Heritage Preservation',
    description:
      'Awarded to those who have demonstrated extraordinary commitment to the archiving, restoration, and promotion of Great Benin artifacts and traditions.'
  },
  {
    icon: 'public',
    tag: 'Diplomacy',
    title: 'Global Leadership & Impact',
    description:
      'Recognizing Edo sons and daughters who have achieved significant international influence, fostering positive global relations and community growth.'
  },
  {
    icon: 'lightbulb',
    tag: 'Creativity',
    title: 'Innovation in Arts & Design',
    description:
      'Honoring visionaries who fuse traditional Benin motifs with modern technology, creating new forms of artistic expression for the 21st century.'
  }
];

export const NOMINATION_STEPS = [
  {
    number: '01',
    title: 'Submission',
    description:
      'Submit detailed documentation of the nominee’s achievements through our portal before Oct 30.'
  },
  {
    number: '02',
    title: 'Vetting',
    description:
      'Our council of elders and industry experts reviews all entries for authenticity and impact.'
  },
  {
    number: '03',
    title: 'Shortlisting',
    description:
      'Top 3 finalists in each category are announced. Public voting opens for selected community awards.'
  },
  {
    number: '04',
    title: 'Gala Night',
    description:
      'Winners are unveiled at the prestigious Grand Bronze Gala in December.'
  }
];

export const LEOPARD_IMAGE = '/assets/coral_beads.jpeg';

export const GALLERY_ITEMS = [
  {
    id: 1,
    span: 'solo',
    tag: 'Red Carpet',
    title: 'BOEA Official Photo Wall',
    meta: 'Best of Edo Awards Media Coverage',
    image: '/assets/boea_photo_wall.jpeg'
  }
];

export const WINNERS = [
  {
    name: 'Chief Osas Igbinedion',
    category: 'Cultural Heritage Preservation',
    year: '2024',
    image: '/assets/coral_beads.jpeg'
  },
  {
    name: 'Dr. Adesuwa Omoregie',
    category: 'Global Leadership & Impact',
    year: '2024',
    image: '/assets/boea_6th_edition_poster.jpeg'
  },
  {
    name: 'Victor Ehikhamenor',
    category: 'Innovation in Arts & Design',
    year: '2024',
    image: '/assets/esan_culture.png'
  }
];

export const PAST_RECIPIENTS_DATA = [
  {
    id: 'rec-1',
    name: 'Chief Osas Igbinedion',
    category: 'Cultural Heritage Preservation',
    edition: '7th Edition (2024)',
    year: '2024',
    citation: 'Honored for outstanding contributions to the archiving, restoration, and promotion of Great Benin historical artifacts and oral traditions globally.',
    image: '/assets/coral_beads.jpeg',
    featured: true
  },
  {
    id: 'rec-2',
    name: 'Dr. Adesuwa Omoregie',
    category: 'Global Leadership & Impact',
    edition: '7th Edition (2024)',
    year: '2024',
    citation: 'Recognized for distinguished international advocacy in public health and creating sustainable healthcare programs across rural Edo communities.',
    image: '/assets/boea_6th_edition_poster.jpeg',
    featured: true
  },
  {
    id: 'rec-3',
    name: 'Victor Ehikhamenor',
    category: 'Innovation in Arts & Design',
    edition: '7th Edition (2024)',
    year: '2024',
    citation: 'Celebrated for global contemporary art leadership, fusing traditional Benin motifs and rosary beads with modern architectural design.',
    image: '/assets/esan_culture.png',
    featured: true
  },
  {
    id: 'rec-4',
    name: 'Engr. Osaro Egharevba',
    category: 'Technology & Enterprise',
    edition: '8th Edition (2025)',
    year: '2025',
    citation: 'Awarded for pioneering renewable clean-energy microgrids that power educational institutes across Edo North and Central districts.',
    image: '/assets/boea_6th_edition_poster.jpeg',
    featured: true
  },
  {
    id: 'rec-5',
    name: 'Ambassador (Mrs.) Ifueko Omoigui-Okauru',
    category: 'Public Service Excellence',
    edition: '6th Edition (2023)',
    year: '2023',
    citation: 'Honored for landmark institutional governance reforms and lifelong dedication to fiscal transparency and civic empowerment.',
    image: '/assets/boea_5th_edition_backdrop.jpeg',
    featured: false
  },
  {
    id: 'rec-6',
    name: 'Prof. Gregory Akenzua',
    category: 'Education & Medical Research',
    edition: '6th Edition (2023)',
    year: '2023',
    citation: 'Recognized for decades of trailblazing clinical pediatric research and medical academic mentorship in West Africa.',
    image: '/assets/boea_photo_wall.jpeg',
    featured: false
  },
  {
    id: 'rec-7',
    name: 'Lady Osayamen Idahosa',
    category: 'Humanitarian & Community Support',
    edition: '5th Edition (2022)',
    year: '2022',
    citation: 'Honored for founding vocational skills empowerment centers supporting widowhood initiatives and youth scholarship funds in Benin City.',
    image: '/assets/boea_red_carpet_backdrop.jpeg',
    featured: false
  },
  {
    id: 'rec-8',
    name: 'Comrade Nosakhare Obaseki',
    category: 'Youth Empowerment & Sports',
    edition: '5th Edition (2022)',
    year: '2022',
    citation: 'Awarded for initiating grassroots athletic academies and youth mentorship networks connecting Edo talent with international institutions.',
    image: '/assets/ososo_hills.png',
    featured: false
  },
  {
    id: 'rec-9',
    name: 'Edo State Cultural Troupe & Heritage Guild',
    category: 'Cultural Heritage Preservation',
    edition: '4th Edition (2021)',
    year: '2021',
    citation: 'Recognized for preserving traditional royal performing arts, royal bronze casting heritage, and Esan weaving traditions for future generations.',
    image: '/assets/esan_culture.png',
    featured: false
  }
];

