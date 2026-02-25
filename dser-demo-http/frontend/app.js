const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('demo'));

app.listen(port, () => {
    console.log(`Servidor de frontend corriendo en http://localhost:${port}`);
});