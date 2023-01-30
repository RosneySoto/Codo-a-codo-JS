var express = require('express');
const router = express.Router();
const { agregarProductoGET, editarProductoGET, agregarProductoPOST, editarProductoPOST, borrarProductoGET } = require('../controllers/productoController');

const { adminGET, loginUsuarioGET, loginUsuarioPOST, registroUsuarioGET, registroUsuarioPOST } = require('../controllers/usuarioController')

router.get('/admin', adminGET);

router.get('/agregar-producto', agregarProductoGET);
router.post('/agregar-producto', agregarProductoPOST);

router.get('/editar-producto/:id', editarProductoGET);
router.post('/editar-producto/:id', editarProductoPOST);

router.get('/borrar-producto/:id', borrarProductoGET);

router.get('/login', loginUsuarioGET);
router.post('/login', loginUsuarioPOST);

router.get('/registro', registroUsuarioGET)
router.post('/registro', registroUsuarioPOST)



module.exports = router;