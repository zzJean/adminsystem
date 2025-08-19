import React from 'react';
import { Clock, MoreVertical } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  status?: string;
  type?: string;
}

interface RecentListProps {
  title: string;
  items: ListItem[];
  icon: React.ReactNode;
}

const RecentList: React.FC<RecentListProps> = ({ title, items, icon }) => {
  const classes = useThemeClasses();
  
  return (
    <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border} hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <div className="text-white [&>svg]:text-white">{icon}</div>
          </div>
          <h3 className={`text-lg font-semibold ${classes.textPrimary}`}>{title}</h3>
        </div>
        <button className={`text-sm ${classes.linkColor} font-medium transition-colors`}>
          View all
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className={`flex items-center justify-between p-3 ${classes.hoverBg} rounded-lg transition-colors duration-200 group border ${classes.border}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${classes.textPrimary} truncate`}>{item.title}</p>
                  <p className={`text-xs ${classes.textMuted} truncate`}>{item.subtitle}</p>
                </div>
                {item.status && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    item.status === 'active' 
                      ? classes.statusActive
                      : classes.statusInactive
                  }`}>
                    {item.status}
                  </span>
                )}
                {item.type && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${classes.cardBg === 'bg-white' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-blue-900 text-blue-300 border-blue-700'}`}>
                    {item.type}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <Clock className={`h-3 w-3 ${classes.textMuted}`} />
                <span className={`text-xs ${classes.textMuted}`}>{item.timestamp}</span>
              </div>
            </div>
            
            <button className={`opacity-0 group-hover:opacity-100 p-1 ${classes.hoverBg} rounded transition-all duration-200`}>
              <MoreVertical className={`h-4 w-4 ${classes.textMuted}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentList;