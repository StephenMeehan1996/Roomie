import { View, SafeAreaView, ScrollView, StyleSheet,Dimensions } from 'react-native'
import {  Menu, IconButton, Divider, Paragraph } from 'react-native-paper';
import { Appbar, Button, Portal, Dialog, Text, RadioButton, TextInput, Title } from 'react-native-paper';
import React, { useState } from 'react'
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'
import Ad from './Ad'
import { Picker } from '@react-native-picker/picker';
import { yesNO, priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days, irishCounties, rentalPreference, orderBy, radius } from '../data/formData';



const Search = ({navigation, route}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false, 
        });
      }, [navigation]);

      const [visible, setVisible] = useState(false);
     
      const [priceRangeMin, setPriceRangeMin] = useState('500');
      const [priceRangeMax, setPriceRangeMax] = useState('700');
      const [distanceRadius, setDistanceRadius] = useState('0');
      const [orderByValue, setOrderByValue] = useState('Match %');
      const [location, setLocation] = useState('Sligo');
      
    
      const showDialog = () => setVisible(true);
      const hideDialog = () => setVisible(false);



  return (
      <SafeAreaView style={styles.container}>  
       <View >
     
      <Appbar.Header style={styles.header}>
      
        <View style={styles.pickerContainer}>
        <View style={{flexDirection: 'column',alignItems: 'flex-start', marginTop: 12}}>
        <Paragraph>Rental Type:</Paragraph>
            <Picker
              style={[styles.input,{marginTop: 0}]}
              selectedValue={priceRangeMin}
              onValueChange={value =>{setPriceRangeMin(value)}}   
            >
              {rentalPreference.map((option, index) => (
                <Picker.Item key={index} label={option.label} value={option.value} />
              ))}
              </Picker>
              </View>
              </View>

              <View style={styles.pickerContainer}>
        <View style={{flexDirection: 'column',alignItems: 'flex-start', marginTop: 12}}>
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
              
              {/* <View style={styles.pickerContainer}>
                <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
                <Paragraph>Price Range:</Paragraph>
                 <Appbar.Content title={`€${priceRangeMin} - €${priceRangeMax}`} titleStyle={{ fontSize: 16 }} onPress={showDialog} />
              </View>
              </View> */}
              <View style={[styles.pickerContainer, {justifyContent: 'flex-end'}]}>
                <Appbar.Action icon="filter" onPress={showDialog}  />
           
                <IconButton
                  icon="arrow-left"
                  mode="text"
                  size={30}
                  style={{flex:1,alignItems: 'flex-end', marginLeft: -20, marginRight: -10}}
                  onPress={() => navigation.goBack()}>
                </IconButton>
            </View>

          
        </Appbar.Header>

        <Portal style={{ }}>
          <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius: 0, alignSelf: 'flex-start', justifyContent: 'flex-end'}}>
            <Dialog.Title>Filters</Dialog.Title>
            <Dialog.Content>
            <View style={styles.lineInput}>
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
                  <View style={styles.lineInput}>
                      <Text style={styles.label}>Min:</Text>
                      <Picker
                          style={styles.input}
                          selectedValue={priceRangeMin}
                          onValueChange={value =>{setPriceRangeMin(value)}}
                      >
                          {priceRange.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                          ))}
                      </Picker>
                     
                    </View>
                    <View style={styles.lineInput}>
                      <Text style={styles.label}>Max:</Text>
                          <Picker
                              style={styles.input}
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

           <Ad navigation={navigation} route={route}></Ad>
           <Ad navigation={navigation} route={route}></Ad>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
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
        backgroundColor: '#FFFFFF'
      },
      width:{
        width: 100
      },
      sameLineContainer: {
        flexDirection: 'row', // Display first and last name fields horizontally
        justifyContent: 'space-between' // Add space between the two fields
      },
      lineInput: {
        flex: 1, // Take up equal space in the row
        marginRight: 8, // Add spacing between first and last name fields
      },
  });

  

export default Search