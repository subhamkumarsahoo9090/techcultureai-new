"use client";
import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
 const contact = 7428238091

  const quickMessages = [
    "Tell me about your AI services",
    "I need help with business automation",
    "What technology solutions do you offer?",
    "Can you provide a quote for my project?",
    "I'd like to schedule a consultation"
  ];

  const sendToWhatsApp = (messageText = message) => {
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappURL = `https://wa.me/${contact}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  const handleQuickMessage = (quickMsg) => {
    sendToWhatsApp(quickMsg);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-16 lg:bottom-6 right-6 z-[995]">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
            aria-label="Open WhatsApp Chat"
          >
            <MessageCircle size={24} />
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl w-80 border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    TechCulture AI Support
                  </h3>
                  <p className="text-xs opacity-90 !mt-0 !mb-0">
                    Typically replies within minutes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {/* Welcome Message */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  👋 Hi there! How can we help you with AI solutions today?
                </p>
              </div>

              {/* Quick Message Buttons */}
              <div className="space-y-2 mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Quick Questions
                </p>
                {quickMessages.map((quickMsg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(quickMsg)}
                    className="w-full text-left p-2 text-sm bg-white hover:bg-orange-50 rounded-lg transition-colors duration-200 border border-orange-200 hover:border-orange-300"
                  >
                    {quickMsg}
                  </button>
                ))}
              </div>

              {/* Custom Message Input */}
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 mb-2">
                  Or send us a custom message:
                </p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message about AI services..."
                    className="flex-1 border border-orange-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" && message.trim() && sendToWhatsApp()
                    }
                  />
                  <button
                    onClick={() => sendToWhatsApp()}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:bg-gray-300 text-white rounded-lg px-3 py-2 transition-colors duration-200"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-2 text-center">
              <p className="text-xs text-gray-500">
                Click send to continue the conversation on WhatsApp
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppChat;
