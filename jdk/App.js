import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TextInput, 
  TouchableOpacity, Alert, Keyboard, SafeAreaView 
} from 'react-native';

export default function App() {
  // --- ESTADOS (Hooks) ---
  const [productos, setProductos] = useState([
    { id: '101', nombre: 'Monitor', precio: '150' },
    { id: '102', nombre: 'Mouse', precio: '20' }
  ]);
  
  const [txtId, setTxtId] = useState('');
  const [txtNombre, setTxtNombre] = useState('');
  const [txtPrecio, setTxtPrecio] = useState('');
  const [esEdicion, setEsEdicion] = useState(false);

  // --- FUNCIONES DE LÓGICA ---

  // 1. Validar Duplicados y Agregar
  const guardarProducto = () => {
    if (!txtId || !txtNombre || !txtPrecio) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (esEdicion) {
      // Guardar cambios en Persona/Producto existente
      const nuevosProductos = productos.map(p => 
        p.id === txtId ? { id: txtId, nombre: txtNombre, precio: txtPrecio } : p
      );
      setProductos(nuevosProductos);
      cancelarEdicion();
    } else {
      // Validar Duplicados (Tema de la captura)
      const existe = productos.find(p => p.id === txtId);
      if (existe) {
        Alert.alert("Error", "Ya existe un producto con ese ID (Cédula/Código)");
        return;
      }
      // Agregar nuevo
      setProductos([...productos, { id: txtId, nombre: txtNombre, precio: txtPrecio }]);
      limpiarFormulario();
    }
    Keyboard.dismiss();
  };

  // 2. Seleccionar Elemento para editar
  const seleccionarProducto = (item) => {
    setTxtId(item.id);
    setTxtNombre(item.nombre);
    setTxtPrecio(item.precio);
    setEsEdicion(true); // Activa modo edición
  };

  // 3. Eliminar Persona/Producto
  const eliminarProducto = (id) => {
    Alert.alert("Eliminar", "¿Estás seguro?", [
      { text: "No" },
      { text: "Sí", onPress: () => setProductos(productos.filter(p => p.id !== id)) }
    ]);
  };

  const limpiarFormulario = () => {
    setTxtId(''); setTxtNombre(''); setTxtPrecio('');
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
    setEsEdicion(false);
  };

  // --- COMPONENTE DE ITEM (Flexbox en Item de Lista) ---
  const ItemProducto = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.itemInfo} onPress={() => seleccionarProducto(item)}>
        <Text style={styles.itemTextId}>{item.id}</Text>
        <Text style={styles.itemTextNombre}>{item.nombre}</Text>
        <Text style={styles.itemTextPrecio}>${item.precio}</Text>
      </TouchableOpacity>
      
      {/* Botones al Item (Tema de la captura) */}
      <TouchableOpacity 
        style={styles.btnEliminar} 
        onPress={() => eliminarProducto(item.id)}
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>ADMIN PRODUCTOS</Text>

      {/* FORMULARIO */}
      <View style={styles.form}>
        <TextInput
          placeholder="ID / Cédula"
          style={[styles.input, esEdicion && styles.inputDisabled]}
          value={txtId}
          onChangeText={setTxtId}
          keyboardType="numeric"
          editable={!esEdicion} // Deshabilitar ingreso de cédula en edición
        />
        <TextInput
          placeholder="Nombre del Producto"
          style={styles.input}
          value={txtNombre}
          onChangeText={setTxtNombre}
        />
        <TextInput
          placeholder="Precio"
          style={styles.input}
          value={txtPrecio}
          onChangeText={setTxtPrecio}
          keyboardType="numeric"
        />
        
        {/* Reutilizar botón Guardar */}
        <View style={styles.areaBotones}>
          <TouchableOpacity style={styles.btnGuardar} onPress={guardarProducto}>
            <Text style={styles.btnText}>{esEdicion ? "ACTUALIZAR" : "GUARDAR"}</Text>
          </TouchableOpacity>
          
          {esEdicion && (
            <TouchableOpacity style={styles.btnCancelar} onPress={cancelarEdicion}>
              <Text style={styles.btnText}>CANCELAR</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* LISTA */}
      <FlatList
        data={productos}
        renderItem={({item}) => <ItemProducto item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

// --- ESTILOS FLEXBOX ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  form: { backgroundColor: 'white', padding: 15, borderRadius: 10, elevation: 5, marginBottom: 20 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 15, padding: 8 },
  inputDisabled: { backgroundColor: '#eee', color: '#999' },
  areaBotones: { flexDirection: 'row', justifyContent: 'space-evenly' },
  btnGuardar: { backgroundColor: '#2ecc71', padding: 12, borderRadius: 5, minWidth: 100 },
  btnCancelar: { backgroundColor: '#e74c3c', padding: 12, borderRadius: 5, minWidth: 100 },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  
  // Estilos del Item
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db'
  },
  itemInfo: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  itemTextId: { fontWeight: 'bold', color: '#7f8c8d', width: 40 },
  itemTextNombre: { flex: 1, fontSize: 16, marginLeft: 10 },
  itemTextPrecio: { fontWeight: 'bold', color: '#27ae60' },
  btnEliminar: { backgroundColor: '#ff7675', padding: 10, borderRadius: 5, marginLeft: 15 }
});
