import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

interface TransitionConfig {
    targetState: string;
    label: string;
    color: string;
    icon: string;
    requiresUser: boolean;
    requiresReason: boolean;
}

interface DynamicActionsProps {
    transitions: TransitionConfig[];
    onActionTriggered: (transition: TransitionConfig, reason: string) => void;
}

export function ApprovalActions({ transitions, onActionTriggered }: DynamicActionsProps) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    // Verificamos si alguna de las acciones disponibles requiere motivo para mostrar el input
    const anyActionRequiresReason = transitions.some(t => t.requiresReason);

    const handlePress = (transition: TransitionConfig) => {
        if (transition.requiresReason && reason.trim() === '') {
            setError(`⚠️ El motivo es obligatorio para: ${transition.label}`);
            return;
        }
        setError('');
        onActionTriggered(transition, reason);
    };

    if (!transitions || transitions.length === 0) {
        return null; // Si no hay acciones (ej. estado Cerrado), no pintamos nada.
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resolución de Estado</Text>

            {anyActionRequiresReason && (
                <>
                    <TextInput
                        mode="outlined"
                        label="Comentarios o justificación"
                        value={reason}
                        onChangeText={(text) => {
                            setReason(text);
                            if (error) setError('');
                        }}
                        multiline
                        numberOfLines={3}
                        outlineColor={error ? '#EF4444' : '#CBD5E1'}
                        activeOutlineColor={error ? '#EF4444' : '#3E77BC'}
                        style={styles.input}
                    />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </>
            )}

            <View style={styles.buttonsContainer}>
                {transitions.map((transition) => (
                    <Button
                        key={transition.targetState}
                        mode="outlined"
                        onPress={() => handlePress(transition)}
                        textColor={transition.color}
                        style={[styles.button, { borderColor: transition.color }]}
                        icon={({ size }) => <MaterialCommunityIcons name={transition.icon as any} size={size} color={transition.color} />}
                    >
                        {transition.label}
                    </Button>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginTop: 10,
        marginBottom: 40,
    },
    title: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 15 },
    input: { backgroundColor: '#F8FAFC', fontSize: 14, marginBottom: 5 },
    errorText: { color: '#EF4444', fontSize: 12, marginTop: 5, fontWeight: '600' },
    buttonsContainer: { gap: 10, marginTop: 15 },
    button: { borderRadius: 12, paddingVertical: 4, borderWidth: 1 }
});