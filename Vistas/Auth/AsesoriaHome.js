//import liraries
import React, { Component } from 'react';
import { View, Text ,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
class AsesoriaHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            tipoUsuario:'',
        }
    }

    async componentDidMount(){
        AsyncStorage.getItem('tipoUsuario').then(tipoUsuario => this.setState({tipoUsuario}));
    }

    render() {
        const { fecha,showDatePicker,tipoUsuario } = this.state;
        const { navigation } = this.props;
        return (
            <View style={{flex:1}}>
                <View style={{flex:1,justifyContent:'space-evenly'}}>
                    {
                        tipoUsuario == "Cliente"?
                        <Button color="green" title="solicitar capacitación" onPress={()=>{
                            navigation.navigate('Capacitacion');
                        }}/>:
                        <Button color="green" title="capacitacion" onPress={()=>{
                            navigation.navigate('Capacitacion');
                        }}/>
                    }
                    
                    <Button color="green" title="propuestas de mejora" onPress={()=>{
                        navigation.navigate('Propuestas');
                    }}/>
                    {
                        tipoUsuario == "Cliente"?
                        <View>
                        <Button color="green" title="solicitar asesoría" onPress={()=>{
                            navigation.navigate('SolicitarAsesoria');
                        }}/></View>:<Text></Text>
                    }
                </View>
            </View>
        );
    }
}

export default AsesoriaHome;