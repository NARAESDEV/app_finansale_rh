import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Modal, Portal, Text } from 'react-native-paper';
import { CustomButton } from './CustomButton';

interface Props {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
}

export const SuccessModal = ({ visible, onDismiss, onConfirm }: Props) => (
    <Portal>
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <Avatar.Icon
                    size={80}
                    icon="check-decagram"
                    backgroundColor="rgba(62, 119, 188, 0.1)"
                    color="#3E77BC"
                />

                <Text variant="headlineSmall" style={styles.title}>¡Solicitud Enviada!</Text>

                <Text variant="bodyMedium" style={styles.message}>
                    ¡Excelente trabajo! Tu solicitud ya está en camino. Esperemos que te aprueben pronto para que disfrutes ese merecido descanso.
                </Text>

                <CustomButton
                    title="Volver al inicio"
                    onPress={onConfirm}
                    color="#3E77BC"
                />
            </View>
        </Modal>
    </Portal>
);

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', padding: 30, margin: 20, borderRadius: 28 },
    content: { alignItems: 'center', textAlign: 'center' },
    title: { fontWeight: '900', color: '#1E293B', marginTop: 20, marginBottom: 10 },
    message: { textAlign: 'center', color: '#64748B', lineHeight: 20, marginBottom: 25 },
});