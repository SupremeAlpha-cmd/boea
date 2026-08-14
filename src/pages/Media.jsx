import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import SponsoredPosts from '../components/SponsoredPosts';
import { MEDIA } from '../data/site';
import '../components/ContentPage.css';
import '../styles/pages.css';

export default function Media() {
  return (
    <main>
      <PageHero
        eyebrow={MEDIA.eyebrow}
        title={MEDIA.title}
        intro={MEDIA.intro}
      />

      <SponsoredPosts title="Sponsored Media & Promotional Features" eyebrow="Media Partners & Advertisers" />

      <section className="page-section section">
        <div className="container">
          <div className="grid-header">
            <span className="label-caps grid-header-eyebrow">Our Channels</span>
            <h2 className="headline-xl grid-header-title">Every Platform, Every Story</h2>
          </div>
          <div className="card-grid cols-2">
            {MEDIA.channels.map((channel, i) => (
              <div key={channel} className="rich-card">
                <span className="rich-card-index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="headline-md rich-card-title">{channel}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-body section">
        <div className="container">
          <div className="content-prose">
            {MEDIA.blocks.map((block, i) => (
              <div key={i} className="content-block">
                {block.heading && <h2 className="headline-xl content-heading">{block.heading}</h2>}
                {block.intro && <p className="body-lg content-intro">{block.intro}</p>}
                {block.paragraphs &&
                  block.paragraphs.map((p, j) => (
                    <p key={j} className="body-lg content-paragraph">
                      {p}
                    </p>
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
            <p className="body-lg content-close">{MEDIA.close}</p>
          </div>
        </div>
      </section>

      <NominateCta
        eyebrow="Your Voice Matters"
        title="Recognize the Greatness"
        titleGold="Within Your Community"
        copy="Nominations for the 2026 season are now officially open. Help us identify the trailblazers who are making Edo proud."
        ctaText="Nominate Someone Now"
      />
    </main>
  );
}
