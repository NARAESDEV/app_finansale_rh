import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, IconButton, ProgressBar, Text } from 'react-native-paper';

const { width } = Dimensions.get('window');

export const VacationsDashboard = () => {
  const vacationProgress = 0.61; // 61% como en tu imagen

  return (
    <ScrollView style={styles.container} bounces={false}>
      {/* Header Responsivo Estilo image_69ef0d.png */}
      <LinearGradient
        colors={['#3E77BC', '#4F8CC9']} // Degradado Azul Marino a Cielo
        style={styles.headerGradient}
      >
        <View style={styles.topRow}>
          <View style={styles.userInfo}>
            <Avatar.Image 
              size={50} 
              source={{ uri: 'https://i.pravatar.cc/150?u=josue' }} 
            />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.hiText}>Hi,</Text>
              <Text style={styles.userNameText}>Josue Vasquez</Text>
            </View>
          </View>
          <IconButton 
            icon="bell-badge-outline" 
            iconColor="white" 
            size={28} 
            style={styles.notificationBtn} 
          />
        </View>

        {/* Progress Bar de Vacaciones */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressTitle}>Días Disponibles</Text>
            <Text style={styles.progressPercent}>{Math.round(vacationProgress * 100)}%</Text>
          </View>
          <ProgressBar 
            progress={vacationProgress} 
            color="#FFFFFF" 
            style={styles.progressBar} 
          />
        </View>
      </LinearGradient>

      {/* Contenido Inferior */}
      <View style={styles.content}>
        
        {/* Gráfica de Días Usados Estilo image_69e02a.png */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>Resumen de Ciclo 2026</Text>
            <View style={styles.circlesRow}>
              <View style={styles.statCircleContainer}>
                <View style={[styles.circle, { borderColor: '#15803D' }]}>
                   <Text style={styles.circleNumber}>14</Text>
                </View>
                <Text style={styles.circleLabel}>Usados</Text>
              </View>
              
              <View style={styles.statCircleContainer}>
                <View style={[styles.circle, { borderColor: '#F47C00' }]}>
                   <Text style={styles.circleNumber}>10</Text>
                </View>
                <Text style={styles.circleLabel}>Pendientes</Text>
              </View>

              <View style={styles.statCircleContainer}>
                <View style={[styles.circle, { borderColor: '#3E77BC' }]}>
                   <Text style={styles.circleNumber}>24</Text>
                </View>
                <Text style={styles.circleLabel}>Totales</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* //metodo para seleccionar los dias en el calendario */}
        <View style={{ height: 100 }} /> 
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FCFF' },
  headerGradient: {
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  welcomeTextContainer: { marginLeft: 15 },
  hiText: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },
  userNameText: { color: 'white', fontSize: 22, fontWeight: '900' },
  notificationBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
  
  // Progress Bar
  progressSection: { marginTop: 30 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressTitle: { color: 'white', fontWeight: '600', opacity: 0.9 },
  progressPercent: { color: 'white', fontWeight: '900' },
  progressBar: { height: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.3)' },

  // Content
  content: { padding: 20, marginTop: -20 },
  chartCard: {
    borderRadius: 20,
    elevation: 4,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  chartTitle: { textAlign: 'center', color: '#1E293B', fontWeight: '700', marginBottom: 20 },
  circlesRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statCircleContainer: { alignItems: 'center' },
  
  // //estilos del icono del card
  circle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  circleNumber: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  circleLabel: { fontSize: 12, color: '#64748B', fontWeight: '600' }
});