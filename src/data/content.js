// Central content + imagery for the BOEA site.
// Local assets live in /public; remote images are from the ui-ux mockups.

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
    eyebrow: 'Bronze & Bravery',
    title: 'Bronze & Bravery',
    subtitle: 'The artistry of the Benin bronze masters, preserved for generations.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC94lsXIhwDdmFaYEImPWhqUmAIKd_1Hx66tEmqO2nGFVWs00PHR--Sq1ZjtgCnTiUTX8B2NAUBRFLQrXnexw3-wKm0F_GOgUo1wmXwKM7WTuifVnqYxDrVYs8370AOL450-JWvZVo1whHZhIzynD3hSMM9BzAOfTklS5Yia6v52vrgVOEcdUq9xguERXKCaBW-3vk7IqzO4ibYIYXbIOg5LM2LRhDwvHxw9U8K5MqvoOrqwYDa3V9-',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCz5S3fPWW39-q2fzn1W2UpNsSOcuC8lTdWCgxIUFGfs7KVx0wUXP6eHiXOuqPFHFNNgKNFs2uOGATTw3TyTMMBgPVYOw-vCN33fYtRtzv38SyuaohxhpE7K8PmKPY3eR4bXPfoN5oYyAmx9zqTRHMLr9wDUIaDQxa0CsF1IdDJItJE9ZTq50eWFVhwkYZuQxFuq__2wmQ4j7u-bgDfJyQwzcUa4MZ_D969KKXwP6Hdy2zgaCAlAn6v'
  },
  {
    tag: 'Unveiling',
    title: 'Designing the New \u2018Great Benin\u2019 Award Trophy',
    kind: 'Press Release',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApit6FdetpyqNHBvFQqOisvBWRNXt0tXuZ9xAhA0U94N5ND1iK7dLbnQ5L-TG1vQblR09kv8vK5gVG3-HzHMkPg9T8Ps-TVOaYMYwlY4YOxwwrnfOC3g94GXNcCVB6fbM528KKoFnhFJp5KsUFzYutu_krGu6vCeje4QbAcUzZOBw3sdkZCuAcvRYrMmxVgTcOrP8HvD3cp7tMI9AyoicEEdM3wdG_ZWBhvlONGi2qpatU5vQZpssg'
  },
  {
    tag: 'Highlight',
    title: 'Meet the 2024 Nominees in Innovation',
    kind: 'Nomination Series',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcjP2IN2k_oezcV4U2uiw2TVte5QKahRqmWwlxRtt9n59BTKk1IWXCWrtqcwOUNHsaWWRyi37y6rtd73sGafph8qDPyYZskMkH7Yutim1o6auE9c42FWRjD17na4672ddVMe994HwsCIlPl1YkihpdaPvl1YOkrl7Os704JRxmJjHzOzwwFyF5CGrduDER5B07oPAmr3Kaie97dntKS_kjtP82plDztqA0k6rb-5ARAUoJe7IjzgxV'
  },
  {
    tag: 'Guidelines',
    title: 'How to Write a Compelling Nomination',
    kind: 'Tutorial',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTLmI_YWiLNVsav3abMHx9JnAKeP2IWZnGjccXnwdEoSfNbVQQ1CFLJHf4l_rnCzG41-vWgu_40K1aEdIPWPzTbns9hDvdjswM0tOem0Nt8KQ3hS_JSlToqjcSOKl9sqbHkP1w_C2xalMN9VwSYiQQCKL5E4KeMufKa1G2mIDb0BR_vB21ecS94Twrfty9pdWRrhJVL4MXF3E4ZOVWde0YcuAOrd9mESd2_5mR0y6r1rqULm_oDRAe'
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

export const LEOPARD_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAmQaJvfpkNF5O5jqcxFNi2C9uIK5kYwSqoDSwK4PQgCMib6sD4pMRbgpEBE58OUdL_5sdr6X6cOoRVyVQq2TLTVSbg4la0rLHnbTrhn3edL69sMvramZuwFv86Qhozjf4DJfIyutgX91EqloiuuRmVEdfRnZDanMCraXpwct9LBQtB67eY6sRm9OojC0ZlasEkUp8kTXc8RcI3H0JmCXYOvGrEV1PNk_lowmu5gUQ0jNX_BC8Tzn6h';

export const GALLERY_ITEMS = [
  {
    id: 3,
    span: 'solo',
    tag: 'Traditional Arts',
    title: 'Traditional Arts',
    meta: 'Excellence in Craft',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdzd2YyBQykkOI-3DdjxyKT2tLKePZlCLT-ihkPeEjyV3YkVSFGVw428ipDJN7eY2ClttIXJn8ylaaPEe2YzPbg-8ZStYEKP6n8CY8fXlRWR-g0xY1-7kHSD1mO18oigdgiZ8KnA0S7mnJZd_qHI1DVVGC4R7JJy70m1Jw7dZJgAKerjghZ-A6IUWFHHgmJq0Epa0vESZJ7dVq15oOeLVKxwYnBpEuIOzGMM7jAtGIi569Timx79Ky'
  }
];

export const WINNERS = [
  {
    name: 'Chief Osas Igbinedion',
    category: 'Cultural Heritage Preservation',
    year: '2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcaD7xAJt_eD8PE4GgQDU029zsArblrc0hgpyZ1TzKWealiecFzcv6wITlPmIOCGUPfvVTyBX5QAo8brwmtcvGRE1J5Iu1hYa7W59QJ-ZqNP5In4lp_6jVOKgck9r65_15bPRCBZ7hqBuiMEUVXVBiue0u_LRCHLJDm0qJjkdg_Q95mw9z1pp1q0yH7MhY8wWGz6H8dD_azR0ooTfUErvJ48vPp2zjBvpPHesMc3VP3UgKTZ4f6OBP'
  },
  {
    name: 'Dr. Adesuwa Omoregie',
    category: 'Global Leadership & Impact',
    year: '2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsKQOnp_2RInV4ya2UcV6C7jkrNUxvzFsiC9w1tpGxidzodGE7Ie0oGkiWsR_Bha7HDCo7uT1V4w6qFmvbaLxrZrquJEOA1GlZ6EDfKukzZyO5SE3cRuqCEsR4hyrG7JORtysI-W5UM6yvsaSVr2AMAHlICcwTWO1RlBo1K3gK3krphCn-Hz8_YtXz9utbLHu3qSDX7jUfQvtmcW48J8ctR0n36tKDg1EMIHVeUVJho90EYFKR9z5e'
  },
  {
    name: 'Victor Ehikhamenor',
    category: 'Innovation in Arts & Design',
    year: '2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB45GYpbPnVTWGXOpMtKfYyShaPHWc88QtRZ_kMNFN5a4Uf96CychbE43EDoSKHVbalXb19bZyn7iIxVnUeVPSpr-ByxrTT-6OC2N0MNRXKhnw4vujtoeLPK1wy_YV2_9CKZ3nB1h8JXuHIW1ZjyBG44c9L_2V1u7AedEzSGjKrFJwCLxmB2dtb_CsL393cTNIJxQoYZsD5HXte20HaR9Pcp0CLof_qyw-KprBxE48gEGMDsBloeYX_'
  }
];
