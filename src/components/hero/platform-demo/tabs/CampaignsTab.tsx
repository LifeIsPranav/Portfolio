
import React from 'react';
import { campaigns } from '../../../../config/mockData';
import { Campaign } from '../../../../types';

const CampaignsTab = () => {
  const getStatusStyle = (status: Campaign['status']) => {
    switch (status) {
      case 'Running': return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {campaigns.map((campaign, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900 text-lg">{campaign.name}</h4>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(campaign.status)}`}>
                {campaign.status}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{campaign.sent}</div>
              <div className="text-sm text-gray-500">Sent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{campaign.opened}</div>
              <div className="text-sm text-gray-500">Opened</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{campaign.replied}</div>
              <div className="text-sm text-gray-500">Replied</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignsTab;
