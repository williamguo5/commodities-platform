/**
 * ShippingController
 *
 * @description :: Server-side logic for managing shippings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getPrices: function(req, res) {
        var grain = req.query.grain;
        var startDate = req.query.startDate;
        var endDate = req.query.endDate;
        ShippingService.getPrices(grain, startDate, endDate, function(getPrices){
            res.json(getPrices);
        });
    }

    createRecord: function(req, res) {
        var port = req.query.port;
        var grain = req.query.grain;
        var year = req.query.year;
        var date = req.query.date;
        var price = req.query.price;
        ShippingService.createRecord(port, grain, year, date, price, function(createRecord) {
            res.json(createRecord);
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

