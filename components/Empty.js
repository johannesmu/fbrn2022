import { View, StyleSheet, Text } from 'react-native'
export function Empty( props ) {
  return (
    <View style={styles.empty}>
      <Text style={ styles.emptyText}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 32,
    color: '#cccccc',
  }
})