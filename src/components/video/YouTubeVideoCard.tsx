
import React from 'react';
import { Play, Clock, Eye, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubeVideoCardProps {
  video: {
    id: string;
    title: string;
    duration: string;
    thumbnail?: string;
    youtubeUrl: string;
    views?: string;
    completed?: boolean;
  };
  onClick?: () => void;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

const YouTubeVideoCard: React.FC<YouTubeVideoCardProps> = ({
  video,
  onClick,
  className,
  layout = 'vertical'
}) => {
  const handleYouTubeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  if (layout === 'horizontal') {
    return (
      <div
        className={cn(
          'neuro-card p-3 cursor-pointer hover:shadow-xl transition-all duration-300 flex items-center space-x-3 animate-fade-in',
          className
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={video.thumbnail || "/api/placeholder/120/80"}
            alt={`Thumbnail for ${video.title}`}
            className="w-20 h-14 sm:w-24 sm:h-16 object-cover"
            loading="lazy"
          />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="neuro-button w-8 h-8 flex items-center justify-center" aria-label="Play video">
              <Play className="text-primary" size={12} />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-1 right-1 neuro-card px-1 py-0.5">
            <span className="text-xs font-medium text-text-primary" aria-label={`Duration: ${video.duration}`}>
              {video.duration}
            </span>
          </div>

          {/* Completion indicator */}
          {video.completed && (
            <div className="absolute top-1 left-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center" aria-label="Completed">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>

        {/* Video info */}
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="font-raleway font-semibold text-text-primary text-sm line-clamp-2 leading-tight">
            {video.title}
          </h3>

          {/* Stats */}
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Clock size={10} aria-hidden="true" />
              <span>{video.duration}</span>
            </div>
            {video.views && (
              <div className="flex items-center space-x-1">
                <Eye size={10} aria-hidden="true" />
                <span>{video.views}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-1">
            <button
              onClick={handleYouTubeClick}
              className="neuro-button px-2 py-1 flex items-center space-x-1 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
              aria-label="Open in YouTube"
            >
              <Youtube size={10} />
              <span className="hidden sm:inline">YouTube</span>
            </button>
            
            <button 
              className="neuro-button px-2 py-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              aria-label="Watch video"
            >
              Watch
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'neuro-card p-3 sm:p-4 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in',
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Thumbnail with YouTube overlay */}
      <div className="relative mb-3 overflow-hidden rounded-xl sm:rounded-2xl">
        <img
          src={video.thumbnail || "/api/placeholder/320/180"}
          alt={`Thumbnail for ${video.title}`}
          className="w-full h-32 sm:h-40 object-cover"
          loading="lazy"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="neuro-button w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center" aria-label="Play video">
            <Play className="text-primary" size={20} />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 neuro-card px-2 py-1">
          <span className="text-xs font-medium text-text-primary" aria-label={`Duration: ${video.duration}`}>
            {video.duration}
          </span>
        </div>

        {/* Completion indicator */}
        {video.completed && (
          <div className="absolute top-2 left-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center" aria-label="Completed">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>

      {/* Video info */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className="font-raleway font-semibold text-text-primary text-sm line-clamp-2 leading-tight">
          {video.title}
        </h3>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Clock size={12} aria-hidden="true" />
              <span>{video.duration}</span>
            </div>
            {video.views && (
              <div className="flex items-center space-x-1">
                <Eye size={12} aria-hidden="true" />
                <span>{video.views}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleYouTubeClick}
            className="neuro-button flex-1 py-2 px-3 flex items-center justify-center space-x-2 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
            aria-label="Open in YouTube"
          >
            <Youtube size={14} />
            <span>YouTube</span>
          </button>
          
          <button 
            className="neuro-button px-4 py-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            aria-label="Watch video"
          >
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideoCard;
