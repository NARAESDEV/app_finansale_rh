import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Divider, List, Switch, Text, useTheme } from 'react-native-paper';
import { CustomButton } from '../../../components/ui/CustomButton';
import { useAuthStore } from '../../auth/store/useAuthStore';

export default function ProfileView() {
    const theme = useTheme();
    const { userName, logout } = useAuthStore();
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false); // Placeholder visual

    const handleLogout = () => {
        // //funcion de navegacion para logout
        logout();
        router.replace('/(auth)/login');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text variant="headlineMedium" style={styles.mainTitle}>Mi Perfil</Text>

            {/* 1. Header: Avatar Grande y Borde Azul */}
            <View style={styles.header}>
                <View style={styles.avatarWrapper}>
                    <Avatar.Image
                        size={120}
                        source={{ uri: 'https://i.pravatar.cc/150?u=josue' }}
                        style={styles.avatar}
                    />
                </View>
                <Text variant="headlineSmall" style={styles.userName}>{userName}</Text>
                <Text variant="bodyMedium" style={styles.userId}>ID Empleado: FS-202501</Text>
            </View>

            {/* 2. Información Laboral: Puesto, Depto, Ingreso */}
            <Card style={styles.card}>
                <Card.Title title="Información Laboral" titleStyle={styles.cardTitle} />
                <Divider style={styles.divider} />
                <Card.Content>
                    <List.Item
                        title="Puesto / Cargo"
                        description="Senior Mobile Developer"
                        left={props => <MaterialCommunityIcons name="briefcase-outline" size={24} color="#3E77BC" />}
                        titleStyle={styles.listItemTitle}
                    />
                    <List.Item
                        title="Departamento"
                        description="Desarrollo Tecnológico"
                        left={props => <MaterialCommunityIcons name="office-building-marker-outline" size={24} color="#3E77BC" />}
                        titleStyle={styles.listItemTitle}
                    />
                    <List.Item
                        title="Fecha de Ingreso"
                        description="15 Enero 2023"
                        left={props => <MaterialCommunityIcons name="calendar-account" size={24} color="#3E77BC" />}
                        titleStyle={styles.listItemTitle}
                    />
                </Card.Content>
            </Card>

            {/* 3. Configuración Rápida: Password, Modo oscuro */}
            <Card style={styles.card}>
                <Card.Title title="Configuración de la Cuenta" titleStyle={styles.cardTitle} />
                <Divider style={styles.divider} />
                <Card.Content>
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="lock-reset" size={24} color="#3E77BC" style={{ marginRight: 15 }} />
                            <Text style={styles.settingText}>Cambiar Contraseña</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
                    </TouchableOpacity>

                    <View style={styles.settingItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="theme-light-dark" size={24} color="#3E77BC" style={{ marginRight: 15 }} />
                            <Text style={styles.settingText}>Modo Oscuro (Beta)</Text>
                        </View>
                        <Switch value={isDarkMode} onValueChange={setIsDarkMode} color="#3E77BC" />
                    </View>
                </Card.Content>
            </Card>

            {/* 4. Cerrar Sesión: Botón elegante en la parte inferior */}
            <View style={styles.footer}>
                <CustomButton
                    title="Cerrar Sesión"
                    onPress={handleLogout}
                    color="#3E77BC" // Unificado al Azul Marino corporativo
                    icon="logout"
                    mode="outlined" // Usamos outlined para que se vea elegante y no compita con los botones principales
                />
                <Text style={styles.versionText}>Versión 1.0.0 (Build 25)</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    content: { padding: 25, paddingBottom: 120 },
    mainTitle: { fontWeight: '900', color: '#1E293B', marginBottom: 25, marginTop: 40 },

    // Header y Avatar
    header: { alignItems: 'center', marginBottom: 30 },
    avatarWrapper: {
        width: 136, // size + padding
        height: 136,
        borderRadius: 68,
        borderWidth: 4,
        borderColor: '#3E77BC', // Borde Azul Marino corporativo
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: { backgroundColor: '#EDF2F7' },
    userName: { fontWeight: 'bold', color: '#1E293B' },
    userId: { color: '#64748B', fontSize: 13 },

    // Cards
    card: { marginBottom: 20, borderRadius: 20, backgroundColor: 'white', elevation: 2 },
    cardTitle: { fontWeight: 'bold', color: '#1E293B', fontSize: 16 },
    divider: { backgroundColor: '#F1F5F9' },
    listItemTitle: { fontWeight: '600', color: '#64748B', fontSize: 12 },

    // Settings
    settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    settingText: { fontSize: 14, fontWeight: '600', color: '#1E293B' },

    // Footer
    footer: { marginTop: 30, gap: 10, },
    versionText: { alignSelf: 'center', padding: 10, fontSize: 10, color: '#CBD5E1', fontWeight: 'bold' },
});