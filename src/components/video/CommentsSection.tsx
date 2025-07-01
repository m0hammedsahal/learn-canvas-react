
import React, { useState } from 'react';
import { MessageCircle, Heart, Reply, MoreVertical } from 'lucide-react';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: { name: 'John Doe', avatar: '/api/placeholder/32/32' },
      content: 'Great explanation! This really helped me understand the concept better.',
      timestamp: '2 hours ago',
      likes: 12,
      replies: [
        {
          id: '1-1',
          user: { name: 'Jane Smith', avatar: '/api/placeholder/32/32' },
          content: 'I agree! The examples were very clear.',
          timestamp: '1 hour ago',
          likes: 3
        }
      ]
    },
    {
      id: '2',
      user: { name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
      content: 'Could you make a video on advanced topics next?',
      timestamp: '4 hours ago',
      likes: 8
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: { name: 'You', avatar: '/api/placeholder/32/32' },
      content: newComment,
      timestamp: 'Just now',
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-8' : ''} mb-4`}>
      <div className="neuro-card p-4">
        <div className="flex items-start space-x-3">
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-poppins font-medium text-text-primary text-sm">
                {comment.user.name}
              </span>
              <span className="text-xs text-text-secondary">
                {comment.timestamp}
              </span>
            </div>
            <p className="text-text-primary text-sm mb-3 font-poppins">
              {comment.content}
            </p>
            <div className="flex items-center space-x-4">
              <button className="neuro-button px-3 py-1 flex items-center space-x-1 text-xs">
                <Heart size={12} />
                <span>{comment.likes}</span>
              </button>
              <button
                onClick={() => setReplyTo(comment.id)}
                className="neuro-button px-3 py-1 flex items-center space-x-1 text-xs"
              >
                <Reply size={12} />
                <span>Reply</span>
              </button>
              <button className="neuro-button p-1">
                <MoreVertical size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.map(reply => (
        <div key={reply.id} className="mt-3">
          <CommentItem comment={reply} isReply />
        </div>
      ))}

      {/* Reply input */}
      {replyTo === comment.id && (
        <div className="mt-3 ml-8">
          <div className="neuro-inset p-3 rounded-2xl">
            <textarea
              placeholder="Write a reply..."
              className="neuro-input w-full p-3 text-sm resize-none"
              rows={2}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                onClick={() => setReplyTo(null)}
                className="neuro-button px-4 py-1 text-xs text-text-secondary"
              >
                Cancel
              </button>
              <button className="neuro-button px-4 py-1 text-xs text-primary font-medium">
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="neuro-card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle size={20} className="text-primary" />
        <h3 className="text-lg font-raleway font-bold text-text-primary">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add comment */}
      <div className="neuro-inset p-4 rounded-2xl mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="neuro-input w-full p-3 text-sm resize-none"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="neuro-button px-6 py-2 text-sm font-medium text-primary disabled:opacity-50"
          >
            Comment
          </button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
