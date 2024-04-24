import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Checkbox, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import callLambdaFunction from '../functions/PostAPI';
import { useAppContext } from '../Providers/AppContext';
import putAPI from '../functions/PutAPI';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//import { yesNO, priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days } from '../data/formData';
import { genderOptions, workingHoursOptions, occupationOptions, yearOfStudyOptions, yesNO, rentalPreference, irishCounties, priceRange, daysnumber, roomType, houseType, houseMatExpectations, environmentOptions, number, days } from '../data/formData';
import styles from '../styles/formStyle.style';
import { generateUUID } from '../functions/CommonFunctions';
import { update } from 'firebase/database';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import { DatePickerModal } from 'react-native-paper-dates';
import ManagePersonalDetails from './ManagePersonalDetails';


const ManagePreferences = ({ navigation, route }) => {

  const { signedInUserDetails } = useAppContext();

  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(1);
  const [selectedApplicationTab, setSelectedApplicationTab] = useState('Tab1');

  const isButtonSelected = (buttonId) => selectedButton === buttonId;

  const handleButtonPress = (buttonId) => {
    setSelectedButton(buttonId);
    console.log(signedInUserDetails)
  };

  const updatePreferences = async (values) => {
    //https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/preferences
    console.log(values);
    setUpdating(true);
    let res = await putAPI(`https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/preferences`, values);
    console.log(res)
    setUpdating(false);
  }

  const PrefSchema = Yup.object().shape({
    uid: Yup.string(),
    houseSharePriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please enter a minimum price')
      .required('Please enter a minimum price'),
    houseSharePriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please enter a maximum price')
      .required('Please enter a maximum price'),
    houseShareRoomType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a room type'),
    houseShareHouseType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a house type'),
    houseShareEnsuite: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
    houseMateExpect: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
    environment: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),

    houseRentalPriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please enter a minimum price')
      .required('Please enter a minimum price'),
    houseRentalPriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please enter a maximum price')
      .required('Please enter a maximum price'),
    numRooms: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a number of rooms'),
    houseRentalHouseType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a house type'),

    digsPriceRangeMin: Yup.string()
      .notOneOf(['Select an option'], 'Please enter a minimum price')
      .required('Please enter a minimum price'),
    digsPriceRangeMax: Yup.string()
      .notOneOf(['Select an option'], 'Please enter a maximum price')
      .required('Please enter a maximum price'),
    digsRoomType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a room type'),
    digsHouseType: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a house type'),
    digsDays: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value'),
    digsMealIncluded: Yup.string()
      .notOneOf(['Select an option'], 'Please select a value')
      .required('Please select a value')

  });

  const renderApplicationTabContent = () => {
    switch (selectedApplicationTab) {
      case 'Tab1':
        return (
          <Formik
            initialValues={{
              uid: signedInUserDetails.useridentifier,
              houseSharePriceRangeMin: signedInUserDetails.housesharepricemin,
              houseSharePriceRangeMax: signedInUserDetails.housesharepricemax,
              houseShareRoomType: signedInUserDetails.houseshareroomtype,
              houseShareHouseType: signedInUserDetails.housesharehousetype,
              houseShareEnsuite: '1',
              houseMateExpect: signedInUserDetails.housemateexpact,
              environment: signedInUserDetails.houseshareenvoirnment,

              houseRentalPriceRangeMin: signedInUserDetails.houserentalpricemin,
              houseRentalPriceRangeMax: signedInUserDetails.houserentalpricemax,
              numRooms: signedInUserDetails.houserentalnumrooms,
              houseRentalHouseType: signedInUserDetails.houserentalhousetype,

              digsPriceRangeMin: signedInUserDetails.digspricemin,
              digsPriceRangeMax: signedInUserDetails.digspricemax,
              digsRoomType: signedInUserDetails.digsroomtype,
              digsHouseType: signedInUserDetails.digshousetype,
              digsDays: signedInUserDetails.digsdays,
              digsMealIncluded: signedInUserDetails.digsmealsincluded,

              
            }}
            validationSchema={PrefSchema}
            onSubmit={values => updatePreferences(values)}
          >

            {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit, dirty }) => (

              <View style={styles.container}>

                <Card elevation={5} style={styles.card}>
                  <Card.Content>
                    <View style={styles.header}>
                      <Title style={styles.title}>Rental Preferences</Title>
                      <IconButton
                        icon="arrow-left"
                        mode="text"
                        size={30}
                        iconColor='#1c1b1fde'
                        style={{ flex: 1, alignItems: 'flex-end' }}
                        onPress={() => navigation.goBack()}>
                      </IconButton>
                    </View>
                    <View style={styles.searchBtnContainer}>

                      <TouchableOpacity
                        style={[
                          styles.button,
                          isButtonSelected(1) && styles.selectedButton,
                        ]}
                        onPress={() => handleButtonPress(1)}
                      >
                        <Text style={[styles.buttonText, isButtonSelected(1) && styles.selectedButtonText]}>House share</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.button,
                          isButtonSelected(2) && styles.selectedButton,
                        ]}
                        onPress={() => handleButtonPress(2)}
                      >
                        <Text style={[styles.buttonText, isButtonSelected(2) && styles.selectedButtonText]}>House Rental</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.button,
                          isButtonSelected(3) && styles.selectedButton
                        ]}
                        onPress={() => handleButtonPress(3)}
                      >
                        <Text style={[styles.buttonText, isButtonSelected(3) && styles.selectedButtonText]}>Digs</Text>
                      </TouchableOpacity>
                    </View>
                  </Card.Content>
                </Card>

                <View>

                  <Card elevation={5} style={styles.card}>
                    {selectedButton === 1 && (
                      <Card.Content>

                        <Title style={styles.title}>House Share Preferences</Title>
                        <Text style={styles.label}>Price Range:</Text>
                        <View style={styles.sameLineContainer}>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Min:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.houseSharePriceRangeMin}
                              onValueChange={handleChange('houseSharePriceRangeMin')}
                              onBlur={() => setFieldTouched('houseSharePriceRangeMin')}
                            >
                              {priceRange.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.houseSharePriceRangeMin && errors.houseSharePriceRangeMin && (
                              <Text style={styles.errorTxt}>{errors.houseSharePriceRangeMin}</Text>
                            )}
                          </View>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Max:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.houseSharePriceRangeMax}
                              onValueChange={handleChange('houseSharePriceRangeMax')}
                              onBlur={() => setFieldTouched('houseSharePriceRangeMax')}
                            >
                              {priceRange.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.houseSharePriceRangeMax && errors.houseSharePriceRangeMax && (
                              <Text style={styles.errorTxt}>{errors.houseSharePriceRangeMax}</Text>
                            )}
                          </View>
                        </View>

                        <View style={styles.sameLineContainer}>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Room Type:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.houseShareRoomType}
                              onValueChange={handleChange('houseShareRoomType')}
                              onBlur={() => setFieldTouched('houseShareRoomType')}
                            >
                              {roomType.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.houseShareRoomType && errors.houseShareRoomType && (
                              <Text style={styles.errorTxt}>{errors.houseShareRoomType}</Text>
                            )}
                          </View>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>House Type:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.houseShareHouseType}
                              onValueChange={handleChange('houseShareHouseType')}
                              onBlur={() => setFieldTouched('houseShareHouseType')}
                            >
                              {houseType.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.houseShareHouseType && errors.houseShareHouseType && (
                              <Text style={styles.errorTxt}>{errors.houseShareHouseType}</Text>
                            )}
                          </View>
                        </View>

                        <View style={styles.lineInput}>
                          <Text style={styles.label}>Ensuite</Text>
                          <Picker
                            style={[styles.input, styles.singleLineInput]}
                            selectedValue={values.houseShareEnsuite}
                            onValueChange={handleChange('houseShareEnsuite')}
                            onBlur={() => setFieldTouched('houseShareEnsuite')}
                          >
                            {yesNO.map((option, index) => (
                              <Picker.Item key={index} label={option.label} value={option.value} />
                            ))}
                          </Picker>
                          {touched.houseShareEnsuite && errors.houseShareEnsuite && (
                            <Text style={styles.errorTxt}>{errors.houseShareEnsuite}</Text>
                          )}
                        </View>

                        <View style={styles.sameLineContainer}>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>House Expectations:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.houseMateExpect}
                              onValueChange={handleChange('houseMateExpect')}
                              onBlur={() => setFieldTouched('houseMateExpect')}
                            >
                              {houseMatExpectations.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.houseMateExpect && errors.houseMateExpect && (
                              <Text style={styles.errorTxt}>{errors.houseMateExpect}</Text>
                            )}
                          </View>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Environment:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.environment}
                              onValueChange={handleChange('environment')}
                              onBlur={() => setFieldTouched('environment')}
                            >
                              {environmentOptions.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.environment && errors.environment && (
                              <Text style={styles.errorTxt}>{errors.environment}</Text>
                            )}
                          </View>
                        </View>
                        {loading ? <View style={styles.activityContainer}><ActivityIndicator size="large" color="#0000ff" /></View>
                          : <>
                          </>}
                        <Button
                          mode="contained"
                          color="#FF5733"
                          labelStyle={styles.buttonLabel}
                          disabled={!isValid || !dirty}
                          style={{ marginVertical: 10 }}
                          onPress={handleSubmit}>
                          Save Changes
                        </Button>

                      </Card.Content>
                    )}

                    {selectedButton === 2 && (
                      <Card.Content>
                        <Title style={styles.title}>House Rental Preferences</Title>
                        <Text style={styles.label}>Price Range:</Text>
                        <View style={styles.sameLineContainer}>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Min:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.houseRentalPriceRangeMin}
                              onValueChange={handleChange('houseRentalPriceRangeMin')}
                              onBlur={() => setFieldTouched('houseRentalPriceRangeMin')}
                            >
                              {priceRange.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.houseRentalPriceRangeMin && errors.houseRentalPriceRangeMin && (
                              <Text style={styles.errorTxt}>{errors.houseRentalPriceRangeMin}</Text>
                            )}
                          </View>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Max:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.houseRentalPriceRangeMax}
                              onValueChange={handleChange('houseRentalPriceRangeMax')}
                              onBlur={() => setFieldTouched('houseRentalPriceRangeMax')}
                            >
                              {priceRange.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.houseRentalPriceRangeMax && errors.houseRentalPriceRangeMax && (
                              <Text style={styles.errorTxt}>{errors.houseRentalPriceRangeMax}</Text>
                            )}
                          </View>
                        </View>

                        <View style={styles.sameLineContainer}>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Num Rooms:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.numRooms}
                              onValueChange={handleChange('numRooms')}
                              onBlur={() => setFieldTouched('numRooms')}
                            >
                              {number.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.numRooms && errors.numRooms && (
                              <Text style={styles.errorTxt}>{errors.numRooms}</Text>
                            )}
                          </View>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>House Type:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.houseRentalHouseType}
                              onValueChange={handleChange('houseRentalHouseType')}
                              onBlur={() => setFieldTouched('houseRentalHouseType')}
                            >
                              {houseType.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.houseRentalHouseType && errors.houseRentalHouseType && (
                              <Text style={styles.errorTxt}>{errors.houseRentalHouseType}</Text>
                            )}
                          </View>
                        </View>
                        {loading ? <View style={styles.activityContainer}><ActivityIndicator size="large" color="#0000ff" /></View>
                          : <>
                          </>}
                        <Button
                          mode="contained"
                          color="#FF5733"
                          labelStyle={styles.buttonLabel}
                          disabled={!isValid || !dirty}
                          style={{ marginVertical: 10 }}
                          onPress={handleSubmit}>
                          Save Changes
                        </Button>
                      </Card.Content>
                    )}
                    {selectedButton === 3 && (
                      <Card.Content>
                        <Title style={styles.title}>Digs Preferences</Title>
                        <Text style={styles.label}>Price Range:</Text>
                        <View style={styles.sameLineContainer}>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Min:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.digsPriceRangeMin}
                              onValueChange={handleChange('digsPriceRangeMin')}
                              onBlur={() => setFieldTouched('digsPriceRangeMin')}
                            >
                              {priceRange.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.digsPriceRangeMin && errors.digsPriceRangeMin && (
                              <Text style={styles.errorTxt}>{errors.digsPriceRangeMin}</Text>
                            )}
                          </View>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Max:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.digsPriceRangeMax}
                              onValueChange={handleChange('digsPriceRangeMax')}
                              onBlur={() => setFieldTouched('digsPriceRangeMax')}
                            >
                              {priceRange.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.digsPriceRangeMax && errors.digsPriceRangeMax && (
                              <Text style={styles.errorTxt}>{errors.digsPriceRangeMax}</Text>
                            )}
                          </View>
                        </View>

                        <View style={styles.sameLineContainer}>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Room Type:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.digsRoomType}
                              onValueChange={handleChange('digsRoomType')}
                              onBlur={() => setFieldTouched('digsRoomType')}
                            >
                              {roomType.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.digsRoomType && errors.digsRoomType && (
                              <Text style={styles.errorTxt}>{errors.digsRoomType}</Text>
                            )}
                          </View>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>House Type:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.digsHouseType}
                              onValueChange={handleChange('digsHouseType')}
                              onBlur={() => setFieldTouched('digsHouseType')}
                            >
                              {houseType.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.digsHouseType && errors.digsHouseType && (
                              <Text style={styles.errorTxt}>{errors.digsHouseType}</Text>
                            )}
                          </View>
                        </View>

                        <View style={styles.sameLineContainer}>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Days:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.digsDays}
                              onValueChange={handleChange('digsDays')}
                              onBlur={() => setFieldTouched('digsDays')}
                            >
                              {days.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.digsDays && errors.digsDays && (
                              <Text style={styles.errorTxt}>{errors.digsDays}</Text>
                            )}
                          </View>
                          <View style={styles.lineInput}>
                            <Text style={styles.label}>Meals Included:</Text>
                            <Picker
                              style={styles.input}
                              selectedValue={values.digsMealIncluded}
                              onValueChange={handleChange('digsMealIncluded')}
                              onBlur={() => setFieldTouched('digsMealIncluded')}
                            >
                              {yesNO.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                              ))}
                            </Picker>
                            {touched.digsMealIncluded && errors.digsMealIncluded && (
                              <Text style={styles.errorTxt}>{errors.digsDays}</Text>
                            )}
                          </View>
                        </View>
                        {loading ? <View style={styles.activityContainer}><ActivityIndicator size="large" color="#0000ff" /></View>
                          : <>
                          </>}
                        <Button
                          mode="contained"
                          color="#FF5733"
                          labelStyle={styles.buttonLabel}
                          disabled={!isValid || !dirty}
                          style={{ marginVertical: 10 }}
                          onPress={handleSubmit}>
                          Save Changes
                        </Button>
                      </Card.Content>
                    )}
                  </Card>
                </View>

              </View>
            )}
          </Formik>
        );
      case 'Tab2':
        return (
        <View><ManagePersonalDetails></ManagePersonalDetails></View>

        );
      default:
        return null;
    }
  };


  return (
    <ScrollView>
      <View >
        <Card elevation={5} style={styles.card}>
          <Card.Content>
            <View style={styles.header}>

              <View style={[styles2.tabButtons, { width: 300 }]}>
                <TouchableOpacity
                  style={[
                    styles2.tabButton,
                    selectedApplicationTab === 'Tab1' && styles2.selectedTab,
                  ]}
                  onPress={() => setSelectedApplicationTab('Tab1')}
                >
                  <Text>Rental Preferences</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles2.tabButton,
                    selectedApplicationTab === 'Tab2' && styles2.selectedTab,
                  ]}
                  onPress={() => setSelectedApplicationTab('Tab2')}
                >
                  <Text>Personal Details</Text>
                </TouchableOpacity>

              </View>


            </View>

          </Card.Content>
        </Card>
      </View>
      {renderApplicationTabContent()}


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
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 50,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  selectedTab: {
    borderColor: 'blue',
  },
});

export default ManagePreferences