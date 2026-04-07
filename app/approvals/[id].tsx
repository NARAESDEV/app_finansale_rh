import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, Divider, Menu, Surface, Text, TextInput } from 'react-native-paper';

// === COMPONENTES UI ===
import { ChatFAB } from '../../src/components/ui/ChatFAB';
import { ProcessTimeline, TimelineStepType } from '../../src/components/ui/ProcessTimeline';
import { InfoItem } from '../../src/features/approvals/components/InfoItem';
import { ReassignModal } from '../../src/features/approvals/components/ReassignModal';
import { NotesChatModal } from '../../src/features/vacations/components/NotesChatModal';

// ==========================================
// 1. MOTOR DE ESTADOS (Workflow Definido)
// ==========================================
const WORKFLOWS = {
    VACACIONES: {
        solicitud_enviada: [
            { target: 'peticion_autorizacion', label: 'Enviar a Autorización', icon: 'send-check', color: '#3E77BC', requiresUser: false, requiresReason: false },
            { target: 'reasignado', label: 'Reasignar a otro Jefe', icon: 'account-arrow-right', color: '#8B5CF6', requiresUser: true, requiresReason: false }
        ],
        peticion_autorizacion: [
            { target: 'aprobado', label: 'Aprobar', icon: 'check-decagram', color: '#10B981', requiresUser: false, requiresReason: false },
            { target: 'rechazado', label: 'Rechazar', icon: 'close-circle', color: '#EF4444', requiresUser: false, requiresReason: true },
            { target: 'cancelado', label: 'Cancelar', icon: 'cancel', color: '#64748B', requiresUser: false, requiresReason: true }
        ],
        reasignado: [
            { target: 'aprobado', label: 'Aprobar', icon: 'check-decagram', color: '#10B981', requiresUser: false, requiresReason: false },
            { target: 'rechazado', label: 'Rechazar', icon: 'close-circle', color: '#EF4444', requiresUser: false, requiresReason: true }
        ],
        aprobado: [], rechazado: [], cancelado: []
    }
};

const initialData = {
    id: 'REQ-1005',
    requestType: 'VACACIONES',
    employee: { name: 'Fernanda López', role: 'Diseñadora UX/UI', avatar: 'https://ui-avatars.com/api/?name=Fernanda+Lopez&background=FFE4E6&color=E11D48' },
    type: 'Vacaciones de Ley', totalDays: 6, startDate: new Date(2026, 4, 15), endDate: new Date(2026, 4, 22),
};

export default function ApprovalDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // --- ESTADO INICIAL: Petición de Autorización ---
    const [currentStatus, setCurrentStatus] = useState('peticion_autorizacion');

    // El historial ahora muestra el envío completado y la petición como paso actual
    const [history, setHistory] = useState<TimelineStepType[]>([
        { id: 'hist-1', title: 'Enviado', desc: 'Solicitud iniciada por Fernanda.', status: 'completed', icon: 'send', color: '#64748B' },
        { id: 'hist-2', title: 'Petición de Autorización', desc: 'Esperando resolución de Jefatura.', status: 'current', icon: 'send-clock', color: '#3E77BC' }
    ]);

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [selectedTransition, setSelectedTransition] = useState<any>(null);
    const [reasonText, setReasonText] = useState('');
    const [reasonError, setReasonError] = useState('');

    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);

    const dateRange = `${format(initialData.startDate, "dd 'de' MMM", { locale: es })} - ${format(initialData.endDate, "dd 'de' MMM, yyyy", { locale: es })}`;
    const availableTransitions = WORKFLOWS[initialData.requestType as keyof typeof WORKFLOWS]?.[currentStatus] || [];

    const confirmTransition = (user?: any) => {
        if (!selectedTransition) return;
        if (selectedTransition.requiresReason && reasonText.trim() === '') {
            setReasonError('Debes indicar el motivo para este cambio de estado.');
            return;
        }

        const newStep: TimelineStepType = {
            id: Math.random().toString(),
            title: selectedTransition.label,
            desc: user ? `Asignado a: ${user.name}` : `Movimiento: ${selectedTransition.label}. ${reasonText ? `Obs: ${reasonText}` : ''}`,
            status: 'current',
            icon: selectedTransition.icon,
            color: selectedTransition.color,
            obsText: reasonText ? `"${reasonText}"` : undefined
        };

        const updatedHistory = history.map(h => ({ ...h, status: 'completed' as const }));
        setHistory([...updatedHistory, newStep]);
        setCurrentStatus(selectedTransition.target);
        setSelectedTransition(null);
        setReasonText('');
        setReasonError('');

        Alert.alert("Éxito", `Solicitud movida a: ${selectedTransition.label}`);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appBar} statusBarHeight={0}>
                <Appbar.BackAction onPress={() => router.back()} color="#3E77BC" />
                <Appbar.Content title="Gestión de Solicitud" titleStyle={styles.appBarTitle} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* INFO DEL EMPLEADO */}
                <Card style={styles.employeeCard} elevation={2}>
                    <Card.Content style={styles.employeeHeader}>
                        <Avatar.Image size={60} source={{ uri: initialData.employee.avatar }} />
                        <View style={styles.employeeInfo}>
                            <Text style={styles.employeeName}>{initialData.employee.name}</Text>
                            <Text style={styles.employeeRole}>{initialData.employee.role}</Text>
                        </View>
                    </Card.Content>
                    <Divider />
                    <Card.Content style={styles.requestDetails}>
                        <InfoItem icon="calendar-range" label="Período" value={dateRange} color="#3E77BC" />
                        <View style={styles.row}>
                            <InfoItem icon="briefcase-clock-outline" label="Tipo" value={initialData.type} color="#F59E0B" />
                            <InfoItem icon="calendar-blank" label="Días" value={`${initialData.totalDays}`} color="#10B981" />
                        </View>
                    </Card.Content>
                </Card>

                {/* ESTADO DE PROCESO (Timeline Actualizado) */}
                <ProcessTimeline title="FLUJO DE TRABAJO" steps={history} />

                {/* ACCIÓN REQUERIDA (Menu con Aprobar/Rechazar) */}
                {/* ACCIÓN REQUERIDA (Menu con Aprobar/Rechazar y Motivo) */}
                {availableTransitions.length > 0 && (
                    <Surface style={styles.actionPanel} elevation={1}>
                        <Text style={styles.panelTitle}>Resolución de Solicitud ({currentStatus.replace('_', ' ').toUpperCase()})</Text>

                        <Menu
                            visible={isMenuVisible}
                            onDismiss={() => setIsMenuVisible(false)}
                            anchor={
                                <Button
                                    mode="outlined"
                                    onPress={() => setIsMenuVisible(true)}
                                    style={styles.selectButton}
                                    contentStyle={styles.selectButtonContent}
                                    textColor={selectedTransition ? selectedTransition.color : '#64748B'}
                                    icon="chevron-down"
                                >
                                    {selectedTransition ? selectedTransition.label : 'Seleccionar Acción...'}
                                </Button>
                            }
                        >
                            {availableTransitions.map((t) => (
                                <Menu.Item
                                    key={t.target}
                                    onPress={() => {
                                        setSelectedTransition(t);
                                        setIsMenuVisible(false);
                                        setReasonError(''); // Limpiamos errores previos al cambiar de opción
                                    }}
                                    title={t.label}
                                    leadingIcon={t.icon}
                                    titleStyle={{ color: t.color, fontWeight: 'bold' }}
                                />
                            ))}
                        </Menu>

                        {/* EL CAMPO DE MOTIVO APARECE SIEMPRE QUE HAYA UNA OPCIÓN SELECCIONADA */}
                        {selectedTransition && (
                            <View style={styles.reasonContainer}>
                                <TextInput
                                    mode="outlined"
                                    label={selectedTransition.requiresReason ? "Motivo de cambio (Obligatorio)*" : "Motivo de cambio (Opcional)"}
                                    value={reasonText}
                                    onChangeText={(text) => { setReasonText(text); setReasonError(''); }}
                                    multiline
                                    numberOfLines={2}
                                    error={!!reasonError}
                                    style={styles.input}
                                    activeOutlineColor={selectedTransition.color} // El borde toma el color de la acción (Verde, Rojo, etc)
                                />
                                {reasonError ? <Text style={styles.errorText}>{reasonError}</Text> : null}
                            </View>
                        )}

                        <Button
                            mode="contained"
                            disabled={!selectedTransition}
                            onPress={() => selectedTransition?.requiresUser ? setIsUserModalVisible(true) : confirmTransition()}
                            style={[styles.applyButton, selectedTransition && { backgroundColor: selectedTransition.color }]}
                        >
                            {selectedTransition?.label ? `Confirmar ${selectedTransition.label}` : 'Confirmar Movimiento'}
                        </Button>
                    </Surface>
                )}

            </ScrollView>

            <ChatFAB onPress={() => setIsChatVisible(true)} count={2} />

            <ReassignModal
                isVisible={isUserModalVisible}
                onClose={() => setIsUserModalVisible(false)}
                onSelectUser={(user) => { setIsUserModalVisible(false); confirmTransition(user); }}
            />

            {isChatVisible && <NotesChatModal isVisible={isChatVisible} onClose={() => setIsChatVisible(false)} ticketId={initialData.id} />}
        </View>
    );
}

// === ESTILOS ===
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    appBar: { backgroundColor: 'white', elevation: 2, paddingTop: Platform.OS === 'android' ? 40 : 50, height: Platform.OS === 'android' ? 100 : 110 },
    appBarTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
    scrollContent: { padding: 20, paddingBottom: 120 },
    employeeCard: { backgroundColor: 'white', borderRadius: 20, marginBottom: 10 },
    employeeHeader: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
    employeeInfo: { marginLeft: 16 },
    employeeName: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
    employeeRole: { fontSize: 14, color: '#64748B', marginTop: 2 },
    requestDetails: { paddingVertical: 20, gap: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
    actionPanel: { backgroundColor: 'white', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 20, marginBottom: 40 },
    panelTitle: { fontSize: 13, fontWeight: '800', color: '#64748B', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 0.5 },
    selectButton: { borderRadius: 12, borderColor: '#CBD5E1', marginBottom: 15, backgroundColor: '#F8FAFC' },
    selectButtonContent: { flexDirection: 'row-reverse', justifyContent: 'space-between', height: 48 },
    reasonContainer: { marginBottom: 15 },
    input: { backgroundColor: '#F8FAFC', fontSize: 14 },
    errorText: { color: '#EF4444', fontSize: 12, marginTop: 4, fontWeight: 'bold' },
    applyButton: { borderRadius: 12, paddingVertical: 4 }
});