import { useTheme } from '../contexts/ThemeContext';

export const useThemeClasses = () => {
  const { theme } = useTheme();

  if (theme === 'dark') {
    return {
      // Main backgrounds - Dark theme siguiendo la imagen
      mainBg: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      sidebarBg: 'bg-gray-900',
      headerBg: 'bg-gray-900',
      
      // Borders - Sutiles como en la imagen
      border: 'border-gray-700',
      sidebarBorder: 'border-gray-700',
      
      // Text colors - Blancos y grises claros
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      
      // Interactive elements
      inputBg: 'bg-gray-700 border-gray-600',
      inputText: 'text-white',
      inputPlaceholder: 'placeholder-gray-400',
      
      // Hover states
      hoverBg: 'hover:bg-gray-700',
      sidebarHover: 'hover:bg-gray-800',
      
      // Table specific
      tableHeader: 'bg-gray-800',
      tableHeaderText: 'text-gray-300',
      tableRow: 'hover:bg-gray-750',
      
      // Status badges - Colores vibrantes como en la imagen
      statusActive: 'bg-green-900 text-green-500 border border-green-700',
      statusInactive: 'bg-gray-700 text-gray-300 border border-gray-600',
      statusWarning: 'bg-orange-900 text-orange-300 border border-orange-700',
      statusError: 'bg-red-900 text-red-300 border border-red-700',
      
      // Icon colors
      iconColor: 'text-black',
      linkColor: 'text-white',
      trendColor: 'text-white',
    };
  }

  // Light theme (original)
  return {
    // Main backgrounds
    mainBg: 'bg-gray-50',
    cardBg: 'bg-white',
    sidebarBg: 'bg-white',
    headerBg: 'bg-white',
    
    // Borders
    border: 'border-gray-200',
    sidebarBorder: 'border-gray-200',
    
    // Text colors
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    
    // Interactive elements
    inputBg: 'bg-white border-gray-300',
    inputText: 'text-gray-900',
    inputPlaceholder: 'placeholder-gray-500',
    
    // Hover states
    hoverBg: 'hover:bg-gray-50',
    sidebarHover: 'hover:bg-gray-100',
    
    // Table specific
    tableHeader: 'bg-gray-50',
    tableHeaderText: 'text-gray-500',
    tableRow: 'hover:bg-gray-50',
    
    // Status badges
    statusActive: 'bg-green-100 text-green-500',
    statusInactive: 'bg-gray-100 text-gray-800',
    statusWarning: 'bg-orange-100 text-orange-800',
    statusError: 'bg-red-100 text-red-800',
    
    // Icon colors
    iconColor: 'text-white',
    linkColor: 'text-blue-600',
    trendColor: 'text-green-600',
  };
};