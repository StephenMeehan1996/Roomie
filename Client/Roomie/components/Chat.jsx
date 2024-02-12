import React,  { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getDatabase, ref, set,child, get , onValue} from "firebase/database";
import { GiftedChat } from 'react-native-gifted-chat';
import { FIREBASE_AUTH,FIREBASE_DATABASE } from '../FirebaseConfig';
import { generateChatID,returnSelectedProfileImage} from '../functions/CommonFunctions';


const Chat = ({navigation, route}) => {
  const {userDetails, userImages} = route.params
  const [uID, setUID] = useState(route.params.uID)
  const [profileImage, setProfileImage] = useState(null);
  const [formattedMessages, setFormattedMessages] = useState([]);

  function writeUserData(messages) {
    const db = FIREBASE_DATABASE;
    //ref(db, 'chats/' + uID+ '/' + generateChatID()
    set(ref(db, 'chats/123/' + generateChatID()), {
        date : new Date(messages[0].createdAt).toISOString(),
        senderID: uID,
        email: '8518d16c-c3df-4ead-b509-a0827e949c17',
        message: messages[0].text,
        name: messages[0].user?.name,
        image: messages[0].user?.avatar
    });
  }

  useEffect(() => {
    const setSelectedImages = async () => {
     try {
      await setProfileImage(returnSelectedProfileImage(userImages));
      console.log('look' + returnSelectedProfileImage(userImages))
      
     } catch (error) {
       console.log(error);
     }
   };

   // Call the fetchData function
   setSelectedImages();
 }, [userImages]);

useEffect(() => {
    const db = FIREBASE_DATABASE;


    return onValue(ref(db, `chats/123`), (snapshot) => {
      const mes = (snapshot.val()) || 'Anonymous';

      if(mes){
    
      const newFormattedMessages = Object.keys(mes).map(key => ({
        _id: key,
        createdAt: mes[key].date,
        text: mes[key].message,
        user: {
          _id: mes[key].senderID,
          name: mes[key].name,
          avatar: mes[key].image
        }
      }));

      const sortedMessages = newFormattedMessages.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }); 

      setFormattedMessages(sortedMessages);
      console.log('here' + JSON.stringify(sortedMessages))
    }
    }, {
   
    });
},[uID]);



const handleFormat = async (mes) => {
    const newFormattedMessages = Object.values(mes).map(messageObj => ({
        _id: generateChatID(),
        createdAt: messageObj.date,
        text: messageObj.message,
        user: {
          _id: messageObj.senderID,
          // Add other user properties as needed
        }
      
      }));
      setFormattedMessages(newFormattedMessages);
      console.log(newFormattedMessages);
};

//   useLayoutEffect(() => {
//     navigation.setOptions({
//         headerLeft: () => (
//             <View style={{ marginLeft: 20 }}>
//                 <Avatar
//                     rounded
//                     source={{
//                         uri: auth?.currentUser?.photoURL,
//                     }}
//                 />
//             </View>
//         ),
//         headerRight: () => (
//             <TouchableOpacity style={{
//                 marginRight: 10
//             }}
//                 onPress={signOutNow}
//             >
//                 <Text>logout</Text>
//             </TouchableOpacity>
//         )
//     })
// }, [navigation]);



  const onSend = useCallback((messages = []) => {

    writeUserData(messages)

}, []);


  return (


        <GiftedChat
                messages={formattedMessages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: uID,
                     name: userDetails?.firstname +' ' + userDetails.secondname,
                     avatar: profileImage?.imageurl
            }}
            keyboardShouldPersistTaps={'never'}
            showUserAvatar={true}
            renderUsernameOnMessage ={true}
            renderAvatarOnTop={true}
        />
      

  );
};

export default Chat;