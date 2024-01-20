import { View, Text, SafeAreaView, StyleSheet, ScrollView,TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Profile from '../components/Profile';
import Search from '../components/Search';
import Login from './Login';
import CreateAdd from './CreateAdd';
import { Avatar, Card, Title, Paragraph, Button,IconButton } from 'react-native-paper';
import SearchResults from './SearchResults';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import AddDetail from './AddDetail';
import TestAPI from './Test_API';
import PostAdd from './PostAdd';
import useFetchData from '../functions/GetAPI';

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

function ProfileTabStackScreens() {
  return (
    <SecondTabStack.Navigator initialRouteName='_Profile' screenOptions={{headerShown: false}}>
      <SecondTabStack.Screen name="_Profile" component={Profile} />
      <SecondTabStack.Screen name="_AddDetail" component={AddDetail} />
    </SecondTabStack.Navigator>
  );
}
function CreateTabStackScreens() {
  return (
    <SecondTabStack.Navigator initialRouteName='_CreateAdd' screenOptions={{headerShown: false}}>
      <SecondTabStack.Screen name="_CreateAdd" component={CreateAdd} />
      <SecondTabStack.Screen name="_TestAPI" component={TestAPI} />
      <SecondTabStack.Screen name="_PostAdd" component={PostAdd} />
    </SecondTabStack.Navigator>
  );
}

const HomePage = ({navigation, route}) => {

  const { email } = route.params;
  const [uID, setUID] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userImage, setUserImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(email);
  
  // Gets done here so I can pass the information to required components

        useEffect(() => {
        // Function to make API calls
        const fetchData = async () => {
          try {
            const response1 = await useFetchData();
            const result1 = await response1.json();

            setUID(result1);
    
            const response2 = await fetch('YOUR_API_ENDPOINT_2');
            const result2 = await response2.json();
            setData2(result2);
    
            const response3 = await fetch('YOUR_API_ENDPOINT_3');
            const result3 = await response3.json();
            setData3(result3);
    
            // All API calls are completed, set loading to false
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error if needed
            setIsLoading(false);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, []);

  return (

    <View style={{flex: 1}}>
        <View style={styles.header}>
            <IconButton
                icon="logout"
                mode="text"
                size={30}
                style={{flex:1,alignItems: 'flex-end'}}
                onPress={() => FIREBASE_AUTH.signOut()}>
            </IconButton>
        </View>
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
        <Tab.Screen name="Profile" component={ProfileTabStackScreens} options={{ headerShown: false }}/>
        <Tab.Screen name="CreateAdd" component={CreateTabStackScreens} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={SearchTabStackScreens} options={{ headerShown: false }}/>
        
      </Tab.Navigator>
   </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5
    },
    addContainer: {
        //backgroundColor: '#f5f5f5', // Slightly off-white color
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.2)', // Cool box shadow color
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
        justifyContent: 'space-between',
        alignItems: 'center',
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
      button: {
        backgroundColor: '#FF5733', // Background color
        width: 50,
        height: 50
      },
      buttonText: {
        color: 'white', // Text color
        fontWeight: 'bold', // Bold text
        fontSize: 16, // Text size
        textAlign: 'center', // Centered text
      },
  });

export default HomePage