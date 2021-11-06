//import liraries
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import ActividadesForm from '../Forms/ActividadesForm';

// create a component
class Actividades extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            visitas:[['01/11/21','26/11/21']],
            asesorias:[['19/11/21','23/10/21']],
            capacitaciones:[['30/11/21']]
            
        };
    }


    render() {
        const {loading, visitas, asesorias,capacitaciones} = this.state;
        return (
            <View style={styles.container}>
                {
                    loading? 
                    <ActivityIndicator size="large" color="#18ac30" style={{alignSelf:"center",justifyContent:'center'}}/>
                    :
                    <View>
                        <ActividadesForm visitas={visitas[0]} asesorias={asesorias[0]} capacitaciones={capacitaciones[0]}/>
                        <Button title="Refrescar calendario" onPress={this.getData} color="#18ac30"/>
                    </View>
            }
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
export default Actividades;
