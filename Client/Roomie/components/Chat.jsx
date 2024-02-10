import React,  { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getDatabase, ref, set,child, get , onValue} from "firebase/database";
import { GiftedChat } from 'react-native-gifted-chat';
import { FIREBASE_AUTH,FIREBASE_DATABASE } from '../FirebaseConfig';
import { generateChatID} from '../functions/CommonFunctions';





const Chat = ({navigation, route}) => {
 
  const [uID, setUID] = useState(route.params.uID)
  const [messages, setMessages] = useState([]);
  const [m, setM] = useState('');
  const [newMessage, setNewMessage] = useState('');




  const [formattedMessages, setFormattedMessages] = useState([]);
  const [yourMessageList, setYourMessageList] = useState([
  ]);

  //const parentFolderRef = firebase.database().ref('parentFolder');

//console.log(user)

  function writeUserData(messages) {
    const db = FIREBASE_DATABASE;
    console.log(messages[0])
    console.log(new Date(messages[0].createdAt));
    //ref(db, 'chats/' + uID+ '/' + generateChatID()
    set(ref(db, 'chats/123/' + generateChatID()), {
        date : new Date(messages[0].createdAt).toISOString(),
        senderID: uID,
        email: '8518d16c-c3df-4ead-b509-a0827e949c17',
        message: messages[0].text
    });
  }


useEffect(() => {
    const db = FIREBASE_DATABASE;
    const userId = FIREBASE_AUTH.currentUser.uid;
    //db, `chats/`+ uID
    return onValue(ref(db, `chats/123`), (snapshot) => {
      const mes = (snapshot.val()) || 'Anonymous';
      console.log('Here' + JSON.stringify(mes))
      //setMessages(username)
      const newFormattedMessages = Object.keys(mes).map(key => ({
        _id: key,
        createdAt: mes[key].date,
        text: mes[key].message,
        user: {
          _id: mes[key].senderID,
          // Add other user properties as needed
        }
      }));

      const sortedMessages = newFormattedMessages.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }); 

      setFormattedMessages(sortedMessages);
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
    //console.log(messages);
    writeUserData(messages)
    //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
                    //name: user?.displayName,
                   // avatar: user?.photoURL
            }}
            
        />
      

  );
};

export default Chat;