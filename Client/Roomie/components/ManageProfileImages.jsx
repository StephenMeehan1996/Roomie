import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet,FlatList,ScrollView,Alert, ActivityIndicator,Dimensions} from 'react-native';
import {Modal, Portal, Provider } from 'react-native-paper';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton,MD3Colors, Menu,  } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import  styles  from '../styles/formStyle.style';
import postDataToDatabase from '../functions/postDataToDatabase';
import { launchCameraAsync } from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useFetchData from '../functions/GetAPI';


const ManageProfileImages = ({navigation, route}) => {
    let imageSel = route.params.userImages
    const [userImages, setUserImages] = useState(route.params.userImages);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!isModalVisible);
    const [currentImage, setCurrentImage] = useState(userImages[0]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    //used to get top of the image for dropdown menu
    const windowWidth = Dimensions.get('window').width;
    const [anchorY, setAnchorY] = useState(0);
    const targetViewRef = useRef(null);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleImageUpload = (type) => {
        const options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel || response.error) {
            console.log('Image picker canceled or encountered an error.');
          } else {
            const source = { uri: response.uri };
            if (type === 'profile') {
              setProfileImage(source);
            } else if (type === 'cover') {
              setCoverImage(source);
            }
          }
        });
    };

    const handleDeleteImage = (type) => {
        if (type === 'profile') {
          setProfileImage(null);
        } else if (type === 'cover') {
          setCoverImage(null);
        }
      };
    
      const handleSetAsProfile = () => {
        // Implement logic to set the selected image as the profile picture
        console.log('Setting image as profile picture');
      };
    
      const handleSetAsCover = () => {
        // Implement logic to set the selected image as the cover picture
        console.log('Setting image as cover picture');
      };

      const handleImageSelect = (image) => {
// have to remove
        let newArray = userImages;
        let oldCurrent = currentImage;

        newArray.push(oldCurrent);

        const index = userImages.findIndex((item) => item.profileimageid === currentImage.profileimageid);

        newArray = userImages.filter((item) => item !== index);
        setUserImages(newArray)
        //alert(index);
        setCurrentImage(image);
      };

      const UploadImages = () =>{

      }


      useEffect(() => {
        // This effect will be triggered when userImages changes
        console.log('userImages updated:', userImages);
      }, [userImages]);

      useEffect(() => {
        if (targetViewRef.current) {
          targetViewRef.current.measure((x, y, width, height, pageX, pageY) => {
            setAnchorY(pageY);
          });
        }
      }, [targetViewRef]);

      const updateProfileImages = async () => {
        try {
          const userIdentifier = userImages[0]._useridentifier;
          const updatedImages = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetProfileImages?uid=${userIdentifier}`);
          setUserImages(updatedImages);
        } catch (error) {
          console.error('Error fetching updated profile images:', error);
        }
      };

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

      function generateFilename() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
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
      
                    let imageObj = [userImages[0].userid, 0, 0, url, file.filename];
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
                style={item.profileimageid === currentImage.profileimageid ? styles2.largeImage : styles2.smallImage}
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
                                style={{flex:1,alignItems: 'flex-end'}}
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
                                <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5 }}>
                                <IconButton
                                    icon="dots-vertical"
                                    size={30}
                                    iconColor={MD3Colors.neutralVariant100}
                                    onPress={openMenu}>
                                </IconButton> 
                                </View> 
                            </View>
                            </>
                          ) : userImages.length > 1  ? (
                            <>
                            <View ref={targetViewRef}>
                                <Image source={{ uri: currentImage.imageurl }} style={styles2.largeImage} />
                                <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5 }}>
                                <IconButton
                                    icon="dots-vertical"
                                    size={30}
                                    iconColor={MD3Colors.neutralVariant100}
                                    onPress={openMenu}>
                                </IconButton> 
                                </View>
                          
                            </View>
                          
                             <FlatList
                                data={userImages}
                                renderItem={renderImageItem}
                                keyExtractor={(item) => item.profileimageid}
                                horizontal={false}
                                numColumns={3}
                               
                              />

                            </>
                          ) :(
                            <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                          )}
                     
                     <View style={{marginTop: 20}}>
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
                {uploading? <View style={{marginVertical: 10}}><ActivityIndicator size="large" color="#6200EE" /></View>
                  : <>
                  </>}
                     <View style ={{marginVertical: 15}}>

                            {selectedFiles.length === 0 ? (
                           <>
                           <TouchableOpacity
                                style={[styles2.button]}
                                onPress={() => pickImage()}
                            >
                              <Text style={[styles2.buttonText]}>Upload Images</Text>
                          </TouchableOpacity>
                                </>
                            ) :selectedFiles.length > 0  ? (
                        
                            <>
                             <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                             <TouchableOpacity
                                  style={[styles2.button, {marginRight: 5}]}
                                  onPress={() => pickImage()}
                              >
                                <Text style={[styles2.buttonText]}>Select Image </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles2.button, {marginLeft: 5}]}
                                onPress={() => uploadFile()}
                            >
                              <Text style={[styles2.buttonText]}>Upload ({selectedFiles.length})</Text>
                          </TouchableOpacity>
                          </View>
                            </>
                            ):(
                              <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                        )}

                            <Menu
                              visible={menuVisible}
                              onDismiss={closeMenu}
                              contentStyle={{ backgroundColor: 'white' }}
                              anchor={{ x: windowWidth , y: anchorY - 122.5}} // Adjust the position as needed
                            >
                              <Menu.Item style={{backgroundColor: '#fff'}} onPress={() => {}} title="Set as Profile Picture" />
                              <Menu.Item style={{backgroundColor: '#fff'}} onPress={() => {}} title="Set as Cover Photo" />
                             
                              <Menu.Item style={{backgroundColor: '#fff'}} title="Delete" />
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