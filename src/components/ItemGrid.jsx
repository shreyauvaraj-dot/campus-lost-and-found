import React from 'react';
import { ItemCard } from './ItemCard';
import { SearchX, PlusCircle, RotateCcw, PackageSearch } from 'lucide-react';

export const ItemGrid = ({
  items,
  savedIds,
  onToggleSave,
  onOpenDetails,
  onShareItem,
  onOpenReportModal,
  onResetFilters,
  hasActiveFilters
}) => {
  if (items.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-circle">
          {hasActiveFilters ? <SearchX size={44} /> : <PackageSearch size={44} />}
        </div>
        <h3 className="empty-title">
          {hasActiveFilters ? 'No Matching Items Found' : 'No Items Reported Yet'}
        </h3>
        <p className="empty-description">
          {hasActiveFilters 
            ? "We couldn't find any lost or found listings matching your active filters. Try broadening your keywords or clearing some filters."
            : "Be the first to help a fellow classmate! Report an item you've lost or found across campus grounds."}
        </p>
        <div className="empty-actions">
          {hasActiveFilters && (
            <button className="empty-btn-secondary" onClick={onResetFilters}>
              <RotateCcw size={16} /> Clear Filters
            </button>
          )}
          <button className="empty-btn-primary" onClick={() => onOpenReportModal()}>
            <PlusCircle size={16} /> Post New Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="item-grid-container">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isSaved={savedIds.includes(item.id)}
          onToggleSave={onToggleSave}
          onOpenDetails={onOpenDetails}
          onShareItem={onShareItem}
        />
      ))}
    </div>
  );
};
