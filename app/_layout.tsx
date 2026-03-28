import { theme } from '@/src/core/theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Surface, Text } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomButton } from '../src/components/ui/CustomButton';

const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Dejamos las rutas declaradas, pero sin redirecciones automáticas */}
          <Stack.Screen name="(auth)/login" options={{ animation: 'fade' }} />
          <Stack.Screen name="(auth)/recover" options={{ animation: 'fade' }} />
          <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <View style={styles.errorContainer}>
      <Surface style={styles.errorIconBox} elevation={0}>
        <MaterialCommunityIcons name="alert-decagram-outline" size={60} color="#E11D48" />
      </Surface>
      <Text style={styles.errorTitle}>¡Ups! Algo salió mal</Text>
      <Text style={styles.errorText}>
        Nuestros sistemas detectaron un problema inesperado. No te preocupes, tu información está a salvo.
      </Text>

      {/* Solo mostramos el error técnico si estamos en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <View style={styles.devErrorBox}>
          <Text style={styles.devErrorText}>{error.message}</Text>
        </View>
      )}

      <View style={{ width: '100%', marginTop: 20 }}>
        <CustomButton title="Intentar de nuevo" onPress={retry} color="#3E77BC" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#F9FCFF' },
  errorIconBox: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFE4E6', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  errorTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginBottom: 10 },
  errorText: { textAlign: 'center', color: '#64748B', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  devErrorBox: { backgroundColor: '#1E293B', padding: 15, borderRadius: 12, width: '100%', marginBottom: 20 },
  devErrorText: { color: '#F8FAFC', fontSize: 11, fontFamily: 'monospace' }
});