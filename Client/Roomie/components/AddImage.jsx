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

  const uploadMedia = async = async () =>{
    setUploading(true);

  try{
    const { uri } = await FileSystem.getInfoAsync(image);
    const blob = await new Promise((resolve, reject) =>{
      const xhr = new XMLHttpRequest();
      xhr.onload = () =>{
        resolve.apply(xhr.response);
      };
      xhr.onerror = (e) =>{
        reject(new TypeError('Network request failed'))
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    // const blob = await FileSystem.readAsStringAsync(image, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });

    const metadata = {
      contentType: 'image/jpeg',
    };

    const filename = image.substring(image.lastIndexOf('/') + 1);

    const storage = FIREBASE_STORAGE;
    const storageRef = ref(storage, 'images/' + filename);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(getDownloadURL(storageRef));
    });

 
  } catch (error){
      console.error(error);
      setUploading(false);
  }
};

 


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
                    <Text style={styles.btnText}>Pick an Image</Text>
                  </TouchableOpacity>
                  <View>
                    {image &&
                        <Image
                          source={{uri : image}}
                          style = {{width: 300, height: 300}}
                        >
                        </Image>
                    }
                        <TouchableOpacity onPress={uploadMedia} style={styles2.selectButton}>
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