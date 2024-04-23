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
import { calculateReviewStats, digsMeals, returnSelectedProfileImage, returnSelectedCoverImage, generateUUID, writeNotification, handleChat } from '../functions/CommonFunctions';
import styles from '../styles/common.style';
import callLambdaFunction from '../functions/PostAPI';
import formStyles from '../styles/formStyle.style';
import ManageAd from './ManageAd';
import AdApplications from './AdApplications';
import { useAppContext } from '../Providers/AppContext';


const AddDetail = ({ navigation, route }) => {

  const { signedInUserDetails, profileImage } = useAppContext();
  const [uID, setUID] = useState(signedInUserDetails.useridentifier);

  const { ad, images, userImages, userDetails } = route?.params; // from search results

 
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('Tab1');
  const [selectedApplicationTab, setSelectedApplicationTab] = useState('Tab1');
  const [selectedOption, setSelectedOption] = useState('');
  const [messages, setMessages] = useState('');
  const [adPosterDetail, setAdPosterDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posterImages, setPosterImages] = useState(null);
  const [posterDetail, setPosterDetail] = useState(null);

  const [chats, setChats] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [applications, setApplications] = useState([]);


  const [posterProfileImage, setPosterProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);




  const [selectedMessage, setSelectedMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');



  const handleDropdownSelect = (id) => {
    const mes = messages.find((item) => item.usepresavedmessageid === parseInt(id));
    console.log(mes.messagetitle);
    setSelectedOption(id);
    setSelectedMessage(mes);
    setMessageTitle(mes.messagetitle)
    setMessageBody(mes.messagebody)
  };


  const navChat = async () => {
    let c;
 
    handleChat(chats, navigation, uID, ad.useridentifier); // navigate using common function 

    
  }

  const handleSendMessage = () => {
    // Handle sending the message here
    // You can use the 'selectedOption' and 'message' state values
  };

  useEffect(() => {

    setIsLoading(true)

    const fetchData = async () => {
      try {

        const getChats = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieChat?uid=${uID}`); //needed for both
        console.log(getChats)
        setChats(getChats);

        if (ad.useridentifier !== uID) {

          const getUserDetails = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUserDetailsForAd?uid=${ad.useridentifier}`);
          setPosterDetail(getUserDetails[0]);
          console.log(getUserDetails);

          const getUserImages = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetProfileImages?uid=${ad.useridentifier}`);
          setPosterImages(getUserImages);

          const m = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomiePresavedMessages?uid=${uID}`);
          setMessages(m);

          if (m) {

            setSelectedOption(m[0].usepresavedmessageid);
            setMessageTitle(m[0].messagetitle);
            setMessageBody(m[0].messagebody);
          }

        }
        else if (ad.useridentifier === uID) {

          const getApplications = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetApplications?id=${ad.addid}`);
          setApplications(getApplications);
        }

        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
        setIsLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [uID]);

  useEffect(() => {
    const setSelectedImages = async () => {
      try {
        console.log(posterImages)
        setPosterProfileImage(returnSelectedProfileImage(posterImages));
        setCoverImage(returnSelectedCoverImage(posterImages));
      } catch (error) {
        console.log(error);
      }
    };

    setSelectedImages();
  }, [posterImages]);

  const handleApplicationClick = async () => {

  }
  const handleApply = async () => {
    let application = {
      adID: ad.addid,
      uid: uID,
      message: messageBody,
    }

    setIsLoading(true)
    try {
      let res = await callLambdaFunction(application, 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/AdApplications');
      console.log(res);
    } catch (error) {
      console.error('An error occurred:', error);
    }


    let name = signedInUserDetails.firstname + ' ' + signedInUserDetails.secondname

    writeNotification(ad.useridentifier, name, uID, profileImage.imageurl, ad.addid, 2)

    setIsLoading(false);
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Tab1':
        return (
          <View style={styles.tabContent}>
            <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View>
                  <Card style={styles.card2}>
                    <Card.Content style={{ padding: 5 }}>
                      <Title style={{ textDecorationLine: 'underline', }}>Beautiful Property</Title>
                      <Paragraph>Ad Type: <Text style={{ fontWeight: 'bold' }}>{returnAdTypeText(ad.addtype)}</Text> </Paragraph>
                      <Paragraph style={{ marginVertical: 8, paddingRight: 10 }}>
                        {ad.description}
                      </Paragraph>

                      <Paragraph>Property Details:</Paragraph>
                      <View style={styles.chipContainer}>
                        <Chip style={styles.chip}>{ad.propertytype}</Chip>
                        <Chip style={styles.chip}>{ad.deposit}</Chip>
                        <Chip style={styles.chip}>{smoking(ad.smokingpermitted)}</Chip>
                        <Chip style={styles.chip}>{references(ad.referencerequired)}</Chip>
                      </View>

                      {ad.addtype === 1 ? (
                        <>
                          <Paragraph>Current occupants:</Paragraph>
                          <View style={styles.chipContainer}>
                            <Chip style={styles.chip}>3</Chip>
                          </View>
                          {ad.preferenceset === 1 ? (
                            <>
                              <Paragraph>Looking For:</Paragraph>
                              <View style={styles.chipContainer}>
                                <Chip style={styles.chip}>{ad.gender}</Chip>
                                <Chip style={styles.chip}>Age:{ad.agebracket}</Chip>
                                <Chip style={styles.chip}>{ad.occupation}</Chip>
                              </View>
                            </>
                          ) : (
                            <View></View>
                          )}
                          <View style={styles.sameLineContainer}>
                            <View style={styles.lineInput}>
                              <Paragraph>Environment:</Paragraph>
                              <View style={styles.chipContainer}>
                                <Chip style={styles.chip}>{ad.envoirnment}</Chip>
                              </View>
                            </View>
                            <View style={styles.lineInput}>
                              <Paragraph>Roomie Expectation:</Paragraph>
                              <View style={styles.chipContainer}>
                                <Chip style={styles.chip}>{ad.houseexpectation}</Chip>
                              </View>
                            </View>
                          </View>
                        </>
                      ) : ad.addtype === 2 ? (
                        <>
                          <View>
                            <Paragraph>Number of Bedrooms:</Paragraph>
                            <View style={styles.chipContainer}>
                              <Chip style={styles.chip}>{ad.houserentalnumbedrooms}</Chip>
                            </View>

                            {ad.preferenceset === 1 ? (
                              <>
                                <Paragraph>Looking For:</Paragraph>
                                <View style={styles.chipContainer}>
                                  <Chip style={styles.chip}>{ad.gender}</Chip>
                                  <Chip style={styles.chip}>{ad.agebracket}</Chip>
                                  <Chip style={styles.chip}>Age: {ad.occupation}</Chip>
                                </View>
                              </>
                            ) : (
                              <View></View>
                            )}
                          </View>
                        </>
                      ) : ad.addtype === 3 ? (
                        <>
                          <View>

                            <Paragraph>Digs Details:</Paragraph>
                            <View style={styles.chipContainer}>
                              <Chip style={styles.chip}>{ad.digscurrentoccupants} occupants</Chip>
                              <Chip style={styles.chip}>{digsMeals(ad.digsmealsprovided)}</Chip>
                              <Chip style={styles.chip}>{ad.digsdaysavailable}</Chip>
                            </View>

                            {ad.preferenceset === 1 ? (
                              <>
                                <Paragraph>Looking For:</Paragraph>
                                <View style={styles.chipContainer}>
                                  <Chip style={styles.chip}>{ad.gender}</Chip>
                                  <Chip style={styles.chip}>Age: {ad.agebracket}</Chip>
                                  <Chip style={styles.chip}>{ad.occupation}</Chip>
                                </View>
                              </>
                            ) : (
                              <View></View>
                            )}
                          </View>
                        </>
                      ) : (
                        <>
                          <View>{/* Default UI for unknown ad type */}</View>
                        </>
                      )}
                    </Card.Content>
                  </Card>
                </View>
              </Card.Content>
            </Card>
          </View>
        );
      case 'Tab2':
        return (
          <View style={styles.tabContent}>
            <Card elevation={5} style={styles.card}>
              <Card.Content>
                <Card style={[styles.card, { padding: 0 }]}>
                  <Card.Cover
                    source={coverImage !== null ? { uri: coverImage.imageurl } : require('../assets/Icons/images/noCover.png')}
                    style={{ borderRadius: 0, marginBottom: 5 }}
                  />
                  <Card.Content>
                    <View style={styles.avatarContainer}>
                      <Avatar.Image
                        size={80}
                        source={posterProfileImage != null ? { uri: posterProfileImage.imageurl } : require('../assets/Icons/images/NoProfile.png')}
                      />
                    </View>
                    <Title>{posterDetail.firstname} {posterDetail.secondname}</Title>
                    <Text style={styles.infoText}>Rating: {calculateReviewStats(posterDetail.numreviews, posterDetail.posistivereview)}</Text>
                    <View style={styles.chipContainer}>
                      <Chip style={styles.chip}>{posterDetail.occupation}</Chip>
                      <Chip style={styles.chip}>{posterDetail.occupationdetail} </Chip>
                    </View>
                    <Paragraph>
                      {posterDetail.bio}
                    </Paragraph>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                      <Button
                        icon="email"
                        mode="outlined"
                        style={{ width: 150 }}
                        onPress={() => navChat()}>
                        Message
                      </Button>
                    </View>
                  </Card.Content>
                </Card>
              </Card.Content>
            </Card>
          </View>
        );
      case 'Tab3':
        return (
          <View style={styles.tabContent}>
            <Card elevation={5} style={styles.card}>
              <Card.Content>


                {messages.length > 0 ? (
                  <>
                    <Paragraph>Select from saved messages:</Paragraph>
                    <Picker
                      style={styles.input}
                      selectedValue={selectedOption}
                      onValueChange={(itemValue, itemIndex) => handleDropdownSelect(itemValue)}
                    >
                      {messages.map((message, index) => (
                        <Picker.Item label={message.messagetitle} value={message.usepresavedmessageid} key={index} />
                      ))}

                    </Picker>
                  </>
                ) : (
                  <View></View>
                )}
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
                <View style={styles.buttonContainer2}>
                  <Button
                    mode="contained"
                    onPress={handleApply}
                    style={{ marginRight: 10, borderRadius: 0 }} // Adjust margin as needed

                  >
                    Apply
                  </Button>

                </View>

              </Card.Content>


            </Card>
          </View>


        );
      default:
        return null;
    }
  };

  const renderApplicationTabContent = () => {
    switch (selectedApplicationTab) {
      case 'Tab1':
        return (
          <View >
            <Card elevation={5} style={styles.card}>
              <Card.Content style={{ paddingTop: 0 }}>
                <View style={styles.imageViewer}>
                  <View style={styles.imageViewer}>
                    {images.length > 0 ? (
                      <>
                        <Image
                          source={{ uri: images[selectedImageIndex].ImageURL }}
                          style={[styles.fullScreenImage, { height: 245 }]}
                        />
                        <View style={styles.buttonContainer}>
                          <IconButton
                            icon="chevron-left"
                            mode="text"
                            size={60}
                            iconColor="white"
                            style={{ marginLeft: -10 }}
                            onPress={() => navigateImage(-1)}
                          />
                          <IconButton
                            icon="chevron-right"
                            mode="text"
                            iconColor="white"
                            style={{ marginRight: -10 }}
                            size={60}
                            onPress={() => navigateImage(1)}
                          />
                        </View>
                      </>
                    ) : (
                      <Text>No Images Available</Text> // You can replace this with your symbol or placeholder
                    )}
                  </View>
                </View>
                <View style={styles.counter}>
                  <Text>{selectedImageIndex + 1}/{images.length}</Text>
                </View>
                <View>
                  <Title>{ad.title}</Title>
                  <Paragraph>{ad.tagline}</Paragraph>
                  <Paragraph>€{ad.price}</Paragraph>
                  <Paragraph style={styles.addressText}>{ad.addressline1}</Paragraph>
                  <Paragraph style={styles.addressText}>{ad.addressline2}</Paragraph>
                  <Paragraph style={styles.addressText}>{ad.city}</Paragraph>
                  <Paragraph style={styles.addressText}>{ad.county}</Paragraph>
                </View>
              </Card.Content>
            </Card>

            <View >
              {ad.useridentifier !== uID && (
                <View style={styles.tabButtons}>
                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      selectedTab === 'Tab1' && styles.selectedTab,
                    ]}
                    onPress={() => setSelectedTab('Tab1')}
                  >
                    <Text>Description</Text>

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      selectedTab === 'Tab2' && styles.selectedTab,
                    ]}
                    onPress={() => setSelectedTab('Tab2')}
                  >
                    <Text>Ad Poster</Text>

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      selectedTab === 'Tab3' && styles.selectedTab,
                    ]}
                    onPress={() => setSelectedTab('Tab3')}
                  >
                    <Text>Apply</Text>
                  </TouchableOpacity>
                </View>
              )}

              {renderTabContent()}
            </View>

          </View>
        );
      case 'Tab2':
        return (
          <View style={styles.tabContent}>
            <AdApplications applications={applications} chat={chats} navigation={navigation} />
          </View>
        );
      case 'Tab3':
        return (
          <View style={styles.tabContent}>
            <ManageAd ad={ad} images={images} navigation={navigation} />
          </View>


        );
      default:
        return null;
    }
  };


  const navigateImage = (step) => {
    // Calculate the next image index
    let newIndex = selectedImageIndex + step;

    // Ensure the index stays within bounds
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setSelectedImageIndex(newIndex);
  };

  return (
    <ScrollView>
      {isLoading ?
        <View style={[styles.loadingContainer, { marginTop: 200 }]}>
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
        : <>
          <View >
            <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
                  {ad.useridentifier === uID && (
                    <View style={[styles.tabButtons, { width: 300 }]}>
                      <TouchableOpacity
                        style={[
                          styles.tabButton,
                          selectedApplicationTab === 'Tab1' && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedApplicationTab('Tab1')}
                      >
                        <Text>Advertisement</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.tabButton,
                          selectedApplicationTab === 'Tab2' && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedApplicationTab('Tab2')}
                      >
                        <Text>Applications</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.tabButton,
                          selectedApplicationTab === 'Tab3' && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedApplicationTab('Tab3')}
                      >
                        <Text>Manage</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <IconButton
                    icon="arrow-left"
                    mode="text"
                    size={30}
                    style={{ flex: 1, alignItems: 'flex-end' }}
                    onPress={() => navigation.goBack()}>
                  </IconButton>
                </View>

              </Card.Content>
            </Card>
          </View>
          {renderApplicationTabContent()}
        </>}
    </ScrollView>

  );
}


export default AddDetail;