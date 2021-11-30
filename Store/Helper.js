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

export default {
    dateToBdDate,
    bdDateToChileDate,
};
