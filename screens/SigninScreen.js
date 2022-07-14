import { Text, View, StyleSheet} from 'react-native'
export function SigninScreen( props ) {
  return (
    <View style={styles.signinView}>
      <Text>Sign in Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create( {
  signinView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )