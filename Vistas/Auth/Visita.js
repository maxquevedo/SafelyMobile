import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URLS from '../URLS';
import styles from '../styles';
import {Picker} from '@react-native-community/picker';

class Visita extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            fecha: new Date(),
            actis:[],
            actiSelected:'',
            idActiSelec:'',
            idCli:'',
            checks:'',
            checksPostVisita:[],
            showDatePicker:false,
            idCliCheck:'',
            refreshing: false,
            actiSelectedFormat: '',
        }
    }

    formatFecha(fecha){
        let deit = ''+fecha;
        deit = deit[8]+deit[9]+'/'+deit[5]+deit[6]+'/'+deit[0]+deit[1]+deit[2]+deit[3];
        return deit;
    }

    async componentDidMount(){
        let id2 = await AsyncStorage.getItem('id2');
        let resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
        let respJson = await resp.json();
        let actis = respJson.filter((item,index)=>{
            return item.tipo_act == 3 && item.id_prof == id2
                && item.estado == 2;
        });
        actis = actis.sort((first,second)=>{
            return first.fec_estimada > second.fec_estimada;
        });
        resp = await fetch(`http://${URLS['api-tarrito']}/visita/`);
        respJson = await resp.json();
        let visitas = respJson.filter((item,index)=>{
                return(item.estado != true);
        });        

        if(actis.length == 0){
            Alert.alert("Error","No hay visitas en este momento.",[{text:'Ok'}]);
            this.setState({loading:false});
            return;
        }
        let actiSelected = actis[0];
        let fecha = actis[0].fec_estimada;        
        fecha = new Date(fecha);
        fecha = new Date(fecha.setDate(fecha.getDate() + 1))
        fecha = fecha.toLocaleDateString();
        let idActiSelec = actis[0].id_actividad;
        let idCli = actis[0].id_cli;
        resp = await fetch(`http://${URLS['api-tarrito']}/clicheck/`);
        respJson = await resp.json();
        let idCliCheck = respJson.filter((item,index)=>{
            return item.id_cli == idCli;
        });
        if(idCliCheck.length == 0){
            Alert.alert('Error','El cliente aún no tiene checklist creado.',[{text:'Ok'}]);
            this.setState({loading:false});
            return;
        }
        idCliCheck = idCliCheck[0].id_clicheck;
        resp = await fetch(`http://${URLS['api-tarrito']}/checklist/`);
        respJson = await resp.json();
        let checks = respJson.filter((item,index)=>{
            return item.id_clicheck == idCliCheck;
        })
        this.setState({loading:false,actis,visitas,actiSelected,fecha,idActiSelec,idCli,idCliCheck,
            visitasClientes:actis[0],fechaFormatted:this.formatFecha(fecha), checks,checksPostVisita:checks});
    }

    async RefreshVisitas(){        
        let id2 = await AsyncStorage.getItem('id2');
        let resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
        let respJson = await resp.json();
        let actis = respJson.filter((item,index)=>{
            return item.tipo_act == 3 && item.id_prof == id2
                && item.estado == 2;
        });
        actis = actis.sort((first,second)=>{
            return first.fec_estimada > second.fec_estimada;
        });
        resp = await fetch(`http://${URLS['api-tarrito']}/visita/`);
        respJson = await resp.json();
        let visitas = respJson.filter((item,index)=>{
                return(item.estado != true);
        });        

        if(actis.length == 0){
            Alert.alert("Error","No hay visitas en este momento.",[{text:'Ok'}]);
            this.setState({loading:false});
            return;
        }
        let actiSelected = actis[0];
        let fecha = actis[0].fec_estimada;        
        fecha = new Date(fecha);
        fecha = new Date(fecha.setDate(fecha.getDate() + 1))
        fecha = fecha.toLocaleDateString();
        let idActiSelec = actis[0].id_actividad;
        let idCli = actis[0].id_cli;
        resp = await fetch(`http://${URLS['api-tarrito']}/clicheck/`);
        respJson = await resp.json();
        let idCliCheck = respJson.filter((item,index)=>{
            return item.id_cli == idCli;
        });
        if(idCliCheck.length == 0){
            Alert.alert('Error','El cliente aún no tiene checklist creado.',[{text:'Ok'}]);
            this.setState({loading:false});
            return;
        }
        idCliCheck = idCliCheck[0].id_clicheck;
        resp = await fetch(`http://${URLS['api-tarrito']}/checklist/`);
        respJson = await resp.json();
        let checks = respJson.filter((item,index)=>{
            return item.id_clicheck == idCliCheck;
        })
        this.setState({loading:false,actis,visitas,actiSelected,fecha,idActiSelec,idCli,idCliCheck,
            visitasClientes:actis[0],fechaFormatted:this.formatFecha(fecha), checks,checksPostVisita:checks});
    }

    renderItem(data){
        let checks = this.state.checks;
        let color1 = "black";
        let color2 = "black";
        if(data.item.verificacion == false){
            color2 = "red";
            color1 = "black";
        }else{
            color1 = "green";
            color2 = "black";
        }
        return(
            <View style={{paddingLeft:'5%'}}>
                <View>
                    <View style={{flexDirection:'row',alignSelf:'flex-start',paddingTop:'1%'}}>
                        <Text style={{fontSize:20 ,color:'black',textAlignVertical:'center'}}>{data.index+1}- {data.item.nombre}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Text>  </Text>
                            <TouchableOpacity style={{flexDirection:'column'}} onPress={()=>{
                                for(var i=0;i<checks.length;i++){
                                    if( checks[i].id_check == data.item.id_check){
                                        checks[i].verificacion = true;
                                        this.setState({checksPostVisita:checks});
                                    }
                                }
                            }}>
                                <Ionicons name="md-checkmark-circle-outline" size={30} color={color1}/>
                                <Text style={{fontSize:10}}>Aprobar</Text>
                            </TouchableOpacity>
                            <Text>    </Text>
                            <TouchableOpacity style={{flexDirection:'column'}} onPress={()=>{
                                    for(var i=0;i<checks.length;i++){
                                        if( checks[i].id_check == data.item.id_check){
                                            checks[i].verificacion = false;
                                            this.setState({checksPostVisita:checks});
                                        }
                                    }
                                }}>
                                <Ionicons name="close-circle-outline" size={30} color={color2}/>
                                <Text style={{fontSize:10}}>Rechazar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        var {actiSelectedFormat,checksPostVisita,refreshing,checks,fecha,fechaFormatted,loading,actis,idActiSelec,actiSelected,idCli } = this.state;
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
                                <Text style={{marginTop:'40%',fontSize:35,textAlign:'center',padding:'10%'}}>No hay visitas asignadas en este momento.</Text>
                                <Button title={'actualizar'} color={'green'} onPress={async ()=>{await this.RefreshVisitas()}}/>
                            </TouchableOpacity>
                            :
                            <View>
                            <View style={{justifyContent:'space-around',alignSelf:'stretch'}}>
                            <Text></Text>
                            <Text style={styles.centerText}>Seleccione una visita</Text>
                            <Text></Text>
                            <View style={{flexDirection:'column',alignSelf:'stretch',justifyContent:'center'}}>
                                <Picker selectedValue={actiSelectedFormat} onValueChange={async(item,index)=>{
                                    let actiSelected = actis.filter((item1,index1)=>{
                                        return item1.id_actividad == item;
                                    })
                                    actiSelected = actiSelected[0];
                                    var checks = this.state.checks;
                                    var idCliCheck = this.state.idCliCheck;
                                    var actiSelectedFormat = actiSelected.id_actividad;
                                    if(idCli == actiSelected.id_cli){
                                        let resp = await fetch(`http://${URLS['api-tarrito']}/checklist/`);
                                        let respJson = await resp.json();
                                        respJson = respJson.filter((item,index)=>{
                                            return item.id_clicheck == idCliCheck;
                                        });                            
                                        this.setState({checksPostVisita:respJson,actiSelected,actiSelectedFormat,checks:respJson,idActiSelec:actiSelected.id_actividad});
                                    }else{
                                        //sacar cli_checkid
                                        let resp = await fetch(`http://${URLS['api-tarrito']}/clicheck/`);
                                        let respJson = await resp.json();
                                        respJson = respJson.filter((item,index)=>{
                                            return item.id_cli == actiSelected.id_cli;
                                        });
                                        idCliCheck = respJson[0].id_clicheck;                                        
                        
                                        resp = await fetch(`http://${URLS['api-tarrito']}/checklist/`);
                                        respJson = await resp.json();
                                        respJson = respJson.filter((item,index)=>{
                                            return item.id_clicheck == idCliCheck;
                                        });
                                        this.setState({checksPostVisita:respJson,idCliCheck,checks:respJson,actiSelected,actiSelectedFormat,idActiSelec:actiSelected.id_actividad,idCli:actiSelected.id_cli});
                                    }
                                }}>
                                    {
                                        actis.map((item,index)=>{
                                            //return()                                    
                                            return(<Picker.Item key={item.id_actividad} label={item.nombre+'- '+item.fec_estimada+'- '+item.id_actividad} value={item.id_actividad}/>);
                                        })
                                    }
                                </Picker>
                            </View>                                                   
                    </View>
                    <View style={{backgroundColor:'white',marginBottom:'100%',height:'50%'}}>
                        {
                            checks.length == 0? 
                                <Text style={{marginTop:'45%',fontSize:30,textAlign:'center'}}>Este cliente aún no posee checks.</Text>
                                :
                                <View>
                                    <FlatList data={checksPostVisita} onRefresh={async ()=> await this.RefreshVisitas()} refreshing={refreshing} 
                                        keyExtractor={(item,index)=>index.toString()} renderItem={this.renderItem.bind(this)} 
                                        style={{backgroundColor:'#fff',flexDirection:'column',flexWrap:'wrap'}}/>
                                    <Button title="Finalizar visita" color="green" onPress={async ()=>{
                                        this.setState({loading:true});
                                        var resp;
                                        var respJson;
                                        checksPostVisita.map(async(item,index)=>{
                                            let enviar = {
                                                verificacion:item.verificacion
                                            };
                                            resp = await fetch(`http://${URLS['api-tarrito']}/checklist/${item.id_check}/`,{
                                                method:'PATCH',
                                                headers:{
                                                    'Content-Type':'application/json'                            
                                                },
                                                body:JSON.stringify(enviar)
                                            });
                                            respJson = await resp.json();                                    
                                        });                       
                                        let enviarActi = {
                                            estado:3
                                        }       
                                        resp = await fetch(`http://${URLS['api-tarrito']}/activiad/${idActiSelec}/`,{
                                            method:'PATCH',
                                            headers:{
                                                'Content-Type':'application/json'
                                            },
                                            body: JSON.stringify(enviarActi)
                                        });
                                        respJson = await resp.json();                                        
                                        Alert.alert("Éxito","Se ha finalizado la visita, por favor espere",[{text:'Ok',onPress:async()=>{                                    
                                            this.props.navigation.goBack();
                                        }}]);
                                        
                                    }}/>
                                </View>
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
export default Visita;