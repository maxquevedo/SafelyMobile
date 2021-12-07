
import React from 'react';
import { View, Text, TextInput, Button,KeyboardAvoidingView,Alert } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import URLS from '../URLS';


/*
AsyncStorage items que se guardan: 
    tipoUsuario,
    idUsuario (en bd se llama id_auth_user),
    username,
    firstName,
    lastName,
    email,
    telefono,
    direccion,
    idPerfil,
    id2 (id_especifico: id_cli, id_prof, id_admin)
*/



const userGrops = {
    1:'Admin',
    2:'Profesional',
    3:'Cliente',
}

const loggin = async (values) => {
    //let url = `http://${URLS['local-android']}:8000/inicio/` ;
    let url = `http://${URLS['local-tarrito']}:8000/inicio/`;
    var usrnm = values.username;
    var pwd = values.password;
    var bdy = { 'username': usrnm,'password':pwd };
    var user = {};
    bdy = JSON.stringify(bdy);

    var resp = await fetch(url,{
        method:'POST',
        //mode:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: bdy
    });
    var respJson = await resp.json();
    if(respJson.token){
        await AsyncStorage.setItem('token',respJson.token);
        //url = `http://${URLS['local-android']}:8000/api/user`;
        url = `http://${URLS['local-tarrito']}:8000/api/user`;
        resp = await fetch(url);
        respJson = await resp.json();
        if(respJson){
            respJson.forEach(element => {
                if(element.username === usrnm){
                    user = element;
                }
            });
            
            let tipo = userGrops[user.groups];
            await AsyncStorage.setItem('tipoUsuario',tipo);
            await AsyncStorage.setItem('idUsuario',(user.id).toString());
            await AsyncStorage.setItem('username',user.username);
            await AsyncStorage.setItem('firstName',user.first_name);
            await AsyncStorage.setItem('lastName',user.last_name);
            await AsyncStorage.setItem('email',user.email);
            url = `http://${URLS['local-tarrito']}:8000/api/perfil`;
            resp = await fetch(url);
            respJson = await resp.json();
            var dir = '';
            var tel = '';
            var idPerfil = '';
            if(respJson){
                respJson.forEach(element => {
                    if(element.id_auth_user === user.id){
                        dir = element.direccion;
                        tel = element.telefono;
                        idPerfil = element.id_perfil;
                    }
                });
                await AsyncStorage.setItem('telefono',tel.toString());
                await AsyncStorage.setItem('direccion',dir);
                await AsyncStorage.setItem('idPerfil',idPerfil.toString());
                let idName = "";
                switch (user.groups[0]) {
                    case 1:
                        url = `http://${URLS['local-tarrito']}:8000/api/administrador/`;
                        idName = "id_prof";
                        break;
                    case 2:
                        url = `http://${URLS['local-tarrito']}:8000/api/profesional/`;
                        idName = "id_cli";
                        break;
                    case 3:
                        url = `http://${URLS['local-tarrito']}:8000/api/cliente/`;                        
                        idName = "id_admin";
                        break;
                    default:
                        break;
                }
                resp = await fetch(url);
                respJson = await resp.json();
                let idEspecifico = -1;
                respJson.forEach(elem => {
                    if(elem.id_perfil == idPerfil){
                        if(elem.id_admin){
                            idEspecifico = elem.id_admin;
                        }else if(elem.id_cli){
                            idEspecifico = elem.id_cli;
                        }else if(elem.id_prof){
                            idEspecifico = elem.id_prof;
                        }
                    }
                });
                await AsyncStorage.setItem('id2',idEspecifico.toString());
            }
        }else{
            Alert.alert("Error",'Error conectando con el servidor.',[{text:'Ok'}]);
        }
        
        return true;
    }else{
        Alert.alert('Error', 'Usuario/Contraseña incorrectos',[{text:'Ok'}]);
    }
}

const fieldLogin = (props) => {
    console.disableYellowBox;
    return(
        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center'}}>
            <Text style={styles.text}>{props.nm}</Text>
            <TextInput placeholder={props.ph}
            style={styles.input}
            onChangeText={props.input.onChange}
            value={props.input.value}
            autoCapitalize= 'none'
            secureTextEntry={!!(props.input.name === 'password')}
            keyboardType= 'default'
            onBlur = {props.input.onBlur}
            />
            {props.meta.touched && props.meta.error && <Text>{props.meta.error}</Text> }
         </View>
    );
};

const validate = (values) =>{
    const errors = {};

    //usuario
    if(!values.usuario){
        errors.usuario = 'requerido';
    }else if(values.usuario.length < 4){
        errors.usuario = 'deben ser al menos 5 caracteres';
    }else if(values.usuario.length > 10){
        errors.usuario= 'debe ser menor de 10 caracteres';
    }

    //password
    if(!values.contraseña){
        errors.contraseña = 'requerido';
    }else if(values.contraseña.length < 2){
        errors.contraseña = 'No puede ser menor a 5 caracteres';
    }else if(values.contraseña.length > 15){
        errors.contraseña = 'No puede ser mayor a 15 caracteres';
    }

    return errors;
}

const LoginForm = (props) => {
    const { navigation } = props;
    AsyncStorage.getItem('tipoUsuario').then((value) => {
        if(value == null){
        }else{
            switch(value){
                case 'Cliente':
                    navigation.reset({
                        index:0,
                        routes: [{
                            name: 'Cliente'
                        }]
                    })
                    break;
                case 'Profesional':
                    navigation.reset({
                        index:0,
                        routes: [{
                            name: 'Profesional'
                        }]
                    })
                    break;
                case 'Admin':
                    navigation.reset({
                        index:0,
                        routes: [{
                            name: 'Admin'
                        }]
                    })
                    break;
                default: 
                    break;
            }
        }
    })
    return(
        <View style={{justifyContent:'center',alignSelf:'center'}}>
            <KeyboardAvoidingView> 
                <Field name="username" component={fieldLogin} ph="usuario" nm="Usuario"/>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Field name="password" component={fieldLogin} ph="*******" nm="Contraseña"/>
            </KeyboardAvoidingView>

            <Button style={styles.button} title="Iniciar sesion" color="#095813" onPress={props.handleSubmit(async (values)=>{
               //-> funciona iwal props.login(values);
               let reddir = await loggin(values)
            })} />
        </View>
    )
}

export default reduxForm({
    form: 'LoginForm',
    validate,
})(LoginForm);