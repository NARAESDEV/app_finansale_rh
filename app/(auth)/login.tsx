import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomButton } from '../../src/components/ui/CustomButton';
import { CustomInput } from '../../src/components/ui/CustomInput';
import { useAuthStore } from '../../src/features/auth/store/useAuthStore'; // Importamos el store
export default function LoginScreen() {
  const theme = useTheme();
  const login = useAuthStore((state) => state.login); // Obtenemos la función login
  const router = useRouter();

  const handleLogin = () => {
    // 1. Cambiamos el estado global
    login();

    // 2. Navegamos inmediatamente a los tabs
    // Usamos replace para que el usuario no pueda "volver" al login con el botón de atrás
    router.replace('/home');
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
            FinanSale
          </Text>
        </View>

        <CustomInput label="Correo electrónico" />
        <CustomInput label="Contraseña" secureTextEntry />
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => router.push('/(auth)/recover')} // Navega a la ruta que creamos
        >
          <Text style={styles.forgotPasswordText}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="Entrar"
          onPress={handleLogin}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  content: { padding: 25 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 100, height: 100, marginBottom: 10 },
  // Estilos del botón de "Olvidé mi contraseña"
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: -5,
    marginBottom: 25, // Espacio antes del botón de Entrar
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E77BC', // Azul corporativo para que parezca un enlace
  }
});