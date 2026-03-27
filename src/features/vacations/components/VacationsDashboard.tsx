import { CircularStat } from '@/src/components/ui/CircularStat';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { HeaderProgress } from './HeaderProgress';
import { StatusTracker } from './StatusTracker';
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
        {/* Acciones Rápidas */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.iconBox, { backgroundColor: '#E0F2F1' }]}>
              <MaterialCommunityIcons name="calendar-plus" size={28} color="#15803D" />
            </View>
            <Text style={styles.actionLabel}>Nueva Solicitud</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
              <MaterialCommunityIcons name="file-document-outline" size={28} color="#1E88E5" />
            </View>
            <Text style={styles.actionLabel}>Políticas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
              <MaterialCommunityIcons name="headphones" size={28} color="#F4511E" />
            </View>
            <Text style={styles.actionLabel}>Ayuda</Text>
          </TouchableOpacity>
        </View>

        {/* Seguimiento de Solicitud */}
        <StatusTracker />
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
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },

  quickActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  actionBtn: { alignItems: 'center', width: '30%' },
  iconBox: { width: 60, height: 60, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionLabel: { fontSize: 11, fontWeight: '700', color: '#1E293B', textAlign: 'center' }
});