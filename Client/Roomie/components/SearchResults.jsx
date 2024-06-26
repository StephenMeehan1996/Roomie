import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { Menu, IconButton, Divider, Paragraph } from 'react-native-paper';
import { Appbar, Button, Portal, Dialog, Text, RadioButton, TextInput, Title, Card } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'
import Ad from './Ad'
import { Picker } from '@react-native-picker/picker';
import { yesNO, priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days, irishCounties, rentalPreference, orderBy, radius } from '../data/formData';
import formStyles from '../styles/formStyle.style';
import useFetchDataBoth from '../functions/DetailAndImageGetAPI';
import { returnAdTypeNum, calculateMatchPercentage, sortAds } from '../functions/CommonFunctions';
import { useAppContext } from '../Providers/AppContext';


const SearchResults = ({ navigation, route }) => {
  
  const {signedInUserDetails} = useAppContext();
  const [uID, setUID] = useState(signedInUserDetails.useridentifier);
  
  const { searchValue, countyLocations } = route.params;
  let { images} = route.params;


  const [detail, setDetail] = useState(route.params.detail);
  countyLocations.sort((a, b) => a.locationvalue.length - b.locationvalue.length); // sort so county appears first

  const [visible, setVisible] = useState(false);
  const [filteredAds, setFilteredAds] = useState([]);
  const [priceRangeMin, setPriceRangeMin] = useState('500');
  const [priceRangeMax, setPriceRangeMax] = useState('700');
  const [distanceRadius, setDistanceRadius] = useState('0');
  const [orderByValue, setOrderByValue] = useState('Match %');
  const [location, setLocation] = useState(searchValue.query);
  const [rentalType, setRentalType] = useState(searchValue.rentalType);

  const fetchData = useFetchDataBoth();
  
  const [locations, setLocations] = useState([]);

  const [details, setDetails] = useState(detail);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const pickerItemStyle = {
    fontSize: 10, 
  };

  const handleSearch = async (value) => {
    setLocation(value);
  };
  
  const changeOrder =()=>{

    setFilteredAds(sortAds(filteredAds, orderByValue));
    hideDialog();

  }

  useEffect(() => {
    const filterAds = () => {
      let search = location.split(',')[0];
      let adType = returnAdTypeNum(rentalType);
      const filtered = detail.filter((ad) => `${ad.addressline1} ${ad.addressline2} ${ad.city} ${ad.county} `.toLowerCase().includes(search.toLowerCase())
        && ad.addtype === adType && ad.useridentifier !== uID && ad.active != 0);
      return filtered;
    };
  
    const filteredAds = filterAds();
    setFilteredAds(filteredAds);
  }, [location, detail, rentalType, uID]); 
  
  useEffect(() => {
    const filterAds = () => {
      let search = location.split(',')[0];
      let adType = returnAdTypeNum(rentalType);
      const filtered = detail.filter((ad) => `${ad.addressline1} ${ad.addressline2} ${ad.city} ${ad.county} `.toLowerCase().includes(search.toLowerCase())
        && ad.addtype === adType && ad.useridentifier !== uID && ad.active != 0);
      return filtered;
    };
  
    const cal = async () => {
      let propertyName = 'percentageMatch';
      let propertyValue = null;
      let adType = returnAdTypeNum(rentalType);
      let filtered = filterAds();
  
      if (filtered.length > 0) {
  
        if (filtered.length > 0 && !(propertyName in filtered[0])) {
          filtered = filtered.map(obj => {
            console.log('in loop');
            return { ...obj, [propertyName]: propertyValue };
          });
        }
  
        if (filtered[0] && filtered[0].percentageMatch === null || filtered[0].percentageMatch === undefined) {
          console.log('Calculating Match');
          const match = await calculateMatchPercentage(signedInUserDetails, filtered, adType);
          setFilteredAds(match);
        }
      };
    }
  
    cal();
  }, [location, detail, rentalType, uID]);
  
  

  const renderAds = ({ item: ad }) => {

    const adImages = images.filter((image) => image.AddID === ad.addid);

    return (
      <TouchableOpacity key={ad.addid} >
        <Ad ad={ad} images={adImages} navigation={navigation} uID={uID} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Appbar.Header style={[styles.header, { paddingVertical: 5 }]}>

          <View style={styles.pickerContainer}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Paragraph style={styles.black}>Rental Type:</Paragraph>
              <Picker
                style={[styles.input]}
                selectedValue={rentalType}
                onValueChange={value => { setRentalType(value) }}
              >
                {rentalPreference.map((option, index) => (
                  <Picker.Item key={index} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Paragraph style={styles.black}>Location:</Paragraph>
              {countyLocations.length > 0 ? (
                <Picker
                  style={[styles.input, { marginTop: 0 }]}
                  selectedValue={location}
                  //onValueChange={value => { setLocation(value) }}
                  onValueChange={(value) => handleSearch(value)}
                >
                  {countyLocations.map((option, index) => (
                    <Picker.Item key={index} label={option.locationvalue} value={option.locationvalue} />
                  ))}
                </Picker>
              ) : (
                <Picker
                  style={[styles.input, { marginTop: 0 }]}
                  selectedValue={location}
                  onValueChange={value => { setLocation(value) }}
                >
                  <Picker.Item label={searchValue.query} value={searchValue.query} />
                </Picker>
              )}
            </View>
          </View>

          <View style={[, { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }]}>
            <Appbar.Action icon="filter" iconColor='#1c1b1fde' onPress={showDialog} style={{ marginLeft: -2 }} />
            <IconButton
              icon="arrow-left"
              mode="text"
              iconColor='#1c1b1fde'
              size={30}
              style={{ marginLeft: -18 }}
              onPress={() => navigation.goBack()}>
            </IconButton>
          </View>
        </Appbar.Header>

        <Portal style={{}}>
          <Dialog visible={visible} onDismiss={hideDialog} style={styles.popup}>
            <Dialog.Title>Filters</Dialog.Title>
            <Dialog.Content>
              <View>
                <Text style={styles.label}>Distance Radius:</Text>
                <Picker
                  style={[styles.input, styles.singleLineInput]}
                  selectedValue={distanceRadius}
                  onValueChange={value => { setDistanceRadius(value) }}
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
                    style={[styles.input, { width: 130, marginRight: 10 }]}
                    selectedValue={priceRangeMin}
                    onValueChange={value => { setPriceRangeMin(value) }}
                  >
                    {priceRange.map((option, index) => (
                      <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                  </Picker>

                </View>
                <View >
                  <Text style={styles.label}>Max:</Text>
                  <Picker
                    style={[styles.input, { width: 130 }]}
                    selectedValue={priceRangeMax}
                    onValueChange={value => { setPriceRangeMax(value) }}
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
                  onValueChange={value => { setOrderByValue(value) }}
                >
                  {orderBy.map((option, index) => (
                    <Picker.Item key={index} label={option.label} value={option.value} />
                  ))}
                </Picker>

              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Close</Button>
              <Button onPress={() => changeOrder()}>Apply</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </View>
      <ScrollView>
        {filteredAds.length === 0 ? (
          <Card elevation={5} style={[formStyles.card, { marginTop: 30, paddingVertical: 40 }]}>
            <Card.Content>
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No results found</Text>
              </View>
            </Card.Content>
          </Card>
        ) : (
          <FlatList
            data={filteredAds.length > 0 ? filteredAds : null}
            renderItem={renderAds}
            keyExtractor={(ad) => ad.addid.toString()}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  black: {
    color: '#1c1b1fde' 
   },
  noResultsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
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
  popup: {
    position: 'absolute',
    right: -25,

    width: '85%',
    padding: 5,
    borderLeftWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 0,
    marginTop: -30
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
  singleLineInput: {
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
  width: {
    width: 100
  },
  sameLineContainer: {
    flexDirection: 'row',


  },
  lineInput: {
    flex: 1, // Take up equal space in the row
    marginRight: 8, // Add spacing between first and last name fields
  },

  androidPickerText: {
    fontSize: 10
  }
});



export default SearchResults