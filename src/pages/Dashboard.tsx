
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, CheckCircle, BookOpen, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedCourse, setSelectedSubject, setCurrentChapter } = useApp();
  const navigate = useNavigate();

  const handleSubjectClick = (subject: any) => {
    setSelectedSubject(subject);
  };

  const handleChapterClick = (chapter: any) => {
    setCurrentChapter(chapter);
    navigate(`/video/${chapter.id}`);
  };

  // Mock data if no course selected
  const mockSubjects = [
    {
      id: 's1',
      name: 'Mathematics',
      description: 'Algebra, Geometry, and more',
      chapters: [
        { id: 'c1', title: 'Algebra Basics', duration: '45:30', completed: true },
        { id: 'c2', title: 'Geometry Fundamentals', duration: '38:15', completed: false }
      ]
    },
    {
      id: 's2',
      name: 'Science',
      description: 'Physics, Chemistry, Biology',
      chapters: [
        { id: 'c3', title: 'Chemical Reactions', duration: '42:20', completed: false },
        { id: 'c4', title: 'Newton\'s Laws', duration: '35:45', completed: false }
      ]
    }
  ];

  const subjects = selectedCourse?.subjects || mockSubjects;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Mobile Header */}
      <MobileHeader 
        onMenuClick={() => setSidebarOpen(true)}
        showMenu={true}
      />
      
      <div className="lg:ml-64">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header onMenuClick={() => setSidebarOpen(true)} />
        </div>
        
        <main className="p-4 pb-20 md:p-6 md:pb-6">
          {/* Mobile Welcome Card */}
          <Card className="mb-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white md:hidden" padding="sm">
            <div className="flex items-center">
              <div className="flex-1">
                <h2 className="text-lg font-raleway font-bold mb-1">Welcome back! 👋</h2>
                <p className="text-primary-100 font-poppins text-sm">Continue your learning journey</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
            </div>
          </Card>

          <div className="hidden md:block mb-8">
            <h1 className="text-3xl font-raleway font-bold text-text-primary mb-2">
              Your Learning Dashboard
            </h1>
            <p className="text-text-secondary font-poppins">
              Continue your learning journey and track your progress
            </p>
          </div>

          {/* Mobile-First Stats Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            <Card padding="sm" className="text-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BookOpen className="text-primary" size={16} />
              </div>
              <p className="text-text-secondary font-poppins text-xs md:text-sm">Subjects</p>
              <p className="text-lg md:text-2xl font-raleway font-bold text-text-primary">
                {subjects.length}
              </p>
            </Card>

            <Card padding="sm" className="text-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <p className="text-text-secondary font-poppins text-xs md:text-sm">Done</p>
              <p className="text-lg md:text-2xl font-raleway font-bold text-text-primary">1</p>
            </Card>

            <Card padding="sm" className="text-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="text-accent" size={16} />
              </div>
              <p className="text-text-secondary font-poppins text-xs md:text-sm">Hours</p>
              <p className="text-lg md:text-2xl font-raleway font-bold text-text-primary">45</p>
            </Card>
          </div>

          {/* Mobile-Optimized Subjects */}
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            {subjects.map((subject) => (
              <Card key={subject.id} hover className="animate-fade-in" padding="sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-raleway font-bold text-text-primary mb-1">
                      {subject.name}
                    </h3>
                    <p className="text-text-secondary font-poppins text-sm">
                      {subject.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-lg flex items-center justify-center ml-3">
                    <BookOpen className="text-primary" size={20} />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {subject.chapters.slice(0, 2).map((chapter: any) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => handleChapterClick(chapter)}
                    >
                      <div className="flex items-center flex-1">
                        <Play className="text-primary mr-2 flex-shrink-0" size={14} />
                        <div className="min-w-0 flex-1">
                          <p className="font-poppins font-medium text-text-primary text-sm truncate">
                            {chapter.title}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {chapter.duration}
                          </p>
                        </div>
                      </div>
                      {chapter.completed && (
                        <CheckCircle className="text-green-500 flex-shrink-0 ml-2" size={16} />
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => handleSubjectClick(subject)}
                >
                  View All ({subject.chapters.length})
                </Button>
              </Card>
            ))}
          </div>

          {/* Mobile Achievement Card */}
          <div className="mt-8 md:mt-12">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white" padding="sm">
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-raleway font-semibold mb-1 text-sm md:text-base">
                    Great Progress! 🎉
                  </p>
                  <p className="text-green-100 font-poppins text-xs md:text-sm">
                    You've unlocked 2 new chapters!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Dashboard;
