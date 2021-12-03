import React, { Component } from 'react';
import { View, Text,Button, ActivityIndicator,FlatList,TouchableOpacity, Alert, ScrollView } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import styles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URLS from '../URLS';
import Helper from '../../Store/Helper';

class Accidentes extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            accidentes: [],
            accidenteReportado:'',
            showDialog:false,
            idCli: -1,
            idPro: -1,
            descripcion:'',
            estado:'',
            hoy: new Date(),
            refresh: false
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
        accidentes = accidentes.sort((first,second)=>{
            return(first.fec_aviso > second.fec_aviso);
        })
        console.log(accidentes);
        this.setState({accidentes, loading:false,idPro,idCli});
    }

    async refresh(){
        let idCli = await AsyncStorage.getItem('id2');
        var resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
        var respJson = await resp.json();
        var acti = respJson.filter((item,index)=>{
            let fechaStr = Helper.bdDateToDate(item.fec_estimada);
            let fecha = new Date(fechaStr);
            return(this.state.hoy < fecha);
        });
        acti = acti.filter((item,index)=>{
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
        this.setState({loading:true});
        let descripcion = inputText;
        let id_cli = this.state.idCli;
        let id_prof = this.state.idPro;
        let idPerfil = await Helper.getPerfilIdFromSpecificId(id_cli,'Cliente');
        let idUser = await Helper.getAuthIdWithPerfilId(idPerfil);
        let cli  = await Helper.getUserWithAuthId(idUser);
        let date = new Date();
        date = date.toLocaleDateString();
        date = date[3]+date[4]+'/'+date[0]+date[1]+'/'+date[6]+date[7];
        descripcion = descripcion + `\n\n${cli.first_name} ${cli.last_name}\nusuario: ${cli.username}\n${date}\ncorreo: ${cli.email}`; 
        var alerta = {
            descripcion,estado:false,id_cli,id_prof
        }
        var formData = new FormData();

        //transforma el objeto en FormData.
        for (const key in alerta) {
            if (Object.hasOwnProperty.call(alerta, key)) {
                const element = alerta[key];
                formData.append(key,element);
            }
        }

        var resp = await fetch(`http://${URLS['api-tarrito']}/alerta/`,{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data'
            },
            body:formData
        });
        var respJson = await resp.json();
        if(resp.status == 201){
            Alert.alert("Exito","Se ha reportado el accidente correctamente",[{text:'Ok',onPress:()=>{
                this.setState({showDialog:false,loading:false})
            }}])
        }else{
            Alert.alert("Error","Lo sentimos, algo salió mal")
        }
    }

    renderItem(data){
        var color = "white";
        var color2 = data.item.estado? "green":"red";
        var descr = ''+data.item.descripcion;
        var deit;
        descr = descr.split('\n');
        if(descr[4]){
            deit = descr[4];
        }
        descr = descr[0];
        if(data.index%2==0){
            color ="#DDE0DE"
        }
        return <View style={{flexDirection:'row'}} key={data.key}>
            <View style={{flexDirection:'column', width:"100%", padding:35, backgroundColor:color,}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{ width: 44, height: 44, borderRadius: 44/2,backgroundColor:color2}}></View>
                    <Text>     </Text>
                    <Text style={{fontSize:25}}>{ descr } - {deit} </Text>  
                </View>
            </View>
        </View>
    }


    render() {
        const { loading, accidentes,showDialog } = this.state;
        return (
            <View style={{flex:1,paddingTop:'10%',paddingBottom:'10%'}}>

                {
                    loading? 
                    <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
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
                        <View style={{ flexDirection:'column',justifyContent:'space-evenly',alignSelf:'stretch',backgroundColor:'#00fff'}}>
                            <View style={styles.dosEnUno}>
                                <View style={styles.circuloRojo}></View>
                                <Text style={styles.text}>= Reportado</Text>
                                <View style={styles.circuloVerde}></View>
                                <Text style={styles.text}>= Solucionado</Text>
                            </View>
                        </View>
                        <View>
                            <Text></Text>
                        <Button color="#095813" title="reportar accidente" onPress={()=>{this.setState({showDialog:!showDialog})}}/>
                        <Text></Text>
                        </View>
                        <View  stlye={{flex:1}}>
                            <Text style={styles.textBoldCentrado}>Accidentes anteriores</Text>
                            <View style={styles.FieldSeparator}></View>
                            <FlatList data={accidentes} renderItem={this.renderItem.bind(this)} keyExtractor={ (item,index) => index.toString() } refreshing={this.state.refresh} onRefresh={this.refresh.bind(this)}/>
                        </View>
                        {
                            accidentes.length == 0?
                                <View style={{marginTop:"50%"}}>
                                <Text style={{fontWeight:'900',fontSize:25,alignSelf:'center',justifyContent:'space-between'}}>No hay accidentes anteriores</Text></View>:<Text></Text>
                        }
                    </View>
                }

            </View>
        );
    }
}

export default Accidentes;