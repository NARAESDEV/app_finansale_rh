import { CircularStat } from '@/src/components/ui/CircularStat';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { HeaderProgress } from './HeaderProgress';

export const VacationsDashboard = () => {
  return (
    <ScrollView style={styles.container} bounces={false}>
      <HeaderProgress name="Josue Vasquez" progress={0.61} />

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Resumen de Vacaciones</Text>
            <View style={styles.statsRow}>
              <CircularStat value={14} label="Usados" color="#15803D" />
              <CircularStat value={10} label="Pendientes" color="#F47C00" />
              <CircularStat value={24} label="Totales" color="#3E77BC" />
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FCFF' },
  scrollPadding: {
    paddingBottom: 100, // Espacio suficiente para que el Navbar no tape nada
  },
  content: { padding: 20, marginTop: -25 },
  card: { borderRadius: 20, elevation: 3, backgroundColor: 'white' },
  cardTitle: { textAlign: 'center', fontWeight: 'bold', marginBottom: 20, color: '#1E293B' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' }
});