import React from 'react';
import { 
  MapPin, 
  Clock, 
  Bookmark, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  ArrowRight,
  Share2,
  Gift
} from 'lucide-react';
import { CAMPUS_LOCATIONS, CATEGORIES } from '../data/campusLocations';

export const ItemCard = ({ 
  item, 
  isSaved, 
  onToggleSave, 
  onOpenDetails,
  onShareItem 
}) => {
  // Format relative timestamp
  const formatTimeAgo = (dateString) => {
    try {
      const now = new Date();
      const date = new Date(dateString);
      const diffMs = now - date;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHrs / 24);

      if (diffHrs < 1) return 'Just now';
      if (diffHrs < 24) return `${diffHrs}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const locationObj = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);
  const locationName = locationObj ? locationObj.name : item.locationDetail || 'Campus Grounds';

  const categoryObj = CATEGORIES.find((c) => c.id === item.category);
  const categoryName = categoryObj ? categoryObj.name : 'Item';

  const isResolved = item.status === 'resolved';

  return (
    <article className={`item-card ${item.type} ${isResolved ? 'is-resolved' : ''}`}>
      {/* Card Image & Overlay Badges */}
      <div className="card-image-wrapper" onClick={() => onOpenDetails(item)}>
        <img 
          src={item.imageUrl || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80'} 
          alt={item.title} 
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Status Badge */}
        <div className="card-badge-container">
          {isResolved ? (
            <span className="card-badge resolved-badge">
              <CheckCircle2 size={13} /> Reunited
            </span>
          ) : (
            <span className={`card-badge ${item.type === 'lost' ? 'lost-badge' : 'found-badge'}`}>
              {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
            </span>
          )}

          {item.urgent && !isResolved && (
            <span className="card-badge urgent-badge">
              <AlertCircle size={13} /> Urgent
            </span>
          )}
        </div>

        {/* Reward Tag */}
        {item.reward && !isResolved && (
          <div className="card-reward-tag">
            <Gift size={12} /> {item.reward}
          </div>
        )}

        {/* Top Right Actions (Bookmark & Share) */}
        <div className="card-floating-actions" onClick={(e) => e.stopPropagation()}>
          <button 
            className={`card-action-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => onToggleSave(item.id)}
            title={isSaved ? 'Remove from saved' : 'Save bookmark'}
            aria-label="Bookmark item"
          >
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button 
            className="card-action-btn"
            onClick={() => onShareItem(item)}
            title="Share item link"
            aria-label="Share item"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Category & Time Row */}
        <div className="card-meta-row">
          <span className="card-category-tag">{categoryName}</span>
          <span className="card-time">
            <Clock size={12} /> {formatTimeAgo(item.date)}
          </span>
        </div>

        {/* Title */}
        <h3 className="card-title" onClick={() => onOpenDetails(item)}>
          {item.title}
        </h3>

        {/* Description Snippet */}
        <p className="card-description">
          {item.description}
        </p>

        {/* Campus Location Tag */}
        <div className="card-location-box">
          <MapPin size={13} className="location-pin-icon" />
          <span className="location-text" title={item.locationDetail || locationName}>
            {item.locationDetail ? item.locationDetail : locationName}
          </span>
        </div>

        {/* Card Footer & CTA */}
        <div className="card-footer">
          <div className="card-views">
            <Eye size={13} /> <span>{item.views || 1} views</span>
          </div>

          <button 
            className={`card-cta-btn ${isResolved ? 'resolved' : item.type}`}
            onClick={() => onOpenDetails(item)}
          >
            <span>{isResolved ? 'View Record' : item.type === 'lost' ? 'I Found This' : 'Claim Item'}</span>
            <ArrowRight size={14} className="cta-arrow" />
          </button>
        </div>
      </div>
    </article>
  );
};
