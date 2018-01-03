var express = require('express')
var app = express()
var apiRouter = require('./router/api-router')
var morgan = require('morgan')

app.use(express.static('../public'))
app.use(morgan('dev'))
app.use('/api', apiRouter) //REST service router

//main view
// app.get('/', function (req, res) {
//     res.send('../public/index.html')
// });

var port = process.env.port || 3000;
app.listen(port);
console.log('Server listening at port ' + port);