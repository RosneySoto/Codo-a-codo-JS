var express = require('express');
const router = express.Router();
const { agregarProductoGET, editarProductoGET, agregarProductoPOST, editarProductoPOST, borrarProductoGET } = require('../controllers/productoController');

const { adminGET, loginUsuarioGET, loginUsuarioPOST, registroUsuarioGET, registroUsuarioPOST, deslogueoUsuario } = require('../controllers/usuarioController');
const passport = require('../middleware/passport');

const { mostrarCarrito, addCarrito, eliminarDelCarrito, checkout } = require('../controllers/ordenController');

const { addProductoCarrito, viewCarrito, deleteProductoCarrtito, obtenerContenidoCarrito } = require('../controllers/carritoController');


router.get('/admin', adminGET);

router.get('/agregar-producto', agregarProductoGET);
router.post('/agregar-producto', agregarProductoPOST);

router.get('/editar-producto/:id', editarProductoGET);
router.put('/editar-producto/:id', editarProductoPOST);

router.delete('/borrar-producto/:id', borrarProductoGET);

router.get('/login', loginUsuarioGET);
router.post('/login', loginUsuarioPOST);
router.get('/logout', deslogueoUsuario);

router.get('/registro', registroUsuarioGET);
router.post('/registro', registroUsuarioPOST);

// router.get('/orden', mostrarCarrito);
// router.post('/agregar-a-carrito', addCarrito);
// router.post('/remover-del-carrito', eliminarDelCarrito);
// router.post('/checkout', checkout);

router.get('/carrito', viewCarrito);
router.get('/vista-carrito', obtenerContenidoCarrito);
router.post('/carrito/:id', addProductoCarrito);
router.delete('/carrito/:id', deleteProductoCarrtito);


module.exports = router;