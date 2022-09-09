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
    <View style={styles.searchWrapper}>

        <View style={styles.rowStyle}>
            <TextInput style={styles.input}  onChangeText={(value) => setInput(value)} value={input}/>
            <MatIcons style={{paddingLeft:10, fontSize:40}} name='edit' size={32} color='white' />
        </View>

        <View  style={styles.rowStyle}>
            <Text>Check: {checkOk === false ? "Error" : apiData.city.name}</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    searchWrapper:{
        flexDirection:'column',
        marginBottom:10,
    },

    rowStyle:{
        flexDirection:'row',
        alignItems:"center",
        marginBottom:10,
    },
    input:{
        borderColor:"black",
        borderBottomWidth:1,
        width:"90%"
    }
})