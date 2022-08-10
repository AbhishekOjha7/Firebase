import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import CommonFunction from '../../Utilises/CommonFunction'
import {ActivityIndicator} from 'react-native-paper';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
    const navigation = useNavigation();
    const [creds, setCreds] = React.useState({
        email: '',
        pass: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Chats')
            }
            else {
                navigation.navigate('LogIn')
            }

        })
        return subscriber;
    }, [])

    const logIn = () => {

        CommonFunction.logInWithEmailAndPassword(
            creds.email,
            creds.pass,
            userDetails => {
                setLoading(false);
            },
            error => {
                setLoading(false);
            },
        );
    };

const SignUp=()=>{
    CommonFunction.signUpWithEmailAndPassword(
        creds.email,
        creds.pass,
        userDetails => {
            setLoading(false);
        },
        error => {
            setLoading(false);
        },
    );  
}
    const SignIn = () => {
       CommonFunction.SignInWithGoogle(
           ()=>{
               console.log('Sign iN success with google')
           },
           error=>{
               setLoading(false)
           }

       )
    };

    const onFacebookButtonPress=()=>{
        CommonFunction.signInWithFacebook(
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <Image style={styles.loginui} source={require('../../assets/images/firebaselogin.png')} />
            </View>
            <View style={styles.logintext}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{'Login'}</Text>
            </View>

            <View style={{ padding: 15, marginHorizontal: 29 }}>
                <TextInput
                    style={styles.txtinptStyl}
                    placeholder="@  Email ID.."
                    onChangeText={txt => {
                        setCreds({ ...creds, email: txt });
                    }}
                />
                <TextInput
                    style={styles.txtinptStyl}
                    placeholder="Password"
                    onChangeText={txt => {
                        setCreds({ ...creds, pass: txt });
                    }}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.signUpLoginBtn} onPress={logIn}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{'Login'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'grey' }}>_____________OR_____________</Text>
                </View>

                <View style={styles.googlebtnStyl}>
                    <View>
                        <Image style={{ height: 25, width: 30 }} source={require('../../assets/images/Googlelogo.png')} />
                    </View>

                    <Button
                        color="black"
                        title="Google Sign-In"
                        onPress={SignIn}
                    />
                </View>

                <View style={styles.googlebtnStyl}>
                    <View>
                        <Image style={{ height: 25, width: 30 }} source={require('../../assets/images/fb.png')} />
                    </View>

                    <Button
                        color="black"
                        title="Facebook Sign-In"
                        onPress={onFacebookButtonPress}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 30, justifyContent: 'center', alignContent: 'center' }}>
                    <TouchableOpacity onPress={
                        SignUp
                    }>
                        <Text  style={{ color: 'black', fontSize: 15 }}>Sign Up? </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.chats}
                        onPress={() => navigation.navigate('Chats')}
                    >

                        <Text style={{ color: '#0E3EDA', fontSize: 18, fontWeight: 'bold' }}>Chats Screen </Text>
                    </TouchableOpacity>
                </View>
          
            </View>
            {loading && (
           <ActivityIndicator
          style={{position: 'absolute'}}
          size={'large'}
          color="#212121"
        />
      )}
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    loginui: {
        // width: '100%',
        // height: '70%',
        height: windowHeight / 3,
        width: windowWidth / 1
        // alignSelf: 'center',
    },
    logintext: {
        padding: 10,
        marginRight: 20
    },

    txtinptStyl: {
        borderWidth: 1,
        width: 300,
        height: 45,
        borderRadius: 5,
        marginBottom: 8,
        color: 'blue',
        justifyContent: 'center',
        paddingLeft: 7,
        marginVertical: 4

        // borderBottomWidth:1,
        // borderBottomColor:"grey",
        // justifyContent:'center',
        // alignItems:'center'
    },
    signUpLoginBtn: {
        backgroundColor: '#0E3EDA',
        width: '80%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 5,
        height: 40,
        justifyContent: 'center',
    },
    googlebtnStyl: {
        backgroundColor: '#E8F9FD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderRadius: 7,
        marginTop: 10,
        marginHorizontal: 25
    },
});