import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useInstantDB } from '../hooks/useInstantDB';

function ContactList() {
  const { state, dispatch } = useContext(AppContext);
  const { fetchContacts } = useInstantDB();

  useEffect(() => {
    async function loadContacts() {
      const contacts = await fetchContacts();
      dispatch({ type: 'SET_CONTACTS', payload: contacts });
    }
    loadContacts();
  }, []);

  return (
    <div className="contact-list">
      {state.contacts.map((contact) => (
        <div
          key={contact.id}
          className={`contact-item ${state.selectedContact === contact.id ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SELECT_CONTACT', payload: contact.id })}
        >
          {contact.name}
        </div>
      ))}
    </div>
  );
}

export default ContactList;
