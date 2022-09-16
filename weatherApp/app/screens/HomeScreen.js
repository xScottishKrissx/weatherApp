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
    const [savedLocation, saveLocation] = useState()
    const [location, setLocation] = useState(savedLocation || "")

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

    const [searchInProgress, setSearchInProgress] = useState(false)



    const locationToGet = location || savedLocation || "loading"
    console.log("Location to Get:" + locationToGet)


    const storeData = async (query) => {
        // console.log("storeData: " + query)
        try {
          await AsyncStorage.setItem('queryValue', query);
        } catch (error) {
          // Error saving data
        }
      };

    


      const doSave = (query, okToSave) =>{
        // console.log("Do Save: " + query, okToSave)
        // console.log(location)
        // console.log(savedLocation)
        // console.log( apiData.cod)
        setLocation(query)
        storeData(query)
        // getData()
      }

      // console.log("")
      console.log("Saved Location: " + savedLocation)
      const [testStore, setStoreCountry] = useState({
        city: savedLocation || "....",
        state:"",
        country:""
      })
   
    // AsyncStorage.clear()
      const selectLocation = (city, countryCode, state) =>{
        if(countryCode === "US"){
          // console.log("Get State Code")
          // console.log(getStateCode(state))
          setStoreCountry({city:city, country:countryCode, state:getStateCode(state)})
        }else{
          // console.log(city, countryCode)
          setStoreCountry({city:city, country:countryCode, state:""})
        }
      }

      const {city, state, country} = testStore
      // const testCountry = country
      // console.log(city)
      const testCity = country === "US" ? savedLocation + "," + state : savedLocation
      console.log("Search Params: " + testCity + "," +country)

    useEffect(() => {
        
        // console.log(getData())
        // if(locationToGet === undefined){
        //     getLocation()
        // }
        // fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        Promise.all([
          // fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + locationToGet + "&limit=10&appid=3021873ba7751f7019c80e409b315b6d&units=metric"),
          fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + locationToGet + "&limit=10&appid=3021873ba7751f7019c80e409b315b6d"),

          // List
          fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + testCity + "," + country + "&limit=10&appid=3021873ba7751f7019c80e409b315b6d&units=metric"),
        ])
        .then(responses => 
        
          Promise.all(responses.map(response => 
              response.json()
          ))
          
      )
        .then(data => {
            ("Fetch Complete 3")
            // Getting Country Info
            // console.log(data[1])r
            // console.log(data[2])


            // List of possible countries
            setCountryData(data[0])

            // Weather for a specific country
            setApiData(data[1])

            // setStoreCountry(data[2])
            setLoading(false)
            getData()
        } )
        
        .catch(error => console.log(error))
        
    }, [testStore, locationToGet])
    if(apiData === null  || loading === true || countryData === undefined ){return <LoadingScreen />}
    // console.log(apiData.city)
    if(apiData.city === undefined || apiData.cod === 404 ){
      <View>
        <Text>Test 1</Text>
        <Search 
          apiData={apiData} 
          setQuery={doSave} 
          searchInProgress={setSearchInProgress}
        />

      </View>
    }
    // console.log(apiData)


    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")

    const mapNames = countryData.map((x, index) => {
      // return console.log(x.country)
      // console.log(x.country)
      // console.log(x)
      return(
        <View key={index}>
          <Text 
            onPress={ () =>{
                selectLocation(x.name, x.country, x.state)
                setSearchInProgress(false)
              }
            }>
              {x.name},{x.state},{longCountryName(x.country)}</Text>
        </View>
      )
    })

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
                    />
                </View>
                  // <View style={{flex:1, backgroundColor:"black", width:"100%", justifyContent:'center', alignItems:'center'}}>
                  //   <Text style={{color:colours.white}}>Loading...</Text>
                  // </View>
                 : 
                  <>
                    <Title navigation={navigation}/>    
                    <View style={styles.locationWeatherContainer}>
                        {/* <Sunriseset apiData={apiData.city}/> */}
                        
                        <Text>Test 2</Text>
                        <Search 
                          apiData={apiData} 
                          setQuery={ doSave } 
                          // setQuery={ (value)=>console.log(value) } 
                          searchInProgress={setSearchInProgress}
                        />

                        
                        {searchInProgress || apiData.city === undefined || apiData.cod === 404 ? 
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