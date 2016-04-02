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
		// var port = req.query.port;
		// var grain = req.query.grain;
		// var year = req.query.year;
		// var date = req.query.date;
		// var price = req.query.price;
		// console.log(req.body.v);
		req.file('inputData').upload(function(err, uploadedFiles) {
			if (err) return res.send(500, err);
			
			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk(/* optional opts */);

			
			for (u in uploadedFiles) {
				var data = '';
				var chunk;
				var fs = require('fs');
				var readableStream = fs.createReadStream(uploadedFiles[u].fd);

				readableStream.on('readable', function() {
    				while ((chunk=readableStream.read()) != null) {
        				data += chunk;
    				}
				});

				readableStream.on('end', function() {
    				console.log(data)
				});

			}
			return res.json({
				message: uploadedFiles.length + ' file(s) uploaded successfully!',
				files: uploadedFiles
			});
		});

		// ShippingService.createRecord(port, grain, year, date, price, function(success) {
			// res.json("HI");
		// });
	}
};

