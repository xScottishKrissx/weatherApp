import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';

import colours from '../../config/colours';

import MatIcons from '@expo/vector-icons/MaterialIcons'

export default function Title({navigation}) {
  return (
    <View style={styles.headerContainer}>
        <MatIcons name='menu' size={32} color='white' onPress={()=>navigation.toggleDrawer()}/>
        <Text style={styles.headerContainerHeading}>The Weather</Text>
        <MatIcons name='search' size={32} color='white' />
    </View>   
  )
}

const styles = StyleSheet.create({
    headerContainer:{
        color:colours.white,
        flex:1,
            alignItems:"center",
            justifyContent:"space-between",
            flexDirection:"row",
        // borderWidth:1,
        borderColor:"red",
        width:colours.contentAreaWidth,
        top:30
        
    },
    headerContainerHeading:{
        color:colours.white,
    },
})