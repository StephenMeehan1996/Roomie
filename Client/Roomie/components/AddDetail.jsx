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
      
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          >
        <View style={styles.modalContainer}>
        <View style={styles.imageViewer}>
          <Image source={{ uri: selectedImage }}  style={[styles.fullScreenImage, { width: Dimensions.get('window').width -20, height: 300}]} />

          <Button
            icon="close"
            color="white"
            style={styles.closeButton}
            onPress={closeImageViewer}
          />
        </View>
        </View>     
      </Modal>
    </View>

  );
}
const styles = StyleSheet.create({

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
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally

  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default AddDetail;