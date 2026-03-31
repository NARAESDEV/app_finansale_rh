import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface InfoItemProps {
    icon: any;
    label: string;
    value: string;
    color: string;
}

export function InfoItem({ icon, label, value, color }: InfoItemProps) {
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

const styles = StyleSheet.create({
    infoItem: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    iconBadge: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    infoLabel: { fontSize: 12, color: '#64748B' },
    infoValue: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginTop: 1 },
});