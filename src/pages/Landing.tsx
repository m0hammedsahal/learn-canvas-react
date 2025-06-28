
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen, Users, Trophy, Star, Play } from 'lucide-react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Mobile-First Navigation */}
      <nav className="px-4 py-3 bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-primary" size={28} />
            <h1 className="text-xl font-raleway font-bold text-primary">EduLearning</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Hero Section */}
      <section className="px-4 py-8 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-6xl font-raleway font-bold text-text-primary leading-tight">
              Master Your
              <span className="text-primary block">Exams Today</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary font-poppins leading-relaxed px-4">
              Comprehensive preparation for LSS and USS examinations with expert-curated content.
            </p>
            
            {/* Mobile-optimized CTA buttons */}
            <div className="flex flex-col space-y-3 px-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-center">
              <Link to="/login" className="w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary-600">
                  <Play className="mr-2" size={18} />
                  Start Learning
                </Button>
              </Link>
              <Link to="/courses" className="w-full md:w-auto">
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Hero Image */}
          <div className="mt-8 md:mt-12 animate-fade-in">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 md:p-8 shadow-2xl mx-4 md:mx-0">
              <img
                src="/api/placeholder/400/250"
                alt="Students studying together"
                className="w-full h-48 md:h-80 object-cover rounded-xl opacity-90"
              />
              <div className="mt-4 flex items-center justify-center space-x-4 text-white">
                <div className="flex items-center space-x-1">
                  <Star className="fill-current" size={16} />
                  <span className="text-sm font-semibold">4.9/5</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <span className="text-sm">1000+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Features */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h3 className="text-2xl md:text-4xl font-raleway font-bold text-text-primary mb-2">
              Why Choose EduLearning?
            </h3>
            <p className="text-lg md:text-xl text-text-secondary font-poppins">
              Modern learning for exam success
            </p>
          </div>

          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            <Card hover className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-raleway font-semibold mb-2">Expert Content</h4>
              <p className="text-text-secondary font-poppins text-sm">
                Curriculum by education experts
              </p>
            </Card>

            <Card hover className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-raleway font-semibold mb-2">Interactive Learning</h4>
              <p className="text-text-secondary font-poppins text-sm">
                Multimedia content & exercises
              </p>
            </Card>

            <Card hover className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-raleway font-semibold mb-2">Proven Results</h4>
              <p className="text-text-secondary font-poppins text-sm">
                90% grade improvement rate
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile CTA Section */}
      <section className="px-4 py-12 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-raleway font-bold text-white mb-3">
            Ready to Excel?
          </h3>
          <p className="text-lg md:text-xl text-primary-100 font-poppins mb-6 px-4">
            Join thousands of successful students
          </p>
          <Link to="/register">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 shadow-xl px-8"
            >
              Start Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-text-primary text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <BookOpen size={24} />
            <h4 className="text-xl font-raleway font-bold">EduLearning</h4>
          </div>
          <p className="text-gray-300 font-poppins text-sm">
            Empowering students to achieve excellence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
