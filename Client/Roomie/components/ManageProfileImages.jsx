import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {Modal, Portal, Provider } from 'react-native-paper';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import  styles  from '../styles/formStyle.style';

const ManageProfileImages = ({navigation, route}) => {

    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!isModalVisible);

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
    
  return (
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
  )
}


export default ManageProfileImages