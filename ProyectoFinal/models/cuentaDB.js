const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./connection');

class Cuentas extends Model {};

Cuentas.init({
    usuario: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(100),
    }
}, {
    sequelize,
    modelName: 'cuentas',
    timestamps: true,
});

module.exports = { 
    Cuentas
};