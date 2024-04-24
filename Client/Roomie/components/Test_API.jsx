import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import fetchDataFromDatabase from '../functions/fetchDataFromDatabase';
import postDataToDatabase from '../functions/postDataToDatabase';
import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference, environmentOptions, houseMatExpectations ,irishCounties, number, houseType, priceRange, days, roomType } from '../data/formData';
import  styles  from '../styles/formStyle.style';
import callLambdaFunction from '../functions/PostAPI';

const Test_API = ({navigation, route}) => {
    const { formData } = route.params;
   
    const test = async () => {

        
        console.log(formData); 

      //await postDataToDatabase(formData,'https://loj7yuy5gf.execute-api.eu-west-1.amazonaws.com/dev/adds')
      //await postDataToDatabase(JSON.stringify(formData),'https://loj7yuy5gf.execute-api.eu-west-1.amazonaws.com/dev/test')
       await postDataToDatabase(formData,'https://loj7yuy5gf.execute-api.eu-west-1.amazonaws.com/dev/testproxy')
      
    }

    const handleButtonPress = () => {
        let signUpUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/add'; // end point for form post

        callLambdaFunction(formData, signUpUrl); // working 
      };

  return (

      <View>
         <Card elevation={5} style={styles.card}>
            <Card.Content>
                <View style={styles.header}>
                    <Title style={styles.title}>API Testing:</Title>
                     <IconButton
                        icon="arrow-left"
                        mode="text"
                        size={30}
                        iconColor='#1c1b1fde'
                        style={{flex:1,alignItems: 'flex-end'}}
                        onPress={() => navigation.goBack()}>
                    </IconButton>
                </View>
            </Card.Content>
        </Card>

        <Card elevation={5} style={styles.card}>
            <Card.Content>
            <Button icon="test-tube" mode="contained" onPress={handleButtonPress}>
                Test
            </Button>
            </Card.Content>
        </Card>

    </View>
  )
}

export default Test_API