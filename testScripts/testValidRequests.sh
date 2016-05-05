#!/bin/bash

if test $# -ne 1
then
	echo "usage: $0 <data key>"
	exit
fi

host="http://localhost:3000"
requestURL="$host/shipping/getPrices"
dataKey="$1"

# params: 
# $1 - grain
# $2 - startDate
# $3 - endDate
# $4 - dataKey
function CallGetRequest(){
	curl -s "$requestURL?grain=$1&startDate=$2&endDate=$3&userID=$4"
}

echo '----- Testing Case 1: Testing valid input...'
echo 'Expected output: JSON response'
echo 'Request: H2 1-Jan-2015 28-Jul-2015'
CallGetRequest H2 1-Jan-2015 28-jul-2015 $dataKey
echo
echo 'Request: H2 1-Jul-2015 28-Aug-2015'
CallGetRequest H2 1-Jul-2015 28-Aug-2015 $dataKey
echo
echo 'Request: AGP1 1-Mar-2015 28-Aug-2015'
CallGetRequest AGP1 1-Mar-2015 28-Aug-2015 $dataKey
echo
echo 'Request: APW2 1-JUL-2015 28-Aug-2015'
CallGetRequest APW2 1-JUL-2015 28-Aug-2015 $dataKey
echo

echo "----- Test Case 7: Testing leap years..."
echo 'Expected output: JSON response'
echo 'Request: AGP1 28-FEB-2015 29-FEB-2016'
CallGetRequest AGP1 28-FEB-2015 29-FEB-2016 $dataKey

echo '----- Testing Case 14: Testing CSV with multiple entries for same RIC code and same date, but different price...'
echo 'Expected output: JSON response'
echo 'Request: H2 1-Jan-2015 28-Jul-2015'
CallGetRequest H2 1-Jan-2015 28-jul-2015 $dataKey

