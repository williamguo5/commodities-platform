var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var files = [];

var upload = multer({ dest: 'public/uploads' });

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('Will display list of all shipping data');
});

router.get('/getPrices', function(req, res, next) {
	var userID = req.query.userID;
	var grain = req.query.grain;
	var startDate = req.query.startDate;
	var endDate = req.query.endDate;

	
	if (userID == undefined) {
		res.send('No userID provided\n');
	} else if (files[userID] != true) {
		res.send('Invalid userID\n');
	} else if (grain == undefined) {
		res.send('No grain provided\n');
	} else if (isValidDate(startDate) && isValidDate(endDate)){
		grain = grain.toUpperCase();

		var PythonShell = require('python-shell');
		userID = 'public/uploads/' + userID
		var options = {
		  mode: 'text',
		  // pythonPath: 'path/to/python',
		  // pythonOptions: ['-u'],
		  scriptPath: '',
		  args: [userID, grain, startDate, endDate]
		};

		PythonShell.run('shippingAPI_v1.py', options, function (err, results) {
  			if (err) throw err;
  			// results is an array consisting of messages collected during execution
  			// console.log(results);
  			// console.log(results)


  			if (results != null && results[0] == 'Invalid grain!') {
  				res.send('Invalid grain!\n');
			} else {
				var jsonArr = [];
	  			for (i in results) {
	  				jsonArr[i] = JSON.parse(results[i]);
	  			}

				res.json(jsonArr);	
			}

  			

		});


		// currently reponds with the the query
		// use same query as before;
		// /shipping/getPrices?grain=AGP1&startDate=27-Jul-2015&endDate=31-Dec-2015
		// res.send(req.query);

		// TODO - run python script with the given params and return json.
	} else {
		res.send('Invalid date format. Enter date in the format dd-MMM-YYYY\n');
	}





});

router.post('/upload', upload.array('inputData', 1), function(req, res) {
	// console.log(req.files[0]);
	var dataKey = req.files[0].filename;
	files[dataKey] = true;
	//TODO - delete uploaded files that are over 24 hours old.
	res.json({
		"dataKey": dataKey,
		"message": "File uploaded successfully"
	});
});

module.exports = router;

function isValidDate(dateString) {
    // First check for the pattern
    if(!/^\d{1,2}\-[a-zA-Z]{3}\-\d{4}$/.test(dateString)){
        return false;
    }
    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[0], 10);
    var month = parts[1];
    var year = parseInt(parts[2], 10);
    // Check the ranges of month and year

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    var index = months.indexOf(month.toUpperCase());
    if (index < 0 || index > 11) {
    	return false;
    }
    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[index];
};
