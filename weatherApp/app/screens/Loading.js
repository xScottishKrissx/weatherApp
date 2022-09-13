import React from 'react'
import { Text, View} from 'react-native';
import colours from '../config/colours'

export default function LoadingScreen() {
  return (
    <View style={{
      backgroundColor:"black", 
      flex:1, 
        alignItems:'center',
        justifyContent:'center', 
      width:"100%", 
      // borderWidth:1,
      // borderColor:"red",
    }}>
    <Text style={{color:colours.white}}>Loading.....</Text>
  </View>
  )
}

