import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MatIcons from '@expo/vector-icons/MaterialIcons'

export default function Search({setQuery, apiData}) {

    const [input, setInput] = useState()

    // Delay query until after user stops typing...
    useEffect(()=>{
        const timeoutId = setTimeout(() => setQuery(input), 1000)
        return () => clearTimeout(timeoutId)
    },[input])

    let checkOk
    if(apiData){ if(apiData.cod === "404") checkOk = false } else { checkOk = true }

    return (
    <View style={styles.rowStyle}>
        <TextInput onChangeText={(value) => setInput(value)} value={input}/>
        <MatIcons style={{paddingLeft:10, fontSize:40}} name='add' size={32} color='white' />
        <Text>Check: {checkOk === false ? "Error" : "Ok"}</Text>
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