var Person = require('../models/person');

module.exports = function(req, res, next) {
	var person = new Person(req.body.token);
	person.save(function(err){
		if (err) throw err;
		console.log('create successifully!');
	});
};
