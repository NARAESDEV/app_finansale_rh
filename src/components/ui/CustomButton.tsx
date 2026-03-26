import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  title: string;
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained';
  icon?: string;
  color?: string; // Para permitir el rojo de "Rechazar" o azul de "Login"
}

export const CustomButton = ({ title, onPress, mode = 'contained', icon, color }: Props) => {
  return (
    <Button 
      mode={mode} 
      onPress={onPress}
      icon={icon}
      style={[styles.button, color ? { backgroundColor: color } : {}]}
      contentStyle={styles.content}
      labelStyle={styles.label}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
  },
  content: {
    paddingVertical: 6,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
  }
});