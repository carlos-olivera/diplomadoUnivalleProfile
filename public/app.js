// Configuración para emuladores
const PROJECT_ID = 'modulo6diplomado-a3096'; 
const REGION = 'us-central1';

// URLs de los emuladores
const FUNCTIONS_URL = `http://localhost:5001/${PROJECT_ID}/${REGION}`;
const PROFILES_API = `${FUNCTIONS_URL}/profiles`;
const IMAGES_API = `${FUNCTIONS_URL}/images`;

// Función para verificar la respuesta
async function handleResponse(response) {
    if (!response.ok) {
        const text = await response.text();
        try {
            // Intentar parsear como JSON
            const error = JSON.parse(text);
            throw new Error(error.error || 'Error en la petición');
        } catch (e) {
            // Si no es JSON, usar el texto completo
            throw new Error(`Error en la petición: ${text}`);
        }
    }
    return response.json();
}

async function callAPI(endpoint, method = 'GET', body = null) {
    try {
        const response = await fetch(`${FUNCTIONS_URL}${endpoint}`, {
            method,
            mode: 'cors', // Importante para CORS
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Crear perfil
async function createProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert('Por favor completa todos los campos');
        return;
    }

    try {
        const response = await fetch(`${PROFILES_API}/create`, {
            method: 'POST',
            mode: 'cors', // Importante para CORS
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        });

        const data = await handleResponse(response);
        if (data.id) {
            localStorage.setItem('profileId', data.id);
            document.getElementById('profile-form').style.display = 'none';
            document.getElementById('image-upload').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

// Subir imagen
async function uploadImage() {
    const file = document.getElementById('image').files[0];
    const profileId = localStorage.getItem('profileId');

    if (!file || !profileId) {
        alert('Por favor selecciona una imagen');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = await callAPI(`/images/upload/${profileId}`, 'POST', { 
                image: e.target.result 
            });
            
            if (data.url) {
                loadProfile(profileId);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al subir la imagen');
        }
    };
    reader.readAsDataURL(file);
}

// Cargar perfil
async function loadProfile(profileId) {
    try {
        const data = await callAPI(`/profiles/${profileId}`, 'GET');
        
        if (data) {
            document.getElementById('profile-image').src = data.imageUrl || '';
            document.getElementById('profile-name').textContent = data.name;
            document.getElementById('profile-email').textContent = data.email;

            document.getElementById('image-upload').style.display = 'none';
            document.getElementById('profile-display').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el perfil');
    }
}

// Cargar perfil existente si hay ID
const profileId = localStorage.getItem('profileId');
if (profileId) {
    loadProfile(profileId);
}