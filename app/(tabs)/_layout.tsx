import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

export default function TabsLayout() {
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
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 15,
    left: 20,
    right: 20,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    borderTopWidth: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  label: { fontSize: 11, fontWeight: '700' }
});