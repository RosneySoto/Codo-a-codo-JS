require('dotenv').config();
const db = require('../models/connection');
const nodemailer = require('nodemailer');

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
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, data) => {
        if(err) throw err
        
        res.render('productos',{
            titulo: "Productos",
            productos: data
        });
    });
};

const contactoPOST = (req, res) => {
    const info = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        },
        tls: {
        rejectUnauthorized: false
        }
      });
      
      const mailOptions = {
        from: info.email,
        to: 'rosney.soto@gmail.com',
        subject: 'info.asunto',
        text: `
            <h1>${info.nombre}</h1>
            <p>${info.mensaje}</p>
        `
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).render('contacto', {
                mensaje: `Ha ocurrido el siguiente error ${error.message}`,
                mostrar: true,
                clase: 'danger'
            })
        } else {
            res.status(200).render('contacto', {
                mensaje: `Mail enviado correctamente`,
                mostrar: true,
                clase: 'success'
            })
        }
      });
}

module.exports = {
    indexGET,
    sobreNosotrosGET,
    comoComproGET,
    contactoGET,
    detalleProductoGET,
    productosGET,
    contactoPOST
};