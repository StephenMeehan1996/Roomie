//import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card,IconButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const AddDetail = ({navigation}) =>{
  const route = useRoute();
  const [isImageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {selectedAdImages} = route?.params || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);

  const openImageViewer = (image) => {
    console.log(image.uri)
    setSelectedImage(image.uri);
    setImageViewerVisible(true);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setImageViewerVisible(false);
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity onPress={() => openImageViewer(item)}>
      <Image source={{ uri: item.uri }} style={styles.smallImage} />
    </TouchableOpacity>
  );

  const navigateImage = (step) => {
    // Calculate the next image index
    let newIndex = selectedImageIndex + step;
    
    // Ensure the index stays within bounds
    if (newIndex < 0) {
      newIndex = selectedAdImages.length - 1;
    } else if (newIndex >= selectedAdImages.length) {
      newIndex = 0;
    }
    
    setSelectedImageIndex(newIndex);
  };

  return (
  
    <View style={styles.container}>
    <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
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
      <TouchableOpacity onPress={() => openImageViewer(selectedAdImages[1].uri)}>
      <Image source={ selectedAdImages[0].uri} style={styles.largeImage} />
      </TouchableOpacity>
      <FlatList
        data={selectedAdImages}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.imageList}
      />

     
        <View>
          <Title>Beautiful Property</Title>
          <Paragraph>2 Bedrooms | 2 Bathrooms | 1500 sqft</Paragraph>
          <Paragraph>£1500</Paragraph>
          <Paragraph style={styles.addressText}>Church Hill Road</Paragraph>
          <Paragraph style={styles.addressText}>Sligo Town</Paragraph>
          <Paragraph style={styles.addressText}>County Sligo</Paragraph>
          </View>
       
      </Card.Content>
      </Card>
      <Modal 
          visible={isImageViewerVisible} 
          onDismiss={closeImageViewer}
   
          style={styles.modal}
          >
          
        <View style={styles.modalContainer}>
        <View style={styles.closeButtonContainer}>
        <IconButton
                      icon="close-box-outline"
                      mode="text"
                      size={45}
                      style={styles.closeButton}
                      iconColor='red'
                      onPress={closeImageViewer}>
        </IconButton>
        </View> 
        <View style={styles.imageViewer}>
          {/* <Image source={{ uri: selectedImage }}  style={[styles.fullScreenImage, { width: Dimensions.get('window').width -20, height: 300}]} /> */}
        
          <Image source={{ uri: selectedAdImages[selectedImageIndex].uri }} style={[styles.fullScreenImage, { width: Dimensions.get('window').width -20, height: 300}]} />

          <View style={styles.buttonContainer}>
          
              {/* <Button title="Previous" onPress={() => navigateImage(-1)} />
              <Button title="Next" onPress={() => navigateImage(1)} /> */}

              <IconButton
                      icon="chevron-left"
                      mode="text"
                      size={60}
                      iconColor='white'
                      onPress={() => navigateImage(-1)}>
              </IconButton>
              
              <IconButton
                      icon="chevron-right"
                      mode="text"
                      iconColor='white'
                      size={60}
                      
                      onPress={() => navigateImage(1)}>
              </IconButton>
             
            </View>

       
         
        </View>
        </View>
        
      </Modal>
    </View>

  );
}
const styles = StyleSheet.create({
  largeImage: {
    width: '100%',
    height: 200
  },
  modal:{
   
    flex: 1,
    height: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    position: 'absolute',
  },
  closeButtonContainer: {
    width: '100%',
    height: 100,
    alignSelf: 'flex-start',
    zIndex: 3,
    position: 'absolute',
    top: -100
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    backgroundColor: '#fff'
  },

  card: {
    width: '100%',
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding: 5
  },
  modalContainer: {
   
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  smallImage: {
    width: 80,
    height: 80,
    margin: 8,
    borderRadius: 5,
  },
  imageList: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 200
  },
  fullScreenImage: {
    
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
  },
  fullScreenImage: {
    resizeMode: 'contain',
  },
  imageViewer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 

  },
  closeButton: {
    position: 'absolute',
    top: -30, 
    right: -5
  },


  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  
});

export default AddDetail;