import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Checkbox, RadioButton, Provider, MD3Colors, Menu, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { generateUUID, getStorageLocation, deleteImage, returnAdTypeText } from '../functions/CommonFunctions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import callLambdaFunction from '../functions/PostAPI';
import { genderOptions, workingHoursOptions, occupationOptions, yearOfStudyOptions, yesNO, rentalPreference, environmentOptions, houseMatExpectations, irishCounties, number, houseType, priceRange, days, roomType } from '../data/formData';
import styles from '../styles/formStyle.style';
import useFetchDataBoth from '../functions/DetailAndImageGetAPI';
import useFetchData from '../functions/GetAPI';
import putAPI from '../functions/PutAPI';



const ManageAd = ({ navigation, route, ad, images }) => {
  // need select first image set first image

  const [imageArray, setImageArray] = useState(images);
  const windowWidth = useWindowDimensions().width;
  const [selectedButton, setSelectedButton] = useState(1);
  const [loading, setLoading] = useState(false);
  const isButtonSelected = (buttonId) => selectedButton === buttonId;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentImage, setCurrentImage] = useState(imageArray[0]); // bug with image may be here
  const [menuVisible, setMenuVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const fetchAds = useFetchDataBoth();
  const openMenu = () => setMenuVisible(true);
  const [selectedApplicationTab, setSelectedApplicationTab] = useState('Tab1');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const closeMenu = () => setMenuVisible(false);
  const handleButtonPress = (buttonId) => {
    setSelectedButton(buttonId);

  };

  console.log(imageArray);
  console.log(currentImage);

  const handleDeleteImage = async (type) => {
    setUpdating(true);

    await deleteImage(getStorageLocation('images', currentImage.Filename)); // deletes from firebase
    let t = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieDeleteAdImage?imageID=${currentImage.AddImageID}`);
    console.log(t);
    imageArray.shift(); // removes image locally, to avoid refresh
    closeMenu();
    setImageArray([...imageArray]);
    setCurrentImage(imageArray[0]);
    setUpdating(false);
  };

  const handleImageSelect = (image) => {
    //Swaps selected image with image at index 0
    const index1 = 0;
    const index2 = imageArray.findIndex((item) => item.AddImageID === image.AddImageID);

    if (index1 >= 0 && index1 < imageArray.length && index2 >= 0 && index2 < imageArray.length) {

      [imageArray[index1], imageArray[index2]] = [imageArray[index2], imageArray[index1]];
      setCurrentImage(imageArray[0]);

    } else {
      console.log('Invalid indices for swapping.');
    }

  };

  function imagePosition(file) {
    if (file == imageArray[0]) {
      return 1;
    }
    return 0;
  }

  const uploadFile = async () => {
    if (selectedFiles) {
      const storage = getStorage();
      const imagesToPost = [];
      setUploading(true);
      const uploadPromises = [];
      const imageArray = [];

      for (const file of selectedFiles) {
        try {
          const response = await fetch(file.uri);
          const blob = await response.blob();
          const storageRef = ref(storage, 'images/' + file.filename);

          const uploadPromise = new Promise((resolve, reject) => {
            uploadBytes(storageRef, blob)
              .then(async (snapshot) => {
                console.log('Uploaded a blob or file!');
                const url = await getDownloadURL(snapshot.ref);

                let imageObj = [ad.addid, url, file.filename, imagePosition(file)];

                imageArray.push(imageObj);
                resolve();
              })
              .catch((error) => {
                console.error('Error uploading image:', error);
                reject(error);
              });
          });

          uploadPromises.push(uploadPromise);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }

      try {
        await Promise.all(uploadPromises);

        setSelectedFiles([]);
        let signUpUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/addimages'; // end point for form post
        callLambdaFunction(imageArray, signUpUrl); // working 

        const getUserAds = await fetchAds(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUsersAds?uid=${ad.useridentifier}`);
        let i = getUserAds.images;
        setImageArray(i.filter((image) => image.AddID === ad.addid));

        setUploading(false);

      } catch (error) {
        console.error('Error occurred during file uploads:', error);
      }
    } else {
      console.log('No image selected for upload.');
    }
  };



  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    })
    if (!result.canceled) {
      let uri = result.assets[0].uri;
      let filename = generateUUID();
      const newImage = { uri: uri, filename: filename };
      setSelectedFiles([...selectedFiles, newImage]);
    }
  }

  const removeImage = (uri) => {
    const updatedFiles = selectedFiles.filter((image) => image.uri !== uri);
    setSelectedFiles(updatedFiles);
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImageSelect(item)}>
      <Image
        source={{ uri: item.ImageURL }}
        //style={item.profileimageid === currentImage.profileimageid ? styles2.largeImage : styles2.smallImage}
        style={styles2.smallImage}
      />
    </TouchableOpacity>
  );

  const handleDeleteAd = () => {
    setSnackbarMessage('Are you sure you want to delete the ad?');
    showDialog();
    // Add your logic for deleting ad here
  };

  const handleChangeAdState = () => {
    if(ad.active === 1)
      setSnackbarMessage('Are you sure you want to make the ad inactive?');
    else
      setSnackbarMessage('Are you sure you want to activate this ad?');
   
    showDialog();
  };

  const confirmAction = async () => {

    if (snackbarMessage === 'Are you sure you want to delete the ad?') {

      setUpdating(true);
      await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieDeleteAd?id=${ad.addid}&type=${ad.addtype}&pref=${ad.preferenceset}`);
      setUpdating(false);
      navigation.navigate('_Profile');


    } else if (snackbarMessage === 'Are you sure you want to make the ad inactive?' || snackbarMessage === 'Are you sure you want to activate this ad?') {
      // https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieToggleAdActive?id
      setUpdating(true);
      await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieToggleAdActive?id=${ad.addid}`);
      setUpdating(false);
      navigation.navigate('_Profile');
    }

    // After completing the action, hide the dialog
    hideDialog();
  };

  const saveChanges = async (values) => {
    console.log(values);
    //https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/add

    setUpdating(true);
    let res = await putAPI(`https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/add`, values);
    console.log(res)
    setUpdating(false);

  }

  const HouseShareSchema = Yup.object().shape({
    addType: Yup.number().integer(),
    id: Yup.number().integer(),
    numOccupants: Yup.number().integer()
      .required('Please select the current number of occupants'),
    houseShareHouseType: Yup.string()
      .required('Please select a property type'),
    houseSharePrice: Yup.string()
      .required('Please select a price'),
    houseShareRoomType: Yup.string()
      .required('Please select a room type'),
    houseShareHouseType: Yup.string()
      .required('Please select a house type'),
    houseShareEnsuite: Yup.number().integer()
      .required('Please select a value'),
    bio: Yup.string(),
    referenceRequired: Yup.number().integer()
      .required('Please select an option'),
    deposit: Yup.string()
      .required('Please enter deposit detail'),
    houseMateDetailOption: Yup.number().integer()
      .required('Please select a option'),
    houseMateGender: Yup.string()
      .required('Please select a gender'),
    houseMateAge: Yup.string()
      .required('Please select a age'),
    houseMateOccupation: Yup.string()
      .required('Please select an occupation'),
    occupationDropdownValue: Yup.string()
      .required('Please select a value'),
    houseMateSmoking: Yup.number().integer()
      .required('Please select an option'),
    houseMateExpect: Yup.string()
      .required('Please select an option'),
    environment: Yup.string()
      .required('Please select an option')
  });

  const HouseRentalSchema = Yup.object().shape({
    addType: Yup.string(),
    numRooms: Yup.string()
      .required('Please enter the city for the address'),
    houseRentalHouseType: Yup.string()
      .required('Please select a house type'),
    houseRentalPrice: Yup.string()
      .required('Please select a price'),
    bio: Yup.string(),

    tenantDetailOption: Yup.string()
      .required('Please select an option'),
    tenantGender: Yup.string()
      .required('Please select a gender'),
    tenantAgeBracket: Yup.string()
      .required('Please select an age bracket'),
    tenantOccupation: Yup.string()
      .required('Please select a occupation'),
    occupationDropdownValue: Yup.string()
      .required('Please select a value'),
    tenantSmoking: Yup.string()
      .required('Please select an option'),
    referenceRequired: Yup.string()
      .required('Please select an option'),
    deposit: Yup.string()
      .required('Please deposit details')
  });

  const DigsSchema = Yup.object().shape({
    addType: Yup.string(),
    numOccupants: Yup.string()
      .required('Please enter the city for the address'),
    digsHouseType: Yup.string()
      .required('Please select a house type'),
    digsPrice: Yup.string()
      .required('Please select a price'),
    digsDays: Yup.string()
      .required('Please select an option'),
    digsMealIncluded: Yup.string()
      .required('Please select an option'),
    referenceRequired: Yup.string()
      .required('Please select an option'),
    deposit: Yup.string()
      .required('Please enter deposit detail'),
    bio: Yup.string(),
    digsDetailOption: Yup.string()
      .required('Please select an option'),
    digsGender: Yup.string()
      .required('Please select a gender'),
    digsAge: Yup.string()
      .required('Please select a age'),
    digsOccupation: Yup.string()
      .required('Please select a occupation'),
    occupationDropdownValue: Yup.string()
      .required('Please select an option'),
    digsSmoking: Yup.string()
      .required('Please select an option')
  });

  console.log(ad);
  const [showForm, setShowForm] = useState(ad.addtype);

  const renderApplicationTabContent = () => {
    switch (selectedApplicationTab) {
      case 'Tab1':
        return (
          <View >
            {/* Region House Share */}
            <>
              <Card elevation={5} style={styles.card}>
                <Card.Content>
                  <View>
                    <View style={styles.imageContainer}>
                      <Image
                        source={imageArray.length > 0 ? { uri: imageArray[0].ImageURL } : require('../assets/Icons/images/noCover.png')}
                        style={styles.image}
                      />
                      <View style={styles.addressContainer}>
                        <Text style={styles.addressText}>{ad.addressline1},</Text>
                        <Text style={styles.addressText}>{ad.addressline2},</Text>
                        <Text style={styles.addressText}>{ad.city},</Text>
                        <Text style={styles.addressText}>{ad.county},</Text>
                        <Text style={styles.addressText}>{ad.eircode}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.searchBtnContainer, { marginTop: 15 }]}>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        isButtonSelected(1) && styles.selectedButton,
                        { marginRight: 10 }
                      ]}
                      onPress={() => handleButtonPress(1)}
                    >
                      <Text style={[styles.buttonText, isButtonSelected(1) && styles.selectedButtonText]}>Property Detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        isButtonSelected(2) && styles.selectedButton,
                        { marginRight: 10 }
                      ]}
                      onPress={() => handleButtonPress(2)}
                    >
                      <Text style={[styles.buttonText, isButtonSelected(2) && styles.selectedButtonText]}>Tenant Detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        isButtonSelected(3) && styles.selectedButton
                      ]}
                      onPress={() => handleButtonPress(3)}
                    >
                      <Text style={[styles.buttonText, isButtonSelected(3) && styles.selectedButtonText]}>Images</Text>
                    </TouchableOpacity>

                  </View>
                </Card.Content>
              </Card>



              {showForm === 1 && (
                <Formik initialValues={{
                  addType: ad.addtype,
                  id: ad.addid,
                  houseSharePrice: ad.price,
                  houseShareHouseType: ad.propertytype,
                  bio: ad.description,
                  referenceRequired: ad.referencerequired,
                  deposit: ad.deposit,
                  houseMateDetailOption: ad.preferenceset.toString(),
                  numOccupants: ad.housesharecurrentoccupants,
                  houseShareRoomType: ad.houseshareroomtype,
                  houseShareEnsuite: ad.houseshareensuite,
                  houseMateGender: ad.gender,
                  houseMateAge: ad.agebracket,
                  houseMateOccupation: ad.occupation,
                  occupationDropdownValue: ad.occupationdetail,
                  houseMateSmoking: ad.smokingpermitted,
                  houseMateExpect: ad.houseexpectation,
                  environment: ad.envoirnment
                }}
                  validationSchema={HouseShareSchema}
                  onSubmit={values => saveChanges(values)}
                >
                  {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit, dirty }) => (
                    <View>

                      {selectedButton === 1 && (
                        <Card elevation={5} style={styles.card}>
                          <Card.Content>
                            <Title style={styles.title}>House Share</Title>
                            <Title style={styles.title2}>Property Detail:</Title>

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
                                <Text style={styles.label}>Ensuite:</Text>
                                <Picker
                                  style={styles.input}
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
                            </View>

                            <View>
                              <Text style={styles.label}>Price Per Month:</Text>
                              <Picker
                                style={[styles.input, styles.singleLineInput]}
                                selectedValue={values.houseSharePrice}
                                onValueChange={handleChange('houseSharePrice')}
                                onBlur={() => setFieldTouched('houseSharePrice')}
                              >
                                {priceRange.map((option, index) => (
                                  <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}
                              </Picker>
                              {touched.houseSharePrice && errors.houseSharePrice && (
                                <Text style={styles.errorTxt}>{errors.houseSharePrice}</Text>
                              )}
                            </View>

                            <View style={styles.sameLineContainer}>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Current Occupants:</Text>
                                <Picker
                                  style={styles.input}
                                  selectedValue={values.numOccupants}
                                  onValueChange={handleChange('numOccupants')}
                                  onBlur={() => setFieldTouched('numOccupants')}
                                >
                                  {number.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                  ))}
                                </Picker>
                                {touched.numOccupants && errors.numOccupants && (
                                  <Text style={styles.errorTxt}>{errors.numOccupants}</Text>
                                )}
                              </View>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Property Type:</Text>
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

                            <View>
                              <Text style={styles.label}>Room Description:</Text>
                              <TextInput
                                style={styles.input}
                                multiline
                                numberOfLines={3}
                                placeholder="Type description here..."
                                onChangeText={handleChange('bio')}
                                value={values.bio}
                                onBlur={() => setFieldTouched('bio')}
                              />
                            </View>

                            <View style={styles.sameLineContainer}>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>References Required:</Text>
                                <Picker
                                  style={styles.input}
                                  selectedValue={values.referenceRequired}
                                  onValueChange={handleChange('referenceRequired')}
                                  onBlur={() => setFieldTouched('referenceRequired')}
                                >
                                  {yesNO.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                  ))}
                                </Picker>
                                {touched.referenceRequired && errors.referenceRequired && (
                                  <Text style={styles.errorTxt}>{errors.referenceRequired}</Text>
                                )}
                              </View>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Deposit:</Text>
                                <TextInput
                                  style={[styles.input, { marginTop: 21 }]}
                                  placeholder="Enter deposit detail"
                                  onChangeText={handleChange('deposit')}
                                  value={values.deposit}
                                  onBlur={() => setFieldTouched('deposit')}
                                />
                                {touched.deposit && errors.deposit && (
                                  <Text style={styles.errorTxt}>{errors.deposit}</Text>
                                )}
                              </View>
                            </View>
                            <Button
                              mode="contained"
                              color="#FF5733"
                              style={{ marginVertical: 20, padding: 2, backgroundColor: '#6750a4', borderRadius: 0}}
                              labelStyle={styles.buttonLabel}
                              disabled={!isValid || !dirty}
                              onPress={handleSubmit}>
                              <Text style={{color: 'white'}}>Save Changes</Text> 
                            </Button>

                          </Card.Content>
                        </Card>
                      )}
                      {selectedButton === 2 && (
                        <Card elevation={5} style={styles.card}>
                          <Card.Content>
                            <Title style={styles.title2}>Roomie Details:</Title>
                            <Text style={styles.label}>What are you looking for in a Roomie:</Text>
                            <RadioButton.Group onValueChange={(newValue) => setFieldValue('houseMateDetailOption', newValue)} value={values.houseMateDetailOption}>
                              <View style={styles.radioContainerStart}>
                                <RadioButton.Item label="Be Specific" value="1" labelStyle={{ color: '#1c1b1fde' }}/>
                                <RadioButton.Item label="Flexible" value="0" labelStyle={{ color: '#1c1b1fde' }}/>
                              </View>
                            </RadioButton.Group>
                            {values.houseMateDetailOption === "1" && (
                              <View>
                                <View style={styles.sameLineContainer}>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Gender:</Text>
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.houseMateGender}
                                      onValueChange={handleChange('houseMateGender')}
                                      onBlur={() => setFieldTouched('houseMateGender')}
                                    >
                                      {genderOptions.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.houseMateGender && errors.houseMateGender && (
                                      <Text style={styles.errorTxt}>{errors.houseMateGender}</Text>
                                    )}
                                  </View>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Age Bracket:</Text>
                                    <Picker //occupationDropdownValue
                                      style={styles.input}
                                      selectedValue={values.houseMateAge}
                                      onValueChange={handleChange('houseMateAge')}
                                      onBlur={() => setFieldTouched('houseMateAge')}
                                    >
                                      {number.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.houseMateAge && errors.houseMateAge && (
                                      <Text style={styles.errorTxt}>{errors.houseMateAge}</Text>
                                    )}
                                  </View>
                                </View>


                                <View style={styles.sameLineContainer}>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Occupation:</Text>
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.houseMateOccupation}
                                      onValueChange={handleChange('houseMateOccupation')}
                                      onBlur={() => setFieldTouched('houseMateOccupation')}
                                    >
                                      {occupationOptions.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.houseMateOccupation && errors.houseMateOccupation && (
                                      <Text style={styles.errorTxt}>{errors.houseMateOccupation}</Text>
                                    )}
                                  </View>

                                  <View style={styles.lineInput}>

                                    {values.houseMateOccupation === 'Working Professional' ? (
                                      <Text style={styles.label}>Working Hours:</Text>
                                    ) :
                                      (
                                        <Text style={styles.label}>Year Of Study:</Text>
                                      )}
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.occupationDropdownValue}
                                      onValueChange={handleChange('occupationDropdownValue')}
                                      onBlur={() => setFieldTouched('occupationDropdownValue')}
                                    >
                                      {values.houseMateOccupation === 'Student'
                                        ? yearOfStudyOptions.map((option, index) => (
                                          <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))
                                        : workingHoursOptions.map((option, index) => (
                                          <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                    {touched.occupationDropdownValue && errors.occupationDropdownValue && (
                                      <Text style={styles.errorTxt}>{errors.occupationDropdownValue}</Text>
                                    )}
                                  </View>
                                </View>
                                <View style={styles.lineInput}>
                                  <Text style={styles.label}>Smoking Permitted:</Text>
                                  <Picker
                                    style={[styles.input, styles.singleLineInput]}
                                    selectedValue={values.houseMateSmoking}
                                    onValueChange={handleChange('houseMateSmoking')}
                                    onBlur={() => setFieldTouched('houseMateSmoking')}
                                  >
                                    {yesNO.map((option, index) => (
                                      <Picker.Item key={index} label={option.label} value={option.value} />
                                    ))}
                                  </Picker>
                                  {touched.houseMateSmoking && errors.houseMateSmoking && (
                                    <Text style={styles.errorTxt}>{errors.houseMateSmoking}</Text>
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
                                      style={[styles.input, { marginTop: 21 }]}
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
                              </View>
                            )}
                            <Button
                              mode="contained"
                              color="#FF5733"
                              style={{ marginVertical: 20, padding: 2, backgroundColor: '#6750a4', borderRadius: 0}}
                              labelStyle={styles.buttonLabel}
                              disabled={!isValid || !dirty}
                              onPress={handleSubmit}>
                               <Text style={{color: 'white'}}>Save Changes</Text> 
                            </Button>
                          </Card.Content>
                        </Card>
                      )}

                    </View>
                  )}
                </Formik>
              )}
            </>
            {/* Region House Rental */}
            <>
              {showForm === 2 && (
                <Formik initialValues={{
                  addType: ad.addtype,
                  id: ad.addid,
                  houseRentalPrice: ad.price,
                  houseRentalHouseType: ad.propertytype,
                  bio: ad.description,
                  referenceRequired: ad.referencerequired,
                  deposit: ad.deposit,
                  tenantDetailOption: ad.preferenceset.toString(),
                  numRooms: ad.houserentalnumbedrooms,
                  tenantGender: ad.gender,
                  tenantAgeBracket: ad.agebracket,
                  tenantOccupation: ad.occupation,
                  occupationDropdownValue: ad.occupationdetail,
                  tenantSmoking: ad.smokingpermitted
                }}
                  validationSchema={HouseRentalSchema}
                  onSubmit={values => saveChanges(values)}
                >
                  {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit, dirty }) => (
                    <View>
                      {selectedButton === 1 && (
                        <Card elevation={5} style={styles.card}>
                          <Card.Content>
                            <Title style={styles.title}>House Rental</Title>
                            <Title style={styles.title2}>Property Detail:</Title>
                            <View style={styles.sameLineContainer}>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Num of Bedrooms:</Text>
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
                                <Text style={styles.label}>Property Type:</Text>
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

                            <View>
                              <Text style={styles.label}>Price Per Month:</Text>
                              <Picker
                                style={[styles.input, styles.singleLineInput]}
                                selectedValue={values.houseRentalPrice}
                                onValueChange={handleChange('houseRentalPrice')}
                                onBlur={() => setFieldTouched('houseRentalPrice')}
                              >
                                {priceRange.map((option, index) => (
                                  <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}
                              </Picker>
                              {touched.houseRentalPrice && errors.houseRentalPrice && (
                                <Text style={styles.errorTxt}>{errors.houseRentalPrice}</Text>
                              )}
                            </View>

                            <View>
                              <Text style={styles.label}>Property Description:</Text>
                              <TextInput
                                style={styles.input}
                                multiline
                                numberOfLines={3}
                                placeholder="Type description here..."
                                onChangeText={handleChange('bio')}
                                value={values.bio}
                                onBlur={() => setFieldTouched('bio')}
                              />
                            </View>

                            <View style={styles.sameLineContainer}>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>References Required:</Text>
                                <Picker
                                  style={styles.input}
                                  selectedValue={values.referenceRequired}
                                  onValueChange={handleChange('referenceRequired')}
                                  onBlur={() => setFieldTouched('referenceRequired')}
                                >
                                  {yesNO.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                  ))}
                                </Picker>
                                {touched.referenceRequired && errors.referenceRequired && (
                                  <Text style={styles.errorTxt}>{errors.referenceRequired}</Text>
                                )}
                              </View>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Deposit:</Text>
                                <TextInput
                                  style={[styles.input, { marginTop: 21 }]}
                                  placeholder="Enter deposit detail"
                                  onChangeText={handleChange('deposit')}
                                  value={values.deposit}
                                  onBlur={() => setFieldTouched('deposit')}
                                />
                                {touched.deposit && errors.deposit && (
                                  <Text style={styles.errorTxt}>{errors.deposit}</Text>
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
                              style={{ marginVertical: 20, padding: 2, backgroundColor: '#6750a4', borderRadius: 0}}
                              onPress={handleSubmit}>
                              <Text style={{color: 'white'}}>Save Changes</Text>
                            </Button>
                          </Card.Content>
                        </Card>
                      )}

                      {selectedButton === 2 && (
                        <Card elevation={5} style={styles.card}>
                          <Card.Content>

                            <Title style={styles.title2}>Tenant Details:</Title>
                            <Text style={styles.label}>What Are You Looking For In a Tenant:</Text>
                            <RadioButton.Group onValueChange={(newValue) => setFieldValue('tenantDetailOption', newValue)} value={values.tenantDetailOption}>
                              <View style={styles.radioContainerStart}>
                              <RadioButton.Item label="Be Specific" value="1" labelStyle={{ color: '#1c1b1fde' }}/>
                                <RadioButton.Item label="Flexible" value="0" labelStyle={{ color: '#1c1b1fde' }}/>
                              </View>
                            </RadioButton.Group>

                            {values.tenantDetailOption === "1" && (
                              <View>
                                <View style={styles.sameLineContainer}>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Gender:</Text>
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.tenantGender}
                                      onValueChange={handleChange('tenantGender')}
                                      onBlur={() => setFieldTouched('tenantGender')}
                                    >
                                      {genderOptions.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.tenantGender && errors.tenantGender && (
                                      <Text style={styles.errorTxt}>{errors.tenantGender}</Text>
                                    )}
                                  </View>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Age Bracket:</Text>
                                    <Picker //occupationDropdownValue
                                      style={styles.input}
                                      selectedValue={values.tenantAgeBracket}
                                      onValueChange={handleChange('tenantAgeBracket')}
                                      onBlur={() => setFieldTouched('tenantAgeBracket')}
                                    >
                                      {number.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.tenantAgeBracket && errors.tenantAgeBracket && (
                                      <Text style={styles.errorTxt}>{errors.tenantAgeBracket}</Text>
                                    )}
                                  </View>
                                </View>

                                <View style={styles.lineInput}>
                                  <Text style={styles.label}>Smoking Permitted:</Text>
                                  <Picker
                                    style={[styles.input, styles.singleLineInput]}
                                    selectedValue={values.tenantSmoking}
                                    onValueChange={handleChange('tenantSmoking')}
                                    onBlur={() => setFieldTouched('tenantSmoking')}
                                  >
                                    {yesNO.map((option, index) => (
                                      <Picker.Item key={index} label={option.label} value={option.value} />
                                    ))}
                                  </Picker>
                                  {touched.tenantSmoking && errors.tenantSmoking && (
                                    <Text style={styles.errorTxt}>{errors.tenantSmoking}</Text>
                                  )}
                                </View>

                                <View style={styles.sameLineContainer}>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Occupation:</Text>
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.tenantOccupation}
                                      onValueChange={handleChange('tenantOccupation')}
                                      onBlur={() => setFieldTouched('tenantOccupation')}
                                    >
                                      {occupationOptions.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.tenantOccupation && errors.tenantOccupation && (
                                      <Text style={styles.errorTxt}>{errors.tenantOccupation}</Text>
                                    )}
                                  </View>

                                  <View style={styles.lineInput}>

                                    {values.tenantOccupation === 'Working Professional' ? (
                                      <Text style={styles.label}>Working Hours:</Text>
                                    ) :
                                      (
                                        <Text style={styles.label}>Year Of Study:</Text>
                                      )}
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.occupationDropdownValue}
                                      onValueChange={handleChange('occupationDropdownValue')}
                                      onBlur={() => setFieldTouched('occupationDropdownValue')}
                                    >
                                      {values.tenantOccupation === 'Student'
                                        ? yearOfStudyOptions.map((option, index) => (
                                          <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))
                                        : workingHoursOptions.map((option, index) => (
                                          <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                    {touched.occupationDropdownValue && errors.occupationDropdownValue && (
                                      <Text style={styles.errorTxt}>{errors.occupationDropdownValue}</Text>
                                    )}
                                  </View>
                                </View>

                                {loading ? <View style={styles.activityContainer}><ActivityIndicator size="large" color="#0000ff" /></View>
                                  : <>
                                  </>}

                              </View>
                            )}
                            <Button
                              mode="contained"
                              color="#FF5733"
                              labelStyle={styles.buttonLabel}
                              disabled={!isValid || !dirty}
                              style={{ marginVertical: 20, padding: 2, backgroundColor: '#6750a4', borderRadius: 0}}
                              onPress={handleSubmit}>
                              <Text style={{color: 'white'}}>Save Changes</Text>
                            </Button>

                          </Card.Content>
                        </Card>
                      )}
                    </View>
                  )}
                </Formik>
              )}
            </>
            {/* Region Digs */}
            <>
              {/* Digs Form */}
              {showForm === 3 && (
                <Formik initialValues={{

                  addType: ad.addtype,
                  id: ad.addid,
                  digsPrice: ad.price,
                  digsHouseType: ad.propertytype,
                  bio: ad.description,
                  referenceRequired: ad.referencerequired,
                  deposit: ad.deposit,
                  digsDetailOption: ad.preferenceset.toString(),
                  numOccupants: ad.digscurrentoccupants,
                  digsMealIncluded: ad.digsmealsprovided,
                  digsDays: ad.digsdaysavailable,
                  digsGender: ad.gender,
                  digsAge: ad.agebracket,
                  digsOccupation: ad.occupation,
                  occupationDropdownValue: ad.occupationdetail,
                  digsSmoking: ad.smokingpermitted
                }}
                  validationSchema={DigsSchema}
                  onSubmit={values => saveChanges(values)}
                >
                  {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit, dirty }) => (
                    <View>
                      {selectedButton === 1 && (
                        <Card elevation={5} style={styles.card}>
                          <Card.Content>
                            <Title style={styles.title}>Digs</Title>
                            <Title style={styles.title2}>Property Detail:</Title>
                            <View style={styles.sameLineContainer}>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Num of Occupants:</Text>
                                <Picker
                                  style={styles.input}
                                  selectedValue={values.numOccupants}
                                  onValueChange={handleChange('numOccupants')}
                                  onBlur={() => setFieldTouched('numOccupants')}
                                >
                                  {number.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                  ))}
                                </Picker>
                                {touched.numOccupants && errors.numOccupants && (
                                  <Text style={styles.errorTxt}>{errors.numOccupants}</Text>
                                )}
                              </View>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Property Type:</Text>
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

                            <View>
                              <Text style={styles.label}>Price Per Month:</Text>
                              <Picker
                                style={[styles.input, styles.singleLineInput]}
                                selectedValue={values.digsPrice}
                                onValueChange={handleChange('digsPrice')}
                                onBlur={() => setFieldTouched('digsPrice')}
                              >
                                {priceRange.map((option, index) => (
                                  <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}
                              </Picker>
                              {touched.digsPrice && errors.digsPrice && (
                                <Text style={styles.errorTxt}>{errors.digsPrice}</Text>
                              )}
                            </View>

                            <View>
                              <Text style={styles.label}>Property Description:</Text>
                              <TextInput
                                style={styles.input}
                                multiline
                                numberOfLines={3}
                                placeholder="Type description here..."
                                onChangeText={handleChange('bio')}
                                value={values.bio}
                                onBlur={() => setFieldTouched('bio')}
                              />
                            </View>

                            <View style={styles.sameLineContainer}>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Meals Provided:</Text>
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
                                  <Text style={styles.errorTxt}>{errors.digsMealIncluded}</Text>
                                )}
                              </View>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Days Available:</Text>
                                <Picker
                                  style={styles.input}
                                  selectedValue={values.digsDays}
                                  onValueChange={handleChange('digsDays')}
                                  onBlur={() => setFieldTouched('digsDays')}
                                >
                                  {yesNO.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                  ))}
                                </Picker>
                                {touched.digsDays && errors.digsDays && (
                                  <Text style={styles.errorTxt}>{errors.digsDays}</Text>
                                )}
                              </View>
                            </View>

                            <View style={styles.sameLineContainer}>
                              <View style={styles.lineInput}>
                                <Text style={styles.label}>References Required:</Text>
                                <Picker
                                  style={styles.input}
                                  selectedValue={values.referenceRequired}
                                  onValueChange={handleChange('referenceRequired')}
                                  onBlur={() => setFieldTouched('referenceRequired')}
                                >
                                  {yesNO.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                  ))}
                                </Picker>
                                {touched.referenceRequired && errors.referenceRequired && (
                                  <Text style={styles.errorTxt}>{errors.referenceRequired}</Text>
                                )}
                              </View>

                              <View style={styles.lineInput}>
                                <Text style={styles.label}>Deposit:</Text>
                                <TextInput
                                  style={[styles.input, { marginTop: 21 }]}
                                  placeholder="Enter deposit detail"
                                  onChangeText={handleChange('deposit')}
                                  value={values.deposit}
                                  onBlur={() => setFieldTouched('deposit')}
                                />
                                {touched.deposit && errors.deposit && (
                                  <Text style={styles.errorTxt}>{errors.deposit}</Text>
                                )}
                              </View>
                            </View>
                            <Button
                              mode="contained"
                              color="#FF5733"
                              style={{ marginVertical: 20, padding: 2, backgroundColor: '#6750a4', borderRadius: 0}}
                              labelStyle={styles.buttonLabel}
                              disabled={!isValid || !dirty}
                              onPress={handleSubmit}>
                              <Text style={{color: 'white'}}>Save Changes</Text> 
                            </Button>

                          </Card.Content>
                        </Card>
                      )}
                      {selectedButton === 2 && (
                        <Card elevation={5} style={styles.card}>
                          <Card.Content>
                            <Title style={styles.title2}>Tenant Details:</Title>
                            <Text style={styles.label}>What Are You Looking For In A Tenant:</Text>
                            <RadioButton.Group onValueChange={(newValue) => setFieldValue('digsDetailOption', newValue)} value={values.digsDetailOption}>
                              <View style={styles.radioContainerStart}>
                              <RadioButton.Item label="Be Specific" value="1" labelStyle={{ color: '#1c1b1fde' }}/>
                                <RadioButton.Item label="Flexible" value="0" labelStyle={{ color: '#1c1b1fde' }}/>
                              </View>
                            </RadioButton.Group>

                            {values.digsDetailOption === "1" && (
                              <View>
                                <View style={styles.sameLineContainer}>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Gender:</Text>
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.digsGender}
                                      onValueChange={handleChange('digsGender')}
                                      onBlur={() => setFieldTouched('digsGender')}
                                    >
                                      {genderOptions.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.digsGender && errors.digsGender && (
                                      <Text style={styles.errorTxt}>{errors.digsGender}</Text>
                                    )}
                                  </View>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Age Bracket:</Text>
                                    <Picker //occupationDropdownValue
                                      style={styles.input}
                                      selectedValue={values.digsAge}
                                      onValueChange={handleChange('digsAge')}
                                      onBlur={() => setFieldTouched('digsAge')}
                                    >
                                      {number.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.digsAge && errors.digsAge && (
                                      <Text style={styles.errorTxt}>{errors.digsAge}</Text>
                                    )}
                                  </View>
                                </View>


                                <View style={styles.sameLineContainer}>
                                  <View style={styles.lineInput}>
                                    <Text style={styles.label}>Occupation:</Text>
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.digsOccupation}
                                      onValueChange={handleChange('digsOccupation')}
                                      onBlur={() => setFieldTouched('digsOccupation')}
                                    >
                                      {occupationOptions.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                      ))}
                                    </Picker>
                                    {touched.digsOccupation && errors.digsOccupation && (
                                      <Text style={styles.errorTxt}>{errors.digsOccupation}</Text>
                                    )}
                                  </View>

                                  <View style={styles.lineInput}>

                                    {values.digsOccupation === 'Working Professional' ? (
                                      <Text style={styles.label}>Working Hours:</Text>
                                    ) :
                                      (
                                        <Text style={styles.label}>Year Of Study:</Text>
                                      )}
                                    <Picker
                                      style={styles.input}
                                      selectedValue={values.occupationDropdownValue}
                                      onValueChange={handleChange('occupationDropdownValue')}
                                      onBlur={() => setFieldTouched('occupationDropdownValue')}
                                    >
                                      {values.digsOccupation === 'Student'
                                        ? yearOfStudyOptions.map((option, index) => (
                                          <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))
                                        : workingHoursOptions.map((option, index) => (
                                          <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                    {touched.occupationDropdownValue && errors.occupationDropdownValue && (
                                      <Text style={styles.errorTxt}>{errors.occupationDropdownValue}</Text>
                                    )}
                                  </View>
                                </View>
                                <View style={styles.lineInput}>
                                  <Text style={styles.label}>Smoking Permitted:</Text>
                                  <Picker
                                    style={[styles.input, styles.singleLineInput]}
                                    selectedValue={values.digsSmoking}
                                    onValueChange={handleChange('digsSmoking')}
                                    onBlur={() => setFieldTouched('digsSmoking')}
                                  >
                                    {yesNO.map((option, index) => (
                                      <Picker.Item key={index} label={option.label} value={option.value} />
                                    ))}
                                  </Picker>
                                  {touched.digsSmoking && errors.digsSmoking && (
                                    <Text style={styles.errorTxt}>{errors.digsSmoking}</Text>
                                  )}
                                </View>

                              </View>
                            )}
                            <Button
                              mode="contained"
                              color="#FF5733"
                              style={{ marginVertical: 20, padding: 2, backgroundColor: '#6750a4', borderRadius: 0}}
                              labelStyle={styles.buttonLabel}
                              disabled={!isValid || !dirty}
                              onPress={handleSubmit}>
                              <Text style={{color: 'white'}}>Save Changes</Text> 
                            </Button>
                          </Card.Content>
                        </Card>
                      )}

                    </View>
                  )}
                </Formik>
              )}
            </>
            {selectedButton === 3 && (
              <Card elevation={5} style={styles.card}>

                <Card.Content>
                  <Provider>
                    <View>

                      <Title style={styles.title}>Manage Images</Title>
                      {imageArray.length === 1 ? (
                        <>
                          <View>
                            <Image source={{ uri: currentImage.ImageURL }} style={styles2.largeImage} />
                            <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5 }}>
                              <IconButton
                                icon="dots-vertical"
                                size={30}
                                iconColor={MD3Colors.neutralVariant100}
                                onPress={openMenu}>
                              </IconButton>
                            </View>
                            {updating ? <View style={{ marginVertical: 10 }}><ActivityIndicator size="large" color="#6200EE" /></View>
                              : <>
                              </>}
                          </View>

                          <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            contentStyle={{ backgroundColor: 'white' }}
                            anchor={{ x: windowWidth - 60, y: 42 }} // Adjust the position as needed
                          >
                            <Menu.Item onPress={() => handleSetAsProfile()} title="Set as first Image" />
                            <Menu.Item onPress={() => handleDeleteImage()} title="Delete" />
                          </Menu>
                        </>
                      ) : imageArray.length > 1 ? (
                        <>
                          <View >
                            <Image source={{ uri: currentImage.ImageURL }} style={styles2.largeImage} />
                            <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5 }}>
                              <IconButton
                                icon="dots-vertical"
                                size={30}
                                iconColor={MD3Colors.neutralVariant100}
                                onPress={openMenu}>
                              </IconButton>
                            </View>
                            {updating ? <View style={{ marginVertical: 10 }}><ActivityIndicator size="large" color="#6200EE" /></View>
                              : <>
                              </>}
                            <Menu
                              visible={menuVisible}
                              onDismiss={closeMenu}
                              contentStyle={{ backgroundColor: 'white' }}
                              anchor={{ x: windowWidth - 60, y: 42 }} // Adjust the position as needed
                            >
                              <Menu.Item onPress={() => handleSetAsProfile()} title="Set as first Image" />
                              <Menu.Item onPress={() => handleDeleteImage()} title="Delete" />
                            </Menu>
                          </View>

                          <FlatList
                            data={imageArray.slice(1)}
                            renderItem={renderImageItem}
                            keyExtractor={(item) => item.AddImageID}
                            horizontal={false}
                            numColumns={3}
                          />
                        </>
                      ) : (
                        <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                      )}

                      <View style={{ marginTop: 20 }}>
                        <FlatList
                          data={selectedFiles}
                          keyExtractor={(item, index) => index.toString()}
                          horizontal={false}
                          numColumns={3} // Set the number of columns
                          contentContainerStyle={styles.listContainer}
                          renderItem={({ item }) => (
                            <View key={item.id}>
                              <Image source={item} style={{ width: 100, height: 100, margin: 5 }} />
                              <IconButton
                                icon="trash-can-outline"
                                size={30}
                                iconColor="red"
                                style={{ position: 'absolute', top: -5, right: -5 }}
                                onPress={() => removeImage(item.uri)}>
                              </IconButton>
                            </View>
                          )}
                        />
                      </View>
                      {uploading ? <View style={{ marginVertical: 10 }}><ActivityIndicator size="large" color="#6200EE" /></View>
                        : <>
                        </>}
                      <View style={{ marginVertical: 15 }}>

                        {selectedFiles.length === 0 ? (
                          <>
                            <TouchableOpacity
                              style={[styles2.button]}
                              onPress={() => pickImage()}
                            >
                              <Text style={[styles2.buttonText]}>Upload Images</Text>
                            </TouchableOpacity>
                          </>
                        ) : selectedFiles.length > 0 ? (

                          <>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                              <TouchableOpacity
                                style={[styles2.button, { marginRight: 5 }]}
                                onPress={() => pickImage()}
                              >
                                <Text style={[styles2.buttonText]}>Select Image </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[styles2.button, { marginLeft: 5 }]}
                                onPress={() => uploadFile()}
                              >
                                <Text style={[styles2.buttonText]}>Upload ({selectedFiles.length})</Text>
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : (
                          <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                        )}

                      </View>

                    </View>
                  </Provider>

                </Card.Content>

              </Card>
            )}
          </View>


        );
      case 'Tab2':
        return (
          <View style={styles.tabContent}>
            <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View>
                  <Title style={styles.title}>{returnAdTypeText(ad.addtype)}</Title>
                  <View style={styles.imageContainer}>
                    <Image
                      source={imageArray.length > 0 ? { uri: imageArray[0].ImageURL } : require('../assets/Icons/images/noCover.png')}
                      style={styles.image}
                    />
                    <View style={styles.addressContainer}>
                      <Text style={styles.addressText}>{ad.addressline1},</Text>
                      <Text style={styles.addressText}>{ad.addressline2},</Text>
                      <Text style={styles.addressText}>{ad.city},</Text>
                      <Text style={styles.addressText}>{ad.county},</Text>
                      <Text style={styles.addressText}>{ad.eircode}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Button mode="contained" style={{ flex: 1, marginHorizontal: 5, borderRadius: 0, backgroundColor: 'red' }} onPress={handleDeleteAd}>
                    <Text style={{color: 'white'}}> Delete Ad</Text>
                    </Button>
                    <Button mode="contained" style={{ flex: 1, marginHorizontal: 5, borderRadius: 0, backgroundColor: '#6750a4' }} onPress={handleChangeAdState}>
                      {ad.active === 1 ? (
                        <Text style={{color: 'white'}}>Make Ad Inactive</Text>
                      ) : (
                        <Text style={{color: 'white'}}>Activate Ad</Text>
                      )}
                    </Button>

                    <Snackbar
                      visible={visible}
                      onDismiss={hideDialog}
                      action={{
                        label: 'Confirm',
                        onPress: confirmAction,
                      }}
                    >
                      {snackbarMessage}
                    </Snackbar>

                  </View>
                </View>

              </Card.Content>
            </Card>
          </View>
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
                  <Text>Ad Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles2.tabButton,
                    selectedApplicationTab === 'Tab2' && styles2.selectedTab,
                  ]}
                  onPress={() => setSelectedApplicationTab('Tab2')}
                >
                  <Text>Ad State</Text>
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

export default ManageAd