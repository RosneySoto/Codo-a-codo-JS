const express = require('express');
const app = express();
const hbs = require('hbs')
const products = require('./data/products.json')
const path = require('path');

const port = 8080;


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

app.get('/sobre-nosotros', (req, res) => {
    res.render('sobre-nosotros',{
        titulo: "Quienes somos"
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

app.get('/productos', (req, res) => {
    res.render('productos',{
        titulo: "Productos"
    });
});


//**************** BACK ****************/

app.get('/admin', (req, res) => {
    res.render('admin', {
        titulo: "Vista del administrador",
        products: products.products
    });
});

app.get('/agregar-producto', (req, res) => {
    res.render('agregar-producto', {
        titulo: "Agregar producto"
    });
});

app.get('/editar-producto', (req, res) => {
    res.render('editar-producto', {
        titulo: "Vista del administrador"
    });
});

app.get('/login', (req, res) => {
    console.log('estas en el login')
    res.render('login', {
        titulo: "Log In"
    });
});

app.use((req, res) => {
    res.status(404).render('404', {
        titulo: '404 - No encontrado'
    })
})

app.listen(port, () => {
    console.log(`Servido escuchando en el puerto ${port}`);
});