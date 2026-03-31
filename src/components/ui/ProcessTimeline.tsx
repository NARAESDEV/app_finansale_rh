import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

// Tipado estricto Ssr para nuestro componente
export interface TimelineStepType {
    id: string;
    title: string;
    desc: string;
    status: 'completed' | 'current' | 'pending';
    icon: any;
    color: string;
    obsText?: string;
    isActionable?: boolean; // Si es true, el jefe le puede dar clic
}

interface ProcessTimelineProps {
    title?: string;
    steps: TimelineStepType[];
    onStepPress?: (stepId: string) => void;
}

export function ProcessTimeline({ title = "ESTADO DEL PROCESO", steps, onStepPress }: ProcessTimelineProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{title}</Text>

            <Surface style={styles.timelineSurface} elevation={1}>
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';
                    const isPending = step.status === 'pending';

                    // Definimos colores dinámicos basados en el estado si no vienen forzados
                    const iconBgColor = isCompleted ? '#DCFCE7' : isCurrent ? '#E0F2F1' : '#F1F5F9';
                    const iconColor = isCompleted ? '#15803D' : isCurrent ? '#3E77BC' : '#64748B';
                    const lineColor = isCompleted ? '#15803D' : '#E2E8F0';

                    return (
                        <TouchableOpacity
                            key={step.id}
                            activeOpacity={step.isActionable ? 0.6 : 1}
                            onPress={() => step.isActionable && onStepPress ? onStepPress(step.id) : null}
                            disabled={!step.isActionable}
                        >
                            <View style={styles.timelineStep}>

                                {/* COLUMNA DEL ÍCONO Y LÍNEA */}
                                <View style={styles.iconColumn}>
                                    <View style={[styles.stepIcon, { backgroundColor: iconBgColor, borderColor: step.isActionable ? '#3E77BC' : 'transparent', borderWidth: step.isActionable ? 1 : 0 }]}>
                                        <MaterialCommunityIcons name={step.icon} size={20} color={iconColor} />
                                    </View>
                                    {!isLast && <View style={[styles.verticalLine, { backgroundColor: lineColor }]} />}
                                </View>

                                {/* COLUMNA DE CONTENIDO */}
                                <View style={[styles.stepContent, step.isActionable && styles.actionableContent]}>

                                    {/* FIX DE DESBORDAMIENTO APLICADO */}
                                    <View style={styles.rowBetween}>
                                        <Text style={[styles.stepTitle, { color: isPending ? '#64748B' : iconColor, flexShrink: 1, marginRight: 10 }]} numberOfLines={2}>
                                            {step.title}
                                        </Text>

                                        {isCurrent && (
                                            <Surface style={styles.currentBadge} elevation={0}>
                                                <Text style={styles.badgeText}>ACTUAL</Text>
                                            </Surface>
                                        )}
                                        {step.isActionable && (
                                            <MaterialCommunityIcons name="chevron-right" size={20} color="#3E77BC" />
                                        )}
                                    </View>

                                    <Text style={[styles.stepDesc, isPending && { color: '#94A3B8' }]}>{step.desc}</Text>

                                    {step.obsText && (
                                        <Text style={styles.obsText}>"{step.obsText}"</Text>
                                    )}
                                </View>

                            </View>
                        </TouchableOpacity>
                    );
                })}
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: 20 },
    sectionTitle: { fontSize: 12, fontWeight: '900', color: '#64748B', letterSpacing: 1.5, marginBottom: 10 },
    timelineSurface: { backgroundColor: 'white', borderRadius: 20, padding: 20 },
    timelineStep: { flexDirection: 'row', minHeight: 80 },
    iconColumn: { alignItems: 'center', width: 40, marginRight: 15 },
    stepIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
    verticalLine: { width: 2, flex: 1, marginTop: -5, marginBottom: -5, zIndex: 0 },
    stepContent: { flex: 1, paddingBottom: 25, paddingTop: 5 },
    actionableContent: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginTop: -5 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    stepTitle: { fontSize: 15, fontWeight: 'bold' },
    currentBadge: { backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    badgeText: { color: '#1E3A8A', fontSize: 10, fontWeight: 'bold' },
    stepDesc: { fontSize: 13, color: '#475569', marginTop: 4 },
    obsText: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginTop: 8, backgroundColor: '#F1F5F9', padding: 8, borderRadius: 8 }
});