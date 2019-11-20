const Sequelize = require('sequelize');
const db = require('../config/database');
const users = require('../models/Users');


const posts = db.define('posts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            set: function(val) {
                this.setDataValue('title', val.trim());
            }
        },
        body: {
            type: Sequelize.TEXT,
            set: function(val) {
                this.setDataValue('body', val.trim());
            }
        },
        // photo: {
        //    type: Sequelize.BLOB,
        // },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: users,
                key: 'id'
            }
        }
    },
    {
        timestamp: true,
    });




module.exports = posts;