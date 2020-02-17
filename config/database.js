const Sequelize = require('sequelize');

module.exports = new Sequelize('nodee', 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres',
    // timezone: config.timezone,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});