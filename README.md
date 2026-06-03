<div align="center">
  <h1>📱 FollowUp - Frontend</h1>
  <p><i>Plataforma Móvil de Gestión Institucional</i></p>

  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
</div>

<br />

> **Sobre este repositorio:**
> Este es el código fuente del **Frontend** de FollowUp. Está diseñado como una aplicación móvil nativa utilizando un enfoque declarativo y basado en componentes, optimizado para un desarrollo ágil y escalable.

---

## 🎯 Objetivo del Proyecto

**FollowUp** busca modernizar y centralizar la gestión institucional. A través de esta interfaz móvil, los distintos actores de la institución (Directivos, Docentes y Alumnos) podrán acceder a sus paneles correspondientes de forma rápida, segura y desde cualquier lugar.

---

## 🛠️ Stack Tecnológico

Seleccionamos tecnologías modernas que nos permiten iterar rápido y mantener un código limpio:

- **Core Framework:** React Native
- **Entorno & Build:** Expo (compatible con Expo Go)
- **Lenguaje:** JavaScript (ES6+) / JSX
- **Base de Datos & Auth:** Firebase SDK
- **Enrutamiento:** React Navigation _(Próximamente)_

---

## 🚀 Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/follow-up-frontend.git
cd follow-up-frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia la aplicación con Expo:

```bash
npm start
```

4. Abre la app en tu dispositivo o emulador:

- Escanea el código QR con Expo Go
- O presiona `a` para Android / `i` para iOS en la terminal

> Asegúrate de tener instalado Node.js, npm y Expo CLI si prefieres usar la línea de comandos directamente.

---

## 🏗️ Arquitectura del Frontend

El proyecto sigue una estructura modular para mantener la escalabilidad. Todo el código de desarrollo vivirá dentro del directorio `src/`:

```text
follow-up-frontend/
├── src/
│   ├── components/  # Botones, inputs, tarjetas y UI reutilizable
│   ├── screens/     # Vistas principales (Login, Dashboard, Perfil)
│   ├── navigation/  # Configuración de rutas y menús
│   ├── theme/       # Paleta de colores institucional y tipografías
│   └── services/    # Lógica de conexión con Firebase
├── App.js           # Punto de entrada de la aplicación
└── app.json         # Configuración global de Expo
```
