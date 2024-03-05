import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { FAB, Title, Paragraph, Card } from 'react-native-paper';


import { Platform,TextInput,Dimensions,ScrollView} from 'react-native';
import { Avatar,  Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import { matchColor } from '../functions/CommonFunctions';

const Ad = ({ad, images, uID, navigation, route}) => {
  
  const [showContainer, setShowContainer] = useState(false);

  const handleMatchPercentageClick = () => {
    setShowContainer(true);
  };

  const handleCloseContainer = () => {
    setShowContainer(false);
  };

  if (!ad) {
    return null; // Return null if the ad object or title property is undefined
  }

    const propertyImages = [
        { id: '1', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop1.jpg?alt=media&token=2411eebd-9aad-417f-847e-f371237c639c&_gl=1*wiyu6g*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc4MDAyNDAuNjAuMC4w' },
        { id: '2', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop2.jpg?alt=media&token=f15ff43e-7e84-4c34-9087-adf63cd33417&_gl=1*1tctnda*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc4MDAyMTkuOS4wLjA.' },
        { id: '3', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop3.jpg?alt=media&token=42a854b9-5f6b-4028-885f-21e1157a663c&_gl=1*1iuoeh1*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc4MDAxODIuNDYuMC4w' },
        { id: '4', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop4.jpg?alt=media&token=52d39997-e773-4aa9-b606-ab9eba5a1a1b&_gl=1*l9kn6n*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc3OTk4NDIuMTMuMC4w' },
        { id: '5', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop5.jpg?alt=media&token=e37b46b3-bee4-4409-ad22-ad6f46790f3d&_gl=1*1gzaprl*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc3OTk4NjYuNjAuMC4w' },
        { id: '6', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop6.jpg?alt=media&token=bffe612b-6f1d-4ea2-bff9-83a97a11fb37&_gl=1*ul43v2*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc3OTk4ODYuNDAuMC4w' },
      ];
    
      const [currentImage, setCurrentImage] = useState(images[0]);
    
      const handleImageSelect = (image) => {
        setCurrentImage(image);
      };

      const nextPage = () => {
        navigation.navigate('_AddDetail', {  
            ad: ad,
            images: images, 
            uID : uID
        });
      };



    //   const nextPage = (values) => {
    //     console.log(values);
    //     navigation.navigate('AddImage', {  
    //        formData: values 
    //     });
    //   };
    
      const renderImageItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleImageSelect(item)}>
        <Image
          source={{ uri: item.ImageURL }}
          style={item.AddImageID === currentImage.AddImageID ? styles.largeImage : styles.smallImage}
        />
      </TouchableOpacity>

      );

      const renderMatchedProperties = ({ item }) => (
        
      <View>
        <Text style ={{color: 'green', fontWeight: 'bold'}}>{item.prop}</Text>
      </View>

      );

      const renderUnmatchedProperties = ({ item }) => (
        
        <View>
          <Text style ={{color: 'red', fontWeight: 'bold'}}>{item.prop}</Text>
        </View>
  
        );
    
      return (
        <View >
            <TouchableOpacity onPress={() => nextPage()}>
                <Card style={styles.card}>
                    <Card.Content>
                          {images.length === 1 ? (
                            <>
                              <Image source={{ uri: currentImage.ImageURL }} style={styles.largeImage} />
                           
                            </>
                          ) : images.length > 1  ? (
                            <>
                             <Image source={{ uri: currentImage.ImageURL }} style={styles.largeImage} />
                             <FlatList
                                data={images}
                                renderItem={renderImageItem}
                                keyExtractor={(item) => item.AddImageID}
                                horizontal
                                contentContainerStyle={styles.imageList}
                              />
                            </>
                          ) :(
                            <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                          )}
                         <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Title>Beautiful Property </Title>
                          <TouchableHighlight onPress={handleMatchPercentageClick} activeOpacity={1}  underlayColor="lightgray" style={styles.matchPercentageTouchable}>
                            <Text>{matchColor(ad.matchPercentage)}</Text>
                        </TouchableHighlight>
                        </View>
                        {showContainer && (
                          <View style={styles.popupContainer}>
                              <TouchableWithoutFeedback onPress={handleCloseContainer}>
                                <View style={styles.closeButton}>
                                  <Text style={styles.closeButtonText}>X</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={{textDecorationLine:'underline', marginVertical: 10}} >Matched Properties</Text>
                            <FlatList
                                data={ad.matchedProperties.filter(item => item.matched === 1)}
                                renderItem={renderMatchedProperties}
                                keyExtractor={(item) => item.id}
                                vertical
                               // contentContainerStyle={styles.imageList}
                              />
                            <Text style={{textDecorationLine:'underline', marginVertical: 10}}>Unmatched Properties</Text>
                            <FlatList
                                data={ad.matchedProperties.filter(item => item.matched === 0)}
                                renderItem={renderUnmatchedProperties}
                                keyExtractor={(item) => item.id}
                                vertical
                               // contentContainerStyle={styles.imageList}
                              />
                            
                          </View>
                        )}
                        <Paragraph>2 Bedrooms | 2 Bathrooms | 1500 sqft</Paragraph>
                        <Paragraph>€{ad.price}</Paragraph>
                        <Paragraph style={styles.addressText}>AddID: {ad.addid}</Paragraph>
                        <Paragraph style={styles.addressText}>{ad.addressline1}</Paragraph>
                        <Paragraph style={styles.addressText}>{ad.addressline2}</Paragraph>
                        <Paragraph style={styles.addressText}>{ad.county}</Paragraph>
                    
                </Card.Content>
             </Card>
           </TouchableOpacity>
          {/* <FAB
            style={styles.fab}
            icon="phone"
            label="Call Agent"
            onPress={() => console.log('Call button clicked')}
          /> */}
        </View>
      );
}

const styles = StyleSheet.create({
 
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
    matchPercentageTouchable: {
      marginRight: 10, 
    },
 
    popupContainer: {
      position: 'absolute',
      top: 100, 
      right: 16, 
      backgroundColor: 'white',
      padding: 25,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'red', 
      width: 35, 
      height: 35,
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    closeButtonText: {
      color: 'white', 
      fontSize: 20, 
    },
   
  });

export default Ad