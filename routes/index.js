"use strict";
let fs = require('fs'),
	path = require('path');
function getRouter(app){
	app.get('/',(req, res, next)=>{  //home page
		res.render('index.html');
	});
}
module.exports = getRouter;