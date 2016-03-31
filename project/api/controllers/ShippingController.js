/**
 * ShippingController
 *
 * @description :: Server-side logic for managing shippings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  prices: function(req, res) {
    var grain = req.query.grain;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    ShippingService.prices(grain, startDate, endDate, function(prices){
      res.json(prices);
    });
  }

  // addRecord: function(req, res) {
  //   var grain = req.get('grain');
  //   var date = req.get('date');
  //   ShippingService.addRecord(grain, date, function(success) {
  //     res.json(success);
  //   });
  // }

  // addPort: function(req, res) {

  // }
};

