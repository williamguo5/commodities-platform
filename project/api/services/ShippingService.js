
module.exports = {
	prices: function(grainType, startDate, endDate, next) {
		Shipping.find({grain: grainType, date: {'>=': new Date(startDate), '<=': new Date(endDate) } })
			.exec(function(err, prices) {
				if (err) throw err;
				next(prices);
		});
	}
}
