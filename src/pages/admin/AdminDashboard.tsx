
import React, { useState } from 'react';
import { Users, BookOpen, PlayCircle, TrendingUp, Eye, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Card from '@/components/common/Card';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Active Subjects',
      value: '24',
      change: '+3',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Total Chapters',
      value: '156',
      change: '+8',
      icon: PlayCircle,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Monthly Revenue',
      value: '₹1,24,567',
      change: '+18%',
      icon: TrendingUp,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Completed Chapter 5 - Algebra', time: '2 hours ago' },
    { user: 'Sarah Smith', action: 'Enrolled in USS Exam course', time: '4 hours ago' },
    { user: 'Mike Johnson', action: 'Started Mathematics subject', time: '6 hours ago' },
    { user: 'Emma Wilson', action: 'Completed payment for LSS course', time: '8 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isAdmin={true}
      />
      
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-raleway font-bold text-text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary font-poppins">
              Monitor and manage the EduLearning platform
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary font-poppins text-sm mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-raleway font-bold text-text-primary">
                      {stat.value}
                    </p>
                    <p className="text-green-600 font-poppins text-sm">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card className="animate-fade-in">
              <div className="p-6">
                <h3 className="text-xl font-raleway font-bold text-text-primary mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-poppins font-medium text-text-primary">
                          {activity.user}
                        </p>
                        <p className="text-text-secondary font-poppins text-sm">
                          {activity.action}
                        </p>
                        <p className="text-text-secondary font-poppins text-xs">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-fade-in">
              <div className="p-6">
                <h3 className="text-xl font-raleway font-bold text-text-primary mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-left">
                    <BookOpen className="text-primary mb-2" size={24} />
                    <p className="font-poppins font-medium text-text-primary">Add Subject</p>
                    <p className="text-text-secondary font-poppins text-sm">Create new subject</p>
                  </button>
                  
                  <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                    <PlayCircle className="text-green-600 mb-2" size={24} />
                    <p className="font-poppins font-medium text-text-primary">Upload Video</p>
                    <p className="text-text-secondary font-poppins text-sm">Add new chapter</p>
                  </button>
                  
                  <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
                    <Eye className="text-blue-600 mb-2" size={24} />
                    <p className="font-poppins font-medium text-text-primary">View Users</p>
                    <p className="text-text-secondary font-poppins text-sm">Manage students</p>
                  </button>
                  
                  <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-left">
                    <Download className="text-yellow-600 mb-2" size={24} />
                    <p className="font-poppins font-medium text-text-primary">Export Data</p>
                    <p className="text-text-secondary font-poppins text-sm">Download reports</p>
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="mt-8">
            <Card className="animate-fade-in">
              <div className="p-6">
                <h3 className="text-xl font-raleway font-bold text-text-primary mb-6">
                  User Engagement Overview
                </h3>
                <div className="h-64 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                  <p className="text-text-secondary font-poppins">
                    Chart visualization would be implemented here using Recharts
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
