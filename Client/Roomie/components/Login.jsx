import { View, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { Avatar, Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { useAppContext } from '../Providers/AppContext';

const Login = ({ navigation }) => {

    /* Security improvments
        Use UID from firebase
        Ad UID to images and ads pass that with query string
    */
    const { firebaseUser, setFirebaseUser } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const signIn = async () => {
        setLoading(true)
        try {
            const r = await signInWithEmailAndPassword(auth, email, password);
            console.log('here' + r);
            setFirebaseUser(r);
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
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

                {loading ? <ActivityIndicator size="large" color="#0000ff" />
                    : <>
                        <Button
                            mode="contained"
                            color="#FF5733"

                            labelStyle={styles.labelStyle}
                            style={{ marginTop: 15, marginBottom: 10, backgroundColor: '#6750a4' }}
                            onPress={signIn}>
                            Login
                        </Button>
                        <Button
                            mode="outlined"
                            style={styles.btn2}
                            labelStyle={styles.labelStyle2}
                            onPress={() => navigation.navigate('SignupForm')}>
                            Create Account
                        </Button>
                        {/* <Button 
             mode="outlined" 
             onPress={() => handleFacebookLogin()}
            >
                  Sign In With Facebook
            </Button> */}
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
    labelStyle: {
        color: 'white'
    },
    labelStyle2: {
        color: '#6750a4'
    },
    btn2: {
        borderColor: '#6750a4'
    },
    margin: {
        marginVertical: 10
    }
});


export default Login