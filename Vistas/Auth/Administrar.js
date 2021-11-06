//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';

// create a component
class Administrar extends Component {
    constructor(props){
        super(props);
        this.state= {
            loading:false,
            action:'',
        }
    }
    render() {
        const { navigation } = this.props;
        const { loading } = this.state;
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                { !loading? 
                <View style={styles.container}>
                    <View>
                        <Button color="#18ac30" title='Notificar atrasos' onPress={()=>{this.setState({loading:true,action:'notificarAtrasos'})}}/>
                    </View>
                    <View>
                        <Button color="#18ac30" title='generar reporte cliente' onPress={()=>{this.setState({loading:true,action:'reporteCli'})}}/>
                    </View>
                    <View>
                        <Button color="#18ac30" title='generar reporte global' onPress={()=>{this.setState({loading:true,action:'reporteGlo'})}}/>
                    </View>
                </View>
                    :
                    <View style={{flex:1,justifyContent:'center'}}>
                        <ActivityIndicator size='large' color="#000"/>
                    </View>
                }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',

    },
});

//make this component available to the app
export default Administrar;
