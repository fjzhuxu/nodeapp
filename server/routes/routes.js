module.exports = function(app) {
	
	app.use(function(req, res, next){ 
		res.locals.session = req.session;
		next();
		});
	app.use('/', require('./index'));
	app.use('/users', require('./users'));
	if(app.get('env') === 'development') {
		// catch 404 and forward to error handler
		app.use(function(req, res, next) {
			var err = new Error('Not Found');
			err.status = 404;
			console.log('404');
			next(err);
		});
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});

};