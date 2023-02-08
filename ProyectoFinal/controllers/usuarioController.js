require('dotenv').config();
const db = require('../models/connection');
const bcrypt = require('bcrypt');

const adminGET = (req, res) => {

    const logueado = req.session.logueado

    if (logueado) {
        let sql = 'SELECT * FROM productos';
        db.query(sql, (err, data) => {
            if (err) throw err

            res.render('admin', {
                titulo: "Vista del administrador",
                logueado: logueado,
                usuario: req.session.usuario,
                productos: data
            });
        })
    } else {
        res.redirect('/login');
    };
};

const loginUsuarioGET = (req, res) => {
    res.render('login', {
        titulo: "Log In"
    });
};

const loginUsuarioPOST = (req, res) => {
    const usuario = req.body.usuario;
    const clave = req.body.password;

    if(usuario && clave){
        const sql = "SELECT * FROM cuentas WHERE usuario = ? AND password = ?"
        db.query(sql, [usuario, clave], (err, data) => {
            if(data.length > 0) {
                req.session.logueado = true //Se crea al iniciar sesion, si no se inicia sesion no se crea
                req.session.usuario = usuario
                res.redirect('/admin');
            } else {
                res.render('login', {
                    titulo: "Login",
                    error: "Email de usuario o contraseña incorrecta"
                })
            }
        })
    } else {
        res.render('login', {
            titulo: "Login",
            error: "Debe ingresar el Email y Password del usuario"
        })
    }

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

const registroUsuarioPOST = (req, res) => {

    const usuario = req.body;

    const sqlFindUser = `SELECT * FROM cuentas WHERE usuario = ?`;
    const insertUsuario = `INSERT INTO cuentas SET ?`;

    db.query(sqlFindUser, usuario, (err, data) => {
        if (data != "") {
            // console.log(`ERROR: ${err}`)
            res.send('ERROR, EL USUARIO YA EXISTE')
        } else {
            const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            const usuarioHash = {
                usuario: req.body.usuario,
                password: passwordHash
            };
            
            db.query(insertUsuario, usuarioHash, (err, usuarioHash) => {
                if (err) throw err
                console.log("Cuenta creada")
                res.render("registro", {
                    mensaje: "Cuenta Creada",
                    titulo: "Sign In"
                });
            });
        };
    });            
};

module.exports = {
    adminGET,
    loginUsuarioGET,
    loginUsuarioPOST,
    registroUsuarioGET,
    registroUsuarioPOST
}