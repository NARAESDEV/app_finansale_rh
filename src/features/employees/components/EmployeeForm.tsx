import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomInput } from '../../../components/ui/CustomInput';

export const EmployeeForm = () => {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#F4FBFC' }]}>
      {/* Header con Título y Ayuda */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" iconColor="#15803D" onPress={() => {}} />
        <Text variant="titleLarge" style={styles.headerTitle}>Alta de Empleado</Text>
        <IconButton icon="help-circle-outline" iconColor="#15803D" onPress={() => {}} />
      </View>

      <View style={styles.content}>
        {/* Banner de Nuevo Ingreso */}
        <Card style={styles.bannerCard}>
          <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c' }} />
          <View style={styles.overlay}>
             <Text style={styles.overlayTitle}>Nuevo Ingreso 2025</Text>
             <Text style={styles.overlaySubtitle}>FINANSALE HR SYSTEM</Text>
          </View>
        </Card>

        {/* Sección: Información Personal */}
        <Text style={styles.sectionTitle}>INFORMACIÓN PERSONAL</Text>
        <CustomInput label="Nombre Completo" placeholder="Ej. Juan Pérez García" />
        <CustomInput label="Puesto / Cargo" placeholder="Ej. Analista Senior" />
        
        {/* Selector de Ubicación (Simulado) */}
        <CustomInput label="Ubicación" value="Heroica Ciudad de Tlaxiaco" />

        {/* Detalles Contractuales */}
        <View style={styles.contractSection}>
           <Text style={styles.sectionTitleBlue}>DETALLES CONTRACTUALES</Text>
           <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomInput label="Salario Mensual" placeholder="$ 0.00" />
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput label="Fecha de Ingreso" placeholder="01/01/2025" />
              </View>
           </View>
        </View>

        {/* Botón de Acción Principal */}
        <CustomButton 
          title="Confirmar Registro" 
          onPress={() => {}} 
          icon="account-plus"
          color="#15803D" // El verde de tu diseño
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8, paddingTop: 40 },
  headerTitle: { color: '#15803D', fontWeight: 'bold' },
  content: { padding: 20 },
  bannerCard: { borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  overlay: { position: 'absolute', bottom: 15, left: 15 },
  overlayTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  overlaySubtitle: { color: 'white', fontSize: 12, opacity: 0.8 },
  sectionTitle: { color: '#3E77BC', fontWeight: 'bold', marginBottom: 12, fontSize: 14 },
  sectionTitleBlue: { color: '#3E77BC', fontWeight: 'bold', marginBottom: 12 },
  contractSection: { backgroundColor: '#E0F2F1', padding: 15, borderRadius: 16, marginBottom: 20 }
});