
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Upload } from 'lucide-react';

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentAvatar: string | null;
}

const AvatarUploadModal = ({ isOpen, onClose, onUpload, currentAvatar }: AvatarUploadModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-80 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Upload Avatar</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {currentAvatar ? (
                  <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <label className="button-primary cursor-pointer inline-flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={onUpload}
                  className="hidden"
                />
              </label>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarUploadModal;
