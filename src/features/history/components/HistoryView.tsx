import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Card, List, Surface, Text } from 'react-native-paper';

const cycles = [
    { year: '2026', status: 'NO INICIADO', statusColor: '#E0E7FF', textColor: '#4338CA', info: 'Próximo periodo disponible' },
    { year: '2025', status: 'EN CURSO', statusColor: '#DCFCE7', textColor: '#15803D', info: 'Huajuapan, Oaxaca' },
    { year: '2024', status: 'FINALIZADO', statusColor: '#F1F5F9', textColor: '#64748B', info: '15 días disfrutados' },
];

export default function HistoryView() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text variant="headlineMedium" style={styles.mainTitle}>Historial de Solicitudes</Text>

            {/* Card: Días Acumulados */}
            <Card style={styles.accumulatedCard}>
                <Card.Content style={{ alignItems: 'center' }}>
                    <Text style={styles.accumulatedLabel}>DÍAS ACUMULADOS</Text>
                    <Text style={styles.accumulatedNumber}>42</Text>
                    <Text style={styles.accumulatedSub}>Total disponible a la fecha</Text>
                </Card.Content>
            </Card>

            {/* Stats Row */}
            <View style={styles.statsRow}>
                <Surface style={[styles.statBox, { backgroundColor: '#E0F2F1' }]} elevation={0}>
                    <MaterialCommunityIcons name="calendar-check" size={24} color="#15803D" />
                    <Text style={styles.statNum}>12</Text>
                    <Text style={styles.statLabel}>UTILIZADOS</Text>
                </Surface>
                <Surface style={[styles.statBox, { backgroundColor: '#E3F2FD' }]} elevation={0}>
                    <MaterialCommunityIcons name="clock-outline" size={24} color="#3E77BC" />
                    <Text style={styles.statNum}>30</Text>
                    <Text style={styles.statLabel}>PENDIENTES</Text>
                </Surface>
            </View>

            {/* Historial por Ciclo */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Historial por Ciclo</Text>
                <Text style={styles.filterText}>FILTRAR</Text>
            </View>

            {cycles.map((item, index) => (
                <Card key={index} style={styles.cycleCard}>
                    <List.Item
                        title={`Ciclo ${item.year}`}
                        description={item.info}
                        titleStyle={{ fontWeight: 'bold' }}
                        left={() => (
                            <View style={styles.blueIndicator} />
                        )}
                        right={() => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Badge style={{ backgroundColor: item.statusColor, color: item.textColor, fontWeight: '700', marginRight: 10 }}>
                                    {item.status}
                                </Badge>
                                <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
                            </View>
                        )}
                    />
                </Card>
            ))}

            {/* Card Informativa: Política */}
            <Card style={styles.policyCard}>
                <Card.Content style={styles.policyContent}>
                    <Avatar.Icon size={40} icon="information" backgroundColor="rgba(255,255,255,0.2)" color="white" />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text style={styles.policyTitle}>Política de Acumulación</Text>
                        <Text style={styles.policyText}>
                            Recuerda que los días de vacaciones expiran después de 18 meses de haber concluido el ciclo correspondiente.
                        </Text>
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

// Reutilizamos el Avatar para la política
const Avatar = require('react-native-paper').Avatar;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    content: { padding: 25, paddingBottom: 120 },
    mainTitle: { fontWeight: '900', color: '#1E293B', marginBottom: 25, marginTop: 40 },
    accumulatedCard: { borderRadius: 24, backgroundColor: 'white', elevation: 2, paddingVertical: 10 },
    accumulatedLabel: { color: '#3E77BC', fontWeight: '800', fontSize: 12, letterSpacing: 1 },
    accumulatedNumber: { fontSize: 56, fontWeight: '900', color: '#3E77BC' },
    accumulatedSub: { color: '#64748B', fontSize: 13 },

    statsRow: { flexDirection: 'row', gap: 15, marginTop: 20 },
    statBox: { flex: 1, padding: 20, borderRadius: 20, alignItems: 'center' },
    statNum: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginTop: 5 },
    statLabel: { fontSize: 10, fontWeight: '800', color: '#64748B' },

    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 35, marginBottom: 15, alignItems: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
    filterText: { color: '#3E77BC', fontWeight: 'bold', fontSize: 12 },

    cycleCard: { marginBottom: 12, borderRadius: 16, backgroundColor: 'white', elevation: 1, overflow: 'hidden' },
    blueIndicator: { width: 5, height: '100%', backgroundColor: '#3E77BC', position: 'absolute', left: 0 },

    policyCard: { marginTop: 20, borderRadius: 20, backgroundColor: '#3E77BC' },
    policyContent: { flexDirection: 'row', alignItems: 'center' },
    policyTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    policyText: { color: 'white', opacity: 0.9, fontSize: 12, marginTop: 4 }
});