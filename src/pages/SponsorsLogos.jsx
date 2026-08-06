import { useState, useEffect } from 'react';
import { Upload, Plus, Trash2, Award, ShieldAlert, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import '../styles/pages.css';
import './SponsorsLogos.css';

const DEFAULT_SPONSORS = [
  { id: 'def-1', name: 'Walkfront African Network', category: 'Headline Sponsor', logo: '/logo.png' },
  { id: 'def-2', name: 'Edo State Tourism Board', category: 'Official Partner', logo: '/logo.png' },
  { id: 'def-3', name: 'Benin Cultural Heritage Federation', category: 'Strategic Partner', logo: '/logo.png' },
];

export default function SponsorsLogos() {
  const [sponsors, setSponsors] = useState([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [category, setCategory] = useState('Corporate Sponsor');
  const [logoBase64, setLogoBase64] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('boea-sponsors');
    if (saved) {
      try {
        setSponsors(JSON.parse(saved));
      } catch (e) {
        setSponsors(DEFAULT_SPONSORS);
      }
    } else {
      setSponsors(DEFAULT_SPONSORS);
      localStorage.setItem('boea-sponsors', JSON.stringify(DEFAULT_SPONSORS));
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSponsor = (e) => {
    e.preventDefault();
    if (!sponsorName.trim() || !logoBase64) return;

    const newSponsor = {
      id: 'sp-' + Date.now(),
      name: sponsorName,
      category: category,
      logo: logoBase64
    };

    const updated = [newSponsor, ...sponsors];
    setSponsors(updated);
    localStorage.setItem('boea-sponsors', JSON.stringify(updated));

    // Reset form
    setSponsorName('');
    setLogoBase64('');
    setSuccessMsg('Logo uploaded successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteSponsor = (id) => {
    const updated = sponsors.filter(sp => sp.id !== id);
    setSponsors(updated);
    localStorage.setItem('boea-sponsors', JSON.stringify(updated));
  };

  return (
    <main>
      <PageHero
        eyebrow="Sponsors & Partners"
        title="Our Benefactors & Supporters"
        intro="We are honored to collaborate with leading corporate brands, government institutions, and cultural organizations that make the Best of Edo Award possible."
      />

      <section className="page-section section">
        <div className="container">
          <div className="sponsors-header-bar">
            <h2 className="headline-lg">Official Sponsor Showcase</h2>
            <button 
              type="button" 
              className={`btn ${isAdminMode ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setIsAdminMode(!isAdminMode)}
            >
              {isAdminMode ? 'Exit Upload Manager' : 'Upload Sponsor Logo'}
            </button>
          </div>

          {isAdminMode && (
            <div className="upload-section-card">
              <div className="upload-header">
                <ShieldAlert size={20} className="gold-text" />
                <h3 className="headline-sm">Upload Sponsor or Partner Logo</h3>
              </div>
              <form className="upload-form" onSubmit={handleAddSponsor}>
                <div className="form-group-grid">
                  <div className="input-group">
                    <label htmlFor="sponsor-name" className="label-caps">Sponsor / Partner Name</label>
                    <input
                      id="sponsor-name"
                      type="text"
                      className="interest-input"
                      placeholder="e.g. Chevron Nigeria"
                      value={sponsorName}
                      onChange={(e) => setSponsorName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="sponsor-category" className="label-caps">Category</label>
                    <select
                      id="sponsor-category"
                      className="interest-input select-input"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Headline Sponsor">Headline Sponsor</option>
                      <option value="Platinum Sponsor">Platinum Sponsor</option>
                      <option value="Gold Sponsor">Gold Sponsor</option>
                      <option value="Official Partner">Official Partner</option>
                      <option value="Strategic Partner">Strategic Partner</option>
                      <option value="Media Partner">Media Partner</option>
                    </select>
                  </div>
                </div>

                <div className="file-upload-area">
                  <input
                    type="file"
                    id="logo-file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input-hidden"
                    required={!logoBase64}
                  />
                  <label htmlFor="logo-file" className="file-upload-label">
                    <Upload size={24} className="gold-text" />
                    {logoBase64 ? (
                      <span className="file-status-success">Image loaded successfully! Select a different file to change.</span>
                    ) : (
                      <span>Click to choose sponsor logo image (JPEG/PNG/SVG)</span>
                    )}
                  </label>
                  {logoBase64 && (
                    <div className="logo-preview-wrap">
                      <p className="caption">Preview:</p>
                      <img src={logoBase64} alt="Sponsor logo preview" className="logo-preview-img" />
                    </div>
                  )}
                </div>

                <div className="form-actions-wrap">
                  <button type="submit" className="btn btn-primary">
                    <Plus size={18} /> Add Sponsor Logo
                  </button>
                  {successMsg && (
                    <div className="success-banner">
                      <Check size={16} /> {successMsg}
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}

          <div className="sponsors-grid-layout">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="sponsor-display-card">
                {isAdminMode && (
                  <button 
                    type="button" 
                    className="delete-sponsor-btn"
                    onClick={() => handleDeleteSponsor(sponsor.id)}
                    title="Remove Sponsor"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <div className="sponsor-logo-box">
                  <img src={sponsor.logo} alt={`${sponsor.name} Logo`} className="sponsor-logo-img" />
                </div>
                <div className="sponsor-card-details">
                  <h3 className="sponsor-card-name">{sponsor.name}</h3>
                  <span className="sponsor-card-category label-caps">{sponsor.category}</span>
                </div>
              </div>
            ))}
          </div>

          {sponsors.length === 0 && (
            <div className="empty-sponsors">
              <Award size={48} className="text-muted" />
              <p className="body-lg text-muted">No sponsor logos uploaded yet.</p>
              <button type="button" className="btn btn-primary" onClick={() => setIsAdminMode(true)}>
                Upload First Logo
              </button>
            </div>
          )}
        </div>
      </section>

      <NominateCta
        eyebrow="Support Excellence"
        title="Become a Sponsor & Partner"
        titleGold="For the 9th Edition 2026"
        copy="Align your brand with integrity and cultural heritage. Get in touch with our partnerships desk today."
        ctaText="Express Sponsorship Interest"
      />
    </main>
  );
}
