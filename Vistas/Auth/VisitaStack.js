//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Visita from './Visita';
import VisitaHome from './VisitaHome';
import TomarVisita from './TomarVisita';

// create a component
class VisitaStack extends Component {
    
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={VisitaHome} options={{headerShown:false}}/>
                <Stack.Screen name="Visita" component={Visita} options={{}} />
                <Stack.Screen name="TomarVisita" component={TomarVisita} option={{}}/>
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