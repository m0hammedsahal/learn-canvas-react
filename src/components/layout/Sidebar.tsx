
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Book, Users, PlayCircle, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isAdmin = false }) => {
  const userNavItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/profile', icon: Settings, label: 'Profile' }
  ];

  const adminNavItems = [
    { to: '/admin', icon: Home, label: 'Dashboard' },
    { to: '/admin/subjects', icon: Book, label: 'Subjects' },
    { to: '/admin/chapters', icon: PlayCircle, label: 'Chapters' },
    { to: '/admin/users', icon: Users, label: 'Users' }
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b lg:justify-center">
          <h2 className="text-xl font-raleway font-bold text-primary">
            {isAdmin ? 'Admin Panel' : 'EduLearning'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-poppins',
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-text-secondary hover:bg-primary-50 hover:text-primary'
                )
              }
              onClick={() => window.innerWidth < 1024 && onClose()}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
