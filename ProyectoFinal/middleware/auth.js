const jwt = require('jsonwebtoken');

const tokenSign = async (usuario) => {
    try {
        let token = jwt.sign(
            {
                id: usuario.id,
                usuario: usuario.usuario,
                // expiresIn: process.env.JWT_EXPIRE,
                expiresIn: Date.now() + 60 * 1000,
            },
            process.env.SECRET_KEY
        )
        return token;
    } catch (error) {
        console.log('[ERROR EN LA FIRMA DEL TOKEN] ' + error);
    };
};

const tokenVerify = async (token) => {
    try {
        let tokenVerificado = jwt.verify(token, process.env.SECRET_KEY);
        return tokenVerificado;
    } catch (error) {
        console.log('[ERROR EN LA VERIFICACION DEL TOKEN] ' + error);
        return error;
    };
};

module.exports = {
    tokenSign,
    tokenVerify
}