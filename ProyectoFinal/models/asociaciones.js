const cuentaDB = require('./cuentaDB');
const productoDB = require('./productoDB');
const ordenDB = require('./ordenDB');

cuentaDB.belongsToMany(ordenDB, {through: 'cuenta_orden'});
ordenDB.belongsTo(cuentaDB, {through: 'orden_cuenta'})