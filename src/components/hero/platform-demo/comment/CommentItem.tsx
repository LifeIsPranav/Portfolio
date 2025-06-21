
import React from 'react';
import { User, Trash2 } from 'lucide-react';

interface CommentItemProps {
  comment: {
    id: number;
    user: string;
    text: string;
    time: string;
  };
  onDelete: (id: number) => void;
}

const CommentItem = ({ comment, onDelete }: CommentItemProps) => {
  return (
    <div className="flex space-x-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
        <User className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">{comment.user}</span>
              <span className="text-xs text-gray-500">{comment.time}</span>
            </div>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <p className="text-sm text-gray-700 text-left">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
