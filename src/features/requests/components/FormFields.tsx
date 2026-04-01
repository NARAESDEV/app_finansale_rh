import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, Menu, Text, TextInput } from 'react-native-paper';

// --- Campo de Texto Básico (o ReadOnly) ---
export function TextField({ label, value, onChange, placeholder, readOnly = false, multiline = false }: any) {
    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                mode="outlined"
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                disabled={readOnly}
                multiline={multiline}
                numberOfLines={multiline ? 3 : 1}
                style={[styles.input, readOnly && styles.readOnlyInput]}
                outlineColor={readOnly ? 'transparent' : '#CBD5E1'}
                activeOutlineColor="#3E77BC"
                textColor={readOnly ? '#64748B' : '#1E293B'}
            />
        </View>
    );
}

// --- Campo Select (Menú Desplegable) ---
export function SelectField({ label, value, options, onSelect, placeholder }: any) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setVisible(true)} style={styles.selectAnchor}>
                        <Text style={[styles.selectText, !value && styles.placeholderText]}>
                            {value || placeholder || 'Selecciona una opción...'}
                        </Text>
                        <MaterialCommunityIcons name="chevron-down" size={24} color="#64748B" />
                    </TouchableOpacity>
                }
                contentStyle={styles.menuContent}
            >
                {options.map((opt: string, index: number) => (
                    <React.Fragment key={opt}>
                        <Menu.Item onPress={() => { onSelect(opt); setVisible(false); }} title={opt} />
                        {index < options.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Menu>
        </View>
    );
}

const styles = StyleSheet.create({
    fieldContainer: { marginBottom: 16 },
    label: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 6, textTransform: 'uppercase' },
    input: { backgroundColor: '#FFFFFF', fontSize: 15 },
    readOnlyInput: { backgroundColor: '#F1F5F9' },
    selectAnchor: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1'
    },
    selectText: { fontSize: 15, color: '#1E293B' },
    placeholderText: { color: '#94A3B8' },
    menuContent: { backgroundColor: 'white', borderRadius: 12 }
});