import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
export default function About({navigation}) {
  return (
    <View>
        <Text >About Page</Text>
        <Text onPress={()=>navigation.push("Test2", {name:"Test 2 Header"})}>Go To Test 2</Text>
    </View>
  )
}
