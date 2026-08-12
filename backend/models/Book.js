const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.String
    },
    pudate: {
        type: DataTypes.DATE
    },
    pubid: {
        type: DataTypes.INTEGER
    },
    cost: {
        type: DataTypes.FLOAT
    },
    retail: {
        type: DataTypes.FLOAT
    },
    discount: {
        type: DataTypes.FLOAT
    },
    category: {
        type: DataTypes. String
    }
});

