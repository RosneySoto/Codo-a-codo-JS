const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./connection');

class Productos extends Model { };

Productos.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caracteristica: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rutaImagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destacado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'productos',
    timestamps: false,
});


class Cuentas extends Model {};

Cuentas.init({
    usuario: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'cuentas',
    timestamps: true,
});

module.exports = {
    Productos,
    Cuentas
};