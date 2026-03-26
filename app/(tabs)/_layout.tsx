import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs screenOptions={{
      // //estilos de navbar
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: '#94A3B8',
      headerShown: false,
      tabBarStyle: { height: 65, paddingBottom: 12, backgroundColor: '#FFFFFF', borderTopColor: '#E2E8F0' },
      tabBarLabelStyle: { fontWeight: 'bold', fontSize: 11 }
    }}>
      <Tabs.Screen name="index" options={{
          title: 'INICIO',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" size={28} color={color} />,
      }} />
      <Tabs.Screen name="requests" options={{
          title: 'SOLICITUDES',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-text-clock-outline" size={28} color={color} />,
      }} />
      <Tabs.Screen name="history" options={{
          title: 'HISTORIAL',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="history" size={28} color={color} />,
      }} />
    </Tabs>
  );
}