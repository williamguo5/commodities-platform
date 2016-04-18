var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var upload = multer({ dest: 'public/uploads' });

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('Will display list of all shipping data');
});

router.get('/getPrices', function(req, res, next) {
	// currently reponds with the the query
	// use same query as before;
	// /shipping/getPrices?grain=AGP1&startDate=27-Jul-15&endDate=31-Dec-15
	res.send(req.query);
	// TODO - run python script with the given params and return json.

});

router.post('/upload', upload.array('inputData', 1), function(req, res) {
	// console.log(req.files[0]);
	var dataKey = req.files[0].filename;
	//TODO - delete uploaded files that are over 24 hours old.
	res.json({
		"data-key": dataKey,
		"message": "File uploaded successfully"
	});
});

module.exports = router;
