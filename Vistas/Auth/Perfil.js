//import liraries
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator,ScrollView } from 'react-native';
import styles from '../styles';
import EditarPerfilForm from '../Forms/EditarPerfilForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// create a component
class Perfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            correo: 'fulaniasdsto@f.com',
            nombre:'Maximiliano Quevedo',
            tipoUsuario:'',
            editar:false,
            loading: false,
            estadoContrato:true,
            rut:'11.111.111-1',
            direccion:'calle uno #0001',
            razonSocial:'Tenemos razon',
            contraseña:'',
        }
        this.toggleEditar = this.toggleEditar.bind(this);
    }

    toggleEditar = async (editar,correo,direccion) => {
        console.log("correo: ",corre,)
        //let corre = await AsyncStorage.getItem('email');
        //let nombre = await AsyncStorage.getItem('');
        //let rut = await AsyncStorage.getItem('rut');
        //let dir = await AsyncStorage.getItem('dir');
        this.setState({editar:!editar,correo:correo,direccion:direccion});
    }

    componentDidMount = async() => {
       /* let usuario = await AsyncStorage.getItem('username');
        let correo = await AsyncStorage.getItem('email');
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let id2 = await AsyncStorage.getItem('id2');
        let asociado;
        let tipoAsociado;
        if(tipoUsuario =="Cliente"){
            tipoAsociado = "Profesional a cargo";
            let resp = await fetch(`http://10.0.2.2:8080/clientes/${id2}`);
            let respJson = await resp.json();
            let id_pro = respJson[5];
            resp = await fetch(`http://10.0.2.2:8080/profesionales/${id_pro}`);
            respJson = await resp.json();
            asociado = respJson[2]+' '+respJson[3];
        }else{
            tipoAsociado = "Cliente ";
            let resp = await fetch(`http://10.0.2.2:8080/profesionales/${id2}`);
            let respJson = await resp.json();
            let id_cli = respJson[5];
            resp = await fetch(`http://10.0.2.2:8080/usuarios_clientes/${id_cli}`);
            respJson = await resp.json();
            asociado = respJson[3];
        }

        this.setState({correo:correo,nombre:usuario,loading:false,tipoUsuario,asociado,tipoAsociado})*/
    }

    render() {
        const { correo,nombre,editar,loading,rut,direccion,razonSocial,contratoActivo,estadoContrato } = this.state;
        const { navigation } = this.props;
        //console.log("editar prop parent b like: ",editar);
        return (
            <View>
            {
                editar?
                    (<ScrollView>
                       <EditarPerfilForm editar={editar} correo={correo} navigation={navigation} direccion={direccion} actualiza={this.toggleEditar}/>
                       <Button title="cancelar"  color={"#edad24"} onPress={()=>{this.setState({editar:false})}}/>
                    </ScrollView>
                    )
                :
                (
                <View style={{alignContent:'center'}}>
                    <View><Text></Text></View>
                    { loading? <ActivityIndicator animating={true} color={'#18ac30'} size="large"/>:
                    <View>
                        <View style={{ justifyContent:'center', alignItems:'center',marginBottom:15}}>
                            <Button color={'#18ac30'}  title="Cerrar Sesion" onPress={async() => {
                                await AsyncStorage.clear();
                                this.props.navigation.reset({
                                    index:0,
                                    routes: [{
                                        name: 'Login'
                                    }]
                                })
                            }}/>
                        </View>
                    <View>
                    <View style={styles.cajaFlotante}>
                        <View style={styles.tablaCajaFlotante}>
                            <FontAwesome5 style={{alignSelf:'center'}} name={"user"} size={29} />                              
                            <Text>    </Text>
                            <Text style={{fontSize:25}}>{nombre}</Text>
                        </View>
                        <View style={styles.FieldSeparator}></View>
                        <View style={styles.tablaCajaFlotante}>
                            <FontAwesome5 name={"envelope"} size={29} />                              
                            <Text>    </Text>
                            <Text style={styles.text}>{correo}</Text>
                        </View>
                        <View style={styles.FieldSeparator}></View>
                        <View style={styles.tablaCajaFlotante}>
                            <FontAwesome5 name={"id-card"} size={29} />                              
                            <Text>&nbsp;&nbsp;</Text>
                            <Text style={styles.text}>{rut}</Text>
                        </View>
                        <View style={styles.FieldSeparator}></View>
                        <View style={styles.tablaCajaFlotante}>
                            <FontAwesome5 name={"map-marker-alt"} size={29} />                              
                            <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            <Text style={styles.text}>{direccion}</Text>
                        </View>        
                        <View style={styles.FieldSeparator}></View>
                    </View>
                    {
                        /*
                        estadoContrato ?  
                        <View style={styles.cajaFlotanteVerde}>
                            <Text style={styles.textBlancoCentrado}>Activo</Text>
                        </View> 
                        : 
                        <View style={styles.cajaFlotanteRoja}>
                            <Text style={styles.textBlancoCentrado}>No Activo</Text>
                        </View>*/
                    }
                    <Button title="Editar" onPress={()=>{
                        this.setState({editar:!editar});
                    }} color="#18ac30"/>
                    </View>
                    </View>
                }
                </View>)  
            }
            </View> 
        );
    }
}
export default Perfil;