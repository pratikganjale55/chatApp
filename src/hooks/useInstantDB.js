

import { useCallback } from 'react';
import { tx, id, init } from "@instantdb/react";

const db = init({ appId: "23ebd004-f31c-4820-9a71-874e11f38bd4" }); 

export function useInstantDB() {
  const fetchContacts = useCallback(async () => {
    try {
      const contacts = await db.transact(tx.contacts.select());
      console.log("calling",contacts)
      if (contacts.length === 0) {
        console.warn("No contacts found in the database.");
      }
      return contacts.map(contact => ({
        id: contact.id,
        name: contact.name,
      }));
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  }, []);

  const addContacts = useCallback(async () => {
    try {
      const contactsToAdd = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
      ];

     db.transact(
      db.tx.contact[id()].update({
         name:"John Doe" ,
        createdAt: new Date(),
      })
     )
      console.log("Contacts added successfully.");
    } catch (error) {
      console.error("Error adding contacts:", error);
    }
  }, []);

  // Fetch messages
  const fetchMessages = useCallback(async (contactId) => {
    try {
      const messages = await db.transact(tx.messages[id(contactId)].select());
      return messages.map(message => ({
        id: message.id,
        text: message.text,
        time: message.time,
        sender: message.sender,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  }, []);

  const sendMessage = useCallback(async (contactId, text, sender) => {
    try {
      const newMessage = {
        id: (Math.random() * 1000).toString(),
        text,
        time: new Date().toISOString(),
        sender,
        contactId,
      };
      console.log("send",newMessage )

      await db.transact(tx.messages.add(newMessage));
      console.log(`Message sent to ${contactId}: ${text}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []);

  return { fetchContacts, fetchMessages, sendMessage, addContacts };
}
