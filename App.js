import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/HomeScreen';
import { SigninScreen } from './screens/SigninScreen';
import { SignupScreen } from './screens/SignupScreen';
import { SignoutButton } from './components/SignoutButton'

// firebase config
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
// initialise firebase app
initializeApp(firebaseConfig)

const Stack = createNativeStackNavigator()

export default function App() {
  const [user,setUser] = useState()

  const authObj = getAuth()
  onAuthStateChanged( authObj, (user) => {
    if( user ) {
      setUser( user )
    }
    else {
      setUser( null )
    }
  })

  const register = (email, password) => {
    createUserWithEmailAndPassword(authObj, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const signin = ( email, password) => {
    signInWithEmailAndPassword(authObj, email, password )
      .then((userCredential) => setUser(userCredential.user) )
      .catch((error) => console.log(error) )
  }

  const signout = () => {
    signOut( authObj )
    .then( () => {
      // sign out successful
    } )
    .catch( () => {
      // sign out errors
    } )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* to pass additional props we have to change our Stack.screen component */}
        <Stack.Screen name="Signup">
          { ( props) => <SignupScreen {...props} signup={register} auth={user}/> }
        </Stack.Screen>
        <Stack.Screen name="Signin">
          { ( props ) => <SigninScreen {...props} signin={signin} auth={user}  /> }
        </Stack.Screen>
        <Stack.Screen name="Home" options={{
          headerTitle: "App Home",
          headerRight: ( props ) => <SignoutButton {...props} signout={signout} />
        }}>
          { (props) => <HomeScreen {...props} auth={user} /> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
