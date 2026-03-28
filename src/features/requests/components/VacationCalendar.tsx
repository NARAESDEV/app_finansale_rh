import { eachDayOfInterval, format, isBefore, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text } from 'react-native-paper';

export const VacationCalendar = () => {
    const [range, setRange] = useState<{ start?: string; end?: string }>({});
    const [markedDates, setMarkedDates] = useState<any>({});

    const onDayPress = (day: any) => {
        const { dateString } = day;

        // Si no hay inicio o ya hay un rango completo, empezamos de nuevo
        if (!range.start || (range.start && range.end)) {
            setRange({ start: dateString });
            setMarkedDates({
                [dateString]: { startingDay: true, endingDay: true, color: '#3E77BC', textColor: 'white' }
            });
        } else {
            // Si la nueva fecha es anterior a la de inicio, la invertimos o reiniciamos
            if (isBefore(parseISO(dateString), parseISO(range.start))) {
                setRange({ start: dateString });
                setMarkedDates({ [dateString]: { startingDay: true, endingDay: true, color: '#3E77BC', textColor: 'white' } });
            } else {
                // Generamos el intervalo completo entre Start y End
                const interval = eachDayOfInterval({
                    start: parseISO(range.start),
                    end: parseISO(dateString)
                });

                const newMarked: any = {};
                interval.forEach((date: Date, index: number) => {
                    const ds = format(date, 'yyyy-MM-dd');
                    newMarked[ds] = {
                        color: '#3E77BC',
                        textColor: 'white',
                        startingDay: index === 0,
                        endingDay: index === interval.length - 1,
                        // Importante: todos los días del medio deben tener color
                        selected: true
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
    calendarShadow: { borderRadius: 20, elevation: 3, padding: 10, backgroundColor: 'white' }
});