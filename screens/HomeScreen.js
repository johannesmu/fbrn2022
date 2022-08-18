import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Empty } from '../components/Empty'
import { ListSeparator } from '../components/ListSeparator'


export function HomeScreen(props) {
  const navigation = useNavigation()

  const [input, setInput] = useState()

  const submit = (path, data) => {
    const dataObj = { name: data.name , date: new Date(), status: data.status }
    props.add(path, dataObj)
  }

  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: "Signup" }] })
    }
  }, [props.auth])

  // useEffect( () => {
  //   console.log( props.data )
  // }, [props.data])

  const clickHandler = (data) => {
    navigation.navigate('Detail', data)
  }

  const renderItem = ({ item }) => {
    console.log( item )
    return (
      <View style={ styles.item }>
        <Text onPress={() => clickHandler(item)}>
          {item.name}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.homeView}>
      <TextInput style={styles.input} onChangeText={(val) => setInput(val)} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => { submit(`users/${props.auth.uid}/items`, { name: input, status: false }) }}
      >
        <Text>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={ <Empty text="Nothing to see!" />}
        ItemSeparatorComponent={ ListSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    display: "flex",
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
  item: {
    padding: 15,
    fontSize: 18,
  },
  list: {
    
  }
})