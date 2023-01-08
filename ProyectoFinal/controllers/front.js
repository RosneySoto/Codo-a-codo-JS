const products = require('../data/products.json');

const indexGET = (req, res) => {
    res.render('index', {
        titulo: 'Mi pagina web',
        products: products.products
    });
};

const sobreNosotrosGET = (req, res) => {
    res.render('sobre-nosotros',{
        titulo: "Quienes somos"
    });
};

const comoComproGET = (req, res) => {
    res.render('como-compro',{
        titulo: "Como comprar"
    });
};

const contactoGET = (req, res) => {
    res.render('contacto',{
        titulo: "Contacto"
    });
};

const detalleProductoGET = (req, res) => {
    res.render('detalle-producto',{
        titulo: "Producto"
    });
};

const productosGET = (req, res) => {
    res.render('productos',{
        titulo: "Productos"
    });
};

module.exports = {
    indexGET,
    sobreNosotrosGET,
    comoComproGET,
    contactoGET,
    detalleProductoGET,
    productosGET
};