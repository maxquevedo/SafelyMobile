import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import URLS from '../URLS';
import {Picker} from '@react-native-community/picker';

class RevisarCliente extends Component {
    
    constructor(props){
        super(props);
        this.state =  {
            loading: true,
            clienteElecto:'A',
            detallesClienteElecto: [],
            data: {},
        }
    }

    async componentDidMount(){
        var elegido;
        var datosElegidos;
        let clientes;
        let url = `http://${URLS['api-tarrito']}/cliente`;
        let resp = await fetch(url);
        let respJson = await resp.json();
        clientes = respJson;
        //respJson = {id_cli, id_perfil, razon_social}
        let perfiles;
        url = `http://${URLS['api-tarrito']}/perfil/`;
        resp = await fetch(url);
        respJson = await resp.json();        
        if(respJson.length == 0){
            Alert.alert("Error","No hay perfiles creados.",[{text:'Ok'}]);
            return;
        }
        perfiles = respJson.filter((p)=>{
                return p.tipo_perf === "3";
        });
        let usuarios;
        url = `http://${URLS['api-tarrito']}/user/`;
        resp = await fetch(url);
        respJson = await resp.json();   
        usuarios = respJson.filter((u)=>{
            return u.groups[0] === 3;
        });
        if(usuarios.length == 0){
            Alert.alert("Error","No hay clientes creados.",[{text:'Ok'}]);
            return;
        }
        var  data = {};
        usuarios.forEach((item,index)=> {
            var usrId = item.id;
            var prfId;
            var razonSocial;
            var rut;
            var telefono;
            var direccion;
            var correo = item.email;
            for(var i =0;i<perfiles.length;i++){
                if(usrId == perfiles[i].id_auth_user){
                    direccion = perfiles[i].direccion;
                    telefono = perfiles[i].telefono;
                    rut = perfiles[i].rut;
                    prfId = perfiles[i].id_perfil;
                    for(var j=0;j<clientes.length;j++){
                        if(prfId == clientes[j].id_perfil){
                            razonSocial = clientes[j].razon_social;
                        }
                    }
                }
            }
            data[item.username] = {
                razonSocial,
                rut,
                telefono,
                direccion,
                correo
            };

            if(index == 0){
                elegido = item.username;
                datosElegidos = data[item.username];
            }
        })
        this.setState({loading:false,data,clienteElegido:elegido,detallesClienteElecto:datosElegidos});
    }

    componentWillUnmount(){
        this.setState({loading:true,data:{}});
    }


    render() {
        const { data, detallesClienteElecto,loading } = this.state;
        var stylo = loading? {flex:1,justifyContent:'center',alignSelf:'center',alignContent:'center'}:
        styles.container;
        return (
            <View style={stylo} >
                {
                    loading? 
                    <View >
                        <ActivityIndicator size={'large'} color={'green'} />
                    </View>
                        :
                        <View style={styles.container}>
                            <View style={{marginTop:'15%',backgroundColor:'white',alignSelf:'center'}}>
                                <Text style={styles.text}>Selecciona al cliente</Text>
                                <Picker
                                    selectedValue={this.state.clienteElecto}
                                    style={{height: 50, width: 200,padding:"10%"}}
                                    onValueChange={(itemValue, itemIndex) =>{
                                        this.setState({clienteElecto: itemValue,detallesClienteElecto:data[itemValue]})
                                    }}>
                                    {
                                        Object.keys(data).map((item,key) => {
                                            return(<Picker.Item label={item} value={item} key={key}/>);
                                        })
                                    }

                                </Picker>
                            </View>
                            <View>
                                <View>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <Text style={styles.centerText}>Rut</Text>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:50,paddingRight:"5%",paddingBottom:"5%",paddingTop:"5%",backgroundColor:'#A2AFA2'}}>
                                        <FontAwesome5 name={"id-card"} size={29} />                              
                                        <Text style={styles.text}>{detallesClienteElecto.rut}</Text>
                                    </View>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <Text style={styles.centerText}>Razón Social</Text>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:50,paddingRight:"5%",paddingBottom:"5%",paddingTop:"5%"}}>
                                        <FontAwesome5 name={"user"} size={29} />                                                                      
                                        <Text style={styles.text}>{detallesClienteElecto.razonSocial}</Text>
                                    </View>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <Text style={styles.centerText}>Teléfono</Text>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:50,paddingRight:"5%",backgroundColor:'#A2AFA2',paddingBottom:"5%",paddingTop:"5%"}}>
                                        <FontAwesome5 name={"phone-alt"} size={29} />                              
                                        <Text style={styles.text}>{detallesClienteElecto.telefono}</Text>
                                    </View>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <Text style={styles.centerText}>Correo</Text>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:50,paddingRight:"5%",paddingBottom:"5%",paddingTop:"5%"}}>
                                        <FontAwesome5 name={"envelope"} size={29} />                                                                      
                                        <Text style={styles.text}>{detallesClienteElecto.correo}</Text>
                                    </View>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <Text style={styles.centerText}>Dirección</Text>
                                    <View style={{backgroundColor:'black',height:1}}></View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:50,paddingRight:"5%",backgroundColor:'#A2AFA2',paddingBottom:"5%",paddingTop:"5%"}}>
                                        <FontAwesome5 name={"map-marker-alt"} size={29} />                              
                                        <Text style={styles.text}>{detallesClienteElecto.direccion}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
    text:{
        color:'black',
        fontSize:25,   
    },
    centerText:{
        textAlign:'center',
        textAlignVertical:'center',
        fontWeight:'800',
    }
});

export default RevisarCliente;
