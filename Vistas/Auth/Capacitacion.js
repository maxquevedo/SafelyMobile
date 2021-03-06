//import liraries
import React, { Component } from 'react';
import { View, FlatList, Button,ActivityIndicator,Text, TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import URLS from '../URLS';

// create a component
class Capacitacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            solicitudes:[],
            fechaSeleccionada: new Date().setDate(new Date().getDate() + 15),
            fechaFormat: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
            tipoUsu:'Cliente',
            refreshList: false,
            showDatePicker: false,
            asistentes:[],
            materiales:'',
            capaElegida:[],
            backColor:'fff',
            selectedIndex:-1,
            listaAsistentes:[],
            listaMateriales:[],
        }    
    }

    async componentDidMount(){
        const { navigation } = this.props;
        let tipoUsu = await AsyncStorage.getItem('tipoUsuario')
        //this.setState({tipoUsu});
        if(tipoUsu == 'Cliente'){
            navigation.setOptions({ title:'Solicitar capacitación' });
            var idCli = await AsyncStorage.getItem('id2');
            var resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
            var respJson = await resp.json();
            var capas = respJson.filter((item)=>{
                return item.id_cli == idCli;
            });
            this.setState({solicitudes:capas,tipoUsu})
        }else{
            var idPro = await AsyncStorage.getItem('id2');
            var resp = await fetch(`http:${URLS['api-tarrito']}/activiad/`)
            var respJson = await resp.json();
            var capas = respJson.filter((item)=>{
                return ((item.idprof == null || item.idprof == idPro) && item.id_capacitacion != null);
            });
            resp = await fetch(`http://${URLS['api-tarrito']}/capacitacion/`)
            respJson = await resp.json();
            var materiales = respJson;
            this.setState({solicitudes:capas,listaMateriales:materiales,tipoUsu})
        }
    }

    async refreshSolicitudes(){
        let tipoUsu = await AsyncStorage.getItem('tipoUsuario');
        if(tipoUsu == 'Cliente'){
            let idCli = await AsyncStorage.getItem('id2');
            let resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
            var respJson = await resp.json();
            var capas = respJson.filter((item)=>{
                return item.id_cli == idCli;
            });
            this.setState({solicitudes:capas});
        }else{
            let idPro = await AsyncStorage.getItem('id2');
            let resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
            var respJson = await resp.json();
            let capas = respJson.filter((item)=>{
                return ((item.idprof == null || item.idprof == idPro) && item.id_capacitacion != null);
            });
            resp = await fetch(`http://${URLS['api-tarrito']}/capacitacion/`);
            respJson = await resp.json();
            let materiales = respJson;
            this.setState({solicitudes:capas,listaMateriales:materiales})
        }
    }

    renderItem(data){
        let fecha = data.item.fec_estimada;
        let fechaF = fecha[8]+fecha[9]+'/'+fecha[5]+fecha[6]+'/'+fecha[0]+fecha[1]+fecha[2]+fecha[3]
        var estados = ['','Solicitado','Pendiente','Realizado','Cancelado'];
        var color = 'fff';
        console.log(data);
        if(data.index%2 === 0){
            color = '#A2AFA2';
        }
                                    
        return(
        <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:color}}>
            <Text style={styles.text}>{fechaF}</Text>
            <Text style={styles.text}>{estados[data.item.estado]}</Text>
        </View>)
    }
   
    renderItemPro(data){
        var { backColor, selectedIndex, listaMateriales } = this.state;
        let fecha = new Date(data.item.fec_estimada);
        let dia = fecha.getDate()+1;
        if(dia.toString().length < 2){
            dia = '0'+dia    
        }
        let fechaFormateada = dia+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
        var estados = ['','Solicitado','Pendiente','Realizado','Cancelado'];
        if(data.index == selectedIndex){
            backColor= "#A3AFA2"
        }else{
            backColor= "#fff"
        }
        return(
            <TouchableOpacity style={{ backgroundColor:backColor, flexDirection:'row',justifyContent:'space-around'}} onPress={()=> {
                let id_capa = data.item.id_capacitacion;
                let materialesSelected = listaMateriales.filter((item)=>{
                    return item.id_capacitacion == id_capa;
                });
                let materiales = materialesSelected[0].materiales;
                this.setState({capaElegida:data.item, selectedIndex:data.index,listaAsistentes:data.item.descripcion,materiales})
                }}>
                <Text style={styles.text}>{ fechaFormateada }</Text>
                <Text style={styles.text}>{ estados[data.item.estado] }</Text>
            </TouchableOpacity>
        );
    }

   async crearCapacitacion(data){
        var { capaElegida,asistentes, materiales,listaAsistentes} = this.state;
        let idPro = await AsyncStorage.getItem('id2');
        let fec_ida = capaElegida.fec_estimada;
        var actividad = {
            id_prof:idPro,fec_ida,estado:2
        }
        var url = `http://${URLS['api-tarrito']}/activiad/${capaElegida.id_actividad}/`;
        var resp = await fetch(url,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(actividad)
        })
        var respJson = await resp.json();
        console.log(respJson);
        this.setState({capaElegida:[],listaAsistentes:[],selectedIndex:-1,materiales:'',asistentes:''})
        this.refreshSolicitudes();
   }

   async rechazarCapacitacion(){
        var { capaElegida,asistentes, materiales,listaAsistentes} = this.state;
        let idPro = await AsyncStorage.getItem('id2');
        console.log(capaElegida);
        var actividad = {
            id_prof:idPro,estado:4
        }
        var url = `http://${URLS['api-tarrito']}/activiad/${capaElegida.id_actividad}/`;
        var resp = await fetch(url,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(actividad)
        })
        var respJson = await resp.json();
        console.log(respJson);
        this.setState({capaElegida:[],listaAsistentes:[],selectedIndex:-1,materiales:'',asistentes:''})
        this.refreshSolicitudes();
   }

   fechaBd(fecha){
        let año = fecha[6]+fecha[7]+fecha[8]+fecha[9];
        let mes = fecha[3]+fecha[4];
        let dia = fecha[0]+fecha[1];
        var fechaBd = año+'-'+mes+'-'+dia;
        return fechaBd;
    }

    async solicitarCapacitacion(props){
        const { materiales,asistentes,fechaSeleccionada,listaAsistentes,fechaFormat } = this.state;
        const { navigation } = this.props;

        var fecha = new Date(fechaSeleccionada);
        var dia = fecha.getDate();
        if(dia.toString().length < 2){
            dia = '0'+dia
        }
        var fechaPreBd = dia+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear();
        var id_cli = await AsyncStorage.getItem('id2');
        var username = await AsyncStorage.getItem('username');
        var nombre = "Capacitacion-"+username;
        var estado = 0;
        var asisten = asistentes.split(',');
        var cant_asistentes = asisten.length;
        var capa = {
            nombre, cant_asistentes,materiales,estado
        };

        var url = `http://${URLS['api-tarrito']}/capacitacion/`
        var resp = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(capa)
        });
        var respJson = await resp.json();
        if(respJson){
            var id_capacitacion = respJson.id_capacitacion;
            var tipo_act = 1;
            var act_extra = false;
            var fec_estimada = this.fechaBd(fechaPreBd);
            var fec_ida = null;
            var estado = 1;
            var actividad = {
                nombre, descripcion:asistentes,tipo_act,act_extra,fec_estimada,
                fec_ida,estado,id_cli,id_prof:null,id_capacitacion
            };
            url = `http://${URLS['api-tarrito']}/activiad/`;
            resp = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(actividad)
            });
            respJson = await resp.json();
            if(respJson){
                Alert.alert('Éxito','Capacitación solicitada correctamente',[{text:'Ok',onPress:()=>{
                    navigation.goBack();
                }}])
            }
        }
    }

    clienteView(){
        const { solicitudes,refreshList,fechaSeleccionada,showDatePicker } = this.state;
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 15);
        let fecha =new Date(fechaSeleccionada).toLocaleDateString();
        let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
        return(
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}}>
                    <KeyboardAvoidingView style={{marginTop:'5%'}}>
                        <KeyboardAvoidingView style={{"flexDirection":"row","justifyContent":"center","direction":"inherit","flexWrap":"nowrap"}}> 
                            <Text style={{fontSize:25}}>{ fechaFormat } </Text>
                                {
                                    showDatePicker? 
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={new Date(fechaSeleccionada)}
                                            mode={"date"}
                                            is24Hour={true}
                                            display="calendar"
                                            minimumDate = { minDate }
                                            onChange={
                                                (event,selectedDate)=>{
                                                    if(event.type === "dismissed"){
                                                        this.setState({showDatePicker:!showDatePicker})
                                                    }else{
                                                        this.setState({fechaSeleccionada:selectedDate,showDatePicker:!showDatePicker})
                                                    }
                                                }
                                            }
                                            />
                                            :
                                            <Text></Text>
                                }
                                <TouchableOpacity onPress={()=> {this.setState({showDatePicker:true})}}>
                                    <Ionicons name="md-calendar" size={32} color={ "black"} />
                                </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </KeyboardAvoidingView>

                    <KeyboardAvoidingView style={{alignItems:'center',marginBottom:'5%'}}>
                        <Text style={styles.text}>Asistentes</Text>
                        <TextInput
                            multiline={true}
                            placeholder="Asistentes aquí"
                            numberOfLines={4}
                            onChangeText={(asistentes) => this.setState({asistentes})}
                            value={this.state.asistentes.toString()}/>
                        <Text style={styles.text}>Materiales</Text>
                        <TextInput
                            multiline={true}
                            placeholder="Asistentes aquí"
                            numberOfLines={4}
                            onChangeText={(materiales) => this.setState({materiales})}
                            value={this.state.materiales.toString()}/>
                    </KeyboardAvoidingView>
                    <Button title="Solicitar capacitacion" color="#18ac30" onPress={()=>{this.solicitarCapacitacion()}}/>
                </ScrollView>
                
                <View style={{flex:0.75}}>
                    <View style={{ marginTop:'10%'}}>
                        <View style={styles.FieldSeparator}></View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 25 }}>Fecha capacitación</Text>
                                <Text style={{fontSize: 25, paddingLeft:'15%'}}>Estado</Text>
                            </View>
                            <View style={styles.FieldSeparator}></View>
                            <FlatList data={solicitudes} renderItem={this.renderItem.bind(this)} keyExtractor={(item,index) => '0aB'+index.toString()}/>
                    </View>
                </View>
            </View>
        );
    }

    proView(){
        const { solicitudes,refreshList,listaAsistentes,capaElegida,materiales } = this.state;
        //console.log(capaElegida);
        return(
            <KeyboardAvoidingView style={{flex:1}} behavior="height">
                <KeyboardAvoidingView style={{flex:0.2, alignItems:'center'}} behavior="padding">
                    <Text style={{fontSize:25}}>Materiales</Text>
                    <View style={styles.FieldSeparator}></View>
                    <Text style={styles.centerText}>{materiales}</Text>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{flex:0.2, alignItems:'center'}} behavior="padding">
                    <Text style={{fontSize:25}}>Asistentes</Text>
                    <View style={styles.FieldSeparator}></View>
                    <Text style={styles.centerText}>{listaAsistentes}</Text>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{flex:0.1}}>
                    {
                        capaElegida.estado == 1? <Button title="Confirmar capacitacion" color="green" onPress={ ()=> {this.crearCapacitacion()}}/>:<Text></Text>
                    }
                </KeyboardAvoidingView>
                <View style={{flex:0.1}}>
                    {
                        capaElegida.estado == 1?<Button title="Rechazar capacitacion" color="red" onPress={ ()=> {this.rechazarCapacitacion()}}/>:<Text></Text>
                    }                    
                </View>
                <KeyboardAvoidingView style={{flex:0.4}}>
                    <View style={styles.FieldSeparator}></View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 25 }}>Fecha capacitación</Text>
                        <Text style={{fontSize: 25, paddingLeft:'15%'}}>Estado</Text>
                    </View>
                    <View style={styles.FieldSeparator}></View>
                    <FlatList data={solicitudes} refreshing={refreshList} onRefresh={this.refreshSolicitudes.bind(this)} renderItem={this.renderItemPro.bind(this)} keyExtractor={(item,index)=> index.toString() }/>
                </KeyboardAvoidingView>
            </KeyboardAvoidingView>
        );
    }

    render() {
        const { loading, tipoUsu } = this.state;
        //console.log(showDatePicker);
        return (
            <View style={{flex:2}}>
                {
                    loading? <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}><ActivityIndicator size="large" color="#095813"/></View>:
                    ( tipoUsu == "Cliente"? this.clienteView():this.proView() )
                }
            </View>
        );
    }
}


//make this component available to the app
export default Capacitacion;