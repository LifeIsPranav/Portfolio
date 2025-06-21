
import React from 'react';

interface ConversationStarterProps {
  text: string;
}

const ConversationStarter: React.FC<ConversationStarterProps> = ({ text }) => {
  return (
    <div className="bg-gradient-to-r from-[#6936F5]/10 to-[#6936F5]/5 p-3 rounded-lg border border-[#6936F5]/20">
      <p className="text-white/90 text-sm">{text}</p>
      <div className="flex justify-end mt-2">
        <button className="px-3 py-1 bg-[#6936F5]/20 text-[#6936F5] text-xs rounded-lg flex items-center">
          <span>Use</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConversationStarter;
