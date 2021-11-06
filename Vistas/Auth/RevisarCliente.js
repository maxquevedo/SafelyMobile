//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';

// create a component
class RevisarCliente extends Component {
    
    constructor(props){
        super(props);
        this.state =  {
            loading: false,
            clienteElecto:'Falabella',
            clientes: ['Falabella','Paris','Ripley'],
            detallesClienteElecto:['Rut1','Direccion1','email1']
        }
    }

    renderItem(data){
        var color = "white";
        var accidente_id = data.item[0];
        var iconName = "";
        //var nombre = data.item[1].charAt(0).toUpperCase() +  data.item[1].slice(1);
        var nombre = data.item + ' '+this.state.clienteElecto;
        if(data.index%2==0){
            color= "#A2AFA2"
        }
        switch (data.index) {
            case 0:
                iconName = "card-outline";
                break;
            case 1:
                iconName = "location-outline";
                break;
            case 2:
                iconName = "mail-outline";
            default:
                break;
        }
        return <View style={{flexDirection:'row'}} key={data.key}>
            <View style={{flexDirection:'column', width:"100%", padding:35, backgroundColor:color,}}>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name={iconName} size={35} color={'#000'} />
                    <Text>     </Text>
                    <Text style={{fontSize:25}}>{ nombre }</Text>  
                </View>
            </View>
        </View>
    }

    render() {
        const { clientes,clienteElecto, detallesClienteElecto } = this.state;
        return (
            <View style={styles.container}>
                <View style={{flex:0.2,marginTop:'15%'}}>
                    <Text>Selecciona al cliente</Text>
                    <Picker
                        selectedValue={this.state.clienteElecto}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({clienteElecto: itemValue})
                        }>
                        {
                            this.state.clientes.map((item,key)=>{
                                return( <Picker.Item label={item} value={item} key={key} />);
                            })
                        }
                        </Picker>
                    </View>
                    <View style={{flex:0.8}}>
                        <FlatList
                            renderItem = {this.renderItem.bind(this)}
                            data={detallesClienteElecto}
                            keyExtractor={ (index,item) => index.toString() }
                        />
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
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default RevisarCliente;
