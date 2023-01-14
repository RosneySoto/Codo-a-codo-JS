require('dotenv').config();
const db = require('../models/connection')

const indexGET = (req, res) => {

    let sql = 'SELECT * FROM productos WHERE destacado = 1';
    db.query(sql, (err, data) => {
        if(err) throw err

        res.render('index', {
            titulo: 'Mi pagina web',
            productos: data 
        })
    })
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