const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
 app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));

app.use((req,res, next)=>{
  var now = new Date().toString();
  var log=`${now}: ${req.method}${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n');
  next();
})
 app .get('/',(req,res)=>{
  //  res.send('<h1>Hello Express  !!!</h1>');
// res.send({
//   name: 'Zakeer',
//   likes: [
//     'Biking',
//     'Cycling',
//     'Cities'
//   ]
// });
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
res.render('home.hbs',{
  pageTitle: 'AAK Vegetables',
  welcomeMessage: 'Welcome to my website',
  //currentYear: new Date().getFullYear()
})
 });
app.get('/about', (req,res)=>{
  // res.send('About Page ...');
  res.render('about.hbs',{
    pageTitle: 'ZAINA ZAKEER',
  //  currentYear : new Date().getFullYear()
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    error : "This request Failed",
    error_no: 'Error No: 404'
  });
});
 app.listen(3000,()=>{
   console.log('Server is up on port 3000');
 });
