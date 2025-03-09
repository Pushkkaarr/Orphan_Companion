"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChatInterface from "../components/ChatInterface";
import { ArrowLeft } from "lucide-react";

const ChatBot = () => {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState("mom");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const modelParam = urlParams.get("model");

      if (modelParam && ["mom", "dad", "sibling", "grandparent"].includes(modelParam)) {
        setSelectedModel(modelParam);
      }

      // Check and listen for dark mode preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(mediaQuery.matches);

      const handleChange = (e) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? "bg-[#111b21] text-white" : "bg-[#f0f2f5] text-[#111b21]"}`}>
      <div className={`p-4 flex items-center ${isDarkMode ? "bg-[#202c33] border-[#222e35]" : "bg-[#00a884] text-white"} transition-colors`}>
        <Link href="/Models" className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-white/80 hover:text-white"} transition-colors`}>
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-lg font-medium mx-auto">FamilyConnect</h1>
      </div>

      <div className="flex-1 overflow-hidden flex">
        <ChatInterface initialModel={selectedModel} showSidebar={showSidebar} toggleSidebar={() => setShowSidebar(!showSidebar)} />
      </div>
    </div>
  );
};

export default ChatBot;
