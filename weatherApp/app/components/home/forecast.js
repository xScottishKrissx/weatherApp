import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';
import colours from '../../config/colours';

export default function Forecast({apiData}) {
  return (
    <>
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

    </>
  )
}
const styles = StyleSheet.create({
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