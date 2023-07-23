require('dotenv').config();
const { Model } = require('sequelize');
// const {Productos} = require('../models/productoDB');
// const { Carritos } = require('../models/carritoDB');
const { Carritos, Productos } = require('../models/asociaciones');
const sequelize = require('../models/connection');
let carritoCompras = [];

const viewCarrito = (req, res) => {
  try {
    res.status(200).send({ carritoCompras });
  } catch (error) {
    res.status(404).send({ error: 'Error Interno' + error });
  }
  // res.render('carrito');
};

const addProductoCarrito = async (req, res) => {

  try {
    const productoId = req.params.id;
    const { cantidad } = req.body

    if (!cantidad) {
      return res.status(400).json({ error: 'La cantidad es requerida' });
    }
    // Verificar si el artículo ya está en el carrito
    const itemEnCarrito = await Carritos.findOne({
      where: { idProducto: productoId },
    });

    if (itemEnCarrito) {
      // Si el artículo ya está en el carrito, actualizar la cantidad
      itemEnCarrito.cantidad += cantidad;
      await itemEnCarrito.save();
    } else {
      // Si el artículo no está en el carrito, crear un nuevo registro
      await Carritos.create({
        idProducto: productoId,
        cantidad: cantidad,
      });
    }

    res.status(200).json({ message: 'Artículo agregado al carrito correctamente' });
  } catch (error) {
    console.error('Error al agregar artículo al carrito:', error);
    res.status(500).json({ error: 'Ocurrió un error al agregar el artículo al carrito' });
  };
};

async function obtenerContenidoCarrito(req, res) {
  try {
    const carritos = await Carritos.findAll({
      include: {
        model: Productos,
        as: 'productos',
        attributes: ['idProducto', 'nombre', 'precio'],
      },
      attributes: ['id', 'cantidad']
    });

    const respuesta = carritos.map((carrito) => {
      // Verificar si carrito.productos es un objeto y convertirlo en una matriz
      const productos = Array.isArray(carrito.productos) ? carrito.productos : [carrito.productos];

      return {
        carritoId: carrito.id,
        productos: productos.map((producto) => ({
          idProducto: producto.idProducto,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: carrito.cantidad,
        })),
      };
    });

    res.status(200).json({ respuesta });
  } catch (error) {
    console.error('Error al obtener el contenido del carrito:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el contenido del carrito' });
  }
};

const deleteProductoCarrtito = (req, res) => {
  // try {
  //     const productoId = parseInt(req.params.id);

  //     carritoCompras = carritoCompras.filter( (objeto) => objeto.productoFind.id !== productoId );
  //     res.status(200).send(carritoCompras);            

  // } catch (error) {
  //     console.log('[ERROR]' +  error);
  // };
};

module.exports = {
  addProductoCarrito,
  deleteProductoCarrtito,
  viewCarrito,
  obtenerContenidoCarrito
}