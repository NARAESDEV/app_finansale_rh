import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Divider, Menu, Text } from 'react-native-paper';

// Imports
import { CustomButton } from '../../src/components/ui/CustomButton';
import { SuccessModal } from '../../src/components/ui/SuccessModal';
import { SelectField, TextField } from '../../src/features/requests/components/FormFields';
import { VacationCalendar } from '../../src/features/requests/components/VacationCalendar';

const TIPOS_SOLICITUD = ['Vacaciones', 'Maternidad / Paternidad', 'Permiso de Ausencia', 'Recibos de Nómina'];

export default function RequestsScreen() {
    const router = useRouter();

    // Estados Generales
    const [type, setType] = useState('Vacaciones');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Estados del Formulario Dinámico
    const [formData, setFormData] = useState<any>({});
    const [selectedDates, setSelectedDates] = useState<any>({});

    // Datos fijos del usuario (Simulando estar logueado)
    const currentUser = { name: "Josue Israel", role: "Ssr. Frontend Engineer" };

    const handleSend = () => {
        // Aquí validarías los datos de formData y selectedDates antes de enviar a Spring Boot
        console.log("Enviando Solicitud:", { tipo: type, usuario: currentUser.name, datos: formData, fechas: selectedDates });
        setShowSuccess(true);
    };

    const handleFinalize = () => {
        setShowSuccess(false);
        router.replace('/(tabs)');
    };

    // --- RENDERIZADOR DINÁMICO DE FORMULARIOS ---
    const renderDynamicForm = () => {
        switch (type) {

            case 'Permiso de Ausencia':
                return (
                    <View style={styles.dynamicForm}>
                        <TextField label="Solicitante" value={currentUser.name} readOnly />
                        <SelectField
                            label="Tipo de Ausencia"
                            value={formData.ausenciaTipo}
                            options={['Imprevisto', 'Urgencia Médica', 'Trámite Personal', 'Programado']}
                            onSelect={(val: string) => setFormData({ ...formData, ausenciaTipo: val })}
                        />
                        <TextField
                            label="Persona de Respaldo"
                            placeholder="Ej. Carlos Ruiz"
                            value={formData.respaldo}
                            onChange={(val: string) => setFormData({ ...formData, respaldo: val })}
                        />
                        <VacationCalendar mode="single" onDateChange={setSelectedDates} />
                        <TextField
                            label="Motivo detallado"
                            placeholder="Explica brevemente..."
                            value={formData.motivo}
                            onChange={(val: string) => setFormData({ ...formData, motivo: val })}
                            multiline
                        />
                    </View>
                );

            case 'Recibos de Nómina':
                return (
                    <View style={styles.dynamicForm}>
                        <TextField label="Solicitante" value={currentUser.name} readOnly />
                        <SelectField
                            label="Periodo del Recibo"
                            value={formData.periodo}
                            options={['Quincena Actual', 'Mes Anterior', 'Hace 2 Meses', 'Anual (Constancia)']}
                            onSelect={(val: string) => setFormData({ ...formData, periodo: val })}
                        />
                        <TextField
                            label="Motivo de la solicitud (Uso Interno)"
                            placeholder="Ej. Trámite bancario, Infonavit..."
                            value={formData.motivo}
                            onChange={(val: string) => setFormData({ ...formData, motivo: val })}
                            multiline
                        />
                        {/* NOTA: Los recibos no necesitan calendario */}
                    </View>
                );

            case 'Maternidad / Paternidad':
                return (
                    <View style={styles.dynamicForm}>
                        <TextField label="Solicitante" value={currentUser.name} readOnly />
                        <SelectField
                            label="Tipo de Licencia"
                            value={formData.licenciaTipo}
                            options={['Maternidad (Ley - 84 días)', 'Paternidad (Ley - 5 días)']}
                            onSelect={(val: string) => setFormData({ ...formData, licenciaTipo: val })}
                        />
                        <TextField
                            label="Persona de Respaldo"
                            placeholder="¿Quién cubrirá tus funciones?"
                            value={formData.respaldo}
                            onChange={(val: string) => setFormData({ ...formData, respaldo: val })}
                        />
                        <VacationCalendar mode="range" onDateChange={setSelectedDates} />
                    </View>
                );

            case 'Vacaciones':
            default:
                return (
                    <View style={styles.dynamicForm}>
                        {/* Card de Balance solo para Vacaciones */}
                        <Card style={styles.balanceCard}>
                            <Card.Content style={styles.row}>
                                <View>
                                    <Text style={styles.balanceLabel}>BALANCE ACTUAL</Text>
                                    <Text style={styles.daysText}>14 <Text style={styles.daysSub}>Días</Text></Text>
                                </View>
                                <View style={styles.iconCircle}>
                                    <MaterialCommunityIcons name="umbrella-beach" size={32} color="#3E77BC" />
                                </View>
                            </Card.Content>
                        </Card>

                        <TextField label="Solicitante" value={currentUser.name} readOnly />
                        <TextField
                            label="Persona de Respaldo (Opcional)"
                            placeholder="Ej. Lucía Fernández"
                            value={formData.respaldo}
                            onChange={(val: string) => setFormData({ ...formData, respaldo: val })}
                        />
                        <VacationCalendar mode="range" onDateChange={setSelectedDates} />
                        <TextField
                            label="Comentarios adicionales"
                            placeholder="Notas para tu jefe..."
                            value={formData.motivo}
                            onChange={(val: string) => setFormData({ ...formData, motivo: val })}
                            multiline
                        />
                    </View>
                );
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Text variant="headlineMedium" style={styles.title}>Nueva Solicitud</Text>


            {/* SELECTOR MAESTRO DE TIPO DE SOLICITUD */}
            <View style={styles.section}>
                <Text style={styles.label}>¿Qué necesitas tramitar?</Text>
                <Menu
                    visible={isMenuVisible}
                    onDismiss={() => setIsMenuVisible(false)}
                    anchor={
                        <TouchableOpacity activeOpacity={0.8} style={styles.mainSelector} onPress={() => setIsMenuVisible(true)}>
                            <View style={styles.selectorLeft}>
                                <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="#3E77BC" />
                                <Text style={styles.mainSelectorText}>{type}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-down" size={24} color="#3E77BC" />
                        </TouchableOpacity>
                    }
                >
                    {TIPOS_SOLICITUD.map((tipo, idx) => (
                        <React.Fragment key={tipo}>
                            <Menu.Item onPress={() => { setType(tipo); setIsMenuVisible(false); setFormData({}); setSelectedDates({}); }} title={tipo} />
                            {idx < TIPOS_SOLICITUD.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </Menu>
            </View>

            {/* RENDERIZADO DEL FORMULARIO SEGÚN EL TIPO ELEGIDO */}
            {renderDynamicForm()}

            {/* BOTONES FINALES */}
            <View style={styles.footer}>
                <CustomButton title="Enviar Solicitud" onPress={handleSend} color="#3E77BC" icon="send" />
                <CustomButton title="Cancelar" onPress={() => router.back()} color="#f90e0eff" icon="send" />

                {/* <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                    <Text style={styles.cancelText}>Cancelar Trámite</Text>
                </TouchableOpacity> */}
            </View>

            <SuccessModal visible={showSuccess} onDismiss={() => setShowSuccess(false)} onConfirm={handleFinalize} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF' },
    content: { padding: 25, paddingBottom: 120 },
    title: { fontWeight: '900', color: '#1E293B', marginBottom: 20, marginTop: 40 },

    section: { marginBottom: 25 },
    label: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 8, textTransform: 'uppercase' },

    mainSelector: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: '#EDF2F7', padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#CBD5E1'
    },
    selectorLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    mainSelectorText: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },

    dynamicForm: { marginTop: 10 },

    balanceCard: { borderRadius: 24, backgroundColor: 'white', elevation: 2, marginBottom: 25 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    balanceLabel: { color: '#3E77BC', fontWeight: '800', fontSize: 12, letterSpacing: 1 },
    daysText: { fontSize: 40, fontWeight: '900', color: '#1E293B' },
    daysSub: { fontSize: 18, color: '#64748B', fontWeight: '400' },
    iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EDF2F7', justifyContent: 'center', alignItems: 'center' },

    footer: { marginTop: 40, gap: 15 },
    cancelBtn: { alignSelf: 'center', padding: 10 },
    cancelText: { color: '#EF4444', padding: 10, fontWeight: 'bold' } // Rojo para cancelar
});