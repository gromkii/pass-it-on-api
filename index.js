const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  api = require('./routes/api'),
  userRoutes = require('./routes/users'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pass_dev');



app.use(express.static('public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  next();
});

app.use('/api', api);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log('Server is listening.');
});

module.exports = app;