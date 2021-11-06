import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, TextInput, Button, ScrollView,Alert,KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles';

const fieldModiTexto = (props) => {
   // console.log("props fieldModiTexto"+props.nm+"}: ",props);
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
    console.log("validate values: ",values);
    const errors = {};
    // //usuario
    //if(!values.usuario){
    //    errors.usuario = 'requerido';
    // }else if(values.usuario.length < 5){
    //     errors.usuario = 'usuario debe tener al menos 5 caracteres';
    // }else if(values.usuario.length > 20){
    //     errors.usuario= 'usuario debe tener menos de 20 caracteres';
    //}

    //largo correo
    if(!values.correo){
        errors.correo = 'requerido';
    }
    else if(!values.correo.includes('@')){
        errors.correo = 'correo inválido'
    }

     if(!values.direccion){
        errors.direccion = 'requerido';
     }
    return errors;
}

const updateForm = async (editable,values,props) => {
    //console.log("editable: ",editable,"values: ",values,"props: ",props);
    //console.log("errores: ",props);
    props.actualiza(editable,values.correo,values.direccion);
    // let json = {
    //     id: await AsyncStorage.getItem('id'),
    //     email: values.correo
    // }
    // let correo = values.correo;
    // let resp = await fetch('http://10.0.2.2:8080/update/email',{
    //     method:'PATCH',
    //     headers: {
    //         'Content-Type':'application/json; charset="UTF-8"'
    //     },
    //     body:JSON.stringify({json})
    // });

    // let respJson = await resp.json();
    // console.log(respJson);
    // if(respJson){
    //     await AsyncStorage.removeItem('email');
    //     await AsyncStorage.setItem('email',correo);
    //     //console.log(props);
    //     Alert.alert("Exito","Datos actualizados correctamente",[{text:'Ok',onPress: ()=>{
    //         props.reset();
    //         editable = false;
    //         //props.toggleEditar(props.editar);
    //     }}],{cancelable:false})
    // }
}

const SignUpForm = (props) => {
    var editable = props.editar;
   // console.log(props);
    //<View style={{alignItems:'stretch',justifyContent:'flex-end'}}>
    // <Field name="usuario" component={fieldCrearCuenta} ph={props.usuario} nm="Usuario" editar={props.editar}/>
    return(
        <ScrollView>
            <ScrollView > 
               
                <Field name="correo" component={fieldModiTexto} ph={props.correo} nm="Correo" editar={props.editar}/>
                <Field name="direccion" component={fieldModiTexto} ph={props.direccion} nm="Direccion" editar={props.editar}/>
            </ScrollView>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <KeyboardAvoidingView style={{alignSelf:'stretch'}} enabled>
                {
                    editable? <View>
                        <Button title="guardar" color='#18ac30' onPress={props.handleSubmit((values)=>{
                            updateForm(editable,values,props);
                            editable = false;
                            })}
                        />
                    </View>
                    :<Text></Text>
                }
            </KeyboardAvoidingView>
        </ScrollView>
    )
}


export default reduxForm({
    form: 'SignUpForm',
    validate,
})(SignUpForm);