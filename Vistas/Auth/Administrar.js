//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import GenerarReporteCliente from './GenerarReporteCliente';
// create a component
class Administrar extends Component {
    constructor(props){
        super(props);
        this.state= {
            loading:false,
            action:'',
            clientes:[],
            clienteSeleccionado:'',
            reporteCli:false
        }
    }

    sendToBD(action,props){
        if(action === 'notificar atrasos'){
            //notificar atraso bd
            Alert.alert(action,"se ha enviado solicitud con exito",[{text:'Ok',onPress:()=>{this.setState({loading:!this.state.loading})}} ]);
        }else if(action === 'reporte cliente'){
            //reporte cliente
            Alert.alert(action,"Elegiremos cliente",[{text:'Ok',onPress:()=>{this.setState({loading:!this.state.loading,reporteCli:true})}} ]);
        }else if(action === 'reporte global'){
            //reporte global bd
            Alert.alert(action,"se ha enviado solicitud con exito",[{text:'Ok',onPress:()=>{this.setState({loading:!this.state.loading})}} ]);
        }
        //console.log(action,props);
    }

    render() {
        const { navigation } = this.props;
        const { loading, reporteCli } = this.state;
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                { !loading? 
                ( !reporteCli?

                <View style={styles.container}>
                    <View>
                        <Button color="#18ac30" title='Notificar atrasos' onPress={()=>{
                            this.sendToBD('notificar atrasos',this.props)
                            this.setState({loading:true,action:'notificarAtrasos'})}}/>
                    </View>
                    <View>
                        <Button color="#18ac30" title='generar reporte cliente' onPress={()=>{
                            this.sendToBD('reporte cliente',this.props)
                            this.setState({loading:true,action:'reporteCli',reporteCli:!reporteCli})}}/>
                    </View>
                    <View>
                        <Button color="#18ac30" title='generar reporte global' onPress={()=>{
                            this.sendToBD('reporte global')
                            this.setState({loading:true,action:'reporteGlo'})}}/>
                    </View>
                </View>:
                    <GenerarReporteCliente/>
                )
                    :
                    <View style={{flex:1,justifyContent:'center'}}>
                        <ActivityIndicator size='large' color="#000"/>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',

    },
});

//make this component available to the app
export default Administrar;
