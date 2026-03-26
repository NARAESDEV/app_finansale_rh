import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

interface Props {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  placeholder?: string;
}

export const CustomInput = ({ label, value, onChangeText, secureTextEntry, keyboardType, placeholder }: Props) => {
  const theme = useTheme();

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholder={placeholder}
      mode="outlined"
      autoCapitalize="none"
      style={styles.input}
      outlineStyle={{ borderRadius: 12 }} // Según el diseño de "Alta de Empleado"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: '#F1F5F9', // Gris azulado muy claro de tus capturas
  },
});