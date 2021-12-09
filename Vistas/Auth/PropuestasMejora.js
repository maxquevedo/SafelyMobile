import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Button, ActionSheetIOS, ActivityIndicator, Alert } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-community/picker';
import Helper from '../../Store/Helper';
import URLS from '../URLS';

class PropuestasMejora extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            propuestas:[],
            estadoPropuestas: [],
            tipoUsuario:'',
            mejoras:[],
            actividades: [],
            actividadSelected:'',
            fechaSelected:'',
            actiIdSelected:-1,
            actisConMejora:[],
            propuestaSelected: ''
        }
    }

    async componentDidMount(){
        let tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        let id2 = await AsyncStorage.getItem('id2');
        let actis = await Helper.getAllActis(id2,tipoUsuario);
        actis = actis.filter((item,index)=>{
            return item.tipo_act != 1;
        });
        console.log(actis.length);
        if(actis.length == 0){
            Alert.alert("Error","No hay actividades en este momento.",[{text:'Ok',onPress: ()=>{
                this.props.navigation.goBack();
            }}])
            return;
        }
        let actividadSelected = actis[0];
        let resp = await fetch(`http://${URLS['api-tarrito']}/mejora/`);
        let respJson = await resp.json();
        let actisConMejora = [];
        let actiIdSelected = actividadSelected.id_actividad;
        let mejoras = respJson.filter((item,index)=>{
            for(var i =0;i<actis.length;i++){
                if(item.id_actividad == actis[i].id_actividad){
                    if(tipoUsuario == 'Cliente' && actis[i].id_cli == id2){
                        actisConMejora.push(actis[i]);
                        return item;
                    }
                    if(tipoUsuario == 'Profesional' && actis[i].id_prof == id2){
                        actisConMejora.push(actis[i]);
                        return item;
                    }
                };
            }    
        });
        mejoras = mejoras.filter((item,index)=>{
            for(var i=0;i<actisConMejora.length;i++){
                if(actisConMejora[i].id_actividad == item.id_actividad){
                    return item;
                }
            }
        });
        let propuestaSelected = mejoras;
        let fechaSelected = Helper.bdDateToChileDate(actividadSelected.fec_estimada);        
        actividadSelected = actividadSelected.nombre;
        actis.sort((firs,second)=>{
            return(firs.id_actividad > second.id_actividad);
        });
        this.setState({tipoUsuario,actividadSelected,actividades:actis,propuestas:mejoras,fechaSelected,actiIdSelected,actisConMejora,loading:false,propuestaSelected});
    }

    refreshView = async () => {
        let tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        let id2 = await AsyncStorage.getItem('id2');
        let actis = await Helper.getAllActis(id2,tipoUsuario);
        if(actis.length == 0){
            return;
        }
        let actividadSelected = actis[0];
        let resp = await fetch(`http://${URLS['api-tarrito']}/mejora/`);
        let respJson = await resp.json();
        let actisConMejora = [];
        let actiIdSelected = actividadSelected.id_actividad;
        let mejoras = respJson.filter((item,index)=>{
            for(var i =0;i<actis.length;i++){
                if(item.id_actividad == actis[i].id_actividad){
                    if(tipoUsuario == 'Cliente' && actis[i].id_cli == id2){
                        actisConMejora.push(actis[i]);
                        return item;
                    }
                    if(tipoUsuario == 'Profesional' && actis[i].id_prof == id2){
                        actisConMejora.push(actis[i]);
                        return item;
                    }
                };
            }    
        });
        mejoras = mejoras.filter((item,index)=>{
            for(var i=0;i<actisConMejora.length;i++){
                if(actisConMejora[i].id_actividad == item.id_actividad){
                    return item;
                }
            }
        });
        let propuestaSelected = actisConMejora.filter((item,index)=>{
            return item.id_actividad == actiIdSelected;
        });
        let fechaSelected = Helper.bdDateToChileDate(actividadSelected.fec_estimada);        
        actividadSelected = actividadSelected.nombre;
        actis.sort((firs,second)=>{
            return(firs.id_actividad > second.id_actividad);
        });
        this.setState({tipoUsuario,actividadSelected,actividades:actis,propuestas:mejoras,fechaSelected,actiIdSelected,actisConMejora,loading:false,propuestaSelected});
    }

    componentWillUnmount(){
        this.setState({propuestas:[],tipoUsuario:'',mejoras:[],actividades:[],actividadSelected:'',
            fechaSelected:'',actiIdSelected:-1,actisConMejora:[],propuestaSelected:''});
    }



    changeCheckState = async (item,action) => {
        let act = action === "aprobar"? true:false;
        let bodie = {
            aceptacion:act
        }
        let resp = await fetch(`http://${URLS['api-tarrito']}/mejora/${item.id_mejora}/`,{            
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(bodie)
        });
        let respJson = await resp.json();
        if(resp.ok){
            Alert.alert("Éxtio","Se ha modificado la propuesta correctamente",[{text:'Ok',onPress:this.refreshView.bind(this)}]);
        }
    }

    render() {
        const { propuestaSelected,propuestas,estadoPropuestas,tipoUsuario,actividadSelected,actividades,fechaSelected,actiIdSelected,loading } = this.state;
        return (
            <View style={{flex:1,justifyContent:'space-between',alignContent:'center'}}>
                {
                    loading?
                    <ActivityIndicator size="large" color="green"/>
                    :
                    <View>
                        <Text></Text>
                        <Text style={styles.centerText}>Seleccione actividad relacionada</Text>
                        <Text></Text>
                        <Picker 
                            selectedValue={actividadSelected}
                            style={{textAlign:'center',backgroundColor:'white'}}
                            onValueChange={(itemValue,index)=>{
                                let items = itemValue.split('- ');
                                let actiIdSelected = items[2];                                
                                let propuestaSelected = propuestas.filter((item,index)=>{
                                    return item.id_actividad == actiIdSelected;
                                });
                                this.setState({actividadSelected:itemValue,fechaSelected:items[1],actiIdSelected,propuestaSelected})
                            }}
                        >
                            {                        
                                actividades.map((item,index)=>{
                                    var show = item.nombre+"- "+item.fec_estimada+'- '+item.id_actividad;
                                    return (<Picker.Item key={index+toString()+'-Act'} label={show} value={show}/>);
                            })
                            }
                        </Picker>
                        {
                            propuestaSelected.map((item,index)=>{
                                let color = "white";
                                if(index %2 ==0){
                                    color= "#A2AFA2";
                                }                                                              
                                let colorCheckApro = "black";
                                let colorCheckRecha = "black";
                                if(item.aceptacion == false){
                                    colorCheckRecha = "red";
                                }else if(item.aceptacion == true){
                                    colorCheckApro = "green";
                                }
                                return(
                                <View style={{backgroundColor:color,flexDirection:'row',padding:'8%',justifyContent:'space-around'}} key={index.toString()} >
                                    <Text>     </Text>
                                    <Text style={styles.text}>{item.propuesta}</Text>
                                    <Text>   </Text>
                                    {
                                        tipoUsuario === 'Cliente'?
                                        <Ionicons name="md-checkmark-circle-outline" size={35} color={colorCheckApro} />:    
                                        <TouchableOpacity onPress={()=>{this.changeCheckState(item,'aprobar')}}>
                                            <Ionicons name="md-checkmark-circle-outline" size={35} color={colorCheckApro} />
                                        </TouchableOpacity>
                                    }
                                    <Text>  </Text>
                                    {
                                        tipoUsuario === 'Cliente'?
                                        <Ionicons name="md-close-circle-outline" size={35} color={colorCheckRecha} />:
                                        <TouchableOpacity onPress={()=> this.changeCheckState(item,'rechazar')}>
                                            <Ionicons name="md-close-circle-outline" size={35} color={colorCheckRecha} />
                                        </TouchableOpacity>    
                                    }                            
                                </View>)
                            })
                        }
                    </View>
                }
            </View>
        );
    }
}

export default PropuestasMejora;