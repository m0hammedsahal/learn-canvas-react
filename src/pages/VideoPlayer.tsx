
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, Maximize, SkipBack, SkipForward, List } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const VideoPlayer: React.FC = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { selectedSubject, currentChapter, setCurrentChapter } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(2700); // 45 minutes in seconds
  const [showChapters, setShowChapters] = useState(false);

  // Mock data if no subject selected
  const mockChapters = [
    { id: 'c1', title: 'Algebra Basics', duration: '45:30', completed: true },
    { id: 'c2', title: 'Geometry Fundamentals', duration: '38:15', completed: false },
    { id: 'c3', title: 'Trigonometry Intro', duration: '42:20', completed: false }
  ];

  const chapters = selectedSubject?.chapters || mockChapters;
  const chapter = chapters.find(c => c.id === chapterId) || chapters[0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(Math.floor(newTime));
  };

  const handleChapterSelect = (selectedChapter: any) => {
    setCurrentChapter(selectedChapter);
    navigate(`/video/${selectedChapter.id}`);
    setShowChapters(false);
  };

  const nextChapter = () => {
    const currentIndex = chapters.findIndex(c => c.id === chapterId);
    if (currentIndex < chapters.length - 1) {
      handleChapterSelect(chapters[currentIndex + 1]);
    }
  };

  const prevChapter = () => {
    const currentIndex = chapters.findIndex(c => c.id === chapterId);
    if (currentIndex > 0) {
      handleChapterSelect(chapters[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black/90 backdrop-blur-sm p-4 flex items-center justify-between text-white">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-poppins">Back to Dashboard</span>
        </button>
        
        <h1 className="text-lg font-raleway font-semibold hidden md:block">
          {chapter?.title}
        </h1>

        <button
          onClick={() => setShowChapters(!showChapters)}
          className="flex items-center space-x-2 hover:text-primary transition-colors"
        >
          <List size={20} />
          <span className="font-poppins hidden md:inline">Chapters</span>
        </button>
      </div>

      <div className="flex">
        {/* Video Player */}
        <div className="flex-1">
          <div className="relative bg-gray-900 aspect-video">
            {/* Video Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/api/placeholder/800/450"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 bg-primary bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="text-white ml-1" size={32} />
                  ) : (
                    <Play className="text-white ml-1" size={32} />
                  )}
                </button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div
                className="w-full h-2 bg-white/30 rounded-full mb-4 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button onClick={prevChapter} className="hover:text-primary transition-colors">
                    <SkipBack size={24} />
                  </button>
                  <button onClick={handlePlayPause} className="hover:text-primary transition-colors">
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                  </button>
                  <button onClick={nextChapter} className="hover:text-primary transition-colors">
                    <SkipForward size={24} />
                  </button>
                  <div className="flex items-center space-x-2">
                    <Volume2 size={20} />
                    <div className="w-20 h-1 bg-white/30 rounded-full">
                      <div className="w-3/4 h-full bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm font-poppins">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <button className="hover:text-primary transition-colors">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-6 bg-white">
            <h2 className="text-2xl font-raleway font-bold text-text-primary mb-2">
              {chapter?.title}
            </h2>
            <p className="text-text-secondary font-poppins mb-4">
              Learn the fundamentals and build a strong foundation in this topic.
            </p>
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <span className="font-poppins">Duration: {chapter?.duration}</span>
              <span className="font-poppins">Subject: {selectedSubject?.name || 'Mathematics'}</span>
            </div>
          </div>
        </div>

        {/* Chapter Sidebar */}
        <div className={`w-80 bg-white border-l border-gray-200 transition-transform ${showChapters ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}>
          <div className="p-6">
            <h3 className="text-xl font-raleway font-bold text-text-primary mb-6">
              Course Chapters
            </h3>
            <div className="space-y-3">
              {chapters.map((chap: any, index: number) => (
                <div
                  key={chap.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    chap.id === chapterId
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => handleChapterSelect(chap)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-poppins font-medium">
                      Chapter {index + 1}
                    </span>
                    <span className="text-xs opacity-75">
                      {chap.duration}
                    </span>
                  </div>
                  <h4 className="font-poppins font-medium">
                    {chap.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
