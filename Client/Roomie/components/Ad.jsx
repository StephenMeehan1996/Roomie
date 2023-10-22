import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, Title, Paragraph, Card } from 'react-native-paper';


import { Platform,TextInput,Dimensions,ScrollView} from 'react-native';
import { Avatar,  Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';

const Ad = ({navigation, route}) => {
  
    const propertyImages = [
        { id: '1', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop1.jpg?alt=media&token=2411eebd-9aad-417f-847e-f371237c639c&_gl=1*wiyu6g*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc4MDAyNDAuNjAuMC4w' },
        { id: '2', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop2.jpg?alt=media&token=f15ff43e-7e84-4c34-9087-adf63cd33417&_gl=1*1tctnda*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc4MDAyMTkuOS4wLjA.' },
        { id: '3', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop3.jpg?alt=media&token=42a854b9-5f6b-4028-885f-21e1157a663c&_gl=1*1iuoeh1*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc4MDAxODIuNDYuMC4w' },
        { id: '4', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop4.jpg?alt=media&token=52d39997-e773-4aa9-b606-ab9eba5a1a1b&_gl=1*l9kn6n*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc3OTk4NDIuMTMuMC4w' },
        { id: '5', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop5.jpg?alt=media&token=e37b46b3-bee4-4409-ad22-ad6f46790f3d&_gl=1*1gzaprl*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc3OTk4NjYuNjAuMC4w' },
        { id: '6', uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/stock_ad_images%2Fprop6.jpg?alt=media&token=bffe612b-6f1d-4ea2-bff9-83a97a11fb37&_gl=1*ul43v2*_ga*MTgwMTY5Njg1My4xNjc4ODk3MTM5*_ga_CW55HF8NVT*MTY5Nzc5ODg3MS4xOC4xLjE2OTc3OTk4ODYuNDAuMC4w' },
      ];
    
      const [currentImage, setCurrentImage] = useState(propertyImages[0]);
    
      const handleImageSelect = (image) => {
        setCurrentImage(image);
      };

      const nextPage = () => {
        navigation.navigate('AddDetail', {  
            selectedAdImages: propertyImages 
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
          source={{ uri: item.uri }}
          style={item.id === currentImage.id ? styles.largeImage : styles.smallImage}
        />
      </TouchableOpacity>
      );
    
      return (
        <View >
            <TouchableOpacity onPress={() => nextPage()}>
                <Card style={styles.card}>
                    <Card.Content>

                        <Image source={{ uri: currentImage.uri }} style={styles.largeImage} />
                
                        <FlatList
                            data={propertyImages}
                            renderItem={renderImageItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            contentContainerStyle={styles.imageList}
                        />
                        <Title>Beautiful Property</Title>
                        <Paragraph>2 Bedrooms | 2 Bathrooms | 1500 sqft</Paragraph>
                        <Paragraph>£1500</Paragraph>
                        <Paragraph style={styles.addressText}>Church Hill Road</Paragraph>
                        <Paragraph style={styles.addressText}>Sligo Town</Paragraph>
                        <Paragraph style={styles.addressText}>County Sligo</Paragraph>
                    
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
  });

export default Ad