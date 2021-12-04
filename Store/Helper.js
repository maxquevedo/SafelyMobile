import URLS from '../Vistas/URLS';

function dateToBdDate(date){
    var deit = new Date(date);
    var bdDate = deit.getFullYear()+'-'+(deit.getMonth() + 1)+'-'+deit.getDate();
    return bdDate;
}

function bdDateToChileDate(datex){
    var deit = new Date(datex);
    var dia = deit.getDate().toString().length < 2? '0'+(deit.getDate()+1):deit.getDate()+1;
    var año = deit.toLocaleDateString();
    año = año[6]+año[7];
    var chileDate = dia+'/'+(deit.getMonth()+1)+'/'+año;
    return chileDate;
}

function bdDateToDate(datex){
    var deit = new Date(datex);
    deit = deit.toLocaleDateString();
    var fecha = new Date(deit);
    return fecha;
}

function bdDateToChileDateStr(datex){
    var deit = new Date(datex);
    deit = deit.toLocaleDateString();
    var fecha = new Date(deit);
    return fecha;
}

async function getIdPro(perfilId){
    var resp =  await fetch(`http://${URLS['api-tarrito']}/profesional/`);
    var respJson = await resp.json();
    var idPro = respJson.filter((item)=>{
        return item.id_perfil == perfilId;
    });
    idPro = idPro[0].id_prof;
    return idPro;
}

async function getIdCli(perfilId){
    var resp =  await fetch(`http://${URLS['api-tarrito']}/cliente/`);
    var respJson = await resp.json();
    var idCli = respJson.filter((item)=>{
        return item.id_perfil == perfilId;
    });
    idCli = idCli[0].id_cli;
    return idCli;
}

async function getPerfilIdFromSpecificId(id,tipoUsuario){
    var perfilId = -1;
    switch (tipoUsuario) {
        case "Cliente":
            var resp = await fetch(`http://${URLS['api-tarrito']}/cliente/`);
            var respJson = await resp.json();
            //console.log("tipo usuario: ",tipoUsuario,"resp: ",respJson);
            if(resp.ok){
                perfilId = respJson.filter((item,index)=>{
                    return item.id_cli == id;
                });
                perfilId = perfilId[0].id_perfil;
                return perfilId;
            }
            break;
        case "Profesional":
            var resp = await fetch(`http://${URLS['api-tarrito']}/profesional/`);
            var respJson = await resp.json();
            if(resp.ok){
                perfilId = respJson.filter((item,index)=>{
                    return item.id_prof == id;
                });
                perfilId = perfilId[0].id_perfil;
                return perfilId;
            }
            //console.log("tipo usuario: ",tipoUsuario,"resp: ",respJson);
            break;
        default:
            break;
    }
    return perfilId;
}

async function getUserWithAuthId(id){
    let users = await getAllUsers();
    let user = users.filter((item,index)=>{
        return item.id == id;
    });
    user = user[0];
    return user;
}

async function getAuthIdWithPerfilId(id){
    var resp = await fetch(`http://${URLS['api-tarrito']}/perfil/`);
    var respJson = await resp.json();
    respJson = respJson.filter((item,index)=>{
        return item.id_perfil == id;
    });
    respJson = respJson[0].id_auth_user;
    return respJson;
}

async function getAllActis(id2,tipoUsuario){
    let resp = await fetch(`http://${URLS['api-tarrito']}/activiad/`);
    let respJson = await resp.json();
    respJson = respJson.sort((first,second)=>{
        return(first.id_actividad > second.id_actividad);
    });
    if(tipoUsuario == 'Profesional'){
        return respJson.filter((item,index)=>{
            return item.id_prof == id2;
        });
    }
    if(tipoUsuario = 'Cliente'){
        return respJson.filter((item,index)=>{
            return item.id_cli == id2;
        });
    }
    return;
}

async function getAllPerfiles(){
    var resp = await fetch(`http://${URLS['api-tarrito']}/perfil/`)
    return await resp.json();
}

async function getAllUsers(){
    var resp = await fetch(`http://${URLS['api-tarrito']}/user/`);
    return await resp.json();
}

export default {
    dateToBdDate,
    bdDateToDate,
    bdDateToChileDate,
    bdDateToChileDateStr,
    getIdCli,
    getIdPro,
    getPerfilIdFromSpecificId,
    getAuthIdWithPerfilId,
    getUserWithAuthId,
    getAllActis
};
