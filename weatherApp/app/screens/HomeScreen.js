import React from 'react';

import { StyleSheet, Text, View, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';
import {useEffect, useState} from 'react'
import colours from '../config/colours'
// import Ionicons from '@expo/vector-icons/Ionicons';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
// import MatIcons from '@expo/vector-icons/MaterialIcons'
// import FeatherIcons from '@expo/vector-icons/Feather'
import Title from '../components/home/title';
import Sunriseset from '../components/home/sunriseset';
import CurrentWeather from '../components/home/currentWeather';



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
    // console.log(apiData)
    // console.log(apiData.list[0])
    
    
    console.log(apiData.list[0].main.temp)

    


    // const temp = Math.floor(apiData.list[0].main.temp)
    // const minTemp = Math.floor(apiData.list[0].main.temp_min)
    // const maxTemp = Math.floor(apiData.list[0].main.temp_max)
    // const humidity = apiData.list[0].main.humidity
    // const citName = apiData.city.name
    // const description = apiData.list[0].weather[0].description
    // const windSpeed = Math.floor(apiData.list[0].wind.gust * 2.237)

    // const sunrise = new Date(apiData.city.sunrise * 1000).toLocaleTimeString('en-GB')    
    // const sunset = new Date(apiData.city.sunset * 1000).toLocaleTimeString('en-GB');




// Static Work

    return (
        <View style={styles.container}>

        <ImageBackground blurRadius={10} style={styles.container} source={require("../assets/clearSky.jpg")}>
            
            {/* <View style={styles.headerContainer}>
                <MatIcons name='menu' size={32} color='white' onPress={()=>navigation.toggleDrawer()}/>
                <Text style={styles.headerContainerHeading}>The Weather</Text>
                <MatIcons name='search' size={32} color='white' />
            </View>     */}
            <Title navigation={navigation}/>    
            
            <View style={styles.locationWeatherContainer}>
{/* 1st Row */}
                {/* <View style={styles.rowStyle}> 
                    <MatIcons name='loop' size={16} color='white' />
                    <Text style={{paddingLeft:10}}>Updated a moment ago</Text>
                </View> */}

               {/* <View style={[styles.rowStyle, styles.sun]}>
                    <View style={{fontSize:15, color:colours.white, flexDirection:"row"}}>
                        <FeatherIcons name="sunrise" size={20} color="white" /> 
                        <Text style={{marginLeft:10, color:colours.white }}>{sunrise}</Text>
                    </View>

                    <View style={{fontSize:15, flexDirection:"row"}}>
                        <FeatherIcons name="sunset" size={20} color="white" /> 
                        <Text style={{marginLeft:10, color:colours.white }}>{sunset}</Text>
                    </View>
               </View> */}
               <Sunriseset apiData={apiData.city}/>
               <CurrentWeather apiData={apiData} />
{/* 
                <View style={styles.rowStyle}>
                    <Text style={{fontSize:35}}>{citName}</Text>
                    <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
                </View>


                <View style={[styles.rowStyle, styles.forecastPeriod]}>
                    <Text style={{fontSize:20}}>Current</Text>
                </View>


                <View style={[styles.rowStyle, styles.weatherReport, styles.borderTest]}>

                        <View style={[styles.tempDisplay, styles.borderTest]}>
                            <Text style={styles.borderTest}><FeatherIcons name="cloud" size={100} color="white" /></Text>
                            <Text style={{fontSize:50, color:"white", fontWeight:"900"}}>{temp}&#176;</Text>
                        </View>

                        <Text style={[styles.descriptionDisplay, styles.borderTest]}>{description}</Text>


                        <View style={[styles.extraInformation, styles.borderTest]}>
                            <Text style={styles.extraInformationDisplayText}>Min Temp: {minTemp}&#176;</Text>
                            <Text style={styles.extraInformationDisplayText}>Max Temp: {maxTemp}&#176;</Text>
                            <Text style={styles.extraInformationDisplayText}>Humidity: {humidity}%</Text>
                            <Text style={styles.extraInformationDisplayText}>Wind Speed: {windSpeed}mph</Text>
                        </View>

                </View> */}

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
            <Text style={{fontSize:20}}>Forecast</Text>
            <FlatList
                // numColumns={2}
                style={{flex:1, borderWidth:1, borderColor:"red", width:"100%"}}
                data={apiData.list}
                renderItem={({item,index}) => {
                    
                    const dateOptions = {weekday:"short"}
                    const getDate = new Date(item.dt * 1000).toLocaleDateString([], dateOptions)

                    // Credit -> https://stackoverflow.com/a/44418732
                    const getOrdinalNum = (number) => {
                        let selector;
                        if (number <= 0) { selector = 4;
                        } else if ((number > 3 && number < 21) || number % 10 > 3) { selector = 0;
                        } else { selector = number % 10; }
                        return number + ['th', 'st', 'nd', 'rd', ''][selector];
                      };

                      let getDayNum = new Date(item.dt * 1000)
                      const displayDate = getDate + " " + getOrdinalNum(getDayNum.getDate())
                          
                    // Time            
                    const timeOptions = {hour:"numeric", hour12:true }
                    const getTime = new Date(item.dt * 1000).toLocaleTimeString([], timeOptions) 


                    return(
                        
                            <View style={[styles.forecastItem, styles.borderTest]} key={index}>
                                
                                <View style={{borderWidth:1, borderColor:"red", width:"20%", alignItems:"center"}}>
                                    <Text>{displayDate}</Text>
                                    {/* <Text>{getDay} {months[getMonth]}</Text> */}
                                    {/* <Text>{thing} </Text> */}
                                </View>

                                <View style={{borderWidth:1, borderColor:"red", width:"20%", alignItems:"center"}}>
                                    <Text>{getTime}</Text>
                                </View>
                                
                                <View style={{borderWidth:1, borderColor:"red", width:"20%", alignItems:"center"}}>
                                    <Text>{item.main.temp}&#176;c</Text>
                                </View>

                                <View style={{alignItems:"center", borderWidth:1, borderColor:"red", width:"20%"}}>
                                    <Text>Icon</Text>
                                    <Text style={{textAlign:"center"}}>{item.weather[0].description}</Text>
                                </View>

                                <View style={{alignItems:"center", borderWidth:1, borderColor:"red", width:"20%"}}>
                                    <Text>Humidity</Text>
                                    <Text>{item.main.humidity}%</Text>
                                </View>

                            </View>
                        )
                    }
                    
                }
                />
            </View>

            
    
{/* </ScrollView> */}
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
        marginBottom:10,
    },
    sun:{
        alignItems:"center", 
        flexDirection:"row",
        justifyContent:"space-evenly", 
        width:"100%", 
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
        width:"100%"
    },  

    extraInformation:{
        // backgroundColor:"red",
        alignItems:"center", 
        justifyContent:"space-between", 
        flexDirection:"row",
        flexWrap:"wrap",
        width:"100%"
    },
    extraInformationDisplayText:{
        color:colours.white, 
        textAlign:"center",
        width:"50%", 
    },

    forecastItem:{
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },

    borderTest:{
        borderWidth:1,
        borderColor:"red",
    }
    
})