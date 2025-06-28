
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Clock, BookOpen, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/layout/Header';

const Courses: React.FC = () => {
  const { courses, setSelectedCourse } = useApp();
  const navigate = useNavigate();

  const handleSelectCourse = (course: any) => {
    setSelectedCourse(course);
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <Header onMenuClick={() => {}} showMenu={false} />
      
      <div className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-raleway font-bold text-text-primary mb-4">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-text-secondary font-poppins max-w-2xl mx-auto">
              Select the exam preparation course that fits your academic goals and get started on your success journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {courses.map((course, index) => (
              <Card
                key={course.id}
                hover
                className={`relative overflow-hidden animate-fade-in ${
                  index === 0 ? 'border-2 border-primary shadow-xl' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                      <GraduationCap className="text-primary" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-raleway font-bold text-text-primary">
                        {course.name}
                      </h3>
                      <p className="text-text-secondary font-poppins">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-text-secondary">
                      <BookOpen size={20} className="mr-3" />
                      <span className="font-poppins">
                        {course.subjects.length} Comprehensive Subjects
                      </span>
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <Clock size={20} className="mr-3" />
                      <span className="font-poppins">
                        {course.subjects.reduce((acc, subject) => acc + subject.chapters.length, 0)} Video Lessons
                      </span>
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <Users size={20} className="mr-3" />
                      <span className="font-poppins">Expert Instructors</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-raleway font-bold text-text-primary mb-2">
                      ₹{course.price.toLocaleString()}
                      <span className="text-lg text-text-secondary font-poppins ml-2">
                        one-time payment
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <h4 className="font-raleway font-semibold text-text-primary">
                      Subjects Included:
                    </h4>
                    {course.subjects.map((subject) => (
                      <div key={subject.id} className="flex items-center text-text-secondary">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="font-poppins">{subject.name}</span>
                      </div>
                    ))}
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

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto">
              <div className="p-8">
                <h3 className="text-2xl font-raleway font-bold text-text-primary mb-4">
                  Not sure which course to choose?
                </h3>
                <p className="text-text-secondary font-poppins mb-6">
                  Our learning advisors are here to help you select the perfect course based on your academic level and goals.
                </p>
                <Button variant="outline" size="lg">
                  Get Free Consultation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
