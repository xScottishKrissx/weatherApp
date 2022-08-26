import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';
import colours from '../../config/colours';

export default function Forecast({apiData}) {
  return (
    <>
        <Text style={{fontSize:20}}>Forecast</Text>
        <FlatList
            // numColumns={2}
            style={{flex:1, width:"100%"}}
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

                const {temp, humidity} = item.main
                const{description} = item.weather[0]

                const icon = apiData.list[index].weather[0].icon
                console.log(icon)
                // if(getTime.includes("AM"))icon.replace('d', 'n')
                // if(getTime.includes("PM"))icon.replace('n', 'd')
                
                
                

                return(
                    
                        <View style={[styles.forecastItemRow]} key={index}>
                            
                            <View style={styles.forecastItem}>
                                <Text>{displayDate}</Text>
                            </View>

                            <View style={styles.forecastItem}>
                                <Text>{getTime}</Text>
                            </View>
                            
                            <View style={styles.forecastItem}>
                                <Text>{temp}&#176;c</Text>
                            </View>

                            <View style={styles.forecastItem}>
                                {/* <Text style={{textAlign:"center"}}>{description}</Text> */}
                                <Image source={{uri:'http://openweathermap.org/img/wn/' + icon + '@2x.png'}} style={{width:50, height:50}} />
                            </View>

                            <View style={styles.forecastItem}>
                                <Text>Humidity</Text>
                                <Text>{humidity}%</Text>
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
    forecastItemRow:{
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },
    forecastItem:{
        alignItems:"center",
        width:"20%"
    },
    borderTest:{
        borderWidth:1,
        borderColor:"red",
    }
})