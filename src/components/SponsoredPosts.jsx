import './SponsoredPosts.css';

const SPONSORED_POSTS = [
  {
    id: 'ad-1',
    title: 'Prestigious Best of Edo Award 2026 — Official Partner Spotlight',
    description: 'Special sponsored feature highlighting strategic corporate partnership and brand collaboration for the 9th Edition.',
    image: '/assets/ads1.jpeg',
    tag: 'Sponsored Feature'
  },
  {
    id: 'ad-2',
    title: 'Celebrating Heritage & Excellence — Official Advert Presentation',
    description: 'Promoted partner showcase supporting community empowerment, cultural preservation, and institutional excellence.',
    image: '/assets/ads 2.jpeg',
    tag: 'Sponsored Feature'
  }
];

export default function SponsoredPosts({ title = 'Sponsored Features & Partner Highlights', eyebrow = 'Official Partner Adverts' }) {
  return (
    <section className="sponsored-posts-section">
      <div className="container">
        <div className="sponsored-header">
          <span className="sponsored-badge">{eyebrow}</span>
          <h2 className="headline-xl">{title}</h2>
        </div>

        <div className="sponsored-grid">
          {SPONSORED_POSTS.map((post) => (
            <article key={post.id} className="sponsored-card">
              <div className="sponsored-img-wrap">
                <img src={post.image} alt={post.title} className="sponsored-img" />
                <span className="sponsored-tag-overlay">{post.tag}</span>
              </div>
              <div className="sponsored-content">
                <h3 className="sponsored-title">{post.title}</h3>
                <p className="sponsored-desc">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
