function dateToBdDate(date){
    var deit = new Date(date);
    var bdDate = deit.getFullYear()+'-'+(deit.getMonth() + 1)+'-'+deit.getDate();
    return bdDate;
}

export default {
    dateToBdDate
};
