#/bin/bash

# host='http://asmallmilliondollarloan.herokuapp.com'
host="http://localhost:3000"
uploadURL="$host/shipping/upload"
requestURL="$host/shipping/getPrices"
testFile="../sampleData10k.csv"

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
CallGetRequest AGP1 1-Jan-2015 28-jul-2015 $dataKey
echo
# incorrect date formatting
# returns with line "Invalid date format. Enter date in the format dd-MMM-YYYY"
CallGetRequest AGP1 1-Jan-15 28-jul-2015 $dataKey
CallGetRequest AGP1 1-01-2015 28-jul-2015 $dataKey
CallGetRequest AGP1 1/Jan/2015 28-jul-2015 $dataKey
CallGetRequest AGP1 1-Jan-2015 28-jul-15 $dataKey
CallGetRequest AGP1 1-Jan-2015 28-07-2015 $dataKey
CallGetRequest AGP1 1-Jan-2015 28/07/2015 $dataKey

# incorrect grain 
# return with empty array []
CallGetRequest APG1 1-Jan-2015 28-jul-2015 $dataKey
echo
