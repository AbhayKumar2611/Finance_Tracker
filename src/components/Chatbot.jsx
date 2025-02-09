import React, { useState } from "react";
import { chatbotDB } from "./firebaseChatbot";
import { collection, addDoc } from "firebase/firestore";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Store message in Firestore
    const chatRef = collection(chatbotDB, "chats");
    await addDoc(chatRef, {
      userMessage,
      botResponse: "This is a dummy response!", // Replace with actual AI logic
      timestamp: new Date(),
    });

    // Update local chat history
    setChatHistory([
      ...chatHistory,
      { userMessage, botResponse: "This is a dummy response!" },
    ]);
    setUserMessage("");
  };

  return (
    <div>
      <h2>Finance Chatbot</h2>
      <div>
        {chatHistory.map((chat, index) => (
          <p key={index}>
            <strong>You:</strong> {chat.userMessage} <br />
            <strong>Bot:</strong> {chat.botResponse}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
