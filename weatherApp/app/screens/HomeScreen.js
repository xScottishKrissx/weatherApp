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
import loading from '../../app/assets/loading.gif'
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({navigation}) {
    
// API Call -------------------------------------------------------------------------------------------
    const [apiData, setApiData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState()
    const [savedLocation, saveLocation] = useState()

    const [searchInProgress, setSearchInProgress] = useState(false)


    const locationToGet = location || savedLocation || "loading"



    const storeData = async (query) => {
        // console.log(x)
        try {
          await AsyncStorage.setItem('queryValue', query);
        } catch (error) {
          // Error saving data
        }
      };

    
      const getData = async () => {
        // console.log("Get Data")
        try {
          const value = await AsyncStorage.getItem('queryValue');
          // console.log(value)
          if (value !== null) {
            // We have data!!
            // console.log(value)
            return saveLocation(value)
          }
        } catch (error) {
          // Error retrieving data
        }
      };

      const doSave = (query) =>{
        // console.log(query)
        // console.log(location)
        // console.log(savedLocation)
        setLocation(query)
        storeData(query)
        getData()
      }
   
    // AsyncStorage.clear()




    useEffect(() => {
        
        // console.log(getData())
        // if(locationToGet === undefined){
        //     getLocation()
        // }
        // fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        // fetch("http://api.openweathermap.org/geo/1.0/direct?q=pollok,gb&limit=5&appid=3021873ba7751f7019c80e409b315b6d")
        
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + locationToGet + "&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log("Fetch Complete 3")
            setApiData(data)
            setLoading(false)
            getData()
        } )
        
        .catch(error => console.log(error))
        
    }, [locationToGet])



    if(apiData === null ) return ( <View><Text>Loading API DATA...</Text></View> ) 
    if(loading === true) return ( <View><Text>Loading LOADING...</Text></View> )
    // if(locationToGet === undefined) return ( <View><Text>Loading...</Text></View> )
    // if(locationToGet === null) return ( <View><Text>Loading...</Text></View> )

    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    // console.log("Location to get: " + locationToGet)
    // console.log("Search In Progress:" + searchInProgress)
    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={10} style={styles.container} source={require("../assets/clearSky.jpg")}>

                {locationToGet === "loading" ? 
                <View>
                  <Search apiData={apiData} setQuery={doSave} searchInProgress={setSearchInProgress}/>
                </View>
                  // <View style={{flex:1, backgroundColor:"black", width:"100%", justifyContent:'center', alignItems:'center'}}>
                  //   <Text style={{color:colours.white}}>Loading...</Text>
                  // </View>
                 : 
                  <>
                    <Title navigation={navigation}/>    
                    <View style={styles.locationWeatherContainer}>
                        {/* <Sunriseset apiData={apiData.city}/> */}
                        <Search apiData={apiData} setQuery={doSave} searchInProgress={setSearchInProgress}/>
                        
                        {searchInProgress ? 
                        <View style={{alignItems:"center", flexDirection:"column"} }>
                          <Text>Searching...</Text>
                          <Image source={require('../assets/loading2.gif')}/>
                        </View>
                          : 
                          <>
                            <CurrentWeather apiData={apiData} />
                            <Forecast apiData={apiData} />
                          </>
                        }


                    </View>
                  </>
                  }

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