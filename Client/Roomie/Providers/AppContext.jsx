import React, { createContext, useContext, useState } from 'react';
import useFetchData from '../functions/GetAPI';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [newMessages, setNewMessages] = useState([]);
  const [signedInUserDetails, setSignedInUserDetails] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);

  const refreshDetails = async () =>{
  
    const getUserDetails = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUser?uid=${signedInUserDetails.useridentifier}`);
    setSignedInUserDetails(getUserDetails[0]);
   
  }

  return (
    <AppContext.Provider value={{ newMessages, setNewMessages, signedInUserDetails, setSignedInUserDetails,profileImage,setProfileImage, refreshDetails, firebaseUser, setFirebaseUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

// export const MyProvider = ({ children }) => {
//   // Declare variables that cannot be changed
//   const variable1 = 'value1';
//   const variable2 = 'value2';

//   return (
//     <MyContext.Provider value={{ variable1, variable2 }}>
//       {children}
//     </MyContext.Provider>
//   );
// };