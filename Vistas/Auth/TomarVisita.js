import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URLS from '../URLS';
import styles from '../styles';
import Helper from '../../Store/Helper';
import DateTimePicker from '@react-native-community/datetimepicker';

class TomarVisita extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            fecha: new Date(),
            actis:[],
            prueba: 'Prueba',
            actiSelected:'',
            fechaFormatted: '',
            visitas: [],
            clientes: [],
            visitasClientes: [],
            actiSelected:'',
            idActiSelec:'',
            usu:'',
            showDatePicker:false,
        }
    }

    formatFecha(fecha){
        let deit = ''+fecha;
        deit = deit[8]+deit[9]+'/'+deit[5]+deit[6]+'/'+deit[0]+deit[1]+deit[2]+deit[3];
        return deit;
    }

    async componentDidMount(){
        let resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
        let respJson = await resp.json();
        let actis = respJson.filter((item,index)=>{
            return item.tipo_act == 3 && item.id_prof == null;
        });
        actis = actis.sort((first,second)=>{
            return first.fec_estimada > second.fec_estimada;
        });
        resp = await fetch(`http://${URLS['api-tarrito']}/visita/`);
        respJson = await resp.json();
        let visitas = respJson;        
        if(actis.length == 0){
            this.setState({loading:false});
            return;
        }
        let actiSelected = actis[0];
        let fecha = actis[0].fec_estimada;        
        fecha = new Date(fecha);
        fecha = new Date(fecha.setDate(fecha.getDate() + 1))
        fecha = fecha.toLocaleDateString();
        let idActiSelec = actis[0].id_actividad;
        let clientes = '';
        let idPerfilCli = await Helper.getPerfilIdFromSpecificId(actiSelected.id_cli,"Cliente");
        resp = await fetch(`http://${URLS['api-tarrito']}/perfil/${idPerfilCli}/`);
        respJson = await resp.json();
        clientes = respJson;
        let usu = await Helper.getUserWithAuthId(clientes.id_auth_user);
        this.setState({loading:false,actis,visitas,actiSelected,fecha,idActiSelec,visitasClientes:actis[0],clientes,usu,fechaFormatted:this.formatFecha(fecha)})
    }

    async RefreshVisitas(){
        console.log("hola?");
        let resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
        let respJson = await resp.json();
        let actis = respJson.filter((item,index)=>{
            return item.tipo_act == 3 && item.id_prof == null;
        });
        actis = actis.sort((first,second)=>{
            return first.fec_estimada > second.fec_estimada;
        });
        console.log("actis: ",actis);
        if(actis.length == 0){
            return;
        }   
        resp = await fetch(`http://${URLS['api-tarrito']}/visita/`);
        respJson = await resp.json();
        let visitas = respJson;     
        
        let actiSelected = actis[0];
        let fecha = actis[0].fec_estimada;        
        fecha = new Date(fecha);
        fecha = new Date(fecha.setDate(fecha.getDate() + 1))
        fecha = fecha.toLocaleDateString();
        let idActiSelec = actis[0].id_actividad;
        let clientes = '';
        let idPerfilCli = await Helper.getPerfilIdFromSpecificId(actiSelected.id_cli,"Cliente");
        resp = await fetch(`http://${URLS['api-tarrito']}/perfil/${idPerfilCli}/`);
        respJson = await resp.json();
        clientes = respJson;
        let usu = await Helper.getUserWithAuthId(clientes.id_auth_user);
        this.setState({loading:false,actis,visitas,actiSelected,fecha,idActiSelec,visitasClientes:actis[0],clientes,usu,fechaFormatted:this.formatFecha(fecha)})
    }

    renderItem(data){
        let clientes = this.state.clientes;
        return(
            <View>
                <View>
                    <View style={{flexDirection:'row', justifyContent: 'space-between',paddingLeft:'10%',paddingRight:'10%',alignSelf:'stretch',paddingTop:'5%'}}>
                        <Text style={{fontSize:25 ,color:'black',textAlignVertical:'center'}}>{data.item.nombre}</Text>
                        <TouchableOpacity onPress={()=>{
                            this.tomarVisita(data);
                        }}>
                            <Ionicons name="file-tray-full" size={40}/>
                            <Text style={{fontSize:12}}>Asignar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',paddingLeft:'5%',paddingRight:'5%'}}>
                        <Text>📍 </Text>
                        <Text style={{fontSize:17,fontStyle:'italic',textAlign:'left',color:'grey'}}>{clientes.direccion}</Text>                                            
                    </View>
                    <View style={{backgroundColor:'black',height:1,width:'100%', alignSelf:'center'}}></View>
                </View>
            </View>
        );
    }

    async tomarVisita(data){
        let id2 = await AsyncStorage.getItem('id2');

        let tomarVisita = {
            id_prof:id2,
            estado:2
        }

        let resp = await fetch(`http://${URLS['api-tarrito']}/activiad/${data.item.id_actividad}/`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(tomarVisita)
        });
        let respJson = await resp.json();
        if(resp.ok){
            this.setState({loading:true});
            Alert.alert('Éxito',"Se ha tomado la visita correctamente.",[{text:'Ok',onPress: ()=>{
                this.props.navigation.goBack();
            }}]);
        }
    }

    render() {
        var { showDatePicker,usu,fecha, fechaFormatted,clientes,visitas,visitasClientes,loading,actis,idActiSelec,actiSelected } = this.state;
        if(actis.length > 0){
            fechaFormatted = fecha;
            fechaFormatted = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
            var fechaComparaActi = Helper.dateToBdDate(fecha);
            if(fechaComparaActi.length < 10){
                fechaComparaActi = fechaComparaActi.substring(0,8)+0+fechaComparaActi.charAt(8);
            }
            var actisFilter = actis.filter((item,index)=>{            
                return (item.fec_estimada == fechaComparaActi);
            }); 
        }
        return (
            <View style={styles.orderScreen}>
                {
                loading?
                    <ActivityIndicator size="large" color="green"/>
                    :
                    <View>
                        {
                            actis.length == 0? 

                            <TouchableOpacity>                                
                                <Text style={{marginTop:'40%',fontSize:35,textAlign:'center',padding:'10%'}}>No hay visitas sin asignar en este momento.</Text>
                                <Button title={'actualizar'} color={'green'} onPress={async ()=>{await this.RefreshVisitas()}}/>
                            </TouchableOpacity>
                            :
                            <View>
                            <View style={{justifyContent:'space-around',alignSelf:'stretch'}}>
                            <Text></Text>
                            <Text style={styles.centerText}>Seleccione una fecha</Text>
                            <Text></Text>
                            <View style={{flexDirection:'row',alignSelf:'stretch',justifyContent:'center'}}>
                                <Text style={{textAlignVertical:'bottom',fontSize:25}}>{fechaFormatted}</Text>
                                <Text>     </Text>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({showDatePicker:true})
                                }}>
                                    <Ionicons name="md-calendar" size={40} color="black" />
                                </TouchableOpacity>
                            </View>                            
                            {
                                showDatePicker? 
                                <DateTimePicker 
                                    value={ new Date(fecha) }
                                    mode='default'
                                    display='calendar'
                                    onChange={
                                        (event,date)=>{  
                                            if(event.type === "dismissed"){
                                                this.setState({showDatePicker:false});
                                            }else{
                                                this.setState({fecha:date.toLocaleDateString(),showDatePicker:false});                                                
                                            }
                                        } 
                                    }/>
                                :
                                <Text></Text>
                            }
                       
                    </View>
                    <View style={{backgroundColor:'white',marginBottom:'100%',height:'50%'}}>
                        {
                            actisFilter.length == 0? 
                                <Text style={{marginTop:'45%',fontSize:30,textAlign:'center'}}>Lo sentimos, no hay visitas disponibles para éste día.</Text>
                                :
                                <FlatList data={actisFilter} keyExtractor={(item,index)=>index.toString()} renderItem={this.renderItem.bind(this)} style={{backgroundColor:'#fff'}}/>
                        }
                    </View>
                    </View>
                        }   
                        
                    </View>
                }       
        </View>
        );
    }
}
export default TomarVisita;