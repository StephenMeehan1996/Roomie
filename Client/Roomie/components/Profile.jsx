import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { Video, ResizeMode } from 'expo-av';
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

  const video = React.useRef(null);
  const [status, setStatus] = useState({});

  const { signedInUserDetails, SetSignedInProfileImage } = useAppContext();

  const [uID, setUID] = useState(signedInUserDetails.useridentifier);

  const [userImages, setUserImages] = useState(route?.params.userImages);
  const [userAdImages, setUserAdImages] = useState(route?.params.userAdImages);
  const [userAdDetail, setUserAdDetail] = useState(route?.params.userAdDetail);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const {profileImage, setProfileImage } = useAppContext();
  const [coverImage, setCoverImage] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [selectedApplicationTab, setSelectedApplicationTab] = useState('Tab1');
  const fetchAds = useFetchDataBoth();

  const [iconDirection, setIconDirection] = useState('chevron-up'); // Initial icon direction

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

      // const getUserDetails = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUser?uid=${uID}`);
      // setSignedInUserDetails(getUserDetails[0]);


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

  const renderApplicationTabContent = () => {
    switch (selectedApplicationTab) {
      case 'Tab1':
        return (
          <View >
            <Paragraph style={styles.bio}>{signedInUserDetails.bio}</Paragraph>
          </View>

        );
      case 'Tab2':
        return (
          <View >
            <Video
              ref={video}
              style={styles.video}
              source={{ //
                // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/video%2FWIN_20240403_10_34_28_Pro.mp4?alt=media&token=29242532-6241-442a-bc6c-2783c4f2f5ea',
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.buttons}>
              <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                  status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

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
                <Paragraph style={styles.tagLine}>
                {signedInUserDetails.tagline}
                </Paragraph>
                <View style={styles.info}>
                  {userAdDetail && (
                    <Text style={styles.infoText}>Active Adds: {userAdDetail.filter(ad => ad.active === 1).length}</Text>
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

                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Button
                      icon="text-box"
                      mode="outlined"
                      onPress={() => setSelectedApplicationTab('Tab1')}
                      style={[styles.bioButton, { width: 150, borderRadius: 0, marginRight: 10 },
                      selectedApplicationTab === 'Tab1' ? styles.selectedTab : null,]}>
                      Bio
                    </Button>
                    <Button
                      icon="video-outline"
                      mode="outlined"
                      onPress={() => setSelectedApplicationTab('Tab2')}
                      style={[styles.bioButton, { width: 150, borderRadius: 0, marginLeft: 10 },
                      selectedApplicationTab === 'Tab2' ? styles.selectedTab : null,]}>
                      Video
                    </Button>

                  </View>

                  <View>
                    {renderApplicationTabContent()}
                  </View>

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

                  {userAdDetail.filter(ad => ad.active === 1).length === 0 ? (
                    <View style={{ padding: 10, marginVertical: 15 }}>
                      <Text style={{ fontSize: 16, textAlign: 'center' }}>No Active Ads</Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        data={userAdDetail.filter(ad => ad.active === 1)}
                        renderItem={renderAds}
                        keyExtractor={item => item.addid.toString()}
                      />
                    </View>
                  )}

                  {userAdDetail.filter(ad => ad.active === 0).length > 0 ? (
                    <View>
                      <Title style={styles.username}>Inactive ads</Title>
                      <View style={formStyles.iconContainer}>
                        <IconButton
                          icon={iconDirection}
                          size={40}
                          onPress={toggleIconDirection}
                          style={formStyles.icon}
                        />
                      </View>
                      {iconDirection === 'chevron-down' && (
                        <FlatList
                          data={userAdDetail.filter(ad => ad.active === 0)}
                          renderItem={renderAds}
                          keyExtractor={item => item.addid.toString()}
                        />
                      )}
                    </View>
                  ) : (
                    <View></View>
                  )}

                </View>
                  


            </Card.Content>
          </Card>
      </>
        )}

    </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vidContainer: {

    justifyContent: 'center',

  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    marginBottom: 10
  },
  username: {
    fontSize: 24,

    textAlign: 'center',
  },
  selectedTab: {
    //backgroundColor: '#4a90e2', // A shade of blue for elegance
    borderRadius: 5, // Rounded corners for a polished look
    borderWidth: 1.5, // Add border for distinction
    borderColor: 'black', // Darker shade of blue for border
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // Add// Change to your desired selected tab color
  },
  bio: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'left',
    padding: 10
  },
  tagLine: {
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