
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
//import { createStackNavigator } from '@react-navigation/stack';

import Login from '../components/Login';
import HomePage from '../components/HomePage';
import { FIREBASE_APP } from '../FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout(){
    <InsideStack.Navigator>
        <InsideStack.Screen name = "Home" component={HomePage}/>
    </InsideStack.Navigator>
}

const Home = () =>{
   // const [user, setUser] = useState<User | null>(null);

    // useEffect(() =>{
    //    onAuthStateChanged(FIREBASE_APP, (user) =>{
    //     console.log('user', user)
    //    }); 
  //  })
    return (
        <NavigationContainer  independent={true}>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
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