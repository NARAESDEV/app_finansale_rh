import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Text, useTheme } from 'react-native-paper';

// Configuración en español
LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
};
LocaleConfig.defaultLocale = 'es';

export const VacationCalendar = () => {
    const theme = useTheme();
    const [selectedRange, setSelectedRange] = useState({});

    // //metodo para seleccionar los dias en el calendario
    const onDayPress = (day: any) => {
        // Aquí implementaremos la lógica de rango (Start/End) en el siguiente paso
        // Por ahora, marcamos un día para probar la UI
        setSelectedRange({
            [day.dateString]: { selected: true, startingDay: true, endingDay: true, color: '#3E77BC' }
        });
        console.log('Día seleccionado:', day.dateString);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecciona el periodo:</Text>
            <Calendar
                onDayPress={onDayPress}
                markingType={'period'}
                markedDates={selectedRange}
                theme={{
                    calendarBackground: 'transparent',
                    textSectionTitleColor: '#64748B',
                    selectedDayBackgroundColor: '#3E77BC',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#F47C00',
                    dayTextColor: '#1E293B',
                    textDisabledColor: '#CBD5E1',
                    arrowColor: '#3E77BC',
                    monthTextColor: '#1E293B',
                    indicatorColor: '#3E77BC',
                    textDayFontWeight: '600',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                }}
                style={styles.calendarShadow}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 20 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#3E77BC', marginBottom: 10 },
    calendarShadow: {
        borderRadius: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        padding: 10,
        backgroundColor: 'white'
    }
});