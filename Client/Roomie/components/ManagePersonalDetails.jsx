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

const ManagePersonalDetails = ({ navigation, route }) => {

    const { signedInUserDetails } = useAppContext();
    const {refreshDetails} = useAppContext();

    const [selectedButton, setSelectedButton] = useState(1);
    const [updating, setUpdating] = useState(false);


    const isButtonSelected = (buttonId) => selectedButton === buttonId;

    const _renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                <Image style={styles.icon} source={require('../assets/Icons/twitter.png')} />
            </View>
        );
    };

    const updateDetails = async (values) => {
        console.log(values)

        setUpdating(true);
        let res = await putAPI(`https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/user`, values);
        let t = await refreshDetails()
        console.log(t)
        setUpdating(false);
    }


    const DetailSchema = Yup.object().shape({
        uid: Yup.string(),

        addressLine1: Yup.string()
            .required('Please enter the first line of the address'),
        addressLine2: Yup.string()
            .required('Please enter the second line of the address'),
        city: Yup.string()
            .required('Please enter the city for the address'),
        county: Yup.string()
            .required('Please enter the county for the address'),
        zip: Yup.string(),

        bio: Yup.string(),
        occupation: Yup.string()
            .notOneOf(['Select an option'], 'Please select an occupation')
            .required('Please select an occupation'),
        occupationDropdownValue: Yup.string()
            .notOneOf(['Select an option'], 'Please select a value')
            .required('Please select a value'),
        smoke: Yup.string()
            .notOneOf(['Select an option'], 'Please select a value')
            .required('Please select a value'),


        shareData: Yup.string()
            .notOneOf(['Select an option'], 'Please select a value')
            .required('Please select a value'),
        shareName: Yup.string()
            .notOneOf(['Select an option'], 'Please select a value')
            .required('Please select a value'),
    });


    return (
        <Formik
            initialValues={{

                uid: signedInUserDetails.useridentifier,
                addressLine1: signedInUserDetails.addressline1,
                addressLine2: signedInUserDetails.addressline2,
                city: signedInUserDetails.city,
                county: signedInUserDetails.county,
                zip: signedInUserDetails.eircode,
                bio: signedInUserDetails.bio,
                smoke: signedInUserDetails.smoke,
                occupation: signedInUserDetails.occupationtitle,
                occupationDropdownValue: signedInUserDetails.occupationdetail,
                shareName: signedInUserDetails.sharename.toString(),
                shareData: signedInUserDetails.sharedata.toString(),
            }}
            validationSchema={DetailSchema}
            onSubmit={values => updateDetails(values)
            }
        >
            {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit, dirty }) => (

                <View style={styles.container}>
                    <Card elevation={5} style={styles.card}>
                        <Card.Content>
                            <View style={styles.header}>
                                <View style={[styles2.tabButtons, { width: 300 }]}>
                                    <TouchableOpacity
                                        style={[
                                            styles2.tabButton,
                                            selectedButton === 1 && styles2.selectedTab,
                                        ]}
                                        onPress={() => setSelectedButton(1)}
                                    >
                                        <Text>Address</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles2.tabButton,
                                            selectedButton === 2 && styles2.selectedTab,
                                        ]}
                                        onPress={() => setSelectedButton(2)}
                                    >
                                        <Text>Details</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles2.tabButton,
                                            selectedButton === 3 && styles2.selectedTab,
                                        ]}
                                        onPress={() => setSelectedButton(3)}
                                    >
                                        <Text>Privacy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>


                    {selectedButton === 1 && (
                        <Card elevation={5} style={[styles.card]}>
                            <Card.Content>
                                <Title style={styles.title}>Address:</Title>
                                <View>
                                    <Text style={styles.label}>Address Line 1:</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter address line 1"
                                        onChangeText={handleChange('detail.addressLine1')}
                                        value={values.addressLine1}
                                        onBlur={() => { setFieldTouched('detail.addressLine1'); console.log(values) }}
                                    />
                                    {touched.addressLine1 && errors.addressLine1 && (
                                        <View>
                                            <Text style={styles.errorTxt}>{errors.addressLine1}</Text>
                                        </View>
                                    )}
                                </View>

                                <View >
                                    <Text style={styles.label}>Address Line 2:</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter address line 2"
                                        onChangeText={handleChange('addressLine2')}
                                        value={values.addressLine2}
                                        onBlur={() => setFieldTouched('addressLine2')}
                                    />
                                    {touched.addressLine2 && errors.addressLine2 && (
                                        <View>
                                            <Text style={styles.errorTxt}>{errors.addressLine2}</Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.sameLineContainer}>
                                    <View style={styles.lineInput}>
                                        <Text style={styles.label}>City:</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter city"
                                            onChangeText={handleChange('city')}
                                            value={values.city}
                                            onBlur={() => setFieldTouched('city')}
                                        />
                                        {touched.city && errors.city && (
                                            <View>
                                                <Text style={styles.errorTxt}>{errors.city}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.lineInput}>
                                        <Text style={styles.label}>County:</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            data={irishCounties}
                                            labelField="label"
                                            valueField="value"
                                            search
                                            searchPlaceholder="Search"
                                            disableSelect
                                            value={values.county}
                                            onBlur={() => setFieldTouched('county')}
                                            onChange={item => {
                                                setFieldValue('county', item.value);
                                                console.log('selected', item);
                                            }}
                                            renderItem={item => _renderItem(item)}
                                        />
                                        {touched.county && errors.county && (
                                            <Text style={[styles.errorTxt, { marginTop: 18, marginBottom: 0 }]}>{errors.county}</Text>
                                        )}
                                    </View>
                                </View>

                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>Eircode</Text>
                                    <TextInput
                                        style={[styles.input, styles.singleLineInput]}
                                        placeholder="Enter eircode"
                                        onChangeText={handleChange('zip')}
                                        value={values.zip}
                                        onBlur={() => setFieldTouched('zip')}
                                    />
                                </View>
                            </Card.Content>
                            {updating && (
                                    <View>
                                           <ActivityIndicator size="large" color="#6200EE" />
                                    </View>
                                )}
                            <Button
                                mode="contained"
                                color="#FF5733"
                                style={{ marginVertical: 20, padding: 2 }}
                                labelStyle={styles.buttonLabel}
                                disabled={!isValid || !dirty}
                                onPress={handleSubmit}>
                                Save Changes
                            </Button>
                        </Card>
                    )}
                    {selectedButton === 2 && (

                        <Card elevation={5} style={styles.card}>
                            <Card.Content>
                                <Title style={styles.title}>Personal Details</Title>
                                <View >
                                    <Text style={styles.label}>Bio</Text>
                                    <TextInput
                                        style={styles.input}
                                        multiline
                                        numberOfLines={3}
                                        placeholder="Type your bio here..."
                                        onChangeText={handleChange('bio')}
                                        value={values.bio}
                                        onBlur={() => setFieldTouched('bio')}
                                    />
                                </View>
                                <View style={styles.sameLineContainer}>
                                    <View style={styles.lineInput}>
                                        <Text style={styles.label}>Occupation:</Text>
                                        <Picker
                                            style={styles.input}
                                            selectedValue={values.occupation}
                                            onValueChange={handleChange('occupation')}
                                            onBlur={() => setFieldTouched('occupation')}
                                        >
                                            {occupationOptions.map((option, index) => (
                                                <Picker.Item key={index} label={option.label} value={option.value} />
                                            ))}
                                        </Picker>
                                        {touched.occupation && errors.occupation && (
                                            <Text style={styles.errorTxt}>{errors.occupation}</Text>
                                        )}
                                    </View>
                                    <View style={styles.lineInput}>

                                        {values.occupation === 'Working Professional' ? (
                                            <Text style={styles.label}>Working Hours:</Text>
                                        ) :
                                            (
                                                <Text style={styles.label}>Year Of Study:</Text>
                                            )}
                                        <Picker //occupationDropdownValue
                                            style={styles.input}
                                            selectedValue={values.occupationDropdownValue}
                                            onValueChange={handleChange('occupationDropdownValue')}
                                            onBlur={() => setFieldTouched('occupationDropdownValue')}
                                        >
                                            {values.occupation === 'Student'
                                                ? yearOfStudyOptions.map((option, index) => (
                                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                                ))
                                                : workingHoursOptions.map((option, index) => (
                                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                                ))}
                                        </Picker>
                                        {touched.occupationDropdownValue && errors.occupationDropdownValue && (
                                            <Text style={styles.errorTxt}>{errors.occupationDropdownValue}</Text>
                                        )}
                                    </View>
                                </View>

                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>Do You Smoke?</Text>
                                    <Picker
                                        style={[styles.input, styles.singleLineInput]}
                                        selectedValue={values.smoke}
                                        onValueChange={handleChange('smoke')}
                                        onBlur={() => setFieldTouched('smoke')}
                                    >
                                        {yesNO.map((option, index) => (
                                            <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                    {touched.smoke && errors.smoke && (
                                        <Text style={styles.errorTxt}>{errors.smoke}</Text>
                                    )}
                                </View>
                                {updating && (
                                    <View>
                                           <ActivityIndicator size="large" color="#6200EE" />
                                    </View>
                                )}
                                <Button
                                    mode="contained"
                                    color="#FF5733"
                                    style={{ marginVertical: 20, padding: 2 }}
                                    labelStyle={styles.buttonLabel}
                                    disabled={!isValid || !dirty}
                                    onPress={handleSubmit}>
                                    Save Changes
                                </Button>

                            </Card.Content>
                        </Card>
                    )}
                    {selectedButton === 3 && (
                        <Card elevation={5} style={styles.card}>
                            <Card.Content>
                                <Title style={styles.title}>Preferences</Title>
                                <Text style={styles.label}>Share name on profile page:</Text>
                                <RadioButton.Group onValueChange={(newValue) => setFieldValue('shareName', newValue)} value={values.shareName}>
                                    <View style={styles.radioContainer}>
                                        <RadioButton.Item label="Yes" value="1" />
                                        <RadioButton.Item label="No" value="0" />
                                    </View>
                                </RadioButton.Group>
                                {errors.shareName && (
                                    <Text style={[styles.errorTxt]}>{errors.shareName}</Text>
                                )}

                                <Text style={styles.label}>Consent to share your data:</Text>
                                <RadioButton.Group onValueChange={(newValue) => setFieldValue('shareData', newValue)} value={values.shareData}>
                                    <View style={styles.radioContainer}>
                                        <RadioButton.Item label="Yes" value="1" />
                                        <RadioButton.Item label="No" value="0" />
                                    </View>
                                </RadioButton.Group>
                                {errors.shareData && (
                                    <Text style={[styles.errorTxt]}>{errors.shareData}</Text>
                                )}
                                {updating && (
                                    <View>
                                           <ActivityIndicator size="large" color="#6200EE" />
                                    </View>
                                )}
                                <Button
                                    mode="contained"
                                    color="#FF5733"
                                    style={{ marginVertical: 20, padding: 2 }}
                                    labelStyle={styles.buttonLabel}
                                    disabled={!isValid || !dirty}
                                    onPress={handleSubmit}>
                                    Save Changes
                                </Button>

                            </Card.Content>
                        </Card>
                    )}
                </View>
            )}
        </Formik>
    )
}

const styles2 = StyleSheet.create({

    largeImage: {
        width: '100%',
        height: 200
    },
    smallImage: {
        width: 102.5,
        height: 102.5,
        marginRight: 10,
        borderRadius: 0,
        marginTop: 10
    },
    imageList: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        height: 120
    },
    card: {
        margin: 10,
        borderRadius: 0,
        backgroundColor: '#FFF',
        marginBottom: 10,
        padding: 5
    },


    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    imageList: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        height: 120
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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

export default ManagePersonalDetails