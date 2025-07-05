
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

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="neuro-card m-2 p-3 sticky top-2 z-40 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="neuro-button p-2 text-text-primary hover:text-primary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {showMenu && onMenuClick && (
            <button
              onClick={onMenuClick}
              className="neuro-button p-2 text-text-primary hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          )}
          <h1 className="text-lg font-raleway font-semibold text-text-primary truncate">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {location.pathname !== '/notifications' && (
            <button 
              onClick={handleNotificationClick}
              className="neuro-button p-2 text-text-primary hover:text-primary transition-colors relative"
              aria-label="View notifications"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center" aria-label="2 new notifications">
                2
              </span>
            </button>
          )}
          <button 
            onClick={handleProfileClick}
            className="neuro-button w-8 h-8 rounded-full flex items-center justify-center hover:text-primary transition-colors"
            aria-label="View profile"
          >
            <User size={16} className="text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
