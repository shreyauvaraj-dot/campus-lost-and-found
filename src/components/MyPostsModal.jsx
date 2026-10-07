import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  Eye, 
  ArrowRight,
  Clock,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { CAMPUS_LOCATIONS } from '../data/campusLocations';

export const MyPostsModal = ({
  onClose,
  allItems,
  myPostIds,
  savedIds,
  onOpenDetails,
  onDeleteItem,
  onResolveItem,
  onToggleSave,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState('mine'); // 'mine' | 'saved'

  const myPosts = allItems.filter((i) => myPostIds.includes(i.id));
  const savedItems = allItems.filter((i) => savedIds.includes(i.id));

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDeleteItem(id);
      onShowToast({
        type: 'info',
        title: 'Listing Removed',
        message: `"${title}" has been deleted.`
      });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog myposts-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">My Dashboard & Bookmarks</h2>
            <p className="modal-subtitle">Manage your campus reports and track saved items</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="myposts-tabs">
          <button
            className={`myposts-tab-btn ${activeTab === 'mine' ? 'active' : ''}`}
            onClick={() => setActiveTab('mine')}
          >
            <FileText size={16} />
            <span>My Reported Items ({myPosts.length})</span>
          </button>

          <button
            className={`myposts-tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark size={16} />
            <span>Saved Bookmarks ({savedItems.length})</span>
          </button>
        </div>

        {/* Content List */}
        <div className="modal-body myposts-modal-body">
          {activeTab === 'mine' ? (
            myPosts.length === 0 ? (
              <div className="empty-substate">
                <FileText size={36} className="empty-subicon" />
                <p>You haven't posted any items yet in this session.</p>
              </div>
            ) : (
              <div className="myposts-list">
                {myPosts.map((item) => {
                  const locationObj = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);
                  const isResolved = item.status === 'resolved';

                  return (
                    <div key={item.id} className={`mypost-row-card ${isResolved ? 'resolved' : ''}`}>
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="mypost-thumb"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80';
                        }}
                      />

                      <div className="mypost-info">
                        <div className="mypost-header-row">
                          <span className={`card-badge ${item.type === 'lost' ? 'lost-badge' : 'found-badge'}`}>
                            {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                          </span>
                          {isResolved && (
                            <span className="card-badge resolved-badge">
                              <CheckCircle2 size={12} /> Reunited
                            </span>
                          )}
                        </div>

                        <h4 className="mypost-title" onClick={() => { onClose(); onOpenDetails(item); }}>
                          {item.title}
                        </h4>

                        <div className="mypost-submeta">
                          <span><MapPin size={12} /> {locationObj ? locationObj.name : 'Campus'}</span>
                          <span><Eye size={12} /> {item.views || 1} views</span>
                        </div>
                      </div>

                      <div className="mypost-actions">
                        <button 
                          className="mypost-action-btn view"
                          onClick={() => { onClose(); onOpenDetails(item); }}
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>

                        {!isResolved && (
                          <button 
                            className="mypost-action-btn resolve"
                            onClick={() => {
                              onResolveItem(item.id, 'Self Marked');
                              onShowToast({
                                type: 'success',
                                title: 'Marked Reunited!',
                                message: `"${item.title}" is now marked resolved.`
                              });
                            }}
                            title="Mark as Reunited / Closed"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                        )}

                        <button 
                          className="mypost-action-btn delete"
                          onClick={() => handleDelete(item.id, item.title)}
                          title="Delete Listing"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            savedItems.length === 0 ? (
              <div className="empty-substate">
                <Bookmark size={36} className="empty-subicon" />
                <p>No saved bookmarks yet. Click the bookmark icon on any card to save it here for quick tracking!</p>
              </div>
            ) : (
              <div className="myposts-list">
                {savedItems.map((item) => {
                  const locationObj = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);
                  const isResolved = item.status === 'resolved';

                  return (
                    <div key={item.id} className="mypost-row-card">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="mypost-thumb"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80';
                        }}
                      />

                      <div className="mypost-info">
                        <div className="mypost-header-row">
                          <span className={`card-badge ${item.type === 'lost' ? 'lost-badge' : 'found-badge'}`}>
                            {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                          </span>
                          {isResolved && (
                            <span className="card-badge resolved-badge">
                              <CheckCircle2 size={12} /> Reunited
                            </span>
                          )}
                        </div>

                        <h4 className="mypost-title" onClick={() => { onClose(); onOpenDetails(item); }}>
                          {item.title}
                        </h4>

                        <div className="mypost-submeta">
                          <span><MapPin size={12} /> {locationObj ? locationObj.name : 'Campus'}</span>
                        </div>
                      </div>

                      <div className="mypost-actions">
                        <button 
                          className="mypost-action-btn view"
                          onClick={() => { onClose(); onOpenDetails(item); }}
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button 
                          className="mypost-action-btn delete"
                          onClick={() => {
                            onToggleSave(item.id);
                            onShowToast({
                              type: 'info',
                              title: 'Bookmark Removed',
                              message: `Removed from saved items.`
                            });
                          }}
                          title="Remove from saved"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
