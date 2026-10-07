import React from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Building, 
  CheckCircle2, 
  Info,
  ExternalLink
} from 'lucide-react';
import { DROP_OFF_DESKS } from '../data/campusLocations';

export const DropOffDesksModal = ({ onClose, onShowToast }) => {
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    onShowToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: `${label} (${text}) copied.`
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog dropoff-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-brand">
            <ShieldCheck size={24} className="shield-icon" />
            <div>
              <h2 className="modal-title">Official Campus Drop-off Locations</h2>
              <p className="modal-subtitle">
                Physical security desks and lost & found collection points across campus
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body dropoff-modal-body">
          {/* Notice banner */}
          <div className="official-notice-banner">
            <Info size={20} className="notice-icon" />
            <div>
              <strong>Found High-Value Belongings?</strong>
              <p>
                Laptops, wallets, cash, jewelry, and government/student IDs should be delivered to the nearest official desk within 24 hours for verified custodian holding.
              </p>
            </div>
          </div>

          {/* Desks Grid */}
          <div className="desks-grid">
            {DROP_OFF_DESKS.map((desk) => (
              <div key={desk.id} className="desk-card">
                <div className="desk-card-header">
                  <div className="desk-name-row">
                    <Building size={18} className="desk-icon" />
                    <h3>{desk.name}</h3>
                  </div>
                  <span className="desk-badge">{desk.badge}</span>
                </div>

                <div className="desk-info-list">
                  <div className="desk-info-row">
                    <MapPin size={15} className="info-icon location" />
                    <span>{desk.building}</span>
                  </div>

                  <div className="desk-info-row">
                    <Clock size={15} className="info-icon hours" />
                    <span>{desk.hours}</span>
                  </div>

                  <div className="desk-contact-buttons">
                    <a href={`tel:${desk.phone}`} className="desk-btn phone">
                      <Phone size={14} /> {desk.phone}
                    </a>
                    <a href={`mailto:${desk.email}`} className="desk-btn email">
                      <Mail size={14} /> Email Desk
                    </a>
                  </div>
                </div>

                <div className="desk-accepts-section">
                  <span className="accepts-label">Common Items Accepted:</span>
                  <div className="accepts-chips">
                    {desk.accepts.map((item, idx) => (
                      <span key={idx} className="accept-chip">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guidelines footer */}
          <div className="dropoff-guidelines-box">
            <h4>Campus Lost Property Retention Rules</h4>
            <ul>
              <li><strong>Student IDs & Keys:</strong> Kept at Central Library or Security HQ for 30 days before shredding/rekeying.</li>
              <li><strong>Clothing & Bottles:</strong> Donated to campus charity pantry after 45 days if unclaimed.</li>
              <li><strong>Electronics & Valuables:</strong> Kept in locked safe for up to 90 days with serial log.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-primary-close" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
