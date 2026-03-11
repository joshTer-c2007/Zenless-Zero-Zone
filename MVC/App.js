import 'react-native-gesture-handler'; // Obligatorio: siempre en la primera línea
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- 1. PANTALLAS (Usando Arrow Functions y Destructuring) ---
// Estos son los componentes que se mostrarán en cada opción
const Inicio = () => (
  <View style={styles.center}><Text>🏠 Pantalla de Inicio</Text></View>
);

const Perfil = () => (
  <View style={styles.center}><Text>👤 Perfil del Desarrollador</Text></View>
);

const Productos = () => (
  <View style={styles.center}><Text>🛍️ Listado de Productos</Text></View>
);

const Carrito = () => (
  <View style={styles.center}><Text>🛒 Carrito de Compras</Text></View>
);

// --- 2. CONFIGURACIÓN DE TABS (Pestañas Inferiores) ---
const Tab = createBottomTabNavigator();

// Este componente agrupa las pestañas y será usado dentro del Drawer
const MisTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Catalogo" component={Productos} />
    <Tab.Screen name="Carrito" component={Carrito} />
  </Tab.Navigator>
);

// --- 3. CONFIGURACIÓN DEL DRAWER (Navegador Principal) ---
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Inicio} />
        
        {/* NAVEGACIÓN ANIDADA: El Drawer carga el componente MisTabs */}
        <Drawer.Screen name="Tienda Virtual" component={MisTabs} />
        
        <Drawer.Screen name="Mi Cuenta" component={Perfil} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// --- 4. ESTILOS FLEXBOX ---
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});