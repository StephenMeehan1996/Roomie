
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, createSwitchNavigator } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';


import Login from '../components/Login';
import HomePage from '../components/HomePage';
import { FIREBASE_APP } from '../FirebaseConfig';
import Profile from '../components/Profile';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

const InsideLayout = () =>{
   return(
    <InsideStack.Navigator initialRouteName='Home'>
        <InsideStack.Screen name = "HomePage" component={HomePage}/>
        <InsideStack.Screen name = "Profile" component={Profile}/>
    </InsideStack.Navigator>
    )
}

const OutsideLayout = () =>{
   return(
    <OutsideStack.Navigator initialRouteName='Login'>
        <OutsideStack.Screen name = "Login" component={Login}/>
    </OutsideStack.Navigator>
    )
}

// const AppSwitchNavigator = createSwitchNavigator(
//     {
//       AuthLoading: AuthLoadingScreen, // Loading screen to check user authentication
//       Auth: AuthStack, // Authenticated user stack
//       NonAuth: NonAuthStack, // Non-authenticated user stack
//     },
//     {
//       initialRouteName: 'AuthLoading', // Initial route to check user authentication
//     }
//   );

const Home = () =>{
    const auth = FIREBASE_AUTH;
   //const [user, setUser] = useState<s>(null);

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
        <NavigationContainer  independent={true}>
            
          <Stack.Navigator initialRouteName='Login'>
                {user ? <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/> : <Stack.Screen name='Login' component={OutsideLayout} options={{headerShown: false}}/> }
            </Stack.Navigator>
        </NavigationContainer>
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
      }
  });

export default Home;