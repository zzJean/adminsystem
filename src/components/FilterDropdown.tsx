import React, { useState, useRef, useEffect } from 'react';
import { X, Calendar, User, Search, Filter } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface FilterDropdownProps {
  type: 'text' | 'date' | 'select' | 'user';
  options?: string[];
  onFilter: (value: string) => void;
  placeholder?: string;
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  type,
  options = [],
  onFilter,
  placeholder = 'Filter...',
  isOpen,
  onClose,
  position
}) => {
  const classes = useThemeClasses();
  const [filterValue, setFilterValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleApplyFilter = () => {
    onFilter(filterValue);
    onClose();
  };

  const handleClearFilter = () => {
    setFilterValue('');
    onFilter('');
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className={`fixed z-50 ${classes.cardBg} border ${classes.border} rounded-lg shadow-lg p-4 w-64`}
      style={{
        top: position.top + 10,
        left: Math.max(10, position.left - 128), // Center the dropdown and ensure it doesn't go off-screen
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className={`text-sm font-medium ${classes.textPrimary}`}>Filter</h4>
        <button
          onClick={onClose}
          className={`p-1 ${classes.hoverBg} rounded transition-colors`}
        >
          <X className={`h-4 w-4 ${classes.textMuted}`} />
        </button>
      </div>

      <div className="space-y-3">
        {type === 'text' && (
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${classes.textMuted}`} />
            <input
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder={placeholder}
              className={`w-full pl-10 pr-3 py-2 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${classes.inputPlaceholder}`}
            />
          </div>
        )}

        {type === 'date' && (
          <div className="relative">
            <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${classes.textMuted}`} />
            <input
              type="date"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm`}
            />
          </div>
        )}

        {type === 'user' && (
          <div className="relative">
            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${classes.textMuted}`} />
            <input
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Enter user name..."
              className={`w-full pl-10 pr-3 py-2 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${classes.inputPlaceholder}`}
            />
          </div>
        )}

        {type === 'select' && (
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className={`w-full px-3 py-2 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm`}
          >
            <option value="">All</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        <div className="flex space-x-2 pt-2">
          <button
            onClick={handleApplyFilter}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Apply
          </button>
          <button
            onClick={handleClearFilter}
            className={`flex-1 ${classes.hoverBg} ${classes.textSecondary} py-2 px-3 rounded-lg transition-colors text-sm font-medium border ${classes.border}`}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;