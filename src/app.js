'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var port = process.env.PORT || 3000;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Computer Not Working' });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact/send',(req, res) =>{
   var transporter = nodeMailer.createTransport({
       host: 'smtp.gmail.com',
       port: 465,
       secure: true, 
       auth: {
           user: 'ndesai.ittech@gmail.com',
           pass: 'margi280407',
       }
   });
   
   var mailOptions = {
       from: 'Nandish Desai <ndesai.ittech@gmail.com>',
       to: 'nandish_ccet@yahoo.co.in',
       subject: 'Website Submission',
       text: `You have a submission with following details... Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
       html: `<p>You have a submission with following details...</p><ul><li>Name: ${req.body.name} </li><li>Email: ${req.body.email} </li><li>Message: ${req.body.message} </li></ul>`
   }
   
   transporter.sendMail(mailOptions,(err, info)=>{
       if(err){
         console.log(err);
         res.redirect('/');  
       } else {
           console.log(`Message Sent: ${info.response}`);
           res.redirect('/');  
       }
   })
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

