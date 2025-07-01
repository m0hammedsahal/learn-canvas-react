
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, CheckCircle, BookOpen, TrendingUp, Youtube, Eye } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import YouTubeVideoCard from '@/components/video/YouTubeVideoCard';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedCourse, setSelectedSubject, setCurrentChapter } = useApp();
  const navigate = useNavigate();
  const [showAllVideos, setShowAllVideos] = useState<Record<string, boolean>>({});

  const handleSubjectClick = (subject: any) => {
    setSelectedSubject(subject);
  };

  const handleChapterClick = (chapter: any) => {
    setCurrentChapter(chapter);
    navigate(`/video/${chapter.id}`);
  };

  const toggleShowAll = (subjectId: string) => {
    setShowAllVideos(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  // Mock data with YouTube links
  const mockSubjects = [
    {
      id: 's1',
      name: 'Mathematics',
      description: 'Algebra, Geometry, and more',
      chapters: [
        { 
          id: 'c1', 
          title: 'Algebra Basics', 
          duration: '45:30', 
          completed: true,
          youtubeUrl: 'https://youtube.com/watch?v=example1',
          thumbnail: '/api/placeholder/320/180',
          views: '1.2K'
        },
        { 
          id: 'c2', 
          title: 'Geometry Fundamentals', 
          duration: '38:15', 
          completed: false,
          youtubeUrl: 'https://youtube.com/watch?v=example2',
          thumbnail: '/api/placeholder/320/180',
          views: '856'
        },
        { 
          id: 'c3', 
          title: 'Trigonometry Basics', 
          duration: '42:20', 
          completed: false,
          youtubeUrl: 'https://youtube.com/watch?v=example3',
          thumbnail: '/api/placeholder/320/180',
          views: '695'
        }
      ]
    },
    {
      id: 's2',
      name: 'Science',
      description: 'Physics, Chemistry, Biology',
      chapters: [
        { 
          id: 'c4', 
          title: 'Chemical Reactions', 
          duration: '42:20', 
          completed: false,
          youtubeUrl: 'https://youtube.com/watch?v=example4',
          thumbnail: '/api/placeholder/320/180',
          views: '1.8K'
        },
        { 
          id: 'c5', 
          title: 'Newton\'s Laws', 
          duration: '35:45', 
          completed: false,
          youtubeUrl: 'https://youtube.com/watch?v=example5',
          thumbnail: '/api/placeholder/320/180',
          views: '2.1K'
        }
      ]
    }
  ];

  const subjects = selectedCourse?.subjects || mockSubjects;

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--neuro-bg))' }}>
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
        
        <main className="p-4 pb-24 md:p-6 md:pb-6">
          {/* Mobile Welcome Card */}
          <Card className="mb-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white md:hidden" padding="sm">
            <div className="flex items-center">
              <div className="flex-1">
                <h2 className="text-lg font-raleway font-bold mb-1">Welcome back! 👋</h2>
                <p className="text-primary-100 font-poppins text-sm">Continue your learning journey</p>
              </div>
              <div className="neuro-button w-16 h-16 flex items-center justify-center">
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

          {/* Stats Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            <Card padding="sm" className="text-center">
              <div className="neuro-button w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="text-primary" size={16} />
              </div>
              <p className="text-text-secondary font-poppins text-xs md:text-sm">Subjects</p>
              <p className="text-lg md:text-2xl font-raleway font-bold text-text-primary">
                {subjects.length}
              </p>
            </Card>

            <Card padding="sm" className="text-center">
              <div className="neuro-button w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-green-600">
                <CheckCircle size={16} />
              </div>
              <p className="text-text-secondary font-poppins text-xs md:text-sm">Done</p>
              <p className="text-lg md:text-2xl font-raleway font-bold text-text-primary">1</p>
            </Card>

            <Card padding="sm" className="text-center">
              <div className="neuro-button w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-accent">
                <Clock size={16} />
              </div>
              <p className="text-text-secondary font-poppins text-xs md:text-sm">Hours</p>
              <p className="text-lg md:text-2xl font-raleway font-bold text-text-primary">45</p>
            </Card>
          </div>

          {/* Subjects with YouTube Videos */}
          <div className="space-y-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="animate-fade-in" padding="sm">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-raleway font-bold text-text-primary mb-1">
                      {subject.name}
                    </h3>
                    <p className="text-text-secondary font-poppins text-sm">
                      {subject.description}
                    </p>
                  </div>
                  <div className="neuro-button w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ml-3">
                    <BookOpen className="text-primary" size={20} />
                  </div>
                </div>

                {/* YouTube Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {subject.chapters
                    .slice(0, showAllVideos[subject.id] ? undefined : 2)
                    .map((chapter: any) => (
                      <YouTubeVideoCard
                        key={chapter.id}
                        video={chapter}
                        onClick={() => handleChapterClick(chapter)}
                      />
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={() => toggleShowAll(subject.id)}
                    variant="neuro"
                    size="sm"
                  >
                    {showAllVideos[subject.id] 
                      ? 'Show Less' 
                      : `View All (${subject.chapters.length})`
                    }
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Achievement Card */}
          <div className="mt-8 md:mt-12">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white" padding="sm">
              <div className="flex items-center">
                <div className="neuro-button w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 bg-white/20">
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
      
      <MobileBottomNav />
    </div>
  );
};

export default Dashboard;
