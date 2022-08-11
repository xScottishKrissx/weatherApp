import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import colours from './app/config/colours.js'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color:colours.white}}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.black,
    alignItems: 'center',
    justifyContent: 'center',
    color:colours.white
  },
});
