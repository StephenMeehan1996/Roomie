import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'
import Ad from './Ad';
import formStyles from '../styles/formStyle.style';
import { calculateReviewStats, returnSelectedProfileImage, returnSelectedCoverImage } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import useFetchDataBoth from '../functions/DetailAndImageGetAPI';
import { useAppContext } from '../Providers/AppContext';


const Profile = ({ navigation, route }) => {

  const { signedInUserDetails } = useAppContext();
  const [uID, setUID] = useState(signedInUserDetails.useridentifier);


  const [userImages, setUserImages] = useState(route.params.userImages);
  const [userAdImages, setUserAdImages] = useState(route.params.userAdImages);
  const [userAdDetail, setUserAdDetail] = useState(route.params.userAdDetail);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const { profileImage, setProfileImage } = useAppContext();
  const [coverImage, setCoverImage] = useState(null);
  const [updating, setUpdating] = useState(false);
  const fetchAds = useFetchDataBoth();

  const [iconDirection, setIconDirection] = useState('chevron-down'); // Initial icon direction

  const toggleIconDirection = () => {
    // Toggle the icon direction
    setIconDirection(iconDirection === 'chevron-down' ? 'chevron-up' : 'chevron-down');
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setUpdating(true);
      const getUserImages = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetProfileImages?uid=${uID}`);
      setUserImages(getUserImages);

      const getUserAds = await fetchAds(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUsersAds?uid=${uID}`);
      setUserAdImages(getUserAds.images);
      setUserAdDetail(getUserAds.detail)


      setUpdating(false);
    });

    // Clean up the subscription when component unmounts
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {

    const setSelectedImages = async () => {
      try {
        setProfileImage(returnSelectedProfileImage(userImages));
        setCoverImage(returnSelectedCoverImage(userImages));
        console.log(returnSelectedCoverImage(userImages))
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function
    setSelectedImages();
  }, [uID, userImages]);


  const toggleBio = () => {
    setIsBioExpanded(!isBioExpanded);
  };

  const renderAds = ({ item: ad }) => {

    const adImages = userAdImages.filter((image) => image.AddID === ad.addid);

    return (
      <TouchableOpacity key={ad.addid} >
        <Ad ad={ad} images={adImages} navigation={navigation} uID={uID} />
      </TouchableOpacity>
    );
  };

  const nextPage = () => {
    alert('test')
  }
  return (

    <ScrollView>
      <View style={styles.container}>

        <Card elevation={5} style={styles.card}>
          {updating ? (
            <View style={{ marginVertical: 10 }}>
              <ActivityIndicator size="large" color="#6200EE" />
            </View>
          ) : (
            <>
              <Card.Cover
                source={coverImage !== null ? { uri: coverImage.imageurl } : require('../assets/Icons/images/noCover.png')}
                style={{ borderRadius: 0, marginBottom: 5 }}
              />
              <Card.Content>
                <Avatar.Image
                  size={80}
                  source={profileImage != null ? { uri: profileImage.imageurl } : require('../assets/Icons/images/NoProfile.png')}
                />
                <Title style={styles.username}>{signedInUserDetails.firstname} {signedInUserDetails.secondname}</Title>
                <Paragraph style={styles.bio}>
                  Web Developer | Traveller | Foodie
                </Paragraph>
                <View style={styles.info}>
                  {userAdDetail && (
                    <Text style={styles.infoText}>Active Adds: {userAdDetail.length}</Text>
                  )}
                  <Text style={styles.infoText}>Rating: {calculateReviewStats(signedInUserDetails.numreviews, signedInUserDetails.positivereview)}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                  {signedInUserDetails.useridentifier !== uID && (
                    <Button
                      icon="email"
                      mode="outlined"
                      style={{ width: 150 }}
                      onPress={() => console.log('Message button pressed')}>
                      Message
                    </Button>
                  )}
                  <Button
                    icon="text-box"
                    mode="outlined"
                    onPress={toggleBio}
                    style={[styles.bioButton, { width: 150 }]}>
                    Bio
                  </Button>
                </View>
                <Collapsible collapsed={!isBioExpanded}>
                  <Paragraph style={styles.bio}>{signedInUserDetails.bio}</Paragraph>
                </Collapsible>
              </Card.Content>
            </>
          )}
        </Card>
        {updating ? (
          <View></View>
        ) : (
          <>
            <Card elevation={5} style={styles.card}>
              <Card.Content>


                <Title style={styles.username}>Active ads</Title>
                <View >

                  {userAdDetail.length == 0 ? (
                    <Card elevation={5} style={[formStyles.card, { marginTop: 30, paddingVertical: 40 }]}>
                      <Card.Content>
                        <View style={styles.noResultsContainer}>
                          <Text style={styles.noResultsText}>No results found</Text>
                        </View>
                      </Card.Content>
                    </Card>
                  ) : (
                    <View>
                      <FlatList
                        data={userAdDetail.filter(ad => ad.active === 1)}
                        renderItem={renderAds}
                        keyExtractor={(userAdDetail) => userAdDetail.addid.toString()}
                      />

                      <Title style={styles.username}>Inactive ads</Title>
                      <View style={formStyles.iconContainer}>
                        <IconButton
                          icon={iconDirection}
                          size={40}
                          onPress={toggleIconDirection}
                          style={formStyles.icon}
                        />
                      </View>
                      {iconDirection == 'chevron-down' ? (
                      <View>
                        <FlatList
                          data={userAdDetail.filter(ad => ad.active === 0)}
                          renderItem={renderAds}
                          keyExtractor={(userAdDetail) => userAdDetail.addid.toString()}
                        />
                      </View>
                       ) : (
                         <View></View>
                       )}
                    </View>
                  )}

                </View>


              </Card.Content>
            </Card>
          </>
        )}

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    marginBottom: 10
  },
  username: {
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  bioScroll: {
    maxHeight: 100, // Adjust as needed
    marginTop: 8,
  },
  bioButton: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  greenText: {
    color: 'green', // Set the color to green
    fontWeight: 'bold', // Optional: You can apply additional styles as needed
  },
  redText: {
    color: 'red', // Set the color to green
    fontWeight: 'bold', // Optional: You can apply additional styles as needed
  },

});

export default Profile