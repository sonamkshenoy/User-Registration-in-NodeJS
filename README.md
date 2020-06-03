# User Registration in NodeJS
Registration of users along with Email and SMS notification and storage to MongoDB using Node.js and SemanticUI.  

## Description
The application allows users to register with their email and phone number. On registering, their details are stored in a database, MongoDB. Also, a notification is sent to them via e-mail and SMS. The POST request is done via AJAX and is hence a single page application. The unique id for each user is taken care of by MongoDB since it uses the current timestamp to create the ID. Validation of phone number is done using RegEx.    

## Tools
`Nodemailer` : To send emails  
`Twilio` : To send SMS

## Technologies
1. Node.js (Express.js)  
2. MongoDB (Mongoose)
3. Semantic UI

## Running the project  
```
node app
```

## Configuration Files
`dot.env` contains all the variables to be set before running the app.  
Create a `.env` file with these variables.


