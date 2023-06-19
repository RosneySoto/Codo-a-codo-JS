require('dotenv').config();
const { Productos } = require('../models/productoDB');

let carritoCompras = [];

const viewCarrito = (req, res) => {
    // res.send({carritoCompras})
    res.render('carrito');
}

const addProductoCarrito = async (req, res ) => {

    const productoId = req.params.id;

    try {
        const productoFind = await Productos.findOne({
            where: {
                id: productoId
            }
        })
        if(!productoFind){ 
            res.send('NO EXISTE EL PRODUCTO SELECCIONADO');
        } else {
            carritoCompras.push({productoFind})
            res.send({carritoCompras})
        }

    } catch (error) {
        console.log('[ERROR]' + error)
    }
}

const deleteProductoCarrtito = (req, res) => {
    try {
        const productoId = parseInt(req.params.id);

        carritoCompras = carritoCompras.filter( (objeto) => objeto.productoFind.id !== productoId );
        res.send(carritoCompras);            

    } catch (error) {
        console.log('[ERROR]' +  error);
    };
};

module.exports = {
    addProductoCarrito,
    deleteProductoCarrtito,
    viewCarrito,
}