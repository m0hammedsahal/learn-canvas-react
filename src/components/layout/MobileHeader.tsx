
import React from 'react';
import { ArrowLeft, Menu, User, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileHeaderProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
  showBack?: boolean;
  title?: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  onMenuClick, 
  showMenu = false, 
  showBack = false,
  title 
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/courses':
        return 'Choose Course';
      case '/profile':
        return 'Profile';
      case '/settings':
        return 'Settings';
      case '/notifications':
        return 'Notifications';
      default:
        return 'EduLearning';
    }
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-4 py-3 sticky top-0 z-40 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          {showMenu && onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
          )}
          <h1 className="text-lg font-raleway font-semibold text-text-primary">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {location.pathname !== '/notifications' && (
            <button 
              onClick={handleNotificationClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>
          )}
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
