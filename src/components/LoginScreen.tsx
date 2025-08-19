import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useThemeClasses } from '../hooks/useThemeClasses';
import LogoIcon from './LogoIcon';

const LoginScreen: React.FC = () => {
  const { login, isLoading } = useAuth();
  const classes = useThemeClasses();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={`min-h-screen ${classes.mainBg} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <LogoIcon className="w-8 h-8" fill="white" />
            </div>
          </div>
          <h2 className={`mt-6 text-3xl font-bold ${classes.textPrimary}`}>
            Welcome to PlantTALK AI
          </h2>
          <p className={`mt-2 text-sm ${classes.textSecondary}`}>
            Sign in to your admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className={`${classes.cardBg} py-8 px-6 shadow-lg rounded-xl border ${classes.border}`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className={`${classes.cardBg === 'bg-white' ? 'bg-red-50 border-red-200' : 'bg-red-900 border-red-700'} border rounded-lg p-4 flex items-center space-x-2`}>
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className={`text-sm ${classes.cardBg === 'bg-white' ? 'text-red-700' : 'text-red-300'}`}>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${classes.textSecondary} mb-2`}>
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${classes.textMuted}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${classes.inputPlaceholder}`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${classes.textSecondary} mb-2`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${classes.textMuted}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-3 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${classes.inputPlaceholder}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${classes.textMuted} hover:${classes.textSecondary}`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${classes.textMuted} hover:${classes.textSecondary}`} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className={`mt-6 p-4 ${classes.cardBg === 'bg-white' ? 'bg-blue-50 border-blue-200' : 'bg-blue-900 border-blue-700'} border rounded-lg`}>
            <h4 className={`text-sm font-medium ${classes.cardBg === 'bg-white' ? 'text-blue-900' : 'text-blue-300'} mb-2`}>Demo Credentials:</h4>
            <div className={`text-sm ${classes.cardBg === 'bg-white' ? 'text-blue-700' : 'text-blue-400'} space-y-1`}>
              <p><strong>Email:</strong> admin@planttalk.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className={`text-xs ${classes.textMuted}`}>
            © 2024 PlantTALK AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;