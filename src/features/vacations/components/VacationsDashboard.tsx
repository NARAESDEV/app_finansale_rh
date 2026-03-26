import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Badge, Button, Card, IconButton, Text, useTheme } from 'react-native-paper';
import { useAuthStore } from '../../auth/store/useAuthStore';

// Mock data para las solicitudes recientes
const recentRequests = [
  { id: '1', name: 'Ana Martínez', location: 'PUERTO ESCONDIDO', dates: '15 Dic 2024 - 05 Ene 2025', days: '15 Días', status: 'APROBADA' },
  { id: '2', name: 'Roberto Gómez', location: 'CDMX', dates: '12 Mar 2026 - 15 Mar 2026', days: '3 Días', status: 'PENDIENTE' },
  { id: '3', name: 'Claudia Ruiz', location: 'TLAXIACO', dates: '20 Abr 2025 - 25 Abr 2025', days: '5 Días', status: 'RECHAZADA' },
];

export const VacationsDashboard = () => {
  const { userName } = useAuthStore();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0); // Para la paginación de puntos

  // Componente de Gráfica Circular (Mock Visual)
  const CircularProgress = ({ used, total }: { used: number; total: number }) => {
    const percentage = (used / total) * 100;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.circularMock}>
          <Text variant="headlineLarge" style={styles.usedDaysText}>{used}</Text>
          <Text variant="labelSmall" style={styles.usedLabelText}>utilizados</Text>
        </View>
        <View style={styles.progressData}>
           <Text variant="labelLarge" style={{color: theme.colors.textPrimary}}>Días de Vacaciones Activos 2026</Text>
           <Text variant="headlineSmall" style={styles.totalDaysText}>{total} días totales</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      
      {/* Header con Bienvenida y Notificaciones */}
      <View style={styles.welcomeHeader}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar.Image size={50} source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' }} />
          <View style={{marginLeft: 15}}>
            <Text variant="headlineSmall" style={[styles.welcomeText, { color: theme.colors.textPrimary }]}>¡Hola, {userName}!</Text>
            <Text variant="bodySmall" style={{color: theme.colors.textSecondary}}>Aquí está tu resumen de vacaciones</Text>
          </View>
        </View>
        <IconButton icon="bell-outline" iconColor={theme.colors.textPrimary} size={28} style={{backgroundColor: theme.colors.surface}} />
      </View>

      {/* Título de la Sección */}
      <View style={styles.header}>
        <Text variant="displaySmall" style={[styles.title, {color: theme.colors.textPrimary}]}>
          Consola de <Text style={{ color: theme.colors.secondary, fontWeight: 'bold' }}>Vacaciones</Text>
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary }}>
          Gestión administrativa para el ciclo 2026
        </Text>
      </View>

      {/* Tarjeta Principal con la Gráfica */}
      <Card style={styles.mainProgressCard}>
        <Card.Content>
          <View style={styles.rowBetween}>
             <Text variant="labelLarge" style={styles.daysLabel}>DÍAS DISPONIBLES</Text>
             <Badge style={styles.activeBadge}>ACTIVO</Badge>
          </View>
          <CircularProgress used={12} total={24} />
        </Card.Content>
      </Card>

      {/* Paginación por Puntos (Maquetado) */}
      <View style={styles.paginationRow}>
        <View style={[styles.paginationDot, activeTab === 0 ? styles.activeDot : styles.inactiveDot]} />
        <View style={[styles.paginationDot, activeTab === 1 ? styles.activeDot : styles.inactiveDot]} />
        <View style={[styles.paginationDot, activeTab === 2 ? styles.activeDot : styles.inactiveDot]} />
      </View>

      {/* Row de Pendientes y Disfrutados */}
      <View style={styles.statsRow}>
        <Card style={[styles.statCard, { flex: 1, marginRight: 8, backgroundColor: theme.colors.tertiary }]}>
           <Card.Content>
              <Text variant="labelSmall" style={[styles.statLabel, {color: theme.colors.primary}]}>PENDIENTES</Text>
              <Text variant="displaySmall" style={[styles.statValue, {color: theme.colors.textPrimary}]}>08</Text>
           </Card.Content>
        </Card>
        <Card style={[styles.statCard, { flex: 1, marginLeft: 8, backgroundColor: theme.colors.tertiary }]}>
           <Card.Content>
              <Text variant="labelSmall" style={[styles.statLabel, {color: theme.colors.primary}]}>DISFRUTADOS</Text>
              <Text variant="displaySmall" style={[styles.statValue, {color: theme.colors.textPrimary}]}>12</Text>
           </Card.Content>
        </Card>
      </View>

      {/* Sección de Solicitudes Recientes */}
      <View style={[styles.rowBetween, {marginBottom: 15}]}>
        <Text variant="titleLarge" style={[styles.recentTitle, {color: theme.colors.textPrimary}]}>Solicitudes Recientes</Text>
        <TouchableOpacity>
           <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Solicitudes */}
      {recentRequests.map(request => (
        <Card key={request.id} style={styles.requestCard}>
          <Card.Content>
             <View style={styles.rowBetween}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Avatar.Icon size={40} icon="account" />
                  <View style={{marginLeft: 12}}>
                    <Text variant="titleMedium" style={{fontWeight: 'bold', color: theme.colors.textPrimary}}>{request.name}</Text>
                    <Text variant="labelSmall" style={{color: theme.colors.textSecondary}}>• {request.location}</Text>
                  </View>
               </View>
               <Badge style={[styles.statusBadge, {
                  backgroundColor: request.status === 'APROBADA' ? '#DCFCE7' : request.status === 'PENDIENTE' ? '#E0F2F1' : '#FEE2E2',
                  color: request.status === 'APROBADA' ? '#15803D' : request.status === 'PENDIENTE' ? '#0E7490' : '#DC2626'
               }]}>
                 {request.status}
               </Badge>
             </View>
             <View style={styles.requestDatesRow}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconButton icon="calendar-outline" size={20} style={{margin: 0}} />
                  <Text variant="bodySmall" style={{color: theme.colors.textSecondary}}>{request.dates}</Text>
                </View>
                <Text variant="bodySmall" style={{fontWeight: 'bold', color: theme.colors.secondary}}>{request.days}</Text>
             </View>
          </Card.Content>
        </Card>
      ))}

      {/* CTA Card de Planeación */}
      <Card style={[styles.ctaCard, {backgroundColor: '#3F51B5'}]}>
          <Card.Content>
              <Text variant="headlineSmall" style={{color: 'white', fontWeight: 'bold'}}>¿Planeando tu descanso?</Text>
              <Text variant="bodyMedium" style={{color: 'white', opacity: 0.9, marginBottom: 15}}>Consulta las fechas disponibles antes de realizar tu solicitud oficial.</Text>
              <Button mode="contained" buttonColor="white" textColor="#3F51B5" style={{width: 200, borderRadius: 8}} contentStyle={{flexDirection: 'row-reverse'}} icon="arrow-right">
                NUEVA SOLICITUD
              </Button>
          </Card.Content>
      </Card>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  welcomeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, marginTop: 10 },
  welcomeText: { fontWeight: '900' },
  header: { marginBottom: 25 },
  title: { fontWeight: '900' },
  
  // Gráfica de Progreso y Card Principal
  mainProgressCard: { borderRadius: 16, backgroundColor: '#FFF', elevation: 2 },
  daysLabel: { fontWeight: '700', color: '#1A2B5A' },
  activeBadge: { backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 'bold' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 10 },
  circularMock: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#15803D' },
  usedDaysText: { fontWeight: 'bold', color: '#15803D' },
  usedLabelText: { color: '#15803D', fontWeight: 'bold' },
  progressData: { marginLeft: 20 },
  totalDaysText: { fontWeight: 'bold', marginTop: 2, color: '#1E293B' },
  
  // Paginación por puntos
  paginationRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15 },
  paginationDot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  activeDot: { backgroundColor: '#3E77BC', width: 24 },
  inactiveDot: { backgroundColor: '#CBD5E1' },
  
  // Stats Row
  statsRow: { flexDirection: 'row', marginBottom: 25 },
  statCard: { borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#3E77BC' },
  statLabel: { fontWeight: 'bold' },
  statValue: { fontWeight: '900', marginTop: -5 },
  
  // Solicitudes Recientes
  recentTitle: { fontWeight: 'bold' },
  requestCard: { borderRadius: 12, backgroundColor: '#FFF', elevation: 1, marginBottom: 12 },
  requestDatesRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  statusBadge: { fontWeight: 'bold', borderRadius: 10 },
  ctaCard: { borderRadius: 16, marginTop: 10 },

  // Generales
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});