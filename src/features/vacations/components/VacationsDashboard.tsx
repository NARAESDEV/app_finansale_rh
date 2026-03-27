import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Surface, Text } from 'react-native-paper';
import { CircularStat } from '../../../components/ui/CircularStat';
import { HeaderProgress } from './HeaderProgress';
import { StatusTracker } from './StatusTracker';

export const VacationsDashboard = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* 1. Header Brutal (Se mantiene intacto) */}
      <HeaderProgress name="Josue Vasquez" progress={0.61} />

      <View style={styles.content}>

        {/* 2. Resumen con Círculos Rediseñados */}
        <Surface style={styles.statsSurface} elevation={2}>
          <Text style={styles.sectionTitle}>RESUMEN DE CICLO 2026</Text>
          <View style={styles.statsRow}>
            <CircularStat value={14} label="DÍAS USADOS" color="#15803D" subValue="Goce" />
            <CircularStat value={10} label="PENDIENTES" color="#F47C00" subValue="Plan" />
            <CircularStat value={24} label="TOTALES" color="#3E77BC" subValue="Ley" />
          </View>
        </Surface>

        {/* 3. News / Announcements (Lo que le faltaba) */}
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

        {/* 4. Tracking de Solicitud */}
        <StatusTracker />

        {/* 5. Quick Links Estilizados */}
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
  linkText: { fontSize: 11, fontWeight: 'bold', color: '#64748B', marginTop: 8 }
});