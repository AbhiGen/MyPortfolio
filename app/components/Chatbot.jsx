'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * AI Chatbot component for Abhiram Bikkina's portfolio.
 * Implements conversational UI with suggestion chips, custom scroll behaviors,
 * typing animations, and strict portfolio guardrails.
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-msg',
      sender: 'assistant',
      text: "Hi! I am Abhiram Bikkina's AI Assistant. Ask me anything about his projects, experience, technical skills, research, or LeetCode progress. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Scroll to bottom on new messages or when chat panel opens
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && chatInputRef.current) {
      setTimeout(() => {
        chatInputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    if (!textToSend) {
      setInputValue('');
    }

    const userMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            sender: msg.sender,
            text: msg.text,
          })),
        }),
      });

      if (!response.ok) {
        let errMsg = 'Failed to get response';
        try {
          const errData = await response.json();
          errMsg = errData.error || errData.message || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-ai`,
          sender: 'assistant',
          text: data.text
        }
      ]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          sender: 'assistant',
          text: `Error: ${error.message}. Please verify settings or try again.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionChips = [
    "Tell me about Abhiram",
    "What are his main projects?",
    "Show me his LeetCode stats",
    "How can I contact him?"
  ];

  return (
    <div className="chatbot-wrapper">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        aria-label="Toggle AI Chatbot"
        title="Ask Abhiram's AI Assistant"
      >
        {isOpen ? (
          /* Close Icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          /* Sleek Spark/AI Chat Bubble Icon */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <path d="M12 7v6"></path>
            <path d="M9 10h6"></path>
          </svg>
        )}
        {!isOpen && <span className="chatbot-pulse" />}
      </button>

      {/* Chat Panel */}
      <div className={`chatbot-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        {/* Chat Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar-container">
              <div className="chatbot-avatar-dot" />
            </div>
            <div>
              <h3>Abhi's AI Assistant</h3>
              <p>Online • Gemini Powered</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="chatbot-close-btn"
            aria-label="Close Chatbot"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chat Message Box */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-message-row ${msg.sender}`}>
              <div className="chatbot-message-bubble">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="chatbot-message-row assistant">
              <div className="chatbot-message-bubble typing">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions chips */}
        <div className="chatbot-suggestions-wrapper">
          <div className="chatbot-suggestions">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendMessage(chip)}
                className="chat-chip"
                disabled={isLoading}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="chatbot-input-area">
          <input
            ref={chatInputRef}
            type="text"
            placeholder="Ask about Abhiram..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            aria-label="Ask a question about Abhiram"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="chatbot-send-btn"
            aria-label="Send Message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
