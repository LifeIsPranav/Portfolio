
import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

interface TouchpointItemProps {
  type: 'linkedin' | 'twitter' | 'reddit';
  text: string;
  subtext: string;
  timeAgo: string;
}

const TouchpointItem: React.FC<TouchpointItemProps> = ({ type, text, subtext, timeAgo }) => {
  const renderIcon = () => {
    switch (type) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'reddit':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="flex justify-between bg-white/5 p-3 rounded-lg">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-lg bg-[#6936F5]/20 text-[#6936F5] flex items-center justify-center mr-3">
          {renderIcon()}
        </div>
        <div>
          <span className="text-white/90 text-sm">{text}</span>
          <span className="block text-white/60 text-xs">{subtext}</span>
        </div>
      </div>
      <span className="text-white/50 text-xs">{timeAgo}</span>
    </div>
  );
};

export default TouchpointItem;
