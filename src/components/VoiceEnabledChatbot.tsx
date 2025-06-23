import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GeminiChatService } from "@/services/geminiChatService";
import { SarvamAIService } from "@/services/sarvamAIService";

import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasAudio?: boolean;
}

interface VoiceChatbotProps {
  className?: string;
}

const VoiceChatbot: React.FC<VoiceChatbotProps> = ({ className }) => {
  // Stable service instances
  const chatServiceRef = useRef<GeminiChatService | null>(null);
  const sarvamServiceRef = useRef<SarvamAIService | null>(null);
  
  if (!chatServiceRef.current) {
    chatServiceRef.current = new GeminiChatService();
  }
  if (!sarvamServiceRef.current) {
    sarvamServiceRef.current = new SarvamAIService();
  }

  const chatService = chatServiceRef.current;
  const sarvamService = sarvamServiceRef.current;
  const profile = chatService.getProfile();
  
  // State
  const [chatState, setChatState] = useState({
    isOpen: false,
    isMinimized: false
  });
  
  const [voiceState, setVoiceState] = useState({
    isPlaying: false,
    isVoiceEnabled: false,
    autoSpeak: true
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm an AI assistant here to help you learn about ${profile.name}'s background and experience. Feel free to ask me anything!`,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check voice capability on mount
  useEffect(() => {
    setVoiceState(prev => ({
      ...prev,
      isVoiceEnabled: sarvamService.isVoiceEnabled()
    }));
  }, [sarvamService]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Text-to-speech
  const speakText = useCallback(async (text: string) => {
    if (!voiceState.isVoiceEnabled) {
      console.log('Voice not enabled');
      return;
    }

    try {
      console.log('Starting TTS for:', text.substring(0, 50) + '...');
      setVoiceState(prev => ({ ...prev, isPlaying: true }));
      const audioData = await sarvamService.textToSpeech(text);
      
      if (audioData) {
        console.log('Audio data received, playing...');
        await sarvamService.playAudio(audioData);
        console.log('Audio playback completed');
      } else {
        console.warn('No audio data received from TTS service');
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
    } finally {
      setVoiceState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [voiceState.isVoiceEnabled, sarvamService]);

  // Message handling
  const addMessage = useCallback(async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await chatService.generateResponse(messageText, history);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        hasAudio: voiceState.isVoiceEnabled
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Auto-speak if enabled
      if (voiceState.isVoiceEnabled && voiceState.autoSpeak) {
        setTimeout(() => speakText(response), 500);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, chatService, voiceState, speakText]);

  // Chat controls
  const openChat = useCallback(() => {
    setChatState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeChat = useCallback(() => {
    setChatState(prev => ({ ...prev, isOpen: false, isMinimized: false }));
  }, []);

  const toggleMinimize = useCallback(() => {
    setChatState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hello! I'm an AI assistant here to help you learn about ${profile.name}'s background and experience. Feel free to ask me anything!`,
        timestamp: new Date()
      }
    ]);
  }, [profile.name]);

  const sendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;
    
    await addMessage(trimmedInput);
    setInputValue('');
  }, [inputValue, isLoading, addMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const toggleAutoSpeak = useCallback(() => {
    setVoiceState(prev => ({ ...prev, autoSpeak: !prev.autoSpeak }));
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (chatState.isOpen && !chatState.isMinimized) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [chatState.isOpen, chatState.isMinimized]);

  return (
    <div className={className}>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!chatState.isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                onClick={openChat}
                className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                size="icon"
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {chatState.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: chatState.isMinimized ? 80 : 580 
            }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[420px]"
          >
            <div className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-base">
                        Chat with Pranav
                      </h3>
                      <p className="text-slate-300 text-sm">
                        SarvamAI • Gemini
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {voiceState.isVoiceEnabled && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleAutoSpeak}
                        className="h-9 w-9 hover:bg-white/10 rounded-lg text-white/80 hover:text-white"
                        title={voiceState.autoSpeak ? "Disable auto-speak" : "Enable auto-speak"}
                      >
                        {voiceState.autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMinimize}
                      className="h-9 w-9 hover:bg-white/10 rounded-lg text-white/80 hover:text-white"
                    >
                      {chatState.isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeChat}
                      className="h-9 w-9 hover:bg-white/10 rounded-lg text-white/80 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Chat Content */}
              <AnimatePresence>
                {!chatState.isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Messages */}
                    <div className="h-[420px] bg-gray-50/50">
                      <ScrollArea className="h-full p-4">
                        <div className="space-y-3">
                          {messages.map((message, index) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`flex items-end gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                                  message.role === 'user' 
                                    ? 'bg-blue-500' 
                                    : 'bg-white border border-gray-200'
                                }`}>
                                  {message.role === 'user' ? 
                                    <User className="h-4 w-4 text-white" /> : 
                                    <Bot className="h-4 w-4 text-gray-600" />
                                  }
                                </div>
                                
                                <div className={`rounded-2xl px-4 py-3 shadow-sm max-w-full ${
                                  message.role === 'user' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-white border border-gray-100 text-gray-800'
                                }`}>
                                  <div className="flex items-start justify-between gap-3">
                                    <p className="text-sm leading-relaxed flex-1">{message.content}</p>
                                    {message.hasAudio && message.role === 'assistant' && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 shrink-0 hover:bg-gray-100 rounded-lg"
                                        onClick={() => speakText(message.content)}
                                        disabled={voiceState.isPlaying}
                                      >
                                        <Volume2 className="h-3 w-3 text-blue-500" />
                                      </Button>
                                    )}
                                  </div>
                                  <p className={`text-xs mt-2 ${
                                    message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                                  }`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          
                          {/* Loading indicator */}
                          {isLoading && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex justify-start"
                            >
                              <div className="flex items-end gap-2">
                                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                                  <div className="flex gap-1">
                                    <motion.div 
                                      className="w-2 h-2 bg-gray-400 rounded-full"
                                      animate={{ y: [0, -4, 0] }}
                                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.div 
                                      className="w-2 h-2 bg-gray-400 rounded-full"
                                      animate={{ y: [0, -4, 0] }}
                                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                                    />
                                    <motion.div 
                                      className="w-2 h-2 bg-gray-400 rounded-full"
                                      animate={{ y: [0, -4, 0] }}
                                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                        <div ref={messagesEndRef} />
                      </ScrollArea>
                    </div>
                      
                    {/* Input Section */}
                    <div className="p-4 bg-white border-t border-gray-100">
                      <div className="flex gap-3 items-center">
                        <Input
                          ref={inputRef}
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyPress}
                          placeholder="Type a message..."
                          className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-full py-3 px-4 bg-gray-50 focus:bg-white transition-all duration-200"
                          disabled={isLoading}
                        />
                        
                        <Button
                          onClick={sendMessage}
                          disabled={!inputValue.trim() || isLoading}
                          size="icon"
                          className="h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                        >
                          <Send className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceChatbot;
