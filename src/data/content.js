// Central content + imagery for the BOEA site.
// Local assets live in /public/assets.

export const HERO_SLIDES = [
  {
    id: 'edo-south',
    region: 'Edo South',
    eyebrow: 'Coral Bead Regalia',
    title: 'Rewarding Excellence',
    subtitle:
      'Honoring the heritage of the Great Benin Kingdom through modern achievement.',
    image: '/assets/coral_beads.jpeg',
    accent: '#E05A47'
  },
  {
    id: 'legacy',
    region: 'The Legacy',
    eyebrow: 'Gala Night',
    title: 'Celebrating Excellence',
    subtitle: 'The most prestigious night in Edo, celebrating the best sons and daughters of the state.',
    image: '/assets/gala_red_carpet.jpeg',
    accent: '#C9A227'
  },
  {
    id: 'edo-north',
    region: 'Edo North',
    eyebrow: 'Highland Splendor',
    title: 'Highland Splendor',
    subtitle: 'The granite majesty of Ososo Hills and the resilient spirit of the Afemai.',
    image: '/assets/ososo_hills.png',
    accent: '#C9A227'
  },
  {
    id: 'edo-central',
    region: 'Edo Central',
    eyebrow: 'The Esan Rhythm',
    title: 'The Esan Rhythm',
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
      'Join us for an evening of unparalleled elegance as we unveil the winners of this year\u2019s most anticipated categories...',
    image: '/assets/award_presentation_2.jpeg'
  },
  {
    tag: 'Unveiling',
    title: 'Designing the New \u2018Great Benin\u2019 Award Trophy',
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
      'Submit detailed documentation of the nominee\u2019s achievements through our portal before Oct 30.'
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
    title: 'BOEA Red Carpet — Media Interview',
    meta: 'Best of Edo Awards Red Carpet Coverage',
    image: '/assets/red_carpet_interview.jpeg'
  }
];

export const WINNERS = [
  {
    name: 'Chief Osas Igbinedion',
    category: 'Cultural Heritage Preservation',
    year: '2023',
    image: '/assets/award_presentation_5.jpeg'
  },
  {
    name: 'Dr. Adesuwa Omoregie',
    category: 'Global Leadership & Impact',
    year: '2023',
    image: '/assets/award_presentation_4.jpeg'
  },
  {
    name: 'Victor Ehikhamenor',
    category: 'Innovation in Arts & Design',
    year: '2023',
    image: '/assets/award_presentation_2.jpeg'
  }
];
