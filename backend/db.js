const {Sequelize } = require('sequelize');

const credentials = {
    uname: import.meta.env.USERNAME,
    pword: import.meta.env.PASSWORD,
    hostname: import.meta.env.HOSTNAME,
    port: import.meta.env.PORT,
    sid: import.meta.env.SID
};

const sequelize = new Sequelize({
    dialect: 'oracle',
    username: uname,
    password: pword,
    dialectOptions: {
        connectString: `(DESCRIPTION = (ADDRESS = ( PROTOCOL = TCP)(HOST = ${import.meta.env.HOST})(HOST = ${import.meta.env.PORT}))(CONNECT_DATA = (SID = ${import.meta.env.SID})))`
    }
});

module.exports = sequelize;

