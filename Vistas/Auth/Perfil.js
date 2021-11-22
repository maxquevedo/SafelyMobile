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
            loading: true,
            estadoContrato:true,
            rut:'11.111.111-1',
            direccion:'calle uno #0001',
            razonSocial:'Tenemos razon',
            contraseña:'',
            telefono:'000000000',
        }
        this.toggleEditar = this.toggleEditar.bind(this);
    }

    toggleEditar = async (editar) => {
        let email = await AsyncStorage.getItem('email');
        let direccion = await AsyncStorage.getItem('direccion');
        let telefono = await AsyncStorage.getItem('telefono');
        this.setState({editar:!editar,correo:email,direccion,telefono});
    }

    componentDidMount = async() => {
        let username = await AsyncStorage.getItem('username');
        let correo = await AsyncStorage.getItem('email');
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let apellido =  await AsyncStorage.getItem('lastName');
        let nombre = await AsyncStorage.getItem('firstName');
        let nombreCompleto = nombre+' '+apellido;
        let id2 = await AsyncStorage.getItem('idUsuario');
        let telefono = await AsyncStorage.getItem('telefono');
        let direccion = await AsyncStorage.getItem('direccion');
        //console.log(usuario,correo,tipoUsario,id2);
        this.setState({correo:correo,nombre:nombreCompleto,loading:false,tipoUsuario,direccion,telefono,username})
    }

    render() {
        const { correo,nombre,editar,loading,rut,direccion,razonSocial,contratoActivo,estadoContrato,telefono,username } = this.state;
        const { navigation } = this.props;
        return (
            <View>
            {
                editar?
                    (<ScrollView>
                       <EditarPerfilForm editar={editar} correo={correo} navigation={navigation} direccion={direccion} actualiza={this.toggleEditar} telefono={telefono}/>
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
                                });
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
                            <FontAwesome5 name={"id-card"} size={29} />                              
                            <Text>&nbsp;&nbsp;</Text>
                            <Text style={styles.text}>{rut}</Text>
                        </View>
                        <View style={styles.FieldSeparator}></View>
                        <View style={styles.tablaCajaFlotante}>
                            <FontAwesome5 name={"envelope"} size={29} />                              
                            <Text>    </Text>
                            <Text style={styles.text}>{correo}</Text>
                        </View>
                        <View style={styles.FieldSeparator}></View>
                        <View style={styles.tablaCajaFlotante}>
                            <FontAwesome5 name={"map-marker-alt"} size={29} />                              
                            <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            <Text style={styles.text}>{direccion}</Text>
                        </View>        
                        <View style={styles.FieldSeparator}></View>
                        <View style={styles.tablaCajaFlotante}>
                            <FontAwesome5 name={"phone-alt"} size={29}/>
                            <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            <Text style={styles.text}>{telefono}</Text>
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