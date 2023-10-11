import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';


const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Dropdown selector state
  const [age, setAge] = useState(''); // Calculated age
  const [dob, setDob] = React.useState(undefined);

  const [bio, setBio] =  useState('');
  const [occupation, setOccupation] =  useState('');
  const [occupationDetailLabel, setOccupationDetailLabel] = useState('Working Hours'); // State for the label of the second dropdown
  const [occupationDropdownValue, setOccupationDropdownValue] = useState('');
  const [smoke, setSmoke] = useState('');
  const [profilePicURL, setProfilePicURL] = useState('');
  const [intoVideoURL, setintoVideoURL] = useState('');

  const [shareName, setShareName] = useState(false);
  const [shareData, setShareData] = useState(false);

  const [selected, setSelected] = useState([]);

  const [open, setOpen] = React.useState(false);

  const genderOptions = [
    { label:'Select an option', value:"" },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const workingHoursOptions = [
    { label:'Select an option', value:"" },
    { label: '9-5', value: '9-5' },
    { label: 'Shift-work', value: 'Shift-work' }
  ];

  const occupationOptions = [
    { label:'Select an option', value:"" },
    { label: 'Working Professional', value: 'Working Professional' },
    { label: 'Student', value: 'Student' }
  ];

  const yearOfStudyOptions = [
    { label:'Select an option', value:"" },
    { label: '1st', value: '1st' },
    { label: '2nd', value: '2nd' },
    { label: '3rd', value: '3rd' },
    { label: '4th', value: '4th' },
    { label: 'Masters', value: 'Masters' },
    { label: 'PHD', value: 'PHD' },
  ];

  const yesNO = [
    { label:'Select an option', value:"" },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  const rentalPreference = [
    { label:'Select an option', value:"" },
    { label: 'House Rental', value: 'House Rental' },
    { label: 'House Share', value: 'House Share' },
    { label: 'Digs', value: 'Digs' }
  ];

  
  const handleOccupationChange = (value) => {
    setOccupation(value);
    // Set the label and initial value of the second dropdown based on the selection
    if (value === '' || value === 'Working Professional') {
      setOccupationDetailLabel('Working Hours');
      setOccupationDropdownValue(workingHoursOptions[0]); // Set the initial value to the first option
    } else if (value === 'Student') {
      setOccupationDetailLabel('Year of Study');
      setOccupationDropdownValue(yearOfStudyOptions[0]); // Set the initial value to the first option
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

  const handleSignUp = () => {
    // Perform sign-up logic here, e.g., sending data to a server
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
                  {age ? ( // If age is not empty (truthy value), display one button
                    <Button icon="calendar-outline" onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                    <Text>Age:{age}</Text>
                  </Button>
                  ) : ( // If age is empty (falsy value), display another button
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
              <Button
                mode="contained" // Use "outlined" for an outlined button
                color="#FF5733" // Set your desired button color
                labelStyle={styles.buttonLabel} // Apply custom label text style // Apply custom button style
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
              numberOfLines={3} // You can adjust the number of lines displayed
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
                <Button icon="camera-outline"  uppercase={false} mode="outlined" style={{width:120, marginRight: 20}}>
                  Upload
                </Button>
                <View style={styles.profilePictureContainer}>
                    <Image
                      source={require('../assets/Icons/images/kemal.jpg')} // Replace with the actual image source
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
                    value={selected}
                    onChange={item => {
                    setSelected(item);
                        console.log('selected', item);
                    }}
                    renderItem={item => _renderItem(item)}
                />

          </Card.Content>
        </Card>
       </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  sameLineContainer: {
    flexDirection: 'row', // Display first and last name fields horizontally
    justifyContent: 'space-between' // Add space between the two fields
  },
  lineInput: {
    flex: 1, // Take up equal space in the row
    marginRight: 8, // Add spacing between first and last name fields
  },
  singleLineInput:{
    width: Dimensions.get('window').width * 0.4,
  },
  singleLineInputLong:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF'
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  datePickerContainer: {
  
  },
  resultText: {
    fontSize: 18,
    marginVertical: 10,
  },

  profilePictureContainer: {
    width: 50,
    height: 50,
    borderRadius: 75, // Make it a circle by setting half of the width/height as the border radius
    backgroundColor: '#E0E0E0', // Placeholder background color
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 75,
  },
  uploadButton: {
    backgroundColor: '#007AFF', // Button background color
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  explanationText: {
    fontSize: 14,
    marginTop: 5,
  }, 
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  dropdown: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 20,
},
icon: {
    marginRight: 5,
    width: 18,
    height: 18,
},
item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
textItem: {
    flex: 1,
    fontSize: 16,
},
shadow: {
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
},
});

export default SignUpForm;