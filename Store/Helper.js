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

export default {
    dateToBdDate,
    bdDateToDate,
    bdDateToChileDate,
    bdDateToChileDateStr,
    getIdCli,
    getIdPro
};
