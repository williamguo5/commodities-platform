module.exports = {
	getPrices: function(userID, grain, startDate, endDate, next) {
		Shipping.find({userID: userID, grain: grain, date: {'>=': new Date(startDate), '<=': new Date(endDate)} })
        	.populate('portY1')
        	.populate('portY2')
        	.exec(function(err, prices) {
				sails.log.error(err + "-" + grain + " not found in given dates");
	        	

				next(prices);
    		}
	    );
	},

	createRecord: function(userID, port, grain, year, date, price) {
		var id;
		
		Shipping.findOrCreate({userID: userID, grain: grain, date: new Date(date)})
			.exec(function(err, record) {
				sails.log.error(err);
				

				id = record.id;

				var ownerPortY1;
				var ownerPortY2;
				if (year == "CY1") {
					ownerPortY1 = id;
				} else {
					ownerPortY2 = id;
				}

				if (price == '') {
					price = 0;
				}

				Port.create({name:port, price: price, ownerPortY1: ownerPortY1, ownerPortY2: ownerPortY2})
					.exec(function(err, record) {
						sails.log.error(err + " - could not create new record");
						console.log(record);
					}
				);
			}
		);

		
		
			 		
	}
};
