import { openDB } from 'idb';

export function useIndexedDB() {
  const dbName = 'ChatAppDB';
  const version = 1;

  const initDB = async () => {
    return openDB(dbName, version, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('contacts')) {
          db.createObjectStore('contacts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('messages')) {
          const messageStore = db.createObjectStore('messages', { keyPath: 'id' });
          messageStore.createIndex('contactId', 'contactId', { unique: false });
        }
      },
    });
  };

  const saveContacts = async (contacts) => {
    const db = await initDB();
    const tx = db.transaction('contacts', 'readwrite');
    contacts.forEach((contact) => {
      tx.store.put(contact);
    });
    await tx.done;
  };

  const getContacts = async () => {
    const db = await initDB();
    return db.getAll('contacts');
  };

  const saveMessages = async (contactId, messages) => {
    const db = await initDB();
    const tx = db.transaction('messages', 'readwrite');
    messages.forEach((message) => {
      tx.store.put({ ...message, contactId });
    });
    await tx.done;
  };

  const getMessages = async (contactId) => {
    const db = await initDB();
    return db.getAllFromIndex('messages', 'contactId', contactId);
  };

  return {
    saveContacts,
    getContacts,
    saveMessages,
    getMessages,
  };
}
