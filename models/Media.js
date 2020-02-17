const Sequelize = require('sequelize');
const db = require('../config/database');
const gallery = require('../models/Gallery');
const mediaGallery = require('../models/MediaGallery');

const media = db.define('media__media', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        enabled: {
            type: Sequelize.BOOLEAN,
        },
        provider_name: {
            type: Sequelize.STRING,
        },
        provider_status: {
            type: Sequelize.INTEGER,
        },
        provider_reference: {
            type: Sequelize.STRING,
        },
        provider_metadata: {
            type: Sequelize.STRING,
        },
        width: {
            type: Sequelize.INTEGER,
        },
        height: {
            type: Sequelize.INTEGER,
        },
        length: {
            type: Sequelize.DECIMAL,
        },
        content_type: {
            type: Sequelize.STRING,
        },
        content_size: {
            type: Sequelize.INTEGER,
        },
        copyright: {
            type: Sequelize.STRING,
        },
        author_name: {
            type: Sequelize.STRING,
        },
        context: {
            type: Sequelize.STRING,
        },
        cdn_is_flushable: {
            type: Sequelize.BOOLEAN,
        },
        cdn_flush_identifier: {
            type: Sequelize.STRING,
        },
        cdn_flush_at: {
            type: Sequelize.DATE,
        },
        cdn_status: {
            type: Sequelize.INTEGER,
        },
        updated_at: {
            type: Sequelize.DATE,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },


    },
    {
        tableName: 'media__media',
        timestamps: false
    });


    gallery.belongsToMany(media, {
        through: {model: mediaGallery},
        foreignKey: 'gallery_id',
    });

    media.belongsToMany(gallery, {
        through: {model: mediaGallery},
        foreignKey: 'media_id',
    });





module.exports = media;