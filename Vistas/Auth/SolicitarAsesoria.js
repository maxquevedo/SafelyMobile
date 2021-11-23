//import liraries
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text,TouchableOpacity, Button, ActivityIndicator, TextInput, Alert } from 'react-native';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';
import URLS from '../URLS';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
class SolicitarAsesoria extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            fecha: new Date(),
            fechaStr: new Date().toLocaleDateString(),
            show: false,
            descripcion:'',
            estado:'',
            nombre:'Holi',
            asesoriaElegida: -1,
            tipo_ase:[],
        }
    }

    async componentDidMount(){
        let url = `http://${URLS['api-tarrito']}/tipoasesoria`;
        let resp = await fetch(url);
        let respJson = await resp.json();
        var dateFormat = new Date();
        var dateDay = dateFormat.getDate();

        if(dateDay.toString().length == 1 ){
            dateDay = '0'+dateDay;
        }

        var dateMonth = dateFormat.getMonth()+1;
        var dateYear = dateFormat.getFullYear();
        dateFormat = dateDay+'/'+dateMonth+'/'+dateYear;
        this.setState({tipo_ase:respJson,loading:false,nombre:respJson[0].nombre,asesoriaElegida:respJson[0].id_tipo_ase,fechaStr:dateFormat});
    }

    updateDate = (event,date) => {
        var dateFormat = new Date(date);
        var dateDay = dateFormat.getDate();

        if(dateDay.toString().length == 1 ){
            dateDay = '0'+dateDay;
        }

        var dateMonth = dateFormat.getMonth()+1;
        var dateYear = dateFormat.getFullYear();
        dateFormat = dateDay+'/'+dateMonth+'/'+dateYear;
        this.setState({fechaStr:dateFormat, show:false});
    }


    solicitar = async(props) => {

        const { tipo_ase,nombre,asesoriaElegida,descripcion } = this.state;
        const { navigation } = this.props;
        let url = `http://${URLS['api-tarrito']}/asesoria/`;
        let datos = {};
        let username = await AsyncStorage.getItem('username');
        datos.nombre =  username,
        datos.descripcion = descripcion;
        datos.estado = true;
        datos.id_tipo_ase = asesoriaElegida;
        
        let resp = await fetch(url,{
           method:'POST',
           headers:{
               'Content-Type':'application/json; charset="UTF-8"'
           },
           body: JSON.stringify(datos)
        });
        let respJson = await resp.json();
        console.log(respJson);
        if(respJson){
            Alert.alert("Éxito","Se ha enviado la solicitud con éxito.",[{text:'Ok',onPress:()=>{
                navigation.goBack();
            }}]);
        }
    }


    render() {
        const { fecha,show,fechaStr,tipo_ase,nombre,loading} = this.state;
        const { navigation } = this.props;
        //console.log(navigation)//
        return (
            <View style={styles.container}>
                    {
                        show?
                            <DateTimePicker 
                                value={ fecha }
                                mode='default'
                                display='calendar'
                                minimumDate={new Date()}
                                dateFormat='shortdate'
                                onChange={
                                    (event,date)=>{  
                                        if(event.type === "dismissed"){
                                            this.setState({show:false});
                                        }else{
                                            this.updateDate(event,date)    
                                        }
                                    } 
                                } 
                            />
                        :
                        (<View>
                            { !loading?
                            <View>
                                <View style={styles.cajaFlotante}>
                                    <View><Text style={styles.centerText}>Fecha</Text></View>
                                    <Text>   </Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.text}>{fechaStr}</Text>
                                        <Text>   </Text>
                                        <TouchableOpacity onPress={()=>{
                                            this.setState({show:true});
                                        }}>
                                            <Ionicons name="calendar-outline" size={31}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <View><Text style={styles.centerText}>Tipo de asesoría</Text></View>
                                    <Text>   </Text>
                                    <View style={styles.cajaFlotante}>
                                        <Picker
                                            selectedValue={nombre}
                                            style={{height: 50, width: 200,padding:"10%"}}
                                            onValueChange={(itemValue, itemIndex, label) =>{
                                                let id_tipo_ase = tipo_ase.filter((a)=>{
                                                    return a.nombre == itemValue;
                                                })
                                                id_tipo_ase = id_tipo_ase[0].id_tipo_ase;
                                                console.log("itemValue = ",itemValue,"id_tipo_ase: ",id_tipo_ase);
                                                this.setState({nombre:itemValue,asesoriaElegida:id_tipo_ase})
                                            }}>
                                            {                                        
                                                tipo_ase.map((a)=>{
                                                   return (<Picker.Item value={a.nombre} key={a.nombre} label={a.nombre}/>)
                                                })
                                            }
                                        </Picker>
                                    </View>
                                </View>
                                <View style={styles.cajaFlotante}>
                                    <View><Text style={styles.centerText}>Descripción</Text></View>
                                    <Text>   </Text>
                                    <View>
                                        <TextInput multiline={true} placeholder="Breve descripción..." onChangeText={(descripcion)=>{
                                            this.setState({descripcion});
                                        }}/>
                                    </View>
                                </View>
                                    <View style={styles.cajaFlotante}>
                                        <Text></Text>
                                        <Button title="Solicitar asesoría" color="#18ac30" onPress={()=>{
                                            this.solicitar()
                                        }}/>
                                    </View>
                            </View>:
                            <ActivityIndicator size="large" color="green"/>
                            }

                            </View>)

                    }

            </View>
        );
    }
}

//make this component available to the app
export default SolicitarAsesoria;
