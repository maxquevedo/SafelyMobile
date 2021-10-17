import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, TextInput, Button, ScrollView,Alert,KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles';

const fieldCrearCuenta = (props) => {
    //console.log(props);
    return(
        <View style={styles.inputForm}>
            <Text style={styles.titleForm}>{props.nm}</Text>
            {
                props.editar?  <TextInput placeholder={props.ph}
                style={styles.input}
                onChangeText={props.input.onChange}
                value={props.input.value}
                autoCapitalize= 'none'
                keyboardType= 'email-address'
                onBlur = {props.input.onBlur}
                />:<Text style={styles.centerText}>{props.ph}</Text>
                
            }
          
            {props.meta.touched && props.meta.error && <Text style={styles.errorForm}>{props.meta.error}</Text> }
            <View style={styles.FieldSeparator}><Text></Text></View>
         </View>
    );
};

const validate = (values) =>{
    const errors = {};

    // //usuario
    // if(!values.usuario){
    //     errors.usuario = 'requerido';
    // }else if(values.usuario.length < 5){
    //     errors.usuario = 'usuario debe tener al menos 5 caracteres';
    // }else if(values.usuario.length > 20){
    //     errors.usuario= 'usuario debe tener menos de 20 caracteres';
    // }

    // //largo correo
    // if(!values.correo){
    //     errors.correo = 'requerido';
    // }else if(values.correo.length < 5){
    //     errors.correo = 'correo inválido'
    // }

    return errors;
}

const updateEmail = async (editable,values,props) => {
    let json = {
        id: await AsyncStorage.getItem('id'),
        email: values.correo
    }
    let correo = values.correo;
    let resp = await fetch('http://10.0.2.2:8080/update/email',{
        method:'PATCH',
        headers: {
            'Content-Type':'application/json; charset="UTF-8"'
        },
        body:JSON.stringify({json})
    });

    let respJson = await resp.json();
    console.log(respJson);
    if(respJson){
        await AsyncStorage.removeItem('email');
        await AsyncStorage.setItem('email',correo);
        //console.log(props);
        Alert.alert("Exito","Datos actualizados correctamente",[{text:'Ok',onPress: ()=>{
            props.reset();
            editable = false;
            //props.toggleEditar(props.editar);
        }}],{cancelable:false})
    }
}

const SignUpForm = (props) => {
    var editable = props.editar;
    //console.log(props);
    //<View style={{alignItems:'stretch',justifyContent:'flex-end'}}>
    // <Field name="usuario" component={fieldCrearCuenta} ph={props.usuario} nm="Usuario" editar={props.editar}/>
    return(
        <ScrollView>
            <ScrollView > 
               
                <Field name="correo" component={fieldCrearCuenta} ph={props.correo} nm="Correo" editar={props.editar}/>
            </ScrollView>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <KeyboardAvoidingView style={{alignSelf:'stretch'}} enabled>
                {
                    editable? <Button title="guardar" color="#095813" onPress={props.handleSubmit((values)=>{
                        //7console.log(values);
                        updateEmail(editable,values,props);
                        editable = false;
                    })} />:<Text></Text>
                }
            </KeyboardAvoidingView>
        </ScrollView>
    )
}


export default reduxForm({
    form: 'SignUpForm',
    validate,
})(SignUpForm);