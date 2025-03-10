import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import ChatHistory from './ChatHistory';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { modelResponses, voiceConfigs, welcomeMessages } from '../utlis/chatUtils';

const ChatInterface = ({ initialModel = 'mom', showSidebar = true, toggleSidebar = () => {} }) => {
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current?.focus();
    
    const mockConversations = [
      {
        id: '1',
        title: 'School Problems',
        lastMessage: 'I think I should talk to my teacher about it.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        model: 'mom'
      },
      {
        id: '2',
        title: 'Weekend Plans',
        lastMessage: "Let's go fishing on Saturday!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        model: 'dad'
      },
      {
        id: '3',
        title: 'New Video Game',
        lastMessage: "I'll show you how to play it next time I see you.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        model: 'sibling'
      },
      {
        id: '4',
        title: 'Family Story',
        lastMessage: "That's how your grandfather met your grandmother.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
        model: 'grandparent'
      }
    ];
    
    setConversations(mockConversations);
    setActiveConversationId('new');
    
    const newConversationMessage = {
      id: '1',
      content: welcomeMessages[selectedModel],
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages([newConversationMessage]);

    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, [selectedModel]);
  
  // Filter conversations based on the selected model
  const filteredConversations = conversations.filter(
    conversation => conversation.model === selectedModel
  );
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    
    if (messages.length === 1 && messages[0].sender === 'bot') {
      const newConversation = {
        id: Date.now().toString(),
        title: inputValue.slice(0, 30) + (inputValue.length > 30 ? '...' : ''),
        lastMessage: inputValue,
        timestamp: new Date(),
        model: selectedModel
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversationId(newConversation.id);
    }
    
    setTimeout(() => {
      const responses = modelResponses[selectedModel];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const newBotMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
      
      setConversations(prev => 
        prev.map(conv => 
          conv.id === activeConversationId 
            ? {...conv, lastMessage: randomResponse, timestamp: new Date()}
            : conv
        )
      );
    }, 1500);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    startNewConversation();
  };

  const toggleSpeaker = () => {
    setIsSpeakerEnabled(!isSpeakerEnabled);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const startNewConversation = () => {
    setMessages([]);
    setActiveConversationId('new');
    
    setTimeout(() => {
      const newMessage = {
        id: Date.now().toString(),
        content: welcomeMessages[selectedModel],
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages([newMessage]);
    }, 100);
  };
  
  const loadConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    
    const selectedConversation = conversations.find(c => c.id === conversationId);
    
    // Generate mock messages based on the selected conversation
    const mockMessages = [
      {
        id: '1',
        content: welcomeMessages[selectedModel],
        sender: 'bot',
        timestamp: new Date(Date.now() - 1000 * 60 * 10)
      },
      {
        id: '2',
        content: selectedConversation?.title || "I need some advice.",
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 9)
      },
      {
        id: '3',
        content: "I'm here to listen. Tell me more about what's going on.",
        sender: 'bot',
        timestamp: new Date(Date.now() - 1000 * 60 * 8)
      },
      {
        id: '4',
        content: "It's been a challenging situation and I'm not sure what to do next.",
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 7)
      },
      {
        id: '5',
        content: selectedConversation?.lastMessage || "Let's think through this together. What options have you considered so far?",
        sender: 'bot',
        timestamp: new Date(Date.now() - 1000 * 60 * 6)
      }
    ];
    
    setMessages(mockMessages);
  };

  const getVoiceConfig = () => {
    return voiceConfigs[selectedModel];
  };
  
  const getBgClass = () => isDarkMode ? 'bg-[#0c1317]' : 'bg-[#efeae2]';
  const getSidebarBgClass = () => isDarkMode ? 'bg-[#111b21]' : 'bg-white';
  const getBorderClass = () => isDarkMode ? 'border-[#222e35]' : 'border-[#d1d7db]';

  return (
    <div className={`flex h-full w-full ${getBgClass()} transition-colors duration-300`}>
      {showSidebar && (
        <div className={`w-80 ${getSidebarBgClass()} flex flex-col transition-colors duration-300 border-r ${getBorderClass()}`}>
          <div className={`p-3 ${getSidebarBgClass()} flex justify-between items-center border-b ${getBorderClass()}`}>
            <button 
              onClick={startNewConversation}
              className={`w-full py-2 px-3 ${isDarkMode ? 'bg-[#00a884] hover:bg-opacity-90' : 'bg-[#00a884] hover:bg-opacity-90'} rounded-md text-white text-sm flex items-center justify-center gap-2 transition-colors`}
            >
              <MessageSquare className="w-4 h-4" />
              New Chat
            </button>
            <button
              onClick={toggleSidebar}
              className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-[#54656f]'} hover:text-[#00a884] rounded-md`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-2">
            <ChatHistory 
              conversations={filteredConversations}
              activeConversationId={activeConversationId}
              onSelectConversation={loadConversation}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        <ChatHeader 
          selectedModel={selectedModel}
          isTyping={isTyping}
          isSpeakerEnabled={isSpeakerEnabled}
          isDarkMode={isDarkMode}
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
          toggleSpeaker={toggleSpeaker}
          toggleTheme={toggleTheme}
          handleModelChange={handleModelChange}
        />
        
        <ChatMessages 
          messages={messages}
          isTyping={isTyping}
          selectedModel={selectedModel}
          isSpeakerEnabled={isSpeakerEnabled}
          isDarkMode={isDarkMode}
          voiceConfig={getVoiceConfig()}
        />
        
        <ChatInput 
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default ChatInterface;