import React from 'react';

import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {useEffect, useState} from 'react'
import colours from '../config/colours'
// Components
import Title from '../components/home/title';
import Sunriseset from '../components/home/sunriseset';
import CurrentWeather from '../components/home/currentWeather';
import Forecast from '../components/home/forecast';



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
    
    if(loading === true) return ( <View><Text>Loading...</Text></View> )

    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    console.log(apiData.list[0])
    // console.log(apiData.list[0].main.temp)
    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={10} style={styles.container} source={require("../assets/clearSky.jpg")}>

                <Title navigation={navigation}/>    

                <View style={styles.locationWeatherContainer}>
                    <Sunriseset apiData={apiData.city}/>
                    <CurrentWeather apiData={apiData} />
                    <Forecast apiData={apiData} />

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
            </ImageBackground>
        </View>
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
    locationWeatherContainer:{
        flex:9,
        marginTop:30,
        width:colours.contentAreaWidth
    },
      borderTest:{
        borderWidth:1,
        borderColor:"red",
    }
    
})