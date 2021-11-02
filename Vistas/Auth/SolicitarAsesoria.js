//import liraries
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
                <View style={{flex:1}}>
                    {
                        show?
                        <DateTimePicker 
                            value={ fecha }
                            mode='default'
                            display='calendar'
                            minimumDate={new Date()}
                            onChange={(event,date)=>{  this.updateDate(event,date) } } 
                        />
                        :
                        <View style={{flex:1}}>
                            <Text>{fechaStr}</Text>
                            <TouchableOpacity onPress={()=>{
                                this.setState({show:true});
                            }}>
                                <Ionicons name="calendar-outline"/>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default SolicitarAsesoria;
