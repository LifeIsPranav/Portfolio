
import React from 'react';

const RelationshipInsight = () => {
  return (
    <div className="bg-convrt-dark-blue/50 p-4 rounded-lg mb-5">
      <div className="flex items-start">
        <div className="text-[#6936F5] bg-[#6936F5]/20 p-1.5 rounded-lg mr-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 2a4.61 4.61 0 0 1 2.44 6.47A4.25 4.25 0 0 1 15.45 12h.05c2.5.1 4.25 1 4.5 2.73V15a3 3 0 0 1-2.3 2.92l-2.53.42a3.52 3.52 0 0 1-3.77-1.65L10.5 15.5" stroke="currentColor" strokeWidth="2" />
            <path d="M15 9.5a4.61 4.61 0 0 0-2.44-6.47A4.25 4.25 0 0 0 9.55 0H9.5c-2.5.1-4.25 1-4.5 2.73V3a3 3 0 0 0 2.3 2.92l2.53.42a3.52 3.52 0 0 0 3.77-1.65L14.5 3.5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <h4 className="text-white/90 font-medium text-sm">AI Relationship Insight</h4>
          <p className="text-white/70 text-xs mt-1 leading-relaxed">
            Based on recent social media activity, Karen is currently focused on scaling operations while maintaining quality. Your experience with similar challenges would be a valuable connection point.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelationshipInsight;
