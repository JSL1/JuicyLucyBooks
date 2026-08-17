import { Sequelize } from 'sequelize';
import "dotenv/config";

const credentials = {
    uname: 'COMP214_M26_ers_4',
    pword:  'password',
    hostname: process.env.HOST,
    port: process.env.PORT,
    sid: process.env.SID
};

const sqlz = new Sequelize({
    dialect: 'oracle',
    username: credentials.uname,
    password: credentials.pword,
    dialectOptions: {
        connectString: `(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = ${credentials.hostname})(PORT = ${credentials.port}))(CONNECT_DATA = (SID = ${credentials.sid})))`
    },
    logging: console.log,
    dialectOptions: {
      connectTimeout: 60000,
      expireTime: 3
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
});

//app.use

export default sqlz;
