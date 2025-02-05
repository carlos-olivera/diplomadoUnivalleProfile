const express = require('express');
const cors = require('cors');
const admin = require('./admin');  // Importa la instancia inicializada

const app = express();
app.use(cors({
  origin: true,
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      return res.status(200).end();
  }
  next();
});

// Función de subida de imagen
app.post('/upload/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Imagen requerida' });
        }

        const imageBuffer = Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ''),
            'base64'
        );

        // Subir a Storage
        const bucket = admin.storage().bucket();
        const fileName = `profiles/${profileId}.jpg`;
        const fileRef = bucket.file(fileName);
        
        await fileRef.save(imageBuffer, {
            metadata: {
                contentType: 'image/jpeg'
            }
        });

        const url = `http://127.0.0.1:9199/v0/b/${process.env.GCLOUD_PROJECT}.firebasestorage.app/o/${encodeURIComponent(fileName)}?alt=media`;

        await admin.firestore()
            .collection('profiles')
            .doc(profileId)
            .update({ imageUrl: url });

        res.status(200).json({ 
            message: 'Imagen subida exitosamente',
            url 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = app;