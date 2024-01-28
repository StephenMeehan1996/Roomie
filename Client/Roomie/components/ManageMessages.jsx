//import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions,TextInput,ActivityIndicator } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card,IconButton, MD3Colors, Chip, Avatar, Subheading  } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { returnAdTypeText, references, smoking } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import { calculateReviewStats, digsMeals, returnSelectedProfileImage,returnSelectedCoverImage } from '../functions/CommonFunctions';
import  styles  from '../styles/common.style';
import  formStyles  from '../styles/formStyle.style';
import callLambdaFunction from '../functions/PostAPI';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function ManageMessages({navigation, route}) {
    const [selectedOption, setSelectedOption] = useState('');

    const [messageTitle, setMessageTitle] = useState('');
    const [messageBody, setMessageBody] = useState('test');

    const [message, setMessage] = useState('');
    const [selectedTab, setSelectedTab] = useState('Tab1');
    const [uploading, setUploading] = useState(false);



    const dropdownOptions = [
        {label:'Intro Message 1', value:'Hello! Im a passionate and dedicated student eager to embark on a journey of knowledge and discovery. My academic pursuits revolve around computer science and technology, with a keen interest in AI and software development.'},
        {label:'Intro Message 2', value:'placeholder'},
        {label:'Intro Message 3', value:'placeholder'},
      ];

 const handleDropdownSelect = (value) => {

    alert(value);
    setSelectedOption(value);
    setMessageTitle(value)
    setMessageBody(value)
   
    };

 const postMessage = async (values) =>{
    console.log(values);

    let url = "https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/presavedMessage"
    setUploading(true);
    
    let res = await callLambdaFunction(values, url); // working 
} 

const handleDeleteMessage = async () => {

};

const handleUpdateMessage = async () => {

};

const MessageSchema = Yup.object().shape({

    title: Yup.string()
    .required('Please enter a title'),
    body: Yup.string()
    .required('Please enter a message value'),
   
  });

  const ManageMessageSchema = Yup.object().shape({

    updateTitle: Yup.string()
    .required('Please enter a title'),
    updateBody: Yup.string()
    .required('Please enter a message value'),
   
  });

const renderTabContent = () => {
    switch (selectedTab) {
      case 'Tab1':
        return (
               <>
               {(
               <Formik  initialValues={{
                   title: '',
                   body: '',
               }}
                validationSchema={MessageSchema}
                onSubmit={values => postMessage(values)}
               >
               {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (
        <View style={styles.tabContent}>
          <Card elevation={5} style={styles.card}>
            <Card.Content>
             <View>  
              <Card style={styles.card}>
                <Card.Content>
                 <Paragraph style={{marginVertical: 10}}>Create message to reuse when applying to advertisements</Paragraph>
                    <View >
                        <Text style={formStyles.label}>Message Title:</Text>
                        <TextInput
                            style={formStyles.input}
                            placeholder="Enter Message Title"
                            onChangeText={handleChange('title')}
                            value={values.title}
                            onBlur={() => setFieldTouched('title')} 
                         />
                           {touched.title && errors.title &&(
                                <View >
                                    <Text style={formStyles.errorTxt}>{errors.title}</Text>
                                </View>
                            )}
                    </View>
                     <View>
                        <Text formStyles={styles.label}>Message Text:</Text>
                        <TextInput
                           style={formStyles.input}
                           multiline
                           numberOfLines={3}   
                           placeholder="Type description here..."
                           onChangeText={handleChange('body')}
                           value={values.body}
                           onBlur={() => setFieldTouched('body')} 
                        />
                          {touched.body && errors.body &&(
                            <View >
                               <Text style={formStyles.errorTxt}>{errors.body}</Text>
                            </View>
                           )}
                        </View>

                  <Button
                    mode="contained" 
                    color="#FF5733"
                    style={{marginVertical: 20, padding: 2}} 
                    labelStyle={styles.buttonLabel} 
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    Create Message
                 </Button>
                </Card.Content>
              </Card>
            </View>
           </Card.Content>
         </Card>
       </View>
          )}
          </Formik>
          )}
      </>
        );
     
      case 'Tab2':
        return (
        
         <View style={styles.tabContent}>
          <Card elevation={5} style={styles.card}>
            <Card.Content>
             <View>  
              <Card style={styles.card}>
                <Card.Content>
                 <Paragraph>Select from saved messages:</Paragraph>
                 <Picker
                  style={styles.input}
                  selectedValue={selectedOption}
                  onValueChange={(itemValue, itemIndex) => handleDropdownSelect(itemValue)}
                 >
                  {dropdownOptions.map((option, index) => (
                    <Picker.Item label={option.label} value={option.value} key={index} />
                  ))}

                </Picker>
                <View >
                   <Text style={formStyles.label}>Message Title:</Text>
                    <TextInput
                        style={formStyles.input}
                        placeholder="Enter Message Title"
                    />   
                </View>
                   <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={5}   
                    placeholder="Type your bio here..."
                    label="Message"
                    value={messageBody}
                  />
                 <View style={styles.buttonContainer2}>
  <Button
      mode="contained"
      onPress={handleUpdateMessage}
      style={ { marginRight: 10, borderRadius: 0 }} // Adjust margin as needed
  >
      Update Message
  </Button>
  <Button
      mode="contained"
      onPress={handleDeleteMessage}
      style={[styles.button, { backgroundColor: 'red', borderRadius: 0  }]}
  >
      Delete Message
  </Button>
</View>
                </Card.Content>
              </Card>
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
    <View style={styles.tabContent}>
    <View >
      <View style={styles.tabButtons}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Tab1' && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab('Tab1')}
        >
                <Text>Create Message</Text>
              
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Tab2' && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab('Tab2')}
        >
          <Text>Manage Messages</Text>
        
        </TouchableOpacity>
      
      </View>

      {renderTabContent()}
    </View>
 </View>
  )
}