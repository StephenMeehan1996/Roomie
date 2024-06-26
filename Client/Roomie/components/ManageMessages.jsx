//import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card, IconButton, MD3Colors, Chip, Avatar, Subheading } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { returnAdTypeText, references, smoking } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import { calculateReviewStats, digsMeals, returnSelectedProfileImage, returnSelectedCoverImage } from '../functions/CommonFunctions';
import styles from '../styles/common.style';
import formStyles from '../styles/formStyle.style';
import callLambdaFunction from '../functions/PostAPI';
import putAPI from '../functions/PutAPI';
import { useAppContext } from '../Providers/AppContext';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function ManageMessages({ navigation, route }) {
  const { signedInUserDetails } = useAppContext();
  const [uID, setUID] = useState(signedInUserDetails.useridentifier);

  const [selectedOption, setSelectedOption] = useState('');

  const [selectedMessage, setSelectedMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState('');
  const [selectedTab, setSelectedTab] = useState('Tab1');
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);

  //get
  //https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/presavedMessage

  const dropdownOptions = [
    { label: 'Intro Message 1', value: 'Hello! Im a passionate and dedicated student eager to embark on a journey of knowledge and discovery. My academic pursuits revolve around computer science and technology, with a keen interest in AI and software development.' },
    { label: 'Intro Message 2', value: 'placeholder' },
    { label: 'Intro Message 3', value: 'placeholder' },
  ];

  const handleDropdownSelect = (id) => {

    const mes = userMessages.find((item) => item.usepresavedmessageid === parseInt(id));
    console.log(mes.messagetitle);
    setSelectedOption(id);
    setSelectedMessage(mes);
    setMessageTitle(mes.messagetitle)
    setMessageBody(mes.messagebody)

  };

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const m = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomiePresavedMessages?uid=${uID}`);
        setUserMessages(m);
        console.log(m);
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uID, forceRefresh]);

  useEffect(() => {
    // Check if userMessages has items
    if (userMessages) {
    } else {
      setSelectedOption('');
      setMessageTitle(''); // Set to null or an empty string as needed
      setMessageBody('');
    }
  }, [userMessages]);

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    values.userID = signedInUserDetails._userid;
    values.userIdentifier = signedInUserDetails.useridentifier;
    console.log(values);

    let url = "https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/presavedMessage"
    setUploading(true);
    let res = await callLambdaFunction(values, url);
    setForceRefresh(prev => !prev); // triggers refresh after post
    resetForm();
    setIsLoading(false);
  }

  const handleDeleteMessage = async (id) => {
    //https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieDeletePresavedMessages
    setIsLoading(true);
    await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieDeletePresavedMessages?id=${selectedMessage.usepresavedmessageid}`);
    await setForceRefresh(prev => !prev); // triggers refresh after post


    //const selectedMessage = userMessages.find((message) => message.usepresavedmessageid === selectedOption);

    setSelectedMessage(userMessages);
    setSelectedOption(userMessages[0].usepresavedmessageid);
    setMessageTitle(userMessages[0].messagetitle);
    setMessageBody(userMessages[0].messagebody);

    setIsLoading(false);
  };

  const handleUpdateMessage = async () => {
    //https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/presavedMessage
    setIsLoading(true);
    selectedMessage.messagetitle = messageTitle;
    selectedMessage.messagebody = messageBody
    const m = await putAPI("https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/presavedMessage", selectedMessage);
    setForceRefresh(prev => !prev); // triggers refresh after post
    setIsLoading(false);
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
              <Formik initialValues={{
                title: '',
                body: '',

              }}
                validationSchema={MessageSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit }) => (
                  <View style={styles.tabContent}>
                    <Card elevation={5} style={styles.card}>
                      <Card.Content>
                        <View>
                          <Card style={styles.card}>
                            <Card.Content>
                              <Paragraph style={[styles.black, { marginVertical: 10 }]}>Create message to reuse when applying to advertisements</Paragraph>
                              <View >
                                <Text style={formStyles.label}>Message Title:</Text>
                                <TextInput
                                  style={formStyles.input}
                                  placeholder="Enter Message Title"
                                  onChangeText={handleChange('title')}
                                  value={values.title}
                                  onBlur={() => setFieldTouched('title')}
                                />
                                {touched.title && errors.title && (
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
                                {touched.body && errors.body && (
                                  <View >
                                    <Text style={formStyles.errorTxt}>{errors.body}</Text>
                                  </View>
                                )}
                              </View>

                              <Button
                                mode="contained"
                                color="#FF5733"
                                style={{ marginVertical: 20, padding: 2, borderRadius: 0, backgroundColor: '#6750a4' }}
                                labelStyle={styles.buttonLabel}
                                disabled={!isValid}
                                onPress={handleSubmit}>
                                <Text style={{ color: 'white' }}>Create Message</Text>
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
                      {userMessages.length > 0 ? (
                        <>
                          <Paragraph style={styles.black}>Select from saved messages:</Paragraph>
                          <Picker
                            style={styles.input}
                            selectedValue={selectedOption}
                            onValueChange={(itemValue, itemIndex) => handleDropdownSelect(itemValue)}
                          >
                            {userMessages.map((message, index) => (
                              <Picker.Item label={message.messagetitle} value={message.usepresavedmessageid} key={index} />
                            ))}

                          </Picker>

                          <View >
                            <Text style={formStyles.label}>Message Title:</Text>
                            <TextInput
                              style={formStyles.input}
                              placeholder="Enter Message Title"
                              value={messageTitle}
                              onChangeText={(text) => setMessageTitle(text)}
                            />
                          </View>
                          <TextInput
                            style={styles.input}
                            multiline
                            numberOfLines={5}
                            placeholder="Type your bio here..."
                            label="Message"
                            value={messageBody}
                            onChangeText={(text) => setMessageBody(text)}

                          />
                          


                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Button mode="contained" 
                                    style={{ flex: 1, marginHorizontal: 5, borderRadius: 0, backgroundColor: '#6750a4'}} 
                                    onPress={handleUpdateMessage}
                                    disabled={messageBody === selectedMessage.messagebody && messageTitle === selectedMessage.messagetitle}
                            >
                              <Text style={{ color: 'white' }}> Update</Text>
                            </Button>
                            <Button mode="contained" style={{ flex: 1, marginHorizontal: 5, borderRadius: 0, backgroundColor: 'red'  }} onPress={handleDeleteMessage}>
                              <Text style={{ color: 'white' }}>Delete</Text>
                            </Button>
                          </View>
                        </>
                      ) : (
                        <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                      )}
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