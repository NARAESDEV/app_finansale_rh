import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#3E77BC',
      tabBarInactiveTintColor: '#94A3B8',
      // //estilos de navbar
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.label,
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Inicio',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-variant" size={26} color={color} />,
      }} />
      <Tabs.Screen name="requests" options={{
        title: 'Solicitudes',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-text-outline" size={26} color={color} />,
      }} />
      <Tabs.Screen name="history" options={{
        title: 'Historial',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="history" size={26} color={color} />,
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Perfil',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-outline" size={26} color={color} />,
      }} />


    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: Platform.OS === 'ios' ? 25 : 12,
    paddingTop: 10,
    // Sombra para que resalte
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: -5
  }
});