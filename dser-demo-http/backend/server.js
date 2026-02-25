const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

/**
 * Definición de las opciones de Cors
 * permite conexiones desde cualquier origen
 * métodos de HTTP 
 * Expone el encabezado Etag para ser leido desde el cliente
 */
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['Etag', 'Last-Modified']
  };

// Middleware para servir archivos estáticos
app.use(express.static('public'));

/**
 * Cros-origin Reference Sharing 
 * Mecanismo que permite o restringe las solicitudes HTTP 
 * a recursos de diferentes orígenes (dominios, protocolos o puertos) 
 * distintos al origen desde el cual se carga la página web.
 * 
 * Política de seguridad que ayuda a evitar ataques como el 
 * Cross-Site Request Forgery
 */
app.use(cors(corsOptions));

/**
 * Definición de un endpoint de nuestra API
 */

const lastModified = new Date().toUTCString();

app.get('/data', (req, res) => {
    const data = {
        message: "Hola, este es la información en tu Caché :|"
    };

    //ETag basado en el contenido
    const etag = `"${Buffer.from(JSON.stringify(data)).toString('base64')}"`;
    console.log(`etag ${etag}`);

    const ifModifiedSince = req.headers['if-modified-since'];

    if (ifModifiedSince && new Date(ifModifiedSince) >= new Date(lastModified)) {
        res.status(304).end();
    } else {
        res.setHeader('Last-Modified', lastModified);
        res.json(data);
    }

    // Verificar si el cliente tiene el ETag
    if (req.headers['if-none-match'] === etag) {
        // El recurso no ha cambiado, responde con 304 Not Modified
        res.status(304).end();
    } else {
        // El recurso ha cambiado, responde con el ETag
        res.setHeader('ETag', etag);
        res.json(data);
    }
});

app.get('/pokemon', (req, res) => {
    const pokemon = {
        nombre: "pikachu",
        tipo: "electrico",
        poder: "rayos"
    };

    res.json(pokemon);
});

    app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
