
import React from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '../common/Button';

interface HeaderProps {
  onMenuClick: () => void;
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenu = true }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <Menu size={24} />
            </button>
          )}
          <h1 className="text-xl font-raleway font-semibold text-text-primary hidden sm:block">
            Welcome back, {user?.name || 'User'}!
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-text-secondary">
            <User size={20} />
            <span className="hidden sm:inline font-poppins">{user?.email}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="flex items-center space-x-2"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
