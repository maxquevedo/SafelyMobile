import React, { Component,useState,useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-community/picker';
import Helper from "../../Store/Helper";

const ActividadesForm = (props) => {
    const asesorias = props.asesorias;
    const visitas = props.visitas;
    const capacitaciones = props.capacitaciones;
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');

    const customDatesStylesCallback = (date,props) => {
        let deit = new Date(date);
        deit.setHours(12,0,0,0);
        let day = deit.getDate();
        let month = deit.getMonth();
        month = month+1;
        let year = deit.getFullYear();
        let decada = ''+year.toString()[2];
        let año = ''+year.toString()[3];
  
        year = decada+año;
        if(day.toString().length < 2){
          day = '0'+day;
        }

        if(month.toString().length < 2){
          month = '0' + month;
        } 
        let dateCompairable = day+'/'+(month)+'/'+year;
        let dateCompairableFull = day+'/'+(month)+'/'+deit.getFullYear();
        for( dias in asesorias){
          let fec_estimada = asesorias[dias].fec_estimada;
          let fecha = fec_estimada[8]+fec_estimada[9]+'/'+fec_estimada[5]+fec_estimada[6]+'/'+fec_estimada[2]+fec_estimada[3];
          if(dateCompairable == fecha || dateCompairableFull == fecha){
            return {
              style:{
                backgroundColor: '#edad24',
              },
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
              }
            };
          }
        }
        for(dias in capacitaciones){
          let fec_estimada = capacitaciones[dias].fec_estimada;
          let fecha = fec_estimada[8]+fec_estimada[9]+'/'+fec_estimada[5]+fec_estimada[6]+'/'+fec_estimada[2]+fec_estimada[3];
          if(dateCompairable == fecha || dateCompairableFull == fecha){
            return {
              style:{
                backgroundColor: '#24a0ed',
              },
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
              }
            };
          }
        }
        for(dias in visitas){
          let fec_estimada = visitas[dias].fec_estimada;
          let fecha = fec_estimada[8]+fec_estimada[9]+'/'+fec_estimada[5]+fec_estimada[6]+'/'+fec_estimada[2]+fec_estimada[3];
          if(dateCompairable == fecha || dateCompairableFull == fecha){
            return {
              style:{
                backgroundColor: '#18ac30',
              },
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
              }
            };
          }
        }

  
    }
  
    const onDateChange = (date, type) => {
      //function to handle the date change
      if (type === 'END_DATE') {
        setSelectedEndDate(date);
      } else {
        setSelectedEndDate(null);
        setSelectedStartDate(date);
      }
    };

    
    const eventoEnFechaElegida = () => {
      let deit = (new Date(selectedStartDate));
      let hour = deit.getHours();
      let minutes = deit.getMinutes();
      let strMinutes = minutes.toString().length

      if(strMinutes < 2){
        minutes = "0"+minutes;
      }

      let hora = hour+':'+minutes;

      return (<Text>
        Hora: { hora }
      </Text>)
    }

    const fechaElegida = () =>{
      let deit = (new Date(selectedStartDate)).toLocaleDateString();
      let mes = deit[0]+deit[1];
      let dia = deit[3]+deit[4];
      let año = deit[6]+deit[7];
      let fecha = dia+'/'+mes+'/'+año;
      return (
        <Text>Fecha: { fecha }</Text>
      )
    }

    const renderEvento = (data) => {
      return <Text key={data.index.toString()+'eventoOox'} style={{fontSize:25}}>{data.item}</Text>
    }

    const evento = () => {
      let deit = (new Date(selectedStartDate)).toLocaleDateString();
      let mes = deit[0]+deit[1];
      let dia = deit[3]+deit[4];
      let año = deit[6]+deit[7];
      let añoCompleto = new Date(selectedStartDate).getFullYear();
      let fecha = dia+'/'+mes+'/'+año;
      let fechaFull = dia+'/'+mes+'/'+añoCompleto;
      let eventos = [];
      for( dias in asesorias){
        let fec_estimada = asesorias[dias].fec_estimada;
        let fechaFormat = fec_estimada[8]+fec_estimada[9]+'/'+fec_estimada[5]+fec_estimada[6]+'/'+fec_estimada[2]+fec_estimada[3];
        if(fecha == fechaFormat || fechaFull == fechaFormat){
          eventos.push(asesorias[dias].nombre);
        }
      }

      for(dias in capacitaciones){
        let fec_estimada = capacitaciones[dias].fec_estimada;
        let fechaFormat = fec_estimada[8]+fec_estimada[9]+'/'+fec_estimada[5]+fec_estimada[6]+'/'+fec_estimada[2]+fec_estimada[3];
        if(fecha ==fechaFormat || fechaFull == fechaFormat){
          eventos.push(capacitaciones[dias].nombre);
        }
      }

      for(dias in visitas){
        let fec_estimada = visitas[dias].fec_estimada;
        let fechaFormat = fec_estimada[8]+fec_estimada[9]+'/'+fec_estimada[5]+fec_estimada[6]+'/'+fec_estimada[2]+fec_estimada[3];
        if(fecha == fechaFormat || fechaFull == fechaFormat){
          eventos.push(visitas[dias].nombre);
        }
      }

      if(eventos.length == 1) {
        return (<Text>Evento: { eventos }</Text>);
      }else if(eventos.length == 2){
        return (<Text>Evento 1: { eventos[0]+'\n' }Evento 2: {eventos[1]}</Text>);
      }else{
        return <FlatList data={eventos} renderItem={renderEvento} keyExtractor={(item,index)=>{index.toString()+'flatList22312312312'}}/>
      }
    }

    const changeMonth = (date ) => {
      setSelectedStartDate(null);
    }

    return (
      <SafeAreaView style={{}}>
        <View style={{}}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={false}
            minDate={new Date(2018, 1, 1)}
            maxDate={new Date(2050, 6, 3)}
            weekdays={
              [
                'Lun', 
                'Mar', 
                'Mie', 
                'Jue', 
                'Vie', 
                'Sab', 
                'Dom'
              ]}
            months={[
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ]}
            todayBackgroundColor="#e6ffe6"
            selectedDayColor="#66ff33"
            selectedDayTextColor="#000000"
            selectedDayStyle={{}}
            previousComponent={ <Ionicons name="arrow-back" size={24} color="black" />}
            nextComponent = {  <Ionicons name="arrow-forward" size={24} color="black" />}
            scaleFactor={375}
            onMonthChange = {(date )=> changeMonth(date)}
            textStyle={{
              color: '#000000',
            }}
            onDateChange={onDateChange}
            customDatesStyles={customDatesStylesCallback}
            
          />
        </View>
        <Text></Text> 
        <View style={{flexDirection:'row',paddingLeft:'5%'}}>
            <View style={{backgroundColor:'#24a0ed',width:20,borderRadius:9}}></View>
            <Text> Capacitación      </Text>

          <View style={{backgroundColor:'#edad24',width:20,borderRadius:9}}></View>
            <Text> Asesoría      </Text>
 
   
          <View style={{backgroundColor:'#18ac30',width:20,borderRadius:9}}></View>
            <Text> Visita</Text>
 
        </View>
        <Text></Text>
        <View style={{}}>
          {
            selectedStartDate != null? 
            <View style={{alignItems:'stretch',paddingLeft:'5%'}}>
              <Text style={styles.text}>{ selectedStartDate ? fechaElegida() : ''}</Text>
              <Text></Text>
              {
               // <Text style={styles.text}>{ selectedStartDate ? eventoEnFechaElegida() : ''}</Text>
              }
              <Text style={styles.text}>{ selectedStartDate ? evento(): ''}</Text>
              <Text></Text>
            </View>  
              :<Text></Text>
          }
        </View>
      </SafeAreaView>
    );
  };

export default ActividadesForm;