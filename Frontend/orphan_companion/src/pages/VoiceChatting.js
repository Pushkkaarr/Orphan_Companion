import React, { useState, useEffect } from 'react';
import AvatarSelection from '@/components/AvatarSelection';
import FamilyAvatar from '@/components/FamilyAvatar';
import VoiceInteraction from '@/components/VoiceInteraction';
import ConversationDisplay from '@/components/ConversationDisplay';
import { sendMessage } from '@/utlis/apiService';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

const VoiceChatting = () => {
  const [currentAvatar, setCurrentAvatar] = useState('mother');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState([]);

  // Simulated welcome message when changing avatars
  useEffect(() => {
    const welcomeMessages = {
      mother: "Hello, sweetheart. It's so good to see you. How are you doing today?",
      father: "Hey there! I was just thinking about you. What's been going on?",
      sister: "Hey you! I've missed talking to you. What's new?",
      brother: "What's up? It's been a while. How have you been?"
    };

    // Add welcome message
    const welcomeMsg = {
      id: uuidv4(),
      text: welcomeMessages[currentAvatar],
      sender: 'avatar',
      timestamp: new Date()
    };

    setMessages([welcomeMsg]);
    
    // Animate speaking
    setIsSpeaking(true);
    const timer = setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentAvatar]);

  const handleAvatarChange = (avatar) => {
    setCurrentAvatar(avatar);
  };

  const handleUserMessage = async (messageText) => {
    if (!messageText.trim()) return;
    
    // Add user message to conversation
    const userMessage = {
      id: uuidv4(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Send message to backend API
      const response = await sendMessage(messageText, currentAvatar);
      
      // Add avatar response to conversation
      const avatarMessage = {
        id: uuidv4(),
        text: response,
        sender: 'avatar',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, avatarMessage]);
      
      // Animate avatar speaking
      setIsSpeaking(true);
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    } catch (error) {
      toast.error("Sorry, I couldn't process your message. Please try again.");
      console.error("Error processing message:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cream-200 rounded-full opacity-20 filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cream-300 rounded-full opacity-20 filter blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        <header className="w-full flex justify-center mb-8">
          <h1 className="text-3xl font-light text-cream-600">
            Family <span className="font-semibold">Comfort</span>
          </h1>
        </header>
        
        <AvatarSelection 
          currentAvatar={currentAvatar} 
          onSelectAvatar={handleAvatarChange} 
        />
        
        <div className="w-full max-w-4xl mx-auto mt-4">
          <FamilyAvatar 
            familyMember={currentAvatar} 
            isSpeaking={isSpeaking} 
          />
          
          <VoiceInteraction 
            onUserMessage={handleUserMessage} 
            isProcessing={isProcessing} 
          />
        </div>
        
        <ConversationDisplay 
          messages={messages} 
          familyMember={currentAvatar} 
        />
      </div>
    </div>
  );
};

export default VoiceChatting;
