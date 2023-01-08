const products = require('../data/products.json')

const adminGET = (req, res) => {
    res.render('admin', {
        titulo: "Vista del administrador",
        products: products.products
    });
};

const agregarProductoGET = (req, res) => {
    res.render('agregar-producto', {
        titulo: "Agregar producto"
    });
};

const editarProductoGET = (req, res) => {
    res.render('editar-producto', {
        titulo: "Vista del administrador"
    });
};

const loginUsuarioGET = (req, res) => {
    res.render('login', {
        titulo: "Log In"
    });
};

module.exports = {
    adminGET,
    agregarProductoGET,
    editarProductoGET,
    loginUsuarioGET
}