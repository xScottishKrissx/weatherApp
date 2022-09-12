import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MatIcons from '@expo/vector-icons/MaterialIcons'
import colours from '../../../config/colours';

export default function Search({setQuery, apiData, searchInProgress}) {

    const [input, setInput] = useState()
    const [startInput, setStartInput] = useState(false)

    // Delay query until after user stops typing...
    useEffect(()=>{
        const timeoutId = setTimeout(() => {
                setQuery(input)
                searchInProgress(false)
            }
            , 1000)
        return () => clearTimeout(timeoutId)
    },[input])

    // Keyboard
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
             setStartInput(true)
             searchInProgress(true)
           
            });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => { 
            setStartInput(false)
            searchInProgress(false)
         });
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, [startInput]);

    let checkOk
    if(apiData){ if(apiData.cod === "404") checkOk = false } else { checkOk = true }

    return (
    <View style={styles.searchWrapper}>

        <View style={styles.rowStyle}>
            
           {startInput ? 
                <TextInput 
                    autoFocus 
                    
                    onChangeText={(value) => {setInput(value), searchInProgress(true)}} 
                    style={styles.input}  
                    value={input}
                 />
                    : 
                <Text style={styles.placeholder}>
                    {checkOk === false ? "loading" : apiData.city.name}
                </Text>
            }
            
            <MatIcons  
                name={startInput ? "save" : "edit"} 
                onPress={()=>setStartInput(!startInput)} 
                style={styles.iconStyles} 
                size={32}  
            />

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
    },
    iconStyles:{
        color:colours.white,
        paddingLeft:10,
    }
})