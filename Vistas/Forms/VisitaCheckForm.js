import React, { Component } from 'react';
import { View, Text, TextInput, Button, ScrollView,TouchableOpacity, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles';


/*
Crear un hook para cambiar el color 
const [] = 

*/
const colores = {
    verde: 'green',
    rojo: 'red',
    negro: 'black'
}

const validate = (values) =>{
    const errors = {};

    //usuario
    if(!values.usuario){
        errors.usuario = 'requerido';
    }else if(values.usuario.length < 5){
        errors.usuario = 'usuario debe tener al menos 5 caracteres';
    }else if(values.usuario.length > 20){
        errors.usuario= 'usuario debe tener menos de 20 caracteres';
    }

    //largo correo
    if(!values.correo){
        errors.correo = 'requerido';
    }else if(values.correo.length < 5){
        errors.correo = 'correo inválido'
    }

    return errors;
}

const renderItem = (data) => {
    var color = "black";
    let color1 = "black";
    let color2 = "black";
    
    if(data.item)
    if(data.item.color === "green"){
        color2 = "green";
    }else if(data.item.color ==="red"){
        color1 = "red";
    }
   return(<View  style={{justifyContent:'space-around',padding:30}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                        <Text style={{fontSize:25}}>{data.item.item} </Text>
                        <TouchableOpacity onPress={() => {color = "red";}}>
                            <Ionicons name="md-close-circle" size={25} color={color1}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {color ='green'}}>
                            <Ionicons name="md-checkmark-circle" size={25} color={ color2} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.FieldSeparator}></View>
                </View>);
}

const VisitaCheckForm = (props) => {
    let checks = props.checks;
    //console.log("checks1: ", props);
    const [texto,updateTexto] = React.useState('');
    const [items,updateItems] = React.useState(checks);
    const [colorHook,updateColorH]  = React.useState("black");
    for(var i =0;i<props.estados.length; i++){
        console.log(props.estados[i]);
    }
    //console.log("checks2: ",items);
    //<View style={{alignItems:'stretch',justifyContent:'flex-end'}}>
    //<Field name="correo" component={checkList} ph={props.correo} nm="Correo" check={props.check}/>    

    return(
        <View>
            <FlatList data={props.checks} renderItem={renderItem} extraData={items}  keyExtractor={item => item.index}/>
            <View><Text></Text></View>
        </View>
    )
}


export default reduxForm({
    form: 'VisitaCheckForm',
    validate,
})(VisitaCheckForm);