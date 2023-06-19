require('dotenv').config();
const {Productos} = require('../models/productoDB');
const {Cuentas} = require('../models/cuentaDB');
const { encrypt, compare } = require('../middleware/bcrypt-middle');
const jwt = require('jsonwebtoken');
const { tokenSign, tokenVerify } = require('../middleware/auth');

const adminGET = async (req, res) => {

    try {

        if( req.session.logueado === true ){
            const token = req.headers.authorization.split(' ')[1];
            const tokenData = await tokenVerify(token);

            if(Date.now() < tokenData.expiresIn){
                
                const listaProdutos = await Productos.findAll();

                res.status(200).send({
                    message: 'ESTAS EN ADMIN',
                    productos: listaProdutos
                });
            } else {
                res.status(401).send({ message: 'ERROR EN LA VERIFICACION O TOKEN EXPIRADO' });
            }
        } else {
            res.status(401).send({ message: 'ERROR DEBE INICIAR SESION' });
        }
        
    } catch (error) {
        res.status(500).send({ error: 'ERROR NO TIENE AUTORIZACION' })
        console.log(error)
    }   
};

const loginUsuarioGET = (req, res) => {
    res.status(200).send({ message: 'acceso confirmado', titulo: "Log In" });
    // res.render('login', {
    //     titulo: "Log In"
    // });
};

const loginUsuarioPOST = async (req, res) => {
    
    try {
        const usuario = req.body.usuario;
        const clave = req.body.password;

        if( !usuario || !clave ){
            res.status(401).send({
                error: 'Error: Debe ingresar usuario y contraseña'
            });
        } else {

            const usuarioValidado = await Cuentas.findOne({ where: { usuario: usuario } });

            if ( usuarioValidado ) {

                const checkPassword = await compare(clave, usuarioValidado.password);

                if(checkPassword){

                    req.session.logueado = true; //Se crea al iniciar sesion, si no se inicia sesion no se crea.
                    req.session.usuario = usuario;
                    /* TOKEN */
                    const tokenSession = await tokenSign(usuarioValidado);
                    
                    res.status(200).send({
                    data: usuario,
                    tokenSession
                    });
                } else {
                    res.status(401).send({
                        error: 'Error: contraseña incorrecta'
                    });
                }
            } else {
                res.status(401).send({
                    error: 'Error: Email de usuario incorrecta'
                });
                // res.render('login', {
                //     titulo: "Login",
                //     error: "Email de usuario o contraseña incorrecta"
                // });
            };
        };
    } catch (error) {
        console.log('[ERROR]' + error);
        res.status(500).send({ error: 'ERROR INTERNO' })
    };
};

const deslogueoUsuario = async (req, res) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenData = await tokenVerify(token);

        if( tokenData ){
            req.session.destroy(err => {
                if(!err) res.redirect('/login')
                else res.send({status: 'Logout ERROR', body: err});
            });
        }
    } catch (error) {
        console.log('[ERROR LOGOUT] ' + error)
    }
};

const registroUsuarioGET = (req, res) => {
    res.render('registro', {
        titulo: "Sign In"
    });
};


const registroUsuarioPOST = async (req, res) => {

    try {
        const { usuario, password } = req.body;

        if(!usuario || !password) return res.status(401).send({ message: 'NO DEBE HABER CAMPOS VACIOS' });
        
        const usuarioExiste = await Cuentas.findOne({ where: { usuario: usuario}});
        if( usuarioExiste ){
            res.status(401).send('ERROR EL USUARIO EXISTE');
        } else {
            let nuevoUsuario;

            const passwordHash = await encrypt(password);
            const tokenSession = await tokenSign(usuario);
            
            nuevoUsuario = await Cuentas.create({usuario: usuario, password: passwordHash, token: tokenSession});

            // res.cookie({ 'token': tokenSession }).json({ success: true, message: 'User registered successfully', data: nuevoUsuario })
            res.status(201).send({
                message: 'Usuario creado correctamente',
                data: nuevoUsuario
            });
            // res.render('registro', {
            //     mensaje: 'Cuenta Creada',
            //     titulo: 'Sign In'
            // });
        };
    } catch (error) {
        res.status(500).send({ error: 'ERROR INTERNO' })
        console.log('[ERROR]' + error);
    };       
};

module.exports = {
    adminGET,
    loginUsuarioGET,
    loginUsuarioPOST,
    deslogueoUsuario,
    registroUsuarioGET,
    registroUsuarioPOST,
}