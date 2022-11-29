const express = require('express');
const app = express();
const hbs = require('hbs')
const products = require('./data/products.json')

const port = 3000;


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use('/', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Mi pagina web',
        products: products.products
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        titulo: "Sobre Nosotros"
    });
});

app.listen(port, () => {
    console.log(`Servido escuchando en el puerto ${port}`);
});