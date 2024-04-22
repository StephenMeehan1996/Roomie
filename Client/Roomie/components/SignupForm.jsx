import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Checkbox, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import StepIndicator from 'react-native-step-indicator';


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { genderOptions, workingHoursOptions, occupationOptions, yearOfStudyOptions, yesNO, rentalPreference, irishCounties } from '../data/formData';
import styles from '../styles/formStyle.style';


const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name.'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name name.'),
  email: Yup.string().email('Invalid email')
    .required('Please enter your email.'),
  gender: Yup.string()
    .notOneOf([Yup.ref('Select an option')], 'Please select a gender')
    .required('Please select a gender'),
  dateBirth: Yup.string(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long!')
    .required('Please enter your password.')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Must contain minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character'),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters long')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
    .required('Confirm password is required.'),
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
  profilePicURL: Yup.string(),
  intoVideoURL: Yup.string(),
  shareName: Yup.string()
    .notOneOf(['Select an option'], 'Please select a value')
    .required('Please select a value'),
  shareData: Yup.string()
    .notOneOf(['Select an option'], 'Please select a value')
    .required('Please select a value'),
  // selectedRentalPref:  Yup.array().required('Please select at least one option')
  selectedRentalPref: Yup.array().of(Yup.string())
    .required('Please select at least one option')
    .min(1, 'Please select at least one option'),
  addressLine1: Yup.string()
    .required('Please enter the first line of the address'),
  addressLine2: Yup.string()
    .required('Please enter the second line of the address'),
  city: Yup.string()
    .required('Please enter the city for the address'),
  county: Yup.string()
    .required('Please enter the county for the address'),
  zip: Yup.string(),
});

const SignUpForm = ({ navigation }) => {

  const [email, setEmail] = useState('StephenMeehan@gmail.com');
  const [age, setAge] = useState(''); // Calculated age
  const [dob, setDob] = useState('');

  const [open, setOpen] = React.useState(false); // var for calendar open/close 

  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'];

  const [currentStep, setCurrentStep] = useState(1);

  const onPressNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onPressPrevious = () => {
    setCurrentStep(currentStep - 1);
  };


  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDob(params.date);
      setAge(calculateAge());
      validateDob(params.date);
    },
    [setOpen, setDob]
  );

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    console.log(age)
    return age;
  };

  function convertToShortDateString(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date';
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const shortDateString = `${month}/${day}/${year}`;
    return shortDateString;
  }

  const nextPage = (values) => {
    console.log(values);
    navigation.navigate('RentalPreferences', {
      rentalPref: values.selectedRentalPref,
      formData: values
    });
  };

  const _renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        <Image style={styles.icon} source={require('../assets/Icons/twitter.png')} />
      </View>
    );
  };

  useEffect(() => {
    setAge(calculateAge(dob));
  }, [dob]);

  const validateDob = async (value) => {
    try {
      await SignupSchema.validate({ dateBirth: value }, { abortEarly: false });
      // Validation passed
      console.log('true');
      return true
    } catch (error) {
      // Validation failed, handle the error
      console.log('false');
      return false
    }
  };

  return (
    <ScrollView>

      <Formik
        initialValues={{
          firstName: 'Ciara',
          lastName: 'Jones (P400)',
          email: 'cds123meehan@gmail.com',
          //dob: new Date(),
          gender: 'Female',
          dateBirth: dob,
          password: 'Roomie##2',
          confirmPassword: 'Roomie##2',
          bio: 'Passionate explorer navigating the journey of life 🌍. Enthusiastic about technology, art, and the beauty of everyday moments. 🎨✨ Coffee lover, bookworm, and aspiring storyteller',
          occupation: 'Student',
          occupationDropdownValue: '1st',
          smoke: 1,
          userIdentifier: '',
          profilePicURL: '',
          intoVideoURL: '',
          shareName: 1,
          shareData: 1,
          selectedRentalPref: ['House Share', 'House Rental', 'Digs'],
          //added address
          addressLine1: 'Kilgarve, Keadue',
          addressLine2: 'Boyle',
          city: 'Roscommon',
          county: 'Roscommon',
          zip: 'F91 XY32',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => nextPage(values)
        }
      >
        {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit }) => (
          <View style={styles.container}>
            <View>
              <Card elevation={5} style={styles.card}>
                <Card.Content>

                  <View style={styles2.buttonContainer}>
                    <StepIndicator
                      stepCount={steps.length}
                      currentPosition={currentStep}
                      pulse={false}
                      customStyles={stepIndicatorStyles}
                    />

                  </View>
                </Card.Content>
              </Card>
            </View>
            {currentStep === 1 && (
              <Card elevation={5} style={styles.card}>
                <Card.Content>
                  <Title style={styles.title}>Personal Details</Title>
                  <View>
                    <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter your first name"
                          onChangeText={handleChange('firstName')}
                          value={values.firstName}
                          onBlur={() => setFieldTouched('firstName')}
                        />
                        {touched.firstName && errors.firstName && (
                          <Text style={styles.errorTxt}>{errors.firstName}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter your last name"
                          value={values.lastName}
                          onChangeText={handleChange('lastName')}
                          onBlur={() => setFieldTouched('lastName')}
                        />
                        {touched.lastName && errors.lastName && (
                          <Text style={styles.errorTxt}>{errors.lastName}</Text>
                        )}
                      </View>
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorTxt}>{errors.email}</Text>
                    )}

                    <View style={styles.sameLineContainer}>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Date of Birth</Text>
                        {age ? ( // If age has a value it will be displayed inside button
                          <Button icon="calendar-outline" onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                            <Text>Age:{age}</Text>
                          </Button>
                        ) : (
                          <Button icon="calendar-outline" onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                            DOB
                          </Button>
                        )}
                        {errors.dateBirth && (
                          <Text style={[styles.errorTxt, { marginTop: 12 }]}>{errors.dateBirth}</Text>
                        )}
                      </View>
                      <View style={styles.lineInput}>
                        <Text style={styles.label}>Gender</Text>
                        <Picker
                          selectedValue={values.gender}
                          style={styles.input}
                          onValueChange={handleChange('gender')}
                          onBlur={() => setFieldTouched('gender')}
                        >
                          {genderOptions.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                        </Picker>
                        {touched.gender && errors.gender && (
                          <Text style={styles.errorTxt}>{errors.gender}</Text>
                        )}
                      </View>
                    </View>

                    <View >
                      <Text style={styles.label}>Password:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter password"
                        onChangeText={handleChange('password')}
                        value={values.password}
                        onBlur={() => setFieldTouched('password')}

                      />
                      {touched.password && errors.password && (
                        <View >
                          <Text style={[styles.errorTxt, styles.errorMargin]}>{errors.password}</Text>
                        </View>
                      )}
                    </View>

                    <View >
                      <Text style={styles.label}>Confirm Password:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        onChangeText={handleChange('confirmPassword')}
                        value={values.confirmPassword}
                        onBlur={() => setFieldTouched('confirmPassword')}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <View>
                          <Text style={[styles.errorTxt, styles.errorMargin]}>{errors.confirmPassword}</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles2.buttonContainer}>

                      <TouchableOpacity
                        style={styles2.b2}
                        onPress={onPressNext}
                        disabled={currentStep === steps.length - 1}
                      >
                        <Text style={styles2.buttonText}>Next</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </Card.Content>
                <SafeAreaProvider>
                  <View style={{ justifyContent: 'center' }}>
                    <DatePickerModal
                      locale="en"
                      mode="single"
                      visible={open}
                      onDismiss={onDismissSingle}
                      date={values.dateBirth}
                      onDateChange={handleChange('dateBirth')}
                      onConfirm={onConfirmSingle}
                    />
                  </View>
                </SafeAreaProvider>
              </Card>
            )}
            {currentStep === 2 && (

              <Card elevation={5} style={styles.card}>
                <Card.Content>

                  <Title style={styles.title}>Address:</Title>
                  <View >
                    <Text style={styles.label}>Address Line 1:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter address line 1"
                      onChangeText={handleChange('addressLine1')}
                      value={values.addressLine1}
                      onBlur={() => setFieldTouched('addressLine1')}

                    />
                    {touched.addressLine1 && errors.addressLine1 && (
                      <View >
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

            {currentStep === 3 && (
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
            {currentStep === 4 && (
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
                  <MultiSelect
                    style={styles.dropdown}
                    data={rentalPreference}
                    labelField="label"
                    valueField="value"
                    label="Multi Select"
                    placeholder="What are you interested in:"
                    search
                    searchPlaceholder="Search"
                    disableSelect
                    value={values.selectedRentalPref}
                    onBlur={() => setFieldTouched('selectedRentalPref')}
                    onChange={item => {
                      setFieldValue('selectedRentalPref', item);
                      console.log('selected', item);
                    }}
                    renderItem={item => _renderItem(item)}
                  />
                  {touched.selectedRentalPref && errors.selectedRentalPref && (
                    <Text style={[styles.errorTxt]}>{errors.selectedRentalPref}</Text>
                  )}

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
                    style={styles2.button}
                    labelStyle={styles.buttonLabel}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    Rental Preferences
                  </Button>
                  </View>

                </Card.Content>
              </Card>
            )}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const stepIndicatorStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 10,
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



export default SignUpForm;