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
import { calculateReviewStats, digsMeals, returnSelectedProfileImage,returnSelectedCoverImage, generateUUID } from '../functions/CommonFunctions';
import  styles  from '../styles/common.style';
import callLambdaFunction from '../functions/PostAPI';
import  formStyles  from '../styles/formStyle.style';
import { filterBy } from '../data/formData';


const AdApplications = () => {

const [filter, setFilter] = useState('percentageMatch')
 
//Get https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetApplications?id=113
// 
 
    const handleFilter = (value) =>{
        setFilter(value);
    }

  return (
    <View>
        <Card elevation={5} style={[styles.card]}>
           <Card.Content>
             <View style={[styles.header, {paddingHorizontal: 15}]}>
                    <Paragraph>Applicants: 5</Paragraph>
                 
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
 </View>
  )
}

export default AdApplications