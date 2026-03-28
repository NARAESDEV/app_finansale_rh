# 🏢 FinanSale HR - Mobile App

Aplicación móvil de gestión de Recursos Humanos exclusiva para empleados. Diseñada con un enfoque "Mobile-First", UI premium (Glassmorphism, Neumorfismo ligero) y UX optimizada para autoservicio de personal.

## 🚀 Tecnologías Core (Stack Senior)
* **Framework:** React Native (Expo SDK)
* **Enrutamiento:** Expo Router (File-based routing nativo)
* **UI Kit:** React Native Paper (Material Design v3)
* **Estado del Cliente:** Zustand (Ligero, rápido y sin boilerplate)
* **Estado del Servidor (Caché):** TanStack Query (React Query)
* **Manejo de Fechas:** `date-fns`
* **Listas de Alto Rendimiento:** `@shopify/flash-list`

## 🏗️ Arquitectura: Feature-Sliced Design (FSD)
El proyecto sigue una estructura modular para garantizar la escalabilidad y mantenibilidad, separando la lógica por dominio de negocio:

```text
src/
  ├── core/            # Configuración global (Temas de RN Paper, Constantes)
  ├── components/      # UI genérica (CustomButtons, CustomInputs, CircularStats)
  └── features/        # Módulos de negocio (El corazón de la app)
       ├── auth/       # Login, Recuperación Segura de Contraseña, Zustand Store
       ├── vacations/  # Dashboard, Solicitudes, Tracking de Estado
       ├── history/    # Historial de ciclos pasados
       └── profile/    # Datos del empleado y configuraciones

       ---

### 🛠️ PASO 2: Preparar la Compilación (El APK)

Para generar el archivo instalable en tu teléfono, usaremos **EAS (Expo Application Services)**. Por defecto, EAS genera archivos `.aab` (para subir a la tienda), pero nosotros necesitamos un `.apk` para probarlo localmente en tu Android.

**1. Actualiza o crea el archivo `eas.json` en la raíz de tu proyecto con esto:**
```
json
{
  "cli": {
    "version": ">= 7.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_APP_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}