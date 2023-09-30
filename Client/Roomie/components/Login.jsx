import { View, Text, StyleSheet, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextInput } from 'react-native-gesture-handler';

const Login = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () =>{
        setLoading(true)
        try{
           const responce = await signInWithEmailAndPassword(auth, email, password);
           console.log(responce); 
        } catch (error){
           console.log(error);
           alert('Sign in failed: ' + error.message);
        } finally{
           setLoading(false); 
        }
    }

    const signUp = async () =>{
        setLoading(true);
        try{
            const responce = await createUserWithEmailAndPassword(auth, email, password);
            console.log(responce); 
            alert('Check your emails!');
         } catch (error){
            console.log(error);
            alert('Registration failed: ' + error.message);
         } finally{
            setLoading(false); 
         }
    }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
            <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder='Password' autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}></TextInput>

            {loading ? <ActivityIndicator size="large" color="#0000ff"/>
            : <>
            <Button title="Login" onPress={signIn} style={styles.margin}></Button>
            <Button title="Create Account" onPress={signUp}></Button>
            </>}
       </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
container: {
    marginHorizontal: 20,
    flex: 1,
    marginTop: 200
},
input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
}, 
margin:{
    marginVertical: 10
}
});


export default Login