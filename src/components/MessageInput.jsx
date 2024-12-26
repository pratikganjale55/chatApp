import React, { useState } from "react";

function MessageInput({ contactId, onSend }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text.trim()) {
      await onSend(text);
      setText("");
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;
