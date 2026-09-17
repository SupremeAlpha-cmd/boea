import { useState, useMemo, useRef } from 'react';
import {
  Trophy,
  Search,
  Filter,
  Upload,
  Link as LinkIcon,
  Trash2,
  Edit3,
  Plus,
  RotateCcw,
  CheckCircle2,
  Camera,
  AlertCircle,
  X,
  Image as ImageIcon
} from 'lucide-react';
import {
  getStoredRecipients,
  saveStoredRecipients,
  resetStoredRecipients,
  compressImageFile
} from '../data/recipientsData';

export default function PastRecipientsManager({ logAuditAction }) {
  const [recipients, setRecipients] = useState(() => getStoredRecipients());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'needs-photo' | 'has-photo'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Modal states
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [urlModalItem, setUrlModalItem] = useState(null);
  const [customUrl, setCustomUrl] = useState('');
  const [compressingId, setCompressingId] = useState(null);

  // Form states for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    category: 'Excellence & Social Impact',
    edition: 'BOEA Laureate',
    year: 'Historic Laureate',
    citation: 'Recognized at the Best of Edo Award for outstanding leadership, distinction, and impact in Edo State and beyond.',
    image: null
  });

  const fileInputRef = useRef({});

  // Categories list
  const categories = useMemo(() => {
    const set = new Set();
    recipients.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set);
  }, [recipients]);

  // Statistics
  const stats = useMemo(() => {
    const total = recipients.length;
    const withPhoto = recipients.filter((r) => Boolean(r.image)).length;
    const withoutPhoto = total - withPhoto;
    return { total, withPhoto, withoutPhoto };
  }, [recipients]);

  // Filtered list
  const filtered = useMemo(() => {
    return recipients.filter((r) => {
      // Search
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        (r.category && r.category.toLowerCase().includes(q)) ||
        (r.citation && r.citation.toLowerCase().includes(q));

      // Status
      const hasPhoto = Boolean(r.image);
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'has-photo' && hasPhoto) ||
        (statusFilter === 'needs-photo' && !hasPhoto);

      // Category
      const matchCategory =
        categoryFilter === 'all' || r.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [recipients, searchQuery, statusFilter, categoryFilter]);

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(''), 4000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // Upload photo file with client-side compression
  const handlePhotoUpload = async (id, file) => {
    if (!file) return;
    try {
      setCompressingId(id);
      const compressedDataUrl = await compressImageFile(file, 640, 640, 0.85);

      const target = recipients.find((r) => r.id === id);
      const updated = recipients.map((r) =>
        r.id === id ? { ...r, image: compressedDataUrl } : r
      );

      setRecipients(updated);
      saveStoredRecipients(updated);
      setCompressingId(null);

      if (logAuditAction) {
        logAuditAction('Uploaded Laureate Photo', `Name: ${target?.name || id}`);
      }
      showNotification(`Portrait photo saved for ${target?.name || 'laureate'}!`);
    } catch (err) {
      setCompressingId(null);
      console.error(err);
      showNotification('Failed to process image file. Please try another image.', true);
    }
  };

  // Set custom image path or URL
  const handleSaveCustomUrl = (e) => {
    e.preventDefault();
    if (!urlModalItem) return;
    const path = customUrl.trim();
    if (!path) return;

    const updated = recipients.map((r) =>
      r.id === urlModalItem.id ? { ...r, image: path } : r
    );

    setRecipients(updated);
    saveStoredRecipients(updated);

    if (logAuditAction) {
      logAuditAction('Linked Laureate Photo URL', `${urlModalItem.name}: ${path}`);
    }

    setUrlModalItem(null);
    setCustomUrl('');
    showNotification(`Photo link updated for ${urlModalItem.name}!`);
  };

  // Remove photo
  const handleRemovePhoto = (recipient) => {
    if (!window.confirm(`Remove portrait photo for "${recipient.name}"?`)) return;

    const updated = recipients.map((r) =>
      r.id === recipient.id ? { ...r, image: null } : r
    );

    setRecipients(updated);
    saveStoredRecipients(updated);

    if (logAuditAction) {
      logAuditAction('Removed Laureate Photo', recipient.name);
    }
    showNotification(`Photo removed for ${recipient.name}. Card will show monogram.`);
  };

  // Reset to default bundled data
  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Reset all past recipients back to the default bundled catalog? Any custom uploaded photos will be reset to defaults.'
      )
    ) {
      const reset = resetStoredRecipients();
      setRecipients(reset);
      if (logAuditAction) logAuditAction('Reset Recipients Database', 'Reverted to defaults');
      showNotification('Recipients restored to default catalog!');
    }
  };

  // Save new or edited laureate
  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingItem) {
      // Update
      const updated = recipients.map((r) =>
        r.id === editingItem.id ? { ...r, ...formData } : r
      );
      setRecipients(updated);
      saveStoredRecipients(updated);
      if (logAuditAction) {
        logAuditAction('Edited Laureate Details', formData.name);
      }
      showNotification(`Updated details for ${formData.name}`);
      setEditingItem(null);
    } else {
      // Add new
      const newLaureate = {
        id: `laureate-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        edition: formData.edition || 'BOEA Laureate',
        year: formData.year || 'Historic Laureate',
        citation:
          formData.citation.trim() ||
          'Recognized at the Best of Edo Award for outstanding leadership, distinction, and impact in Edo State and beyond.',
        image: formData.image || null
      };

      const updated = [newLaureate, ...recipients];
      setRecipients(updated);
      saveStoredRecipients(updated);
      if (logAuditAction) {
        logAuditAction('Added New Laureate', newLaureate.name);
      }
      showNotification(`Added ${newLaureate.name} to the laureates archive!`);
      setIsAdding(false);
    }

    setFormData({
      name: '',
      category: 'Excellence & Social Impact',
      edition: 'BOEA Laureate',
      year: 'Historic Laureate',
      citation: 'Recognized at the Best of Edo Award for outstanding leadership, distinction, and impact in Edo State and beyond.',
      image: null
    });
  };

  const openEditModal = (rec) => {
    setEditingItem(rec);
    setFormData({
      name: rec.name,
      category: rec.category || 'Excellence & Social Impact',
      edition: rec.edition || 'BOEA Laureate',
      year: rec.year || 'Historic Laureate',
      citation: rec.citation || '',
      image: rec.image || null
    });
  };

  const getMonogram = (name) => {
    if (!name) return 'B';
    const clean = name.replace(/^(Prince|HRH|Dr\.|Barr\.|Hon\.|Amb\.|Mrs|Enogie)\s+/gi, '').trim();
    const parts = clean.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'B';
  };

  return (
    <div className="admin-panel recipients-manager">
      {/* Header section */}
      <div className="recipients-admin-header">
        <div>
          <h2 className="headline-md" style={{ margin: 0 }}>Past Recipients Archive Manager</h2>
          <p className="body-sm text-muted" style={{ margin: '0.35rem 0 0 0' }}>
            Manage laureates, upload portrait photos, and edit citation records with live public updates.
          </p>
        </div>
        <div className="recipients-admin-actions">
          <button
            type="button"
            className="btn btn-gold"
            onClick={() => {
              setFormData({
                name: '',
                category: 'Excellence & Social Impact',
                edition: 'BOEA Laureate',
                year: 'Historic Laureate',
                citation: 'Recognized at the Best of Edo Award for outstanding leadership, distinction, and impact in Edo State and beyond.',
                image: null
              });
              setIsAdding(true);
            }}
          >
            <Plus size={16} /> Add Laureate
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleResetDefaults}
            title="Restore default catalog"
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="admin-alert admin-alert-success">
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="admin-alert admin-alert-error">
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      {/* Stat Cards Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <Trophy size={22} className="gold-text" />
          <div className="stat-val">{stats.total}</div>
          <div className="stat-lbl">Total Laureates</div>
        </div>
        <div className="admin-stat-card">
          <ImageIcon size={22} style={{ color: '#10b981' }} />
          <div className="stat-val" style={{ color: '#10b981' }}>{stats.withPhoto}</div>
          <div className="stat-lbl">Photos Linked</div>
        </div>
        <div className="admin-stat-card">
          <Camera size={22} style={{ color: '#f59e0b' }} />
          <div className="stat-val" style={{ color: '#f59e0b' }}>{stats.withoutPhoto}</div>
          <div className="stat-lbl">Awaiting Photos</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="recipients-toolbar">
        <div className="recipients-search-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="admin-input recipients-search-input"
            placeholder="Search by name, category, or citation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="recipients-filter-group">
          {/* Status Chips */}
          <div className="status-chips">
            <button
              type="button"
              className={`status-chip ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All ({stats.total})
            </button>
            <button
              type="button"
              className={`status-chip ${statusFilter === 'needs-photo' ? 'active' : ''}`}
              onClick={() => setStatusFilter('needs-photo')}
            >
              Needs Photo ({stats.withoutPhoto})
            </button>
            <button
              type="button"
              className={`status-chip ${statusFilter === 'has-photo' ? 'active' : ''}`}
              onClick={() => setStatusFilter('has-photo')}
            >
              With Photo ({stats.withPhoto})
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            className="admin-select recipients-cat-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Laureates Cards Listing */}
      <div className="recipients-admin-grid">
        {filtered.length === 0 ? (
          <div className="recipients-empty-box">
            <Trophy size={40} className="gold-text" style={{ opacity: 0.5, marginBottom: '0.75rem' }} />
            <h4 className="headline-sm">No laureates match your search</h4>
            <p className="body-sm text-muted">Try changing your search terms or filter selection.</p>
          </div>
        ) : (
          filtered.map((rec) => (
            <article key={rec.id} className="recipient-admin-card">
              {/* Card Header / Avatar */}
              <div className="recipient-card-visual">
                {rec.image ? (
                  <div className="recipient-card-img-wrap">
                    <img src={rec.image} alt={rec.name} className="recipient-card-img" />
                    <span className="photo-badge has-photo">
                      <CheckCircle2 size={12} /> Active Photo
                    </span>
                  </div>
                ) : (
                  <div className="recipient-card-monogram-wrap">
                    <span className="recipient-card-monogram">{getMonogram(rec.name)}</span>
                    <span className="photo-badge no-photo">Awaiting Photo</span>
                  </div>
                )}
              </div>

              {/* Card Information */}
              <div className="recipient-card-info">
                <div className="recipient-badge-row">
                  <span className="recipient-cat-badge">{rec.category || 'Laureate'}</span>
                  {rec.edition && (
                    <span className="recipient-edition-badge">{rec.edition}</span>
                  )}
                </div>
                <h3 className="recipient-card-title">{rec.name}</h3>
                <p className="recipient-card-citation">{rec.citation}</p>
              </div>

              {/* Card Actions */}
              <div className="recipient-card-actions">
                {/* Upload File button */}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={(el) => (fileInputRef.current[rec.id] = el)}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handlePhotoUpload(rec.id, e.target.files[0]);
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary card-action-btn"
                  disabled={compressingId === rec.id}
                  onClick={() => fileInputRef.current[rec.id]?.click()}
                  title="Upload image from phone or computer"
                >
                  <Upload size={14} />
                  {compressingId === rec.id ? 'Optimizing...' : rec.image ? 'Replace Photo' : 'Upload Photo'}
                </button>

                {/* Path / URL link button */}
                <button
                  type="button"
                  className="btn btn-outline card-action-btn"
                  onClick={() => {
                    setUrlModalItem(rec);
                    setCustomUrl(rec.image || '');
                  }}
                  title="Specify image file path or web link"
                >
                  <LinkIcon size={14} /> Path / URL
                </button>

                {/* Edit details button */}
                <button
                  type="button"
                  className="btn btn-outline card-action-btn"
                  onClick={() => openEditModal(rec)}
                  title="Edit name, citation, or category"
                >
                  <Edit3 size={14} /> Edit
                </button>

                {/* Remove photo button */}
                {rec.image && (
                  <button
                    type="button"
                    className="btn btn-outline card-action-btn btn-danger-action"
                    onClick={() => handleRemovePhoto(rec)}
                    title="Remove photo and return to monogram"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {/* URL / Path Input Modal */}
      {urlModalItem && (
        <div className="admin-modal-overlay" onClick={() => setUrlModalItem(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="headline-sm">Link Image Path / URL</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setUrlModalItem(null)}
              >
                <X size={18} />
              </button>
            </div>
            <p className="body-sm text-muted">
              Specify a local path (e.g. <code>/images/my_photo.jpg</code>) or an external image link for{' '}
              <strong>{urlModalItem.name}</strong>.
            </p>
            <form onSubmit={handleSaveCustomUrl}>
              <div style={{ margin: '1rem 0' }}>
                <label className="admin-label">Image Path or URL</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="/images/example.jpg or https://..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  required
                />
              </div>
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setUrlModalItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  Apply Image Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Laureate Modal */}
      {(isAdding || editingItem) && (
        <div
          className="admin-modal-overlay"
          onClick={() => {
            setIsAdding(false);
            setEditingItem(null);
          }}
        >
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="headline-sm">
                {editingItem ? `Edit: ${editingItem.name}` : 'Add New Past Laureate'}
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setIsAdding(false);
                  setEditingItem(null);
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label className="admin-label">Full Name & Title</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Dr. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="admin-label">Category</label>
                  <select
                    className="admin-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Institutional & Public Leadership">Institutional & Public Leadership</option>
                    <option value="Royal & Heritage Leadership">Royal & Heritage Leadership</option>
                    <option value="Excellence & Social Impact">Excellence & Social Impact</option>
                    <option value="Creative Arts & Entertainment">Creative Arts & Entertainment</option>
                    <option value="Corporate & Economic Impact">Corporate & Economic Impact</option>
                    <option value="Special Recognition Award">Special Recognition Award</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Edition / Year</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. BOEA Laureate or 7th Edition"
                    value={formData.edition}
                    onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="admin-label">Citation & Impact Statement</label>
                <textarea
                  className="admin-input"
                  style={{ minHeight: '90px', resize: 'vertical' }}
                  placeholder="Citation summary..."
                  value={formData.citation}
                  onChange={(e) => setFormData({ ...formData, citation: e.target.value })}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="admin-label">Optional Photo (URL or File)</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="/images/example.jpg or https://..."
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value || null })}
                  />
                  <label className="btn btn-outline" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <Upload size={14} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const dataUrl = await compressImageFile(file, 640, 640, 0.85);
                          setFormData({ ...formData, image: dataUrl });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingItem(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  {editingItem ? 'Save Changes' : 'Add Laureate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
