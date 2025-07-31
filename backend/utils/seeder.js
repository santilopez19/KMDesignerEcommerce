const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/product.model.js');
const User = require('../models/user.model.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const products = [
    // --- PRODUCTOS PARA EL SHOWROOM ---
    {
        name: 'Remera Clásica de Algodón',
        description: 'Nuestra remera clásica, suave al tacto y perfecta para cualquier ocasión. 100% algodón peinado.',
        sku: 'REM-ALG-001',
        price: 25.99,
        stock: 150,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
        category: 'remeras',
        isCustomizable: false,
    },
    {
        name: 'Buzo con Capucha "Urbano"',
        description: 'Un buzo cómodo y abrigado, con interior de frisa. Ideal para el día a día.',
        sku: 'BUZ-CAP-001',
        price: 59.99,
        stock: 80,
        images: ['https://images.unsplash.com/photo-1556102192-3e274b859344?w=500'],
        category: 'buzos',
        isCustomizable: false,
    },
    {
        name: 'Gorra Trucker Bordada',
        description: 'Gorra estilo trucker con frente de gabardina y red trasera. Logo bordado de alta definición.',
        sku: 'GOR-TRU-001',
        price: 19.99,
        stock: 200,
        images: ['https://images.unsplash.com/photo-1588796869429-514c6e93e62f?w=500'],
        category: 'gorras',
        isCustomizable: false,
    },
    {
        name: 'Chomba Piqué Premium',
        description: 'Elegancia y comodidad en nuestra chomba de piqué, con cuello y puños tejidos.',
        sku: 'CHO-PIQ-001',
        price: 35.50,
        stock: 120,
        images: ['https://images.unsplash.com/photo-1622470953794-3a0020286aa3?w=500'],
        category: 'chombas',
        isCustomizable: false,
    },
    // --- PRODUCTOS BASE PARA EL DISEÑADOR ---
    {
    name: 'Remera Base para Diseño',
    description: 'Lienzo en blanco para tu creatividad. 100% algodón listo para estampar.',
    sku: 'BASE-REM-01',
    price: 15.00,
    stock: 9999,
    images: [
        '/remera_frente.png', // <-- CAMBIA ESTA LÍNEA
        '/remera_espalda.png'  // <-- Y ESTA LÍNEA
    ],
    category: 'bases',
    isCustomizable: true,
    },
 {
        name: 'Buzo Base (Diseñador V2)',
        description: 'Buzo SVG listo para el diseñador interactivo.',
        sku: 'SVG-BUZ-01',
        price: 38.00,
        stock: 9999,
        images: ['/mockups/hoodie.svg'], // <-- RUTA AL ARCHIVO SVG
        category: 'bases-svg',
        isCustomizable: true,
    },
    {
    name: 'Remera Base (Diseñador V2)',
    description: 'Remera SVG lista para el diseñador interactivo.',
    sku: 'SVG-REM-01',
    price: 18.00,
    stock: 9999,
    images: ['/mockups/tshirt.svg'],
    category: 'bases-svg',
    isCustomizable: true,
},
{
    name: 'Campera Base (Diseñador V2)',
    description: 'Campera SVG lista para el diseñador interactivo.',
    sku: 'SVG-CAM-01',
    price: 45.00,
    stock: 9999,
    images: ['/mockups/jacket.svg'],
    category: 'bases-svg',
    isCustomizable: true,
},
{
    name: 'Chomba Base (Diseñador V2)',
    description: 'Chomba SVG lista para el diseñador interactivo.',
    sku: 'SVG-CHO-01',
    price: 28.00,
    stock: 9999,
    images: ['/mockups/polo.svg'],
    category: 'bases-svg',
    isCustomizable: true,
}
];

const adminUser = {
    name: 'Admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin'
};

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Conectado para Seeder...');

        await Product.deleteMany();
        await User.deleteMany();

        await Product.insertMany(products);
        await User.create(adminUser);

        console.log('✅ Datos (Productos y Usuario Admin) Importados!');
        process.exit();
    } catch (err) {
        console.error(`Error al importar datos: ${err.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Conectado para Seeder...');

        await Product.deleteMany();
        await User.deleteMany();
        
        console.log('❌ Datos Destruidos!');
        process.exit();
    } catch (err) {
        console.error(`Error al destruir datos: ${err.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}