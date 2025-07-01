
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileBottomNav: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Home' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40 md:hidden">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors min-w-0',
                isActive
                  ? 'text-primary bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700'
              )
            }
          >
            <item.icon size={20} />
            <span className="text-xs font-poppins truncate">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
