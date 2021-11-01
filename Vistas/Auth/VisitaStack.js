//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Visita from './Visita';

// create a component
class VisitaStack extends Component {
    
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Visita} options={{headerShown:false}} />
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
export default VisitaStack;