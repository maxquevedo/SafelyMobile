//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button, ActivityIndicator,FlatList,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// create a component
class Accidentes extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            accidentes: [['Not Ok','Aaaa']],

        }
    }

    async componentDidMount(){
        /*
        const { loading } = this.state;
        let resp = await fetch(`http://10.0.2.2:8080/accidentes/1`);
        let respJson = await resp.json();
        this.setState({accidentes: respJson, loading:false});
        */
    }

    prueba = async () => {
        
    }

    renderItem(data){
        var color = "white";
        if(data.index%2==0){
            color= "#A2AFA2"
        }
        //alert(JSON.stringify(data));
        return <View style={{flexDirection:'row'}} key={data.key}>
            <View style={{flexDirection:'column', width:"100%", padding:35, backgroundColor:color,}}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                        <Ionicons name="md-notifications-outline" size={25} color={'#000'} />
                    </TouchableOpacity>
                    <Text>     </Text>
                    <Text style={{fontSize:25}}>{ data.item[1].charAt(0).toUpperCase() +  data.item[1].slice(1)}</Text>  
                </View>
            </View>
        </View>
    }


    render() {
        const { loading, accidentes } = this.state;

        return (
            <View style={{marginTop:35, flex:1}}>

                {
                    loading? 
                    <View style={{justifyContent:'center',alignContent:'center'}}>
                        <ActivityIndicator size="large" color="#095813"/>
                    </View>
                    :
                    <View style={{flex:1}}>
                        <View style={{flex:0.25, flexDirection:'column',justifyContent:'space-evenly',alignSelf:'stretch',backgroundColor:'#00fff'}}>
                            <Button title="reportar accidente" onPress={()=>{}}/>
                        </View>
                        <View stlye={{flex:0.72}}>
                            <FlatList data={accidentes} renderItem={this.renderItem.bind(this)} keyExtractor={ item => item.id } />
                        </View>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//make this component available to the app
export default Accidentes;