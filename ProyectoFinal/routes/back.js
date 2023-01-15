var express = require('express');
const router = express.Router();
const { adminGET, agregarProductoGET, editarProductoGET,loginUsuarioGET, agregarProductoPOST} = require('../controllers/back');

router.get('/admin', adminGET);

router.get('/agregar-producto', agregarProductoGET);
router.post('/agregar-producto', agregarProductoPOST);

router.get('/editar-producto', editarProductoGET);

router.get('/login', loginUsuarioGET);



module.exports = router;