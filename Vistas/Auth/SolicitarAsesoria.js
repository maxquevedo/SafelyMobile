//import liraries
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet,TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';

// create a component
class SolicitarAsesoria extends Component {
    constructor(props){
        super(props);
        this.state = {
            fecha: new Date(),
            fechaStr: new Date().toLocaleDateString(),
            show: false
        }
    }

    updateDate = (event,date) => {
        var dateFormat = new Date(date);
        var dateDay = dateFormat.getDate();

        if(dateDay.toString().length == 1 ){
            dateDay = '0'+dateDay;
        }

        var dateMonth = dateFormat.getMonth()+1;
        var dateYear = dateFormat.getFullYear();
        dateFormat = dateDay+'/'+dateMonth+'/'+dateYear;
        this.setState({fechaStr:dateFormat, show:false});
    }


    render() {
        const { fecha,show,fechaStr } = this.state;
        return (
            <View style={styles.container}>
                
                    {
                        show?
                            <DateTimePicker 
                                value={ fecha }
                                mode='default'
                                display='calendar'
                                minimumDate={new Date()}
                                onChange={
                                    (event,date)=>{  
                                        if(event.type === "dismissed"){
                                            this.setState({show:false});
                                        }else{
                                            this.updateDate(event,date)    
                                        }
                                    } 
                                } 
                            />
                        :
                            <View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.text}>{fechaStr}</Text>
                                    <Text>   </Text>
                                    <TouchableOpacity onPress={()=>{
                                        this.setState({show:true});
                                    }}>
                                        <Ionicons name="calendar-outline" size={31}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text></Text>
                                    <Button title="Solicitar asesoría" color="#18ac30" onPress={()=>{}}/>
                                </View>
                            </View>
                    }

            </View>
        );
    }
}

//make this component available to the app
export default SolicitarAsesoria;
