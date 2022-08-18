import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/HomeScreen';
import { SigninScreen } from './screens/SigninScreen';
import { SignupScreen } from './screens/SignupScreen';
import { SignoutButton } from './components/SignoutButton'
import { DetailScreen } from './screens/DetailScreen';

// firebase config
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import { 
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot, 
  updateDoc
} from 'firebase/firestore'

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
// initialise firebase app and store ref in a variable
const FBapp = initializeApp(firebaseConfig)
// initialise Firestore
const db = getFirestore( FBapp)

const Stack = createNativeStackNavigator()

export default function App() {
  const [user,setUser] = useState()
  // state to store data
  const [appData, setAppData ] = useState()
  // object representing Firebase Authentication
  const authObj = getAuth()
  // Observer to observe authentication status
  onAuthStateChanged( authObj, (FBuser) => {
    if( FBuser ) {
      // if authenticated, user is an object, setUser state and get data if no data
      setUser( FBuser )
      if(!appData) {
        getData(`users/${FBuser.uid}/items`)
      }
    }
    else {
      // if not authenticated, user is null
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

  // add data to the user's Firestore 
  const addData = async ( FScollection, data ) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db,FScollection), data )
  }
  // get all items in user's Firestore -- a subscription that automatically updates when data changes
  const getData = ( FScollection ) => {
    const FSquery = query( collection( db, FScollection ) )
    const unsubscribe = onSnapshot( FSquery, ( querySnapshot ) => {
      let FSdata = []
      querySnapshot.forEach( (doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      setAppData( FSdata )
    })
  }

  // update a user's data
  const updateData = ( FScollection, dataObj ) => {
    const ref = updateDoc()
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
          { (props) => <HomeScreen {...props} auth={user} add={addData} data={appData} /> }
        </Stack.Screen>
        <Stack.Screen name="Detail" options={{headerTitle: "Item Detail"}}>
          { (props) => <DetailScreen/> }
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
