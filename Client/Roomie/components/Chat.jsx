import React,  { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getDatabase, ref, set,child, get , onValue} from "firebase/database";
import { Modal, Portal, Title, Paragraph, Card,IconButton, MD3Colors, Chip, Avatar, Subheading  } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { FIREBASE_AUTH,FIREBASE_DATABASE } from '../FirebaseConfig';
import { generateShortID,returnSelectedProfileImage,generateUUID, returnNotificationMessage, writeNotification} from '../functions/CommonFunctions';
import  styles  from '../styles/common.style';
import { useAppContext } from '../Providers/AppContext';



const Chat = ({navigation, route}) => {
  
  const {signedInUserDetails} = useAppContext();
  const [uID, setUID] = useState(signedInUserDetails.useridentifier);

  const {userImages, recipientID} = route?.params
  const [chatID, setChatID] = useState(route.params.chatID)

  const [profileImage, setProfileImage] = useState(null);
  const [formattedMessages, setFormattedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Clear previous value of chatID before assigning the new value
  //   setChatID(null);
  // }, [route.params.chatID]); // Dependency on route.params.chatID

  // useEffect(() => {
  //   // Assign the new value of chatID
  //   setChatID(route.params.chatID);
  // }, [route.params.chatID]); // Dependency on route.params.chatID

  function writeUserData(messages) { // passes message from chat UI component

    console.log(recipientID);
    
    const db = FIREBASE_DATABASE;
    set(ref(db, `chats/${chatID}/` + generateShortID()), {
        date : new Date(messages[0].createdAt).toISOString(), // needs to be refactored
        senderID: uID,
        message: messages[0].text,
        name: messages[0].user?.name,
        image: messages[0].user?.avatar
    });


    writeNotification(recipientID, messages[0].user?.name, uID,messages[0].user?.avatar, chatID, 1)

  }

  useEffect(() => {
    const setSelectedImages = async () => {
     try {
      await setProfileImage(returnSelectedProfileImage(userImages));
      
     } catch (error) {
       console.log(error);
     }
   };


   setSelectedImages();
 }, [userImages]);


 useEffect(() => {
  console.log(chatID);
  const db = FIREBASE_DATABASE;
  const unsubscribe = onValue(ref(db, `chats/${chatID}/`), (snapshot) => {
    const mes = snapshot.val() || 'Anonymous';
    if (mes) {
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

      console.log(sortedMessages);

      setFormattedMessages(sortedMessages);

    }
  });

  return () => {
    // Clean up the database listener when the component unmounts
    unsubscribe();
  };
}, [chatID]); 

  const onSend = useCallback((messages = []) => {

    writeUserData(messages)

}, []);

  return (

     <View style={{ flex: 1 }}>
        {isLoading ? (
            <View style={{ marginVertical: 10 }}>
            <ActivityIndicator size="large" color="#6200EE" />
            </View>
         ) : (
         <>
            <Card elevation={5} style={[styles.card]}>
                <Card.Content>
                    <View style={[styles.header, {height: 0}]}>
                      
                        <IconButton
                            icon="arrow-left"
                            mode="text"
                            size={30}
                            style={{flex:1,alignItems: 'flex-end'}}
                            onPress={() => navigation.popToTop()}>
                        </IconButton>
                    </View>
                </Card.Content>
            </Card>
            <GiftedChat
                messages={formattedMessages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: uID,
                     name: signedInUserDetails?.firstname +' ' + signedInUserDetails.secondname,
                     avatar: profileImage?.imageurl
            }}
            keyboardShouldPersistTaps={'never'}
            showUserAvatar={true}
            renderUsernameOnMessage ={true}
            renderAvatarOnTop={true}
            />
         </>
        )}
      </View>

  );
};

export default Chat;