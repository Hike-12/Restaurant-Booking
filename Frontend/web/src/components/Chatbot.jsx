import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Function to format messages
  const formatMessage = (message) => {
    // Split by new lines and format headers and bold text
    const lines = message.split("\n").map((line) => {
      if (line.startsWith("## ")) {
        return `<h2>${line.slice(3)}</h2>`; // Format as h2
      }
      if (line.startsWith("### ")) {
        return `<h3>${line.slice(4)}</h3>`; // Format as h3
      }
      // Bold and italic formatting
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Bold
      line = line.replace(/\*(.*?)\*/g, "<em>$1</em>"); // Italic
      return `<p>${line}</p>`; // Wrap in paragraph tags
    });

    return lines.join(""); // Combine formatted lines
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add the user message to chat history
    const newChatHistory = [
      ...chatHistory,
      { sender: "user", message: userMessage },
    ];
    setChatHistory(newChatHistory);
    setUserMessage(""); // Clear input

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (response.ok) {
        // Add the bot's response to chat history
        const botResponse = data.response;
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: botResponse },
        ]);
      } else {
        // Handle error from the server
        const errorMessage =
          data.error || "Sorry, there was an error processing your request.";
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: errorMessage },
        ]);
      }
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      const errorMessage = "Sorry, there was an error processing your request.";
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: errorMessage },
      ]);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-olive p-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="w-full max-w-xl mx-auto p-6 bg-beige rounded-2xl shadow-2xl border-2 border-olive">
        <h2 className="text-2xl text-center font-bold mb-4 text-olive">
          Chatbot
        </h2>
        <div className="h-80 overflow-y-auto border border-olive rounded-lg p-4 mb-4 bg-sand">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-2 ${
                chat.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block max-w-[70%] p-2 rounded-lg ${
                  chat.sender === "user"
                    ? "bg-olive text-sand"
                    : "bg-beige text-black"
                }`}
              >
                <strong className="text-xs text-olive">
                  {chat.sender === "user" ? "You" : "Bot"}:
                </strong>
                <div
                  className="text-sm mt-1"
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(chat.message),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-olive rounded-l-lg focus:outline-none focus:ring-2 focus:ring-olive bg-sand text-black"
          />
          <button
            onClick={handleSendMessage}
            className="bg-olive hover:bg-black text-sand px-4 py-2 rounded-r-lg transition-colors duration-300 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbot;
