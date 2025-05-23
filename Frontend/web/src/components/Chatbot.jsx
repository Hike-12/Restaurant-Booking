import React, { useState } from "react";
import { Send } from "lucide-react";

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
    <div className="flex items-center justify-center min-h-screen bg-orange9 p-4">
      <div className="w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md ">
        <h2 className="text-2xl text-center font-bold mb-4 text-amber-900">
          Chatbot
        </h2>
        <div className="h-80 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-orange2">
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
                    ? "bg-amber-100 text-gray-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <strong className="text-xs text-gray-600">
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
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
