import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, AlertCircle, CheckCircle, Info, Clock } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const classes = useThemeClasses();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: '1',
      type: 'warning',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will begin at 2:00 AM EST',
      time: '5 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: 'Document Approved',
      message: 'Safety Protocol Manual 2024 has been approved',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'New User Registration',
      message: 'John Doe has registered for facility access',
      time: '2 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'Capacity Alert',
      message: 'Manufacturing Plant A is at 95% capacity',
      time: '3 hours ago',
      read: true
    }
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-12 w-80 ${classes.cardBg} border ${classes.border} rounded-lg shadow-lg z-50`}
    >
      {/* Header */}
      <div className={`px-4 py-3 border-b ${classes.border}`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${classes.textPrimary}`}>Notifications</h3>
          <button
            onClick={onClose}
            className={`p-1 ${classes.hoverBg} rounded transition-colors`}
          >
            <X className={`h-4 w-4 ${classes.textMuted}`} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 border-b ${classes.border} last:border-b-0 ${classes.hoverBg} transition-colors ${
              !notification.read ? (classes.cardBg === 'bg-white' ? 'bg-blue-50' : 'bg-blue-900/20') : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${classes.textPrimary} truncate`}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                  )}
                </div>
                <p className={`text-sm ${classes.textMuted} mt-1`}>
                  {notification.message}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  <Clock className={`h-3 w-3 ${classes.textMuted}`} />
                  <span className={`text-xs ${classes.textMuted}`}>{notification.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`px-4 py-3 border-t ${classes.border}`}>
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;