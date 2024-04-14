const { Sequelize } = require('sequelize');

const dbName = 'WPTDB';
const user = 'root';
const password = null; // or your actual password if set
const host = 'localhost';
const dialect = 'mysql';

let sequelize;

async function initialize() {
    console.log('Starting database initialization...');
    const sequelizeTemp = new Sequelize('', user, password, { host, dialect, logging: false });

    try {
        console.log('Creating database if it does not exist...');
        await sequelizeTemp.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log('Database creation check completed.');

        sequelizeTemp.close();
        sequelize = new Sequelize(dbName, user, password, {
            host,
            dialect,
            pool: { max: 50, min: 0, acquire: 30000, idle: 10000 }
        });

        console.log('Authenticating database connection...');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        console.log('Synchronizing database...');
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        sequelizeTemp.close();
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
