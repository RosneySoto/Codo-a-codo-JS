require('dotenv').config();
const db = require('../models/connection');
const bcrypt = require('bcrypt');
const {Cuentas, Productos} = require('../models/productoDB');

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

    const usuarioValidado = await Cuentas.findOne({ where: {usuario: usuario, password: clave} });

    if( usuario || clave ){
        if( usuarioValidado ){
            req.session.logueado = true; //Se crea al iniciar sesion, si no se inicia sesion no se crea.
            req.session.usuario = usuario;
            res.redirect('/admin');
        } else {
            res.render('login', {
                titulo: "Login",
                error: "Email de usuario o contraseña incorrecta"
            })
        };
    } else {
        res.render('login', {
            titulo: "Login",
            error: "Debe ingresar su usuario y password"
        });
    };
};

const registroUsuarioGET = (req, res) => {
    res.render('registro', {
        titulo: "Sign In"
    });
};

///////// CODIGO FUNCIONAL ////////////////////
// const registroUsuarioPOST = (req, res) => {

//     const info = req.body;

//     if (info.length < 0) {
//         res.render('registro', {
//             titulo: "Sign In",
//             error: "Debe ingresar un usuario y constraseña"
//         });

//     } else {
//         const sql = "INSERT INTO cuentas SET ?"
//         db.query(sql, info, (err, info) => {
//             if (err) throw err
//             console.log("Cuenta creada")
//             res.render("registro", {
//                 mensaje: "Cuenta Creada",
//                 titulo: "Sign In"
//             });
//         });
//     };
// };

const registroUsuarioPOST = async (req, res) => {

    const usuario = req.body.usuario;
    const clave = req.body.password;

    const usuarioExiste = await Cuentas.findOne({ where: { usuario: usuario}});

    try {
        if( usuarioExiste ){
            res.send('ERROR EL USUARIO EXISTE')
        } else {
            const nuevoUsuario = await Cuentas.create({usuario: usuario, password: clave})
            console.log(nuevoUsuario);
            res.render('registro', {
                mensaje: 'Cuenta Creada',
                titulo: 'Sign In'
            });
        };
    } catch (error) {
        console.log('[ERROR]' + error)
    }

    ///// REVISAR AQUI EL CODIGO PARA ENCRIPTAR ////////////////////////////////////////////////////////////
    // const sqlFindUser = "SELECT * FROM cuentas WHERE usuario = ?";
    // const insertUsuario = "INSERT INTO cuentas SET ?";

    // db.query(sqlFindUser, usuario, (err, usuario) => {
    //     if (usuario.length > 0) {
    //         // console.log(`ERROR: ${err}`)
    //         res.send('ERROR, EL USUARIO YA EXISTE')
    //     } else {
    //         const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    //         const usuarioHash = {
    //             usuario: req.body.usuario,
    //             password: passwordHash
    //         };
            
    //         db.query(insertUsuario, usuarioHash, (err, usuarioHash) => {
    //             if (err) throw err
    //             console.log("Cuenta creada")
    //             res.render("registro", {
    //                 mensaje: "Cuenta Creada",
    //                 titulo: "Sign In"
    //             });
    //         });
    //     };
    // });            
};

module.exports = {
    adminGET,
    loginUsuarioGET,
    loginUsuarioPOST,
    registroUsuarioGET,
    registroUsuarioPOST
}