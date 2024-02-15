import {SafeAreaView,ActivityIndicator,View,StyleSheet,Text,Button} from 'react-native';
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
import PostAdd from '../components/PostAdd';
import AddDetail from '../components/AddDetail';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

const InsideLayout = ({ route }) => {

  const {email} = route.params;

  return (
    <InsideStack.Navigator initialRouteName='HomePage' screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name="HomePage" component={HomePage} initialParams={{ email: email}} />
    </InsideStack.Navigator>
  );
};

const OutsideLayout = () =>{
   return(
    <OutsideStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <OutsideStack.Screen name = "Login" component={Login}/>
        <OutsideStack.Screen name = "SignupForm" component={SignUpForm}/>
        <OutsideStack.Screen name = "RentalPreferences" component={RentalPreferencesForm}/>
    </OutsideStack.Navigator>
    )
}

const Home =  ({navigation, route}) =>{

    const auth = FIREBASE_AUTH;
    const [selectedOption, setselectedOption] = useState(null);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);

   useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged( (user) => {
       if (user) {
         setUser(user);
         setEmail(user.email); // Set the email here
      
       } else {
         // No user is signed in
         setUser(null);
         setEmail(null); // Set the email here
       }
     });
     return () => unsubscribe();
   }, []);

    return (
      <PaperProvider>
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer  independent={true}>
                <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}} >
                    {user ? <Stack.Screen name='Inside' component={InsideLayout}  initialParams={{ email: user.email }} /> : <Stack.Screen name='OutsideLayout' component={OutsideLayout}/> }
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
        </PaperProvider>
    )
}


export default Home;