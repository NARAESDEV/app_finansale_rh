# 🏗️ Arquitectura y Vistas (FinanSale HR)

Este proyecto utiliza **Feature-Sliced Design (FSD)** adaptado para React Native. El objetivo es mantener una alta cohesión dentro de los dominios de negocio y un bajo acoplamiento.

## 📂 Estructura de Directorios

```text
app/                    # Rutas de Expo Router (El esqueleto de navegación)
  ├── (auth)/           # Grupo de rutas públicas
  │    ├── login.tsx    # Vista de inicio de sesión
  │    └── recover.tsx  # Flujo aislado de recuperación de contraseña
  ├── (tabs)/           # Grupo de rutas privadas (Navegación inferior)
  │    ├── _layout.tsx  # Configuración del Navbar "Brutal"
  │    ├── index.tsx    # Dashboard Principal
  │    ├── requests.tsx # Nueva solicitud y calendario
  │    ├── history.tsx  # Historial de ciclos
  │    └── profile.tsx  # Perfil del empleado
  └── requests/         # Rutas dinámicas
       └── [id].tsx     # Detalle de solicitud y Timeline

src/                    # Código fuente principal
  ├── components/ui/    # Componentes compartidos y "tontos" (Botones, Inputs)
  ├── core/             # Configuración global (Tema corporativo, Constantes)
  └── features/         # Módulos de dominio (El cerebro de la app)
       ├── auth/        # Lógica de sesión, estado con Zustand
       ├── history/     # Componentes visuales del historial
       └── vacations/   # Lógica pesada: Dashboards, Timelines, y Chat Modal
```

## 🎨 Vistas Principales
1. **Login & Recover:** Uso de `KeyboardAvoidingView` y separación de estados para UX fluida.
2. **Dashboard:** Uso de degradados, `ProgressBar` nativo y `CircularStat` con Glassmorphism.
3. **Solicitudes:** Integración de `react-native-calendars` con cálculo de rango vía `date-fns`.
4. **Chat Modal:** Soporte en tiempo real optimizado con `@shopify/flash-list` y Skeleton Loaders.