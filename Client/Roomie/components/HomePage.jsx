import { View, Text, SafeAreaView, StyleSheet, ScrollView,TouchableOpacity,Image,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Profile from '../components/Profile';
import Search from '../components/Search';
import Login from './Login';
import CreateAdd from './CreateAdd';
import { Avatar, Card, Title, Paragraph, Button,IconButton,Modal, Portal, Dialog, Menu } from 'react-native-paper';
import SearchResults from './SearchResults';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import AddDetail from './AddDetail';
import TestAPI from './Test_API';
import PostAdd from './PostAdd';
import ManageProfileImages from './ManageProfileImages';
import useFetchData from '../functions/GetAPI';
import useFetchDataBoth from '../functions/DetailAndImageGetAPI';

const Tab = createBottomTabNavigator();

const SecondTabStack = createNativeStackNavigator();

function SearchTabStackScreens() {
  return (
    <SecondTabStack.Navigator initialRouteName='_Search' screenOptions={{headerShown: false}}>
      <SecondTabStack.Screen name="_Search" component={Search} />
      <SecondTabStack.Screen name="_SearchResults" component={SearchResults} />
      <SecondTabStack.Screen name="_AddDetail" component={AddDetail} />
    </SecondTabStack.Navigator>
  );
}

function ProfileTabStackScreens({ route }) {

  const { uID, userDetails, userImages: userImages, userAdImages: userAdImages, userAdDetail: userAdDetail } = route.params;

  return (
    <SecondTabStack.Navigator initialRouteName='_Profile' screenOptions={{headerShown: false}} >
      <SecondTabStack.Screen name="_Profile" component={Profile} initialParams={{ uID: uID, userDetails: userDetails, userImages: userImages,userAdImages: userAdImages, userAdDetail: userAdDetail }}/>
      <SecondTabStack.Screen name="_AddDetail" component={AddDetail} />
      <SecondTabStack.Screen name="_manageImages" component={ManageProfileImages} initialParams={{ userImages: userImages }} />
    </SecondTabStack.Navigator>
  );
}
function CreateTabStackScreens({ route }) {

  const { uID, userDetails } = route.params;

  const userID = userDetails._userid;

  return (
    <SecondTabStack.Navigator initialRouteName='_CreateAdd' screenOptions={{headerShown: false}}>
      <SecondTabStack.Screen name="_CreateAdd" component={CreateAdd}/>
      <SecondTabStack.Screen name="_TestAPI" component={TestAPI} />
      <SecondTabStack.Screen name="_PostAdd" component={PostAdd} initialParams={{ uID: uID, userID: userID}}/>
    </SecondTabStack.Navigator>
  );
}

const HomePage = ({navigation, route}) => {

  const { email } = route.params;

  const [uID, setUID] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userImages, setUserImages] = useState(null);
  const [userAdImages, setUserAdImages] = useState(null);
  const [userAdDetail, setUserAdDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAds = useFetchDataBoth();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [visible, setVisible] = useState(false);

  const nextPage = () => {
    setVisible(false)
    navigation.navigate('_manageImages', { 
      
    });
  };


  
  // Gets done here so I can pass the information to required components
        useEffect(() => {
         setIsLoading(true)
 
         const fetchData = async () => {
          try {
            console.log('Email here' + email);
            console.log(email);
            //const getUUID = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUID?email=${email}`);
            const getUUID = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUID?email=${email}`);
            const UUID = getUUID[0].useridentifier;
            console.log(UUID)
            setUID(getUUID[0].useridentifier);
      
            const getUserDetails = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUser?uid=${UUID}`);
            setUserDetails(getUserDetails[0]);

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

      // useEffect(() => {
      //   // This useEffect will run when uID changes
      //   console.log(uID);
      //   console.log(userDetails);
      //   console.log(userImages);
      // }, [uID, userDetails, userImages]); // Run useEffect whenever uID changes

  return (

    <View style={{flex: 1}}>
       
      {isLoading? <View ><ActivityIndicator size="large" color="#0000ff"/></View>
                  : <>
     
        <View style={styles.header}>
          <IconButton
            icon="cog"  // Assuming "cog" is the name of your settings icon
            size={30}
            style={{marginHorizontal: 0}}
            onPress={showDialog} 
          />
          <IconButton
            icon="logout"
            size={30}
            style={{marginHorizontal: 0}}
            onPress={() => FIREBASE_AUTH.signOut()}
          />
        </View>
        
        <Portal style={{ }}>
            <Dialog visible={visible} onDismiss={hideDialog} style={styles.popup}>
              <Dialog.Title>Settings</Dialog.Title>
              <Dialog.Content>
                <View>
                  <TouchableOpacity
                      style={[styles.button]}
                      onPress={() => nextPage()}
                  >
                    <Text style={[styles.buttonText]}>Manage Images</Text>
                    
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
        <Tab.Screen name="Profile" component={ProfileTabStackScreens} options={{ headerShown: false }} initialParams={{ uID: uID, userDetails: userDetails, userImages: userImages, userAdImages: userAdImages, userAdDetail: userAdDetail}}/>
        <Tab.Screen name="CreateAdd" component={CreateTabStackScreens} options={{ headerShown: false }} initialParams={{ uID: uID, userDetails: userDetails }}/>
        <Tab.Screen name="Search" component={SearchTabStackScreens} options={{ headerShown: false }}/>
        
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
    },
    buttonText: {
      color: '#fff', 
      fontSize: 16, 
      fontWeight: 'bold', 
    },

    popup:{
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
  });

export default HomePage