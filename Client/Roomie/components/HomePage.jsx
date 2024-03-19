import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set, child, get, onValue, update } from "firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../FirebaseConfig'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { generateShortID, returnNotificationMessage } from '../functions/CommonFunctions';

import Profile from '../components/Profile';
import Search from '../components/Search';
import Login from './Login';
import CreateAdd from './CreateAdd';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Modal, Portal, Dialog, Menu, ICon, Appbar, Badge } from 'react-native-paper';
import SearchResults from './SearchResults';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import AddDetail from './AddDetail';
import TestAPI from './Test_API';
import PostAdd from './PostAdd';
import ManageProfileImages from './ManageProfileImages';
import useFetchData from '../functions/GetAPI';
import useFetchDataBoth from '../functions/DetailAndImageGetAPI';
import ManagePreferences from './ManagePreferences';
import ManageMessages from './ManageMessages';
import Chat from './Chat';
import ChatList from './ChatList';
import { useAppContext } from '../Providers/AppContext';

const Tab = createBottomTabNavigator();

const SecondTabStack = createNativeStackNavigator();

function SearchTabStackScreens({ route }) {
  const { userImages } = route.params;

  return (
    <SecondTabStack.Navigator initialRouteName='_Search' screenOptions={{ headerShown: false }}>
      <SecondTabStack.Screen name="_Search" component={Search} initialParams={{}} />
      <SecondTabStack.Screen name="_SearchResults" component={SearchResults}  />
      <SecondTabStack.Screen name="_AddDetail" component={AddDetail} />
      <SecondTabStack.Screen name="_chat" component={Chat} initialParams={{ userImages: userImages }} />
      <SecondTabStack.Screen name="_Profile" component={Profile} />
    </SecondTabStack.Navigator>
  );
}

function ProfileTabStackScreens({ route }) {

  const { userImages,  userAdImages,  userAdDetail} = route.params;


  return (
    <SecondTabStack.Navigator initialRouteName='_Profile' screenOptions={{ headerShown: false }} >
      <SecondTabStack.Screen name="_Profile" component={Profile} initialParams={{ userImages: userImages, userAdImages: userAdImages, userAdDetail: userAdDetail }} />
      <SecondTabStack.Screen name="_AddDetail" component={AddDetail} />
      <SecondTabStack.Screen name="_manageImages" component={ManageProfileImages} initialParams={{ userImages: userImages }} />
      <SecondTabStack.Screen name="_managePreferences" component={ManagePreferences} initialParams={{ }} />
      <SecondTabStack.Screen name="_manageMessages" component={ManageMessages}/>
      <SecondTabStack.Screen name="_chatList" component={ChatList} />
      <SecondTabStack.Screen name="_chat" component={Chat} initialParams={{ userImages: userImages }} />
    </SecondTabStack.Navigator>
  );
}
function CreateTabStackScreens({ route }) {

  const { uID, userDetails } = route.params;

  const userID = userDetails._userid;

  return (
    <SecondTabStack.Navigator initialRouteName='_CreateAdd' screenOptions={{ headerShown: false }}>
      <SecondTabStack.Screen name="_CreateAdd" component={CreateAdd} />
      <SecondTabStack.Screen name="_TestAPI" component={TestAPI} />
      <SecondTabStack.Screen name="_PostAdd" component={PostAdd} initialParams={{ uID: uID, userID: userID }} />
    </SecondTabStack.Navigator>
  );
}

const HomePage = ({ navigation, route }) => {

  const {signedInUserDetails, setSignedInUserDetails} = useAppContext();
  const {newMessages, setNewMessages } = useAppContext();

  const { email } = route.params;
  const [uID, setUID] = useState(null);
  const [userImages, setUserImages] = useState(null);
  const [userAdImages, setUserAdImages] = useState(null);
  const [userAdDetail, setUserAdDetail] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAds = useFetchDataBoth();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [visible, setVisible] = useState(false);


  const [newNotifications, setNewNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);


  const [showNotifications, setShowNotifications] = useState(false);
  //used to only remove notifications if bell previously clicked by user
  const [prevShowNotifications, setPrevShowNotifications] = useState(false);


  const handleIconPress = () => {
    setShowNotifications(!showNotifications);
  };

  const nextPage = (route) => {
    setVisible(false)

    navigation.navigate(route, {

    });
  };

  const t = (m) => {
  
    navigation.navigate('_chatList', {  
       newMessages: m 
    });
  };

  // Gets done here so I can pass the information to required components
  useEffect(() => {
    setIsLoading(true)
    // setNotifications(dummyNotifications);
    const fetchData = async () => {
      try {
        const getUUID = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUID?email=${email}`);
        const UUID = getUUID[0].useridentifier;
        setUID(getUUID[0].useridentifier);

        const getUserDetails = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUser?uid=${UUID}`);
        setSignedInUserDetails(getUserDetails[0]);

        const getUserImages = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetProfileImages?uid=${UUID}`);
        setUserImages(getUserImages);

        const getUserAds = await fetchAds(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUsersAds?uid=${UUID}`);
        setUserAdImages(getUserAds.images);
        setUserAdDetail(getUserAds.detail)

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
        setIsLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [email]);

  useEffect(() => {
    const db = FIREBASE_DATABASE;
    return onValue(ref(db, `notifications/${uID}/`), (snapshot) => {
      const notificationData = snapshot.val();
      if (notificationData && typeof notificationData === 'object') {
       
        const notificationArray = Object.entries(notificationData).map(([key, value]) => ({
          key, // Add the key as a property
          ...value, 
        }));
        // Check if each item in the array is an object
        const isValidArray = notificationArray.every(item => typeof item === 'object');
        if (isValidArray) {

          const newNotifications = notificationArray.filter(n => n.seen === 0 && n.notificationType !=1);
          const newMessages = notificationArray.filter(n => n.seen === 0 && n.notificationType ===1);
          const seenNotifications = notificationArray.filter(n => n.seen === 1);

          setNewNotifications(newNotifications);

          //newMessages
          setNewMessages(newMessages);

          //newMessages added to seen notifications after opened
          setSeenNotifications(seenNotifications);
         
        } else {
          console.error('Invalid notifications array:', notificationArray);
        }
      } else {
        console.error('Invalid notification data:', notificationData);
      }
    });

  }, [uID]);

  async function updateNotifications() {
    if (showNotifications === false && prevShowNotifications === true) {

      const db = FIREBASE_DATABASE;

      newNotifications.forEach(async notification => {
       
        const notificationRef = ref(db, `notifications/${uID}/${notification.key}`);

        try {
          // Update the 'seen' property to 1
          await update(notificationRef, { seen: 1 });
          console.log(`Notification with key ${notification.key} updated successfully.`);
        } catch (error) {
          console.error(`Error updating notification with key ${notification.key}:`, error);
        }
      });
    }
  }

  useEffect(() => {
    updateNotifications();
    setPrevShowNotifications(showNotifications);
  }, [showNotifications]);


  const renderNotifications = ({ item }) => {

    const date = new Date(item.date);
    const formattedDateTimeString = `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    return (
      <View style={styles.notificationItem}>
        <View style={{ paddingVertical: 10 }}>
          <Image
            style={styles.notificationAvatar}
            source={{ uri: item.creatorProfileImageURL }} // Replace with your actual image source
          />
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationDate}>{formattedDateTimeString}</Text>
        </View>
      </View>
    );
  };


  return (

    <View style={{ flex: 1 }}>

      {isLoading ?
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
        : <>
          <View style={styles.header}>
            
          <View>
              {newMessages.length > 0 && (
                <Badge style={{ position: 'absolute', top: 5, right: 1 }} size={22}>
                  {newMessages.length}
                </Badge>
              )}
              <Appbar.Action icon="message"  onPress={() => t(newMessages)} size={30} />
            </View>
            <IconButton
              icon="cog"
              size={30}
              style={{ marginHorizontal: 0 }}
              onPress={showDialog}
            />
            <IconButton
              icon="logout"
              size={30}
              style={{ marginHorizontal: 0 }}
              onPress={() => FIREBASE_AUTH.signOut()}
            />
          
            <View>
              {newNotifications.length > 0 && (
                <Badge style={{ position: 'absolute', top: 5, right: 2 }} size={22}>
                  {newNotifications.length}
                </Badge>
              )}
              <Appbar.Action icon="bell" onPress={handleIconPress} size={30} />
            </View>
          </View>
          {showNotifications && (
            <View style={styles.notificationContainer}>
              {newNotifications.length > 0 ? (
                <View>
                  <Text style={styles.sectionHeaderText}>New</Text>
                  <ScrollView style={styles.notificationListContainer}>
                    <FlatList
                      data={newNotifications.sort((a, b) => new Date(b.date) - new Date(a.date))}
                      renderItem={renderNotifications}
                      keyExtractor={item => item.key} // Ensure the key is a string
                      vertical
                    />
                  </ScrollView>
                </View>
              ) : (
                <Text style={styles.noNotificationsText}>No new notifications</Text>
              )}
              <Text style={styles.sectionHeaderText}>Earlier</Text>
              <ScrollView style={styles.notificationListContainer}>
                <FlatList
                  data={seenNotifications.sort((a, b) => new Date(b.date) - new Date(a.date))}
                  renderItem={renderNotifications}
                  keyExtractor={item => item.key} // Ensure the key is a string
                  vertical
                />
              </ScrollView>
            </View>
          )}

          <Portal style={{}}>
            <Dialog visible={visible} onDismiss={hideDialog} style={styles.popup}>
              <Dialog.Title>Settings</Dialog.Title>
              <Dialog.Content>
                <View>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => nextPage("_manageImages")}
                  >
                    <Text style={[styles.buttonText]}>Manage Images</Text>

                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => nextPage("_managePreferences")}
                  >
                    <Text style={[styles.buttonText]}>Manage Preferences</Text>

                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => nextPage("_manageMessages")}
                  >
                    <Text style={[styles.buttonText]}>Manage Messages</Text>

                  </TouchableOpacity>
                </View>

              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Close</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Tab.Navigator
            initialRouteName='HomePage'
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Profile') {
                  iconName = focused ? 'person-outline' : 'person-outline';
                } else if (route.name === 'Search') {
                  iconName = focused ? 'search-outline' : 'search-outline';
                }
                else if (route.name === 'CreateAdd') {
                  iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Profile" component={ProfileTabStackScreens} options={{ headerShown: false }} initialParams={{userImages: userImages, userAdImages: userAdImages, userAdDetail: userAdDetail}} />
            <Tab.Screen name="CreateAdd" component={CreateTabStackScreens} options={{ headerShown: false }}  />
            <Tab.Screen name="Search" component={SearchTabStackScreens} options={{ headerShown: false }} initialParams={{userImages: userImages }} />

          </Tab.Navigator>

        </>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',

  },

  popup: {
    position: 'absolute',
    right: -25,
    flex: 1,
    width: '85%',
    padding: 5,
    borderLeftWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 0,
  },

  addContainer: {
    //backgroundColor: '#f5f5f5', // Slightly off-white color
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10, // Blur radius for the box shadow
    paddingHorizontal: 7,
    paddingVertical: 15, // Adjust the padding as needed
    borderRadius: 8, // Optional: Add rounded corners
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'end',
    paddingVertical: 0,
    backgroundColor: '#fff'
  },


  notificationContainer: {
    position: 'absolute',
    top: 50, // Adjust as needed based on the height of the header
    right: 0,
    width: 325,
    backgroundColor: '#ffffff',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 2,
  },

  noNotificationsText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeaderText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationListContainer: {
    maxHeight: 150, // Adjust the height as needed

  },

  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificationAvatarContainer: {
    marginRight: 10,
  },
  notificationAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: 'gray',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  profileIcon: {
    marginLeft: 10,
    borderRadius: 15,
  },

  buttonText: {
    color: '#fff',// Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomePage