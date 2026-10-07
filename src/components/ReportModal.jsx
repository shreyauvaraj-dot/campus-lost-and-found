import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Tag, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Gift, 
  AlertCircle, 
  Sparkles,
  Check
} from 'lucide-react';
import { CATEGORIES, CAMPUS_LOCATIONS, SAMPLE_PRESET_IMAGES } from '../data/campusLocations';

export const ReportModal = ({ onClose, onAddItem, onShowToast, initialType = 'lost' }) => {
  const [formData, setFormData] = useState({
    type: initialType,
    title: '',
    category: 'electronics',
    locationId: 'library',
    locationDetail: '',
    date: new Date().toISOString().slice(0, 16),
    description: '',
    imageUrl: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    preferredContact: 'email',
    securityQuestion: '',
    reward: '',
    urgent: false
  });

  const [imagePreview, setImagePreview] = useState('');
  const [showPresets, setShowPresets] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle Image File Upload (convert to base64)
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        onShowToast({
          type: 'error',
          title: 'File Too Large',
          message: 'Please choose an image under 4MB.'
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Select Sample Image Preset
  const handleSelectPreset = (presetUrl) => {
    setImagePreview(presetUrl);
    setFormData((prev) => ({ ...prev, imageUrl: presetUrl }));
    setShowPresets(false);
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Please provide a description';
    if (!formData.contactName.trim()) newErrors.contactName = 'Your name is required';
    if (!formData.contactEmail.trim() && !formData.contactPhone.trim()) {
      newErrors.contactEmail = 'Provide at least an email or phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      onShowToast({
        type: 'error',
        title: 'Incomplete Form',
        message: 'Please check the highlighted fields.'
      });
      return;
    }

    const submission = {
      ...formData,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80',
      date: new Date(formData.date).toISOString()
    };

    onAddItem(submission);
    onShowToast({
      type: 'success',
      title: '🎉 Listing Published!',
      message: `Your ${formData.type === 'lost' ? 'Lost' : 'Found'} report is now live on the campus board.`
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog report-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              Report Campus Item
            </h2>
            <p className="modal-subtitle">
              Post an item you have lost or discovered across campus facilities
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="modal-body report-form">
          {/* Item Type Selector */}
          <div className="form-group">
            <label className="form-label">What are you reporting?</label>
            <div className="report-type-toggle">
              <button
                type="button"
                className={`type-toggle-card lost ${formData.type === 'lost' ? 'selected' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, type: 'lost' }))}
              >
                <div className="toggle-badge lost">🔴</div>
                <div className="toggle-text">
                  <strong>I Lost an Item</strong>
                  <span>Looking for my misplaced belonging</span>
                </div>
                {formData.type === 'lost' && <Check size={18} className="toggle-check" />}
              </button>

              <button
                type="button"
                className={`type-toggle-card found ${formData.type === 'found' ? 'selected' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, type: 'found' }))}
              >
                <div className="toggle-badge found">🟢</div>
                <div className="toggle-text">
                  <strong>I Found an Item</strong>
                  <span>Turned in or safeguarding an item</span>
                </div>
                {formData.type === 'found' && <Check size={18} className="toggle-check" />}
              </button>
            </div>
          </div>

          {/* Title & Category Grid */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Item Title <span className="req">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                className={`form-input ${errors.title ? 'has-error' : ''}`}
                placeholder="e.g. Space Gray MacBook Air M2 / Blue HydroFlask"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">Category <span className="req">*</span></label>
              <select
                id="category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Campus Location & Exact Spot Grid */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="locationId">
                Campus Building / Zone <span className="req">*</span>
              </label>
              <select
                id="locationId"
                name="locationId"
                className="form-select"
                value={formData.locationId}
                onChange={handleChange}
              >
                {CAMPUS_LOCATIONS.filter((l) => l.id !== 'all').map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} {loc.zone ? `(${loc.zone})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="locationDetail">
                Specific Room / Spot (Optional)
              </label>
              <input
                id="locationDetail"
                type="text"
                name="locationDetail"
                className="form-input"
                placeholder="e.g. 3rd Floor quiet desks near Window 4B"
                value={formData.locationDetail}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date & Urgency Row */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="date">Date & Approximate Time</label>
              <input
                id="date"
                type="datetime-local"
                name="date"
                className="form-input"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group flex-center-group">
              <label className="checkbox-label" htmlFor="urgent">
                <input
                  id="urgent"
                  type="checkbox"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                />
                <span className="checkbox-custom"></span>
                <div>
                  <strong>Mark as Urgent</strong>
                  <span className="checkbox-subtext">Needs fast campus attention (Keys/IDs/Medication)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Reward Input if Lost */}
          {formData.type === 'lost' && (
            <div className="form-group">
              <label className="form-label" htmlFor="reward">
                Optional Reward (Cash / Boba / Gift)
              </label>
              <input
                id="reward"
                type="text"
                name="reward"
                className="form-input"
                placeholder="e.g. $30 Cash Reward or Free Boba treat"
                value={formData.reward}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Photo Upload & Presets */}
          <div className="form-group">
            <label className="form-label">Item Photo</label>
            <div className="photo-upload-container">
              <div className="photo-actions-row">
                <label className="upload-file-btn">
                  <Upload size={16} /> Choose Image File
                  <input type="file" accept="image/*" onChange={handleImageFile} style={{ display: 'none' }} />
                </label>
                <button
                  type="button"
                  className="preset-picker-btn"
                  onClick={() => setShowPresets(!showPresets)}
                >
                  <ImageIcon size={16} /> Choose Preset Photo
                </button>
              </div>

              {/* Preset Photos Drawer */}
              {showPresets && (
                <div className="presets-drawer">
                  <div className="presets-drawer-header">
                    <span>Select a matching campus item picture:</span>
                    <button type="button" onClick={() => setShowPresets(false)}><X size={14} /></button>
                  </div>
                  <div className="presets-grid">
                    {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                      <div 
                        key={idx} 
                        className="preset-thumbnail-card"
                        onClick={() => handleSelectPreset(preset.url)}
                      >
                        <img src={preset.url} alt={preset.name} />
                        <span>{preset.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview Box */}
              {imagePreview && (
                <div className="image-preview-wrapper">
                  <img src={imagePreview} alt="Item preview" className="uploaded-preview-img" />
                  <button 
                    type="button" 
                    className="remove-preview-btn" 
                    onClick={() => {
                      setImagePreview('');
                      setFormData((p) => ({ ...p, imageUrl: '' }));
                    }}
                  >
                    <X size={14} /> Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Detailed Description & Distinguishing Marks <span className="req">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`form-textarea ${errors.description ? 'has-error' : ''}`}
              placeholder="Describe color, brand, condition, stickers, case, engravings, contents, or where it was placed..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          {/* Proof of Ownership Challenge Question */}
          <div className="form-group">
            <label className="form-label" htmlFor="securityQuestion">
              <ShieldCheck size={16} className="inline-icon" /> Proof of Ownership Verification Question
            </label>
            <input
              id="securityQuestion"
              type="text"
              name="securityQuestion"
              className="form-input"
              placeholder="e.g. What is the phone wallpaper? / What keychain is attached?"
              value={formData.securityQuestion}
              onChange={handleChange}
            />
            <span className="form-hint">
              Protects against false claims. Only the true owner will know the correct answer.
            </span>
          </div>

          {/* Contact Information Section */}
          <div className="contact-fieldset">
            <h4 className="fieldset-title">
              <User size={16} /> Your Contact Information
            </h4>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="contactName">Your Name <span className="req">*</span></label>
                <input
                  id="contactName"
                  type="text"
                  name="contactName"
                  className={`form-input ${errors.contactName ? 'has-error' : ''}`}
                  placeholder="e.g. Jordan Smith"
                  value={formData.contactName}
                  onChange={handleChange}
                />
                {errors.contactName && <span className="form-error">{errors.contactName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactEmail">Campus Email</label>
                <input
                  id="contactEmail"
                  type="email"
                  name="contactEmail"
                  className={`form-input ${errors.contactEmail ? 'has-error' : ''}`}
                  placeholder="e.g. j.smith@campus.edu"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
                {errors.contactEmail && <span className="form-error">{errors.contactEmail}</span>}
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="contactPhone">Phone / WhatsApp (Optional)</label>
                <input
                  id="contactPhone"
                  type="tel"
                  name="contactPhone"
                  className="form-input"
                  placeholder="e.g. (555) 019-3388"
                  value={formData.contactPhone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="preferredContact">Preferred Contact Mode</label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  className="form-select"
                  value={formData.preferredContact}
                  onChange={handleChange}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone / SMS</option>
                  <option value="any">Either Email or Phone</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-footer-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Publish Listing 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
