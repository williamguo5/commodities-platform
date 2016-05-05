#!/bin/bash

if test $# -ne 1
then
	echo "usage: $0 <csv file>"
	exit
fi

# host='http://asmallmilliondollarloan.herokuapp.com'
host="http://localhost:3000"
uploadURL="$host/shipping/upload"
testFile=$1

res=`curl -X POST -F "inputData=@$testFile" $uploadURL`
dataKey=`echo $res | sed s/.*\"dataKey\":\"// | sed s/\".*//`

./testInvalidRequests.sh $dataKey

./testValidRequests.sh $dataKey > output.txt

echo
if diff -w output.txt expected.txt
then
	echo "##### ALL TESTS FOR VALID INPUT PASSED #####"
else
	echo "##### TEST FAILED #####"
fi
