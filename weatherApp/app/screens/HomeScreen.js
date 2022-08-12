import React from 'react';

import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {useEffect, useState} from 'react'
import colours from '../config/colours'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MatIcons from '@expo/vector-icons/MaterialIcons'

function HomeScreen({navigation}) {
    
// API Call -------------------------------------------------------------------------------------------
    // const [apiData, setApiData] = useState(null)
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
    //     .then(res => {
    //         return res.json()
    //     })
    //     .then(data => {
    //         setApiData(data)
    //         setLoading(false)
    //     } )
    //     .catch(error => console.log(error))
        
    // }, [])
    // console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    // console.log(apiData)
    // const temp = apiData.list[0].main.temp
    // const citName = apiData.city.name

// Static Work

    return (
        <ImageBackground style={styles.container} source={require("../assets/clearSky.jpg")}>
            
            <View style={styles.headerContainer}>
                <MatIcons name='menu' size={32} color='white' onPress={()=>navigation.toggleDrawer()}/>
                <Text style={styles.headerContainerHeading}>The Weather</Text>
                <MatIcons name='search' size={32} color='white' />
                
            </View>        

            <View style={styles.locationWeatherContainer}>
                <Text>Glasgow</Text>
                <Text>25 degrees</Text>

                {/* Nav */}
                <Text>-- Nav Test --</Text>
                <Text onPress={()=>navigation.push("AboutScreen")}>Navigate To About Screen</Text>
                <Text onPress={()=>navigation.push("Test", {name:"Test 1 Header"})}>Go To Test</Text>

                {/* Navigate across stacks Home to About */}
                <Text onPress={()=>{
                    navigation.navigate('About',{
                        screen:'Test2',
                        params:{name:"Test 2 Header"}
                    })
                }}>Go Directly To Test 2 in About</Text>
            </View>

            <View style={styles.forecastContainer}>
                <Text>forecasts</Text>
                
            </View>
            
        </ImageBackground>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        alignItems:"center"
    },
    headerContainer:{
        color:colours.white,
        flex:1,
            alignItems:"center",
            justifyContent:"space-between",
            flexDirection:"row",
        borderWidth:1,
        borderColor:"red",
        width:"90%"
    },
    headerContainerHeading:{
        color:colours.white,
    },
    locationWeatherContainer:{
        // backgroundColor:"grey",
        flex:9,
        width:"100%",
        // height:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    forecastContainer:{
        flex:1,            
            alignItems:"center",
            justifyContent:"center",
        borderWidth:1,
        borderColor:"red"
    }
})