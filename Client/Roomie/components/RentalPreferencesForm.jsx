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
     
      //HouseShareHouseType
      HouseSharePriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseSharePriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseShareRoomType : Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseShareHouseType : Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseShareEnsuite: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      HouseMateExpect: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      Environment: Yup.string()
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
      NumRooms: Yup.string()
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
                          style={styles.input}
                          selectedValue={values.HouseSharePriceRangeMin}
                          onValueChange={handleChange('HouseSharePriceRangeMin')}
                          onBlur={() => setFieldTouched('HouseSharePriceRangeMin')}
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.HouseSharePriceRangeMin && errors.HouseSharePriceRangeMin &&(
                          <Text style={styles.errorTxt}>{errors.HouseSharePriceRangeMin}</Text>
                      )}
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              style={styles.input}
                              selectedValue={values.HouseSharePriceRangeMax}
                              onValueChange={handleChange('HouseSharePriceRangeMax')}
                              onBlur={() => setFieldTouched('HouseSharePriceRangeMax')}
                          >
                              {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                          {touched.HouseSharePriceRangeMax && errors.HouseSharePriceRangeMax &&(
                          <Text style={styles.errorTxt}>{errors.HouseSharePriceRangeMax}</Text>
                          )}
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Room Type:</Text>
                        <Picker
                          style={styles.input}
                          selectedValue={values.HouseShareRoomType}
                          onValueChange={handleChange('HouseShareRoomType')}
                          onBlur={() => setFieldTouched('HouseShareRoomType')}
                        >
                          {roomType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.HouseShareRoomType && errors.HouseShareRoomType &&(
                          <Text style={styles.errorTxt}>{errors.HouseShareRoomType}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>House Type:</Text>
                          <Picker
                          style={styles.input}
                          selectedValue={values.HouseShareHouseType}
                          onValueChange={handleChange('HouseShareHouseType')}
                          onBlur={() => setFieldTouched('HouseShareHouseType')}
                        >
                          {houseType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.HouseShareHouseType && errors.HouseShareHouseType &&(
                          <Text style={styles.errorTxt}>{errors.HouseShareHouseType}</Text>
                        )}
                      </View>
                  </View>

                  <View style={styles.lineInput}>
                      <Text style={styles.label}>Ensuite</Text>
                      <Picker
                          style={[styles.input, styles.singleLineInput]}
                          selectedValue={values.HouseShareEnsuite}
                          onValueChange={handleChange('HouseShareEnsuite')}
                          onBlur={() => setFieldTouched('HouseShareEnsuite')}
                          >
                          {yesNO.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.HouseShareEnsuite && errors.HouseShareEnsuite &&(
                          <Text style={styles.errorTxt}>{errors.HouseShareEnsuite}</Text>
                      )}
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>House Expectations:</Text>
                        <Picker
                          style={styles.input}
                          selectedValue={values.HouseMateExpect}
                          onValueChange={handleChange('HouseMateExpect')}
                          onBlur={() => setFieldTouched('HouseMateExpect')} 
                        >
                          {houseMatExpectations.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.HouseMateExpect && errors.HouseMateExpect&&(
                          <Text style={styles.errorTxt}>{errors.HouseMateExpect}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>Environment:</Text>
                          <Picker
                          style={styles.input}
                          selectedValue={values.Environment}
                          onValueChange={handleChange('Environment')}
                          onBlur={() => setFieldTouched('Environment')} 
                        >
                          {environmentOptions.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.Environment && errors.Environment&&(
                          <Text style={styles.errorTxt}>{errors.Environment}</Text>
                        )}
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
                          style={styles.input}
                          selectedValue={values.HouseRentalPriceRangeMin}
                          onValueChange={handleChange('HouseRentalPriceRangeMin')}
                          onBlur={() => setFieldTouched('HouseRentalPriceRangeMin')}  
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.HouseRentalPriceRangeMin && errors.HouseRentalPriceRangeMin&&(
                          <Text style={styles.errorTxt}>{errors.HouseRentalPriceRangeMin}</Text>
                      )}
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              style={styles.input}
                              selectedValue={values.HouseRentalPriceRangeMax}
                              onValueChange={handleChange('HouseRentalPriceRangeMax')}
                              onBlur={() => setFieldTouched('HouseRentalPriceRangeMax')}  
                          >
                              {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                          {touched.HouseRentalPriceRangeMax && errors.HouseRentalPriceRangeMax&&(
                            <Text style={styles.errorTxt}>{errors.HouseRentalPriceRangeMax}</Text>
                          )}
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                      <Text style={styles.label}>Num Rooms:</Text>
                      <Picker
                          style={styles.input}
                          selectedValue={values.NumRooms}
                          onValueChange={handleChange('NumRooms')}
                          onBlur={() => setFieldTouched('NumRooms')}   
                      >
                          {number.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.NumRooms && errors.NumRooms&&(
                          <Text style={styles.errorTxt}>{errors.NumRooms}</Text>
                      )}
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>House Type:</Text>
                          <Picker
                              style={styles.input}
                              selectedValue={values.NumRooms}
                              onValueChange={handleChange('HouseRentalHouseType')}
                              onBlur={() => setFieldTouched('HouseRentalHouseType')} 
                          >
                              {houseType.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                          {touched.HouseRentalHouseType && errors.HouseRentalHouseType&&(
                            <Text style={styles.errorTxt}>{errors.HouseRentalHouseType}</Text>
                          )}
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
                          style={styles.input}
                          selectedValue={values.DigsPriceRangeMin}
                          onValueChange={handleChange('DigsPriceRangeMin')}
                          onBlur={() => setFieldTouched('DigsPriceRangeMin')}  
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.DigsPriceRangeMin && errors.DigsPriceRangeMin&&(
                        <Text style={styles.errorTxt}>{errors.DigsPriceRangeMin}</Text>
                      )}
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              style={styles.input}
                              selectedValue={values.DigsPriceRangeMax}
                              onValueChange={handleChange('DigsPriceRangeMax')}
                              onBlur={() => setFieldTouched('DigsPriceRangeMax')}  
                          >
                              {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                          {touched.DigsPriceRangeMax && errors.DigsPriceRangeMax&&(
                            <Text style={styles.errorTxt}>{errors.DigsPriceRangeMax}</Text>
                          )}
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Room Type:</Text>
                        <Picker
                          style={styles.input}
                          selectedValue={values.DigsRoomType}
                          onValueChange={handleChange('DigsRoomType')}
                          onBlur={() => setFieldTouched('DigsRoomType')} 
                        >
                          {roomType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.DigsRoomType && errors.DigsRoomType&&(
                          <Text style={styles.errorTxt}>{errors.DigsRoomType}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>House Type:</Text>
                          <Picker
                          style={styles.input}
                          selectedValue={values.DigsHouseType}
                          onValueChange={handleChange('DigsHouseType')}
                          onBlur={() => setFieldTouched('DigsHouseType')}
                        >
                          {houseType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.DigsHouseType && errors.DigsHouseType&&(
                          <Text style={styles.errorTxt}>{errors.DigsHouseType}</Text>
                        )}
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Days:</Text>
                        <Picker
                          style={styles.input}
                          selectedValue={values.DigsDays}
                          onValueChange={handleChange('DigsDays')}
                          onBlur={() => setFieldTouched('DigsDays')}  
                        >
                          {days.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.DigsDays && errors.DigsDays&&(
                          <Text style={styles.errorTxt}>{errors.DigsDays}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>Meals Included:</Text>
                          <Picker
                          style={styles.input}
                          selectedValue={values.DigsMealIncluded}
                          onValueChange={handleChange('DigsMealIncluded')}
                          onBlur={() => setFieldTouched('DigsMealIncluded')} 
                        >
                          {yesNO.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.DigsMealIncluded && errors.DigsMealIncluded&&(
                          <Text style={styles.errorTxt}>{errors.DigsDays}</Text>
                        )}
                      </View>
                  </View>
                  <Button
                      mode="contained" 
                      color="#FF5733" 
                      labelStyle={styles.buttonLabel}
                      disabled={!isValid}
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

  
  
  
  
  
  