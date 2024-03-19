import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Checkbox, RadioButton, MD3Colors, Menu, } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from '../styles/formStyle.style';
import postDataToDatabase from '../functions/postDataToDatabase';
import { launchCameraAsync } from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useFetchData from '../functions/GetAPI';
import { generateUUID, getStorageLocation, deleteImage } from '../functions/CommonFunctions';
import { useAppContext } from '../Providers/AppContext';


const ManageProfileImages = ({ navigation, route }) => {

  const { signedInUserDetails } = useAppContext();
  const [uid, setuid] = useState(signedInUserDetails.useridentifier);
  const [userID, setuserID] = useState(signedInUserDetails._userid);


  const [userImages, setUserImages] = useState(route.params.userImages);
  const [currentImage, setCurrentImage] = useState(userImages[0]); // bug with image may be here
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  //used to get top of the image for dropdown menu
  const windowWidth = Dimensions.get('window').width;
  const [anchorY, setAnchorY] = useState(0);
  const targetViewRef = useRef(null);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleDeleteImage = async (type) => {
    setUpdating(true);
    let imageID = currentImage.profileimageid;
    let uid = currentImage._useridentifier;

    await deleteImage(getStorageLocation('images', currentImage.filename)); // deletes from firebase
    await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieDeleteProfileImage?imageID=${imageID}&uid=${uid}`);
    userImages.shift(); // removes image locally, to avoid refresh
    closeMenu();
    setUserImages([...userImages]);
    setCurrentImage(userImages[0]);
    setUpdating(false);
  };

  const handleSetAsProfile = async () => {
    setUpdating(true);
    let imageID = userImages[0].profileimageid;
  
    closeMenu();
    await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieUpdateProfileImages?imageID=${imageID}&imageType=1&uid=${uid}&id=${userID}`);
    setUpdating(false);
  };

  const handleSetAsCover = async () => {
    setUpdating(true);
    let imageID = userImages[0].profileimageid;
 
    closeMenu();
    await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieUpdateProfileImages?imageID=${imageID}&imageType=2&uid=${uid}&id=${userID}`);
    setUpdating(false);
  };

  const handleImageSelect = (image) => {
    //Swaps selected image with image at index 0
    const index1 = 0;
    const index2 = userImages.findIndex((item) => item.profileimageid === image.profileimageid);

    if (index1 >= 0 && index1 < userImages.length && index2 >= 0 && index2 < userImages.length) {

      [userImages[index1], userImages[index2]] = [userImages[index2], userImages[index1]];
      setCurrentImage(userImages[0]);

    } else {
      console.log('Invalid indices for swapping.');
    }

  };

  useEffect(() => {
    if (targetViewRef.current) {
      targetViewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setAnchorY(pageY);
      });
    }
  }, [targetViewRef]);

  const updateProfileImages = async () => {
    try {
      //const userIdentifier = userImages[0]._useridentifier;
      const updatedImages = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetProfileImages?uid=${uid}`);
      setUserImages(updatedImages);
    } catch (error) {
      console.error('Error fetching updated profile images:', error);
    }
  };

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    })
    if (!result.canceled) {
      let uri = result.assets[0].uri;
      let filename = generateUUID();
      const newImage = { uri: uri, filename: filename };
      setSelectedFiles([...selectedFiles, newImage]);
    }
  }



  const removeImage = (uri) => {
    const updatedFiles = selectedFiles.filter((image) => image.uri !== uri);
    setSelectedFiles(updatedFiles);
  };

  const uploadFile = async () => {
    if (selectedFiles) {
      const storage = getStorage();
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

                let imageObj = [userID, 0, 0, url, file.filename];
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
        let postImages = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/profileImage'; // end point for form post

        await postDataToDatabase(imageArray, postImages); // working 
        await updateProfileImages();
        setUploading(false);
        setSelectedFiles([]);
      } catch (error) {
        console.error('Error occurred during file uploads:', error);
      }
    } else {
      console.log('No image selected for upload.');
    }
  };

  //       const removeImage = (imageurl) => {
  //         console.log('test');
  //  // web
  //         const userConfirmation = window.confirm('Are you sure you want to delete this item?');
  //             if (userConfirmation) {
  //             // Call your delete function or perform delete action here
  //             console.log('Item deleted!');
  //             } else {
  //             // User canceled the deletion
  //             console.log('Deletion canceled.');
  //             }
  // //not working on
  //             Alert.alert(
  //                 'Delete Confirmation',
  //                 'Are you sure you want to delete this item?',
  //                 [
  //                 {
  //                     text: 'Cancel',
  //                     style: 'cancel',
  //                 },
  //                 {
  //                     text: 'Delete',
  //                     onPress: () => {
  //                         const updatedFiles = userImages.filter((image) => image.imageurl !== imageurl);
  //                         userImages = updatedFiles;
  //                     console.log('Item deleted!');
  //                     },
  //                 },
  //                 ],
  //                 { cancelable: false }
  //             );
  //       };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImageSelect(item)}>
      <Image
        source={{ uri: item.imageurl }}
        //style={item.profileimageid === currentImage.profileimageid ? styles2.largeImage : styles2.smallImage}
        style={styles2.smallImage}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <Provider>
        <View>

          <Card elevation={5} style={styles.card}>
            <Card.Content>
              <View style={styles.header}>
                <Title style={styles.title}>Manage Images</Title>
                <IconButton
                  icon="arrow-left"
                  mode="text"
                  size={30}
                  style={{ flex: 1, alignItems: 'flex-end' }}
                  onPress={() => navigation.goBack()}>
                </IconButton>

              </View>
            </Card.Content>
          </Card>

          <Card style={styles2.card}>
            <Card.Content>
              {userImages.length === 1 ? (
                <>
                  <View ref={targetViewRef}>
                    <Image source={{ uri: currentImage.imageurl }} style={styles2.largeImage} />
                    <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5 }}>
                      <IconButton
                        icon="dots-vertical"
                        size={30}
                        iconColor={MD3Colors.neutralVariant100}
                        onPress={openMenu}>
                      </IconButton>
                    </View>
                    {updating ? <View style={{ marginVertical: 10 }}><ActivityIndicator size="large" color="#6200EE" /></View>
                      : <>
                      </>}
                  </View>
                </>
              ) : userImages.length > 1 ? (
                <>
                  <View ref={targetViewRef}>
                    <Image source={{ uri: currentImage.imageurl }} style={styles2.largeImage} />
                    <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5 }}>
                      <IconButton
                        icon="dots-vertical"
                        size={30}
                        iconColor={MD3Colors.neutralVariant100}
                        onPress={openMenu}>
                      </IconButton>
                    </View>
                    {updating ? <View style={{ marginVertical: 10 }}><ActivityIndicator size="large" color="#6200EE" /></View>
                      : <>
                      </>}
                  </View>

                  <FlatList
                    data={userImages.slice(1)}
                    renderItem={renderImageItem}
                    keyExtractor={(item) => item.profileimageid}
                    horizontal={false}
                    numColumns={3}

                  />

                </>
              ) : (
                <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
              )}

              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={selectedFiles}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={false}
                  numColumns={3} // Set the number of columns
                  contentContainerStyle={styles.listContainer}
                  renderItem={({ item }) => (
                    <View key={item.id}>
                      <Image source={item} style={{ width: 100, height: 100, margin: 5 }} />
                      <IconButton
                        icon="trash-can-outline"
                        size={30}
                        iconColor="red"
                        style={{ position: 'absolute', top: -5, right: -5 }}
                        onPress={() => removeImage(item.uri)}>
                      </IconButton>
                    </View>
                  )}
                />
              </View>
              {uploading ? <View style={{ marginVertical: 10 }}><ActivityIndicator size="large" color="#6200EE" /></View>
                : <>
                </>}
              <View style={{ marginVertical: 15 }}>

                {selectedFiles.length === 0 ? (
                  <>
                    <TouchableOpacity
                      style={[styles2.button]}
                      onPress={() => pickImage()}
                    >
                      <Text style={[styles2.buttonText]}>Upload Images</Text>
                    </TouchableOpacity>
                  </>
                ) : selectedFiles.length > 0 ? (

                  <>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                      <TouchableOpacity
                        style={[styles2.button, { marginRight: 5 }]}
                        onPress={() => pickImage()}
                      >
                        <Text style={[styles2.buttonText]}>Select Image </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles2.button, { marginLeft: 5 }]}
                        onPress={() => uploadFile()}
                      >
                        <Text style={[styles2.buttonText]}>Upload ({selectedFiles.length})</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                )}

                <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  contentStyle={{ backgroundColor: 'white' }}
                  anchor={{ x: windowWidth, y: anchorY - 122.5 }} // Adjust the position as needed
                >
                  <Menu.Item style={{ backgroundColor: '#fff' }} onPress={() => handleSetAsProfile()} title="Set as Profile Picture" />
                  <Menu.Item style={{ backgroundColor: '#fff' }} onPress={() => handleSetAsCover()} title="Set as Cover Photo" />

                  <Menu.Item style={{ backgroundColor: '#fff' }} onPress={() => handleDeleteImage()} title="Delete" />
                </Menu>
              </View>
            </Card.Content>
          </Card>
        </View>
      </Provider>
    </ScrollView>
  )
}

const styles2 = StyleSheet.create({

  largeImage: {
    width: '100%',
    height: 200
  },
  smallImage: {
    width: 102.5,
    height: 102.5,
    marginRight: 10,
    borderRadius: 0,
    marginTop: 10
  },
  imageList: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    height: 120
  },
  card: {
    margin: 10,
    borderRadius: 0,
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding: 5
  },


  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  imageList: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    height: 120
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageProfileImages