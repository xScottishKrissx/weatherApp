import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SectionList, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MatIcons from '@expo/vector-icons/MaterialIcons'

export default function Search({currentLocation}) {

    console.log("Current: " + currentLocation)

    const [data, setData] = useState()
    const [query, setQuery] = useState()
    const [loading, setLoading] = useState(true)

    const thing = query || currentLocation
    console.log("Thing: " + thing)

    useEffect(() => {
        // fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        // fetch("http://api.openweathermap.org/geo/1.0/direct?q=pollok,gb&limit=5&appid=3021873ba7751f7019c80e409b315b6d")
        
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + thing + "&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log("Fetch Complete")
            setData(data)
            // setLoading(false)
        } )
        
        .catch(error => console.log(error))
        
    }, [thing])

    const locationData = (input) =>{
        console.log("Input: " + input)
        setQuery(input)
    }

    console.log("Thing: " + thing)

    if(data === undefined) return (<View><Text>Loading...</Text></View>)
    console.log(data.cod)

    if(data.cod === "404"){ return (          
        <View style={styles.rowStyle}>
            <TextInput 
                onChangeText={(value) => locationData(value)}
                // placeholder={data.cod}
            />
            <Text>Error: {data.cod}</Text>
            <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
        </View>
    )}else{


    console.log(data)
    console.log("CityName:" + data.city.name)
    // if(data.cod != 200){ 
    //     // setLoading(true)
    //     return (

    //         <View style={styles.rowStyle}>
    //         <TextInput 
    //             onChangeText={(value) => locationData(value)}
    //             // placeholder={data.cod}
    //         />
    //         <Text>Error: {data.cod}</Text>
    //         <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
    //     </View>
    //     )
    // }else{
    //         return(
    //         <View style={styles.rowStyle}>
    //             <TextInput 
    //                 onChangeText={(value) => locationData(value)}
    //                 placeholder={data.city.name}
    //             />
    //             <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
    //         </View>
    //     )
    // }
    

    return (
    <View style={styles.rowStyle}>
        <TextInput 
            onChangeText={(value) => locationData(value)}
            placeholder={query}
        />
        <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
    </View>
  )
    }
}

const styles = StyleSheet.create({
    rowStyle:{
        flexDirection:'row',
        alignItems:"center",
        marginBottom:10,
    },
})