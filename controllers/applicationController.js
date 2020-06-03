const path = require('path');
require('dotenv').config()

var bodyParser = require('body-parser');

// import urlencodedParser from 'urlencoded-parser';

// Configure Nodemailer
const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
    // host: 'smtp.mailtrap.io',
    // port: 2525,
    service : 'gmail',
    auth: {
       user: process.env.EMAIL_ID,
       pass: process.env.EMAIL_PASSWORD
    }
});

// Configure Twilio
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// Handle API call
module.exports = function(app, User){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/assets/html/index.html'));
  });

  app.post('/', function(req, res){
    // console.log(req.body['first-name']);

    // User.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
    //   console.log( post['_id'] );
    //   console.log("hi");
    // });

    var newUser = new User(req.body);

    // Save
    newUser.save()
    .then( item => {
      console.log(`Save of ${ req.body['name'] } is successful`);

      // Send mail
      const message = {
          from: process.env.EMAIL_ID, // Sender address
          to: req.body['emailID'],         // List of recipients
          subject: 'Application Successful!', // Subject line
          // text: 'Congrats!' // Plain text body
          html: '<h1>Congrats ' + req.body['name'] + '!! Application successful!</h1>\
          <p> Hope you have a really great time with us!</p>'
      };
      transport.sendMail(message, function(err, info) {
          if (err) {
            console.log(err)
          } else {
            console.log(info);
          }
      });

      // send message (comment if not required, $1 per sms)
      client.messages
        .create({
           body: 'Hey '+ req.body['name']+'! Your application is successful!',
           from: process.env.PHONE_NUMBER,
           to: `${ req.body['phoneNumber'] }`
         })
        .then(message => console.log(message.sid));

      // response page
      // res.sendFile(path.join(__dirname, '../public/assets/html/success.html'));
      res.status(200).send("Successful Application");
    })
    .catch( err => {
      res.status(400).send("Unsuccessful application");
    });

    // Printing all users till now
    // newUser.save(function(err){
    //   if(err){
    //        console.log(err);
    //        return;
    //   }
    // });
    // User.find({}).exec(function(err, result){
    //   if(!err)
    //    console.log(result);
    // });
    // res.sendFile(path.join(__dirname, '../public/assets/html/success.html'));

  });
}
