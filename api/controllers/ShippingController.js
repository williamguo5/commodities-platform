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

	createRecords: function(req, res) {
		// var port = req.query.port;
		// var grain = req.query.grain;
		// var year = req.query.year;
		// var date = req.query.date;
		// var price = req.query.price;
		console.log(req.body);
		req.file('inputData').upload(function(err, uploadedFiles) {
			if (err) return res.send(500, err);

			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk(/* optional opts */);

            var fs = require('fs');
			var fileContents = fs.readFileSync(uploadedFiles[0].fd, 'utf-8').toString();

            fileContents = fileContents.split('\n');
            for (var i = 0; i < fileContents.length; i++) {
                line = fileContents[i].split(',');

                var RIC = line[0].split('-');
                var port = RIC[0];
                var grain = RIC[1];
                var year = RIC[2];

                var date = line[1];
                var price = line[6];

                // ShippingService.createRecord(port, grain, year, date, price, function(success)) {
                //     res.json(success);
                // }
            }

			return res.json({
				message: 'File uploaded successfully!',
				files: uploadedFiles
			});
		});
	}
};

