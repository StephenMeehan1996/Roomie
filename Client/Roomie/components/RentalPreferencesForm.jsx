import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference, priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days } from '../data/formData';
import  styles  from '../styles/formStyle.style';

const RentalPreferencesForm = ({navigation, route}) => {

    const { rentalPref,formData } = route.params;
    
    const SignupSchema = Yup.object().shape({
     
      
      HouseSharePriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseSharePriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseShareRoomType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseShareEnsuite: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseMateExpect: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      environment: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),

      HouseRentalPriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseRentalPriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseRentalPriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      numRooms: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseRentalHouseType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),

      DigsPriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      DigsPriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      DigsRoomType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      DigsHouseType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      DigsDays: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      DigsMealIncluded: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value')
});
  
    //House share form vars
    const [houseSharePriceRangeMin, setHouseSharePriceRangeMin] =  useState('100');
    const [houseSharePriceRangeMax, setHouseSharePriceRangeMax] =  useState('300');
    const [houseShareRoomType, setHouseShareRoomType] =  useState('Single');
    const [houseShareHouseType, setHouseShareHouseType] =  useState('Apartment');
    const [houseShareEnsuite, setHouseShareEnsuite] =  useState('1');
    const [houseMateExpect, setHouseMateExpect] =  useState('Friendly');
    const [environment, setEnvironment] =  useState('Social');

    
    //House rental form vars
    const [houseRentalPriceRangeMin, setHouseRentalPriceRangeMin] =  useState('200');
    const [houseRentalPriceRangeMax, setHouseRentalPriceRangeMax] =  useState('300');
    const [numRooms, setNumRooms] =  useState('2');
    const [houseRentalHouseType, setHouseRentalHouseType] =  useState('Detached');

    //Digs form vars
    const [digsPriceRangeMin, setDigsPriceRangeMin] =  useState('200');
    const [digsPriceRangeMax, setDigsPriceRangeMax] =  useState('300');
    const [digsRoomType, setDigsRoomType] =  useState('Double');
    const [digsHouseType, setDigsHouseType] =  useState('Detached');
    const [digsDays, setDigsDays] =  useState('Monday-Friday');
    const [digsMealIncluded, setDigsMealIncluded] =  useState('0');

    const [formData2, setFormData2] = useState([]);

    const isFormVisible = (value) => {
        return rentalPref.includes(value);
      };

      const createDataArray = () => {
        const formObj = {
          HouseSharePriceRangeMin : houseSharePriceRangeMin,
          HouseSharePriceRangeMax : houseSharePriceRangeMax,
          HouseShareRoomType : houseShareRoomType,
          HouseShareHouseType : houseShareHouseType,
          HouseShareEnsuite : houseShareEnsuite,
          HouseMateExpect : houseMateExpect,
          Environment : environment,

          HouseRentalPriceRangeMin : houseRentalPriceRangeMin,
          HouseRentalPriceRangeMax : houseRentalPriceRangeMax,
          NumRooms : numRooms,
          HouseRentalHouseType : houseRentalHouseType,

          DigsPriceRangeMin : digsPriceRangeMin,
          DigsPriceRangeMax: digsPriceRangeMax,
          DigsRoomType: digsRoomType,
          DigsDays : digsDays,
          DigsMealIncluded: digsMealIncluded
        };
    
        setFormData2([formObj]);
        
        console.log(formData);
        console.log(formData2);
       
       
      };

  return (
    <ScrollView>
      <Formik
              initialValues={{
                HouseSharePriceRangeMin : '',
                HouseSharePriceRangeMax : '',
                HouseShareRoomType : '',
                HouseShareHouseType : '',
                HouseShareEnsuite : '',
                HouseMateExpect : '',
                Environment : '',
      
                HouseRentalPriceRangeMin : '',
                HouseRentalPriceRangeMax : '',
                NumRooms : '',
                HouseRentalHouseType : '',
      
                DigsPriceRangeMin : '',
                DigsPriceRangeMax: '',
                DigsRoomType: '',
                DigsDays : '',
                DigsMealIncluded: ''
              }}
               validationSchema={SignupSchema}
               onSubmit={values => console.log(values)}
              >
        
        {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (
   
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
                    <Title style={styles.title}>House Share Preferences</Title>
                    <Text style={styles.label}>Price Range:</Text>
                    <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                      <Text style={styles.label}>Min:</Text>
                      <Picker
                          selectedValue={houseSharePriceRangeMin}
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
                              selectedValue={houseSharePriceRangeMax}
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
                          selectedValue={houseShareRoomType}
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
                          selectedValue={houseShareHouseType}
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
                          selectedValue={houseShareEnsuite}
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
                          selectedValue={houseMateExpect}
                          style={styles.input}
                          onValueChange={(itemValue) => setHouseMateExpect(itemValue)}  
                        >
                          {houseMatExpectations.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>Environment:</Text>
                          <Picker
                          selectedValue={environment}
                          style={styles.input}
                          onValueChange={(itemValue) => setEnvironment(itemValue)}  
                        >
                          {environmentOptions.map((option, index) => (
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
                    <Title style={styles.title}>House Rental Preferences</Title>
                    <Text style={styles.label}>Price Range:</Text>
                    <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                      <Text style={styles.label}>Min:</Text>
                      <Picker
                          selectedValue={houseRentalPriceRangeMin}
                          style={styles.input}
                          onValueChange={(itemValue) => setHouseRentalPriceRangeMin(itemValue)}  
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              selectedValue={houseRentalPriceRangeMax}
                              style={styles.input}
                              onValueChange={(itemValue) => setHouseRentalPriceRangeMax(itemValue)}  
                          >
                              {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                      <Text style={styles.label}>Num Rooms:</Text>
                      <Picker
                          selectedValue={numRooms}
                          style={styles.input}
                          onValueChange={(itemValue) => setNumRooms(itemValue)}  
                      >
                          {number.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>House Type:</Text>
                          <Picker
                              selectedValue={houseRentalHouseType}
                              style={styles.input}
                              onValueChange={(itemValue) => setHouseRentalHouseType(itemValue)}  
                          >
                              {houseType.map((option, index) => (
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
                  {isFormVisible('Digs') && (
                  // Render this view when the title is in the array
                  <Card elevation={5} style={styles.card}>
                  <Card.Content>
                    <Title style={styles.title}>Digs Preferences</Title>
                    <Text style={styles.label}>Price Range:</Text>
                    <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                      <Text style={styles.label}>Min:</Text>
                      <Picker
                          selectedValue={digsPriceRangeMin}
                          style={styles.input}
                          onValueChange={(itemValue) => setDigsPriceRangeMin(itemValue)}  
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              selectedValue={digsPriceRangeMax}
                              style={styles.input}
                              onValueChange={(itemValue) => setDigsPriceRangeMax(itemValue)}  
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
                          selectedValue={digsRoomType}
                          style={styles.input}
                          onValueChange={(itemValue) => setDigsRoomType(itemValue)}  
                        >
                          {roomType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>House Type:</Text>
                          <Picker
                          selectedValue={digsHouseType}
                          style={styles.input}
                          onValueChange={(itemValue) => setDigsHouseType(itemValue)}  
                        >
                          {houseType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Days:</Text>
                        <Picker
                          selectedValue={digsDays}
                          style={styles.input}
                          onValueChange={(itemValue) => setDigsDays(itemValue)}  
                        >
                          {days.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>Meals Included:</Text>
                          <Picker
                          selectedValue={digsMealIncluded}
                          style={styles.input}
                          onValueChange={(itemValue) => setDigsMealIncluded(itemValue)}  
                        >
                          {yesNO.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                      </View>
                  </View>
                  <Button
                      mode="contained" 
                      color="#FF5733" 
                      labelStyle={styles.buttonLabel}
                      onPress={() => createDataArray()}>
                      Create Account
                    </Button>
          
                  </Card.Content>
                </Card>
              )}
              </View>
          </View>
            )}
      </Formik>
  </ScrollView>
  )
}



export default RentalPreferencesForm

  
  
  
  
  
  