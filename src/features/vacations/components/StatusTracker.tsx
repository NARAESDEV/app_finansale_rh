import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

export const StatusTracker = () => (
    <Surface style={styles.container} elevation={1}>
        <Text style={styles.title}>Estado de tu última solicitud</Text>
        <View style={styles.row}>
            <View style={styles.step}>
                <MaterialCommunityIcons name="check-circle" size={24} color="#15803D" />
                <Text style={styles.stepText}>Enviada</Text>
            </View>
            <View style={styles.lineActive} />
            <View style={styles.step}>
                <MaterialCommunityIcons name="clock-outline" size={24} color="#3E77BC" />
                <Text style={[styles.stepText, { color: '#3E77BC', fontWeight: 'bold' }]}>Pendiente</Text>
            </View>
            <View style={styles.lineInactive} />
            <View style={styles.step}>
                <MaterialCommunityIcons name="circle-outline" size={24} color="#94A3B8" />
                <Text style={styles.stepText}>Aprobada</Text>
            </View>
        </View>
    </Surface>
);

const styles = StyleSheet.create({
    container: { padding: 20, borderRadius: 20, backgroundColor: '#FFFFFF', marginTop: 20 },
    title: { fontSize: 14, fontWeight: '700', color: '#64748B', marginBottom: 15 },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    step: { alignItems: 'center' },
    stepText: { fontSize: 10, marginTop: 5, color: '#64748B' },
    lineActive: { flex: 1, height: 2, backgroundColor: '#15803D', marginBottom: 15, marginHorizontal: 5 },
    lineInactive: { flex: 1, height: 2, backgroundColor: '#E2E8F0', marginBottom: 15, marginHorizontal: 5 },
});