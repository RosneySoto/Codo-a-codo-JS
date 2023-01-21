var express = require('express');
const router = express.Router();
const { adminGET, agregarProductoGET, editarProductoGET,loginUsuarioGET, agregarProductoPOST, editarProductoPOST, borrarProductoGET, loginUsuarioPOST} = require('../controllers/back');

router.get('/admin', adminGET);

router.get('/agregar-producto', agregarProductoGET);
router.post('/agregar-producto', agregarProductoPOST);

router.get('/editar-producto/:id', editarProductoGET);
router.post('/editar-producto/:id', editarProductoPOST);

router.get('/borrar-producto/:id', borrarProductoGET);

router.get('/login', loginUsuarioGET);
router.post('/login', loginUsuarioPOST);



module.exports = router;