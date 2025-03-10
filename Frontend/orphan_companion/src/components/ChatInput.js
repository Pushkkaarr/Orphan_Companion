import { useRef } from 'react';
import { Paperclip, Send, Mic, Smile } from 'lucide-react';

const ChatInput = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleKeyPress,
  isDarkMode 
}) => {
  const inputRef = useRef(null);
  
  const getSecondaryTextClass = () => isDarkMode ? 'text-gray-300' : 'text-[#54656f]';
  const getSidebarBgClass = () => isDarkMode ? 'bg-[#111b21]' : 'bg-white';
  const getBorderClass = () => isDarkMode ? 'border-[#222e35]' : 'border-[#d1d7db]';
  const getInputBgClass = () => isDarkMode ? 'bg-[#2a3942]' : 'bg-white';
  const getButtonHoverClass = () => isDarkMode ? 'hover:bg-[#222e35]' : 'hover:bg-gray-100';
  const getTextClass = () => isDarkMode ? 'text-white' : 'text-[#111b21]';

  return (
    <div className={`py-2 px-4 ${getSidebarBgClass()} transition-colors duration-300 border-t ${getBorderClass()}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-full ${getSecondaryTextClass()} hover:text-[#00a884] ${getButtonHoverClass()}`}>
            <Smile className="w-5 h-5" />
          </button>
          
          <button className={`p-2 rounded-full ${getSecondaryTextClass()} hover:text-[#00a884] ${getButtonHoverClass()}`}>
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message"
              className={`w-full px-4 py-2.5 rounded-full ${getInputBgClass()} border-none ${getTextClass()} focus:outline-none transition-colors`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            className={`p-2 rounded-full ${!inputValue.trim() ? 'bg-[#00a884]' : 'bg-[#00a884]'} text-white transition-colors`}
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
  );
};

export default ChatInput;
