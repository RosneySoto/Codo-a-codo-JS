const jwt = require('jsonwebtoken');

const tokenSign = async (usuario) => {
    return jwt.sign(
        {
            id: usuario.id,
            usuario: usuario.usuario,
            // expiresIn: process.env.JWT_EXPIRE,
            expiresIn: Date.now() + 60 * 1000,
        },
        process.env.SECRET_KEY
    )
}

const tokenVerify = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        return null
    };
};

module.exports = {
    tokenSign,
    tokenVerify
}