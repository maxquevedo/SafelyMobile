//import liraries
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator,FlatList,TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisitaCheckForm from '../Forms/VisitaCheckForm';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
// create a component
class Visita extends Component {
    constructor(props){
        super(props);
        this.state = {
            n: 3,
            aprobado: false,
            loading: false,
            checks: [['Not ok','ok','quiza ok'],
        ['ok','ok','oko']],
            nombresChecks: ['hola'],
            estadoChecks: ['ok'],
            failedChecks: ['not ok'],
            checksFallidos: ['not ok1'],
            checksNoFallidos:['ok1'],
            redIndexes:['0'],
            greenIndexes:['1'],
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
        */
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
        */
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