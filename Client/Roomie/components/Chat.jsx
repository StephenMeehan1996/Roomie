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

  //const parentFolderRef = firebase.database().ref('parentFolder');

console.log(user)

  function writeUserData(userId, name, email, imageUrl) {
    const db = FIREBASE_DATABASE;


    set(ref(db, 'chats/' + uID+ '/' + generateChatID()), {
      senderID: uID,
      email: '"8518d16c-c3df-4ead-b509-a0827e949c17"',
      date : '01/01/23',
      message: newMessage
    });
  }



//   useEffect(() => {
//     const dbRef = ref(getDatabase());
//     get(child(dbRef, `chats/`+ uID)).then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//         setM(snapshot.val())
//       } else {
//         console.log("No data available");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
// },[messages]);

useEffect(() => {
    const db = getDatabase();
    const userId = FIREBASE_AUTH.currentUser.uid;
    return onValue(ref(db, `chats/`+ uID), (snapshot) => {
      const username = (snapshot.val()) || 'Anonymous';
      console.log(username)
    }, {
   
    });
},[uID]);



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

  useEffect(() => {
    setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ])
}, []);

  const onSend = useCallback((messages = []) => {
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
<View>
        <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user?.email,
                    name: user?.displayName,
                    avatar: user?.photoURL
            }}
            
        />
           <Button title="Send" onPress={writeUserData} />
</View>
  );
};

export default Chat;