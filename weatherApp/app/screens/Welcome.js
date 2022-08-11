import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from 'react'
import colours from '../config/colours'

function Welcome(props) {
    
    const [apiData, setApiData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // console.log("Rendered")
    
    
        //   fetch("https://api.randomuser.me/?results=20")
         fetch("http://api.openweathermap.org/data/2.5/forecast?id=2648579&appid=3021873ba7751f7019c80e409b315b6d&units=metric")
        // fetch("http://api.openweathermap.org/geo/1.0/GB&appid=3021873ba7751f7019c80e409b315b6d")

        // fetch("http://api.openweathermap.org/geo/1.0/direct?q=GLASGOW&limit=2&appid=3021873ba7751f7019c80e409b315b6d")
        .then(res => {
            return res.json()
        })
        .then(data => {
            setApiData(data)
            setLoading(false)
        } )
        .catch(error => console.log(error))
        
    }, [])
    console.log("RenderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrQQQa")
    console.log(apiData.list)
    const temp = apiData.list[0].main.temp
    const citName = apiData.city.name

    return (
        <View>
            <Text style={{color:colours.red}}>This is some text</Text>
            <Text>City Name: {citName}</Text>
            <Text>Temp: {temp}</Text>
        </View>
    );
}

export default Welcome;