import { eachDayOfInterval, format, isBefore, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text } from 'react-native-paper';

interface CalendarProps {
    mode?: 'single' | 'range';
    onDateChange: (dates: { start?: string; end?: string; single?: string }) => void;
}

export const VacationCalendar = ({ mode = 'range', onDateChange }: CalendarProps) => {
    const [range, setRange] = useState<{ start?: string; end?: string }>({});
    const [singleDate, setSingleDate] = useState<string>('');
    const [markedDates, setMarkedDates] = useState<any>({});

    const onDayPress = (day: any) => {
        const { dateString } = day;

        if (mode === 'single') {
            setSingleDate(dateString);
            setMarkedDates({
                [dateString]: { startingDay: true, endingDay: true, color: '#3E77BC', textColor: 'white' }
            });
            onDateChange({ single: dateString });
            return;
        }

        // Lógica para 'range' (Vacaciones, Maternidad, etc.)
        if (!range.start || (range.start && range.end)) {
            setRange({ start: dateString });
            setMarkedDates({ [dateString]: { startingDay: true, endingDay: true, color: '#3E77BC', textColor: 'white' } });
            onDateChange({ start: dateString });
        } else {
            if (isBefore(parseISO(dateString), parseISO(range.start))) {
                setRange({ start: dateString });
                setMarkedDates({ [dateString]: { startingDay: true, endingDay: true, color: '#3E77BC', textColor: 'white' } });
                onDateChange({ start: dateString });
            } else {
                const interval = eachDayOfInterval({ start: parseISO(range.start), end: parseISO(dateString) });
                const newMarked: any = {};
                interval.forEach((date, index) => {
                    const ds = format(date, 'yyyy-MM-dd');
                    newMarked[ds] = { color: '#3E77BC', textColor: 'white', startingDay: index === 0, endingDay: index === interval.length - 1, selected: true };
                });
                setRange({ ...range, end: dateString });
                setMarkedDates(newMarked);
                onDateChange({ start: range.start, end: dateString });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecciona {mode === 'single' ? 'el día' : 'el periodo'}:</Text>
            <Calendar
                onDayPress={onDayPress}
                markingType={'period'}
                markedDates={markedDates}
                theme={{
                    calendarBackground: 'transparent', todayTextColor: '#F47C00', dayTextColor: '#1E293B',
                    arrowColor: '#3E77BC', monthTextColor: '#1E293B', textDayFontWeight: '600', textMonthFontWeight: 'bold'
                }}
                style={styles.calendarShadow}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 25 },
    label: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 12, textTransform: 'uppercase' },
    calendarShadow: { borderRadius: 20, elevation: 3, padding: 10, backgroundColor: 'white' }
});