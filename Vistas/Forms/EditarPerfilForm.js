import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, TextInput, Button, ScrollView,Alert,KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles';
import URLS from '../URLS';

const fieldModiTexto = (props) => {
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

    if(!values.telefono){
        errors.telefono = 'requerido';
    }else if(values.telefono.length < 8 ||
        values.telefono.length > 8){
        errors.telefono = 'largo incorrecto';
    }
    
    return errors;
}

const updateForm = async (editable,values,props) => {
    let json = {
        email: values.correo,
    };
    let userId = await AsyncStorage.getItem('idUsuario');
    let resp = await fetch(`http://${URLS['local-tarrito']}:8000/api/user/${userId}/`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json; charset="UTF-8"'
        },
        body: JSON.stringify(json)
    });
    let respJson = await resp.json();
    if(respJson){
        await AsyncStorage.removeItem('email');
        await AsyncStorage.setItem('email',respJson.email);
    }
    //correo y direccion
    json = {
        direccion: values.direccion,
        telefono: values.telefono
    }
    let idPerfil = await AsyncStorage.getItem('idPerfil');
    resp = await fetch(`http://${URLS['local-tarrito']}:8000/api/perfil/${idPerfil}/`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json; charset="UTF-8"'
        },
        body: JSON.stringify(json)
    });
    respJson = await resp.json();
    if(respJson){
        await AsyncStorage.removeItem('telefono');
        await AsyncStorage.setItem('telefono',values.telefono);
        await AsyncStorage.removeItem('direccion');
        await AsyncStorage.setItem('direccion',values.direccion);
    }

    Alert.alert('Datos actualizados','Los datos se han actualizado correctamente',[{text:'Ok',onPress: ()=>{
        props.actualiza(editable);
    }}]);
}

const SignUpForm = (props) => {
    var editable = props.editar;
    console.disableYellowBox = true;
    return(
        <ScrollView>
            <ScrollView> 
                <Field name="correo" component={fieldModiTexto} ph={props.correo} nm="Correo" editar={props.editar}/>
                <Field name="direccion" component={fieldModiTexto} ph={props.direccion} nm="Dirección" editar={props.editar}/>
                <Field name="telefono" component={fieldModiTexto} ph={'Nuevo teléfono sin +569'} nm="Teléfono" editar={props.editar}/>
            </ScrollView>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <KeyboardAvoidingView style={{alignSelf:'stretch'}} enabled>
                {
                    editable? <View>
                        <Button title="guardar" color='green' onPress={props.handleSubmit((values)=>{
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