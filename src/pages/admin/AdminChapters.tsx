
import React, { useState } from 'react';
import { Plus, Play, Trash2, Upload, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

const AdminChapters: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [chapters, setChapters] = useState([
    {
      id: '1',
      title: 'Algebra Basics',
      subject: 'Mathematics',
      duration: '45:30',
      videoFile: 'algebra_basics.mp4',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Chemical Reactions',
      subject: 'Science',
      duration: '38:15',
      videoFile: 'chemistry_reactions.mp4',
      uploadDate: '2024-01-14'
    },
    {
      id: '3',
      title: 'Newton\'s Laws',
      subject: 'Science',
      duration: '42:20',
      videoFile: 'physics_newton.mp4',
      uploadDate: '2024-01-13'
    }
  ]);

  const [newChapter, setNewChapter] = useState({
    title: '',
    subject: '',
    videoFile: null as File | null
  });

  const subjects = ['Mathematics', 'Science', 'English', 'History'];

  const handleUploadChapter = (e: React.FormEvent) => {
    e.preventDefault();
    
    const chapter = {
      id: Date.now().toString(),
      title: newChapter.title,
      subject: newChapter.subject,
      duration: '00:00',
      videoFile: newChapter.videoFile?.name || 'unknown.mp4',
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setChapters([...chapters, chapter]);
    setNewChapter({ title: '', subject: '', videoFile: null });
    setShowUploadModal(false);
  };

  const handleDeleteChapter = (id: string) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      setChapters(chapters.filter(chapter => chapter.id !== id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewChapter({ ...newChapter, videoFile: file });
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
                Chapters Management
              </h1>
              <p className="text-text-secondary font-poppins">
                Upload and manage video chapters
              </p>
            </div>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2"
            >
              <Upload size={20} />
              <span>Upload Chapter</span>
            </Button>
          </div>

          {/* Chapters List */}
          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <Card
                key={chapter.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Play className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-raleway font-bold text-text-primary">
                          {chapter.title}
                        </h3>
                        <p className="text-text-secondary font-poppins">
                          Subject: {chapter.subject}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary font-poppins">
                          <span>Duration: {chapter.duration}</span>
                          <span>Uploaded: {chapter.uploadDate}</span>
                          <span>File: {chapter.videoFile}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>Preview</span>
                      </Button>
                      <button
                        onClick={() => handleDeleteChapter(chapter.id)}
                        className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {chapters.length === 0 && (
            <Card className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Play className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-raleway font-semibold text-text-primary mb-2">
                No chapters uploaded yet
              </h3>
              <p className="text-text-secondary font-poppins mb-6">
                Start by uploading your first video chapter
              </p>
              <Button onClick={() => setShowUploadModal(true)}>
                Upload First Chapter
              </Button>
            </Card>
          )}
        </main>
      </div>

      {/* Upload Chapter Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload New Chapter"
        size="lg"
      >
        <form onSubmit={handleUploadChapter} className="space-y-6">
          <div>
            <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
              Chapter Title
            </label>
            <input
              type="text"
              value={newChapter.title}
              onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
              placeholder="Enter chapter title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
              Subject
            </label>
            <select
              value={newChapter.subject}
              onChange={(e) => setNewChapter({ ...newChapter, subject: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
              Video File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="text-gray-400 mx-auto mb-4" size={32} />
              <p className="text-text-secondary font-poppins mb-4">
                Drop your video file here or click to browse
              </p>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="video-upload"
                required
              />
              <label
                htmlFor="video-upload"
                className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg font-poppins hover:bg-primary-600 transition-colors"
              >
                Choose File
              </label>
              {newChapter.videoFile && (
                <p className="text-sm text-text-secondary font-poppins mt-2">
                  Selected: {newChapter.videoFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowUploadModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Upload Chapter
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminChapters;
