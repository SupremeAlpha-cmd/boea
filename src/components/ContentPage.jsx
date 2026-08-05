import PageHero from './PageHero';
import NominateCta from './NominateCta';
import './ContentPage.css';

export default function ContentPage({ page, children }) {
  return (
    <main>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />

      <section className="content-body section">
        <div className="container">
          <div className="content-prose">
            {page.blocks &&
              page.blocks.map((block, i) => (
                <div key={i} className={`content-block ${block.heading ? 'content-block-heading' : ''}`}>
                  {block.heading && <h2 className="headline-xl content-heading">{block.heading}</h2>}
                  {block.intro && <p className="body-lg content-intro">{block.intro}</p>}
                  {block.paragraphs &&
                    block.paragraphs.map((p, j) => (
                      <p key={j} className="body-lg content-paragraph">{p}</p>
                    ))}
                  {block.bullets && (
                    <ul className="content-bullets">
                      {block.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            {page.close && <p className="body-lg content-close">{page.close}</p>}
            {children}
          </div>
        </div>
      </section>

      <NominateCta
        eyebrow="Your Voice Matters"
        title="Recognize the Greatness"
        titleGold="Within Your Community"
        copy="Nominations for the 2026 season are now officially open. Help us identify the trailblazers who are making Edo proud."
        ctaText="Nominate Someone Now"
        secondaryText="Download Guidelines"
      />
    </main>
  );
}
