import { MD3LightTheme } from 'react-native-paper';

export const theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#3E77BC',       // Azul Marino Corporativo
        secondary: '#15803D',     // Verde Confirmaciones
        tertiary: '#EDF2F7',      // Gris Azulado Claro (para fondos de cards)
        error: '#E11D48',         // Rojo Rechazos
        background: '#F9FCFF',    // Fondo limpio de la app
        surface: '#FFFFFF',
        textPrimary: '#1E293B',   // Azul Oscuro de títulos
        textSecondary: '#64748B', // Gris de subtítulos
        success: '#DCFCE7',       // Verde claro de fondo para badges
    },
};