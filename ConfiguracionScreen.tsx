import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { generatePassword, checkPassword, PasswordStrength } from './SafePassword'; // wrapper multiplataforma

export default function App() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | ''>('');

  const onValueChange = (value: number) => setLength(value);

  const onCheckChange = (index: number, value: boolean) => {
    if (index === 0) setIncludeUppercase(value);
    else if (index === 1) setIncludeNumbers(value);
    else if (index === 2) setIncludeSymbols(value);
  };

  const getPassword = async () => {
    try {
      const pwd = await generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
      setPassword(pwd);
      await checkPasswordStrength(pwd);
    } catch (e) {
      console.error('Error generando contraseña:', e);
    }
  };

  const checkPasswordStrength = async (pwd: string) => {
    try {
      const strength: PasswordStrength = await checkPassword(pwd);
      console.log(strength);
      setPasswordStrength(strength);
    } catch (e) {
      console.error('Error verificando fuerza:', e);
      setPasswordStrength('');
    }
  };

  const checkPasswordAlert = () => {
    Alert.alert(`Contraseña: ${password}`, `Fuerza: ${passwordStrength}`);
  };

  const getStrengthStyle = () => {
    switch (passwordStrength) {
      case 'WEAK':
        return styles.weak;
      case 'MODERATE':
        return styles.medium;
      case 'STRONG':
        return styles.strong;
      default:
        return {};
    }
  };
  
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headline}>Longitud de la contraseña</Text>
        <Slider
          minimumValue={1}
          maximumValue={100}
          value={length}
          onValueChange={onValueChange}
          style={{ width: '100%', height: 40 }}
        />
        <Text style={styles.value}>Valor: {Math.round(length)}</Text>

        {/* Opciones */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Incluir mayúsculas</Text>
            <Switch value={includeUppercase} onValueChange={(val) => onCheckChange(0, val)} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Incluir números</Text>
            <Switch value={includeNumbers} onValueChange={(val) => onCheckChange(1, val)} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Incluir símbolos</Text>
            <Switch value={includeSymbols} onValueChange={(val) => onCheckChange(2, val)} />
          </View>
        </View>

        {/* Resultados */}
        <View style={[styles.card, styles.mt4]}>
          <Text style={styles.result}>Contraseña: {password}</Text>
          <Text style={[styles.result, getStrengthStyle()]}>Fuerza: {passwordStrength}</Text>
        </View>

        {/* Botones */}
        <View style={styles.btnGroup}>
          <Button title="Generar" onPress={getPassword} />
          <Button title="Verificar" onPress={checkPasswordAlert} color="#888" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  headline: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  value: { marginBottom: 16 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: { fontSize: 16 },
  result: { fontSize: 16, marginVertical: 4 },
  weak: { color: 'red' },
  medium: { color: 'orange' },
  strong: { color: 'green' },
  mt4: { marginTop: 16 },
  btnGroup: { flexDirection: 'row', justifyContent: 'space-around' },
});