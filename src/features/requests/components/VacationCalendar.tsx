import { eachDayOfInterval, format, isBefore } from 'date-fns';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text } from 'react-native-paper';

export const VacationCalendar = () => {
    const [range, setRange] = useState<{ start?: string; end?: string }>({});
    const [markedDates, setMarkedDates] = useState<any>({});

    // //metodo para seleccionar los dias en el calendario
    const onDayPress = (day: any) => {
        const { dateString } = day;

        if (!range.start || (range.start && range.end)) {
            // Reiniciar y establecer fecha de inicio
            setRange({ start: dateString });
            setMarkedDates({
                [dateString]: { startingDay: true, color: '#3E77BC', textColor: 'white' }
            });
        } else {
            // Establecer fecha de fin si es posterior al inicio
            if (isBefore(new Date(dateString), new Date(range.start))) {
                setRange({ start: dateString });
                setMarkedDates({ [dateString]: { startingDay: true, color: '#3E77BC', textColor: 'white' } });
            } else {
                const interval = eachDayOfInterval({
                    start: new Date(range.start),
                    end: new Date(dateString)
                });

                const newMarked: any = {};
                interval.forEach((date: Date, index: number) => {
                    const ds = format(date, 'yyyy-MM-dd');
                    newMarked[ds] = {
                        color: '#3E77BC',
                        textColor: 'white',
                        startingDay: index === 0,
                        endingDay: index === interval.length - 1,
                        // Agregamos opacidad a los días intermedios para que se vea más pro
                        opacity: index === 0 || index === interval.length - 1 ? 1 : 0.7
                    };
                });
                setRange({ ...range, end: dateString });
                setMarkedDates(newMarked);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecciona el periodo:</Text>
            <Calendar
                onDayPress={onDayPress}
                markingType={'period'}
                markedDates={markedDates}
                theme={{
                    calendarBackground: 'transparent',
                    textSectionTitleColor: '#64748B',
                    selectedDayBackgroundColor: '#3E77BC',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#F47C00',
                    dayTextColor: '#1E293B',
                    arrowColor: '#3E77BC',
                    monthTextColor: '#1E293B',
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
    container: { marginTop: 25 },
    label: { fontSize: 14, fontWeight: '800', color: '#3E77BC', marginBottom: 12, textTransform: 'uppercase' },
    calendarShadow: {
        borderRadius: 20,
        elevation: 3,
        padding: 10,
        backgroundColor: 'white'
    }
});