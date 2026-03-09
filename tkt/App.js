import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TextInput, 
  TouchableOpacity, Modal, SafeAreaView, StatusBar 
} from 'react-native';

export default function App() {
  const [productos, setProductos] = useState([
    { id: '101', nombre: 'Monitor', precio: '150' },
    { id: '102', nombre: 'Mouse', precio: '20' }
  ]);
  
  const [txtId, setTxtId] = useState('');
  const [txtNombre, setTxtNombre] = useState('');
  const [txtPrecio, setTxtPrecio] = useState('');
  const [esEdicion, setEsEdicion] = useState(false);

  // --- NUEVOS ESTADOS PARA EL MODAL ---
  const [modalVisible, setModalVisible] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  // 1. SIMPLIFICACIÓN: Arrow Functions (Temas del video)
  const limpiarFormulario = () => { setTxtId(''); setTxtNombre(''); setTxtPrecio(''); };

  const guardarProducto = () => {
    if (esEdicion) {
      setProductos(productos.map(p => p.id === txtId ? { id: txtId, nombre: txtNombre, precio: txtPrecio } : p));
      setEsEdicion(false);
    } else {
      if (productos.find(p => p.id === txtId)) return alert("ID Duplicado");
      setProductos([...productos, { id: txtId, nombre: txtNombre, precio: txtPrecio }]);
    }
    limpiarFormulario();
  };

  // Función para abrir el modal de confirmación
  const confirmarEliminacion = (id) => {
    setIdSeleccionado(id);
    setModalVisible(true);
  };

  const eliminarProducto = () => {
    setProductos(productos.filter(p => p.id !== idSeleccionado));
    setModalVisible(false);
  };

  // 2. DESTRUCTURING: En el renderItem (Tema del video)
  const renderItem = ({ item }) => {
    const { id, nombre, precio } = item; // Aquí aplicamos Destructuring de objetos
    
    return (
      // REQUERIMIENTO 1: Envolver todo el item para editar
      <TouchableOpacity 
        style={styles.itemContainer} 
        onPress={() => {
          setTxtId(id); setTxtNombre(nombre); setTxtPrecio(precio); setEsEdicion(true);
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.itemTextId}>{id}</Text>
          <Text style={styles.itemTextNombre}>{nombre}</Text>
          <Text style={styles.itemTextPrecio}>${precio}</Text>
        </View>

        <TouchableOpacity 
          style={styles.btnEliminar} 
          onPress={() => confirmarEliminacion(id)}
        >
          <Text style={{ color: 'white' }}>Eliminar</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>RETO 28: COMPONENTES</Text>

      {/* FORMULARIO */}
      <View style={styles.form}>
        <TextInput placeholder="ID" style={styles.input} value={txtId} onChangeText={setTxtId} editable={!esEdicion} />
        <TextInput placeholder="Nombre" style={styles.input} value={txtNombre} onChangeText={setTxtNombre} />
        <TextInput placeholder="Precio" style={styles.input} value={txtPrecio} onChangeText={setTxtPrecio} />
        <TouchableOpacity style={styles.btnGuardar} onPress={guardarProducto}>
          <Text style={styles.btnText}>{esEdicion ? "ACTUALIZAR" : "GUARDAR"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={productos} renderItem={renderItem} keyExtractor={item => item.id} />

      {/* REQUERIMIENTO 2: MODAL DE ELIMINACIÓN */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Está seguro que quiere eliminar?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.btnAceptar} onPress={eliminarProducto}>
                <Text style={styles.btnText}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', padding: 20, paddingTop: 40 },
  titulo: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  form: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  btnGuardar: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  btnText: { color: 'white', textAlign: 'center' },
  itemContainer: { backgroundColor: 'white', padding: 15, marginVertical: 5, flexDirection: 'row', borderRadius: 10, alignItems: 'center' },
  btnEliminar: { backgroundColor: 'red', padding: 8, borderRadius: 5 },
  // Estilos del Modal
  centeredView: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowRadius: 4, elevation: 5 },
  modalText: { marginBottom: 15, textAlign: "center", fontSize: 18 },
  modalButtons: { flexDirection: 'row', gap: 10 },
  btnAceptar: { backgroundColor: '#2196F3', padding: 10, borderRadius: 5, minWidth: 80 },
  btnCancelar: { backgroundColor: '#FF5252', padding: 10, borderRadius: 5, minWidth: 80 }
});