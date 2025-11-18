import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send } from "lucide-react";
import { Button } from "./ui/Button.jsx";
import { Input } from "./ui/Input.jsx";

const suggestedQuestions = [
  "How does piezoelectric charging work?",
  "What are the installation requirements?",
  "How much can I save with AutoCharge?",
];

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  // This initial message is important for the bot's first turn
  const initialBotMessage = {
    role: "bot",
    content: "Hi there! 👋 I'm AutoCharge Assistant. How can I help you learn about our revolutionary EV charging technology today?",
  };
  
  const [messages, setMessages] = useState([initialBotMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // This is the main function to send the chat history to the backend
  const getBotResponse = async (history) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Uncomment if you add auth
        },
        // Send the ENTIRE history
        body: JSON.stringify({ history: history }) 
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Network response was not ok');
      }

      const data = await response.json();
      const botResponse = {
        role: "bot",
        content: data.reply || "Sorry, I couldn't get a response."
      };
      // Add the new bot response to the history
      setMessages((prev) => [...prev, botResponse]);

    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      const errorResponse = {
        role: "bot",
        content: `Sorry, I'm having trouble connecting. Error: ${error.message}`
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // This function runs when you press the "Send" button
  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages); // Add the user's message to the UI
    setInput(""); // Clear the input
    getBotResponse(newMessages); // Send the *entire history* to the backend
  };

  // This function runs when you click a suggested question
  const handleSuggestion = (question) => {
    if (isLoading) return;

    const userMessage = { role: "user", content: question };
    const newMessages = [initialBotMessage, userMessage]; // Start a new history with the first bot message
    
    setMessages(newMessages); // Show the bot intro and the user's question
    setInput(""); // Clear input
    getBotResponse(newMessages); // Send this new history
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-electric shadow-glow hover:scale-110 transition-transform p-0"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[600px] bg-card border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-gradient-electric p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-background" />
              </div>
              <div>
                <h3 className="font-bold text-background">AutoCharge AI</h3>
                <p className="text-xs text-background/80">Always here to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-background/70 hover:text-background">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground font-semibold">Suggested questions:</p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestion(question)}
                    className="w-full text-left p-3 text-sm bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-primary hover:bg-primary/90 shadow-glow"
                disabled={isLoading}
              >
                {isLoading ? <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;