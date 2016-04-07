/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	adore: function (req, res) {
    	res.send("I adore pets!");
  	},

	genID: function(req, res) {
		// creates new user ID then servse up to client
		var key = UserService.randomKey();

		// TODO: create new key if already taken

		return res.json({
			userID: key,
		});
		
	},
	
	clean: function(req, res) {
		// to do
		// removes all records user input
	}
};

