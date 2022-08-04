import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


export function HomeScreen( props ) {
  const navigation = useNavigation()

  useEffect( () => {
    if( !props.auth ) {
      navigation.reset( { index: 0, routes: [ {name: "Signup"} ]} )
    }  
  }, [props.auth] )

  return (
    <View style={styles.homeView}>
      <TextInput style={styles.input} />
      <TouchableOpacity style={styles.button}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create( {
  homeView: {
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    fontSize: 20,
    padding: 5,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 5,
  },
} )