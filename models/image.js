var mongoose = require("mongoose");


var imageSchema = new mongoose.Schema({
    image_name:String,
    image_link:String






});

module.exports = mongoose.model("Image", imageSchema);
