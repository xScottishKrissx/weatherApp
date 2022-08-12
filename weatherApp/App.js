import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import colours from './app/config/colours.js'


import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/HomeScreen'
import About from './app/screens/About.js';



export default function App() {


const AuthStack = createStackNavigator()
const Tabs = createBottomTabNavigator()


  return (
    <NavigationContainer>

      {/* Tab Nav */}
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeScreen} options={{title:"Home"}} />
        <Tabs.Screen name="About" component={About} />
      </Tabs.Navigator>


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
