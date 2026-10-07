import React from 'react';
import { 
  Compass, 
  PlusCircle, 
  Moon, 
  Sun, 
  MapPin, 
  Bookmark, 
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Navbar = ({ 
  theme, 
  onToggleTheme, 
  onOpenReportModal, 
  onOpenDropOffModal, 
  onOpenMyPostsModal,
  savedCount,
  onResetData
}) => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Compass className="brand-icon" size={24} />
            <span className="beacon-ping"></span>
          </div>
          <div className="brand-text">
            <span className="brand-name">Campus<span className="brand-accent">Finder</span></span>
            <span className="brand-badge">Official Lost & Found</span>
          </div>
        </div>

        {/* Navigation Action Center */}
        <div className="navbar-actions">
          {/* Official Drop-off Desks Guide */}
          <button 
            className="nav-btn-secondary" 
            onClick={onOpenDropOffModal}
            title="View Official Campus Drop-off Locations"
          >
            <ShieldCheck size={18} className="btn-icon" />
            <span className="btn-label">Campus Desks</span>
          </button>

          {/* My Items & Bookmarks */}
          <button 
            className="nav-btn-secondary" 
            onClick={onOpenMyPostsModal}
            title="My Reported Items & Saved Bookmarks"
          >
            <Bookmark size={18} className="btn-icon" />
            <span className="btn-label">Saved & Mine</span>
            {savedCount > 0 && <span className="nav-counter-badge">{savedCount}</span>}
          </button>

          {/* Theme Switcher */}
          <button 
            className="nav-icon-btn" 
            onClick={onToggleTheme} 
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          {/* Reset Demo Data Button */}
          <button 
            className="nav-icon-btn reset-btn" 
            onClick={onResetData} 
            title="Reset Mock Data to Initial State"
            aria-label="Reset Data"
          >
            <RotateCcw size={17} />
          </button>

          {/* "+ Report Item" Primary CTA */}
          <button 
            className="nav-btn-primary" 
            onClick={() => onOpenReportModal()}
          >
            <PlusCircle size={18} className="btn-icon pulse-icon" />
            <span>Report Item</span>
          </button>
        </div>
      </div>
    </header>
  );
};
