const express = require('express');
const app = express();
const hbs = require('hbs')
const path = require('path');
const session = require('express-session');
const MemoryStore = require('memorystore')(session)
const routesFront = require('./routes/front');
const routesBack = require('./routes/back');
require('./views/helpers/helpers');
const {PORT} = require('./config');
const sequelize = require('./models/connection');

const port = PORT;

//Sesiones mediante cookies
app.use(session({
    secret: 'jose',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      resave: false,
      secret: 'keyboard cat' // 5 minutos
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

    sequelize.sync({ force: false})
        .then(() => {
            console.log('Nos conectamos a la base de datos correctamente')
        })
        .catch(err => {
            console.log('Se ha producido un error al conectar la base de datos ' + err)
        })
});