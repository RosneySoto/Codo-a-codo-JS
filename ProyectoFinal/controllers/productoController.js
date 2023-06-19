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
                return res.status(401).send({error: 'Error token expirado o no valido'});
            }
        } else {
            // res.redirect('/login');
            return res.status(401).send({ error: 'Debe iniciar sesion' });
        }
    } catch (error) {
        res.status(500).send({ error: 'ERROR NO TIENE AUTORIZACION' });
        console.log('[ERROR]' + error);
    };
};

const agregarProductoPOST = async (req, res) => {

    try {
        if(req.session.logueado === true) {

            const token = req.headers.authorization.split(' ')[1];
            const tokenData = await tokenVerify(token);

            if(Date.now() < tokenData.expiresIn){
                const nuevoProducto = await Productos.create({
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    caracteristica: req.body.caracteristica,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    rutaImagen: req.body.rutaImagen,
                    destacado: req.body.destacado
                });
                res.status(200).send({
                    titulo: 'Agregar Producto',
                    message: 'Producto agregado correctamente',
                    producto: nuevoProducto,
                });
                // res.render("agregar-producto", { 
            } else {
                return res.status(401).send({error: 'Error token expirado o no valido'});
            };
        } else {
            res.status(401).send({ error: 'Debe iniciar sesion' });
            // res.redirect('/login');
        };
    } catch (error) {
        res.status(500).send({ error: 'ERROR NO TIENE AUTORIZACION' });
        console.log('[ERROR]' + error);
    };    
};

const editarProductoGET = async (req, res) => {
    const idProducto = req.params.id

    try {
        if(req.session.logueado === true){

            const token = req.headers.authorization.split(' ')[1];
            const tokenData = await tokenVerify(token);

            if(Date.now() < tokenData.expiresIn){

                const productoFind = await Productos.findOne({ 
                    where: {
                        id: idProducto
                    }
                });
                if( !productoFind ) {
                    res.send(`
                        <h1>No existe el producto con id ${idProducto}</h1>
                        <a href="/admin"> Ver listado de productos</a>
                    `);
                } else {
                    res.status(200).send({
                        titulo: "Vista del Administrador, editar",
                        productos: productoFind
                    });
                    // res.render('editar-producto', {
                    //     titulo: "Vista del administrador",
                    //     productos: productoFind
                    // });    
                };
            } else {
                return res.status(401).send({ error: 'Ddebe iniciar sesion' });
            }
        } else {
            return res.status(401).send({ error: 'Error en la verificacion o token no valido' });
            // res.redirect('/login');
        }
    } catch (error) {
        res.status(500).send({ error: 'ERROR NO TIENE AUTORIZACION' });
        console.log('[ERROR]' + error);
    };
};

const editarProductoPOST = async (req, res) => {
    const idProducto = req.params.id;
    const producto = req.body;
    
    try {
        if( req.session.logueado === true ){

            const token = req.headers.authorization.split(' ')[1];
            const tokenData = await tokenVerify(token);

            if(Date.now() < tokenData.expiresIn){
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
                });
                res.status(200).send({ 
                    message: 'Producto modificado correctamente'
                });
                // res.redirect('/admin');
            } else {
                res.status(401).send({ error: 'Errot token invalido o expirado'});
            }
        } else {
            res.status(401).send({ error: 'Debe iniciar sesion'});
            // res.redirect('/login');
        };
    } catch (error) {
        res.status(500).send({ error: 'ERROR NO AUTORIZADO'});
        console.log('[ERROR]' + error);
    };
};

const borrarProductoGET = async (req, res) => {
    const idProducto = req.params.id;

    try {
        if( req.session.logueado === true ) {

            const token = req.headers.authorization.split(' ')[1];
            const tokenData = await tokenVerify(token);

            if(Date.now() < tokenData.expiresIn){
                const productoDelete = await Productos.destroy({
                    where: {
                        id: idProducto
                    }
                });
                console.log('*** PRODUCTO ELIMINADO ***');
                return res.status(200).send({ message: 'producto eliminado correctamente'});
                // res.redirect('/admin');

            } else {
                return res.status(401).send({error: 'Error token expirado o no validado'});
            }
        } else {
            return res.status(401).send({error: 'Debe iniciar sesion'});
            // res.redirect('/login');
        }
    } catch (error) {
        console.log('[ERROR]' + error);
        res.status(500).send({ error: 'ERROR NO TIENE AUTORIZACION' });
    };    
};



module.exports = {
    agregarProductoGET,
    agregarProductoPOST,
    editarProductoGET,
    editarProductoPOST,
    borrarProductoGET,
};