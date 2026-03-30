import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { HubHeader } from '../src/features/hub/components/HubHeader';
import { ModuleCard } from '../src/features/hub/components/ModuleCard';

export default function MainHubScreen() {
    const router = useRouter();

    // Esta data eventualmente vendrá de tu API en Spring Boot
    const availableModules = [
        {
            id: '1',
            title: 'Recursos Humanos',
            subtitle: 'Acceso total',
            icon: 'account-tie',
            color: '#F59E0B', // Naranja/Amarillo vibrante como en tu mockup
            route: '/(tabs)',
            disabled: false,
        },
        {
            id: '2',
            title: 'Finanzas',
            subtitle: 'Sin permisos',
            icon: 'chart-pie',
            color: '#10B981', // Verde
            route: null,
            disabled: true,
        },
        {
            id: '3',
            title: 'Oportunidades',
            subtitle: 'Próximamente',
            icon: 'school',
            color: '#8B5CF6', // Morado
            route: null,
            disabled: true,
        },
        {
            id: '4',
            title: 'Ticket NS',
            subtitle: 'Mantenimiento',
            icon: 'laptop',
            color: '#3B82F6', // Azul
            route: null,
            disabled: true,
        },
        {
            id: '5',
            title: 'Entrega',
            subtitle: 'Mantenimiento',
            icon: 'truck-fast',
            color: '#3B82F6', // Azul
            route: null,
            disabled: true,
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

                {/* HEADER CURVO  */}
                <HubHeader
                    userName="Josue Israel"
                    role="Frontend Developer"
                />

                {/*GRID DE MÓDULOS FLOTANTES */}
                <View style={styles.gridContainer}>
                    {availableModules.map((mod) => (
                        <ModuleCard
                            key={mod.id}
                            title={mod.title}
                            subtitle={mod.subtitle}
                            icon={mod.icon}
                            color={mod.color}
                            disabled={mod.disabled}
                            onPress={() => mod.route && router.push(mod.route as any)}
                        />
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' }, // Un gris súper clarito para que resalten las tarjetas blancas
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: -30, // ¡EL TRUCO! Hace que las tarjetas se suban a la curva del header
        paddingBottom: 40,
    }
});