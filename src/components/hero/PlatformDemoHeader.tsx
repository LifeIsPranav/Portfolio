
import React from 'react';

const PlatformDemoHeader = () => {
  return (
    <div className="bg-convrt-dark-blue/95 py-4 px-6 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-convrt-purple to-convrt-purple flex items-center justify-center text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L17 7H14V13H10V7H7L12 2Z" fill="currentColor" />
            <path d="M22 12L17 17V14H11V10H17V7L22 12Z" fill="currentColor" />
            <path d="M2 12L7 7V10H13V14H7V17L2 12Z" fill="currentColor" />
            <path d="M12 22L7 17H10V11H14V17H17L12 22Z" fill="currentColor" />
          </svg>
        </div>
        <span className="text-white font-semibold text-lg">Convrt.ai Platform</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-white/60 text-sm">Ryan Miller</span>
        <div className="w-8 h-8 rounded-full bg-convrt-purple/30 flex items-center justify-center text-white">
          RM
        </div>
      </div>
    </div>
  );
};

export default PlatformDemoHeader;
