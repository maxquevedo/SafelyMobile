import { takeEvery, call } from 'redux-saga/effects';
import { logIn } from '../Servicios/Api';

const login = async(values) => {
    //console.log("values desde SAGA: ",values);
    let username = values.username;
    let password = values.password;
    let data = await logIn({username,password});
    console.log("Data: ",data);
}

function* sagaLogin(values){
    //console.log("sagaLogin: ",values);
    let username = values.values.username;
    let password = values.values.password;
    try{
        yield call(login,{username,password})

    }catch(e){
        console.log(e)
    }
}


export default function* funcionPrimaria() {
    yield takeEvery('LOGIN', sagaLogin);
    // yield ES6
}