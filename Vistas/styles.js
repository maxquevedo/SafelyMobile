import { StyleSheet } from 'react-native';


/*
Verde oscuro (botones): #095813
Amarillo oscuro: #71700C
Azul: #101D4D
*/
export default StyleSheet.create({
    topBar:{
      flex:1,
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      paddingTop:45,
      paddingLeft:35,
      paddingRight:35
    },
    topBarContent:{
      backgroundColor:'#fff',
      //paddingTop:10
      justifyContent:'space-between'
    },
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: "100%",
      backgroundColor:'#fff'
    },
    containerLogin:{
      flex:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    inputForm:{
      justifyContent: 'space-evenly',
      width:'100%'
    },
    input:{
      fontSize: 24,
      color:"#000",
      textAlign: 'center',
      alignContent:'center',
      alignItems:'center',
      alignSelf:'center'
      },
    text:{
      fontSize:25,
      //marginTop:20,
      color:'#000',
    },
    textUnderlined:{
      fontSize:25,
      color:'#000',
      textDecorationLine: 'underline'
      },
    centerText:{
      fontSize:25,
      //marginTop:20,
      color:'#000',
      textAlign:'center'
    },
    errorForm:{
      alignSelf:'center',
      color:'red',
      fontWeight:'bold'
    },
    titleForm:{
      fontSize:30,
      alignSelf:'center',
      padding:10
    },
    FieldSeparator:{
      backgroundColor:'gray',
      height:1,
      width:'90%',
      alignSelf:'center'
    },
    orderScreen:{
      flex:1,
      alignContent:'flex-start',
      justifyContent:'flex-start'
    },
    titulo:{
      fontSize:45,
      alignSelf:'center'
    }
      
});