const express = require('express');
const cors = require('cors');
const { FieldValue } = require('firebase-admin/firestore');
const admin = require('./admin');  // Importa la instancia inicializada

const app = express();
app.use(cors({ origin: true }));

// Configura CORS con opciones específicas
app.use(cors({
  origin: true, // Permite todas las origenes en desarrollo
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware para establecer headers CORS en cada respuesta
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      return res.status(200).end();
  }
  next();
});

const db = admin.firestore();

// Función de registro de perfil
app.post('/create', async (req, res) => {
    try {
        const { name, email } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ 
                error: 'Nombre y email son requeridos' 
            });
        }

        const profileRef = db.collection('profiles').doc();
        await profileRef.set({
            name,
            email,
            createdAt: FieldValue.serverTimestamp(), 
            imageUrl: null
        });

        res.status(200).json({ 
            id: profileRef.id,
            message: 'Perfil creado exitosamente' 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        
        const profileDoc = await db.collection('profiles').doc(profileId).get();
        
        if (!profileDoc.exists) {
            return res.status(404).json({ error: 'Perfil no encontrado' });
        }

        res.status(200).json(profileDoc.data());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = app;