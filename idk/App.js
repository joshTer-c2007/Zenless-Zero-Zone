import React from 'react';
import { 
  SafeAreaView, 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar 
} from 'react-native';

// --- 1. ARREGLOS EN JAVASCRIPT (Lo primero que viste en la lista) ---
// Definimos una constante con objetos, cada uno con su ID único.
const PRODUCTOS_LISTA = [
  { id: '101', nombre: 'Teclado Mecánico RGB', categoria: 'Periféricos', precio: '$85.00' },
  { id: '102', nombre: 'Mouse Óptico Pro', categoria: 'Periféricos', precio: '$45.99' },
  { id: '103', nombre: 'Monitor 27" Curvo', categoria: 'Pantallas', precio: '$299.00' },
  { id: '104', nombre: 'Cámara Web HD', categoria: 'Video', precio: '$55.00' },
  { id: '105', nombre: 'Micrófono Condensador', categoria: 'Audio', precio: '$120.00' },
  { id: '106', nombre: 'Silla Ergonómica', categoria: 'Oficina', precio: '$180.00' },
  { id: '107', nombre: 'Escritorio Elevable', categoria: 'Oficina', precio: '$350.00' },
];

// --- 2. FLATLIST PARTE 1 Y 2 (Renderizado de componentes) ---
// Esta función define cómo se ve CADA elemento de la lista.
const ItemProducto = ({ item }) => (
  <View style={styles.itemCard}>
    <View style={styles.infoContainer}>
      <Text style={styles.textNombre}>{item.nombre}</Text>
      <Text style={styles.textCategoria}>{item.categoria}</Text>
    </View>
    <View style={styles.precioContainer}>
      <Text style={styles.textPrecio}>{item.precio}</Text>
    </View>
  </View>
);

export default function App() {
  
  // Función para renderizar el item (requerido por FlatList)
  const renderItem = ({ item }) => <ItemProducto item={item} />;

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Encabezado para que no se vea vacío */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo de Productos</Text>
        <Text style={styles.headerSubtitle}>Reto 26 - Listado</Text>
      </View>

      {/* --- EL COMPONENTE FLATLIST --- */}
      <FlatList
        data={PRODUCTOS_LISTA}
        renderItem={renderItem}
        keyExtractor={elemento => elemento.id} // Uso del ID del arreglo
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- 3. ESTILOS EN FLATLIST Y FLEXBOX ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EDF2F7', // Un gris azulado moderno
    paddingTop: StatusBar.currentHeight || 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#2D3748',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#A0AEC0',
    fontSize: 14,
  },
  itemCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
    // Flexbox para alinear contenido
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    // Sombra para profundidad
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoContainer: {
    flex: 2, // Toma más espacio para el nombre
  },
  precioContainer: {
    flex: 1,
    alignItems: 'flex-end', // Alinea el precio a la derecha
  },
  textNombre: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
  },
  textCategoria: {
    fontSize: 12,
    color: '#718096',
    textTransform: 'uppercase',
  },
  textPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38A169', // Color verde para el dinero
  },
});
