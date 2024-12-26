import React, { useReducer, useEffect, useContext } from 'react';
import './index.css';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import { AppContext, appReducer, initialState } from './context/AppContext';
import { useInstantDB } from './hooks/useInstantDB';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const {addContacts} = useInstantDB()
  useEffect(() => {
    async function populateContacts() {
      await addContacts();
    }
    populateContacts();
  }, [addContacts]);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="app-container">
        <ContactList />
        <ChatWindow />
      </div>
    </AppContext.Provider>
  );
}

export default App;
