import React, { createContext, useContext, useState } from 'react';

const NewMessagesContext = createContext();

export const NewMessagesProvider = ({ children }) => {
  const [newMessages, setNewMessages] = useState([]);

  return (
    <NewMessagesContext.Provider value={{ newMessages, setNewMessages }}>
      {children}
    </NewMessagesContext.Provider>
  );
};

export const useNewMessages = () => useContext(NewMessagesContext);