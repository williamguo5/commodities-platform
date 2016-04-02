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

        ShippingService.getPrices(grain, startDate, endDate, function(prices) {
            res.json(prices);
        });
    },

    createRecord: function(req, res) {
        var port = req.query.port;
        var grain = req.query.grain;
        var year = req.query.year;
        var date = req.query.date;
        var price = req.query.price;

        ShippingService.createRecord(port, grain, year, date, price, function(success) {
            res.json(success);
        });
    }
};

