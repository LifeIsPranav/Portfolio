
import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const ContactProfile = () => {
  return (
    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5">
      <h3 className="text-white/80 text-sm font-medium mb-3">Contact Profile</h3>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6936F5] to-[#6936F5] flex items-center justify-center text-white mr-3">
          KJ
        </div>
        <div>
          <h4 className="text-white font-medium">Karen Johnson</h4>
          <p className="text-white/60 text-xs">VP of Operations, TechScale Inc.</p>
        </div>
      </div>
      
      <div className="space-y-2.5 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-white/70 text-xs">Engagement Score</span>
          <span className="text-[#6936F5] text-xs font-medium">87%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#6936F5] to-[#6936F5] rounded-full" style={{width: '87%'}}></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/70 text-xs">Buying Intent</span>
          <span className="text-[#6936F5] text-xs font-medium">73%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#6936F5] rounded-full" style={{width: '73%'}}></div>
        </div>
      </div>
      
      <div className="bg-convrt-dark-blue/50 rounded-lg p-3">
        <h4 className="text-white/90 text-xs font-medium mb-2">Social Channels</h4>
        <div className="flex flex-wrap gap-2">
          <div className="px-2 py-1 bg-[#6936F5]/10 text-[#6936F5] text-xs rounded-md flex items-center">
            <Linkedin className="w-3 h-3 mr-1" />
            LinkedIn
          </div>
          <div className="px-2 py-1 bg-[#6936F5]/10 text-[#6936F5] text-xs rounded-md flex items-center">
            <Twitter className="w-3 h-3 mr-1" />
            Twitter
          </div>
          <div className="px-2 py-1 bg-[#6936F5]/10 text-[#6936F5] text-xs rounded-md flex items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            Reddit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactProfile;
