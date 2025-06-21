
import React from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Settings, BarChart2, Star, Bell, ArrowRight, User } from 'lucide-react';

interface AvatarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadClick: () => void;
  avatarImage: string | null;
}

const AvatarMenu = ({ isOpen, onClose, onUploadClick, avatarImage }: AvatarMenuProps) => {
  const menuItems = [
    { icon: Settings, label: "Account Settings" },
    { icon: BarChart2, label: "My Performance" },
    { icon: Star, label: "Favorites" },
    { icon: Bell, label: "Notifications" }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-6 top-20 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div onClick={onUploadClick} className="w-10 h-10 rounded-full bg-convrt-purple/20 flex items-center justify-center overflow-hidden cursor-pointer">
              {avatarImage ? (
                <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-convrt-purple" />
              )}
            </div>
            <div className="flex flex-col items-start" >
              <h3 className="font-medium text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">Sales Manager</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-2">
        <button
          onClick={onUploadClick}
          className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
        >
          <Camera className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">Change Avatar</span>
        </button>
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
          >
            <item.icon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="p-2 border-t border-gray-100">
        <button className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-left">
          <ArrowRight className="w-4 h-4 text-red-500 rotate-180" />
          <span className="text-sm text-red-500">Sign Out</span>
        </button>
      </div>
    </motion.div>
  );
};

export default AvatarMenu;
