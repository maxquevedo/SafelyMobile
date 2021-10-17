
import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import MantenedorAdmin from './Vistas/Auth/Admin/MantenedorAdmin';
//import VerReportes from './Vistas/Auth/VerReportes';
//import AsignarProfesional from './Vistas/Auth/Admin/AsignarProfesional';
import Perfil from './Vistas/Auth/Perfil';
//import Actividades from './Vistas/Auth/Actividades';
//import Accidentes from './Vistas/Auth/Cliente/Accidentes';
//import AsesoriaStack from './Vistas/Auth/AsesoriaStack';
import Login from './Vistas/NoAuth/Login';
///import Visita from './Vistas/Auth/Profesional/Visita';
import { Provider } from 'react-redux'
import Store from './Store/Store';
// import VisitaStack from './Vistas/Auth/Profesional/VisitaStack';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Selector(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} headerMode='none' options={{ headerShown:false }} />
      <Stack.Screen name="Admin" component={Admin} headerMode='none' options={{headerShown:false }} />
      <Stack.Screen name="Cliente" component={Cliente} headerMode='none' options={{headerShown:false, left:null }} />
      <Stack.Screen name="Profesional" component={Profesional} headerMode='none' options={{headerShown:false }} />
    </Stack.Navigator>
  )
}

function Admin(){
  return(
    <Tab.Navigator initialRouteName='Mantenedor' screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Mantenedor') {
          iconName = 'ios-people';
        } else if (route.name === "Asignar profesional") {
          iconName = 'ios-calendar';
        } else if(route.name === "Ver reportes"){
          iconName = focused ? 'ios-folder-open' : 'ios-folder';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      {/* <Tab.Screen name="Mantenedor" component={MantenedorAdmin} 
        options={{size:3 }} />
      <Tab.Screen name="Asignar profesional" component={AsignarProfesional} />
      <Tab.Screen name="Ver reportes" component={VerReportes}/> */}
</Tab.Navigator>
  );
}

function Cliente(){
  return(
    <Tab.Navigator initialRouteName="Actividades" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Perfil') {
          iconName = 'ios-person';
        } else if (route.name === "Actividades") {
          iconName = 'ios-calendar';
        } else if(route.name === "Accidentes"){
          iconName = 'ios-flame';
        } else if(route.name === "Asesoria"){
          iconName = 'ios-clipboard';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      {/* <Tab.Screen name="Perfil" component={Perfil}/>
      <Tab.Screen name="Actividades" component={Actividades}/>
      <Tab.Screen name="Accidentes" component={Accidentes}/>
      <Tab.Screen name="Asesoria" component={AsesoriaStack}/> */}
    </Tab.Navigator>
  );
}

function Profesional(){
  return(<Tab.Navigator initialRouteName="Actividades" screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Perfil') {
        iconName = 'ios-person';
      } else if (route.name === "Actividades") {
        iconName = 'ios-calendar';
      } else if(route.name === "Accidentes"){
        iconName = 'ios-flame';
      } else if(route.name === "Asesoria"){
        iconName = 'ios-clipboard';
      } else if(route.name==="Visita"){
        iconName = 'ios-headset';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}>
    <Tab.Screen name="Perfil" component={Perfil} options={{headerTitleAlign:'center', tabBarLabel:'Perfil', headerTitle:'NombreAqui'}}/>
{
/*<Tab.Screen name="Actividades" component={Actividades}/>
<Tab.Screen name="Visita" component={VisitaStack}/>
<Tab.Screen name="Asesoria" component={AsesoriaStack}/> */}
</Tab.Navigator>);
}

export default function App() {

  var tipoUsuario = 'Profesional';
  var Autenticado = true;
  //const auth = useAuth();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        {Autenticado ? 
         ( tipoUsuario==="Admin"?
           <Admin/>:
           (tipoUsuario==="Cliente"?
              <Cliente/>:
                <Profesional/>) 
         )
        :
        <Selector/>
        }
      </NavigationContainer>
    </Provider>
  );
  // import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Selector/>      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

//  <StatusBar style="auto" /> 
}
