
import React from 'react';
import { User, Circle } from 'lucide-react';
import { User as UserType } from './ChatPlayground';
import { useTheme } from '../../../../ThemeProvider';

interface UserSwitcherProps {
  users: UserType[];
  activeUserId: string;
  onUserSwitch: (userId: string) => void;
}

const UserSwitcher = ({ users, activeUserId, onUserSwitch }: UserSwitcherProps) => {
  const { theme } = useTheme();

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Active User
      </h4>
      <div className="space-y-2">
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => onUserSwitch(user.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              activeUserId === user.id
                ? theme === 'dark'
                  ? 'bg-convrt-purple/20 border border-convrt-purple'
                  : 'bg-convrt-purple/10 border border-convrt-purple'
                : theme === 'dark'
                  ? 'hover:bg-gray-700 border border-transparent'
                  : 'hover:bg-gray-100 border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeUserId === user.id
                  ? 'bg-convrt-purple text-white'
                  : theme === 'dark'
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-gray-300 text-gray-600'
              }`}>
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {user.name}
                </div>
                <div className="flex items-center space-x-1">
                  <Circle className={`w-2 h-2 ${
                    user.isOnline ? 'text-green-500 fill-green-500' : 'text-gray-400 fill-gray-400'
                  }`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
            {user.unreadCount && user.unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {user.unreadCount}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserSwitcher;
