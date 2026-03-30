import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

export default function MainHubScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header sencillo */}
            <View style={styles.header}>
                <Text variant="headlineMedium" style={styles.title}>Naraes Workspace</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>¿A dónde vamos hoy?</Text>
            </View>

            {/* Grid de Módulos */}
            <View style={styles.grid}>

                {/* TARJETA: Módulo de Recursos Humanos */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push('/(tabs)')} // <-- ¡AQUÍ ESTÁ LA MAGIA! Nos mete al submundo de RH
                >
                    <Surface style={styles.card} elevation={2}>
                        <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
                            <MaterialCommunityIcons name="account-group" size={32} color="#3E77BC" />
                        </View>
                        <Text style={styles.cardTitle}>Recursos Humanos</Text>
                        <Text style={styles.cardSubtitle}>Vacaciones, recibos y soporte</Text>
                    </Surface>
                </TouchableOpacity>

                {/* TARJETA: Otro módulo (Bloqueado/Próximamente) */}
                <Surface style={[styles.card, styles.cardDisabled]} elevation={0}>
                    <View style={[styles.iconBox, { backgroundColor: '#F1F5F9' }]}>
                        <MaterialCommunityIcons name="finance" size={32} color="#94A3B8" />
                    </View>
                    <Text style={[styles.cardTitle, { color: '#94A3B8' }]}>Finanzas</Text>
                    <Text style={styles.cardSubtitle}>Próximamente</Text>
                </Surface>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FCFF', padding: 20, paddingTop: 60 },
    header: { marginBottom: 30 },
    title: { fontWeight: '900', color: '#1E293B' },
    subtitle: { color: '#64748B', marginTop: 5 },
    grid: { gap: 15 },
    card: { backgroundColor: 'white', padding: 20, borderRadius: 16, flexDirection: 'column' },
    cardDisabled: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0' },
    iconBox: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
    cardSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4 }
});