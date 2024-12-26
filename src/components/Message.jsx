import React from "react";

function Message({ message, currentUser }) {
  const isSender = message.sender === currentUser;

  return (
    <div className={`message ${isSender ? "sent" : "received"}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <span className="message-time">{message.time}</span>
      </div>
    </div>
  );
}

export default Message;
