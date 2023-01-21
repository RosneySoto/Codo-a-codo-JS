const express = require('express');
const app = express();
const hbs = require('hbs')
const path = require('path');
const session = require('express-session')
const routesFront = require('./routes/front');
const routesBack = require('./routes/back');
require('./views/helpers/helpers')

const port = 8080;

//Sesiones mediante cookies
app.use(session({
    secret: 'jose',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 } // 5 minutos
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.set('view engine', 'hbs');
app.set('views', [
    path.join('./views/front'),
    path.join('./views/back'),
    path.join('./views')
]);
hbs.registerPartials(__dirname + '/views/partials');

app.use('/', express.static('public'));

app.use('/', routesFront);
app.use('/', routesBack);

app.use((req, res) => {
    res.status(404).render('404', {
        titulo: '404 - No encontrado'
    })
});

app.listen(port, () => {
    console.log(`Servido escuchando en el puerto ${port}`);
});