
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import CommentItem from './comment/CommentItem';
import CommentInput from './comment/CommentInput';
import { useComments } from '../../../hooks/useComments';

const CuesTab = () => {
  const [isHeartLiked, setIsHeartLiked] = useState(false);
  const { comments, newComment, setNewComment, addComment, deleteComment } = useComments();

  const handleLikeClick = () => {
    setIsHeartLiked(!isHeartLiked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
              <img src="/lovable-uploads/0f228602-2449-495f-866b-df124fde272a.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-gray-900 text-lg">Sarah Chen</h3>
                <div className="ml-2 text-xs text-white bg-blue-600 px-2 py-1 rounded">LinkedIn</div>
              </div>
              <p className="text-sm text-gray-500">VP Marketing at TechStart • 3h ago</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 text-base leading-relaxed">
              Excited to share that our team just hit 200% of our Q4 targets! The new marketing automation tools have been game-changing. 🚀
            </p>
          </div>
          
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="flex items-center space-x-4 text-gray-500">
              <motion.button 
                className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-pointer"
                onClick={handleLikeClick}
                whileTap={{ scale: 1.2 }}
                animate={isHeartLiked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`w-5 h-5 transition-all duration-300 ${isHeartLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="text-sm font-medium">{isHeartLiked ? '90' : '89'}</span>
              </motion.button>
              <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors cursor-pointer">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{comments.length}</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 hover:text-green-500 transition-colors cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
            <div className="flex items-center space-x-2 bg-convrt-purple/10 text-convrt-purple px-3 py-2 rounded-lg">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">High Priority Cue</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <div className="space-y-3 mb-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDelete={deleteComment}
              />
            ))}
          </div>
          
          <CommentInput
            value={newComment}
            onChange={setNewComment}
            onSubmit={addComment}
          />
        </div>
      </div>
    </div>
  );
};

export default CuesTab;
