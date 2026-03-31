import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Card, Divider, Text } from 'react-native-paper';

// Importaciones FSD
import { ChatFAB } from '../../src/components/ui/ChatFAB';
import { ProcessTimeline, TimelineStepType } from '../../src/components/ui/ProcessTimeline';
import { ApprovalActions } from '../../src/features/approvals/components/ApprovalActions';
import { InfoItem } from '../../src/features/approvals/components/InfoItem';
import { ReassignModal } from '../../src/features/approvals/components/ReassignModal';
import { mockApprovalDetail } from '../../src/features/approvals/data/mockApprovals';
import { NotesChatModal } from '../../src/features/vacations/components/NotesChatModal';

export default function ApprovalDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Estados de UI
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isReassignModalVisible, setIsReassignModalVisible] = useState(false);

    const data = mockApprovalDetail;
    const dateRange = `${format(data.startDate, "dd 'de' MMMM", { locale: es })} - ${format(data.endDate, "dd 'de' MMMM, yyyy", { locale: es })}`;

    // --- CONFIGURACIÓN DINÁMICA DEL TIMELINE ---
    const timelineSteps: TimelineStepType[] = [
        {
            id: 'step-1',
            title: 'Solicitud Enviada',
            desc: 'El empleado inició la solicitud de vacaciones.',
            status: 'completed',
            icon: 'check',
            color: '#15803D'
        },
        {
            id: 'step-2',
            title: 'Revisión Actual',
            desc: 'Es tu turno de tomar una decisión sobre esta solicitud.',
            status: 'current',
            icon: 'clock-outline',
            color: '#3E77BC',
            obsText: 'Carga de trabajo en equipo: Moderada'
        },
        {
            id: 'reasignar',
            title: 'Reasignar Solicitud',
            desc: 'Delegar esta aprobación a otro jefe o persona de RH.',
            status: 'pending',
            icon: 'account-switch',
            color: '#8B5CF6',
            isActionable: true // ¡Hace que este paso sea clickeable!
        },
        {
            id: 'step-4',
            title: 'Resolución Final',
            desc: 'Pendiente de aprobación o rechazo.',
            status: 'pending',
            icon: 'dots-horizontal',
            color: '#64748B'
        }
    ];

    // Manejador de clics en el timeline
    const handleTimelinePress = (stepId: string) => {
        if (stepId === 'reasignar') {
            setIsReassignModalVisible(true);
        }
    };

    // Manejador de selección de usuario para reasignar
    const handleReassign = (user: any) => {
        setIsReassignModalVisible(false);
        Alert.alert("Éxito", `La solicitud ha sido reasignada a ${user.name} (${user.role}).`);
        // Opcional: router.back() para regresar al dashboard porque ya no es tu tarea
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appBar} statusBarHeight={0}>
                <Appbar.BackAction onPress={() => router.back()} color="#3E77BC" />
                <Appbar.Content title={`Gestionar ${data.id}`} titleStyle={styles.appBarTitle} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* INFO DEL EMPLEADO */}
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

                {/* TIMELINE DINÁMICO E INTERACTIVO */}
                <ProcessTimeline
                    title="ESTADO DE APROBACIÓN"
                    steps={timelineSteps}
                    onStepPress={handleTimelinePress}
                />

                {/* ACCIONES (Fase 4 - Aprobar/Rechazar) */}
                <ApprovalActions
                    onApprove={(reason) => Alert.alert("¡Aprobado!", `Motivo: ${reason || 'Ninguno'}`)}
                    onReject={(reason) => Alert.alert("Rechazado", `Motivo: ${reason}`)}
                />

            </ScrollView>

            {/* FAB REUTILIZABLE */}
            <ChatFAB onPress={() => setIsChatVisible(true)} count={2} />

            {/* MODALES */}
            {isChatVisible && (
                <NotesChatModal isVisible={isChatVisible} onClose={() => setIsChatVisible(false)} ticketId={data.id} />
            )}

            <ReassignModal
                isVisible={isReassignModalVisible}
                onClose={() => setIsReassignModalVisible(false)}
                onSelectUser={handleReassign}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    appBar: { backgroundColor: 'white', elevation: 2, paddingTop: Platform.OS === 'android' ? 40 : 50, height: Platform.OS === 'android' ? 100 : 110, },
    appBarTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
    scrollContent: { padding: 20, paddingBottom: 120 },
    employeeCard: { backgroundColor: 'white', borderRadius: 20, marginBottom: 10 },
    employeeHeader: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
    employeeInfo: { marginLeft: 16 },
    employeeName: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
    employeeRole: { fontSize: 14, color: '#64748B', marginTop: 2 },
    divider: { backgroundColor: '#F1F5F9' },
    requestDetails: { paddingVertical: 20, gap: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 }
});