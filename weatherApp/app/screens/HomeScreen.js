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
import LoadingScreen from './Loading';

import countryCodes from '../config/countryCodes.json'
import usStateCodes from '../config/usStateCodes.json'

const longCountryName = (countryCode) =>{
  const filterCountry = countryCodes.filter(x => x.Code === countryCode)
  return filterCountry[0].Name
}

const getStateCode = (usState) =>{
  const filterCode = usStateCodes.filter(x => x.name === usState)
  return filterCode[0].abbreviation
}

function HomeScreen({navigation}) {
    
// API Call -------------------------------------------------------------------------------------------
    const [apiData, setApiData] = useState(null)
    const [countryData, setCountryData] = useState()

    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState()
    const [savedLocation, saveLocation] = useState()


    const [searchInProgress, setSearchInProgress] = useState(false)

    const [testStore, setStoreCountry] = useState({
      city:"glasgow",
      state:"",
      country:"GB"
    })

    const locationToGet = location || savedLocation || "loading"



    const storeData = async (query) => {
        // console.log("storeData: " + query)
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
          console.log("In Local Storage:: " + value)
          if (value !== null) {
            // We have data!!
            // console.log(value)
            return saveLocation(value)
          }
        } catch (error) {
          // Error retrieving data

        }
      };

      const doSave = (query, okToSave) =>{
        // console.log("Do Save: " + query, okToSave)
        // console.log(location)
        // console.log(savedLocation)
        // console.log( apiData.cod)
        setLocation(query)
        storeData(query)
        getData()
      }
   
    // AsyncStorage.clear()
      const selectLocation = (city, countryCode, state) =>{
        
        if(countryCode === "US"){
          // console.log("Get State Code")
          // console.log(getStateCode(state))
          setStoreCountry({city:city, country:countryCode, state:getStateCode(state)})
        }else{
          console.log(city, countryCode)
          setStoreCountry({city:city, country:countryCode, state:""})
        }
      }
      const {city, state, country} = testStore
      // const testCountry = country
      const testCity = country === "US" ? city + "," + state : city
      console.log("Search Params: " + testCity+","+country)

    useEffect(() => {
        
        // console.log(getData())
        // if(locationToGet === undefined){
        //     getLocation()
        // }
        // fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        Promise.all([
          fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + locationToGet + "&limit=10&appid=3021873ba7751f7019c80e409b315b6d&units=metric"),
          fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + locationToGet + "&limit=10&appid=3021873ba7751f7019c80e409b315b6d"),
          fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + testCity + "," + country + "&limit=10&appid=3021873ba7751f7019c80e409b315b6d&units=metric"),
        ])
        .then(responses => 
        
          Promise.all(responses.map(response => 
              response.json()
          ))
          
      )
        .then(data => {
            console.log("Fetch Complete 3")
            // Getting Country Info
            // console.log(data[1])r
            // console.log(data[2])



            setApiData(data[2])
            setCountryData(data[1])

            // setStoreCountry(data[2])
            setLoading(false)
            getData()
        } )
        
        .catch(error => console.log(error))
        
    }, [testStore, locationToGet])
    if(apiData === null  || loading === true || countryData === undefined){return <LoadingScreen />}
    if(apiData.city === undefined || apiData.cod === 404 ){
      <Search apiData={apiData} setQuery={doSave} searchInProgress={setSearchInProgress}/>
    }
    // console.log(apiData)


    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    // console.log(testStore.city.country)
    // console.log("Main render: " + apiData.city)
    // console.log("Main Render: " + locationToGet)


    // console.log(countryData)

    // let getCasesFromTimeline = Object.entries(countryData).map(([name,country]) => ({name, country}))
    // console.log(getCasesFromTimeline)
    // const convertCountryDataToArray = Object.entries(countryData)
    // console.log(convertCountryDataToArray)
    // console.log(countryData)
    console.log(apiData.cod)
    const mapNames = countryData.map((x, index) => {
      // return console.log(x.country)
      // console.log(x.country)
      // console.log(x)
      return(
        <View key={index}>
          <Text onPress={()=>selectLocation(x.name, x.country, x.state)}>{x.name},{x.state},{longCountryName(x.country)}</Text>
        </View>
      )
    })

    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={10} style={styles.container} source={require("../assets/clearSky.jpg")}>

                {locationToGet === "loading" ? 
                <View style={{flex:1, justifyContent:"center", width:"90%"}}>
                  <Text>Please enter the name of a city</Text>
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
                        <Search apiData={apiData} setQuery={ doSave } searchInProgress={setSearchInProgress}/>
                        {mapNames}
                        
                        {searchInProgress || apiData.city === undefined || apiData.cod === 404 ? 
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