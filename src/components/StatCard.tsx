import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  activeCount: number;
  inactiveCount?: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  activeCount, 
  inactiveCount = 0,
  color,
  trend
}) => {
  const classes = useThemeClasses();
  const colorClasses = {
    blue: {
      bg: 'bg-blue-600',
      icon: 'text-white',
      progress: 'bg-blue-500'
    },
    green: {
      bg: 'bg-green-500',
      icon: 'text-white',
      progress: 'bg-green-500'
    },
    purple: {
      bg: 'bg-purple-600',
      icon: 'text-white',
      progress: 'bg-purple-500'
    },
    orange: {
      bg: 'bg-orange-600',
      icon: 'text-white',
      progress: 'bg-orange-500'
    }
  };

  const total = activeCount + inactiveCount;
  const activePercentage = total > 0 ? (activeCount / total) * 100 : 0;

  return (
    <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border} hover:shadow-md transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color].bg}`}>
          <Icon className={`h-6 w-6 ${colorClasses[color].icon}`} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            trend.isPositive ? (classes.cardBg === 'bg-white' ? 'text-black' : 'text-white') : 'text-red-600'
          }`}>
            <span className="text-lg font-bold">{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <h3 className={`text-2xl font-bold ${classes.textPrimary}`}>{value}</h3>
        <p className={`text-sm ${classes.textSecondary} font-medium`}>{title}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className={classes.textMuted}>Active: {activeCount}</span>
          {inactiveCount > 0 && (
            <span className={classes.textMuted}>Inactive: {inactiveCount}</span>
          )}
        </div>
        
        <div className={`w-full ${classes.cardBg === 'bg-white' ? 'bg-gray-200' : 'bg-gray-700'} rounded-full h-2`}>
          <div 
            className={`h-2 rounded-full ${colorClasses[color].progress} transition-all duration-500`}
            style={{ width: `${activePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;