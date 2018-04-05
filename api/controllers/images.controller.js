var mongoose = require('mongoose');
var Image = mongoose.model('Image');

module.exports.imagesGetAll = function(req, res) {

  Image
    .find()
    .exec(function(err, images) {
      if (err){
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(images);
      }
    });

}
