// import keystone
var keystone = require('keystone');

// Set up our keystone instance
keystone.init({
	// The name of the KeystoneJS application
	'name': '554 FINAL',
	// Paths to our application static files
	'static': [
		'./server/public/css/',
		'./server/public/js/',
		'./server/public/img/movie',
		'./server/public/img/avatar',
	],
	'auto update': true,
	// The url for your MongoDB connection
	'mongo': 'mongodb://localhost/554_final_travelfrogs',
	// Whether to enable built-in authentication for Keystone's Admin UI,
	'auth': true,
	// The key of the Keystone List for users, required if auth is set to true
	'user model': 'User',
	// The encryption key to use for your cookies.
	'cookie secret': '6D61822FBEAED8635A4A522JFSJFL',
	'signout redirect' : "/"
});

// Load your project's Models
keystone.import('./server/models');

// Load routes
keystone.set('routes', require('./server/routes'));

// Start Keystone
keystone.start();
