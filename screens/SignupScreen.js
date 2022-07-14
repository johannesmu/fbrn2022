import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
export function SignupScreen( {navigation} ) {

  return (
    <View style={styles.signupView}>
      <Text>Sign up Screen</Text>
      <TouchableOpacity onPress={ () => navigation.navigate('Signin') }>
        <Text>Go to Sign in</Text>
      </TouchableOpacity>
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