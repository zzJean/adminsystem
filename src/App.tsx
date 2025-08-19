import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useThemeClasses } from './hooks/useThemeClasses';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Companies from './components/Companies';
import Facilities from './components/Facilities';
import Documents from './components/Documents';
import Users from './components/Users';
import Audit from './components/Audit';
import Settings from './components/Settings';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const classes = useThemeClasses();
  const [activeItem, setActiveItem] = useState('dashboard');

  // Show login screen if user is not authenticated
  if (!user) {
    return <LoginScreen />;
  }

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'companies':
        return <Companies />;
      case 'facilities':
        return <Facilities />;
      case 'documents':
        return <Documents />;
      case 'users':
        return <Users />;
      case 'audit':
        return <Audit />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`h-screen ${classes.mainBg} flex`}>
      <div className="flex-shrink-0 h-full">
        <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <div className="flex-shrink-0">
          <Header />
        </div>
        
        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;