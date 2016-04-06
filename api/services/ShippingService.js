module.exports = {
	getPrices: function(grain, startDate, endDate, next) {
		Shipping.find({grain: grain, date: {'>=': new Date(startDate), '<=': new Date(endDate)} })
    	.populate('portY1')
    	.populate('portY2')
    	.exec(function(err, prices) {
				if (err) throw err;
        		
				// sails.log.error(err);
	        	
				for (price in prices) {
					// console.log(prices[price].portY1.length);
					var sum = 0; 
					var count = 0;
					for (port in prices[price].portY1) {
						// console.log(prices[price].portY1[port]);
						var pY1 = prices[price].portY1[port];

						if (pY1 != null && pY1.hasOwnProperty('price')) {
							sum += pY1.price;
							count++;
						}
							
					}
					if (sum == 0) {
						prices[price].averageY1 = 0;
					} else {
						prices[price].averageY1 = sum/count;
					}
					sum = 0;
					count = 0;
					for (port in prices[price].portY2) {
						var pY2 = prices[price].portY2[port];
						if (pY2 != null && pY2.hasOwnProperty('price')) {
							sum += pY2.price;
							count++;
						}
					}
					if (sum == 0) {
						prices[price].averageY2 = 0;
					} else {
						prices[price].averageY2 = sum/count;
					}

				}

				next(prices);
    		}
	    );
	},

	createRecord: function(port, grain, year, date, price) {
		var id;
		
		Shipping.findOrCreate({grain: grain, date: new Date(date)})
			.exec(function(err, record) {
				// sails.log.error(err);
				if (err) throw err;
				

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
						// sails.log.error(err);
						if (err) throw err;

						// console.log(record);
					}
				);
			}
		);

		
		
			 		
	}
};
