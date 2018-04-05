var mongoose = require('mongoose');
var Artwork = mongoose.model('Artwork');

module.exports.artworksGetAll = function(req, res) {

  Artwork
    .find()
    .exec(function(err, artworks) {
      if (err){
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(artworks);
      }
    });

}
