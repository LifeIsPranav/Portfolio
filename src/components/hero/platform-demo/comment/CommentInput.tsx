
import React from 'react';
import { User, Send } from 'lucide-react';

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const CommentInput = ({ value, onChange, onSubmit }: CommentInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex space-x-3">
      <div className="w-8 h-8 rounded-full bg-convrt-purple/20 flex items-center justify-center">
        <User className="w-4 h-4 text-convrt-purple" />
      </div>
      <div className="flex-1 flex space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-convrt-purple/20"
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-convrt-purple text-white rounded-lg text-sm hover:bg-convrt-purple-hover transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
