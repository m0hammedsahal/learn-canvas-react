
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, Maximize, SkipBack, SkipForward, List, Check, Youtube, Clock, Eye } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import CommentsSection from '@/components/video/CommentsSection';
import YouTubeVideoCard from '@/components/video/YouTubeVideoCard';

const VideoPlayer: React.FC = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { selectedSubject, currentChapter, setCurrentChapter } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(2700);
  const [showChapters, setShowChapters] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Mock data with YouTube links - fixed to match interface
  const mockChapters = [
    { 
      id: 'c1', 
      title: 'Algebra Basics', 
      duration: '45:30', 
      completed: true,
      youtubeUrl: 'https://youtube.com/watch?v=algebra-basics',
      thumbnail: '/api/placeholder/320/180',
      views: '1.2K'
    },
    { 
      id: 'c2', 
      title: 'Geometry Fundamentals', 
      duration: '38:15', 
      completed: false,
      youtubeUrl: 'https://youtube.com/watch?v=geometry-fundamentals',
      thumbnail: '/api/placeholder/320/180',
      views: '856'
    },
    { 
      id: 'c3', 
      title: 'Trigonometry Intro', 
      duration: '42:20', 
      completed: false,
      youtubeUrl: 'https://youtube.com/watch?v=trigonometry-intro',
      thumbnail: '/api/placeholder/320/180',
      views: '695'
    }
  ];

  const chapters = selectedSubject?.chapters || mockChapters;
  const chapter = chapters.find(c => c.id === chapterId) || chapters[0];
  const currentIndex = chapters.findIndex(c => c.id === chapterId);
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
  const suggestedVideos = chapters.filter(c => c.id !== chapterId).slice(0, 3);

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

  const handleNextChapter = () => {
    if (nextChapter) {
      handleChapterSelect(nextChapter);
    }
  };

  const handlePrevChapter = () => {
    if (currentIndex > 0) {
      handleChapterSelect(chapters[currentIndex - 1]);
    }
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  const openYouTube = () => {
    if (chapter?.youtubeUrl) {
      window.open(chapter.youtubeUrl, '_blank');
    }
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--neuro-bg))' }}>
      {/* Header */}
      <div className="neuro-card m-2 sm:m-4 p-3 sm:p-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="neuro-button flex items-center space-x-2 px-3 py-2 text-text-primary"
        >
          <ArrowLeft size={18} />
          <span className="font-poppins text-sm">Back</span>
        </button>
        
        <h1 className="text-sm sm:text-lg font-raleway font-semibold text-text-primary hidden md:block truncate flex-1 mx-4">
          {chapter?.title}
        </h1>

        <button
          onClick={() => setShowChapters(!showChapters)}
          className="neuro-button flex items-center space-x-2 px-3 py-2 text-text-primary"
        >
          <List size={18} />
          <span className="font-poppins text-sm hidden sm:inline">Chapters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 p-2 sm:p-4">
        {/* Main Content */}
        <div className="flex-1 space-y-3 sm:space-y-4">
          {/* Video Player */}
          <Card className="relative overflow-hidden" padding="sm">
            <div className="relative bg-gray-900 aspect-video rounded-lg sm:rounded-2xl overflow-hidden">
              {/* Demo Video Placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="/api/placeholder/800/450"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlayPause}
                    className="neuro-button w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white"
                  >
                    {isPlaying ? (
                      <Pause size={24} />
                    ) : (
                      <Play className="ml-1" size={24} />
                    )}
                  </button>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4">
                {/* Progress Bar */}
                <div
                  className="w-full h-1.5 sm:h-2 bg-white/30 rounded-full mb-3 sm:mb-4 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <button onClick={handlePrevChapter} className="neuro-button p-1.5 sm:p-2 text-white">
                      <SkipBack size={16} />
                    </button>
                    <button onClick={handlePlayPause} className="neuro-button p-1.5 sm:p-2 text-white">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button onClick={handleNextChapter} className="neuro-button p-1.5 sm:p-2 text-white">
                      <SkipForward size={16} />
                    </button>
                    <div className="hidden sm:flex items-center space-x-2">
                      <Volume2 size={16} />
                      <div className="w-12 sm:w-16 h-1 bg-white/30 rounded-full">
                        <div className="w-3/4 h-full bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="text-xs sm:text-sm font-poppins">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <button onClick={handleFullscreen} className="neuro-button p-1.5 sm:p-2 text-white">
                      <Maximize size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Video Info & Actions */}
          <Card padding="sm">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-raleway font-bold text-text-primary mb-2">
                  {chapter?.title}
                </h2>
                <p className="text-text-secondary font-poppins mb-2 text-sm">
                  Learn the fundamentals and build a strong foundation in this topic.
                </p>
                <div className="flex items-center space-x-4 text-xs sm:text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{chapter?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{chapter?.views || '0'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button onClick={openYouTube} variant="neuro" size="sm" className="text-red-600 flex-1 sm:flex-none">
                  <Youtube size={14} className="mr-1" />
                  YouTube
                </Button>
                <Button
                  onClick={handleMarkComplete}
                  variant="neuro"
                  size="sm"
                  className={`flex-1 sm:flex-none ${isCompleted ? 'text-green-600' : 'text-text-primary'}`}
                >
                  <Check size={14} className="mr-1" />
                  {isCompleted ? 'Completed' : 'Mark Done'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Up Next Section */}
          {nextChapter && (
            <Card padding="sm">
              <h3 className="text-base sm:text-lg font-raleway font-bold text-text-primary mb-3">
                Up Next
              </h3>
              <YouTubeVideoCard
                video={nextChapter}
                onClick={() => handleChapterSelect(nextChapter)}
                layout="horizontal"
              />
            </Card>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-raleway font-bold text-text-primary">
                Discussion
              </h3>
              <Button
                onClick={() => setShowComments(!showComments)}
                variant="neuro"
                size="sm"
              >
                {showComments ? 'Hide' : 'Show'} Comments
              </Button>
            </div>
            
            {showComments && <CommentsSection />}
          </div>
        </div>

        {/* Sidebar */}
        <div className={`w-full lg:w-80 ${showChapters ? 'block' : 'hidden lg:block'}`}>
          <Card padding="sm">
            <h3 className="text-base sm:text-lg font-raleway font-bold text-text-primary mb-4">
              Course Videos
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {chapters.map((chap: any, index: number) => (
                <div
                  key={chap.id}
                  className={`neuro-card p-3 cursor-pointer transition-all ${
                    chap.id === chapterId
                      ? 'bg-primary text-white'
                      : 'text-text-primary hover:shadow-lg'
                  }`}
                  onClick={() => handleChapterSelect(chap)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-poppins font-medium">
                      Video {index + 1}
                    </span>
                    <span className="text-xs opacity-75">
                      {chap.duration}
                    </span>
                  </div>
                  <h4 className="font-poppins font-medium text-sm line-clamp-2">
                    {chap.title}
                  </h4>
                  {chap.completed && (
                    <div className="flex items-center mt-1">
                      <Check size={12} className="text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Completed</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Suggested Videos */}
          <Card className="mt-3 sm:mt-4" padding="sm">
            <h3 className="text-base sm:text-lg font-raleway font-bold text-text-primary mb-4">
              More Videos
            </h3>
            <div className="space-y-2">
              {suggestedVideos.map((video) => (
                <YouTubeVideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleChapterSelect(video)}
                  layout="horizontal"
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
