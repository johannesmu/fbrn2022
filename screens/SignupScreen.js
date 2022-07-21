import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
export function SignupScreen( {navigation} ) {

  return (
    <KeyboardAvoidingView style={styles.signupView} behavior='padding'>
      <Text>Sign up</Text>
      <View style={styles.signupForm}>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} />
      <Text>Password</Text>
      <TextInput style={styles.input} />
      <TouchableOpacity>
        <Text>Sign up</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={ () => navigation.navigate('Signin') }>
        <Text>Go to Sign in</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create( {
  signupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupForm: {
    backgroundColor: "lightblue",
    width: '80%',
    padding: 10,
  },
  label: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 10,
  },
  form: {
    alignItems: 'flex-start',
  }
} )