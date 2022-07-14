import { Text, View, StyleSheet} from 'react-native'
export function SignupScreen( props ) {
  return (
    <View style={styles.signupView}>
      <Text>Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create( {
  signupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )