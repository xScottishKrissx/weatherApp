import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';
import colours from '../../config/colours';
import MatIcons from '@expo/vector-icons/MaterialIcons'
import FeatherIcons from '@expo/vector-icons/Feather'
import { TextInput } from 'react-native-gesture-handler';
import Search from './Search/search';

// Data from https://datahub.io/core/country-list#resource-country-list_zip
import countryCodes from '../../config/countryCodes.json'

const longCountryName = (countryCode) =>{
    const filterCountry = countryCodes.filter(x => x.Code === countryCode)
    return filterCountry[0].Name
}

function formatTemp(temperature){ return Math.floor(temperature) }
export default function CurrentWeather({apiData, setQuery}) {
    // console.log("Render Current Weather")

    // console.log(apiData)
    if(!apiData.city) 
        return(
            <View>
                <Text>Error</Text>
            </View>
        )
    
    const {country, name, population} = apiData.city
    
    const {lat, lon} = apiData.city.coord
    const {temp, temp_max, temp_min, humidity, feels_like} = apiData.list[0].main
    
    const {gust} = apiData.list[0].wind 
    const windSpeed = Math.floor(gust * 2.237)
    
    const {description, icon} = apiData.list[0].weather[0]
    
    
    const citName = name || "placeholder"
    // console.log("--------------------------->" + citName)

  return (
    <>
        {/* Search Form */}
        {/* <View style={styles.rowStyle}>
            <TextInput 
                onChangeText={(value) => test(value)}
                placeholder={citName}
            />
            <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
        </View> */}
        {/* <Search currentLocation={citName} setQuery={setQuery} /> */}

{/* Display Current Forecast */}
        {/* <Text>Current Weather</Text> */}
        <View style={[styles.rowStyle, styles.forecastPeriod]}>
            {/* <Text style={{fontSize:20}}>{citName}, {country}</Text> */}
            <Text style={{fontSize:20}}>{citName}, {longCountryName(country)} </Text>
            <Text style={{fontSize:20}}>Lat: {lat} | Long: {lon}</Text>
        </View>

        <View style={[styles.rowStyle, styles.weatherReport]}>

                <View style={[styles.tempDisplay]}>
                    {/* <Text style={styles.borderTest}><FeatherIcons name="cloud" size={100} color="white" /></Text> */}
                    <Image source={{uri:'http://openweathermap.org/img/wn/' + icon + '@2x.png'}} style={{width:100, height:100}} />
                    <Text style={{fontSize:50, color:"white", fontWeight:"900"}}>{formatTemp(temp)}&#176;</Text>
                </View>

                <View style={[styles.tempDisplay]}>
                    <Text style={{fontSize:40, color:"white", fontWeight:"900"}}>{description}</Text>
                    {/* <Text style={{fontSize:40, color:"white", fontWeight:"900"}}>thunderstorm with heavy drizzle</Text> */}
                </View>

                {/* <Text style={[styles.descriptionDisplay, styles.borderTest]}>{description}</Text> */}


                <View style={[styles.extraInformation]}>
                    <Text style={styles.extraInformationDisplayText}>Min Temp: {formatTemp(temp_min)}&#176;</Text>
                    <Text style={styles.extraInformationDisplayText}>Max Temp: {formatTemp(temp_max)}&#176;</Text>
                    <Text style={styles.extraInformationDisplayText}>Humidity: {humidity}%</Text>
                    <Text style={styles.extraInformationDisplayText}>Wind Speed: {windSpeed}mph</Text>
                    <Text style={styles.extraInformationDisplayText}>Feels Like: {formatTemp(feels_like)}&#176;</Text>
                </View>
        </View>

    </>

  )
}

const styles = StyleSheet.create({
    rowStyle:{
        flexDirection:'row',
        alignItems:"center",
        marginBottom:10,
    },
    forecastPeriod:{
        justifyContent:"space-between",
        flexDirection:"column",
        alignContent:"flex-start",
        alignItems:"flex-start",
    },
    weatherReport:{
        justifyContent:"center",
        flexDirection:"column",
        // backgroundColor:"red",
    },
    borderTest:{
        borderWidth:1,
        borderColor:"red",
    },
    descriptionDisplay:{
        color:"white", 
        justifyContent:"center", 
        textAlign:"center",
        marginTop:20,
        marginBottom:20
    },
    tempDisplay:{
        // backgroundColor:"red",
        // marginLeft:15
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        width:"100%",

    },  
    extraInformation:{
        // backgroundColor:"red",
        alignItems:"center", 
        justifyContent:"space-between", 
        flexDirection:"row",
        flexWrap:"wrap",
        width:"100%",
        paddingTop:10,
        paddingBottom:10
    },
    extraInformationDisplayText:{
        color:colours.white, 
        textAlign:"center",
        width:"50%", 
    },
})