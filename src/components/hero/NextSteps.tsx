
import React from 'react';

const NextSteps = () => {
  return (
    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5">
      <h3 className="text-white/80 text-sm font-medium mb-3">Next Steps</h3>
      <ul className="space-y-3">
        <li className="flex items-center text-white/90 bg-white/5 p-2 rounded-lg">
          <div className="w-5 h-5 rounded-full border border-[#6936F5]/50 flex items-center justify-center mr-2 text-[#6936F5]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xs">Engage with recent article</span>
        </li>
        <li className="flex items-center text-white/90 bg-white/5 p-2 rounded-lg">
          <div className="w-5 h-5 rounded-full border border-white/20 mr-2"></div>
          <span className="text-xs">Send personalized outreach</span>
        </li>
        <li className="flex items-center text-white/90 bg-white/5 p-2 rounded-lg">
          <div className="w-5 h-5 rounded-full border border-white/20 mr-2"></div>
          <span className="text-xs">Schedule follow-up reminder</span>
        </li>
      </ul>
      
      <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#6936F5] to-[#6936F5] rounded-lg text-white text-sm font-medium">
        Start Sequence
      </button>
    </div>
  );
};

export default NextSteps;
