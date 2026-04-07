import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Card, Divider, Surface, Text } from 'react-native-paper';

// Reutilizamos componentes FSD
import { ProcessTimeline, TimelineStepType } from '../../src/components/ui/ProcessTimeline';
import { InfoItem } from '../../src/features/approvals/components/InfoItem';

export default function RequestHistoryDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // === DATA SIMULADA QUE SIGUE TU FLUJO COMPLEJO ===
    // Simulamos una solicitud que pasó por: Enviado -> Asignado -> En Curso -> Pendiente -> Reactivado -> Aprobado
    const mockDetailedHistory = {
        id: id || 'REQ-2026-001',
        employee: { name: 'Josue Israel', role: 'Ssr. Frontend Engineer', avatar: 'https://ui-avatars.com/api/?name=Josue+Israel&background=3E77BC&color=fff' },
        type: 'Vacaciones de Ley',
        totalDays: 10,
        startDate: new Date(2026, 4, 10),
        endDate: new Date(2026, 4, 20),

        // Aquí reconstruimos los pasos basados en tu objeto WORKFLOWS
        movements: [
            {
                id: '1', title: 'Solicitud Enviada', desc: 'Iniciada por Josue.',
                status: 'completed', icon: 'send', color: '#64748B'
            },
            {
                id: '2', title: 'Asignado a Usuario', desc: 'Asignado a: Carlos Ruiz (Gerente)',
                status: 'completed', icon: 'account-arrow-right', color: '#3E77BC'
            },
            {
                id: '3', title: 'En Curso', desc: 'La solicitud entró en revisión técnica.',
                status: 'completed', icon: 'play-circle', color: '#8B5CF6'
            },
            {
                id: '4', title: 'Puesto en Pendiente (Pausa)', desc: 'Motivo: "Análisis por carga de proyecto Alpha"',
                status: 'completed', icon: 'pause-circle-outline', color: '#F59E0B',
                obsText: 'Se requiere validación de entregables antes de liberar fechas.'
            },
            {
                id: '5', title: 'Reactivado (En Curso)', desc: 'Proyecto liberado, se retoma trámite.',
                status: 'completed', icon: 'play-circle-outline', color: '#8B5CF6'
            },
            {
                id: '6', title: 'Aprobado', desc: '¡Vacaciones autorizadas!',
                status: 'current', icon: 'check-decagram', color: '#10B981'
            }
        ] as TimelineStepType[]
    };

    const dateRange = `${format(mockDetailedHistory.startDate, "dd 'de' MMM")} - ${format(mockDetailedHistory.endDate, "dd 'de' MMM, yyyy", { locale: es })}`;

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appBar} statusBarHeight={0}>
                <Appbar.BackAction onPress={() => router.back()} color="#3E77BC" />
                <Appbar.Content title="Trazabilidad de Solicitud" titleStyle={styles.appBarTitle} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* 1. Card de Información de la Solicitud */}
                <Card style={styles.mainCard} elevation={2}>
                    <Card.Content>
                        <View style={styles.headerRow}>
                            <Avatar.Image size={50} source={{ uri: mockDetailedHistory.employee.avatar }} />
                            <View style={styles.headerText}>
                                <Text style={styles.employeeName}>{mockDetailedHistory.employee.name}</Text>
                                <Text style={styles.employeeRole}>{mockDetailedHistory.employee.role}</Text>
                            </View>
                            <Surface style={styles.statusBadge} elevation={0}>
                                <Text style={styles.statusText}>APROBADO</Text>
                            </Surface>
                        </View>

                        <Divider style={styles.divider} />

                        <View style={styles.detailsGrid}>
                            <InfoItem icon="calendar-range" label="Periodo Solicitado" value={dateRange} color="#3E77BC" />
                            <View style={styles.row}>
                                <InfoItem icon="umbrella-beach" label="Tipo" value={mockDetailedHistory.type} color="#F59E0B" />
                                <InfoItem icon="calendar-blank" label="Días Totales" value={`${mockDetailedHistory.totalDays} Días`} color="#10B981" />
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                {/* 2. El Flujo de Solicitud (Basado en WORKFLOWS) */}
                <ProcessTimeline
                    title="ESTADO DE LA SOLICITUD"
                    steps={mockDetailedHistory.movements}
                />

                <View style={styles.footerInfo}>
                    <MaterialCommunityIcons name="information-outline" size={16} color="#94A3B8" />
                    {/* <Text style={styles.footerText}>ID de Rastreo: {mockDetailedHistory.id}</Text> */}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    appBar: { backgroundColor: 'white', elevation: 2, paddingTop: Platform.OS === 'android' ? 40 : 50, height: Platform.OS === 'android' ? 100 : 110 },
    appBarTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
    scrollContent: { padding: 20, paddingBottom: 60 },

    // Card Principal
    mainCard: { borderRadius: 24, backgroundColor: 'white', marginBottom: 15 },
    headerRow: { flexDirection: 'row', alignItems: 'center' },
    headerText: { marginLeft: 15, flex: 1 },
    employeeName: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
    employeeRole: { fontSize: 13, color: '#64748B' },
    statusBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    statusText: { color: '#15803D', fontWeight: '900', fontSize: 10 },

    divider: { marginVertical: 20, backgroundColor: '#F1F5F9' },
    detailsGrid: { gap: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },

    // Footer
    footerInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, gap: 6 },
    footerText: { color: '#94A3B8', fontSize: 12, fontWeight: '600' }
});