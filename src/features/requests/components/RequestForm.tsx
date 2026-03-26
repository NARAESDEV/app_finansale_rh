import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const RequestForm = () => {
  
  // //metodo para seleccionar los dias en el calendario
  // const handleDateSelection = (dates: any) => {
  //   console.log('Fechas seleccionadas:', dates);
  // };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Nueva Solicitud</Text>
      <Text>Aquí irá el formulario y el calendario.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }
});