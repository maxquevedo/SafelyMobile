//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class VisitaHome extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View><Button color="green" title="Tomar visita" onPress={()=>{navigation.navigate('TomarVisita')}}/></View>
                <View><Button color="green" title="Atender visita" onPress={()=>{navigation.navigate('Visita')}}/></View>
            </View>
        );
    }º
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default VisitaHome;
