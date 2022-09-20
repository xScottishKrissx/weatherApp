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
  //  Reset
  // AsyncStorage.clear()


// API Call -------------------------------------------------------------------------------------------
    const [apiData, setApiData] = useState(null)
    const [countryData, setCountryData] = useState()

    const [loading, setLoading] = useState(false)
    const [savedLocation, saveLocation] = useState()
    const [location, setLocation] = useState(savedLocation || "loading")

    const getData = async () => {
      // console.log("Get Data")
      try {
        const value = await AsyncStorage.getItem('queryValue');
        // console.log("In Local Storage:: " + value)
        if (value !== null) {
          // We have data!!
          // console.log(value)
          return saveLocation(value)
        }
      } catch (error) {
        // Error retrieving data

      }
    };
    // getData()

    const [searchInProgress, setSearchInProgress] = useState(false)
    const locationToGet = location || savedLocation || "loading"
    console.log("Location to get:" + locationToGet)

    const storeData = async (query) => {
        // console.log("storeData: " + query)
        try {
          await AsyncStorage.setItem('queryValue', query);
        } catch (error) {
          // Error saving data
        }
      };

      const doSave = (query, okToSave) =>{
        console.log("Do Save: " + query)
        setLocation(query)
        // saveLocation(query)
        storeData(query)
        getData()
      }

      const [selectedCity, setStoreCountry] = useState({
        city: savedLocation || "....",
        state:"",
        country:""
      })
   

      const selectLocation = (city, countryCode, state) =>{
        // console.log("Check:: >>>>>" + apiData.city.name, savedLocation, city)
        // console.log("City: " + city)
        // setLocation(city)
        if(countryCode === "US"){
          setStoreCountry({city:city, country:countryCode, state:getStateCode(state)})
          storeData(city)
          setSearchInProgress(false)
          setLocation(city)
          // console.log("Is US")
        }else{
          setStoreCountry({city:city, country:countryCode, state:""})
          storeData(city)
          // console.log("Is NOT US")
          setSearchInProgress(false)
          setLocation(city)
        }
      }

      const {city, state, country} = selectedCity
      const querySelectedCity = country === "US" ? savedLocation + "," + state : savedLocation

    useEffect(() => {
  
        Promise.all([
          // Weather forecast
          fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + locationToGet + "&limit=10&appid=3021873ba7751f7019c80e409b315b6d"),
          // List of countries
          fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + querySelectedCity + "," + country + "&limit=10&appid=3021873ba7751f7019c80e409b315b6d&units=metric"),
        ])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
          ("Fetch Complete 3")

          // List of possible countries
          setCountryData(data[0])

          // Weather for a specific country
          setApiData(data[1])

          setLoading(false)
          getData()
      }) 
      .catch(error => console.log(error))
    }, [selectedCity, locationToGet, querySelectedCity])

    if(
      apiData === null  
      || countryData === undefined 
      || loading === true 
      || locationToGet === undefined 

      // This breaks the mobile app
      // || savedLocation === undefined 
      // || querySelectedCity === undefined
      ){return <LoadingScreen />}


    if(apiData.city === undefined || apiData.cod === 404 ){
      <View>
        <Text>Test 1</Text>
        <Search 
          apiData={apiData} 
          setQuery={doSave} 
          searchInProgress={setSearchInProgress}
          isSearchInProgress={searchInProgress}
        />
      </View>
    }

    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    console.log("Saved Location: " + savedLocation)
    const mapNames = countryData.map((x, index) => {
      return(
        <View key={index}>
          <Text 
            onPress={ () =>{
                selectLocation(x.name, x.country, x.state)
                // setSearchInProgress(false)
              }
          }>
              {x.name},{x.state},{longCountryName(x.country)}
          </Text>
        </View>
      )
    })

    // console.log(apiData.city)

    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={10} style={styles.container} source={require("../assets/clearSky.jpg")}>

                {locationToGet === "loading" ? 
                <View style={{flex:1, justifyContent:"center", width:"90%"}}>
                  <Text>Please enter the name of a city</Text>
                  <Search 
                    apiData={apiData} 
                    setQuery={doSave} 
                    searchInProgress={setSearchInProgress}
                    isSearchInProgress={searchInProgress}
                    />
                </View>
                 : 
                  <>
                    <Title navigation={navigation}/>    
                    <View style={styles.locationWeatherContainer}>
                        {/* <Sunriseset apiData={apiData.city}/> */}
                        
                        <Text>Test 2</Text>
                        <Search 
                          apiData={apiData} 
                          setQuery={ doSave } 
                          searchInProgress={setSearchInProgress}
                          isSearchInProgress={searchInProgress}
                        />

                        
                        {
                          searchInProgress 
                          || apiData.city === undefined
                          || apiData.cod === 404
                          // This removes that second of seeing the previous city when searhcing, but will also stop the weather from loading on reload.
                          // || apiData.city.name !== selectedCity.city 
                          || savedLocation === undefined 
                          ? 
                          <>
                          {mapNames}
                          <View style={{alignItems:"center", flexDirection:"column"} }>
                            <Text>Searching...</Text>
                            <Image source={require('../assets/loading2.gif')}/>
                          </View>
                          
                          </>
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