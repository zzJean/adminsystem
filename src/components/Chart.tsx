import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface ChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
}

const Chart: React.FC<ChartProps> = ({ title, data }) => {
  const classes = useThemeClasses();
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border} hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h3 className={`text-lg font-semibold ${classes.textPrimary}`}>{title}</h3>
        </div>
        <button className={`flex items-center space-x-1 text-sm ${classes.linkColor} font-medium transition-colors`}>
          <TrendingUp className="h-4 w-4" />
          <span>View Details</span>
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${classes.textSecondary}`}>{item.label}</span>
              <span className={`text-sm font-semibold ${classes.textPrimary}`}>{item.value.toLocaleString()}</span>
            </div>
            <div className={`w-full ${classes.cardBg === 'bg-white' ? 'bg-gray-200' : 'bg-gray-700'} rounded-full h-3`}>
              <div 
                className="h-3 rounded-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;