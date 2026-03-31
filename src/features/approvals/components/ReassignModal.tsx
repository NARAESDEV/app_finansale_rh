import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Modal, Portal, Searchbar, Text } from 'react-native-paper';

interface ReassignModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelectUser: (user: any) => void;
}

// Simulamos la lista de tu equipo
const mockTeam = [
    { id: '1', name: 'Carlos Ruiz', role: 'Gerente de RH', avatar: 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=E0F2FE&color=0284C7' },
    { id: '2', name: 'Lucía Fernández', role: 'Analista Sr.', avatar: 'https://ui-avatars.com/api/?name=Lucia+Fernandez&background=FCE7F3&color=DB2777' },
    { id: '3', name: 'Miguel Torres', role: 'Director de Finanzas', avatar: 'https://ui-avatars.com/api/?name=Miguel+Torres&background=FEF9C3&color=CA8A04' },
];

export function ReassignModal({ isVisible, onClose, onSelectUser }: ReassignModalProps) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Portal>
            <Modal visible={isVisible} onDismiss={onClose} contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reasignar Solicitud</Text>
                    <MaterialCommunityIcons name="close" size={24} color="#64748B" onPress={onClose} />
                </View>

                <Searchbar
                    placeholder="Buscar por nombre o rol..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    elevation={0}
                />

                <ScrollView style={styles.list}>
                    {mockTeam.map((user) => (
                        <React.Fragment key={user.id}>
                            <TouchableOpacity style={styles.userRow} onPress={() => onSelectUser(user)}>
                                <Avatar.Image size={40} source={{ uri: user.avatar }} />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{user.name}</Text>
                                    <Text style={styles.userRole}>{user.role}</Text>
                                </View>
                                <MaterialCommunityIcons name="chevron-right" size={20} color="#CBD5E1" />
                            </TouchableOpacity>
                            <Divider />
                        </React.Fragment>
                    ))}
                </ScrollView>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', margin: 20, borderRadius: 24, padding: 20, maxHeight: '80%' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
    searchBar: { backgroundColor: '#F1F5F9', marginBottom: 15, borderRadius: 12 },
    list: { maxHeight: 300 },
    userRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    userInfo: { flex: 1, marginLeft: 12 },
    userName: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
    userRole: { fontSize: 13, color: '#64748B' },
});