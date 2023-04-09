require('dotenv').config();
const {Cuentas, Productos} = require('../models/productoDB');

const agregarProductoGET = (req, res) => {

    try {
        if(req.session.logueado === true){
            res.render('agregar-producto', {
                titulo: "Agregar producto"
            });
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log('[ERROR]' + error);
    };
};

const agregarProductoPOST = async (req, res) => {

    try {
        if(req.session.logueado === true) {
            const nuevoProducto = await Productos.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                caracteristica: req.body.caracteristica,
                precio: req.body.precio,
                stock: req.body.stock,
                rutaImagen: req.body.rutaImagen,
                destacado: req.body.destacado
            })
            console.log(nuevoProducto);
            res.render("agregar-producto", { 
                mensaje: "Producto agregado",
                titulo: "Agregar producto"
            });
        } else {
            res.redirect('/login');
        };
    } catch (error) {
        console.log('[ERROR]' + error);
    };    
};

const editarProductoGET = async (req, res) => {
    const idProducto = req.params.id

    try {
        if(req.session.logueado === true){
            const productoFind = await Productos.findOne({ 
                where: {
                    id: idProducto
                } 
            })
    
            if( !productoFind ) {
                res.send(`
                    <h1>No existe el producto con id ${idProducto}</h1>
                    <a href="/admin"> Ver listado de productos</a>
                `)
            } else {
                res.render('editar-producto', {
                    titulo: "Vista del administrador",
                    productos: productoFind
                });    
            };
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
    };
};

const editarProductoPOST = async (req, res) => {
    const idProducto = req.params.id;
    const producto = req.body;
    
    try {
        if( req.session.logueado === true ){
            const nuevoProducto = await Productos.update({
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                caracteristica: producto.caracteristica,
                precio: producto.precio,
                stock: producto.stock,
                rutaImagen: producto.rutaImagen,
                destacado: producto.destacado
            }, 
            {
                where: { id: idProducto }
            })
            console.log('SE MODIFICO CORRECTAMENTE')
            // console.log(nuevoProducto);
            res.redirect('/admin');
        } else {
            res.redirect('/login');
        };
    } catch (error) {
        console.log('[ERROR]' + error);
    };
};

const borrarProductoGET = async (req, res) => {
    const idProducto = req.params.id

    try {
        if( req.session.logueado === true ) {
            const productoDelete = await Productos.destroy({
                where: {
                    id: idProducto
                }
            });
            console.log('PRODUCTO ELIMINADO');
            // res.send('Producto eliminado')
            res.redirect('/admin');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log('[ERROR]' + error);
    };    
};



module.exports = {
    agregarProductoGET,
    agregarProductoPOST,
    editarProductoGET,
    editarProductoPOST,
    borrarProductoGET,
}