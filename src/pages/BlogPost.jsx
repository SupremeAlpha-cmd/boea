import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import NominateCta from '../components/NominateCta';
import { getStoredBlogPosts } from '../data/blogData';
import '../styles/pages.css';
import './BlogPost.css';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = getStoredBlogPosts();
    setAllPosts(stored);
    const found = stored.find((p) => p.id === id || p.slug === id);
    if (found) {
      setPost(found);
    } else {
      setPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    if (!post) return;

    const pageTitle = `${post.title} — Best of Edo Award`;
    document.title = pageTitle;

    let imgUrl = post.coverImage || '/assets/navbar_logo.png';
    if (imgUrl.startsWith('/')) {
      imgUrl = `${window.location.origin}${imgUrl}`;
    }

    const currentUrl = window.location.href;
    const desc = post.excerpt || 'Read the full article on The Prestigious Best of Edo Award platform.';

    const setMeta = (selector, attrName, attrValue) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const attrPair = selector.match(/meta\[(.*?)="(.*?)"\]/);
        if (attrPair) {
          el.setAttribute(attrPair[1], attrPair[2]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attrName, attrValue);
    };

    setMeta('meta[property="og:title"]', 'content', pageTitle);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:image"]', 'content', imgUrl);
    setMeta('meta[property="og:image:secure_url"]', 'content', imgUrl);
    setMeta('meta[property="og:url"]', 'content', currentUrl);
    setMeta('meta[property="og:type"]', 'content', 'article');

    setMeta('meta[name="twitter:title"]', 'content', pageTitle);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    setMeta('meta[name="twitter:image"]', 'content', imgUrl);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  }, [post]);

  if (!post) {
    return (
      <main>
        <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
          <BookOpen size={48} className="gold-text" style={{ margin: '0 auto 1rem' }} />
          <h2 className="headline-lg">Article Not Found</h2>
          <p className="body-lg text-muted" style={{ maxWidth: '500px', margin: '0.5rem auto 1.5rem' }}>
            The requested article could not be found or has been removed from the BOEA news archive.
          </p>
          <Link to="/blog" className="btn btn-gold">
            <ArrowLeft size={16} /> Return to Blog & News
          </Link>
        </div>
      </main>
    );
  }

  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${post.title}\n\nRead on BOEA Blog: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${post.title}\n${window.location.href}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <main>
      <section className="blog-post-hero-section section">
        <div className="container">
          <div className="blog-post-navigation">
            <Link to="/blog" className="blog-back-link">
              <ArrowLeft size={16} /> Back to All Articles
            </Link>
          </div>

          <div className="blog-post-header">
            <h1 className="headline-xl blog-post-title">{post.title}</h1>

            <div className="blog-meta-row blog-post-meta">
              <span className="blog-meta-item">
                <User size={15} /> {post.author || 'BOEA Editorial'}
              </span>
              <span className="blog-meta-item">
                <Calendar size={15} /> {post.date}
              </span>
              <span className="blog-meta-item">
                <Clock size={15} /> {post.readTime || '4 min read'}
              </span>
            </div>
          </div>

          {/* Cover Photo */}
          <div className="blog-post-cover-wrapper">
            <img
              src={post.coverImage || '/assets/boea_brand_logo+branding.jpeg'}
              alt={post.title}
              className="blog-post-cover-img"
            />
          </div>

          {/* Article Body Container */}
          <article className="blog-post-body-container">
            {post.excerpt && (
              <p className="body-xl blog-post-lead-excerpt">
                {post.excerpt}
              </p>
            )}

            <div className="blog-post-prose">
              {Array.isArray(post.content) ? (
                post.content.map((paragraph, idx) => (
                  <p key={idx} className="body-lg blog-paragraph">
                    {paragraph}
                  </p>
                ))
              ) : (
                typeof post.content === 'string' &&
                post.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="body-lg blog-paragraph">
                    {paragraph}
                  </p>
                ))
              )}
            </div>

            {/* Share Article Section */}
            <div className="blog-post-share-box">
              <div className="blog-share-label">
                <Share2 size={16} className="gold-text" /> Share this Article:
              </div>

              <div className="blog-share-buttons">
                <button type="button" onClick={handleWhatsAppShare} className="btn btn-outline blog-share-btn">
                  WhatsApp
                </button>
                <button type="button" onClick={handleTwitterShare} className="btn btn-outline blog-share-btn">
                  Twitter / X
                </button>
                <button type="button" onClick={handleCopyLink} className="btn btn-gold blog-share-btn">
                  {copied ? <Check size={16} /> : <Share2 size={16} />}
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="blog-post-related-section margin-top-xl">
              <div className="related-section-header">
                <span className="label-caps eyebrow">Keep Reading</span>
                <h3 className="headline-lg">Related Articles & Insights</h3>
              </div>

              <div className="blog-grid margin-top-md">
                {relatedPosts.map((rel) => (
                  <article key={rel.id} className="blog-card">
                    <div className="blog-card-image-box">
                      <img
                        src={rel.coverImage || '/assets/boea_brand_logo+branding.jpeg'}
                        alt={rel.title}
                        className="blog-card-img"
                      />
                    </div>

                    <div className="blog-card-body">
                      <h3 className="headline-md blog-card-title">
                        <Link to={`/blog/${rel.id}`} className="blog-title-link">
                          {rel.title}
                        </Link>
                      </h3>
                      <p className="body-md blog-card-excerpt">{rel.excerpt}</p>
                      <div className="blog-card-footer">
                        <span className="blog-author-text">
                          <User size={13} /> {rel.author || 'BOEA Editorial'}
                        </span>
                        <Link to={`/blog/${rel.id}`} className="blog-card-read-link">
                          Read Story <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
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
