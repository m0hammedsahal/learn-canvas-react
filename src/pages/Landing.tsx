
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen, Users, Trophy, Star } from 'lucide-react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-primary" size={32} />
            <h1 className="text-2xl font-raleway font-bold text-primary">EduLearning</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-5xl lg:text-6xl font-raleway font-bold text-text-primary leading-tight">
                Master Your
                <span className="text-primary block">Exams Today</span>
              </h2>
              <p className="text-xl text-text-secondary font-poppins leading-relaxed">
                Comprehensive preparation for LSS and USS examinations with expert-curated content, 
                interactive lessons, and personalized learning paths.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Login with Google
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 shadow-2xl">
                <img
                  src="/api/placeholder/500/400"
                  alt="Students studying together"
                  className="w-full h-80 object-cover rounded-xl opacity-90"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="text-white fill-current" size={20} />
                  <span className="text-white font-semibold">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="text-primary animate-bounce-gentle" size={32} />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl font-raleway font-bold text-text-primary mb-4">
              Why Choose EduLearning?
            </h3>
            <p className="text-xl text-text-secondary font-poppins">
              Designed for success with modern learning methodologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-raleway font-semibold mb-2">Expert Content</h4>
              <p className="text-text-secondary font-poppins">
                Curriculum designed by education experts and experienced teachers
              </p>
            </Card>

            <Card hover className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-raleway font-semibold mb-2">Interactive Learning</h4>
              <p className="text-text-secondary font-poppins">
                Engage with multimedia content and interactive exercises
              </p>
            </Card>

            <Card hover className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-raleway font-semibold mb-2">Proven Results</h4>
              <p className="text-text-secondary font-poppins">
                90% of our students improve their grades significantly
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-raleway font-bold text-white mb-4">
            Ready to Excel in Your Exams?
          </h3>
          <p className="text-xl text-primary-100 font-poppins mb-8">
            Join thousands of successful students who achieved their dreams with EduLearning
          </p>
          <Link to="/register">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 shadow-xl"
            >
              Start Learning Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-text-primary text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen size={28} />
            <h4 className="text-2xl font-raleway font-bold">EduLearning</h4>
          </div>
          <p className="text-gray-300 font-poppins">
            Empowering students to achieve academic excellence through innovative learning solutions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
