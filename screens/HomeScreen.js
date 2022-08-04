import { Text, View, StyleSheet} from 'react-native'
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
      <Text>Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create( {
  homeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )