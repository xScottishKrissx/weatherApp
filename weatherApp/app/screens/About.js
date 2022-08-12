import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
export default function About({navigation}) {
  return (
    <View>
        <Text onPress={()=>navigation.push("Home")}>Return Home</Text>
    </View>
  )
}
