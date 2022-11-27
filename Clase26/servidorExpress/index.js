const express = require('express');
const app = express();

const port = 3000;

app.use('/', express.static('public'))

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})