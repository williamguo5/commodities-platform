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
