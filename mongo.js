const mongoose = require("mongoose");
require("dotenv").config();
var mongodbErrorHandler = require("mongoose-mongodb-errors");

mongoose.Promise = global.Promise;
mongoose.plugin(mongodbErrorHandler);

// mongoose.connect('mongodb://root:root123@ds043952.mlab.com:43952/cart', { useNewUrlParser: true });-->mlab
mongoose.connect("mongodb://localhost:27017/cart", { useNewUrlParser: true }); //Local Database
