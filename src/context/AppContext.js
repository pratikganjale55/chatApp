import React, { createContext } from 'react';

export const AppContext = createContext();

export const initialState = {
  contacts: [],
  messages: {},
  selectedContact: null,
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: { ...state.messages, ...action.payload } };
    case 'SELECT_CONTACT':
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
}
