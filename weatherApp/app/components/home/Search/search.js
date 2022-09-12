import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MatIcons from '@expo/vector-icons/MaterialIcons'



export default function Search({setQuery, apiData}) {

    const [input, setInput] = useState()
    const [startInput, setStartInput] = useState(false)

    // Delay query until after user stops typing...
    useEffect(()=>{
        const timeoutId = setTimeout(() => setQuery(input), 1000)
        return () => clearTimeout(timeoutId)
    },[input])

    let checkOk
    if(apiData){ if(apiData.cod === "404") checkOk = false } else { checkOk = true }



    let pressed = false;

    return (
    <View style={styles.searchWrapper}>

        <View style={styles.rowStyle}>
            
           {startInput ? 
                <TextInput 
                    style={styles.input}  
                    onChangeText={(value) => setInput(value)} 
                    // placeholder={checkOk === false ? "loading" : apiData.city.name}
                    value={input}
                />
                    : 
                <Text style={styles.placeholder} >{checkOk === false ? "loading" : apiData.city.name}</Text>
            }
            


            <MatIcons  onPress={()=>setStartInput(!startInput)} style={{paddingLeft:10}} name={startInput ? "save" : "edit"} size={32} color='white' />
        </View>

        {/* <View  style={styles.rowStyle} >
            <Text>Check: {checkOk === false ? "loading" : apiData.city.name}</Text>
        </View> */}

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
        borderBottomWidth:2,
        color:"black",
        fontWeight:"bold",
        fontSize:32,
        opacity:2,
        width:"90%"
    },
    placeholder:{
        borderColor:"black",
        color:"black",
        fontSize:32,
        opacity:2,
        width:"90%"
    }
})