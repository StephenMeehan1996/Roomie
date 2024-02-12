import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions,TextInput,ActivityIndicator } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card,IconButton, MD3Colors, Chip, Avatar, Subheading  } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { returnAdTypeText, references, smoking } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import { calculateReviewStats, digsMeals, returnSelectedProfileImage,returnSelectedCoverImage, convertToDateTimeString } from '../functions/CommonFunctions';
import  styles  from '../styles/common.style';
import  formStyles  from '../styles/formStyle.style';
import callLambdaFunction from '../functions/PostAPI';
import putAPI from '../functions/PutAPI';


export default function ChatList({navigation, route}) {
     
    const [uID, setUID] = useState(route.params.uID);
    const [isLoading, setIsLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    

   
    const locateCreateChat = () => {

   

    }

    const handleChatPress = (chatID) => {
    
        console.log(chatID);
            navigation.navigate('_chat', {  
               chatID: chatID,
               uID: uID 
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleChatPress(item.chatid)}>
            <View style={styles.chatItem}>
            <Image source={{ uri: item.userprofileimage }} style={styles.profileImage} />
            <View style={styles.chatDetails}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.lastMessageDate}>{convertToDateTimeString(item.createddate)}</Text>
            </View>
            </View>
        </TouchableOpacity>
      );

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
    },[uID]);

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
                            style={{flex:1,alignItems: 'flex-end'}}
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




