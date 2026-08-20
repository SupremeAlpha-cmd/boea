import { ExternalLink, Play, Share2 } from 'lucide-react';
import './RichLinkPreview.css';

export default function RichLinkPreview({ item }) {
  const {
    type = 'article', // 'article' | 'video'
    title,
    description,
    source,
    url,
    image,
    date,
    domain = 'share.google'
  } = item;

  return (
    <article className="rich-link-card">
      <div className="rich-link-media-box">
        <img src={image} alt={title} className="rich-link-img" />
        <div className="rich-link-media-overlay" />

        {type === 'video' && (
          <div className="rich-link-play-badge">
            <Play size={22} fill="currentColor" />
          </div>
        )}

        <span className="rich-link-type-badge">
          <Share2 size={11} /> {type === 'video' ? 'Facebook Reel' : 'News Press'}
        </span>
      </div>

      <div className="rich-link-body">
        <h3 className="rich-link-title">{title}</h3>
        {description && <p className="rich-link-desc">{description}</p>}
        <span className="rich-link-domain">{domain}</span>

        <div className="rich-link-footer">
          <span className="rich-link-source">
            Source: <strong>{source}</strong>
          </span>
          {date && <span className="rich-link-date">{date}</span>}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rich-link-url"
            onClick={(e) => {
              if (url === '#') {
                e.preventDefault();
                alert(`Opening official press link: ${url}`);
              }
            }}
          >
            {url} <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
