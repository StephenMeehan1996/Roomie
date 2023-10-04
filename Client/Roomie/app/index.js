
import {SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, createSwitchNavigator } from '@react-navigation/native';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../FirebaseConfig';

import Login from '../components/Login';
import HomePage from '../components/HomePage';
import { FIREBASE_APP } from '../FirebaseConfig';
import Profile from '../components/Profile';
import Search from '../components/Search';
import SignUpForm from '../components/SignupForm';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

const InsideLayout = () =>{
   return(
    <InsideStack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <InsideStack.Screen name = "HomePage" component={HomePage} screenOptions={{headerShown: false}}/>
        <InsideStack.Screen name = "Profile" component={Profile} screenOptions={{headerShown: false}}/>
        <InsideStack.Screen name = "Search" component={Search} screenOptions={{headerShown: false}}/>
    </InsideStack.Navigator>
    )
}

const OutsideLayout = () =>{
   return(
    <OutsideStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <OutsideStack.Screen name = "Login" component={Login}/>
        <OutsideStack.Screen name = "SignupForm" component={SignUpForm}/>
    </OutsideStack.Navigator>
    )
}

const Home =  () =>{
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
     return () => unsubscribe();
   }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer  independent={true}>
                <Stack.Navigator initialRouteName='Home'>
                    {user ? <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/> : <Stack.Screen name='OutsideLayout' component={OutsideLayout} options={{headerShown: false}}/> }
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default Home;