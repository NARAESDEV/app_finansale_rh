import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Divider, Menu, Text } from 'react-native-paper';
import { CustomButton } from '../../src/components/ui/CustomButton';
import { VacationCalendar } from '../../src/features/requests/components/VacationCalendar';

export default function RequestsScreen() {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('Vacaciones');

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>Nueva Solicitud</Text>

            {/* Balance Card - Azul */}
            <Card style={styles.balanceCard}>
                <Card.Content style={styles.row}>
                    <View>
                        <Text style={styles.balanceLabel}>BALANCE ACTUAL</Text>
                        <Text style={styles.daysText}>14 <Text style={styles.daysSub}>Días</Text></Text>
                        <View style={styles.locationRow}>
                            <MaterialCommunityIcons name="map-marker" size={14} color="#64748B" />
                            <Text style={styles.locationText}>Huajuapan de León, Oaxaca</Text>
                        </View>
                    </View>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="umbrella-beach" size={32} color="#3E77BC" />
                    </View>
                </Card.Content>
            </Card>

            {/* Selector de Tipo */}
            <View style={styles.section}>
                <Text style={styles.label}>Tipo de Solicitud</Text>
                <Menu
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    anchor={
                        <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)}>
                            <Text style={styles.selectorText}>{type}</Text>
                            <MaterialCommunityIcons name="chevron-down" size={24} color="#3E77BC" />
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item onPress={() => { setType('Vacaciones'); setVisible(false); }} title="Vacaciones" />
                    <Divider />
                    <Menu.Item onPress={() => { setType('Maternidad'); setVisible(false); }} title="Maternidad" />
                    <Divider />
                    <Menu.Item onPress={() => { setType('Paternidad'); setVisible(false); }} title="Paternidad" />
                    <Divider />
                    <Menu.Item onPress={() => { setType('Incapacidad'); setVisible(false); }} title="Incapacidad" />
                </Menu>
            </View>

            <VacationCalendar />

            <View style={styles.footer}>
                <CustomButton
                    title="Enviar Solicitud"
                    onPress={() => { }}
                    color="#3E77BC" // Unificado al Azul Marino
                    icon="send"
                />
                <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    content: { padding: 25, paddingBottom: 120 },
    title: { fontWeight: '900', color: '#1E293B', marginBottom: 25, marginTop: 40 },
    balanceCard: { borderRadius: 24, backgroundColor: 'white', elevation: 4 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    balanceLabel: { color: '#3E77BC', fontWeight: '800', fontSize: 12, letterSpacing: 1 },
    daysText: { fontSize: 40, fontWeight: '900', color: '#1E293B' },
    daysSub: { fontSize: 18, color: '#64748B', fontWeight: '400' },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    locationText: { color: '#64748B', fontSize: 12, marginLeft: 4 },
    iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EDF2F7', justifyContent: 'center', alignItems: 'center' },

    section: { marginTop: 30 },
    label: { fontSize: 14, fontWeight: '800', color: '#3E77BC', marginBottom: 12, textTransform: 'uppercase' },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F7',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(62, 119, 188, 0.1)'
    },
    selectorText: { fontSize: 16, fontWeight: '600', color: '#1E293B' },

    footer: { marginTop: 40, gap: 10 },
    cancelBtn: { alignSelf: 'center', padding: 10 },
    cancelText: { color: '#3E77BC', fontWeight: 'bold' }
});