import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

interface AudienceSelectorPersistenceProps {
  className?: string;
  onAudienceChange?: (audience: 'worker' | 'business' | 'investor') => void;
  compact?: boolean;
}

const AudienceSelectorPersistence = ({ 
  className = '',
  onAudienceChange,
  compact = false
}: AudienceSelectorPersistenceProps) => {
  const [selectedAudience, setSelectedAudience] = useState<'worker' | 'business' | 'investor'>('worker');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const audienceOptions = [
    {
      value: 'worker' as const,
      label: 'Worker',
      shortLabel: 'W',
      icon: 'Users',
      description: 'Earn money completing tasks',
      color: 'text-success'
    },
    {
      value: 'business' as const,
      label: 'Business',
      shortLabel: 'B',
      icon: 'Building2',
      description: 'Find reliable talent',
      color: 'text-secondary'
    },
    {
      value: 'investor' as const,
      label: 'Investor',
      shortLabel: 'I',
      icon: 'TrendingUp',
      description: 'Invest in the platform',
      color: 'text-warning'
    }
  ];

  const currentAudience = audienceOptions.find(option => option.value === selectedAudience);

  useEffect(() => {
    // Load saved audience preference from localStorage
    const savedAudience = localStorage.getItem('selectedAudience') as 'worker' | 'business' | 'investor' | null;
    if (savedAudience && audienceOptions.some(option => option.value === savedAudience)) {
      setSelectedAudience(savedAudience);
      onAudienceChange?.(savedAudience);
    }
  }, [onAudienceChange]);

  useEffect(() => {
    // Listen for audience changes from other components
    const handleAudienceChange = (event: CustomEvent) => {
      const { audience } = event.detail;
      if (audience !== selectedAudience) {
        setSelectedAudience(audience);
      }
    };

    window.addEventListener('audienceChanged', handleAudienceChange as EventListener);
    return () => window.removeEventListener('audienceChanged', handleAudienceChange as EventListener);
  }, [selectedAudience]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAudienceSelect = (audience: 'worker' | 'business' | 'investor') => {
    setSelectedAudience(audience);
    localStorage.setItem('selectedAudience', audience);
    setIsDropdownOpen(false);
    
    // Notify other components
    onAudienceChange?.(audience);
    const event = new CustomEvent('audienceChanged', { detail: { audience } });
    window.dispatchEvent(event);
  };

  if (compact) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* Compact Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-muted hover:bg-accent border border-border rounded-lg px-3 py-2 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ${currentAudience?.color}`}>
            <span className="text-white text-xs font-heading-bold">
              {currentAudience?.shortLabel}
            </span>
          </div>
          <Icon name="ChevronDown" size={16} className="text-text-secondary" />
        </button>

        {/* Compact Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-card-hover z-50">
            <div className="p-2">
              {audienceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAudienceSelect(option.value)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth ${
                    selectedAudience === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-popover-foreground'
                  }`}
                >
                  <Icon name={option.icon} size={16} className={selectedAudience === option.value ? 'text-primary-foreground' : option.color} />
                  <div className="flex-1">
                    <div className="font-body-medium text-sm">{option.label}</div>
                    <div className={`text-xs ${selectedAudience === option.value ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                      {option.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Full Selector Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 bg-card border border-border rounded-lg px-4 py-3 hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
      >
        <Icon name={currentAudience?.icon || 'Users'} size={20} className={currentAudience?.color} />
        <div className="flex-1 text-left">
          <div className="font-body-medium text-sm text-foreground">
            {currentAudience?.label}
          </div>
          <div className="text-xs text-text-secondary">
            {currentAudience?.description}
          </div>
        </div>
        <Icon name="ChevronDown" size={16} className="text-text-secondary" />
      </button>

      {/* Full Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-card-hover z-50">
          <div className="p-2">
            <div className="text-xs font-body-medium text-text-secondary uppercase tracking-wide px-3 py-2">
              Select Your Role
            </div>
            {audienceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAudienceSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth ${
                  selectedAudience === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-popover-foreground'
                }`}
              >
                <Icon name={option.icon} size={20} className={selectedAudience === option.value ? 'text-primary-foreground' : option.color} />
                <div className="flex-1">
                  <div className="font-body-medium text-sm">{option.label}</div>
                  <div className={`text-xs ${selectedAudience === option.value ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                    {option.description}
                  </div>
                </div>
                {selectedAudience === option.value && (
                  <Icon name="Check" size={16} className="text-primary-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudienceSelectorPersistence;