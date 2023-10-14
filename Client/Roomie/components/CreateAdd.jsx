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

      const HouseShareSchema = Yup.object().shape({
        addType : Yup.string(),
        addressLine1: Yup.string()
        .required('Please enter the first line of the address'),
        addressLine2: Yup.string()
        .required('Please enter the second line of the address'),
        city: Yup.string()
        .required('Please enter the city for the address'),
        county: Yup.string()
        .required('Please enter the county for the address'),
        zip: Yup.string(),
        numOccupants: Yup.string()
        .required('Please enter the city for the address'),
        houseShareHouseType : Yup.string()
        .required('Please select a house type'),
        houseSharePrice : Yup.string()
        .required('Please select a price'),
        houseShareRoomType : Yup.string()
        .required('Please select a room type'),
        houseShareHouseType : Yup.string()
        .required('Please select a house type'),
        houseShareEnsuite: Yup.string()
        .required('Please select a value'),
        bio : Yup.string(),
        referenceRequired: Yup.string()
        .required('Please select an option'),
        deposit: Yup.string()
        .required('Please select a value'),

        houseMateDetailOption : Yup.string()
        .required('Please select a option'),
        houseMateGender : Yup.string()
        .required('Please select a gender'),
        houseMateAge : Yup.string()
        .required('Please select a age'),
        houseMateOccupation : Yup.string()
        .required('Please select an occupation'),
        occupationDropdownValue: Yup.string()
       .required('Please select a value'),
        houseMateSmoking : Yup.string()
        .required('Please select an option'),
        houseMateExpect: Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a value'),
        environment: Yup.string()
        .notOneOf(['Select an option'], 'Please select a value')
        .required('Please select a value')
      });

      const HouseRentalSchema = Yup.object().shape({
        addType : Yup.string(),
        addressLine1: Yup.string()
        .required('Please enter the first line of the address'),
        addressLine2: Yup.string()
        .required('Please enter the second line of the address'),
        city: Yup.string()
        .required('Please enter the city for the address'),
        county: Yup.string()
        .required('Please enter the county for the address'),
        zip: Yup.string(),
        numRooms: Yup.string()
        .required('Please enter the city for the address'),
        houseRentalHouseType : Yup.string()
        .required('Please select a house type'),
        houseRentalPrice : Yup.string()
        .required('Please select a price'),
        bio : Yup.string(),

        tenantDetailOption : Yup.string()
        .required('Please select an option'),
        tenantMateGender : Yup.string()
        .required('Please select a gender'),
        tenantMateOccupation : Yup.string()
        .required('Please select a occupation'),
        houseMateSmoking : Yup.string()
        .required('Please select an option'),
        referenceRequired: Yup.string()
        .required('Please select an option'),
        deposit: Yup.string()
        .required('Please select a value')
      });

      const DigsSchema = Yup.object().shape({
        addType : Yup.string(),
        addressLine1: Yup.string()
        .required('Please enter the first line of the address'),
        addressLine2: Yup.string()
        .required('Please enter the second line of the address'),
        city: Yup.string()
        .required('Please enter the city for the address'),
        county: Yup.string()
        .required('Please enter the county for the address'),
        zip: Yup.string(),
        numOccupants: Yup.string()
        .required('Please enter the city for the address'),
        digsHouseType : Yup.string()
        .required('Please select a house type'),
        digsPrice : Yup.string()
        .required('Please select a price'),
        digsDays: Yup.string()
        .required('Please select a value'),
        digsMealIncluded: Yup.string()
        .required('Please select a value'),
        referenceRequired: Yup.string()
        .required('Please select an option'),
        deposit: Yup.string()
        .required('Please select a value'),
        bio : Yup.string(),
      
        digsDetailOption : Yup.string()
        .required('Please select an option'),
        digsGender : Yup.string()
        .required('Please select a gender'),
        digsAge : Yup.string()
        .required('Please select a age'),
        tenantMateOccupation : Yup.string()
        .required('Please select a occupation'),
        houseMateSmoking : Yup.string()
        .required('Please select an option'),
      
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