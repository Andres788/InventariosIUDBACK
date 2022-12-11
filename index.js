const express = require('express');
const { getConnection } = require('./db/db-connect-mongo');
require('dotenv').config();  
const cors = require('cors');

const usuario = require('./router/usuario')

const app = express();
const port = process.env.PORT 

app.use(cors()); 

getConnection();

app.use(express.json()); 

app.use('/usuario', usuario);
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/inventario', require('./router/inventario'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/auth', require('./router/auth'));

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
})
