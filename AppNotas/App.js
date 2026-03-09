import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListItem, Icon, Button, Input, Text, FAB } from '@rneui/themed';

// --- 1. PANTALLA: LISTA DE NOTAS ---
function ListarNotas({ navigation, route }) {
  // Notas iniciales de ejemplo
  const [notas, setNotas] = useState([
    { id: '1', titulo: 'Comprar leche', contenido: 'Ir al super temprano' },
  ]);

  // Recibir nueva nota desde el formulario
  React.useEffect(() => {
    if (route.params?.nuevaNota) {
      setNotas((prev) => [...prev, route.params.nuevaNota]);
    }
  }, [route.params?.nuevaNota]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider onPress={() => Alert.alert(item.titulo, item.contenido)}>
            <Icon name="description" type="material" color="#2089dc" />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: 'bold' }}>{item.titulo}</ListItem.Title>
              <ListItem.Subtitle>{item.contenido}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
      />
      {/* BOTÓN FLOTANTE PARA AGREGAR */}
      <FAB
        icon={{ name: 'add', color: 'white' }}
        color="#2089dc"
        placement="right"
        onPress={() => navigation.navigate('Formulario')}
      />
    </View>
  );
}

// --- 2. PANTALLA: FORMULARIO DE NOTAS ---
function FormularioNota({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const guardar = () => {
    // VALIDACIÓN (Paso del reto)
    if (!titulo.trim() || !contenido.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const nueva = { id: Date.now().toString(), titulo, contenido };
    // PASAR PARÁMETROS ATRÁS (Paso del reto: Actualizar lista)
    navigation.navigate('Lista', { nuevaNota: nueva });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Título de la nota"
        onChangeText={setTitulo}
        leftIcon={<Icon name="title" type="material" />}
      />
      <Input
        placeholder="Contenido..."
        multiline
        onChangeText={setContenido}
        leftIcon={<Icon name="edit" type="material" />}
      />
      <Button 
        title=" Guardar Nota" 
        icon={<Icon name="save" color="white" />}
        onPress={guardar}
        buttonStyle={{ backgroundColor: '#10ac84', borderRadius: 10 }}
      />
    </View>
  );
}

// --- 3. CONFIGURACIÓN DEL STACK ---
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={ListarNotas} options={{ title: 'Mis Notas' }} />
        <Stack.Screen name="Formulario" component={FormularioNota} options={{ title: 'Nueva Nota' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: { padding: 20, flex: 1, backgroundColor: 'white' },
});
