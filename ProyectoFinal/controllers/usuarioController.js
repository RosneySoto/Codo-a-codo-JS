require('dotenv').config();
const bcrypt = require('bcrypt');
const {Cuentas, Productos} = require('../models/productoDB');
const { encrypt, compare } = require('../middleware/bcrypt-middle');

const adminGET = async (req, res) => {

    const logueado = req.session.logueado;

        if(logueado){
            const listaProdutos = await Productos.findAll();
            res.render('admin', {
                titulo: "Vista del Administrador",
                logueado: logueado,
                usuario: req.session.usuario,
                productos: listaProdutos
            })
        } else {
            res.redirect('/login')
        };
};

const loginUsuarioGET = (req, res) => {
    res.render('login', {
        titulo: "Log In"
    });
};

const loginUsuarioPOST = async (req, res) => {
    const usuario = req.body.usuario;
    const clave = req.body.password;

    try {
        const usuarioValidado = await Cuentas.findOne({ where: { usuario: usuario } });
        const checkPassword = await compare(clave, usuarioValidado.password);

        if (usuario || clave) {
            if (checkPassword) {
                req.session.logueado = true; //Se crea al iniciar sesion, si no se inicia sesion no se crea.
                req.session.usuario = usuario;
                res.redirect('/admin');
            } else {
                res.render('login', {
                    titulo: "Login",
                    error: "Email de usuario o contraseña incorrecta"
                });
            };
        } else {
            res.render('login', {
                titulo: "Login",
                error: "Debe ingresar su usuario y password"
            });
        };
    } catch (error) {
        console.log('[ERROR]' + error)
    };
};

const registroUsuarioGET = (req, res) => {
    res.render('registro', {
        titulo: "Sign In"
    });
};


const registroUsuarioPOST = async (req, res) => {

    const usuario = req.body.usuario;
    const clave = req.body.password;

    try {
        const usuarioExiste = await Cuentas.findOne({ where: { usuario: usuario}});

        if( usuarioExiste ){
            res.send('ERROR EL USUARIO EXISTE')
        } else {
            const passwordHash = await encrypt(clave);
            const nuevoUsuario = await Cuentas.create({usuario: usuario, password: passwordHash})
            console.log(nuevoUsuario);
            res.render('registro', {
                mensaje: 'Cuenta Creada',
                titulo: 'Sign In'
            });
        };
    } catch (error) {
        console.log('[ERROR]' + error)
    };       
};

module.exports = {
    adminGET,
    loginUsuarioGET,
    loginUsuarioPOST,
    registroUsuarioGET,
    registroUsuarioPOST
}