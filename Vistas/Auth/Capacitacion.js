//import liraries
import React, { Component } from 'react';
import { View, FlatList, Button,ActivityIndicator,Text, TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

// create a component
class Capacitacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            solicitudes:['Wena'],
            fechaSeleccionada: new Date(),
            tipoUsu:'Cliente',
            refreshList: false,
            showDatePicker: false,
            asistentes:'',
            materiales:'',
            capaElegida:[],
            backColor:'fff',
            selectedIndex:-1,
            listaAsistentes:[]
        }    
    }

    async componentDidMount(){
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
        let fecha =new Date(data.item[6]).toLocaleDateString();
        let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
        let backColor = "fff";
        if(data.index%2 == 0){
            backColor= "#A2AFA2"
        }
        return(
            <View style= {{ backgroundColor:backColor, flexDirection:'row' }}>
                <Text style={{fontSize: 25, paddingLeft: '5%', paddingRight:'5%'}}>{ fechaFormat }</Text>
                <Text style={{fontSize: 25, paddingLeft:'30%'}}>{ data.item[4] }</Text>
            </View>
        );
    }
   
    renderItemPro(data){
        var { backColor, selectedIndex } = this.state;
        //console.log("Hnito que wea: ",data);
        let fecha =new Date(data.item[6]).toLocaleDateString();
        let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
        if(data.index == selectedIndex){
            backColor= "#A3AFA2"
        }else{
            backColor= "#fff"
        }
        return(
            <TouchableOpacity style={{ backgroundColor:backColor, flexDirection:'row' }} onPress={()=> {
                console.log(data.item[3]);
                this.setState({capaElegida:data.item, selectedIndex:data.index,listaAsistentes:data.item[3]})
                }}>
                <Text style={{fontSize: 25, paddingLeft: '5%', paddingRight:'5%'}}>{ fechaFormat }</Text>
                <Text style={{fontSize: 25, paddingLeft:'30%'}}>{ data.item[4] }</Text>
            </TouchableOpacity>
        );
    }

   async crearCapacitacion(){
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
   }

   async rechazarCapacitacion(){
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
   }

    async solicitarCapacitacion(){
        let fecha = this.state.fechaSeleccionada;
        let id = await AsyncStorage.getItem("id2");
        let participantes = this.state.asistentes;
        let jeison = {
            idCli: id,
            fecha: fecha.toLocaleDateString(),
            participantes
        }
        let resp = await fetch(`http://10.0.2.2:8080/solicitarCapacitacion`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body:JSON.stringify({jeison})
        });
        let respJson = await resp.json();
        this.refreshSolicitudes();
    }

    clienteView(){
        const { solicitudes,refreshList,fechaSeleccionada,showDatePicker } = this.state;
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 15);
        let fecha =new Date(fechaSeleccionada).toLocaleDateString();
        let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
        return(
            <KeyboardAvoidingView style={{flex:1}}>
                <KeyboardAvoidingView style={{flex:0.1,marginTop:'15%'}}>
                    <KeyboardAvoidingView style={{"flexDirection":"row","justifyContent":"center","direction":"inherit","flexWrap":"nowrap"}}> 
                        <Text style={{fontSize:25}}>{ fechaFormat } </Text>
                        {
                            showDatePicker? <DateTimePicker
                                                testID="dateTimePicker"
                                                value={new Date(fechaSeleccionada)}
                                                mode={"date"}
                                                is24Hour={true}
                                                display="calendar"
                                                minimumDate = { minDate }
                                                onChange={(event,selectedDate)=>{this.setState({fechaSeleccionada:selectedDate})}}
                                            />:
                                            <Text></Text>
                        }
                        <TouchableOpacity onPress={()=> {this.setState({showDatePicker:true})}}>
                            <Ionicons name="md-calendar" size={32} color={ "black"} />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{flex:0.2, alignItems:'center'}}>
                    <TextInput
                        multiline={true}
                        placeholder="Asistentes aquí"
                        numberOfLines={4}
                        onChangeText={(asistentes) => this.setState({asistentes,showDatePicker:false})}
                        value={this.state.asistentes}/>
                </KeyboardAvoidingView>

                <View style={{flex:0.1}}>
                   <Button title="Solicitar capacitacion" color="#095813" onPress={()=>{this.solicitarCapacitacion()}}/>
                </View>
                <View style={{flex:0.6, marginTop:'10%'}}>
                    <View style={styles.FieldSeparator}></View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 25 }}>Fecha capacitación</Text>
                        <Text style={{fontSize: 25, paddingLeft:'15%'}}>Estado</Text>
                    </View>
                    <View style={styles.FieldSeparator}></View>
                    <FlatList data={solicitudes} refreshing={refreshList} onRefresh={this.refreshSolicitudes.bind(this)} renderItem={this.renderItem} keyExtractor={(item,index)=> index.toString() }/>
                </View>
            </KeyboardAvoidingView>
        );
    }

    proView(){
        const { solicitudes,refreshList,listaAsistentes,capaElegida } = this.state;
        console.log(capaElegida);
        return(
            <KeyboardAvoidingView style={{flex:1}} behavior="height">
                <KeyboardAvoidingView style={{flex:0.2, alignItems:'center'}} behavior="padding">
                    <Text style={{fontSize:25}}>Materiales</Text>
                    <TextInput
                        multiline={true}
                        placeholder="materiales aquí"
                        numberOfLines={4}
                        onChangeText={(materiales) => this.setState({materiales})}
                        value={this.state.materiales}/>
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
                    <FlatList data={solicitudes} refreshing={refreshList} onRefresh={this.refreshSolicitudes.bind(this)} renderItem={this.renderItemPro.bind(this)} keyExtractor={(item,index)=> index.toString() }/>
                </KeyboardAvoidingView>
            </KeyboardAvoidingView>
        );
    }

    render() {
        const { loading, tipoUsu,showDatePicker } = this.state;
        console.log(showDatePicker);
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