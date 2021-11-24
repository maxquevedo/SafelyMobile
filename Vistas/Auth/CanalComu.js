//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,Button,FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';

// create a component
class CanalComu extends Component {
    constructor(props){
        super(props);
        this.state = {
            //username, idCliente, idPerfil, idUsuario
            usuariosDelChat:[['Juanito','1','1','1'],['Mauricio','1','1','1']]
        }
    }

    render() {
        const { usuariosDelChat } = this.state;
        const { navigation } = this.props;
        return (
            <View style={{ justifyContent: 'space-evenly', alignItems: 'stretch', backgroundColor: '#fff',}}>
                {
                    usuariosDelChat.length > 0 ?
                    <View>
                        {
                        usuariosDelChat.map((item,index)=>{
                            //console.log(item)
                            return(
                            <View key={index}>
                                <TouchableOpacity style={{padding:20,flexDirection:'row',justifyContent:'space-between',alignSelf:'stretch'}} onPress={(data)=>{
                                    //console.log("ITEM: ",item,"DATA: ",data);
                                    navigation.navigate("Chat");
                                    
                                }}>
                                    <Text>{item[0]}</Text>
                                    <Text>icono aqui  </Text>
                                </TouchableOpacity>
                            </View>
                            );
                        })
                        }
                    </View>
                    :
                    <View style={styles.centerText}>
                        <Text style={styles.text}>No hay chats disponibles...</Text>
                    </View>
                }
            </View>
        );
    }
}

//make this component available to the app
export default CanalComu;