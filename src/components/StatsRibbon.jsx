import React from 'react';
import { Search, AlertTriangle, CheckCircle, Award, ArrowUpRight } from 'lucide-react';

export const StatsRibbon = ({ items, currentTypeFilter, onSelectType }) => {
  const totalReports = items.length;
  const lostCount = items.filter((i) => i.type === 'lost' && i.status === 'active').length;
  const foundCount = items.filter((i) => i.type === 'found' && i.status === 'active').length;
  const resolvedCount = items.filter((i) => i.status === 'resolved').length;
  const recoveryRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0;

  return (
    <section className="stats-ribbon-section">
      <div className="stats-grid">
        {/* Card 1: Total Reports */}
        <div 
          className={`stat-card ${currentTypeFilter === 'all' ? 'active-stat' : ''}`}
          onClick={() => onSelectType('all')}
        >
          <div className="stat-icon-box total">
            <Search size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{totalReports}</span>
            <span className="stat-label">Total Listings</span>
          </div>
          <ArrowUpRight size={14} className="stat-arrow" />
        </div>

        {/* Card 2: Active Lost */}
        <div 
          className={`stat-card lost ${currentTypeFilter === 'lost' ? 'active-stat' : ''}`}
          onClick={() => onSelectType('lost')}
        >
          <div className="stat-icon-box lost">
            <AlertTriangle size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-row">
              <span className="stat-number">{lostCount}</span>
              <span className="stat-pill lost">Seeking</span>
            </div>
            <span className="stat-label">Active Lost Items</span>
          </div>
          <ArrowUpRight size={14} className="stat-arrow" />
        </div>

        {/* Card 3: Active Found */}
        <div 
          className={`stat-card found ${currentTypeFilter === 'found' ? 'active-stat' : ''}`}
          onClick={() => onSelectType('found')}
        >
          <div className="stat-icon-box found">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-row">
              <span className="stat-number">{foundCount}</span>
              <span className="stat-pill found">Safeguarded</span>
            </div>
            <span className="stat-label">Found Awaiting Claim</span>
          </div>
          <ArrowUpRight size={14} className="stat-arrow" />
        </div>

        {/* Card 4: Reunited Rate */}
        <div 
          className={`stat-card resolved ${currentTypeFilter === 'resolved' ? 'active-stat' : ''}`}
          onClick={() => onSelectType('resolved')}
        >
          <div className="stat-icon-box resolved">
            <Award size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-row">
              <span className="stat-number">{resolvedCount}</span>
              <span className="stat-pill resolved">{recoveryRate}% Reunited</span>
            </div>
            <span className="stat-label">Items Returned</span>
          </div>
          <ArrowUpRight size={14} className="stat-arrow" />
        </div>
      </div>
    </section>
  );
};
