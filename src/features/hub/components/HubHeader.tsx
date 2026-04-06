import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

interface HubHeaderProps {
    title?: string;
    subtitle?: string;
    type?: 'full' | 'compact'; // <--- El secreto de la homologación
}

export function HubHeader({ title, subtitle, type = 'full' }: HubHeaderProps) {
    const isFull = type === 'full';

    return (
        <View style={[styles.headerBackground, !isFull && styles.headerCompact]}>
            <View style={styles.headerContent}>
                <View style={styles.textContainer}>
                    {isFull ? (
                        <>
                            <Text style={styles.greeting}>Hola,</Text>
                            <Text style={styles.name}>{title || "Israel Merlyn"}</Text>
                            <View style={styles.roleBadge}>
                                <Text style={styles.roleText}>{subtitle || "Frontend Developer"}</Text>
                            </View>
                        </>
                    ) : (
                        // Versión Compacta para Formularios e Historial
                        <View style={styles.compactRow}>
                            <Text style={styles.compactTitle}>{title}</Text>
                        </View>
                    )}
                </View>

                {/* El Avatar se hace más chico en modo compacto */}
                <Avatar.Image
                    size={isFull ? 60 : 40}
                    source={{ uri: 'https://ui-avatars.com/api/?name=Josue+Israel&background=F9FCFF&color=3E77BC' }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBackground: {
        backgroundColor: '#3E77BC',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 50,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    headerCompact: {
        paddingBottom: 30, // Mucho más corto para dejar ver el contenido
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    textContainer: { flex: 1 },
    greeting: { fontSize: 16, color: '#E2E8F0', opacity: 0.9 },
    name: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF' },
    roleBadge: { backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 10, borderRadius: 10, marginTop: 5 },
    roleText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
    // Estilos compactos
    compactRow: { justifyContent: 'center' },
    compactTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }
});