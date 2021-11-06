//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons'; 

// create a component
class PropuestasMejora extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            propuestas:['Cambiar el extintor','Poner avisos en escaleras','Marcar zona segura','centrar el muro'],
            estadoPropuestas: ['1','0','1','1'],
            tipoUsuario:'Cliente'
        }
    }

    changeCheckState = (item,action) => {
        const { estadoPropuestas, propuestas } = this.state;
        let indice = -1;
        for(let i=0;i<propuestas.length;i++){
            if(propuestas[i] === item){
                indice = i;
            }
        }
        if(action === 'rechazar'){
            estadoPropuestas[indice] = 0;
        }else if(action === 'aprobar'){
            estadoPropuestas[indice] = 1;
        }
        
        this.setState({estadoPropuestas:estadoPropuestas})
    }

    render() {
        const { propuestas,estadoPropuestas,tipoUsuario } = this.state;
        return (
            <View style={{flex:1,justifyContent:'space-around'}}>
                {
                    propuestas.map((item,index)=>{
                        let color = "white";
                        if(index %2 ==0){
                            color= "#A2AFA2";
                        }

                        let colorCheckApro = "black";
                        let colorCheckRecha = "black";

                        if(estadoPropuestas[index] == 0){
                            colorCheckRecha = "red";
                        }else if(estadoPropuestas[index] == 1){
                            colorCheckApro = "green";
                        }

                        return <View style={{flex:1,backgroundColor:color,flexDirection:'row',paddingTop:75,paddingLeft:10}}
                        key={index}>
                            <Text>     </Text>
                            <Text style={styles.text}>{item}</Text>
                            <Text>   </Text>
                            {
                                tipoUsuario === 'Cliente'?
                                <Ionicons name="md-checkmark-circle-outline" size={35} color={colorCheckApro} />:    
                                <TouchableOpacity onPress={()=>{this.changeCheckState(item,'aprobar')}}>
                                    <Ionicons name="md-checkmark-circle-outline" size={35} color={colorCheckApro} />
                                </TouchableOpacity>
                            }
                            <Text>  </Text>
                            {
                                tipoUsuario === 'Cliente'?
                                <Ionicons name="md-close-circle-outline" size={35} color={colorCheckRecha} />:
                                <TouchableOpacity onPress={()=> this.changeCheckState(item,'rechazar')}>
                                    <Ionicons name="md-close-circle-outline" size={35} color={colorCheckRecha} />
                                </TouchableOpacity>    
                            }
                            
                        </View>
                    })
                }
            </View>
        );
    }
}

//make this component available to the app
export default PropuestasMejora;