const Sequelize = require('sequelize');
const db = require('../config/database');


const about = db.define('abouts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false,
            set: function(val) {
                this.setDataValue('title', val.trim());
            }
        },
        gallery_id: {
            type: Sequelize.INTEGER,
            // references: {
            //     model: users,
            //     key: 'id'
            // }
        }
    },
    {
        timestamps: false,
    });




module.exports = about;