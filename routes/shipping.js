var express = require('express');
var path = require('path');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('Will display list of all shipping data');
});

router.get('/getPrices', function(req, res, next) {
	// currently reponds with the the query
	// use same query as before;
	// /shipping/getPrices?grain=AGP1&startDate=27-Jul-15&endDate=31-Dec-15
	res.send(req.query);
});

router.post('/upload', function(req, res) {
	// var dateFile;

	// if (!req.files) {
	// 	return res.send('No files were uploaded.');
	// }

	// dateFile = req.files.inputData;
	// dataFile.mv(path.join(__dirname, 'public'), function(err) {
	// 	if (err) {
	// 		console.log("error saving file");
	// 		return res.status(500).send(err);
	// 	} else {
	// 		return res.json({"message": "File uploaded successfully"});
	// 	}
	// });

});

module.exports = router;
