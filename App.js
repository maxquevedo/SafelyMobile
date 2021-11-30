
import * as React from 'react';
import { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import MantenedorAdmin from './Vistas/Auth/Admin/MantenedorAdmin';
//import VerReportes from './Vistas/Auth/VerReportes';
import AsignarProfesional from './Vistas/Auth/AsignarProfesional';
import Perfil from './Vistas/Auth/Perfil';
import Actividades from './Vistas/Auth/Actividades';
import Administrar from './Vistas/Auth/Administrar';
import Accidentes from './Vistas/Auth/Accidentes';
import AsesoriaStack from './Vistas/Auth/AsesoriaStack';
//import Accidentes from './Vistas/Auth/Cliente/Accidentes';
//import AsesoriaStack from './Vistas/Auth/AsesoriaStack';
import Login from './Vistas/NoAuth/Login';
import RevisarCliente from './Vistas/Auth/RevisarCliente';
///import Visita from './Vistas/Auth/Profesional/Visita';
import { Provider } from 'react-redux'
import Store from './Store/Store';
import VisitaStack from './Vistas/Auth/VisitaStack';

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

        if (route.name === 'Perfil') {
          iconName = 'ios-people';
        } else if (route.name === "Asignar profesional") {
          iconName = 'person-add';
        } else if(route.name === "Ver reportes"){
          iconName = focused ? 'ios-folder-open' : 'ios-folder';
        }else if (route.name === "Actividades") {
          iconName = 'ios-calendar';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Perfil" component={Perfil} options={{headerTitleAlign:'center', tabBarLabel:'Perfil', headerTitle:`Admin`}}/>
      <Tab.Screen name="Actividades" component={Actividades} options={{headerShown:false}}/>
      <Tab.Screen name="Asignar profesional" component={AsignarProfesional} options={{headerShown:false}} />
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
          iconName = 'menu';
        }
        return <Ionicons name={iconName} size={size} color={color}/>;
      },
      
    })}>
      <Tab.Screen name="Perfil" component={Perfil} options={{headerTitleAlign:'center', tabBarLabel:'Perfil', headerTitle:'Cliente'}}/>
      <Tab.Screen name="Actividades" component={Actividades} options={{headerShown:false}}/>
      <Tab.Screen name="Accidentes" component={Accidentes} options={{headerShown:false}}/>
      <Tab.Screen name="Asesoria" component={AsesoriaStack} options={{headerShown:false , tabBarLabel:'Menú'}}/> 
    </Tab.Navigator>
  );
}

function Profesional(){
  return(<Tab.Navigator initialRouteName="Actividades" screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Perfil') {
        iconName = 'ios-person-outline';
      } else if (route.name === "Actividades") {
        iconName = 'ios-calendar-outline';
      } else if(route.name === "RevisarCliente"){
        iconName = 'search-outline';
      } else if(route.name === "Asesorias"){
        iconName = 'menu';
      } else if(route.name==="Visitas"){
        iconName = 'create-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}>
    <Tab.Screen name="Perfil" component={Perfil} options={{headerTitleAlign:'center', tabBarLabel:'Perfil', headerTitle:'Profesional'}}/>
    <Tab.Screen name="RevisarCliente" component={RevisarCliente} options={{headerShown:false}}/>
    <Tab.Screen name="Actividades" component={Actividades} options={{headerShown:false}}/>
    <Tab.Screen name="Visitas" component={VisitaStack} options={{headerShown:false}}/>
    <Tab.Screen name="Asesorias" component={AsesoriaStack} options={{headerShown:false, tabBarLabel:'Menú'}}/>   
</Tab.Navigator>);
}

export default function App() {

  var tipoUsuario = 'Cliente';
  var Autenticado = false;

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
}
