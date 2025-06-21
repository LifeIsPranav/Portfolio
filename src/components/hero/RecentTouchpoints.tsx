
import React from 'react';
import TouchpointItem from './TouchpointItem';

const RecentTouchpoints = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-white/90 text-sm font-medium mb-2">Recent Touchpoints</h3>
      <TouchpointItem 
        type="linkedin"
        text="LinkedIn Comment"
        subtext="Mentioned industry report"
        timeAgo="2 days ago"
      />
      <TouchpointItem 
        type="reddit"
        text="Reddit Discussion"
        subtext="Shared thought leadership"
        timeAgo="3 days ago"
      />
      <TouchpointItem 
        type="twitter"
        text="Twitter Engagement"
        subtext="Liked your market analysis"
        timeAgo="5 days ago"
      />
    </div>
  );
};

export default RecentTouchpoints;
