import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useInstantDB } from "../hooks/useInstantDB";
import Message from "./Message";
import MessageInput from "./MessageInput";

function ChatWindow() {
  const { state, dispatch } = useContext(AppContext);
  const { fetchMessages, sendMessage } = useInstantDB();
  const currentUser = "John"; 

  useEffect(() => {
    async function loadMessages() {
      if (state.selectedContact) {
        const messages = await fetchMessages(state.selectedContact);
        dispatch({
          type: "SET_MESSAGES",
          payload: { [state.selectedContact]: messages },
        });
      }
    }
    loadMessages();
  }, [state.selectedContact, fetchMessages, dispatch]);

  const messages = state.messages[state.selectedContact] || [];

  const handleSend = async (text) => {
    await sendMessage(state.selectedContact, text, currentUser);
    const updatedMessages = await fetchMessages(state.selectedContact);
    dispatch({
      type: "SET_MESSAGES",
      payload: { [state.selectedContact]: updatedMessages },
    });
  };

  return (
    <div className="chat-window">
      {state.selectedContact ? (
        <>
          <div className="chat-header">
            Chat with{" "}
            {state.contacts.find((c) => c.id === state.selectedContact)?.name}
          </div>
          <div className="message-list">
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} currentUser={currentUser} />
            ))}
          </div>
          <MessageInput contactId={state.selectedContact} onSend={handleSend} />
        </>
      ) : (
        <div className="chat-placeholder">
          Select a contact to start chatting
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
