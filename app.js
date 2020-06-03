var express = require('express');
var app = express();
require('dotenv').config()

// Configure Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/application");

var userSchema = mongoose.Schema({
  name: String,
  emailID : String,
  phoneNumber : Number
});



var User = mongoose.model("User", userSchema);


// Define port
const PORT = process.env.PORT || 5000;


// Setup API, static files visible at URL ('/assets')
app.use(express.static(__dirname+'/public'));

var applicationController = require('./controllers/applicationController');

applicationController(app, User);

// Listen
var server = app.listen(PORT, function(){
  console.log(`Listening on ${ PORT }`);
});
