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
            propuestas:['Cambiar el extintor','Poner avisos en escaleras','Marcar zona segura','centrar el muro'],


        }
    }

    render() {
        const { propuestas } = this.state;
        return (
            <View style={{flex:1,justifyContent:'space-around'}}>
                {
                    propuestas.map((item,index)=>{
                        let color = "white";
                        console.log(item)
                        if(index %2 ==0){
                            color= "#A2AFA2";
                        }
                        return <View style={{flex:1,backgroundColor:color,flexDirection:'row',paddingTop:75,paddingLeft:10}}>
                            <Text>     </Text>
                            <Text style={styles.text}>{item}</Text>
                            <Text>   </Text>
                            <TouchableOpacity>
                                <Ionicons name="md-checkmark-circle-outline" size={25} color="black" />
                            </TouchableOpacity>
                            <Text>    </Text>
                            <TouchableOpacity>
                                <Ionicons name="md-close-circle-outline" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                    })
                }
            </View>
        );
    }
}

//make this component available to the app
export default PropuestasMejora;