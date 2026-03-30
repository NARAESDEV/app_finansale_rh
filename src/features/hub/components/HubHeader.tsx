import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

interface HubHeaderProps {
    userName: string;
    role: string;
}

export function HubHeader({ userName, role }: HubHeaderProps) {
    return (
        <View style={styles.headerBackground}>
            <View style={styles.headerContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.greeting}>Hola,</Text>
                    <Text style={styles.name}>{userName}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{role}</Text>
                    </View>
                </View>
                <Avatar.Image
                    size={60}
                    source={{ uri: 'https://ui-avatars.com/api/?name=Josue+Israel&background=F9FCFF&color=3E77BC' }}
                    style={styles.avatar}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBackground: {
        backgroundColor: '#3E77BC', // Azul corporativo (puedes cambiarlo a naranja si prefieres el estilo de la foto)
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 60, // Espacio extra para que las tarjetas suban
        paddingHorizontal: 24,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        elevation: 5,
        shadowColor: '#3E77BC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: { flex: 1 },
    greeting: { fontSize: 16, color: '#E2E8F0', opacity: 0.9 },
    name: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
    roleBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    roleText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
    avatar: { borderWidth: 2, borderColor: '#FFFFFF' }
});