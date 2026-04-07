import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

// Componentes UI Reutilizables
import { CustomButton } from '../../../components/ui/CustomButton';
import { SuccessModal } from '../../../components/ui/SuccessModal';
import { SelectField, TextField } from './FormFields';
import { TypeSelectorSheet } from './TypeSelectorSheet';
import { VacationCalendar } from './VacationCalendar';

const TIPOS_SOLICITUD = ['Vacaciones', 'Maternidad / Paternidad', 'Permiso de Ausencia', 'Recibos de Nómina'];

export function RequestFormView() {
    const router = useRouter();
    const [type, setType] = useState('Vacaciones');
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [selectedDates, setSelectedDates] = useState<any>({});

    const currentUser = { name: "Josue Israel", role: "Ssr. Frontend Engineer" };

    const handleSend = () => {
        console.log("Enviando Solicitud:", { tipo: type, usuario: currentUser.name, datos: formData, fechas: selectedDates });
        setShowSuccess(true);
    };
    const handleFinalize = () => {
        setShowSuccess(false);
        setTimeout(() => {
            router.replace('/(tabs)');
        }, 100);
    };

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
                        <TextField label="Motivo detallado" placeholder="Explica..." multiline onChange={(val: string) => setFormData({ ...formData, motivo: val })} />
                    </View>
                );
            case 'Recibos de Nómina':
                return (
                    <View style={styles.dynamicForm}>
                        <TextField label="Solicitante" value={currentUser.name} readOnly />
                        <SelectField
                            label="Periodo del Recibo"
                            value={formData.periodo}
                            options={['Quincena Actual', 'Mes Anterior', 'Hace 2 Meses']}
                            onSelect={(val: string) => setFormData({ ...formData, periodo: val })}
                        />
                        <TextField label="Motivo de solicitud" placeholder="Uso interno..." multiline onChange={(val: string) => setFormData({ ...formData, motivo: val })} />
                    </View>
                );
            case 'Maternidad / Paternidad':
                return (
                    <View style={styles.dynamicForm}>
                        <TextField label="Solicitante" value={currentUser.name} readOnly />
                        <TextField label="Persona de Respaldo" placeholder="Ej. Carlos Ruiz" value={formData.respaldo} onChange={(val: string) => setFormData({ ...formData, respaldo: val })} />
                        <VacationCalendar mode="range" onDateChange={setSelectedDates} />
                    </View>
                );
            default:
                return (
                    <View style={styles.dynamicForm}>
                        <Card style={styles.balanceCard} elevation={1}>
                            <Card.Content style={styles.row}>
                                <View>
                                    <Text style={styles.balanceLabel}>DIAS DE VACACIONES</Text>
                                    <Text style={styles.daysText}>10 <Text style={styles.daysSub}>Días</Text></Text>
                                </View>
                                <View style={styles.iconCircle}>
                                    <MaterialCommunityIcons name="umbrella-beach" size={32} color="#3E77BC" />
                                </View>
                            </Card.Content>
                        </Card>
                        <TextField label="Solicitante" value={currentUser.name} readOnly />
                        <VacationCalendar mode="range" onDateChange={setSelectedDates} />
                    </View>
                );
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F9FCFF' }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section: Ahora con padding propio para no verse apretado */}
                <View style={styles.headerArea}>
                    <Text variant="headlineMedium" style={styles.title}>Nueva Solicitud</Text>
                    <Text style={styles.subtitle}>Completa los campos para procesar tu trámite.</Text>
                </View>

                <View style={styles.body}>
                    {/* SELECTOR MAESTRO */}
                    <View style={styles.section}>
                        <Text style={styles.label}>¿Qué necesitas tramitar?</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.mainSelector}
                            onPress={() => setIsSheetVisible(true)}
                        >
                            <View style={styles.selectorLeft}>
                                <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="#3E77BC" />
                                <Text style={styles.mainSelectorText}>{type}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-down" size={24} color="#3E77BC" />
                        </TouchableOpacity>
                    </View>

                    {renderDynamicForm()}

                    <View style={styles.footer}>
                        <CustomButton title="Enviar Solicitud" onPress={handleSend} color="#3E77BC" icon="send" />
                        <CustomButton title="Cancelar" onPress={() => router.back()} color="#EF4444" icon="close" />
                    </View>
                </View>
            </ScrollView>

            <TypeSelectorSheet
                visible={isSheetVisible}
                onClose={() => setIsSheetVisible(false)}
                onSelect={(val) => { setType(val); setFormData({}); }}
                options={TIPOS_SOLICITUD}
            />

            <SuccessModal
                visible={showSuccess}
                onDismiss={() => setShowSuccess(false)}
                // onConfirm={() => router.replace('/(tabs)')}
                onConfirm={handleFinalize}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    content: { paddingBottom: 120 },
    headerArea: { paddingHorizontal: 25, paddingTop: 60, marginBottom: 20 },
    title: { fontWeight: '900', color: '#1E293B' },
    subtitle: { color: '#64748B', fontSize: 14, marginTop: 4 },
    body: { paddingHorizontal: 25 },
    section: { marginBottom: 25 },
    label: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 8, textTransform: 'uppercase' },
    mainSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    selectorLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    mainSelectorText: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
    dynamicForm: { marginTop: 10 },
    balanceCard: { borderRadius: 24, backgroundColor: 'white', elevation: 2, marginBottom: 25, borderWidth: 1, borderColor: '#F1F5F9' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    balanceLabel: { color: '#3E77BC', fontWeight: '800', fontSize: 12 },
    daysText: { fontSize: 40, fontWeight: '900', color: '#1E293B' },
    daysSub: { fontSize: 18, color: '#64748B' },
    iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EDF2F7', justifyContent: 'center', alignItems: 'center' },
    footer: { marginTop: 40, gap: 15 }
});