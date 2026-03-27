import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Divider, IconButton, Surface, Text } from 'react-native-paper';

interface Props { id: string; }

export const RequestDetailView = ({ id }: Props) => {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header con navegación */}
            <View style={styles.navHeader}>
                <IconButton icon="arrow-left" onPress={() => router.back()} iconColor="#1E293B" />
                <Text variant="titleLarge" style={styles.navTitle}>Detalle de Solicitud</Text>
                <IconButton icon="bell-outline" iconColor="#1E293B" />
            </View>

            {/* 1. Card de Información del Solicitante */}
            <Card style={styles.infoCard}>
                <Card.Content style={styles.userRow}>
                    <Avatar.Image size={60} source={{ uri: 'https://i.pravatar.cc/150?u=josue' }} />
                    <View style={{ marginLeft: 15, flex: 1 }}>
                        <Text style={styles.userName}>Josue Vasquez</Text>
                        <Text style={styles.userJob}>Senior Mobile Developer</Text>
                    </View>
                </Card.Content>
                <Divider />
                <View style={styles.detailGrid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.gridLabel}>UBICACIÓN</Text>
                        <Text style={styles.gridValue}>Oaxaca, MX</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.gridLabel}>PERIODO</Text>
                        <Text style={styles.gridValue}>Octubre 2025</Text>
                    </View>
                </View>
            </Card>

            {/* 2. Timeline de Proceso (Brutal) */}
            <Text style={styles.sectionTitle}>ESTADO DEL PROCESO</Text>
            <Surface style={styles.timelineSurface} elevation={1}>
                {/* Paso 1: Completado */}
                <View style={styles.timelineStep}>
                    <View style={styles.iconColumn}>
                        <View style={[styles.stepIcon, { backgroundColor: '#DCFCE7' }]}>
                            <MaterialCommunityIcons name="check" size={20} color="#15803D" />
                        </View>
                        <View style={[styles.verticalLine, { backgroundColor: '#15803D' }]} />
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Solicitud Enviada</Text>
                        <Text style={styles.stepDate}>02 Oct, 2025</Text>
                        <Text style={styles.stepDesc}>Iniciaste el proceso de solicitud de vacaciones.</Text>
                    </View>
                </View>

                {/* Paso 2: Actual (Pendiente) */}
                <View style={styles.timelineStep}>
                    <View style={styles.iconColumn}>
                        <View style={[styles.stepIcon, { backgroundColor: '#E0F2F1' }]}>
                            <MaterialCommunityIcons name="clock-outline" size={20} color="#3E77BC" />
                        </View>
                        <View style={[styles.verticalLine, { backgroundColor: '#E2E8F0' }]} />
                    </View>
                    <View style={styles.stepContent}>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.stepTitle, { color: '#3E77BC' }]}>Pendiente de Aprobación</Text>
                            <Surface style={styles.currentBadge}><Text style={styles.badgeText}>ACTUAL</Text></Surface>
                        </View>
                        <Text style={styles.stepDesc}>Asignado a: Gerencia de Operaciones.</Text>
                        <Text style={styles.obsText}>"Estamos revisando la carga de trabajo para esas fechas."</Text>
                    </View>
                </View>

                {/* Paso 3: Futuro */}
                <View style={styles.timelineStep}>
                    <View style={styles.iconColumn}>
                        <View style={[styles.stepIcon, { backgroundColor: '#F1F5F9' }]}>
                            <MaterialCommunityIcons name="dots-horizontal" size={20} color="#64748B" />
                        </View>
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={[styles.stepTitle, { color: '#64748B' }]}>Resolución Final</Text>
                        <Text style={styles.stepDesc}>Pendiente de los pasos anteriores.</Text>
                    </View>
                </View>
            </Surface>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    content: { paddingBottom: 50 },
    navHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 10 },
    navTitle: { fontWeight: 'bold', color: '#1E293B' },

    infoCard: { margin: 20, borderRadius: 24, backgroundColor: 'white' },
    userRow: { flexDirection: 'row', alignItems: 'center', paddingBottom: 15 },
    userName: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
    userJob: { fontSize: 13, color: '#64748B' },
    detailGrid: { flexDirection: 'row', padding: 20 },
    gridItem: { flex: 1 },
    gridLabel: { fontSize: 10, fontWeight: '800', color: '#3E77BC', marginBottom: 4 },
    gridValue: { fontSize: 14, fontWeight: 'bold', color: '#1E293B' },

    sectionTitle: { paddingHorizontal: 25, fontSize: 14, fontWeight: '900', color: '#64748B', letterSpacing: 1 },
    timelineSurface: { margin: 20, padding: 20, borderRadius: 24, backgroundColor: 'white' },
    timelineStep: { flexDirection: 'row' },
    iconColumn: { alignItems: 'center', marginRight: 15 },
    stepIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    verticalLine: { width: 2, height: 60, marginVertical: 4 },
    stepContent: { flex: 1, paddingBottom: 25 },
    stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
    stepDate: { fontSize: 11, color: '#64748B', position: 'absolute', right: 0, top: 4 },
    stepDesc: { fontSize: 13, color: '#64748B', marginTop: 4 },
    obsText: { marginTop: 10, padding: 12, backgroundColor: '#F8FAFC', borderRadius: 12, fontSize: 12, fontStyle: 'italic', color: '#475569', borderLeftWidth: 3, borderLeftColor: '#3E77BC' },

    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    currentBadge: { backgroundColor: '#3E77BC', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' }
});