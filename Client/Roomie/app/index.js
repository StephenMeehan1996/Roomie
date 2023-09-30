
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';


import Login from '../components/Login';
import HomePage from '../components/HomePage';
import { FIREBASE_APP } from '../FirebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

function InsideLayout(){
   
    <InsideStack.Navigator initialRouteName='Home'>
        <InsideStack.Screen name = "HomePage" component={HomePage}/>
    </InsideStack.Navigator>
}

function OutsideLayout(){
   
    <OutsideStack.Navigator initialRouteName='Login'>
        <OutsideStack.Screen name = "Login" component={Login}/>
    </OutsideStack.Navigator>
}

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
             <HomePage/>
          <Stack.Navigator initialRouteName='Login'>
                {user ? <Stack.Screen name='Inside' component={InsideLayout} /> : <Stack.Screen name='Login' component={OutsideLayout} options={{headerShown: false}}/> }
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