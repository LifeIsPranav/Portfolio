import { useCallback, useEffect, useRef, useState } from "react";
import { PersonalizedChatService } from "@/services/chatService";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const usePersonalizedChat = () => {
  const [chatService] = useState(() => new PersonalizedChatService());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm ${chatService.getUserInfo().name}'s AI assistant. I can answer questions about their skills, experience, projects, and background. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef(messages);

  // Keep ref in sync with state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get conversation history for context using ref
      const conversationHistory = messagesRef.current
        .slice(-6) // Last 6 messages for context
        .map(msg => ({ role: msg.role, content: msg.content }));
      
      const response = await chatService.generateResponse(content, conversationHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again later or ask me about Pranav's skills, experience, or projects!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chatService]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hi! I'm ${chatService.getUserInfo().name}'s AI assistant. I can answer questions about their skills, experience, projects, and background. What would you like to know?`,
        timestamp: new Date()
      }
    ]);
  }, [chatService]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    userInfo: chatService.getUserInfo()
  };
};

export default usePersonalizedChat;
