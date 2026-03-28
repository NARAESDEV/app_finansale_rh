import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, IconButton, ProgressBar, Text } from 'react-native-paper';

interface Props {
    name: string;
    progress: number; // 0 a 1
}

export const HeaderProgress = ({ name, progress }: Props) => (
    <LinearGradient colors={['#3E77BC', '#4F8CC9']} style={styles.header}>
        <View style={styles.topRow}>
            <View style={styles.userInfo}>
                <Avatar.Image size={50} source={{ uri: 'https://i.pravatar.cc/150' }} />
                <View style={styles.textContainer}>
                    <Text style={styles.hi}>Hola,</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
            <IconButton icon="bell-badge-outline" iconColor="white" size={28} style={styles.notif} />
        </View>

        <View style={styles.progressSection}>
            <View style={styles.labels}>
                <Text style={styles.pTitle}>Progeso de Dias</Text>
                <Text style={styles.pPercent}>{Math.round(progress * 100)}%</Text>
            </View>
            <ProgressBar progress={progress} color="white" style={styles.bar} />
        </View>
    </LinearGradient>
);

const styles = StyleSheet.create({
    header: { paddingTop: 60, paddingHorizontal: 25, paddingBottom: 40, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    textContainer: { marginLeft: 15 },
    hi: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },
    name: { color: 'white', fontSize: 22, fontWeight: '900' },
    notif: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
    progressSection: { marginTop: 30 },
    labels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    pTitle: { color: 'white', fontWeight: '600' },
    pPercent: { color: 'white', fontWeight: '900' },
    bar: { height: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.3)' }
});