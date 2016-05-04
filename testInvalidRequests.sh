#/bin/sh

# host='http://asmallmilliondollarloan.herokuapp.com'
host="http://localhost:3000"
uploadURL="$host/shipping/upload"
requestURL="$host/shipping/getPrices"
testFile=$1

invalidDate="Invalid date. Enter date in the format dd-MMM-YYYY"
emptyArray="[]"
noGrain="No grain provided"
noUserID="No userID provided"
invalidUserId="Invalid userID"

# params: 
# $1 - grain
# $2 - startDate
# $3 - endDate
# $4 - dataKey
function CallGetRequest(){
	curl -s "$requestURL?grain=$1&startDate=$2&endDate=$3&userID=$4"
}

res=`curl -X POST -F "inputData=@$testFile" $uploadURL`
dataKey=`echo $res | sed s/.*\"dataKey\":\"// | sed s/\".*//`

#### TEST 2 ####
# No records matching search criteria
# returns empty array
echo "----- Test Case 2: Testing valid request but no records matching..."
echo "Expected output: []"
echo 'Request: H2 1-jul-2015 1-jul-2015'
err=`CallGetRequest H2 1-jul-2015 1-jul-2015 $dataKey`
if test "$err" != "$emptyArray"
then
	echo "----- Test Case 2 failed -----"
	exit
fi
echo "----- Test Case 2 Passed -----"
echo

#### TEST 3 ####
# Invalid grain type - i.e. no records matching search criteria
# returns empty array
echo "----- Test Case 3: Testing grain type non exisitent in file provided..."
echo "Expected output: Empty array"
echo 'Request: AP1 1-jul-2015 1-dec-2015'
err=`CallGetRequest AP1 1-jul-2015 1-dec-2015 $dataKey`
if test "$err" != "$emptyArray"
then
	echo "----- Test Case 3 failed -----"
	exit
fi
echo "----- Test Case 3 Passed -----"
echo

#### TEST 4 ####
# Invalid grain type - i.e. no records matching search criteria
# returns empty array
echo "----- Test Case 4: Testing grain type not provided in request..."
echo "Expected output: []"
echo 'Request: 1-jul-2015 1-dec-2015'
err=`curl "$requestURL?&startDate=1-jul-2015&endDate=1-dec-2015&userID=$dataKey"`
if test "$err" != "$noGrain"
then
	echo "----- Test Case 4 failed -----"
	exit
fi
echo "----- Test Case 4 Passed -----"
echo


#### TEST 5 ####
# incorrect date formatting
# returns with line "Invalid date. Enter date in the format dd-MMM-YYYY"
echo "----- Test Case 5: Testing incorrect date formatting..."
echo 'Expected output: "Invalid date. Enter date in the format dd-MMM-YYYY"'
echo 'Request: AGP1 1-Jan-15 28-jul-2015'
err=`CallGetRequest AGP1 1-Jan-15 28-jul-2015 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 5 failed -----"
	exit
fi
echo 'Request: AGP1 1-01-2015 28-jul-2015'
err=`CallGetRequest AGP1 1-01-2015 28-jul-2015 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 5 failed -----"
	exit
fi
echo 'Request: AGP1 1/Jan/2015 28-jul-2015'
err=`CallGetRequest AGP1 1/Jan/2015 28-jul-2015 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 5 failed -----"
	exit
fi
echo 'Request: AGP1 1-Jan-2015 28-jul-15'
err=`CallGetRequest AGP1 1-Jan-2015 28-jul-15 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 5 failed -----"
	exit
fi
echo 'Request: AGP1 1-Jan-2015 28-07-2015'
err=`CallGetRequest AGP1 1-Jan-2015 28-07-2015 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 5 failed -----"
	exit
fi
echo 'Request: AGP1 1-Jan-2015 28/07/2015'
err=`CallGetRequest AGP1 1-Jan-2015 28/07/2015 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 5 failed -----"
	exit
fi
echo "----- Test Case 5 Passed -----"
echo

#### TEST 6 ####
# correct date formatting, but invalid month or invalid date range
# returns with line "Invalid date. Enter date in the format dd-MMM-YYYY"
echo "----- Test Case 5: Testing month codes and its corresponding date range is valid..."
echo 'Expected output: "Invalid date. Enter date in the format dd-MMM-YYYY"'
echo 'Request: AGP1 57-APR-2015 28-jul-2015'
err=`CallGetRequest AGP1 57-APR-2015 28-jul-2015 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 6 failed -----"
	exit
fi
echo 'Request: AGP1 3-SET-2015 28-jul-2015'
err=`CallGetRequest AGP1 3-SET-2015 28-jul-2015 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 6 failed -----"
	exit
fi
echo "----- Test Case 6 Passed -----"
echo

#### TEST 7 ####
# testing leap years
# returns with line "Invalid date. Enter date in the format dd-MMM-YYYY"
echo "----- Test Case 7: Testing leap years..."
echo 'Expected output: "Invalid date. Enter date in the format dd-MMM-YYYY"'
echo 'Request: AGP1 29-FEB-2015 28-jul-2015'
err=`CallGetRequest AGP1 29-FEB-2015 28-jul-2015 $dataKey`
if test "$err" != "$invalidDate"
then
	echo "----- Test Case 7 failed -----"
	exit
fi
echo 'Expected output: JSON response'
echo 'Request: AGP1 29-FEB-2016 28-jul-2016'
err=`CallGetRequest AGP1 29-FEB-2016 28-jul-2016 $dataKey`
if test "$err" == "$invalidDate"
then
	echo "----- Test Case 7 failed -----"
	exit
fi
echo "----- Test Case 7 Passed -----"
echo

#### TEST 8 ####
# testing case where the start date occurs after end date
# returns empty array
echo "----- Test Cast 8: Testing startDate occuring after endDate"
echo "Expected output: []"
echo "Request: AGP1 25-Sep-2015 12-Jun-2015"
err=`CallGetRequest AGP1 25-Sep-2015 12-Jun-2015 $dataKey`
if test "$err" != "$emptyArray"
then
	echo "----- Test Case 8 failed -----"
	exit
fi
echo "----- Test Case 8 Passed -----"
echo

#### TEST 9 ####
# testing invalid userID/datakey
# returns empty array
echo "----- Test Cast 9: Testing invalid userID/datakey"
echo "Expected output: Invalid userID"
echo "Request: AGP1 25-Sep-2015 12-Jun-2015 *invalidUserId"
err=`CallGetRequest AGP1 25-Sep-2015 12-Jun-2015 abcdef`
if test "$err" != "$invalidUserId"
then
	echo "----- Test Case 9 failed -----"
	exit
fi
echo "----- Test Case 9 Passed -----"
echo


#### TEST 10 ####
# Invalid grain type - i.e. no records matching search criteria
# returns empty array
echo "----- Test Case 10: Testing userID not provided in request..."
echo "Expected output: No userID provided"
echo 'Request: AGP1 1-jul-2015 1-dec-2015 *noUserID'
err=`curl "$requestURL?&startDate=1-jul-2015&endDate=1-dec-2015"`
echo $err
if test "$err" != "$noUserID"
then
	echo "----- Test Case 10 failed -----"
	exit
fi
echo "----- Test Case 10 Passed -----"
echo
echo "##### ALL TESTS FOR INVALID INPUT PASSED #####"