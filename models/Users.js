const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');
const posts = require('../models/Posts');


const users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        set: function (val) {
            this.setDataValue('firstName', val.trim());
        }
    },
    lastName: {
        type: Sequelize.STRING,
        set: function (val) {
            this.setDataValue('lastName', val.trim());
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        set: function (val) {
            this.setDataValue('email', val.trim());
        }
    },
    plainPassword: {
        type: Sequelize.VIRTUAL,
        set: function (val) {
            this.setDataValue('password', users.encryptPassword(val.trim()));
        }
    },
    password: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE
    }
},
    {
        timestamps: true
    });


//password hasing method
users.encryptPassword = function(password) {
    if(!password) return "";

    const hashPassword = bcrypt.hashSync(password, 10);
    if(!hashPassword) return "";
    return hashPassword;
};



users.hasMany(posts, {foreignKey: 'userId'});
posts.belongsTo(users, {foreignKey: 'userId'});

module.exports = users;