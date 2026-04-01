import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, Divider, Menu, Surface, Text, TextInput } from 'react-native-paper';


import { ChatFAB } from '../../src/components/ui/ChatFAB';
import { ProcessTimeline, TimelineStepType } from '../../src/components/ui/ProcessTimeline';
import { InfoItem } from '../../src/features/approvals/components/InfoItem';
import { ReassignModal } from '../../src/features/approvals/components/ReassignModal';
import { NotesChatModal } from '../../src/features/vacations/components/NotesChatModal';


//ESTADOS ACTUALIZADO (Con estado "Pendiente")

const WORKFLOWS = {
    VACACIONES: {
        borrador: [
            { target: 'asignado', label: 'Asignar a Usuario', icon: 'account-arrow-right', color: '#3E77BC', requiresUser: true, requiresReason: false },
            { target: 'peticion_autorizacion', label: 'Petición de Autorización', icon: 'send-clock', color: '#F59E0B', requiresUser: false, requiresReason: false }
        ],
        asignado: [
            { target: 'en_curso', label: 'En Curso', icon: 'play-circle', color: '#8B5CF6', requiresUser: false, requiresReason: false }
        ],
        peticion_autorizacion: [
            { target: 'en_curso', label: 'En Curso', icon: 'play-circle', color: '#8B5CF6', requiresUser: false, requiresReason: false },
            { target: 'rechazado', label: 'Rechazar Solicitud', icon: 'close-circle-outline', color: '#EF4444', requiresUser: false, requiresReason: true },
            { target: 'cancelado', label: 'Cancelar Solicitud', icon: 'cancel', color: '#64748B', requiresUser: false, requiresReason: true },
            { target: 'cerrado', label: 'Cerrar Expediente', icon: 'lock', color: '#1E293B', requiresUser: false, requiresReason: false }
        ],
        en_curso: [
            { target: 'aprobado', label: 'Aprobar Vacaciones', icon: 'check-decagram', color: '#10B981', requiresUser: false, requiresReason: false },
            { target: 'pendiente', label: 'Poner en Pendiente (Pausa)', icon: 'pause-circle-outline', color: '#F59E0B', requiresUser: false, requiresReason: true } // Nueva opción
        ],
        pendiente: [
            { target: 'en_curso', label: 'Reactivar (En Curso)', icon: 'play-circle-outline', color: '#8B5CF6', requiresUser: false, requiresReason: false },
            { target: 'rechazado', label: 'Rechazar Definitivamente', icon: 'close-circle-outline', color: '#EF4444', requiresUser: false, requiresReason: true },
            { target: 'cancelado', label: 'Cancelar Solicitud', icon: 'cancel', color: '#64748B', requiresUser: false, requiresReason: true }
        ],
        aprobado: [], rechazado: [], cancelado: [], cerrado: []
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

    const [currentStatus, setCurrentStatus] = useState('borrador');
    const [history, setHistory] = useState<TimelineStepType[]>([
        { id: 'hist-1', title: 'Borrador', desc: 'Solicitud iniciada por Fernanda.', status: 'current', icon: 'file-document-edit-outline', color: '#64748B' }
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
                <Appbar.Content title="Panel de Gestión" titleStyle={styles.appBarTitle} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

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

                <ProcessTimeline title="ESTADO DE PROCESO" steps={history} />

                {availableTransitions.length > 0 && (
                    <Surface style={styles.actionPanel} elevation={1}>
                        <Text style={styles.panelTitle}>Acción Requerida (Estado: {currentStatus.toUpperCase()})</Text>

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
                                    {selectedTransition ? selectedTransition.label : 'Elegir siguiente paso...'}
                                </Button>
                            }
                        >
                            {availableTransitions.map((t) => (
                                <Menu.Item
                                    key={t.target}
                                    onPress={() => { setSelectedTransition(t); setIsMenuVisible(false); setReasonError(''); }}
                                    title={t.label}
                                    leadingIcon={t.icon}
                                />
                            ))}
                        </Menu>

                        {selectedTransition?.requiresReason && (
                            <View style={styles.reasonContainer}>
                                <TextInput
                                    mode="outlined"
                                    label="Justificación del movimiento"
                                    value={reasonText}
                                    onChangeText={(text) => { setReasonText(text); setReasonError(''); }}
                                    multiline
                                    numberOfLines={2}
                                    error={!!reasonError}
                                    style={styles.input}
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
                            {selectedTransition?.requiresUser ? 'Asignar y Aplicar' : 'Confirmar Movimiento'}
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
    panelTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 15 },
    selectButton: { borderRadius: 12, borderColor: '#CBD5E1', marginBottom: 15, backgroundColor: '#F8FAFC' },
    selectButtonContent: { flexDirection: 'row-reverse', justifyContent: 'space-between', height: 48 },
    reasonContainer: { marginBottom: 15 },
    input: { backgroundColor: '#F8FAFC', fontSize: 14 },
    errorText: { color: '#EF4444', fontSize: 12, marginTop: 4, fontWeight: 'bold' },
    applyButton: { borderRadius: 12, paddingVertical: 4 }
});