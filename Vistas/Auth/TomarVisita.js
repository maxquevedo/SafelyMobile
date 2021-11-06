//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';

// create a component
class TomarVisita extends Component {
    constructor(props){
        super(props);
        this.state = {
            fecha: new Date(),
            prueba: 'Prueba',
            fechaFormated: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
            visitas: ['11/11/21','12/12/21','5/11/2021'],
            clientes: ['falabella','falabella','ripley'],
            visitasClientes: [['5/11/2021','falabella'],['12/11/21','falabella'],['11/11/21','ripley'],['5/11/2021','paris']]
        }
    }

    renderItem(data){
        let fecha = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear();
        console.log(data.item[0]);
        console.log("fecha: ",fecha)
        return(
            <View>
               {
                   data.item[0] === fecha?
                    <View>
                        <View style={{flexDirection:'row', justifyContent: 'space-between',paddingLeft:'10%',paddingRight:'10%'}}>
                        <Text style={{fontSize:32.5}}>{data.item[1]}</Text>
                        <TouchableOpacity>
                            <Ionicons name="add-circle-outline" size={40}/>
                        </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:'gray',height:1,width:'90%', alignSelf:'center'}}></View>
                    </View>:
                    <Text></Text>

               } 
                
            </View>
        );
    }

    render() {
        const { fecha, fechaFormated,clientes,visitas,visitasClientes } = this.state;
        console.log(visitasClientes);
        return (
            <View style={styles.container}>
                <View style={{flex:0.3,justifyContent:'space-around',alignSelf:'stretch'}}>
                    <Picker
                        selectedValue={fecha}
                        style={{textAlign:'center'}}
                        onValueChange = {(item,index)=>{
                            this.setState({fecha:item})
                        }}
                    >
                        {
                            this.state.visitas.map((item,key)=>{
                                return(<Picker.Item label={item} value={item} key={key}/>);
                            })
                        }
                    </Picker>
                </View>
                <View style={{flex:0.7,padding:10,backgroundColor:'#969696'}}>
                    <FlatList data={visitasClientes} keyExtractor={(item,index)=>index.toString()} renderItem={this.renderItem} style={{backgroundColor:'#fff'}}/>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default TomarVisita;
