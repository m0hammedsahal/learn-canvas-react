
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
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
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-raleway font-bold text-text-primary mb-2">
              Your Learning Dashboard
            </h1>
            <p className="text-text-secondary font-poppins">
              Continue your learning journey and track your progress
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-text-secondary font-poppins text-sm">Total Subjects</p>
                  <p className="text-2xl font-raleway font-bold text-text-primary">
                    {subjects.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-text-secondary font-poppins text-sm">Completed</p>
                  <p className="text-2xl font-raleway font-bold text-text-primary">
                    1
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-text-secondary font-poppins text-sm">Study Time</p>
                  <p className="text-2xl font-raleway font-bold text-text-primary">
                    45h
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Subjects Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.id} hover className="animate-fade-in">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-raleway font-bold text-text-primary">
                        {subject.name}
                      </h3>
                      <p className="text-text-secondary font-poppins">
                        {subject.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-primary" size={24} />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {subject.chapters.slice(0, 3).map((chapter: any) => (
                      <div
                        key={chapter.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleChapterClick(chapter)}
                      >
                        <div className="flex items-center">
                          <Play className="text-primary mr-3" size={16} />
                          <div>
                            <p className="font-poppins font-medium text-text-primary">
                              {chapter.title}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {chapter.duration}
                            </p>
                          </div>
                        </div>
                        {chapter.completed && (
                          <CheckCircle className="text-green-500" size={20} />
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleSubjectClick(subject)}
                  >
                    View All Chapters ({subject.chapters.length})
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Mobile Notification Mockup */}
          <div className="mt-12">
            <Card className="max-w-md mx-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <div className="p-6 flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="font-raleway font-semibold mb-1">
                    Great Progress! 🎉
                  </p>
                  <p className="text-primary-100 font-poppins text-sm">
                    You've unlocked 2 new chapters in Science!
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

export default Dashboard;
