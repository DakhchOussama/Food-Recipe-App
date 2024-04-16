import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import RecipeDetailsScreen from '../screen/RecipeDetailsScreen';


const stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
                <stack.Screen name='Home' component={HomeScreen}></stack.Screen>
                <stack.Screen name='Welcome' component={WelcomeScreen}></stack.Screen>
                <stack.Screen name='RecipeDetail' component={RecipeDetailsScreen}></stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;