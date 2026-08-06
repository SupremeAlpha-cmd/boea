import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import '../styles/pages.css';
import './AdvisoryBoard.css';

const BOARD_MEMBERS = [
  {
    id: 1,
    name: 'Name of Member',
    title: 'Chairman, Advisory Board',
    profile: 'A brief profile of this distinguished advisory board member will appear here, highlighting their accomplishments, professional background, and connection to the Best of Edo Award.',
    image: null
  },
  {
    id: 2,
    name: 'Name of Member',
    title: 'Board Member',
    profile: 'A brief profile of this distinguished advisory board member will appear here, highlighting their accomplishments, professional background, and connection to the Best of Edo Award.',
    image: null
  },
  {
    id: 3,
    name: 'Name of Member',
    title: 'Board Member',
    profile: 'A brief profile of this distinguished advisory board member will appear here, highlighting their accomplishments, professional background, and connection to the Best of Edo Award.',
    image: null
  },
  {
    id: 4,
    name: 'Name of Member',
    title: 'Board Member',
    profile: 'A brief profile of this distinguished advisory board member will appear here, highlighting their accomplishments, professional background, and connection to the Best of Edo Award.',
    image: null
  },
  {
    id: 5,
    name: 'Name of Member',
    title: 'Board Member',
    profile: 'A brief profile of this distinguished advisory board member will appear here, highlighting their accomplishments, professional background, and connection to the Best of Edo Award.',
    image: null
  },
  {
    id: 6,
    name: 'Name of Member',
    title: 'Board Member',
    profile: 'A brief profile of this distinguished advisory board member will appear here, highlighting their accomplishments, professional background, and connection to the Best of Edo Award.',
    image: null
  },
];

function AvatarPlaceholder({ name }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
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
        ctaText="Nominate Someone"
      />
    </main>
  );
}
