
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { notifications } from '../../../config/mockData';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-6 top-20 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {notifications.map((notif, i) => (
          <div key={i} className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer">
            <p className="text-sm text-gray-700">{notif.text}</p>
            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationPanel;
