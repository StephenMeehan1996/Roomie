import React,  { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getDatabase, ref, set,child, get , onValue} from "firebase/database";
import { Modal, Portal, Title, Paragraph, Card,IconButton, MD3Colors, Chip, Avatar, Subheading  } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { FIREBASE_AUTH,FIREBASE_DATABASE } from '../FirebaseConfig';
import { generateShortID,returnSelectedProfileImage,generateUUID} from '../functions/CommonFunctions';
import  styles  from '../styles/common.style';



const Chat = ({navigation, route}) => {
  const {userDetails, userImages} = route?.params
  const [uID, setUID] = useState(route.params.uID)
  const [chatID, setChatID] = useState(route.params.chatID)

  const [profileImage, setProfileImage] = useState(null);
  const [formattedMessages, setFormattedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function writeUserData(messages) { // passes message from chat UI component

    const db = FIREBASE_DATABASE;
    set(ref(db, `chats/${chatID}/` + generateShortID()), {
        date : new Date(messages[0].createdAt).toISOString(), // needs to be refactored
        senderID: uID,
        message: messages[0].text,
        name: messages[0].user?.name,
        image: messages[0].user?.avatar
    });

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

    const db = FIREBASE_DATABASE;
    return onValue(ref(db, `chats/${chatID}/`), (snapshot) => {
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
                            onPress={() => navigation.goBack()}>
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
                     name: userDetails?.firstname +' ' + userDetails.secondname,
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