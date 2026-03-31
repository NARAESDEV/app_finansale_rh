import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface ChatFABProps {
    onPress: () => void;
    count?: number;
}

export function ChatFAB({ onPress, count = 0 }: ChatFABProps) {
    return (
        <FAB
            icon="message-text-outline"
            style={styles.fab}
            color="white"
            label={count > 0 ? `Notas (${count})` : 'Añadir nota'}
            onPress={onPress}
        />
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 24,
        right: 0,
        bottom: 0,
        backgroundColor: '#3E77BC',
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    }
});