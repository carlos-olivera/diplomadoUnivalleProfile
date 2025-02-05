# 📱 Aplicación de Perfiles con Firebase

¡Bienvenido a nuestra aplicación de ejemplo para aprender Firebase! Este proyecto es parte del modulo 6: Backend as a Service del diplomado de la Universidad del Valle.

## 🎯 ¿Qué aprenderás?

En este proyecto aprenderás a:
- Configurar un proyecto de Firebase
- Usar Firebase Emulators para desarrollo local
- Trabajar con Cloud Functions
- Manejar almacenamiento de archivos
- Implementar operaciones CRUD básicas

## 🛠️ Estructura del Proyecto

```
├── public/                  # Archivos públicos de la aplicación web
│   ├── index.html          # Página principal
│   ├── app.js              # Lógica de la aplicación
│   └── styles.css          # Estilos de la aplicación
├── functions/              # Funciones de Firebase
├── firestore.rules         # Reglas de seguridad para Firestore
├── storage.rules           # Reglas de seguridad para Storage
└── firebase.json          # Configuración de Firebase
```

## 💡 ¿Cómo funciona?

Esta aplicación permite:
1. Crear perfiles de usuario con nombre y email
2. Subir imágenes de perfil
3. Ver los perfiles creados

Todo esto utilizando:
- **Cloud Functions**: Para manejar la lógica del servidor
- **Cloud Storage**: Para almacenar las imágenes
- **Firestore**: Para guardar los datos de los perfiles

## 🚀 Cómo empezar

1. **Instala las dependencias**
   ```bash
   npm install
   ```

2. **Inicia los emuladores de Firebase**
   ```bash
   firebase emulators:start
   ```

3. **Abre la aplicación**
   - Ve a `http://localhost:5000` en tu navegador

## 📝 Conceptos Importantes

### Firebase Emulators
Los emuladores te permiten desarrollar y probar tu aplicación localmente sin usar recursos en la nube. Es como tener Firebase en tu computadora.

### Cloud Functions
Son funciones que se ejecutan en el servidor. En este proyecto las usamos para:
- Crear perfiles
- Manejar subida de imágenes
- Obtener información de perfiles

### Storage Rules
Las reglas en `storage.rules` controlan quién puede subir y descargar archivos. Es importante entenderlas para mantener segura tu aplicación.

## 🔍 Puntos de Aprendizaje Clave

1. **Manejo de Archivos**
   - Mira cómo se suben imágenes en `app.js`
   - Observa cómo se manejan las respuestas del servidor

2. **Seguridad**
   - Revisa las reglas en `firestore.rules` y `storage.rules`
   - Entiende cómo proteger tus datos

3. **Funciones del Servidor**
   - Explora la carpeta `functions` para ver cómo se procesan las peticiones
   - Aprende sobre las funciones HTTP de Firebase

## 🤔 ¿Necesitas ayuda?

- Revisa la [documentación de Firebase](https://firebase.google.com/docs)
- Explora el código fuente comentado
- Practica modificando pequeñas partes del código

## 🎉 Siguiente Nivel

Una vez que domines este ejemplo, intenta:
1. Agregar autenticación de usuarios
2. Implementar más funciones CRUD
3. Mejorar el diseño de la interfaz
4. Agregar validaciones adicionales

¡Feliz aprendizaje con Firebase! 🚀
