import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView, SafeAreaView, Alert, FlatList, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { launchCameraAsync } from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import  styles  from '../styles/formStyle.style';
import callLambdaFunction from '../functions/PostAPI';
import { generateUUID, returnAdTypeText } from '../functions/CommonFunctions';
import { useAppContext } from '../Providers/AppContext';

const PostAdd = ({navigation, route}) => {

  const { signedInUserDetails } = useAppContext();
  const [uID, setuID] = useState(signedInUserDetails.useridentifier);
  const [userID, setuserID] = useState(signedInUserDetails._userid);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const {formData} = route.params;

  console.log(uID);

  formData.posterUID = uID; // ID's from user signed in
  formData.posterID = userID;

  const addTypeString = returnAdTypeText(formData.addType);
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
      let filename = generateUUID();
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
    let signUpUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/add';
    setUploading(true);
    console.log(JSON.stringify(formData));
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

    uploadFile(generatedID)
  };
 
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
      const imageArray = [];
  
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
        setSelectedFiles([]); 
        let signUpUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/addimages'; // end point for form post
        await callLambdaFunction(imageArray, signUpUrl); // working 
        setUploading(false);
        navigation.navigate('_Profile');
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
                </View>
                <View>
                  <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center'}}>
                  </View>
                </View>
              </Card.Content>
             </Card>
            
              <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View>
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
                {uploading? <View style={{marginBottom: 10}}><ActivityIndicator size="large" color="#0000ff"/></View>
                  : <>
                  </>}
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



export default PostAdd