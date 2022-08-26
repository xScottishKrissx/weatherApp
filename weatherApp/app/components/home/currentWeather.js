import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';
import colours from '../../config/colours';
import MatIcons from '@expo/vector-icons/MaterialIcons'
import FeatherIcons from '@expo/vector-icons/Feather'



export default function CurrentWeather({apiData}) {

    const citName = apiData.city.name
    const temp = Math.floor(apiData.list[0].main.temp)
    const minTemp = Math.floor(apiData.list[0].main.temp_min)
    const maxTemp = Math.floor(apiData.list[0].main.temp_max)
    const humidity = apiData.list[0].main.humidity
    const windSpeed = Math.floor(apiData.list[0].wind.gust * 2.237)
    const description = apiData.list[0].weather[0].description
    const icon = apiData.list[0].weather[0].icon

  return (
    <>
    
        <View style={styles.rowStyle}>
            <Text style={{fontSize:35}}>{citName}</Text>
            <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
        </View>

        <View style={[styles.rowStyle, styles.forecastPeriod]}>
            <Text style={{fontSize:20}}>Current</Text>
        </View>

        <View style={[styles.rowStyle, styles.weatherReport]}>

                <View style={[styles.tempDisplay]}>
                    {/* <Text style={styles.borderTest}><FeatherIcons name="cloud" size={100} color="white" /></Text> */}
                    <Image source={{uri:'http://openweathermap.org/img/wn/' + icon + '@2x.png'}} style={{width:100, height:100}} />
                    <Text style={{fontSize:50, color:"white", fontWeight:"900"}}>{temp}&#176;</Text>
                </View>

                <View style={[styles.tempDisplay]}>
                    <Text style={{fontSize:40, color:"white", fontWeight:"900"}}>{description}</Text>
                    {/* <Text style={{fontSize:40, color:"white", fontWeight:"900"}}>thunderstorm with heavy drizzle</Text> */}
                </View>

                {/* <Text style={[styles.descriptionDisplay, styles.borderTest]}>{description}</Text> */}


                <View style={[styles.extraInformation]}>
                    <Text style={styles.extraInformationDisplayText}>Min Temp: {minTemp}&#176;</Text>
                    <Text style={styles.extraInformationDisplayText}>Max Temp: {maxTemp}&#176;</Text>
                    <Text style={styles.extraInformationDisplayText}>Humidity: {humidity}%</Text>
                    <Text style={styles.extraInformationDisplayText}>Wind Speed: {windSpeed}mph</Text>
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