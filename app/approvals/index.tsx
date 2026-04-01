import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Surface, Text } from 'react-native-paper';

// 1. MOCK DATA (Simulando la lista de tu equipo que enviará Spring Boot)
const mockPendingApprovals = [
    {
        id: '1005',
        name: 'Brenda González',
        role: 'Coordinadora de Mkt',
        avatar: 'https://ui-avatars.com/api/?name=Brenda+Gonzalez&background=FFE4E6&color=E11D48',
        type: 'Vacaciones Anuales',
        dates: '15 May - 22 May, 2026',
        days: 6,
        status: 'Pendiente',
    },
    {
        id: '1008',
        name: 'Carlos Ruiz',
        role: 'Analista Financiero',
        avatar: 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=E0F2FE&color=0284C7',
        type: 'Permiso Personal',
        dates: '02 Jun, 2026',
        days: 1,
        status: 'Pendiente',
    },
    {
        id: '1012',
        name: 'Miguel Torres',
        role: 'Desarrollador Backend',
        avatar: 'https://ui-avatars.com/api/?name=Miguel+Torres&background=FEF9C3&color=CA8A04',
        type: 'Vacaciones Anuales',
        dates: '10 Ago - 15 Ago, 2026',
        days: 5,
        status: 'Reasignado', // Un estado diferente para darle variedad visual
    }
];

export default function ApprovalsListScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <Appbar.Header style={styles.appBar} statusBarHeight={0}>
                <Appbar.BackAction onPress={() => router.back()} color="#3E77BC" />
                <Appbar.Content title="Solicitudes Pendientes" titleStyle={styles.appBarTitle} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.headerSection}>
                    {/* <Text style={styles.pageTitle}>Solicitudes Pendientes</Text> */}
                    <Text style={styles.pageSubtitle}>Tienes {mockPendingApprovals.length} solicitudes esperando tu revisión.</Text>
                </View>

                {/* LISTA DE TARJETAS */}
                <View style={styles.listContainer}>
                    {mockPendingApprovals.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.7}
                            onPress={() => router.push(`/approvals/${item.id}`)}
                        >
                            <Surface style={styles.card} elevation={1}>

                                {/* Fila Superior: Avatar, Info y Badge */}
                                <View style={styles.cardHeader}>
                                    <View style={styles.userInfo}>
                                        <Avatar.Image size={46} source={{ uri: item.avatar }} />
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.name}>{item.name}</Text>
                                            <Text style={styles.role}>{item.role}</Text>
                                        </View>
                                    </View>

                                    {/* Badge de Estado Dinámico */}
                                    <View style={[styles.badge, { backgroundColor: item.status === 'Pendiente' ? '#FEF3C7' : '#F3E8FF' }]}>
                                        <Text style={[styles.badgeText, { color: item.status === 'Pendiente' ? '#D97706' : '#7E22CE' }]}>
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>

                                {/* Fila Inferior: Fechas, Días y Flecha */}
                                <View style={styles.cardFooter}>
                                    <View style={styles.detailsRow}>
                                        <View style={styles.detailItem}>
                                            <MaterialCommunityIcons name="calendar-range" size={16} color="#64748B" />
                                            <Text style={styles.detailText}>{item.dates}</Text>
                                        </View>
                                        <View style={styles.dotSeparator} />
                                        <View style={styles.detailItem}>
                                            <MaterialCommunityIcons name="briefcase-clock-outline" size={16} color="#64748B" />
                                            <Text style={styles.detailText}>{item.type} ({item.days}d)</Text>
                                        </View>
                                    </View>
                                    <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
                                </View>

                            </Surface>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    appBar: { backgroundColor: 'white', elevation: 2, paddingTop: Platform.OS === 'android' ? 40 : 50, height: Platform.OS === 'android' ? 100 : 110, },
    appBarTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
    scrollContent: { paddingBottom: 40 },

    headerSection: { padding: 20, paddingBottom: 10 },
    pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
    pageSubtitle: { fontSize: 14, color: '#64748B', marginTop: 4 },

    listContainer: { paddingHorizontal: 20, gap: 16, marginTop: 10 },

    card: { backgroundColor: 'white', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#F1F5F9' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
    userInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    nameContainer: { marginLeft: 12, flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
    role: { fontSize: 13, color: '#64748B', marginTop: 2 },

    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    badgeText: { fontSize: 11, fontWeight: 'bold' },

    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, marginTop: 4 },
    detailsRow: { flexDirection: 'row', alignItems: 'center', flex: 1, flexWrap: 'wrap', gap: 8 },
    detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    detailText: { fontSize: 12, color: '#475569', fontWeight: '500' },
    dotSeparator: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' }
});