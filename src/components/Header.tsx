import React from 'react';
import { Bell, Search, Settings, ChevronDown, LogOut, Sun, Moon } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LogoutModal from './LogoutModal';
import NotificationDropdown from './NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';

const Header: React.FC = () => {
  const classes = useThemeClasses();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <>
      <header className={`${classes.headerBg} border-b ${classes.sidebarBorder} px-6 py-4 shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className={`text-xl font-semibold ${classes.textPrimary}`}>
              System of Document Management
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 ${classes.textMuted}`} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64 ${classes.inputPlaceholder} shadow-sm`}
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 ${classes.textMuted} ${classes.hoverBg} rounded-lg transition-colors`}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <NotificationDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            </div>

            {/* Settings */}
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 ${classes.textMuted} ${classes.hoverBg} rounded-lg transition-colors`}
              >
                <Settings className="h-5 w-5" />
              </button>
              <SettingsDropdown 
                isOpen={showSettings} 
                onClose={() => setShowSettings(false)} 
              />
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 ${classes.textMuted} ${classes.hoverBg} rounded-lg transition-colors`}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Profile */}
            <div className={`flex items-center space-x-2 pl-4 border-l ${classes.sidebarBorder}`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{user?.avatar}</span>
                </div>
                <div className="hidden md:block">
                  <p className={`text-sm font-medium ${classes.textPrimary}`}>{user?.name}</p>
                  <p className={`text-xs ${classes.textMuted}`}>{user?.role}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <ChevronDown className={`h-4 w-4 ${classes.textMuted}`} />
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className={`p-2 ${classes.textMuted} ${classes.hoverBg} rounded-lg transition-colors hover:text-red-600`}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
      />
    </>
  );
};

export default Header;