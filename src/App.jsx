import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { StatsRibbon } from './components/StatsRibbon';
import { FilterBar } from './components/FilterBar';
import { ItemGrid } from './components/ItemGrid';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ReportModal } from './components/ReportModal';
import { DropOffDesksModal } from './components/DropOffDesksModal';
import { MyPostsModal } from './components/MyPostsModal';
import { Toast } from './components/Toast';
import { PlusCircle, AlertTriangle, ShieldCheck, HeartHandshake } from 'lucide-react';

export function App() {
  // 1. Data State
  const [items, setItems] = useState(() => storageService.getItems());
  const [savedIds, setSavedIds] = useState(() => storageService.getSavedIds());
  const [myPostIds, setMyPostIds] = useState(() => storageService.getMyPostIds());

  // 2. Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('campus_theme') || 'light';
  });

  // 3. Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'lost' | 'found' | 'resolved'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // 'all' | 'today' | '3days' | 'week' | 'month'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'views' | 'urgent'

  // 4. Modal States
  const [selectedItem, setSelectedItem] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportInitialType, setReportInitialType] = useState('lost');
  const [isDropOffModalOpen, setIsDropOffModalOpen] = useState(false);
  const [isMyPostsModalOpen, setIsMyPostsModalOpen] = useState(false);

  // 5. Toast State
  const [toast, setToast] = useState(null);

  // Sync theme attribute on <html> / <body>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('campus_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  // Check URL parameters for direct item view link (e.g. ?item=item-1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemIdParam = params.get('item');
    if (itemIdParam) {
      const match = items.find((i) => i.id === itemIdParam);
      if (match) {
        setSelectedItem(match);
      }
    }
  }, []);

  // Filtered & Sorted Items computation
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Search query (title, description, locationDetail)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = item.title?.toLowerCase().includes(query);
        const descMatch = item.description?.toLowerCase().includes(query);
        const locMatch = item.locationDetail?.toLowerCase().includes(query);
        const contactMatch = item.contactName?.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !locMatch && !contactMatch) {
          return false;
        }
      }

      // 2. Type filter
      if (typeFilter === 'lost') {
        if (item.type !== 'lost' || item.status === 'resolved') return false;
      } else if (typeFilter === 'found') {
        if (item.type !== 'found' || item.status === 'resolved') return false;
      } else if (typeFilter === 'resolved') {
        if (item.status !== 'resolved') return false;
      }

      // 3. Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }

      // 4. Location filter
      if (locationFilter !== 'all' && item.locationId !== locationFilter) {
        return false;
      }

      // 5. Date filter
      if (dateFilter !== 'all') {
        const itemDate = new Date(item.date).getTime();
        const now = Date.now();
        const diffHours = (now - itemDate) / (1000 * 60 * 60);

        if (dateFilter === 'today' && diffHours > 24) return false;
        if (dateFilter === '3days' && diffHours > 72) return false;
        if (dateFilter === 'week' && diffHours > 168) return false;
        if (dateFilter === 'month' && diffHours > 720) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === 'views') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'urgent') {
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  }, [items, searchQuery, typeFilter, categoryFilter, locationFilter, dateFilter, sortBy]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || 
    typeFilter !== 'all' || 
    categoryFilter !== 'all' || 
    locationFilter !== 'all' || 
    dateFilter !== 'all' || 
    sortBy !== 'newest'
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setLocationFilter('all');
    setDateFilter('all');
    setSortBy('newest');
  };

  // Add Item Handler
  const handleAddItem = (newItemData) => {
    const created = storageService.addItem(newItemData);
    setItems(storageService.getItems());
    setMyPostIds(storageService.getMyPostIds());
  };

  // Resolve Item Handler
  const handleResolveItem = (id, claimantName) => {
    storageService.resolveItem(id, claimantName);
    const updated = storageService.getItems();
    setItems(updated);
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(updated.find((i) => i.id === id));
    }
  };

  // Delete Item Handler
  const handleDeleteItem = (id) => {
    storageService.deleteItem(id);
    setItems(storageService.getItems());
    setMyPostIds(storageService.getMyPostIds());
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }
  };

  // Toggle Bookmark
  const handleToggleSave = (id) => {
    const updated = storageService.toggleBookmark(id);
    setSavedIds(updated);
    const isNowSaved = updated.includes(id);
    showToast({
      type: 'info',
      title: isNowSaved ? 'Saved to Bookmarks' : 'Removed from Bookmarks',
      message: isNowSaved ? 'You can view this anytime from "Saved & Mine".' : 'Bookmark removed.'
    });
  };

  // Open Details Modal & Increment view count
  const handleOpenDetails = (item) => {
    storageService.incrementViews(item.id);
    setItems(storageService.getItems());
    setSelectedItem({ ...item, views: (item.views || 0) + 1 });
  };

  // Share Item Link
  const handleShareItem = (item) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?item=${item.id}`;
    navigator.clipboard.writeText(shareUrl);
    showToast({
      type: 'success',
      title: 'Link Copied!',
      message: `Shareable link for "${item.title}" copied to clipboard.`
    });
  };

  // Open Report Modal with specific preset type
  const handleOpenReportModal = (type = 'lost') => {
    setReportInitialType(type);
    setIsReportModalOpen(true);
  };

  // Reset Demo Data
  const handleResetData = () => {
    if (window.confirm('Reset all campus lost & found listings back to factory demo state?')) {
      const resetItems = storageService.resetToDefault();
      setItems(resetItems);
      setSavedIds([]);
      setMyPostIds(storageService.getMyPostIds());
      handleResetFilters();
      showToast({
        type: 'info',
        title: 'Data Reset',
        message: 'Sample campus items restored.'
      });
    }
  };

  return (
    <div className="app-root">
      {/* 1. Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenReportModal={handleOpenReportModal}
        onOpenDropOffModal={() => setIsDropOffModalOpen(true)}
        onOpenMyPostsModal={() => setIsMyPostsModalOpen(true)}
        savedCount={savedIds.length + myPostIds.length}
        onResetData={handleResetData}
      />

      {/* 2. Main Content Container */}
      <main className="main-content">
        {/* Hero Welcome Banner */}
        <section className="hero-banner">
          <div className="hero-text-content">
            <h1 className="hero-title">Campus Lost & Found Board</h1>
            <p className="hero-subtitle">
              Lost your student ID, laptop, keys, or found someone's water bottle? Report it here or browse verified listings across campus buildings.
            </p>
          </div>

          <div className="hero-cta-group">
            <button 
              className="hero-report-btn lost"
              onClick={() => handleOpenReportModal('lost')}
            >
              <AlertTriangle size={18} /> I Lost Something
            </button>
            <button 
              className="hero-report-btn found"
              onClick={() => handleOpenReportModal('found')}
            >
              <HeartHandshake size={18} /> I Found Something
            </button>
          </div>
        </section>

        {/* Dynamic Stats Ribbon */}
        <StatsRibbon
          items={items}
          currentTypeFilter={typeFilter}
          onSelectType={(type) => setTypeFilter(type)}
        />

        {/* Multi-Factor Filter & Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          locationFilter={locationFilter}
          onLocationFilterChange={setLocationFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          totalResults={filteredItems.length}
          totalCount={items.length}
        />

        {/* Item Cards Grid */}
        <ItemGrid
          items={filteredItems}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onOpenDetails={handleOpenDetails}
          onShareItem={handleShareItem}
          onOpenReportModal={handleOpenReportModal}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </main>

      {/* Modals */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          isSaved={savedIds.includes(selectedItem.id)}
          onToggleSave={handleToggleSave}
          onResolveItem={handleResolveItem}
          onShareItem={handleShareItem}
          onShowToast={showToast}
        />
      )}

      {isReportModalOpen && (
        <ReportModal
          initialType={reportInitialType}
          onClose={() => setIsReportModalOpen(false)}
          onAddItem={handleAddItem}
          onShowToast={showToast}
        />
      )}

      {isDropOffModalOpen && (
        <DropOffDesksModal
          onClose={() => setIsDropOffModalOpen(false)}
          onShowToast={showToast}
        />
      )}

      {isMyPostsModalOpen && (
        <MyPostsModal
          onClose={() => setIsMyPostsModalOpen(false)}
          allItems={items}
          myPostIds={myPostIds}
          savedIds={savedIds}
          onOpenDetails={handleOpenDetails}
          onDeleteItem={handleDeleteItem}
          onResolveItem={handleResolveItem}
          onToggleSave={handleToggleSave}
          onShowToast={showToast}
        />
      )}

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
