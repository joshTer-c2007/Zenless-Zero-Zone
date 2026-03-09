import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [dolares, setDolares] = useState('');
  const [resultado, setResultado] = useState('');
  const [moneda, setMoneda] = useState('');

  const TASA_MXN = 18.40; 
  const TASA_COP = 3950;  
  const TASA_EUR = 0.92;  

  const convertir = (tasa, nombreMoneda) => {
    const valorDolar = parseFloat(dolares);
    if (!isNaN(valorDolar)) {
      const calculo = valorDolar * tasa;
      setResultado(calculo.toLocaleString('es-MX', { minimumFractionDigits: 2 }));
      setMoneda(nombreMoneda);
    } else {
      setResultado('Ingrese un valor válido');
      setMoneda('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Convertidor de Dólares</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ingrese valor en USD"
        keyboardType="numeric"
        value={dolares}
        onChangeText={(txt) => setDolares(txt)}
      />

      <View style={styles.buttonGroup}>
        <Button 
          title="PESOS MEXICANOS" 
          onPress={() => convertir(TASA_MXN, 'MXN')} 
          color="#006341" 
        />
        <View style={styles.spacer} />
        <Button 
          title="PESOS COLOMBIANOS" 
          onPress={() => convertir(TASA_COP, 'COP')} 
          color="#FCD116" 
        />
        <View style={styles.spacer} />
        <Button 
          title="EUROS" 
          onPress={() => convertir(TASA_EUR, 'EUR')} 
          color="#003399" 
        />
      </View>

      {resultado !== '' && (
        <View style={styles.resultadoContenedor}>
          <Text style={styles.resultadoTexto}>
            Equivalente: {resultado} {moneda}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '90%',
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 25,
  },
  buttonGroup: {
    width: '90%',
  },
  spacer: {
    height: 12,
  },
  resultadoContenedor: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // Sombra en Android
  },
  resultadoTexto: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
});