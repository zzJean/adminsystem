import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Factory, 
  FileText, 
  Users, 
  ClipboardList, 
  Settings
} from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import LogoIcon from './LogoIcon';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const classes = useThemeClasses();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'facilities', label: 'Facilities', icon: Factory },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'audit', label: 'Audit Log', icon: ClipboardList },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`w-64 ${classes.sidebarBg} border-r ${classes.sidebarBorder} h-full flex flex-col shadow-sm`}>
      {/* Logo */}
      <div className={`p-6 border-b ${classes.sidebarBorder}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <LogoIcon className="w-6 h-6" fill="white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${classes.textPrimary}`}>PlantTALK AI</h1>
            <p className={`text-xs ${classes.textMuted}`}>Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]'
                      : `${classes.textSecondary} ${classes.sidebarHover} hover:shadow-sm`
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t ${classes.sidebarBorder}`}>
        <div className={`text-xs ${classes.textMuted} text-center`}>
          <p>© 2024 PlantTALK</p>
          <p>Version 2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;