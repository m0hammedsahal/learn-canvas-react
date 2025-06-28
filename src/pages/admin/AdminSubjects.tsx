
import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

const AdminSubjects: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [subjects, setSubjects] = useState([
    { id: '1', name: 'Mathematics', description: 'Algebra, Geometry, Calculus', chapters: 12 },
    { id: '2', name: 'Science', description: 'Physics, Chemistry, Biology', chapters: 15 },
    { id: '3', name: 'English', description: 'Grammar, Literature, Writing', chapters: 8 }
  ]);
  const [newSubject, setNewSubject] = useState({
    name: '',
    description: ''
  });

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      description: newSubject.description,
      chapters: 0
    };

    setSubjects([...subjects, subject]);
    setNewSubject({ name: '', description: '' });
    setShowAddModal(false);
  };

  const handleDeleteSubject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-raleway font-bold text-text-primary mb-2">
                Subjects Management
              </h1>
              <p className="text-text-secondary font-poppins">
                Create and manage course subjects
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Subject</span>
            </Button>
          </div>

          {/* Subjects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card
                key={subject.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-primary" size={24} />
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(subject.id)}
                        className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-raleway font-bold text-text-primary mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-text-secondary font-poppins mb-4">
                    {subject.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary font-poppins">
                      {subject.chapters} chapters
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Add Subject Card */}
            <Card
              hover
              className="animate-fade-in border-2 border-dashed border-gray-300 hover:border-primary cursor-pointer"
              onClick={() => setShowAddModal(true)}
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-raleway font-semibold text-text-primary mb-2">
                  Add New Subject
                </h3>
                <p className="text-text-secondary font-poppins text-sm">
                  Click to create a new subject
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Add Subject Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Subject"
      >
        <form onSubmit={handleAddSubject} className="space-y-4">
          <div>
            <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
              Subject Name
            </label>
            <input
              type="text"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              placeholder="Enter subject name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={newSubject.description}
              onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
              placeholder="Enter subject description"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins resize-none"
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Subject
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminSubjects;
