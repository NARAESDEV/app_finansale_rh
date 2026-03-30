import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

interface ModuleCardProps {
    title: string;
    subtitle: string;
    icon: any;
    color: string;
    onPress?: () => void;
    disabled?: boolean;
}

export function ModuleCard({ title, subtitle, icon, color, onPress, disabled }: ModuleCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled}
            style={styles.cardContainer}
        >
            <Surface style={[styles.card, disabled && styles.cardDisabled]} elevation={disabled ? 0 : 2}>
                {/* Círculo del Ícono */}
                <View style={[styles.iconWrapper, { backgroundColor: `${color}15` }]}>
                    <MaterialCommunityIcons name={icon} size={32} color={disabled ? '#94A3B8' : color} />
                </View>

                {/* Textos */}
                <Text style={[styles.title, disabled && { color: '#94A3B8' }]}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>

                {/* Barrita decorativa tipo progreso (como en tu imagen) */}
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { backgroundColor: disabled ? '#E2E8F0' : color, width: disabled ? '0%' : '60%' }]} />
                </View>
            </Surface>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: { width: '47%', marginBottom: 16 }, // 47% para dejar espacio en el medio (Grid de 2)
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        minHeight: 160,
    },
    cardDisabled: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#F1F5F9' },
    iconWrapper: {
        width: 60, height: 60, borderRadius: 30,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 12,
    },
    title: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', textAlign: 'center' },
    subtitle: { fontSize: 12, color: '#64748B', marginTop: 4, marginBottom: 16 },
    progressBarBg: { width: '80%', height: 4, backgroundColor: '#F1F5F9', borderRadius: 2, marginTop: 'auto' },
    progressBarFill: { height: '100%', borderRadius: 2 }
});