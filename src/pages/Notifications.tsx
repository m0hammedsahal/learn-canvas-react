
import React from 'react';
import { Bell, BookOpen, Trophy, Clock, CheckCircle } from 'lucide-react';
import MobileHeader from '@/components/layout/MobileHeader';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Card from '@/components/common/Card';

const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'course',
      icon: BookOpen,
      title: 'New Chapter Available',
      message: 'Advanced Mathematics - Calculus Introduction is now available',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      icon: Trophy,
      title: 'Achievement Unlocked!',
      message: 'You completed 5 chapters this week. Great progress!',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      icon: Clock,
      title: 'Study Reminder',
      message: 'Don\'t forget to continue your Chemistry lessons',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      type: 'course',
      icon: CheckCircle,
      title: 'Chapter Completed',
      message: 'You successfully completed "Algebra Basics"',
      time: '3 days ago',
      read: true
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'course': return 'text-blue-600 bg-blue-100';
      case 'achievement': return 'text-yellow-600 bg-yellow-100';
      case 'reminder': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader showBack={true} title="Notifications" />
      
      <div className="px-4 py-6 pb-20">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              padding="sm" 
              className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
            >
              <div className="flex items-start space-x-3 p-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                  <notification.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-poppins font-semibold text-text-primary text-sm">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  <p className="text-text-secondary font-poppins text-sm leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-xs text-text-secondary font-poppins mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-text-secondary font-poppins">
              No notifications yet
            </p>
          </div>
        )}
      </div>
      
      <MobileBottomNav />
    </div>
  );
};

export default Notifications;
