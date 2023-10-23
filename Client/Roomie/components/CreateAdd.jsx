import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TextInput,Dimensions,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference, environmentOptions, houseMatExpectations ,irishCounties, number, houseType, priceRange, days, roomType } from '../data/formData';
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

      const nextPage = (values) => {
        console.log(values);
        navigation.navigate('AddImage', {  
           formData: values 
        });
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
        .required('Please select an option'),
        environment: Yup.string()
        .required('Please select an option')
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
        tenantGender : Yup.string()
        .required('Please select a gender'),
        tenantAgeBracket : Yup.string()
        .required('Please select an age bracket'), 
        tenantOccupation : Yup.string()
        .required('Please select a occupation'),
        occupationDropdownValue: Yup.string()
        .required('Please select a value'),
        tenantSmoking : Yup.string()
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
        .required('Please select an option'),
        digsMealIncluded: Yup.string()
        .required('Please select an option'),
        referenceRequired: Yup.string()
        .required('Please select an option'),
        deposit: Yup.string()
        .required('Please enter deposit detail'),
        bio : Yup.string(),
      
        digsDetailOption : Yup.string()
        .required('Please select an option'),
        digsGender : Yup.string()
        .required('Please select a gender'),
        digsAge : Yup.string()
        .required('Please select a age'),
        digsOccupation : Yup.string()
        .required('Please select a occupation'),
        occupationDropdownValue: Yup.string()
        .required('Please select an option'),
        digsSmoking : Yup.string()
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
                        <View style={styles.header}>
                            <Title style={styles.title}>Add Type:</Title>
                            <IconButton
                                icon="arrow-left"
                                mode="text"
                                size={30}
                                style={{flex:1,alignItems: 'flex-end'}}
                                onPress={() => navigation.goBack()}>
                            </IconButton>
                        </View>
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
                    addressLine1: 'Kilgarve, Keadue',
                    addressLine2: 'Boyle',
                    city: 'Roscommon',
                    county: 'Roscommon',
                    zip: 'F91 XY32',
                    numOccupants: '3',
                    houseShareHouseType : 'Apartment',
                    houseSharePrice : '600',
                    houseShareRoomType : 'Double',
                    houseShareEnsuite: '1',
                    bio : 'Test Test',
                    referenceRequired: '1',
                    deposit: '1 Month',
            
                    houseMateDetailOption : '1',
                    houseMateGender : 'Male',
                    houseMateAge : '2',
                    houseMateOccupation : 'Working Professional',
                    occupationDropdownValue: '9-5',
                    houseMateSmoking : '1',
                    houseMateExpect: 'Friendly',
                    environment: 'Social'
                }}
                 validationSchema={HouseShareSchema}
                 onSubmit={values => nextPage(values)}
                >
                {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (
                  <View>
                    <Card elevation={5} style={styles.card}>
                        <Card.Content>
                            <Title style={styles.title}>House Share</Title>
                            <Title style={styles.title2}>Address:</Title>
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
                         </Card.Content>
                     </Card>

                    <Card elevation={5} style={styles.card}>
                     <Card.Content>
                        <Title style={styles.title2}>Room Details:</Title>
                            
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
                                    {touched.houseShareRoomType && errors.houseShareRoomType &&(
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
                                    {touched.houseShareEnsuite && errors.houseShareEnsuite &&(
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
                                {touched.houseSharePrice && errors.houseSharePrice &&(
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

                    <Card elevation={5} style={styles.card}>
                        <Card.Content>
                        <Title style={styles.title2}>Roomie Details:</Title>
                        <Text style={styles.label}>What are you looking for in a Roomie:</Text>
                        <RadioButton.Group onValueChange={(newValue) => setFieldValue('houseMateDetailOption', newValue)} value={values.houseMateDetailOption}>
                            <View style={styles.radioContainerStart}>
                                <RadioButton.Item label="Be Specific" value="1" />
                                <RadioButton.Item label="Flexible" value= "0" />
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
                                        {touched.houseMateGender && errors.houseMateGender &&(
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
                                        {touched.houseMateAge && errors.houseMateAge &&(
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
                                    {touched.houseMateOccupation && errors.houseMateOccupation &&(
                                        <Text style={styles.errorTxt}>{errors.houseMateOccupation}</Text>
                                    )}
                                    </View>

                                    <View style={styles.lineInput}>
                                        
                                        {values.houseMateOccupation === 'Working Professional' ?(
                                        <Text style={styles.label}>Working Hours:</Text>
                                        ):
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
                                        {touched.occupationDropdownValue && errors.occupationDropdownValue &&(
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
                                    {touched.houseMateSmoking && errors.houseMateSmoking &&(
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
                                            {touched.houseMateExpect && errors.houseMateExpect&&(
                                            <Text style={styles.errorTxt}>{errors.houseMateExpect}</Text>
                                            )}
                                        </View>
                                        <View style={styles.lineInput}>
                                            <Text style={styles.label}>Environment:</Text>
                                            <Picker
                                            style={[styles.input, {marginTop: 21}]}
                                            selectedValue={values.environment}
                                            onValueChange={handleChange('environment')}
                                            onBlur={() => setFieldTouched('environment')} 
                                            >
                                            {environmentOptions.map((option, index) => (
                                                <Picker.Item key={index} label={option.label} value={option.value} />
                                            ))}
                                            </Picker>
                                            {touched.environment && errors.environment&&(
                                            <Text style={styles.errorTxt}>{errors.environment}</Text>
                                            )}
                                        </View>
                                    </View>

                               
                                <Button
                                    mode="contained" 
                                    color="#FF5733"
                                    style={{marginVertical: 20, padding: 2}} 
                                    labelStyle={styles.buttonLabel} 
                                    disabled={!isValid}
                                    onPress={handleSubmit}>
                                    Next Page
                                </Button>
                            </View>
                        )}

                        </Card.Content>
                    </Card>
                 </View>
                  )}
                </Formik>
                )}
            </>
            {/* Region House Rental */}
            <>
                {showForm === 2 && (
                    <Formik  initialValues={{
                        addType : '2',
                        addressLine1: 'Church Hill Road',
                        addressLine2: 'The Showgrounds',
                        city: 'Sligo',
                        county: 'Sligo',
                        zip: 'F91 XH11',

                        numRooms: '2',
                        houseRentalHouseType : 'Apartment',
                        houseRentalPrice : '1300',
                        bio : 'Test test',
                        referenceRequired: '1',
                        deposit: '2 months rent',

                        tenantDetailOption : '1',
                        tenantGender : 'Female',
                        tenantAgeBracket: '3',
                        tenantOccupation : 'Student',
                        occupationDropdownValue: '1st',
                        tenantSmoking : '1'
                        
                    }}
                     validationSchema={HouseRentalSchema}
                     onSubmit={values => nextPage(values)}
                    >
                    {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (
                <View>
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
                        </Card.Content>
                     </Card>
               

                    <Card elevation={5} style={styles.card}>
                    <Card.Content>
                            <Title style={styles.title}>Property Detail:</Title>
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
                                    selectedValue={values.houseRentalPrice}
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

                    <Card elevation={5} style={styles.card}>
                        <Card.Content>
                        <Title style={styles.title}>Tenant Details:</Title>
                        <Text style={styles.label}>What Are You Looking For In a Tenant:</Text>
                        <RadioButton.Group onValueChange={(newValue) => setFieldValue('tenantDetailOption', newValue)} value={values.tenantDetailOption}>
                            <View style={styles.radioContainerStart}>
                                <RadioButton.Item label="Be Specific" value="1" />
                                <RadioButton.Item label="Flexible" value= "0" />
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
                                        {touched.tenantGender && errors.tenantGender &&(
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
                                        {touched.tenantAgeBracket && errors.tenantAgeBracket &&(
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
                                    {touched.tenantSmoking && errors.tenantSmoking &&(
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
                                    {touched.tenantOccupation && errors.tenantOccupation &&(
                                        <Text style={styles.errorTxt}>{errors.tenantOccupation}</Text>
                                    )}
                                    </View>

                                    <View style={styles.lineInput}>
                                        
                                        {values.tenantOccupation === 'Working Professional' ?(
                                        <Text style={styles.label}>Working Hours:</Text>
                                        ):
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
                                        {touched.occupationDropdownValue && errors.occupationDropdownValue &&(
                                         <Text style={styles.errorTxt}>{errors.occupationDropdownValue}</Text>
                                        )}
                                    </View>
                                 </View>
                              
                                <Button
                                    mode="contained" 
                                    color="#FF5733"
                                    style={{marginVertical: 20, padding: 2}} 
                                    labelStyle={styles.buttonLabel} 
                                    disabled={!isValid}
                                    onPress={handleSubmit}>
                                    Next Page
                                </Button>
                            </View>
                        )}

                        </Card.Content>
                    </Card>
                </View>
                 )}
                 </Formik>
                 )}
            </>
             {/* Region Digs */}
            <>
                {/* Digs Form */}
                {showForm === 3 && (
                    <Formik  initialValues={{
                        addType : '3',
                        addressLine1: '84 Wellpark Grove',
                        addressLine2: 'Galway',
                        city: 'Galway City',
                        county: 'Galway',
                        zip: 'F99 HXV3',
                        numOccupants: '4',
                        digsHouseType : 'Apartment',
                        digsPrice : '500',
                        bio : 'Test Test',
                        digsDays: 'Mon-Friday',
                        digsMealIncluded: '1',
                        referenceRequired: '1',
                        deposit: '3 Months',
                        
                      
                        digsDetailOption : '1',
                        digsGender : 'Male',
                        digsAge : '3',
                        digsOccupation : 'Student',
                        occupationDropdownValue: 'PHD',
                        digsSmoking : '1'
                    }}
                     validationSchema={DigsSchema}
                     onSubmit={values => nextPage(values)}
                    >
                    {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (
                 <View>    
                   <Card elevation={5} style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Digs</Title>
                        <Title style={styles.title2}>Property Address:</Title>
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
                         </Card.Content>
                       </Card>

                        <Card elevation={5} style={styles.card}>
                          <Card.Content>
                            
                            <Title style={styles.title2}>Room Details:</Title>
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

                  <Card elevation={5} style={styles.card}>
                        <Card.Content>
                        <Title style={styles.title2}>Tenant Details:</Title>
                        <Text style={styles.label}>What Are You Looking For In A Tenant:</Text>
                        <RadioButton.Group onValueChange={(newValue) => setFieldValue('digsDetailOption', newValue)} value={values.digsDetailOption}>
                            <View style={styles.radioContainerStart}>
                                <RadioButton.Item label="Be Specific" value="1" />
                                <RadioButton.Item label="Flexible" value= "0" />
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
                                        {touched.digsGender && errors.digsGender &&(
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
                                        {touched.digsAge && errors.digsAge &&(
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
                                    {touched.digsOccupation && errors.digsOccupation &&(
                                        <Text style={styles.errorTxt}>{errors.digsOccupation}</Text>
                                    )}
                                    </View>

                                    <View style={styles.lineInput}>
                                        
                                        {values.digsOccupation === 'Working Professional' ?(
                                        <Text style={styles.label}>Working Hours:</Text>
                                        ):
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
                                        {touched.occupationDropdownValue && errors.occupationDropdownValue &&(
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
                                    {touched.digsSmoking && errors.digsSmoking &&(
                                        <Text style={styles.errorTxt}>{errors.digsSmoking}</Text>
                                    )}
                                 </View>
                                <Button
                                    mode="contained" 
                                    color="#FF5733"
                                    style={{marginVertical: 20, padding: 2}} 
                                    labelStyle={styles.buttonLabel} 
                                    disabled={!isValid}
                                    onPress={handleSubmit}>
                                    Next Page
                                </Button>
                            </View>
                        )}
                        </Card.Content>
                    </Card>
                </View>   
                 )}
                 </Formik>
                 )}
            </>
            </View>
        
    </ScrollView>
  )
}

export default CreateAdd