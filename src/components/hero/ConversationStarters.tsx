
import React from 'react';
import ConversationStarter from './ConversationStarter';

const ConversationStarters = () => {
  return (
    <div className="bg-white/5 rounded-xl p-5 backdrop-blur-sm border border-white/5">
      <h3 className="text-white font-medium mb-4">Recommended Conversation Starters</h3>
      <div className="space-y-3">
        <ConversationStarter text="I noticed your comment about balancing scale and quality. We've developed a framework that might address those challenges effectively." />
        <ConversationStarter text="Your recent post about sustainability goals resonated with me. I'd love to share how we've helped similar companies achieve their ESG targets." />
      </div>
    </div>
  );
};

export default ConversationStarters;
