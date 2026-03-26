import { theme } from '@/src/core/theme/theme';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Dejamos las rutas declaradas, pero sin redirecciones automáticas */}
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}