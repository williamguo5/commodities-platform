#/bin/bash

# host='http://asmallmilliondollarloan.herokuapp.com'
host="http://localhost:3000"
uploadURL="$host/shipping/upload"
requestURL="$host/shipping/getPrices"
testFile="./f.rabhi@unsw.edu.au-WheatCommoFrom01Feb14-N113102367.csv"

# params: 
# $1 - grain
# $2 - startDate
# $3 - endDate
# $4 - dataKey
function CallGetRequest(){
	curl "$requestURL?grain=$1&startDate=$2&endDate=$3&userID=$4"
}

res=`curl -X POST -F "inputData=@$testFile" $uploadURL`
dataKey=`echo $res | sed s/.*\"dataKey\":\"// | sed s/\".*//`

# valid data
echo "Testing valid request..."
echo 'Expected output: JSON response'
CallGetRequest AGP1 1-Jan-2015 28-jul-2015 $dataKey
CallGetRequest H2 1-Jan-2015 28-jul-2015 $dataKey

echo
# incorrect date formatting
# returns with line "Invalid date. Enter date in the format dd-MMM-YYYY"
echo
echo "Testing incorrect date formatting..."
echo 'Expected output: "Invalid date. Enter date in the format dd-MMM-YYYY"'
CallGetRequest AGP1 1-Jan-15 28-jul-2015 $dataKey
CallGetRequest AGP1 1-01-2015 28-jul-2015 $dataKey
CallGetRequest AGP1 1/Jan/2015 28-jul-2015 $dataKey
CallGetRequest AGP1 1-Jan-2015 28-jul-15 $dataKey
CallGetRequest AGP1 1-Jan-2015 28-07-2015 $dataKey
CallGetRequest AGP1 1-Jan-2015 28/07/2015 $dataKey

# correct date formatting, but wrong date range
# returns with line "Invalid date. Enter date in the format dd-MMM-YYYY"
echo
echo "Testing date range..."
echo 'Expected output: "Invalid date. Enter date in the format dd-MMM-YYYY"'
CallGetRequest AGP1 57-APR-2015 28-jul-2015 $dataKey
CallGetRequest AGP1 3-SET-2015 28-jul-2015 $dataKey
# testing leap years
# returns with line "Invalid date. Enter date in the format dd-MMM-YYYY"
echo
echo "Testing leap years"
echo 'Expected output: "Invalid date. Enter date in the format dd-MMM-YYYY"'
CallGetRequest AGP1 29-FEB-2015 28-jul-2015 $dataKey
echo 'Expected output: JSON response'
CallGetRequest AGP1 29-FEB-2016 28-jul-2016 $dataKey
echo
# incorrect grain 
# return with empty array []
echo
echo 'Testing invalid grain type...'
echo 'Expected output: Empty JSON response'
CallGetRequest APG1 1-Jan-2015 28-jul-2015 $dataKey
echo
