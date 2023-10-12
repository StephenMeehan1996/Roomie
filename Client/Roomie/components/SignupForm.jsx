import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference } from '../data/formData';
import  styles  from '../styles/formStyle.style';

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
  .notOneOf(['Select an option'], 'Please select a gender')
  .required('Please select a gender'),
  dob: Yup.string()
  .required('Please select your date of birth'),
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
  smoke: Yup.string()
  .notOneOf(['Select an option'], 'Please select a value')
  .required('Please select a value'),
  shareName: Yup.string()
  .notOneOf(['Select an option'], 'Please select a value')
  .required('Please select a value'),
  shareData: Yup.string()
  .notOneOf(['Select an option'], 'Please select a value')
  .required('Please select a value'),
  selectedRentalPref: Yup.array().of(Yup.string())
  .notOneOf(['Select an option'], 'Please select value')
  .required('Please select at least one value'),

});

const SignUpForm = ({navigation}) => {

  const [firstName, setFirstName] = useState('Stephen');
  const [lastName, setLastName] = useState('Meehan');
  const [email, setEmail] = useState('StephenMeehan@gmail.com');
  const [gender, setGender] = useState('Male'); // Dropdown selector state
  const [age, setAge] = useState(''); // Calculated age
  const [dob, setDob] = useState('');

  const [bio, setBio] =  useState('Bio');
  const [occupation, setOccupation] =  useState('Working Professional');
  const [occupationDetailLabel, setOccupationDetailLabel] = useState('Working Hours'); // State for the label of the second dropdown
  const [occupationDropdownValue, setOccupationDropdownValue] = useState('9-5');
  const [smoke, setSmoke] = useState('Yes');
  const [profilePicURL, setProfilePicURL] = useState('N/A');
  const [intoVideoURL, setintoVideoURL] = useState('N/A');

  const [shareName, setShareName] = useState(false);
  const [shareData, setShareData] = useState(false);

  const [selectedRentalPref, setSelectedRentalPref] = useState(['House Share', 'House Rental', 'Digs']);

  const [formData, setFormData] = useState([]);
  const [open, setOpen] = React.useState(false); // var for calendar open/close 
  
  const handleOccupationChange = (value) => {
    setOccupation(value);
    if (value === '' || value === 'Working Professional') {
      setOccupationDetailLabel('Working Hours');
      setOccupationDropdownValue(workingHoursOptions[0]); 
    } else if (value === 'Student') {
      setOccupationDetailLabel('Year of Study');
      setOccupationDropdownValue(yearOfStudyOptions[0]); 
    }
  };
  
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDob(params.date);
      setAge(calculateAge());
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

  const handleSignUp = () => {

    console.log('Signing up...');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Gender:', gender);
    console.log('DOB:', dob);
    console.log('age:', age);
    console.log('occupation:', occupation);
    console.log('detail:', occupationDropdownValue);
    console.log('shareName:', shareName);
    console.log('sharedata:', shareData);

  };

  const createDataArray = () => {
    const formObj = {
      FirstName : firstName,
      LastName : lastName,
      Email : email,
      //Dob : convertToShortDateString(dob),
      Dob : '10/04/1983',
      Gender : gender,
      Bio : bio,
      Occupation : occupation,
      OccupationDropdownValue : occupationDropdownValue,
      Smoke : smoke,
      ProfilePicURL : profilePicURL,
      IntoVideoURL : intoVideoURL,
      SelectedRentalPref : selectedRentalPref,
      ShareName: shareName,
      ShareData: shareData
    };

    setFormData([formObj]);
    
    console.log(formData);
   
    navigation.navigate('RentalPreferences', { 
      rentalPref: selectedRentalPref, 
      formData: formData 
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

  const signUp = async () =>{
    setLoading(true);
    try{
        const responce = await createUserWithEmailAndPassword(auth, email, password);
        console.log(responce); 
        alert('Check your emails!');
     } catch (error){
        console.log(error);
        alert('Registration failed: ' + error.message);
     } finally{
        setLoading(false); 
     }
}

useEffect(() => {
  setAge(calculateAge(dob));
}, [dob]);

  return (
    <ScrollView>
       <Formik
       initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          gender: '',
          dob: '',
          occupation: '',
          occupationDropdownValue: '',
          smoke: '',
          profilePicURL: '',
          intoVideoURL: '',
          smoke: '',
          shareName: '',
          shareData: '',
          selectedRentalPref: '',
       }}
       validationSchema={SignupSchema}
       >
        {({ values, errors, touched, handleSubmit}) => (
      <View style={styles.container}>
      <Card elevation={5} style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Personal Details</Title>
            <View>
              <View style={styles.sameLineContainer}>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={firstName}
                    placeholder="Enter your first name"
                  />
                </View>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    value={lastName}
                    placeholder="Enter your last name"
                  />
                </View>
              </View>

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              
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
                </View>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>Gender</Text>
                  <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue) => setGender(itemValue)}  
                  >
                    {genderOptions.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                </View>
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
                    date={dob}
                    onConfirm={onConfirmSingle}
                  />
                </View>
        </SafeAreaProvider>
      </Card>

      <Card elevation={5} style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Personal Details</Title>
          <View >
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={3}
              value={bio}
              onChangeText={(newText) => setBio(newText)}
              placeholder="Type your text here..."
            />
          </View>
          <View style={styles.sameLineContainer}>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>Occupation:</Text>
                  <Picker
                    style={styles.input}
                    selectedValue={occupation}
                    onValueChange={(itemValue) => handleOccupationChange(itemValue)}
                    >
                      {occupationOptions.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                 </View>
                 <View style={styles.lineInput}>
                    <Text style={styles.label}>{occupationDetailLabel}:</Text>
                    <Picker
                      style={styles.input}
                      selectedValue={occupationDropdownValue}
                      onValueChange={(itemValue) => setOccupationDropdownValue(itemValue)}
                    >
                      {occupation === 'Student'
                        ? yearOfStudyOptions.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))
                        : workingHoursOptions.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                    </Picker>
                 </View>
            </View>
            
            <View style={styles.lineInput}>
                <Text style={styles.label}>Do You Smoke?</Text>
                <Picker
                    style={[styles.input, styles.singleLineInput]}
                    selectedValue={smoke}
                    onValueChange={(itemValue) => setSmoke(itemValue)}
                    >
                    {yesNO.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
            <View>
              <Text style={styles.label}>Upload Profile Picture</Text>
              <View style={styles.singleLineInputLong}>
                <Button 
                  icon="camera-outline"  
                  uppercase={false} 
                  mode="outlined" 
                  style={{width:120, marginRight: 20}}
                  onPress={() => setProfilePicURL('placeholder')}>
                  Upload
                </Button>
                <View style={styles.profilePictureContainer}>
                    <Image
                      source={require('../assets/Icons/images/kemal.jpg')}
                      style={styles.profilePicture}
                    />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Upload Intro Video</Text>
              <View style={styles.singleLineInputLong}>
                <Button 
                  icon="cloud-upload-outline" 
                  uppercase={false} mode="outlined" 
                  style={{width:120, marginRight: 20}}
                  onPress={() => setintoVideoURL('placeholder')}>
                  Upload
                </Button>
              </View>
            </View>
          </Card.Content>
       </Card>

       <Card elevation={5} style={styles.card}>
          <Card.Content>

            <Title style={styles.title}>Preferences</Title>
            <Text style={styles.label}>Share name on profile page:</Text>
            <RadioButton.Group onValueChange={(value) => setShareName(value)} value={shareName}>
              <View style={styles.radioContainer}>
                <RadioButton.Item label="Yes" value="1" />
                <RadioButton.Item label="No" value= "0" />
              </View>
            </RadioButton.Group>

            <Text style={styles.label}>Consent to share your data:</Text>
            <RadioButton.Group onValueChange={(value) => setShareData(value)} value={shareData}>
              <View style={styles.radioContainer}>
                <RadioButton.Item label="Yes" value="1" />
                <RadioButton.Item label="No" value= "0" />
              </View>
            </RadioButton.Group>

            <MultiSelect
                    style={styles.dropdown}
                    data={rentalPreference}
                    labelField="label"
                    valueField="value"
                    label="Multi Select"
                    placeholder="What are you interested in:"
                    search
                    searchPlaceholder="Search"
                    value={selectedRentalPref}
                    onChange={item => {
                    setSelectedRentalPref(item);
                        console.log('selected', item);
                    }}
                    renderItem={item => _renderItem(item)}
                />

               <Button
                mode="contained" 
                color="#FF5733"
                style={{marginVertical: 20, padding: 2}} 
                labelStyle={styles.buttonLabel} 
                onPress={() => createDataArray()}>
                Next Page
              </Button>
         
    
          </Card.Content>
        </Card>
       </View>
       )}
       </Formik>
    </ScrollView>
  );
};


export default SignUpForm;