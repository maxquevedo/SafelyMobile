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
    textBlanco:{
      fontSize:25,
      color:"#fff",
    },
    textBold:{
      fontSize:25,
      fontWeight:'bold'
    },
    textBoldCentrado:{
      fontSize:25,
      fontWeight:'bold',
      textAlign:'center'
    },
    textBlancoCentrado:{
      fontSize:25,
      color:"#fff",
      //fontWeight:'bold',
      textAlign:'center'
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
    },
    //Caja flotante blanca
    cajaFlotante:{
      backgroundColor:'#fff',
      padding:"5%",
      borderRadius:15,
      marginBottom:15,
    },
    cajaFlotanteRoja:{
      backgroundColor:'#AA3939',
      padding:"1%",
      //borderRadius:15,
      marginBottom:15,
    },
    cajaFlotanteVerde:{
      backgroundColor:'#338A2E',
      padding:"1%",
      //borderRadius:15,
      marginBottom:15
    },
    alingnCenter:{
      alignSelf:'center'
    },
    tablaCajaFlotante:{
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'flex-start',
      padding:"3.5%"
    },
    dosEnUno:{
      flexDirection:'row',
      justifyContent:'space-around',
      
    },
    circuloVerde:{
      width: 44,
      height: 44,
      borderRadius: 44/2,
      backgroundColor:'green'
    },
    circuloRojo:{
      width: 44, 
      height: 44, 
      borderRadius: 44/2,
      backgroundColor:'red'
    }
      
});