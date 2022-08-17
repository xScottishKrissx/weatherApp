import React from 'react';

import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {useEffect, useState} from 'react'
import colours from '../config/colours'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MatIcons from '@expo/vector-icons/MaterialIcons'
import FeatherIcons from '@expo/vector-icons/Feather'

function HomeScreen({navigation}) {
    
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
    
    if(loading === true) return (
        <View><Text>Loading...</Text></View>
    )
    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    console.log(apiData.city.sunrise)
    const temp = Math.floor(apiData.list[0].main.temp)
    const humidity = apiData.list[0].main.humidity
    const citName = apiData.city.name
    const description = apiData.list[0].weather[0].description
    const windSpeed = Math.floor(apiData.list[0].wind.gust * 2.237)
    const sunrise = apiData.city.sunrise
    const sunset = apiData.city.sunset
    

// Static Work

    return (
        <ImageBackground blurRadius={10} style={styles.container} source={require("../assets/clearSky.jpg")}>
            
            <View style={styles.headerContainer}>
                <MatIcons name='menu' size={32} color='white' onPress={()=>navigation.toggleDrawer()}/>
                <Text style={styles.headerContainerHeading}>The Weather</Text>
                <MatIcons name='search' size={32} color='white' />
                
            </View>        

            <View style={styles.locationWeatherContainer}>
{/* 1st Row */}
                <View style={styles.rowStyle}> 
                    <MatIcons name='loop' size={16} color='white' />
                    <Text style={{paddingLeft:10}}>Updated a moment ago</Text>
                </View>
{/* 2nd Row */}
                <View style={styles.rowStyle}>
                    <Text style={{fontSize:35}}>{citName}</Text>
                    <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
                </View>
{/* 3rd Row */}

                <View style={[styles.rowStyle, styles.forecastPeriod]}>
                    <Text style={{fontSize:20}}>Next Hour</Text>
                    <Text style={{fontSize:11}}>{sunrise} - {sunset}</Text>
                </View>
{/* 4th Row */}

                <View style={[styles.rowStyle, styles.weatherReport]}>

                        <Text><FeatherIcons name="cloud" size={180} color="white" /></Text>

                        <View>
                            <Text style={{fontSize:50, color:"white", fontWeight:"900",}}>{temp}&#176;</Text>
                            <View>
                                
                                <Text>Humidity: {humidity}%</Text>
                                <Text><FeatherIcons name="wind" size={32} color="white" />{windSpeed}mph</Text>
                            </View>
                        </View>
                </View>
{/* 5th Row */}
                <Text style={{justifyContent:"center", color:"white", textAlign:"center"}}>{description}</Text>
                {/* There are not weather warnings in openWeatherAPi */}
                {/* <Text>Weather Warnings</Text> */}



                {/* Nav */}
                {/* <Text>-- Nav Test --</Text>
                <Text onPress={()=>navigation.push("AboutScreen")}>Navigate To About Screen</Text>
                <Text onPress={()=>navigation.push("Test", {name:"Test 1 Header"})}>Go To Test</Text> */}

                {/* Navigate across stacks Home to About */}
                {/* <Text onPress={()=>{
                    navigation.navigate('About',{
                        screen:'Test2',
                        params:{name:"Test 2 Header"}
                    })
                }}>Go Directly To Test 2 in About</Text> */}
            </View>

            {/* <View style={styles.forecastContainer}>
                <Text>forecasts</Text>
            </View> */}
            
        </ImageBackground>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        alignItems:"center",
        blurRadius:1
        
    },
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
    locationWeatherContainer:{
        // backgroundColor:"grey",
        flex:9,
        marginTop:30,
        width:colours.contentAreaWidth
    },
    rowStyle:{
        flexDirection:'row',
        alignItems:"center",
        marginBottom:10
    },
    forecastContainer:{
        flex:1,            
            alignItems:"center",
            justifyContent:"center",
        borderWidth:1,
        borderColor:"red",
        width:colours.contentAreaWidth
    },
    forecastPeriod:{
        justifyContent:"space-between"
    },
    weatherReport:{
        justifyContent:"center",
        flexDirection:"column",
        // backgroundColor:"red",
    },
    borderTest:{
        borderWidth:1,
        borderColor:"red",
    }
    
})