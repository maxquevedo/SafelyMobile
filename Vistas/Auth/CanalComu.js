//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,Button,FlatList } from 'react-native';
import styles from '../styles';

// create a component
class CanalComu extends Component {
    constructor(props){
        super(props);
        this.state = {
            mensajes: ['Buenos días, hoy toca asesoria','Buenos días, voy en camino'],

        }
    }

    renderItem = (data) => {
        let  color ="white";
        if(data.index%2==0){
            color="#A2AFA2"
        }
        return(
            <View style={{flex:1,alignContent:'center',justifyContent:'center',backgroundColor:color}}>
                <Text style={styles.text}>{data.item}</Text>
            </View>
        );
    }

    render() {
        const { mensajes } = this.state;
        return (
            <View style={{flex:1}}>
                <View style={{flex:0.5}}>
                    <FlatList data={mensajes} renderItem={this.renderItem} keyExtractor={(item,index)=> index }/>
                </View>
                <View style={{flex:0.5,justifyContent:'space-around'}}>
                    <TextInput placeholder="Mensaje..." style={{alignSelf:'stretch',backgroundColor:'#fff',justifyContent:'center'}}/>
                    <Button color="#095813" title="Enviar" onPress={()=>{}}/>
                </View>
            </View>
        );
    }
}

//make this component available to the app
export default CanalComu;