import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, User, ArrowUpRight, BookOpen, RefreshCw } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { getStoredBlogPosts } from '../data/blogData';
import '../styles/pages.css';
import './Blog.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPosts(getStoredBlogPosts());
  }, []);

  // Filter posts by search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return (
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [posts, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <main>
      <PageHero
        eyebrow="News & Heritage Journal"
        title="BOEA Blog & Official Updates"
        intro="Stay updated with the latest press releases, ceremony coverage, laureate features, and cultural insights from the Best of Edo Award platform."
      />

      <section className="page-section section">
        <div className="container">
          {/* Search Bar */}
          {posts.length > 0 && (
            <div className="blog-filter-bar" style={{ justifyContent: 'center' }}>
              <div className="search-input-wrapper" style={{ flex: 1, maxWidth: '600px' }}>
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search articles by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="blog-search-input"
                  aria-label="Search blog articles"
                />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSearchQuery('')}
                  style={{ fontSize: '13px', padding: '0.65rem 1rem' }}
                >
                  <RefreshCw size={14} /> Clear
                </button>
              )}
            </div>
          )}

          {filteredPosts.length > 0 ? (
            <>
              {/* Featured Post Card */}
              {featuredPost && (
                <div className="blog-featured-card">
                  <div className="blog-featured-image-box">
                    <img
                      src={featuredPost.coverImage || '/assets/boea_brand_logo+branding.jpeg'}
                      alt={featuredPost.title}
                      className="blog-featured-img"
                    />
                  </div>

                  <div className="blog-featured-content">
                    <div className="blog-meta-row">
                      <span className="blog-meta-item">
                        <Calendar size={14} /> {featuredPost.date}
                      </span>
                      <span className="blog-meta-item">
                        <Clock size={14} /> {featuredPost.readTime || '4 min read'}
                      </span>
                      <span className="blog-meta-item">
                        <User size={14} /> {featuredPost.author || 'BOEA Editorial'}
                      </span>
                    </div>

                    <h2 className="headline-lg blog-featured-title">
                      <Link to={`/blog/${featuredPost.id}`} className="blog-title-link">
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="body-lg blog-featured-excerpt">
                      {featuredPost.excerpt}
                    </p>

                    <Link to={`/blog/${featuredPost.id}`} className="btn btn-gold blog-read-btn">
                      Read Full Article <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Grid of Remaining Articles */}
              {remainingPosts.length > 0 && (
                <div className="blog-grid margin-top-xl">
                  {remainingPosts.map((post) => (
                    <article key={post.id} className="blog-card">
                      <div className="blog-card-image-box">
                        <img
                          src={post.coverImage || '/assets/boea_brand_logo+branding.jpeg'}
                          alt={post.title}
                          className="blog-card-img"
                        />
                      </div>

                      <div className="blog-card-body">
                        <div className="blog-meta-row" style={{ fontSize: '12px', marginBottom: '0.5rem' }}>
                          <span className="blog-meta-item">
                            <Calendar size={13} /> {post.date}
                          </span>
                          <span className="blog-meta-item">
                            <Clock size={13} /> {post.readTime || '3 min read'}
                          </span>
                        </div>

                        <h3 className="headline-md blog-card-title">
                          <Link to={`/blog/${post.id}`} className="blog-title-link">
                            {post.title}
                          </Link>
                        </h3>

                        <p className="body-md blog-card-excerpt">
                          {post.excerpt}
                        </p>

                        <div className="blog-card-footer">
                          <span className="blog-author-text">
                            <User size={13} /> {post.author || 'BOEA Editorial'}
                          </span>
                          <Link to={`/blog/${post.id}`} className="blog-card-read-link">
                            Read Story <ArrowUpRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="blog-empty-state">
              <BookOpen size={48} className="gold-text" style={{ margin: '0 auto 1rem' }} />
              <h3 className="headline-md">BOEA Journal Archive Updating</h3>
              <p className="body-md text-muted" style={{ maxWidth: '540px', margin: '0.5rem auto 1.5rem' }}>
                Official press releases, ceremony coverage, and articles for the 2026 season will appear here soon.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/nomination" className="btn btn-gold">
                  Nominate a Laureate
                </Link>
                <Link to="/admin" className="btn btn-outline">
                  Admin Publisher Log In
                </Link>
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
