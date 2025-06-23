import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EnhancedChatService } from "@/services/enhancedChatService";
import { SarvamAIService } from "@/services/sarvamAIService";

import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Sparkles,
  Brain,
  RotateCcw,
  Zap,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Headphones
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasAudio?: boolean;
  audioData?: string;
}

interface VoiceChatbotProps {
  className?: string;
}

const VoiceChatbot: React.FC<VoiceChatbotProps> = ({ className }) => {
  // Stable service instances
  const chatServiceRef = useRef<EnhancedChatService | null>(null);
  const sarvamServiceRef = useRef<SarvamAIService | null>(null);
  
  if (!chatServiceRef.current) {
    chatServiceRef.current = new EnhancedChatService();
  }
  if (!sarvamServiceRef.current) {
    sarvamServiceRef.current = new SarvamAIService();
  }

  const chatService = chatServiceRef.current;
  const sarvamService = sarvamServiceRef.current;
  const profile = chatService.getProfile();
  
  // Chat state
  const [chatState, setChatState] = useState({
    isOpen: false,
    isMinimized: false
  });
  
  // Voice state
  const [voiceState, setVoiceState] = useState({
    isRecording: false,
    isPlaying: false,
    isVoiceEnabled: false,
    autoSpeak: true
  });
  
  // Messages and input
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm ${profile.name}'s AI assistant. I can answer questions about his skills, experience, projects, and background. You can type or use voice input!`,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

  // Chat controls
  const openChat = useCallback(() => {
    setChatState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeChat = useCallback(() => {
    setChatState(prev => ({ ...prev, isOpen: false, isMinimized: false }));
    // Stop any ongoing recording
    if (mediaRecorderRef.current && voiceState.isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setVoiceState(prev => ({ ...prev, isRecording: false }));
    }
  }, [voiceState.isRecording]);

  const toggleMinimize = useCallback(() => {
    setChatState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hi! I'm ${profile.name}'s AI assistant. I can answer questions about his skills, experience, projects, and background. You can type or use voice input!`,
        timestamp: new Date()
      }
    ]);
  }, [profile.name]);

  // Voice recording
  const startRecording = useCallback(async () => {
    try {
      const mediaRecorder = await sarvamService.startRecording();
      if (!mediaRecorder) {
        alert('Unable to access microphone. Please check permissions.');
        return;
      }

      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const wavBlob = await sarvamService.convertToWav(audioBlob);
        
        setIsLoading(true);
        const transcript = await sarvamService.speechToText(wavBlob);
        
        if (transcript) {
          setInputValue(transcript);
          // Note: User can manually send or auto-send will be handled elsewhere
        } else {
          alert('Could not transcribe audio. Please try again.');
        }
        setIsLoading(false);
      };

      mediaRecorder.start();
      setVoiceState(prev => ({ ...prev, isRecording: true }));
    } catch (error) {
      console.error('Recording error:', error);
      alert('Recording failed. Please try again.');
    }
  }, [sarvamService, setInputValue, setIsLoading]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && voiceState.isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setVoiceState(prev => ({ ...prev, isRecording: false }));
    }
  }, [voiceState.isRecording]);

  // Text-to-speech
  const speakText = useCallback(async (text: string) => {
    if (!voiceState.isVoiceEnabled) return;

    try {
      setVoiceState(prev => ({ ...prev, isPlaying: true }));
      const audioData = await sarvamService.textToSpeech(text);
      
      if (audioData) {
        await sarvamService.playAudio(audioData);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
    } finally {
      setVoiceState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [voiceState.isVoiceEnabled, sarvamService]);

  // Send message
  const sendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;
    
    await handleSendMessage(trimmedInput);
    setInputValue('');
  }, [inputValue, isLoading, handleSendMessage]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get conversation history
      const history = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await chatService.generateResponse(messageText, history);
      
      // Generate audio for the response if voice is enabled and auto-speak is on
      let audioData: string | undefined;
      if (voiceState.isVoiceEnabled && voiceState.autoSpeak) {
        audioData = await sarvamService.textToSpeech(response) || undefined;
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        hasAudio: !!audioData,
        audioData
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Auto-play audio if enabled
      if (audioData && voiceState.autoSpeak) {
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
  }, [messages, chatService, voiceState, sarvamService, speakText]);

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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={openChat}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="icon"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {voiceState.isVoiceEnabled ? (
                  <Headphones className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                ) : (
                  <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                )}
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {chatState.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: chatState.isMinimized ? 60 : 520 
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-96"
          >
            <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md overflow-hidden">
              {/* Header */}
              <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 ring-2 ring-purple-200 dark:ring-purple-700">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          <Brain className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <motion.div 
                        className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        Voice AI Assistant
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="h-4 w-4 text-purple-600" />
                        </motion.div>
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs flex items-center gap-1">
                        {chatService.isUsingOpenAI() && <Zap className="h-3 w-3" />}
                        {voiceState.isVoiceEnabled && <Headphones className="h-3 w-3" />}
                        Powered by {profile.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {voiceState.isVoiceEnabled && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleAutoSpeak}
                        className="h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                        title={voiceState.autoSpeak ? "Disable auto-speak" : "Enable auto-speak"}
                      >
                        {voiceState.autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearMessages}
                      className="h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                      title="Clear conversation"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMinimize}
                      className="h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                    >
                      {chatState.isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeChat}
                      className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {/* Chat Content */}
              <AnimatePresence>
                {!chatState.isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="p-0">
                      {/* Messages */}
                      <ScrollArea className="h-80 p-4">
                        <div className="space-y-4">
                          {messages.map((message, index) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`flex items-start gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                  <AvatarFallback className={message.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}>
                                    {message.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                                  </AvatarFallback>
                                </Avatar>
                                <motion.div 
                                  className={`rounded-lg p-3 shadow-sm ${
                                    message.role === 'user' 
                                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm leading-relaxed flex-1">{message.content}</p>
                                    {message.hasAudio && message.role === 'assistant' && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 shrink-0"
                                        onClick={() => speakText(message.content)}
                                        disabled={voiceState.isPlaying}
                                      >
                                        <Volume2 className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                  <p className="text-xs opacity-70 mt-1">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </motion.div>
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
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-purple-600">
                                    <Bot className="h-4 w-4 text-white" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                                  <div className="flex gap-1">
                                    <motion.div 
                                      className="w-2 h-2 bg-purple-400 rounded-full"
                                      animate={{ y: [0, -6, 0] }}
                                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.div 
                                      className="w-2 h-2 bg-purple-400 rounded-full"
                                      animate={{ y: [0, -6, 0] }}
                                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                                    />
                                    <motion.div 
                                      className="w-2 h-2 bg-purple-400 rounded-full"
                                      animate={{ y: [0, -6, 0] }}
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
                      
                      {/* Input */}
                      <div className="p-4 border-t bg-gray-50/50 dark:bg-gray-800/50">
                        <div className="flex gap-2">
                          <Input
                            ref={inputRef}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder={`Ask me about ${profile.name}'s skills... ${voiceState.isVoiceEnabled ? '🎤' : ''}`}
                            className="flex-1 border-purple-200 focus:border-purple-400 dark:border-purple-700 dark:focus:border-purple-500"
                            disabled={isLoading}
                          />
                          
                          {/* Voice button */}
                          {voiceState.isVoiceEnabled && (
                            <Button
                              onClick={voiceState.isRecording ? stopRecording : startRecording}
                              disabled={isLoading}
                              size="icon"
                              className={`${
                                voiceState.isRecording 
                                  ? 'bg-red-600 hover:bg-red-700' 
                                  : 'bg-green-600 hover:bg-green-700'
                              } shadow-lg`}
                            >
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                animate={voiceState.isRecording ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 0.5, repeat: voiceState.isRecording ? Infinity : 0 }}
                              >
                                {voiceState.isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                              </motion.div>
                            </Button>
                          )}
                          
                          {/* Send button */}
                          <Button
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            size="icon"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Send className="h-4 w-4" />
                            </motion.div>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceChatbot;
