//import liraries
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropuestasMejora from './PropuestasMejora';
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
        //<Stack.Screen name="VerMensajes" component={CanalComu} options={{headerTitle:'Mensajes'}}/>
        //<Stack.Screen name="Chat" component={Chat} options={{}}/>
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={AsesoriaHome} options={{headerShown:false}}/>
                <Stack.Screen name="Propuestas" component={PropuestasMejora} options={{headerTitle:'Propuestas de mejora'}}/>
                <Stack.Screen name="Capacitacion" component={Capacitacion} options={{headerTitle:'Capacitación'}}/>
                <Stack.Screen name="SolicitarAsesoria" component={SolicitarAsesoria} options={{headerTitle:'Solicitar Asesoría'}}/>
            </Stack.Navigator>
        );
    }
}
const Stack = createStackNavigator();

export default AsesoriaStack;