import React, {useState } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ScrollView } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'

const Profile = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false, 
        });
      }, [navigation]);

    const [isBioExpanded, setIsBioExpanded] = useState(false);
    const bioText = `Hey there! 👋 I'm John. Whether I'm scaling mountain peaks, exploring new cities, or just enjoying a cozy afternoon with a good book, I believe in making every moment count.`;

    const toggleBio = () => {
        setIsBioExpanded(!isBioExpanded);
      };
      
  return (
    
    <ScrollView>
    <View style={styles.container}>
       
    <Card elevation={5} style={styles.card}>
      <Card.Cover  source={require('../assets/Icons/images/cover.jpg')} style={{borderRadius:0, marginBottom: 5}}/>
      <Card.Content>
        <Avatar.Image
          size={80}
          source={require('../assets/Icons/images/kemal.jpg')}
        />
        <Title style={styles.username}>John Doe</Title>
        <Paragraph style={styles.bio}>
          Web Developer | Traveller | Foodie
        </Paragraph>
        <View style={styles.info}>
            <Text style={styles.infoText}>Active Adds: 2</Text>
            <Text style={styles.infoText}>Rating: <Text style={styles.greenText}>85% Positive</Text></Text>
        </View>
        <Button
          icon="email"
          mode="outlined"
          onPress={() => console.log('Message button pressed')}>
          Message
        </Button>
        <Button
            icon="text-box"
            mode="outlined"
            onPress={toggleBio}
            style={styles.bioButton}>
            Bio
          </Button>
        <Collapsible collapsed={!isBioExpanded}>
            <Paragraph style={styles.bio}>{bioText}</Paragraph>
          </Collapsible>
      </Card.Content>
    </Card>

    <Card elevation={5} style={styles.card}>
      <Card.Content>
        <Title style={styles.username}>Active adds</Title>
        <View style={styles.addContainer}>
                <CarouselCards />
                <AddDetail />
            </View>

            <View style={styles.addContainer}>
                <CarouselCards />
                <AddDetail />
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
      }
  });

export default Profile