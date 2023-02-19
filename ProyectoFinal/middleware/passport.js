const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models/connection');

passport.use('autenticacion', new LocalStrategy( async (username, password, callback) => {
    const sql = "SELECT * FROM cuentas WHERE = ?"
    const users = storeUsuarios.getUsers();
    const user = await users.findOne({username: username});
    if(!user) return callback(new Error('USUARIO NO REGISTRADO'));
    if(bcrypt.compareSync(password, user.password)){
        // const orden = ContenedorOrdenes.crearOrden()
        return callback(null, user);
    }else{
        return callback(new Error('ERROR EN LA CONTRASEÑA'), null)
    }
}));


passport.serializeUser((user,callback) => {
    callback(null, user.id);
})

passport.deserializeUser(async (id, callback) => {
    const user = await ModelUser.findById(id);
    callback(null, user)
})

module.exports = passport;