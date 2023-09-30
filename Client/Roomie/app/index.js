
import {View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, createSwitchNavigator } from '@react-navigation/native';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';


import Login from '../components/Login';
import HomePage from '../components/HomePage';
import { FIREBASE_APP } from '../FirebaseConfig';
import Profile from '../components/Profile';
import Dropdown from '../components/DropDown';
import ScreenHeaderBtn from '../components/ScreenHeaderButton';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

const InsideLayout = () =>{
   return(
    <InsideStack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <InsideStack.Screen name = "HomePage" component={HomePage}/>
        <InsideStack.Screen name = "Profile" component={Profile}/>
    </InsideStack.Navigator>
    )
}

const OutsideLayout = () =>{
   return(
    <OutsideStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <OutsideStack.Screen name = "Login" component={Login}/>
    </OutsideStack.Navigator>
    )
}
const Home = () =>{
    const auth = FIREBASE_AUTH;
    const [selectedOption, setselectedOption] = useState(null);

   const [user, setUser] = useState(null);

   useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((user) => {
       if (user) {
         // User is signed in
         setUser(user);
       } else {
         // No user is signed in
         setUser(null);
       }
     });
 
     // To stop listening to state changes (clean up when component unmounts)
     return () => unsubscribe();
   }, []);
    return (
        <SafeAreaView style={{flex: 1}}>
           
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image
                    source={require('../assets/Icons/menu.png')}
                    style={[styles.icon, styles.profileIcon]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('OptionsScreen')}>
                    <Image
                    source={require('../assets/Icons/images/kemal.jpg')}
                    style={styles.icon}
                    />
                </TouchableOpacity>

             
               
            </View>
            <NavigationContainer  independent={true}>
            <Stack.Navigator initialRouteName='Home'>
                    {user ? <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/> : <Stack.Screen name='OutsideLayout' component={OutsideLayout} options={{headerShown: false}}/> }
            </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
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
        paddingVertical: 10,
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
      }
  });
  
export default Home;