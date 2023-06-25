const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./connection');
const { Productos } = require('./productoDB')

class Carritos extends Model {};
// NECESITO ID DEL PEDIDO, EMAIL DEL CLIENTE, ARRAY DE OBJETOS

Carritos.init({
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Productos,
          key: 'idProducto'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    
}, {
    sequelize,
    modelName: 'carritos',
    timestamps: false
});

module.exports = {
    Carritos
}