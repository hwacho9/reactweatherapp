import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  
  return (
    <View style = {{flex:1}}>
      <View style={{ flex:1, backgroundColor:"tomato"}}></View>
      <View style={{ flex:1, backgroundColor:"teal"}}></View>
      <View style={{ flex:1, backgroundColor:"orange"}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize:28
  }
});
