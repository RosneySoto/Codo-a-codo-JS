require('dotenv').config();
const db = require('../models/connection');
const nodemailer = require('nodemailer');
const {Cuentas, Productos} = require('../models/productoDB');

const indexGET = async (req, res) => {
    const products  = await Productos.findAll();
    res.render('index', {
        titulo: 'Mi pagina web',
        productos: products 
    });
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

const productosGET = async (req, res) => {

    const allProductos  = await Productos.findAll();
    res.render('productos', {
        titulo: 'Mi pagina web',
        productos: allProductos 
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
        subject: 'Info Ecommerce',
        text: `
            ${info.asunto}
            ${info.nombre}
            ${info.email}
            ${info.mensaje}
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
    productosGET,
    contactoPOST
};