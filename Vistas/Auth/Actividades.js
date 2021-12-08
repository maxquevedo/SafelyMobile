import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import ActividadesForm from '../Forms/ActividadesForm';
import URLS from '../URLS';

class Actividades extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            visitas:null,
            asesorias:null,
            capacitaciones:null
        };
    }
    
    componentWillUnmount(){
        this.setState({loading:true,visitas:null,asesorias:null,capacitaciones:null})
    }

    async componentDidMount(){
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let id2 = await AsyncStorage.getItem('id2');
        let url = `http://${URLS['api-tarrito']}/activiad/`;
        let resp = await fetch(url);
        let respJson = await resp.json();
        var filtrado;
        if(tipoUsuario === "Cliente"){
            filtrado = respJson.filter((item)=>{
                return item.id_cli == id2;
            });
            var visitas = filtrado.filter((item)=>{
                return item.tipo_act == 3
            });
            var asesorias = filtrado.filter((item)=>{
                return item.tipo_act == 2
            });
            var capacitaciones = filtrado.filter((item)=>{
                return item.tipo_act == 1
            });
            this.setState({visitas,asesorias,capacitaciones,loading:false})
        }else if(tipoUsuario === "Profesional"){
            filtrado = respJson.filter((item)=>{
                return item.id_prof == id2;
            });
            var visitas = filtrado.filter((item)=>{
                return item.tipo_act == 3
            });
            var asesorias = filtrado.filter((item)=>{
                return item.tipo_act == 2
            });
            var capacitaciones = filtrado.filter((item)=>{
                return item.tipo_act == 1
            });
            this.setState({visitas,asesorias,capacitaciones,loading:false})
        }else if(tipoUsuario === "Admin"){

            var visitas = respJson.filter((item)=>{
                return item.tipo_act == 3
            });
            var asesorias = respJson.filter((item)=>{
                return item.tipo_act == 2
            });
            var capacitaciones = respJson.filter((item)=>{
                return item.tipo_act == 1
            });
            this.setState({visitas,asesorias,capacitaciones,loading:false})
        }
        //console.log("visitas en la clase: ",visitas);
    }

    getData = async ()=> {
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let id2 = await AsyncStorage.getItem('id2');
        let url = `http://${URLS['api-tarrito']}/activiad/`;
        let resp = await fetch(url);
        let respJson = await resp.json();
        var filtrado;
        if(tipoUsuario === "Cliente"){
            filtrado = respJson.filter((item)=>{
                return item.id_cli == id2;
            });
            var visitas = filtrado.filter((item)=>{
                return item.tipo_act == 3
            });
            var asesorias = filtrado.filter((item)=>{
                return item.tipo_act == 2
            });
            var capacitaciones = filtrado.filter((item)=>{
                return item.tipo_act == 1
            });
            this.setState({visitas,asesorias,capacitaciones,loading:false})
        }else if(tipoUsuario === "Profesional"){
            filtrado = respJson.filter((item)=>{
                return item.id_prof == id2;
            });
            var visitas = filtrado.filter((item)=>{
                return item.tipo_act == 3
            });
            var asesorias = filtrado.filter((item)=>{
                return item.tipo_act == 2
            });
            var capacitaciones = filtrado.filter((item)=>{
                return item.tipo_act == 1
            });
            this.setState({visitas,asesorias,capacitaciones,loading:false})
        }else if(tipoUsuario === "Admin"){

            var visitas = respJson.filter((item)=>{
                return item.tipo_act == 3
            });
            var asesorias = respJson.filter((item)=>{
                return item.tipo_act == 2
            });
            var capacitaciones = respJson.filter((item)=>{
                return item.tipo_act == 1
            });
            this.setState({visitas,asesorias,capacitaciones,loading:false})
        }
    }

    render() {
        const {loading, visitas, asesorias,capacitaciones} = this.state;
        console.disableYellowBox;
        return (
            <View style={styles.container}>
                {
                    loading? 
                    <ActivityIndicator size="large" color="#18ac30" style={{alignSelf:"center",justifyContent:'center'}}/>
                    :
                    <View>
                        <ActividadesForm visitas={visitas} asesorias={asesorias} capacitaciones={capacitaciones}/>
                        <Button title="Refrescar calendario" onPress={this.getData} color="green"/>
                    </View>
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default Actividades;
