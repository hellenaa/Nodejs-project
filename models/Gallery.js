const Sequelize = require('sequelize');
const db = require('../config/database');
// const media = require('../models/Media');
// const mediaGallery = require('../models/MediaGallery');



const gallery = db.define('media__gallery', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
        },
        context: {
            type: Sequelize.STRING,
        },
        default_format: {
            type: Sequelize.STRING,
        },
        enabled: {
            type: Sequelize.BOOLEAN,
        },
        updated_at: {
            type: Sequelize.DATE,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        }

    },
    {
        tableName: 'media__gallery',
        timestamps: false
    });


module.exports = gallery;