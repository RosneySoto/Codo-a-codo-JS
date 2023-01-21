require('dotenv').config();
const db = require('../models/connection')

const adminGET = (req, res) => {
    let sql = 'SELECT * FROM productos';
    db.query(sql, (err, data) => {
        if(err) throw err
        
        res.render('admin', {
            titulo: "Vista del administrador",
            productos: data
        });
    })
};

const agregarProductoGET = (req, res) => {
    res.render('agregar-producto', {
        titulo: "Agregar producto"
    });
};

const agregarProductoPOST = (req, res) => {

	const info = req.body
	const sql = "INSERT INTO productos SET ?"
    
	db.query(sql, info, (err, info) => {
		if (err) throw err
		console.log("Producto agregado")
		res.render("agregar-producto", { 
			mensaje: "Producto agregado",
			titulo: "Agregar producto"
		})
	})


}

const editarProductoGET = (req, res) => {
    const id = req.params.id
    const data = req.body
    const sql = " SELECT * FROM productos WHERE idProducto = ?";
    db.query(sql, id, (err, data) => {
        if(err) throw err
        if(data.length > 0){
            res.render('editar-producto', {
                titulo: "Vista del administrador",
                productos: data[0]
            });
        } else {
            console.log('ID no encontrado')
            res.send(`
                <h1>No existe el producto con id ${id}</h1>
                <a href="/admin"> Ver listado de productos</a>
            `)
        };
    });
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

const loginUsuarioGET = (req, res) => {
    res.render('login', {
        titulo: "Log In"
    });
};

module.exports = {
    adminGET,
    agregarProductoGET,
    agregarProductoPOST,
    editarProductoGET,
    loginUsuarioGET,
    editarProductoPOST,
    borrarProductoGET
}