const functions = require('firebase-functions');
const admin = require('./src/admin');  // Importa la instancia inicializada
const profilesApp = require('./src/profiles');
const imagesApp = require('./src/images');

// Exportar las funciones HTTP
exports.profiles = functions.https.onRequest(profilesApp);
exports.images = functions.https.onRequest(imagesApp);