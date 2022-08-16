import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import colours from './app/config/colours.js'


import {DrawerActions, Drawer, NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import HomeScreen from './app/screens/HomeScreen'
import About from './app/screens/About.js';

const Test = ({route}) =>{
  return(
    <View>
      <Text>Test 1</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </View>
  )
}

const Test2 = ({route}) =>{
  return(
    <View>
      <Text>Test 2</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </View>

  )
}
const Test3 = ({route}) =>{
  return(
    <View>
      <Text>Test 3</Text>
    </View>

  )
}

export default function App() {
  
  const AuthStack = createStackNavigator()
  const Tabs = createBottomTabNavigator()
  
  const HomeStack = createStackNavigator()
  const AboutStack = createStackNavigator() 
  
  const HomeStackScreen = () =>(
    <HomeStack.Navigator screenOptions={{ headerShown:false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
      <HomeStack.Screen name="Test" component={Test} options={({route}) =>({ title:route.params.name })} />
    </HomeStack.Navigator>
  )
  
  const AboutStackScreen = () =>(
    <AboutStack.Navigator>
      <AboutStack.Screen name="AboutScreen" component={About}/>
      <AboutStack.Screen name="Test2" component={Test2} options={({route}) =>({ title:route.params.name })} />
    </AboutStack.Navigator>
  )

  const Test3Stack = createStackNavigator()
  const Test3StackScreen = () =>(
    <Test3Stack.Navigator screenOptions={{ headerShown:false }}>
      <Test3Stack.Screen name="Test3Stack" component={Test3}  />
    </Test3Stack.Navigator>
  )

  const TabsScreen = () =>(
    <Tabs.Navigator  
      screenOptions={{
        headerShown:false, 
        // tabBarActiveBackgroundColor:"rgba(255, 255, 255, .4)",
        // tabBarInactiveBackgroundColor:"grey",        
        }}>

      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="About" component={AboutStackScreen} />
    </Tabs.Navigator>
  )

  const Drawer = createDrawerNavigator()

// Loading Screen
  const [isLoading, setIsLoading] = useState(true) 
  useEffect(()=>{ setTimeout(()=>{ setIsLoading(false) }, 1000) },[])

  if(isLoading) {
    return (
      <View style={{flex:1, backgroundColor:"black", width:"100%", justifyContent:'center', alignItems:'center'}}>
        <Text style={{color:colours.white}}>Loading...</Text>
      </View>
    )
  }
//

  return (
    <NavigationContainer >
        <Drawer.Navigator screenOptions={{ headerShown:false}}>
          <Drawer.Screen name="HomeScreen2" component={TabsScreen} />
          <Drawer.Screen name="Test3" component={Test3StackScreen} />
          
        </Drawer.Navigator>

      {/* Tab Nav */}
      {/* <Tabs.Navigator screenOptions={{ headerShown:false }}>
        <Tabs.Screen name="Home" component={HomeStackScreen} />
        <Tabs.Screen name="About" component={AboutStackScreen} />
      </Tabs.Navigator> */}


      {/* Basic Stack Nav */}
      {/* <AuthStack.Navigator>
        <AuthStack.Screen name="Home" component={HomeScreen} options={{title:"Home"}} />
        <AuthStack.Screen name="About" component={About} />
      </AuthStack.Navigator> */}


      {/* <View style={styles.container}>
        <Text style={{color:colours.white}}>Open up App.js to start working on your app!</Text>
        <HomeScreen />
        <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
    color:colours.white
  },
});
