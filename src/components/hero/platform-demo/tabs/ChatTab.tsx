
import React from 'react';
import ChatPlayground from './chat/ChatPlayground';

const ChatTab = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick} className="w-full">
      <ChatPlayground />
    </div>
  );
};

export default ChatTab;
