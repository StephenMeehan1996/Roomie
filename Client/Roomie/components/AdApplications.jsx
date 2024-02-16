//import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions,TextInput,ActivityIndicator } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card,IconButton, MD3Colors, Chip, Avatar, Subheading  } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { returnAdTypeText, references, smoking } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import { calculateReviewStats, digsMeals, returnSelectedProfileImage,returnSelectedCoverImage, generateUUID,convertToDateTimeString, openChat } from '../functions/CommonFunctions';
import  styles  from '../styles/common.style';
import callLambdaFunction from '../functions/PostAPI';
import  formStyles  from '../styles/formStyle.style';
import { filterBy } from '../data/formData';


const AdApplications = ({navigation, route, applications}) => {

const [filter, setFilter] = useState('percentageMatch')
 
console.log(applications);
//Get https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetApplications?id=113
// 
 
    const handleFilter = (value) =>{
        setFilter(value);
    }
  
    const handleMessage = async () =>{
        
    }
    
  const renderApplication = ({ item }) => (
    <TouchableOpacity style={styles.applicationBorder} onPress={() => handleApplicationClick(item.useridentifier)}>
        <View style={styles.applicationContainer}>
        <Image source={{ uri: item.profileimage }} style={[styles.profileImage, {alignSelf: 'flex-start'}]} />
        <View style={styles.chatDetails}>
            <Text style={styles.username}>{item.firstname} {item.secondname}  </Text>
            <Text style={styles.infoText}><Text style={styles.username}>Rating:</Text> {calculateReviewStats(item.numreviews, item.positivereviews)}</Text>
            <Text style={styles.lastMessageDate}>{convertToDateTimeString(item.appdate)}</Text>
            
        </View>
        </View>
        <Paragraph style={{width: '100%'}}>{item.appmessage}</Paragraph>

        <View style={[styles.buttonContainer2, {marginVertical: 10}]}>
                    <Button
                        mode="contained"
                        onPress={handleMessage}
                        style={ { marginRight: 10, borderRadius: 0 }} // Adjust margin as needed
                      
                    >
                        Message
                    </Button>
                    
                    </View>
    </TouchableOpacity>
  );

  return (
    <View>
        <Card elevation={5} style={[styles.card]}>
           <Card.Content>
             <View style={[styles.header, {paddingHorizontal: 15}]}>
                    <Paragraph>Applicants: {applications.length}</Paragraph>
                 
                    <View style={styles.pickerContainer}>
                        <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
                            <Paragraph>Filter By:</Paragraph>
                            <Picker
                                    style={[styles.input, { marginTop: 0 }]}
                                    selectedValue={filter} 
                                    //onValueChange={value => { setLocation(value) }}
                                    onValueChange={(value) => handleFilter(value)}
                                >
                                {filterBy.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                      </View>
                </View>
            </View>
          </Card.Content>
        </Card>
        {applications.length === 0 ? (
            <Card elevation={5} style={styles.card}>
            <Card.Content>
                <View style={styles.header}>
                    <Title style={styles.title}>No Applications</Title>
                    </View>
                    </Card.Content>
                    </Card>
             ) : (
            <>
            <Card elevation={5} style={styles.card}>
                <Card.Content>
                <View>  
                    <FlatList
                        data={applications}
                        renderItem={renderApplication}
                        keyExtractor={(item) => item.useridentifier}
                    />
                </View>
            </Card.Content>
            </Card>
            </>
           )}
       
 </View>
  )
}

export default AdApplications