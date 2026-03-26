

import React from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomButton } from '../../src/components/ui/CustomButton';
import { CustomInput } from '../../src/components/ui/CustomInput';
import { useAuthStore } from '../../src/features/auth/store/useAuthStore';

export default function LoginScreen() {
  const theme = useTheme();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    // Simulamos respuesta exitosa del backend
    login({
      id: '1',
      nombre: 'Josue Vasquez',
      puesto: 'Senior Mobile Developer'
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
            FinanSale HR
          </Text>
          <Text variant="bodyMedium">Gestión de Recursos Humanos</Text>
        </View>

        <View style={styles.form}>
          <CustomInput label="Correo electrónico" keyboardType="email-address" />
          <CustomInput label="Contraseña" secureTextEntry />
          
          <CustomButton 
            title="Entrar" 
            onPress={handleLogin} 
            color={theme.colors.primary} 
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 120, height: 120, marginBottom: 16 },
  title: { fontWeight: '900' },
  form: { width: '100%' }
});





