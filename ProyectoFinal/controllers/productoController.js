require('dotenv').config();
const db = require('../models/connection');
const modelProducto = require('../models/productoDB');

const agregarProductoGET = (req, res) => {
    res.render('agregar-producto', {
        titulo: "Agregar producto"
    });
};

const agregarProductoPOST = (req, res) => {

	const data = req.body

    try {
        if(data){
            const nuevoProducto = new modelProducto(data);
            nuevoProducto.save();
            res.render("agregar-producto", { 
                mensaje: "Producto agregado",
                titulo: "Agregar producto"
            });
        }else {
            res.render("agregar-producto", { 
                mensaje: "No puede haber campos vacios",
                titulo: "Agregar producto"
            });
        }
            
    } catch (error) {
        console.log('****** ERROR AL AGREGAR EL PRODUCTO ******')
        throw new Error(error)
    }
    
};

const editarProductoGET = (req, res) => {
    const id = req.params.id
    const data = req.body

    const productoEditado = modelProducto.update({
        nombre: data.nombre,
        descripcion: data.descripcion,
        caracteristica: data.caracteristica,
        precio: data.precio,
        stock: data.stock,
        rutaImagen: data.rutaImagen,
        destacado: data.destacado
        }, {
            where: {
                id: data.id
            }
        })
    productoEditado.save();

    // const sql = " SELECT * FROM productos WHERE idProducto = ?";
    // db.query(sql, id, (err, data) => {
    //     if(err) throw err
    //     if(data.length > 0){
    //         res.render('editar-producto', {
    //             titulo: "Vista del administrador",
    //             productos: data[0]
    //         });
    //     } else {
    //         console.log('ID no encontrado')
    //         res.send(`
    //             <h1>No existe el producto con id ${id}</h1>
    //             <a href="/admin"> Ver listado de productos</a>
    //         `)
    //     };
    // });
};

const editarProductoPOST = (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    console.log(producto);
    const sql = "UPDATE productos SET ? WHERE idProducto = ?";

    db.query(sql, [producto, id], (err, data) => {
        if(err) throw err
        console.log(data);
        console.log(`${data.affectedRows} Registro Actualizado`);
        res.redirect('/admin');
    });
};

const borrarProductoGET = (req, res) => {
    const id = req.params.id

    const sql = "DELETE FROM productos WHERE idProducto = ?";
    db.query(sql, id, (err, data) => {
        if(err) throw err
        console.log(data.affectedRows + "Registro borrado")
        res.redirect('/admin');
    });
};



module.exports = {
    agregarProductoGET,
    agregarProductoPOST,
    editarProductoGET,
    editarProductoPOST,
    borrarProductoGET,
}