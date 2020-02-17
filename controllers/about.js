const About = require('../models/About');  //model
const MediaGallery = require('../models/MediaGallery');  //model
const Gallery = require('../models/Gallery');  //model
const Media = require('../models/Media');  //model

exports.getAbout = async (req, res) => {
    Gallery.findAll({where: {id: 1},  include: [
            { model: Media}
        ],
    })
        .then(result => {
            res.json({result});
        })
};
