import React, {useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ScrollView,FlatList  } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'
import Ad from './Ad';
import  formStyles  from '../styles/formStyle.style';
import { calculateReviewStats, returnSelectedProfileImage } from '../functions/CommonFunctions';


const Profile = ({ navigation, route }) => {

  const { uID, userDetails, userImages, userAdImages, userAdDetail } = route.params;
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

   

   console.log('Images' + JSON.stringify(userImages));

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
 }, [profileImage, coverImage]);


    const toggleBio = () => {
        setIsBioExpanded(!isBioExpanded);
      };

      const renderAds = ({ item: ad }) => {
       
        const adImages = userAdImages.filter((image) => image.AddID === ad.addid);

        return (
          <TouchableOpacity key={ad.addid} onPress={() => nextPage(ad)}>
            <Ad ad={ad} images={adImages} navigation={navigation} />
          </TouchableOpacity>
        );
      };
      
     
  return (
    
    <ScrollView>
    <View style={styles.container}> 
       
    <Card elevation={5} style={styles.card}>
      <Card.Cover  
          source={coverImage !== null ? { uri: coverImage.imageurl } : require('../assets/Icons/images/noCover.png')} style={{borderRadius:0, marginBottom: 5}}
        />
      <Card.Content>
        <Avatar.Image
          size={80}
         // source={userImages.imageurl}
          source={profileImage != null ? { uri: profileImage.imageurl } : require('../assets/Icons/images/NoProfile.png')}
        />
        {/* <Avatar.Image
        size={80}
        source={require('../assets/Icons/images/NoProfile.png')}
      /> */}
        <Title style={styles.username}>{userDetails.firstname} {userDetails.secondname}</Title>
        <Paragraph style={styles.bio}>
          Web Developer | Traveller | Foodie
        </Paragraph>
        <View style={styles.info}>
            <Text style={styles.infoText}>Active Adds: {userAdDetail.length}</Text>
            <Text style={styles.infoText}>Rating: {calculateReviewStats(userDetails.numreviews,userDetails.positivereview )}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
        <Button
          icon="email"
          mode="outlined"
          style={{width: 150}}
          onPress={() => console.log('Message button pressed')}>
          Message
        </Button>
        <Button
            icon="text-box"
            mode="outlined"
            onPress={toggleBio}
            style={[styles.bioButton, {width: 150}]}>
            Bio
          </Button>
          </View>
        <Collapsible collapsed={!isBioExpanded}>
            <Paragraph style={styles.bio}>{userDetails.bio}</Paragraph>
          </Collapsible>
      </Card.Content>
    </Card>

    <Card elevation={5} style={styles.card}>
      <Card.Content>
        <Title style={styles.username}>Active adds</Title>
        <View >
       
          {userAdDetail.length === 0 ? (
          <Card elevation={5} style={[formStyles.card, {marginTop: 30, paddingVertical: 40}]}>
            <Card.Content>
              <View style={styles.noResultsContainer}>
                  <Text style= {styles.noResultsText}>No results found</Text>
              </View>
            </Card.Content>
          </Card>
          ) : (
        <FlatList
          data={userAdDetail}
          renderItem={renderAds}
          keyExtractor={(userAdDetail) => userAdDetail.addid.toString()}
        />
        )} 
    
        </View>
      </Card.Content>
    </Card>
   
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
      }
  });

export default Profile