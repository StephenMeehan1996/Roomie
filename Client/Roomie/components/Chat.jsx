import React,  { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getDatabase, ref, set,child, get } from "firebase/database";
import { GiftedChat } from 'react-native-gifted-chat';
import { FIREBASE_AUTH,FIREBASE_DATABASE } from '../FirebaseConfig';





const Chat = ({navigation, route}) => {
  const { user} = route.params;
  const [uID, setUID] = useState(route.params.uID)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

console.log(user)

  function writeUserData(userId, name, email, imageUrl) {
    const db = FIREBASE_DATABASE;
    set(ref(db, 'chats/' + uID), {
      username: 'James Testy',
      email: 'Test@test',
      profile_picture : '///',
      message: newMessage
    });
  }

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `chat`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        //setMessages(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}, [messages]);



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
    //     <Button title="Send" onPress={writeUserData} />
    //   </View>
    // </View>

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
  );
};

export default Chat;