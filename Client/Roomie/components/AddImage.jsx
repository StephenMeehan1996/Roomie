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

const AddImage = ({navigation}) => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
 

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
      let filename = uri.substring(uri.lastIndexOf('/') + 1);
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

  const uploadFile = async () =>{
    
    if (selectedFiles) {
      const storage = getStorage();
      const imagesToPost = [];
      setUploading(true);
      for(const file of selectedFiles){
    
        try{
          const response = await fetch(file.uri);
          const blob = await response.blob();
          const storageRef = ref(storage, 'images/' + file.filename);
          
          uploadBytes(storageRef, blob).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            const url= await getDownloadURL(snapshot.ref);
            const imageObj ={
              ImageType: '1',
              UserID : 'test', 
              Filename: file.filename, 
              URL: url
            }           
            imagesToPost.push(imageObj);

            if(file === selectedFiles[selectedFiles.length-1])
              setUploading(false);
              setSelectedFiles([]);
              console.log(imagesToPost);
          });
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }

    } else{
        console.log('No image selected for upload.');
    }
  }

  return (
          <View >

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
                      onPress={uploadFile}>
                      Upload File
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </View>
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
  });

export default AddImage