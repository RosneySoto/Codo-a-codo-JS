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
    agregarProductoPOST,
    editarProductoGET,
    loginUsuarioGET
}