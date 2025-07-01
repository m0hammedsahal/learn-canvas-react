
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Clock, BookOpen, Users, Star } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import MobileHeader from '@/components/layout/MobileHeader';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

const Courses: React.FC = () => {
  const { courses, setSelectedCourse } = useApp();
  const navigate = useNavigate();

  const handleSelectCourse = (course: any) => {
    setSelectedCourse(course);
    navigate('/payment');
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--neuro-bg))' }}>
      <MobileHeader showBack={true} />
      
      <div className="px-4 py-6 pb-24 md:px-6 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h1 className="text-2xl md:text-5xl font-raleway font-bold text-text-primary mb-3 md:mb-4">
              Choose Your Learning Path
            </h1>
            <p className="text-base md:text-xl text-text-secondary font-poppins max-w-2xl mx-auto px-4">
              Select the exam preparation course that fits your goals.
            </p>
          </div>

          <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 max-w-4xl mx-auto">
            {courses.map((course, index) => (
              <Card
                key={course.id}
                hover
                className={`relative overflow-hidden animate-fade-in ${
                  index === 0 ? 'border-2 border-primary shadow-xl' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                padding="sm"
              >
                {index === 0 && (
                  <div className="absolute top-3 right-3 neuro-button bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                )}

                <div className="p-4 md:p-6">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="neuro-button w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mr-3 md:mr-4">
                      <GraduationCap className="text-primary" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-raleway font-bold text-text-primary mb-1">
                        {course.name}
                      </h3>
                      <p className="text-text-secondary font-poppins text-sm">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:space-y-4 md:block mb-6 md:mb-8">
                    <div className="flex items-center text-text-secondary">
                      <BookOpen size={16} className="mr-2 flex-shrink-0" />
                      <span className="font-poppins text-sm">
                        {course.subjects.length} Subjects
                      </span>
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <Clock size={16} className="mr-2 flex-shrink-0" />
                      <span className="font-poppins text-sm">
                        {course.subjects.reduce((acc, subject) => acc + subject.chapters.length, 0)} Lessons
                      </span>
                    </div>
                    <div className="flex items-center text-text-secondary col-span-2">
                      <Users size={16} className="mr-2 flex-shrink-0" />
                      <span className="font-poppins text-sm">Expert Instructors</span>
                    </div>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <div className="flex items-baseline">
                      <span className="text-2xl md:text-3xl font-raleway font-bold text-text-primary">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-text-secondary font-poppins ml-2">
                        one-time
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 md:mb-8">
                    <h4 className="font-raleway font-semibold text-text-primary text-sm">
                      Subjects:
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {course.subjects.slice(0, 3).map((subject) => (
                        <div key={subject.id} className="flex items-center text-text-secondary">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                          <span className="font-poppins text-sm">{subject.name}</span>
                        </div>
                      ))}
                      {course.subjects.length > 3 && (
                        <div className="text-text-secondary text-sm font-poppins ml-3.5">
                          +{course.subjects.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => handleSelectCourse(course)}
                  >
                    Start Learning Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 md:mt-12">
            <Card className="max-w-2xl mx-auto" padding="sm">
              <div className="p-4 md:p-6 text-center">
                <div className="neuro-button w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="text-primary" size={20} />
                </div>
                <h3 className="text-lg md:text-2xl font-raleway font-bold text-text-primary mb-2 md:mb-4">
                  Need Help Choosing?
                </h3>
                <p className="text-text-secondary font-poppins mb-4 md:mb-6 text-sm md:text-base">
                  Get free consultation to select the perfect course.
                </p>
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                  Get Free Consultation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <MobileBottomNav />
    </div>
  );
};

export default Courses;
