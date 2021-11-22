//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CanalComu from './CanalComu';
import PropuestasMejora from './PropuestasMejora';
import AsesoriaPulenta from './AsesoriaPulenta';
import AsesoriaHome from './AsesoriaHome';
import Capacitacion from './Capacitacion';
import SolicitarAsesoria from './SolicitarAsesoria';

// create a component
class AsesoriaStack extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: 'cli',
        }
    }
    
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={AsesoriaHome} options={{headerShown:false}}/>
                <Stack.Screen name="AsesoriaPulenta" component={AsesoriaPulenta}/>
                <Stack.Screen name="Propuestas" component={PropuestasMejora}/>
                <Stack.Screen name="Chat" component={CanalComu} options={{}}/>
                <Stack.Screen name="Capacitacion" component={Capacitacion} options={{}}/>
                <Stack.Screen name="SolicitarAsesoria" component={SolicitarAsesoria} option={{}}/>
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