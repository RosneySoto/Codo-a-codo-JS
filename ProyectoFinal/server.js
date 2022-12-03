const express = require('express');
const app = express();
const hbs = require('hbs')
const products = require('./data/products.json')
const path = require('path');

const port = 3000;


app.set('view engine', 'hbs');
app.set('views', [
    path.join('./views/front'),
    path.join('./views/back'),
    path.join('./views')
]);
hbs.registerPartials(__dirname + '/views/partials');

app.use('/', express.static('public'));

//**************** FRONT ****************/

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

app.get('/como-compro', (req, res) => {
    res.render('como-compro',{
        titulo: "Como comprar"
    });
});

app.get('/contacto', (req, res) => {
    res.render('contacto',{
        titulo: "Contacto"
    });
});

app.get('/detalle-producto', (req, res) => {
    res.render('detalle-producto',{
        titulo: "Producto"
    });
});

app.get('/login', (req, res) => {
    res.render('login',{
        titulo: "Login de usuario"
    });
});



//**************** BACK ****************/

app.use((req, res) => {
    res.status(404).render('404', {
        titulo: '404 - No encontrado'
    })
})

app.listen(port, () => {
    console.log(`Servido escuchando en el puerto ${port}`);
});