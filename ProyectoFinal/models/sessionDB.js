const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./connection');

class Sessions extends Model { };

Sessions.init({
    sid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    expires: {
        type: DataTypes.DATE
    },
    data: {
        type: DataTypes.STRING(50000)
    }
}, {
    sequelize,
    modelName: 'sessions',
    timestamps: false,
});

module.exports = {
    Sessions
};