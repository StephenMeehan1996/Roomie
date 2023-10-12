import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference } from '../data/formData';
import  styles  from '../styles/formStyle.style';


const SignUpForm = ({navigation}) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Gender, setGender] = useState(''); // Dropdown selector state
  const [Age, setAge] = useState(''); // Calculated age
  const [Dob, setDob] = React.useState(undefined);

  const [Bio, setBio] =  useState('');
  const [Occupation, setOccupation] =  useState('');
  const [OccupationDetailLabel, setOccupationDetailLabel] = useState('Working Hours'); // State for the label of the second dropdown
  const [OccupationDropdownValue, setOccupationDropdownValue] = useState('');
  const [Smoke, setSmoke] = useState('');
  const [ProfilePicURL, setProfilePicURL] = useState('');
  const [IntoVideoURL, setintoVideoURL] = useState('');

  const [ShareName, setShareName] = useState(false);
  const [ShareData, setShareData] = useState(false);

  const [SelectedRentalPref, setSelectedRentalPref] = useState([]);

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
    const birthDate = new Date(Dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    console.log(age)
    return age;
  };

  const handleSignUp = () => {

    console.log('Signing up...');
    console.log('First Name:', FirstName);
    console.log('Last Name:', LastName);
    console.log('Email:', Email);
    console.log('Gender:', Gender);
    console.log('DOB:', Dob);
    console.log('age:', Age);
    console.log('occupation:', Occupation);
    console.log('detail:', OccupationDropdownValue);
    console.log('shareName:', ShareName);
    console.log('sharedata:', ShareData);

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
        const responce = await createUserWithEmailAndPassword(auth, Email, password);
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
  setAge(calculateAge(Dob));
}, [Dob]);

  return (
    <ScrollView>
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
                    value={FirstName}
                    placeholder="Enter your first name"
                  />
                </View>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    value={LastName}
                    placeholder="Enter your last name"
                  />
                </View>
              </View>

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={Email}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              
              <View style={styles.sameLineContainer}>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>Date of Birth</Text>
                  {Age ? ( // If age has a value it will be displayed inside button
                    <Button icon="calendar-outline" onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                    <Text>Age:{Age}</Text>
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
                    selectedValue={Gender}
                    style={styles.input}
                    onValueChange={(itemValue) => setGender(itemValue)}  
                  >
                    {genderOptions.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <Button
                mode="contained" 
                color="#FF5733" 
                labelStyle={styles.buttonLabel}
                onPress={handleSignUp}>
                Create Account
              </Button>
            </View>
        </Card.Content>
        <SafeAreaProvider>
                <View style={{ justifyContent: 'center' }}>
                  <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={open}
                    onDismiss={onDismissSingle}
                    date={Dob}
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
              value={Bio}
              onChangeText={(newText) => setBio(newText)}
              placeholder="Type your text here..."
            />
          </View>
          <View style={styles.sameLineContainer}>
                <View style={styles.lineInput}>
                  <Text style={styles.label}>Occupation:</Text>
                  <Picker
                    style={styles.input}
                    selectedValue={Occupation}
                    onValueChange={(itemValue) => handleOccupationChange(itemValue)}
                    >
                      {occupationOptions.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                 </View>
                 <View style={styles.lineInput}>
                    <Text style={styles.label}>{OccupationDetailLabel}:</Text>
                    <Picker
                      style={styles.input}
                      selectedValue={OccupationDropdownValue}
                      onValueChange={(itemValue) => setOccupationDropdownValue(itemValue)}
                    >
                      {Occupation === 'Student'
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
                    selectedValue={Smoke}
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
                <Button icon="camera-outline"  uppercase={false} mode="outlined" style={{width:120, marginRight: 20}}>
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
                <Button icon="cloud-upload-outline" uppercase={false} mode="outlined" style={{width:120, marginRight: 20}}>
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
            <RadioButton.Group onValueChange={(value) => setShareName(value)} value={ShareName}>
              <View style={styles.radioContainer}>
                <RadioButton.Item label="Yes" value="1" />
                <RadioButton.Item label="No" value= "0" />
              </View>
            </RadioButton.Group>

            <Text style={styles.label}>Consent to share your data:</Text>
            <RadioButton.Group onValueChange={(value) => setShareData(value)} value={ShareData}>
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
                    value={SelectedRentalPref}
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
                onPress={() => navigation.navigate('RentalPreferences',{
                  rentalPref: SelectedRentalPref,
                })}>
                Next Page
              </Button>
         
    
          </Card.Content>
        </Card>
       </View>
    </ScrollView>
  );
};


export default SignUpForm;