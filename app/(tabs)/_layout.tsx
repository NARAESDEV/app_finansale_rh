import { theme } from '@/src/core/theme/theme';
import { useAuthStore } from '@/src/features/auth/store/useAuthStore';
import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Lógica de redirección básica
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    } else {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}