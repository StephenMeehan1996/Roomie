import React,  { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getDatabase, ref, set,child, get , onValue} from "firebase/database";
import { GiftedChat } from 'react-native-gifted-chat';
import { FIREBASE_AUTH,FIREBASE_DATABASE } from '../FirebaseConfig';
import { generateChatID} from '../functions/CommonFunctions';





const Chat = ({navigation, route}) => {
  const { user} = route.params;
  const [uID, setUID] = useState(route.params.uID)
  const [messages, setMessages] = useState([]);
  const [m, setM] = useState('');
  const [newMessage, setNewMessage] = useState('');




  const [formattedMessages, setFormattedMessages] = useState([]);
  const [yourMessageList, setYourMessageList] = useState([
  ]);

  //const parentFolderRef = firebase.database().ref('parentFolder');

//console.log(user)

  function writeUserData(userId, name, email, imageUrl) {
    const db = FIREBASE_DATABASE;
    set(ref(db, 'chats/' + uID+ '/' + generateChatID()), {
      senderID: uID,
      email: '8518d16c-c3df-4ead-b509-a0827e949c17',
      date : '01/01/23',
      message: 'Testing Gifted Chat'
    });
  }


useEffect(() => {
    const db = FIREBASE_DATABASE;
    const userId = FIREBASE_AUTH.currentUser.uid;
    return onValue(ref(db, `chats/`+ uID), (snapshot) => {
      const mes = (snapshot.val()) || 'Anonymous';
      console.log(mes)
      //setMessages(username)
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
    }, {
   
    });
},[uID]);

// useEffect(() => {
   

//   }, [messages]);

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

  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                <Avatar
                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL,
                    }}
                />
            </View>
        ),
        headerRight: () => (
            <TouchableOpacity style={{
                marginRight: 10
            }}
                onPress={signOutNow}
            >
                <Text>logout</Text>
            </TouchableOpacity>
        )
    })
}, [navigation]);



  const onSend = useCallback((messages = []) => {
    writeUserData()
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
}, []);
  return (
    // <View style={{ flex: 1 }}>
    //   <FlatList
    //     data={messages[0]}
    //     renderItem={({ item }) => (
    //       <View style={{ padding: 10 }}>
    //         <Text>{item.username}</Text>
    //       </View>
    //     )}
    //     keyExtractor={item => item.id}
    //   />
    //   <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
    //     <TextInput
    //       style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
    //       placeholder="Type your message..."
    //       value={newMessage}
    //       onChangeText={setNewMessage}
    //     />
    //  
    //   </View>
    // </View>

        <GiftedChat
                messages={formattedMessages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: uID,
                    name: user?.displayName,
                    avatar: user?.photoURL
            }}
            
        />
      

  );
};

export default Chat;