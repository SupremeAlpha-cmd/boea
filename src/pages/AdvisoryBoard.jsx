import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import '../styles/pages.css';
import './AdvisoryBoard.css';

const BOARD_MEMBERS = [
  {
    id: 1,
    name: 'Samuel Mac-Ebi, Esq.',
    title: 'Chairman, Advisory Board',
    profile: 'Distinguished legal practitioner, legendary broadcaster, public speaker, corporate consultant and civic leader, guiding the governance, strategic vision, and institutional integrity of the Best of Edo Award platform.',
    image: '/assets/Sam Mac-Ebi Esq.jpeg'
  },
  {
    id: 2,
    name: 'Dr. Ehizojie Ohiowele',
    title: 'Member, Advisory Board',
    profile: 'A respected corporate executive and visionary leader, bringing strategic economic insight, sound corporate governance, and a strong commitment to community development to the Award.',
    image: '/assets/dr_ehizojie.jpeg'
  },
  {
    id: 3,
    name: 'Dr. Kazeem Bello-Osagie',
    title: 'Member, Advisory Board',
    profile: 'Kazeem Bello-Osagie is a lawyer, entrepreneur, real estate professional, cultural advocate and media personality with strong ties to Edo State. He is the founder of EdoPride, a platform established to promote Edo culture, language, heritage and the achievements of Edo people globally.',
    image: '/assets/Drt. Kazeem Bello-Osagie.jpeg'
  },
  {
    id: 4,
    name: 'Mr. Andy Bello',
    title: 'Member, Advisory Board',
    profile: 'Renowned Media Executive and community advocate supporting youth empowerment initiatives, heritage preservation, and stakeholder partnerships.',
    image: '/assets/Andy Bello.jpeg'
  },
  {
    id: 5,
    name: 'Dr. Noah Inu Momodu',
    title: 'Member, Advisory Board',
    profile: 'Dr. Momodu Inu Noah is an accomplished Music Director/Producer, With his wealth of experience across the entertainment, music, media and technology industries, Dr. Momodu brings valuable expertise to the Best of Edo Award each year, contributing to the planning and delivery of an entertaining, professionally curated event experience marked by creativity, excellence and a touch of class.',
    image: '/assets/Dr. Noah Inu MOmodu.jpeg'
  },
  {
    id: 6,
    name: 'Mrs. Helen Izore',
    title: 'Member, Advisory Board',
    profile: 'Helen Eki Izore, popularly known as Helen Izore, is a Nigerian entrepreneur and leading professional in the events planning and decoration industry. She is the Founder and CEO of Ruru World Events, a prominent events management and decoration company, with over 20 years of industry experience',
    image: '/assets/Mrs Helen Eki Izore.jpeg'
  },
  {
    id: 7,
    name: 'Mr. Osazuwa Timmy Obaseki',
    title: 'Member, Advisory Board',
    profile: 'Prominent media, communications, and enterprise leader dedicated to expanding international visibility and cultural legacy for the platform.',
    image: null
  }
];

function getInitials(name) {
  const cleanName = name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Engr\.|Prof\.|Chief|Ambassador|Comrade)\s+/i, '')
    .replace(/,?\s*Esq\.?$/i, '')
    .trim();
  const parts = cleanName.split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'BO';
}

function AvatarPlaceholder({ name }) {
  const initials = getInitials(name);
  return (
    <div className="advisory-avatar-placeholder" aria-hidden="true">
      <span className="advisory-avatar-initials">{initials}</span>
    </div>
  );
}

export default function AdvisoryBoard() {
  return (
    <main>
      <PageHero
        eyebrow="The Advisory Board"
        title="Voices of Wisdom & Experience"
        intro="Our distinguished Advisory Board comprises respected leaders, professionals, and stakeholders who guide the vision, integrity, and impact of the Best of Edo Award platform."
      />

      <section className="page-section section">
        <div className="container">
          <div className="advisory-grid">
            {BOARD_MEMBERS.map((member) => (
              <article key={member.id} className="advisory-card">
                <div className="advisory-img-wrap">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="advisory-img"
                    />
                  ) : (
                    <AvatarPlaceholder name={member.name} />
                  )}
                  <div className="advisory-img-shine" />
                </div>
                <div className="advisory-body">
                  <h2 className="advisory-name">{member.name}</h2>
                  <span className="advisory-title label-caps">{member.title}</span>
                  <p className="advisory-profile body-md">{member.profile}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NominateCta
        eyebrow="Guided by Excellence"
        title="Honouring Edo's Best"
        titleGold="Since 2017"
        copy="The Best of Edo Award is powered by a board of distinguished leaders committed to integrity, impact, and celebrating true excellence."
        ctaText="Nominate a Laureate"
      />
    </main>
  );
}
