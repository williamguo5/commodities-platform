#!/bin/bash

# host='http://asmallmilliondollarloan.herokuapp.com'
host="http://localhost:3000"
uploadURL="$host/shipping/upload"
testFile1="testFiles/testData.csv"
testFile2="testFiles/200Entries.csv"
testFile3="testFiles/1000Entries.csv"


res=`curl -X POST -F "inputData=@$testFile1" $uploadURL`
dataKey=`echo $res | sed s/.*\"dataKey\":\"// | sed s/\".*//`


echo "##### TESTING ON FILE testData.csv #####"
./testInvalidRequests.sh $host $dataKey

./testValidRequests.sh $host $dataKey > output1.txt

echo
if diff -w output1.txt expected1.txt
then
	echo "##### ALL TESTS FOR VALID INPUT PASSED ON FILE testData.csv #####"
else
	echo "##### TEST FAILED FOR FILE testData.csv #####"
	exit
fi

res=`curl -X POST -F "inputData=@$testFile2" $uploadURL`
dataKey=`echo $res | sed s/.*\"dataKey\":\"// | sed s/\".*//`

echo "##### TESTING ON FILE 200Entries.csv #####"
./testInvalidRequests.sh $host $dataKey

./testValidRequests.sh $host $dataKey > output2.txt

echo
if diff -w output2.txt expected2.txt
then
	echo "##### ALL TESTS FOR VALID INPUT PASSED ON FILE 200Entries.csv #####"
else
	echo "##### TEST FAILED FOR FILE 200Entries.csv #####"
	exit
fi

res=`curl -X POST -F "inputData=@$testFile3" $uploadURL`
dataKey=`echo $res | sed s/.*\"dataKey\":\"// | sed s/\".*//`

echo "##### TESTING ON FILE 1000Entries.csv #####"
./testInvalidRequests.sh $host $dataKey

./testValidRequests.sh $host $dataKey > output3.txt

echo
if diff -w output3.txt expected3.txt
then
	echo "##### ALL TESTS FOR VALID INPUT PASSED ON FILE 1000Entries.csv #####"
else
	echo "##### TEST FAILED FOR FILE 1000Entries.csv #####"
	exit
fi

echo "##### ALL TESTS PASSED FOR ALL SAMPLE FILES #####"