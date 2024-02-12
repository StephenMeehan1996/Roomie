import React,  { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getDatabase, ref, set,child, get , onValue} from "firebase/database";
import { Modal, Portal, Title, Paragraph, Card,IconButton, MD3Colors, Chip, Avatar, Subheading  } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { FIREBASE_AUTH,FIREBASE_DATABASE } from '../FirebaseConfig';
import { generateChatID,returnSelectedProfileImage,generateUUID} from '../functions/CommonFunctions';
import  styles  from '../styles/common.style';
import callLambdaFunction from '../functions/PostAPI';


const Chat = ({navigation, route}) => {
  const {userDetails, userImages, uID2} = route?.params
  const [uID, setUID] = useState(route.params.uID)
  const [chatID, setChatID] = useState(route.params.chatID)
  const [profileImage, setProfileImage] = useState(null);
  const [formattedMessages, setFormattedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(chatID);
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

  // from addetail component // 
  // Click on message now // 
  // Pass UUID of second user to chat component as well as the users chats // 
  // Send flag from add detail component // 
  // Check chats list if Clicked on user id is user1 or user2 // 
  // if so return chatid // 
  // Else create and post chat record // 
  // set chat id and use in refererence // 

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
//3f0347ec-3169-490b-9e8b-802317a3e212
useEffect(() => {
    const db = FIREBASE_DATABASE;
        const PostChatRecord = async () => {
            if(chatID == 'N/A'){ // wip 
            const chatRecord = {
                chatID: generateUUID(),
                user1: uID,
                //user2: uID2,
                user2: '3f0347ec-3169-490b-9e8b-802317a3e212'
            };
            setChatID(chatRecord.chatID);
            let res = await callLambdaFunction(chatRecord, 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/chat'); // working 
            console.log(res);
        }
    }

    // Post ChatRecord // 
    // Set Chat ID // 
    // Use as in reference //   
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

    PostChatRecord();

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