import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Checkbox, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import callLambdaFunction from '../functions/PostAPI';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { yesNO, priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days } from '../data/formData';
import styles from '../styles/formStyle.style';
import { generateUUID } from '../functions/CommonFunctions';
import { useAppContext } from '../Providers/AppContext';
import StepIndicator from 'react-native-step-indicator';


const RentalPreferencesForm = ({ navigation, route }) => {

  const { rentalPref, formData } = route.params;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const auth = FIREBASE_AUTH;
  const { firebaseUser, setFirebaseUser } = useAppContext();

  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7','Step 8'];

  const [currentStep, setCurrentStep] = useState(5);

  const onPressNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onPressPrevious = () => {
    if (currentStep == 5)
      navigation.goBack()
    else
      setCurrentStep(currentStep - 1);


  };


  const insertUser = async (formData) => {
    let signUpUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/user';
    setUploading(true);
    let res = await callLambdaFunction(formData, signUpUrl); // working 
    console.log(res);
  };

  const SignupSchema = Yup.object().shape({

    houseSharePriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please enter a minimum price')
      .required('Please enter a minimum price'),
    houseSharePriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please enter a maximum price')
      .required('Please enter a maximum price'),
    houseShareRoomType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a room type'),
    houseShareHouseType: Yup.string()
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

  const isFormVisible = (value) => {
    return rentalPref.includes(value);
  };


  const signUp = async (values) => {
    const formsToCombine = { ...formData, ...values }
    setLoading(true);
    try {

      formsToCombine.selectedRentalPref = formsToCombine.selectedRentalPref.map(item => `'${item}'`).join(', ');
      formsToCombine.userIdentifier = generateUUID();

      console.log(formsToCombine)


      const r = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(r);

      setFirebaseUser(r.user);

      await insertUser(formsToCombine);

      alert('Check your emails!');
    } catch (error) {
      console.log(error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          houseSharePriceRangeMin: '700',
          houseSharePriceRangeMax: '1200',
          houseShareRoomType: 'Double',
          houseShareHouseType: 'Apartment',
          houseShareEnsuite: '1',
          houseMateExpect: 'Friendly',
          environment: 'Social',

          houseRentalPriceRangeMin: '500',
          houseRentalPriceRangeMax: '1200',
          numRooms: '3',
          houseRentalHouseType: 'Apartment',

          digsPriceRangeMin: '200',
          digsPriceRangeMax: '600',
          digsRoomType: 'Double',
          digsHouseType: 'Apartment',
          digsDays: 'Mon-Friday',
          digsMealIncluded: '1'
        }}
        validationSchema={SignupSchema}
        onSubmit={values => signUp(values)}
      >

        {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit }) => (

          <View style={styles.container}>
            <Card elevation={5} style={[styles.card, { paddingHorizontal: 15 }]}>
              <Card.Content>
                <View style={styles.header}>
                  <Title style={styles.title}>Rental Preferences</Title>
                  <IconButton
                    icon="arrow-left"
                    mode="text"
                    size={30}
                    style={{ flex: 1, alignItems: 'flex-end' }}
                    onPress={() => navigation.goBack()}>
                  </IconButton>
                </View>

                
                  <StepIndicator
                    stepCount={steps.length}
                    currentPosition={currentStep}
                    pulse={false}
                    customStyles={stepIndicatorStyles}
                  />

              
              </Card.Content>
            </Card>
            {currentStep === 5 && (
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
                          {touched.houseSharePriceRangeMin && errors.houseSharePriceRangeMin && (
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
                          {touched.houseSharePriceRangeMax && errors.houseSharePriceRangeMax && (
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
                          {touched.houseShareRoomType && errors.houseShareRoomType && (
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
                          {touched.houseShareHouseType && errors.houseShareHouseType && (
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
                        {touched.houseShareEnsuite && errors.houseShareEnsuite && (
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
                          {touched.houseMateExpect && errors.houseMateExpect && (
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
                          {touched.environment && errors.environment && (
                            <Text style={styles.errorTxt}>{errors.environment}</Text>
                          )}
                        </View>
                      </View>

                      <View style={styles2.buttonContainer}>
                        <TouchableOpacity
                          style={[styles2.b2, { marginRight: 10 }]}
                          onPress={onPressPrevious}
                          disabled={currentStep === 0}
                        >
                          <Text style={styles2.buttonText}>Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles2.b2}
                          onPress={onPressNext}
                          disabled={currentStep === steps.length - 1}
                        >
                          <Text style={styles2.buttonText}>Next</Text>
                        </TouchableOpacity>
                      </View>

                    </Card.Content>
                  </Card>
                )}
              </View>
            )}

            {currentStep === 6 && (
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
                          {touched.houseRentalPriceRangeMin && errors.houseRentalPriceRangeMin && (
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
                          {touched.houseRentalPriceRangeMax && errors.houseRentalPriceRangeMax && (
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
                          {touched.numRooms && errors.numRooms && (
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
                          {touched.houseRentalHouseType && errors.houseRentalHouseType && (
                            <Text style={styles.errorTxt}>{errors.houseRentalHouseType}</Text>
                          )}
                        </View>
                      </View>
                      <View style={styles2.buttonContainer}>
                        <TouchableOpacity
                          style={[styles2.b2, { marginRight: 10 }]}
                          onPress={onPressPrevious}
                          disabled={currentStep === 0}
                        >
                          <Text style={styles2.buttonText}>Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles2.b2}
                          onPress={onPressNext}
                          disabled={currentStep === steps.length - 1}
                        >
                          <Text style={styles2.buttonText}>Next</Text>
                        </TouchableOpacity>
                      </View>
                    </Card.Content>
                  </Card>
                )}
              </View>
            )}

            {currentStep === 7 && (
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
                          {touched.digsPriceRangeMin && errors.digsPriceRangeMin && (
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
                          {touched.digsPriceRangeMax && errors.digsPriceRangeMax && (
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
                          {touched.digsRoomType && errors.digsRoomType && (
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
                          {touched.digsHouseType && errors.digsHouseType && (
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
                          {touched.digsDays && errors.digsDays && (
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
                          {touched.digsMealIncluded && errors.digsMealIncluded && (
                            <Text style={styles.errorTxt}>{errors.digsDays}</Text>
                          )}
                        </View>
                      </View>
                      {loading ? <View style={styles.activityContainer}><ActivityIndicator size="large" color="#0000ff" /></View>
                        : <>
                        </>}
                      <View style={styles2.buttonContainer}>
                        <Button
                          style={[styles2.button, { marginRight: 10 }]}
                          onPress={onPressPrevious}
                          disabled={currentStep === 0}
                        >
                          <Text style={styles2.buttonText}>Previous</Text>
                        </Button>
                        <Button
                          mode="contained"
                          color="#FF5733"
                          labelStyle={styles.buttonLabel}
                          disabled={!isValid}
                          style={styles2.button}
                          onPress={handleSubmit}>
                            
                          Create Account
                        </Button>
                      </View>
                    </Card.Content>
                  </Card>
                )}
              </View>
            )}
          </View>

        )}
      </Formik>
    </ScrollView>
  )
}

const stepIndicatorStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 3,
  stepStrokeWidth: 3,
  stepStrokeCurrentColor: '#6750a4', // Change color to match #6200EE
  stepStrokeFinishedColor: '#6750a4', // Change color to match #6200EE
  stepStrokeUnFinishedColor: '#AAAAAA', // Adjusted to a lighter shade to pair with #6200EE
  separatorFinishedColor: '#6750a4', // Change color to match #6200EE
  separatorUnFinishedColor: '#AAAAAA', // Adjusted to a lighter shade to pair with #6200EE
  stepIndicatorFinishedColor: '#6750a4', // Change color to match #6200EE
  stepIndicatorUnFinishedColor: '#FFFFFF', // Adjusted to white to pair with #6200EE
  stepIndicatorCurrentColor: '#FFFFFF', // Adjusted to white to pair with #6200EE
  stepIndicatorLabelCurrentColor: '#6750a4', // Change color to match #6200EE
  stepIndicatorLabelFinishedColor: '#FFFFFF', // Adjusted to white to pair with #6200EE
  stepIndicatorLabelUnFinishedColor: '#AAAAAA', // Adjusted to a lighter shade to pair with #6200EE
  labelColor: '#999999',
  currentStepLabelColor: '#6750a4', // Change color to match #6200EE
};

const styles2 = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
  },
  button: {
    backgroundColor: '#6750a4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignContent: 'center'
  },
  b2: {
    backgroundColor: '#6750a4',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default RentalPreferencesForm






