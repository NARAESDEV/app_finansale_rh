import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

interface ApprovalActionsProps {
    onApprove: (reason: string) => void;
    onReject: (reason: string) => void;
}

export function ApprovalActions({ onApprove, onReject }: ApprovalActionsProps) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const handleReject = () => {
        if (reason.trim() === '') {
            setError('⚠️ El motivo es obligatorio para rechazar esta solicitud.');
            return;
        }
        setError('');
        onReject(reason);
    };

    const handleApprove = () => {
        setError(''); // Limpiamos errores
        onApprove(reason); // Para aprobar, pasamos el motivo (puede ir vacío o lleno)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resolución de la Solicitud</Text>

            {/* Campo de Texto para los Motivos */}
            <TextInput
                mode="outlined"
                label="Motivos o comentarios (Obligatorio para rechazo)"
                value={reason}
                onChangeText={(text) => {
                    setReason(text);
                    if (error) setError(''); // Quitamos el error en cuanto el usuario empiece a escribir
                }}
                multiline
                numberOfLines={3}
                outlineColor={error ? '#EF4444' : '#CBD5E1'}
                activeOutlineColor={error ? '#EF4444' : '#3E77BC'}
                style={styles.input}
            />

            {/* Mensaje de Error (Aparece solo si intentan rechazar en blanco) */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Botones de Acción */}
            <View style={styles.buttonsRow}>
                <Button
                    mode="outlined"
                    onPress={handleReject}
                    textColor="#EF4444"
                    style={[styles.button, styles.rejectButton]}
                    icon={({ size, color }) => <MaterialCommunityIcons name="close-circle-outline" size={size} color={color} />}
                >
                    Rechazar
                </Button>

                <Button
                    mode="contained"
                    onPress={handleApprove}
                    buttonColor="#10B981"
                    style={styles.button}
                    icon={({ size, color }) => <MaterialCommunityIcons name="check-circle-outline" size={size} color={color} />}
                >
                    Aprobar
                </Button>
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
        marginBottom: 40, // Espacio extra abajo
    },
    title: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 15 },
    input: { backgroundColor: '#F8FAFC', fontSize: 14 },
    errorText: { color: '#EF4444', fontSize: 12, marginTop: 5, fontWeight: '600' },
    buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginTop: 20 },
    button: { flex: 1, borderRadius: 12, paddingVertical: 4 },
    rejectButton: { borderColor: '#EF4444', borderWidth: 1 }
});