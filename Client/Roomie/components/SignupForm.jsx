import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { SafeAreaProvider } from "react-native-safe-area-context";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Dropdown selector state
  const [age, setAge] = useState(''); // Calculated age
  const [dob, setDob] = React.useState(undefined);

  const [open, setOpen] = React.useState(false);

  const countryOptions = ['USA', 'Canada', 'UK', 'Australia', 'Other'];
  const genderOptions = ['Male', 'Female', 'X'];

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
    console.log('Country:', country);
    console.log('DOB:', date);
    console.log('age:', age);

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
                    <Picker.Item key={index} label={option} value={option} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  input: {
    fontSize: 16,
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
    padding: 16
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
  datePicker: {
    width: 200,
  }
});

export default SignUpForm;