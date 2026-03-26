import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Badge, Card, Text, useTheme } from 'react-native-paper';

export const VacationsDashboard = () => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Personalizado */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Consola de <Text style={{ color: '#15803D', fontWeight: 'bold' }}>Vacaciones</Text>
        </Text>
        <Text variant="bodyMedium" style={{ color: '#64748B' }}>
          Gestión administrativa para el ciclo 2026
        </Text>
      </View>

      {/* Card Principal: Total Disponibles */}
      <Card style={styles.mainCard}>
        <Card.Content>
          <View style={styles.rowBetween}>
            <Avatar.Icon size={40} icon="calendar-check" backgroundColor="#DCFCE7" color="#15803D" />
            <Badge style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 'bold' }}>ACTIVO</Badge>
          </View>
          <Text variant="labelLarge" style={styles.labelMargin}>TOTAL DISPONIBLES 2026</Text>
          <Text variant="displaySmall" style={styles.daysCount}>
            24 <Text variant="headlineSmall">Días</Text>
          </Text>
        </Card.Content>
      </Card>

      {/* Row de Pendientes y Disfrutados */}
      <View style={styles.statsRow}>
        <Card style={[styles.statCard, { flex: 1, marginRight: 8 }]}>
           <Card.Content>
              <Text variant="labelSmall" style={styles.statLabel}>PENDIENTES</Text>
              <Text variant="headlineMedium" style={styles.statValue}>08</Text>
           </Card.Content>
        </Card>
        <Card style={[styles.statCard, { flex: 1, marginLeft: 8 }]}>
           <Card.Content>
              <Text variant="labelSmall" style={styles.statLabel}>DISFRUTADOS</Text>
              <Text variant="headlineMedium" style={styles.statValue}>12</Text>
           </Card.Content>
        </Card>
      </View>

      {/* Aquí irían las Solicitudes Recientes (lo haremos en el siguiente paso) */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FCFF' },
  content: { padding: 20 },
  header: { marginBottom: 24, marginTop: 20 },
  title: { fontWeight: '900', color: '#1E293B' },
  mainCard: { borderRadius: 16, backgroundColor: '#FFF', elevation: 2, marginBottom: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  labelMargin: { marginTop: 16, color: '#64748B' },
  daysCount: { fontWeight: 'bold', color: '#1E293B' },
  statsRow: { flexDirection: 'row', marginBottom: 20 },
  statCard: { borderRadius: 12, backgroundColor: '#EDF2F7' },
  statLabel: { color: '#3E77BC', fontWeight: 'bold' },
  statValue: { fontWeight: 'bold', marginTop: 4 }
});