//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CanalComu from './CanalComu';
import PropuestasMejora from './PropuestasMejora';
import Asesorias from './Asesorias';

// create a component
class AsesoriaStack extends Component {
    
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Asesorias} options={{headerShown:false}} />
                <Stack.Screen name="Propuestas" component={PropuestasMejora} options={{headerShown:false}}/>
            </Stack.Navigator>
        );
    }
}
const Stack = createStackNavigator();

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//make this component available to the app
export default AsesoriaStack;