import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Card, Divider, FAB, Text } from 'react-native-paper';
import { NotesChatModal } from './NotesChatModal';

// ==========================================
// 1. MOCK DATA (Simulando respuesta de Spring Boot para Aprobaciones)
// ==========================================
const mockApprovalDetail = {
    id: 'REQ-1005',
    employee: {
        name: 'Brenda González',
        role: 'Coordinadora de Marketing',
        avatar: 'https://ui-avatars.com/api/?name=Brenda+Gonzalez&background=FFE4E6&color=E11D48',
    },
    type: 'Vacaciones Anuales',
    startDate: new Date(2026, 4, 15), // 15 de Mayo 2026
    endDate: new Date(2026, 4, 22),   // 22 de Mayo 2026
    totalDays: 6,
    notes: 'Solicito estos días para un viaje familiar planificado.',
    currentStatus: 'pendiente_aprobacion', // Estado clave para la lógica
    // Historial de estados (Lo que alimentará el timeline)
    statusHistory: [
        { status: 'solicitud_enviada', label: 'Solicitud enviada', user: 'Brenda González', timestamp: new Date(2026, 4, 1, 10, 0), icon: 'send', color: '#64748B' },
        { status: 'pendiente_aprobacion', label: 'Pendiente de aprobación', user: 'RH (Asignado automáticamente)', timestamp: new Date(2026, 4, 1, 10, 5), icon: 'clock-outline', color: '#F59E0B' },
        // Los siguientes estados están listos para la Fase 4:
        // { status: 'aprobado', label: 'Aprobado', user: 'Carlos Ruiz (Gerente)', timestamp: null, icon: 'check-circle', color: '#10B981' },
        // { status: 'usuario_asignado', label: 'Usuario asignado', user: 'Admin Sistema', timestamp: null, icon: 'account-check', color: '#3E77BC' },
        // { status: 'reasignado', label: 'Reasignado', user: 'Lucía Fernández (RH)', timestamp: null, icon: 'account-convert', color: '#8B5CF6' },
    ]
};

// ==========================================
// 2. COMPONENTE LOCAL: StatusTimeline
// ==========================================
function StatusTimeline({ history }: { history: typeof mockApprovalDetail.statusHistory }) {
    return (
        <Card style={styles.timelineCard} elevation={0}>
            <Card.Content>
                <Text style={styles.sectionTitle}>Línea de Tiempo del Flujo</Text>

                {history.map((item, index) => {
                    const isLast = index === history.length - 1;
                    const isCompleted = item.timestamp !== null;

                    return (
                        <View key={item.status} style={styles.timelineItem}>
                            {/* Línea vertical conectora */}
                            {!isLast && <View style={[styles.timelineLine, { backgroundColor: isCompleted ? item.color : '#E2E8F0' }]} />}

                            {/* Círculo con ícono */}
                            <View style={[styles.timelineIconDot, { backgroundColor: isCompleted ? `${item.color}15` : '#F1F5F9', borderColor: isCompleted ? item.color : '#CBD5E1' }]}>
                                <MaterialCommunityIcons name={item.icon as any} size={18} color={isCompleted ? item.color : '#94A3B8'} />
                            </View>

                            {/* Contenido del estado */}
                            <View style={styles.timelineContent}>
                                <Text style={[styles.statusLabel, { color: isCompleted ? '#1E293B' : '#94A3B8', fontWeight: isCompleted ? '700' : '400' }]}>
                                    {item.label}
                                </Text>
                                <Text style={styles.statusUser}>{item.user}</Text>
                                {item.timestamp && (
                                    <Text style={styles.statusTime}>
                                        {format(item.timestamp, "dd 'de' MMM, hh:mm aa", { locale: es })}
                                    </Text>
                                )}
                            </View>
                        </View>
                    );
                })}
            </Card.Content>
        </Card>
    );
}

// ==========================================
// 3. PANTALLA PRINCIPAL: ApprovalDetailScreen
// ==========================================
export default function ApprovalDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [isChatVisible, setIsChatVisible] = useState(false);
    const data = mockApprovalDetail; // Usamos la mock data

    // Formateo de fechas
    const dateRange = `${format(data.startDate, "dd 'de' MMMM", { locale: es })} - ${format(data.endDate, "dd 'de' MMMM, yyyy", { locale: es })}`;

    return (
        <View style={styles.container}>
            {/* HEADER (Mismo estilo que RequestDetail) */}
            <Appbar.Header style={styles.appBar} statusBarHeight={0}>
                <Appbar.BackAction onPress={() => router.back()} color="#3E77BC" />
                <Appbar.Content title={`Aprobar ${data.id}`} titleStyle={styles.appBarTitle} />
                <Appbar.Action icon="dots-vertical" color="#64748B" onPress={() => { }} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* INFO DEL EMPLEADO (Tarjeta Principal) */}
                <Card style={styles.employeeCard} elevation={2}>
                    <Card.Content style={styles.employeeHeader}>
                        <Avatar.Image size={60} source={{ uri: data.employee.avatar }} />
                        <View style={styles.employeeInfo}>
                            <Text style={styles.employeeName}>{data.employee.name}</Text>
                            <Text style={styles.employeeRole}>{data.employee.role}</Text>
                        </View>
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Content style={styles.requestDetails}>
                        <InfoItem icon="calendar-range" label="Período" value={dateRange} color="#3E77BC" />
                        <View style={styles.row}>
                            <InfoItem icon="briefcase-clock-outline" label="Tipo" value={data.type} color="#F59E0B" />
                            <InfoItem icon="calendar-blank" label="Días Hábiles" value={`${data.totalDays} días`} color="#10B981" />
                        </View>
                    </Card.Content>
                </Card>

                {/* NOTAS DE LA SOLICITUD */}
                <Card style={styles.notesCard} elevation={0}>
                    <Card.Content>
                        <Text style={styles.sectionTitle}>Comentarios del Empleado</Text>
                        <View style={styles.notesBox}>
                            <Text style={styles.notesText}>“ {data.notes} ”</Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* TIMELINE DE ESTADOS (Corazón de la Fase 3) */}
                <StatusTimeline history={data.statusHistory} />

                {/* ESPACIO PARA BOTONES DE ACCIÓN (Fase 4) */}
                <View style={styles.actionPlaceholder}>
                    <Text style={styles.placeholderText}>Aquí irán los botones Aprobar/Rechazar (Fase 4)</Text>
                </View>

            </ScrollView>

            {/* FAB PARA EL CHAT (Reutilizado) */}
            <FAB
                icon="comment-multiple-outline"
                style={styles.fab}
                color="white"
                label="Notas internas (2)"
                onPress={() => setIsChatVisible(true)}
            />

            {/* MODAL DEL CHAT (Reutilizado) */}
            <NotesChatModal
                isVisible={isChatVisible}
                onClose={() => setIsChatVisible(false)}
                ticketId={data.id}
            />
        </View>
    );
}

// Componente auxiliar para ítems de info
function InfoItem({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    return (
        <View style={styles.infoItem}>
            <View style={[styles.iconBadge, { backgroundColor: `${color}10` }]}>
                <MaterialCommunityIcons name={icon} size={20} color={color} />
            </View>
            <View>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

// ==========================================
// 4. ESTILOS (Mix de RequestDetail y UI Moderna)
// ==========================================
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    appBar: { backgroundColor: 'white', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, paddingTop: Platform.OS === 'android' ? 40 : 50, height: Platform.OS === 'android' ? 100 : 110, }, appBarTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
    scrollContent: { padding: 20, paddingBottom: 120 }, // Espacio para el FAB

    // Employee Card
    employeeCard: { backgroundColor: 'white', borderRadius: 20, marginBottom: 20 },
    employeeHeader: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
    employeeInfo: { marginLeft: 16 },
    employeeName: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
    employeeRole: { fontSize: 14, color: '#64748B', marginTop: 2 },
    divider: { backgroundColor: '#F1F5F9' },
    requestDetails: { paddingVertical: 20, gap: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },

    // Info Items
    infoItem: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    iconBadge: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    infoLabel: { fontSize: 12, color: '#64748B' },
    infoValue: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginTop: 1 },

    // Notes
    notesCard: { backgroundColor: 'white', borderRadius: 20, marginBottom: 20, borderWidth: 1, borderColor: '#F1F5F9' },
    notesBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, marginTop: 12, borderLeftWidth: 3, borderLeftColor: '#CBD5E1' },
    notesText: { fontSize: 14, color: '#475569', fontStyle: 'italic', lineHeight: 22 },

    // Timeline
    timelineCard: { backgroundColor: 'white', borderRadius: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
    timelineItem: { flexDirection: 'row', minHeight: 70, paddingLeft: 8 },
    timelineLine: { position: 'absolute', left: 21, top: 28, width: 2, height: '100%', zIndex: 0 },
    timelineIconDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginTop: 6, zIndex: 1 },
    timelineContent: { flex: 1, marginLeft: 16, paddingBottom: 20 },
    statusLabel: { fontSize: 14 },
    statusUser: { fontSize: 12, color: '#64748B', marginTop: 2 },
    statusTime: { fontSize: 11, color: '#94A3B8', marginTop: 4 },

    // Placeholder
    actionPlaceholder: { height: 100, backgroundColor: '#EFF6FF', borderRadius: 16, borderStyle: 'dashed', borderWidth: 2, borderColor: '#3E77BC', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    placeholderText: { color: '#3E77BC', fontWeight: '600', fontSize: 14 },

    // FAB
    fab: { position: 'absolute', margin: 24, right: 0, bottom: 0, backgroundColor: '#1E293B', borderRadius: 16, }
});