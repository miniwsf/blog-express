var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var index = require('./dist/routes/index');
var login = require('./dist/routes/login');
var article=require('./dist/routes/article');
var articleType=require('./dist/routes/articleType');
// handlebars module
var handlebars=require('express3-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var app = express();
//session
var session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({
  layoutsDir: 'views',
  defaultLayout: 'layout',
  extname: '.hbs',
    partialsDir:__dirname + '/views/template/',
    helpers:{
       section: express_handlebars_sections()
    }

}));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/article', article);
app.use('/articleAdd', article);
app.use('/articleType', articleType);
app.use('/', index);
app.use('/blog', index);
app.use('/blogMore', index);
app.use('/home', index);
app.use('/abountMe', index);
app.use('/blogDeatil', index);

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'keyboard cat'
}));

/*检查文件*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404',{layout:null});
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error',{layout:null,msg:err.message});
});

app.listen(80);

module.exports = app;
