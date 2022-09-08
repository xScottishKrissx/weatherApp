import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MatIcons from '@expo/vector-icons/MaterialIcons'

export default function Search({currentLocation, sendData}) {

    // console.log("Current: " + currentLocation)

    const [data, setData] = useState()

    const [input, setInput] = useState()
    const [query, setQuery] = useState()

    // Current Location is default to Glasgow until i implement storage.
    const location = query || currentLocation
    useEffect(() => {
        // fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        // fetch("http://api.openweathermap.org/geo/1.0/direct?q=pollok,gb&limit=5&appid=3021873ba7751f7019c80e409b315b6d")
        
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log("Fetch Complete")
            setData(data)
        } )
        
        .catch(error => console.log(error))
        
    }, [location])

    // Delay query until after user stops typing...
    useEffect(()=>{
        const timeoutId = setTimeout(() => setQuery(input), 1000)
        return () => clearTimeout(timeoutId)
    },[input])


    if(data){
        if(data.cod === "404"){
            console.log("Error: 404")
        }else{
            // console.log("Success")
            sendData(data)
            console.log(data.list[0].main.temp)
        }
    }else{
        console.log("Escape")
        
    }

    console.log(query)
    console.log(input)
    console.log(location)

    return (
    <View style={styles.rowStyle}>
        <TextInput 
            onChangeText={(value) => setInput(value)}
            value={input}
        />
        <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
        <Text>{location !== input ? "Searching..." : location}</Text>
    </View>
  )
    
}

const styles = StyleSheet.create({
    rowStyle:{
        flexDirection:'row',
        alignItems:"center",
        marginBottom:10,
    },
})