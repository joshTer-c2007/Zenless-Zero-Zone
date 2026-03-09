import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [categoria, setCategoria] = useState('');

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const e = parseFloat(estatura) / 100; // cm a metros

    if (p > 0 && e > 0) {
      const imc = p / (e * e);
      const imcFixed = imc.toFixed(1);
      setResultado(imcFixed);

      // Lógica de categorías
      if (imc < 18.5) setCategoria('Bajo peso');
      else if (imc < 24.9) setCategoria('Peso normal');
      else if (imc < 29.9) setCategoria('Sobrepeso');
      else setCategoria('Obesidad');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Calculadora IMC</Text>
          <Text style={styles.subtitle}>Índice de Masa Corporal</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ej: 75"
              keyboardType="numeric"
              placeholderTextColor="#999"
              onChangeText={setPeso}
              value={peso}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estatura (cm)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ej: 170"
              keyboardType="numeric"
              placeholderTextColor="#999"
              onChangeText={setEstatura}
              value={estatura}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={calcularIMC}>
            <Text style={styles.buttonText}>CALCULAR</Text>
          </TouchableOpacity>
        </View>

        {resultado && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Tu IMC es:</Text>
            <Text style={styles.resultValue}>{resultado}</Text>
            <Text style={[styles.category, 
              categoria === 'Peso normal' ? styles.normal : styles.alerta]}>
              {categoria}
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2f3640',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // Sombras para Android
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f9f9f9',
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#eee',
  },
  button: {
    backgroundColor: '#4834d4',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resultCard: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultLabel: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  resultValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#2f3640',
    marginVertical: 5,
  },
  category: {
    fontSize: 20,
    fontWeight: '600',
  },
  normal: { color: '#2ecc71' },
  alerta: { color: '#e74c3c' },
});