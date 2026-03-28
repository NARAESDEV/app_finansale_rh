import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Surface, Text } from 'react-native-paper';

// IMPORTAMOS NUESTROS COMPONENTES PREMIUM REUTILIZABLES
import { BottomSheetPicker } from '../../../components/ui/BottomSheetPicker';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomInput } from '../../../components/ui/CustomInput';

const MOTIVOS_RECUPERACION = [
    'Olvidé mi contraseña',
    'Cuenta bloqueada por intentos',
    'No tengo acceso a mi correo',
    'Dispositivo nuevo / No reconocido',
    'Otro'
];

export const RecoverPasswordView = () => {
    // ESTADOS DEL FORMULARIO
    const [idUsuario, setIdUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [motivo, setMotivo] = useState(MOTIVOS_RECUPERACION[0]);

    // ESTADO DE SEGURIDAD (AISLAMIENTO)
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        console.log('Solicitud de recuperación:', { idUsuario, nombre, correo, motivo });
        setIsSubmitted(true);
    };

    return (
        <View style={[styles.container, { backgroundColor: '#F9FCFF' }]}>

            {/* APPBAR MINIMALISTA SOLO CON BOTON DE REGRESO */}
            <Appbar.Header style={styles.appBar}>
                <Appbar.BackAction onPress={() => router.back()} color="#3E77BC" disabled={isSubmitted} />
                <Appbar.Content title="Recuperar Acceso" titleStyle={{ color: '#3E77BC', fontWeight: 'bold' }} />
            </Appbar.Header>

            {/* SI YA SE ENVIÓ, MOSTRAMOS LA PANTALLA DE ÉXITO AISLADA */}
            {isSubmitted ? (
                <View style={styles.successContainer}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="shield-check" size={80} color="#3E77BC" />
                    </View>
                    <Text style={styles.successTitle}>Solicitud Enviada</Text>
                    <Text style={styles.successText}>
                        Hemos recibido tu solicitud de recuperación. Por seguridad, nuestro equipo de soporte validará tu Identificador ({idUsuario}) y se pondrá en contacto contigo al correo proporcionado en las próximas 24 horas.
                    </Text>
                    <View style={{ width: '100%', marginTop: 40, paddingHorizontal: 20 }}>
                        <CustomButton title="Volver al Login" onPress={() => router.back()} color="#3E77BC" />
                    </View>
                </View>
            ) : (
                /* SI NO SE HA ENVIADO, MOSTRAMOS EL FORMULARIO SEGURO */
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                        {/* ENCABEZADO VISUAL */}
                        <View style={styles.headerArea}>
                            <MaterialCommunityIcons name="lock-reset" size={60} color="#3E77BC" style={{ marginBottom: 10 }} />
                            <Text style={styles.title}>Validación de Identidad</Text>
                            <Text style={styles.subtitle}>
                                Para restablecer tu contraseña, necesitamos validar que eres personal autorizado. Ingresa tus datos corporativos.
                            </Text>
                        </View>

                        {/* FORMULARIO EN TARJETA (ESTILO PREMIUM) */}
                        <Surface style={styles.formCard} elevation={2}>
                            <CustomInput
                                label="ID de Usuario / Empleado"
                                value={idUsuario}
                                onChangeText={setIdUsuario}
                                keyboardType="numeric"
                            />

                            <CustomInput
                                label="Nombre Completo"
                                value={nombre}
                                onChangeText={setNombre}
                            />

                            <CustomInput
                                label="Correo Electrónico"
                                value={correo}
                                onChangeText={setCorreo}
                                keyboardType="email-address"
                            />

                            {/* REUTILIZAMOS EL COMPONENTE DE SELECCIÓN */}
                            <View style={{ marginTop: 5 }}>
                                <BottomSheetPicker
                                    label="Motivo de recuperación"
                                    value={motivo}
                                    options={MOTIVOS_RECUPERACION}
                                    onSelect={setMotivo}
                                />
                            </View>
                        </Surface>

                        <View style={styles.buttonContainer}>
                            <CustomButton title="Enviar Solicitud Segura" onPress={handleSubmit} color="#3E77BC" />
                        </View>

                        <View style={styles.securityBadge}>
                            <MaterialCommunityIcons name="shield-lock-outline" size={16} color="#64748B" />
                            <Text style={styles.securityText}>Conexión cifrada de extremo a extremo</Text>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    appBar: { elevation: 0, backgroundColor: '#F9FCFF' },
    content: { padding: 20, paddingBottom: 40 },

    // ESTILOS DEL FORMULARIO
    headerArea: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
    title: { fontSize: 22, fontWeight: '900', color: '#1E293B', marginBottom: 8, textAlign: 'center' },
    subtitle: { fontSize: 14, textAlign: 'center', color: '#64748B', lineHeight: 20, paddingHorizontal: 10 },
    formCard: { padding: 20, borderRadius: 24, backgroundColor: 'white', marginBottom: 25 },
    buttonContainer: { marginTop: 5 },
    securityBadge: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25 },
    securityText: { color: '#64748B', fontSize: 12, marginLeft: 5, fontWeight: 'bold' },

    // ESTILOS DE LA PANTALLA DE ÉXITO
    successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, paddingBottom: 100 },
    iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(62, 119, 188, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
    successTitle: { fontSize: 26, fontWeight: '900', color: '#1E293B', marginBottom: 15 },
    successText: { fontSize: 15, textAlign: 'center', color: '#64748B', lineHeight: 24 },
});