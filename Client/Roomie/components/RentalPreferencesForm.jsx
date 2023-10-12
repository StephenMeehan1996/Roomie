import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';

import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference, priceRange, number, roomType, houseType, houseMateExpect, environment } from '../data/formData';
import  styles  from '../styles/formStyle.style';

const RentalPreferencesForm = ({navigation, route}) => {

    const { rentalPref } = route.params;
  
    //House share form vars
    const [HouseSharePriceRangeMin, setHouseSharePriceRangeMin] =  useState('');
    const [HouseSharePriceRangeMax, setHouseSharePriceRangeMax] =  useState('');
    const [HouseShareRoomType, setHouseShareRoomType] =  useState('');
    const [HouseShareHouseType, setHouseShareHouseType] =  useState('');
    const [HouseShareEnsuite, setHouseShareEnsuite] =  useState('');
    const [HouseMateExpect, setHouseMateExpect] =  useState('');
    const [Environment, setEnvironment] =  useState('');

    
    //House rental form vars
    const [HouseRentalPriceRangeMin, setHouseRentalPriceRangeMin] =  useState('');
    const [HouseRentalPriceRangeMax, setHouseRentalPriceRangeMax] =  useState('');
    const [NumRooms, setNumRooms] =  useState('');
    const [HouseRentalHouseType, setHouseRentalHouseType] =  useState('');

    //Digs form vars
    const [DigsPriceRangeMin, setDigsPriceRangeMin] =  useState('');
    const [DigsPriceRangeMax, setDigsPriceRangeMax] =  useState('');
    const [DigsRoomType, setDigsRoomType] =  useState('');
    const [DigsDays, setDigsDays] =  useState('');
    const [DigsMealIncluded, setDigsMealIncluded] =  useState('');

    const [occupationDetailLabel, setOccupationDetailLabel] = useState('Working Hours'); // State for the label of the second dropdown
    const [occupationDropdownValue, setOccupationDropdownValue] = useState('');

    const isFormVisible = (value) => {
        return rentalPref.includes(value);
      };

  return (
    <ScrollView>
   
      <View style={styles.container}>
   
      <Card elevation={5} style={styles.card}>
        <Card.Content>
      
        <View style={styles.header}>
        <Title style={styles.title}>Rental Preferences</Title>
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

      <View>
            {isFormVisible('House Share') && (
            // Render this view when the title is in the array
        <Card elevation={5} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>House Rental Preferences</Title>
              <Text style={styles.label}>Price Range:</Text>
              <View style={styles.sameLineContainer}>
                <View style={styles.lineInput}>
                <Text style={styles.label}>Min:</Text>
                <Picker
                    selectedValue={HouseSharePriceRangeMin}
                    style={styles.input}
                    onValueChange={(itemValue) => setHouseSharePriceRangeMin(itemValue)}  
                >
                    {priceRange.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
               </View>
               <View style={styles.lineInput}>
                 <Text style={styles.label}>Max:</Text>
                    <Picker
                        selectedValue={HouseSharePriceRangeMax}
                        style={styles.input}
                        onValueChange={(itemValue) => setHouseSharePriceRangeMax(itemValue)}  
                    >
                        {priceRange.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>
             </View>

            <View style={styles.sameLineContainer}>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>Room Type:</Text>
                  <Picker
                    selectedValue={HouseShareRoomType}
                    style={styles.input}
                    onValueChange={(itemValue) => setHouseShareRoomType(itemValue)}  
                  >
                    {roomType.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                 </View>
                 <View style={styles.lineInput}>
                    <Text style={styles.label}>House Type:</Text>
                    <Picker
                    selectedValue={HouseShareHouseType}
                    style={styles.input}
                    onValueChange={(itemValue) => setHouseShareHouseType(itemValue)}  
                  >
                    {houseType.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                 </View>
            </View>

            <View style={styles.lineInput}>
                <Text style={styles.label}>Ensuite</Text>
                <Picker
                    style={[styles.input, styles.singleLineInput]}
                    selectedValue={HouseShareEnsuite}
                    onValueChange={(itemValue) => setHouseShareEnsuite(itemValue)}
                    >
                    {yesNO.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>

            <View style={styles.sameLineContainer}>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>House Expectations:</Text>
                  <Picker
                    selectedValue={HouseMateExpect}
                    style={styles.input}
                    onValueChange={(itemValue) => setHouseMateExpect(itemValue)}  
                  >
                    {houseMateExpect.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                 </View>
                 <View style={styles.lineInput}>
                    <Text style={styles.label}>Environment:</Text>
                    <Picker
                    selectedValue={Environment}
                    style={styles.input}
                    onValueChange={(itemValue) => setEnvironment(itemValue)}  
                  >
                    {environment.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                 </View>
             </View>
            
            </Card.Content>
         </Card>
        )}
       </View>

       <View>
            {isFormVisible('House Rental') && (
            // Render this view when the title is in the array
            <Card elevation={5} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>House Share Preferences</Title>
    
           
    
            </Card.Content>
          </Card>
        )}
        </View>

        <View>
            {isFormVisible('Digs') && (
            // Render this view when the title is in the array
            <Card elevation={5} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Digs Preferences</Title>
    
              
    
            </Card.Content>
          </Card>
        )}
        </View>
     </View>
  </ScrollView>
  )
}



export default RentalPreferencesForm

  
  
  
  
  
  