import React, { Component, useDebugValue } from 'react';
import { View, Text,Button, TouchableOpacity,SafeAreaView,ActivityIndicator,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-community/picker';
import styles from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URLS from '../URLS';
import Helper from '../../Store/Helper';

class AsignarProfesional extends Component {
    constructor(props){
      super(props)
        this.state = {
            fecha:new Date(),
            clientes:[],
            clienteElecto: '',
            evento:'asesoria',
            profesionales:[],
            profesionalElecto:'',
            loading: true,
            showDatePicker: false,
            showPro: false,
            idCliente: '',
            idPro:'',
            perfiles:[],
        }
  }

    getPerfilId(idPerfil,perfiles){
        var perfilId = perfiles.filter((item)=>{
            return item.id_auth_user == idPerfil;
        });
        var perfilId = perfilId[0].id_perfil;
        return perfilId;
    }

    getIdPro = async(perfilId) => {
        var resp =  await fetch(`http://${URLS['api-tarrito']}/profesional/`);
        var respJson = await resp.json();
        var idPro = respJson.filter((item)=>{
            return item.id_perfil == perfilId;
        });
        idPro = idPro[0].id_prof;
        return idPro;
    }

    getIdCli = async(perfilId) => {
        var resp =  await fetch(`http://${URLS['api-tarrito']}/cliente/`);
        var respJson = await resp.json();
        var idCli = respJson.filter((item)=>{
            return item.id_perfil == perfilId;
        });
        idCli = idCli[0].id_cli;
        return idCli;
    }

 
    componentDidMount = async()=> {
        let resp = await fetch(`http://${URLS['api-tarrito']}/user/`);
        let respJson = await resp.json();
        let clientes = [];
        clientes = respJson.filter((data)=>{
            return data.groups[0] === 3;
        });
        let userId = clientes[0].id;
        resp = await fetch(`http://${URLS['api-tarrito']}/perfil/`);
        respJson = await resp.json();
        let perfiles = respJson;
        let perfilId = perfiles.filter((item)=>{
            return item.id_auth_user == userId;
        });
        perfilId = perfilId[0].id_perfil;
        resp = await fetch(`http://${URLS['api-tarrito']}/cliente/`);
        respJson = await resp.json();
        let idCliente = respJson.filter((item)=>{
            return item.id_perfil == perfilId;
        });
        idCliente = idCliente[0].id_cli;
        let clienteElecto = clientes[0].username;
        this.setState({loading:false,clientes,clienteElecto,perfiles,idCliente})
    }
    
    updateDate = (event,date) =>{
        this.setState({fecha:date,showDatePicker:false})
    }

    updatePro = async() => {
        const {clienteElecto,fecha,evento,perfiles } = this.state;
        const url = `http://${URLS['api-tarrito']}`;
        var actividades_max = 5;
        var resp = await fetch(`${url}/activiad/`);
        var respJson = await resp.json();
        var actividades = respJson;
        if(resp.ok){
            resp = await fetch(`${url}/user/`);
            respJson = await resp.json();
            var profesionales = respJson.filter((data)=>{
                return data.groups[0] === 2;
            });

            //filtrar si tienen mas de X actividades max por dia
            //var actividadesUsuario = actividad.filter()
            //    if(  > actividades_max)
            //

            var profesionalElecto = profesionales[0].username;
            var userId = profesionales[0].id;
            var idPerfil = this.getPerfilId(userId,perfiles);
            var idPro;
            idPro = await this.getIdPro(idPerfil,perfiles);
            this.setState({profesionales,profesionalElecto,showPro:true})
        }
    }

    updateEvento = async(clienteElecto,profesionalElecto,fecha,evento) => {
        const url = `http://${URLS['api-tarrito']}`;
        const { clientes, profesionales, perfiles } = this.state;
        var resp;
        var respJson;
        var perfilCli = clientes.filter((item)=>{
            return item.username === clienteElecto;
        });
        var perfilPro = profesionales.filter((item)=>{
            return item.username === profesionalElecto;
        })
        let idPerfilCli = this.getPerfilId(perfilCli[0].id,perfiles);
        let idPerfilPro = this.getPerfilId(perfilPro[0].id,perfiles);
        var id_prof= await this.getIdPro(idPerfilPro);
        var id_cli = await this.getIdCli(idPerfilCli);
        var actividad = {

        }
        switch (evento) {
            case "asesoria":
                var username = await AsyncStorage.getItem('username');
                var descripcion = 'Agregada por admin: '+username;
                var nombre = 'Asesoria-'+clienteElecto;
                actividad.nombre = nombre
                actividad.descripcion = descripcion;
                actividad.estado = false;
                actividad.id_tipo_ase = 1;
                resp = await fetch(`${url}/asesoria/`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(actividad)
                });
                respJson = await resp.json();
                if (resp.ok){
                    var id_asesoria = respJson.id_asesoria
                    let tipo_act = 2;
                    //estado 2 = pendiente
                    //tipo act 2 = asesoria
                    let acti = {
                        nombre,
                        descripcion,
                        tipo_act,
                        act_extra:false,
                        fec_estimada:Helper.dateToBdDate(fecha),
                        fec_ida: Helper.dateToBdDate(fecha),
                        estado: 2,
                        id_cli,
                        id_prof,
                        id_asesoria
                    }
                    resp = await fetch(`${url}/activiad/`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(acti)
                    });
                    respJson = await resp.json();
                }
                break;
            case "visita":
                //tipo act = 3 = visita
                var tipo_act = 3;
                var username = await AsyncStorage.getItem('username');
                var nombre = 'Visita-'+clienteElecto;
                var descripcion = "Agregada por admin: "+username;
                actividad.nombre = nombre;
                actividad.estado = false;
                resp = await fetch(`${url}/visita/`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(actividad)
                });
                respJson = await resp.json();
                if (resp.ok){
                    let id_visita = respJson.id_visita;
                    let acti = {
                        nombre,
                        descripcion,
                        tipo_act,
                        act_extra:false,
                        fec_estimada:Helper.dateToBdDate(fecha),
                        fec_ida: Helper.dateToBdDate(fecha),
                        estado: 2,
                        id_cli,
                        id_prof,
                        id_visita
                    }
                    resp = await fetch(`${url}/activiad/`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(acti)
                    });
                    respJson = await resp.json();
                }
                break;
        
            default:
                break;
        }
        if(resp.ok){
            Alert.alert("Extio",`Se ha ingresado la ${evento} correctamente.`,[{text:'Ok',onPress:()=>{
                let fecha = new Date();
                let electo = clientes[0].username;
                let electoPro = profesionales[0].username;
                this.setState({clienteElecto:electo,fecha,profesionalElecto:electoPro,showPro:false});
            }}])
        }
    }

    render() {
        const { fecha,loading,showDatePicker,showPro,evento,idCliente,profesionales,profesionalElecto,idPro,clienteElecto,perfiles } = this.state;
        return (
        <SafeAreaView  style={{alignItems:'center',justifyContent:'space-around',marginTop:80}}>
            {
                loading? <ActivityIndicator animating={true} size="large" color="#095813"/>:
                (<View>
                    <Text style={styles.titleForm}>Cliente</Text>
                    <Picker
                        selectedValue={this.state.clienteElecto}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({clienteElecto: itemValue})
                        }>
                        {
                        
                            this.state.clientes.map((item,key)=>{
                               return( <Picker.Item label={item.username} value={item.username} key={key} />);
                            })
                        }
                    </Picker>
                    <Text style={styles.titleForm}>Fecha</Text>
                    <View style={{flexDirection:'row', marginLeft:18}}>
                    <Text>{fecha.getDate()}/{fecha.getMonth()+1}/{fecha.getFullYear()}</Text>
                    <Text>                  </Text>
                    <TouchableOpacity onPress={()=>{
                                    let showDatePickerCurrent = this.state.showDatePicker;
                                    this.setState({showDatePicker:!showDatePickerCurrent})
                                    //this.forceUpdate()
                                }}>
                                    <Ionicons name="md-calendar" size={24} color="black" />
                                </TouchableOpacity>
                    </View>        
                    <View style={styles.FieldSeparator}></View>

                                
                    {
                        showDatePicker? <DateTimePicker 
                        value={ fecha }
                        mode='default'
                        display='calendar'
                        minimumDate={new Date()}
                        onChange={
                            (event,date)=>{  
                                if(event.type === "dismissed"){
                                    this.setState({showDatePicker:false});
                                }else{
                                    this.updateDate(event,date)    
                                }
                            } 
                        }/>:<Text></Text>
                    }
                    
                    <Text style={styles.titleForm}>Evento</Text>
                    <Picker
                        selectedValue={this.state.evento}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({evento: itemValue})
                        }
                        }>
                         <Picker.Item label="Asesoría" value="asesoria" />
                         <Picker.Item label="Visita" value="visita" />
                    </Picker>
                    <Button title="Consultar" color="#18ac30" onPress={this.updatePro}/>
                    {
                        showPro? <View>
                        <Text style={styles.titleForm}>Profesional</Text>
                        <Picker
                            selectedValue={this.state.profesionalElecto}
                            style={{height: 50, width: 200}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({profesionalElecto: itemValue})
                            }>
                            {
                                
                                 this.state.profesionales.map((item,key)=>{
                                    return( <Picker.Item label={item.username} value={item.username} key={key} />);
                                 })
                            }
                        </Picker>
                        <Button title="Asignar" color="#18ac30" onPress={async ()=>{
                            this.updateEvento(clienteElecto,profesionalElecto,fecha,evento);
                            }
                    }/>
                        </View>:<Text></Text>
                    }            
                </View>)
                }
            </SafeAreaView>
        );
    }
}

export default AsignarProfesional;