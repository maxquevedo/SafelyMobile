import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Button, Touchable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URLS from '../URLS';
import styles from '../styles';
import Helper from '../../Store/Helper';
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
            showDatePicker:false,
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
        this.setState({loading:false,actis,visitas,actiSelected,fecha,idActiSelec,
            visitasClientes:actis[0],fechaFormatted:this.formatFecha(fecha), checks})
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
        this.setState({loading:false,actis,visitas,actiSelected,fecha,idActiSelec,
            visitasClientes:actis[0],fechaFormatted:this.formatFecha(fecha), checks})
    }

    renderItem(data){
        let clientes = this.state.clientes;
        return(
            <View>
                <View>
                    <View style={{flexDirection:'row', justifyContent: 'space-between',paddingLeft:'10%',paddingRight:'10%',alignSelf:'stretch',paddingTop:'5%'}}>
                        <Text style={{fontSize:25 ,color:'black',textAlignVertical:'center'}}>{data.item.nombre}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity>
                                <Ionicons name="md-checkmark-circle-outline" size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="close-circle-outline" size={40}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:12}}>Asignar</Text>
                            <Text style={{fontSize:12}}>Rechazar</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    async tomarVisita(data){
        let id2 = await AsyncStorage.getItem('id2');

        let tomarVisita = {
            id_prof:id2
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
        var {checks,fecha,fechaFormatted,loading,actis,idActiSelec,actiSelected } = this.state;
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
                                <Picker selectedValue={actiSelected} onValueChange={(item,index)=>{
                                    
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
                                <FlatList data={checks} keyExtractor={(item,index)=>index.toString()} renderItem={this.renderItem.bind(this)} style={{backgroundColor:'#fff'}}/>
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
/*
//import liraries
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator,FlatList,TouchableOpacity,Alert,TextInput,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisitaCheckForm from '../Forms/VisitaCheckForm';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
// create a component
class Visita extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            checks: [['Not ok','check1','quiza ok'],
        ['ok','check2','oko']],
            //nombresChecks: ['hola'],
            comentarios: '',
            estadoChecks: ['0',0],
            failedChecks: ['not ok'],
            checksFallidos: ['not ok1'],
            checksNoFallidos:['ok1'],
            redIndexes:['0','1'],
            greenIndexes:[],
            color1: 'black',
            color2: 'black'
        }
    }

    async componentDidMount(){
        /*
        let id = await AsyncStorage.getItem('id2');
        let id_cli = '';
        let resp = await fetch(`http://10.0.2.2:8080/profesionales/${id}`);
        let respJson = await resp.json();
        let nombres = [];
        let estados = [];
        id_cli = respJson[5];
        resp = await fetch(`http://10.0.2.2:8080/checks/${id}/${id_cli}`);
        respJson = await resp.json();
        //console.log(respJson[0])
        for(var i =0 ; i<respJson.length ; i++){
            nombres.push(respJson[i][1]);
            estados.push(respJson[i][4]);
        }
        this.setState({nombresChecks:nombres,estadoChecks:estados,loading:false,checks:respJson})
        
    }

    async prueba(data,check){
        
        var { checksFallidos,redIndexes,greenIndexes,checksNoFallidos } = this.state;
        var item = data.item;
        var indexToPop = -1;
        //isInAprobar
        var aprobar = false;
        //isInRechazar
        var rechazar = false;
        var estadoChecks = this.state.estadoChecks;
        var wasHere = false;
        estadoChecks[data.index] = 1;

        if(checksFallidos.length == 0 && checksNoFallidos.length == 0){
            if(check == "aprobar"){
                checksNoFallidos.push(data.item);
                greenIndexes.push(data.index);
                this.setState({checksNoFallidos,greenIndexes});
                return;
            }else{
                checksFallidos.push(data.item);
                redIndexes.push(data.index);
                this.setState({checksFallidos,redIndexes});
                return;
            }
        } 
        for(var i=0;i<checksFallidos.length;i++){
            if(item == checksFallidos[i]){
                rechazar = true;
                wasHere = true;
                indexToPop = i;
                continue;
            }
        }

        for(var i=0;i<checksNoFallidos.length;i++){
            if(data.item == checksNoFallidos[i]){
                aprobar = true;
                wasHere = true;
                indexToPop = i;
                continue;
            }
        }

        if(rechazar && check == "aprobar"){
            //Borrarlo de rechazar
            if(indexToPop != -1){
                checksFallidos.splice(indexToPop,1);
                redIndexes.splice(indexToPop,1);
                aprobar = true;
                rechazar = false;
            }
        }

        if(aprobar && check == "rechazar"){
            //Borrarlo de aprobar
            if(indexToPop != -1){
                checksNoFallidos.splice(indexToPop,1);
                greenIndexes.splice(indexToPop,1);
                rechazar = true;                
                aprobar = false;
            }
        }

        if(aprobar || (!wasHere && check == "aprobar")){
            checksNoFallidos.push(data.item);
            greenIndexes.push(data.index);
            this.setState({checksFallidos,checksNoFallidos,redIndexes,greenIndexes});
        }

        if(rechazar || (!wasHere && check == "rechazar")){
            checksFallidos.push(data.item);
            redIndexes.push(data.index);
            this.setState({checksFallidos,checksNoFallidos,redIndexes,greenIndexes});
        }
    }

    renderItem = (data) => {
        var { greenIndexes, redIndexes,estadoChecks,color2,color1,checksFallidos,checksNoFallidos } = this.state;
        var estado = this.state.estadoChecks[data.index];
        var itemToUpdate = data.item;
        var isInRedindex = false;
        var isInGreenIndex = false;
        for(var i=0;i<redIndexes.length;i++){
            if(data.index == redIndexes[i]){
                color1 = "red";
                color2 = "black";
                isInRedIndex = true;
                break;
            }
        }
        for(var i=0;i<greenIndexes.length;i++){
            if(data.index == greenIndexes[i]){
                color1 = "black";
                color2 = "green";
                isInGreenIndex = true;
                break;
            }
        }
        if(isInRedindex){
            color1 = "red";
            color2 = "black";
        }

       return(<View  style={{justifyContent:'space-around',padding:30}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <Text style={{fontSize:25}}>{((data.index)+1)+" - " +data.item[1]} </Text>
                            <TouchableOpacity onPress={()=> this.prueba(data,"rechazar")}>
                                <Ionicons name="md-close-circle" size={25} color={color1}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this.prueba(data,"aprobar")}>
                                <Ionicons name="md-checkmark-circle" size={25} color={ color2} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.FieldSeparator}></View>
                    </View>);
    }
    
    async _generarInforme(){
        /*
        const { checks,checksFallidos,checksNoFallidos } = this.state;
        let rechazados = checksFallidos.length;
        let aprobados = checksNoFallidos.length;
        let idCli = await AsyncStorage.getItem("id2");

        if(aprobados + rechazados != checks.length){
            Alert.alert('Error','No has completado todos los checks',[{text:'Ok'}]);
        }else{
            var template =`\n Visita finalizada.\n\n `;
            template += `\t\t\t\t\t\t\t\t\tFallidos:`;
            for(var i =0;i<checksFallidos.length;i++){
                template += `\n \t\t\t\t${checksFallidos[i][1]}`;
            }
            template += `\n\n\t\t\t\t\t\t\t\t\tAprobados: \n`
            for(var i =0;i<checksNoFallidos.length;i++){
                template += `\n \t\t\t\t${checksNoFallidos[i][1]}`;
            }
            Alert.alert("Informe",template,[{text:'Ok'}]);
            //console.log(checksFallidos);
            let jeison = {
                idCli,
                checks: checksFallidos
            }
            let resp = await fetch(`http://10.0.2.2:8080/crearMejora`,{
                method:'POST',
                headers: {
                    'Content-Type':'application/json; charset="UTF-8"'
                },
                body:JSON.stringify({jeison})
            });
            let respJson = await resp.json();
            //console.log(respJson);
            this.setState({ checksFallidos: [], checksNoFallidos:[], redIndexes:[], greenIndexes:[] })
        }
        
    }


    render() {
        const { checks,estadoChecks,loading } = this.state;

        return (
            <View style={{flex:1}}>
                <View style={styles.orderScreen}>
                    <View style={{justifyContent:'space-around'}}>
                        <View><Text></Text></View>
                        <View><Text></Text></View>
                        {
                            loading? <ActivityIndicator size="large" color="#095813"/>:
                            <FlatList data={checks} extraData={estadoChecks} renderItem={this.renderItem} keyExtractor={(item,index) => index.toString()}/>
                        }
                        
                        <View>
                            <KeyboardAvoidingView style={{alignSelf:'stretch',backgroundColor:'#BABABA'}}>
                                <TextInput
                                    style={{textAlign:'center'}}
                                    multiline={true}    
                                    numberOfLines={10}
                                    placeholder={"Detalles..."}
                                    onChangeText={(comentarios) => this.setState({comentarios:comentarios})}
                                    value={this.state.text}
                                />
                            </KeyboardAvoidingView>
                            <View>
                                <View><Text></Text><Text></Text></View>
                                <Button color="#095813" onPress={ ()=> this._generarInforme() } title="generar informe"/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

//make this component available to the app
export default Visita;

*/