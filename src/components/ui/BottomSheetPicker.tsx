import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, List, Modal, Portal, Text } from 'react-native-paper';

interface Props {
    label: string;
    value: string;
    options: string[];
    onSelect: (val: string) => void;
}

export const BottomSheetPicker = ({ label, value, options, onSelect }: Props) => {
    const [visible, setVisible] = useState(false);

    const handleSelect = (option: string) => {
        onSelect(option);
        setVisible(false);
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)}>
                    <Text style={styles.value}>{value}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={24} color="#3E77BC" />
                </TouchableOpacity>
            </View>

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    contentContainerStyle={styles.modal}
                >
                    <Text style={styles.modalTitle}>Selecciona una opción</Text>
                    {options.map((opt, i) => (
                        <React.Fragment key={i}>
                            <List.Item
                                title={opt}
                                onPress={() => handleSelect(opt)}
                                titleStyle={{
                                    color: value === opt ? '#3E77BC' : '#1E293B',
                                    fontWeight: value === opt ? 'bold' : 'normal'
                                }}
                                right={props => value === opt ? <MaterialCommunityIcons name="check" size={24} color="#3E77BC" /> : null}
                            />
                            {i < options.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </Modal>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 15 },
    label: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 8, textTransform: 'uppercase' },
    selector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12 },
    value: { fontSize: 16, color: '#1E293B' },
    modal: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 24 },
    modalTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B', marginBottom: 15, textAlign: 'center' }
});