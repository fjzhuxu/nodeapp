var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis')(session);

var consolidate = require('consolidate');
var options = {
     "host": "127.0.0.1",
     "port": "6379",
     "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天
};


var http = require('http');
var app = express();
var port = 3000;
var isDev = process.env.NODE_ENV !== 'production';
// view engine setup

app.use(session({
     store: new RedisStore(options),
     secret: 'express is powerful'
}));
app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './server/views'));
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
if(isDev){
	var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.js');

    var compiler = webpack(webpackDevConfig);

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {

        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
    require('./server/routes/routes')(app);
     var reload = require('reload');

    var server = http.createServer(app);
    reload(server, app);
    server.listen(port, function(){
        console.log('App (dev) is now running on port 3000!');
    });
    
}else{
	    require('./server/routes/routes')(app);
	var server = http.createServer(app);
server.listen(port, function(){
        console.log('App (dev) is now running on port 3000!');
    });
}

 
//app.use('/', routes);
//app.use('/users', users);

//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//var err = new Error('Not Found');
//err.status = 404;
//next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: err
//  });
//});
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//res.status(err.status || 500);
//res.render('error', {
//  message: err.message,
//  error: {}
//});
//});

//module.exports = app;
