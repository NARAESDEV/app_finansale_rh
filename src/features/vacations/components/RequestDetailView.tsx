import { ChatFAB } from '@/src/components/ui/ChatFAB';
import { ProcessTimeline, TimelineStepType } from '@/src/components/ui/ProcessTimeline';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Divider, IconButton, Text } from 'react-native-paper';
import { NotesChatModal } from './NotesChatModal'; // Importamos el chat

interface Props { id: string; }

export const RequestDetailView = ({ id }: Props) => {
    const router = useRouter();
    const [chatVisible, setChatVisible] = useState(false); // Estado del Chat

    const timelineSteps: TimelineStepType[] = [
        {
            id: 'step-1',
            title: 'Solicitud Enviada',
            desc: 'Iniciaste el proceso de solicitud de vacaciones.',
            status: 'completed',
            icon: 'check',
            color: '#15803D'
        },
        {
            id: 'step-2',
            title: 'Pendiente de Aprobación',
            desc: 'Asignado a: Gerencia de Operaciones.',
            status: 'current',
            icon: 'clock-outline',
            color: '#3E77BC',
            obsText: 'Estamos revisando la carga de trabajo para esas fechas.'
            // Ojo: Aquí NO le ponemos isActionable: true, porque el empleado 
            // no puede auto-aprobarse ni reasignar nada. Solo está mirando.
        },
        {
            id: 'step-3',
            title: 'Resolución Final',
            desc: 'Pendiente de los pasos anteriores.',
            status: 'pending',
            icon: 'dots-horizontal',
            color: '#64748B'
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#F9FCFF' }}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.navHeader}>
                    <IconButton icon="arrow-left" onPress={() => router.back()} iconColor="#1E293B" />
                    <Text variant="titleLarge" style={styles.navTitle}>Detalle de Solicitud</Text>
                    <IconButton icon="bell-outline" iconColor="#1E293B" />
                </View>

                {/* Card de Información */}
                <Card style={styles.infoCard}>
                    <Card.Content style={styles.userRow}>
                        <Avatar.Image size={60} source={{ uri: 'https://i.pravatar.cc/150?u=josue' }} />
                        <View style={{ marginLeft: 15, flex: 1 }}>
                            <Text style={styles.userName}>Josue Vasquez</Text>
                            <Text style={styles.userJob}>Senior Mobile Developer</Text>
                        </View>
                    </Card.Content>
                    <Divider style={{ backgroundColor: '#F1F5F9' }} />
                    <View style={styles.detailGrid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.gridLabel}>UBICACIÓN</Text>
                            <Text style={styles.gridValue}>Oaxaca, MX</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Text style={styles.gridLabel}>PERIODO</Text>
                            <Text style={styles.gridValue}>Octubre 2026</Text>
                        </View>
                    </View>
                </Card>

                {/* Timeline */}
                <Text style={styles.sectionTitle}>ESTADO DEL PROCESO</Text>
                <ProcessTimeline steps={timelineSteps} />
            </ScrollView>

            {/* BOTÓN FLOTANTE PARA ABRIR CHAT */}
            {/* <FAB
                icon="message-text-outline"
                style={styles.fab}
                color="white"
                onPress={() => setChatVisible(true)}
                label="Notas"
            /> */}

            <ChatFAB onPress={() => setChatVisible(true)} count={2} />
            {/* COMPONENTE DE CHAT MODAL */}
            <NotesChatModal
                visible={chatVisible}
                onClose={() => setChatVisible(false)}
                ticketId={id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingBottom: 100 },
    navHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 10 },
    navTitle: { fontWeight: 'bold', color: '#1E293B' },
    infoCard: { margin: 20, borderRadius: 24, backgroundColor: 'white', elevation: 2 },
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
    stepDesc: { fontSize: 13, color: '#64748B', marginTop: 4 },
    obsText: { marginTop: 10, padding: 12, backgroundColor: '#F8FAFC', borderRadius: 12, fontSize: 12, fontStyle: 'italic', color: '#475569', borderLeftWidth: 3, borderLeftColor: '#3E77BC' },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    currentBadge: { backgroundColor: '#3E77BC', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },

    // Estilo del FAB
    fab: { position: 'absolute', margin: 20, right: 0, bottom: 0, backgroundColor: '#3E77BC', borderRadius: 16 },
});