
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, User } from './ChatPlayground';
import { useTheme } from '../../../../ThemeProvider';

interface ChatAreaProps {
  messages: Message[];
  activeUserId: string;
  users: User[];
  onSendMessage: (text: string) => void;
}

const ChatArea = ({ messages, activeUserId, users, onSendMessage }: ChatAreaProps) => {
  const { theme } = useTheme();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const scrollToBottom = () => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const checkScrollPosition = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, shouldAutoScroll]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (newMessage.trim()) {
      setShouldAutoScroll(true);
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUserName = (userId: string) => {
    return users.find(u => u.id === userId)?.name || 'Unknown User';
  };

  return (
    <div className="flex flex-col h-full" onClick={(e) => e.stopPropagation()}>
      {/* Chat Header */}
      <div className={`px-6 py-4 border-b ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Chat Room
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {users.filter(u => u.isOnline).length} users online
        </p>
      </div>

      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        onScroll={checkScrollPosition}
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}
        style={{ scrollBehavior: 'smooth' }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.senderId === activeUserId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`max-w-xs lg:max-w-md ${
                message.senderId === activeUserId ? 'order-2' : 'order-1'
              }`}>
                <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.senderId === activeUserId
                    ? 'bg-convrt-purple text-white rounded-br-md'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-white rounded-bl-md border border-gray-600'
                      : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                }`}>
                  {message.senderId !== activeUserId && (
                    <div className="text-xs font-medium mb-1 opacity-70">
                      {getUserName(message.senderId)}
                    </div>
                  )}
                  <div className="text-sm leading-relaxed">
                    {message.text}
                  </div>
                </div>
                <div className={`text-xs mt-1 px-2 ${
                  message.senderId === activeUserId 
                    ? 'text-right text-gray-500 dark:text-gray-400'
                    : 'text-left text-gray-500 dark:text-gray-400'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className={`p-4 border-t ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <form onSubmit={handleSend} className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message…"
            className={`flex-1 px-4 py-3 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-convrt-purple ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-convrt-purple text-white p-3 rounded-full hover:bg-convrt-purple-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
