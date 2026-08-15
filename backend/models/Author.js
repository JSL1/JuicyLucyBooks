const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Author = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER
    },
    firstname: {
        type: DataTypes.String
    },
    lastname: {
        type: DataTypes.String
    }
});

