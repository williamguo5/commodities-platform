module.exports = {
	getPrices: function(userID, grain, startDate, endDate, next) {
		Shipping.find({userID: userID, grain: grain, date: {'>=': new Date(startDate), '<=': new Date(endDate)} })
			.populate('portY1')
			.populate('portY2')
			.exec(function(err, prices) {
				if (err) throw err;
						
				// sails.log.error(err);
				culledPrices = [];
				for (price in prices) {
					record = prices[price];
					portPrices = {};
					portPrices["grain_type"] = record.grain;
					portPrices["date"] = (record.date.getDate() - 1) + "-" + 
										  (record.date.getMonth() + 1) + "-" + 
										  record.date.getFullYear();
					var sum = 0; 
					var count = 0;

					for (port in record.portY1) {
						// console.log(prices[price].portY1[port]);
						var pY1 = record.portY1[port];

						if (pY1 != null && pY1.hasOwnProperty('price')) {
							portPrices["price_" + pY1.name + "_Y1"] = pY1.price;
							sum += pY1.price;
							count++;
						}
							
					}
					if (sum == 0) {
						record.avgY1 = 0;
					} else {
						record.avgY1 = sum/count;
					}
					sum = 0;
					count = 0;
					for (port in record.portY2) {
						var pY2 = record.portY2[port];
						if (pY2 != null && pY2.hasOwnProperty('price')) {
							portPrices["price_" + pY2.name + "_Y2"] = pY2.price;
							sum += pY2.price;
							count++;
						}
					}
					if (sum == 0) {
						record.avgY2 = 0;
					} else {
						record.avgY2 = sum/count;
					}
					portPrices["average_Y1"] = record.avgY1;
					portPrices["average_Y2"] = record.avgY2;

					// console.log(portPrices);
					culledPrices.push(portPrices);
				}
				// console.log(prices);
				next(culledPrices);
			}
		);
	},

	createRecord: function(userID, port, grain, year, date, price) {
		var id;
		
		Shipping.findOrCreate({userID: userID, grain: grain, date: new Date(date)})
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
