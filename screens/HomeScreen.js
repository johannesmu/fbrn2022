import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'


export function HomeScreen( props ) {
  const navigation = useNavigation()

  const [input,setInput] = useState()

  const submit = ( path, data ) => {
    const dataObj = {name: data, date: new Date() }
    props.add( path, dataObj )
  }

  useEffect( () => {
    if( !props.auth ) {
      navigation.reset( { index: 0, routes: [ {name: "Signup"} ]} )
    }  
  }, [props.auth] )

  useEffect( () => {
    console.log( props.data )
  }, [props.data])

  const clickHandler = (data) => {
    navigation.navigate('Detail', data )
  }

  const renderItem = ({item}) => (
    <View >
      <Text onPress={ () => clickHandler(item) }>
        { item.name }
      </Text>
    </View> 
  )

  return (
    <View style={styles.homeView}>
      <TextInput style={styles.input} onChangeText={ (val) => setInput(val) } />
      <TouchableOpacity 
        style={styles.button}
        onPress={ () => { submit(`users/${props.auth.uid}/items`,input) }}
      >
        <Text>Add</Text>
      </TouchableOpacity>
      <FlatList 
        data={ props.data } 
        renderItem= {renderItem}
        keyExtractor={ item => item.id }
      />
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