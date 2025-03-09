import { useState, useRef, useEffect } from 'react';
import { Send, User, Volume2, VolumeX, MessageSquare, AlignJustify, X, Sun, Moon, Paperclip, Mic } from 'lucide-react';
import ModelSelector from './ModelSelector';
import AudioMessage from './AudioMessage';
import ChatHistory from './ChatHistory';

const modelResponses = {
  mom: [
    "I'm so proud of everything you're accomplishing. Tell me more about your day.",
    "You know you can always talk to me about anything that's on your mind, dear.",
    "Remember to take care of yourself. Have you been eating well and getting enough rest?",
    "I believe in you completely. You have so many wonderful qualities.",
    "It's okay to feel that way. Your emotions are valid and important."
  ],
  dad: [
    "That's interesting. What do you think is the next step forward?",
    "You've got this. I've seen how capable you are when you set your mind to something.",
    "Let's think through this together. There's always a solution.",
    "I'm here if you need any practical advice or just someone to listen.",
    "Sometimes the challenging moments teach us the most important lessons."
  ],
  sibling: [
    "I totally get what you mean. I've been in similar situations.",
    "Want to hear something funny that happened to me the other day?",
    "You know what might help? Taking a break and doing something fun for a while.",
    "I'm always here for you, no matter what. That's what siblings are for.",
    "Have you tried looking at it from this perspective? Just a thought."
  ],
  grandparent: [
    "In my experience, these things have a way of working themselves out with time.",
    "Would you like to hear a story from when I was your age?",
    "You remind me so much of your mother/father when they were younger.",
    "Life is full of beautiful moments. Remember to pause and appreciate them.",
    "Your generation has so many opportunities. I'm excited to see what you'll accomplish."
  ]
};

const voiceConfigs = {
  mom: {
    name: 'Female voice',
    rate: 1.0,
    pitch: 1.2
  },
  dad: {
    name: 'Male voice',
    rate: 0.9,
    pitch: 0.8
  },
  sibling: {
    name: 'Young voice',
    rate: 1.1,
    pitch: 1.1
  },
  grandparent: {
    name: 'Elder voice',
    rate: 0.8,
    pitch: 1.0
  }
};

const ChatInterface = ({ initialModel = 'mom', showSidebar = true, toggleSidebar }) => {
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    inputRef.current?.focus();
    
    const welcomeMessages = {
      mom: "Hi sweetie! How are you doing today? I'm here if you want to talk about anything.",
      dad: "Hey there! How's everything going? I'm here if you need any advice or just want to chat.",
      sibling: "What's up? Got anything cool going on? I'm all ears!",
      grandparent: "Hello, my dear! It's so wonderful to talk with you. How have you been?"
    };
    
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

    // Check for dark mode preference on client-side
    if (typeof window !== 'undefined') {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, [selectedModel]);
  
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
    
    const welcomeMessages = {
      mom: "Hi sweetie! How are you doing today? I'm here if you want to talk about anything.",
      dad: "Hey there! How's everything going? I'm here if you need any advice or just want to chat.",
      sibling: "What's up? Got anything cool going on? I'm all ears!",
      grandparent: "Hello, my dear! It's so wonderful to talk with you. How have you been?"
    };
    
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
    
    const mockMessages = [
      {
        id: '1',
        content: "Hi, what's on your mind today?",
        sender: 'bot',
        timestamp: new Date(Date.now() - 1000 * 60 * 10)
      },
      {
        id: '2',
        content: conversations.find(c => c.id === conversationId)?.title || "I need some advice.",
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
        content: conversations.find(c => c.id === conversationId)?.lastMessage || "Let's think through this together. What options have you considered so far?",
        sender: 'bot',
        timestamp: new Date(Date.now() - 1000 * 60 * 6)
      }
    ];
    
    setMessages(mockMessages);
  };

  const getModelColorClass = () => {
    switch (selectedModel) {
      case 'mom': return 'bg-[#E8A87C]';
      case 'dad': return 'bg-family-deep-blue';
      case 'sibling': return 'bg-[#5D9BD5]';
      case 'grandparent': return 'bg-[#D6A2E8]';
      default: return 'bg-family-deep-blue';
    }
  };

  const getModelAvatar = () => {
    return selectedModel.charAt(0).toUpperCase();
  };

  const getVoiceConfig = () => {
    return voiceConfigs[selectedModel];
  };
  
  const getBgClass = () => isDarkMode ? 'bg-[#0c1317]' : 'bg-[#efeae2]';
  const getChatBgClass = () => isDarkMode ? 'bg-[#0c1317]' : 'bg-[#efeae2]';
  const getTextClass = () => isDarkMode ? 'text-white' : 'text-[#111b21]';
  const getSecondaryTextClass = () => isDarkMode ? 'text-gray-300' : 'text-[#54656f]';
  const getSidebarBgClass = () => isDarkMode ? 'bg-[#111b21]' : 'bg-white';
  const getBorderClass = () => isDarkMode ? 'border-[#222e35]' : 'border-[#d1d7db]';
  const getInputBgClass = () => isDarkMode ? 'bg-[#2a3942]' : 'bg-white';
  const getButtonHoverClass = () => isDarkMode ? 'hover:bg-[#222e35]' : 'hover:bg-gray-100';
  const getUserBubbleClass = () => isDarkMode ? 'bg-[#005c4b]' : 'bg-[#d9fdd3]';
  const getBotBubbleClass = () => isDarkMode ? 'bg-[#202c33]' : 'bg-white';

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
              className={`p-2 ${getSecondaryTextClass()} hover:text-[#00a884] rounded-md`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-2">
            <ChatHistory 
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={loadConversation}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        <div className={`p-3 ${getSidebarBgClass()} flex items-center justify-between border-b ${getBorderClass()} transition-colors duration-300`}>
          <div className="flex items-center">
            {!showSidebar && (
              <button 
                onClick={toggleSidebar}
                className={`mr-3 p-2 ${getSecondaryTextClass()} hover:text-[#00a884] rounded-full ${getButtonHoverClass()}`}
                aria-label="Show sidebar"
              >
                <AlignJustify className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full ${getModelColorClass()} flex items-center justify-center text-white font-bold text-lg`}>
                {getModelAvatar()}
              </div>
              <div>
                <p className={`font-medium ${getTextClass()}`}>
                  {selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1)}
                </p>
                {isTyping ? (
                  <p className={`text-xs ${getSecondaryTextClass()}`}>typing...</p>
                ) : (
                  <p className={`text-xs ${getSecondaryTextClass()}`}>online</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className={`p-2 ${getSecondaryTextClass()} hover:text-[#00a884] rounded-full ${getButtonHoverClass()} transition-colors`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={toggleSpeaker}
              className={`p-2 ${getSecondaryTextClass()} hover:text-[#00a884] rounded-full ${getButtonHoverClass()} transition-colors`}
              aria-label={isSpeakerEnabled ? "Disable speaker" : "Enable speaker"}
            >
              {isSpeakerEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
            <div className="mx-2">
              <ModelSelector selectedModel={selectedModel} onSelectModel={handleModelChange} />
            </div>
          </div>
        </div>
        
        <div 
          className={`flex-1 overflow-y-auto ${getChatBgClass()} bg-repeat transition-colors duration-300`}
          style={{
            backgroundImage: `${isDarkMode ? 
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='126' height='126' viewBox='0 0 126 126'%3E%3Cpath d='M99.02 95.03c-.13.27-.2.56-.2.86 0 .21.03.41.09.6l-2.1.78c-.48.18-.79.64-.79 1.15 0 .51.31.97.79 1.15l8.34 3.12c.09.03.19.05.29.05.15 0 .3-.04.43-.11.23-.13.4-.34.48-.59l.84-2.75c.16.01.33-.01.49-.02l1.67 2.35c.26.37.7.58 1.14.54.45-.04.84-.33 1.02-.74l3.09-7.1c.2-.46.11-1-.22-1.37-.33-.37-.86-.51-1.33-.35l-2.86 1c-.11-.13-.23-.26-.37-.36l.62-2.27c.13-.47-.01-.98-.37-1.3-.36-.33-.87-.41-1.3-.22l-8.57 3.2c-.47.18-.77.62-.79 1.12-.02.5.26.96.71 1.16zM63.93 44.9l-1.77 1.39c-.34.27-.51.7-.44 1.13.08.43.39.78.81.91l5.15 1.61c.09.03.19.04.29.04.2 0 .4-.06.58-.17.26-.16.44-.41.51-.7l1.14-5.27c.07-.32 0-.66-.2-.93-.2-.27-.5-.45-.84-.5l-2-.28c.02-.16.03-.31.01-.47l2.67-.98c.4-.15.69-.5.76-.92.07-.42-.1-.85-.43-1.11l-5.19-3.97c-.26-.2-.6-.28-.92-.2-.32.07-.6.29-.75.58l-1.06 2.07c-.15-.04-.3-.06-.46-.05l-1.87-2.2c-.29-.35-.76-.5-1.2-.39-.44.11-.77.44-.89.88l-1.32 5.01c-.14.54.1 1.1.58 1.37.48.27 1.09.17 1.46-.23l1.22-1.31c.11.08.22.16.34.21l-.64 2.45c-.12.46.05.95.44 1.23.39.29.92.31 1.32.07zM49.3 88.58l1.75-1.41c.33-.27.5-.7.43-1.12-.07-.43-.38-.78-.8-.91l-5.19-1.65c-.29-.09-.59-.06-.86.09-.27.15-.46.4-.53.7l-1.18 5.27c-.07.32 0 .66.19.93.2.27.5.45.84.5l2 .29c-.02.16-.03.31-.01.47l-2.67.99c-.4.15-.69.5-.76.92-.07.42.1.85.43 1.11l5.15 3.95c.16.12.34.19.53.19.13 0 .26-.03.39-.09.32-.14.56-.41.65-.75l.74-2.82c.15.04.3.06.46.05l1.87 2.2c.21.25.52.39.85.39.12 0 .23-.02.34-.06.44-.15.77-.54.85-1.01l.6-3.49c.03-.17.02-.34 0-.5l-.4-2.88c-.08-.54-.48-.95-1-.99-.53-.04-.99.3-1.14.82l-.49 1.62c-.11-.08-.22-.16-.34-.21zM33.27 73.11l1.78-1.39c.34-.27.51-.7.44-1.13-.08-.43-.39-.78-.81-.91l-5.15-1.61c-.09-.03-.19-.04-.29-.04-.2 0-.4.06-.58.17-.26.16-.44.41-.51.7l-1.14 5.27c-.07.32 0 .66.2.93.2.27.5.45.84.5l2 .28c-.02.16-.03.31-.01.47l-2.67.98c-.4.15-.69.5-.76.92-.07.42.1.85.43 1.11l5.19 3.97c.16.12.35.19.54.19.13 0 .26-.03.39-.09.32-.07.6-.29.75-.58l1.06-2.07c.15.04.3.06.46.05l1.87 2.2c.21.25.52.39.85.39.12 0 .24-.02.35-.06.44-.11.77-.44.89-.88l1.32-5.01c.14-.54-.1-1.1-.58-1.37-.48-.27-1.09-.17-1.46.23l-1.22 1.31c-.11-.08-.22-.16-.34-.21l.64-2.45c.12-.46-.05-.95-.44-1.23-.39-.29-.92-.31-1.32-.07zM82.32 54.59l-1.77 1.39c-.34.27-.51.7-.44 1.13.08.43.39.78.81.91l5.15 1.61c.09.03.19.04.29.04.2 0 .4-.06.58-.17.26-.16.44-.41.51-.7l1.14-5.27c.07-.32 0-.66-.2-.93-.2-.27-.5-.45-.84-.5l-2-.28c.02-.16.03-.31.01-.47l2.67-.98c.4-.15.69-.5.76-.92.07-.42-.1-.85-.43-1.11L83.37 45c-.26-.2-.6-.28-.92-.2-.32.07-.6.29-.75.58l-1.06 2.07c-.15-.04-.3-.06-.46-.05l-1.87-2.2c-.29-.35-.76-.5-1.2-.39-.44.11-.77.44-.89.88l-1.32 5.01c-.14.54.1 1.1.58 1.37.48.27 1.09.17 1.46-.23l1.22-1.31c.11.08.22.16.34.21l-.64 2.45c-.12.46.05.95.44 1.23.39.29.92.31 1.32.07z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E\")" : 
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='126' height='126' viewBox='0 0 126 126'%3E%3Cpath d='M99.02 95.03c-.13.27-.2.56-.2.86 0 .21.03.41.09.6l-2.1.78c-.48.18-.79.64-.79 1.15 0 .51.31.97.79 1.15l8.34 3.12c.09.03.19.05.29.05.15 0 .3-.04.43-.11.23-.13.4-.34.48-.59l.84-2.75c.16.01.33-.01.49-.02l1.67 2.35c.26.37.7.58 1.14.54.45-.04.84-.33 1.02-.74l3.09-7.1c.2-.46.11-1-.22-1.37-.33-.37-.86-.51-1.33-.35l-2.86 1c-.11-.13-.23-.26-.37-.36l.62-2.27c.13-.47-.01-.98-.37-1.3-.36-.33-.87-.41-1.3-.22l-8.57 3.2c-.47.18-.77.62-.79 1.12-.02.5.26.96.71 1.16zM63.93 44.9l-1.77 1.39c-.34.27-.51.7-.44 1.13.08.43.39.78.81.91l5.15 1.61c.09.03.19.04.29.04.2 0 .4-.06.58-.17.26-.16.44-.41.51-.7l1.14-5.27c.07-.32 0-.66-.2-.93-.2-.27-.5-.45-.84-.5l-2-.28c.02-.16.03-.31.01-.47l2.67-.98c.4-.15.69-.5.76-.92.07-.42-.1-.85-.43-1.11l-5.19-3.97c-.26-.2-.6-.28-.92-.2-.32.07-.6.29-.75.58l-1.06 2.07c-.15-.04-.3-.06-.46-.05l-1.87-2.2c-.29-.35-.76-.5-1.2-.39-.44.11-.77.44-.89.88l-1.32 5.01c-.14.54.1 1.1.58 1.37.48.27 1.09.17 1.46-.23l1.22-1.31c.11.08.22.16.34.21l-.64 2.45c-.12.46.05.95.44 1.23.39.29.92.31 1.32.07z' fill='%23000000' fill-opacity='0.04'/%3E%3C/svg%3E\")"}`
          }}
        >
          <div className="max-w-3xl mx-auto h-full px-4 py-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${getTextClass()} transition-colors duration-300 mb-4`}
              >
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${message.sender === 'user' ? getUserBubbleClass() : getBotBubbleClass()} 
                    p-2 px-3 rounded-lg max-w-[75%] shadow-sm ${message.sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                    <div className={`flex ${message.sender === 'bot' ? 'items-start' : ''}`}>
                      {message.sender === 'bot' && (
                        <div className={`w-8 h-8 rounded-full ${getModelColorClass()} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mr-3 hidden`}>
                          {getModelAvatar()}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        {message.sender === 'bot' && (
                          <p className={`font-medium text-sm mb-1 ${isDarkMode ? 'text-[#00a884]' : 'text-[#00a884]'} hidden`}>
                            {selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1)}
                          </p>
                        )}
                        <div className="prose max-w-none">
                          <p className={`${message.sender === 'user' ? (isDarkMode ? 'text-white' : 'text-[#111b21]') : (isDarkMode ? 'text-white' : 'text-[#111b21]')}`}>
                            {message.content}
                          </p>
                        </div>
                        {message.sender === 'bot' && isSpeakerEnabled && (
                          <AudioMessage 
                            text={message.content} 
                            messageId={message.id} 
                            voiceConfig={getVoiceConfig()}
                            isDarkMode={isDarkMode}
                          />
                        )}
                        <div className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-[#667781]'} text-right mt-1`}>
                          {message.timestamp.getHours()}:{String(message.timestamp.getMinutes()).padStart(2, '0')}
                          {message.sender === 'user' && (
                            <span className="ml-1 text-[#53bdeb]">✓✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className={`${getTextClass()} transition-colors duration-300 mb-4`}>
                <div className="flex justify-start">
                  <div className={`${getBotBubbleClass()} p-4 rounded-lg rounded-tl-none shadow-sm max-w-[75%]`}>
                    <div className="flex items-center justify-center">
                      <div className="flex space-x-2">
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className={`py-2 px-4 ${getSidebarBgClass()} transition-colors duration-300 border-t ${getBorderClass()}`}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center">
              <button className={`p-3 mr-2 rounded-full ${getSecondaryTextClass()} hover:text-[#00a884] ${getButtonHoverClass()}`}>
                <Paperclip className="w-5 h-5" />
              </button>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message"
                  className={`w-full px-4 py-2.5 pr-12 rounded-full ${getInputBgClass()} border-none ${getTextClass()} focus:outline-none transition-colors`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={handleSendMessage}
                  className={`absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full ${!inputValue.trim() ? 'bg-[#00a884]' : 'bg-[#00a884]'} text-white transition-colors`}
                  disabled={!inputValue.trim()}
                >
                  {inputValue.trim() ? (
                    <Send className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;