import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect } from 'react-native-element-dropdown';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference } from '../data/formData';
import  styles  from '../styles/formStyle.style';

const CreateAdd = ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false, 
        });
      }, [navigation]);

      const SignupSchema = Yup.object().shape({
      
        houseSharePriceRangeMin: Yup.string()
        .notOneOf(['Select an option'], 'Please enter a minimum price')
        .required('Please enter a minimum price'),
        houseSharePriceRangeMax: Yup.string()
        .notOneOf(['Select an option'], 'Please enter a maximum price')
        .required('Please enter a maximum price'),
        houseShareRoomType : Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a room type'),
        houseShareHouseType : Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a house type'),
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
        .notOneOf(['Select an option'], 'Please enter a minimum price')
        .required('Please enter a minimum price'),
        houseRentalPriceRangeMax: Yup.string()
        .notOneOf(['Select an option'], 'Please enter a maximum price')
        .required('Please enter a maximum price'),
        numRooms: Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a number of rooms'),
        houseRentalHouseType: Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a house type'),
  
        digsPriceRangeMin: Yup.string()
        .notOneOf(['Select an option'], 'Please enter a minimum price')
        .required('Please enter a minimum price'),
        digsPriceRangeMax: Yup.string()
        .notOneOf(['Select an option'], 'Please enter a maximum price')
        .required('Please enter a maximum price'),
        digsRoomType: Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a room type'),
        digsHouseType: Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a house type'),
        digsDays: Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a value'),
        digsMealIncluded: Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a value')
  
      });
      const [selectedButton, setSelectedButton] = useState(null);
      const [showForm, setShowForm] = useState(null);
      const isButtonSelected = (buttonId) => selectedButton === buttonId;

      const handleButtonPress = (buttonId) => {
        setSelectedButton(buttonId);
        setShowForm(buttonId);
      };
    
     

    
      
  return (
    <ScrollView>
        <Formik  initialValues={{
                houseSharePriceRangeMin : '700',
                houseSharePriceRangeMax : '1200',
                houseShareRoomType : 'Double',
                houseShareHouseType : 'Apartment',
                houseShareEnsuite : '1',
                houseMateExpect : 'Friendly',
                environment : 'Social',
      
                houseRentalPriceRangeMin : '500',
                houseRentalPriceRangeMax : '1200',
                numRooms : '3',
                houseRentalHouseType : 'Apartment',
      
                digsPriceRangeMin : '200',
                digsPriceRangeMax: '600',
                digsRoomType: 'Double',
                digsHouseType: 'Apartment',
                digsDays : 'Mon-Friday',
                digsMealIncluded: '1'
              }}
               validationSchema={SignupSchema}
               onSubmit={values => signUp(values)}
              >
            <View style={styles.container}>
                <Card elevation={5} style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Add Type:</Title>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                style={[
                                styles.button,
                                isButtonSelected(1) && styles.selectedButton,
                                ]}
                                onPress={() => handleButtonPress(1)}
                            >
                                <Text style={[styles.buttonText, isButtonSelected(1) && styles.selectedButtonText]}>House share</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                styles.button,
                                isButtonSelected(2) && styles.selectedButton,
                                ]}
                                onPress={() => handleButtonPress(2)}
                            >
                                <Text style={[styles.buttonText, isButtonSelected(2) && styles.selectedButtonText]}>House Rental</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                styles.button,
                                isButtonSelected(3) && styles.selectedButton
                                ]}
                                onPress={() => handleButtonPress(3)}
                            >
                                <Text style={[styles.buttonText, isButtonSelected(3) && styles.selectedButtonText]}>Digs</Text>
                            </TouchableOpacity>
                        </View>
                    </Card.Content>
                </Card>
                  {/* House Share Form*/}
                  {showForm === 1 && (
                    <Card elevation={5} style={styles.card}>
                        <Card.Content>
                            <Title style={styles.title}>House Share:</Title>
                        
                        </Card.Content>
                    </Card>
                  )}
                {/* House Rental Form */}
                {showForm === 2 && (
                <Card elevation={5} style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>House Rental:</Title>
                     
                    </Card.Content>
                </Card>
                )}
                {/* Digs Form */}
                {showForm === 3 && (
                <Card elevation={5} style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Digs:</Title>
                     
                    </Card.Content>
                </Card>
                )}

            </View>
        </Formik>
    </ScrollView>
  )
}

export default CreateAdd