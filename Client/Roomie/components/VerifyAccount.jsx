import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Checkbox, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import callLambdaFunction from '../functions/PostAPI';
import { useAppContext } from '../Providers/AppContext';
import putAPI from '../functions/PutAPI';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//import { yesNO, priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days } from '../data/formData';
import { genderOptions, workingHoursOptions, occupationOptions, yearOfStudyOptions, yesNO, rentalPreference, irishCounties, priceRange, daysnumber, roomType, houseType, houseMatExpectations, environmentOptions } from '../data/formData';
import styles from '../styles/formStyle.style';
import { generateUUID } from '../functions/CommonFunctions';
import { update } from 'firebase/database';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import { DatePickerModal } from 'react-native-paper-dates';

const VerifyAccount = ({ navigation, route }) => {
    return (
        <ScrollView>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.header}>
                        
                        <IconButton
                            icon="arrow-left"
                            mode="text"
                            size={30}
                            style={{ flex: 1, alignItems: 'flex-end' }}
                            onPress={() => navigation.goBack()}>
                        </IconButton>
                    </View>
      
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                <View style={styles2.container}>
                <Title style={styles2.title}>Verify Email & Mobile</Title>
                <TextInput
                    label="Email"
                    mode="outlined"
                    placeholder='Enter Email'
                    style={styles2.input}
                />
                <TextInput
                    label="Mobile Number"
                    mode="outlined"
                    placeholder='Enter Phone Number'
                    keyboardType="phone-pad"
                    style={styles2.input}
                />
                <Button mode="contained" style={{borderRadius: 0}} >
                    Verify
                </Button>
            </View>
      
                </Card.Content>
            </Card>

          
        </ScrollView>
)}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 24,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        marginTop: 10,
        paddingVertical: 8,
        backgroundColor: '#007bff', // Blue color for the button
    },
});

export default VerifyAccount