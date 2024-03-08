import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [newMessages, setNewMessages] = useState([]);
  const [signedInUserDetails, setSignedInUserDetails] = useState([]);
  const [signedInProfilePic, setSignedInProfilePic] = useState(null);

  return (
    <AppContext.Provider value={{ newMessages, setNewMessages, signedInUserDetails, setSignedInUserDetails,signedInProfilePic,setSignedInProfilePic }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);