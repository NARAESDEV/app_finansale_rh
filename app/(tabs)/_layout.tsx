import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: true,
      // //estilos de navbar
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#3E77BC', // Azul corporativo
      tabBarInactiveTintColor: '#94A3B8',
      tabBarLabelStyle: styles.tabBarLabel,
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Inicio',
        tabBarIcon: ({ color, focused }) => (
          <View style={focused ? styles.activeIconContainer : null}>
            <MaterialCommunityIcons name="home-variant" size={24} color={color} />
          </View>
        ),
      }} />
      <Tabs.Screen name="requests" options={{
        title: 'Solicitudes',
        tabBarIcon: ({ color, focused }) => (
          <View style={focused ? styles.activeIconContainer : null}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={24} color={color} />
          </View>
        ),
      }} />
      <Tabs.Screen name="history" options={{
        title: 'Historial',
        tabBarIcon: ({ color, focused }) => (
          <View style={focused ? styles.activeIconContainer : null}>
            <MaterialCommunityIcons name="history" size={24} color={color} />
          </View>
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Perfil',
        tabBarIcon: ({ color, focused }) => (
          <View style={focused ? styles.activeIconContainer : null}>
            <MaterialCommunityIcons name="account-outline" size={24} color={color} />
          </View>
        ),
      }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 20,
    right: 20,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderTopWidth: 0,
    paddingBottom: 10,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 5,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(62, 119, 188, 0.1)',
    padding: 8,
    borderRadius: 12,
  }
});