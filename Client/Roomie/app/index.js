
import {SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, createSwitchNavigator } from '@react-navigation/native';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../FirebaseConfig';

import Login from '../components/Login';
import HomePage from '../components/HomePage';
import { FIREBASE_APP } from '../FirebaseConfig';
import Profile from '../components/Profile';
import SearchResults from '../components/SearchResults';
import SignUpForm from '../components/SignupForm';
import RentalPreferencesForm from '../components/RentalPreferencesForm';
import CreateAdd from '../components/CreateAdd';
import AddImage from '../components/AddImage';
import AddDetail from '../components/AddDetail';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

const InsideLayout = () =>{
   return(
    //add bottom nav here? 
    <InsideStack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <InsideStack.Screen name = "HomePage" component={HomePage}/>
        <InsideStack.Screen name = "Profile" component={Profile}/>
        <InsideStack.Screen name = "SearchResults" component={SearchResults}/>
        <InsideStack.Screen name = "CreateAdd" component={CreateAdd}/>
        <InsideStack.Screen name = "AddImage" component={AddImage}/>
        <InsideStack.Screen name = "AddDetail" component={AddDetail}/>
    </InsideStack.Navigator>
    )
}

const OutsideLayout = () =>{
   return(
    <OutsideStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <OutsideStack.Screen name = "Login" component={Login}/>
        <OutsideStack.Screen name = "SignupForm" component={SignUpForm}/>
        <OutsideStack.Screen name = "RentalPreferences" component={RentalPreferencesForm}/>
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
      <PaperProvider>
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer  independent={true}>
                <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}} >
                    {user ? <Stack.Screen name='Inside' component={InsideLayout}/> : <Stack.Screen name='OutsideLayout' component={OutsideLayout}/> }
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
        </PaperProvider>
    )
}

export default Home;