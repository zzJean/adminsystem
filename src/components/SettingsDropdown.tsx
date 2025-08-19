import React, { useState, useRef, useEffect } from 'react';
import { Settings, X, User, Shield, Bell, Database, Globe, HelpCircle } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface SettingsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({ isOpen, onClose }) => {
  const classes = useThemeClasses();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const settingsOptions = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-12 w-64 ${classes.cardBg} border ${classes.border} rounded-lg shadow-lg z-50`}
    >
      {/* Header */}
      <div className={`px-4 py-3 border-b ${classes.border}`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${classes.textPrimary}`}>Settings</h3>
          <button
            onClick={onClose}
            className={`p-1 ${classes.hoverBg} rounded transition-colors`}
          >
            <X className={`h-4 w-4 ${classes.textMuted}`} />
          </button>
        </div>
      </div>

      {/* Settings Options */}
      <div className="py-2">
        {settingsOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              className={`w-full flex items-center space-x-3 px-4 py-3 ${classes.hoverBg} transition-colors text-left`}
              onClick={() => {
                console.log(`Navigate to ${option.label}`);
                onClose();
              }}
            >
              <Icon className={`h-5 w-5 ${classes.textMuted}`} />
              <span className={`text-sm ${classes.textPrimary}`}>{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className={`px-4 py-3 border-t ${classes.border}`}>
        <div className={`text-xs ${classes.textMuted} text-center`}>
          <p>PlantTALK AI v2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsDropdown;