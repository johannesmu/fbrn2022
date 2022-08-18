import { View, StyleSheet } from 'react-native'
export function ListSeparator( props ) {
  return (
    <View style={ styles.separator }></View>
  )
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#cccccc',
    minHeight: 1,
  }
})