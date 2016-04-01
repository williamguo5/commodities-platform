module.exports = {
  prices: function(grain, startDate, endDate, next) {
    Shipping.find({grain: grain, date: {'>=': new Date(startDate), '<=': new Date(endDate)} })
        .populate('portY1')
        .populate('portY2')
        .exec(function(err,prices) {
        if (err) throw err;

        // for (price in prices) {
          // console.log(price); 
        // }

        next(prices);
    });
  }
};
