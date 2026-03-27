import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
    value: string | number;
    label: string;
    color: string;
    subValue?: string;
}

export const CircularStat = ({ value, label, color, subValue }: Props) => (
    <View style={styles.container}>
        <View style={[styles.outerRing, { borderColor: `${color}20` }]}>
            <View style={[styles.innerRing, { borderColor: color }]}>
                <Text style={[styles.value, { color: '#1E293B' }]}>{value}</Text>
                {subValue && <Text style={styles.subValue}>{subValue}</Text>}
            </View>
        </View>
        <Text style={styles.label}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '30%' },
    outerRing: {
        width: 85,
        height: 85,
        borderRadius: 42.5,
        borderWidth: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        // Sombra Neumórfica ligera
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    innerRing: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    value: { fontSize: 22, fontWeight: '900', letterSpacing: -1 },
    subValue: { fontSize: 9, color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase' },
    label: { fontSize: 11, color: '#64748B', fontWeight: '800', marginTop: 12, textAlign: 'center' }
});