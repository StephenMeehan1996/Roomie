import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet,FlatList,ScrollView,Alert} from 'react-native';
import {Modal, Portal, Provider } from 'react-native-paper';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import  styles  from '../styles/formStyle.style';

const ManageProfileImages = ({navigation, route}) => {
    let {userImages} = route.params
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!isModalVisible);
    const [currentImage, setCurrentImage] = useState(userImages[0]);
    
  
    
    console.log(userImages);

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
        setCurrentImage(image);
      };

      const removeImage = (imageurl) => {
        console.log('test');
 // web
        const userConfirmation = window.confirm('Are you sure you want to delete this item?');
            if (userConfirmation) {
            // Call your delete function or perform delete action here
            console.log('Item deleted!');
            } else {
            // User canceled the deletion
            console.log('Deletion canceled.');
            }
//not working on
            Alert.alert(
                'Delete Confirmation',
                'Are you sure you want to delete this item?',
                [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        const updatedFiles = userImages.filter((image) => image.imageurl !== imageurl);
                        userImages = updatedFiles;
                    console.log('Item deleted!');
                    },
                },
                ],
                { cancelable: false }
            );
      };

      const renderImageItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleImageSelect(item)}>
            <Image
                source={{ uri: item.imageurl }}
                style={item.profileimageid === currentImage.profileimageid ? styles2.largeImage : styles2.smallImage}
            />
               <IconButton
                    icon="trash-can-outline"
                    size={30}
                    iconColor="red"
                    style={{position: 'absolute', top: -5, right: -5}}
                    onPress={() => removeImage(item.imageurl)}>
                </IconButton>  
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
                            <View>
                                <Image source={{ uri: currentImage.imageurl }} style={styles2.largeImage} />
                                <IconButton
                                    icon="trash-can-outline"
                                    size={30}
                                    iconColor="red"
                                    style={{position: 'absolute', top: -5, right: -5}}
                                    onPress={() => removeImage(item.uri)}>
                                </IconButton>  
                            </View>
                         
                             
                            </>
                          ) : userImages.length > 1  ? (
                            <>
                            <View>
                                <Image source={{ uri: currentImage.imageurl }} style={styles2.largeImage} />
                                <IconButton
                                    icon="trash-can-outline"
                                    size={30}
                                    iconColor="red"
                                    style={{position: 'absolute', top: -5, right: -5}}
                                    onPress={() => removeImage(currentImage.imageurl)}>
                                </IconButton>  
                            </View>
                          
                             <FlatList
                                data={userImages}
                                renderItem={renderImageItem}
                                keyExtractor={(item) => item.profileimageid}
                                horizontal
                                contentContainerStyle={styles2.imageList}
                              />

                            </>
                          ) :(
                            <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                          )}
                     
                    
                </Card.Content>
             </Card>

      <TouchableOpacity onPress={toggleModal}>
        <Text>Manage Images</Text>
      </TouchableOpacity>

      <Portal>
        <Modal visible={isModalVisible} onDismiss={toggleModal}>
          <View>
            {profileImage && (
              <Image source={profileImage} style={{ width: 100, height: 100 }} />
            )}
            <Button onPress={() => handleImageUpload('profile')}>Upload Profile Image</Button>
            <Button onPress={() => handleDeleteImage('profile')}>Delete Profile Image</Button>
            <Button onPress={handleSetAsProfile}>Set as Profile Picture</Button>

            {coverImage && (
              <Image source={coverImage} style={{ width: 100, height: 100 }} />
            )}
            <Button onPress={() => handleImageUpload('cover')}>Upload Cover Image</Button>
            <Button onPress={() => handleDeleteImage('cover')}>Delete Cover Image</Button>
            <Button onPress={handleSetAsCover}>Set as Cover Picture</Button>
          </View>
        </Modal>
      </Portal>
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
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 0,
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
  });

export default ManageProfileImages