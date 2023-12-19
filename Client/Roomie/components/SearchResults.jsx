import { View, SafeAreaView, ScrollView, StyleSheet,Dimensions, TouchableOpacity,FlatList } from 'react-native'
import {  Menu, IconButton, Divider, Paragraph } from 'react-native-paper';
import { Appbar, Button, Portal, Dialog, Text, RadioButton, TextInput, Title } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'
import Ad from './Ad'
import { Picker } from '@react-native-picker/picker';
import { yesNO, priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days, irishCounties, rentalPreference, orderBy, radius } from '../data/formData';



const SearchResults = ({navigation, route}) => {

      const {searchValue, data} = route.params;

      console.log('next= ' +JSON.stringify(data));
      console.log('next= ' +searchValue);
      const [visible, setVisible] = useState(false);
     
      const [priceRangeMin, setPriceRangeMin] = useState('500');
      const [priceRangeMax, setPriceRangeMax] = useState('700');
      const [distanceRadius, setDistanceRadius] = useState('0');
      const [orderByValue, setOrderByValue] = useState('Match %');
      const [location, setLocation] = useState(searchValue.query);
      const [rentalType, setRentalType] = useState(searchValue.rentalType);
    
      const showDialog = () => setVisible(true);
      const hideDialog = () => setVisible(false);
      const pickerItemStyle = {
        fontSize: 10, // Adjust the font size as needed
      };
      const nextPage = () => {
        	navigation.navigate('_AddDetail')
      };

      // useEffect(() => {
      //   // Access the value from route.params and set the state
      //   if (route && route.params) {
      //     setLocation(route.params.search.query);
      //     setRentalType(route.params.search.rentalType)
      //   }
      // }, [route]);

      const renderItem = ({ item }) => {
        return (
          <View>
            <Text>ID: {item.addressline1}</Text>
            <Text>Name: {item.addressline2}</Text>
            {/* Render other properties here */}
          </View>
        );
      };

  return (
      <SafeAreaView style={styles.container}>  
       <View>
        <Appbar.Header style={[styles.header, {paddingVertical: 5}]}>
        
          <View style={styles.pickerContainer}>
            <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
            <Paragraph>Rental Type:</Paragraph>
                <Picker
                  style={[styles.input]}
                  selectedValue={rentalType}
                  onValueChange={value =>{setRentalType(value)}}
                >
                  {rentalPreference.map((option, index) => (
                    <Picker.Item key={index} label={option.label} value={option.value} />
                  ))}
                </Picker>
            </View>
          </View>

            <View style={styles.pickerContainer}>
              <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
              <Paragraph>Location:</Paragraph>
                  <Picker
                    style={[styles.input,{marginTop: 0}]}
                    selectedValue={location}
                    onValueChange={value =>{setLocation(value)}}   
                  >
                    {irishCounties.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>
              </View>
            </View>
                  
            <View style={[,{flexDirection: 'row',justifyContent: 'flex-end', alignItems: 'center'}]}>
              <Appbar.Action icon="filter" onPress={showDialog}   style={{marginLeft: -2}} />
              <IconButton
                icon="arrow-left"
                mode="text"
                size={30}
                style={{marginLeft: -18}}
                onPress={() => navigation.goBack()}>
                </IconButton>
            </View>
          </Appbar.Header>
        
          <Portal style={{ }}>
            <Dialog visible={visible} onDismiss={hideDialog} style={styles.popup}>
              <Dialog.Title>Filters</Dialog.Title>
              <Dialog.Content>
                <View>
                  <Text style={styles.label}>Distance Radius:</Text>
                  <Picker
                    style={[styles.input, styles.singleLineInput]}
                    selectedValue={distanceRadius}
                    onValueChange={value => {setDistanceRadius(value)}}          
                    >
                    {radius.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>     
                </View>
                <Text style={styles.label}>Price Range:</Text>
                <View style={styles.sameLineContainer}>
                    <View>
                        <Text style={styles.label}>Min:</Text>
                        <Picker
                            style={[styles.input,{width: 130, marginRight: 10}]}
                            selectedValue={priceRangeMin}
                            onValueChange={value =>{setPriceRangeMin(value)}}
                        >
                            {priceRange.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                      
                    </View>
                      <View >
                        <Text style={styles.label}>Max:</Text>
                            <Picker
                                style={[styles.input,{width: 130}]}
                                selectedValue={priceRangeMax}
                                onValueChange={value =>{setPriceRangeMax(value)}}
                            >
                                {priceRange.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                      </View>
                    </View>
                    <View style={styles.lineInput}>
                        <Text style={styles.label}>Orderby:</Text>
                        <Picker
                            style={[styles.input, styles.singleLineInput]}
                            selectedValue={orderByValue}
                            onValueChange={value => {setOrderByValue(value)}}
                            >
                            {orderBy.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                      
                    </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Close</Button>
              <Button >Apply</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
       
      </View>
      <ScrollView>

       {/* <TouchableOpacity onPress={nextPage}>
          <Ad navigation={navigation}/>
       </TouchableOpacity>

       <TouchableOpacity onPress={nextPage}>
          <Ad navigation={navigation}/>
       </TouchableOpacity> */}

  	  <FlatList
        data={data} // Assuming fetchedData is an array
        renderItem={renderItem}
        keyExtractor={(item) => item.addid.toString()} // Assuming 'id' is unique
      />

    
     
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  lineInput: {
    flex: 1, // Take up equal space in the row
    marginRight: 8, // Add spacing between first and last name fields
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  popup:{
    position: 'absolute',
    right: -25,
    flex: 1,
    width: '85%',
    padding: 5,
    borderLeftWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 0, 
  },
    container: {
      flex: 1,
      padding: 5
    },
    pickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    singleLineInput:{
      width: Dimensions.get('window').width * 0.4,
    },
    addContainer: {
        //backgroundColor: '#f5f5f5', // Slightly off-white color
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.2)', // Cool box shadow color
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10, // Blur radius for the box shadow
        paddingHorizontal: 7,
        paddingVertical: 15, // Adjust the padding as needed
        borderRadius: 8, // Optional: Add rounded corners
        marginBottom: 10
      },
      content: {
        padding: 16,
        fontSize: 18,
        textAlign: 'center',
      },
      input: {
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        width: 150,
        Height: 20
      },
      width:{
        width: 100
      },
      sameLineContainer: {
        flexDirection: 'row',
       

      },
      lineInput: {
        flex: 1, // Take up equal space in the row
        marginRight: 8, // Add spacing between first and last name fields
      },

      androidPickerText:{
        fontSize: 10
      }
  });

  

export default SearchResults