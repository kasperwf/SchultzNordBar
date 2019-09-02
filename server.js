var express = require('express');
var reload = require('express-reload');
var app = express();
var path = __dirname + '/app/';

app.use(reload(path));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send('Something went wrong!!');
});
app.listen(3000, () => console.log('Listening on 3000'));
