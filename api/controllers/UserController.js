/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	genID: function(req, res) {
		// creates new user ID then servse up to client
		var key = UserService.randomKey();

		// TODO: create new key if already taken and redo

		// create user
		user.create({userID: key})
					.exec(function(err, record) {
						// sails.log.error(err);
						if (err) throw err;
						// console.log(record);
					}
				);

		return res.json({
			userID: key,
		});
		
	},
	
	clean: function(req, res) {
		// TODO:
		// removes all records user input
	},

	deleteUser: function(req, res) {
		// TODO:
		// removes all records for user THEN removes user
	}
};

