import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference,irishCounties, number, houseType, priceRange, days } from '../data/formData';
import  styles  from '../styles/formStyle.style';

const CreateAdd = ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false, 
        });
      }, [navigation]);

      const _renderItem = item => {
        return (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
            <Image style={styles.icon} source={require('../assets/Icons/twitter.png')} />
        </View>
        );
      };

      const HouseShareSchema = Yup.object().shape({
        addType : Yup.string(),
        addressLine1: Yup.string()
        .required('Please enter the first line of the address'),
        addressLine2: Yup.string()
        .required('Please enter the second line of the address'),
        city: Yup.string()
        .required('Please enter the city for the address'),
        county: Yup.string()
        .required('Please enter the county for the address'),
        zip: Yup.string(),
        numOccupants: Yup.string()
        .required('Please select the current number of occupants'),
        houseShareHouseType : Yup.string()
        .required('Please select a property type'),
        houseSharePrice : Yup.string()
        .required('Please select a price'),
        houseShareRoomType : Yup.string()
        .required('Please select a room type'),
        houseShareHouseType : Yup.string()
        .required('Please select a house type'),
        houseShareEnsuite: Yup.string()
        .required('Please select a value'),
        bio : Yup.string(),
        referenceRequired: Yup.string()
        .required('Please select an option'),
        deposit: Yup.string()
        .required('Please enter deposit detail'),

        houseMateDetailOption : Yup.string()
        .required('Please select a option'),
        houseMateGender : Yup.string()
        .required('Please select a gender'),
        houseMateAge : Yup.string()
        .required('Please select a age'),
        houseMateOccupation : Yup.string()
        .required('Please select an occupation'),
        occupationDropdownValue: Yup.string()
       .required('Please select a value'),
        houseMateSmoking : Yup.string()
        .required('Please select an option'),
        houseMateExpect: Yup.string()
        .required('Please select a value'),
        environment: Yup.string()
        .required('Please select a value')
      });

      const HouseRentalSchema = Yup.object().shape({
        addType : Yup.string(),
        addressLine1: Yup.string()
        .required('Please enter the first line of the address'),
        addressLine2: Yup.string()
        .required('Please enter the second line of the address'),
        city: Yup.string()
        .required('Please enter the city for the address'),
        county: Yup.string()
        .required('Please enter the county for the address'),
        zip: Yup.string(),
        numRooms: Yup.string()
        .required('Please enter the city for the address'),
        houseRentalHouseType : Yup.string()
        .required('Please select a house type'),
        houseRentalPrice : Yup.string()
        .required('Please select a price'),
        bio : Yup.string(),

        tenantDetailOption : Yup.string()
        .required('Please select an option'),
        tenantMateGender : Yup.string()
        .required('Please select a gender'),
        tenantMateOccupation : Yup.string()
        .required('Please select a occupation'),
        houseMateSmoking : Yup.string()
        .required('Please select an option'),
        referenceRequired: Yup.string()
        .required('Please select an option'),
        deposit: Yup.string()
        .required('Please deposit details')
      });

      const DigsSchema = Yup.object().shape({
        addType : Yup.string(),
        addressLine1: Yup.string()
        .required('Please enter the first line of the address'),
        addressLine2: Yup.string()
        .required('Please enter the second line of the address'),
        city: Yup.string()
        .required('Please enter the city for the address'),
        county: Yup.string()
        .required('Please enter the county for the address'),
        zip: Yup.string(),
        numOccupants: Yup.string()
        .required('Please enter the city for the address'),
        digsHouseType : Yup.string()
        .required('Please select a house type'),
        digsPrice : Yup.string()
        .required('Please select a price'),
        digsDays: Yup.string()
        .required('Please select a value'),
        digsMealIncluded: Yup.string()
        .required('Please select a value'),
        referenceRequired: Yup.string()
        .required('Please select an option'),
        deposit: Yup.string()
        .required('Please select a value'),
        bio : Yup.string(),
      
        digsDetailOption : Yup.string()
        .required('Please select an option'),
        digsGender : Yup.string()
        .required('Please select a gender'),
        digsAge : Yup.string()
        .required('Please select a age'),
        tenantMateOccupation : Yup.string()
        .required('Please select a occupation'),
        houseMateSmoking : Yup.string()
        .required('Please select an option')
      
      });

      const [selectedButton, setSelectedButton] = useState(null);
      const [showForm, setShowForm] = useState(null);
      const isButtonSelected = (buttonId) => selectedButton === buttonId;

      const handleButtonPress = (buttonId) => {
        setSelectedButton(buttonId);
        setShowForm(buttonId);
      };
    
     

    
      
  return (
    <ScrollView>
               
            <View style={styles.container}>
             {/* Region Buttons */}
             {/*  Are you sure you want to change add type current process will be deleted */}
            <>
                <Card elevation={5} style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Add Type:</Title>
                        <View style={styles.btnContainer}>
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
            </>
            
             {/* Region House Share */}
            <>
                {showForm === 1 && (
                <Formik  initialValues={{
                    addType : '1',
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    county: '',
                    numOccupants: '',
                    houseShareHouseType : '',
                    houseSharePrice : '',
                    houseShareRoomType : '',
                    houseShareHouseType : '',
                    houseShareEnsuite: '',
                    bio : '',
                    referenceRequired: '',
                    deposit: '',
            
                    houseMateDetailOption : '',
                    houseMateGender : '',
                    houseMateAge : '',
                    houseMateOccupation : '',
                    occupationDropdownValue: '',
                    houseMateSmoking : '',
                    houseMateExpect: '',
                    environment: ''
                }}
                 validationSchema={HouseShareSchema}
                 onSubmit={values => signUp(values)}
                >
                {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (
                  
                    <Card elevation={5} style={styles.card}>
                        <Card.Content>
                            <Title style={styles.title}>House Share:</Title>
                            <View >
                                <Text style={styles.label}>Address Line 1:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter address line 1"
                                    onChangeText={handleChange('addressLine1')}
                                    value={values.addressLine1}
                                    onBlur={() => setFieldTouched('addressLine1')} 
                                    
                                    />
                                    {touched.addressLine1 && errors.addressLine1 &&(
                                    <View >
                                    <Text style={styles.errorTxt}>{errors.addressLine1}</Text>
                                    </View>
                                    )}
                             </View>

                            <View >
                                <Text style={styles.label}>Address Line 2:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter address line 2"
                                    onChangeText={handleChange('addressLine2')}
                                    value={values.addressLine2}
                                    onBlur={() => setFieldTouched('addressLine2')} 
                                    />
                                    {touched.addressLine2 && errors.addressLine2 &&(
                                    <View>
                                        <Text style={styles.errorTxt}>{errors.addressLine2}</Text>
                                    </View>
                                    )}
                            </View>

                            <View style={styles.sameLineContainer}>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>City:</Text>
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Enter city"
                                    onChangeText={handleChange('city')}
                                    value={values.city}
                                    onBlur={() => setFieldTouched('city')} 
                                    />
                                    {touched.city && errors.city &&(
                                    <View>
                                        <Text style={styles.errorTxt}>{errors.city}</Text>
                                    </View>
                                    )}
                                </View>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>County:</Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        data={irishCounties}
                                        labelField="label"
                                        valueField="value"
                                        search
                                        searchPlaceholder="Search"
                                        disableSelect
                                        value={values.county}
                                        onBlur={() => setFieldTouched('county')}
                                        onChange={item => {
                                            setFieldValue('county', item.value);
                                            console.log('selected', item);
                                        }}
                                        renderItem={item => _renderItem(item)}
                                    />
                                    {touched.county && errors.county &&(
                                        <Text style={[styles.errorTxt, {marginTop: 18, marginBottom: 0}]}>{errors.county}</Text>
                                    )}
                               </View>
                            </View>

                            <View style={styles.lineInput}>
                                <Text style={styles.label}>Eircode</Text>
                                <TextInput
                                    style={[styles.input, styles.singleLineInput]}
                                    placeholder="Enter eircode"
                                    onChangeText={handleChange('zip')}
                                    value={values.zip}
                                    onBlur={() => setFieldTouched('zip')} 
                                    />
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
                                    {touched.numOccupants && errors.numOccupants &&(
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
                                    {touched.houseShareHouseType && errors.houseShareHouseType &&(
                                        <Text style={styles.errorTxt}>{errors.houseShareHouseType}</Text>
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
                                {touched.houseSharePrice && errors.houseSharePrice &&(
                                    <Text style={styles.errorTxt}>{errors.houseSharePrice}</Text>
                                )}
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
                                        selectedValue={values.numOccupants}
                                        onValueChange={handleChange('referenceRequired')}
                                        onBlur={() => setFieldTouched('referenceRequired')}
                                        >
                                            {yesNO.map((option, index) => (
                                            <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                    {touched.referenceRequired && errors.referenceRequired &&(
                                        <Text style={styles.errorTxt}>{errors.referenceRequired}</Text>
                                    )}
                                </View>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>Deposit:</Text>
                                    <TextInput
                                        style={[styles.input, {marginTop: 21}]}
                                        placeholder="Enter deposit detail"
                                        onChangeText={handleChange('deposit')}
                                        value={values.deposit}
                                        onBlur={() => setFieldTouched('deposit')} 
                                    />
                                    {touched.deposit && errors.deposit &&(
                                        <Text style={styles.errorTxt}>{errors.deposit}</Text>
                                    )}
                                </View>
                            </View>
                        
                        </Card.Content>
                    </Card>
                  
                  )}
                </Formik>
                )}
            </>
            {/* Region House Rental */}
            <>
                {showForm === 2 && (
                    <Formik  initialValues={{
                        addType : '2',
                        addressLine1: '',
                        addressLine2: '',
                        city: '',
                        county: '',
                        zip: '',
                        numRooms: '',
                        houseRentalHouseType : '',
                        houseRentalPrice : '',
                        bio : '',
                        referenceRequired: '',
                        deposit: '',

                        tenantDetailOption : '',
                        tenantMateGender : '',
                        tenantMateOccupation : '',
                        houseMateSmoking : ''
                        
                    }}
                     validationSchema={HouseRentalSchema}
                     onSubmit={values => signUp(values)}
                    >
                    {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (
                <Card elevation={5} style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>House Rental:</Title>
                        <View >
                                <Text style={styles.label}>Address Line 1:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter address line 1"
                                    onChangeText={handleChange('addressLine1')}
                                    value={values.addressLine1}
                                    onBlur={() => setFieldTouched('addressLine1')} 
                                    
                                    />
                                    {touched.addressLine1 && errors.addressLine1 &&(
                                    <View >
                                    <Text style={styles.errorTxt}>{errors.addressLine1}</Text>
                                    </View>
                                    )}
                             </View>

                            <View >
                                <Text style={styles.label}>Address Line 2:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter address line 2"
                                    onChangeText={handleChange('addressLine2')}
                                    value={values.addressLine2}
                                    onBlur={() => setFieldTouched('addressLine2')} 
                                    />
                                    {touched.addressLine2 && errors.addressLine2 &&(
                                    <View>
                                        <Text style={styles.errorTxt}>{errors.addressLine2}</Text>
                                    </View>
                                    )}
                            </View>

                            <View style={styles.sameLineContainer}>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>City:</Text>
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Enter city"
                                    onChangeText={handleChange('city')}
                                    value={values.city}
                                    onBlur={() => setFieldTouched('city')} 
                                    />
                                    {touched.city && errors.city &&(
                                    <View>
                                        <Text style={styles.errorTxt}>{errors.city}</Text>
                                    </View>
                                    )}
                                </View>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>County:</Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        data={irishCounties}
                                        labelField="label"
                                        valueField="value"
                                        search
                                        searchPlaceholder="Search"
                                        disableSelect
                                        value={values.county}
                                        onBlur={() => setFieldTouched('county')}
                                        onChange={item => {
                                            setFieldValue('county', item.value);
                                            console.log('selected', item);
                                        }}
                                        renderItem={item => _renderItem(item)}
                                    />
                                    {touched.county && errors.county &&(
                                        <Text style={[styles.errorTxt, {marginTop: 18, marginBottom: 0}]}>{errors.county}</Text>
                                    )}
                               </View>
                            </View>

                            <View style={styles.lineInput}>
                                <Text style={styles.label}>Eircode</Text>
                                <TextInput
                                    style={[styles.input, styles.singleLineInput]}
                                    placeholder="Enter eircode"
                                    onChangeText={handleChange('zip')}
                                    value={values.zip}
                                    onBlur={() => setFieldTouched('zip')} 
                                    />
                            </View>

                            <View style={styles.sameLineContainer}>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>Num of Bedrooms:</Text>
                                    <Picker
                                        style={styles.input}
                                        selectedValue={values.numOccupants}
                                        onValueChange={handleChange('numRooms')}
                                        onBlur={() => setFieldTouched('numRooms')}
                                        >
                                            {number.map((option, index) => (
                                            <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                    {touched.numRooms && errors.numRooms &&(
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
                                    {touched.houseRentalHouseType && errors.houseRentalHouseType &&(
                                        <Text style={styles.errorTxt}>{errors.houseRentalHouseType}</Text>
                                    )}
                                </View>
                            </View>

                            <View>
                                <Text style={styles.label}>Price Per Month:</Text>
                                <Picker
                                    style={[styles.input, styles.singleLineInput]}
                                    selectedValue={values.houseSharePrice}
                                    onValueChange={handleChange('houseRentalPrice')}
                                    onBlur={() => setFieldTouched('houseRentalPrice')}
                                >
                                    {priceRange.map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} />
                                    ))}
                                </Picker>
                                {touched.houseRentalPrice && errors.houseRentalPrice &&(
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
                                        selectedValue={values.numOccupants}
                                        onValueChange={handleChange('referenceRequired')}
                                        onBlur={() => setFieldTouched('referenceRequired')}
                                        >
                                            {yesNO.map((option, index) => (
                                            <Picker.Item key={index} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                    {touched.referenceRequired && errors.referenceRequired &&(
                                        <Text style={styles.errorTxt}>{errors.referenceRequired}</Text>
                                    )}
                                </View>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>Deposit:</Text>
                                    <TextInput
                                        style={[styles.input, {marginTop: 21}]}
                                        placeholder="Enter deposit detail"
                                        onChangeText={handleChange('deposit')}
                                        value={values.deposit}
                                        onBlur={() => setFieldTouched('deposit')} 
                                    />
                                    {touched.deposit && errors.deposit &&(
                                        <Text style={styles.errorTxt}>{errors.deposit}</Text>
                                    )}
                                </View>
                            </View>
                     
                    </Card.Content>
                </Card>
                 )}
                 </Formik>
                 )}
            </>
             {/* Region Digs */}
            <>
                {/* Digs Form */}
                {showForm === 3 && (
                    <Formik  initialValues={{
                        addType : '',
                        addressLine1: '',
                        addressLine2: '',
                        city: '',
                        county: '',
                        zip: '',
                        numOccupants: '',
                        digsHouseType : '',
                        digsPrice : '',
                        bio : '',
                        digsDays: '',
                        digsMealIncluded: '',
                        referenceRequired: '',
                        deposit: '',
                        
                      
                        digsDetailOption : '',
                        digsGender : '',
                        digsAge : '',
                        tenantMateOccupation : '',
                        houseMateSmoking : ''
                    }}
                     validationSchema={DigsSchema}
                     onSubmit={values => signUp(values)}
                    >
                    {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (
                <Card elevation={5} style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Digs:</Title>
                         <View >
                                <Text style={styles.label}>Address Line 1:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter address line 1"
                                    onChangeText={handleChange('addressLine1')}
                                    value={values.addressLine1}
                                    onBlur={() => setFieldTouched('addressLine1')} 
                                    
                                    />
                                    {touched.addressLine1 && errors.addressLine1 &&(
                                    <View >
                                    <Text style={styles.errorTxt}>{errors.addressLine1}</Text>
                                    </View>
                                    )}
                             </View>

                            <View >
                                <Text style={styles.label}>Address Line 2:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter address line 2"
                                    onChangeText={handleChange('addressLine2')}
                                    value={values.addressLine2}
                                    onBlur={() => setFieldTouched('addressLine2')} 
                                    />
                                    {touched.addressLine2 && errors.addressLine2 &&(
                                    <View>
                                        <Text style={styles.errorTxt}>{errors.addressLine2}</Text>
                                    </View>
                                    )}
                            </View>

                            <View style={styles.sameLineContainer}>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>City:</Text>
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Enter city"
                                    onChangeText={handleChange('city')}
                                    value={values.city}
                                    onBlur={() => setFieldTouched('city')} 
                                    />
                                    {touched.city && errors.city &&(
                                    <View>
                                        <Text style={styles.errorTxt}>{errors.city}</Text>
                                    </View>
                                    )}
                                </View>
                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>County:</Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        data={irishCounties}
                                        labelField="label"
                                        valueField="value"
                                        search
                                        searchPlaceholder="Search"
                                        disableSelect
                                        value={values.county}
                                        onBlur={() => setFieldTouched('county')}
                                        onChange={item => {
                                            setFieldValue('county', item.value);
                                            console.log('selected', item);
                                        }}
                                        renderItem={item => _renderItem(item)}
                                    />
                                    {touched.county && errors.county &&(
                                        <Text style={[styles.errorTxt, {marginTop: 18, marginBottom: 0}]}>{errors.county}</Text>
                                    )}
                               </View>
                            </View>

                            <View style={styles.lineInput}>
                                <Text style={styles.label}>Eircode</Text>
                                <TextInput
                                    style={[styles.input, styles.singleLineInput]}
                                    placeholder="Enter eircode"
                                    onChangeText={handleChange('zip')}
                                    value={values.zip}
                                    onBlur={() => setFieldTouched('zip')} 
                                    />
                            </View>

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
                                    {touched.numOccupants && errors.numOccupants &&(
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
                                    {touched.digsHouseType && errors.digsHouseType &&(
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
                                {touched.digsPrice && errors.digsPrice &&(
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
                                    {touched.digsMealIncluded && errors.digsMealIncluded &&(
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
                                    {touched.digsDays && errors.digsDays &&(
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
                                    {touched.referenceRequired && errors.referenceRequired &&(
                                        <Text style={styles.errorTxt}>{errors.referenceRequired}</Text>
                                    )}
                                </View>

                                <View style={styles.lineInput}>
                                    <Text style={styles.label}>Deposit:</Text>
                                    <TextInput
                                        style={[styles.input, {marginTop: 21}]}
                                        placeholder="Enter deposit detail"
                                        onChangeText={handleChange('deposit')}
                                        value={values.deposit}
                                        onBlur={() => setFieldTouched('deposit')} 
                                    />
                                    {touched.deposit && errors.deposit &&(
                                        <Text style={styles.errorTxt}>{errors.deposit}</Text>
                                    )}
                                </View>
                            </View>
                     
                    </Card.Content>
                </Card>
                 )}
                 </Formik>
                 )}
            </>
            </View>
        
    </ScrollView>
  )
}

export default CreateAdd