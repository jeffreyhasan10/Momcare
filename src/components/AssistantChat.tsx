
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, X, Minimize, Maximize, Send, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const welcomeMessage = {
  id: "welcome",
  role: "assistant" as const,
  content: "Hello! I'm your MomCare assistant. I can help you navigate the app, answer questions about maternal health, or provide resources. What would you like help with today?",
  timestamp: new Date()
};

const AssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    
    if (!isOpen) {
      // Show a welcome toast when opening chat for the first time
      toast({
        title: "MomCare Assistant",
        description: "Ask me anything about maternal health or navigating the app!",
        duration: 3000,
      });
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      processUserInput(input);
      setIsTyping(false);
    }, 1000);
  };
  
  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Enhanced rule-based responses
    let response = "";
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      response = "Hello! How can I help you today with your maternal health journey?";
    } 
    else if (lowerInput.includes("track") || lowerInput.includes("tracking")) {
      response = "You can track various aspects of your and your baby's health in the Tracking section. Would you like me to guide you there?";
    }
    else if (lowerInput.includes("resource")) {
      response = "Our Resources section has articles, videos, and guides on pregnancy, postpartum care, and infant development. Check it out in the main navigation!";
    }
    else if (lowerInput.includes("community")) {
      response = "Connect with other parents in our Community section. You can join groups, ask questions, and share experiences.";
    }
    else if (lowerInput.includes("emergency")) {
      response = "If you're experiencing a medical emergency, please call emergency services immediately. Our Emergency section has guidelines for common maternal and infant emergencies.";
    }
    else if (lowerInput.includes("profile")) {
      response = "You can update your profile information, including your and your baby's details, in the Profile section accessible from the top right menu.";
    }
    else if (lowerInput.includes("wellness")) {
      response = "Our Wellness section offers mental health resources, self-care tips, and wellbeing tracking specifically for new mothers.";
    }
    else if (lowerInput.includes("what is momcare") || lowerInput.includes("about")) {
      response = "MomCare is a comprehensive platform designed to support mothers through pregnancy and early parenthood. We offer tracking tools, resources, community support, and personalized guidance for your maternal journey.";
    }
    else if (lowerInput.includes("help") || lowerInput.includes("guide")) {
      response = "I can help you navigate MomCare! Would you like to learn about tracking your baby's growth, finding resources, connecting with other moms, or something else?";
    }
    else if (lowerInput.includes("sign") || lowerInput.includes("login") || lowerInput.includes("account")) {
      response = "You can sign in or create an account by clicking the Sign In button in the top right corner. Having an account allows you to save your tracking data, join community discussions, and personalize your experience.";
    }
    else if (lowerInput.includes("thank")) {
      response = "You're welcome! I'm here to help anytime you need assistance. Is there anything else I can help you with today?";
    }
    else {
      response = "I'm here to help with questions about MomCare, maternal health, baby development, and navigating parenthood. Could you clarify what you're looking for?";
    }
    
    const assistantMessage = {
      id: Date.now().toString(),
      role: "assistant" as const,
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };

  return (
    <>
      {/* Chat button with animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={toggleChat}
          className={cn(
            "rounded-full p-3 shadow-lg transition-all duration-300",
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-pink-500 hover:bg-pink-600"
          )}
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <div className="relative">
              <Bot size={24} />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-3 h-3"
              />
            </div>
          )}
        </Button>
      </motion.div>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-20 right-4 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-40 border border-gray-200",
              isMinimized && "h-auto"
            )}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-pink-200">
                  <AvatarFallback className="text-pink-600 flex items-center justify-center">
                    <Sparkles size={16} />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">MomCare Assistant</h3>
                  {!isMinimized && <p className="text-xs text-pink-100">How can I help you?</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-pink-100 hover:text-white hover:bg-pink-600"
                  onClick={toggleMinimize}
                >
                  {isMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
                </Button>
              </div>
            </div>
            
            {/* Messages area */}
            {!isMinimized && (
              <div className="h-[360px] overflow-y-auto p-4 bg-slate-50">
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "mb-4 max-w-[80%]",
                      msg.role === "user" ? "ml-auto" : "mr-auto"
                    )}
                  >
                    <div 
                      className={cn(
                        "rounded-lg p-3",
                        msg.role === "user" 
                          ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-br-none" 
                          : "bg-white border border-gray-200 rounded-bl-none shadow-sm"
                      )}
                    >
                      {msg.content}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 max-w-[80%]"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 flex gap-1">
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                        className="w-2 h-2 bg-pink-300 rounded-full" 
                      />
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        className="w-2 h-2 bg-pink-500 rounded-full" 
                      />
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        className="w-2 h-2 bg-purple-500 rounded-full" 
                      />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
            
            {/* Input area */}
            {!isMinimized && (
              <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 focus-visible:ring-pink-500"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                  disabled={!input.trim()}
                >
                  <Send size={18} />
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AssistantChat;
