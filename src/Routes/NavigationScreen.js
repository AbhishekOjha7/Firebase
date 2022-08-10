import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogIn from '../Screens/LogIn'
import Chats from '../Screens/Chats'
const Stack=createNativeStackNavigator();

const NavigationScreen = () => {
return(
<NavigationContainer>
    <Stack.Navigator >
        <Stack.Screen name='LogIn' component={LogIn}/>
        <Stack.Screen name='Chats' component={Chats}/>

    </Stack.Navigator>
</NavigationContainer>
)
}

export default NavigationScreen