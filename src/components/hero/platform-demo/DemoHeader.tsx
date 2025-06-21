
import React from 'react';
import { Minimize2, Maximize2, Bell, User } from 'lucide-react';
import { tabContent } from '../../../config/tabsConfig';

interface DemoHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isFullscreen: boolean;
  onClose: () => void;
  onToggleFullscreen: () => void;
  showNotificationPanel: boolean;
  showAvatarPanel: boolean;
  onNotificationClick: () => void;
  onAvatarClick: () => void;
  notificationsRead: boolean;
  avatarImage: string | null;
}

const DemoHeader = ({
  activeTab,
  setActiveTab,
  isFullscreen,
  onClose,
  onToggleFullscreen,
  showNotificationPanel,
  showAvatarPanel,
  onNotificationClick,
  onAvatarClick,
  notificationsRead,
  avatarImage
}: DemoHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 flex items-center px-6 py-4">
      <div className="flex space-x-1 mr-4">
        <button 
          onClick={onClose}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
        ></button>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <button 
          onClick={onToggleFullscreen}
          className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer flex items-center justify-center"
        >
          {isFullscreen ? (
            <Minimize2 className="w-2 h-2 text-white" />
          ) : (
            <Maximize2 className="w-2 h-2 text-white" />
          )}
        </button>
      </div>
      
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide flex-1">
        {Object.entries(tabContent).map(([key, label]) => (
          <button 
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-3 rounded-t-lg font-medium text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === key 
                ? 'text-convrt-purple bg-convrt-purple/10 border-convrt-purple' 
                : 'text-gray-600 hover:bg-gray-100 border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-xs font-medium text-green-700">248 Seeds</span>
        </div>
        <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-xs font-medium text-orange-700">12 Streak</span>
        </div>
        
        {showNotificationPanel && (
          <div className="relative">
            <button
              onClick={onNotificationClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {!notificationsRead && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              )}
            </button>
          </div>
        )}
        
        {showAvatarPanel && (
          <div className="relative">
            <button
              onClick={onAvatarClick}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-convrt-purple/20 transition-all overflow-hidden"
            >
              {avatarImage ? (
                <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoHeader;
