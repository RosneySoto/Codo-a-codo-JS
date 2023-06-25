const { Cuentas } = require('./cuentaDB');
const { Productos } = require('./productoDB');
const { Carritos } = require('./carritoDB');

Carritos.belongsTo(Productos, { foreignKey: 'idProducto', as: 'productos' });
Productos.hasMany(Carritos, { foreignKey: 'idProducto', as: 'carrito' });

module.exports = { Carritos, Productos };