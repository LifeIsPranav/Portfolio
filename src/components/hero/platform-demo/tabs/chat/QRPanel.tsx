
import React from 'react';
import { QrCode, Smartphone } from 'lucide-react';
import { useTheme } from '../../../../ThemeProvider';

const QRPanel = () => {
  const { theme } = useTheme();

  return (
    <div className="p-4 flex-1 flex flex-col items-center justify-center">
      <div className={`w-32 h-32 rounded-xl flex items-center justify-center mb-4 ${
        theme === 'dark' 
          ? 'bg-gray-700 border-2 border-gray-600' 
          : 'bg-white border-2 border-gray-200'
      }`}>
        {/* Placeholder QR Code */}
        <div className="relative">
          <QrCode className={`w-20 h-20 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`} />
          <div className="absolute inset-0 bg-gradient-to-br from-convrt-purple/20 to-transparent rounded"></div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Smartphone className="w-4 h-4 text-convrt-purple" />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Mobile Pairing
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          Scan to chat from your mobile device
        </p>
      </div>

      <div className={`mt-4 px-3 py-2 rounded-full text-xs ${
        theme === 'dark'
          ? 'bg-gray-700 text-gray-300'
          : 'bg-gray-100 text-gray-600'
      }`}>
        Ready to pair
      </div>
    </div>
  );
};

export default QRPanel;
