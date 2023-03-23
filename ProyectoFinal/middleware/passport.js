const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Cuentas } = require('../models/productoDB');

passport.use('autenticacion', new LocalStrategy( async (usuario, password, callback) => {

    const usuarioFind = await Cuentas.findOne({ where: { usuario: usuario } });

    if(!usuarioFind) return callback(new Error('USUARIO NO REGISTRADO'));
    
    if(bcrypt.compareSync(password, usuarioFind.password)){
        return callback(null, usuarioFind);
    } else {
        return callback(new Error('ERROR EN LA CONTRASEÑA'), null)
    }
}));


passport.serializeUser((user,callback) => {
    callback(null, user.id);
})

passport.deserializeUser(async (idProducto, callback) => {
    const user = await Cuentas.findOne({ where: {id: idProducto} });
    callback(null, user)
})

module.exports = passport;