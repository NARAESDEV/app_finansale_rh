import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router'; // 3. Importamos el router
import { Avatar, Button, Card, Surface, Text } from 'react-native-paper';


import { CircularStat } from '../../../components/ui/CircularStat';
import { HeaderProgress } from './HeaderProgress';
import { StatusTracker } from './StatusTracker';

export const VacationsDashboard = () => {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Header */}
      <HeaderProgress name="Josue Israel" progress={0.61} />

      <View style={styles.content}>

        {/* Resumen con Círculos*/}
        <Surface style={styles.statsSurface} elevation={2}>
          <Text style={styles.sectionTitle}>RESUMEN DEL PERIODO 2025-2026</Text>
          <View style={styles.statsRow}>
            <CircularStat value={14} label="DÍAS USADOS" color="#15803D" subValue="Goce" />
            <CircularStat value={10} label="PENDIENTES" color="#F47C00" subValue="Plan" />
            <CircularStat value={24} label="TOTALES" color="#3E77BC" subValue="Ley" />
          </View>
        </Surface>



        {/* Tracking de Solicitud */}
        <StatusTracker />
        {/* GESTIÓN DE EQUIPO */}
        <View style={styles.managerSection}>
          <View style={styles.sectionHeader}>
            {/* Usamos el nuevo estilo managerTitle para que no choque */}
            <Text style={styles.managerTitle}>Aprobaciones Pendientes</Text>
            <Button mode="text" compact onPress={() => { router.push('/approvals') }} textColor="#3E77BC">Ver todas</Button>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/approvals/1005')}
          >
            <Surface style={styles.approvalCard} elevation={1}>
              <View style={styles.approvalLeft}>
                <Avatar.Image size={45} source={{ uri: 'https://ui-avatars.com/api/?name=Brenda+Gonzalez&background=FFE4E6&color=E11D48' }} />
                <View style={styles.approvalInfo}>
                  <Text style={styles.employeeName}>Brenda González</Text>
                  <Text style={styles.requestType}>Vacaciones Anuales • 6 días</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
            </Surface>
          </TouchableOpacity>
        </View>

        {/* anuncios */}
        <View style={styles.newsSection}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>ANUNCIOS</Text>
            <TouchableOpacity><Text style={styles.viewAll}>Ver todo</Text></TouchableOpacity>
          </View>
          <Card style={styles.newsCard}>
            <Card.Content style={styles.newsContent}>
              <View style={styles.newsIconBox}>
                <MaterialCommunityIcons name="party-popper" size={24} color="#F47C00" />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.newsTitle}>¡Felicidades a los cumpleañeros!</Text>
                <Text style={styles.newsSub}>Revisa quién cumple años este mes en tu equipo.</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
        {/* Quick Links Estilizados */}
        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.linkItem}>
            <Surface style={styles.linkCircle} elevation={1}>
              <MaterialCommunityIcons name="file-pdf-box" size={24} color="#3E77BC" />
            </Surface>
            <Text style={styles.linkText}>Políticas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Surface style={styles.linkCircle} elevation={1}>
              <MaterialCommunityIcons name="help-circle-outline" size={24} color="#3E77BC" />
            </Surface>
            <Text style={styles.linkText}>Soporte</Text>
          </TouchableOpacity>
        </View>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FCFF' },
  content: { paddingHorizontal: 20, marginTop: -35 },

  // Stats Surface
  statsSurface: { padding: 20, borderRadius: 28, backgroundColor: 'white' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  sectionTitle: { fontSize: 12, fontWeight: '900', color: '#64748B', letterSpacing: 1.5 },

  // News Section
  newsSection: { marginTop: 30 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  viewAll: { color: '#3E77BC', fontWeight: 'bold', fontSize: 12 },
  newsCard: { borderRadius: 20, backgroundColor: '#FFFFFF', elevation: 1, borderLeftWidth: 6, borderLeftColor: '#F47C00' },
  newsContent: { flexDirection: 'row', alignItems: 'center' },
  newsIconBox: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  newsTitle: { fontWeight: 'bold', fontSize: 14, color: '#1E293B' },
  newsSub: { fontSize: 11, color: '#64748B', marginTop: 2 },

  // Quick Links
  quickLinks: { flexDirection: 'row', justifyContent: 'center', gap: 40, marginTop: 30 },
  linkItem: { alignItems: 'center' },
  linkCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  linkText: { fontSize: 11, fontWeight: 'bold', color: '#64748B', marginTop: 8 },

  // Manager Section (Ajustado el padding para no duplicar)
  managerSection: { marginTop: 35 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  managerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' }, // Renombrado para evitar conflictos

  approvalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  approvalLeft: { flexDirection: 'row', alignItems: 'center' },
  approvalInfo: { marginLeft: 12 },
  employeeName: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  requestType: { fontSize: 12, color: '#64748B', marginTop: 2 },
});