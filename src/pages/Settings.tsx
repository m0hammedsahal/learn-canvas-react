
import React, { useState } from 'react';
import { Bell, Shield, Palette, Globe, HelpCircle, LogOut, ChevronRight, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/layout/MobileHeader';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          value: notifications,
          type: 'toggle',
          action: () => setNotifications(!notifications)
        },
        {
          icon: isDarkMode ? Moon : Sun,
          label: 'Dark Mode',
          value: isDarkMode,
          type: 'toggle',
          action: toggleTheme
        },
        {
          icon: Globe,
          label: 'Language',
          value: 'English',
          type: 'navigate'
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: Shield,
          label: 'Privacy & Security',
          type: 'navigate'
        },
        {
          icon: HelpCircle,
          label: 'Help & Support',
          type: 'navigate'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--neuro-bg))' }}>
      <MobileHeader showBack={true} title="Settings" />
      
      <div className="px-4 py-6 pb-20">
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-lg font-raleway font-semibold text-text-primary mb-3 px-2">
                {section.title}
              </h2>
              <Card padding="sm">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <item.icon className="text-primary" size={16} />
                        </div>
                        <span className="font-poppins text-text-primary">{item.label}</span>
                      </div>
                      
                      {item.type === 'toggle' && (
                        <button
                          onClick={item.action}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            item.value ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            item.value ? 'translate-x-7' : 'translate-x-0.5'
                          }`} />
                        </button>
                      )}
                      
                      {item.type === 'navigate' && (
                        <div className="flex items-center space-x-2">
                          {item.value && (
                            <span className="text-text-secondary font-poppins text-sm">
                              {item.value}
                            </span>
                          )}
                          <ChevronRight className="text-text-secondary" size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}

          {/* Logout Section */}
          <Card padding="sm">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-3" />
              Sign Out
            </Button>
          </Card>

          {/* App Info */}
          <div className="text-center py-4">
            <p className="text-text-secondary font-poppins text-sm">
              EduLearning v1.0.0
            </p>
            <p className="text-text-secondary font-poppins text-xs mt-1">
              © 2024 EduLearning. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      
      <MobileBottomNav />
    </div>
  );
};

export default Settings;
