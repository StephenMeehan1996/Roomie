import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView, SafeAreaView, Alert, FlatList, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FIREBASE_APP, FIREBASE_STORAGE } from '../FirebaseConfig';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import { launchCameraAsync } from 'expo-image-picker';
//import { firebase } from '../config'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//PermissionsAndroid,
import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference, environmentOptions, houseMatExpectations ,irishCounties, number, houseType, priceRange, days, roomType } from '../data/formData';
import  styles  from '../styles/formStyle.style';
import fetchDataFromDatabase from '../functions/fetchDataFromDatabase';
import postDataToDatabase from '../functions/postDataToDatabase';
import callLambdaFunction from '../functions/PostAPI';

const PostAdd = ({navigation, route}) => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hasPostedAdd, setHasPostedAdd] = useState(false);
  const [addID, setAddID] = useState('');
  const [receivedID, setReceivedID] = useState(null);
  const {formData} = route.params;

  let imageArray = [];
  id = 0;
  //let addID = 0;


  const addTypeString = getAddTypeString(formData.addType);

  const pickImage = async () =>{
    
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
        base64: false,
    })
    if (!result.canceled) {
      let uri = result.assets[0].uri;
      let filename = generateFilename();
      const newImage = {uri: uri, filename: filename };
      setSelectedFiles([...selectedFiles, newImage]);
    }
  }

  const removeImage = (uri) => {
    const updatedFiles = selectedFiles.filter((image) => image.uri !== uri);
    setSelectedFiles(updatedFiles);
  };

  const takeImage = async () =>{
    let result = await launchCameraAsync()
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function pickImageFromCamera() {
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA
    // )
  
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //  // setOpenCamera(true)
  
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        base64: true,
        quality: 1
      })
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    //}
  }
//{"v_add_id":78}
  const postAdd = async () => {
    let signUpUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/add'; // end point for form post
    setUploading(true);
    let res = await callLambdaFunction(formData, signUpUrl); // working 
    let generatedID;
    console.log(res);
    res = res.body;
    try {
      const parsedRes = JSON.parse(res); // Parse the string to a JSON object
      const newAddID = parsedRes.v_add_id; // Extract the number from the object
      console.log(newAddID)
      // Check if newAddID is a number
      if (!isNaN(newAddID)) {
        generatedID = newAddID
        console.log(generatedID);
      } else {
        console.error('Invalid addID value:', newAddID);
      }
    } catch (error) {
      console.error('Error parsing the string:', error);
    }

 
    //setHasPostedAdd(true);
    //setUploading(false);

    uploadFile(generatedID)

  };


  const [myVariable, setMyVariable] = useState(0);

  // set var in seperate function?? 
  const updateID = (newAddID) => {
    console.log(newAddID);
    setAddID(newAddID);
    console.log(newAddID);
  };

  // Function that uses the variable
  const displayVariable = () => {
    console.log(myVariable);
    let imageObj = [myVariable, 'test', 'test', 1];
    console.log(imageObj);
    // You can perform other operations with myVariable here
  };


  function generateFilename() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  function imagePosition(file){
   if(file == selectedFiles[0]){
    return 1;
   } 
    return 0;
  }

  const uploadFile = async (generatedID) => {
    if (selectedFiles) {
      const storage = getStorage();
      const imagesToPost = [];
      setUploading(true);
      const uploadPromises = [];

        console.log('Count changed:', addID);
    
  
      for (const file of selectedFiles) {
        try {
          const response = await fetch(file.uri);
          const blob = await response.blob();
          const storageRef = ref(storage, 'images/' + file.filename);
  
          const uploadPromise = new Promise((resolve, reject) => {
            uploadBytes(storageRef, blob)
              .then(async (snapshot) => {
                console.log('Uploaded a blob or file!');
                const url = await getDownloadURL(snapshot.ref);
  
                let imageObj = [generatedID, url, file.filename, imagePosition(file)];
                console.log(imageObj);
                imageArray.push(imageObj);
                resolve(); 
              })
              .catch((error) => {
                console.error('Error uploading image:', error);
                reject(error); 
              });
          });
  
          uploadPromises.push(uploadPromise);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
  
      try {
        await Promise.all(uploadPromises);
        setUploading(false);
        setSelectedFiles([]); 
        let signUpUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/addimages'; // end point for form post
        callLambdaFunction(imageArray, signUpUrl); // working 
      } catch (error) {
        console.error('Error occurred during file uploads:', error);
      }
    } else {
      console.log('No image selected for upload.');
    }
  };
  
 

  return (
          <ScrollView>
            <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
                  <Title style={styles.title}>Add Images</Title>
                  <IconButton
                      icon="arrow-left"
                      mode="text"
                      size={30}
                      style={{flex:1,alignItems: 'flex-end'}}
                      onPress={() => navigation.goBack()}>
                  </IconButton>
                </View>
              </Card.Content>
            </Card>

           
              <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View>
                <Title style={styles.title}>Detail Summary</Title>
                <Text style={styles2.username}>Add Type: {addTypeString}</Text>
                <Text style={styles2.username}>Price: £1,300</Text>
                <Text style={[styles2.username, {fontWeight: 'bold'}]}>Address: </Text>
                <Text style={styles2.username}>{formData.addressLine1}</Text>
                <Text style={styles2.username}>{formData.addressLine2}</Text>
                <Text style={styles2.username}>{formData.county}, {formData.city}</Text>
                </View>
                <View>
                  <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center'}}>
                  </View>
                
          
                  {/* <Button
                      mode="contained" // Use "outlined" for an outlined button
                      color="#FF5733" // Set your desired button color
                      labelStyle={styles.buttonLabel} // Apply custom label text style // Apply custom button style
                      onPress={() => postAdd()}>
                      Confirm and Post Add
                  </Button> */}
                </View>
                <View>
                  <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center'}}>
                  </View>
                  {uploading? <View style={{marginBottom: 15}} ><ActivityIndicator size="large" color="#0000ff"/></View>
                  : <>
                  </>}
                </View>
              </Card.Content>
             </Card>
             
           
            
              <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View>
                 {uploading? <View ><ActivityIndicator size="large" color="#0000ff"/></View>
                  : <>
                  </>}
                  <FlatList
                      data={selectedFiles}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal={false}
                      numColumns={3} // Set the number of columns
                       contentContainerStyle={styles.listContainer}
                      renderItem={({ item}) => (
                        <View key={item.id}>
                          <Image source={item} style={{ width: 100, height: 100, margin: 5 }} />
                          <IconButton
                            icon="trash-can-outline"
                            size={30}
                            iconColor="red"
                            style={{position: 'absolute', top: -5, right: -5}}
                            onPress={() => removeImage(item.uri)}>
                        </IconButton>
                       </View>
                  )}
                  />
                </View>
                <View>
                <Title style={styles.title}>Image Upload</Title>
                  <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center'}}>
                    <Button
                      mode="contained"
                      style={{marginRight: 10}} // Use "outlined" for an outlined button
                      color="#FF5733" // Set your desired button color
                      labelStyle={styles.buttonLabel} // Apply custom label text style // Apply custom button style
                      onPress={pickImage}>
                      Pick File
                  </Button>
                  <Button
                      mode="contained" // Use "outlined" for an outlined button
                      color="#FF5733" // Set your desired button color
                      labelStyle={styles.buttonLabel} // Apply custom label text style // Apply custom button style
                      onPress={pickImageFromCamera}>
                      Take Image
                  </Button>
          
                  </View>
                  <Button
                      mode="contained" // Use "outlined" for an outlined button
                      color="#FF5733" // Set your desired button color
                      labelStyle={styles.buttonLabel} // Apply custom label text style // Apply custom button style
                      onPress={() => postAdd()}>
                      Confirm and Post Add
                  </Button>
                </View>
              </Card.Content>
            </Card>
           
          </ScrollView>
  )
}

const styles2 = StyleSheet.create({
  selectButton: {
     borderRadius: 5,
     width: 200,
     height: 100,
     backgroundColor: 'blue',
     alignItems: 'center',
     justifyContent: 'center'
  },
  btnText: {
     color: '#FFF',
     fontSize: 18,
     fontWeight: 'bold'
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Apply absolute positioning
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 18,
    marginTop: 10
  }
  });

  const getAddTypeString = (addType) => {
    switch (addType) {
      case 1:
        return "House Share";
      case 2:
        return "House Rental";
      case 3:
        return "Digs";
      default:
        return "Unknown";
    }
  };

export default PostAdd