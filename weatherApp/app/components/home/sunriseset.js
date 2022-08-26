import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';
import colours from '../../config/colours';
import FeatherIcons from '@expo/vector-icons/Feather'

export default function Sunriseset({apiData}) {

    const sunrise = new Date(apiData.sunrise * 1000).toLocaleTimeString('en-GB')    
    const sunset = new Date(apiData.sunset * 1000).toLocaleTimeString('en-GB');

    return (
    <View style={[styles.rowStyle, styles.sun]}>
        <View style={{fontSize:15, color:colours.white, flexDirection:"row"}}>
            <FeatherIcons name="sunrise" size={20} color="white" /> 
            <Text style={{marginLeft:10, color:colours.white }}>{sunrise}</Text>
        </View>

        <View style={{fontSize:15, flexDirection:"row"}}>
            <FeatherIcons name="sunset" size={20} color="white" /> 
            <Text style={{marginLeft:10, color:colours.white }}>{sunset}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    rowStyle:{
        flexDirection:'row',
        alignItems:"center",
        marginBottom:10,
    },
    sun:{
        alignItems:"center", 
        flexDirection:"row",
        justifyContent:"space-evenly", 
        width:"100%", 
    },
})