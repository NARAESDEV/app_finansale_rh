import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { CustomButton } from '../../src/components/ui/CustomButton';
import { VacationCalendar } from '../../src/features/requests/components/VacationCalendar';

export default function RequestsScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>Nueva Solicitud</Text>

            {/* Card de Balance Actual */}
            <Card style={styles.balanceCard}>
                <Card.Content style={styles.row}>
                    <View>
                        <Text variant="labelLarge" style={{ color: '#3E77BC' }}>BALANCE ACTUAL</Text>
                        <Text variant="displaySmall" style={styles.daysText}>14 <Text variant="titleLarge">Días</Text></Text>
                        <Text variant="bodySmall">Huajuapan, Oaxaca</Text>
                    </View>
                    <Avatar.Icon size={60} icon="umbrella-beach" backgroundColor="#DCFCE7" color="#15803D" />
                </Card.Content>
            </Card>

            {/* Componente del Calendario */}
            <VacationCalendar />

            {/* Botón de Enviar */}
            <View style={{ marginTop: 30 }}>
                <CustomButton
                    title="Enviar Solicitud"
                    onPress={() => console.log('Solicitud enviada')}
                    color="#15803D" // Verde de aprobación
                    icon="send"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    content: { padding: 20, paddingBottom: 120 },
    title: { fontWeight: '900', color: '#1E293B', marginBottom: 20, marginTop: 40 },
    balanceCard: { borderRadius: 20, backgroundColor: 'white', elevation: 2 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    daysText: { fontWeight: 'bold', color: '#1E293B' }
});