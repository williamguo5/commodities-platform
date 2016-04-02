module.exports = {
	getPrices: function(grain, startDate, endDate, next) {
		Shipping.find({grain: grain, date: {'>=': new Date(startDate), '<=': new Date(endDate)} })
	        .populate('portY1')
	        .populate('portY2')
	        .exec(function(err, prices) {
		        if (err) throw err;
		    	next(prices);
	    	}
	    );
	}

	createRecord: function(port, grain, year, date, price, next) {
		Shiping.create({})
			.exec(function(err, record)) {
				if (err) throw err;
				next(record);
			}
	}
};
