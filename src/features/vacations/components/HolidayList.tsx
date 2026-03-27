import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Surface, Text } from 'react-native-paper';

const holidays = [
    { date: '01 May', name: 'Día del Trabajo', type: 'Obligatorio' },
    { date: '16 Sep', name: 'Independencia de México', type: 'Obligatorio' },
];

export const HolidayList = () => (
    <Surface style={styles.container} elevation={1}>
        <Text style={styles.title}>Próximos Días Festivos 2026</Text>
        {holidays.map((h, i) => (
            <List.Item
                key={i}
                title={h.name}
                description={h.type}
                left={props => <View style={styles.dateBox}><Text style={styles.dateText}>{h.date}</Text></View>}
                titleStyle={styles.hName}
            />
        ))}
    </Surface>
);

const styles = StyleSheet.create({
    container: { padding: 15, borderRadius: 20, backgroundColor: '#FFFFFF', marginTop: 20 },
    title: { fontSize: 14, fontWeight: '700', color: '#64748B', marginBottom: 10 },
    dateBox: { backgroundColor: '#E3F2FD', padding: 8, borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 55 },
    dateText: { color: '#3E77BC', fontWeight: 'bold', fontSize: 12 },
    hName: { fontSize: 14, fontWeight: '600' }
});