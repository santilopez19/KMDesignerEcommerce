const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes.js');
const productRoutes = require('./routes/product.routes.js');
const orderRoutes = require('./routes/order.routes.js');
const designRoutes = require('./routes/design.routes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error(err));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/designs', designRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Servidor corriendo en el puerto ${PORT}`));