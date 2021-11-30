//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button, ActivityIndicator,FlatList,TouchableOpacity, ActionSheetIOS, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DialogInput from 'react-native-dialog-input';
import styles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URLS from '../URLS';
import Helper from '../../Store/Helper';

const auxUrl = URLS['api-tarrito'];

// create a component
class Accidentes extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            accidentes: [['Not Ok','Aaaa'],['ok','eeee','no']],
            accidenteReportado:'',
            showDialog:false,
            idCli: -1,
            idPro: -1,
            descripcion:'',
            estado:'',
            hoy: new Date()
        }
    }

    async componentDidMount(){
        let idCli = await AsyncStorage.getItem('id2');
        //acá se toma el cliente de la ultima actividad
        // (se toma al cliente con la actividad anterior más cercana).
        var resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
        var respJson = await resp.json();
        var acti = respJson.filter((item,index)=>{
            let fechaStr = Helper.bdDateToDate(item.fec_estimada);
            let fecha = new Date(fechaStr);
            return(this.state.hoy < fecha);
        });
        acti = acti.filter((item,index)=>{
            //filtra capacitaciones
            return item.tipo_act != "1";
        });
        acti.sort((first,second)=>{
            return(first.fec_estimada > second.fec_estimada)
        })
        let idPro = await acti[0].id_prof;
        resp = await fetch(`http://${URLS['api-tarrito']}/alerta/`);
        respJson = await resp.json();
        let accidentes = respJson.filter((item,index)=>{
            return item.id_cli == idCli;
        });
        this.setState({accidentes, loading:false,idPro,idCli});
    }

    async sendInput(inputText){
        let fec_aviso = Helper.dateToBdDate(new Date());
        let descripcion = inputText;
        let id_cli = this.state.idCli;
        let id_prof = this.state.idPro;
        var alerta = {
            fec_aviso,descripcion,estado:false,id_cli,id_prof
        }
        var resp = await fetch(`http://${URLS['api-tarrito']}/alerta/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(alerta)
        });
        var respJson = await resp.json();
        if(resp.ok){
            Alert.alert("Exito","Se ha reportado el accidente correctamente",[{text:'Ok'}])
        }else{
            Alert.alert("Error","Lo sentimos, algo salió mal")
        }
    }

    renderItem(data){
        var color = "white";
        var color2 = data.item.estado? "green":"red";
        if(data.index%2==0){
            //color= "#A2AFA2"
            color ="#DDE0DE"
        }

        //alert(JSON.stringify(data));
        return <View style={{flexDirection:'row'}} key={data.key}>
            <View style={{flexDirection:'column', width:"100%", padding:35, backgroundColor:color,}}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                       <View style={{ width: 44, height: 44, borderRadius: 44/2,backgroundColor:color2}}></View>
                    </TouchableOpacity>
                    <Text>     </Text>
                    <Text style={{fontSize:25}}>{ data.item.descripcion }</Text>  
                </View>
            </View>
        </View>
    }


    render() {
        const { loading, accidentes,showDialog } = this.state;
        return (
            <View style={{marginTop:35, flex:1, justifyContent:'space-between'}}>

                {
                    loading? 
                    <View style={{justifyContent:'center',alignContent:'center'}}>
                        <ActivityIndicator size="large" color="#095813"/>
                    </View>
                    :
                    showDialog?

                    <DialogInput isDialogVisible={this.state.showDialog}
                        title={"Reportar accidente"}
                        message={'¿Qué ha ocurrido?'}
                        hintInput ={"Escribe aquí..."}
                        submitInput={ (inputText) => {this.sendInput(inputText)} }
                        closeDialog={ () => {this.setState({showDialog:false})}}>
                    </DialogInput>
                    :
                    <View style={{flex:1}}>
                        <View style={{flex:0.25, flexDirection:'column',justifyContent:'space-evenly',alignSelf:'stretch',backgroundColor:'#00fff'}}>
                            <View style={styles.dosEnUno}>
                                <View style={styles.circuloRojo}></View>
                                <Text style={styles.text}>= Reportado</Text>
                                <View style={styles.circuloVerde}></View>
                                <Text style={styles.text}>= Solucionado</Text>
                            </View>
                        </View>
                        <View stlye={{flex:0.72}}>
                            <Text style={styles.textBoldCentrado}>Accidentes anteriores</Text>
                            <View style={styles.FieldSeparator}></View>
                            <FlatList data={accidentes} renderItem={this.renderItem.bind(this)} keyExtractor={ (item,index) => index.toString() } />
                        </View>
                        {
                            accidentes.length == 0?
                                <View style={{marginTop:"50%"}}>
                                <Text style={{fontWeight:'900',fontSize:25,alignSelf:'center',justifyContent:'space-between'}}>No hay accidentes anteriores</Text></View>:<Text></Text>
                        }
                        <Button color="#095813" title="reportar accidente" onPress={()=>{this.setState({showDialog:!showDialog})}}/>
                    </View>
                }

            </View>
        );
    }
}

// define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
// });

//make this component available to the app
export default Accidentes;