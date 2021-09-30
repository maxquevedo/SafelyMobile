const URL = "http://10.0.2.2:8080/";

async function logIn(values){
    try{

        const resp = await fetch(`${URL}login/${values.username}/${values.password}`,{
            method:'GET',
        });

        const respJson = await resp.json()

        //console.log(respJson);

        return respJson;
        
    }catch(e){
        console.log("Error: "+e);
    }
}

async function postData(values){
    var details = {
        'username': values.username,
        'password': values.password
    }
    var formBody = [];
    
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    
    }
    formBody = formBody.join("&");

    const resp = await fetch(`${URL}login`,{
        method:'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8' },
        body: formBody
    })

}

async function registrarEmpleado(values){
    try{
        let rut = values.rutProveedor.split('.');
        let dv = values.rutProveedor[values.rutProveedor.length-1]
        let rut1 = rut[2].split('-');
        let rut2 = rut1[0];
        let rutSinPuntos = rut[0].concat(rut[1].concat(rut2));
        let nombrus = values.nombre.split(' ');
        let nombre = nombrus[0];
        let apellido = nombrus[1];

        const json1 = JSON.stringify({
            rut_empleado:rutSinPuntos,
            dv_empleado:dv,
            nombre_empleado:nombre,
            apellido_empleado: apellido,
            usuario:values.usuario,
            pass:values.contraseña,
        });

        const resp = await fetch(`${URL}/empleado`,{
            method:'POST',
            headers:{"Content-Type": "application/json; charset=utf-8" },
            body:JSON.stringify({json:json1}), 
            });

        let respJson = await resp.json();
        alert(respJson.message);
    }catch(error){
        console.log("Error: "+error);
    }
}

export { logIn } ;

