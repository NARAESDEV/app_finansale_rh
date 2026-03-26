import { MD3LightTheme } from 'react-native-paper';

export const theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#3E77BC',       // Azul Marino (Botones/Títulos)
        secondary: '#15803D',     // Verde (Aprobaciones/Confirmar)
        tertiary: '#4F8CC9',      // Azul Cielo
        error: '#E11D48',         // Rojo (Rechazar)
        background: '#F9FCFF',    // Fondo limpio de las capturas
        surface: '#FFFFFF',
        outline: '#E2E8F0',       // Bordes de inputs
    },
};