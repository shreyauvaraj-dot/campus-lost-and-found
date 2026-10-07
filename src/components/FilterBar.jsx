import React from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  Calendar, 
  ArrowUpDown, 
  Filter, 
  RotateCcw,
  Laptop,
  CreditCard,
  Key,
  Briefcase,
  BookOpen,
  Shirt,
  Watch,
  Coffee,
  Package,
  LayoutGrid
} from 'lucide-react';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/campusLocations';

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  locationFilter,
  onLocationFilterChange,
  dateFilter,
  onDateFilterChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  hasActiveFilters,
  totalResults,
  totalCount
}) => {
  const getCategoryIcon = (iconName) => {
    const iconMap = {
      Grid: LayoutGrid,
      Laptop: Laptop,
      CreditCard: CreditCard,
      Key: Key,
      Briefcase: Briefcase,
      BookOpen: BookOpen,
      Shirt: Shirt,
      Watch: Watch,
      Coffee: Coffee,
      Package: Package
    };
    const IconComponent = iconMap[iconName] || LayoutGrid;
    return <IconComponent size={15} />;
  };

  return (
    <div className="filter-bar-container">
      {/* Top Search & Primary Filters Row */}
      <div className="search-filter-primary-row">
        {/* Search Input Box */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by keyword, item name, model, room, color..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search-btn" 
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Type Filter Segmented Control */}
        <div className="type-segmented-control">
          <button
            className={`segment-btn ${typeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onTypeFilterChange('all')}
          >
            All Items
          </button>
          <button
            className={`segment-btn lost ${typeFilter === 'lost' ? 'active' : ''}`}
            onClick={() => onTypeFilterChange('lost')}
          >
            <span className="dot lost"></span> Lost
          </button>
          <button
            className={`segment-btn found ${typeFilter === 'found' ? 'active' : ''}`}
            onClick={() => onTypeFilterChange('found')}
          >
            <span className="dot found"></span> Found
          </button>
          <button
            className={`segment-btn resolved ${typeFilter === 'resolved' ? 'active' : ''}`}
            onClick={() => onTypeFilterChange('resolved')}
          >
            <span className="dot resolved"></span> Reunited
          </button>
        </div>
      </div>

      {/* Secondary Dropdown Selectors Row */}
      <div className="selectors-row">
        {/* Campus Location Dropdown */}
        <div className="custom-select-box">
          <MapPin size={15} className="select-icon" />
          <select 
            value={locationFilter} 
            onChange={(e) => onLocationFilterChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by location"
          >
            {CAMPUS_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} {loc.zone ? `(${loc.zone})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter Dropdown */}
        <div className="custom-select-box">
          <Calendar size={15} className="select-icon" />
          <select 
            value={dateFilter} 
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by date range"
          >
            <option value="all">All Dates</option>
            <option value="today">Reported Today</option>
            <option value="3days">Past 3 Days</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="custom-select-box">
          <ArrowUpDown size={15} className="select-icon" />
          <select 
            value={sortBy} 
            onChange={(e) => onSortByChange(e.target.value)}
            className="filter-select"
            aria-label="Sort listings"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="views">Most Viewed</option>
            <option value="urgent">Urgent First</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        {hasActiveFilters && (
          <button 
            className="reset-filters-btn" 
            onClick={onResetFilters}
            title="Clear all filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}

        {/* Result Counter Display */}
        <div className="results-counter">
          <span>Showing <strong>{totalResults}</strong> of {totalCount} items</span>
        </div>
      </div>

      {/* Category Chips Scrollable Ribbon */}
      <div className="category-chips-ribbon">
        {CATEGORIES.map((cat) => {
          const isSelected = categoryFilter === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onCategoryFilterChange(cat.id)}
            >
              <span className="chip-icon">{getCategoryIcon(cat.icon)}</span>
              <span className="chip-label">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
