// require('dotenv').config();
// const { Productos } = require('../models/productoDB');
// const { Cuentas } = require('../models/cuentaDB');
// const { Orden } = require('../models/ordenDB');

// const mostrarCarrito = async (req, res) => {
//     const pedido = await Orden.findOne({ 
//         where: {id: req.session.pedidoId},
//         include: Productos,
//     });
//     res.session({pedido});
// };

// const addCarrito = async (req, res) => {
//     const { productoId } = req.body;
//     let pedido = await Orden.findOne({
//         where: { id: req.session.pedidoId }
//     });

//     if(!pedido){ 
//         pedido = await Orden.create({ total: 0 });
//         req.session.pedidoId = pedido.id;
//     }
//     const producto = await Productos.findOne( { where: { id: productoId } });
//     await pedido.addProducto(producto, { through: { quantity: 1, price: producto.precio} });
//     pedido.total += producto.precio;
//     await pedido.save();
    
//     res.send({pedido});
// };

// const eliminarDelCarrito = async (req, res) => {
//     const { productoId } = req.body;
//     const pedido = await Orden.findOne({ where: {id: req.session.pedidoId }});
//     const producto = await Productos.findOne({ where: { id: productoId }});
//     await pedido.removeProducto(producto);
//     pedido.total -= producto.precio;
//     await pedido.save();

//     res.send({pedido});
// };

// const checkout = async (req, res) => {
//     const pedido = Orden.findOne({ where: { id: req.session.pedidoId }});
//     pedido.total = 0;
//     await pedido.save();
//     delete req.session.pedidoId;
//     res.send({pedido})
// }

// module.exports = {
//     mostrarCarrito,
//     addCarrito,
//     eliminarDelCarrito,
//     checkout,
// }

