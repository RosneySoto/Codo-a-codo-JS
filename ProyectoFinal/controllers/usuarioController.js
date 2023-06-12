require('dotenv').config();
const {Productos} = require('../models/productoDB');
const {Cuentas} = require('../models/cuentaDB');
const { encrypt, compare } = require('../middleware/bcrypt-middle');
const jwt = require('jsonwebtoken');
const { tokenSign, tokenVerify } = require('../middleware/auth');

const adminGET = async (req, res) => {

    try {
        const logueado = req.session.logueado;

        const token = req.headers.authorization.split(' ')[1];
        const tokenData = await tokenVerify(token);
        console.log(tokenData);
        
        if(Date.now() > tokenData.expiresIn){
            res.send({error: 'ERROR EN LA VERIFICACION O TOKEN EXPIRADO'});
        } else {
            // res.send({message: 'ESTAS EN ADMIN'});
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
        }
    } catch (error) {
        console.log(error)
    }   
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

        /* TOKEN */
        const tokenSession = await tokenSign(usuario);
        console.log(tokenSession);

        if (usuario || clave) {

            if (checkPassword) {
                req.session.logueado = true; //Se crea al iniciar sesion, si no se inicia sesion no se crea.
                req.session.usuario = usuario;
                
                // return res.cookie({"token": token}).json({success:true,message:'LoggedIn Successfully', token: token})
                // res.redirect('/admin');
                res.send({
                    data: usuario,
                    tokenSession
                })

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

        if(!usuario || !password) return res.json({ message: 'NO DEBE HABER CAMPOS VACIOS' })
        
        const usuarioExiste = await Cuentas.findOne({ where: { usuario: usuario}});
        if( usuarioExiste ){
            res.send('ERROR EL USUARIO EXISTE')
        } else {
            let nuevoUsuario;

            const passwordHash = await encrypt(password);

            const tokenSession = await tokenSign(usuario);
            
            nuevoUsuario = await Cuentas.create({usuario: usuario, password: passwordHash, token: tokenSession});

            res.cookie({ 'token': tokenSession }).json({ success: true, message: 'User registered successfully', data: nuevoUsuario })
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
    deslogueoUsuario,
    registroUsuarioGET,
    registroUsuarioPOST,
}