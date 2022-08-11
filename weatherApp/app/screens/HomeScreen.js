import React from 'react';

import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {useEffect, useState} from 'react'
import colours from '../config/colours'

function HomeScreen(props) {
    
// API Call -------------------------------------------------------------------------------------------
    const [apiData, setApiData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        .then(res => {
            return res.json()
        })
        .then(data => {
            setApiData(data)
            setLoading(false)
        } )
        .catch(error => console.log(error))
        
    }, [])
    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    console.log(apiData)
    // const temp = apiData.list[0].main.temp
    // const citName = apiData.city.name

// Static Work

    return (
        <ImageBackground style={styles.container} source={require("../assets/clearSky.jpg")}>
            
            <View style={styles.headerContainer}>
                <Text>Header</Text>
            </View>        

            <View style={styles.locationWeatherContainer}>
                <Text>Glasgow</Text>
                <Text>25 degrees</Text>
            </View>

            <View style={styles.forecastContainer}>
                <Text>forecast</Text>
            </View>
        </ImageBackground>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%"
    },


    headerContainer:{
        flex:1,
            alignItems:"center",
            justifyContent:"center",
        borderWidth:1,
        borderColor:"red"
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