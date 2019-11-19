var express = require('express');
var app = express();
var fs = require("fs");
var cron = require('node-cron');
const simpleGit = require('simple-git')();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'node.cron.mail@gmail.com',
               pass: '7411293797'
           }
       });

       const mailOptions = {
        from: 'cron@mail.com', // sender address
        to: 'sam.gagan95@gmail.com', // list of receivers
        subject: 'Git Push Mail', // Subject line
        html: '<p>Git Pushed successfully</p>'// plain text body
      };

var TimeStamp ;
cron.schedule('*/1 * * * *', () => {
        console.log('-----------------------------------------------------------------');
        // Add all files for commit
simpleGit.add('.')
.then(
   (response) => {
        TimeStamp = new Date();
      console.log('Git added successfully @ '+TimeStamp);

     // Commit files as Initial Commit
     simpleGit.commit('Intial commit by simplegit @ '+TimeStamp)
 .then(
    (response) => {
        TimeStamp = new Date();
      console.log('Git commit successfully @ '+TimeStamp);
      // Finally push to online repository
      simpleGit.push('origin','master')
 .then((success) => {
    console.log('Git successfully pushed');
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
 },(failed)=> {
    console.log('Git push failed');
});
     

   }, (error) => {
        TimeStamp = new Date();
      console.log('Git commit Failed @ '+TimeStamp);
});
   }, (error) => {
        TimeStamp = new Date();
      console.log('Git added Failed @ '+TimeStamp);
});
      });


var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})