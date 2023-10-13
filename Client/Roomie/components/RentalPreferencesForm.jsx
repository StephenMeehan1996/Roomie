import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView, ActivityIndicator} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference, priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days } from '../data/formData';
import  styles  from '../styles/formStyle.style';

const RentalPreferencesForm = ({navigation, route}) => {

    const { rentalPref,formData } = route.params;
    const [loading, setLoading] = useState(false);
    const [completeForm, setCompleteForm] = useState([]);
    const auth = FIREBASE_AUTH;

    const SignupSchema = Yup.object().shape({
      
      houseSharePriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      houseSharePriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      houseShareRoomType : Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      houseShareHouseType : Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      houseShareEnsuite: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      houseMateExpect: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      environment: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),

      houseRentalPriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      houseRentalPriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      houseRentalPriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      numRooms: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      houseRentalHouseType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),

      digsPriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      digsPriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      digsRoomType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      digsHouseType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      digsDays: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
      digsMealIncluded: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value')

});
    const isFormVisible = (value) => {
        return rentalPref.includes(value);
      };

    const signUp = async (values) => {
       const formsToCombine = {...formData, ...values}
       setCompleteForm([formsToCombine]);
       
     
       setLoading(true);
       try{
           const responce = await createUserWithEmailAndPassword(auth, completeForm[0].email, completeForm[0].password);
           console.log(responce); 
           console.log(completeForm);
           console.log(completeForm[0].digsMealIncluded)
           alert('Check your emails!');
        } catch (error){
           console.log(error);
           alert('Registration failed: ' + error.message);
        } finally{
           setLoading(false); 
        }

    };

  return (
    <ScrollView>
      <Formik
              initialValues={{
                houseSharePriceRangeMin : '',
                houseSharePriceRangeMax : '',
                houseShareRoomType : '',
                houseShareHouseType : '',
                houseShareEnsuite : '',
                houseMateExpect : '',
                environment : '',
      
                houseRentalPriceRangeMin : '',
                houseRentalPriceRangeMax : '',
                numRooms : '',
                houseRentalHouseType : '',
      
                digsPriceRangeMin : '',
                digsPriceRangeMax: '',
                digsRoomType: '',
                digsDays : '',
                digsMealIncluded: ''
              }}
               validationSchema={SignupSchema}
               onSubmit={values => signUp(values)}
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
                          selectedValue={values.houseSharePriceRangeMin}
                          onValueChange={handleChange('houseSharePriceRangeMin')}
                          onBlur={() => setFieldTouched('houseSharePriceRangeMin')}
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.houseSharePriceRangeMin && errors.houseSharePriceRangeMin &&(
                          <Text style={styles.errorTxt}>{errors.houseSharePriceRangeMin}</Text>
                      )}
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              style={styles.input}
                              selectedValue={values.houseSharePriceRangeMax}
                              onValueChange={handleChange('houseSharePriceRangeMax')}
                              onBlur={() => setFieldTouched('houseSharePriceRangeMax')}
                          >
                              {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                          {touched.houseSharePriceRangeMax && errors.houseSharePriceRangeMax &&(
                          <Text style={styles.errorTxt}>{errors.houseSharePriceRangeMax}</Text>
                          )}
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Room Type:</Text>
                        <Picker
                          style={styles.input}
                          selectedValue={values.houseShareRoomType}
                          onValueChange={handleChange('houseShareRoomType')}
                          onBlur={() => setFieldTouched('houseShareRoomType')}
                        >
                          {roomType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.houseShareRoomType && errors.houseShareRoomType &&(
                          <Text style={styles.errorTxt}>{errors.houseShareRoomType}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>House Type:</Text>
                          <Picker
                          style={styles.input}
                          selectedValue={values.houseShareHouseType}
                          onValueChange={handleChange('houseShareHouseType')}
                          onBlur={() => setFieldTouched('houseShareHouseType')}
                        >
                          {houseType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.houseShareHouseType && errors.houseShareHouseType &&(
                          <Text style={styles.errorTxt}>{errors.houseShareHouseType}</Text>
                        )}
                      </View>
                  </View>

                  <View style={styles.lineInput}>
                      <Text style={styles.label}>Ensuite</Text>
                      <Picker
                          style={[styles.input, styles.singleLineInput]}
                          selectedValue={values.houseShareEnsuite}
                          onValueChange={handleChange('houseShareEnsuite')}
                          onBlur={() => setFieldTouched('houseShareEnsuite')}
                          >
                          {yesNO.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.houseShareEnsuite && errors.houseShareEnsuite &&(
                          <Text style={styles.errorTxt}>{errors.houseShareEnsuite}</Text>
                      )}
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>House Expectations:</Text>
                        <Picker
                          style={styles.input}
                          selectedValue={values.houseMateExpect}
                          onValueChange={handleChange('houseMateExpect')}
                          onBlur={() => setFieldTouched('houseMateExpect')} 
                        >
                          {houseMatExpectations.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.houseMateExpect && errors.houseMateExpect&&(
                          <Text style={styles.errorTxt}>{errors.houseMateExpect}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>Environment:</Text>
                          <Picker
                          style={styles.input}
                          selectedValue={values.environment}
                          onValueChange={handleChange('environment')}
                          onBlur={() => setFieldTouched('environment')} 
                        >
                          {environmentOptions.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.environment && errors.environment&&(
                          <Text style={styles.errorTxt}>{errors.environment}</Text>
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
                          selectedValue={values.houseRentalPriceRangeMin}
                          onValueChange={handleChange('houseRentalPriceRangeMin')}
                          onBlur={() => setFieldTouched('houseRentalPriceRangeMin')}  
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.houseRentalPriceRangeMin && errors.houseRentalPriceRangeMin&&(
                          <Text style={styles.errorTxt}>{errors.houseRentalPriceRangeMin}</Text>
                      )}
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              style={styles.input}
                              selectedValue={values.houseRentalPriceRangeMax}
                              onValueChange={handleChange('houseRentalPriceRangeMax')}
                              onBlur={() => setFieldTouched('houseRentalPriceRangeMax')}  
                          >
                              {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                          {touched.houseRentalPriceRangeMax && errors.houseRentalPriceRangeMax&&(
                            <Text style={styles.errorTxt}>{errors.houseRentalPriceRangeMax}</Text>
                          )}
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                      <Text style={styles.label}>Num Rooms:</Text>
                      <Picker
                          style={styles.input}
                          selectedValue={values.numRooms}
                          onValueChange={handleChange('numRooms')}
                          onBlur={() => setFieldTouched('numRooms')}   
                      >
                          {number.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.numRooms && errors.numRooms&&(
                          <Text style={styles.errorTxt}>{errors.numRooms}</Text>
                      )}
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>House Type:</Text>
                          <Picker
                              style={styles.input}
                              selectedValue={values.houseRentalHouseType}
                              onValueChange={handleChange('houseRentalHouseType')}
                              onBlur={() => setFieldTouched('houseRentalHouseType')} 
                          >
                              {houseType.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                          {touched.houseRentalHouseType && errors.houseRentalHouseType&&(
                            <Text style={styles.errorTxt}>{errors.houseRentalHouseType}</Text>
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
                          selectedValue={values.digsPriceRangeMin}
                          onValueChange={handleChange('digsPriceRangeMin')}
                          onBlur={() => setFieldTouched('digsPriceRangeMin')}  
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                      {touched.digsPriceRangeMin && errors.digsPriceRangeMin&&(
                        <Text style={styles.errorTxt}>{errors.digsPriceRangeMin}</Text>
                      )}
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              style={styles.input}
                              selectedValue={values.digsPriceRangeMax}
                              onValueChange={handleChange('digsPriceRangeMax')}
                              onBlur={() => setFieldTouched('digsPriceRangeMax')}  
                          >
                              {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                          </Picker>
                          {touched.digsPriceRangeMax && errors.digsPriceRangeMax&&(
                            <Text style={styles.errorTxt}>{errors.digsPriceRangeMax}</Text>
                          )}
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Room Type:</Text>
                        <Picker
                          style={styles.input}
                          selectedValue={values.digsRoomType}
                          onValueChange={handleChange('digsRoomType')}
                          onBlur={() => setFieldTouched('digsRoomType')} 
                        >
                          {roomType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.digsRoomType && errors.digsRoomType&&(
                          <Text style={styles.errorTxt}>{errors.digsRoomType}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>House Type:</Text>
                          <Picker
                          style={styles.input}
                          selectedValue={values.digsHouseType}
                          onValueChange={handleChange('digsHouseType')}
                          onBlur={() => setFieldTouched('digsHouseType')}
                        >
                          {houseType.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.digsHouseType && errors.digsHouseType&&(
                          <Text style={styles.errorTxt}>{errors.digsHouseType}</Text>
                        )}
                      </View>
                  </View>

                  <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Days:</Text>
                        <Picker
                          style={styles.input}
                          selectedValue={values.digsDays}
                          onValueChange={handleChange('digsDays')}
                          onBlur={() => setFieldTouched('digsDays')}  
                        >
                          {days.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.digsDays && errors.digsDays&&(
                          <Text style={styles.errorTxt}>{errors.digsDays}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                          <Text style={styles.label}>Meals Included:</Text>
                          <Picker
                          style={styles.input}
                          selectedValue={values.digsMealIncluded}
                          onValueChange={handleChange('digsMealIncluded')}
                          onBlur={() => setFieldTouched('digsMealIncluded')} 
                        >
                          {yesNO.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.digsMealIncluded && errors.digsMealIncluded&&(
                          <Text style={styles.errorTxt}>{errors.digsDays}</Text>
                        )}
                      </View>
                  </View>
                  {loading ? <ActivityIndicator size="large" color="#0000ff"/>
                  : <>
                  <Button
                      mode="contained" 
                      color="#FF5733" 
                      labelStyle={styles.buttonLabel}
                      disabled={!isValid}
                      onPress={handleSubmit}>
                      Create Account
                    </Button>
                    </>}
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

  
  
  
  
  
  