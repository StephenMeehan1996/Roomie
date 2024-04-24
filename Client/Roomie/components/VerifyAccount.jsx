import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Checkbox, RadioButton, Icon } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import callLambdaFunction from '../functions/PostAPI';
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
import { useAppContext } from '../Providers/AppContext';
import { sendEmailVerification, PhoneAuthProvider, multiFactor } from 'firebase/auth';
import formStyles from '../styles/formStyle.style';


const VerifyAccount = ({ navigation, route }) => {

    const [buttonText, setButtonText] = useState('Send Verification Email');
    const [paraText, setParaText] = useState('Verify you email address, once completed this will be displayed on your profile page. ')
    const [emailVerified, setEmailVerified] = useState(true)
    const { firebaseUser, setFirebaseUser } = useAppContext();
    const [selectedApplicationTab, setSelectedApplicationTab] = useState('Tab1');

    console.log(FIREBASE_AUTH.currentUser)
    // let s = sendEmailVerification
    // const verifyEmail = async () =>{

    //      try{

    //       let t = await firebaseUser.sendEmailVerification();

    //      }catch(err){
    //         console.log(err)

    //      }

    // }

    const verifyEmail = async () => {

        if (buttonText === 'Email Has Been Verified') {

            if (FIREBASE_AUTH.currentUser) {
                const user = FIREBASE_AUTH.currentUser.reload().then(() => {
                    console.log(FIREBASE_AUTH.currentUser);

                    if (FIREBASE_AUTH.currentUser.emailVerified === true)
                        setFlagInDB();
                });
            } else {
                console.log('No authenticated user');
            };

        }
        else {
            if (FIREBASE_AUTH.currentUser != null) {

                setButtonText('Email Has Been Verified')
                setParaText('Go to your email, click the link that has been sent. Once clicked return here and click the button below. ')

                let r = await sendEmailVerification(FIREBASE_AUTH.currentUser)
                    .then(() => {

                        console.log(r);

                    })
                    .catch((error) => {
                        console.error('Error sending verification email:', error);
                    });
            }
        }
    }

    const setFlagInDB = async () => {

        alert('true');
        setEmailVerified(true);

    }

    const renderApplicationTabContent = () => {
        switch (selectedApplicationTab) {
            case 'Tab1':
                return (
                    <View style={styles2.container}>
                        <Title style={[styles.black, styles2.title]}>Verify Email</Title>

                        {emailVerified ? (
                            <View style={styles.container}>
                                <Title style={[styles.black, styles2.title2]}>Email Verified</Title>
                            </View>
                        ) : (
                            <Paragraph style={{ marginVertical: 15, padding: 5 }}>{paraText}</Paragraph>
                        )}


                        <Button mode="contained"
                            style={{ borderRadius: 0, marginVertical: 10, backgroundColor: '#6750a4' }}
                            onPress={() => verifyEmail()}
                        >
                            <Text style={{ color: 'white' }}>{buttonText}</Text>
                        </Button>
                    </View>

                );
            case 'Tab2':
                return (
                    <View>

                        <Title style={[styles.black, styles2.title]}>Verify Number</Title>

                        <TextInput
                            label="Mobile Number"
                            mode="outlined"
                            placeholder='Enter Phone Number'
                            keyboardType="phone-pad"
                            style={styles2.input}
                        />
                        <Button mode="contained" style={{ borderRadius: 0, marginVertical: 10, backgroundColor: '#6750a4' }} onPress={() => verifyNum()} >
                            <Text style={{ color: 'white' }}>Verify Number</Text>
                        </Button>

                    </View>

                );
            default:
                return null;
        }
    };

    // const phoneInfoOptions = {
    //     phoneNumber: '0862081923',
    //     session: multiFactorSession
    //   };

    // const verifyNum = async () => {

    //     multiFactor(user).getSession().then(function (multiFactorSession) {
    //         // ...
    //     });

    //     const phoneAuthProvider = new PhoneAuthProvider(FIREBASE_AUTH);
    //     phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
    //         .then(function (verificationId) {
    //             // verificationId will be needed to complete enrollment.
    //         });


    // }

    return (
        <ScrollView>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.header}>

                        <View style={[styles2.tabButtons, { width: 300 }]}>
                            <TouchableOpacity
                                style={[
                                    styles2.tabButton,
                                    selectedApplicationTab === 'Tab1' && styles2.selectedTab,
                                ]}
                                onPress={() => setSelectedApplicationTab('Tab1')}
                            >
                                <Text>Email</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles2.tabButton,
                                    selectedApplicationTab === 'Tab2' && styles2.selectedTab,
                                ]}
                                onPress={() => setSelectedApplicationTab('Tab2')}
                            >
                                <Text>Number</Text>
                            </TouchableOpacity>

                        </View>

                        <IconButton
                            icon="arrow-left"
                            mode="text"
                            size={30}
                            iconColor='#1c1b1fde'
                            style={{ flex: 1, alignItems: 'flex-end' }}
                            onPress={() => navigation.goBack()}>
                        </IconButton>
                    </View>

                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>

                    {renderApplicationTabContent()}


                </Card.Content>
            </Card>


        </ScrollView>
    )
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    icon: {
        backgroundColor: 'transparent', // Set background color to transparent
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 24,
    },
    title2: {
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 20,
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
    tabButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 50,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'transparent',
    },
    selectedTab: {
        borderColor: 'blue',
    },
});

export default VerifyAccount