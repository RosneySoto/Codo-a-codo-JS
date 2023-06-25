const express = require('express');
const app = express();
const hbs = require('hbs')
const path = require('path');
const routesFront = require('./routes/front');
const routesBack = require('./routes/back');
require('./views/helpers/helpers');
const {PORT} = require('./config');
const sequelizeConnection = require('./models/connection');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);

const port = PORT;


const sequelizeSessionStore = new SessionStore({
    db: sequelizeConnection
})

//Session
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_SESSION,
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000} // 1 minuto
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

    sequelizeConnection.sync({ force: false}) // Con la propiedad "force: true" obligo a que borre las tablas y las cree de nuevo
        .then(() => {
            console.log('Nos conectamos a la base de datos correctamente')
        })
        .catch(err => {
            console.log('Se ha producido un error al conectar la base de datos ' + err)
        })
});