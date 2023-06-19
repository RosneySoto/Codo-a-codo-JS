require('dotenv').config();
const {Productos} = require('../models/productoDB');
const {Cuentas} = require('../models/cuentaDB');
const {tokenVerify, tokenSign} = require('../middleware/auth');

const agregarProductoGET = async (req, res) => {

    try {
        if( req.session.logueado === true ) {

            const token = req.headers.authorization.split(' ')[1];   
            const tokenData = await tokenVerify(token);
            
            if(Date.now() < tokenData.expiresIn ){
                return res.status(200).send({
                    titulo: 'Agregar Productos',
                    message: 'Estas en la vista de agregar productos'
                });
                // res.render('agregar-producto', {
                //     titulo: "Agregar producto"
                // });
            } else {
                return res.status(401).send({error: 'ERROR TOKEN EXPIRADO O NO VALIDO'});
            }
        } else {
            // res.redirect('/login');
            return res.status(401).send({ error: 'DEBE INICIAR SECION' })
        }
    } catch (error) {
        res.status(500).send({ error: 'ERROR NO TIENE AUTORIZACION' })
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