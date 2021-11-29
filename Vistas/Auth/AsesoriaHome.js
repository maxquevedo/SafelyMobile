//import liraries
import React, { Component } from 'react';
import { View, Text, Alert ,Button, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles'; 
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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
                    <Button color="#18ac30" title="capacitacion" onPress={()=>{
                        navigation.navigate('Capacitacion');
                    }}/>
                    <Button color="#18ac30" title="propuestas de mejora" onPress={()=>{
                        navigation.navigate('Propuestas');
                    }}/>
                    {
                        tipoUsuario == "Cliente"?
                        <View>
                        <Button color="#18ac30" title="solicitar asesoria" onPress={()=>{
                            navigation.navigate('SolicitarAsesoria');
                        }}/></View>:<Text></Text>
                    }
                </View>
            </View>
        );
    }
}

export default AsesoriaHome;