import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, IconButton, Searchbar, Surface, Text } from 'react-native-paper';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect: (type: string) => void;
    options: string[];
}

const { height } = Dimensions.get('window');

export function TypeSelectorSheet({ visible, onClose, onSelect, options }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOptions = useMemo(() =>
        options.filter(opt => opt.toLowerCase().includes(searchQuery.toLowerCase())),
        [searchQuery, options]
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.dismissArea} onPress={onClose} />

                <Surface style={styles.sheet} elevation={5}>
                    <View style={styles.header}>
                        <Text style={styles.title}>¿Qué necesitas tramitar?</Text>
                        <IconButton icon="close" size={24} onPress={onClose} />
                    </View>

                    <Searchbar
                        placeholder="Buscar trámite..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                        elevation={0}
                    />

                    <FlatList
                        data={filteredOptions}
                        keyExtractor={(item) => item}
                        contentContainerStyle={styles.list}
                        ItemSeparatorComponent={() => <Divider />}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.optionItem}
                                onPress={() => {
                                    onSelect(item);
                                    setSearchQuery('');
                                    onClose();
                                }}
                            >
                                <View style={styles.optionLeft}>
                                    <MaterialCommunityIcons name="file-document-outline" size={22} color="#3E77BC" />
                                    <Text style={styles.optionText}>{item}</Text>
                                </View>
                                <MaterialCommunityIcons name="chevron-right" size={20} color="#CBD5E1" />
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No se encontraron resultados</Text>
                        }
                    />
                </Surface>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    dismissArea: { flex: 1 },
    sheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: height * 0.6,
        padding: 20,
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    title: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
    searchBar: { backgroundColor: '#F1F5F9', borderRadius: 12, marginBottom: 15 },
    list: { paddingBottom: 40 },
    optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 },
    optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    optionText: { fontSize: 16, color: '#1E293B', fontWeight: '600' },
    emptyText: { textAlign: 'center', color: '#64748B', marginTop: 20 }
});