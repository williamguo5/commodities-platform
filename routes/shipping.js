var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var files = [];
var fileNamesToKey = [];

var upload = multer({ dest: 'public/uploads' });
var index = 1;

/* GET users listing. */
router.get('/', function(req, res, next) {
	var userID = req.query.userID;

	var PythonShell = require('python-shell');
		if (userID == 'default'){
			userID = 'testData.csv';
		} else {
			userID = 'public/uploads/' + userID;
		}
		var options = {
		  mode: 'text',
		  // pythonPath: 'path/to/python',
		  // pythonOptions: ['-u'],
		  scriptPath: '',
		  args: [userID]
		};

	PythonShell.run('getGrainsAndPorts.py', options, function (err, results) {
		
		if (results == null || results[0] == 'File not found') {
			res.send('Invalid userID');
		} else {
			res.json(JSON.parse(results));
		}
	});	
	// res.send('Will display list of all shipping data');
});

// Gets news from a text file which contains the cached result of the news api
router.get('/getNews', function(req, res, next) {
	var fs = require('fs');
	fs.readFile('news.txt', 'utf8', function(err, contents) {
		res.json(JSON.parse(contents));
	});
});

// Gets relevant news from news api
router.get('/getRelevantNews', function(req, res, next) {

	var request = require('superagent');

	var date = req.query.date;

	// Parse the date parts to integers
    var parts = date.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);


	var endDate = new Date(year, month - 1, day + 1);

	var startDate;
	// Go back 1 week
	if (endDate.getMonth() < 11 && endDate.getFullYear() <= 2015 && endDate.getDay() < 9) {
		startDate = new Date(2015, 10 - 1, 1 + 1);
	} else {
		startDate = endDate;
		startDate.setTime(startDate.getTime() - (7*24*3600000));

	}
	startDate.setUTCHours(0, 0, 0, 0);
	endDate.setUTCHours(0, 0, 0, 0);	

	// Sends a superagent request to news api
	request.post('http://pacificpygmyowl.herokuapp.com/api/query')
		.send({"start_date" : startDate.toISOString(), "end_date" : endDate.toISOString(),
				"instr_list": "[GNC.AX]", 
				"tpc_list": "[GRA, WEA, LIV, MEAL, USDA, GMO, BEV, AFE, ]"})
  		.end(function(err, result){
    		// Calling the end function will send the request
    		var j = 0;
    		var jsonArr = [];
    		for (i in result.body) {
    			if(/(wheat|canola|barley|grain)/.test(result.body[i].headline) ||
    			   /(wheat|canola|barley|grain)/.test(result.body[i].body)){

    				var obj = {};
    				obj["headline"] = result.body[i].headline;
    				obj["body"] = result.body[i].body; 	
    			   	jsonArr.push(obj);

				}

    		}
    		res.json(jsonArr);
  		}
	);
});

// Gets the prices given start date, end date, grain and port
router.get('/getPrices', function(req, res, next) {
	var userID = req.query.userID;
	var grain = req.query.grain;
	var startDate = req.query.startDate;
	var endDate = req.query.endDate;
	var port = req.query.port;

	if (userID == undefined) {
		res.send('No userID provided\n');
	} 
	// else if (files[userID] != true) {
	// 	res.send('Invalid userID\n');
	// } 
	else if (grain == undefined) {
		res.send('No grain provided\n');
	} else if (isValidDate(startDate) && isValidDate(endDate)){
		grain = grain.toUpperCase();

		var PythonShell = require('python-shell');
		if (userID == 'default'){
			userID = 'testData.csv';
		} else {
			userID = 'public/uploads/' + userID;
		}
		var options = {
		  mode: 'text',
		  // pythonPath: 'path/to/python',
		  // pythonOptions: ['-u'],
		  scriptPath: '',
		  args: [userID, grain, startDate, endDate]
		};

    	const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


		PythonShell.run('shippingAPI_v1.py', options, function (err, results) {
  			// if port flag set
  			if (port != undefined){
  				if (results == null || results[0] == 'Invalid grain!') {
	  				res.send("No results for given grain");
				} else {
					var portRe = new RegExp('"' + port + '":"([.\\d]*)"', 'i');
					var dateRe = /"date":"(\d{1,2}\-[a-zA-Z]{3}\-\d{4})"/;

					var startString = JSON.stringify(JSON.parse(results[0]));
					var start = dateRe.exec(startString, function(err) {
		  					if (err){
		  						console.log(err);
		  					}
		  				});
					var dateStart = start[1];

					var endString = JSON.stringify(JSON.parse(results[results.length - 1]));
					var end = dateRe.exec(endString, function(err) {
		  					if (err){
		  						console.log(err);
		  					}
		  				});
					var dateEnd = end[1];

					var allDatesBetween = datesBetween(dateStart, dateEnd);

		  			var data = {};
		  			for (i in results){
		  				var jsonString = JSON.stringify(JSON.parse(results[i]));
		  				var date = dateRe.exec(jsonString, function(err) {
		  					if (err){
		  						console.log(err);
		  					}
		  				})[1];
		  				var price = portRe.exec(jsonString, function(err) {
		  					if (err){
		  						console.log(err);
		  					}
		  				});
		  				if (price){
		  					price = price[1];
		  				}
		  				data[date] = price;
		  			}
		  			var dataArray = []
		  			// Used for calculating percent and value change
		  			var prev = 0;
		  			var percentDiff = [];
		  			var valueDiff = [];
		  			// ---------------

		  			for (var i = 0; i < allDatesBetween.length; i++){
		  				// if there is an entry for that date
		  				if (data[allDatesBetween[i]] == undefined || data[allDatesBetween[i]] == ''){
		  					dataArray.push(null);
		  					valueDiff.push(null);
		  					percentDiff.push(null);

		  				} else {
		  					
		  					if (prev != 0) {
		  						// Calculates the percent and value difference between current value and previous value
		  						var tmp = parseFloat(data[allDatesBetween[i]]) - parseFloat(prev);
		  						tmp = parseFloat(tmp).toFixed(2);
		  						valueDiff.push(tmp);
		  						tmp = parseFloat(tmp/parseInt(prev));
		  						tmp = parseFloat(tmp).toFixed(4);
		  						var p = tmp * 100;
		  						p = parseFloat(p).toFixed(2);
		  						percentDiff.push(p);


		  					}
		  					dataArray.push(data[allDatesBetween[i]]);
		  					prev = data[allDatesBetween[i]];
		  				}
		  			}
					var response = {dates: allDatesBetween, prices: dataArray, 
									valueDifference: valueDiff, percentDifference: percentDiff};
					res.send(response);
				}
  			}
  			else {
	  			if (results != null && results[0] == 'Invalid grain!') {
	  				res.json([]);
				} else {
					var jsonArr = [];
		  			for (i in results) {
		  				jsonArr[i] = JSON.parse(results[i]);
		  			}
					res.json(jsonArr);	
				}
			}
		});


		// currently reponds with the the query
		// use same query as before;
		// /shipping/getPrices?grain=AGP1&startDate=27-Jul-2015&endDate=31-Dec-2015
		// res.send(req.query);

		// TODO - run python script with the given params and return json.
	} else {
		res.send('Invalid date. Enter date in the format dd-MMM-YYYY\n');
	}





});

// Endpoint to upload files
router.post('/upload', upload.array('inputData', 1), function(req, res) {
	var dataKey = req.files[0].filename;
	var originalName = req.files[0].originalname;

	// Handles duplicate filename uploads
	if (fileNamesToKey[originalName] == undefined) {
		fileNamesToKey[originalName] = dataKey;
	} else {
		originalName = originalName+"(" + index++ + ")";
		fileNamesToKey[originalName] = dataKey;
	}

	files[dataKey] = true;

	res.json({
		"filename": originalName,
		"dataKey": dataKey,
		"message": "File uploaded successfully",
	});
});

module.exports = router;

// Checks if the date is valid
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

// Adds the dates between the start and end date
function datesBetween(startDateString, endDateString){
	var startParts = startDateString.split("-");
	var endParts = endDateString.split("-");
	const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	var day = [];
	var month = [];
	var year = [];
	day.push(parseInt(startParts[0], 10));
	month.push(months.indexOf(startParts[1].toUpperCase()));
	year.push(parseInt(startParts[2], 10));

	day.push(parseInt(endParts[0], 10));
	month.push(months.indexOf(endParts[1].toUpperCase()))
	year.push(parseInt(endParts[2], 10));

	var end = new Date(year[1], month[1], day[1]);
	var daysBetween = [];
	for (var d = new Date(year[0], month[0], day[0]); d <= end; d.setDate(d.getDate() + 1)) {
		var date = d.getDate();
		if (date < 10){
			date = '0' + date;
		}
		var dateString = date + '-' + months[d.getMonth()] + '-' + d.getFullYear();
		daysBetween.push(dateString);
	}
	return daysBetween;
};
