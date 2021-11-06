//import liraries
import React, { Component } from 'react';
import { View, Text,Button, TouchableOpacity,SafeAreaView,ActivityIndicator,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-community/picker';
import styles from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
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
            loading: false,
            showDatePicker: false,
            showPro: false,
            idCliente: '',
            idPro:'',
        }
  }
 
    componentDidMount = async()=> {
        /*
        let resp = await fetch('http://10.0.2.2:8080/clientes');
        let respJson = await resp.json();
        let clientos = [];
        //console.log(respJson);
        respJson.map((data)=>{
            clientos.push(data[3]);
            this.setState({clientes: clientos,clienteElecto:clientos[0]});
        });
        this.setState({loading:!this.state.loading})
        */
    }
    
    updateDate = (event,date) =>{
        /*
        // console.log("DATE: "+date.toLocaleDateString());
        let año = ''+date.getFullYear();
        let formatedDate = date.getDate()+'/'+((date.getMonth())+1)+'/'+año.substr(0,2);
        //console.log(formatedDate);
        let showDatePicker = this.state.showDatePicker;
        this.setState({fecha:date,showDatePicker:!showDatePicker});
        //console.log("Cambiando fecha")
        */
       this.setState({fecha:date,showDatePicker:false})
    }

    updatePro = async() => {
        /*
        const {clienteElecto,fecha,evento } = this.state;
        const fechosa = fecha.toLocaleDateString().replace("/","-").replace("/","-");
        let resp = await fetch(`http://10.0.2.2:8080/asignarPro/${clienteElecto}/${fechosa}/${evento}`);
        let respJson = await resp.json();
        let idCli = respJson.idCliente;
        console.log(respJson);
        if(respJson == -1){
            Alert.alert("Lo sentimos","No hay profesionales disponibles para esa fecha",[{
                text:'Confirmar',
                onPress: ()=> {}
            }])
            this.setState({showPro:false});
        }else{
            respJson = respJson.profesionalesLibres;
            let primero =respJson[0][2]+ respJson[0][3];
            let idPro = respJson[0][1];
            console.log("Primero: ",primero);
            this.setState({profesionales:respJson,showPro:true,profesionalElecto:primero,idCliente:idCli,idPro:idPro});
        }*/
    }

    updateEvento = async(idCli,idPro,fecha,evento) => {
        /*
        let deit = fecha.toLocaleDateString()
        let jeison = {
            idCli:idCli,idPro:idPro,fecha:deit,evento:evento
        }
        let resp = await fetch(`http://10.0.2.2:8080/asignarPro`,{
            method: "POST",
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body: JSON.stringify({jeison})
        });
        let respJson = await resp.json();
        console.log(respJson);
        */
    }

    render() {
        const { fecha,loading,showDatePicker,showPro,evento,idCliente,profesionales,profesionalElecto,idPro } = this.state;
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
                               return( <Picker.Item label={item} value={item} key={key} />);
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
                        onChange={(event,date)=>{  this.updateDate(event,date) } } />:<Text></Text>
                    }
                    
                    <Text style={styles.titleForm}>Evento</Text>
                    <Picker
                        selectedValue={this.state.evento}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>{
                            //console.log("itemValue: "+itemValue);
                            this.setState({evento: itemValue})
                        }
                        }>
                         <Picker.Item label="Asesoría" value="asesoria" />
                         <Picker.Item label="Visita" value="visita" />
                    </Picker>
                    <Button title="Consultar" color="#18ac30" onPress={this.updatePro}/>
                    <Text style={styles.titleForm}>Profesional</Text>
                    {
                        showPro? <View>
                        <Picker
                            selectedValue={this.state.profesionalElecto}
                            style={{height: 50, width: 200}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({profesionalElecto: itemValue})
                            }>
                            {
                                
                                 this.state.profesionales.map((item,key)=>{
                                     let pro = (item[2]+' '+item[3]);
                                    return( <Picker.Item label={pro} value={pro} key={key} />);
                                 })
                            }
                        </Picker>
                        <Button title="Asignar" color="#18ac30" onPress={async ()=>{
                            this.updateEvento(idCliente,idPro,fecha,evento);
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

//make this component available to the app
export default AsignarProfesional;