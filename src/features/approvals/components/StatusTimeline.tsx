import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface StatusTimelineProps {
    history: any[]; // Idealmente tipar esto con una interface IStatusHistory
}

export function StatusTimeline({ history }: StatusTimelineProps) {
    return (
        <Card style={styles.timelineCard} elevation={0}>
            <Card.Content>
                <Text style={styles.sectionTitle}>ESTADO DEL PROCESO</Text>

                {history.map((item, index) => {
                    const isLast = index === history.length - 1;
                    const isCompleted = item.timestamp !== null;

                    return (
                        <View key={item.status} style={styles.timelineItem}>
                            {!isLast && <View style={[styles.timelineLine, { backgroundColor: isCompleted ? item.color : '#E2E8F0' }]} />}

                            <View style={[styles.timelineIconDot, { backgroundColor: isCompleted ? `${item.color}15` : '#F1F5F9', borderColor: isCompleted ? item.color : '#CBD5E1' }]}>
                                <MaterialCommunityIcons name={item.icon as any} size={18} color={isCompleted ? item.color : '#94A3B8'} />
                            </View>

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

const styles = StyleSheet.create({
    timelineCard: { backgroundColor: 'white', borderRadius: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 15 },
    timelineItem: { flexDirection: 'row', minHeight: 70, paddingLeft: 8 },
    timelineLine: { position: 'absolute', left: 21, top: 28, width: 2, height: '100%', zIndex: 0 },
    timelineIconDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginTop: 6, zIndex: 1 },
    timelineContent: { flex: 1, marginLeft: 16, paddingBottom: 20 },
    statusLabel: { fontSize: 14 },
    statusUser: { fontSize: 12, color: '#64748B', marginTop: 2 },
    statusTime: { fontSize: 11, color: '#94A3B8', marginTop: 4 },
});