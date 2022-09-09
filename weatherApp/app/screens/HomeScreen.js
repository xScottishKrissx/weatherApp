import React from 'react';

import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {useEffect, useState} from 'react'
import colours from '../config/colours'
// Components
import Title from '../components/home/title';
import Sunriseset from '../components/home/sunriseset';
import CurrentWeather from '../components/home/currentWeather';
import Forecast from '../components/home/Forecast/forecast';
import Search from '../components/home/Search/search';

function HomeScreen({navigation}) {
    
// API Call -------------------------------------------------------------------------------------------
    const [apiData, setApiData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState()

    const [errorMsg, setErrorMsg] = useState(false)

    const tempThing = location || "glasgow"

    useEffect(() => {
        // fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        // fetch("http://api.openweathermap.org/geo/1.0/direct?q=pollok,gb&limit=5&appid=3021873ba7751f7019c80e409b315b6d")
        
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + tempThing + "&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log("Fetch Complete")
            // console.log(data.list[0])
            // const mapThing = data.list.map(x =>{
            //     delete x.clouds
            //     delete x.main.grnd_level
            //     delete x.main.pressure
            //     delete x.main.sea_level
            //     delete x.main.temp_kf
            //     delete x.rain
            //     delete x.pop
            //     delete x.sys
            //     delete x.visibility
            //     delete x.visibility
            //     return x
            // })
            
            // // console.log(data.city)
            // // console.log(mapThing[15])

            setApiData(data)
            // setLoading(false)
        } )
        
        .catch(error => console.log(error))
        
    }, [location])

    console.log(apiData)

    if(apiData === null ) {
        return ( <View><Text>Loading...</Text></View> )
    }

    let displayMsg;
    if(apiData.cod === "404"){
        displayMsg = true
        return null;
    }
    console.log("DisplayMsg: " + displayMsg)

    // console.log(apiData.city.name)
    const updateApi = (query) =>{
    console.log("UpdateAPI Fired")
        if(apiData){
            if(apiData.cod === "404"){
                // console.log("Error: 404")
                setLoading(true)
            }else{
                // console.log("Success")
                // console.log(data)
                // setApiData(query)
                setLocation(query)
                setLoading(false)
                // console.log(data.list[0].main.temp)
            }
        }else{
            // console.log("Escape")
        }
    }


    // console.log(loading)
    if(loading === true) return ( <View><Text>Loading...</Text></View> )

    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    // console.log(apiData.list[0])
    // console.log(location)
    // const updateData = (a) =>{
    //     console.log("City Name: " + a.city.name)
    //     setApiData(a)
    // }
    // console.log(apiData.city.name)
    // console.log(apiData.list[0])

    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={10} style={styles.container} source={require("../assets/clearSky.jpg")}>

                <Title navigation={navigation}/>    

                <View style={styles.locationWeatherContainer}>
                    {/* <Sunriseset apiData={apiData.city}/> */}
                    <View>
                        <Text>
                            {displayMsg === true ? "Please Enter A Valid search term" : null}
                        </Text>
                    </View>
                    <Search currentLocation={location}  setQuery={updateApi} />
                    <CurrentWeather apiData={apiData} />
                    {/* <Forecast apiData={apiData} /> */}

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