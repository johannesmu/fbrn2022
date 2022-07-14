import { Text, View, StyleSheet} from 'react-native'
export function HomeScreen( props ) {
  return (
    <View>
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