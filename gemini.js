const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const { execSync } = require('child_process');

// 🔑 API Key de Gemini
//const API_KEY = process.env.GEMINI_API_KEY;

const API_KEY = 'AIzaSyB4b_L4B6x5nR3IC866smLz6wXTXozLJnA';
if (!API_KEY) {
    console.error('❌ Error: No se encontró la GEMINI_API_KEY en el archivo .env');
    process.exit(1);
}


// ✅ Archivos que querés modificar
const FILES = [
  'backend/controllers/auth.controller.js',
  'backend/controllers/design.controller.js',
  'backend/controllers/order.controller.js',
  'backend/controllers/product.controller.js',
  'backend/models/customDesign.model.js',
  'backend/models/order.model.js',
  'backend/models/product.model.js',
  'backend/models/user.model.js',
  'backend/routes/auth.routes.js',
  'backend/routes/design.routes.js',
  'backend/routes/order.routes.js',
  'backend/routes/product.routes.js',
  'backend/.env',
  'backend/package.json',
  'backend/server.js',
  'frontend/public/index.html',
  'frontend/src/components/Navbar.js',
  'frontend/src/components/ProductCard.js',
  'frontend/src/pages/AdminDashboardPage.js',
  'frontend/src/pages/DesignerPage.js',
  'frontend/src/pages/ECommercePage.js',
  'frontend/src/pages/HomePage.js',
  'frontend/src/services/api.js',
  'frontend/src/App.js',
  'frontend/src/index.js',
  'frontend/.gitignore',
  'frontend/package.json',
];

// ✅ Prompt general
const prompt = process.argv[2] || 'Refactorizá este código y mejorá los nombres de funciones';

function limpiarRespuesta(texto) {
    // Quita la primera línea (ej: ```javascript) y la última (```)
    const lineas = texto.split('\n');
    if (lineas[0].trim().startsWith('```')) {
        lineas.shift(); // Quita la primera línea
        lineas.pop();   // Quita la última
    }
    return lineas.join('\n');
}
async function proponerCambios(filePath) {
    console.log(`\n⏳ Procesando: ${filePath}...`);
    
    // Verifica que el archivo exista antes de leerlo
    if (!fs.existsSync(filePath)) {
        console.error(`❌ El archivo no existe: ${filePath}`);
        return;
    }

    const code = fs.readFileSync(filePath, 'utf-8');

    const payload = {
        contents: [{
            parts: [{
                text: `${prompt}\n\n## Código Original:\n\`\`\`javascript\n${code}\n\`\`\``
            }]
        }]
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error(`❌ Error de API para ${filePath}: ${response.statusText}`);
            return;
        }

        const data = await response.json();
        const textoGenerado = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (textoGenerado) {
            const nuevoCodigo = limpiarRespuesta(textoGenerado);
            
            // ✅ 3. NO sobrescribir. Guarda el resultado en un archivo .new para revisión manual.
            const nuevoPath = filePath + '.new';
            fs.writeFileSync(nuevoPath, nuevoCodigo);
            console.log(`✅ Propuesta guardada en: ${nuevoPath}`);
        } else {
            console.log(`❌ No se recibió contenido válido para ${filePath}.`);
            console.log('Respuesta recibida:', JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error(`❌ Falló la solicitud para ${filePath}:`, error);
    }
}

(async () => {
    console.log('🚀 Iniciando proceso de modificación de archivos...');
    for (const file of FILES) {
        await proponerCambios(file);
    }
    // ✅ 4. Se eliminan los 'git add' y 'git commit' automáticos.
    console.log('\n🏁 Proceso finalizado. Revisa los archivos .new generados y haz commit manualmente si estás de acuerdo con los cambios.');
})();