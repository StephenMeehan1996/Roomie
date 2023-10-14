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

const AddImage = ({navigation}) => {

  return (
          <View style={styles.container}>

            <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
                  <Title style={styles.title}>Add Images</Title>
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

              </Card.Content>
            </Card>
          </View>
  )
}

export default AddImage