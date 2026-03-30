# 🚀 Guía de Despliegue (EAS Build)

Este documento detalla cómo generar binarios (APKs y AABs) utilizando los servidores de Expo Application Services (EAS).

## 📌 Requisitos Previos
1. Tener cuenta en [Expo.dev](https://expo.dev).
2. Tener instalado el CLI globalmente: `npm install -g eas-cli`
3. Iniciar sesión en la terminal: `eas login`

## ⚙️ Perfiles de Compilación (`eas.json`)
El proyecto está configurado con tres perfiles principales:

* **`development`**: Para pruebas con Expo Go o clientes de desarrollo custom.
* **`preview`**: **Uso interno.** Genera un `.apk` instalable directamente en dispositivos Android sin pasar por tiendas.
* **`production`**: Genera el `.aab` (Android App Bundle) requerido por la Google Play Store.

## 🔨 Comando para Generar el APK de Prueba
Para compilar la aplicación y generar un instalable local (Android):

```bash
eas build -p android --profile preview
```

* **Nota de Seguridad:** Al ejecutar este comando por primera vez, EAS gestionará automáticamente el **Android Keystore** (Credenciales Remotas). Nunca pierdas el acceso a tu cuenta de Expo, ya que ahí reside la firma digital de la app.