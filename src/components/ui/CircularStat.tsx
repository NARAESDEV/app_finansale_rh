import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  value: string | number;
  label: string;
  color: string;
}

export const CircularStat = ({ value, label, color }: Props) => (
  <View style={styles.container}>
    <View style={[styles.circle, { borderColor: color }]}>
      <Text style={styles.value}>{value}</Text>
    </View>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  label: { fontSize: 12, color: '#64748B', fontWeight: '600' }
});