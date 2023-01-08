var express = require('express');
const router = express.Router();
const { indexGET, sobreNosotrosGET, comoComproGET, contactoGET, detalleProductoGET, productosGET } = require('../controllers/front');

router.get('/', indexGET);

router.get('/sobre-nosotros', sobreNosotrosGET);

router.get('/como-compro', comoComproGET);

router.get('/contacto', contactoGET);

router.get('/detalle-producto', detalleProductoGET);

router.get('/productos', productosGET);

module.exports = router;