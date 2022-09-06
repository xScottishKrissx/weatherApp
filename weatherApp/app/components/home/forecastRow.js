import React, {useState, memo } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import colours from '../../config/colours';

function formatTemp(temperature){ return Math.floor(temperature) }
function formatWind(windSpeed){return Math.floor(windSpeed * 2.237) }

const ForecastRow = ({item, index}) => {

    const [isActive, setIsActive] = useState(false)
    function toggleQuestions(questionIndex){
        if(isActive === questionIndex){
            setIsActive(false)
        }else{
            setIsActive(questionIndex)
        }
    }

    // console.log("ForecastRow.js")
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
    
    // API data
    const {temp, humidity, temp_max, temp_min, feels_like} = item.main
    const {description} = item.weather[0]
    const icon = item.weather[0].icon
   
    return(
        <TouchableOpacity 
            onPress={()=> toggleQuestions(index)} 
            activeOpacity={2}
            >
            <View style={[styles.forecastItemRowWrapper]}>
               
                <View 
                    style={[
                        styles.forecastItemRow,
                        
                        styles.visibleData,
                        index === isActive ? styles.showRow : null 
                    ]} 
                    // key={index} 
                    // onPress={() => toggleQuestions(index)}
                >
                    <View style={styles.forecastItem}> 
                        <Text style={styles.visibleForecastItemText}>{displayDate}</Text> 
                    </View>

                    <View style={styles.forecastItem}> 
                        <Text style={styles.visibleForecastItemText}>{getTime}</Text> 
                    </View>

                    <View style={styles.forecastItem}> 
                        <Text style={styles.visibleForecastItemText}>{formatTemp(temp)}&#176;c</Text> 
                    </View>

                    <View style={styles.forecastItem}>
                        <Image source={{uri:'http://openweathermap.org/img/wn/' + icon + '@2x.png'}} style={{width:50, height:50}} />
                    </View>
                    
                    <View style={styles.forecastItem}>
                        <Text style={styles.visibleForecastItemText}>{humidity}%</Text>
                    </View>

                </View>    
                
                <View 
                    style={[styles.hiddenData, index === isActive ? styles.showHiddenData : null ]}
                    >
                    <View style={styles.forecastItem}>
                        <Text style={styles.hiddenForecastItemText}>Min</Text>
                        <Text style={styles.hiddenForecastItemText}>{formatTemp(temp_min)}&#176;</Text>
                    </View>
                    <View style={styles.forecastItem}>
                        <Text style={styles.hiddenForecastItemText}>Max</Text>
                        <Text style={styles.hiddenForecastItemText}>{formatTemp(temp_max)}&#176;</Text>
                    </View>

                    <View style={styles.forecastItem}>
                        <Text style={styles.hiddenForecastItemText}>Feels</Text>
                        <Text style={styles.hiddenForecastItemText}>{formatTemp(feels_like)}&#176;</Text>
                    </View>
                    <View style={styles.forecastItem}>
                        <Text style={styles.hiddenForecastItemText}>{description}</Text>
                    </View>
                    <View style={styles.forecastItem}>
                        <Text style={styles.hiddenForecastItemText}>Wind</Text>
                        <Text style={styles.hiddenForecastItemText}>{formatWind(item.wind.gust)}mph</Text>
                    </View>
                </View>

            

            </View>
        </TouchableOpacity>
        )
}

export default memo(ForecastRow)
// export default ForecastRow

const styles = StyleSheet.create({
    forecastItemRowWrapper:{
        // backgroundColor:"blue",
        justifyContent:"space-between",
        // alignItems:"center",
        flexDirection:"column",
    
        
    },  
    forecastItemRow:{
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },
    forecastItem:{
       
        alignItems:"center",
        textAlign:'center',
        width:"20%"
    },
    borderTest:{
        borderWidth:1,
        borderColor:"red",
    },
    showRow:{
        height:50,
        // backgroundColor:"green",
        opacity:1,
        
        borderLeftWidth:1,
        borderTopWidth:1,
        borderRightWidth:1,
        borderColor:"grey",
        
    },
    hiddenData:{
        flexDirection:"row",
        display:"none",
        opacity:0
    },
    showHiddenData:{
        backgroundColor:"grey",
        display:"flex",
        opacity: 1,
        color:"white"
    },
    visibleForecastItemText:{
        color:"black"
    },
    hiddenForecastItemText:{
        color:colours.white
    }
})