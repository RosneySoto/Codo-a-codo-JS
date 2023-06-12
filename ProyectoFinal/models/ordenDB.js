const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./connection');

class Orden extends Model {};
// NECESITO ID DEL PEDIDO, EMAIL DEL CLIENTE, ARRAY DE OBJETOS

Orden.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require
    },
    idProducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
}, {
    sequelize,
    modelName: 'ordens',
    timestamps: true
});

module.exports = {
    Orden
}