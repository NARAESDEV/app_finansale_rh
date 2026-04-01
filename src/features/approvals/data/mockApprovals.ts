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

    currentStatus: 'peticion_autorizacion', // Basado en tu diagrama

    // Spring Boot nos dirá: "Desde este estado, solo puedes ir a estos dos:"
    availableTransitions: [
        {
            targetState: 'asignado',
            label: 'Asignar Usuario',
            color: '#3E77BC',
            icon: 'account-arrow-right',
            requiresUser: true, // ¡Esta bandera activará el Modal de asignación!
            requiresReason: false
        },
        {
            targetState: 'rechazado',
            label: 'Rechazar Solicitud',
            color: '#EF4444',
            icon: 'close-circle-outline',
            requiresUser: false,
            requiresReason: true // ¡Esta bandera hará obligatorio el campo de texto!
        }
    ],

    // El historial se mantiene para dibujar el ProcessTimeline
    statusHistory: [
        { id: '1', status: 'borrador', label: 'Borrador', user: 'Brenda González', timestamp: new Date(2026, 4, 1, 9, 0), icon: 'file-document-outline', color: '#94A3B8' },
        { id: '2', status: 'peticion_autorizacion', label: 'Petición de Autorización', user: 'Brenda González', timestamp: new Date(2026, 4, 1, 10, 0), icon: 'send-clock', color: '#F59E0B' },
    ]
};


// Reglas de transiciones basadas en tu imagen
export const workflowRules: Record<string, any[]> = {
    borrador: [
        { target: 'peticion_autorizacion', label: 'Enviar a Autorización', icon: 'send', color: '#F59E0B' }
    ],
    peticion_autorizacion: [
        { target: 'asignado', label: 'Asignar (A mí u otro)', icon: 'account-check', color: '#3E77BC', requiresUser: true },
        { target: 'rechazado', label: 'Rechazar', icon: 'close-circle', color: '#EF4444', requiresReason: true }
    ],
    asignado: [
        { target: 'programado', label: 'Programar Fechas', icon: 'calendar-clock', color: '#10B981' },
        { target: 'rechazado', label: 'Rechazar', icon: 'close-circle', color: '#EF4444', requiresReason: true }
    ],
    programado: [
        { target: 'en_curso', label: 'Iniciar Vacaciones', icon: 'play-circle', color: '#8B5CF6' }
    ],
    en_curso: [
        { target: 'terminado', label: 'Finalizar', icon: 'flag-checkered', color: '#059669' }
    ],
    terminado: [
        { target: 'cerrado', label: 'Cerrar Expediente', icon: 'lock', color: '#1E293B' }
    ]
};