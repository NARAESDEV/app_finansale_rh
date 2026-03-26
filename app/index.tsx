import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/features/auth/store/useAuthStore';

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  // Si no hay sesión, redirigimos al login por defecto
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Si hay sesión, vamos a los tabs
  return <Redirect href="/(tabs)" />;
}