import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import { Alert } from 'react-native';
GoogleSignin.configure({
    webClientId:
        '265018140157-1sce518sfs0vohvbg6vom30u6te50uhe.apps.googleusercontent.com',
});

const logInWithEmailAndPassword = (email, password, successCallback, failureCallback) => {
    console.log('login chla');
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(loginUser => {
            successCallback(loginUser)

        })
        .catch(loginError => {
           // Alert.alert('Invalid Credentials')
            failureCallback(loginError)
            console.log("Errorrrrr",loginError.code);
             authErrorHandling(loginError.code)

        });
};

const signUpWithEmailAndPassword = (email, password, successCallback, failureCallback) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            successCallback(res)
            console.log('SignUp Hogaya', res);
        })
        .catch(err => {
            failureCallback(err)
            console.log('Already Register', err);
        });

}
const logoutWithFirebase = (successCallback, failureCallback) => {

    auth().signOut().then(successCallback).catch(failureCallback)
}

const SignInWithGoogle = async (successCallback, failureCallback) => {
    try {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const Singn_with_google = auth().signInWithCredential(googleCredential);
        Singn_with_google.then(resp => {
            console.log(resp);
        });
    }
    catch (error) {
        console.log('error', error.code);
    }
}
const signInWithFacebook = async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]).then(console.log('results stored'));
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

const authErrorHandling = (errorMsg) => {
    switch (errorMsg) {
      case 'auth/wrong-password':
          Alert.alert('Wrong PassWord')
        break;
        case 'auth/user-not-found':
            Alert.alert('Wrong Email')
          break;
          case 'auth/network-request-failed':
              Alert.alert('No internet connection')
      default:
        break;
        
    }
  }

export default { logInWithEmailAndPassword, logoutWithFirebase, signUpWithEmailAndPassword, SignInWithGoogle, signInWithFacebook }