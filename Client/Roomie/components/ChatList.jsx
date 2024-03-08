import React, { useState, useEffect  } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, ActivityIndicator,Alert  } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card, IconButton, MD3Colors, Chip, Avatar, Subheading, Badge } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import {  ref, update } from "firebase/database";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { returnAdTypeText, references, smoking } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import { calculateReviewStats, digsMeals, returnSelectedProfileImage, returnSelectedCoverImage, convertToDateTimeString ,updateNotifications} from '../functions/CommonFunctions';
import styles from '../styles/common.style';
import formStyles from '../styles/formStyle.style';
import callLambdaFunction from '../functions/PostAPI';
import putAPI from '../functions/PutAPI';
import { FIREBASE_DATABASE } from '../FirebaseConfig'
import { useNewMessages } from '../Providers/NewMessagesProvider';



export default function ChatList({ navigation, route }) {
 
  const [uID, setUID] = useState(route.params.uID);

  const { newMessages, setNewMessages } = useNewMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const [messageCounts, setMessageCounts] = useState({});

  const [messages, setMessages] = useState(route.params.newMessages);

  const handleChatPress = async (chatID, recipientID) => {

    await updateNot(chatID);

    navigation.navigate('_chat', {
      chatID: chatID,
      uID: uID,
      recipientID: recipientID
    });
  };

  async function updateNot(id) {
  
      console.log('called');
      let chatMessages = newMessages.filter(m => m.chatID === id);

      await updateNotifications(id, uID,chatMessages)

      const updatedMessages = newMessages.filter(message => !chatMessages.includes(message));
      setNewMessages(updatedMessages);

      console.log(newMessages)

  }

  useEffect(() => {
    // Calculate message counts for each chat ID
    const counts = {};
    newMessages.forEach(message => {
      counts[message.chatID] = (counts[message.chatID] || 0) + 1;
    });
    setMessageCounts(counts);
  }, [newMessages]);

  const renderItem = ({ item }) => {

    const messageCount = messageCounts[item.chatid] || 0;

    return (
      <TouchableOpacity onPress={() => handleChatPress(item.chatid, uID === item.user1 ? item.user2 : item.user1)}>
        <View style={styles.chatItem}>
          {messageCount > 0 && (
            <Badge style={{ position: 'absolute', top: 5, right: 1 }} size={22}>
              {messageCount}
            </Badge>
          )}
          <Image source={{ uri: item.userprofileimage }} style={styles.profileImage} />
          <View style={styles.chatDetails}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.lastMessageDate}>{convertToDateTimeString(item.createddate)}</Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  };

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const c = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieChat?uid=${uID}`);
        setChats(c);
        console.log(c);
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uID]);

  return (
    <View style={styles.tabContent}>
      {isLoading ? (
        <View style={{ marginVertical: 10 }}>
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
      ) : (
        <>
          <Card elevation={5} style={styles.card}>
            <Card.Content>
              <View style={styles.header}>

                <IconButton
                  icon="arrow-left"
                  mode="text"
                  size={30}
                  style={{ flex: 1, alignItems: 'flex-end' }}
                  onPress={() => navigation.goBack()}>
                </IconButton>
              </View>
            </Card.Content>
          </Card>
          {chats.length === 0 ? (
            <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
                  <Title style={styles.title}>No Active Chats</Title>
                </View>
              </Card.Content>
            </Card>
          ) : (
            <>
              <Card elevation={5} style={styles.card}>
                <Card.Content>
                  <View>
                    <FlatList
                      data={chats}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.chatid}
                    />
                  </View>
                </Card.Content>
              </Card>
            </>
          )}
        </>
      )}
    </View>

  )


}




