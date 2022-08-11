import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {useEffect, useState} from 'react'

import colours from './app/config/colours.js'
import Welcome from './app/screens/Welcome.js'
export default function App() {





  return (
    <View style={styles.container}>
      <Text style={{color:colours.white}}>Open up App.js to start working on your app!</Text>
      <Welcome />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
    color:colours.white
  },
});
