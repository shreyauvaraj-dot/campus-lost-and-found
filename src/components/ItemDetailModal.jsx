import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Gift, 
  ShieldCheck, 
  Share2, 
  Bookmark, 
  HelpCircle, 
  Send,
  Printer,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAMPUS_LOCATIONS, CATEGORIES } from '../data/campusLocations';

export const ItemDetailModal = ({ 
  item, 
  onClose, 
  isSaved, 
  onToggleSave, 
  onResolveItem, 
  onShareItem,
  onShowToast 
}) => {
  const [claimAnswer, setClaimAnswer] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [claimantName, setClaimantName] = useState('');

  if (!item) return null;

  const isResolved = item.status === 'resolved';
  const locationObj = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);
  const locationName = locationObj ? locationObj.name : item.locationDetail || 'Campus Grounds';
  const categoryObj = CATEGORIES.find((c) => c.id === item.category);
  const categoryName = categoryObj ? categoryObj.name : 'General Item';

  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (!claimAnswer.trim()) {
      onShowToast({
        type: 'error',
        title: 'Missing Details',
        message: 'Please provide your answer or proof description.'
      });
      return;
    }
    setClaimSubmitted(true);
    onShowToast({
      type: 'success',
      title: 'Claim Message Prepared',
      message: 'Your verification response is ready. You can now contact the student/office directly below!'
    });
  };

  const handleResolveClick = () => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti error', err);
    }

    const resolvedUser = claimantName.trim() || 'Verified Student';
    onResolveItem(item.id, resolvedUser);
    setIsResolving(false);
    onShowToast({
      type: 'success',
      title: '🎉 Item Reunited!',
      message: `Marked as resolved. Thank you for making our campus helpful!`
    });
  };

  const handleCopyContact = (text, label) => {
    navigator.clipboard.writeText(text);
    onShowToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: `${label} (${text}) copied.`
    });
  };

  const handlePrintFlyer = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog detail-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-tags-row">
              {isResolved ? (
                <span className="card-badge resolved-badge">
                  <CheckCircle2 size={14} /> Reunited & Closed
                </span>
              ) : (
                <span className={`card-badge ${item.type === 'lost' ? 'lost-badge' : 'found-badge'}`}>
                  {item.type === 'lost' ? '🔴 LOST ITEM' : '🟢 FOUND ITEM'}
                </span>
              )}
              {item.urgent && !isResolved && (
                <span className="card-badge urgent-badge">
                  <AlertCircle size={14} /> Urgent
                </span>
              )}
              {item.reward && !isResolved && (
                <span className="card-badge reward-badge">
                  <Gift size={14} /> {item.reward}
                </span>
              )}
            </div>
          </div>

          <div className="modal-header-actions">
            <button 
              className={`modal-icon-action ${isSaved ? 'saved' : ''}`}
              onClick={() => onToggleSave(item.id)}
              title={isSaved ? 'Remove Bookmark' : 'Bookmark this Item'}
            >
              <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="modal-icon-action"
              onClick={() => onShareItem(item)}
              title="Share Item"
            >
              <Share2 size={18} />
            </button>
            <button 
              className="modal-icon-action"
              onClick={handlePrintFlyer}
              title="Print Lost/Found Notice"
            >
              <Printer size={18} />
            </button>
            <button 
              className="modal-close-btn" 
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body detail-modal-body">
          {/* Main Visual & Overview */}
          <div className="detail-hero-grid">
            <div className="detail-image-container">
              <img 
                src={item.imageUrl || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80'} 
                alt={item.title} 
                className="detail-large-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="detail-category-badge">
                {categoryName}
              </div>
            </div>

            <div className="detail-overview-content">
              <h2 className="detail-title">{item.title}</h2>

              <div className="detail-metadata-list">
                <div className="detail-meta-item">
                  <MapPin size={18} className="meta-icon location" />
                  <div>
                    <span className="meta-label">Campus Location:</span>
                    <span className="meta-value font-semibold">
                      {locationName}
                      {item.locationDetail && ` — ${item.locationDetail}`}
                    </span>
                  </div>
                </div>

                <div className="detail-meta-item">
                  <Calendar size={18} className="meta-icon date" />
                  <div>
                    <span className="meta-label">Date Reported:</span>
                    <span className="meta-value">{formattedDate}</span>
                  </div>
                </div>

                {isResolved && (
                  <div className="detail-meta-item resolved-notice">
                    <CheckCircle2 size={18} className="meta-icon resolved" />
                    <div>
                      <span className="meta-label">Status:</span>
                      <span className="meta-value">
                        Returned / Reunited with {item.claimedBy || 'Owner'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div className="detail-description-box">
                <h4 className="detail-section-title">Item Description & Notes</h4>
                <p className="detail-description-text">{item.description}</p>
              </div>
            </div>
          </div>

          {/* Security / Proof Challenge Box */}
          {item.securityQuestion && (
            <div className="security-challenge-card">
              <div className="challenge-header">
                <ShieldCheck size={20} className="challenge-icon" />
                <div>
                  <h4>Proof of Ownership Question</h4>
                  <p>The poster set this verification check to protect student belongings.</p>
                </div>
              </div>
              <div className="challenge-question">
                <strong>Question:</strong> "{item.securityQuestion}"
              </div>

              {!isResolved && !claimSubmitted && (
                <form onSubmit={handleClaimSubmit} className="claim-response-form">
                  <input
                    type="text"
                    className="claim-input"
                    placeholder="Type your answer / description to verify ownership..."
                    value={claimAnswer}
                    onChange={(e) => setClaimAnswer(e.target.value)}
                  />
                  <button type="submit" className="claim-submit-btn">
                    <Send size={15} /> Verify
                  </button>
                </form>
              )}

              {claimSubmitted && (
                <div className="claim-ready-banner">
                  <CheckCircle2 size={16} /> 
                  <span>Verification drafted! Contact the poster below and mention: "<strong>{claimAnswer}</strong>"</span>
                </div>
              )}
            </div>
          )}

          {/* Contact Section */}
          <div className="contact-section-card">
            <h4 className="detail-section-title">Contact & Claim Procedure</h4>
            <div className="contact-details-grid">
              <div className="contact-card">
                <div className="contact-user-row">
                  <div className="avatar-circle">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="contact-name">{item.contactName || 'Campus Community Member'}</div>
                    <div className="contact-role">
                      {item.type === 'lost' ? 'Item Owner' : 'Finder / Custodian'}
                    </div>
                  </div>
                </div>

                <div className="contact-actions-row">
                  {item.contactEmail && (
                    <a 
                      href={`mailto:${item.contactEmail}?subject=${encodeURIComponent(`Campus Lost & Found: ${item.title}`)}&body=${encodeURIComponent(
                        claimSubmitted ? `Hi ${item.contactName},\n\nI am contacting you regarding "${item.title}".\n\nProof of Ownership verification:\n${claimAnswer}\n\nPlease let me know when and where we can coordinate.\n\nThank you!` : `Hi ${item.contactName},\n\nI am reaching out regarding your Campus Lost & Found post for "${item.title}".`
                      )}`}
                      className="contact-action-btn email"
                    >
                      <Mail size={16} />
                      <span>Email Poster</span>
                    </a>
                  )}

                  {item.contactPhone && (
                    <a 
                      href={`tel:${item.contactPhone}`}
                      className="contact-action-btn phone"
                    >
                      <Phone size={16} />
                      <span>Call / SMS</span>
                    </a>
                  )}

                  {item.contactEmail && (
                    <button 
                      className="contact-copy-btn"
                      onClick={() => handleCopyContact(item.contactEmail, 'Email')}
                      title="Copy Email"
                    >
                      <Copy size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Safety & Meeting Zone Guidance */}
              <div className="safety-guidance-card">
                <div className="safety-title">
                  <ShieldCheck size={16} /> Campus Safety Guideline
                </div>
                <p className="safety-text">
                  Always arrange pickups during daylight in public campus areas (e.g. <strong>Central Library Lobby</strong> or <strong>Student Union Info Desk</strong>). Never share sensitive student passwords or bank codes.
                </p>
              </div>
            </div>
          </div>

          {/* Resolve / Mark as Reunited Area */}
          {!isResolved && (
            <div className="resolve-action-section">
              {!isResolving ? (
                <div className="resolve-prompt-bar">
                  <div>
                    <span className="font-semibold">Are you the poster or has this item been returned?</span>
                    <p className="subtext">Help keep the campus board up to date by marking this item reunited.</p>
                  </div>
                  <button 
                    className="resolve-trigger-btn"
                    onClick={() => setIsResolving(true)}
                  >
                    <CheckCircle2 size={16} /> Mark as Reunited
                  </button>
                </div>
              ) : (
                <div className="resolve-confirm-box">
                  <h4>Confirm Reunification</h4>
                  <p>Enter the name or note for who received the item:</p>
                  <div className="resolve-inputs-row">
                    <input
                      type="text"
                      className="resolve-name-input"
                      placeholder="e.g. Claimed by Owner / Returned at Library"
                      value={claimantName}
                      onChange={(e) => setClaimantName(e.target.value)}
                    />
                    <button 
                      className="confirm-resolve-btn"
                      onClick={handleResolveClick}
                    >
                      Confirm Reunited! 🎉
                    </button>
                    <button 
                      className="cancel-resolve-btn"
                      onClick={() => setIsResolving(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
