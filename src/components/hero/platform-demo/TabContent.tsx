
import React from 'react';
import CuesTab from './CuesTab';
import HeatboxTab from './tabs/HeatboxTab';
import ChatTab from './tabs/ChatTab';
import AgentsTab from './tabs/AgentsTab';
import CampaignsTab from './tabs/CampaignsTab';
import { tabInfo } from '../../../config/tabsConfig';

interface TabContentProps {
  activeTab: string;
}

const TabContent = ({ activeTab }: TabContentProps) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'cues': return <CuesTab />;
      case 'heatbox': return <HeatboxTab />;
      case 'seeds': return <ChatTab />;
      case 'agents': return <AgentsTab />;
      case 'campaigns': return <CampaignsTab />;
      default: return <CuesTab />;
    }
  };

  const currentTabInfo = tabInfo[activeTab] || tabInfo.cues;

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{currentTabInfo.title}</h3>
        <p className="text-lg text-convrt-purple font-medium mb-3">{currentTabInfo.subtitle}</p>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{currentTabInfo.description}</p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabContent;
