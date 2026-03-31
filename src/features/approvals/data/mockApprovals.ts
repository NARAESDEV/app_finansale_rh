export const mockApprovalDetail = {
    id: 'REQ-1005',
    employee: {
        name: 'Brenda González',
        role: 'Coordinadora de Marketing',
        avatar: 'https://ui-avatars.com/api/?name=Brenda+Gonzalez&background=FFE4E6&color=E11D48',
    },
    type: 'Vacaciones Anuales',
    startDate: new Date(2026, 4, 15),
    endDate: new Date(2026, 4, 22),
    totalDays: 6,
    notes: 'Solicito estos días para un viaje familiar planificado.',
    currentStatus: 'pendiente_aprobacion',
    statusHistory: [
        { status: 'solicitud_enviada', label: 'Solicitud enviada', user: 'Brenda González', timestamp: new Date(2026, 4, 1, 10, 0), icon: 'send', color: '#64748B' },
        { status: 'pendiente_aprobacion', label: 'Pendiente de aprobación', user: 'RH (Asignado automáticamente)', timestamp: new Date(2026, 4, 1, 10, 5), icon: 'clock-outline', color: '#F59E0B' },
    ]
};