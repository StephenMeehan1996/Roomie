import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView, SafeAreaView, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FIREBASE_APP, FIREBASE_STORAGE } from '../FirebaseConfig';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
//import { firebase } from '../config'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference, environmentOptions, houseMatExpectations ,irishCounties, number, houseType, priceRange, days, roomType } from '../data/formData';
import  styles  from '../styles/formStyle.style';

const AddImage = ({navigation}) => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [URI, setURI] = useState(false);
  let uri = '';
  let filename = '';

  const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
        base64: false,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const takeImage = async () =>{
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
        base64: false,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const uploadFile = async () =>{
      try{
        if (image) {
        const response = await fetch(image);
        const blob = await response.blob();

        const filename = image.substring(image.lastIndexOf('/') + 1);

        const storage = FIREBASE_STORAGE;
        const storageRef = ref(storage, 'images/' + filename);
        
        uploadBytes(storageRef, blob).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(snapshot.ref).then( url => console.log(url));
        });
      } else{
        console.log('No image selected for upload.');
      }

      } catch (error) {
        console.error('Error uploading image:', error);
      }
  }

  return (
          <View style={styles.container}>

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
                  <TouchableOpacity onPress={pickImage} style={styles2.selectButton}>
                    <Text style={styles2.btnText}>Pick an Image</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={takeImage} style={styles2.selectButton}>
                    <Text style={styles2.btnText}>Take Photo</Text>
                  </TouchableOpacity>
                  <View>
                    {image &&
                        <Image
                          source={{uri : image}}
                          style = {{width: 300, height: 300}}
                        >
                        </Image>
                    }
                        <TouchableOpacity onPress={uploadFile} style={styles2.selectButton}>
                           <Text style={styles2.btnText}>upload Image</Text>
                      </TouchableOpacity>

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
  }
  });

export default AddImage