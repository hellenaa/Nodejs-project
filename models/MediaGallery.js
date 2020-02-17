const Sequelize = require('sequelize');
const db = require('../config/database');
const media = require('../models/Media');  //model
const gallery = require('../models/Gallery');  //model


const mediaGallery = db.define('media__gallery_media', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        gallery_id: {
            type: Sequelize.INTEGER,
            references: {
                model: gallery,
                key: 'id'
            }
        },
        media_id: {
            type: Sequelize.INTEGER,
            references: {
                model: media,
                key: 'id'
            }
        },
        position: {
            type: Sequelize.INTEGER,
        },
        enabled: {
            type: Sequelize.BOOLEAN,
        },
        updated_at: {
            type: Sequelize.DATE,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }

    },
    {
        timestamps: false,
        tableName: 'media__gallery_media',
    });




module.exports = mediaGallery;