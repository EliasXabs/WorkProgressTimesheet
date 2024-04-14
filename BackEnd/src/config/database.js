const { Sequelize } = require('sequelize');

const dbName = 'WPTDB';
const user = 'root';
const password = null; // or your actual password if set
const host = 'localhost';
const dialect = 'mysql';

let sequelize;

async function initialize() {
    const sequelizeTemp = new Sequelize('', user, password, {
        host: host,
        dialect: dialect,
        logging: false
    });

    try {
        await sequelizeTemp.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        sequelizeTemp.close();

        sequelize = new Sequelize(dbName, user, password, {
            host: host,
            dialect: dialect,
            pool: {
                max: 50,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false }); // or true in development if needed
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        await sequelizeTemp.close();
        throw error;
    }
}

function getSequelize() {
    if (!sequelize) {
        throw new Error("Sequelize has not been initialized yet.");
    }
    return sequelize;
}

module.exports = { initialize, getSequelize };
