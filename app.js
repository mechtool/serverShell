let express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	cookieParser = require('cookie-parser'),
	route = require('./routes/index'),
	bodyParser = require('body-parser'),
	app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', [path.join(__dirname, 'dist')]);   //ngBundle/dist
app.set('port', process.env.PORT || 3000);
app.set('mongoDbUri', process.env.NODE_ENV == 'production' ?  process.env.MongoDbUrl : 'mongodb://sifon:1q2w3e4r5t@ds023624.mlab.com:23624/appsbase') ;

//app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
route(app);//маршрутизация
app.use('/src/assets', express.static('dist/assets')) ;
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist/assets')));
app.use(express.static(path.join(__dirname, 'dist/assets/fonts')));
app.use(express.static(path.join(__dirname, 'dist/pages')));
app.use(express.static('public'));

let server = app.listen(app.get('port'), function () {
	let port = server.address().port;
	console.log("App now running on port", port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
