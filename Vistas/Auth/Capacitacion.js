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
        }    
    }

    async componentDidMount(){
        const { navigation } = this.props;
        let tipoUsu = await AsyncStorage.getItem('tipoUsuario')
        this.setState({tipoUsu});
        if(tipoUsu == 'Cliente'){
            navigation.setOptions({ title:'Solicitar capacitación' });
            var idCli = await AsyncStorage.getItem('id2');
            var resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
            var respJson = await resp.json();
            var capas = respJson.filter((item)=>{
                return item.id_cli == idCli;
            });
            console.log(capas);
            this.setState({solicitudes:capas})
        }else{

        }
        /*
        const {navigation} = this.props;
        let date = this.state.fechaSeleccionada;
        date.setDate(date.getDate()+15);
        let tipoUsu = await AsyncStorage.getItem('tipoUsuario');
        if(tipoUsu == 'Cliente'){
            navigation.setOptions({ title:'Solicitar capacitación' });
            var idCli = await AsyncStorage.getItem('id2');
            var resp = await fetch(`http://10.0.2.2:8080/solicitudes/capacitacionCli/${idCli}`);
            var respJson = await resp.json();
        }else{
            navigation.setOptions({ title:'Crear capacitación' });
            var idPro = await AsyncStorage.getItem('id2');
            var resp = await fetch(`http://10.0.2.2:8080/solicitudes/capacitacionPro/${idPro}`);
            var respJson = await resp.json();
        }
        //console.log(respJson);
        this.setState({solicitudes: respJson,loading:false,tipoUsu,fechaSeleccionada:date});
        */
    }

    async refreshSolicitudes(){
        /*
        let tipoUsu = await AsyncStorage.getItem('tipoUsuario');
        if(tipoUsu == 'Cliente'){
            let idCli = await AsyncStorage.getItem('id2');
            let resp = await fetch(`http://10.0.2.2:8080/solicitudes/capacitacionCli/${idCli}`);
            var respJson = await resp.json();
        }else{
            let idPro = await AsyncStorage.getItem('id2');
            let resp = await fetch(`http://10.0.2.2:8080/solicitudes/capacitacionPro/${idPro}`);
            var respJson = await resp.json();
        }
        this.setState({solicitudes: respJson,loading:false,showDatePicker:false,asistentes:''});
        */
    }

    renderItem(data){
        //console.log("Hnito que wea: ",data);
        //let fecha =new Date(data.item[6]).toLocaleDateString();
        console.log(data)
        let fecha = data.item.fec_estimada;
        let fechaF = fecha[8]+fecha[9]+'/'+fecha[5]+fecha[6]+'/'+fecha[0]+fecha[1]+fecha[2]+fecha[3]
        var estados = ['','Solicitado','Pendiente','Realizado','Cancelado'];
        var color = 'fff';
        if(data.index%2 === 0){
            color = '#A2AFA2';
        }
                                    
        return(
        <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:color}}>
            <Text style={styles.text}>{fechaF}</Text>
            <Text style={styles.text}>{estados[data.item.estado]}</Text>
        </View>)
        /*
        let fecha = new Date().toLocaleDateString();
        let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
        let backColor = "fff";
        if(data.index%2 == 0){
            backColor= "#A2AFA2"
        }
        return(
            <View style= {{ backgroundColor:backColor, flexDirection:'row' }}>
                <Text style={{fontSize: 25, paddingLeft: '5%', paddingRight:'5%'}}>{ fechaFormat }</Text>
                <Text style={{fontSize: 25, paddingLeft:'30%'}}>{ data.item }</Text>
            </View>
        );*/
    }
   
    renderItemPro(data){
        var { backColor, selectedIndex, fechaFormat } = this.state;
        //console.log("Hnito que wea: ",data);
        //let fecha =new Date(data.item[6]).toLocaleDateString();
        //let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
        if(data.index == selectedIndex){
            backColor= "#A3AFA2"
        }else{
            backColor= "#fff"
        }
        return(
            <TouchableOpacity style={{ backgroundColor:backColor, flexDirection:'row' }} onPress={()=> {
                //console.log(data.item[3]);
                this.setState({capaElegida:data.item, selectedIndex:data.index,listaAsistentes:data.item[3]})
                }}>
                <Text style={{fontSize: 25, paddingLeft: '5%', paddingRight:'5%'}}>{ fechaFormat }</Text>
                <Text style={{fontSize: 25, paddingLeft:'30%'}}>{ data.item }</Text>
            </TouchableOpacity>
        );
    }

   async crearCapacitacion(){
       /*
        //console.log("Entró a crearCapa");
        var { capaElegida,asistentes, materiales,listaAsistentes} = this.state;
        let idCli = await AsyncStorage.getItem("id2");
        let idPro =capaElegida[2];
        let participantes = listaAsistentes;
        let fecha = capaElegida[6];
        let idSol = capaElegida[0];
        let jeison = {
            idCli,
            idPro,
            fecha: (new Date(fecha)).toLocaleDateString(),
            participantes,
            materiales,
            idSol
        }
        let resp = await fetch(`http://10.0.2.2:8080/crearCapacitacion`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body:JSON.stringify({jeison})
        });
        let respJson = await resp.json();
        this.setState({capaElegida:[],listaAsistentes:[],selectedIndex:-1,materiales:'',asistentes:''})
        this.refreshSolicitudes();
        */
   }

   async rechazarCapacitacion(){
       /*
    var { capaElegida } = this.state;
        let idSol = capaElegida[0];
        let resp = await fetch(`http://10.0.2.2:8080/rechazarCapacitacion/${idSol}`,{
            method:'PUT',
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            }
        });
        this.setState({capaElegida:[],listaAsistentes:[],selectedIndex:-1,materiales:'',asistentes:''})
        this.refreshSolicitudes();
        */
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
                            <FlatList data={solicitudes} renderItem={this.renderItem.bind(this)} keyExtractor={(item,index)=>{index.toString()}}/>
                    </View>
                </View>
            </View>
        );
    }

    proView(){
        const { solicitudes,refreshList,listaAsistentes,capaElegida } = this.state;
        //console.log(capaElegida);
        return(
            <KeyboardAvoidingView style={{flex:1}} behavior="height">
                <KeyboardAvoidingView style={{flex:0.2, alignItems:'center'}} behavior="padding">
                    <Text style={{fontSize:25}}>Materiales</Text>
                    <TextInput
                        multiline={true}
                        placeholder="materiales aquí"
                        numberOfLines={4}
                        onChangeText={(materiales) => this.setState({materiales})}
                        value={this.state.materiales.toString()}/>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{flex:0.2, alignItems:'center'}} behavior="padding">
                <ScrollView >
                    <Text style={{fontSize:25}}>Asistentes</Text>
                    <Text>{listaAsistentes}</Text>
                </ScrollView>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{flex:0.1}}>
                    {
                        capaElegida[4] == 'enviada'? <Button title="Confirmar capacitacion" color="#095813" onPress={ ()=> {this.crearCapacitacion()}}/>:<Text></Text>
                    }
                </KeyboardAvoidingView>
                <View style={{flex:0.1}}>
                    {
                        capaElegida[4] == 'enviada'?<Button title="Rechazar capacitacion" color="#095813" onPress={ ()=> {this.rechazarCapacitacion()}}/>:<Text></Text>
                    }                    
                </View>
                <KeyboardAvoidingView style={{flex:0.4}}>
                    <View style={styles.FieldSeparator}></View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 25 }}>Fecha capacitación</Text>
                        <Text style={{fontSize: 25, paddingLeft:'15%'}}>Estado</Text>
                    </View>
                    <View style={styles.FieldSeparator}></View>
                    <FlatList data={['Hola']} refreshing={refreshList} onRefresh={this.refreshSolicitudes.bind(this)} renderItem={this.renderItemPro.bind(this)} keyExtractor={(item,index)=> index.toString() }/>
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